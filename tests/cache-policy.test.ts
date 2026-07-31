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

test('the data cache does not silently cap the page cache', () => {
  // Next takes the MINIMUM revalidate across a route and everything it reads.
  // A finite CMS_REVALIDATE_SECONDS therefore overrides `revalidate = false` on
  // every page that touches CMS data. This exact mismatch shipped once: pages
  // said false, the data layer said 86400, and the built route table read
  // "Revalidate: 1d" across all ~450 routes — the daily regeneration wave fully
  // intact while the config claimed otherwise.
  if (PAGE_REVALIDATE === false) {
    assert.equal(
      CMS_REVALIDATE_SECONDS,
      false,
      'pages are set to cache indefinitely, so the unstable_cache layer must be too — ' +
        'otherwise it caps every page at its own window',
    )
  } else {
    assert.ok(
      CMS_REVALIDATE_SECONDS === false || CMS_REVALIDATE_SECONDS >= PAGE_REVALIDATE,
      'the data cache must not be shorter than the page cache it feeds',
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

test('no short timer reintroduces crawler-driven regeneration', () => {
  // History: at 3600 production logged ~16 `cache=STALE` background
  // regenerations an hour — a crawler pass over the ~460-route sitemap
  // re-rendered every page it touched. At 86400 it became one full-site wave a
  // day (38,120 ISR write units on 2026-07-29). Freshness comes from
  // revalidateCmsTags(), so any timer here is pure cost.
  const shortest = [PAGE_REVALIDATE, CMS_REVALIDATE_SECONDS].filter(
    (v): v is number => typeof v === 'number',
  )
  for (const seconds of shortest) {
    assert.ok(
      seconds >= 86400,
      `a ${seconds}s window re-renders the whole site every ${Math.round(seconds / 3600)}h`,
    )
  }
})
