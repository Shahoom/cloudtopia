import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

import { getIndustryPage } from '../lib/industries/get-industry-page.ts'
import { INDUSTRY_SLUGS } from '../lib/industries/slugs.ts'
import { canonicalUrl } from '../lib/i18n/url.ts'
import { buildSitemapEntries } from '../lib/sitemap-data.ts'

test('the sitemap excludes each registered draft world as one atomic locale pair', () => {
  const entries = buildSitemapEntries()
  const urls = new Set(entries.map((entry) => entry.url))

  for (const slug of INDUSTRY_SLUGS) {
    const resolution = getIndustryPage(slug, 'en')
    const localizedUrls = [
      canonicalUrl('en', `/industries/${slug}`),
      canonicalUrl('ar', `/industries/${slug}`),
    ]

    for (const url of localizedUrls) {
      assert.equal(
        urls.has(url),
        resolution.kind === 'legacy',
        `${slug} must be absent while its world route is draft/noindex`,
      )
    }
  }
})

test('recognized CMS industry rows cannot bypass resolver-owned sitemap eligibility', () => {
  const source = fs.readFileSync('lib/sitemap-data.ts', 'utf8')

  assert.match(source, /isResolverOwnedIndustryCmsSlug/)
  assert.match(source, /!isResolverOwnedIndustryCmsSlug\(page\.slug\)/)
})
