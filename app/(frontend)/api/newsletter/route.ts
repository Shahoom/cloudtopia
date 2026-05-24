import { NextRequest } from 'next/server'
import { isDatabaseConfigured, queryDatabase } from '@/lib/cms/db'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Newsletter storage is not configured.' }, { status: 503 })
  }

  let body: {
    email?: string
    name?: string
    source?: string
    interest?: string
    locale?: string
    consent?: boolean
    utmSource?: string
    utmCampaign?: string
  }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = String(body.email || '').trim().toLowerCase()
  const name = String(body.name || '').trim()
  const source = String(body.source || 'insights').trim() || 'insights'
  const interest = String(body.interest || '').trim()
  const locale = ['en', 'ar', 'tr'].includes(String(body.locale)) ? String(body.locale) : 'en'
  const consent = body.consent !== false
  const utmSource = String(body.utmSource || '').trim()
  const utmCampaign = String(body.utmCampaign || '').trim()

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  try {
    await queryDatabase(
      `insert into newsletter_subscribers (
        email, name, source, consent, locale, utm_source, utm_campaign,
        subscribed_at, status, updated_at, created_at
       )
       values ($1, $2, $3, $4, $5, $6, $7, now(), 'active', now(), now())
       on conflict (email) do update set
         name = coalesce(nullif(excluded.name, ''), newsletter_subscribers.name),
         source = excluded.source,
         consent = excluded.consent,
         locale = excluded.locale,
         utm_source = coalesce(nullif(excluded.utm_source, ''), newsletter_subscribers.utm_source),
         utm_campaign = coalesce(nullif(excluded.utm_campaign, ''), newsletter_subscribers.utm_campaign),
         status = 'active',
         subscribed_at = coalesce(newsletter_subscribers.subscribed_at, now()),
         updated_at = now()`,
      [email, name || null, source, consent, locale, utmSource || null, utmCampaign || null],
    )

    if (interest) {
      const subscriber = await queryDatabase<{ id: number }>(
        `select id from newsletter_subscribers where email = $1 limit 1`,
        [email],
      )
      const parentId = subscriber[0]?.id
      if (parentId) {
        await queryDatabase(
          `insert into newsletter_subscribers_interests (_order, _parent_id, id, interest)
           values (
            coalesce((select max(_order) + 1 from newsletter_subscribers_interests where _parent_id = $1), 0),
            $1,
            $2,
            $3
           )
           on conflict (id) do nothing`,
          [parentId, `${parentId}:${interest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, interest],
        )
      }
    }

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Could not save your subscription right now.' }, { status: 500 })
  }
}
