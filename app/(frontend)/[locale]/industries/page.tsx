import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpLeft, ArrowUpRight, CheckCircle2, ChevronDown, MessageCircle } from 'lucide-react'
import { applySeoOverride } from '@/lib/cms/route-seo'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { IndustriesExperience } from '@/components/industries/IndustriesExperience'
import { IndustriesIndex } from '@/components/industries/IndustriesIndex'
import { buildOrganizationRef } from '@/lib/seo/schema'
import { SearchKeywordsSection } from '@/components/seo/SearchKeywordsSection'
import { getIndustriesPageContent } from '@/lib/seo/industries-page'
import styles from '@/components/industries/industries-page.module.css'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  const content = getIndustriesPageContent(locale)
  const socialImageLocale = content.locale === 'ar' ? 'ar' : 'en'
  const socialImage = `/og/home/${socialImageLocale}.jpg`

  const meta: Metadata = {
    title: content.metadata.title,
    description: content.metadata.description,
    keywords: content.metadata.keywords,
    alternates: {
      canonical: canonicalUrl(locale, '/industries'),
      languages: {
        en: canonicalUrl('en', '/industries'),
        ar: canonicalUrl('ar', '/industries'),
        'x-default': canonicalUrl('en', '/industries'),
      },
    },
    openGraph: {
      title: content.metadata.socialTitle,
      description: content.metadata.description,
      url: canonicalUrl(locale, '/industries'),
      siteName: 'CloudTopia',
      type: 'website',
      images: [{ url: socialImage, width: 1200, height: 630, alt: content.metadata.socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.socialTitle,
      description: content.metadata.description,
      images: [socialImage],
    },
  }

  return applySeoOverride(meta, locale, 'industries')
}

export default async function IndustriesPage({ params }: PageProps) {
  const { locale = 'en' } = await params
  const content = getIndustriesPageContent(locale)
  const isRTL = content.locale === 'ar'
  const DirectionalArrow = isRTL ? ArrowUpLeft : ArrowUpRight
  const pageUrl = canonicalUrl(locale, '/industries')
  const homeName = isRTL ? 'الرئيسية' : 'Home'
  const industriesName = isRTL ? 'القطاعات' : 'Industries'

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#page`,
    name: content.metadata.socialTitle,
    description: content.metadata.description,
    url: pageUrl,
    inLanguage: isRTL ? 'ar' : 'en',
    about: content.industries.map((industry) => ({
      '@type': 'Thing',
      name: industry.name,
      description: industry.description,
    })),
    publisher: buildOrganizationRef(),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: canonicalUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: industriesName, item: pageUrl },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: content.index.title,
    numberOfItems: content.industries.length,
    itemListElement: content.industries.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: industry.name,
      url: canonicalUrl(locale, `/industries/${industry.slug}`),
      description: industry.description,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.slice(0, 5).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div id="industry-main" className={styles.page} dir={isRTL ? 'rtl' : 'ltr'}>
      <JsonLd schema={[collectionSchema, breadcrumbSchema, itemListSchema, faqSchema]} />
      <a className={styles.skipLink} href="#industry-atlas">{isRTL ? 'انتقل إلى أطلس القطاعات' : 'Skip to the industry atlas'}</a>

      <div className={styles.breadcrumbs}>
        <PageBreadcrumbs locale={locale} items={[{ label: industriesName }]} />
      </div>

      <IndustriesExperience content={content} locale={locale} />

      <section id="capability-paths" className={styles.capabilitySection}>
        <div className={styles.sectionInner}>
          <div className={styles.capabilityHeader}>
            <p className={styles.eyebrow}>{content.capability.eyebrow}</p>
            <h2 className={styles.staticTitle}>{content.capability.title}</h2>
            <p className={styles.staticDescription}>{content.capability.description}</p>
          </div>
          <div className={styles.capabilityRows}>
            {content.capabilities.map((row, index) => (
              <article key={row.need} className={styles.capabilityRow}>
                <span className={styles.capabilityNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{row.need}</h3>
                  <p>{row.description}</p>
                </div>
                <div className={styles.capabilityLinks}>
                  {row.services.map((service) => (
                    <Link key={service.href} href={localePath(locale, service.href)} className={styles.capabilityLink}>
                      {service.label}
                      <DirectionalArrow className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <IndustriesIndex content={content} locale={locale} />

      <section className={styles.proofSection}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{content.proofIntro.eyebrow}</p>
          <h2 className={styles.staticTitle}>{content.proofIntro.title}</h2>
          <p className={styles.staticDescription}>{content.proofIntro.description}</p>
          <div className={styles.proofGrid}>
            {content.proof.slice(0, 4).map((item) => (
              <article key={item.title} className={styles.proofItem}>
                <CheckCircle2 className={styles.successIcon} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.sectionInner} ${styles.faqLayout}`}>
          <div>
            <p className={styles.eyebrow}>{content.faqIntro.eyebrow}</p>
            <h2 className={styles.staticTitle}>{content.faqIntro.title}</h2>
            <p className={styles.staticDescription}>{content.faqIntro.description}</p>
          </div>
          <div className={styles.faqList}>
            {content.faqs.slice(0, 5).map((faq, index) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{faq.question}</strong>
                  <ChevronDown className={styles.faqChevron} aria-hidden="true" />
                </summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="industry-consultation" className={styles.ctaSection} data-header-theme="dark">
        <div className={styles.ctaInner}>
          <p className={styles.eyebrowDark}>{content.cta.eyebrow}</p>
          <h2 className={styles.ctaTitle}>{content.cta.title}</h2>
          <p className={styles.ctaDescription}>{content.cta.description}</p>
          <div className={styles.ctaActions}>
            <Link href={`/api/whatsapp?locale=${locale}`} className={styles.ctaPrimary}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {content.cta.primary}
            </Link>
            <Link href={localePath(locale, '/contact')} className={styles.ctaSecondary}>
              {content.cta.secondary}
              <DirectionalArrow className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SearchKeywordsSection path="/industries" locale={locale} />
    </div>
  )
}
