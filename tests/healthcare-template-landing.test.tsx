import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { healthcareDefinition } from '../lib/industries/definitions/healthcare.ts'
import type { Locale } from '../lib/i18n/config.ts'
import type { EffectiveIndustrySeo } from '../lib/industries/resolve-industry-seo.ts'

const componentPath = join(
  process.cwd(),
  'components/industry/healthcare/HealthcareIndustryPage.tsx',
)
const cssPath = join(
  process.cwd(),
  'components/industry/healthcare/healthcare-industry.module.css',
)
const carouselPath = join(
  process.cwd(),
  'components/industry/healthcare/HealthcareCapabilityCarousel.tsx',
)
const routePath = join(
  process.cwd(),
  'app/(frontend)/[locale]/industries/[industry]/page.tsx',
)
const headerPath = join(process.cwd(), 'components/Header.tsx')

function seo(locale: Locale): EffectiveIndustrySeo {
  return {
    locale,
    title: healthcareDefinition.locales[locale].seo.title,
    description: healthcareDefinition.locales[locale].seo.description,
    canonical: locale === 'ar'
      ? 'https://cloudtopia.net/ar/industries/healthcare'
      : 'https://cloudtopia.net/industries/healthcare',
    languages: {
      en: 'https://cloudtopia.net/industries/healthcare',
      ar: 'https://cloudtopia.net/ar/industries/healthcare',
      'x-default': 'https://cloudtopia.net/industries/healthcare',
    },
    index: true,
    follow: true,
    ogImages: [],
  }
}

test('healthcare uses a dedicated bilingual ProHealth-derived industry presentation', async () => {
  assert.ok(existsSync(componentPath), 'dedicated healthcare page component is missing')

  const routeSource = readFileSync(routePath, 'utf8')
  assert.match(routeSource, /HealthcareIndustryPage/u)
  assert.match(routeSource, /WORLD_COMPONENTS/u)
  assert.match(
    routeSource,
    /healthcare:\s*\(\)\s*=>\s*import\([^)]*HealthcareIndustryPage/u,
  )

  const { HealthcareIndustryPage } = await import(
    '../components/industry/healthcare/HealthcareIndustryPage.tsx'
  )

  for (const locale of ['en', 'ar'] as const) {
    const html = renderToStaticMarkup(createElement(HealthcareIndustryPage, {
      locale,
      definition: healthcareDefinition,
      seo: seo(locale),
      schema: {},
    }))

    assert.match(html, /data-healthcare-template="prohealth-v1"/u)
    assert.match(html, /data-indexable="true"/u)
    assert.match(html, new RegExp(`dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`, 'u'))
    assert.ok(html.includes(healthcareDefinition.locales[locale].hero.h1))
    assert.match(html, /href="https:\/\/clinic\.cloudtopia\.net"/u)
    assert.match(
      html,
      locale === 'ar'
        ? /href="\/ar\/services\/website-development\/healthcare-and-medical-website-development"/u
        : /href="\/services\/website-development\/healthcare-and-medical-website-development"/u,
    )
    assert.match(html, /target="_blank"/u)
    assert.match(html, /rel="noreferrer noopener"|rel="noopener noreferrer"/u)
  }
})

test('healthcare content presents CloudTopia industry expertise instead of a fictional clinic', async () => {
  assert.ok(existsSync(componentPath), 'dedicated healthcare page component is missing')
  const { HealthcareIndustryPage } = await import(
    '../components/industry/healthcare/HealthcareIndustryPage.tsx'
  )
  const html = renderToStaticMarkup(createElement(HealthcareIndustryPage, {
    locale: 'en',
    definition: healthcareDefinition,
    seo: seo('en'),
    schema: {},
  }))

  assert.match(html, /ClinicTopia/u)
  assert.match(html, /patients/i)
  assert.match(html, /appointments/i)
  assert.match(html, /invoicing/i)
  assert.match(html, /insurance/i)
  assert.match(html, /laboratory/i)
  assert.match(html, /pharmacy/i)
  assert.match(html, /radiology/i)
  assert.match(html, /Secure patient portal/u)
  assert.match(html, /Patient lane/u)
  assert.match(html, /Clinic team lane/u)
  assert.doesNotMatch(html, /ProHealth|Dr\. James|Dr\. John|Dr\. Susan/u)
  assert.doesNotMatch(html, /Book an appointment|Emergency Department|870\+|150K|24\/7/u)

  const componentSource = readFileSync(componentPath, 'utf8')
  assert.doesNotMatch(componentSource, /hero-doctors\.png/u)
  assert.match(componentSource, /hero-doctor\.png/u)
  assert.match(componentSource, /hero-nurse\.png/u)
})

