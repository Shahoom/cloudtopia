import type { Metadata } from 'next'
import { buildHreflangMap, canonicalUrl } from '../i18n/url.ts'
import { ogImagesFor } from '../og/og-image.ts'
import { getPageBundle } from './content.ts'
import { normalizePageSlug } from './page-structure.ts'

const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }

export async function getCMSMetadata(locale: string, slug: string, ogPage?: string): Promise<Metadata> {
  const normalized = normalizePageSlug(slug)
  const path = normalized === '/' ? '/' : `/${normalized}`
  const bundle = await getPageBundle(locale as any, normalized)
  const seo = (bundle.seo || {}) as Record<string, any>
  const title = String(seo.title || bundle.page?.title || 'CloudTopia')
  const description = String(
    seo.description ||
      bundle.dictionary.footer?.description ||
      'CloudTopia builds websites, e-commerce stores, custom systems, and web applications.',
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
