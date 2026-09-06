import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import { SubServicePage } from '@/components/services/SubServicePage'
import {
    getBusinessSystemsSubService,
    businessSystemsSubServiceSlugs,
} from '@/lib/services/business-systems-content'
import { findSubServiceParent } from '@/lib/services/sub-service-routing'
import { SUBSERVICE_CANONICAL_PARENT } from '@/lib/services/subservice-nav-index'
import { withNestedExtras } from './nested-service-route'

/**
 * Branch factory for Business Systems nested routes. Wrappers created here
 * bundle ONLY the business content database and the business renderer.
 */

type PageProps = { params: Promise<{ locale: string; subservice: string }> }

export function createBusinessNestedStaticParams(parent: string) {
    return function generateStaticParams() {
        return ['en', 'ar'].flatMap((locale) =>
            businessSystemsSubServiceSlugs
                .filter((subservice) => findSubServiceParent(subservice) === parent)
                .map((subservice) => ({ locale, subservice })),
        )
    }
}

export function createBusinessNestedMetadata(parent: string) {
    return async function generateMetadata({ params }: PageProps): Promise<Metadata> {
        const { locale = 'en', subservice } = await params
        const bs = getBusinessSystemsSubService(subservice, locale)
        if (!bs) return { title: 'Service Not Found' }
        const subPath = `/services/${parent}/${bs.slug}`
        // One OG card per pillar family — the resolver falls back to the brand
        // default until a per-pillar card exists under public/og/services/<parent>/.
        const images = ogImagesFor({ page: `services/${parent}`, locale, alt: stripBrandSuffix(bs.seo.title) })
        return {
            // seo.title already ends with "| CloudTopia"; strip it so the layout
            // template doesn't double the brand.
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
}

export function createBusinessNestedPage(parent: string) {
    return async function BusinessNestedSubServicePage({ params }: PageProps) {
        const { locale = 'en', subservice } = await params
        const bs = getBusinessSystemsSubService(subservice, locale)
        if (!bs) {
            // Canonical guard: a slug from another branch reached this parent —
            // 301 to its canonical nested URL, otherwise 404.
            const canonicalParent = SUBSERVICE_CANONICAL_PARENT[subservice]
            if (canonicalParent && canonicalParent !== parent) {
                permanentRedirect(`/services/${canonicalParent}/${subservice}`)
            }
            notFound()
        }
        return withNestedExtras(
            locale,
            <SubServicePage content={bs} locale={locale} />,
            `/services/${parent}/${subservice}`,
            {
                name: stripBrandSuffix(bs.seo.title),
                description: bs.seo.description,
                parent,
                faqs: bs.faqs,
            },
        )
    }
}
