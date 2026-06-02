export { locales, defaultLocale, localeNames, localeDirection } from './config'
export type { Locale } from './config'
export { en } from './translations/en'
export { ar } from './translations/ar'

import { en } from './translations/en'
import { ar } from './translations/ar'
import type { Locale } from './config'
import { getPageBundle, getCMSDictionary } from '@/lib/cms/content'

const dictionaries = {
    en,
    ar,
}

export const getStaticDictionary = (locale: Locale) => dictionaries[locale] || dictionaries.en

export const getDictionary = async (locale: Locale, slug?: string) => {
    if (!slug) return getCMSDictionary(locale)
    const bundle = await getPageBundle(locale, slug)
    return bundle.dictionary
}
