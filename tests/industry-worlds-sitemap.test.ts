import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

import { getIndustryPage } from '../lib/industries/get-industry-page.ts'
import { INDUSTRY_SLUGS } from '../lib/industries/slugs.ts'
import { canonicalUrl } from '../lib/i18n/url.ts'
import { buildSitemapEntries } from '../lib/sitemap-data.ts'

test('the sitemap publishes each published world as one bilingual pair and excludes draft worlds', () => {
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
        resolution.kind === 'legacy' ||
          (resolution.kind === 'world' &&
            resolution.definition.publicationStatus === 'published'),
        `${slug} must match its publication status`,
      )
    }
  }

  const healthcareEntries = entries.filter((entry) =>
    entry.url.endsWith('/industries/healthcare'),
  )
  assert.equal(healthcareEntries.length, 2)
  for (const entry of healthcareEntries) {
    assert.deepEqual(entry.alternates?.languages, {
      en: 'https://cloudtopia.net/industries/healthcare',
      ar: 'https://cloudtopia.net/ar/industries/healthcare',
      'x-default': 'https://cloudtopia.net/industries/healthcare',
    })
    assert.deepEqual(entry.images, [
      entry.url.includes('/ar/')
        ? 'https://cloudtopia.net/og/industries/healthcare/ar.jpg'
        : 'https://cloudtopia.net/og/industries/healthcare/en.jpg',
    ])
    assert.equal(new Date(entry.lastModified as string).toISOString().slice(0, 10), '2026-07-16')
  }
})

test('recognized CMS industry rows cannot bypass resolver-owned sitemap eligibility', () => {
  const source = fs.readFileSync('lib/sitemap-data.ts', 'utf8')

  assert.match(source, /isResolverOwnedIndustryCmsSlug/)
  assert.match(source, /!isResolverOwnedIndustryCmsSlug\(page\.slug\)/)
})
