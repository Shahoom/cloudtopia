import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Professional Website Design & Development',
        ar: 'تصميم وتطوير مواقع ويب احترافية',
        tr: 'Profesyonel Web Sitesi Tasarım & Geliştirme',
    }
    const descs: Record<string, string> = {
        en: 'Custom websites designed for performance, SEO, and user experience.',
        ar: 'مواقع ويب مخصصة مصممة للأداء وتحسين محركات البحث وتجربة المستخدم.',
        tr: 'Performans, SEO ve kullanıcı deneyimi için tasarlanmış özel web siteleri.',
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

export default function websitedesignLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
