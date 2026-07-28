/**
 * Single source of truth for how long CMS-backed content stays cached.
 *
 * This is a BACKSTOP, not the freshness mechanism. Content goes live the moment
 * an editor saves: the Payload afterChange hooks call revalidateCmsTags(), which
 * busts the tagged data caches AND calls revalidatePath('/', 'layout') to drop
 * the rendered HTML. Time-based revalidation only covers the case where that
 * path fails (e.g. a direct SQL / MCP import that bypasses the hooks — those can
 * force a refresh with POST /api/revalidate).
 *
 * Why 24h and not 1h: Next takes the MINIMUM revalidate across a route and its
 * data dependencies, so this value caps the ISR window of ~460 routes at once.
 * At 3600 every crawler pass over the sitemap re-rendered every page it touched,
 * once an hour — production logs showed ~16 `cache=STALE` background
 * regenerations per hour, each one a full render billed as Active CPU plus an
 * ISR write. The content behind these pages changes weekly at most.
 *
 * Keep the route-level `export const revalidate` in sync with this by importing
 * it rather than hardcoding a second number.
 */
export const CMS_REVALIDATE_SECONDS = 86400

/**
 * Feeds and the sitemap are a handful of routes rather than hundreds, and their
 * freshness feeds crawler discovery, so they revalidate far more often than page
 * HTML. Regenerating one is heavier than a page render (it walks every CMS
 * entry), but 24 of them a day is noise next to 460 pages.
 */
export const FEED_REVALIDATE_SECONDS = 3600
