'use client'

import { useState } from 'react'
import {
  BarChart3,
  CreditCard,
  Plus,
  Store,
  Truck,
  Wand2,
  type LucideIcon,
} from 'lucide-react'

import styles from './ecommerce-retail-industry.module.css'

type StretchPanel = {
  id: string
  number: string
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
 * Panels ship as palette gradients rather than the template's product photos.
 * This is a deliberate, re-checked call, not an omission:
 *   - An inactive panel collapses to ~13% of the row (132px at the 992px
 *     breakpoint) by 460px tall. Every licensed shot here is a people-photo, and
 *     a centre crop that narrow slices a face in half.
 *   - The set is 4 photos for 5 panels, so one repeat inside a single visible
 *     row is unavoidable.
 *   - The only two shots that suit a dark band (-3 blue racking, -4 boutique)
 *     are already the flagship panels two sections up. Of the rest, -1 is
 *     high-key near-white and blows a hole in the #2a2d33 band, and -2 is
 *     dominated by orange racking that fights this world's monochrome + one
 *     brand blue palette.
 *   - Photo-on-active-only would leave the resting row — the state a reader
 *     actually lands on — exactly as flat as it was.
 * So the panels earn their keep on depth instead: a continuous tonal descent
 * (each panel's end stop is the next panel's start stop) so the five read as one
 * connected stack, hairline separators so they stay distinct, and a layer
 * ordinal. The icon + label + number stay legible at any width.
 *
 * The reduced-motion kill switch removes the width/transform transitions,
 * leaving an instant, legible expand.
 *
 * SSR-safe: with no active index every panel shows at its neutral width and all
 * captions are present in the DOM for assistive tech.
 */
const PANEL_ICONS: readonly LucideIcon[] = [Store, CreditCard, Truck, BarChart3, Wand2]

/* Storefront (closest to the shopper) descends to Data (the foundation). White
 * label over the lightest stop + the 30% rest scrim measures 5.86:1; the darkest
 * lands on 13.46:1 — all AA at the 16px/600 label size. */
const PANEL_GRADIENTS = [
  'linear-gradient(160deg, #3a80cc 0%, #2e73bb 100%)',
  'linear-gradient(160deg, #2e73bb 0%, #2867a8 100%)',
  'linear-gradient(160deg, #2867a8 0%, #245a92 100%)',
  'linear-gradient(160deg, #245a92 0%, #1f4d7d 100%)',
  'linear-gradient(160deg, #1f4d7d 0%, #253042 100%)',
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
            <span className={styles.stretcherNumber} aria-hidden="true">
              {panel.number}
            </span>
            <span className={styles.stretcherRest} aria-hidden="true">
              <span className={styles.stretcherIcon}>
                <Icon aria-hidden="true" />
              </span>
              <span className={styles.stretcherLabel}>{panel.label}</span>
              <span className={styles.stretcherHint}>
                <Plus aria-hidden="true" />
              </span>
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
