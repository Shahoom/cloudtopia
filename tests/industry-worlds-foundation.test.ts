import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { industryPageRegistry } from '../lib/industries/definitions/registry.ts'
import { getIndustryPage } from '../lib/industries/get-industry-page.ts'
import { INDUSTRY_SLUGS, isIndustrySlug, type IndustrySlug } from '../lib/industries/slugs.ts'
import { CANONICAL_SERVICE_TARGETS } from '../lib/industries/service-targets.ts'
import { PROJECT_IDS } from '../lib/industries/proof-targets.ts'
import { getIndustryManifestEntry, industryManifest } from '../lib/industries/manifest.ts'

test('industry taxonomy is closed and lightweight', () => {
  assert.deepEqual(INDUSTRY_SLUGS, [
    'healthcare', 'fintech', 'ecommerce-retail', 'real-estate', 'education',
    'travel-hospitality', 'restaurants', 'legal-firms', 'construction', 'retail',
    'professional-services', 'logistics-supply-chain', 'government-public-sector',
  ])
  assert.equal(Object.keys(industryManifest).length, 13)
  assert.equal(isIndustrySlug('healthcare'), true)
  assert.equal(isIndustrySlug('unknown-sector'), false)
  for (const slug of INDUSTRY_SLUGS) {
    const item = industryManifest[slug]
    assert.equal(item.slug, slug)
    assert.equal(item.route, `/industries/${slug}`)
    assert.ok(item.label.en && item.label.ar)
    assert.ok(item.navSummary.en && item.navSummary.ar)
    assert.ok(item.serviceIds.length >= 2 && item.serviceIds.length <= 4)
    assert.ok(item.relatedIndustryIds.length >= 2)
    assert.ok(!(item.relatedIndustryIds as readonly string[]).includes(slug))
    assert.equal(getIndustryManifestEntry(slug), item)
  }
})

test('canonical service and project IDs stay repository-backed', () => {
  assert.deepEqual(CANONICAL_SERVICE_TARGETS, {
    'digital-presence': '/services/digital-presence',
    'website-development': '/services/website-development',
    'ecommerce-development': '/services/ecommerce-development',
    'web-applications': '/services/web-applications',
    'business-systems-development': '/services/business-systems-development',
    'app-development': '/services/app-development',
    'social-media-marketing': '/services/social-media-marketing',
    'content-creation': '/services/content-creation',
    'restaurant-qr-menu': '/restaurant-qr-menu',
  })
  assert.deepEqual(PROJECT_IDS, [
    'kvaii-logistics',
    'ram-sustainable',
    'artucky-ecommerce',
    'comics-topia',
    'joory-cafe',
    'luxury-world-tourism',
    'dhofar-tourism',
  ])
})

test('the manifest remains client-safe and prose-free', () => {
  const source = fs.readFileSync('lib/industries/manifest.ts', 'utf8')
  assert.doesNotMatch(source, /server-only/)
  assert.doesNotMatch(source, /definitions\//)
  assert.doesNotMatch(source, /sections\s*:/)
})

test('the staged registry resolves three worlds and ten legacy industries in both locales', () => {
  assert.deepEqual(Object.keys(industryPageRegistry), INDUSTRY_SLUGS)
  const worldSlugs = new Set<IndustrySlug>([
    'healthcare',
    'logistics-supply-chain',
    'restaurants',
  ])
  assert.deepEqual(
    Object.entries(industryPageRegistry)
      .filter(([, definition]) => definition !== null)
      .map(([slug]) => slug)
      .sort(),
    [...worldSlugs].sort(),
  )

  let worldCount = 0
  let legacyCount = 0
  for (const slug of INDUSTRY_SLUGS) {
    for (const locale of ['en', 'ar'] as const) {
      const resolution = getIndustryPage(slug, locale)

      assert.equal(resolution.slug, slug)
      if (worldSlugs.has(slug)) {
        assert.equal(resolution.kind, 'world')
        if (resolution.kind === 'world') {
          assert.equal(resolution.definition.slug, slug)
        }
        worldCount += 1
      } else {
        assert.equal(resolution.kind, 'legacy')
        if (resolution.kind !== 'legacy') continue
        assert.equal(resolution.legacy.slug, slug)
        assert.equal(resolution.legacy.locale, locale)
        legacyCount += 1
      }
    }
  }

  assert.equal(worldCount, 6)
  assert.equal(legacyCount, 20)
  assert.throws(
    () => getIndustryPage('unknown-sector' as IndustrySlug, 'en'),
    /Unknown industry slug: unknown-sector/,
  )
})
