'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import styles from './real-estate-industry.module.css'

type RevealVariant = 'up' | 'down' | 'left' | 'right'

type RealEstateRevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  stagger?: boolean
  id?: string
}

/**
 * AOS-equivalent scroll reveal (the HouseBox template uses AOS fade-up/left/
 * zoom on scroll-in). An IntersectionObserver flips the element to its "in"
 * class the first time it enters the viewport (fade + translate).
 *
 * SSR-safe: the server render and first client render are visible ('idle'), so
 * there is no hydration mismatch and no-JS users still see content. After mount
 * we only hide + observe elements that are BELOW the fold, so above-the-fold
 * content never flashes. The reduced-motion kill switch forces everything
 * visible.
 */
export function RealEstateReveal({
  children,
  className,
  variant = 'up',
  stagger = false,
  id,
}: RealEstateRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle')

  useEffect(() => {
    const node = ref.current
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
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      data-reveal={state}
      data-reveal-variant={variant}
      data-reveal-stagger={stagger ? 'true' : undefined}
    >
      {children}
    </div>
  )
}
