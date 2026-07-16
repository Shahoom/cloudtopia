import type { Locale } from '@/lib/i18n/config'
import type { UseCaseSequenceSection as UseCaseSequenceSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

const ownerLabels: Record<Locale, string> = {
  en: 'Owner',
  ar: 'المسؤول',
}

export function UseCaseSequenceSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<UseCaseSequenceSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.sequenceSection}`}
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

      <ol className={styles.sequenceList}>
        {section.steps.map((step, index) => (
          <li key={step.id} className={styles.sequenceStep} data-step={step.id}>
            <bdi className={styles.sequenceNumber} dir="ltr">
              {String(index + 1).padStart(2, '0')}
            </bdi>
            <div>
              <h3 className={styles.itemTitle}>{step.label}</h3>
              <p className={styles.itemCopy}>{step.description}</p>
              {step.owner ? (
                <p className={styles.itemMeta}>
                  <span>{ownerLabels[locale]}</span>
                  <span>{step.owner}</span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
