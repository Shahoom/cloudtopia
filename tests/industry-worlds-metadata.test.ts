import assert from 'node:assert/strict'
import test from 'node:test'
import type { Locale } from '../lib/i18n/config.ts'
import { getIndustryPage } from '../lib/industries/get-industry-page.ts'
import { INDUSTRY_SLUGS } from '../lib/industries/slugs.ts'
import {
  assertUniqueIndustrySeoEntries,
  buildIndustryMetadata,
  mergeIndustrySeoPair,
  resolveIndustrySeoPair,
  validateIndustrySeoEntries,
  type IndustrySeoDefaults,
  type IndustrySeoUniquenessEntry,
} from '../lib/industries/resolve-industry-seo.ts'

const locales = ['en', 'ar'] as const
const slug = 'healthcare' as const
const route = '/industries/healthcare'
const baseCanonicals = {
  en: 'https://cloudtopia.net/industries/healthcare',
  ar: 'https://cloudtopia.net/ar/industries/healthcare',
} as const

const defaults: Record<Locale, IndustrySeoDefaults> = {
  en: {
    title: 'Healthcare Digital Systems',
    description: 'Visible English healthcare systems description.',
    ogImage: '/og/industries/healthcare/en.jpg',
    index: true,
    follow: true,
  },
  ar: {
    title: 'أنظمة رقمية للرعاية الصحية',
    description: 'وصف عربي ظاهر لأنظمة الرعاية الصحية.',
    ogImage: '/og/industries/healthcare/ar.jpg',
    index: true,
    follow: true,
  },
}

