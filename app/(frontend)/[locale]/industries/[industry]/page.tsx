import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { IndustryPageShell } from '@/components/industry/detail/IndustryPageShell'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import { buildIndustryJsonLd } from '@/lib/industries/build-industry-schema'
import { getIndustryPage, type IndustryPageResolution } from '@/lib/industries/get-industry-page'
import { getIndustryManifestEntry } from '@/lib/industries/manifest'
import { isIndustryResolutionPublicationReady } from '@/lib/industries/sitemap'
import {
  buildIndustryMetadata,
  resolveIndustrySeoPair,
  type EffectiveIndustrySeo,
  type IndustrySeoDefaults,
} from '@/lib/industries/resolve-industry-seo'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import { INDUSTRY_SLUGS, isIndustrySlug, type IndustrySlug } from '@/lib/industries/slugs'

type PageProps = {
  params: Promise<{ locale: string; industry: string }>
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
      // The new world is visible for design review immediately. It remains
      // noindex until the real editorial records and reviewed OG art exist.
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

function draftSafeSeo(
  resolution: IndustryPageResolution,
  seo: EffectiveIndustrySeo,
): EffectiveIndustrySeo {
  if (isIndustryResolutionPublicationReady(resolution)) return seo

  return {
    ...seo,
    index: false,
    languages: {},
  }
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
    seo: draftSafeSeo(localizedResolution, seoPair[locale]),
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

  if (route.resolution.kind === 'world') {
    if (route.slug === 'healthcare') {
      const { HealthcareIndustryPage } = await import(
        '@/components/industry/healthcare/HealthcareIndustryPage'
      )

      return (
        <HealthcareIndustryPage
          locale={route.locale}
          definition={route.resolution.definition}
          seo={route.seo}
          schema={schema}
        />
      )
    }

    return (
      <IndustryPageShell
        locale={route.locale}
        definition={route.resolution.definition}
        seo={route.seo}
        schema={schema}
      />
    )
  }

  const { LegacyIndustryPage } = await import(
    '@/components/industry/detail/LegacyIndustryPage'
  )

  return (
    <LegacyIndustryPage
      locale={route.locale}
      viewModel={route.resolution.legacy}
      schema={schema}
    />
  )
}
