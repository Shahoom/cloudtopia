import type { Metadata } from 'next'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale = 'en' } = await params

  return {
    title: 'CloudTopia Articles',
    description: 'CloudTopia Insights has moved to CloudTopia Articles.',
    alternates: {
      canonical: canonicalUrl(locale, '/articles'),
      languages: buildHreflangMap('/articles'),
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default function InsightsRedirectLayout({ children }: { children: React.ReactNode }) {
  return children
}
