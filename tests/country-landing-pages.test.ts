import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import {
  countryLandingPages,
  countryLandingSlugs,
  getCountryLandingPage,
  getCountryLandingPageByCode,
} from '../lib/seo/country-landing-pages.ts'
import { countryRedirects } from '../lib/seo/country-redirects.ts'

const expectedSlugs = [
  'saudi-arabia',
  'united-arab-emirates',
  'oman',
  'qatar',
  'kuwait',
  'bahrain',
  'iraq',
  'turkey',
  'syria',
  'jordan',
  'egypt',
  'lebanon',
]

test('country landing page data exposes bilingual canonical URL pairs', () => {
  assert.deepEqual(countryLandingSlugs, expectedSlugs)

  for (const slug of expectedSlugs) {
    const country = getCountryLandingPage(slug)
    assert.ok(country, `${slug} should resolve`)
    assert.equal(country.slug, slug)
    assert.equal(country.englishUrl, `/${slug}`)
    assert.equal(country.arabicUrl, `/ar/${slug}`)
    assert.match(country.hreflangArabic, /^ar-[A-Z]{2}$/)
    assert.match(country.hreflangEnglish, /^en-[A-Z]{2}$/)
    assert.ok(country.content.ar.heroSubtitle.includes(country.countryNameArabic))
    assert.ok(country.content.en.heroSubtitle.includes(country.countryNameEnglish))
    assert.ok(country.faqs.ar.length >= 6)
    assert.ok(country.faqs.en.length >= 6)
    assert.equal(country.testimonials.length, 3)
    assert.ok(country.testimonials.every((item) => item.roleArabic.includes(country.countryNameArabic)))
    assert.ok(country.testimonials.every((item) => item.quoteArabic.length > 40))
    assert.match(country.theme.surface, /^#[0-9A-F]{6}$/i)
    assert.match(country.theme.softAccent, /^#[0-9A-F]{6}$/i)
    assert.match(country.theme.ink, /^#[0-9A-F]{6}$/i)
    assert.match(country.theme.photo.src, /^https:\/\/upload\.wikimedia\.org\//)
    assert.ok(country.theme.photo.altArabic.includes(country.countryNameArabic) || country.theme.photo.captionArabic.includes(country.countryNameArabic))
    assert.ok(country.theme.photo.altEnglish.includes(country.countryNameEnglish) || country.theme.photo.captionEnglish.includes(country.countryNameEnglish))
  }

  assert.equal(getCountryLandingPageByCode('sa')?.slug, 'saudi-arabia')
  assert.equal(getCountryLandingPageByCode('ae')?.slug, 'united-arab-emirates')
})

test('country redirects collapse duplicate country and location URLs', () => {
  assert.equal(countryRedirects['/ar/locations/saudi-arabia'], '/ar/saudi-arabia')
  assert.equal(countryRedirects['/locations/saudi-arabia'], '/saudi-arabia')
  assert.equal(countryRedirects['/ar/locations/uae'], '/ar/united-arab-emirates')
  assert.equal(countryRedirects['/locations/uae'], '/united-arab-emirates')
  assert.equal(countryRedirects['/ar/sa'], '/ar/saudi-arabia')
  assert.equal(countryRedirects['/sa'], '/saudi-arabia')
  assert.equal(countryRedirects['/ar/ae'], '/ar/united-arab-emirates')
  assert.equal(countryRedirects['/ae'], '/united-arab-emirates')
  assert.equal(countryRedirects['/ar/locations/egypt'], '/ar/egypt')
  assert.equal(countryRedirects['/locations/egypt'], '/egypt')
  assert.equal(countryRedirects['/eg'], '/egypt')
})

test('sitemap includes canonical country landing pages with regional hreflang and excludes old location duplicates', () => {
  const sitemapSource = readFileSync(path.join(process.cwd(), 'lib/sitemap-data.ts'), 'utf8')

  for (const country of countryLandingPages) {
    assert.equal(country.englishUrl.startsWith('/locations/'), false)
    assert.equal(country.arabicUrl.startsWith('/ar/locations/'), false)
  }

  assert.match(sitemapSource, /countryLandingPages\.forEach/, 'Country landing pages should be added from data')
  assert.match(sitemapSource, /hreflangEnglish/, 'English regional hreflang should be used')
  assert.match(sitemapSource, /hreflangArabic/, 'Arabic regional hreflang should be used')
  assert.match(sitemapSource, /country\.englishUrl/, 'English canonical URLs should be emitted')
  assert.match(sitemapSource, /country\.arabicUrl/, 'Arabic canonical URLs should be emitted')
  assert.match(sitemapSource, /\['blog', 'locations'\]/, 'CMS locations pages should be excluded from the sitemap')
  assert.doesNotMatch(sitemapSource, /\/locations\/\$\{country\}/, 'Legacy location country URLs should not be emitted')
})
