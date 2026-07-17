'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'

import styles from './professional-services-industry.module.css'

type ProServTab = {
  id: string
  label: string
  heading: string
  body: string
  points: readonly string[]
}

type ProfessionalServicesTabsProps = {
  tabs: readonly ProServTab[]
  tabsLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * "How we work" nav-tabs — a React recreation of the Showbiz Bootstrap nav-tabs
 * (company_overview / company_history). Both panels stay in the DOM; the
 * inactive one is `hidden` (display:none), so un-hiding a panel restarts its
 * fade-in. Full ARIA tab pattern: roving tabindex, RTL-aware arrow keys,
 * Home/End.
 */
export function ProfessionalServicesTabs({
  tabs,
  tabsLabel,
  direction,
}: ProfessionalServicesTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')
  const baseId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const order = tabs.map((tab) => tab.id)
  const tabId = (id: string) => `${baseId}-tab-${id}`
  const panelId = (id: string) => `${baseId}-panel-${id}`

  const focusTab = (id: string) => {
    setActive(id)
    tabRefs.current[id]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    const index = order.indexOf(active)
    if (event.key === forward) {
      event.preventDefault()
      focusTab(order[(index + 1) % order.length])
    } else if (event.key === backward) {
      event.preventDefault()
      focusTab(order[(index - 1 + order.length) % order.length])
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(order[0])
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(order[order.length - 1])
    }
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabListWrap}>
        <div
          className={styles.tabList}
          role="tablist"
          aria-label={tabsLabel}
          onKeyDown={onKeyDown}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId(tab.id)}
              aria-selected={active === tab.id}
              aria-controls={panelId(tab.id)}
              tabIndex={active === tab.id ? 0 : -1}
              className={styles.tab}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={styles.tabPanel}
            role="tabpanel"
            id={panelId(tab.id)}
            aria-labelledby={tabId(tab.id)}
            hidden={active !== tab.id}
            tabIndex={0}
          >
            <h3>{tab.heading}</h3>
            <p>{tab.body}</p>
            <ul className={styles.tabPoints}>
              {tab.points.map((point) => (
                <li key={point}>
                  <span className={styles.tabPointIcon} aria-hidden="true">
                    <Check />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
