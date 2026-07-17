'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import styles from './fintech-industry.module.css'

type FintechHeroParallaxProps = {
  /**
   * The three cluster cards. These are server-rendered mock components handed
   * in as nodes — this wrapper only positions and animates them, so none of
   * their markup is pulled into the client bundle.
   */
  large: ReactNode
  small1: ReactNode
  small2: ReactNode
  direction: 'ltr' | 'rtl'
}

/**
 * Hero layered-thumbnail scroll parallax — a faithful React port of Paynext's
 * bespoke rAF `heroParallax()`:
 *   ease 0.08, progress = clamp(scrollY / heroHeight, 0, 1.2)
 *   left card  → translate(-progress*180, -progress*260) rotate(-progress*8deg)
 *   right card → translate(+progress*180, -progress*260) rotate(+progress*8deg)
 * Disabled at <= 991px and under prefers-reduced-motion. In RTL the X targets
 * are mirrored so the cards still drift outward.
 */
export function FintechHeroParallax({
  large,
  small1,
  small2,
  direction,
}: FintechHeroParallaxProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const sm1Ref = useRef<HTMLDivElement | null>(null)
  const sm2Ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sm1 = sm1Ref.current
    const sm2 = sm2Ref.current
    if (!sm1 || !sm2) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xSign = direction === 'rtl' ? -1 : 1
    const ease = 0.08

    let enabled = window.innerWidth > 991
    let rafId: number | null = null
    let targetX1 = 0
    let targetY1 = 0
    let targetR1 = 0
    let targetX2 = 0
    let targetY2 = 0
    let targetR2 = 0
    let curX1 = 0
    let curY1 = 0
    let curR1 = 0
    let curX2 = 0
    let curY2 = 0
    let curR2 = 0

    const heroEl = heroRef.current?.closest<HTMLElement>('[data-fintech-hero]') ?? heroRef.current

    const updateTargets = () => {
      if (!enabled) {
        targetX1 = targetY1 = targetR1 = 0
        targetX2 = targetY2 = targetR2 = 0
        return
      }
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
      const heroHeight = heroEl?.offsetHeight || 1
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.2)
      targetX1 = -progress * 180 * xSign
      targetY1 = -progress * 260
      targetR1 = -progress * 8
      targetX2 = progress * 180 * xSign
      targetY2 = -progress * 260
      targetR2 = progress * 8
    }

    const animate = () => {
      curX1 += (targetX1 - curX1) * ease
      curY1 += (targetY1 - curY1) * ease
      curR1 += (targetR1 - curR1) * ease
      curX2 += (targetX2 - curX2) * ease
      curY2 += (targetY2 - curY2) * ease
      curR2 += (targetR2 - curR2) * ease

      sm1.style.transform = `translate3d(${curX1.toFixed(2)}px, ${curY1.toFixed(2)}px, 0) rotate(${curR1.toFixed(2)}deg)`
      sm2.style.transform = `translate3d(${curX2.toFixed(2)}px, ${curY2.toFixed(2)}px, 0) rotate(${curR2.toFixed(2)}deg)`

      const settled =
        Math.abs(targetX1 - curX1) < 0.05 &&
        Math.abs(targetY1 - curY1) < 0.05 &&
        Math.abs(targetR1 - curR1) < 0.05 &&
        Math.abs(targetX2 - curX2) < 0.05 &&
        Math.abs(targetY2 - curY2) < 0.05 &&
        Math.abs(targetR2 - curR2) < 0.05

      rafId = settled ? null : requestAnimationFrame(animate)
    }

    const kick = () => {
      updateTargets()
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      if (!enabled) {
        sm1.style.transform = ''
        sm2.style.transform = ''
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
    <div className={styles.heroThumb} ref={heroRef}>
      <div className={styles.heroThumbLg}>{large}</div>
      <div className={styles.heroThumbSm1} ref={sm1Ref}>
        {small1}
      </div>
      <div className={styles.heroThumbSm2} ref={sm2Ref}>
        {small2}
      </div>
    </div>
  )
}