test('code-owned defaults produce one exact bilingual metadata pair', () => {
  const pair = mergeIndustrySeoPair({ slug, defaults })

  assert.deepEqual(
    { en: pair.en.canonical, ar: pair.ar.canonical },
    baseCanonicals,
  )
  assert.deepEqual(pair.en.languages, {
    en: baseCanonicals.en,
    ar: baseCanonicals.ar,
    'x-default': baseCanonicals.en,
  })
  assert.deepEqual(pair.ar.languages, pair.en.languages)
  assert.equal(pair.en.index, true)
  assert.equal(pair.ar.index, true)
  assert.equal(pair.en.follow, true)
  assert.equal(pair.en.ogImages[0]?.url, 'https://cloudtopia.net/og/industries/healthcare/en.jpg')

  const metadata = buildIndustryMetadata(pair.en)
  assert.equal(metadata.title, defaults.en.title)
  assert.equal(metadata.description, defaults.en.description)
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
  assert.equal(metadata.alternates?.canonical, baseCanonicals.en)
  assert.deepEqual(metadata.alternates?.languages, pair.en.languages)
  assert.equal(metadata.openGraph?.title, pair.en.title)
  assert.equal(metadata.openGraph?.description, pair.en.description)
  assert.equal(metadata.openGraph?.url, pair.en.canonical)
  assert.equal(metadata.openGraph?.locale, 'en_US')
  assert.deepEqual(metadata.openGraph?.alternateLocale, ['ar_SA'])
  assert.deepEqual(metadata.openGraph?.images, pair.en.ogImages)
  assert.equal(metadata.twitter?.title, pair.en.title)
  assert.equal(metadata.twitter?.description, pair.en.description)
  assert.deepEqual(
    metadata.twitter?.images,
    pair.en.ogImages.map((image) => image.url),
  )
  assert.equal(Object.hasOwn(metadata, 'keywords'), false)
  assert.doesNotMatch(JSON.stringify(metadata), /https:\/\/cloudtopia\.net\/en\//)
})

test('route fields win over defensive Pages SEO while brand suffixes are normalized', () => {
  const pair = mergeIndustrySeoPair({
    slug,
    defaults,
    pages: {
      en: {
        seo: {
          title: 'Pages healthcare title',
          description: 'Pages English description.',
          noIndex: true,
          noFollow: false,
          ogImage: '/uploads/pages-healthcare-en.jpg',
        },
      },
      ar: {
        seo: {
          title: 'عنوان صفحة الرعاية',
          description: 'وصف الصفحة العربي.',
          ogImage: '/uploads/pages-healthcare-ar.jpg',
        },
      },
    },
    overrides: {
      en: {
        metaTitle: 'Route healthcare title | CloudTopia',
        metaDescription: 'Route English description.',
        noIndex: false,
        noFollow: true,
      },
      ar: {
        metaTitle: 'عنوان مسار الرعاية | كلاود توبيا',
        noIndex: false,
        noFollow: false,
      },
    },
  })

  assert.equal(pair.en.title, 'Route healthcare title')
  assert.equal(pair.ar.title, 'عنوان مسار الرعاية')
  assert.equal(pair.en.description, 'Route English description.')
  assert.equal(pair.ar.description, 'وصف الصفحة العربي.')
  assert.equal(pair.en.index, true)
  assert.equal(pair.ar.index, true)
  assert.equal(pair.en.follow, false)
  assert.equal(pair.ar.follow, true)
  assert.equal(pair.en.ogImages[0]?.url, 'https://cloudtopia.net/uploads/pages-healthcare-en.jpg')
  assert.equal(pair.ar.ogImages[0]?.url, 'https://cloudtopia.net/uploads/pages-healthcare-ar.jpg')
})

test('only the exact self-route canonical pair is accepted and invalid higher fields do not suppress copy', () => {
  const invalidPairs: readonly [string, string, string][] = [
    ['credentials', 'https://user:pass@cloudtopia.net/industries/healthcare', baseCanonicals.ar],
    ['port', 'https://cloudtopia.net:443/industries/healthcare', baseCanonicals.ar],
    ['query', `${baseCanonicals.en}?source=cms`, baseCanonicals.ar],
    ['fragment', `${baseCanonicals.en}#overview`, baseCanonicals.ar],
    ['trailing slash', `${baseCanonicals.en}/`, `${baseCanonicals.ar}/`],
    ['/en prefix', 'https://cloudtopia.net/en/industries/healthcare', baseCanonicals.ar],
    ['identical URLs', baseCanonicals.en, baseCanonicals.en],
    ['locale swap', baseCanonicals.ar, baseCanonicals.en],
    ['another slug', 'https://cloudtopia.net/industries/fintech', 'https://cloudtopia.net/ar/industries/fintech'],
    ['arbitrary path', 'https://cloudtopia.net/sectors/healthcare', 'https://cloudtopia.net/ar/sectors/healthcare'],
    ['non-HTTPS', 'http://cloudtopia.net/industries/healthcare', baseCanonicals.ar],
    ['relative URL', route, `/ar${route}`],
    ['one locale only', baseCanonicals.en, ''],
  ]

  for (const [name, enCanonical, arCanonical] of invalidPairs) {
    const pair = mergeIndustrySeoPair({
      slug,
      defaults,
      pages: {
        en: { seo: { canonical: baseCanonicals.en } },
        ar: { seo: { canonical: baseCanonicals.ar } },
      },
      overrides: {
        en: {
          metaTitle: `Route copy survives ${name}`,
          canonicalUrl: enCanonical,
        },
        ar: { canonicalUrl: arCanonical },
      },
    })

    assert.equal(pair.en.canonical, baseCanonicals.en, name)
    assert.equal(pair.ar.canonical, baseCanonicals.ar, name)
    assert.equal(pair.en.title, `Route copy survives ${name}`, name)
  }

  const exactPair = mergeIndustrySeoPair({
    slug,
    defaults,
    pages: {
      en: { seo: { canonicalUrl: baseCanonicals.en } },
      ar: { seo: { canonical: baseCanonicals.ar } },
    },
  })
  assert.equal(exactPair.en.canonical, baseCanonicals.en)
  assert.equal(exactPair.ar.canonical, baseCanonicals.ar)
  assert.equal(exactPair.en.languages['x-default'], baseCanonicals.en)
  assert.equal(buildIndustryMetadata(exactPair.ar).openGraph?.url, baseCanonicals.ar)
})

test('noIndex is pair-atomic for EN-only, AR-only, both, and neither', () => {
  const cases = [
    { name: 'neither', en: false, ar: false, index: true },
    { name: 'EN-only', en: true, ar: false, index: false },
    { name: 'AR-only', en: false, ar: true, index: false },
    { name: 'both', en: true, ar: true, index: false },
  ] as const

  for (const scenario of cases) {
    const pair = mergeIndustrySeoPair({
      slug,
      defaults,
      pages: {
        en: { seo: { noIndex: scenario.en, noFollow: false } },
        ar: { seo: { noindex: scenario.ar, nofollow: true } },
      },
    })
    const sitemapEligible = pair.en.index && pair.ar.index

    assert.equal(pair.en.index, scenario.index, `${scenario.name}: EN index`)
    assert.equal(pair.ar.index, scenario.index, `${scenario.name}: AR index`)
    assert.equal(sitemapEligible, scenario.index, `${scenario.name}: sitemap`)
    assert.deepEqual(
      pair.en.languages,
      scenario.index
        ? { en: baseCanonicals.en, ar: baseCanonicals.ar, 'x-default': baseCanonicals.en }
        : {},
      `${scenario.name}: EN languages`,
    )
    assert.deepEqual(pair.ar.languages, pair.en.languages, `${scenario.name}: AR languages`)
    assert.deepEqual(buildIndustryMetadata(pair.en).robots, {
      index: scenario.index,
      follow: true,
      googleBot: {
        index: scenario.index,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    })
    assert.deepEqual(buildIndustryMetadata(pair.ar).robots, {
      index: scenario.index,
      follow: false,
      googleBot: {
        index: scenario.index,
        follow: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    })
  }
})

test('malformed raw Pages SEO and absent CMS sources fall back without throwing', () => {
  const malformed = mergeIndustrySeoPair({
    slug,
    defaults,
    pages: {
      en: { seo: ['not', 'an', 'object'] },
      ar: {
        seo: {
          title: '   ',
          description: 42,
          canonicalUrl: { href: baseCanonicals.ar },
          noIndex: 'true',
          noFollow: 1,
          ogImage: { url: '/uploads/not-normalized.jpg' },
        },
      },
    },
  })
  const failedFetches = mergeIndustrySeoPair({
    slug,
    defaults,
    pages: { en: null, ar: null },
    overrides: { en: null, ar: null },
  })

  assert.equal(malformed.en.title, defaults.en.title)
  assert.equal(malformed.ar.title, defaults.ar.title)
  assert.equal(malformed.ar.description, defaults.ar.description)
  assert.equal(malformed.ar.index, true)
  assert.equal(malformed.ar.follow, true)
  assert.equal(malformed.ar.ogImages[0]?.url, 'https://cloudtopia.net/og/industries/healthcare/ar.jpg')
  assert.deepEqual(failedFetches, mergeIndustrySeoPair({ slug, defaults }))
})

test('the cached resolver loads both source layers and isolates CMS fetch failures', async () => {
  const calls: string[] = []
  const pair = await resolveIndustrySeoPair(slug, defaults, {
    getPage: async (locale, path) => {
      calls.push(`page:${locale}:${path}`)
      throw new Error('Pages unavailable')
    },
    getOverride: async (locale, path) => {
      calls.push(`override:${locale}:${path}`)
      throw new Error('SeoOverrides unavailable')
    },
  })

  assert.deepEqual(calls.sort(), [
    'override:ar:industries/healthcare',
    'override:en:industries/healthcare',
    'page:ar:industries/healthcare',
    'page:en:industries/healthcare',
  ])
  assert.equal(pair.en.locale, 'en')
  assert.equal(pair.ar.locale, 'ar')
  assert.equal(pair.en.canonical, baseCanonicals.en)
  assert.equal(pair.ar.canonical, baseCanonicals.ar)
  assert.equal(pair.en.title, defaults.en.title)
  assert.equal(pair.ar.title, defaults.ar.title)
})

function buildDefaultUniquenessEntries(): IndustrySeoUniquenessEntry[] {
  const entries: IndustrySeoUniquenessEntry[] = []

  for (const industrySlug of INDUSTRY_SLUGS) {
    const resolutions = {
      en: getIndustryPage(industrySlug, 'en'),
      ar: getIndustryPage(industrySlug, 'ar'),
    }
    const pairDefaults = Object.fromEntries(
      locales.map((locale) => {
        const resolution = resolutions[locale]
        if (resolution.kind === 'legacy') {
          return [locale, {
            title: resolution.legacy.seo.title,
            description: resolution.legacy.seo.description,
            ogImage: resolution.legacy.seo.image,
            index: true,
            follow: true,
          } satisfies IndustrySeoDefaults]
        }

        const page = resolution.definition.locales[locale]
        const ogImage = resolution.definition.assets.find(
          (asset) => asset.kind === 'og-image' && asset.locale === locale,
        )
        return [locale, {
          title: page.seo.title,
          description: page.seo.description,
          ogImage: ogImage?.kind === 'og-image' ? ogImage.publicPath : undefined,
          index: true,
          follow: true,
        } satisfies IndustrySeoDefaults]
      }),
    ) as Record<Locale, IndustrySeoDefaults>
    const seoPair = mergeIndustrySeoPair({ slug: industrySlug, defaults: pairDefaults })

    for (const locale of locales) {
      const resolution = resolutions[locale]
      entries.push({
        slug: industrySlug,
        locale,
        canonical: seoPair[locale].canonical,
        title: seoPair[locale].title,
        description: seoPair[locale].description,
        h1: resolution.kind === 'legacy'
          ? resolution.legacy.heroTitle
          : resolution.definition.locales[locale].hero.h1,
      })
    }
  }

  return entries
}

test('the publication gate accepts all 26 defaults and rejects every locale-scoped field collision', () => {
  const entries = buildDefaultUniquenessEntries()
  assert.equal(entries.length, 26)
  assert.deepEqual(validateIndustrySeoEntries(entries), { ok: true, issues: [] })
  assert.doesNotThrow(() => assertUniqueIndustrySeoEntries(entries))

  const healthcareEn = entries.find((entry) => entry.slug === 'healthcare' && entry.locale === 'en')!
  const fintechEnIndex = entries.findIndex((entry) => entry.slug === 'fintech' && entry.locale === 'en')
  for (const field of ['canonical', 'title', 'description', 'h1'] as const) {
    const collision = entries.map((entry) => ({ ...entry }))
    collision[fintechEnIndex][field] = healthcareEn[field]
    const result = validateIndustrySeoEntries(collision)

    assert.equal(result.ok, false, field)
    assert.ok(
      result.issues.some((issue) =>
        issue.field === field &&
        issue.locale === 'en' &&
        issue.slug === 'fintech' &&
        issue.conflictingSlug === 'healthcare'),
      field,
    )
    assert.throws(
      () => assertUniqueIndustrySeoEntries(collision),
      new RegExp(`Duplicate effective industry ${field}`),
      field,
    )
  }
})

test('a single CMS title collision is caught without changing code-owned H1', () => {
  const entries = buildDefaultUniquenessEntries()
  const healthcareEn = entries.find((entry) => entry.slug === 'healthcare' && entry.locale === 'en')!
  const fintechEnIndex = entries.findIndex((entry) => entry.slug === 'fintech' && entry.locale === 'en')
  const fintechEn = entries[fintechEnIndex]
  const cmsPair = mergeIndustrySeoPair({
    slug: 'fintech',
    defaults: {
      en: {
        title: fintechEn.title,
        description: fintechEn.description,
        index: true,
        follow: true,
      },
      ar: {
        title: entries.find((entry) => entry.slug === 'fintech' && entry.locale === 'ar')!.title,
        description: entries.find((entry) => entry.slug === 'fintech' && entry.locale === 'ar')!.description,
        index: true,
        follow: true,
      },
    },
    pages: {
      en: { seo: { title: healthcareEn.title } },
      ar: null,
    },
  })
  const collision = entries.map((entry) => ({ ...entry }))
  collision[fintechEnIndex] = {
    ...collision[fintechEnIndex],
    title: cmsPair.en.title,
  }

  const result = validateIndustrySeoEntries(collision)
  assert.equal(result.ok, false)
  assert.deepEqual(
    result.issues.map((issue) => issue.field),
    ['title'],
  )
  assert.equal(collision[fintechEnIndex].h1, fintechEn.h1)
})
