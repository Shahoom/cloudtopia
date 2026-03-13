import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Social Media Marketing & Management',
        ar: 'تسويق وإدارة وسائل التواصل الاجتماعي',
        tr: 'Sosyal Medya Pazarlama & Yönetim',
    }
    const descs: Record<string, string> = {
        en: 'Strategic social media marketing to grow your brand presence and engagement.',
        ar: 'تسويق استراتيجي عبر وسائل التواصل الاجتماعي لتنمية حضور علامتك التجارية.',
        tr: 'Marka varlığınızı ve etkileşiminizi artırmak için stratejik sosyal medya pazarlama.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Social Media Marketing — CloudTopia',
        ar: 'تسويق وسائل التواصل — كلاود توبيا',
        tr: 'Sosyal Medya Pazarlama — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Professional social media management and advertising.',
        ar: 'إدارة احترافية لوسائل التواصل الاجتماعي والإعلانات.',
        tr: 'Profesyonel sosyal medya yönetimi ve reklam.',
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
            url: `https://cloudtopia.net/${locale}/social-media-marketing`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/social-media-marketing`,
            languages: { 'en': 'https://cloudtopia.net/en/social-media-marketing', 'ar': 'https://cloudtopia.net/ar/social-media-marketing', 'tr': 'https://cloudtopia.net/tr/social-media-marketing', 'x-default': 'https://cloudtopia.net/en/social-media-marketing' },
        },
    }
}

export default function socialmediamarketingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
