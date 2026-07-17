'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState, type ComponentType } from 'react'
import { ChevronLeft, ChevronRight, Fingerprint, LayoutGrid, RefreshCw } from 'lucide-react'

import styles from './government-public-sector-industry.module.css'

type GovHeroSlide = {
  id: string
  kicker: string
  title: string
  description: string
  image: string
  alt: string
  width: number
  height: number
}

type GovHeroCarouselProps = {
  slides: readonly GovHeroSlide[]
  direction: 'ltr' | 'rtl'
  label: string
  prevLabel: string
  nextLabel: string
  gotoLabel: string
}

const SLIDE_ICONS: readonly ComponentType<{ 'aria-hidden'?: boolean }>[] = [
  LayoutGrid,
  Fingerprint,
  RefreshCw,
]

/**
 * Owl-carousel cross-fade hero — a faithful React port of the Whitehall
 * banner-section: slides swap via opacity cross-fade (animateOut/In 'fadeOut'/
 * 'fadeIn', smartSpeed 1000), autoplay 6000ms, with prev/next arrows and dot
 * indicators. Autoplay pauses on hover/focus. Under prefers-reduced-motion the
 * autoplay never starts and every slide is shown stacked (CSS), so no content
 * is trapped off-frame; the controls are hidden because they are not needed.
 * RTL-aware: the prev/next arrows advance in the reading direction.
 *
 * Each slide is backed by a licensed civic-architecture photo under a navy
 * scrim (.carouselSlideScrim) that keeps every slide label at WCAG AA or better
 * even over the brightest part of a photo. Only slide 1 is `priority` — it is
 * the hero/LCP image; the other two must not compete for the preload budget.
 */
export function GovHeroCarousel({
  slides,
  direction,
  label,
  prevLabel,
  nextLabel,
  gotoLabel,
}: GovHeroCarouselProps) {
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  const baseId = useId()
  const total = slides.length
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (total <= 1) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      return
    }

    const clear = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    const startTimer = () => {
      clear()
      timerRef.current = setInterval(() => {
        if (!pausedRef.current && !document.hidden) {
          setActive((prev) => (prev + 1) % total)
        }
      }, 6000)
    }

    startTimer()
    return clear
  }, [total])

  // Restart the autoplay clock after a manual interaction so the new slide gets
  // its full dwell time.
  const restart = () => {
    if (reduced || total <= 1 || !timerRef.current) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pausedRef.current && !document.hidden) {
        setActive((prev) => (prev + 1) % total)
      }
    }, 6000)
  }

  const goTo = (index: number) => {
    setActive(((index % total) + total) % total)
    restart()
  }
  const advance = (delta: number) => goTo(active + delta)

  // In RTL the "next" arrow (pointing left) should still move forward.
  const forwardArrow = direction === 'rtl' ? ChevronLeft : ChevronRight
  const backwardArrow = direction === 'rtl' ? ChevronRight : ChevronLeft
  const ForwardIcon = forwardArrow
  const BackwardIcon = backwardArrow

  const showControls = !reduced && total > 1

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onFocusCapture={() => {
        pausedRef.current = true
      }}
      onBlurCapture={() => {
        pausedRef.current = false
      }}
    >
      <div className={styles.carouselViewport}>
        {slides.map((slide, index) => {
          const Icon = SLIDE_ICONS[index] ?? LayoutGrid
          const isActive = reduced || index === active
          return (
            <div
              className={styles.carouselSlide}
              key={slide.id}
              id={`${baseId}-slide-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${total}`}
              data-active={isActive ? 'true' : 'false'}
              aria-hidden={reduced ? undefined : index === active ? undefined : 'true'}
            >
              <Image
                className={styles.carouselSlideImg}
                src={slide.image}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                sizes="(max-width: 991px) 92vw, 46vw"
                priority={index === 0}
              />
              <span className={styles.carouselSlideScrim} aria-hidden="true" />
              <span className={styles.carouselSlideIcon} aria-hidden="true">
                <Icon aria-hidden={true} />
              </span>
              <p className={styles.carouselKicker}>{slide.kicker}</p>
              <p className={styles.carouselTitle}>{slide.title}</p>
              <p className={styles.carouselText}>{slide.description}</p>
            </div>
          )
        })}
      </div>

      {showControls ? (
        <div className={styles.carouselControls}>
          <div className={styles.carouselDots} role="tablist" aria-label={label}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={styles.carouselDot}
                aria-current={index === active ? 'true' : undefined}
                aria-label={`${gotoLabel} ${index + 1}`}
                aria-controls={`${baseId}-slide-${index}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <div className={styles.carouselArrows}>
            <button
              type="button"
              className={styles.carouselArrow}
              aria-label={prevLabel}
              onClick={() => advance(-1)}
            >
              <BackwardIcon aria-hidden={true} />
            </button>
            <button
              type="button"
              className={styles.carouselArrow}
              aria-label={nextLabel}
              onClick={() => advance(1)}
            >
              <ForwardIcon aria-hidden={true} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
