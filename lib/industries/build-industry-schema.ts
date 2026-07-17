import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import {
  CANONICAL_SERVICE_TARGETS,
  type CanonicalServiceId,
} from '@/lib/industries/service-targets'
import type {
  IndustryPageDefinition,
  IndustryReviewRecord,
} from '@/lib/industries/types'
import type { EffectiveIndustrySeo } from '@/lib/industries/resolve-industry-seo'
import { ORGANIZATION_ID } from '@/lib/seo/schema'

type IndustryJsonLdNode = Record<string, unknown> & { '@id': string }

export type IndustryJsonLdGraph = {
  '@context': 'https://schema.org'
  '@graph': IndustryJsonLdNode[]
}

export type BuildIndustryJsonLdInput = {
  locale: Locale
  seo: EffectiveIndustrySeo
  name: string
  description: string
  breadcrumbLabels: { home: string; industries: string; current: string }
  services: readonly {
    id: CanonicalServiceId
    label: string
    href: string
  }[]
  faqs: readonly { question: string; answer: string }[]
  validatedDateModified?:
    | IndustryPageDefinition['updatedAt']
    | IndustryReviewRecord['reviewedAt']
}

/**
 * GCC countries served, mirroring DEFAULT_AREA_SERVED in lib/seo/schema.ts
 * (not exported there — keep the English names in sync). Arabic names follow
 * lib/seo/locations.ts.
 */
const AREA_SERVED: readonly { en: string; ar: string }[] = [
  { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
  { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
  { en: 'Kuwait', ar: 'الكويت' },
  { en: 'Qatar', ar: 'قطر' },
  { en: 'Bahrain', ar: 'البحرين' },
  { en: 'Oman', ar: 'عُمان' },
]

function isCalendarDate(value: unknown): value is `${number}-${number}-${number}` {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

function canonicalVisibleServiceUrl(
  locale: Locale,
  id: CanonicalServiceId,
  href: string,
): string {
  const canonicalTarget = CANONICAL_SERVICE_TARGETS[id]
  if (!canonicalTarget) {
    throw new Error(`Unknown industry schema service ID: ${id}`)
  }

  const expectedHref = localePath(locale, canonicalTarget)
  if (href !== expectedHref) {
    throw new Error(
      `Invalid industry schema service target ${id} for ${locale}: ` +
      `expected ${expectedHref}, received ${JSON.stringify(href)}.`,
    )
  }

  return canonicalUrl(locale, canonicalTarget)
}

export function buildIndustryJsonLd(
  input: BuildIndustryJsonLdInput,
): IndustryJsonLdGraph {
  const canonical = input.seo.canonical
  const webPageId = `${canonical}#webpage`
  const breadcrumbsId = `${canonical}#breadcrumbs`
  const serviceId = `${canonical}#service`
  const faqId = `${canonical}#faq`
  const organization = { '@id': ORGANIZATION_ID }
  const hasFaqs = input.faqs.length > 0

  const webPage: IndustryJsonLdNode = {
    '@type': 'WebPage',
    '@id': webPageId,
    url: canonical,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    publisher: organization,
    breadcrumb: { '@id': breadcrumbsId },
    mainEntity: hasFaqs
      ? [{ '@id': serviceId }, { '@id': faqId }]
      : { '@id': serviceId },
    ...(isCalendarDate(input.validatedDateModified)
      ? { dateModified: input.validatedDateModified }
      : {}),
  }

  const breadcrumbs: IndustryJsonLdNode = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbsId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: input.breadcrumbLabels.home,
        item: canonicalUrl(input.locale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: input.breadcrumbLabels.industries,
        item: canonicalUrl(input.locale, '/industries'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: input.breadcrumbLabels.current,
        item: canonical,
      },
    ],
  }

  const service: IndustryJsonLdNode = {
    '@type': 'Service',
    '@id': serviceId,
    url: canonical,
    name: input.name,
    description: input.description,
    provider: organization,
    serviceType:
      input.locale === 'ar'
        ? `تطوير برمجيات لقطاع ${input.breadcrumbLabels.current}`
        : `${input.breadcrumbLabels.current} software development`,
    areaServed: AREA_SERVED.map((country) => ({
      '@type': 'Country',
      name: input.locale === 'ar' ? country.ar : country.en,
    })),
    ...(input.services.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: input.locale === 'ar' ? 'الخدمات المرتبطة' : 'Related services',
            itemListElement: input.services.map((visibleService) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                identifier: visibleService.id,
                name: visibleService.label,
                url: canonicalVisibleServiceUrl(
                  input.locale,
                  visibleService.id,
                  visibleService.href,
                ),
              },
            })),
          },
        }
      : {}),
  }

  const graph: IndustryJsonLdNode[] = [webPage, breadcrumbs, service]
  if (hasFaqs) {
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      isPartOf: { '@id': webPageId },
      mainEntity: input.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
