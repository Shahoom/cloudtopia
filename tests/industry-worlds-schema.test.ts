import assert from 'node:assert/strict'
import test from 'node:test'
import { buildIndustryJsonLd } from '../lib/industries/build-industry-schema.ts'
import { mergeIndustrySeoPair } from '../lib/industries/resolve-industry-seo.ts'
import type { CanonicalServiceId } from '../lib/industries/service-targets.ts'
import { ORGANIZATION_ID } from '../lib/seo/schema.ts'

const pair = mergeIndustrySeoPair({
  slug: 'healthcare',
  defaults: {
    en: {
      title: 'SEO-only English title',
      description: 'SEO-only English description.',
      ogImage: '/og/industries/healthcare/en.jpg',
      index: true,
      follow: true,
    },
    ar: {
      title: 'عنوان SEO فقط',
      description: 'وصف SEO فقط.',
      ogImage: '/og/industries/healthcare/ar.jpg',
      index: true,
      follow: true,
    },
  },
})

function nodeById(graph: ReturnType<typeof buildIndustryJsonLd>, id: string) {
  const node = graph['@graph'].find((candidate) => candidate['@id'] === id)
  assert.ok(node, `Missing graph node ${id}`)
  return node as Record<string, any>
}

function buildGraphWithService(
  locale: 'en' | 'ar',
  id: CanonicalServiceId,
  href: string,
) {
  return buildIndustryJsonLd({
    locale,
    seo: pair[locale],
    name: locale === 'ar' ? 'أنظمة الرعاية الصحية' : 'Healthcare systems',
    description: locale === 'ar' ? 'وصف ظاهر.' : 'Visible description.',
    breadcrumbLabels: locale === 'ar'
      ? { home: 'الرئيسية', industries: 'القطاعات', current: 'الرعاية الصحية' }
      : { home: 'Home', industries: 'Industries', current: 'Healthcare' },
    services: [{ id, label: locale === 'ar' ? 'تطوير المواقع' : 'Website development', href }],
    faqs: [],
  })
}

