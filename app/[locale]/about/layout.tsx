import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'About CloudTopia — Digital & Cloud Technologies',
        ar: 'عن كلاود توبيا — تقنيات رقمية وسحابية',
        tr: 'CloudTopia Hakkında — Dijital & Bulut Teknolojileri',
    }
    const descs: Record<string, string> = {
        en: 'Learn about CloudTopia, our mission, values, and team dedicated to digital excellence.',
        ar: 'تعرف على كلاود توبيا، مهمتنا، قيمنا، وفريقنا المخصص للتميز الرقمي.',
        tr: 'CloudTopia, misyonumuz, değerlerimiz ve dijital mükemmelliğe adanmış ekibimiz hakkında bilgi edinin.',
    }
    const ogTitles: Record<string, string> = {
        en: 'About Us — CloudTopia',
        ar: 'عنا — كلاود توبيا',
        tr: 'Hakkımızda — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Our mission, values, and team dedicated to digital excellence.',
        ar: 'مهمتنا وقيمنا وفريقنا المخصص للتميز الرقمي.',
        tr: 'Dijital mükemmelliğe adanmış misyonumuz, değerlerimiz ve ekibimiz.',
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
            url: `https://cloudtopia.net/${locale}/about`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/about`,
            languages: { 'en': 'https://cloudtopia.net/en/about', 'ar': 'https://cloudtopia.net/ar/about', 'tr': 'https://cloudtopia.net/tr/about', 'x-default': 'https://cloudtopia.net/en/about' },
        },
    }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net' },
                            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://cloudtopia.net/about' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'About CloudTopia',
                        description: 'Learn about CloudTopia\'s mission to empower businesses with digital and cloud technologies.',
                        url: 'https://cloudtopia.net/about',
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
