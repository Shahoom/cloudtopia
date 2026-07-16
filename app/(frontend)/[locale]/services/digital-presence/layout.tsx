import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { buildOrganizationRef } from '@/lib/seo/schema'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import { getDigitalPresenceLanding } from '@/lib/services/digital-presence-landing'

const PATH = '/services/digital-presence'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { locale = 'en' } = await params
  const content = getDigitalPresenceLanding(locale)
  const ogLocale = locale === 'ar' ? 'ar' : 'en'
  const images = ogImagesFor({
    page: 'digital-presence',
    locale,
    override: `/og/services/${ogLocale}.jpg`,
  })

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: buildHreflangMap(PATH),
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonicalUrl(locale, PATH),
      siteName: 'CloudTopia',
      type: 'website',
      locale: locale === 'ar' ? 'ar_OM' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_OM'],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: images.map((image) => image.url),
    },
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
}

export default async function DigitalPresenceLayout({ children, params }: LayoutProps) {
  const { locale = 'en' } = await params
  const content = getDigitalPresenceLanding(locale)
  const pageUrl = canonicalUrl(locale, PATH)
  const isArabic = locale === 'ar'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.seo.title,
        description: content.seo.description,
        serviceType: isArabic ? 'خدمات الحضور الرقمي' : 'Digital Presence Services',
        url: pageUrl,
        provider: buildOrganizationRef(),
        areaServed: ['Oman', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain'].map((name) => ({
          '@type': 'Country',
          name,
        })),
        availableLanguage: [
          { '@type': 'Language', name: 'English', alternateName: 'en' },
          { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
        ],
        hasPart: content.services.map((service) => ({
          '@type': 'Service',
          name: service.name,
          description: service.description,
          url: canonicalUrl(locale, service.href),
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: content.seo.title,
        description: content.seo.description,
        url: pageUrl,
        inLanguage: isArabic ? 'ar' : 'en',
        mainEntity: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isArabic ? 'الرئيسية' : 'Home',
            item: canonicalUrl(locale, '/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isArabic ? 'الخدمات' : 'Services',
            item: canonicalUrl(locale, '/services'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isArabic ? 'الحضور الرقمي' : 'Digital Presence',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#service-list`,
        name: isArabic ? 'خدمات الحضور الرقمي' : 'Digital Presence Services',
        numberOfItems: content.services.length,
        itemListElement: content.services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.name,
          url: canonicalUrl(locale, service.href),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  )
}
