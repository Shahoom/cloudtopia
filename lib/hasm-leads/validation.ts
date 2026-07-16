export const HASM_CONSENT_VERSION = '2026-07-15'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,19}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const BUILT_IN_ORIGINS = new Set([
  'https://legal.cloudtopia.net',
  'http://localhost:3000',
])

export type HasmLeadValidationError =
  | 'consent_required'
  | 'invalid_email'
  | 'invalid_name'
  | 'invalid_phone'
  | 'invalid_submission'

export interface ValidHasmLeadInput {
  name: string
  email: string
  phone: string
  consentVersion: string
  submissionId: string
  language: 'ar' | 'en'
  timezone: string | null
  screen: string | null
  pageUrl: string | null
  referrer: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmTerm: string | null
  utmContent: string | null
}

export type HasmLeadParseResult =
  | { ok: true; data: ValidHasmLeadInput }
  | { ok: false; error: HasmLeadValidationError }

function clean(value: unknown, maxLength: number): string | null {
  return typeof value === 'string' && value.trim()
    ? value.trim().slice(0, maxLength)
    : null
}

function configuredOrigins(raw: string | undefined): Set<string> {
  const origins = new Set(BUILT_IN_ORIGINS)
  for (const candidate of raw?.split(',') ?? []) {
    const value = candidate.trim()
    if (!value) continue
    try {
      const url = new URL(value)
      if (url.origin === value) origins.add(value)
    } catch {
      // Ignore malformed environment entries instead of broadening CORS.
    }
  }
  return origins
}

export function resolveHasmCorsOrigin(
  origin: string | null,
  configured = process.env.HASM_DEMO_ALLOWED_ORIGINS,
): string | null {
  if (!origin) return null
  return configuredOrigins(configured).has(origin) ? origin : null
}

export function parseHasmLeadInput(body: unknown): HasmLeadParseResult {
  if (!body || typeof body !== 'object') return { ok: false, error: 'invalid_submission' }

  const input = body as Record<string, unknown>
  if (clean(input.website, 200)) return { ok: false, error: 'invalid_submission' }
  if (input.consent !== true || input.consentVersion !== HASM_CONSENT_VERSION) {
    return { ok: false, error: 'consent_required' }
  }

  const submissionId = clean(input.submissionId, 64)
  if (!submissionId || !UUID_RE.test(submissionId)) {
    return { ok: false, error: 'invalid_submission' }
  }

  const name = clean(input.name, 160)
  if (!name || name.length < 2) return { ok: false, error: 'invalid_name' }

  const email = clean(input.email, 180)?.toLowerCase() ?? null
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: 'invalid_email' }

  const phone = clean(input.phone, 40)
  const phoneDigits = phone?.replace(/[^0-9]/g, '') ?? ''
  if (!phone || !PHONE_RE.test(phone) || phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { ok: false, error: 'invalid_phone' }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      consentVersion: HASM_CONSENT_VERSION,
      submissionId,
      language: input.language === 'en' ? 'en' : 'ar',
      timezone: clean(input.timezone, 80),
      screen: clean(input.screen, 40),
      pageUrl: clean(input.pageUrl, 500),
      referrer: clean(input.referrer, 500),
      utmSource: clean(input.utmSource, 160),
      utmMedium: clean(input.utmMedium, 160),
      utmCampaign: clean(input.utmCampaign, 160),
      utmTerm: clean(input.utmTerm, 160),
      utmContent: clean(input.utmContent, 160),
    },
  }
}
