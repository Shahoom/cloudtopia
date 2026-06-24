import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import CountryLandingPage from '@/components/country-landing/CountryLandingPage'
import {
    countryLandingPages,
    getCountryLandingPage,
    getCountryLandingPageByCode,
    type CountryLocale,
} from '@/lib/seo/country-landing-pages'
import { ogImagesFor } from '@/lib/og/og-image'
import { getCMSPage } from '@/lib/cms/content'

type PageProps = {
    params: Promise<{ locale: string; country: string }>
}

function resolveLocale(rawLocale: string): CountryLocale | null {
    if (rawLocale === 'ar' || rawLocale === 'en') return rawLocale
    return null
}

export function generateStaticParams() {
    return countryLandingPages.flatMap((country) => [
        { locale: 'en', country: country.slug },
        { locale: 'ar', country: country.slug },
    ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale: rawLocale, country: rawCountry } = await params
    const locale = resolveLocale(rawLocale)
    const country = getCountryLandingPage(rawCountry)
    if (!locale || !country) return { title: 'Country Not Found' }

    const content = country.content[locale]
    // Optional CMS override via a Pages row with slug "markets/<slug>" (real,
    // migration-backed seo column). Static content stays the fallback.
    const cmsPage = await getCMSPage(locale, `markets/${country.slug}`)
    const cmsSeo = (cmsPage?.seo || {}) as Record<string, any>
    const seoTitle = (cmsSeo.title as string) || content.seoTitle
    const seoDescription = (cmsSeo.description as string) || content.seoDescription
    const canonical = `https://cloudtopia.net${locale === 'ar' ? country.arabicUrl : country.englishUrl}`
    const englishCanonical = `https://cloudtopia.net${country.englishUrl}`
    const arabicCanonical = `https://cloudtopia.net${country.arabicUrl}`
    const images = ogImagesFor({ page: `markets/${country.slug}`, locale })

    return {
        title: seoTitle,
        description: seoDescription,
        robots: cmsSeo.noindex ? { index: false, follow: false } : undefined,
        keywords: [content.primaryKeyword, ...content.secondaryKeywords, country.countryNameEnglish, country.countryNameArabic],
        alternates: {
            canonical,
            // Regional hreflang (en-SA / ar-SA …) is intentional here and kept in
            // sync with the sitemap (lib/sitemap-data.ts): each country page is a
            // country-targeted landing page (distinct name, phone, currency, and
            // primary keyword), so the regional tag is correct, not an error.
            // Semrush reports 0 hreflang errors; its "-" simply means it doesn't
            // tally region-coded tags the same way as plain en/ar.
            languages: {
                [country.hreflangEnglish]: englishCanonical,
                [country.hreflangArabic]: arabicCanonical,
                'x-default': englishCanonical,
            },
        },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: canonical,
            siteName: 'CloudTopia',
            locale: locale === 'ar' ? country.hreflangArabic.replace('-', '_') : country.hreflangEnglish.replace('-', '_'),
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: images.map((image) => image.url),
        },
    }
}

export default async function CountryPage({ params }: PageProps) {
    const { locale: rawLocale, country: rawCountry } = await params
    const locale = resolveLocale(rawLocale)
    if (!locale) notFound()

    const codeMatch = getCountryLandingPageByCode(rawCountry)
    if (codeMatch) {
        permanentRedirect(locale === 'ar' ? codeMatch.arabicUrl : codeMatch.englishUrl)
    }

    const country = getCountryLandingPage(rawCountry)
    if (!country) notFound()

    return <CountryLandingPage country={country} locale={locale} />
}
