#!/usr/bin/env node
/**
 * Production build runner for Vercel.
 *
 * Phases:
 *   1. Apply Payload migrations against the DIRECT (non-pooling) connection.
 *   2. Run `next build`.
 *
 * Every phase reports progress into the `deploy_diag` table in Postgres so a
 * failed build can be diagnosed even when the host's build logs are
 * unavailable. Reporting is best-effort — diagnostics never fail the build.
 */
import { spawn } from 'node:child_process'
import pkg from 'pg'

const { Pool } = pkg

function normalizeUrl(url) {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const sslmode = parsed.searchParams.get('sslmode')
    if (sslmode && sslmode !== 'disable') parsed.searchParams.delete('sslmode')
    return parsed.toString()
  } catch {
    return url
  }
}

const directUrl = normalizeUrl(
  process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
)

let pool = null
if (directUrl) {
  pool = new Pool({
    connectionString: directUrl,
    max: 1,
    connectionTimeoutMillis: 15_000,
    ssl: /localhost|127\.0\.0\.1/.test(directUrl) ? undefined : { rejectUnauthorized: false },
  })
}

async function report(phase, detail) {
  if (!pool) return
  try {
    await pool.query(
      'CREATE TABLE IF NOT EXISTS public.deploy_diag (id serial PRIMARY KEY, ts timestamptz DEFAULT now(), phase text, detail jsonb)',
    )
    await pool.query('INSERT INTO public.deploy_diag (phase, detail) VALUES ($1, $2)', [
      phase,
      JSON.stringify(detail ?? {}),
    ])
  } catch (err) {
    console.warn(`[deploy-diag] could not report "${phase}": ${err.message}`)
  }
}

function envInfo(name) {
  const value = process.env[name] || ''
  let host = ''
  try {
    host = value ? new URL(value).hostname : ''
  } catch {
    host = '(unparseable)'
  }
  return { present: Boolean(value), length: value.length, host }
}

function runStep(label, command, args, env) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { env, shell: false })
    let tail = ''
    const keep = (chunk) => {
      process.stdout.write(chunk)
      tail = (tail + chunk.toString()).slice(-8000)
    }
    child.stdout.on('data', keep)
    child.stderr.on('data', keep)
    const heartbeat = setInterval(() => {
      report(`${label}-progress`, { tail: tail.slice(-2000) })
    }, 30_000)
    child.on('close', (code, signal) => {
      clearInterval(heartbeat)
      resolve({ code: code ?? 1, signal, tail })
    })
    child.on('error', (err) => {
      clearInterval(heartbeat)
      resolve({ code: 1, signal: null, tail: `${tail}\nspawn error: ${err.message}` })
    })
  })
}

const startDetail = {
  node: process.version,
  database_url: envInfo('DATABASE_URL'),
  postgres_url: envInfo('POSTGRES_URL'),
  postgres_url_non_pooling: envInfo('POSTGRES_URL_NON_POOLING'),
  payload_secret: { present: Boolean(process.env.PAYLOAD_SECRET) },
  supabase_jwt_secret: { present: Boolean(process.env.SUPABASE_JWT_SECRET) },
  vercel_env: process.env.VERCEL_ENV || '',
}

await report('start', startDetail)
console.log('[deploy-diag] start', JSON.stringify(startDetail))

// Phase 1 — migrations against the direct connection.
const migrateEnv = { ...process.env, DATABASE_URL: directUrl }
const migrate = await runStep('migrate', 'npx', ['payload', '--use-swc', 'migrate'], migrateEnv)
await report(migrate.code === 0 ? 'migrate-done' : 'migrate-failed', {
  code: migrate.code,
  signal: migrate.signal,
  tail: migrate.tail.slice(-4000),
})
if (migrate.code !== 0) {
  await pool?.end()
  process.exit(migrate.code)
}

// Phase 1.5 — regenerate the machine-readable llms.txt Articles/Services blocks
// from the live DB so the file AI engines read never drifts from published
// posts. Runs BEFORE `next build` so the refreshed public/llms.txt is copied
// into the static output. Best-effort: a stale llms.txt must never fail a
// deploy, so a non-zero exit is reported but not propagated.
const llms = await runStep('llms', 'npx', ['tsx', 'scripts/generate-llms.ts'], process.env)
await report(llms.code === 0 ? 'llms-done' : 'llms-failed', {
  code: llms.code,
  signal: llms.signal,
  tail: llms.tail.slice(-2000),
})
if (llms.code !== 0) {
  console.warn(`[deploy-diag] llms.txt regeneration failed (code ${llms.code}); continuing with the committed file.`)
}

// Phase 1.6 — guarantee the s3Storage client component is in the admin importMap.
// `payload generate:importmap` can't run in this repo (the config's top-level
// await breaks the CLI's require loader), and regenerating importMap.js locally
// WITHOUT the S3_* env vars set silently drops `S3ClientUploadHandler` — which
// crashes production /admin (getFromImportMap → white screen) once s3Storage is
// active. Re-inject it here, idempotently, so a stale committed importMap can
// never white-screen the admin again.
try {
  const { readFileSync, writeFileSync } = await import('node:fs')
  const mapPath = 'app/(payload)/admin/importMap.js'
  const handlerKey = '@payloadcms/storage-s3/client#S3ClientUploadHandler'
  let src = readFileSync(mapPath, 'utf8')
  if (!src.includes(handlerKey)) {
    src = src
      .replace(
        "/** @type import('payload').ImportMap */",
        "import { S3ClientUploadHandler as S3ClientUploadHandler_storage_s3 } from '@payloadcms/storage-s3/client'\n\n/** @type import('payload').ImportMap */",
      )
      .replace(/\n}\s*$/, `,\n  "${handlerKey}": S3ClientUploadHandler_storage_s3\n}\n`)
    writeFileSync(mapPath, src)
    console.log('[deploy-diag] injected S3ClientUploadHandler into importMap.js')
    await report('importmap-patched', {})
  }
} catch (err) {
  console.warn(`[deploy-diag] importMap S3 patch skipped: ${err.message}`)
}

// Phase 2 — next build (runtime fallback chain decides its own DB URL).
const build = await runStep('next-build', 'npx', ['next', 'build'], process.env)
await report(build.code === 0 ? 'build-done' : 'build-failed', {
  code: build.code,
  signal: build.signal,
  tail: build.tail.slice(-6000),
})

await pool?.end()
process.exit(build.code)
