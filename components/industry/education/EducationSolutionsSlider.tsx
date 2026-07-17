'use client'

import { useCallback, useRef, type ComponentType } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  MonitorPlay,
  UserPlus,
  Video,
} from 'lucide-react'

import type { Locale } from '@/lib/i18n/config'
import styles from './education-industry.module.css'

type Solution = {
  id: string
  title: string
  subtitle: string
  includes: readonly string[]
}

type EducationSolutionsSliderProps = {
  solutions: readonly Solution[]
  includesLabel: string
  prevLabel: string
  nextLabel: string
  direction: 'ltr' | 'rtl'
  locale: Locale
}

const SOLUTION_ICONS: Record<string, ComponentType<{ 'aria-hidden'?: boolean }>> = {
  lms: MonitorPlay,
  sis: GraduationCap,
  assessment: ClipboardCheck,
  classroom: Video,
  enrollment: UserPlus,
  admin: LayoutDashboard,
}

/**
 * Solution-patterns slider — a React port of Learnit's arrow-nav courses Swiper
 * (loop, prev/next arrows). Implemented as a scroll-snap track scrolled one card
 * at a time by the prev/next controls. RTL-aware: the arrow glyphs and the
 * scroll direction both mirror so "next" always advances forward. Native scroll
 * keeps it keyboard- and touch-usable, and horizontal overflow scrolls inside
 * this track only (never the page body). Smooth scroll is dropped under
 * prefers-reduced-motion.
 *
 * The template's price tag, fake author avatar, and star rating are dropped;
 * each card instead lists what the pattern includes.
 */
export function EducationSolutionsSlider({
  solutions,
  includesLabel,
  prevLabel,
  nextLabel,
  direction,
}: EducationSolutionsSliderProps) {
  const trackRef = useRef<HTMLUListElement | null>(null)

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      const firstCard = track.querySelector<HTMLElement>('[data-solution-card]')
      const step = firstCard ? firstCard.offsetWidth + 24 : track.clientWidth * 0.8
      const sign = direction === 'rtl' ? -1 : 1
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      track.scrollBy({
        left: step * dir * sign,
        behavior: reduce ? 'auto' : 'smooth',
      })
    },
    [direction],
  )

  const Prev = direction === 'rtl' ? ArrowRight : ArrowLeft
  const Next = direction === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <div className={styles.solutionsSlider}>
      <ul className={styles.solutionsTrack} ref={trackRef}>
        {solutions.map((solution) => {
          const Icon = SOLUTION_ICONS[solution.id] ?? MonitorPlay
          return (
            <li className={styles.solutionCard} data-solution-card key={solution.id}>
              <span className={styles.solutionIcon} aria-hidden="true">
                <Icon aria-hidden={true} />
              </span>
              <h3>{solution.title}</h3>
              <p className={styles.solutionSubtitle}>{solution.subtitle}</p>
              <p className={styles.solutionIncludesLabel}>{includesLabel}</p>
              <ul className={styles.solutionIncludes}>
                {solution.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      <div className={styles.solutionsNav}>
        <button
          type="button"
          className={styles.solutionsArrow}
          aria-label={prevLabel}
          onClick={() => scrollByCard(-1)}
        >
          <Prev aria-hidden={true} />
        </button>
        <button
          type="button"
          className={styles.solutionsArrow}
          aria-label={nextLabel}
          onClick={() => scrollByCard(1)}
        >
          <Next aria-hidden={true} />
        </button>
      </div>
    </div>
  )
}
