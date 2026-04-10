import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'CloudTopia Labs — AI & Innovation',
        ar: 'مختبرات كلاود توبيا — الذكاء الاصطناعي والابتكار',
        tr: 'CloudTopia Labs — Yapay Zeka & İnovasyon',
    }
    const descs: Record<string, string> = {
        en: 'Explore our AI tools, prototypes, and innovation projects at CloudTopia Labs.',
        ar: 'استكشف أدوات الذكاء الاصطناعي والنماذج الأولية ومشاريع الابتكار.',
        tr: 'CloudTopia Labs\'taki yapay zeka araçlarımızı, prototipleri ve inovasyon projelerini keşfedin.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Labs — CloudTopia',
        ar: 'المختبرات — كلاود توبيا',
        tr: 'Labs — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'AI tools, innovation prototypes, and experimental projects.',
        ar: 'أدوات ذكاء اصطناعي، نماذج ابتكار، ومشاريع تجريبية.',
        tr: 'Yapay zeka araçları, inovasyon prototipleri ve deneysel projeler.',
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
            url: `https://cloudtopia.net/${locale}/labs`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/labs`,
            languages: { 'en': 'https://cloudtopia.net/en/labs', 'ar': 'https://cloudtopia.net/ar/labs', 'tr': 'https://cloudtopia.net/tr/labs', 'x-default': 'https://cloudtopia.net/en/labs' },
        },
    }
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net/en' },
                            { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://cloudtopia.net/en/labs' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'CloudTopia Labs — Innovation Hub',
                        description: 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
                        url: 'https://cloudtopia.net/en/labs',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
