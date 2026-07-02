import type { DPSubServiceContent } from '@/components/services/DigitalPresenceSubServicePage'
import { generatedDPSubServices } from './digital-presence-subservices'
import { generatedDPSubServicesAr } from './digital-presence-subservices-ar'
import { getDigitalPresencePillarBySlug } from './digital-presence'
import { subServiceHref } from './sub-service-routing'

// Mirrors the slug generation used when content was created, so sub-services can
// be listed in the catalog's curated (high-demand-first) order, not alphabetical.
const dpSlugify = (s: string) =>
    s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** Tailored Digital Presence sub-service pages (bespoke geometric-hero design). */
export const dpSubServiceContent: Record<string, DPSubServiceContent> = {
    ...generatedDPSubServices,
}

/** Arabic translations (same shape); falls back to English per-entry at the getter. */
export const dpSubServiceContentAr: Record<string, DPSubServiceContent> = {
    ...generatedDPSubServicesAr,
}

export function getDigitalPresenceSubService(slug: string, locale = 'en'): DPSubServiceContent | null {
    if (locale === 'ar') return dpSubServiceContentAr[slug] ?? dpSubServiceContent[slug] ?? null
    return dpSubServiceContent[slug] ?? null
}

/** All DP sub-services that belong to a pillar, with slug + display copy. */
export function getDigitalPresenceSubServicesByPillar(
    pillarSlug: string,
    locale = 'en',
): { slug: string; name: string; desc: string; href: string }[] {
    const all = Object.values(dpSubServiceContent).filter((s) => s.pillarSlug === pillarSlug)
    const bySlug = new Map(all.map((s) => [s.slug, s]))
    const ordered: DPSubServiceContent[] = []
    const pillar = getDigitalPresencePillarBySlug(pillarSlug)
    if (pillar) {
        for (const name of pillar.subServices) {
            const s = bySlug.get(dpSlugify(name))
            if (s) { ordered.push(s); bySlug.delete(s.slug) }
        }
    }
    for (const s of bySlug.values()) ordered.push(s)
    return ordered.map((s) => {
        const loc = locale === 'ar' ? (dpSubServiceContentAr[s.slug] ?? s) : s
        return { slug: s.slug, name: loc.service, desc: loc.hero.subtitle, href: subServiceHref(pillarSlug, s.slug) }
    })
}

export const dpSubServiceSlugs = Object.keys(dpSubServiceContent)
