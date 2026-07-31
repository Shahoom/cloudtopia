import type { Metadata, Viewport } from 'next'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import { Cairo } from 'next/font/google'
import { MetaPixelBoot, PixelRouteChangeTracker } from '@/components/analytics/MetaPixel'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { AIChatbotLazy as AIChatbot } from '@/components/ai-chatbot/AIChatbotLazy'
import { locales } from '@/lib/i18n/config'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import '../../globals.css'

/**
 * ROOT layout for the country-landing group.
 *
 * Moved down from `app/(country-landing)/layout.tsx` so the locale comes from
 * `params` instead of the proxy's `x-locale` header. Reading a request header in
 * a root layout forces every route beneath it to be server-rendered per request;
 * taking it from params lets these high-intent geo pages prerender and be served
 * from the CDN. See the matching note in (frontend)/[locale]/layout.tsx.
 */

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

// Cached until something explicitly invalidates it — CMS saves already call
// revalidatePath('/', 'layout') via revalidateCmsTags(). A timer here would only
// re-render pages nobody changed; see PAGE_REVALIDATE in lib/cms/cache-policy.ts
// for the numbers. Next requires a literal, so tests/cache-policy.test.ts is
// what keeps this in sync with that constant.
export const revalidate = false

const cairo = Cairo({
    subsets: ['latin', 'arabic'],
    variable: '--font-cairo',
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://cloudtopia.net'),
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    // Match the (frontend) brand theme color so the two route groups don't
    // diverge in the browser UI / PWA chrome.
    themeColor: '#0ea5e9',
}

export default async function CountryLandingRootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = locales.includes(rawLocale as (typeof locales)[number]) ? rawLocale : 'en'
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    const isArabic = locale === 'ar'
    const websiteDescription = isArabic
        ? 'خدمات تطوير مواقع، متاجر إلكترونية، تطبيقات ويب، أنظمة أعمال CRM وERP، حلول سحابية، وأتمتة ذكاء اصطناعي باللغة العربية والإنجليزية.'
        : 'Digital and cloud technology services for websites, e-commerce, web applications, CRM and ERP systems, cloud infrastructure, and AI automation in Arabic and English.'

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
            <head>
                {/* Google tag (gtag.js) — first in <head>, exactly one per page. */}
                <GoogleAnalytics />
                <link rel="manifest" href="/manifest.json" />
                {/* Canonical WebSite node. The country-landing pages each emit the
                    #organization node themselves; the layout supplies the matching
                    #website node (with SearchAction) so this high-intent geo group is
                    no longer missing it. */}
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            '@id': 'https://cloudtopia.net/#website',
                            name: 'CloudTopia',
                            alternateName: ['CloudTopia Digital Agency', 'كلاود توبيا'],
                            url: 'https://cloudtopia.net',
                            description: websiteDescription,
                            inLanguage: ['en-US', 'ar-SA'],
                            publisher: {
                                '@type': 'Organization',
                                '@id': 'https://cloudtopia.net/#organization',
                                name: 'CloudTopia',
                                url: 'https://cloudtopia.net',
                            },
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://cloudtopia.net/articles/search?q={search_term_string}',
                                },
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
            </head>
            <body className="min-h-screen antialiased font-['Changa',sans-serif]">
                <MetaPixelBoot />
                <PixelRouteChangeTracker />
                {children}
                <AIChatbot />
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    )
}
