'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import { EducationCount } from './EducationCount'
import type { EducationStatCard } from './education-content'
import styles from './education-industry.module.css'

type EducationHeroProps = {
  locale: Locale
  statCards: readonly EducationStatCard[]
  visualLabel: string
  mockTitle: string
  mockProgressLabel: string
}

/**
 * Learnit hero visual — a CSS-built learning-dashboard mock (no photo asset
 * exists; the template shipped only gray placeholders) with two floating glass
 * stat cards and layered decorative shapes.
 *
 * The two stat cards reproduce Learnit's mouse parallax exactly: on
 * `.paralax__animation` mousemove, every `[data-depth]` element is translated by
 * `translate3d(cursorX * -depth / 4, cursorY * -depth / 4, 0)` (depth 0.03).
 * It is disabled below 781px (matching the template's `> 780` guard) and under
 * prefers-reduced-motion. The stat cards also run counterUp via EducationCount.
 * Continuous shape floats (earth up/down, circle rotate, dots sway) are pure CSS
 * and are neutralised by the reduced-motion kill switch.
 */
export function EducationHero({
  locale,
  statCards,
  visualLabel,
  mockTitle,
  mockProgressLabel,
}: EducationHeroProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-depth]'),
    )
    if (targets.length === 0) return

    let enabled = window.innerWidth > 780

    const onMove = (event: MouseEvent) => {
      if (!enabled) return
      targets.forEach((el) => {
        const depth = Number(el.dataset.depth ?? '0')
        const x = (event.pageX * -depth) / 4
        const y = (event.pageY * -depth) / 4
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      })
    }

    const onResize = () => {
      enabled = window.innerWidth > 780
      if (!enabled) {
        targets.forEach((el) => {
          el.style.transform = ''
        })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className={styles.heroStage} ref={stageRef}>
      <span className={styles.srOnly}>{visualLabel}</span>

      {/* Decorative floating shapes (continuous CSS floats) */}
      <span className={`${styles.heroShape} ${styles.heroShapeEarth}`} aria-hidden="true" />
      <span className={`${styles.heroShape} ${styles.heroShapeCircle}`} aria-hidden="true" />
      <span className={`${styles.heroShape} ${styles.heroShapeDots}`} aria-hidden="true" />

      {/* CSS platform mock (decorative) */}
      <div className={styles.heroMock} aria-hidden="true">
        <div className={styles.heroMockBar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroMockBody}>
          <p className={styles.heroMockTitle}>{mockTitle}</p>
          <div className={styles.heroMockRow}>
            <span className={styles.heroMockThumb} />
            <span className={styles.heroMockLines}>
              <i />
              <i />
            </span>
          </div>
          <div className={styles.heroMockRow}>
            <span className={styles.heroMockThumb} />
            <span className={styles.heroMockLines}>
              <i />
              <i />
            </span>
          </div>
          <div className={styles.heroMockProgress}>
            <span className={styles.heroMockProgressLabel}>{mockProgressLabel}</span>
            <span className={styles.heroMockTrack}>
              <span className={styles.heroMockFill} />
            </span>
          </div>
        </div>
      </div>

      {/* Two floating glass stat cards (parallax + counterUp) */}
      {statCards.slice(0, 2).map((card, index) => (
        <div
          className={`${styles.heroStatCard} ${index === 0 ? styles.heroStatCardOne : styles.heroStatCardTwo}`}
          data-depth="0.03"
          key={card.id}
        >
          <EducationCount
            className={styles.heroStatValue}
            value={card.value}
            suffix={card.suffix}
            locale={locale}
          />
          <p className={styles.heroStatLabel}>{card.label}</p>
        </div>
      ))}
    </div>
  )
}
