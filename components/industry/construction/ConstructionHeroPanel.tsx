'use client'

import { useEffect, useRef } from 'react'

import styles from './construction-industry.module.css'

type HeroStage = {
  id: string
  label: string
  state?: string
}

type ConstructionHeroPanelProps = {
  label: string
  caption: string
  stages: readonly HeroStage[]
  waitingLabel: string
}

/**
 * Hero "live project sequence" panel — the CloudTopia stand-in for the template's
 * Revolution Slider hero visual. The staggered layer reveal is pure CSS (keyframes
 * with per-row delays, gated behind `prefers-reduced-motion: no-preference`), so it
 * is SSR-safe and degrades to fully-visible with no JS.
 *
 * This client wrapper adds only the template's `data-bgparallax` drift: the panel
 * eases vertically as the hero scrolls (rAF, factor 0.08). Disabled at <= 991px and
 * under prefers-reduced-motion, with full rAF cleanup.
 */
export function ConstructionHeroPanel({
  label,
  caption,
  stages,
  waitingLabel,
}: ConstructionHeroPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ease = 0.08
    let enabled = window.innerWidth > 991
    let rafId: number | null = null
    let target = 0
    let current = 0

    const heroEl = panel.closest<HTMLElement>('[data-construction-hero]')

    const updateTarget = () => {
      if (!enabled) {
        target = 0
        return
      }
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
      const heroHeight = heroEl?.offsetHeight || 1
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.2)
      target = progress * 46
    }

    const animate = () => {
      current += (target - current) * ease
      panel.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
      if (Math.abs(target - current) > 0.05) {
        rafId = requestAnimationFrame(animate)
      } else {
        rafId = null
      }
    }

    const kick = () => {
      updateTarget()
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      if (!enabled) panel.style.transform = ''
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
    <div className={styles.heroPanel} ref={panelRef} aria-hidden="true">
      <div className={styles.heroPanelHead}>
        <span className={styles.heroPanelDot} />
        <span className={styles.heroPanelLabel}>{label}</span>
      </div>
      <ol className={styles.heroPanelList}>
        {stages.map((stage, index) => {
          const waiting = stage.state === waitingLabel
          return (
            <li className={styles.heroPanelRow} key={stage.id} data-accent={waiting ? 'true' : undefined}>
              <span className={styles.heroPanelNum}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.heroPanelStage}>{stage.label}</span>
              {stage.state ? (
                <span className={styles.heroPanelState} data-waiting={waiting ? 'true' : 'false'}>
                  {stage.state}
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
      <p className={styles.heroPanelCaption}>{caption}</p>
    </div>
  )
}
