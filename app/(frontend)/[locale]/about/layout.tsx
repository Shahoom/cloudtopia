import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { canonicalUrl } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'

export const aboutSeoFallback = {
    titles: {
        en: 'About CloudTopia — Gulf-First Digital Agency',
        ar: 'عن كلاود توبيا — وكالة رقمية خليجية أولاً',
    } as Record<string, string>,
    descriptions: {
        en: 'Gulf-first digital agency building websites, e-commerce, and custom business systems in Arabic and English. Riyadh · Dubai · Remote.',
        ar: 'وكالة رقمية خليجية تبني مواقع ومتاجر وأنظمة أعمال بالعربية والإنجليزية. الرياض · دبي · عن بُعد.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/about', 'about', {
        title: aboutSeoFallback.titles[locale] || aboutSeoFallback.titles.en,
        description: aboutSeoFallback.descriptions[locale] || aboutSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'About', path: '/about' },
                    ]),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'About CloudTopia',
                        description: 'CloudTopia is a Gulf-first digital agency building websites, e-commerce stores, and custom business systems in Arabic and English.',
                        url: canonicalUrl(locale, '/about'),
                        inLanguage: locale === 'ar' ? 'ar' : 'en',
                        isPartOf: {
                            '@type': 'WebSite',
                            '@id': 'https://cloudtopia.net/#website',
                        },
                        hasPart: [
                            {
                                '@type': 'WebPageElement',
                                name: 'Operating model',
                                description: 'Scope, pricing, ownership, bilingual delivery, and launch handoff model for digital projects.',
                            },
                            {
                                '@type': 'WebPage',
                                name: 'Pricing',
                                url: canonicalUrl(locale, '/pricing'),
                            },
                            {
                                '@type': 'CollectionPage',
                                name: 'Projects',
                                url: canonicalUrl(locale, '/projects'),
                            },
                            {
                                '@type': 'CollectionPage',
                                name: 'Services',
                                url: canonicalUrl(locale, '/services'),
                            },
                            {
                                '@type': 'CollectionPage',
                                name: 'Regional market pages',
                                url: canonicalUrl(locale, '/markets'),
                            },
                            {
                                '@type': 'ContactPage',
                                name: 'Project intake',
                                url: canonicalUrl(locale, '/contact'),
                            },
                        ],
                        mainEntity: {
                            '@type': 'Organization',
                            // SD-5: same @id as the root Organization node so this
                            // richer about-page definition merges into the single
                            // canonical entity instead of duplicating it.
                            '@id': 'https://cloudtopia.net/#organization',
                            name: 'CloudTopia',
                            alternateName: ['كلاود توبيا', 'CloudTopia Digital', 'CloudTopia Technologies'],
                            url: 'https://cloudtopia.net',
                            // SD-1: /logo.svg does not exist — use the verified asset.
                            logo: 'https://cloudtopia.net/images/cloudtopia-logo.png',
                            slogan: 'Bilingual digital delivery with fixed scope, transparent pricing, and owned handoff.',
                            description: 'Gulf-first digital agency specializing in bilingual websites, e-commerce, custom business systems, and web applications.',
                            foundingDate: '2024',
                            areaServed: [
                                { '@type': 'Country', name: 'Saudi Arabia' },
                                { '@type': 'Country', name: 'United Arab Emirates' },
                                { '@type': 'Country', name: 'Kuwait' },
                                { '@type': 'Country', name: 'Qatar' },
                                { '@type': 'Country', name: 'Bahrain' },
                                { '@type': 'Country', name: 'Oman' },
                            ],
                            availableLanguage: [
                                { '@type': 'Language', name: 'English', alternateName: 'en' },
                                { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
                            ],
                            knowsAbout: [
                                'Website Design and Development',
                                'E-commerce Development',
                                'Mada Payment Integration',
                                'Apple Pay Integration',
                                'STC Pay Integration',
                                'Tabby and Tamara BNPL Integration',
                                'ZATCA E-Invoicing',
                                'Arabic RTL Web Design',
                                'Custom CRM Development',
                                'Web Application Development',
                                'SaaS Platform Development',
                                'Digital Transformation',
                                'Cloud Migration',
                                'Business Automation',
                                'AI Integration',
                            ],
                            makesOffer: [
                                {
                                    '@type': 'Offer',
                                    name: 'Website design and development',
                                    url: canonicalUrl(locale, '/services/website-development/business-website-development'),
                                },
                                {
                                    '@type': 'Offer',
                                    name: 'E-commerce development',
                                    url: canonicalUrl(locale, '/services/ecommerce-website-development'),
                                },
                                {
                                    '@type': 'Offer',
                                    name: 'Custom business systems',
                                    url: canonicalUrl(locale, '/services/internal-business-tools'),
                                },
                                {
                                    '@type': 'Offer',
                                    name: 'SEO and conversion systems',
                                    url: canonicalUrl(locale, '/services/search-engine-optimization'),
                                },
                            ],
                            // SD-5: `sameAs` and `contactPoint` are intentionally NOT
                            // redefined here. This node shares the canonical
                            // #organization @id, so the authoritative social profiles
                            // (x.com/thecloudtopia, instagram.com/thecloudtopia,
                            // github.com/Shahoom) and the info@cloudtopia.net contact
                            // live ONLY on the root node in app/(frontend)/layout.tsx.
                            // Repeating them here with different handles/email made the
                            // merged entity self-contradict. Keep only additive,
                            // non-conflicting enrichment (knowsAbout/makesOffer/etc).
                        },
                    },
                ]}
            />
            {children}
        </>
    )
}
