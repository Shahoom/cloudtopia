'use client'

import { useEffect, useRef, useState } from 'react'

import type { Locale } from '@/lib/i18n/config'
import type { TravelStat } from './travel-hospitality-content'
import styles from './travel-hospitality-industry.module.css'

type TravelStatsRingsProps = {
  stats: readonly TravelStat[]
  locale: Locale
  caption: string
  note: string
  regionLabel: string
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Animated capability stats band — a licence-clean re-creation of the template's
 * easyPieChart rings + jquery.countTo numerals. An IntersectionObserver
 * (threshold 0.3) fires once when the band scrolls into view: each SVG ring
 * sweeps to its target percentage (CSS transition on stroke-dashoffset) while the
 * integer in its centre counts up from 0 (eased rAF).
 *
 * SSR-safe: numbers render as plain integers server-side, then the client
 * formats them per locale (Arabic-Indic digits for `ar`). Under
 * prefers-reduced-motion the rings and final values appear immediately.
 */
export function TravelStatsRings({
  stats,
  locale,
  caption,
  note,
  regionLabel,
}: TravelStatsRingsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en')
    const write = (index: number, value: number) => {
      const el = valueRefs.current[index]
      if (el) el.textContent = formatter.format(value)
    }
    const showFinal = () => stats.forEach((stat, index) => write(index, stat.value))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      showFinal()
      return
    }

    stats.forEach((_, index) => write(index, 0))

    let raf: number | null = null
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          obs.unobserve(entry.target)
          setActive(true)
          const duration = 1600
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            stats.forEach((stat, index) => write(index, Math.round(stat.value * eased)))
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
  }, [locale, stats])

  return (
    <div className={styles.statsBand} ref={containerRef}>
      <p className={styles.statsCaption}>{caption}</p>
      <ul className={styles.statsGrid} aria-label={regionLabel}>
        {stats.map((stat, index) => {
          const offset = CIRCUMFERENCE * (1 - stat.ring / 100)
          return (
            <li className={styles.statTile} key={stat.id} data-ring={(index % 4) + 1}>
              <div className={styles.statRing}>
                <svg viewBox="0 0 120 120" className={styles.statRingSvg} aria-hidden="true">
                  <circle
                    className={styles.statRingTrack}
                    cx="60"
                    cy="60"
                    r={RADIUS}
                  />
                  <circle
                    className={styles.statRingBar}
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    style={{
                      strokeDasharray: CIRCUMFERENCE,
                      strokeDashoffset: active ? offset : CIRCUMFERENCE,
                    }}
                  />
                </svg>
                <div className={styles.statValue}>
                  <span
                    ref={(el) => {
                      valueRefs.current[index] = el
                    }}
                  >
                    {String(stat.value)}
                  </span>
                  {stat.suffix ? <span data-fixed>{stat.suffix}</span> : null}
                </div>
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </li>
          )
        })}
      </ul>
      <p className={styles.statsNote}>{note}</p>
    </div>
  )
}
