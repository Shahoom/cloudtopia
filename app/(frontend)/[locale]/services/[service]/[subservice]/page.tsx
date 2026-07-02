import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'
import { SubServicePage } from '@/components/services/SubServicePage'
import { DigitalPresenceSubServicePage } from '@/components/services/DigitalPresenceSubServicePage'
import { getBusinessSystemsSubService, businessSystemsSubServiceSlugs } from '@/lib/services/business-systems-content'
import { getDigitalPresenceSubService, dpSubServiceSlugs } from '@/lib/services/digital-presence-content'
import { subServiceParent, findSubServiceParent } from '@/lib/services/sub-service-routing'

/**
 * Nested sub-service route: /services/<service>/<subservice>.
 *
 * A sub-service page (Digital Presence or Business Systems) lives under its parent
 * pillar's public segment — e.g. /services/content-creation/website-copywriting.
 * The render + metadata mirror the branches that used to live on the flat
 * /services/[service] route; that flat route now 301-redirects the old bare
 * /services/<sub> URLs here.
 */

type PageProps = {
    params: Promise<{ locale: string; service: string; subservice: string }>
}

export function generateStaticParams() {
    // One nested entry per DP sub and BS sub, keyed by its correct parent segment,
    // for both locales. `findSubServiceParent` resolves the pillar → public segment.
    const subSlugs = [...new Set([...businessSystemsSubServiceSlugs, ...dpSubServiceSlugs])]
    return ['en', 'ar'].flatMap((locale) =>
        subSlugs.flatMap((subservice) => {
            const service = findSubServiceParent(subservice)
            if (!service) return []
            return [{ locale, service, subservice }]
        }),
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', service, subservice } = await params

    const bs = getBusinessSystemsSubService(subservice, locale)
    if (bs) {
        const parent = subServiceParent(bs.pillarSlug)
        const subPath = `/services/${parent}/${bs.slug}`
        return {
            // seo.title already ends with "| CloudTopia"; strip it so the layout
            // template doesn't double the brand ("… | CloudTopia | CloudTopia").
            title: stripBrandSuffix(bs.seo.title),
            description: bs.seo.description,
            openGraph: { title: bs.seo.title, description: bs.seo.description, url: canonicalUrl(locale, subPath), siteName: 'CloudTopia', type: 'website' },
            alternates: {
                canonical: canonicalUrl(locale, subPath),
                languages: { en: canonicalUrl('en', subPath), ar: canonicalUrl('ar', subPath), 'x-default': canonicalUrl('en', subPath) },
            },
        }
    }

    const dp = getDigitalPresenceSubService(subservice, locale)
    if (dp) {
        const parent = subServiceParent(dp.pillarSlug)
        const dpPath = `/services/${parent}/${dp.slug}`
        return {
            // Strip the baked-in "| CloudTopia" so the layout template adds it once.
            title: stripBrandSuffix(dp.seo.title),
            description: dp.seo.description,
            openGraph: { title: dp.seo.title, description: dp.seo.description, url: canonicalUrl(locale, dpPath), siteName: 'CloudTopia', type: 'website' },
            alternates: {
                canonical: canonicalUrl(locale, dpPath),
                languages: { en: canonicalUrl('en', dpPath), ar: canonicalUrl('ar', dpPath), 'x-default': canonicalUrl('en', dpPath) },
            },
        }
    }

    return { title: 'Service Not Found' }
}

export default async function NestedSubServicePage({ params }: PageProps) {
    const { locale = 'en', service, subservice } = await params

    const bs = getBusinessSystemsSubService(subservice, locale)
    if (bs) {
        // Canonical guard: if reached under the wrong parent segment, 301 to the
        // correct nested URL so there is a single canonical home per sub-service.
        const parent = subServiceParent(bs.pillarSlug)
        if (service !== parent) permanentRedirect(`/services/${parent}/${subservice}`)
        return <SubServicePage content={bs} locale={locale} />
    }

    const dp = getDigitalPresenceSubService(subservice, locale)
    if (dp) {
        const parent = subServiceParent(dp.pillarSlug)
        if (service !== parent) permanentRedirect(`/services/${parent}/${subservice}`)
        return <DigitalPresenceSubServicePage content={dp} locale={locale} />
    }

    notFound()
}
