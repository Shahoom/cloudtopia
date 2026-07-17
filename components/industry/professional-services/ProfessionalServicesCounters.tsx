'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import styles from './professional-services-industry.module.css'

type ProServStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type ProfessionalServicesCountersProps = {
  stats: readonly ProServStat[]
  locale: Locale
  caption: string
  note: string
}

/**
 * Achievement stat band — a React reproduction of the Showbiz count-up. An
 * IntersectionObserver (threshold 0.3) fires the count-up exactly once. Numbers
 * render as plain integers server-side (no hydration mismatch), then the client
 * formats them per locale (Arabic-Indic digits for `ar`) and animates 0 ->
 * value. Under prefers-reduced-motion the final value is shown immediately.
 */
export function ProfessionalServicesCounters({
  stats,
  locale,
  caption,
  note,
}: ProfessionalServicesCountersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([])

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
          const duration = 1500
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
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div className={styles.statTile} key={stat.id}>
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
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
      <p className={styles.statsNote}>{note}</p>
    </div>
  )
}
