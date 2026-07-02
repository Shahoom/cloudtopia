import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { canonicalUrl } from '@/lib/i18n/url'
import { localizedDP } from '@/lib/services/digital-presence'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { webApplicationsGroups } from '@/lib/services/web-applications'
import { getWebappServiceContent } from '@/lib/services/webapp-service-content'
import WebAppPillarPage from '@/components/services/WebAppPillarPage'

/**
 * Interactive Web Application PILLAR pages now live at their own top-level
 * segment — /web-applications/<slug> — instead of /services/<slug> (the old
 * URLs 308-redirect here from the flat services route). Each renders the same
 * rich, bilingual WebAppPillarPage. FAQ JSON-LD is emitted inside that
 * component; Service + BreadcrumbList JSON-LD live in this route's layout.tsx.
 */

// The 5 web-app pillar slugs, sourced from the taxonomy so this stays in sync
// if a pillar is ever added or renamed.
const webAppPillarSlugs: string[] = webApplicationsGroups.flatMap((g) => g.pillars.map((p) => p.slug))

export function generateStaticParams() {
    return ['en', 'ar'].flatMap((locale) => webAppPillarSlugs.map((pillar) => ({ locale, pillar })))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; pillar: string }>
}): Promise<Metadata> {
    const { locale = 'en', pillar } = await params
    const p = getStructuredPillarBySlug(pillar)
    const path = `/web-applications/${pillar}`
    const brand = locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia'
    if (!p) {
        return {
            title: locale === 'ar' ? 'تطبيقات الويب' : 'Web Applications',
            alternates: {
                canonical: canonicalUrl(locale, path),
                languages: { en: canonicalUrl('en', path), ar: canonicalUrl('ar', path), 'x-default': canonicalUrl('en', path) },
            },
        }
    }
    const pName = localizedDP(p.name, locale)
    const pDesc = localizedDP(p.description, locale)
    return {
        // Bare title — the layout's `%s | CloudTopia` template appends the brand once.
        title: pName,
        description: pDesc,
        openGraph: {
            title: `${pName} | ${brand}`,
            description: pDesc,
            url: canonicalUrl(locale, path),
            siteName: 'CloudTopia',
            type: 'website',
        },
        alternates: {
            canonical: canonicalUrl(locale, path),
            languages: {
                en: canonicalUrl('en', path),
                ar: canonicalUrl('ar', path),
                'x-default': canonicalUrl('en', path),
            },
        },
    }
}

export default async function WebApplicationPillarRoute({
    params,
}: {
    params: Promise<{ locale: string; pillar: string }>
}) {
    const { locale = 'en', pillar } = await params
    const data = getWebappServiceContent(pillar)
    if (!data) notFound()
    return <WebAppPillarPage slug={pillar} data={data} locale={locale} />
}
