'use client'

import { useState } from 'react'

import styles from './ecommerce-retail-industry.module.css'

type TabItem = {
  id: string
  label: string
  headline: string
  description: string
}

type EcommerceTabsyProps = {
  tabs: readonly TabItem[]
  hint: string
  regionLabel: string
}

/**
 * Tabsy hover-swap port. Faithful to Lager's tabsy interaction: hovering (or,
 * for keyboard users, focusing) a discipline link cross-fades the full-bleed
 * background layer and swaps the overlaid headline via a `current` state.
 *
 * The template applied a distinct product photo per layer. These six
 * disciplines have no honest photo apiece: the licensed set is four
 * retail/fulfilment scenes — all already carrying the hero and the flagship
 * panels — and none of them depicts "payments" or "loyalty". Backing two tabs
 * with the same file would also make the signature cross-fade visibly do
 * nothing. So each layer stays a palette-driven gradient (abstract, not a
 * fabricated product shot). The cross-fade is a CSS opacity transition that the
 * reduced-motion kill switch neutralises to an instant swap.
 *
 * SSR-safe: the first discipline is current by default and fully legible with
 * no JS.
 */
const LAYER_GRADIENTS = [
  'linear-gradient(120deg, #245a92 0%, #2e73bb 100%)',
  'linear-gradient(120deg, #2e73bb 0%, #3078c3 100%)',
  'linear-gradient(120deg, #1f4f80 0%, #2e73bb 100%)',
  'linear-gradient(120deg, #2b6bad 0%, #245a92 100%)',
  'linear-gradient(120deg, #3078c3 0%, #1f4f80 100%)',
  'linear-gradient(120deg, #245a92 0%, #33363d 100%)',
] as const

export function EcommerceTabsy({ tabs, hint, regionLabel }: EcommerceTabsyProps) {
  const [current, setCurrent] = useState(0)
  const activate = (index: number) => setCurrent(index)

  return (
    <div className={styles.tabsy} aria-label={regionLabel} role="group">
      <div className={styles.tabsyStage}>
        {tabs.map((tab, index) => (
          <span
            key={tab.id}
            className={styles.tabsyLayer}
            data-current={index === current ? 'true' : 'false'}
            style={{ backgroundImage: LAYER_GRADIENTS[index % LAYER_GRADIENTS.length] }}
            aria-hidden="true"
          />
        ))}
        <div className={styles.tabsyOverlay}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={styles.tabsyCopy}
              data-current={index === current ? 'true' : 'false'}
              aria-hidden={index === current ? undefined : 'true'}
            >
              <h3>{tab.headline}</h3>
              <p>{tab.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tabsyLinks}>
        <span className={styles.tabsyHint} aria-hidden="true">
          {hint}
        </span>
        <div className={styles.tabsyLinksRow}>
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={tab.id}
              className={styles.tabsyLink}
              data-current={index === current ? 'true' : 'false'}
              aria-pressed={index === current}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
