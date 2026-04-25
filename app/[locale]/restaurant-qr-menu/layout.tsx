import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'QR Menu Systems for Restaurants in the Gulf',
        ar: 'أنظمة قائمة QR للمطاعم في الخليج',
        tr: 'Körfez\'deki Restoranlar için QR Menü Sistemleri',
    }
    const descs: Record<string, string> = {
        en: 'Multilingual QR menus for Gulf restaurants and cafés. Arabic, English, Turkish. Table ordering, payments, instant updates. From $249.',
        ar: 'قوائم QR متعددة اللغات لمطاعم ومقاهي الخليج. العربية، الإنجليزية، التركية. طلب من الطاولة، مدفوعات، تحديثات فورية. تبدأ من 249$.',
        tr: 'Körfez restoranları ve kafeleri için çok dilli QR menüler. Arapça, İngilizce, Türkçe. Masa siparişi, ödemeler, anında güncellemeler. $249\'dan başlar.',
    }
    const ogTitles: Record<string, string> = {
        en: 'QR Menu Systems — CloudTopia',
        ar: 'أنظمة قائمة QR — كلاود توبيا',
        tr: 'QR Menü Sistemleri — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Interactive QR-based digital menus for the hospitality industry.',
        ar: 'قوائم رقمية تفاعلية بتقنية QR لقطاع الضيافة.',
        tr: 'Konaklama sektörü için interaktif QR tabanlı dijital menüler.',
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
            url: `https://cloudtopia.net/${locale}/restaurant-qr-menu`,
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'restaurant-qr-menu', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/restaurant-qr-menu`,
            languages: { 'en': 'https://cloudtopia.net/en/restaurant-qr-menu', 'ar': 'https://cloudtopia.net/ar/restaurant-qr-menu', 'tr': 'https://cloudtopia.net/tr/restaurant-qr-menu', 'x-default': 'https://cloudtopia.net/en/restaurant-qr-menu' },
        },
    }
}

export default function RestaurantQrMenuLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('restaurant-qr-menu', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Restaurant QR Menu', item: `https://cloudtopia.net/${locale}/restaurant-qr-menu` },
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
                        url: `https://cloudtopia.net/${locale}/restaurant-qr-menu`,
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Digital Menu Solutions',
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
                            lowPrice: '599',
                            highPrice: '2499',
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
