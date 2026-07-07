import { digitalPresenceGroups, type DPGroup, type DPPillar } from './digital-presence'
import { businessSystemsGroups } from './business-systems'
import { webApplicationsGroups } from './web-applications'
import { mobileAppGroups, cloudInfraGroups, aiSolutionsGroups } from './legacy-pillars'

/**
 * Aggregates every category that has been migrated to the new
 * group → pillar → sub-service structure. Add a category here and the services
 * hub, the /services/[slug] pillar pages, and search all pick it up — no per-
 * category special-casing. Category ids match the ids used in ServicesPageClient.
 */
export const structuredCatalog: Record<string, DPGroup[]> = {
    'digital-presence': digitalPresenceGroups,
    'business-systems-development': businessSystemsGroups,
    'interactive-web-applications': webApplicationsGroups,
    'mobile-app-development': mobileAppGroups,
    'cloud-infrastructure': cloudInfraGroups,
    'ai-powered-solutions': aiSolutionsGroups,
}

/**
 * Pillars that should KEEP rendering the original /services/[slug] ServiceDetail
 * template instead of the structured PillarPage — the Mobile/Cloud/AI services
 * that became standalone main pages but have no structured sub-content. The
 * [service] route checks this so these pages render exactly as before.
 */
export const legacyMainPagePillarSlugs = new Set<string>(
    [...mobileAppGroups, ...cloudInfraGroups, ...aiSolutionsGroups].flatMap((g) => g.pillars.map((p) => p.slug)),
)

export const structuredCategoryIds = Object.keys(structuredCatalog)

export function getStructuredGroups(categoryId: string): DPGroup[] | null {
    return structuredCatalog[categoryId] ?? null
}

export function getStructuredPillars(categoryId: string): DPPillar[] {
    return (structuredCatalog[categoryId] ?? []).flatMap((g) => g.pillars)
}

export const allStructuredPillars: DPPillar[] = Object.values(structuredCatalog)
    .flat()
    .flatMap((g) => g.pillars)

/**
 * Pillars that render via their OWN bespoke static route under
 * `app/(frontend)/[locale]/services/<segment>/` — the flagship pages with full
 * client-rendered content (Website Development, E-Commerce, Social Media
 * Marketing, Content Creation). They live at `/services/<segment>` like every
 * other pillar, but the DYNAMIC `[service]` route must not also pre-render them
 * (the static folder owns the URL), so they are excluded from
 * `structuredPillarRoutes` below (static params + sitemap dedupe).
 */
export const bespokePillarSlugs = new Set<string>([
    'website-development',
    'ecommerce-development',
    'social-media-management',
    'content-marketing-authority',
    // App Development is a bespoke pillar (MobileAppPillarPage) surfaced as an
    // overview card in the mobile catalog group; keep it out of the generic
    // structured routes/sitemap — the [service] dispatch renders it directly.
    'app-development',
])

/** Pillars that own a /services/[slug] page rendered by the DYNAMIC [service]
 *  route (used for static params + routing). Excludes bespoke pillars, which
 *  have their own static folders. */
export const structuredPillarRoutes = allStructuredPillars.filter(
    (p) => p.href.startsWith('/services/') && !bespokePillarSlugs.has(p.slug),
)

export function getStructuredPillarBySlug(slug: string): DPPillar | null {
    return allStructuredPillars.find((p) => p.slug === slug) ?? null
}

export function getStructuredGroupForPillar(slug: string): DPGroup | null {
    for (const groups of Object.values(structuredCatalog)) {
        const match = groups.find((g) => g.pillars.some((p) => p.slug === slug))
        if (match) return match
    }
    return null
}
