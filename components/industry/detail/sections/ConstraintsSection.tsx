import type { Locale } from '@/lib/i18n/config'
import type { ConstraintsSection as ConstraintsSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

const constraintLabels: Record<Locale, {
  responsibility: string
  dependency: string
  recovery: string
}> = {
  en: {
    responsibility: 'Responsibility',
    dependency: 'Dependency',
    recovery: 'Recovery',
  },
  ar: {
    responsibility: 'المسؤولية',
    dependency: 'الاعتماد',
    recovery: 'مسار المعالجة',
  },
}

export function ConstraintsSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<ConstraintsSectionModel>) {
  const titleId = `${section.id}-title`
  const labels = constraintLabels[locale]

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.constraintsSection}`}
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

      <ol className={styles.constraintList}>
        {section.items.map((item) => (
          <li key={item.id} className={styles.constraintItem} data-constraint={item.id}>
            <h3 className={styles.itemTitle}>{item.label}</h3>
            <dl className={styles.constraintData}>
              <div>
                <dt>{labels.responsibility}</dt>
                <dd>{item.responsibility}</dd>
              </div>
              <div>
                <dt>{labels.dependency}</dt>
                <dd>{item.dependency}</dd>
              </div>
              {item.recovery ? (
                <div>
                  <dt>{labels.recovery}</dt>
                  <dd>{item.recovery}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  )
}
