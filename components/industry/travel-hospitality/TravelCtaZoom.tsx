'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import styles from './travel-hospitality-industry.module.css'

type TravelCtaZoomProps = {
  children: ReactNode
}

/**
 * CTA scroll-zoom — the closing consultation band eases (factor 0.1) from
 * scale 1.08 to 1.0 as its centre approaches the viewport centre, echoing the
 * template's decorative CTA motion. Disabled at <= 991px and under
 * prefers-reduced-motion.
 */
export function TravelCtaZoom({ children }: TravelCtaZoomProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const startScale = 1.08
    const ease = 0.1
    let enabled = window.innerWidth > 991
    let rafId: number | null = null
    let targetProgress = 0
    let currentProgress = 0

    const computeProgress = () => {
      if (!enabled) return 1
      const rect = card.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const elCenter = rect.top + rect.height / 2
      const dist = elCenter - vh / 2
      let p = 1 - dist / (vh / 2)
      if (p < 0) p = 0
      if (p > 1) p = 1
      return p
    }

    const apply = () => {
      if (!enabled) {
        card.style.transform = ''
        return
      }
      const inv = 1 - currentProgress
      const scale = 1 + (startScale - 1) * inv
      card.style.transform = `scale(${scale.toFixed(4)})`
    }

    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * ease
      apply()
      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        rafId = requestAnimationFrame(animate)
      } else {
        currentProgress = targetProgress
        apply()
        rafId = null
      }
    }

    const kick = () => {
      targetProgress = computeProgress()
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      kick()
    }

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', onResize)
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={styles.ctaScrollWrap}>
      <div className={styles.ctaCard} ref={cardRef}>
        {children}
      </div>
    </div>
  )
}
