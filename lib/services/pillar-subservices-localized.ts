import type { Locale } from '@/lib/i18n/config'
import { getSubserviceNavItems } from './subservice-nav-index'
import { getStructuredPillarBySlug } from './structured-catalog'

/**
 * Resolve a pillar's sub-service *names* localized to the given locale.
 *
 * Backed by the generated compact navigation index so client bundles never
 * import the full bilingual service content databases. Falls back to the raw
 * English `subServices` from the structured catalog only when the index has no
 * entry for the pillar.
 *
 * @param limit optional slice applied to the resolved list.
 */
export function getLocalizedPillarSubServiceNames(
    pillarSlug: string,
    locale: string,
    limit?: number,
): string[] {
    const items = getSubserviceNavItems(pillarSlug, (locale === 'ar' ? 'ar' : 'en') as Locale)
    const names = items.length > 0
        ? items.map((s) => s.name)
        : (getStructuredPillarBySlug(pillarSlug)?.subServices ?? [])
    return typeof limit === 'number' ? names.slice(0, limit) : names
}
