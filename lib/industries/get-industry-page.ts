import 'server-only'

import type { Locale } from '@/lib/i18n/config'
import {
  adaptLegacyIndustry,
  type LegacyIndustryViewModel,
} from '@/lib/industries/legacy-adapter'
import { industryPageRegistry } from '@/lib/industries/definitions/registry'
import { isIndustrySlug, type IndustrySlug } from '@/lib/industries/slugs'
import type { IndustryPageDefinition } from '@/lib/industries/types'
import { getIndustry } from '@/lib/seo/industries'

export type IndustryPageResolution =
  | {
      kind: 'world'
      slug: IndustrySlug
      definition: IndustryPageDefinition
    }
  | {
      kind: 'legacy'
      slug: IndustrySlug
      legacy: LegacyIndustryViewModel
    }

export function getIndustryPage(
  slug: IndustrySlug,
  locale: Locale,
): IndustryPageResolution {
  if (!isIndustrySlug(slug)) {
    throw new Error(`Unknown industry slug: ${slug}`)
  }

  const definition = industryPageRegistry[slug]
  if (definition) {
    return { kind: 'world', slug, definition }
  }

  const industry = getIndustry(slug)
  if (!industry) {
    throw new Error(`Missing legacy industry data: ${slug}`)
  }

  return {
    kind: 'legacy',
    slug,
    legacy: adaptLegacyIndustry(locale, industry),
  }
}
