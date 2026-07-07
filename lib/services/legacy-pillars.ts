import type { LocalizedText } from '@/lib/seo/industries'
import type { DPGroup, DPPillar } from './digital-presence'
import { serviceCategories } from '@/lib/seo/services'

/**
 * Mobile App Development, Cloud & Infrastructure, and AI-Powered Solutions are
 * surfaced in the structured catalog as categories whose every service is its
 * OWN main page (no sub-services). The pages themselves stay the existing
 * /services/[slug] pages — the [service] route lets these zero-sub pillars fall
 * through to the original ServiceDetail template (see page.tsx).
 */

const CAT_ICON: Record<string, string> = {
    'mobile-app-development': '/icons/services/Mobile-Responsive Apps.png',
    'cloud-infrastructure': '/icons/services/systems.png',
    'ai-powered-solutions': '/icons/services/Real-time Chat System.png',
}

// `hrefBase` overrides where each service links. Mobile App Development is now
// a real pillar at /services/app-development with every service NESTED beneath
// it (/services/app-development/<slug>), so its links must point there directly
// — otherwise the old flat /services/<slug> URL 301-redirects on every click.
// Cloud & AI stay flat (no pillar nesting), so they keep the default base.
function categoryToGroups(categorySlug: string, groupName: LocalizedText, tagline: LocalizedText, hrefBase = '/services'): DPGroup[] {
    const cat = serviceCategories.find((c) => c.slug === categorySlug)
    if (!cat || cat.services.length === 0) return []
    const icon = CAT_ICON[categorySlug] || '/icons/services/Admin Dashboard.png'
    const pillars: DPPillar[] = cat.services.map((s) => ({
        slug: s.slug,
        name: s.name,
        description: s.description,
        icon,
        href: `${hrefBase}/${s.slug}`,
        subServices: [],
    }))
    return [{ slug: `${categorySlug}-services`, tagline, name: groupName, pillars }]
}

export const mobileAppGroups: DPGroup[] = (() => {
    const groups = categoryToGroups(
        'mobile-app-development',
        { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
        { en: 'iOS, Android & cross-platform', ar: 'iOS وأندرويد ومتعدد المنصات' },
        '/services/app-development',
    )
    // Lead the group with an overview card linking to the MAIN pillar page
    // (/services/app-development). Without it the group lists only the sub-
    // services and the pillar itself is unreachable from the mega-menu and the
    // /services grid.
    groups[0]?.pillars.unshift({
        slug: 'app-development',
        name: { en: 'App Development', ar: 'تطوير التطبيقات' },
        description: {
            en: 'The complete app pillar — iOS, Android & cross-platform, designed, built, launched, and grown by one team.',
            ar: 'ركيزة التطبيقات الكاملة — iOS وأندرويد ومتعدد المنصات، نُصمّمها ونبنيها ونُطلقها وننمّيها بفريق واحد.',
        },
        icon: CAT_ICON['mobile-app-development'],
        href: '/services/app-development',
        subServices: [],
    })
    return groups
})()
export const cloudInfraGroups = categoryToGroups(
    'cloud-infrastructure',
    { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' },
    { en: 'Hosting, migration & DevOps', ar: 'استضافة وترحيل وDevOps' },
)
export const aiSolutionsGroups = categoryToGroups(
    'ai-powered-solutions',
    { en: 'AI-Powered Solutions', ar: 'حلول الذكاء الاصطناعي' },
    { en: 'Assistants, automation & ML', ar: 'مساعدون وأتمتة وتعلّم آلي' },
)
