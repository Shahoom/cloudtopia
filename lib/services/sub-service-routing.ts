import { getStructuredPillarBySlug } from './structured-catalog'
import { getDigitalPresenceSubService } from './digital-presence-content'
import { getBusinessSystemsSubService } from './business-systems-content'

/**
 * Sub-service URLs are nested under their parent pillar's PUBLIC identity, e.g.
 * `/services/content-creation/website-copywriting`. The parent segment is derived
 * from the pillar's public href, not its slug:
 *   - pillars that own a /services/<slug> page      → use the pillar slug
 *   - pillars that live at a bespoke top-level page → use that page's segment
 *     (social-media-management → `social-media-marketing`,
 *      content-marketing-authority → `content-creation`, website-development, …)
 *
 * These helpers are the single source of truth for that mapping so cards, the
 * nested route, the flat-route redirect, and the sitemap all agree.
 *
 * NOTE on imports: the content modules import `subServiceHref` from here for their
 * card getters. `subServiceParent` / `subServiceHref` only touch structured-catalog
 * (no content), so that path is cycle-free at module init. `findSubServiceParent`
 * does reach back into the content getters, but only inside its function body (at
 * request time), so the ESM cycle never fires during evaluation.
 */

/** Parent URL segment for a sub-service, derived from its pillar's public href. */
export function subServiceParent(pillarSlug: string): string {
    const pillar = getStructuredPillarBySlug(pillarSlug)
    // Fall back to the raw pillarSlug if the pillar can't be resolved — keeps the
    // URL deterministic rather than throwing during static generation.
    if (!pillar) return pillarSlug
    return pillar.href.startsWith('/services/') ? pillar.slug : pillar.href.replace(/^\//, '')
}

/** Nested, locale-agnostic href for a sub-service page. */
export function subServiceHref(pillarSlug: string, subSlug: string): string {
    return `/services/${subServiceParent(pillarSlug)}/${subSlug}`
}

/**
 * Locate a sub-service (by its own slug) in the DP or BS content and return its
 * parent URL segment. Used by the flat-route 301 redirect to send an old
 * `/services/<sub>` URL to its correct nested home.
 */
export function findSubServiceParent(subSlug: string): string | null {
    const bs = getBusinessSystemsSubService(subSlug)
    if (bs) return subServiceParent(bs.pillarSlug)
    const dp = getDigitalPresenceSubService(subSlug)
    if (dp) return subServiceParent(dp.pillarSlug)
    return null
}
