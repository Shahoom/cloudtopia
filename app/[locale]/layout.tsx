import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'CloudTopia — Digital & Cloud Technologies',
        ar: 'كلاود توبيا — تقنيات رقمية وسحابية',
        tr: 'CloudTopia — Dijital & Bulut Teknolojileri',
    }
    const descriptions: Record<string, string> = {
        en: 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
        ar: 'كلاود توبيا تبني مواقع ويب، أنظمة أعمال مخصصة، متاجر إلكترونية، وتطبيقات ويب. وكالة رقمية متخصصة للشركات النامية.',
        tr: 'CloudTopia web siteleri, özel iş sistemleri, e-ticaret mağazaları ve web uygulamaları geliştirir. Büyüyen işletmeler için uzman dijital ajans.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
    const siteNames: Record<string, string> = { en: 'CloudTopia', ar: 'كلاود توبيا', tr: 'CloudTopia' }
    const templates: Record<string, string> = { en: '%s | CloudTopia', ar: '%s | كلاود توبيا', tr: '%s | CloudTopia' }

    const title = titles[locale] || titles.en
    const description = descriptions[locale] || descriptions.en
    const ogLocale = ogLocales[locale] || ogLocales.en
    const alternateOgLocales = Object.entries(ogLocales).filter(([k]) => k !== locale).map(([, v]) => v)

    return {
        title: {
            absolute: title,
            template: templates[locale] || templates.en,
        },
        description,
        openGraph: {
            type: 'website',
            locale: ogLocale,
            alternateLocale: alternateOgLocales,
            url: `https://cloudtopia.net/${locale}`,
            title,
            description,
            siteName: siteNames[locale] || siteNames.en,
            images: [{
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: title,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: descriptions[locale] || descriptions.en,
        },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}`,
            languages: {
                'en': 'https://cloudtopia.net/en',
                'ar': 'https://cloudtopia.net/ar',
                'tr': 'https://cloudtopia.net/tr',
                'x-default': 'https://cloudtopia.net/en',
            },
        },
    }
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
