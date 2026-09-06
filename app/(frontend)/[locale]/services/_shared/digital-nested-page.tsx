import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import { DigitalPresenceSubServicePage } from '@/components/services/DigitalPresenceSubServicePage'
import {
    getDigitalPresenceSubService,
    dpSubServiceSlugs,
} from '@/lib/services/digital-presence-content'
import { findSubServiceParent } from '@/lib/services/sub-service-routing'
import { SUBSERVICE_CANONICAL_PARENT } from '@/lib/services/subservice-nav-index'
import { withNestedExtras } from './nested-service-route'

/**
 * Branch factory for Digital Presence nested routes. Wrappers created here
 * bundle ONLY the digital-presence content database and its renderer.
 */

type PageProps = { params: Promise<{ locale: string; subservice: string }> }

export function createDigitalNestedStaticParams(parent: string) {
    return function generateStaticParams() {
        return ['en', 'ar'].flatMap((locale) =>
            dpSubServiceSlugs
                .filter((subservice) => findSubServiceParent(subservice) === parent)
                .map((subservice) => ({ locale, subservice })),
        )
    }
}

export function createDigitalNestedMetadata(parent: string) {
    return async function generateMetadata({ params }: PageProps): Promise<Metadata> {
        const { locale = 'en', subservice } = await params
        const dp = getDigitalPresenceSubService(subservice, locale)
        if (!dp) return { title: 'Service Not Found' }
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
}

export function createDigitalNestedPage(parent: string) {
    return async function DigitalNestedSubServicePage({ params }: PageProps) {
        const { locale = 'en', subservice } = await params
        const dp = getDigitalPresenceSubService(subservice, locale)
        if (!dp) {
            const canonicalParent = SUBSERVICE_CANONICAL_PARENT[subservice]
            if (canonicalParent && canonicalParent !== parent) {
                permanentRedirect(`/services/${canonicalParent}/${subservice}`)
            }
            notFound()
        }
        return withNestedExtras(
            locale,
            <DigitalPresenceSubServicePage content={dp} locale={locale} />,
            `/services/${parent}/${subservice}`,
            {
                name: stripBrandSuffix(dp.seo.title),
                description: dp.seo.description,
                parent,
                faqs: dp.faqs,
            },
        )
    }
}
