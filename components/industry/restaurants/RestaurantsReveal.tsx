'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import styles from './restaurants-industry.module.css'

type RevealVariant = 'up' | 'right' | 'left'

type RestaurantsRevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  /** Stagger direct children like Foodking's cascading `data-wow-delay`. */
  stagger?: boolean
  as?: 'div' | 'ul' | 'ol'
  id?: string
}

/**
 * WOW.js + animate.css equivalent. Foodking tags elements `wow fadeInUp` with
 * `data-wow-delay` .3s/.5s/.7s/.9s and initialises them once via
 * `new WOW.WOW().init()`; here an IntersectionObserver flips the element to its
 * "in" state the first time it enters the viewport (fade + translate), and the
 * `stagger` variant cascades its children with CSS transition-delays.
 *
 * SSR-safe: server and first client render are visible ('idle'), so there is no
 * hydration mismatch and no-JS users always see content. We only hide + observe
 * elements below the fold. The reduced-motion kill switch forces everything
 * visible immediately.
 */
export function RestaurantsReveal({
  children,
  className,
  variant = 'up',
  stagger = false,
  as = 'div',
  id,
}: RestaurantsRevealProps) {
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

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      data-reveal={state}
      data-reveal-variant={variant}
      data-reveal-stagger={stagger ? 'true' : undefined}
    >
      {children}
    </Tag>
  )
}
