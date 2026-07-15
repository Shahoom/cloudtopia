import type { IndustrySceneProps } from './HeroSceneRenderer'
import styles from './industry-scenes.module.css'

const CONVERGENCE_STAGE_IDS = new Set([
  'booking',
  'visit',
  'follow-up',
  'followup',
])

function StateLabel({ state }: { state?: string }) {
  if (!state) return null
  const isDiscreteLatinToken = /^[a-z0-9][a-z0-9+./#-]*$/iu.test(state)

  return (
    <span className={styles.stateBadge}>
      {isDiscreteLatinToken ? <bdi dir="ltr">{state}</bdi> : state}
    </span>
  )
}

export function HealthcarePulseScene({
  locale,
  summary,
  stages,
}: IndustrySceneProps) {
  const labels = locale === 'ar'
    ? {
        title: 'مسارا الرعاية',
        patient: 'مسار المريض',
        staff: 'مسار الفريق',
        convergence: 'نقطة التقاء',
      }
    : {
        title: 'Care pathways',
        patient: 'Patient lane',
        staff: 'Staff lane',
        convergence: 'Shared care moment',
      }
  const declaredConvergence = stages.filter((stage) =>
    CONVERGENCE_STAGE_IDS.has(stage.id),
  )
  const staffStages = declaredConvergence.length > 0
    ? declaredConvergence
    : stages.slice(Math.max(stages.length - 3, 0))

  return (
    <figure className={`${styles.scene} ${styles.sceneHealthcare}`}>
      <div className={styles.sceneHeading}>
        <p className={styles.sceneKicker}>
          <bdi dir="ltr">01 /</bdi> {labels.title}
        </p>
        <span className={`${styles.pulseSignal} ${styles.sceneSignal}`} aria-hidden="true" />
      </div>

      <div className={styles.healthcareLanes}>
        <div className={styles.lane}>
          <p className={styles.laneLabel}>{labels.patient}</p>
          <ol
            className={`${styles.sceneRoute} ${styles.sceneLine}`}
            aria-label={labels.patient}
          >
            {stages.map((stage) => {
              const converges = CONVERGENCE_STAGE_IDS.has(stage.id)
              return (
                <li
                  key={`patient-${stage.id}`}
                  className={`${styles.sceneNode} ${converges ? styles.convergenceNode : ''}`.trim()}
                  data-stage-id={stage.id}
                >
                  <span>{stage.label}</span>
                  <StateLabel state={stage.state} />
                  {converges ? (
                    <span className={`${styles.convergenceLabel} ${styles.sceneSignal}`}>
                      {labels.convergence}
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>

        <div className={styles.lane}>
          <p className={styles.laneLabel}>{labels.staff}</p>
          <ol
            className={`${styles.sceneRoute} ${styles.sceneLine}`}
            aria-label={labels.staff}
          >
            {staffStages.map((stage) => {
              const converges = CONVERGENCE_STAGE_IDS.has(stage.id)
              return (
                <li
                  key={`staff-${stage.id}`}
                  className={`${styles.sceneNode} ${styles.staffNode}`}
                  data-stage-id={stage.id}
                >
                  <span>{stage.label}</span>
                  <StateLabel state={stage.state} />
                  {converges ? (
                    <span className={`${styles.convergenceLabel} ${styles.sceneSignal}`}>
                      {labels.convergence}
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <figcaption className={styles.sceneCaption}>{summary}</figcaption>
    </figure>
  )
}
