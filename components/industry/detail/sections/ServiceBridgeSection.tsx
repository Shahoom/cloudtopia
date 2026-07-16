import Link from 'next/link'

import type { ServiceBridgeSection as ServiceBridgeSectionModel } from '@/lib/industries/types'

import { IndustryRelatedLinks } from '../IndustryRelatedLinks'
import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function ServiceBridgeSection({
  section,
  locale,
  industrySlug,
  primaryCta,
}: IndustryStandardSectionProps<ServiceBridgeSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.serviceBridgeSection}`}
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

      <IndustryRelatedLinks
        locale={locale}
        services={section.serviceAnchors}
        industries={section.industryAnchors}
        className={styles.serviceBridgeLinks}
      />

      <Link
        className={styles.sectionPrimaryAction}
        href={primaryCta.href}
        data-cta="primary"
        data-cta-location="post-system"
        data-cta-intent="industry-consultation"
        data-industry={industrySlug}
      >
        {primaryCta.label}
      </Link>
    </section>
  )
}
