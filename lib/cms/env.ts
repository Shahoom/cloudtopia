const LOCAL_DATABASE_URL = 'postgres://127.0.0.1:5432/payload_db'
const LOCAL_PAYLOAD_SECRET = 'dev-only-change-me-before-production'

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

function clean(value: string | undefined) {
  return value?.trim() || ''
}

/**
 * Strip `sslmode` (except `disable`) from the connection string. node-pg lets
 * a URL-level `sslmode=require` win over the pool's `ssl: { rejectUnauthorized:
 * false }`, which makes Supabase's certificate chain fail with
 * SELF_SIGNED_CERT_IN_CHAIN. We attach the relaxed ssl config ourselves in
 * `databaseRequiresSsl()` for every non-localhost host, so the URL param is
 * redundant — and harmful — here.
 */
function normalizeDatabaseUrl(url: string) {
  try {
    const parsed = new URL(url)
    const sslmode = parsed.searchParams.get('sslmode')
    if (sslmode && sslmode !== 'disable') {
      parsed.searchParams.delete('sslmode')
      return parsed.toString()
    }
    return url
  } catch {
    return url
  }
}

export function getDatabaseUrl() {
  const configured = clean(process.env.DATABASE_URL)
  if (configured) return normalizeDatabaseUrl(configured)
  // The Vercel ↔ Supabase marketplace integration injects POSTGRES_URL (the
  // transaction pooler, port 6543). Falling back to it lets the app run with
  // zero manual database wiring when DATABASE_URL is not set explicitly.
  const integrationUrl = clean(process.env.POSTGRES_URL)
  if (integrationUrl) return normalizeDatabaseUrl(integrationUrl)
  return isProduction() ? '' : LOCAL_DATABASE_URL
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl())
}

/**
 * Whether the configured DATABASE_URL points at a remote host (anything other
 * than localhost / 127.0.0.1). Remote Postgres — notably Supabase — requires
 * TLS, so callers should attach `ssl: { rejectUnauthorized: false }` to the pg
 * Pool when this returns true. Local dev never needs SSL.
 *
 * Supabase topology note:
 *   - Runtime (app/admin) uses the transaction pooler on port 6543 (PgBouncer).
 *     Keep the pg pool `max` small (1–3) and add `?pgbouncer=true` to the URL.
 *   - Migrations & seeds use the DIRECT connection on port 5432, which supports
 *     the prepared statements / DDL that PgBouncer's transaction mode cannot.
 */
export function databaseRequiresSsl() {
  const url = getDatabaseUrl()
  if (!url) return false

  // Respect an explicit sslmode=disable in the connection string.
  if (/[?&]sslmode=disable/i.test(url)) return false

  try {
    const host = new URL(url).hostname.toLowerCase()
    return host !== 'localhost' && host !== '127.0.0.1' && host !== '::1'
  } catch {
    // Fall back to a substring check if the URL cannot be parsed.
    return !/(@|\/\/)(localhost|127\.0\.0\.1)([:/]|$)/i.test(url)
  }
}

export function getPayloadSecret() {
  const configured = clean(process.env.PAYLOAD_SECRET)
  if (configured) return configured
  // The Vercel ↔ Supabase marketplace integration injects SUPABASE_JWT_SECRET —
  // a strong, project-stable secret. Falling back to it lets production boot
  // with zero manual secret wiring. Setting PAYLOAD_SECRET explicitly still
  // wins (note: changing the effective secret invalidates /admin sessions).
  const integrationSecret = clean(process.env.SUPABASE_JWT_SECRET)
  if (integrationSecret) return integrationSecret
  return isProduction() ? '' : LOCAL_PAYLOAD_SECRET
}

export function isPayloadConfigured() {
  return Boolean(getDatabaseUrl() && getPayloadSecret())
}

/**
 * The canonical origin the app and Payload admin are served from. Prefers
 * NEXT_PUBLIC_SITE_URL, falling back to the production apex or localhost.
 * Used for Payload `serverURL`/`csrf`.
 */
export function getServerURL() {
  const configured = clean(process.env.NEXT_PUBLIC_SITE_URL)
  if (configured) return configured.replace(/\/$/, '')
  return isProduction() ? 'https://cloudtopia.net' : 'http://localhost:3000'
}

/**
 * Exact Origins allowed to send the Payload session cookie. Payload's default
 * `csrf: []` accepts the payload-token cookie from ANY Origin, so a script on a
 * same-site subdomain (e.g. media.cloudtopia.net) could drive authenticated CMS
 * writes with a logged-in admin's ambient cookie. Pinning the allowlist makes
 * extractJWT reject the cookie for every other Origin. We include the canonical
 * origin plus its www/apex sibling, the Vercel preview URLs (so /admin keeps
 * working on preview deployments), and localhost in development.
 */
export function getCsrfOrigins(): string[] {
  const origins = new Set<string>()
  const server = getServerURL()
  origins.add(server)
  try {
    const u = new URL(server)
    if (u.hostname.startsWith('www.')) {
      origins.add(`${u.protocol}//${u.hostname.slice(4)}`)
    } else {
      origins.add(`${u.protocol}//www.${u.hostname}`)
    }
  } catch {
    // ignore a malformed NEXT_PUBLIC_SITE_URL
  }
  // Vercel injects these host-only (no protocol).
  for (const v of [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ]) {
    const host = clean(v)
    if (host) origins.add(`https://${host}`)
  }
  if (!isProduction()) origins.add('http://localhost:3000')
  return Array.from(origins)
}

export type S3StorageConfig = {
  bucket: string
  region: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
}

/**
 * Returns the Supabase Storage (S3-compatible) configuration when ALL required
 * env vars are present, otherwise null. When null, Payload Media falls back to
 * the local staticDir so dev and CI builds keep working without cloud storage.
 *
 * Supabase exposes an S3-compatible endpoint at:
 *   https://<project-ref>.supabase.co/storage/v1/s3
 * with region `<project-region>` and a dedicated S3 access key/secret created
 * in the Supabase dashboard (Storage → S3 Connection).
 */
export function getS3StorageConfig(): S3StorageConfig | null {
  const bucket = clean(process.env.S3_BUCKET)
  const region = clean(process.env.S3_REGION)
  const endpoint = clean(process.env.S3_ENDPOINT)
  const accessKeyId = clean(process.env.S3_ACCESS_KEY_ID)
  const secretAccessKey = clean(process.env.S3_SECRET_ACCESS_KEY)

  if (!bucket || !region || !endpoint || !accessKeyId || !secretAccessKey) {
    return null
  }

  return { bucket, region, endpoint, accessKeyId, secretAccessKey }
}

export function isS3StorageConfigured() {
  return getS3StorageConfig() !== null
}
