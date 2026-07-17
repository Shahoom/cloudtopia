'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowUpLeft, ArrowUpRight, Check, Compass, MessageCircle } from 'lucide-react'

import type { Locale } from '@/lib/i18n/config'
import styles from './travel-hospitality-industry.module.css'

type HeroCard = {
  src: string
  alt: string
  width: number
  height: number
}

type TravelHeroProps = {
  locale: Locale
  direction: 'ltr' | 'rtl'
  kicker: string
  h1: string
  intro: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  trustLabel: string
  trust: readonly string[]
  bgSrc: string
  bgAlt: string
  cards: readonly [HeroCard, HeroCard, HeroCard]
}

/**
 * Layered, staggered-entrance hero — a licence-clean re-creation of the template's
 * Revolution-Slider hero (NOT a literal port). A parallax background image drifts
 * on scroll behind stacked caption layers that fade/slide in on a staggered
 * timeline (CSS transitions with per-layer delays, triggered once on mount). Three
 * floating photo cards drift outward on scroll via an eased rAF loop.
 *
 * SSR-safe: layers render in their final position server-side; the entrance only
 * plays after mount, so no-JS users see the full hero. Parallax + entrance are
 * both neutralised under prefers-reduced-motion, and card drift is disabled at
 * <= 991px.
 */
export function TravelHero({
  locale,
  direction,
  kicker,
  h1,
  intro,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  trustLabel,
  trust,
  bgSrc,
  bgAlt,
  cards,
}: TravelHeroProps) {
  const Arrow = locale === 'ar' ? ArrowUpLeft : ArrowUpRight
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])

  // Parallax: bg drifts down, outer cards drift outward, on an eased rAF loop.
  // (The staggered caption entrance is pure CSS animation, so it also plays
  // with JavaScript disabled and is neutralised under reduced motion.)
  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xSign = direction === 'rtl' ? -1 : 1
    const ease = 0.08
    let enabled = window.innerWidth > 991
    let rafId: number | null = null

    let targetBg = 0
    let curBg = 0
    const cardTargets = [0, 0, 0]
    const cardCurrents = [0, 0, 0]
    // per-card drift signature: [x, y, rotate] multipliers
    const cardMotion: Array<[number, number, number]> = [
      [-90 * xSign, -60, -5],
      [80 * xSign, -110, 4],
      [40 * xSign, 60, 3],
    ]

    const updateTargets = () => {
      if (!enabled) {
        targetBg = 0
        cardTargets[0] = cardTargets[1] = cardTargets[2] = 0
        return
      }
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
      const heroHeight = section.offsetHeight || 1
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.2)
      targetBg = progress
      cardTargets[0] = progress
      cardTargets[1] = progress
      cardTargets[2] = progress
    }

    const animate = () => {
      curBg += (targetBg - curBg) * ease
      bg.style.transform = `translate3d(0, ${(curBg * 70).toFixed(2)}px, 0) scale(1.12)`

      let settled = Math.abs(targetBg - curBg) < 0.001
      for (let i = 0; i < 3; i += 1) {
        cardCurrents[i] += (cardTargets[i] - cardCurrents[i]) * ease
        const el = cardRefs.current[i]
        if (el) {
          const [mx, my, mr] = cardMotion[i]
          const p = cardCurrents[i]
          el.style.transform = `translate3d(${(p * mx).toFixed(2)}px, ${(p * my).toFixed(2)}px, 0) rotate(${(p * mr).toFixed(2)}deg)`
        }
        if (Math.abs(cardTargets[i] - cardCurrents[i]) >= 0.001) settled = false
      }

      rafId = settled ? null : window.requestAnimationFrame(animate)
    }

    const kick = () => {
      updateTargets()
      if (rafId === null) rafId = window.requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      if (!enabled) {
        bg.style.transform = ''
        cardRefs.current.forEach((el) => {
          if (el) el.style.transform = ''
        })
      }
      kick()
    }

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', onResize)
    kick()

    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', onResize)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [direction])

  return (
    <section
      className={styles.hero}
      data-header-theme="dark"
      ref={sectionRef}
    >
      <div className={styles.heroBackdrop} ref={bgRef} aria-hidden="true">
        <Image
          src={bgSrc}
          alt={bgAlt}
          fill
          priority
          sizes="100vw"
          className={styles.heroBackdropImg}
        />
      </div>
      <div className={styles.heroScrim} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow} data-hero-layer="1">
            <Compass aria-hidden="true" />
            {kicker}
          </p>
          <h1 data-hero-layer="2">{h1}</h1>
          <p className={styles.heroIntro} data-hero-layer="3">
            {intro}
          </p>
          <div className={styles.heroActions} data-hero-layer="4">
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={primaryHref}>
              <MessageCircle aria-hidden="true" />
              <span>{primaryLabel}</span>
              <span className={styles.arrowPair} aria-hidden="true">
                <Arrow />
                <Arrow />
              </span>
            </a>
            <a className={`${styles.button} ${styles.buttonGhost}`} href={secondaryHref}>
              <span>{secondaryLabel}</span>
              <span className={styles.arrowPair} aria-hidden="true">
                <Arrow />
                <Arrow />
              </span>
            </a>
          </div>
          <ul className={styles.heroTrust} data-hero-layer="5">
            <li className={styles.heroTrustLabel} aria-hidden="true">
              {trustLabel}
            </li>
            {trust.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroCluster} data-hero-layer="6" aria-hidden="true">
          {cards.map((card, index) => (
            <div
              className={styles.heroCard}
              data-card={index + 1}
              key={card.src}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
            >
              <Image
                src={card.src}
                alt=""
                width={card.width}
                height={card.height}
                sizes="(max-width: 991px) 40vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
