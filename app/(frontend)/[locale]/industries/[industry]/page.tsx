import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'

import { IndustryPageShell } from '@/components/industry/detail/IndustryPageShell'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import { buildIndustryJsonLd } from '@/lib/industries/build-industry-schema'
import { getIndustryPage, type IndustryPageResolution } from '@/lib/industries/get-industry-page'
import { getIndustryManifestEntry } from '@/lib/industries/manifest'
import { isIndustryResolutionPublicationReady } from '@/lib/industries/sitemap'
import {
  applyIndustryPublicationPolicy,
  buildIndustryMetadata,
  resolveIndustrySeoPair,
  type EffectiveIndustrySeo,
  type IndustrySeoDefaults,
} from '@/lib/industries/resolve-industry-seo'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import { INDUSTRY_SLUGS, isIndustrySlug, type IndustrySlug } from '@/lib/industries/slugs'
import type { IndustryPageDefinition } from '@/lib/industries/types'

type PageProps = {
  params: Promise<{ locale: string; industry: string }>
}

type WorldPageProps = {
  locale: Locale
  definition: IndustryPageDefinition
  seo: EffectiveIndustrySeo
  schema: unknown
}

/**
 * Industry Worlds that have "graduated" to a hand-authored, template-ported
 * presentation (vs. the generic IndustryPageShell). Add a slug here to route it
 * to its bespoke component; every entry shares the WorldPageProps contract.
 */
const WORLD_COMPONENTS: Partial<
  Record<IndustrySlug, () => Promise<(props: WorldPageProps) => ReactNode>>
> = {
  healthcare: () =>
    import('@/components/industry/healthcare/HealthcareIndustryPage').then(
      (m) => m.HealthcareIndustryPage,
    ),
  fintech: () =>
    import('@/components/industry/fintech/FintechIndustryPage').then(
      (m) => m.FintechIndustryPage,
    ),
  construction: () =>
    import('@/components/industry/construction/ConstructionIndustryPage').then(
      (m) => m.ConstructionIndustryPage,
    ),
  'ecommerce-retail': () =>
    import(
      '@/components/industry/ecommerce-retail/EcommerceRetailIndustryPage'
    ).then((m) => m.EcommerceRetailIndustryPage),
  education: () =>
    import('@/components/industry/education/EducationIndustryPage').then(
      (m) => m.EducationIndustryPage,
    ),
  'government-public-sector': () =>
    import(
      '@/components/industry/government-public-sector/GovernmentPublicSectorIndustryPage'
    ).then((m) => m.GovernmentPublicSectorIndustryPage),
  'legal-firms': () =>
    import('@/components/industry/legal-firms/LegalFirmsIndustryPage').then(
      (m) => m.LegalFirmsIndustryPage,
    ),
  'logistics-supply-chain': () =>
    import(
      '@/components/industry/logistics-supply-chain/LogisticsSupplyChainIndustryPage'
    ).then((m) => m.LogisticsSupplyChainIndustryPage),
  'professional-services': () =>
    import(
      '@/components/industry/professional-services/ProfessionalServicesIndustryPage'
    ).then((m) => m.ProfessionalServicesIndustryPage),
  'real-estate': () =>
    import('@/components/industry/real-estate/RealEstateIndustryPage').then(
      (m) => m.RealEstateIndustryPage,
    ),
  restaurants: () =>
    import('@/components/industry/restaurants/RestaurantsIndustryPage').then(
      (m) => m.RestaurantsIndustryPage,
    ),
  'travel-hospitality': () =>
    import(
      '@/components/industry/travel-hospitality/TravelHospitalityIndustryPage'
    ).then((m) => m.TravelHospitalityIndustryPage),
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((industry) => ({ locale, industry })),
  )
}

function seoDefaultsFor(
  resolution: IndustryPageResolution,
  locale: Locale,
): IndustrySeoDefaults {
  if (resolution.kind === 'world') {
    const page = resolution.definition.locales[locale]
    return {
      title: page.seo.title,
      description: page.seo.description,
      // Worlds are previewable immediately but stay noindex until their
      // definition is explicitly published with reviewed localized assets.
      index: isIndustryResolutionPublicationReady(resolution),
      follow: true,
    }
  }

  return {
    title: resolution.legacy.seo.title,
    description: resolution.legacy.seo.description,
    index: isIndustryResolutionPublicationReady(resolution),
    follow: true,
  }
}