test('healthcare motion reproduces template timings and honors reduced motion', () => {
  assert.ok(existsSync(cssPath), 'healthcare template CSS module is missing')
  const css = readFileSync(cssPath, 'utf8')

  assert.match(css, /--health-motion-standard:\s*400ms/u)
  assert.match(css, /--health-motion-accordion:\s*250ms/u)
  assert.match(css, /@keyframes\s+healthcareRotate/u)
  assert.match(css, /@keyframes\s+healthcareFloat/u)
  assert.match(css, /@keyframes\s+healthcareShine/u)
  assert.match(css, /prefers-reduced-motion:\s*reduce/u)
  assert.match(css, /scroll-behavior:\s*auto/u)
  assert.doesNotMatch(css, /prefers-reduced-motion:[\s\S]*?\.capabilityTrack\s*\{\s*transform:\s*none/u)
  assert.match(css, /@media\s*\(max-width:\s*1699px\)[\s\S]*?--health-carousel-visible:\s*5/u)
  assert.match(css, /@media\s*\(max-width:\s*1198px\)[\s\S]*?--health-carousel-visible:\s*4/u)
  assert.match(css, /@media\s*\(max-width:\s*990px\)[\s\S]*?--health-carousel-visible:\s*3/u)
  assert.match(css, /@media\s*\(max-width:\s*766px\)[\s\S]*?--health-carousel-visible:\s*2/u)
  assert.match(css, /@media\s*\(max-width:\s*419px\)[\s\S]*?--health-carousel-visible:\s*1/u)
  assert.match(css, /@media\s*\(min-width:\s*1700px\)[\s\S]*?\.carouselControls\s*\{[^}]*display:\s*none/su)
  assert.match(css, /\.faqItem::details-content\s*\{[^}]*block-size:\s*0[^}]*content-visibility:\s*hidden[^}]*transition:[^}]*var\(--health-motion-accordion\)/su)
  assert.match(css, /\.faqItem\[open\]::details-content\s*\{[^}]*block-size:\s*auto[^}]*content-visibility:\s*visible/su)
})

test('healthcare carousel orders every wrap without an empty tail', async () => {
  assert.ok(existsSync(carouselPath), 'healthcare carousel is missing')
  const { orderCarouselCards, wrapCarouselIndex } = await import(
    '../components/industry/healthcare/HealthcareCapabilityCarousel.tsx'
  )
  const cards = ['01', '02', '03', '04', '05', '06']

  assert.equal(wrapCarouselIndex(-1, cards.length), 5)
  assert.equal(wrapCarouselIndex(cards.length, cards.length), 0)
  assert.deepEqual(orderCarouselCards(cards, 5), ['06', '01', '02', '03', '04', '05'])
  assert.deepEqual(orderCarouselCards(cards, 0), cards)

  // Invariant: the track always holds all N cards for any start index (incl.
  // out-of-range), so no gap ("empty tail") can appear even when the visible
  // window equals the card count. Verify across every wrap position.
  const sorted = [...cards].sort()
  for (let start = -cards.length; start <= cards.length * 2; start += 1) {
    const ordered = orderCarouselCards(cards, start)
    assert.equal(ordered.length, cards.length, `start ${start} must keep a full window`)
    assert.deepEqual([...ordered].sort(), sorted, `start ${start} must contain every card`)
    assert.equal(
      ordered[0],
      cards[wrapCarouselIndex(start, cards.length)],
      `start ${start} must lead with the active card`,
    )
  }
})

test('healthcare CTA colors outrank the page-level link color', () => {
  assert.ok(existsSync(cssPath), 'healthcare template CSS module is missing')
  const css = readFileSync(cssPath, 'utf8')

  assert.match(css, /\.page\s+\.buttonPrimary\s*\{[^}]*color:\s*#fff/su)
  assert.match(css, /\.page\s+\.buttonSecondary\s*\{[^}]*color:\s*var\(--health-blue-dark\)/su)
  assert.match(css, /\.page\s+\.buttonLight\s*\{[^}]*color:\s*var\(--health-blue-dark\)/su)
  assert.match(css, /\.page\s+\.systemStripAction\s*\{[^}]*color:\s*#fff/su)
})

test('healthcare preserves the site main landmark and the mobile header width', () => {
  const componentSource = readFileSync(componentPath, 'utf8')
  const headerSource = readFileSync(headerPath, 'utf8')

  assert.doesNotMatch(componentSource, /<main\b/u)
  assert.doesNotMatch(componentSource, /<\/main>/u)
  assert.doesNotMatch(componentSource, /tabIndex=\{0\}/u)
  assert.match(componentSource, /href=\{principle\.href\}/u)
  assert.match(headerSource, /min-\[430px\]:flex/u)
})
