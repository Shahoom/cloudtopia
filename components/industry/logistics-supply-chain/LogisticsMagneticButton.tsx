'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import styles from './logistics-supply-chain-industry.module.css'

type LogisticsMagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
}

/**
 * Position-aware magnetic button — a React port of the Logistick
 * [data-block="button"] flair: a circular highlight tracks the cursor and the
 * button eases toward the pointer on hover, snapping back on leave.
 *
 * Guarded off for coarse pointers (touch) and prefers-reduced-motion, where it
 * degrades to a plain anchor with no transform. rAF-free; uses direct style
 * writes throttled by pointermove, cleaned up on unmount.
 */
export function LogisticsMagneticButton({
  href,
  children,
  className,
}: LogisticsMagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const flairRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    const flair = flairRef.current
    if (!el || !flair) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = event.clientX - rect.left
      const relY = event.clientY - rect.top
      flair.style.transform = `translate(${relX}px, ${relY}px)`
      const centreX = (relX / rect.width - 0.5) * 2
      const centreY = (relY / rect.height - 0.5) * 2
      el.style.transform = `translate(${clamp(centreX * 6, -8, 8)}px, ${clamp(centreY * 6, -8, 8)}px)`
    }

    const onEnter = (event: PointerEvent) => {
      flair.style.transition = 'none'
      onMove(event)
      requestAnimationFrame(() => {
        flair.style.transition = ''
        flair.style.opacity = '1'
        flair.style.scale = '1'
      })
    }

    const onLeave = () => {
      flair.style.opacity = '0'
      flair.style.scale = '0'
      el.style.transform = ''
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [])

  return (
    <a
      ref={ref}
      className={[styles.button, styles.buttonMagnetic, className].filter(Boolean).join(' ')}
      href={href}
    >
      <span className={styles.buttonFlair} ref={flairRef} aria-hidden="true" />
      {children}
    </a>
  )
}
