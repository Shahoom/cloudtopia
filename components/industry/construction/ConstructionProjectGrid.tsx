'use client'

import { useState } from 'react'
import { ArrowUpLeft, ArrowUpRight, Layers } from 'lucide-react'

import styles from './construction-industry.module.css'

type ConstructionFilter = {
  id: string
  label: string
}

type ConstructionProject = {
  id: string
  sector: string
  sectorLabel: string
  title: string
  subtitle: string
}

type ConstructionProjectGridProps = {
  filters: readonly ConstructionFilter[]
  projects: readonly ConstructionProject[]
  filterLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * Isotope-style filterable grid — a React port of the template's stamped filter
 * menu + masonry grid. Filter buttons swap the active sector; non-matching cards
 * drop out of the grid (display:none) and the remaining cards re-lay-out. The
 * "transitionDuration 1s" re-layout feel is reproduced by replaying the card
 * entrance animation on each filter change (cards are keyed by the active filter).
 * Each card carries a caption that slides up on hover (template `.image-hover-block`).
 *
 * Filter buttons are real <button>s with aria-pressed; the grid is a labelled
 * group. Under prefers-reduced-motion the entrance/hover motion is neutralised by
 * the stylesheet kill switch.
 */
export function ConstructionProjectGrid({
  filters,
  projects,
  filterLabel,
  direction,
}: ConstructionProjectGridProps) {
  const [active, setActive] = useState('*')
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight

  return (
    <div className={styles.projectFilterWrap}>
      <div className={styles.projectFilters} role="group" aria-label={filterLabel}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.projectFilterBtn}
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <ul className={styles.projectGrid}>
        {projects.map((project) => {
          const visible = active === '*' || project.sector === active
          return (
            <li
              key={`${project.id}-${active}`}
              className={styles.projectItem}
              data-hidden={visible ? 'false' : 'true'}
              hidden={!visible}
            >
              <article className={styles.projectCard}>
                <span className={styles.projectSector}>{project.sectorLabel}</span>
                <span className={styles.projectIcon} aria-hidden="true">
                  <Layers />
                </span>
                <div className={styles.projectCaption}>
                  <h3>{project.title}</h3>
                  <p>
                    {project.subtitle}
                    <Arrow aria-hidden="true" />
                  </p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
