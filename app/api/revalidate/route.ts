import type { NextRequest } from 'next/server'
import { revalidateCmsTags } from '@/lib/cms/revalidate'

/**
 * On-demand cache revalidation for CMS content.
 *
 * Payload admin saves and the /api/bulk-import route already revalidate the
 * `cms-blog` tag through the collection afterChange hooks. This endpoint exists
 * for the one path that bypasses those hooks: writing rows straight into
 * Supabase (bulk SQL / MCP imports). After such an import, POST here so the
 * blog caches (posts, categories, tags, sitemap — all tagged `cms-blog`) pick
 * up the new rows instead of serving a stale snapshot.
 *
 *   curl -X POST https://cloudtopia.net/api/revalidate \
 *        -H "Authorization: Bearer $CRON_SECRET"
 *
 * Optional `?tags=cms-blog,other` overrides the default tag set.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEFAULT_TAGS = ['cms-blog']

// Prod fails CLOSED — require the same bearer Vercel injects for crons. Dev is
// open so a local import script can refresh the running server's cache without
// wiring a secret into every developer's environment.
function authorized(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  const secret = process.env.CRON_SECRET
  return Boolean(secret) && req.headers.get('authorization') === `Bearer ${secret}`
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const tagParam = new URL(req.url).searchParams.get('tags')
  const tags = tagParam
    ? tagParam.split(',').map((t) => t.trim()).filter(Boolean)
    : DEFAULT_TAGS

  await revalidateCmsTags(tags)

  return Response.json({ revalidated: true, tags })
}

export const POST = handle
export const GET = handle
