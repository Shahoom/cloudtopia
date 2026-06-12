import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Cairo } from 'next/font/google'
import { MetaPixelBoot, PixelRouteChangeTracker } from '@/components/analytics/MetaPixel'
import { AIChatbotLazy as AIChatbot } from '@/components/ai-chatbot/AIChatbotLazy'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

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
}: {
  children: React.ReactNode
}) {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const isArabic = locale === 'ar'
  const websiteDescription = isArabic
    ? 'خدمات تطوير مواقع، متاجر إلكترونية، تطبيقات ويب، أنظمة أعمال CRM وERP، حلول سحابية، وأتمتة ذكاء اصطناعي باللغة العربية والإنجليزية.'
    : 'Digital and cloud technology services for websites, e-commerce, web applications, CRM and ERP systems, cloud infrastructure, and AI automation in Arabic and English.'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Canonical WebSite node. The country-landing pages each emit the
            #organization node themselves; the layout supplies the matching
            #website node (with SearchAction) so this high-intent geo group is
            no longer missing it. */}
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
