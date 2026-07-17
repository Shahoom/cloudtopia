'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'

import styles from './ecommerce-retail-industry.module.css'

type HeroSlide = {
  id: string
  kicker: string
  title: string
  text: string
  image: string
  imageAlt: string
}

type EcommerceHeroSliderProps = {
  /** The definition's authored hero h1. Rendered once, outside the rotating
   *  caption, so the page keeps a single stable primary heading (an <h1> that
   *  changed text on every auto-advance would be an SEO/AT hazard). */
  heading: string
  slides: readonly HeroSlide[]
  direction: 'ltr' | 'rtl'
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  prevLabel: string
  nextLabel: string
  slideLabel: string
}

/**
 * Owl-slider hero port. Faithful to Lager's `animatetCaptions()`:
 *   - single-item fade carousel
 *   - on each activation the caption cascades: title (fadeInDown) then
 *     kicker/text/actions (fadeInUp), animation-delay starting 100ms and
 *     incrementing +180ms per element.
 * We replay the cascade by remounting the caption via a `nonce` key on every
 * slide change. Auto-advance (7s) pauses on hover/focus. Everything animatable
 * is disabled under prefers-reduced-motion, where the caption is simply shown.
 *
 * SSR-safe: all slides render; the first is active and visible with no
 * animation until the client mounts, so there is no hydration flash and no-JS
 * users see slide one fully.
 */
export function EcommerceHeroSlider({
  heading,
  slides,
  direction,
  primaryCta,
  secondaryCta,
  prevLabel,
  nextLabel,
  slideLabel,
}: EcommerceHeroSliderProps) {
  const [active, setActive] = useState(0)
  const [nonce, setNonce] = useState(0)
  const [animate, setAnimate] = useState(false)
  const pausedRef = useRef(false)
  const PrevIcon = direction === 'rtl' ? ChevronRight : ChevronLeft
  const NextIcon = direction === 'rtl' ? ChevronLeft : ChevronRight

  const total = slides.length

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total)
      setNonce((n) => n + 1)
    },
    [total],
  )

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  // Enable caption animation only on the client and only when motion is allowed.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimate(true)
    setNonce((n) => n + 1)
  }, [])

  // Auto-advance; skipped entirely under reduced motion or with a single slide.
  useEffect(() => {
    if (total < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % total)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [total])

  // Whenever the auto-advance changes `active`, bump the caption nonce so the
  // cascade replays. (Manual nav already bumps via goTo.)
  useEffect(() => {
    setNonce((n) => n + 1)
  }, [active])

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
      aria-label={slideLabel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      {/* Stable, authored primary heading. The template's visible hero title
          rotates with the carousel, so it stays a <p>; this keeps exactly one
          <h1> whose text never changes under the reader. */}
      <h1 className={styles.srOnly}>{heading}</h1>

      <div className={styles.heroSlides}>
        {slides.map((slide, index) => {
          const isActive = index === active
          return (
            <div
              key={slide.id}
              className={styles.heroSlide}
              data-active={isActive ? 'true' : 'false'}
              aria-hidden={isActive ? undefined : 'true'}
              role="group"
              aria-roledescription="slide"
            >
              <div className={styles.heroSlideMedia}>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={styles.heroSlideImg}
                />
                <span className={styles.heroSlideScrim} aria-hidden="true" />
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.heroInner}>
        {slides.map((slide, index) => {
          const isActive = index === active
          if (!isActive) return null
          return (
            <div
              className={styles.heroCaption}
              key={`${slide.id}-${nonce}`}
              data-animate={animate ? 'true' : 'false'}
            >
              <p className={styles.heroKicker} style={{ animationDelay: '100ms' }}>
                {slide.kicker}
              </p>
              <p className={styles.heroTitle} style={{ animationDelay: '280ms' }}>
                {slide.title}
              </p>
              <p className={styles.heroText} style={{ animationDelay: '460ms' }}>
                {slide.text}
              </p>
              <div className={styles.heroActions} style={{ animationDelay: '640ms' }}>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href={primaryCta.href}>
                  <MessageCircle aria-hidden="true" />
                  <span>{primaryCta.label}</span>
                </a>
                <a className={`${styles.button} ${styles.buttonGhost}`} href={secondaryCta.href}>
                  <span>{secondaryCta.label}</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {total > 1 ? (
        <div className={styles.heroNav}>
          <button type="button" className={styles.heroArrow} onClick={prev} aria-label={prevLabel}>
            <PrevIcon aria-hidden="true" />
          </button>
          <div className={styles.heroDots} role="group" aria-label={slideLabel}>
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={styles.heroDot}
                data-active={index === active ? 'true' : 'false'}
                aria-label={`${slideLabel} ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className={styles.heroArrow} onClick={next} aria-label={nextLabel}>
            <NextIcon aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
