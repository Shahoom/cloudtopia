'use client'

import { useEffect, useRef } from 'react'

import type { Locale } from '@/lib/i18n/config'

type EducationCountProps = {
  value: number
  suffix?: string
  locale: Locale
  className?: string
}

/**
 * Single-number count-up primitive — a React port of Learnit's
 * jQuery.counterUp (delay 20ms, time ~2000ms), fired once when scrolled into
 * view via IntersectionObserver. Reused by the hero stat cards, the about
 * count badge, and the fanfact stats band.
 *
 * SSR-safe: the final integer renders server-side (no hydration mismatch), then
 * the client resets to zero (usually off-screen) and animates up, formatting
 * per locale (Arabic-Indic digits for `ar`). Under prefers-reduced-motion the
 * final value is shown immediately with no animation.
 */
export function EducationCount({ value, suffix, locale, className }: EducationCountProps) {
  const valueRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return

    const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en')
    const write = (n: number) => {
      el.textContent = formatter.format(n)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      write(value)
      return
    }

    write(0)

    let raf: number | null = null
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          obs.unobserve(entry.target)
          const duration = 2000
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            write(Math.round(value * eased))
            if (progress < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [value, locale])

  return (
    <span className={className}>
      <span ref={valueRef}>{String(value)}</span>
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </span>
  )
}
