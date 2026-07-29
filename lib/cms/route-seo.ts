import 'server-only'
import { cache } from 'react'
import type { Metadata } from 'next'
import { isDatabaseConfigured, queryDatabase } from './db.ts'

export type SeoOverride = {
  metaTitle?: string | null
  metaDescription?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  noFollow?: boolean | null
}

// Canonical key for an override: locale-less route path, no leading/trailing
// slash, home is "/". So "/services", "services" and "services/" all match.
export function normalizeRoutePath(path: string): string {
  if (!path) return '/'
  const p = path.trim()
  if (p === '/' || p === '') return '/'
  return p.replace(/^\/+/, '').replace(/\/+$/, '') || '/'
}

// Per-request memoized lookup. Wrapped in try/catch so a missing seo_overrides
// table (e.g. before the migration runs) silently yields no override rather than
// breaking every page's metadata.
export const getSeoOverride = cache(async (locale: string, path: string): Promise<SeoOverride | null> => {
  if (!isDatabaseConfigured()) return null
  const routePath = normalizeRoutePath(path)
  const loc = locale === 'ar' ? 'ar' : 'en'
  try {
    const rows = await queryDatabase<{
      meta_title: string | null
      meta_description: string | null
      canonical_url: string | null
      no_index: boolean | null
      no_follow: boolean | null
    }>(
      'select meta_title, meta_description, canonical_url, no_index, no_follow from seo_overrides where route_path = $1 and locale = $2 limit 1',
      [routePath, loc],
    )
    const r = rows?.[0]
    if (!r) return null
    return {
      metaTitle: r.meta_title,
      metaDescription: r.meta_description,
      canonicalUrl: r.canonical_url,
      noIndex: r.no_index,
      noFollow: r.no_follow,
    }
  } catch {
    return null
  }
})

// Merge an override over a computed Metadata object. Override wins for the tab
// title, description, robots, and canonical when set; everything else (OG image,
// hreflang alternates, etc.) is preserved from the base.
export async function applySeoOverride(base: Metadata, locale: string, path: string): Promise<Metadata> {
  const o = await getSeoOverride(locale, path)
  if (!o) return base
  const out: Metadata = { ...base }
  if (o.metaTitle) {
    out.title = { absolute: o.metaTitle }
    out.openGraph = { ...(base.openGraph || {}), title: o.metaTitle }
    out.twitter = { ...(base.twitter || {}), title: o.metaTitle }
  }
  if (o.metaDescription) {
    out.description = o.metaDescription
    out.openGraph = { ...(out.openGraph || base.openGraph || {}), description: o.metaDescription }
    out.twitter = { ...(out.twitter || base.twitter || {}), description: o.metaDescription }
  }
  if (o.noIndex || o.noFollow) {
    const index = !o.noIndex
    const follow = !o.noFollow
    // A nofollow-only (still-indexable) override must not silently drop the
    // site-wide rich-preview directives. Replacing the whole robots object
    // discards the inherited googleBot max-image-preview:large / max-snippet:-1
    // (preserved elsewhere by omitting the robots key — see lib/cms/metadata.ts),
    // so re-assert them whenever the page remains indexable.
    out.robots = index
      ? {
          index,
          follow,
          googleBot: {
            index,
            follow,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index, follow }
  }
  if (o.canonicalUrl) {
    out.alternates = { ...(base.alternates || {}), canonical: o.canonicalUrl }
  }
  return out
}
