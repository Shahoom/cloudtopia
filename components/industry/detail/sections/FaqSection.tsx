import type { FaqSection as FaqSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function FaqSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<FaqSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.faqSection}`}
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

      <dl className={styles.faqList}>
        {section.items.map((item) => (
          <div key={item.id} className={styles.faqItem} data-question={item.id}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
