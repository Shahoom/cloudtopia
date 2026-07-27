import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { servicesBySlug } from '../lib/seo/services'
import { buildServiceDocumentTitle } from '../lib/seo/service-metadata'
import {
  WEBAPP_LEGACY_REDIRECTS,
  WEBSITE_FAMILY_REDIRECTS,
} from '../lib/seo/canonical-redirects'
import { businessSystemsSeoFallback } from '../app/(frontend)/[locale]/services/business-systems-development/seo-fallback'
import { webApplicationsSeoFallback } from '../app/(frontend)/[locale]/services/web-applications/seo-fallback'
import {
  ecommerceSolutionsSeoFallback,
  websiteDesignSeoFallback,
} from '../lib/services/service-page-seo-fallbacks'

const redirectOnlySlugs = new Set([
  ...Object.keys(WEBAPP_LEGACY_REDIRECTS),
  ...Object.keys(WEBSITE_FAMILY_REDIRECTS),
])

test('every flat English service receives a descriptive SERP title', () => {
  for (const service of Object.values(servicesBySlug)) {
    if (redirectOnlySlugs.has(service.slug)) continue
    const title = buildServiceDocumentTitle(service.name.en, service.slug, 'en')
    assert.ok(title.length >= 30, `${service.slug} title should be descriptive: ${title}`)
    assert.ok(title.length <= 52, `${service.slug} title should leave room for the brand suffix: ${title}`)
  }
})

test('known short service names use intent-specific title overrides', () => {
  const expected = {
    'ai-automation': 'AI Automation Solutions for Business',
    'ai-chatbots': 'AI Chatbot Development for Business',
    'cloud-migration': 'Cloud Migration Services for Business',
    'database-setup': 'Database Setup Services for Business',
    'devops-support': 'DevOps Support Services for Business',
  }

  for (const [slug, title] of Object.entries(expected)) {
    assert.equal(buildServiceDocumentTitle(servicesBySlug[slug].name.en, slug, 'en'), title)
  }
})

test('legacy main service pages bypass structured-pillar metadata', () => {
  const servicePageSource = readFileSync(
    path.join(process.cwd(), 'app/(frontend)/[locale]/services/[service]/page.tsx'),
    'utf8',
  )

  assert.match(
    servicePageSource,
    /if \(pillar && !legacyMainPagePillarSlugs\.has\(serviceSlug\)\) \{[\s\S]*?const seoOverride/,
  )
})

test('Arabic service titles retain the localized business qualifier', () => {
  assert.equal(
    buildServiceDocumentTitle('الترحيل إلى السحابة', 'cloud-migration', 'ar'),
    'الترحيل إلى السحابة للشركات',
  )
})

test('Clutch wording is neutral and Organization schema links authoritative profiles', () => {
  const testimonialsSource = readFileSync(
    path.join(process.cwd(), 'components/home/Testimonials.tsx'),
    'utf8',
  )
  const layoutSource = readFileSync(
    path.join(process.cwd(), 'app/(frontend)/[locale]/layout.tsx'),
    'utf8',
  )

  assert.match(testimonialsSource, /View our Clutch profile/)
  assert.match(testimonialsSource, /ملفنا على Clutch/)
  assert.doesNotMatch(testimonialsSource, /Verified reviews on Clutch|تقييمات موثّقة على Clutch/)
  assert.match(layoutSource, /https:\/\/clutch\.co\/profile\/cloudtopia-0/)
  assert.match(layoutSource, /https:\/\/www\.goodfirms\.co\/company\/cloudtopia/)
})

test('flagship service descriptions use the available search snippet space', () => {
  const fallbacks = [
    businessSystemsSeoFallback,
    ecommerceSolutionsSeoFallback,
    webApplicationsSeoFallback,
    websiteDesignSeoFallback,
  ]

  for (const fallback of fallbacks) {
    for (const locale of ['en', 'ar']) {
      const description = fallback.descriptions[locale]
      assert.ok(description.length >= 120, `${locale} description is too short: ${description}`)
      assert.ok(description.length <= 170, `${locale} description is too long: ${description}`)
    }
  }
})

test('audited long-tail services have useful English meta descriptions', () => {
  const slugs = [
    'e-commerce-redesign-and-migration',
    'graphic-design-for-social-media',
    'influencer-outreach-and-management',
    'linkedin-b2b-personal-branding',
    'short-form-video-editing',
    'social-media-analytics-and-reporting',
    'social-media-copywriting',
  ]

  for (const slug of slugs) {
    const source = JSON.parse(
      readFileSync(path.join(process.cwd(), `lib/services/dp-subs/${slug}.json`), 'utf8'),
    ) as { seo: { description: string } }
    assert.ok(source.seo.description.length >= 120, `${slug} description is too short`)
    assert.ok(source.seo.description.length <= 170, `${slug} description is too long`)
  }
})
