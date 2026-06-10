import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Cairo } from 'next/font/google'
import { AIChatbotLazy as AIChatbot } from '@/components/ai-chatbot/AIChatbotLazy'
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
  themeColor: '#0284c7',
}

export default async function CountryLandingRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-locale') ?? 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
      <body className="min-h-screen antialiased font-['Changa',sans-serif]">
        {children}
        <AIChatbot />
      </body>
    </html>
  )
}
