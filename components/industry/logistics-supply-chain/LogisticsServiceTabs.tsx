'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'

import { LOGISTICS_ICONS } from './logistics-icons'
import type { LogisticsDomain } from './logistics-supply-chain-content'
import styles from './logistics-supply-chain-industry.module.css'

type LogisticsServiceTabsProps = {
  domains: readonly LogisticsDomain[]
  tabsLabel: string
  leadLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * Vertical pill service tabs — a React port of the Logistick dark service-tab
 * panel (left vertical pill list, right benefit + feature checklist). Full ARIA
 * vertical tab pattern: roving tabindex, Up/Down (+ RTL-aware Left/Right) arrow
 * navigation, Home/End, and one visible panel per selection.
 */
export function LogisticsServiceTabs({
  domains,
  tabsLabel,
  leadLabel,
  direction,
}: LogisticsServiceTabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = (index: number) => `${baseId}-panel-${index}`

  const focusTab = (index: number) => {
    const next = (index + domains.length) % domains.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    if (event.key === 'ArrowDown' || event.key === forward) {
      event.preventDefault()
      focusTab(active + 1)
    } else if (event.key === 'ArrowUp' || event.key === backward) {
      event.preventDefault()
      focusTab(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(domains.length - 1)
    }
  }

  return (
    <div className={styles.serviceTabs}>
      <div
        className={styles.serviceTabList}
        role="tablist"
        aria-label={tabsLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {domains.map((domain, index) => {
          const Icon = LOGISTICS_ICONS[domain.icon]
          return (
            <button
              key={domain.id}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={active === index}
              aria-controls={panelId(index)}
              tabIndex={active === index ? 0 : -1}
              className={styles.serviceTab}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => setActive(index)}
            >
              <span className={styles.serviceTabIcon} aria-hidden="true">
                <Icon />
              </span>
              <span>{domain.label}</span>
            </button>
          )
        })}
      </div>

      <div>
        {domains.map((domain, index) => (
          <div
            key={domain.id}
            className={styles.serviceTabPanel}
            role="tabpanel"
            id={panelId(index)}
            aria-labelledby={tabId(index)}
            hidden={active !== index}
            tabIndex={0}
          >
            <p className={styles.serviceTabLead}>{domain.lead}</p>
            <p className={styles.serviceTabLeadLabel}>{leadLabel}</p>
            <ul className={styles.serviceTabFeatures}>
              {domain.features.map((feature) => (
                <li key={feature}>
                  <span className={styles.serviceTabCheck} aria-hidden="true">
                    <Check />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
