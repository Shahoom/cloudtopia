import type { Metadata, Viewport } from 'next'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import { Cairo, Hanken_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MetaPixelBoot, PixelRouteChangeTracker } from '@/components/analytics/MetaPixel'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { AIChatbotLazy as AIChatbot } from '@/components/ai-chatbot/AIChatbotLazy'
import { ThemeProvider } from '@/components/theme-provider'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { locales, type Locale } from '@/lib/i18n/config'
import { getSiteChrome } from '@/lib/cms/content'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import WebMCP from '@/components/agent/WebMCP'
import '../../globals.css'

/**
 * ROOT layout for the public site.
 *
 * This owns <html>/<body> deliberately. It used to live one level up at
 * `app/(frontend)/layout.tsx`, which had no access to `params` and therefore
 * read the locale out of the `x-locale` request header set by the proxy. A
 * dynamic API (`headers()`) in a root layout opts EVERY route beneath it out of
 * static rendering — the whole public site was server-rendered on every single
 * request (0 of 188 routes prerendered, `cache-control: no-store` in prod).
 *
 * Taking the locale from `params` instead keeps `lang`/`dir` correct while
 * letting Next prerender the site and serve it from the CDN.
 *
 * Invariant: nothing in this subtree may call `headers()`, `cookies()`, or
 * `connection()`. Anything genuinely per-visitor (geo, etc.) must be resolved
 * client-side or behind a route handler — see FloatingWhatsApp below.
 */

// Both locales are known ahead of time, so both prerender at build.
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

// ISR: pages are served from the CDN and refreshed hourly. CMS saves also
// invalidate immediately via revalidateCmsTags() -> revalidatePath('/', 'layout').
// Keep in sync with CMS_REVALIDATE_SECONDS in lib/cms/cache-policy.ts (that file
// carries the rationale). Next requires this to be a literal, so it cannot
// import the constant; tests/cache-policy.test.ts asserts they match.
export const revalidate = 86400

const cairo = Cairo({
    subsets: ['latin', 'arabic'],
    variable: '--font-cairo',
    // Headings only ever use 600/700/800/900 (+400 baseline); dropping the unused
    // 300/500 cuts four Cairo font files (two weights × two subsets) from the
    // critical download path.
    weight: ['400', '600', '700', '800', '900'],
    display: 'swap',
})

// Latin UI face for English. A refined grotesque with more character and a
// crisper read than Changa's Latin glyphs (Changa is Arabic-first). Placed
// FIRST in the English font stack so Latin text renders in Hanken while any
// Arabic glyph falls through to Changa — Arabic typography is untouched.
const hanken = Hanken_Grotesk({
    subsets: ['latin'],
    variable: '--font-hanken',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
})

// Arabic UI face — drives all Arabic body + heading text via --font-arabic.
// Swap the family here to trial a different Arabic font; globals reference the
// generic --font-ar-ui variable so nothing else changes. Logo, tagline, and blog
// fonts are untouched.
const arUi = IBM_Plex_Sans_Arabic({
    subsets: ['arabic', 'latin'],
    variable: '--font-ar-ui',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})

/**
 * Site-wide metadata defaults. Previously a static `metadata` export on the
 * removed parent layout; now spread as the base of generateMetadata below,
 * which reproduces Next's own layout->layout merge order.
 */
