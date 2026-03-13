import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'E-Commerce Solutions & Online Stores',
        ar: 'حلول التجارة الإلكترونية والمتاجر الإلكترونية',
        tr: 'E-Ticaret Çözümleri & Online Mağazalar',
    }
    const descs: Record<string, string> = {
        en: 'Full-service e-commerce platforms with payment integration and inventory management.',
        ar: 'منصات تجارة إلكترونية متكاملة مع تكامل الدفع وإدارة المخزون.',
        tr: 'Ödeme entegrasyonu ve envanter yönetimi ile tam kapsamlı e-ticaret platformları.',
    }
    const ogTitles: Record<string, string> = {
        en: 'E-Commerce — CloudTopia',
        ar: 'التجارة الإلكترونية — كلاود توبيا',
        tr: 'E-Ticaret — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Enterprise-grade e-commerce solutions for growing businesses.',
        ar: 'حلول تجارة إلكترونية على مستوى المؤسسات للشركات النامية.',
        tr: 'Büyüyen işletmeler için kurumsal düzey e-ticaret çözümleri.',
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
            url: `https://cloudtopia.net/${locale}/ecommerce-solutions`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/ecommerce-solutions`,
            languages: { 'en': 'https://cloudtopia.net/en/ecommerce-solutions', 'ar': 'https://cloudtopia.net/ar/ecommerce-solutions', 'tr': 'https://cloudtopia.net/tr/ecommerce-solutions', 'x-default': 'https://cloudtopia.net/en/ecommerce-solutions' },
        },
    }
}

export default function ecommercesolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
