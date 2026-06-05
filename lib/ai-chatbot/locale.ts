import type { ChatLocale } from './types.ts'
import { detectLanguage } from './leadExtractor.ts'

export function resolveChatLocale({
  siteLocale,
  latestMessage,
}: {
  siteLocale?: ChatLocale | null
  latestMessage: string
}): ChatLocale {
  if (siteLocale === 'ar' || siteLocale === 'en') return siteLocale
  return detectLanguage(latestMessage, 'unknown')
}

export function normalizeChatLocale(locale: unknown): ChatLocale {
  return locale === 'ar' || locale === 'en' ? locale : 'unknown'
}
