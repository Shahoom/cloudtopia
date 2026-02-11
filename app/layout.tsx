import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

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
    'CloudTopia'
  ],
  authors: [{ name: 'CloudTopia', url: 'https://cloudtopia.net' }],
  creator: 'CloudTopia',
  publisher: 'CloudTopia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloudtopia.net',
    title: 'CloudTopia — Digital & Cloud Technologies',
    description: 'Transform your business with cutting-edge digital and cloud solutions. Serving clients worldwide.',
    siteName: 'CloudTopia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudTopia — Digital & Cloud Technologies',
    description: 'Transform your business with cutting-edge digital and cloud solutions.',
    creator: '@cloudtopia',
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
    canonical: 'https://cloudtopia.net',
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col min-h-screen antialiased font-['Changa',sans-serif]">
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

