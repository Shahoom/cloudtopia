export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  ar: 'AR',
}

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
}

/** True when `value` is a content locale we actually serve. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/**
 * Coerce any value to a valid content locale, falling back to the default.
 *
 * The `locale` column on localized collections (blog_posts, projects,
 * site_content, pages) is a Postgres enum. The `[locale]` route segment can
 * capture non-locale paths (e.g. a `/favicon.png` request → locale
 * "favicon.png"), and feeding that straight into `where locale = $1` throws an
 * "invalid input value for enum" error. Always coerce before querying.
 */
export function coerceLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale
}

