#!/usr/bin/env node
// Copy every live media file from cloudtopia.net (Supabase-backed) into the
// R2 bucket. Missing-on-origin files (404) are reported, not fatal — those
// rows were already broken before the migration.
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
})
const BUCKET = process.env.R2_BUCKET
const SITE = 'https://cloudtopia.net'

// 1. Full media list via the public REST API (paginated).
const docs = []
for (let page = 1; ; page++) {
  const res = await fetch(`${SITE}/api/media?limit=100&page=${page}&depth=0`)
  if (!res.ok) throw new Error(`media list page ${page}: ${res.status}`)
  const json = await res.json()
  docs.push(...json.docs)
  if (!json.hasNextPage) break
}
console.log(`media rows: ${docs.length}`)

const results = { copied: 0, skipped: 0, missing: [], failed: [], sizeMismatch: [] }

async function copyOne(doc) {
  const { filename, mimeType, filesize } = doc
  if (!filename) return
  try {
    // Already in R2 with same size? skip (idempotent re-runs).
    try {
      const head = await R2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: filename }))
      if (head.ContentLength === filesize) { results.skipped++; return }
    } catch { /* not there yet */ }

    const res = await fetch(`${SITE}/api/media/file/${encodeURIComponent(filename)}`)
    if (res.status === 404) { results.missing.push(filename); return }
    if (!res.ok) { results.failed.push(`${filename} (http ${res.status})`); return }
    const buf = Buffer.from(await res.arrayBuffer())
    if (filesize && buf.length !== filesize) results.sizeMismatch.push(`${filename} db=${filesize} got=${buf.length}`)
    await R2.send(new PutObjectCommand({ Bucket: BUCKET, Key: filename, Body: buf, ContentType: mimeType || 'application/octet-stream' }))
    results.copied++
  } catch (err) {
    results.failed.push(`${filename} (${err.message})`)
  }
}

// 2. Copy with small concurrency.
const queue = [...docs]
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) await copyOne(queue.shift())
}))

console.log(`\ncopied: ${results.copied}  skipped(existing): ${results.skipped}`)
console.log(`missing on origin (already broken rows): ${results.missing.length}`)
if (results.missing.length) console.log('  ' + results.missing.join('\n  '))
if (results.sizeMismatch.length) console.log(`size mismatches:\n  ` + results.sizeMismatch.join('\n  '))
if (results.failed.length) { console.log(`FAILED:\n  ` + results.failed.join('\n  ')); process.exit(1) }
