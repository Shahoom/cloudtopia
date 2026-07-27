const cacheProfile = 'max'

/**
 * Invalidate CMS caches after a content change.
 *
 * Two layers have to be busted, not one:
 *
 *  1. The DATA cache — the `unstable_cache` wrappers in lib/cms/content.ts and
 *     lib/blog/data.ts, keyed by the tags passed in here.
 *  2. The ROUTE cache — the prerendered HTML. The public site is statically
 *     rendered with `revalidate = 3600` (see app/(frontend)/[locale]/layout.tsx),
 *     so clearing only the data cache would leave editors staring at the old page
 *     for up to an hour. `revalidatePath('/', 'layout')` drops the rendered
 *     output for every route under the root layout, so the next request
 *     re-renders against the freshly-invalidated data.
 *
 * Both steps are best-effort: Payload CLI commands (migrations, seeds) run
 * outside the Next runtime, where neither cache exists.
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
  } catch {
    // Tag revalidation is unavailable outside a request scope.
  }

  try {
    cache.revalidatePath('/', 'layout')
  } catch {
    // Path revalidation needs a request scope too; the hourly ISR window is the
    // fallback, so a failure here delays the change rather than losing it.
  }
}
