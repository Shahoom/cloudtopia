import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocation } from '@/lib/seo/locations'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl } from '@/lib/i18n/url'
import { getCountryRedirect } from '@/lib/seo/country-redirects'

type PageProps = {
    params: Promise<{ locale: string; country: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', country } = await params
    const duplicateRedirect = getCountryRedirect(locale === 'ar' ? `/ar/locations/${country}` : `/locations/${country}`)
    if (duplicateRedirect) {
        return {
            title: 'Redirecting',
            alternates: {
                canonical: `https://cloudtopia.net${duplicateRedirect}`,
            },
        }
    }
    const location = getLocation(country)
    if (!location) return { title: 'Location Not Found' }

    const name = locale === 'ar' ? location.nameAr : location.nameEn

    const titles: Record<string, string> = {
        en: `Digital Agency in ${name} — Websites, E-commerce & Custom Systems`,
        ar: `وكالة رقمية في ${name} — مواقع، متاجر إلكترونية، وأنظمة مخصصة`,
    }
    const descs: Record<string, string> = {
        en: `CloudTopia builds bilingual Arabic + English websites, e-commerce stores, and custom business systems for companies in ${location.country}. ${location.paymentMethods.slice(0, 3).join(', ')} ready. Fixed pricing.`,
        ar: `كلاود توبيا تبني مواقع ومتاجر إلكترونية وأنظمة أعمال مخصصة ثنائية اللغة عربي + إنجليزي للشركات في ${name}. ${location.paymentMethods.slice(0, 3).join('، ')} جاهزة. تسعير ثابت.`,
    }

    return {
        title: titles[locale],
        description: descs[locale],
        openGraph: {
            title: titles[locale],
            description: descs[locale],
            url: canonicalUrl(locale, `/locations/${country}`),
            // Per-country OG override: /public/images/og/locations/{country}-{locale}.jpg
            // Drop a Saudi/Riyadh image at locations/saudi-arabia-en.jpg etc.
            images: ogImagesFor({ page: `locations/${country}`, locale }),
        },
        alternates: {
            canonical: canonicalUrl(locale, `/locations/${country}`),
            languages: {
                'en': canonicalUrl('en', `/locations/${country}`),
                'ar': canonicalUrl('ar', `/locations/${country}`),
                'x-default': canonicalUrl('en', `/locations/${country}`),
            },
        },
    }
}

// Every valid country slug redirects to its canonical market landing page
// (see lib/seo/country-redirects.ts), so this route only resolves the
// redirect target or 404s for unknown slugs — it renders no page body.
export default async function LocationPage({ params }: PageProps) {
    const { locale = 'en', country } = await params
    const duplicateRedirect = getCountryRedirect(locale === 'ar' ? `/ar/locations/${country}` : `/locations/${country}`)
    if (duplicateRedirect) permanentRedirect(duplicateRedirect)

    const location = getLocation(country)
    if (!location) notFound()

    // Any location with a data entry also has a redirect rule above; reaching
    // here means the slug is unmapped, so treat it as not found.
    notFound()
}
