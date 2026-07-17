'use client'

import { useId, useState } from 'react'
import { MapPin } from 'lucide-react'

import type { LogisticsRegion } from './logistics-supply-chain-content'
import styles from './logistics-supply-chain-industry.module.css'

type LogisticsFootprintMapProps = {
  regions: readonly LogisticsRegion[]
  canvasLabel: string
}

/**
 * Illustrative regional-delivery footprint — a React port of the Logistick
 * interactive map (pulsing location dots that reveal a card on hover/focus).
 * The canvas is an abstract CSS/SVG grid (no map imagery), each dot is a real
 * button so keyboard and pointer users both reveal the region card. The pulse
 * is CSS-driven and neutralised under prefers-reduced-motion.
 */
export function LogisticsFootprintMap({ regions, canvasLabel }: LogisticsFootprintMapProps) {
  const [active, setActive] = useState<string>(regions[0]?.id ?? '')
  const baseId = useId()
  const cardId = (id: string) => `${baseId}-card-${id}`
  const activeRegion = regions.find((region) => region.id === active) ?? regions[0]

  return (
    <div className={styles.footprint}>
      <div className={styles.footprintCanvas} role="group" aria-label={canvasLabel}>
        <span className={styles.footprintGrid} aria-hidden="true" />
        {regions.map((region) => {
          const isActive = region.id === active
          const inlineStart = `${region.x}%`
          const insetTop = `${region.y}%`
          return (
            <button
              key={region.id}
              type="button"
              className={styles.footprintDot}
              data-active={isActive ? 'true' : 'false'}
              style={{ insetInlineStart: inlineStart, insetBlockStart: insetTop }}
              aria-pressed={isActive}
              aria-describedby={isActive ? cardId(region.id) : undefined}
              onClick={() => setActive(region.id)}
              onMouseEnter={() => setActive(region.id)}
              onFocus={() => setActive(region.id)}
            >
              <span className={styles.footprintPulse} aria-hidden="true" />
              <span className={styles.footprintPin} aria-hidden="true">
                <MapPin />
              </span>
              <span className={styles.srOnly}>{region.label}</span>
            </button>
          )
        })}
      </div>

      {activeRegion ? (
        <div className={styles.footprintCard} id={cardId(activeRegion.id)} aria-live="polite">
          <span className={styles.footprintCardLabel}>{activeRegion.label}</span>
          <h3>{activeRegion.title}</h3>
          <p>{activeRegion.note}</p>
        </div>
      ) : null}
    </div>
  )
}
