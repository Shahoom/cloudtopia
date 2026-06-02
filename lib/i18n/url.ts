import { defaultLocale, locales, type Locale } from './config'

export const BASE_URL = 'https://cloudtopia.net'

/**
 * English is unprefixed-canonical: `cloudtopia.net/projects`. Arabic keeps
 * the locale segment: `cloudtopia.net/ar/projects`. Every
 * URL the site emits — internal `<Link>`, canonical, hreflang, sitemap,
 * RSS, JSON-LD — flows through this single helper so the rule is enforced
 * in one place.
 */
export function localePath(locale: string, path: string = '/'): string {
    const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
    if (locale === defaultLocale) return clean === '' ? '/' : clean
    return `/${locale}${clean}`
}

export function canonicalUrl(locale: string, path: string = '/'): string {
    return `${BASE_URL}${localePath(locale, path)}`
}

export function buildHreflangMap(pathSuffix: string): Record<string, string> {
    const path = pathSuffix === '' ? '/' : pathSuffix
    return {
        en: canonicalUrl('en', path),
        ar: canonicalUrl('ar', path),
        'x-default': canonicalUrl('en', path),
    }
}

/**
 * Drop the leading `/<locale>` segment if present. `/ar/projects` → `/projects`,
 * `/projects` → `/projects`, `/ar` → `/`. Used by LanguageContext.setLocale to
 * compute the locale-agnostic path before re-prefixing with the new locale.
 */
export function stripLocalePrefix(pathname: string): string {
    const seg = pathname.split('/')[1]
    if (locales.includes(seg as Locale)) {
        const rest = pathname.slice(seg.length + 1)
        return rest === '' ? '/' : rest
    }
    return pathname
}
