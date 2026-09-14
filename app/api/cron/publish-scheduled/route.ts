import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Cron-triggered scheduled publishing for articles.
 *
 * The public site filters on the custom `status` field, not Payload's
 * `_status`, so Payload's built-in schedulePublish (which only flips
 * `_status`) would never make an article visible. This publishes every
 * article whose status is "scheduled" and whose `scheduledAt` has passed,
 * through the Local API so the collection hooks still revalidate the blog
 * cache. Wired to a daily Vercel Cron in vercel.json; Vercel sends
 * `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(req: Request) {
  // Fail closed, same as the IndexNow cron: an unset secret is never "open".
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const now = new Date().toISOString()
  const due = await payload.find({
    collection: 'blog-posts' as any,
    where: { and: [{ status: { equals: 'scheduled' } }, { scheduledAt: { less_than_equal: now } }] },
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })

  const published: Array<{ id: number | string; slug: string; locale: string }> = []
  const failed: Array<{ id: number | string; error: string }> = []

  for (const doc of due.docs as any[]) {
    try {
      await payload.update({
        collection: 'blog-posts' as any,
        id: doc.id,
        data: { status: 'published', _status: 'published', publishedAt: doc.scheduledAt || now } as any,
        draft: false,
        overrideAccess: true,
        // Both locales are scheduled as separate documents; don't let the
        // pair hook create or rewrite a sibling from here.
        context: { skipBlogPairSync: true, skipCoverMirror: true, skipAutoTranslate: true },
      })
      published.push({ id: doc.id, slug: doc.slug, locale: doc.locale })
    } catch (error) {
      failed.push({ id: doc.id, error: error instanceof Error ? error.message : String(error) })
    }
  }

  return Response.json({ checkedAt: now, due: due.docs.length, published, failed }, { status: failed.length ? 207 : 200 })
}
