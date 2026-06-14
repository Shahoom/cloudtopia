import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/cms/payload.ts'
import { isPayloadConfigured } from '@/lib/cms/env.ts'
import { getClientIp } from '@/lib/cms/client-ip.ts'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const b = body as Record<string, unknown>

  const name    = clean(b.name,    160)
  const email   = clean(b.email,   180)?.toLowerCase()
  const phone   = clean(b.phone,    80)
  const company = clean(b.company, 180)
  const country = clean(b.country, 120)
  const service = clean(b.service, 180)
  const budget  = clean(b.budget,  120)
  const timeline = clean(b.timeline, 120)
  const message = clean(b.message, 3000)
  const locale  = b.locale === 'ar' ? 'ar' : 'en'
  const pageUrl = clean(b.pageUrl, 500)
  const source  = ['contact-form', 'article-sidebar', 'pricing-page'].includes(String(b.source || ''))
    ? String(b.source)
    : 'contact-form'

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  if (!email && !phone) {
    return NextResponse.json({ error: 'Provide an email or phone number.' }, { status: 400 })
  }

  const data = {
    name:      name      || undefined,
    email:     email     || undefined,
    phone:     phone     || undefined,
    company:   company   || undefined,
    country:   country   || undefined,
    service:   service   || undefined,
    budget:    budget    || undefined,
    timeline:  timeline  || undefined,
    message,
    source,
    locale,
    pageUrl:   pageUrl   || undefined,
    ipAddress: getClientIp(request.headers) || undefined,
    status:    'new',
    createdAt: new Date().toISOString(),
  }

  // Track whether the inquiry was captured anywhere durable. If neither the
  // CMS write nor the email notification succeeds, we MUST return an error so
  // the form (e.g. InquiryFormSidebar, which keys its success screen on res.ok)
  // never shows "success" for a lead that was actually lost.
  let captured = false

  // ── Save to Payload CMS ────────────────────────────────────────────────────
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'contact-inquiries' as never,
        data: data as never,
        overrideAccess: true,
      })
      captured = true
    } catch (err) {
      // Log unconditionally (not dev-only) so a missing table or schema drift
      // surfaces in logs; the `captured` guard below turns it into a real error
      // response so it can never masquerade as a silent 201 success.
      console.error('[contact] Payload save failed', err)
    }
  }

  // ── Optional: notify team via email (Resend) ───────────────────────────────
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || process.env.SOLUTION_FINDER_NOTIFY_EMAIL
  const resendKey   = process.env.RESEND_API_KEY

  if (notifyEmail && resendKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    process.env.CONTACT_FROM_EMAIL || 'noreply@cloudtopia.co',
          to:      [notifyEmail],
          subject: `📬 New Inquiry — ${name || email || 'Anonymous'} (${service || 'General'})`,
          html: `
<h2 style="color:#0284c7">New CloudTopia Contact Inquiry</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Name</td><td style="padding:8px 12px">${name || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Email</td><td style="padding:8px 12px">${email || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Phone</td><td style="padding:8px 12px">${phone || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Company</td><td style="padding:8px 12px">${company || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Country</td><td style="padding:8px 12px">${country || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Service</td><td style="padding:8px 12px">${service || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Budget</td><td style="padding:8px 12px">${budget || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Timeline</td><td style="padding:8px 12px">${timeline || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Source</td><td style="padding:8px 12px">${source}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Message</td><td style="padding:8px 12px">${message}</td></tr>
</table>
<p style="margin-top:24px;font-size:12px;color:#999">Submitted from ${pageUrl || 'cloudtopia.co'}</p>`,
        }),
      })
      if (emailRes.ok) captured = true
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[contact] Email notification failed', err)
      }
    }
  }

  if (!captured) {
    // Nothing durable captured the lead — surface a real error so the client
    // never shows a false success and the visitor can retry / reach us directly.
    return NextResponse.json(
      { error: 'We could not save your inquiry right now. Please try again or contact us directly.' },
      { status: 503 },
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

function clean(value: unknown, maxLength: number): string | null {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, maxLength) : null
}
