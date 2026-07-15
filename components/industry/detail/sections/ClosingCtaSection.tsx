import Link from 'next/link'

import { localePath } from '@/lib/i18n/url'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import type { ClosingCtaSection as ClosingCtaSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function ClosingCtaSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<ClosingCtaSectionModel>) {
  const titleId = `${section.id}-title`
  const secondaryHref = localePath(
    locale,
    CANONICAL_SERVICE_TARGETS[section.secondary.serviceId],
  )

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.closingSection}`}
      aria-labelledby={titleId}
      data-section-type={section.type}
      data-section-variant={section.variant}
      data-industry={industrySlug}
      data-locale={locale}
    >
      <header className={styles.sectionHeader}>
        {section.eyebrow ? (
          <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
        ) : null}
        <h2 id={titleId} className={styles.sectionTitle}>{section.title}</h2>
        <p className={styles.sectionIntro}>{section.intro}</p>
      </header>

      <p className={styles.decisionCopy}>{section.decisionCopy}</p>
      <div className={styles.closingActions}>
        <Link
          className={styles.sectionPrimaryAction}
          href={section.primary.href}
          data-cta="primary"
          data-cta-location="closing"
          data-cta-intent="industry-consultation"
          data-industry={industrySlug}
        >
          {section.primary.label}
        </Link>
        <Link
          className={styles.sectionSecondaryAction}
          href={secondaryHref}
          data-cta="secondary"
          data-cta-location="closing"
          data-cta-intent={`service:${section.secondary.serviceId}`}
          data-service={section.secondary.serviceId}
        >
          {section.secondary.label}
        </Link>
      </div>
    </section>
  )
}
