import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Custom Web Applications Development',
        ar: 'تطوير تطبيقات ويب مخصصة',
        tr: 'Özel Web Uygulamaları Geliştirme',
    }
    const descs: Record<string, string> = {
        en: 'Interactive web applications with real-time features, portals, and SaaS platforms.',
        ar: 'تطبيقات ويب تفاعلية مع ميزات في الوقت الفعلي، بوابات، ومنصات SaaS.',
        tr: 'Gerçek zamanlı özellikler, portallar ve SaaS platformları ile interaktif web uygulamaları.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Web Applications — CloudTopia',
        ar: 'تطبيقات الويب — كلاود توبيا',
        tr: 'Web Uygulamaları — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Custom web applications with modern functionality.',
        ar: 'تطبيقات ويب مخصصة بوظائف حديثة.',
        tr: 'Modern işlevselliğe sahip özel web uygulamaları.',
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
            url: `https://cloudtopia.net/${locale}/web-applications`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/web-applications`,
            languages: { 'en': 'https://cloudtopia.net/en/web-applications', 'ar': 'https://cloudtopia.net/ar/web-applications', 'tr': 'https://cloudtopia.net/tr/web-applications', 'x-default': 'https://cloudtopia.net/en/web-applications' },
        },
    }
}

export default function webapplicationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net' },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cloudtopia.net/en/services' },
                            { '@type': 'ListItem', position: 3, name: 'Web Applications', item: 'https://cloudtopia.net/en/web-applications' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Custom Web Applications Development',
                        description: 'Interactive web applications with real-time features, portals, and SaaS platforms.',
                        url: 'https://cloudtopia.net/en/web-applications',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Web Application Development',
                        areaServed: 'Worldwide',
                    }),
                }}
            />
            {children}
        </>
    )
}
