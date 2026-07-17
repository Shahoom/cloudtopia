'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpLeft, ArrowUpRight, Check, MessageCircle } from 'lucide-react'

import styles from './restaurants-industry.module.css'
import type { RestaurantsHeroPillar } from './restaurants-content'

type RestaurantsHeroPhoto = {
  src: string
  width: number
  height: number
  alt: string
}

type RestaurantsHeroProps = {
  direction: 'ltr' | 'rtl'
  kicker: string
  h1: string
  intro: string
  primaryCtaLabel: string
  primaryHref: string
  secondaryCtaLabel: string
  backTitle: string
  trustLabel: string
  trust: readonly string[]
  pillars: readonly RestaurantsHeroPillar[]
  regionLabel: string
  dotLabel: string
  prevLabel: string
  nextLabel: string
  /** Static full-bleed backdrop — it does NOT rotate with the slides. */
  photo: RestaurantsHeroPhoto
}

const AUTOPLAY_MS = 5000

/**
 * Foodking's HomeSlider port. Swiper's `effect: 'fade'` (2000ms) + 5000ms
 * autoplay loop, with the defining detail reproduced: the hero's rotating
 * cluster REPLAYS its staggered entrance animation on every slide change.
 *
 * Foodking does this with `sliderAnimation()` (style.animation='none' → reflow →
 * reassign `${anim} ${duration} ${delay}`); here the animated cluster is keyed
 * by the active index so it remounts and restarts its CSS entrance, with each
 * child carrying an incremental animation-delay for the same staggered feel.
 * A single static <h1> is kept (accessibility) while the pillar tag, headline,
 * note, and device mock re-enter each cycle.
 *
 * The backdrop photo is deliberately static and outside the keyed rotator: it
 * is the LCP image, so it must not be re-fetched or re-animated per slide.
 * `.hero::before` lays the navy scrim over it — every hero text layer sits on
 * that scrim, not on raw photo, which is what keeps the copy AA-legible.
 *
 * Autoplay is paused on hover/focus and disabled entirely under
 * prefers-reduced-motion, where the slider becomes a manual (dots/arrows)
 * control with no motion.
 */
export function RestaurantsHero({
  direction,
  kicker,
  h1,
  intro,
  primaryCtaLabel,
  primaryHref,
  secondaryCtaLabel,
  backTitle,
  trustLabel,
  trust,
  pillars,
  regionLabel,
  dotLabel,
  prevLabel,
  nextLabel,
  photo,
}: RestaurantsHeroProps) {
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pausedRef = useRef(false)
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight
  const total = pillars.length

  const go = useCallback(
    (next: number) => setActive(((next % total) + total) % total),
    [total],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion || total <= 1) return
    let timer: ReturnType<typeof setInterval> | undefined
    const start = () => {
      timer = setInterval(() => {
        if (!pausedRef.current && !document.hidden) {
          setActive((current) => (current + 1) % total)
        }
      }, AUTOPLAY_MS)
    }
    start()
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [reducedMotion, total])

  const pillar = pillars[active]
  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  return (
    <section
      className={styles.hero}
      data-header-theme="dark"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <Image
        className={styles.heroPhoto}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="100vw"
        priority
      />
      <span className={styles.heroBackTitle} aria-hidden="true">
        {backTitle}
      </span>
      <span className={`${styles.heroDecor} ${styles.heroDecor1}`} aria-hidden="true" />
      <span className={`${styles.heroDecor} ${styles.heroDecor2}`} aria-hidden="true" />
      <span className={`${styles.heroDecor} ${styles.heroDecor3}`} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{kicker}</p>
          <h1 className={styles.heroTitle}>{h1}</h1>

          {/* Rotating cluster — remounts (keyed) to replay its staggered entrance */}
          <div className={styles.heroRotator} key={active} data-rt-replay>
            <p className={styles.heroPillarTag} data-rt-anim="1">
              <span className={styles.heroPillarDot} aria-hidden="true" />
              {pillar.tag}
            </p>
            <p className={styles.heroIntro} data-rt-anim="2">
              {intro}
            </p>
          </div>

          <div className={styles.heroActions}>
            <a className={`${styles.themeBtn} ${styles.themeBtnPrimary}`} href={primaryHref}>
              <span className={styles.themeBtnIcon} aria-hidden="true">
                <MessageCircle />
              </span>
              <span className={styles.themeBtnText}>{primaryCtaLabel}</span>
            </a>
            <a className={`${styles.themeBtn} ${styles.themeBtnGhost}`} href="#restaurants-service-paths">
              <span className={styles.themeBtnText}>{secondaryCtaLabel}</span>
              <span className={styles.arrowPair} aria-hidden="true">
                <Arrow />
                <Arrow />
              </span>
            </a>
          </div>

          <ul className={styles.heroTrust}>
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

        <div className={styles.heroVisual}>
          <div className={styles.heroDevice} key={`device-${active}`}>
            <span className={styles.srOnly}>{pillar.tag}</span>
            <div className={styles.heroDeviceBar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className={styles.heroDeviceTitle} data-rt-anim="1">
              {pillar.deviceTitle}
            </p>
            <p className={styles.heroDeviceHeadline} data-rt-anim="2">
              {pillar.headline}
            </p>
            <ul className={styles.heroDeviceRows}>
              {pillar.deviceRows.map((row, index) => (
                <li key={row} data-rt-anim={String(3 + index)}>
                  <span className={styles.heroDeviceCheck} aria-hidden="true">
                    <Check />
                  </span>
                  {row}
                </li>
              ))}
            </ul>
            <p className={styles.heroDeviceNote} data-rt-anim="6">
              {pillar.note}
            </p>
          </div>

          <div className={styles.heroControls}>
            <button
              type="button"
              className={styles.heroArrow}
              aria-label={prevLabel}
              onClick={() => go(active - 1)}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className={styles.heroDots} role="tablist" aria-label={regionLabel}>
              {pillars.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`${dotLabel}: ${item.tag}`}
                  className={styles.heroDot}
                  data-active={index === active ? 'true' : 'false'}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.heroArrow}
              aria-label={nextLabel}
              onClick={() => go(active + 1)}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
