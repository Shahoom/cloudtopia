'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import styles from './construction-industry.module.css'

type ConstructionStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type ConstructionSkill = {
  id: string
  label: string
  value: number
}

type ConstructionValueMetricsProps = {
  locale: Locale
  stats: readonly ConstructionStat[]
  statsNote: string
  skills: readonly ConstructionSkill[]
  skillsLabel: string
  skillsNote: string
}

/**
 * "Our Value" band — a faithful React port of the template's CounterUp + Waypoints
 * stat boxes paired with striped, animated skill progress bars.
 *
 *  - Counters: an IntersectionObserver fires the count-up once (0 -> value, eased),
 *    formatted per locale (Arabic-Indic digits for `ar`). Numbers render as plain
 *    integers server-side (no hydration mismatch).
 *  - Skill bars: widths animate from 0 to their value once the band scrolls into
 *    view, mirroring the template's `progress_bar_width()` reading aria-valuenow.
 *
 * Under prefers-reduced-motion, final values are shown immediately with no motion.
 */
export function ConstructionValueMetrics({
  locale,
  stats,
  statsNote,
  skills,
  skillsLabel,
  skillsNote,
}: ConstructionValueMetricsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([])
  const barRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en')
    const writeStat = (index: number, value: number) => {
      const el = valueRefs.current[index]
      if (el) el.textContent = formatter.format(value)
    }
    const fillBars = () => {
      skills.forEach((skill, index) => {
        const bar = barRefs.current[index]
        if (bar) bar.style.width = `${skill.value}%`
      })
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      stats.forEach((stat, index) => writeStat(index, stat.value))
      fillBars()
      return
    }

    // Reset to the animation start state (band is usually off-screen at mount).
    stats.forEach((_, index) => writeStat(index, 0))
    skills.forEach((_, index) => {
      const bar = barRefs.current[index]
      if (bar) bar.style.width = '0%'
    })

    let raf: number | null = null
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          obs.unobserve(entry.target)
          fillBars()
          const duration = 1600
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            stats.forEach((stat, index) => writeStat(index, Math.round(stat.value * eased)))
            if (progress < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [locale, stats, skills])

  return (
    <div className={styles.valueMetrics} ref={rootRef}>
      <div className={styles.statBoxes}>
        {stats.map((stat, index) => (
          <div className={styles.statBox} key={stat.id}>
            <div className={styles.statBoxValue}>
              <span
                ref={(el) => {
                  valueRefs.current[index] = el
                }}
              >
                {String(stat.value)}
              </span>
              {stat.suffix ? <span className={styles.statBoxSuffix}>{stat.suffix}</span> : null}
            </div>
            <p className={styles.statBoxLabel}>{stat.label}</p>
          </div>
        ))}
        <p className={styles.statBoxesNote}>{statsNote}</p>
      </div>

      <div className={styles.skills}>
        <p className={styles.skillsLabel}>{skillsLabel}</p>
        <ul className={styles.skillsList}>
          {skills.map((skill, index) => (
            <li className={styles.skillRow} key={skill.id}>
              <div className={styles.skillHead}>
                <span className={styles.skillName}>{skill.label}</span>
                <span className={styles.skillValue}>{skill.value}%</span>
              </div>
              <span
                className={styles.skillTrack}
                role="progressbar"
                aria-valuenow={skill.value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={skill.label}
              >
                <span
                  className={styles.skillFill}
                  ref={(el) => {
                    barRefs.current[index] = el
                  }}
                  style={{ width: `${skill.value}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.skillsNote}>{skillsNote}</p>
      </div>
    </div>
  )
}
