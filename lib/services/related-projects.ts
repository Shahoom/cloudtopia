import type { Project } from '@/lib/projects'

/**
 * Data-driven "Projects we did" selection.
 *
 * Each project is tagged in the CMS via the `relatedServiceSlugs` field
 * (comma/space-separated slugs). `pickProjectsForService` resolves the most
 * relevant projects for a given service using a fallback chain that guarantees
 * the section is never empty (as long as any project exists):
 *
 *   exact serviceSlug → pillarSlug → categorySlug → featured (closest) → all
 *
 * ---------------------------------------------------------------------------
 * BACKFILL MAPPING (apply in Payload admin — Task 12b; NOT written by code)
 * ---------------------------------------------------------------------------
 * Set `relatedServiceSlugs` on each existing CMS project to the value below.
 * Derived from the (now-removed) hardcoded WEBSITE_PROJECT_IDS / WEBAPP_PROJECT_IDS
 * maps in app/(frontend)/[locale]/services/[service]/page.tsx. Pillar slugs are
 * appended so the pillar/category fallback also resolves these projects.
 *
 *   kvaii-logistics       → business-website-development, corporate-website-development, website-development
 *   ram-sustainable       → business-website-development, corporate-website-development, website-development
 *   lumma-clinics         → business-website-development, portfolio-websites, website-development
 *   artucky-ecommerce     → ecommerce-website-development, ecommerce-development
 *   joory-cafe            → restaurant-and-hospitality-website-development, restaurant-website-development, website-development
 *   luxury-world-tourism  → custom-web-application-development, progressive-web-app-development, interactive-web-applications
 *   comics-topia          → custom-web-application-development, interactive-web-applications
 *   dhofar-tourism        → custom-web-application-development, progressive-web-app-development, interactive-web-applications
 *
 * Notes:
 * - The old website map keyed off slugs `corporate-website-design`,
 *   `ecommerce-website-development`, `restaurant-website-development`,
 *   `portfolio-websites`. The redesigned taxonomy renamed several of these
 *   (e.g. corporate-website-development, restaurant-and-hospitality-website-development);
 *   tagging both the legacy and current slug plus the pillar keeps matches robust.
 * - Until the backfill runs, pages fall back to `featured` → `all`, so the
 *   section still renders real client work instead of going blank.
 */

export type ServiceMatch = { serviceSlug: string; pillarSlug?: string; categorySlug?: string; limit?: number }

export function pickProjectsForService(all: Project[], m: ServiceMatch): Project[] {
  const limit = m.limit ?? 6
  const has = (p: Project, slug?: string) => !!slug && (p.relatedServiceSlugs ?? []).includes(slug)
  const exact = all.filter((p) => has(p, m.serviceSlug))
  const byPillar = all.filter((p) => has(p, m.pillarSlug) && !exact.includes(p))
  const byCat = all.filter((p) => has(p, m.categorySlug) && !exact.includes(p) && !byPillar.includes(p))
  const closest = all.filter((p) => p.featured)

  // Tagged buckets are authoritative: if a project is explicitly tagged for this
  // service / pillar / category, surface those and stop — don't dilute a precise
  // match with unrelated work. Only when *nothing* is tagged do we fall back to
  // featured (closest) → all, which guarantees the section is never empty.
  const tagged: Project[] = []
  for (const bucket of [exact, byPillar, byCat]) {
    for (const p of bucket) if (!tagged.includes(p)) tagged.push(p)
  }
  if (tagged.length > 0) return tagged.slice(0, limit)

  const fallback: Project[] = []
  for (const bucket of [closest, all]) {
    for (const p of bucket) if (!fallback.includes(p)) fallback.push(p)
    if (fallback.length >= limit) break
  }
  return fallback.slice(0, limit)
}

export async function getProjectsForService(locale: string, m: ServiceMatch): Promise<Project[]> {
  const { getAllProjects } = await import('@/lib/projects')
  return pickProjectsForService(await getAllProjects(locale), m)
}
