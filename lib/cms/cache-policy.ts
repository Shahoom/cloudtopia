/**
 * How long CMS-backed content stays cached.
 *
 * Freshness is ON-DEMAND, not time-based. Every Payload afterChange hook calls
 * revalidateCmsTags(), which busts the tagged data caches AND calls
 * revalidatePath('/', 'layout') to drop the rendered HTML. An editor's save is
 * live on the next request. A timer adds nothing on top of that — it only
 * re-renders pages nobody changed.
 *
 * PAGE_REVALIDATE is therefore `false` (cache until explicitly invalidated).
 *
 * Why not a timer: all ~460 routes share a deploy-synchronised expiry, so any
 * finite window makes the entire site go stale at the same moment and
 * regenerate in one wave. Production showed that directly — 38,120 ISR write
 * units on 2026-07-29, then ~17-18K/day, on a site whose content changes
 * weekly. At 3600 it was worse still (~16 `cache=STALE` regenerations an hour,
 * each a full render billed as Active CPU).
 *
 * TRADE-OFF, know this before shortening it: a content change that does NOT go
 * through a Payload save — a direct SQL insert or an MCP/bulk import — will not
 * appear until someone calls `POST /api/revalidate` (bearer CRON_SECRET) or a
 * deploy happens. That is a real workflow here, not a hypothetical; the blog
 * was imported that way. Use the endpoint after such an import.
 */
export const PAGE_REVALIDATE = false as const

/**
 * The `unstable_cache` data layer keeps a finite backstop even though pages do
 * not. The always-dynamic routes (/articles and the taxonomy pages, which read
 * searchParams) re-render per request and read straight through this cache, so
 * a backstop is what lets them self-heal if a tag invalidation is ever missed.
 * It costs nothing on statically cached pages, which only consult it when they
 * actually regenerate.
 */
export const CMS_REVALIDATE_SECONDS = 86400

/**
 * Feeds and the sitemap are a handful of routes rather than hundreds, and their
 * freshness drives crawler discovery, so they keep a short timer. Regenerating
 * one is heavier than a page render (it walks every CMS entry), but 24 a day is
 * noise next to 460 pages.
 */
export const FEED_REVALIDATE_SECONDS = 3600
