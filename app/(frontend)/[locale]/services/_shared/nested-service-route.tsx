import type React from 'react'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/seo/schema'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'

/**
 * Shared schema/breadcrumb plumbing for nested sub-service routes
 * (/services/<parent>/<subservice>). This module imports NO content database
 * and NO page renderer — each branch factory supplies those, so a nested page
 * only bundles its own renderer family.
 */

export const HUB_PARENT_LABELS: Record<string, { en: string; ar: string }> = {
    'web-applications': { en: 'Web Applications', ar: 'تطبيقات الويب' },
}

export function nestedParentName(slug: string, locale: string): string {
    const pillar = getStructuredPillarBySlug(slug)
    if (pillar) return locale === 'ar' ? pillar.name.ar : pillar.name.en
    const hub = HUB_PARENT_LABELS[slug]
    if (hub) return locale === 'ar' ? hub.ar : hub.en
    return slug
}

export type NestedPageInfo = {
    name: string
    description: string
    parent: string
    faqs?: { question: string; answer: string }[]
}

/**
 * Page-level JSON-LD (Service + BreadcrumbList + FAQPage when the page shows
 * FAQs) + the closing "what people search for" band — wrapped around every
 * sub-service variant so none of the templates need to change.
 */
export function withNestedExtras(
    locale: string,
    page: React.ReactNode,
    path: string,
    info: NestedPageInfo,
) {
    const homeLabel = locale === 'ar' ? 'الرئيسية' : 'Home'
    const servicesLabel = locale === 'ar' ? 'الخدمات' : 'Services'
    const nodes = [
        buildServiceSchema(locale, { name: info.name, description: info.description, path }),
        buildBreadcrumbSchema(locale, [
            { name: homeLabel, path: '/' },
            { name: servicesLabel, path: '/services' },
            { name: nestedParentName(info.parent, locale), path: `/services/${info.parent}` },
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
