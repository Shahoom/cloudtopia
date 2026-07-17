'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import styles from './professional-services-industry.module.css'

type ProServPieMetric = {
  id: string
  value: number
  title: string
  subtitle: string
}

type ProfessionalServicesPieMetricsProps = {
  metrics: readonly ProServPieMetric[]
  locale: Locale
  regionLabel: string
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** easeOutBounce — the exact easing the Showbiz easyPieChart cards use. */
function easeOutBounce(t: number): number {
  const n1 = 7.5625
  const d1 = 2.75
  if (t < 1 / d1) return n1 * t * t
  if (t < 2 / d1) {
    const u = t - 1.5 / d1
    return n1 * u * u + 0.75
  }
  if (t < 2.5 / d1) {
    const u = t - 2.25 / d1
    return n1 * u * u + 0.9375
  }
  const u = t - 2.625 / d1
  return n1 * u * u + 0.984375
}

/**
 * "Share Holder" capability cards — a React recreation of the Showbiz
 * easyPieChart. An SVG ring and its percentage count up together with
 * easeOutBounce easing, fired once when the group scrolls into view
 * (IntersectionObserver). The percentage renders as a plain integer server-side
 * (no hydration mismatch) and is formatted per locale on the client.
 *
 * Under prefers-reduced-motion the final ring and value are shown immediately.
 */
export function ProfessionalServicesPieMetrics({
  metrics,
  locale,
  regionLabel,
}: ProfessionalServicesPieMetricsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRefs = useRef<Array<HTMLSpanElement | null>>([])
  const ringRefs = useRef<Array<SVGCircleElement | null>>([])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en')

    const write = (i: number, percent: number) => {
      const text = textRefs.current[i]
      const ring = ringRefs.current[i]
      if (text) text.textContent = formatter.format(Math.round(percent))
      if (ring) {
        ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - percent / 100))
      }
    }

    const showFinal = () => metrics.forEach((metric, i) => write(i, metric.value))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showFinal()
      return
    }

    metrics.forEach((_, i) => write(i, 0))

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
            const eased = easeOutBounce(progress)
            metrics.forEach((metric, i) => write(i, metric.value * eased))
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
  }, [locale, metrics])

  return (
    <div className={styles.pieGrid} ref={containerRef} aria-label={regionLabel}>
      {metrics.map((metric, i) => (
        <div className={styles.pieCard} key={metric.id}>
          <div className={styles.pieChart}>
            <svg viewBox="0 0 120 120" role="img" aria-label={`${metric.title}: ${metric.value}%`}>
              <circle className={styles.pieTrack} cx="60" cy="60" r={RADIUS} />
              <circle
                className={styles.pieProgress}
                cx="60"
                cy="60"
                r={RADIUS}
                ref={(el) => {
                  ringRefs.current[i] = el
                }}
                style={{
                  strokeDasharray: CIRCUMFERENCE,
                  strokeDashoffset: CIRCUMFERENCE * (1 - metric.value / 100),
                }}
              />
            </svg>
            <span className={styles.pieValue} aria-hidden="true">
              <span
                ref={(el) => {
                  textRefs.current[i] = el
                }}
              >
                {String(metric.value)}
              </span>
              <i>%</i>
            </span>
          </div>
          <h3>{metric.title}</h3>
          <p>{metric.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
