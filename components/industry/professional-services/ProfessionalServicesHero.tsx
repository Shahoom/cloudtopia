'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './professional-services-industry.module.css'

type HeroSlide = {
  id: string
  keyword: string
  subhead: string
}

type ProfessionalServicesHeroProps = {
  slides: readonly HeroSlide[]
  direction: 'ltr' | 'rtl'
  timebarLabel: string
}

const SLIDE_MS = 5000

/**
 * Signature hero visual — a React recreation of the Showbiz MasterSlider
 * parallax layered hero. Stacked keyword/subhead layers cross-fade in with an
 * easeOutQuint entrance while decorative frame layers and the keyword card
 * drift on scroll (MSScrollParallax at differing depths). A 3px autohide
 * timebar tracks each slide, which auto-advances every 5s and loops.
 *
 * The panel is aria-hidden: it is a decorative, motion-driven restatement of the
 * hero heading/intro that already sit (as real text) in the copy column, so no
 * information is lost to assistive tech or no-JS users.
 *
 * SSR-safe (renders slide 0). Scroll parallax is disabled at <= 991px. Under
 * prefers-reduced-motion the first slide is shown static with the timebar full,
 * no rotation, and no parallax.
 */
export function ProfessionalServicesHero({
  slides,
  direction,
  timebarLabel,
}: ProfessionalServicesHeroProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLSpanElement | null>(null)
  const [index, setIndex] = useState(0)
  const [entered, setEntered] = useState(false)

  // Auto-advance + timebar
  useEffect(() => {
    if (slides.length <= 1) {
      setEntered(true)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true)
      if (barRef.current) barRef.current.style.transform = 'scaleX(1)'
      return
    }

    setEntered(true)
    let raf: number | null = null
    let start = performance.now()

    const loop = (now: number) => {
      const progress = Math.min((now - start) / SLIDE_MS, 1)
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
      if (progress >= 1) {
        start = now
        setIndex((current) => (current + 1) % slides.length)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [slides.length])

  // Scroll parallax (layered depths)
  useEffect(() => {
    const frame = frameRef.current
    const card = cardRef.current
    if (!frame || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xSign = direction === 'rtl' ? -1 : 1
    const ease = 0.09
    let enabled = window.innerWidth > 991
    let rafId: number | null = null
    let targetProgress = 0
    let current = 0

    const stageEl = stageRef.current

    const computeProgress = () => {
      if (!enabled) return 0
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
      const heroHeight = stageEl?.offsetHeight || window.innerHeight || 1
      return Math.min(Math.max(scrollY / heroHeight, 0), 1.2)
    }

    const apply = () => {
      if (!enabled) {
        frame.style.transform = ''
        card.style.transform = ''
        return
      }
      // Depth 30 for the frame, depth 10 for the keyword card.
      frame.style.transform = `translate3d(0, ${(current * 44).toFixed(2)}px, 0)`
      card.style.transform = `translate3d(${(xSign * current * 26).toFixed(2)}px, ${(current * -18).toFixed(2)}px, 0)`
    }

    const animate = () => {
      current += (targetProgress - current) * ease
      apply()
      if (Math.abs(targetProgress - current) > 0.0005) {
        rafId = requestAnimationFrame(animate)
      } else {
        current = targetProgress
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
      if (!enabled) {
        frame.style.transform = ''
        card.style.transform = ''
      }
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
  }, [direction])

  return (
    <div
      className={styles.heroStage}
      ref={stageRef}
      data-entered={entered ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className={styles.heroFrame} ref={frameRef}>
        <span className={styles.heroFrameCorner} data-corner="tl" />
        <span className={styles.heroFrameCorner} data-corner="br" />
      </div>

      <div className={styles.heroCard} ref={cardRef}>
        <div className={styles.heroSlides}>
          {slides.map((slide, slideIndex) => (
            <div
              className={styles.heroSlide}
              key={slide.id}
              data-active={slideIndex === index ? 'true' : 'false'}
            >
              <span className={styles.heroKeyword}>{slide.keyword}</span>
              <span className={styles.heroSubhead}>{slide.subhead}</span>
            </div>
          ))}
        </div>

        <span className={styles.heroDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <div
          className={styles.heroTimebar}
          role="progressbar"
          aria-label={timebarLabel}
          aria-valuemin={1}
          aria-valuemax={slides.length}
          aria-valuenow={index + 1}
        >
          <span className={styles.heroTimebarFill} ref={barRef} />
        </div>
      </div>
    </div>
  )
}
