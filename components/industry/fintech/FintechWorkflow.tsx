'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Cable, Code2, Compass, Rocket, Search } from 'lucide-react'

import styles from './fintech-industry.module.css'

type WorkflowStep = {
  id: string
  title: string
  subtitle: string
}

type FintechWorkflowProps = {
  steps: readonly WorkflowStep[]
  regionLabel: string
}

const STEP_ICONS: readonly ComponentType<{ 'aria-hidden'?: boolean }>[] = [
  Search,
  Compass,
  Code2,
  Cable,
  Rocket,
]

/**
 * Sequential workflow highlight — a faithful port of Paynext's
 * `workflowAnimation()`: each step activates in turn on a 2000ms cadence, the
 * whole set holds active for 2s, clears, waits 2s, then loops. The connector
 * fill (CSS ::before, height 0 -> 100% over 2s) tracks the active step.
 *
 * Runs only while the list is in view (IntersectionObserver). Under
 * prefers-reduced-motion every step is shown active with no cycling.
 */
export function FintechWorkflow({ steps, regionLabel }: FintechWorkflowProps) {
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
        // hold the completed set, then clear and restart after a pause
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
    <ol className={styles.workflowSteps} ref={listRef} aria-label={regionLabel}>
      {steps.map((step, index) => {
        const Icon = STEP_ICONS[index] ?? Search
        return (
          <li
            className={styles.workflowStep}
            key={step.id}
            data-active={index < activeCount ? 'true' : 'false'}
          >
            <span className={styles.workflowStepIcon} aria-hidden="true">
              <Icon aria-hidden={true} />
            </span>
            <div className={styles.workflowStepText}>
              <h3>{step.title}</h3>
              <p>{step.subtitle}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
