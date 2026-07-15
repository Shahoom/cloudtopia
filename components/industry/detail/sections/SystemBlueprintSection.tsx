import type { Locale } from '@/lib/i18n/config'
import type { SystemBlueprintSection as SystemBlueprintSectionModel } from '@/lib/industries/types'

import type { IndustryStandardSectionProps } from '../IndustrySectionRenderer'
import styles from '../industry-detail.module.css'

const blueprintLabels: Record<Locale, {
  inputs: string
  handoff: string
  outcome: string
}> = {
  en: { inputs: 'Inputs', handoff: 'Handoff', outcome: 'Outcome' },
  ar: { inputs: 'المدخلات', handoff: 'التسليم', outcome: 'النتيجة' },
}

export function SystemBlueprintSection({
  section,
  locale,
  industrySlug,
}: IndustryStandardSectionProps<SystemBlueprintSectionModel>) {
  const titleId = `${section.id}-title`
  const labels = blueprintLabels[locale]

  return (
    <section
      id={section.id}
      className={`${styles.worldSection} ${styles.blueprintSection}`}
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

      <ol className={styles.blueprintList}>
        {section.layers.map((layer, index) => (
          <li key={layer.id} className={styles.blueprintLayer} data-layer={layer.id}>
            <div className={styles.layerHeading}>
              <bdi className={styles.itemNumber} dir="ltr">
                {String(index + 1).padStart(2, '0')}
              </bdi>
              <div>
                <h3 className={styles.itemTitle}>{layer.label}</h3>
                <p className={styles.itemCopy}>{layer.description}</p>
              </div>
            </div>
            <dl className={styles.layerData}>
              <div>
                <dt>{labels.inputs}</dt>
                <dd>
                  <ul className={styles.inputList}>
                    {layer.inputs.map((input) => <li key={input}>{input}</li>)}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>{labels.handoff}</dt>
                <dd>{layer.handoff}</dd>
              </div>
              <div>
                <dt>{labels.outcome}</dt>
                <dd>{layer.outcome}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  )
}
