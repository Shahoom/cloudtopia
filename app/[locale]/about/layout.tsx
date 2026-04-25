import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'About CloudTopia — Gulf-First Digital Agency',
        ar: 'عن كلاود توبيا — وكالة رقمية خليجية أولاً',
        tr: 'CloudTopia Hakkında — Körfez Öncelikli Dijital Ajans',
    }
    const descs: Record<string, string> = {
        en: 'Gulf-first digital agency building websites, e-commerce, and custom business systems in Arabic, English, and Turkish. Istanbul · Riyadh · Dubai.',
        ar: 'وكالة رقمية خليجية تبني مواقع ومتاجر وأنظمة أعمال بالعربية والإنجليزية والتركية. إسطنبول · الرياض · دبي.',
        tr: 'Arapça, İngilizce ve Türkçe web sitesi, e-ticaret ve özel iş sistemleri inşa eden Körfez ajansı. İstanbul · Riyad · Dubai.',
    }
    const ogTitles: Record<string, string> = {
        en: 'About CloudTopia',
        ar: 'عن كلاود توبيا',
        tr: 'CloudTopia Hakkında',
    }
    const ogDescs: Record<string, string> = {
        en: 'Gulf-first digital agency building bilingual websites, e-commerce, and business systems.',
        ar: 'وكالة رقمية خليجية أولاً تبني مواقع ومتاجر وأنظمة أعمال ثنائية اللغة.',
        tr: 'İki dilli web siteleri, e-ticaret ve iş sistemleri inşa eden Körfez öncelikli dijital ajans.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
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
            url: `https://cloudtopia.net/${locale}/about`,
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
            canonical: `https://cloudtopia.net/${locale}/about`,
            languages: { 'en': 'https://cloudtopia.net/en/about', 'ar': 'https://cloudtopia.net/ar/about', 'tr': 'https://cloudtopia.net/tr/about', 'x-default': 'https://cloudtopia.net/en/about' },
        },
    }
}

export default function AboutLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cloudtopia.net/${locale}` },
                            { '@type': 'ListItem', position: 2, name: 'About', item: `https://cloudtopia.net/${locale}/about` },
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
                        description: 'CloudTopia is a Gulf-first digital agency building websites, e-commerce stores, and custom business systems in Arabic, English, and Turkish.',
                        url: `https://cloudtopia.net/${locale}/about`,
                        inLanguage: locale === 'ar' ? 'ar' : locale === 'tr' ? 'tr' : 'en',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            alternateName: ['كلاود توبيا', 'CloudTopia Digital', 'CloudTopia Technologies'],
                            url: 'https://cloudtopia.net',
                            logo: 'https://cloudtopia.net/logo.svg',
                            description: 'Gulf-first digital agency specializing in bilingual websites, e-commerce, custom business systems, and web applications.',
                            foundingDate: '2024',
                            areaServed: [
                                { '@type': 'Country', name: 'Saudi Arabia' },
                                { '@type': 'Country', name: 'United Arab Emirates' },
                                { '@type': 'Country', name: 'Kuwait' },
                                { '@type': 'Country', name: 'Qatar' },
                                { '@type': 'Country', name: 'Bahrain' },
                                { '@type': 'Country', name: 'Oman' },
                                { '@type': 'Country', name: 'Türkiye' },
                            ],
                            availableLanguage: [
                                { '@type': 'Language', name: 'English', alternateName: 'en' },
                                { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
                                { '@type': 'Language', name: 'Turkish', alternateName: 'tr' },
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
                            sameAs: [
                                'https://www.linkedin.com/company/cloudtopia',
                                'https://twitter.com/cloudtopia',
                                'https://www.instagram.com/cloudtopia',
                            ],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer service',
                                email: 'hello@cloudtopia.net',
                                availableLanguage: ['English', 'Arabic', 'Turkish'],
                                areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'TR'],
                            },
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
