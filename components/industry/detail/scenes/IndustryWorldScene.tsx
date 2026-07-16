import type { IndustrySceneId } from '@/lib/industries/types'

import type { IndustrySceneProps } from './HeroSceneRenderer'
import styles from './industry-scenes.module.css'

export type PresetIndustrySceneId = Exclude<
  IndustrySceneId,
  'healthcare-pulse' | 'logistics-flow' | 'restaurant-pass'
>

type ScenePreset = {
  number: string
  title: { en: string; ar: string }
}

const SCENE_PRESETS = {
  'fintech-ledger': {
    number: '04',
    title: { en: 'Controlled trust ledger', ar: 'سجل الثقة المنضبط' },
  },
  'ecommerce-catalog': {
    number: '05',
    title: { en: 'Catalog-to-customer flow', ar: 'مسار الكتالوج إلى العميل' },
  },
  'real-estate-registry': {
    number: '06',
    title: { en: 'Property registry', ar: 'السجل العقاري' },
  },
  'education-constellation': {
    number: '07',
    title: { en: 'Learning constellation', ar: 'كوكبة التعلّم' },
  },
  'travel-itinerary': {
    number: '08',
    title: { en: 'Guest itinerary', ar: 'مسار رحلة الضيف' },
  },
  'legal-docket': {
    number: '09',
    title: { en: 'Confidential case docket', ar: 'سجل القضية السري' },
  },
  'construction-sequence': {
    number: '10',
    title: { en: 'Project decision sequence', ar: 'تسلسل قرارات المشروع' },
  },
  'retail-pulse': {
    number: '11',
    title: { en: 'Connected store plan', ar: 'مخطط المتجر المتصل' },
  },
  'expertise-architecture': {
    number: '12',
    title: { en: 'Expertise architecture', ar: 'هندسة الخبرة' },
  },
  'public-service-standard': {
    number: '13',
    title: { en: 'Public service pathway', ar: 'مسار الخدمة العامة' },
  },
} as const satisfies Record<PresetIndustrySceneId, ScenePreset>

function StateLabel({ state }: { state?: string }) {
  if (!state) return null
  const isDiscreteLatinToken = /^[a-z0-9][a-z0-9+./#-]*$/iu.test(state)

  return (
    <span className={styles.stateBadge}>
      {isDiscreteLatinToken ? <bdi dir="ltr">{state}</bdi> : state}
    </span>
  )
}

export type IndustryWorldSceneProps = IndustrySceneProps & {
  sceneId: PresetIndustrySceneId
}

export function IndustryWorldScene({
  sceneId,
  locale,
  summary,
  stages,
}: IndustryWorldSceneProps) {
  const preset = SCENE_PRESETS[sceneId]

  return (
    <figure
      className={`${styles.scene} ${styles.sceneWorld}`}
      data-variant={sceneId}
    >
      <div className={styles.sceneHeading}>
        <p className={styles.sceneKicker}>
          <bdi dir="ltr">{preset.number} /</bdi> {preset.title[locale]}
        </p>
        <span
          className={`${styles.worldGlyph} ${styles.sceneSignal}`}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className={styles.worldDiagram}>
        <span className={styles.worldAxis} aria-hidden="true" />
        <ol
          className={`${styles.worldStages} ${styles.sceneLine}`}
          aria-label={preset.title[locale]}
        >
          {stages.map((stage, index) => (
            <li
              key={stage.id}
              className={styles.worldStage}
              data-stage-id={stage.id}
            >
              <span className={styles.worldOrdinal} aria-hidden="true">
                <bdi dir="ltr">{String(index + 1).padStart(2, '0')}</bdi>
              </span>
              <span className={styles.worldStageCopy}>
                <span className={styles.worldStageLabel}>{stage.label}</span>
                <StateLabel state={stage.state} />
              </span>
            </li>
          ))}
        </ol>
        <span className={styles.worldTerminal} aria-hidden="true" />
      </div>

      <figcaption className={styles.sceneCaption}>{summary}</figcaption>
    </figure>
  )
}
