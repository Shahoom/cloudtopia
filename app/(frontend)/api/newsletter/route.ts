import { NextRequest } from 'next/server'
import { getPayloadClient, isPayloadConfigured } from '@/lib/cms/payload'

export const runtime = 'nodejs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  if (!isPayloadConfigured()) {
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
  const locale = ['en', 'ar'].includes(String(body.locale)) ? String(body.locale) : 'en'
  const consent = body.consent !== false
  const utmSource = String(body.utmSource || '').trim()
  const utmCampaign = String(body.utmCampaign || '').trim()

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  try {
    const payload = await getPayloadClient()

    // Upsert by email: subscribers carry a unique email constraint, so we look
    // up an existing record first and update it, otherwise create a new one.
    // Routing through Payload keeps interests array ids Payload-managed instead
    // of hand-built `${parentId}:${slug}` strings that drift across migrations.
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const current = existing.docs[0]

    if (current) {
      // Merge the new interest with any already stored, de-duplicated.
      const existingInterests = Array.isArray(current.interests)
        ? current.interests
            .map((i) => (typeof i === 'object' && i ? String(i.interest || '') : ''))
            .filter(Boolean)
        : []
      const mergedInterests = interest && !existingInterests.includes(interest)
        ? [...existingInterests, interest]
        : existingInterests

      await payload.update({
        collection: 'newsletter-subscribers',
        id: current.id,
        data: {
          name: name || current.name || undefined,
          source,
          consent,
          locale: locale as 'en' | 'ar',
          utmSource: utmSource || current.utmSource || undefined,
          utmCampaign: utmCampaign || current.utmCampaign || undefined,
          status: 'active',
          interests: mergedInterests.map((value) => ({ interest: value })),
        },
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: {
          email,
          name: name || undefined,
          source,
          consent,
          locale: locale as 'en' | 'ar',
          utmSource: utmSource || undefined,
          utmCampaign: utmCampaign || undefined,
          status: 'active',
          interests: interest ? [{ interest }] : [],
          subscribedAt: new Date().toISOString(),
        },
        overrideAccess: true,
      })
    }

    return Response.json({ ok: true })
  } catch (err) {
    // Log unconditionally so a missing table / schema drift cannot silently fail.
    console.error('[newsletter] Payload save failed', err)
    return Response.json({ error: 'Could not save your subscription right now.' }, { status: 500 })
  }
}
