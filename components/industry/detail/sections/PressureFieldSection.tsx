import type { PressureFieldSection as PressureFieldSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function PressureFieldSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<PressureFieldSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.pressureSection}`}
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

      <ol className={styles.pressureList}>
        {section.signals.map((signal, index) => (
          <li key={signal.id} className={styles.pressureItem} data-signal={signal.id}>
            <bdi className={styles.itemNumber} dir="ltr">
              {String(index + 1).padStart(2, '0')}
            </bdi>
            <div>
              <h3 className={styles.itemTitle}>{signal.label}</h3>
              <p className={styles.itemCopy}>{signal.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
