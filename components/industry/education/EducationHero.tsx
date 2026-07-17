'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import { EducationCount } from './EducationCount'
import type { EducationStatCard } from './education-content'
import styles from './education-industry.module.css'

type EducationHeroProps = {
  locale: Locale
  statCards: readonly EducationStatCard[]
  photoAlt: string
}

/**
 * Learnit hero visual — a licensed stock photograph of an educator at a laptop
 * in the template's rounded, shadowed frame, with two floating glass stat cards and
 * layered decorative shapes. (The Learnit package shipped gray dimension
 * placeholders here; the photo replaces the CSS dashboard mock that stood in for
 * them. The product-UI mock now lives once, in the platform-preview band.)
 *
 * The photo is this page's LCP element, so it alone carries `priority`. No text
 * is rendered over it except the two glass stat cards, whose 88%-white surface
 * keeps their ink above AA — see the contrast note on `.heroStatCard` in the
 * stylesheet. This frame gets the chalkboard shot specifically because its
 * subject is centred with background in both top corners, so the top stat card
 * lands on the chalkboard in LTR *and* in RTL, where `inset-inline` mirrors it
 * to the opposite corner. Swapping in a photo with an off-centre subject will
 * put a card over somebody's face in one of the two directions.
 *
 * The two stat cards reproduce Learnit's mouse parallax exactly: on
 * `.paralax__animation` mousemove, every `[data-depth]` element is translated by
 * `translate3d(cursorX * -depth / 4, cursorY * -depth / 4, 0)` (depth 0.03).
 * It is disabled below 781px (matching the template's `> 780` guard) and under
 * prefers-reduced-motion. The stat cards also run counterUp via EducationCount.
 * Continuous shape floats (earth up/down, circle rotate, dots sway) are pure CSS
 * and are neutralised by the reduced-motion kill switch.
 */
export function EducationHero({ locale, statCards, photoAlt }: EducationHeroProps) {
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
      {/* Decorative floating shapes (continuous CSS floats) */}
      <span className={`${styles.heroShape} ${styles.heroShapeEarth}`} aria-hidden="true" />
      <span className={`${styles.heroShape} ${styles.heroShapeCircle}`} aria-hidden="true" />
      <span className={`${styles.heroShape} ${styles.heroShapeDots}`} aria-hidden="true" />

      {/* Licensed stock photograph — the LCP image for this page. */}
      <div className={styles.heroPhoto}>
        <Image
          className={styles.heroPhotoImg}
          src="/images/industries/education/education-4.jpg"
          alt={photoAlt}
          width={1800}
          height={1013}
          sizes="(max-width: 991px) 360px, 420px"
          priority
        />
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
