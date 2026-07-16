import type { IndustrySceneProps } from './HeroSceneRenderer'
import styles from './industry-scenes.module.css'

function StateLabel({ state }: { state?: string }) {
  if (!state) return null
  const isDiscreteLatinToken = /^[a-z0-9][a-z0-9+./#-]*$/iu.test(state)

  return (
    <span className={styles.stateBadge}>
      {isDiscreteLatinToken ? <bdi dir="ltr">{state}</bdi> : state}
    </span>
  )
}

export function LogisticsFlowScene({
  locale,
  summary,
  stages,
}: IndustrySceneProps) {
  const labels = locale === 'ar'
    ? {
        title: 'مسار الطلب إلى الإثبات',
        branch: 'مسار الاستثناء',
        rejoin: 'مراجعة المالك ثم العودة إلى المسار الرئيسي',
      }
    : {
        title: 'Order-to-proof route',
        branch: 'Exception branch',
        rejoin: 'Owner review, then rejoin the main route',
      }
  const exceptionStage = stages.find((stage) => stage.id === 'exception')
  const routeStages = stages.filter((stage) => stage.id !== 'exception')

  return (
    <figure className={`${styles.scene} ${styles.sceneLogistics}`}>
      <div className={styles.sceneHeading}>
        <p className={styles.sceneKicker}>
          <bdi dir="ltr">02 /</bdi> {labels.title}
        </p>
        <span className={`${styles.routeSignal} ${styles.sceneSignal}`} aria-hidden="true" />
      </div>

      <div className={styles.logisticsGrid}>
        <ol className={`${styles.logisticsRoute} ${styles.sceneLine}`}>
          {routeStages.map((stage) => (
            <li key={stage.id} className={styles.sceneNode} data-stage-id={stage.id}>
              <span>{stage.label}</span>
              <StateLabel state={stage.state} />
            </li>
          ))}
        </ol>

        <aside className={`${styles.exceptionBranch} ${styles.sceneLine}`} aria-label={labels.branch}>
          <p className={`${styles.exceptionLabel} ${styles.sceneSignal}`}>
            {labels.branch}
          </p>
          <p className={styles.exceptionStage}>
            {exceptionStage?.label ?? labels.branch}
          </p>
          <StateLabel state={exceptionStage?.state} />
          <p className={styles.rejoinLabel}>{labels.rejoin}</p>
        </aside>
      </div>

      <figcaption className={styles.sceneCaption}>{summary}</figcaption>
    </figure>
  )
}