function publicationSafeSeo(
  resolution: IndustryPageResolution,
  seo: EffectiveIndustrySeo,
): EffectiveIndustrySeo {
  return applyIndustryPublicationPolicy(
    resolution.slug,
    isIndustryResolutionPublicationReady(resolution),
    seo,
  )
}

async function resolveRoute(
  rawLocale: string,
  rawIndustry: string,
) {
  if (!isLocale(rawLocale) || !isIndustrySlug(rawIndustry)) notFound()

  const locale = rawLocale
  const slug = rawIndustry
  const localizedResolution = getIndustryPage(slug, locale)
  const enResolution = getIndustryPage(slug, 'en')
  const arResolution = getIndustryPage(slug, 'ar')
  const seoPair = await resolveIndustrySeoPair(slug, {
    en: seoDefaultsFor(enResolution, 'en'),
    ar: seoDefaultsFor(arResolution, 'ar'),
  })

  return {
    locale,
    slug,
    resolution: localizedResolution,
    seo: publicationSafeSeo(localizedResolution, seoPair[locale]),
  }
}

function worldVisibleData(
  resolution: Extract<IndustryPageResolution, { kind: 'world' }>,
  locale: Locale,
) {
  const page = resolution.definition.locales[locale]
  return {
    name: page.hero.h1,
    currentBreadcrumb: page.breadcrumbLabel,
    services: page.sections
      .filter((section) => section.type === 'service-bridge')
      .flatMap((section) =>
        section.serviceAnchors.map((anchor) => ({
          id: anchor.serviceId,
          label: anchor.label,
          href: localePath(
            locale,
            CANONICAL_SERVICE_TARGETS[anchor.serviceId],
          ),
        })),
      ),
    faqs: page.sections
      .filter((section) => section.type === 'faq')
      .flatMap((section) =>
        section.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      ),
  }
}

function legacyVisibleData(
  resolution: Extract<IndustryPageResolution, { kind: 'legacy' }>,
) {
  return {
    name: resolution.legacy.heroTitle,
    currentBreadcrumb: resolution.legacy.breadcrumbLabels.current,
    services: resolution.legacy.services.map((service) => ({
      id: service.id,
      label: service.label,
      href: service.href,
    })),
    faqs: resolution.legacy.faqs,
  }
}

function buildRouteSchema(
  locale: Locale,
  slug: IndustrySlug,
  resolution: IndustryPageResolution,
  seo: EffectiveIndustrySeo,
) {
  const visible = resolution.kind === 'world'
    ? worldVisibleData(resolution, locale)
    : legacyVisibleData(resolution)
  const manifest = getIndustryManifestEntry(slug)

  return buildIndustryJsonLd({
    locale,
    seo,
    name: visible.name,
    description: seo.description,
    breadcrumbLabels: {
      home: locale === 'ar' ? 'الرئيسية' : 'Home',
      industries: locale === 'ar' ? 'القطاعات' : 'Industries',
      current: visible.currentBreadcrumb || manifest.label[locale],
    },
    services: visible.services,
    faqs: visible.faqs,
    validatedDateModified:
      resolution.kind === 'world' ? resolution.definition.updatedAt : undefined,
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, industry } = await params
  const route = await resolveRoute(locale, industry)
  return buildIndustryMetadata(route.seo)
}

export default async function IndustryPage({ params }: PageProps) {
  const { locale, industry } = await params
  const route = await resolveRoute(locale, industry)
  const schema = buildRouteSchema(
    route.locale,
    route.slug,
    route.resolution,
    route.seo,
  )

  // Closing "what people search for" band — appended after every world/shell
  // render so all industry pages get it without touching the bespoke worlds.
  const keywords = (
    <SearchKeywordsSection path={`/industries/${route.slug}`} locale={route.locale} />
  )

  if (route.resolution.kind === 'world') {
    const loadWorld = WORLD_COMPONENTS[route.slug]
    if (loadWorld) {
      const WorldPage = await loadWorld()

      return (
        <>
          <WorldPage
            locale={route.locale}
            definition={route.resolution.definition}
            seo={route.seo}
            schema={schema}
          />
          {keywords}
        </>
      )
    }

    return (
      <>
        <IndustryPageShell
          locale={route.locale}
          definition={route.resolution.definition}
          seo={route.seo}
          schema={schema}
        />
        {keywords}
      </>
    )
  }

  const { LegacyIndustryPage } = await import(
    '@/components/industry/detail/LegacyIndustryPage'
  )

  return (
    <>
      <LegacyIndustryPage
        locale={route.locale}
        viewModel={route.resolution.legacy}
        schema={schema}
      />
      {keywords}
    </>
  )
}
