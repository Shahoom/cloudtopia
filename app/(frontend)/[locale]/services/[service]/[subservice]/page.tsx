import { notFound, permanentRedirect } from 'next/navigation'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'
import { canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/seo/schema'
import { SubServicePage } from '@/components/services/SubServicePage'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import { DigitalPresenceSubServicePage } from '@/components/services/DigitalPresenceSubServicePage'
import { getBusinessSystemsSubService, businessSystemsSubServiceSlugs } from '@/lib/services/business-systems-content'
import { getDigitalPresenceSubService, dpSubServiceSlugs } from '@/lib/services/digital-presence-content'
import { subServiceParent, findSubServiceParent } from '@/lib/services/sub-service-routing'
import WebAppPillarPage from '@/components/services/WebAppPillarPage'
import { getWebappServiceContent, webappServiceContent } from '@/lib/services/webapp-service-content'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { structuredPillarSeoDescription } from '@/lib/seo/services'

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
    const dpBs = ['en', 'ar'].flatMap((locale) =>
        subSlugs.flatMap((subservice) => {
            const service = findSubServiceParent(subservice)
            if (!service) return []
            return [{ locale, service, subservice }]
        }),
    )
    // Web-app pillars live nested under the web-applications hub segment.
    const webApps = ['en', 'ar'].flatMap((locale) =>
        Object.keys(webappServiceContent).map((subservice) => ({ locale, service: 'web-applications', subservice })),
    )
    return [...dpBs, ...webApps]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', service, subservice } = await params

    const bs = getBusinessSystemsSubService(subservice, locale)
    if (bs) {
        const parent = subServiceParent(bs.pillarSlug)
        const subPath = `/services/${parent}/${bs.slug}`
        // One OG card per pillar family — the resolver falls back to the brand
        // default until a per-pillar card exists under public/og/services/<parent>/.
        const images = ogImagesFor({ page: `services/${parent}`, locale, alt: stripBrandSuffix(bs.seo.title) })
        return {
            // seo.title already ends with "| CloudTopia"; strip it so the layout
            // template doesn't double the brand ("… | CloudTopia | CloudTopia").
            title: stripBrandSuffix(bs.seo.title),
            description: bs.seo.description,
            openGraph: { title: bs.seo.title, description: bs.seo.description, url: canonicalUrl(locale, subPath), siteName: 'CloudTopia', type: 'website', images, locale: locale === 'ar' ? 'ar_SA' : 'en_US', alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA' },
            twitter: { card: 'summary_large_image', title: bs.seo.title, description: bs.seo.description, images: images.map((image) => image.url) },
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
        const images = ogImagesFor({ page: `services/${parent}`, locale, alt: stripBrandSuffix(dp.seo.title) })
        return {
            // Strip the baked-in "| CloudTopia" so the layout template adds it once.
            title: stripBrandSuffix(dp.seo.title),
            description: dp.seo.description,
            openGraph: { title: dp.seo.title, description: dp.seo.description, url: canonicalUrl(locale, dpPath), siteName: 'CloudTopia', type: 'website', images, locale: locale === 'ar' ? 'ar_SA' : 'en_US', alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA' },
            twitter: { card: 'summary_large_image', title: dp.seo.title, description: dp.seo.description, images: images.map((image) => image.url) },
            alternates: {
                canonical: canonicalUrl(locale, dpPath),
                languages: { en: canonicalUrl('en', dpPath), ar: canonicalUrl('ar', dpPath), 'x-default': canonicalUrl('en', dpPath) },
            },
        }
    }

    const webapp = getWebappServiceContent(subservice)
    if (webapp && service === 'web-applications') {
        const pillar = getStructuredPillarBySlug(subservice)
        const pName = pillar ? (locale === 'ar' ? pillar.name.ar : pillar.name.en) : subservice
        const pDesc = structuredPillarSeoDescription(subservice, locale)
            ?? (pillar ? (locale === 'ar' ? pillar.description.ar : pillar.description.en) : '')
        const path = `/services/web-applications/${subservice}`
        const brand = locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia'
        const images = ogImagesFor({ page: 'services/web-applications', locale, alt: pName })
        return {
            title: pName,
            description: pDesc,
            openGraph: { title: `${pName} | ${brand}`, description: pDesc, url: canonicalUrl(locale, path), siteName: 'CloudTopia', type: 'website', images, locale: locale === 'ar' ? 'ar_SA' : 'en_US', alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA' },
            twitter: { card: 'summary_large_image', title: `${pName} | ${brand}`, description: pDesc, images: images.map((image) => image.url) },
            alternates: {
                canonical: canonicalUrl(locale, path),
                languages: { en: canonicalUrl('en', path), ar: canonicalUrl('ar', path), 'x-default': canonicalUrl('en', path) },
            },
        }
    }

    return { title: 'Service Not Found' }
}

export default async function NestedSubServicePage({ params }: PageProps) {
    const { locale = 'en', service, subservice } = await params

    const homeLabel = locale === 'ar' ? 'الرئيسية' : 'Home'
    const servicesLabel = locale === 'ar' ? 'الخدمات' : 'Services'
    // Hub segments that are NOT structured pillars (getStructuredPillarBySlug
    // returns null for them) — without this the raw slug leaks into the
    // breadcrumb, e.g. "web-applications" instead of "Web Applications".
    const HUB_PARENT_LABELS: Record<string, { en: string; ar: string }> = {
        'web-applications': { en: 'Web Applications', ar: 'تطبيقات الويب' },
    }
    const parentName = (slug: string) => {
        const pillar = getStructuredPillarBySlug(slug)
        if (pillar) return locale === 'ar' ? pillar.name.ar : pillar.name.en
        const hub = HUB_PARENT_LABELS[slug]
        if (hub) return locale === 'ar' ? hub.ar : hub.en
        return slug
    }

    // Page-level JSON-LD (Service + BreadcrumbList + FAQPage when the page shows
    // FAQs) + the closing "what people search for" band — wrapped around every
    // sub-service variant so none of the templates need to change.
    const withExtras = (
        page: React.ReactNode,
        path: string,
        info: { name: string; description: string; parent: string; faqs?: { question: string; answer: string }[] },
    ) => {
        const nodes = [
            buildServiceSchema(locale, { name: info.name, description: info.description, path }),
            buildBreadcrumbSchema(locale, [
                { name: homeLabel, path: '/' },
                { name: servicesLabel, path: '/services' },
                { name: parentName(info.parent), path: `/services/${info.parent}` },
                { name: info.name, path },
            ]),
            buildFaqSchema(info.faqs),
        ].filter(Boolean)
        return (
            <>
                {nodes.map((node, index) => (
                    <script
                        key={index}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: serializeJsonLd(node) }}
                    />
                ))}
                {page}
                <SearchKeywordsSection path={path} locale={locale} />
            </>
        )
    }

    const bs = getBusinessSystemsSubService(subservice, locale)
    if (bs) {
        // Canonical guard: if reached under the wrong parent segment, 301 to the
        // correct nested URL so there is a single canonical home per sub-service.
        const parent = subServiceParent(bs.pillarSlug)
        if (service !== parent) permanentRedirect(`/services/${parent}/${subservice}`)
        return withExtras(<SubServicePage content={bs} locale={locale} />, `/services/${parent}/${subservice}`, {
            name: stripBrandSuffix(bs.seo.title),
            description: bs.seo.description,
            parent,
            faqs: bs.faqs,
        })
    }

    const dp = getDigitalPresenceSubService(subservice, locale)
    if (dp) {
        const parent = subServiceParent(dp.pillarSlug)
        if (service !== parent) permanentRedirect(`/services/${parent}/${subservice}`)
        return withExtras(<DigitalPresenceSubServicePage content={dp} locale={locale} />, `/services/${parent}/${subservice}`, {
            name: stripBrandSuffix(dp.seo.title),
            description: dp.seo.description,
            parent,
            faqs: dp.faqs,
        })
    }

    // Web-app pillars nested under /services/web-applications/<pillar>. Guard the
    // parent segment so there is a single canonical home per pillar.
    const webapp = getWebappServiceContent(subservice)
    if (webapp) {
        if (service !== 'web-applications') permanentRedirect(`/services/web-applications/${subservice}`)
        const pillar = getStructuredPillarBySlug(subservice)
        return withExtras(
            <WebAppPillarPage slug={subservice} data={webapp} locale={locale} />,
            `/services/web-applications/${subservice}`,
            {
                name: pillar ? (locale === 'ar' ? pillar.name.ar : pillar.name.en) : subservice,
                description: pillar ? (locale === 'ar' ? pillar.description.ar : pillar.description.en) : '',
                parent: 'web-applications',
            },
        )
    }

    notFound()
}
