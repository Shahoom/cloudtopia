import type { PayloadRequest } from 'payload'
import { isDatabaseConfigured, queryDatabase } from './db.ts'

/**
 * POST /api/blog-view  { id }
 *
 * Lightweight, public view counter for articles. Increments
 * `blog_posts.views_count` with a direct SQL UPDATE — NOT through payload.update
 * — so it doesn't fire the afterChange revalidation hook (which would thrash the
 * cms-blog cache on every page view). The displayed count is read via the cached
 * data layer, so it refreshes within CMS_REVALIDATE_SECONDS (60s).
 *
 * The browser beacon (ArticleViewBeacon) dedups per session, so this is roughly
 * one increment per visitor per article. Best-effort: never throws to the page.
 */
export async function handleBlogViewEndpoint(req: PayloadRequest): Promise<Response> {
  let rawId: unknown
  const data = req.data as Record<string, unknown> | undefined
  if (data && data.id != null) rawId = data.id
  if (rawId == null) {
    try {
      const text = await req.text?.()
      if (text) rawId = JSON.parse(text)?.id
    } catch {
      /* ignore */
    }
  }

  const id = Number(rawId)
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ error: 'Invalid post id.' }, { status: 400 })
  }
  if (!isDatabaseConfigured()) return Response.json({ ok: false })

  try {
    await queryDatabase('update blog_posts set views_count = coalesce(views_count, 0) + 1 where id = $1', [id])
  } catch {
    // View tracking must never break the article page.
  }
  return Response.json({ ok: true })
}
