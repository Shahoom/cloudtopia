import 'server-only'

import type { MetadataRoute } from 'next'

import { locales } from '@/lib/i18n/config'
import { BASE_URL, buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import {
  getIndustryPage,
  type IndustryPageResolution,
} from '@/lib/industries/get-industry-page'
import { getIndustryManifestEntry } from '@/lib/industries/manifest'
import { INDUSTRY_SLUGS, isIndustrySlug } from '@/lib/industries/slugs'

/**
 * Legacy pages are already published. New worlds fail closed until their
 * definition is explicitly marked published after content and asset review.
 * This shared decision keeps route metadata and sitemap output atomic.
 */
export function isIndustryResolutionPublicationReady(
  resolution: IndustryPageResolution,
): boolean {
  return (
    resolution.kind === 'legacy' ||
    resolution.definition.publicationStatus === 'published'
  )
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
      const resolution = resolutions[locales.indexOf(locale)]
      const ogImage = resolution.kind === 'world'
        ? resolution.definition.assets.find(
            (asset) => asset.kind === 'og-image' && asset.locale === locale,
          )
        : undefined

      entries.push({
        url: canonicalUrl(locale, manifest.route),
        ...(resolution.kind === 'world' && resolution.definition.updatedAt
          ? { lastModified: new Date(`${resolution.definition.updatedAt}T00:00:00.000Z`) }
          : {}),
        changeFrequency: 'monthly',
        priority: 0.78,
        alternates: { languages },
        ...(ogImage?.kind === 'og-image'
          ? { images: [`${BASE_URL}${ogImage.publicPath}`] }
          : {}),
      })
    }
  }

  return entries
}
