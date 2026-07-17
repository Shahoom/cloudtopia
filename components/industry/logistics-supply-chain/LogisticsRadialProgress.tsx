'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'
import styles from './logistics-supply-chain-industry.module.css'

type LogisticsRadial = {
  id: string
  percent: number
  label: string
}

type LogisticsRadialProgressProps = {
  radials: readonly LogisticsRadial[]
  locale: Locale
  caption: string
  note: string
}

const RADIUS = 52
const CIRC = 2 * Math.PI * RADIUS

/**
 * SVG radial-progress dials — a React port of the Logistick
 * animated-radial-progress signature (stroke-dashoffset fills to
 * data-percentage). An IntersectionObserver (threshold 0.4) triggers the fill
 * and a synchronized count-up once. Under prefers-reduced-motion the dials snap
 * to their final value.
 *
 * The dials are explicitly labeled (in content) as illustrative operator
 * targets, never a CloudTopia performance guarantee.
 */
export function LogisticsRadialProgress({
  radials,
  locale,
  caption,
  note,
}: LogisticsRadialProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const circleRefs = useRef<Array<SVGCircleElement | null>>([])
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en')
    const setDial = (index: number, percent: number) => {
      const circle = circleRefs.current[index]
      const number = numberRefs.current[index]
      const offset = CIRC * (1 - percent / 100)
      if (circle) circle.style.strokeDashoffset = String(offset)
      if (number) number.textContent = formatter.format(Math.round(percent))
    }

    const showFinal = () => radials.forEach((radial, index) => setDial(index, radial.percent))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showFinal()
      return
    }

    radials.forEach((_, index) => setDial(index, 0))

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
            radials.forEach((radial, index) => setDial(index, radial.percent * eased))
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
  }, [locale, radials])

  return (
    <div className={styles.radialBand} ref={containerRef}>
      <p className={styles.radialCaption}>{caption}</p>
      <div className={styles.radialGrid}>
        {radials.map((radial, index) => (
          <div className={styles.radialItem} key={radial.id}>
            <div className={styles.radialDial}>
              <svg viewBox="0 0 120 120" role="img" aria-label={`${radial.label}: ${radial.percent}%`}>
                <circle className={styles.radialTrack} cx="60" cy="60" r={RADIUS} />
                <circle
                  className={styles.radialFill}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  ref={(el) => {
                    circleRefs.current[index] = el
                  }}
                  style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }}
                />
              </svg>
              <span className={styles.radialNumber} aria-hidden="true">
                <span
                  ref={(el) => {
                    numberRefs.current[index] = el
                  }}
                >
                  {radial.percent}
                </span>
                <span className={styles.radialUnit}>%</span>
              </span>
            </div>
            <p className={styles.radialLabel}>{radial.label}</p>
          </div>
        ))}
      </div>
      <p className={styles.radialNote}>{note}</p>
    </div>
  )
}
