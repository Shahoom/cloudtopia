import type { Metadata } from 'next'

import { IndustryPageShell } from '@/components/industry/detail/IndustryPageShell'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import { locales } from '@/lib/i18n/config'
import { INDUSTRY_SLUGS } from '@/lib/industries/slugs'
import {
  buildRouteSchema,
  resolveRoute,
} from '../_shared/industry-route'
import { buildIndustryMetadata } from '@/lib/industries/resolve-industry-seo'

type PageProps = {
  params: Promise<{ locale: string; industry: string }>
}

/**
 * Fallback dynamic route for industries WITHOUT a bespoke world entry. Every
 * bespoke world owns an explicit static route under `industries/<slug>/` so a
 * request for one industry never bundles the other worlds' components or CSS.
 */
const EXPLICIT_ROUTE_SLUGS = new Set<string>(
  INDUSTRY_SLUGS.filter((slug) => slug !== 'retail'),
)

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    INDUSTRY_SLUGS.filter((industry) => !EXPLICIT_ROUTE_SLUGS.has(industry)).map(
      (industry) => ({ locale, industry }),
    ),
  )
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

  // Closing "what people search for" band — appended after every shell render
  // so all industry pages get it.
  const keywords = (
    <SearchKeywordsSection path={`/industries/${route.slug}`} locale={route.locale} />
  )

  if (route.resolution.kind === 'world') {
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
