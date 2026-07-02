import { getBusinessSystemsSubServicesByPillar } from './business-systems-content'
import { getDigitalPresenceSubServicesByPillar } from './digital-presence-content'
import { getWebApplicationsSubServicesByPillar } from './web-applications'
import { getStructuredPillarBySlug } from './structured-catalog'

/**
 * Resolve a pillar's sub-service *names* localized to the given locale.
 *
 * The pillar grid on the services hub (and the DetailedServicesSection fallback)
 * historically rendered `pillar.subServices` — an English-only `string[]` — even
 * on `/ar`. Localized names DO exist via the per-category content getters, so
 * this helper tries each in turn and returns the first non-empty list, falling
 * back to the raw English `subServices` only when no content getter matches.
 *
 *   1. Business Systems  → getBusinessSystemsSubServicesByPillar → `.name`
 *   2. Digital Presence  → getDigitalPresenceSubServicesByPillar → `.name`
 *   3. Web Applications  → getWebApplicationsSubServicesByPillar → `.name`
 *   4. fallback          → getStructuredPillarBySlug(pillarSlug)?.subServices
 *
 * @param limit optional slice applied to the resolved list.
 */
export function getLocalizedPillarSubServiceNames(
    pillarSlug: string,
    locale: string,
    limit?: number,
): string[] {
    const bs = getBusinessSystemsSubServicesByPillar(pillarSlug, locale).map((s) => s.name)
    const dp = bs.length > 0 ? bs : getDigitalPresenceSubServicesByPillar(pillarSlug, locale).map((s) => s.name)
    const wa = dp.length > 0 ? dp : getWebApplicationsSubServicesByPillar(pillarSlug, locale).map((s) => s.name)
    const names = wa.length > 0 ? wa : (getStructuredPillarBySlug(pillarSlug)?.subServices ?? [])
    return typeof limit === 'number' ? names.slice(0, limit) : names
}
