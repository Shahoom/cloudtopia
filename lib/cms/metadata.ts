import type { Metadata } from 'next'
import { buildHreflangMap, canonicalUrl } from '../i18n/url.ts'
import { ogImagesFor } from '../og/og-image.ts'
import { getPageBundle } from './content.ts'
import { normalizePageSlug } from './page-structure.ts'

const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA' }

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
  const title = String(seo.title || bundle.page?.title || fallback?.title || 'CloudTopia')
  const description = String(
    seo.description ||
      fallback?.description ||
      bundle.dictionary.footer?.description ||
      defaultDescriptions[locale] ||
      defaultDescriptions.en,
  )
  const imagePage = ogPage || (normalized === '/' ? 'home' : normalized)

  return {
    title,
    description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, path),
      locale: ogLocales[locale] || ogLocales.en,
      images: ogImagesFor({ page: imagePage, locale }),
    },
    twitter: {
      title,
      description,
      images: ogImagesFor({ page: imagePage, locale }).map((image) => image.url),
    },
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: buildHreflangMap(path),
    },
  }
}
