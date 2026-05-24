const LOCAL_DATABASE_URL = 'postgres://127.0.0.1:5432/payload_db'
const LOCAL_PAYLOAD_SECRET = 'dev-only-change-me-before-production'

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

function clean(value: string | undefined) {
  return value?.trim() || ''
}

export function getDatabaseUrl() {
  const configured = clean(process.env.DATABASE_URL)
  if (configured) return configured
  return isProduction() ? '' : LOCAL_DATABASE_URL
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl())
}

export function getPayloadSecret() {
  const configured = clean(process.env.PAYLOAD_SECRET)
  if (configured) return configured
  return isProduction() ? '' : LOCAL_PAYLOAD_SECRET
}

export function isPayloadConfigured() {
  return Boolean(getDatabaseUrl() && getPayloadSecret())
}
