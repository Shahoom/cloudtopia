'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'

import styles from './real-estate-industry.module.css'

type HeroSlide = {
  id: string
  image: string
  alt: string
  valueProp: string
}

type RealEstateHeroSliderProps = {
  slides: readonly HeroSlide[]
  kicker: string
  heading: string
  intro: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  trustLabel: string
  trust: readonly string[]
  sliderLabel: string
  prevLabel: string
  nextLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * Slick fade hero — a faithful port of HouseBox's `.hero-area-slider` Slick
 * config: three full-bleed slides cross-fade (fade:true, cssEase:'linear',
 * speed 1500ms) on a 2000ms autoplay, driven by custom circular prev/next
 * arrows. Here only the background photo and the rotating value-prop caption
 * change between slides; a single, constant <h1> and the CTAs stay in place so
 * the page keeps exactly one heading-1 and the copy never flickers.
 *
 * SSR-safe: the first slide is active on the server and first client render.
 * Autoplay is disabled under prefers-reduced-motion and while the hero is
 * hovered, focused, or the tab is hidden. RTL flips the CTA arrow icon.
 */
export function RealEstateHeroSlider({
  slides,
  kicker,
  heading,
  intro,
  primaryCta,
  secondaryCta,
  trustLabel,
  trust,
  sliderLabel,
  prevLabel,
  nextLabel,
  direction,
}: RealEstateHeroSliderProps) {
  const total = slides.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const baseId = useId()
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight
  const PrevIcon = direction === 'rtl' ? ChevronRight : ChevronLeft
  const NextIcon = direction === 'rtl' ? ChevronLeft : ChevronRight

  const go = useCallback(
    (next: number) => setActive(((next % total) + total) % total),
    [total],
  )

  const prefersReduced = useRef(false)
  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (total < 2 || paused || prefersReduced.current) return

    let timer: ReturnType<typeof setInterval> | undefined
    const startAutoplay = () => {
      timer = setInterval(() => {
        if (document.hidden) return
        setActive((current) => (current + 1) % total)
      }, 2000)
    }
    startAutoplay()

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [total, paused])

  return (
    <section
      className={styles.hero}
      data-header-theme="dark"
      aria-roledescription="carousel"
      aria-label={sliderLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.heroSlides} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            className={styles.heroSlide}
            key={slide.id}
            data-active={index === active ? 'true' : 'false'}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={styles.heroSlideImg}
            />
          </div>
        ))}
        <span className={styles.heroScrim} aria-hidden="true" />
      </div>

      <div className={styles.heroInner}>
        <p className={styles.heroKicker}>{kicker}</p>
        <h1 className={styles.heroHeading}>{heading}</h1>
        <p className={styles.heroIntro}>{intro}</p>

        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.buttonPrimary}`} href={primaryCta.href}>
            <MessageCircle aria-hidden="true" />
            <span>{primaryCta.label}</span>
            <span className={styles.btnArrows} aria-hidden="true">
              <Arrow className={styles.arrow1} />
              <Arrow className={styles.arrow2} />
            </span>
          </a>
          <a className={`${styles.button} ${styles.buttonGhost}`} href={secondaryCta.href}>
            <span>{secondaryCta.label}</span>
            <span className={styles.btnArrows} aria-hidden="true">
              <Arrow className={styles.arrow1} />
              <Arrow className={styles.arrow2} />
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

      <div className={styles.heroControls}>
        <button
          type="button"
          className={styles.heroArrow}
          onClick={() => go(active - 1)}
          aria-label={prevLabel}
        >
          <PrevIcon aria-hidden="true" />
        </button>
        <div className={styles.heroDots} role="group" aria-label={sliderLabel}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={styles.heroDot}
              data-active={index === active ? 'true' : 'false'}
              aria-label={slide.valueProp}
              aria-current={index === active ? 'true' : undefined}
              aria-controls={`${baseId}-caption`}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.heroArrow}
          onClick={() => go(active + 1)}
          aria-label={nextLabel}
        >
          <NextIcon aria-hidden="true" />
        </button>
      </div>

      <p className={styles.heroCaption} id={`${baseId}-caption`} aria-live="polite">
        {slides[active]?.valueProp}
      </p>
    </section>
  )
}
