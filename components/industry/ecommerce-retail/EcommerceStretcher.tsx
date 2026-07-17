'use client'

import { useState } from 'react'
import {
  BarChart3,
  CreditCard,
  Store,
  Truck,
  Wand2,
  type LucideIcon,
} from 'lucide-react'

import styles from './ecommerce-retail-industry.module.css'

type StretchPanel = {
  id: string
  label: string
  title: string
  description: string
}

type EcommerceStretcherProps = {
  panels: readonly StretchPanel[]
  regionLabel: string
}

/**
 * Stretcher horizontal hover-accordion port. Faithful to Lager's stretcher: the
 * hovered panel gets `active` (grows to 38% on desktop) and its siblings get
 * `inactive` (shrink to 18%), transitioning `all 0.5s`, while a figure caption
 * slides up via translate3d. Keyboard users reach each panel through a full-area
 * button that mirrors the hover state on focus.
 *
 * Panels ship as palette gradients rather than the template's product photos:
 * an inactive panel collapses to roughly 18% of the row (~130px wide), where a
 * photo is unreadable mush, whereas the icon + label stay legible at any width.
 * The reduced-motion kill switch removes the width/transform transitions,
 * leaving an instant, legible expand.
 *
 * SSR-safe: with no active index every panel shows at its neutral width and all
 * captions are present in the DOM for assistive tech.
 */
const PANEL_ICONS: readonly LucideIcon[] = [Store, CreditCard, Truck, BarChart3, Wand2]

const PANEL_GRADIENTS = [
  'linear-gradient(160deg, #2e73bb 0%, #245a92 100%)',
  'linear-gradient(160deg, #245a92 0%, #1f4f80 100%)',
  'linear-gradient(160deg, #3078c3 0%, #2e73bb 100%)',
  'linear-gradient(160deg, #1f4f80 0%, #33363d 100%)',
  'linear-gradient(160deg, #2b6bad 0%, #245a92 100%)',
] as const

export function EcommerceStretcher({ panels, regionLabel }: EcommerceStretcherProps) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className={styles.stretcher}
      role="group"
      aria-label={regionLabel}
      onMouseLeave={() => setActive(null)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActive(null)
        }
      }}
    >
      {panels.map((panel, index) => {
        const Icon = PANEL_ICONS[index % PANEL_ICONS.length]
        const state =
          active === null ? 'neutral' : index === active ? 'active' : 'inactive'
        return (
          <div
            key={panel.id}
            className={styles.stretcherItem}
            data-state={state}
            style={{ backgroundImage: PANEL_GRADIENTS[index % PANEL_GRADIENTS.length] }}
            onMouseEnter={() => setActive(index)}
          >
            <span className={styles.stretcherRest} aria-hidden="true">
              <span className={styles.stretcherIcon}>
                <Icon aria-hidden="true" />
              </span>
              <span className={styles.stretcherLabel}>{panel.label}</span>
            </span>
            <figure className={styles.stretcherFigure}>
              <h3>{panel.title}</h3>
              <p>{panel.description}</p>
            </figure>
            <button
              type="button"
              className={styles.stretcherTrigger}
              aria-label={panel.title}
              onFocus={() => setActive(index)}
            />
          </div>
        )
      })}
    </div>
  )
}
