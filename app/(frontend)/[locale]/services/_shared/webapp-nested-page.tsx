import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { canonicalUrl } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import WebAppPillarPage from '@/components/services/WebAppPillarPage'
import { getWebappServiceContent, webappServiceContent } from '@/lib/services/webapp-service-content'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { structuredPillarSeoDescription } from '@/lib/seo/services'
import { SUBSERVICE_CANONICAL_PARENT } from '@/lib/services/subservice-nav-index'
import { withNestedExtras } from './nested-service-route'

/**
 * Branch factory for web-application pillar pages nested under
 * /services/web-applications/<pillar>. Bundles ONLY the webapp content and
 * renderer.
 */

type PageProps = { params: Promise<{ locale: string; subservice: string }> }

export function createWebappNestedStaticParams() {
    return function generateStaticParams() {
        return ['en', 'ar'].flatMap((locale) =>
            Object.keys(webappServiceContent).map((subservice) => ({ locale, subservice })),
        )
    }
}

export function createWebappNestedMetadata() {
    return async function generateMetadata({ params }: PageProps): Promise<Metadata> {
        const { locale = 'en', subservice } = await params
        const webapp = getWebappServiceContent(subservice)
        if (!webapp) return { title: 'Service Not Found' }
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
}

export function createWebappNestedPage() {
    return async function WebappNestedSubServicePage({ params }: PageProps) {
        const { locale = 'en', subservice } = await params
        const webapp = getWebappServiceContent(subservice)
        if (!webapp) {
            const canonicalParent = SUBSERVICE_CANONICAL_PARENT[subservice]
            if (canonicalParent && canonicalParent !== 'web-applications') {
                permanentRedirect(`/services/${canonicalParent}/${subservice}`)
            }
            notFound()
        }
        const pillar = getStructuredPillarBySlug(subservice)
        return withNestedExtras(
            locale,
            <WebAppPillarPage slug={subservice} data={webapp} locale={locale} />,
            `/services/web-applications/${subservice}`,
            {
                name: pillar ? (locale === 'ar' ? pillar.name.ar : pillar.name.en) : subservice,
                description: pillar ? (locale === 'ar' ? pillar.description.ar : pillar.description.en) : '',
                parent: 'web-applications',
            },
        )
    }
}
