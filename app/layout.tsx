import type { Metadata, Viewport } from 'next'
import { Changa } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const changa = Changa({
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-changa',
})

const agharaPro = localFont({
  src: '../public/fonts/AgharaProRegular.ttf',
  variable: '--font-aghara-pro',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudtopia.net'),
  title: {
    default: 'CloudTopia — Digital & Cloud Technologies | Worldwide',
    template: '%s | CloudTopia'
  },
  description: 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services serving clients worldwide.',
  keywords: [
    'cloud solutions',
    'digital agency',
    'web development',
    'cloud infrastructure',
    'digital transformation',
    'business systems',
    'web applications',
    'AI tools',
    'worldwide',
    'global services',
    'custom software',
    'digital presence',
    'CloudTopia',
    'website design',
    'e-commerce solutions',
    'social media marketing',
    'content creation',
    'QR menu',
    'cloud computing',
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
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://cloudtopia.net',
    title: 'CloudTopia — Digital & Cloud Technologies',
    description: 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services worldwide.',
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
    description: 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services worldwide.',
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
  alternates: {
    // Let Next.js auto-generate canonical based on metadataBase
  },
  category: 'technology',
  other: {
    'google': 'notranslate',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'CloudTopia',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://cloudtopia.net" />
        <link rel="alternate" hrefLang="ar" href="https://cloudtopia.net/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://cloudtopia.net" />

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
              description: 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services worldwide.',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-501-151-11-16',
                contactType: 'customer service',
                email: 'info@cloudtopia.net',
                availableLanguage: ['English', 'Arabic'],
                areaServed: 'Worldwide',
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
              knowsLanguage: ['en', 'ar'],
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
              description: 'Digital & Cloud Technologies — Expert web development, cloud infrastructure, and digital transformation services worldwide.',
              inLanguage: ['en', 'ar'],
              publisher: {
                '@type': 'Organization',
                name: 'CloudTopia',
                url: 'https://cloudtopia.net',
              },
            }),
          }}
        />
      </head>
      <body className={`flex flex-col min-h-screen antialiased ${changa.variable} ${agharaPro.variable}`}>
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
      </body>
    </html>
  )
}
