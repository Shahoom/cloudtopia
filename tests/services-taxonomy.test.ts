import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { digitalPresenceGroups, digitalPresencePillars } from '../lib/services/digital-presence'
import { dpSubServiceContent, getDigitalPresenceSubServicesByPillar } from '../lib/services/digital-presence-content'
import {
  resolveCanonicalRedirect,
  WEBSITE_FAMILY_REDIRECTS,
} from '../lib/seo/canonical-redirects'

const websiteFamilyOrphans = [
  'website-redesign',
  'corporate-website-design',
  'landing-page-design',
  'portfolio-websites',
  'educational-website-development',
  'restaurant-website-development',
  'website-maintenance',
  'ecommerce-website-development',
]

const dpSlugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

test('deleted pillars are gone', () => {
  const slugs = digitalPresencePillars.map((p) => p.slug)
  for (const dead of ['local-seo-discoverability', 'customer-support-automations', 'customer-experience-portals', 'review-reputation-management', 'analytics-performance-reporting']) {
    assert.ok(!slugs.includes(dead), `pillar ${dead} should be deleted`)
  }
})

test('groups are the expected three + journey order', () => {
  const groupSlugs = digitalPresenceGroups.map((g) => g.slug)
  assert.deepEqual(groupSlugs, ['core-foundation', 'visibility-discoverability', 'communication-engagement'])
})

test('Growth & Engagement rename applied', () => {
  const g = digitalPresenceGroups.find((x) => x.slug === 'communication-engagement')!
  assert.equal(g.name.en, 'Growth & Engagement')
  assert.ok(g.pillars.some((p) => p.slug === 'social-media-management'))
  assert.ok(g.pillars.some((p) => p.slug === 'content-marketing-authority'))
})

test('AEO & GEO exist with no sub-services', () => {
  for (const slug of ['answer-engine-optimization', 'generative-engine-optimization']) {
    const p = digitalPresencePillars.find((x) => x.slug === slug)
    assert.ok(p, `${slug} pillar must exist`)
    assert.equal(p!.subServices.length, 0, `${slug} must have no sub-services`)
  }
})

test('every kept DP sub-service has generated content (no dangling names)', () => {
  for (const pillar of digitalPresencePillars) {
    for (const name of pillar.subServices) {
      const slug = dpSlugify(name)
      assert.ok(dpSubServiceContent[slug], `missing content for "${name}" (${slug}) in pillar ${pillar.slug}`)
      assert.equal(dpSubServiceContent[slug].pillarSlug, pillar.slug, `${slug} content.pillarSlug should be ${pillar.slug}`)
    }
  }
})

test('no orphan content points at a deleted/unknown pillar', () => {
  const known = new Set(digitalPresencePillars.map((p) => p.slug))
  for (const s of Object.values(dpSubServiceContent)) {
    assert.ok(known.has(s.pillarSlug), `content ${s.slug} references unknown pillar ${s.pillarSlug}`)
  }
})

