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

export function RestaurantPassScene({
  locale,
  summary,
  stages,
}: IndustrySceneProps) {
  const labels = locale === 'ar'
    ? {
        title: 'تسلسل تمرير الخدمة',
        actors: [
          'الضيف',
          'الضيف / فريق الاستقبال',
          'فريق الاستقبال',
          'المطبخ',
          'فريق الاستقبال',
          'عودة الضيف / الولاء',
          'فريق التشغيل / تعلّم الفرع',
        ],
      }
    : {
        title: 'Service-pass sequence',
        actors: [
          'Guest',
          'Guest / front of house',
          'Front of house',
          'Kitchen',
          'Front of house',
          'Guest return / loyalty',
          'Operations team / branch learning',
        ],
      }

  return (
    <figure className={`${styles.scene} ${styles.sceneRestaurant}`}>
      <div className={styles.sceneHeading}>
        <p className={styles.sceneKicker}>
          <bdi dir="ltr">03 /</bdi> {labels.title}
        </p>
        <span className={`${styles.passSignal} ${styles.sceneSignal}`} aria-hidden="true" />
      </div>

      <ol className={`${styles.restaurantPass} ${styles.sceneLine}`}>
        {stages.map((stage, index) => (
          <li key={stage.id} className={styles.sceneNode} data-stage-id={stage.id}>
            <span className={styles.actorLabel}>
              {labels.actors[Math.min(index, labels.actors.length - 1)]}
            </span>
            <span className={styles.restaurantStage}>{stage.label}</span>
            <StateLabel state={stage.state} />
          </li>
        ))}
      </ol>

      <figcaption className={styles.sceneCaption}>{summary}</figcaption>
    </figure>
  )
}
