import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/about', 'about')
    const titles: Record<string, string> = {
        en: 'About CloudTopia — Gulf-First Digital Agency',
        ar: 'عن كلاود توبيا — وكالة رقمية خليجية أولاً',
    }
    const descs: Record<string, string> = {
        en: 'Gulf-first digital agency building websites, e-commerce, and custom business systems in Arabic and English. Riyadh · Dubai · Remote.',
        ar: 'وكالة رقمية خليجية تبني مواقع ومتاجر وأنظمة أعمال بالعربية والإنجليزية. الرياض · دبي · عن بُعد.',
    }
    const ogTitles: Record<string, string> = {
        en: 'About CloudTopia',
        ar: 'عن كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Gulf-first digital agency building bilingual websites, e-commerce, and business systems.',
        ar: 'وكالة رقمية خليجية أولاً تبني مواقع ومتاجر وأنظمة أعمال ثنائية اللغة.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: canonicalUrl(locale, '/about'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'about', locale }),
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDesc,
            images: ogImagesFor({ page: 'about', locale }).map((i) => i.url),
        },
        alternates: {
            canonical: canonicalUrl(locale, '/about'),
            languages: buildHreflangMap('/about'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl(locale, '/') },
                            { '@type': 'ListItem', position: 2, name: 'About', item: canonicalUrl(locale, '/about') },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'About CloudTopia',
                        description: 'CloudTopia is a Gulf-first digital agency building websites, e-commerce stores, and custom business systems in Arabic and English.',
                        url: canonicalUrl(locale, '/about'),
                        inLanguage: locale === 'ar' ? 'ar' : 'en',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
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
                                url: canonicalUrl(locale, '/locations'),
                            },
                            {
                                '@type': 'ContactPage',
                                name: 'Project intake',
                                url: canonicalUrl(locale, '/contact'),
                            },
                        ],
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            alternateName: ['كلاود توبيا', 'CloudTopia Digital', 'CloudTopia Technologies'],
                            url: 'https://cloudtopia.net',
                            logo: 'https://cloudtopia.net/logo.svg',
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
                                    url: canonicalUrl(locale, '/services/business-website-development'),
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
                                    url: canonicalUrl(locale, '/services/seo-optimization'),
                                },
                            ],
                            sameAs: [
                                'https://www.linkedin.com/company/cloudtopia',
                                'https://twitter.com/cloudtopia',
                                'https://www.instagram.com/cloudtopia',
                            ],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer service',
                                email: 'hello@cloudtopia.net',
                                availableLanguage: ['English', 'Arabic'],
                                areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
                            },
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
