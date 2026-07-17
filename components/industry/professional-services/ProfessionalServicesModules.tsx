'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Compass, Hammer, LifeBuoy, Plug } from 'lucide-react'

import styles from './professional-services-industry.module.css'

type ModuleStep = {
  id: string
  title: string
  subtitle: string
}

type ProfessionalServicesModulesProps = {
  steps: readonly ModuleStep[]
  regionLabel: string
}

const STEP_ICONS: readonly ComponentType<{ 'aria-hidden'?: boolean }>[] = [
  Compass,
  Hammer,
  Plug,
  LifeBuoy,
]

/**
 * Delivery-module sequence — reproduces the Showbiz "Business Events" band as a
 * sequential highlight. Each module activates in turn on a 2000ms cadence, the
 * whole set holds active for 2s, clears, waits 2s, then loops. The connector
 * fill (CSS ::before) tracks the active module.
 *
 * Runs only while the list is in view (IntersectionObserver). Under
 * prefers-reduced-motion every module is shown active with no cycling.
 */
export function ProfessionalServicesModules({
  steps,
  regionLabel,
}: ProfessionalServicesModulesProps) {
  const listRef = useRef<HTMLOListElement | null>(null)
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const node = listRef.current
    if (!node) return

    const total = steps.length
    if (total === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveCount(total)
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined
    let running = false
    let count = 0

    const tick = () => {
      count += 1
      setActiveCount(count)
      if (count >= total) {
        timer = setTimeout(() => {
          count = 0
          setActiveCount(0)
          timer = setTimeout(() => {
            if (running) start()
          }, 2000)
        }, 2000)
      } else {
        timer = setTimeout(tick, 2000)
      }
    }

    const start = () => {
      if (timer) clearTimeout(timer)
      count = 1
      setActiveCount(1)
      timer = setTimeout(tick, 2000)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true
            start()
          } else if (!entry.isIntersecting && running) {
            running = false
            if (timer) clearTimeout(timer)
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      running = false
      if (timer) clearTimeout(timer)
    }
  }, [steps.length])

  return (
    <ol className={styles.moduleSteps} ref={listRef} aria-label={regionLabel}>
      {steps.map((step, index) => {
        const Icon = STEP_ICONS[index] ?? Compass
        return (
          <li
            className={styles.moduleStep}
            key={step.id}
            data-active={index < activeCount ? 'true' : 'false'}
          >
            <span className={styles.moduleStepIcon} aria-hidden="true">
              <Icon aria-hidden={true} />
            </span>
            <div className={styles.moduleStepText}>
              <h3>{step.title}</h3>
              <p>{step.subtitle}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
