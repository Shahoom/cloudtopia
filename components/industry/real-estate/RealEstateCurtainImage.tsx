'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './real-estate-industry.module.css'

type RealEstateCurtainImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  priority?: boolean
  dir: 'ltr' | 'rtl'
}

/**
 * GSAP `.reveal` dual-curtain image reveal — a faithful port of HouseBox's
 * crossing-panel effect: the wrapper slides in from xPercent:-100 while the
 * inner <img> slides from xPercent:+100 at scale 1.3, both over ~1.5s with a
 * Power2.out ease and overlapping (delay:-1.5), producing the signature curtain
 * wipe on About and approach imagery.
 *
 * SSR-safe: the server render and first client render show the image in its
 * final, visible position ('idle'), so no-JS and hydration are correct. After
 * mount, only images still below the fold are reset to the pre-animation state
 * and revealed on scroll-in. In RTL the horizontal directions are mirrored.
 * Reduced motion shows the image immediately.
 */
export function RealEstateCurtainImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  dir,
}: RealEstateCurtainImageProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle')

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('in')
      return
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    const alreadyVisible = rect.top < viewportHeight * 0.85 && rect.bottom > 0
    if (alreadyVisible) {
      setState('in')
      return
    }

    setState('out')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState('in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={[styles.curtain, className].filter(Boolean).join(' ')}
      data-curtain={state}
      data-dir={dir}
    >
      <Image
        className={styles.curtainImg}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
      />
    </div>
  )
}
