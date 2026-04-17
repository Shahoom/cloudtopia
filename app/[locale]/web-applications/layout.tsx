import type { Metadata } from 'next'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Custom Web Applications & SaaS Development',
        ar: 'تطوير تطبيقات ويب مخصصة ومنصات SaaS',
        tr: 'Özel Web Uygulamaları ve SaaS Geliştirme',
    }
    const descs: Record<string, string> = {
        en: 'Custom web apps, portals, dashboards, and SaaS platforms built on Next.js, React, and Node.js. Real-time features, Arabic + English UI. From $5,999.',
        ar: 'تطبيقات ويب، بوابات، لوحات تحكم، ومنصات SaaS مخصصة مبنية على Next.js وReact وNode.js. ميزات حية، واجهة عربية + إنجليزية. تبدأ من 5,999$.',
        tr: 'Next.js, React ve Node.js üzerinde inşa edilmiş özel web uygulamaları, portallar, panolar ve SaaS platformları. Gerçek zamanlı özellikler, Arapça + İngilizce UI. $5.999\'dan başlar.',
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

export default function WebApplicationsLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('web-applications', locale)

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
                            { '@type': 'ListItem', position: 2, name: 'Services', item: `https://cloudtopia.net/${locale}/services` },
                            { '@type': 'ListItem', position: 3, name: 'Web Applications', item: `https://cloudtopia.net/${locale}/web-applications` },
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
                        url: `https://cloudtopia.net/${locale}/web-applications`,
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Web Application Development',
                        areaServed: [
                            { '@type': 'Country', name: 'Saudi Arabia' },
                            { '@type': 'Country', name: 'United Arab Emirates' },
                            { '@type': 'Country', name: 'Kuwait' },
                            { '@type': 'Country', name: 'Qatar' },
                            { '@type': 'Country', name: 'Bahrain' },
                            { '@type': 'Country', name: 'Oman' },
                            { '@type': 'Country', name: 'Türkiye' },
                        ],
                        offers: {
                            '@type': 'AggregateOffer',
                            priceCurrency: 'USD',
                            lowPrice: '5999',
                            highPrice: '50000',
                            offerCount: '3',
                        },
                    }),
                }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {children}
        </>
    )
}
