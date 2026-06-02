import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/web-applications', 'web-applications')
    const titles: Record<string, string> = {
        en: 'Custom Web Applications & SaaS Development',
        ar: 'تطوير تطبيقات ويب مخصصة ومنصات SaaS',
    }
    const descs: Record<string, string> = {
        en: 'Custom web apps, portals, dashboards, and SaaS on Next.js + React. Real-time features, bilingual Arabic + English UI. From $999.',
        ar: 'تطبيقات ويب وبوابات ولوحات تحكم وSaaS مخصصة على Next.js وReact. ميزات حية، واجهة عربي + إنجليزي. من 999$.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Web Applications — CloudTopia',
        ar: 'تطبيقات الويب — كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Custom web applications with modern functionality.',
        ar: 'تطبيقات ويب مخصصة بوظائف حديثة.',
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
            url: canonicalUrl(locale, '/web-applications'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'web-applications', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/web-applications'),
            languages: buildHreflangMap('/web-applications'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('web-applications', locale)

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
                            { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalUrl(locale, '/services') },
                            { '@type': 'ListItem', position: 3, name: 'Web Applications', item: canonicalUrl(locale, '/web-applications') },
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
                        url: canonicalUrl(locale, '/web-applications'),
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Web Application Development',
                        areaServed: [
                            { '@type': 'Country', name: 'Saudi Arabia' },
                            { '@type': 'Country', name: 'United Arab Emirates' },
                            { '@type': 'Country', name: 'Kuwait' },
                            { '@type': 'Country', name: 'Qatar' },
                            { '@type': 'Country', name: 'Bahrain' },
                            { '@type': 'Country', name: 'Oman' },
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
