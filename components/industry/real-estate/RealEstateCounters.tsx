'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import styles from './real-estate-industry.module.css'

type RealEstateStat = {
  id: string
  value: number
  suffix?: string
  label: string
}

type RealEstateCountersProps = {
  stats: readonly RealEstateStat[]
  locale: Locale
}

/**
 * CountUp.js-equivalent counters — mirrors HouseBox's `$('.counter').countUp()`
 * on the About stats. An IntersectionObserver (threshold 0.4) fires the
 * count-up exactly once. Numbers render as plain integers server-side (no
 * hydration mismatch); the client then formats them per locale (Arabic-Indic
 * digits for `ar`) and animates 0 -> value. Under prefers-reduced-motion the
 * final value shows immediately.
 */
export function RealEstateCounters({ stats, locale }: RealEstateCountersProps) {
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
      { threshold: 0.4 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [locale, stats])

  return (
    <div className={styles.counterBoxes} ref={containerRef}>
      {stats.map((stat, index) => (
        <div className={styles.counterBox} key={stat.id}>
          <div className={styles.counterValue}>
            <span
              ref={(el) => {
                valueRefs.current[index] = el
              }}
            >
              {String(stat.value)}
            </span>
            {stat.suffix ? <span data-fixed>{stat.suffix}</span> : null}
          </div>
          <p className={styles.counterLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
