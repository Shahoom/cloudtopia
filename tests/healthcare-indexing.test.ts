import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { imageSize } from 'image-size'
import { NextRequest } from 'next/server'

import { GET as markdownGet } from '../app/api/markdown/route.ts'
import { healthcareDefinition } from '../lib/industries/definitions/healthcare.ts'
import { getIndustryPage } from '../lib/industries/get-industry-page.ts'
import {
  buildIndustryMetadata,
  mergeIndustrySeoPair,
} from '../lib/industries/resolve-industry-seo.ts'
import * as industrySeo from '../lib/industries/resolve-industry-seo.ts'
import {
  buildBaseIndustrySitemapEntries,
  isIndustryResolutionPublicationReady,
} from '../lib/industries/sitemap.ts'

const canonicals = {
  en: 'https://cloudtopia.net/industries/healthcare',
  ar: 'https://cloudtopia.net/ar/industries/healthcare',
} as const

test('healthcare is explicitly published, indexable, and bilingual', () => {
  const resolution = getIndustryPage('healthcare', 'en')
  assert.equal(resolution.kind, 'world')
  assert.equal(healthcareDefinition.publicationStatus, 'published')
  assert.equal(isIndustryResolutionPublicationReady(resolution), true)

  const pair = mergeIndustrySeoPair({
    slug: 'healthcare',
    defaults: {
      en: {
        ...healthcareDefinition.locales.en.seo,
        ogImage: '/og/industries/healthcare/en.jpg',
        index: true,
        follow: true,
      },
      ar: {
        ...healthcareDefinition.locales.ar.seo,
        ogImage: '/og/industries/healthcare/ar.jpg',
        index: true,
        follow: true,
      },
    },
  })

  for (const locale of ['en', 'ar'] as const) {
    assert.equal(pair[locale].index, true)
    assert.equal(pair[locale].follow, true)
    assert.equal(pair[locale].canonical, canonicals[locale])
    assert.deepEqual(pair[locale].languages, {
      en: canonicals.en,
      ar: canonicals.ar,
      'x-default': canonicals.en,
    })
    assert.equal(pair[locale].ogImages[0]?.alt, healthcareDefinition.locales[locale].seo.title)

    const metadata = buildIndustryMetadata(pair[locale])
    assert.deepEqual(metadata.robots, {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    })
  }
})

test('published code state overrides stale CMS noIndex without weakening draft fail-closed behavior', () => {
  const applyPublicationPolicy = (
    industrySeo as unknown as Record<string, unknown>
  ).applyIndustryPublicationPolicy
  assert.equal(typeof applyPublicationPolicy, 'function')
  if (typeof applyPublicationPolicy !== 'function') return

  const pair = mergeIndustrySeoPair({
    slug: 'healthcare',
    defaults: {
      en: { ...healthcareDefinition.locales.en.seo, index: true, follow: true },
      ar: { ...healthcareDefinition.locales.ar.seo, index: true, follow: true },
    },
    pages: {
      en: { seo: { noIndex: true } },
      ar: { seo: { noIndex: true } },
    },
  })
  assert.equal(pair.en.index, false)
  assert.deepEqual(pair.en.languages, {})

  for (const locale of ['en', 'ar'] as const) {
    const published = applyPublicationPolicy(
      'healthcare',
      true,
      pair[locale],
    ) as typeof pair.en
    assert.equal(published.index, true)
    assert.deepEqual(published.languages, {
      en: canonicals.en,
      ar: canonicals.ar,
      'x-default': canonicals.en,
    })

    const draft = applyPublicationPolicy(
      'healthcare',
      false,
      { ...pair[locale], index: true },
    ) as typeof pair.en
    assert.equal(draft.index, false)
    assert.deepEqual(draft.languages, {})
  }
})

test('healthcare has exact localized social images and sitemap entries', () => {
  for (const locale of ['en', 'ar'] as const) {
    const imagePath = join(
      process.cwd(),
      'public',
      'og',
      'industries',
      'healthcare',
      `${locale}.jpg`,
    )
    assert.equal(existsSync(imagePath), true, `${locale} OG image must exist`)
    assert.deepEqual(imageSize(readFileSync(imagePath)), {
      width: 1200,
      height: 630,
      type: 'jpg',
    })
  }

  const entries = buildBaseIndustrySitemapEntries().filter((entry) =>
    entry.url.endsWith('/industries/healthcare'),
  )
  assert.equal(entries.length, 2)
})

test('healthcare content is extractable and route schema exposes freshness', () => {
  assert.match(healthcareDefinition.locales.en.hero.h1, /Healthcare digital systems/i)
  assert.match(healthcareDefinition.locales.ar.hero.h1, /أنظمة الرعاية الصحية الرقمية/u)
  assert.match(healthcareDefinition.locales.en.hero.intro, /^CloudTopia designs bilingual healthcare digital systems/u)
  assert.match(healthcareDefinition.locales.ar.hero.intro, /^تصمم كلاود توبيا أنظمة رعاية صحية رقمية ثنائية اللغة/u)

  const routeSource = readFileSync(
    join(process.cwd(), 'app/(frontend)/[locale]/industries/[industry]/page.tsx'),
    'utf8',
  )
  assert.match(routeSource, /validatedDateModified:/u)
})

test('healthcare has a complete localized markdown representation for AI agents', async () => {
  for (const locale of ['en', 'ar'] as const) {
    const path = locale === 'ar'
      ? '/ar/industries/healthcare'
      : '/industries/healthcare'
    const response = markdownGet(new NextRequest(`https://cloudtopia.net${path}`, {
      headers: { 'x-md-path': path },
    }))
    const markdown = await response.text()

    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type') ?? '', /^text\/markdown/u)
    assert.match(markdown, locale === 'ar' ? /أنظمة الرعاية الصحية الرقمية/u : /Healthcare digital systems/iu)
    assert.match(markdown, /ClinicTopia|كلينيك توبيا/u)
    assert.match(markdown, locale === 'ar' ? /المواعيد/u : /Appointments/u)
    assert.match(markdown, locale === 'ar' ? /رحلة المريض والعيادة/u : /Patient and clinic journey/u)
    assert.match(markdown, locale === 'ar' ? /أسئلة القرار/u : /Decision questions/u)
    if (locale === 'ar') assert.doesNotMatch(markdown, /This is a markdown rendering/u)
  }
})

test('healthcare markdown aliases use the specialized content and canonical URL', async () => {
  const cases = [
    {
      path: '/en/industries/healthcare/',
      canonical: canonicals.en,
      content: /Healthcare digital systems/iu,
    },
    {
      path: '/ar/industries/healthcare/',
      canonical: canonicals.ar,
      content: /أنظمة الرعاية الصحية الرقمية/u,
    },
  ] as const

  for (const scenario of cases) {
    const response = markdownGet(new NextRequest(`https://cloudtopia.net${scenario.path}`, {
      headers: { 'x-md-path': scenario.path },
    }))
    const markdown = await response.text()

    assert.match(markdown, scenario.content)
    assert.equal(
      response.headers.get('link'),
      `<${scenario.canonical}>; rel="canonical"`,
    )
    assert.equal(response.headers.get('content-location'), scenario.canonical)
  }
})
