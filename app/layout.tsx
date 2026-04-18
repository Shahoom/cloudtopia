import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Cairo } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudtopia.net'),
  title: {
    default: 'CloudTopia — Digital & Cloud Technologies',
    template: '%s | CloudTopia'
  },
  description: 'CloudTopia is a Gulf-first digital agency building bilingual Arabic + English websites, e-commerce stores with Mada and Apple Pay, and custom business systems. Fixed pricing, from $399.',
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'tr_TR'],
    url: 'https://cloudtopia.net',
    title: 'CloudTopia — Digital & Cloud Technologies',
    description: 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
    siteName: 'CloudTopia',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloudTopia — Digital & Cloud Technologies',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudTopia — Digital & Cloud Technologies',
    description: 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
    creator: '@thecloudtopia',
    site: '@thecloudtopia',
    images: ['/images/og-image.jpg'],
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
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
  other: {
    'google': 'notranslate',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'CloudTopia',
    // AI agent discovery files
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = headers().get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts early */}
        <link
          rel="preload"
          href="/fonts/Changa-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Preload cloud hero images so there's no black flash */}
        <link rel="preload" as="image" href="/images/homepage/clouds.webp" type="image/webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/homepage/clouds-b.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/homepage/clouds-c.webp" type="image/webp" />
        <link rel="manifest" href="/manifest.json" />


        {/* Hreflang tracking is handled robustly via the dynamic sitemap.xml */}

        {/* Preconnect to external resources optionally - removed for Fonts as unused */}
        {/* JSON-LD Organization Schema */}
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
              description: 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
              foundingDate: '2024',
              areaServed: [
                { '@type': 'Country', name: 'Saudi Arabia' },
                { '@type': 'Country', name: 'United Arab Emirates' },
                { '@type': 'Country', name: 'Kuwait' },
                { '@type': 'Country', name: 'Qatar' },
                { '@type': 'Country', name: 'Bahrain' },
                { '@type': 'Country', name: 'Oman' },
                { '@type': 'Country', name: 'Türkiye' },
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-501-151-11-16',
                contactType: 'customer service',
                email: 'info@cloudtopia.net',
                availableLanguage: ['English', 'Arabic', 'Turkish'],
                areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'TR'],
              },
              sameAs: [
                'https://x.com/thecloudtopia',
                'https://instagram.com/thecloudtopia',
                'https://github.com/Shahoom',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'TR',
              },
              knowsLanguage: ['en', 'ar', 'tr'],
            }),
          }}
        />

        {/* JSON-LD WebSite Schema for Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CloudTopia',
              url: 'https://cloudtopia.net',
              description: 'Digital & Cloud Technologies — Website design, business systems, e-commerce, and custom web applications for growing businesses.',
              inLanguage: ['en', 'ar', 'tr'],
              publisher: {
                '@type': 'Organization',
                name: 'CloudTopia',
                url: 'https://cloudtopia.net',
              },
            }),
          }}
        />
      </head>
      <body className={`flex flex-col min-h-screen antialiased font-['Changa',sans-serif] ${cairo.variable}`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
