import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Cairo, Fraunces, Amiri, Hanken_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { MetaPixelBoot, PixelRouteChangeTracker } from '@/components/analytics/MetaPixel'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { AIChatbotLazy as AIChatbot } from '@/components/ai-chatbot/AIChatbotLazy'
import { ThemeProvider } from '@/components/theme-provider'
import { ogImagesFor } from '@/lib/og/og-image'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { CONTACTS } from '@/lib/agent/site-facts'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import '../globals.css'

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  // Headings only ever use 600/700/800/900 (+400 baseline); dropping the unused
  // 300/500 cuts four Cairo font files (two weights × two subsets) from the
  // critical download path.
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

// Editorial display serif (Latin) for the blog — headlines, pull quotes, drop
// caps. Variable-weight range 400–600 plus italic covers every editorial use.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Arabic display serif (Naskh) — the RTL counterpart to Fraunces for blog
// headlines and pull quotes. Fraunces is Latin-only and never applied to Arabic.
const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  weight: ['400', '700'],
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

export const metadata: Metadata = {
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

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  // Regional WhatsApp routing: GCC visitors reach the Oman number, everyone else
  // the Türkiye number. Country comes from the CDN geo header (Cloudflare /
  // Vercel); when it's absent (e.g. local dev) we default to the Oman number.
  const geoCountry = (requestHeaders.get('cf-ipcountry') || requestHeaders.get('x-vercel-ip-country') || '').toUpperCase()
  const GCC_COUNTRIES = ['OM', 'SA', 'AE', 'QA', 'KW', 'BH']
  const whatsappHref = !geoCountry || GCC_COUNTRIES.includes(geoCountry)
    ? CONTACTS.whatsapp[0].link
    : CONTACTS.whatsapp[1].link
  const isArabic = locale === 'ar'
  const organizationDescription = isArabic
    ? 'كلاود توبيا شركة تقنيات رقمية وسحابية مسجّلة في سلطنة عُمان، وشريك معتمد لـ AWS ومايكروسوفت وسيلز فورس وسترايب وشوبيفاي. تطور مواقع محسنة لمحركات البحث، متاجر إلكترونية، تطبيقات ويب، أنظمة CRM وERP، بنية سحابية، وأتمتة بالذكاء الاصطناعي للشركات في الخليج والشرق الأوسط.'
    : 'CloudTopia is a digital and cloud technology company registered in the Sultanate of Oman and an official partner of AWS, Microsoft, Salesforce, Stripe, and Shopify. It builds SEO-ready websites, e-commerce platforms, web apps, CRM and ERP systems, cloud infrastructure, and AI automation for businesses across the Gulf and Middle East.'
  const websiteDescription = isArabic
    ? 'خدمات تطوير مواقع، متاجر إلكترونية، تطبيقات ويب، أنظمة أعمال CRM وERP، حلول سحابية، وأتمتة ذكاء اصطناعي باللغة العربية والإنجليزية.'
    : 'Digital and cloud technology services for websites, e-commerce, web applications, CRM and ERP systems, cloud infrastructure, and AI automation in Arabic and English.'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${cairo.variable} ${fraunces.variable} ${amiri.variable} ${hanken.variable} ${arUi.variable}`}>
      <head>
        {/* Google tag (gtag.js) — first in <head>, exactly one per page. */}
        <GoogleAnalytics />
        {/* Only the LCP hero background is preloaded. The self-hosted TTF body/
            logo faces use font-display:swap, so preheating them at high priority
            here just stole bandwidth from the LCP image and render-critical CSS
            on mobile — they now load lazily and swap in without blocking paint. */}
        <link rel="preload" as="image" href="/images/homepage/clouds.webp" type="image/webp" fetchPriority="high" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              sameAs: ['https://x.com/thecloudtopia', 'https://instagram.com/thecloudtopia', 'https://github.com/Shahoom'],
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
            __html: JSON.stringify({
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
            {children}
            <AIChatbot />
            <FloatingWhatsApp href={whatsappHref} locale={locale} />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
