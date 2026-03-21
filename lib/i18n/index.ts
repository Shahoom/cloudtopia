export { locales, defaultLocale, localeNames, localeDirection } from './config'
export type { Locale } from './config'
export { en } from './translations/en'
export { ar } from './translations/ar'
export { tr } from './translations/tr'

import { en } from './translations/en'
import { ar } from './translations/ar'
import { tr } from './translations/tr'
import type { Locale } from './config'

const dictionaries = {
    en,
    ar,
    tr,
}

export const getDictionary = async (locale: Locale) => dictionaries[locale] || dictionaries.en
