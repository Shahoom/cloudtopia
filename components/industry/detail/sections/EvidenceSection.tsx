import type {
  AnnotatedModelEvidenceSection,
  VerifiedProjectEvidenceSection,
} from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

function assertNeverEvidence(section: never): never {
  throw new Error(`Unsupported evidence variant: ${JSON.stringify(section)}`)
}

type RenderableEvidenceSection =
  | AnnotatedModelEvidenceSection
  | (VerifiedProjectEvidenceSection & { approval: 'approved' })

export function EvidenceSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<RenderableEvidenceSection>) {
  switch (section.variant) {
    case 'verified-project': {
      const titleId = `${section.id}-title`
      return (
        <section
          id={section.id}
          className={`${styles.worldSection} ${styles.evidenceSection}`}
          aria-labelledby={titleId}
          data-section-type={section.type}
          data-section-variant={section.variant}
          data-industry={industrySlug}
          data-locale={locale}
        >
          <header className={styles.sectionHeader}>
            <h2 id={titleId} className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionIntro}>{section.intro}</p>
          </header>
          <ul className={styles.evidenceFacts}>
            <li data-evidence-field="project-id"><bdi dir="ltr">{section.projectId}</bdi></li>
            <li data-evidence-field="approval"><bdi dir="ltr">{section.approval}</bdi></li>
            <li data-evidence-field="provenance">{section.provenance}</li>
          </ul>
        </section>
      )
    }
    case 'annotated-model': {
      const titleId = `${section.id}-title`
      return (
        <section
          id={section.id}
          className={`${styles.worldSection} ${styles.evidenceSection}`}
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
          <ol className={styles.observationList}>
            {section.observations.map((observation) => (
              <li key={observation.id} className={styles.observationItem}>
                <h3 className={styles.itemTitle}>{observation.label}</h3>
                <p className={styles.itemCopy}>{observation.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )
    }
    default:
      return assertNeverEvidence(section)
  }
}