const SITE_METADATA: Metadata = {
    metadataBase: new URL('https://cloudtopia.net'),
    title: {
        default: 'CloudTopia - Digital & Cloud Technologies',
        template: '%s | CloudTopia',
    },
    description:
        'CloudTopia builds SEO-ready websites, e-commerce platforms, web apps, CRM and ERP systems, cloud infrastructure, and AI automation for businesses in Arabic and English.',
    keywords: [
        'Gulf digital agency',
        'Saudi Arabia website design',
        'UAE web development',
        'Arabic RTL website',
        'Mada payment integration',
        'bilingual website Arabic English',
        'Gulf e-commerce',
    ],
    authors: [{ name: 'CloudTopia', url: 'https://cloudtopia.net' }],
    creator: 'CloudTopia',
    publisher: 'CloudTopia',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
        // iOS Safari does NOT render SVG apple-touch icons — ship a real 180x180 PNG
        // so add-to-home-screen / shared links get the brand mark, not a screenshot.
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: ['ar_SA'],
        url: 'https://cloudtopia.net',
        title: 'CloudTopia - Digital & Cloud Technologies',
        description:
            'SEO-ready websites, e-commerce platforms, web apps, CRM and ERP systems, cloud infrastructure, and AI automation for Arabic and English business growth.',
        siteName: 'CloudTopia',
        images: ogImagesFor({ page: 'home', locale: 'en' }),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CloudTopia - Digital & Cloud Technologies',
        description:
            'SEO-ready websites, e-commerce platforms, web apps, CRM and ERP systems, cloud infrastructure, and AI automation for Arabic and English business growth.',
        creator: '@thecloudtopia',
        site: '@thecloudtopia',
        images: ogImagesFor({ page: 'home', locale: 'en' }).map((i) => i.url),
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        ...(process.env.GOOGLE_VERIFICATION && { google: process.env.GOOGLE_VERIFICATION }),
    },
    category: 'technology',
    other: {
        google: 'notranslate',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'CloudTopia',
        'llms-txt': 'https://cloudtopia.net/llms.txt',
        'pricing-md': 'https://cloudtopia.net/pricing.md',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
        { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' },
    ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/', 'home')
    const isArabic = locale === 'ar'
    const brandName = isArabic ? 'كلاود توبيا' : 'CloudTopia'
    const title = isArabic
        ? 'كلاود توبيا | شركة برمجيات وحلول سحابية وذكاء اصطناعي عربية'
        : 'CloudTopia | Arabic Software, Cloud & AI Company'
    const socialTitle = isArabic
        ? 'كلاود توبيا | شركة برمجيات وحلول سحابية وذكاء اصطناعي عربية'
        : 'CloudTopia | Arabic Software, Cloud & AI Company'
    // TM-11: kept within the ~165-char snippet budget (was 196/184).
    const description = isArabic
        ? 'كلاود توبيا شركة عربية للبرمجيات والسحابة والذكاء الاصطناعي، تبني مواقع SEO، متاجر إلكترونية، أنظمة CRM/ERP، تطبيقات، وأتمتة ذكية للشركات في الخليج والعالم العربي.'
        : 'CloudTopia is an Arabic software, cloud and AI company building SEO websites, e-commerce, CRM/ERP systems, mobile apps and AI automation for the GCC and Arab world.'

    return {
        ...SITE_METADATA,
        ...metadata,
        // getCMSMetadata returns `robots: undefined` for indexable pages. Spread
        // over the base that erases the site-wide googleBot directives (which is
        // why prod served no robots meta at all), so only an explicit CMS
        // noindex is allowed to win.
        robots: metadata.robots ?? SITE_METADATA.robots,
        title: {
            default: title,
            template: `%s | ${brandName}`,
        },
        description,
        openGraph: {
            ...metadata.openGraph,
            title: socialTitle,
            description,
        },
        twitter: {
            ...metadata.twitter,
            title: socialTitle,
            description,
        },
    }
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'en'
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    const isArabic = locale === 'ar'
    const chrome = await getSiteChrome(locale)
    const heroPatch = isArabic
        ? {
            tags: ['كلاود توبيا | تكنلوجيا رقمية وسحابية', 'أنظمة عربية', 'سحابة وذكاء اصطناعي'],
            title: 'أنظمة برمجية وسحابية وذكاء اصطناعي مصممة للعالم العربي.',
            titleHighlights: ['أنظمة برمجية', 'حلول سحابية', 'ذكاء اصطناعي'],
            description: 'تساعد كلاود توبيا الشركات في السعودية، الإمارات، الخليج، والعالم العربي على بناء منتجات رقمية قابلة للتوسع، تحسّن العمليات، تقلل العمل اليدوي، وتسرّع النمو.',
        }
        : {
            tags: ['CLOUDTOPIA — DIGITAL & CLOUD TECHNOLOGIES', 'Arabic Software Company', 'Cloud AI Systems'],
            title: 'Software, cloud, and AI systems built for the Arab world.',
            titleHighlights: ['Software', 'Cloud', 'AI systems'],
            description: 'CloudTopia helps businesses in Oman, Saudi Arabia, UAE, and the Arab world build scalable digital products that improve operations, reduce manual work, and accelerate growth.',
        }
    const chromeDictionary = {
        ...chrome.dictionary,
        home: {
            ...(chrome.dictionary as any).home,
            hero: {
                ...((chrome.dictionary as any).home?.hero || {}),
                ...heroPatch,
            },
        },
    }

    const organizationDescription = isArabic
        ? 'كلاود توبيا شركة تقنيات رقمية وسحابية مسجّلة في سلطنة عُمان، وشريك معتمد لـ AWS ومايكروسوفت وسيلز فورس وسترايب وشوبيفاي. تطور مواقع محسنة لمحركات البحث، متاجر إلكترونية، تطبيقات ويب، أنظمة CRM وERP، بنية سحابية، وأتمتة بالذكاء الاصطناعي للشركات في الخليج والشرق الأوسط.'
        : 'CloudTopia is a digital and cloud technology company registered in the Sultanate of Oman and an official partner of AWS, Microsoft, Salesforce, Stripe, and Shopify. It builds SEO-ready websites, e-commerce platforms, web apps, CRM and ERP systems, cloud infrastructure, and AI automation for businesses across the Gulf and Middle East.'
    const websiteDescription = isArabic
        ? 'خدمات تطوير مواقع، متاجر إلكترونية، تطبيقات ويب، أنظمة أعمال CRM وERP، حلول سحابية، وأتمتة ذكاء اصطناعي باللغة العربية والإنجليزية.'
        : 'Digital and cloud technology services for websites, e-commerce, web applications, CRM and ERP systems, cloud infrastructure, and AI automation in Arabic and English.'

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning className={`${cairo.variable} ${hanken.variable} ${arUi.variable}`}>
            <head>
                {/* Google tag (gtag.js) — first in <head>, exactly one per page. */}
                <GoogleAnalytics />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="min-h-screen antialiased" suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            // Stable @id — the single canonical Organization node every other
                            // page references via buildOrganizationRef() (SD-5).
                            '@id': 'https://cloudtopia.net/#organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                            // Raster PNG — Google does NOT accept SVG for Organization logo or
                            // Article publisher.logo (SD-1). 512x512 rasterized from the brand SVG.
                            logo: 'https://cloudtopia.net/images/cloudtopia-logo.png',
                            image: 'https://cloudtopia.net/images/cloudtopia-logo.png',
                            description: organizationDescription,
                            foundingDate: '2024',
                            // CloudTopia is a registered company in the Sultanate of Oman.
                            address: {
                                '@type': 'PostalAddress',
                                addressCountry: 'OM',
                                addressRegion: 'Muscat',
                            },
                            foundingLocation: {
                                '@type': 'Country',
                                name: 'Oman',
                            },
                            // Certified/official platform partnerships, surfaced as expertise
                            // topics so search engines associate the brand with these vendors.
                            knowsAbout: [
                                'Amazon Web Services (AWS Advanced Tier Services Partner)',
                                'Microsoft (Microsoft Partner)',
                                'Salesforce (Salesforce Partner)',
                                'Stripe (Stripe Partner)',
                                'Shopify (Shopify Certified Partner)',
                            ],
                            areaServed: [
                                { '@type': 'Country', name: 'Saudi Arabia' },
                                { '@type': 'Country', name: 'United Arab Emirates' },
                                { '@type': 'Country', name: 'Kuwait' },
                                { '@type': 'Country', name: 'Qatar' },
                                { '@type': 'Country', name: 'Bahrain' },
                                { '@type': 'Country', name: 'Oman' },
                            ],
                            contactPoint: [
                                {
                                    '@type': 'ContactPoint',
                                    contactType: 'customer service',
                                    // Use the contact page URL rather than a bare email: Cloudflare
                                    // Email Obfuscation rewrites any literal address (even inside
                                    // JSON-LD) into a /cdn-cgi/l/email-protection link that 404s to
                                    // crawlers, polluting the broken-internal-links report.
                                    url: 'https://cloudtopia.net/contact',
                                    availableLanguage: ['English', 'Arabic'],
                                    areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
                                },
                                {
                                    '@type': 'ContactPoint',
                                    contactType: 'sales',
                                    telephone: '+968 9588 6393',
                                    availableLanguage: ['English', 'Arabic'],
                                    areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
                                },
                            ],
                            sameAs: [
                                'https://x.com/thecloudtopia',
                                'https://instagram.com/thecloudtopia',
                                'https://github.com/Shahoom',
                                'https://clutch.co/profile/cloudtopia-0',
                                'https://www.goodfirms.co/company/cloudtopia',
                            ],
                            knowsLanguage: ['en', 'ar'],
                            // Connect the company entity to the real founder Person, reusing the
                            // exact #person @id minted on the /articles/author/mohamad-shahm
                            // profile route so Google reconciles author == founder == one person.
                            founder: {
                                '@type': 'Person',
                                '@id': 'https://cloudtopia.net/articles/author/mohamad-shahm#person',
                                name: 'Mohamad Shahm',
                                url: 'https://cloudtopia.net/articles/author/mohamad-shahm',
                            },
                        }),
                    }}
                />
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
                <div className="min-h-screen">
                    <MetaPixelBoot />
                    <PixelRouteChangeTracker />
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        <LanguageProvider
                            initialLocale={locale}
                            initialDictionary={chromeDictionary}
                            initialDesign={chrome.design}
                            initialNavigation={chrome.navigation}
                            initialSettings={chrome.settings}
                        >
                            <div className="flex min-h-screen flex-col">
                                <Header />
                                <main className="flex-grow">{children}</main>
                                <Footer />
                            </div>
                            <WebMCP />
                        </LanguageProvider>
                        <AIChatbot />
                        {/* Geo-correct WhatsApp number is resolved by the /api/whatsapp
                            route handler (GCC -> Oman, elsewhere -> Türkiye) rather than
                            from a request header here, so this layout stays static. */}
                        <FloatingWhatsApp href={`/api/whatsapp?locale=${locale}`} locale={locale} />
                    </ThemeProvider>
                    <SpeedInsights />
                    <Analytics />
                </div>
            </body>
        </html>
    )
}
