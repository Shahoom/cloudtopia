import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'About CloudTopia — Gulf-First Digital Agency',
        ar: 'عن كلاود توبيا — وكالة رقمية خليجية أولاً',
        tr: 'CloudTopia Hakkında — Körfez Öncelikli Dijital Ajans',
    }
    const descs: Record<string, string> = {
        en: 'CloudTopia is a Gulf-first digital agency building websites, e-commerce stores, and custom business systems in Arabic, English, and Turkish. Operating from Istanbul, Riyadh, and Dubai.',
        ar: 'كلاود توبيا وكالة رقمية خليجية أولاً تبني مواقع ومتاجر إلكترونية وأنظمة أعمال مخصصة بالعربية والإنجليزية والتركية. تعمل من إسطنبول والرياض ودبي.',
        tr: 'CloudTopia, Arapça, İngilizce ve Türkçe web siteleri, e-ticaret mağazaları ve özel iş sistemleri inşa eden Körfez öncelikli bir dijital ajanstır. İstanbul, Riyad ve Dubai\'den çalışıyor.',
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

    // Per user instruction: about page does NOT emit an OG image.
    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: `https://cloudtopia.net/${locale}/about`,
            locale: ogLocales[locale] || 'en_US',
        },
        twitter: { card: 'summary', title: ogTitle, description: ogDesc },
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