test('business systems hub is canonical under the services namespace', async () => {
  const { categoryStandaloneRoutes, featuredPages } = await import('../lib/seo/services.ts')
  const headerSource = readFileSync(path.join(process.cwd(), 'components/Header.tsx'), 'utf8')
  const servicesPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/ServicesPageClient.tsx'), 'utf8')
  const llmsSource = readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')

  assert.equal(categoryStandaloneRoutes['business-systems-development'], '/services/business-systems-development')
  assert.ok(featuredPages.some((page) => page.title.en === 'Business Systems' && page.href === '/services/business-systems-development'))
  assert.match(headerSource, /hub: '\/services\/business-systems-development'/)
  assert.match(servicesPageSource, /href: '\/services\/business-systems-development'/)
  assert.match(llmsSource, /Business Systems Development — https:\/\/cloudtopia\.net\/services\/business-systems-development/)
  assert.doesNotMatch(llmsSource, /https:\/\/cloudtopia\.net\/business-systems-development\b/)
  assert.equal(existsSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/business-systems-development/page.tsx')), true)
  assert.equal(existsSync(path.join(process.cwd(), 'app/(frontend)/[locale]/business-systems-development/page.tsx')), false)
})

test('website-family duplicate slugs are redirect-only and excluded from crawler inventories', () => {
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')
  const llmsSource = readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')
  const pricingSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/pricing/page.tsx'), 'utf8')
  const aboutSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/about/layout.tsx'), 'utf8')

  for (const slug of websiteFamilyOrphans) {
    assert.equal(
      resolveCanonicalRedirect(`/services/${slug}`)?.pathname,
      WEBSITE_FAMILY_REDIRECTS[slug],
      `${slug} should resolve directly to its canonical service`,
    )
    assert.equal(
      resolveCanonicalRedirect(`/ar/services/${slug}`)?.pathname,
      `/ar${WEBSITE_FAMILY_REDIRECTS[slug]}`,
      `${slug} should preserve the Arabic canonical prefix`,
    )
    assert.match(sitemapSource, new RegExp(`websiteFamilyOrphanSet[\\s\\S]*['"]${slug}['"]`), `${slug} should be excluded from sitemap generation`)
    assert.doesNotMatch(llmsSource, new RegExp(`https://cloudtopia\\.net/services/${slug}\\b`), `${slug} should not be listed as an indexable LLMS service URL`)
    assert.doesNotMatch(pricingSource, new RegExp(`/services/${slug}\\b`), `${slug} should not be linked from pricing`)
    assert.doesNotMatch(aboutSource, new RegExp(`/services/${slug}\\b`), `${slug} should not be linked from about schema`)
  }
})

test('nested service pages emit structured data for their canonical nested URLs', () => {
  const webAppPillarSource = readFileSync(path.join(process.cwd(), 'components/services/WebAppPillarPage.tsx'), 'utf8')
  const serviceRouteSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/[service]/page.tsx'), 'utf8')
  const servicesLayoutSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/layout.tsx'), 'utf8')

  assert.match(webAppPillarSource, /const schemaPath = `\/services\/web-applications\/\$\{slug\}`/)
  assert.doesNotMatch(webAppPillarSource, /const schemaPath = `\/services\/\$\{slug\}`/)
  assert.match(serviceRouteSource, /const pPath = pillar\.href/)
  assert.doesNotMatch(serviceRouteSource, /const pPath = `\/services\/\$\{pillar\.slug\}`/)
  assert.match(serviceRouteSource, /const canonicalServicePath = isAppDevSub \? path : `\/services\/\$\{service\.slug\}`/)
  assert.match(serviceRouteSource, /url: canonicalUrl\(locale, canonicalServicePath\)/)
  assert.doesNotMatch(serviceRouteSource, /url: canonicalUrl\(locale, `\/services\/\$\{service\.slug\}`\)/)
  assert.match(servicesLayoutSource, /categoryFrontDoor/)
  assert.doesNotMatch(servicesLayoutSource, /#\$\{id\}/)
})

test('structured service card inventories match their localized content sources', async () => {
  const { businessSystemsGroups } = await import('../lib/services/business-systems.ts')
  const { businessSystemsSubServiceSlugs } = await import('../lib/services/business-systems-content.ts')
  const { webApplicationsGroups, webAppPillarSubServices } = await import('../lib/services/web-applications.ts')
  const servicesGridSource = readFileSync(path.join(process.cwd(), 'components/home/ServicesGrid.tsx'), 'utf8')
  const servicesPageSource = readFileSync(path.join(process.cwd(), 'app/(frontend)/[locale]/services/ServicesPageClient.tsx'), 'utf8')

  const businessCatalogSubCount = businessSystemsGroups.flatMap((group) => group.pillars).reduce((count, pillar) => count + pillar.subServices.length, 0)
  assert.equal(businessCatalogSubCount, businessSystemsSubServiceSlugs.length)

  for (const pillar of webApplicationsGroups.flatMap((group) => group.pillars)) {
    assert.equal(pillar.subServices.length, webAppPillarSubServices[pillar.slug]?.length ?? 0, `${pillar.slug} catalog count should match bilingual cards`)
  }

  assert.doesNotMatch(servicesGridSource, /_LEGACY_TABS/)
  assert.doesNotMatch(servicesPageSource, /const webApplicationsServices/)
  assert.doesNotMatch(servicesPageSource, /const mobileAppServices/)
})
