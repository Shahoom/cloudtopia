import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import CountryLandingPage from '@/components/country-landing/CountryLandingPage'
import {
    countryLandingPages,
    getCountryLandingPage,
    getCountryLandingPageByCode,
    type CountryLocale,
} from '@/lib/seo/country-landing-pages'
import { ogImagesFor } from '@/lib/og/og-image'

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
    const canonical = `https://cloudtopia.net${locale === 'ar' ? country.arabicUrl : country.englishUrl}`
    const englishCanonical = `https://cloudtopia.net${country.englishUrl}`
    const arabicCanonical = `https://cloudtopia.net${country.arabicUrl}`
    const images = ogImagesFor({ page: `markets/${country.slug}`, locale })

    return {
        title: content.seoTitle,
        description: content.seoDescription,
        keywords: [content.primaryKeyword, ...content.secondaryKeywords, country.countryNameEnglish, country.countryNameArabic],
        alternates: {
            canonical,
            languages: {
                [country.hreflangEnglish]: englishCanonical,
                [country.hreflangArabic]: arabicCanonical,
                'x-default': englishCanonical,
            },
        },
        openGraph: {
            title: content.seoTitle,
            description: content.seoDescription,
            url: canonical,
            siteName: 'CloudTopia',
            locale: locale === 'ar' ? country.hreflangArabic.replace('-', '_') : country.hreflangEnglish.replace('-', '_'),
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title: content.seoTitle,
            description: content.seoDescription,
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
        redirect(locale === 'ar' ? codeMatch.arabicUrl : codeMatch.englishUrl)
    }

    const country = getCountryLandingPage(rawCountry)
    if (!country) notFound()

    return <CountryLandingPage country={country} locale={locale} />
}
