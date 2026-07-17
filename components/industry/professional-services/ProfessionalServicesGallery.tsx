'use client'

import { useMemo, useState, type ComponentType } from 'react'
import { BarChart3, FileCheck, LayoutGrid, Users, Workflow } from 'lucide-react'

import styles from './professional-services-industry.module.css'

type ProServPattern = {
  id: string
  filterId: string
  title: string
  subtitle: string
  imageAlt: string
}

type ProServFilter = {
  id: string
  label: string
}

type ProfessionalServicesGalleryProps = {
  filters: readonly ProServFilter[]
  patterns: readonly ProServPattern[]
  allLabel: string
  filterLabel: string
}

const FILTER_ICONS: Record<string, ComponentType<{ 'aria-hidden'?: boolean }>> = {
  portals: LayoutGrid,
  automation: Workflow,
  crm: Users,
  analytics: BarChart3,
}

/**
 * "Example solution patterns" — a React recreation of the Showbiz cubeportfolio
 * filterable masonry. Filter buttons form a toggle group (aria-pressed); the
 * grid re-flows to the active system type. Patterns that do not match are
 * removed from the accessibility tree (hidden), and the matching tiles animate
 * in. Reduced-motion users get instant, non-animated re-flows via the CSS kill
 * switch.
 *
 * These tiles are architecture archetypes with no claimed client imagery — the
 * image slot is intentionally left for the imagery pass; each tile renders a
 * designed, labelled placeholder rather than a gray dimension box.
 */
export function ProfessionalServicesGallery({
  filters,
  patterns,
  allLabel,
  filterLabel,
}: ProfessionalServicesGalleryProps) {
  const [active, setActive] = useState<string>('all')

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: patterns.length }
    for (const filter of filters) {
      map[filter.id] = patterns.filter((pattern) => pattern.filterId === filter.id).length
    }
    return map
  }, [filters, patterns])

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryFilters} role="group" aria-label={filterLabel}>
        <button
          type="button"
          className={styles.galleryFilterBtn}
          aria-pressed={active === 'all'}
          onClick={() => setActive('all')}
        >
          <span>{allLabel}</span>
          <span className={styles.galleryFilterCount}>{counts.all}</span>
        </button>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.galleryFilterBtn}
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            <span>{filter.label}</span>
            <span className={styles.galleryFilterCount}>{counts[filter.id] ?? 0}</span>
          </button>
        ))}
      </div>

      <ul className={styles.galleryGrid}>
        {patterns.map((pattern) => {
          const visible = active === 'all' || pattern.filterId === active
          const Icon = FILTER_ICONS[pattern.filterId] ?? FileCheck
          return (
            <li
              key={pattern.id}
              className={styles.galleryItem}
              data-visible={visible ? 'true' : 'false'}
              hidden={!visible}
            >
              {/* TODO(imagery-pass): real architecture screenshot goes here;
                  intentionally a designed labelled tile, not a placeholder box. */}
              <div className={styles.galleryThumb} role="img" aria-label={pattern.imageAlt}>
                <span className={styles.galleryThumbIcon} aria-hidden="true">
                  <Icon aria-hidden={true} />
                </span>
              </div>
              <div className={styles.galleryText}>
                <h3>{pattern.title}</h3>
                <p>{pattern.subtitle}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
