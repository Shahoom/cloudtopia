import { canonicalUrl } from '../i18n/url.ts'

/**
 * Centralised JSON-LD schema builders.
 *
 * Before this module the BreadcrumbList and FAQPage structured data was
 * hand-written inline in ~30 layout/page files, which drifted over time and
 * was easy to get wrong. These builders return plain objects that callers
 * stringify into a <script type="application/ld+json"> tag (or pass to the
 * <JsonLd> helper component).
 */

/**
 * Stable @id for the single root Organization node defined in
 * app/(frontend)/layout.tsx. Every other page references this node instead of
 * redefining its own thin publisher/provider Organization, so the entity graph
 * stays connected (SD-5).
 */
export const ORGANIZATION_ID = 'https://cloudtopia.net/#organization'

/**
 * Returns a reference to the root Organization node (by @id). Use this anywhere
 * a page needs a publisher/provider/worksFor Organization instead of inlining a
 * fresh, disconnected Organization definition.
 */
export function buildOrganizationRef() {
  return { '@type': 'Organization', '@id': ORGANIZATION_ID }
}

export type BreadcrumbItem = {
  /** Visible breadcrumb label, e.g. "Website Design". */
  name: string
  /** Locale-agnostic path, e.g. "/services/website-development". Resolved to a canonical URL. */
  path: string
}

export function buildBreadcrumbSchema(locale: string, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path),
    })),
  }
}

export type FaqItem = {
  question: string
  answer: string
}

/** Returns a FAQPage schema object, or null when there are no questions. */
export function buildFaqSchema(items: FaqItem[] | null | undefined) {
  if (!items || items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export type ServiceSchemaOptions = {
  name: string
  description: string
  /** Locale-agnostic path of the service page, e.g. "/services/website-development". */
  path: string
  serviceType?: string
  /** Country names served, defaults to the GCC market. */
  areaServed?: string[]
  /** Path to the offer/pricing page, defaults to "/pricing". */
  offerPath?: string
  /**
   * Optional minimum price (USD). When set, the Offer carries a
   * PriceSpecification with minPrice so the Offer is eligible for price rich
   * results without ever emitting a bare/undefined price (SD-4).
   */
  minPrice?: number
}

const DEFAULT_AREA_SERVED = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Kuwait',
  'Qatar',
  'Bahrain',
  'Oman',
]

export function buildServiceSchema(locale: string, options: ServiceSchemaOptions) {
  const areaServed = options.areaServed ?? DEFAULT_AREA_SERVED
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: canonicalUrl(locale, options.path),
    provider: buildOrganizationRef(),
    ...(options.serviceType ? { serviceType: options.serviceType } : {}),
    areaServed: areaServed.map((name) => ({ '@type': 'Country', name })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl(locale, options.offerPath ?? '/pricing'),
      ...(typeof options.minPrice === 'number'
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: options.minPrice,
            },
          }
        : {}),
    },
  }
}
