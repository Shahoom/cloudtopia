'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, Plane, Ship, Truck } from 'lucide-react'

import styles from './logistics-supply-chain-industry.module.css'

type SceneStage = {
  id: string
  label: string
  state?: string
}

type LogisticsParallaxSceneProps = {
  direction: 'ltr' | 'rtl'
  panelLabel: string
  summary: string
  stages: readonly SceneStage[]
}

/**
 * Hero control-tower scene with ScrollTrigger-style vehicle parallax — a React
 * port of the Logistick decorative-vehicle drift (plane/truck/ship translate on
 * scroll, scrub-eased). The scene is fully CSS/SVG drawn (the template ships
 * only gray placeholder photos), so no imagery is required.
 *
 * The vehicles are decorative (aria-hidden). Parallax runs via a single rAF
 * loop, eased toward scroll-derived targets, and is disabled at <= 991px and
 * under prefers-reduced-motion. In RTL the X drift is mirrored.
 */
export function LogisticsParallaxScene({
  direction,
  panelLabel,
  summary,
  stages,
}: LogisticsParallaxSceneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const truckRef = useRef<HTMLSpanElement | null>(null)
  const shipRef = useRef<HTMLSpanElement | null>(null)
  const planeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const truck = truckRef.current
    const ship = shipRef.current
    const plane = planeRef.current
    if (!truck || !ship || !plane) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xSign = direction === 'rtl' ? -1 : 1
    const ease = 0.08
    let enabled = window.innerWidth > 991
    let rafId: number | null = null

    const targets = { truckX: 0, shipX: 0, planeX: 0, planeY: 0 }
    const cur = { truckX: 0, shipX: 0, planeX: 0, planeY: 0 }

    const updateTargets = () => {
      if (!enabled) {
        targets.truckX = targets.shipX = targets.planeX = targets.planeY = 0
        return
      }
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
      const base = rootRef.current?.offsetHeight || 1
      const progress = Math.min(Math.max(scrollY / base, 0), 1.4)
      targets.truckX = progress * 220 * xSign
      targets.shipX = -progress * 200 * xSign
      targets.planeX = progress * 160 * xSign
      targets.planeY = -progress * 120
    }

    const animate = () => {
      cur.truckX += (targets.truckX - cur.truckX) * ease
      cur.shipX += (targets.shipX - cur.shipX) * ease
      cur.planeX += (targets.planeX - cur.planeX) * ease
      cur.planeY += (targets.planeY - cur.planeY) * ease

      truck.style.transform = `translate3d(${cur.truckX.toFixed(2)}px, 0, 0)`
      ship.style.transform = `translate3d(${cur.shipX.toFixed(2)}px, 0, 0)`
      plane.style.transform = `translate3d(${cur.planeX.toFixed(2)}px, ${cur.planeY.toFixed(2)}px, 0)`

      const settled =
        Math.abs(targets.truckX - cur.truckX) < 0.05 &&
        Math.abs(targets.shipX - cur.shipX) < 0.05 &&
        Math.abs(targets.planeX - cur.planeX) < 0.05 &&
        Math.abs(targets.planeY - cur.planeY) < 0.05

      rafId = settled ? null : requestAnimationFrame(animate)
    }

    const kick = () => {
      updateTargets()
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      enabled = window.innerWidth > 991
      if (!enabled) {
        truck.style.transform = ''
        ship.style.transform = ''
        plane.style.transform = ''
      }
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
  }, [direction])

  return (
    <div className={styles.heroScene} ref={rootRef}>
      <span className={`${styles.heroVehicle} ${styles.heroVehiclePlane}`} ref={planeRef} aria-hidden="true">
        <Plane />
      </span>
      <span className={`${styles.heroVehicle} ${styles.heroVehicleShip}`} ref={shipRef} aria-hidden="true">
        <Ship />
      </span>
      <span className={`${styles.heroVehicle} ${styles.heroVehicleTruck}`} ref={truckRef} aria-hidden="true">
        <Truck />
      </span>

      <div className={styles.heroPanel}>
        <p className={styles.heroPanelLabel}>{panelLabel}</p>
        <p className={styles.heroPanelSummary}>{summary}</p>
        <ol className={styles.heroRail}>
          {stages.map((stage, index) => (
            <li className={styles.heroRailItem} data-done={index < 3 ? 'true' : 'false'} key={stage.id}>
              <span className={styles.heroRailDot} aria-hidden="true">
                {index < 3 ? <CheckCircle2 /> : <span className={styles.heroRailPulse} />}
              </span>
              <span className={styles.heroRailText}>
                <span className={styles.heroRailLabel}>{stage.label}</span>
                {stage.state ? <span className={styles.heroRailState}>{stage.state}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
