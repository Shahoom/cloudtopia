import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
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
  'logistics-supply-chain',
  'government-public-sector',
]

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

test('sitemap includes localized location and industry landing pages', () => {
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  assert.match(sitemapSource, /countryLandingPages/, 'Country pages should be data-driven in the sitemap')
  assert.match(sitemapSource, /industrySlugs/, 'Industry pages should be data-driven in the sitemap')
  assert.match(sitemapSource, /\/industries\/\$\{industry\}/, 'Industry URLs should be generated for each localized sitemap')
  assert.doesNotMatch(sitemapSource, /\/locations\/\$\{country\}/, 'Legacy location country URLs should not be generated')
})

test('phase 2 and 3 landing page templates surface the expanded SEO content', () => {
  const industryIndexPath = path.join(process.cwd(), 'app/(frontend)/[locale]/industries/page.tsx')
  const industryPagePath = path.join(process.cwd(), 'app/(frontend)/[locale]/industries/[industry]/page.tsx')
  const marketsIndexPath = path.join(process.cwd(), 'app/(country-landing)/[locale]/markets/page.tsx')
  const countryPagePath = path.join(process.cwd(), 'app/(country-landing)/[locale]/[country]/page.tsx')

  assert.equal(existsSync(industryIndexPath), true, 'Industry hub route should exist')
  assert.equal(existsSync(industryPagePath), true, 'Industry landing page route should exist')
  assert.equal(existsSync(marketsIndexPath), true, 'Markets hub route should exist')

  const industryIndexSource = readFileSync(industryIndexPath, 'utf8')
  const industryPageSource = readFileSync(industryPagePath, 'utf8')
  const marketsIndexSource = readFileSync(marketsIndexPath, 'utf8')
  const countryPageSource = readFileSync(countryPagePath, 'utf8')

  assert.match(industryIndexSource, /answerTitle/, 'Industry hub should include an answer-engine summary block')
  assert.match(industryIndexSource, /proofItems/, 'Industry hub should surface enterprise proof points')
  assert.match(industryIndexSource, /serviceLinks/, 'Industry hub cards should expose relevant services')
  assert.match(industryPageSource, /getIndustry/, 'Industry route should read from industry SEO data')
  assert.match(industryPageSource, /serviceLinks/, 'Industry route should render related service links')
  assert.match(marketsIndexSource, /ItemList/, 'Markets hub should emit ItemList schema')
  assert.match(marketsIndexSource, /countryLandingPages/, 'Markets hub should render country landing data')
  assert.match(countryPageSource, /getCountryLandingPage/, 'Country route should read from country landing data')
  assert.match(countryPageSource, /hreflangEnglish/, 'Country route should emit regional hreflang alternates')
})
