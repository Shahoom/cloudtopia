import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/restaurant-qr-menu', 'restaurant-qr-menu')
    const titles: Record<string, string> = {
        en: 'QR Menu Systems for Restaurants in the Gulf',
        ar: 'أنظمة قائمة QR للمطاعم في الخليج',
    }
    const descs: Record<string, string> = {
        en: 'Bilingual QR menus for Gulf restaurants and cafés with ordering, payments, instant updates, and clear package scope.',
        ar: 'قوائم QR ثنائية اللغة لمطاعم ومقاهي الخليج مع الطلب والدفع والتحديث الفوري ونطاق باقة واضح.',
    }
    const ogTitles: Record<string, string> = {
        en: 'QR Menu Systems — CloudTopia',
        ar: 'أنظمة قائمة QR — كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Interactive QR-based digital menus for the hospitality industry.',
        ar: 'قوائم رقمية تفاعلية بتقنية QR لقطاع الضيافة.',
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
            url: canonicalUrl(locale, '/restaurant-qr-menu'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'restaurant-qr-menu', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/restaurant-qr-menu'),
            languages: buildHreflangMap('/restaurant-qr-menu'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('restaurant-qr-menu', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Restaurant QR Menu', item: canonicalUrl(locale, '/restaurant-qr-menu') },
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
                        name: 'Restaurant QR Menu Systems',
                        description: 'Multilingual QR menus with ordering, payment, and instant updates for Gulf restaurants and cafés.',
                        url: canonicalUrl(locale, '/restaurant-qr-menu'),
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Digital Menu Solutions',
                        areaServed: [
                            { '@type': 'Country', name: 'Saudi Arabia' },
                            { '@type': 'Country', name: 'United Arab Emirates' },
                            { '@type': 'Country', name: 'Kuwait' },
                            { '@type': 'Country', name: 'Qatar' },
                            { '@type': 'Country', name: 'Bahrain' },
                            { '@type': 'Country', name: 'Oman' },
                        ],
                        offers: {
                            '@type': 'Offer',
                            availability: 'https://schema.org/InStock',
                            url: canonicalUrl(locale, '/pricing'),
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
