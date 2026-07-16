import Link from 'next/link'
import { ArrowUpLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import type { IndustriesPageContent } from '@/lib/seo/industries-page'
import styles from './industries-page.module.css'

type IndustriesIndexProps = {
  content: IndustriesPageContent
  locale: string
}

export function IndustriesIndex({ content, locale }: IndustriesIndexProps) {
  const { industries } = content
  const DirectionalArrow = content.locale === 'ar' ? ArrowUpLeft : ArrowUpRight

  return (
    <section id="all-industries" className={styles.indexSection} data-header-theme="light">
      <div className={styles.indexInner}>
        <div className={styles.sectionLeadDark}>
          <div>
            <p className={styles.eyebrowDark}>{content.index.eyebrow}</p>
            <h2 className={styles.sectionTitleDark}>{content.index.title}</h2>
          </div>
          <p className={styles.sectionDescriptionDark}>{content.index.description}</p>
        </div>

        <div className={styles.industryDirectory}>
          {industries.map((industry, index) => (
            <article key={industry.slug} className={styles.directoryItem}>
              <details>
                <summary className={styles.directoryHeading}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{industry.workflow}</p>
                    <h3>{industry.name}</h3>
                  </div>
                  <ChevronDown className={styles.directoryChevron} aria-hidden="true" />
                </summary>
                <div className={styles.directoryBody}>
                  <p className={styles.directoryDescription}>{industry.description}</p>
                  <div className={styles.directoryFooter}>
                    <div className={styles.directoryServices}>
                      {industry.serviceLinks.slice(0, 2).map((service) => (
                        <Link key={service.href} href={localePath(locale, service.href)}>{service.label}</Link>
                      ))}
                    </div>
                    <Link
                      href={localePath(locale, `/industries/${industry.slug}`)}
                      className={styles.directoryLink}
                      aria-label={`${content.index.exploreLabel} — ${industry.name}`}
                    >
                      {content.index.exploreLabel}
                      <DirectionalArrow className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
