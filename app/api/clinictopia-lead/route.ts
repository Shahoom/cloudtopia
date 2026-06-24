import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/cms/payload.ts'
import { isPayloadConfigured } from '@/lib/cms/env.ts'
import { getClientIp } from '@/lib/cms/client-ip.ts'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// The ClinicTopia demo runs on a different origin (clinic.cloudtopia.net), so
// this route must answer CORS preflight and echo an allowed origin.
const ALLOWED_ORIGINS = new Set([
  'https://clinic.cloudtopia.net',
  'http://localhost:5173',
  'http://localhost:5190',
])

function corsHeaders(origin: string | null): Record<string, string> {
  const allow =
    origin && (ALLOWED_ORIGINS.has(origin) || /\.vercel\.app$/.test(new URL(origin).hostname))
      ? origin
      : 'https://clinic.cloudtopia.net'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) })
}

export async function POST(request: NextRequest) {
  const cors = corsHeaders(request.headers.get('origin'))

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: cors })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400, headers: cors })
  }

  const b = body as Record<string, unknown>

  const name     = clean(b.name, 160)
  const email    = clean(b.email, 180)?.toLowerCase()
  const phone    = clean(b.phone, 80)
  const language = b.language === 'en' ? 'en' : 'ar'
  const timezone = clean(b.timezone, 80)
  const screen   = clean(b.screen, 40)
  const userAgent = clean(b.userAgent, 500)
  const pageUrl  = clean(b.page ?? b.pageUrl, 500)
  const source   = clean(b.source, 80) || 'clinictopia-demo'
  const product  = clean(b.product, 80) || 'ClinicTopia'

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400, headers: cors })
  }
  if (!email && !phone) {
    return NextResponse.json({ error: 'Provide an email or phone number.' }, { status: 400, headers: cors })
  }

  const data = {
    name:      name      || undefined,
    email:     email     || undefined,
    phone:     phone     || undefined,
    language,
    timezone:  timezone  || undefined,
    screen:    screen    || undefined,
    userAgent: userAgent || undefined,
    pageUrl:   pageUrl   || undefined,
    source,
    product,
    ipAddress: getClientIp(request.headers) || undefined,
    status:    'new',
    createdAt: new Date().toISOString(),
  }

  if (!isPayloadConfigured()) {
    return NextResponse.json(
      { error: 'Lead capture is not configured right now.' },
      { status: 503, headers: cors },
    )
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'clinictopia-leads' as never,
      data: data as never,
      overrideAccess: true,
    })
  } catch (err) {
    console.error('[clinictopia-lead] Payload save failed', err)
    return NextResponse.json(
      { error: 'Could not save the lead right now. Please try again.' },
      { status: 503, headers: cors },
    )
  }

  return NextResponse.json({ ok: true }, { status: 201, headers: cors })
}

function clean(value: unknown, maxLength: number): string | null {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, maxLength) : null
}
