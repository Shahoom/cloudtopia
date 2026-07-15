import Link from 'next/link'

import type { Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import type { IndustrySlug } from '@/lib/industries/slugs'
import type { IndustrySceneId, LocalizedHero } from '@/lib/industries/types'

import { HeroSceneRenderer } from './scenes/HeroSceneRenderer'
import styles from './industry-detail.module.css'

export type IndustryHeroProps = {
  locale: Locale
  slug: IndustrySlug
  hero: LocalizedHero
  sceneId: IndustrySceneId
  headerTheme: 'light' | 'dark'
}

export function IndustryHero({
  locale,
  slug,
  hero,
  sceneId,
  headerTheme,
}: IndustryHeroProps) {
  const secondaryHref = localePath(
    locale,
    CANONICAL_SERVICE_TARGETS[hero.secondaryCta.serviceId],
  )

  return (
    <section
      className={styles.hero}
      aria-labelledby="industry-world-title"
      data-header-theme={headerTheme}
      data-section="hero"
      data-scene={sceneId}
    >
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.worldLabel}>{hero.worldLabel}</p>
          <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
          <h1 id="industry-world-title" className={styles.heroTitle}>
            {hero.h1}
          </h1>
          <p className={styles.heroIntro}>{hero.intro}</p>

          <div
            className={styles.heroActions}
            role="group"
            aria-label={locale === 'ar' ? 'خطوات المتابعة' : 'Next steps'}
          >
            <Link
              className={styles.primaryAction}
              href={hero.primaryCta.href}
              data-cta="primary"
              data-cta-location="hero"
              data-industry={slug}
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              className={styles.secondaryAction}
              href={secondaryHref}
              data-cta="secondary"
              data-cta-location="hero"
              data-service={hero.secondaryCta.serviceId}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className={styles.heroScene}>
          <HeroSceneRenderer
            sceneId={sceneId}
            locale={locale}
            summary={hero.sceneSummary}
            stages={hero.sceneStages}
          />
        </div>
      </div>
    </section>
  )
}
