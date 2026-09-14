/**
 * Fill media.content_hash for rows uploaded before the duplicate-upload guard
 * existed, by hashing the live file on the CDN. Without this the guard only
 * catches duplicates of images uploaded after it shipped.
 *
 *   node --import tsx --env-file=scratchpad/.sb-env scripts/backfill-media-hash.ts
 */
import { createHash } from 'node:crypto'
import pkg from 'pg'

const { Pool } = pkg
const pool = new Pool({ connectionString: process.env.PG_IMPORT_URL, ssl: { rejectUnauthorized: false }, max: 2 })
const MEDIA_CDN = 'https://media.cloudtopia.net'

function fileUrl(url: string, filename: string): string {
  if (url?.startsWith('/api/media/file/') || !url) return `${MEDIA_CDN}/${encodeURIComponent(filename)}`
  if (url.startsWith('/')) return `https://cloudtopia.net${url}`
  return url
}

async function main() {
  const { rows } = await pool.query(`select id, url, filename from media where content_hash is null order by id`)
  let hashed = 0
  const missing: string[] = []
  for (let i = 0; i < rows.length; i += 10) {
    await Promise.all(
      rows.slice(i, i + 10).map(async (row) => {
        const res = await fetch(fileUrl(row.url, row.filename)).catch(() => null)
        if (!res || res.status !== 200) {
          missing.push(`${row.id} ${row.filename}`)
          return
        }
        const hash = createHash('md5').update(Buffer.from(await res.arrayBuffer())).digest('hex')
        await pool.query(`update media set content_hash = $1 where id = $2`, [hash, row.id])
        hashed++
      }),
    )
  }
  const dups = await pool.query(
    `select content_hash, array_agg(filename order by id) as files from media
     where content_hash is not null and deleted_at is null
     group by content_hash having count(*) > 1`,
  )
  console.log(`hashed ${hashed}/${rows.length} · unreachable ${missing.length} · duplicate groups in library ${dups.rowCount}`)
  for (const d of dups.rows) console.log(`  dup: ${d.files.join(' , ')}`)
  if (missing.length) console.log(`  unreachable (legacy rows without a file): ${missing.length}`)
  await pool.end()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
