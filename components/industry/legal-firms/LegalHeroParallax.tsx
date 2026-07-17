'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import styles from './legal-firms-industry.module.css'

type LegalHeroParallaxProps = {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * jarallax-equivalent hero parallax — a faithful React port of Regalis' full-
 * bleed `img.jarallax-img` background inside a fixed-height, overflow-hidden
 * frame. The image is over-sized (see .heroImg in the stylesheet); a rAF loop
 * eases its translateY as the hero scrolls through the viewport so the
 * background drifts slower than the foreground.
 *
 * Disabled at <= 991px and under prefers-reduced-motion. rAF is cancelled on
 * cleanup; the effect settles (stops the loop) once the target is reached.
 */
export function LegalHeroParallax({ src, alt, width, height }: LegalHeroParallaxProps) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const frame = frameRef.current
    const img = imgRef.current
    if (!frame || !img) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ease = 0.09
    // Total travel (px) the background drifts across a full scroll pass.
    const travel = 120
    let enabled = window.innerWidth > 991
    let rafId: number | null = null
    let target = 0
    let current = 0

    const computeTarget = () => {
      if (!enabled) return 0
      const rect = frame.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // progress: 0 when the frame bottom enters the viewport top, 1 when its
      // top passes the bottom — clamp to keep the drift bounded.
      const raw = (vh - rect.top) / (vh + rect.height)
      const progress = Math.min(Math.max(raw, 0), 1)
      // Centre the drift around 0 so the image starts mid-travel.
      return (progress - 0.5) * travel
    }

    const apply = () => {
      if (!enabled) {
        img.style.transform = ''
        return
      }
      img.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    }

    const animate = () => {
      current += (target - current) * ease
      apply()
      if (Math.abs(target - current) > 0.05) {
        rafId = requestAnimationFrame(animate)
      } else {
        current = target
        apply()
        rafId = null
      }
    }

    const kick = () => {
      target = computeTarget()
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      if (!enabled) img.style.transform = ''
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
    <div className={styles.heroFrame} ref={frameRef}>
      <div className={styles.heroImg} ref={imgRef}>
        <Image src={src} alt={alt} width={width} height={height} priority sizes="100vw" />
      </div>
      <span className={styles.heroScrim} aria-hidden="true" />
    </div>
  )
}
