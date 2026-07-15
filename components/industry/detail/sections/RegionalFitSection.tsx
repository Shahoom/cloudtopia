import type { RegionalFitSection as RegionalFitSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function RegionalFitSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<RegionalFitSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.regionalSection}`}
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

      <ul className={styles.regionalList}>
        {section.items.map((item) => (
          <li key={item.id} className={styles.regionalItem} data-regional-item={item.id}>
            <h3 className={styles.itemTitle}>{item.label}</h3>
            <p className={styles.itemCopy}>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
