import { industriesSearchKeywords } from './industries'
import { servicesPillarsSearchKeywords } from './services-pillars'
import { servicesSubservicesBsSearchKeywords } from './services-subservices-bs'
import { servicesSubservicesDpSearchKeywords } from './services-subservices-dp'

export type SearchKeywordsEntry = {
    /** Localized section heading, e.g. "What businesses search for". */
    heading: string
    /** 1–2 natural sentences connecting the phrases to this page. */
    intro: string
    /** 2–4 themed groups of natural search phrases (4–8 phrases each). */
    groups: { label: string; phrases: string[] }[]
}

export type SearchKeywordsRecord = {
    en: SearchKeywordsEntry
    ar: SearchKeywordsEntry
}

/**
 * Curated per-page search-intent phrases, keyed by the EN route path
 * ('/services/website-development', '/industries/healthcare', ...).
 * Split by section to keep files reviewable; merged here.
 */
const ALL: Record<string, SearchKeywordsRecord> = {
    ...industriesSearchKeywords,
    ...servicesPillarsSearchKeywords,
    ...servicesSubservicesBsSearchKeywords,
    ...servicesSubservicesDpSearchKeywords,
}

export function getSearchKeywords(path: string, locale: string): SearchKeywordsEntry | null {
    const record = ALL[path]
    if (!record) return null
    return locale === 'ar' ? record.ar : record.en
}

export function searchKeywordsPaths(): string[] {
    return Object.keys(ALL)
}
