import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Cairo } from 'next/font/google'
import { MetaPixelBoot, PixelRouteChangeTracker } from '@/components/analytics/MetaPixel'
import { ThemeProvider } from '@/components/theme-provider'
import { ogImagesFor } from '@/lib/og/og-image'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudtopia.net'),
  title: {
    default: 'CloudTopia - Digital & Cloud Technologies',
    template: '%s | CloudTopia',
  },
  description:
    'CloudTopia is a Gulf-first digital agency building bilingual Arabic + English websites, e-commerce stores with Mada and Apple Pay, and custom business systems. Fixed pricing from $299.',
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
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'tr_TR'],
    url: 'https://cloudtopia.net',
    title: 'CloudTopia - Digital & Cloud Technologies',
    description:
      'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
    siteName: 'CloudTopia',
    images: ogImagesFor({ page: 'home', locale: 'en' }),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudTopia - Digital & Cloud Technologies',
    description:
      'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
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

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/Changa-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AgharaProRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/images/homepage/clouds.webp" type="image/webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/homepage/clouds-b.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/homepage/clouds-c.webp" type="image/webp" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CloudTopia',
              url: 'https://cloudtopia.net',
              logo: 'https://cloudtopia.net/images/CloudTopia.svg',
              image: 'https://cloudtopia.net/images/og-image.jpg',
              description:
                'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
              foundingDate: '2024',
              areaServed: [
                { '@type': 'Country', name: 'Saudi Arabia' },
                { '@type': 'Country', name: 'United Arab Emirates' },
                { '@type': 'Country', name: 'Kuwait' },
                { '@type': 'Country', name: 'Qatar' },
                { '@type': 'Country', name: 'Bahrain' },
                { '@type': 'Country', name: 'Oman' },
                { '@type': 'Country', name: 'Turkiye' },
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-501-151-11-16',
                contactType: 'customer service',
                email: 'info@cloudtopia.net',
                availableLanguage: ['English', 'Arabic', 'Turkish'],
                areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'TR'],
              },
              sameAs: ['https://x.com/thecloudtopia', 'https://instagram.com/thecloudtopia', 'https://github.com/Shahoom'],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'TR',
              },
              knowsLanguage: ['en', 'ar', 'tr'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://cloudtopia.net/#website',
              name: 'CloudTopia',
              alternateName: ['CloudTopia Digital Agency'],
              url: 'https://cloudtopia.net',
              description:
                'Digital & Cloud Technologies - Website design, business systems, e-commerce, and custom web applications for growing businesses.',
              inLanguage: ['en-US', 'ar-SA', 'tr-TR'],
              publisher: {
                '@type': 'Organization',
                '@id': 'https://cloudtopia.net/#organization',
                name: 'CloudTopia',
                url: 'https://cloudtopia.net',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-['Changa',sans-serif]">
        <div className="min-h-screen">
          <MetaPixelBoot />
          <PixelRouteChangeTracker />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <SpeedInsights />
        </div>
      </body>
    </html>
  )
}
