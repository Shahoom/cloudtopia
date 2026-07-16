import 'server-only'

import type { MetadataRoute } from 'next'

import { locales } from '@/lib/i18n/config'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import {
  getIndustryPage,
  type IndustryPageResolution,
} from '@/lib/industries/get-industry-page'
import { getIndustryManifestEntry } from '@/lib/industries/manifest'
import { INDUSTRY_SLUGS, isIndustrySlug } from '@/lib/industries/slugs'

/**
 * Legacy pages are already published. Registering a new world only makes its
 * design previewable; it does not make that world publication-ready. This is
 * the shared fail-closed decision used by route metadata and sitemap output
 * until real review records and verified localized OG assets are wired in.
 */
export function isIndustryResolutionPublicationReady(
  resolution: IndustryPageResolution,
): boolean {
  return resolution.kind === 'legacy'
}

export function isResolverOwnedIndustryCmsSlug(value: unknown): boolean {
  if (typeof value !== 'string') return false

  const normalized = value.trim().replace(/^\/+|\/+$/gu, '')
  const match = /^industries\/([^/]+)$/u.exec(normalized)
  return Boolean(match && isIndustrySlug(match[1]))
}

export function buildBaseIndustrySitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const slug of INDUSTRY_SLUGS) {
    const manifest = getIndustryManifestEntry(slug)
    if (!manifest.discovery.sitemap) continue

    const resolutions = locales.map((locale) => getIndustryPage(slug, locale))
    if (!resolutions.every(isIndustryResolutionPublicationReady)) continue

    const languages = buildHreflangMap(manifest.route)
    for (const locale of locales) {
      entries.push({
        url: canonicalUrl(locale, manifest.route),
        changeFrequency: 'monthly',
        priority: 0.78,
        alternates: { languages },
      })
    }
  }

  return entries
}
