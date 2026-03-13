import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Restaurant QR Menu Systems',
        ar: 'أنظمة قائمة QR للمطاعم',
        tr: 'Restoran QR Menü Sistemleri',
    }
    const descs: Record<string, string> = {
        en: 'Smart digital menus with QR technology for restaurants, cafes, and hospitality.',
        ar: 'قوائم رقمية ذكية بتقنية QR للمطاعم والمقاهي وقطاع الضيافة.',
        tr: 'Restoranlar, kafeler ve konaklama için QR teknolojisi ile akıllı dijital menüler.',
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
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/restaurant-qr-menu`,
            languages: { 'en': 'https://cloudtopia.net/en/restaurant-qr-menu', 'ar': 'https://cloudtopia.net/ar/restaurant-qr-menu', 'tr': 'https://cloudtopia.net/tr/restaurant-qr-menu', 'x-default': 'https://cloudtopia.net/en/restaurant-qr-menu' },
        },
    }
}

export default function restaurantqrmenuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