test('the Arabic graph is connected, localized, and identical to visible service and FAQ data', () => {
  const canonical = pair.ar.canonical
  const services = [
    {
      id: 'website-development' as const,
      label: 'تطوير المواقع للقطاع الصحي',
      href: '/ar/services/website-development',
    },
    {
      id: 'web-applications' as const,
      label: 'تطبيقات ويب للرعاية',
      href: '/ar/services/web-applications',
    },
  ]
  const faqs = [
    { question: 'كيف يبدأ المشروع الصحي؟', answer: 'يبدأ بفهم رحلة المريض والفريق.' },
    { question: 'هل تدعمون العربية؟', answer: 'نعم، بمحتوى وواجهات عربية أصلية.' },
  ]
  const graph = buildIndustryJsonLd({
    locale: 'ar',
    seo: pair.ar,
    name: 'أنظمة الرعاية الصحية الرقمية',
    description: 'وصف ظاهر يشرح نظام الرعاية الصحية.',
    breadcrumbLabels: {
      home: 'الرئيسية',
      industries: 'القطاعات',
      current: 'الرعاية الصحية',
    },
    services,
    faqs,
    validatedDateModified: '2024-02-29',
  })

  assert.equal(graph['@context'], 'https://schema.org')
  const webPage = nodeById(graph, `${canonical}#webpage`)
  const breadcrumbs = nodeById(graph, `${canonical}#breadcrumbs`)
  const service = nodeById(graph, `${canonical}#service`)
  const faq = nodeById(graph, `${canonical}#faq`)

  assert.equal(webPage['@type'], 'WebPage')
  assert.equal(webPage.url, canonical)
  assert.equal(webPage.name, 'أنظمة الرعاية الصحية الرقمية')
  assert.equal(webPage.description, 'وصف ظاهر يشرح نظام الرعاية الصحية.')
  assert.equal(webPage.inLanguage, 'ar')
  assert.deepEqual(webPage.publisher, { '@id': ORGANIZATION_ID })
  assert.deepEqual(webPage.breadcrumb, { '@id': `${canonical}#breadcrumbs` })
  assert.deepEqual(webPage.mainEntity, [
    { '@id': `${canonical}#service` },
    { '@id': `${canonical}#faq` },
  ])
  assert.equal(webPage.dateModified, '2024-02-29')

  assert.deepEqual(
    breadcrumbs.itemListElement.map((item: Record<string, any>) => ({
      name: item.name,
      item: item.item,
    })),
    [
      { name: 'الرئيسية', item: 'https://cloudtopia.net/ar' },
      { name: 'القطاعات', item: 'https://cloudtopia.net/ar/industries' },
      { name: 'الرعاية الصحية', item: canonical },
    ],
  )

  assert.equal(service.name, 'أنظمة الرعاية الصحية الرقمية')
  assert.equal(service.description, 'وصف ظاهر يشرح نظام الرعاية الصحية.')
  assert.deepEqual(service.provider, { '@id': ORGANIZATION_ID })
  const visibleServices = service.hasOfferCatalog.itemListElement.map(
    (offer: Record<string, any>) => offer.itemOffered,
  )
  assert.deepEqual(
    visibleServices.map((item: Record<string, any>) => ({
      identifier: item.identifier,
      name: item.name,
      url: item.url,
    })),
    services.map((item) => ({
      identifier: item.id,
      name: item.label,
      url: `https://cloudtopia.net${item.href}`,
    })),
  )
  assert.doesNotMatch(JSON.stringify(visibleServices), /\/ar\/ar\//)

  assert.deepEqual(
    faq.mainEntity.map((item: Record<string, any>) => ({
      question: item.name,
      answer: item.acceptedAnswer.text,
    })),
    faqs,
  )
  assert.deepEqual(faq.isPartOf, { '@id': `${canonical}#webpage` })

  const serialized = JSON.stringify(graph)
  assert.doesNotMatch(serialized, /MedicalBusiness|LegalService|FinancialService|GovernmentService|Physician/)
  assert.doesNotMatch(serialized, /reviewer|authors?/i)
  assert.doesNotMatch(serialized, /SEO-only/)
})

test('schema service targets reject unsafe URL shapes instead of serializing them', () => {
  const invalidHrefs = [
    ['off-origin', 'https://attacker.example/services/website-development'],
    ['protocol-relative', '//cloudtopia.net/services/website-development'],
    ['javascript', 'javascript:alert(1)'],
    ['data', 'data:text/html,unsafe'],
    ['empty', ''],
    ['parse failure', 'https://[broken'],
    ['same-site absolute', 'https://cloudtopia.net/services/website-development'],
    ['query', '/services/website-development?source=schema'],
    ['fragment', '/services/website-development#details'],
    ['trailing slash', '/services/website-development/'],
  ] as const

  for (const [name, href] of invalidHrefs) {
    assert.throws(
      () => buildGraphWithService('en', 'website-development', href),
      (error) =>
        error instanceof Error &&
        /Invalid industry schema service target/.test(error.message) &&
        error.message.includes('website-development') &&
        error.message.includes('/services/website-development'),
      name,
    )
  }
})

test('schema service targets reject EN and AR ID/path mismatches', () => {
  const mismatches = [
    {
      name: 'EN cross-ID path',
      locale: 'en' as const,
      id: 'website-development' as const,
      href: '/services/web-applications',
    },
    {
      name: 'EN Arabic path',
      locale: 'en' as const,
      id: 'website-development' as const,
      href: '/ar/services/website-development',
    },
    {
      name: 'AR unlocalized path',
      locale: 'ar' as const,
      id: 'website-development' as const,
      href: '/services/website-development',
    },
    {
      name: 'AR cross-ID path',
      locale: 'ar' as const,
      id: 'website-development' as const,
      href: '/ar/services/web-applications',
    },
  ]

  for (const mismatch of mismatches) {
    assert.throws(
      () => buildGraphWithService(mismatch.locale, mismatch.id, mismatch.href),
      new RegExp(
        `Invalid industry schema service target.*${mismatch.id}.*${mismatch.locale}`,
      ),
      mismatch.name,
    )
  }

  assert.throws(
    () => buildGraphWithService(
      'en',
      'unknown-service' as CanonicalServiceId,
      '/services/website-development',
    ),
    /Unknown industry schema service ID: unknown-service/,
  )
})

test('the graph omits FAQ and unvalidated or impossible modification dates', () => {
  const invalidDates = [
    undefined,
    '2025-02-29',
    '2026-13-01',
    '2026-7-01',
    'not-a-date',
  ] as const

  for (const validatedDateModified of invalidDates) {
    const graph = buildIndustryJsonLd({
      locale: 'en',
      seo: pair.en,
      name: 'Visible healthcare systems',
      description: 'Visible healthcare description.',
      breadcrumbLabels: {
        home: 'Home',
        industries: 'Industries',
        current: 'Healthcare',
      },
      services: [],
      faqs: [],
      validatedDateModified: validatedDateModified as `${number}-${number}-${number}` | undefined,
    })
    const canonical = pair.en.canonical
    const webPage = nodeById(graph, `${canonical}#webpage`)

    assert.equal(Object.hasOwn(webPage, 'dateModified'), false, String(validatedDateModified))
    assert.equal(graph['@graph'].some((node) => node['@id'] === `${canonical}#faq`), false)
    assert.deepEqual(webPage.mainEntity, { '@id': `${canonical}#service` })
    assert.equal(Object.hasOwn(webPage, 'author'), false)
  }
})
