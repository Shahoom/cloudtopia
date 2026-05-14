import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

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

    // Per-locale OG image — drop a file at /public/images/og/home-{locale}.jpg
    // (1200×630) to override; falls back to /images/og/default-{locale}.jpg,
    // then default.jpg, then legacy /images/og-image.jpg.
    const images = ogImagesFor({ page: 'home', locale })

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
            url: canonicalUrl(locale, '/'),
            title,
            description,
            siteName: siteNames[locale] || siteNames.en,
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: descriptions[locale] || descriptions.en,
            images: images.map((i) => i.url),
        },
        alternates: {
            canonical: canonicalUrl(locale, '/'),
            languages: buildHreflangMap('/'),
        },
    }
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
