const cacheProfile = 'max'

/**
 * Invalidate CMS caches after a content change.
 *
 * Two layers have to be busted, not one:
 *
 *  1. The DATA cache — the `unstable_cache` wrappers in lib/cms/content.ts and
 *     lib/blog/data.ts, keyed by the tags passed in here.
 *  2. The ROUTE cache — the prerendered HTML. Pages are cached with
 *     `revalidate = false` (see lib/cms/cache-policy.ts), so clearing only the
 *     data cache would leave the old HTML in place indefinitely.
 *
 * THIS FUNCTION IS THE ONLY THING THAT MAKES AN EDIT VISIBLE. There is no
 * timer behind it any more. If `revalidatePath` stops working, the site freezes
 * on its last-built content until the next deploy — silently, unless we say so.
 * Hence: failures are logged rather than swallowed. `console.error` survives the
 * production compiler (next.config.mjs keeps `error`/`warn`), so a broken
 * invalidation shows up in the Vercel runtime logs instead of nowhere.
 *
 * Still best-effort by design: Payload CLI commands (migrations, seeds) run
 * outside the Next runtime, where neither cache exists. That case returns early
 * and is not an error.
 */
export async function revalidateCmsTags(tags: string[]) {
  let cache: typeof import('next/cache.js')
  try {
    cache = await import('next/cache.js')
  } catch {
    // Not running inside Next (Payload CLI) — nothing to revalidate.
    return
  }

  try {
    tags.forEach((tag) => cache.revalidateTag(tag, cacheProfile))
  } catch (error) {
    console.error('[revalidateCmsTags] data-cache invalidation failed', { tags, error })
  }

  try {
    cache.revalidatePath('/', 'layout')
  } catch (error) {
    console.error(
      '[revalidateCmsTags] revalidatePath failed — rendered pages are NOT refreshed. ' +
        'With revalidate=false nothing else will refresh them; run ' +
        'POST /api/revalidate or redeploy.',
      error,
    )
  }
}
