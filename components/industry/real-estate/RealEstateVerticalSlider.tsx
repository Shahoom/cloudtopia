'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import styles from './real-estate-industry.module.css'

type Module = {
  id: string
  title: string
  description: string
  image: string
  width: number
  height: number
  tag: string
}

type RealEstateVerticalSliderProps = {
  modules: readonly Module[]
  regionLabel: string
  prevLabel: string
  nextLabel: string
}

/**
 * Featured-Items vertical slider — a port of HouseBox's `.box-slider` vertical
 * Slick (verticalSwiping, autoplay 1500ms). Repurposed to auto-cycle the
 * platform MODULES CloudTopia ships (no property titles or prices). One module
 * is active at a time; advancing slides the next up from below (vertical fade).
 *
 * SSR-safe: the first module is active on the server and first client render.
 * Autoplay is disabled under prefers-reduced-motion and while the slider is
 * hovered or focused; the up/down controls stay usable either way, and an
 * aria-live caption announces the active module.
 */
export function RealEstateVerticalSlider({
  modules,
  regionLabel,
  prevLabel,
  nextLabel,
}: RealEstateVerticalSliderProps) {
  const total = modules.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReduced = useRef(false)

  const go = useCallback(
    (next: number) => setActive(((next % total) + total) % total),
    [total],
  )

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (total < 2 || paused || prefersReduced.current) return
    const timer = setInterval(() => {
      if (document.hidden) return
      setActive((current) => (current + 1) % total)
    }, 2200)
    return () => clearInterval(timer)
  }, [total, paused])

  return (
    <div
      className={styles.vslider}
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.vsliderViewport}>
        {modules.map((module, index) => (
          <article
            className={styles.vsliderCard}
            key={module.id}
            data-active={index === active ? 'true' : 'false'}
            aria-hidden={index === active ? undefined : 'true'}
            role="group"
            aria-roledescription="slide"
            aria-label={module.title}
          >
            <div className={styles.vsliderThumb}>
              <Image
                src={module.image}
                alt=""
                width={module.width}
                height={module.height}
                sizes="(max-width: 991px) 90vw, 30vw"
              />
            </div>
            <div className={styles.vsliderText}>
              <span className={styles.vsliderTag}>{module.tag}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.vsliderControls}>
        <button
          type="button"
          className={styles.vsliderArrow}
          onClick={() => go(active - 1)}
          aria-label={prevLabel}
        >
          <ChevronUp aria-hidden="true" />
        </button>
        <span className={styles.vsliderCount} aria-hidden="true" dir="ltr">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          className={styles.vsliderArrow}
          onClick={() => go(active + 1)}
          aria-label={nextLabel}
        >
          <ChevronDown aria-hidden="true" />
        </button>
      </div>

      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {`${String(active + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}: ${modules[active]?.title ?? ''}`}
      </p>
    </div>
  )
}
