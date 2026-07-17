import type { Metadata } from 'next'
import { buildHreflangMap, canonicalUrl, stripBrandSuffix } from '../i18n/url.ts'
import { ogImagesFor } from '../og/og-image.ts'
import { getPageBundle } from './content.ts'
import { normalizePageSlug } from './page-structure.ts'
import { applySeoOverride } from './route-seo.ts'

const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA' }
const ogAlternateLocales: Record<string, string> = { en: 'ar_SA', ar: 'en_US' }

// Locale-aware brand line used ONLY as the ultimate title fallback. Returned via
// `title.absolute` so the root layout's `%s | CloudTopia` template does NOT append
// a second brand (which produced "CloudTopia | CloudTopia" on title-less pages).
const brandTitles: Record<string, string> = {
  en: 'CloudTopia — Digital & Cloud Technologies',
  ar: 'كلاود توبيا — تقنيات رقمية وسحابية',
}

const defaultDescriptions: Record<string, string> = {
  en: 'CloudTopia builds websites, e-commerce stores, custom systems, and web applications.',
  ar: 'كلاود توبيا تبني المواقع والمتاجر الإلكترونية والأنظمة المخصصة وتطبيقات الويب.',
}

/**
 * Page-specific, keyword-optimised defaults used when the CMS has no SEO record
 * for the page. CMS values (seo.title / bundle.page.title) always take
 * precedence, so editors can override, but a missing CMS record no longer falls
 * back to a generic site-wide title/description.
 */
export type CMSMetadataFallback = {
  title?: string
  description?: string
}

export async function getCMSMetadata(
  locale: string,
  slug: string,
  ogPage?: string,
  fallback?: CMSMetadataFallback,
): Promise<Metadata> {
  const normalized = normalizePageSlug(slug)
  const path = normalized === '/' ? '/' : `/${normalized}`
  const bundle = await getPageBundle(locale as any, normalized)
  const seo = (bundle.seo || {}) as Record<string, any>
  // Strip any existing " | CloudTopia" so the layout template adds exactly one
  // brand; when no title source exists, fall back to the localized brand line via
  // `title.absolute` instead of the bare "CloudTopia" (which double-branded).
  // Real CMS records (editor-entered) outrank code fallbacks; synthesized SEO
  // (invented from dictionary copy when no CMS record exists) must NOT — it
  // produced titleized-slug og:titles and footer taglines as descriptions.
  const synthesized = Boolean(seo.synthesized)
  const rawTitle = synthesized
    ? fallback?.title || seo.title || bundle.page?.title
    : seo.title || bundle.page?.title || fallback?.title
  const cleanTitle = rawTitle ? stripBrandSuffix(String(rawTitle)) : ''
  const brandLine = brandTitles[locale] || brandTitles.en
  const metadataTitle: Metadata['title'] = cleanTitle ? cleanTitle : { absolute: brandLine }
  const ogTitle = cleanTitle || brandLine
  const description = String(
    (synthesized
      ? fallback?.description || seo.description
      : seo.description || fallback?.description) ||
      bundle.dictionary.footer?.description ||
      defaultDescriptions[locale] ||
      defaultDescriptions.en,
  )
  const imagePage = ogPage || (normalized === '/' ? 'home' : normalized)

  const result: Metadata = {
    title: metadataTitle,
    description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl(locale, path),
      locale: ogLocales[locale] || ogLocales.en,
      alternateLocale: ogAlternateLocales[locale] || ogAlternateLocales.en,
      images: ogImagesFor({ page: imagePage, locale }),
    },
    twitter: {
      title: ogTitle,
      description,
      images: ogImagesFor({ page: imagePage, locale }).map((image) => image.url),
    },
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: buildHreflangMap(path),
    },
  }

  return applySeoOverride(result, locale, normalized)
}
