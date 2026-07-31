import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { CMS_REVALIDATE_SECONDS, FEED_REVALIDATE_SECONDS, PAGE_REVALIDATE } from '../lib/cms/cache-policy.ts'

/**
 * Next requires `export const revalidate` to be a statically analysable literal
 * — importing the shared constant fails the build with "Invalid segment
 * configuration export detected". So each route hardcodes the value and this
 * test is what keeps them honest.
 */
const readRevalidate = (relativePath: string): number | false => {
  const source = readFileSync(path.join(process.cwd(), relativePath), 'utf8')
  const match = source.match(/^export const revalidate = (\d+|false)$/m)
  assert.ok(match, `${relativePath} should export a literal revalidate`)
  return match![1] === 'false' ? false : Number(match![1])
}

test('page routes are cached until explicitly invalidated', () => {
  const pageRoutes = [
    'app/(frontend)/[locale]/layout.tsx',
    'app/(country-landing)/[locale]/layout.tsx',
    'app/(frontend)/[locale]/articles/[slug]/page.tsx',
    'app/(frontend)/[locale]/projects/[slug]/page.tsx',
  ]

  for (const route of pageRoutes) {
    assert.equal(
      readRevalidate(route),
      PAGE_REVALIDATE,
      `${route} drifted from PAGE_REVALIDATE in lib/cms/cache-policy.ts`,
    )
  }
})

test('on-demand invalidation is wired, since nothing else refreshes pages', () => {
  // With PAGE_REVALIDATE === false this is the ONLY thing that makes an edit
  // visible. If revalidatePath ever disappears from revalidateCmsTags, the site
  // silently freezes until the next deploy — so assert it stays.
  const source = readFileSync(path.join(process.cwd(), 'lib/cms/revalidate.ts'), 'utf8')
  assert.match(source, /revalidatePath\(\s*['"]\/['"]\s*,\s*['"]layout['"]\s*\)/)
  assert.match(source, /revalidateTag\(/)
})

test('feeds revalidate on the shared feed policy', () => {
  for (const route of ['app/sitemap.xml/route.ts', 'app/(frontend)/[locale]/articles/rss.xml/route.ts']) {
    assert.equal(
      readRevalidate(route),
      FEED_REVALIDATE_SECONDS,
      `${route} drifted from FEED_REVALIDATE_SECONDS in lib/cms/cache-policy.ts`,
    )
  }
})

test('page revalidate is long enough that crawlers do not re-render the site hourly', () => {
  // At 3600 production logged ~16 `cache=STALE` background regenerations an
  // hour: a crawler pass over the ~460-route sitemap re-rendered every page it
  // touched. Freshness comes from revalidateCmsTags(), so this is only a
  // backstop and has no reason to be short.
  assert.ok(
    CMS_REVALIDATE_SECONDS >= 86400,
    `CMS_REVALIDATE_SECONDS is ${CMS_REVALIDATE_SECONDS}s — anything under a day reintroduces crawler-driven regeneration`,
  )
})
