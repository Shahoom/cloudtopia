import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import type { IndustrySlug } from '../lib/industries/slugs.ts'
import { locations, locationSlugs } from '../lib/seo/locations.ts'

const targetLocationSlugs = [
  'saudi-arabia',
  'uae',
  'qatar',
  'oman',
  'kuwait',
  'bahrain',
  'iraq',
  'syria',
  'jordan',
  'egypt',
  'lebanon',
]

const targetIndustrySlugs = [
  'healthcare',
  'fintech',
  'ecommerce-retail',
  'real-estate',
  'education',
  'travel-hospitality',
  'restaurants',
  'legal-firms',
  'construction',
  'retail',
  'professional-services',
  'logistics-supply-chain',
  'government-public-sector',
] as const satisfies readonly IndustrySlug[]

test('regional SEO locations cover the target Arabic-speaking markets with keyword data', () => {
  assert.deepEqual([...locationSlugs].sort(), [...targetLocationSlugs].sort())

  for (const slug of targetLocationSlugs) {
    const location = locations[slug]

    assert.equal(location.slug, slug)
    assert.ok(location.cities.length >= 4, `${slug} should include major cities`)
    assert.ok(location.services.length >= 4, `${slug} should include priority services`)
    assert.ok(location.paymentMethods.length >= 3, `${slug} should include payment methods`)
    assert.ok(location.seoKeywords.length >= 4, `${slug} should include SEO keywords`)
    assert.ok(location.marketNotes.en.length > 40, `${slug} should include an English market note`)
    assert.ok(location.marketNotes.ar.length > 20, `${slug} should include an Arabic market note`)
    assert.equal('tr' in location.marketNotes, false, `${slug} should not include Turkish market notes`)
    assert.equal('nameTr' in location, false, `${slug} should not include Turkish country names`)
  }
})

test('industry SEO data covers enterprise target verticals with routable content', async () => {
  const { industries, industrySlugs } = await import('../lib/seo/industries.ts')

  assert.deepEqual([...industrySlugs].sort(), [...targetIndustrySlugs].sort())

  for (const slug of targetIndustrySlugs) {
    const industry = industries[slug]

    assert.equal(industry.slug, slug)
    assert.ok(industry.name.en.length > 3, `${slug} should include English label`)
    assert.ok(industry.name.ar.length > 3, `${slug} should include Arabic label`)
    assert.equal('tr' in industry.name, false, `${slug} should not include Turkish label`)
    assert.ok(industry.problems.length >= 3, `${slug} should include buyer problems`)
    assert.ok(industry.useCases.length >= 4, `${slug} should include use cases`)
    assert.ok(industry.serviceLinks.length >= 3, `${slug} should include service links`)
    assert.ok(industry.faqs.length >= 2, `${slug} should include FAQs`)
  }
})

test('sitemap includes locations and routes industries through publication eligibility', () => {
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  assert.match(sitemapSource, /countryLandingPages/, 'Country pages should be data-driven in the sitemap')
  assert.match(sitemapSource, /buildBaseIndustrySitemapEntries/, 'Industry pages should use resolver-owned sitemap eligibility')
  assert.match(sitemapSource, /isResolverOwnedIndustryCmsSlug/, 'CMS industry rows must not bypass resolver-owned eligibility')
  assert.doesNotMatch(sitemapSource, /\/locations\/\$\{country\}/, 'Legacy location country URLs should not be generated')
})

test('phase 2 and 3 landing page templates surface the expanded SEO content', () => {
  const industryIndexPath = path.join(process.cwd(), 'app/(frontend)/[locale]/industries/page.tsx')
  const industryPagePath = path.join(process.cwd(), 'app/(frontend)/[locale]/industries/[industry]/page.tsx')
  const industryContentPath = path.join(process.cwd(), 'lib/seo/industries-page.ts')
  const industryCardsPath = path.join(process.cwd(), 'components/industries/IndustriesIndex.tsx')
  const marketsIndexPath = path.join(process.cwd(), 'app/(country-landing)/[locale]/markets/page.tsx')
  const countryPagePath = path.join(process.cwd(), 'app/(country-landing)/[locale]/[country]/page.tsx')

  assert.equal(existsSync(industryIndexPath), true, 'Industry hub route should exist')
  assert.equal(existsSync(industryPagePath), true, 'Industry landing page route should exist')
  assert.equal(existsSync(marketsIndexPath), true, 'Markets hub route should exist')

  const industryIndexSource = readFileSync(industryIndexPath, 'utf8')
  const industryPageSource = readFileSync(industryPagePath, 'utf8')
  const industryContentSource = readFileSync(industryContentPath, 'utf8')
  const industryCardsSource = readFileSync(industryCardsPath, 'utf8')
  const marketsIndexSource = readFileSync(marketsIndexPath, 'utf8')
  const countryPageSource = readFileSync(countryPagePath, 'utf8')

  assert.match(industryIndexSource, /FAQPage/, 'Industry hub should emit visible answer-engine FAQ schema')
  assert.match(industryIndexSource, /content\.proof/, 'Industry hub should surface enterprise proof points')
  assert.match(industryContentSource, /guideIntro/, 'Industry hub should include an answer-first transformation guide')
  assert.match(industryCardsSource, /serviceLinks/, 'Industry hub index should expose relevant services')
  assert.match(industryPageSource, /getIndustryPage/, 'Industry route should use the closed world resolver')
  assert.match(industryPageSource, /IndustryPageShell/, 'Industry route should render registered world pages')
  assert.match(industryPageSource, /buildIndustryMetadata/, 'Industry route should use centralized metadata')
  assert.match(industryPageSource, /buildIndustryJsonLd/, 'Industry route should use connected industry schema')
  assert.match(industryPageSource, /export const dynamicParams = false/, 'Industry route should close dynamic slugs')
  assert.doesNotMatch(industryPageSource, /industryFeatures|marketLinks/, 'Industry route should not own generic page-copy arrays')
  assert.match(marketsIndexSource, /ItemList/, 'Markets hub should emit ItemList schema')
  assert.match(marketsIndexSource, /BreadcrumbList/, 'Markets hub should emit breadcrumb schema')
  assert.match(marketsIndexSource, /countryLandingPages/, 'Markets hub should render country landing data')
  assert.match(countryPageSource, /getCountryLandingPage/, 'Country route should read from country landing data')
  assert.match(countryPageSource, /hreflangEnglish/, 'Country route should emit regional hreflang alternates')
})
