import type { Metadata } from 'next'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Website Design & Development in the Gulf',
        ar: 'تصميم وتطوير مواقع الويب في الخليج',
        tr: 'Körfez\'de Web Sitesi Tasarım & Geliştirme',
    }
    const descs: Record<string, string> = {
        en: 'Bilingual Arabic + English websites for Gulf businesses. Fast, SEO-ready, RTL-correct. From $399.',
        ar: 'مواقع ويب ثنائية اللغة عربي + إنجليزي لأعمال الخليج. سريعة، جاهزة للسيو، RTL صحيح. تبدأ من 399$.',
        tr: 'Körfez işletmeleri için iki dilli Arapça + İngilizce web siteleri. Hızlı, SEO hazır, RTL doğru. $399\'dan başlar.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Website Design — CloudTopia',
        ar: 'تصميم المواقع — كلاود توبيا',
        tr: 'Web Sitesi Tasarımı — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Custom responsive websites with modern UI/UX design.',
        ar: 'مواقع ويب مخصصة متجاوبة بتصميم UI/UX حديث.',
        tr: 'Modern UI/UX tasarıma sahip özel duyarlı web siteleri.',
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
            url: `https://cloudtopia.net/${locale}/website-design`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/website-design`,
            languages: { 'en': 'https://cloudtopia.net/en/website-design', 'ar': 'https://cloudtopia.net/ar/website-design', 'tr': 'https://cloudtopia.net/tr/website-design', 'x-default': 'https://cloudtopia.net/en/website-design' },
        },
    }
}

export default function WebsiteDesignLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('website-design', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Website Design', item: `https://cloudtopia.net/${locale}/website-design` },
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
                        name: 'Website Design & Development',
                        description: 'Bilingual Arabic + English websites for Gulf businesses. RTL-correct, SEO-ready, fast.',
                        url: `https://cloudtopia.net/${locale}/website-design`,
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Web Design',
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
                            lowPrice: '399',
                            highPrice: '3999',
                            offerCount: '4',
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
