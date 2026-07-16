import type { JourneyMapSection as JourneyMapSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

export function JourneyMapSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<JourneyMapSectionModel>) {
  const titleId = `${section.id}-title`

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.journeySection}`}
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

      <ol className={styles.journeyList}>
        {section.stages.map((stage, index) => (
          <li
            key={stage.id}
            id={`${section.id}-${stage.id}`}
            className={styles.journeyStage}
            data-stage={stage.id}
          >
            <bdi className={styles.itemNumber} dir="ltr">
              {String(index + 1).padStart(2, '0')}
            </bdi>
            <div>
              <h3 className={styles.itemTitle}>{stage.label}</h3>
              <p className={styles.itemCopy}>{stage.description}</p>
              {stage.actor ? (
                <p className={styles.itemMeta}>{stage.actor}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {section.lanes && section.lanes.length > 0 ? (
        <div className={styles.journeyLanes}>
          {section.lanes.map((lane) => {
            const laneStageIds = new Set(lane.stageIds)
            return (
              <section
                key={lane.id}
                className={styles.journeyLane}
                aria-labelledby={`${section.id}-${lane.id}-title`}
                data-lane={lane.id}
              >
                <h3 id={`${section.id}-${lane.id}-title`} className={styles.laneTitle}>
                  {lane.label}
                </h3>
                <ul className={styles.laneStages}>
                  {section.stages
                    .filter((stage) => laneStageIds.has(stage.id))
                    .map((stage) => (
                      <li key={stage.id}>
                        <a href={`#${section.id}-${stage.id}`}>{stage.label}</a>
                      </li>
                    ))}
                </ul>
              </section>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
