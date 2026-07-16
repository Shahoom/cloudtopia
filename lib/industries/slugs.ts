export const INDUSTRY_SLUGS = [
  'healthcare', 'fintech', 'ecommerce-retail', 'real-estate', 'education',
  'travel-hospitality', 'restaurants', 'legal-firms', 'construction', 'retail',
  'professional-services', 'logistics-supply-chain', 'government-public-sector',
] as const

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number]

export const SENSITIVE_DOMAIN_INDUSTRY_SLUGS = [
  'healthcare',
  'fintech',
  'legal-firms',
  'government-public-sector',
] as const satisfies readonly IndustrySlug[]

const sensitiveDomainIndustrySlugs = new Set<IndustrySlug>(
  SENSITIVE_DOMAIN_INDUSTRY_SLUGS,
)

export function isIndustrySlug(value: unknown): value is IndustrySlug {
  return typeof value === 'string' &&
    (INDUSTRY_SLUGS as readonly string[]).includes(value)
}

export function requiresSensitiveDomainReview(
  slug: IndustrySlug,
): boolean {
  return sensitiveDomainIndustrySlugs.has(slug)
}
