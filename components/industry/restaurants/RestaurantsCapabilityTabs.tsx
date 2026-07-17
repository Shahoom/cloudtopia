'use client'

import { useId, useRef, useState, type ComponentType, type KeyboardEvent } from 'react'
import { Check, ChefHat, Gift, ShoppingBag, Truck } from 'lucide-react'

import styles from './restaurants-industry.module.css'

type CapabilityTab = {
  id: string
  label: string
  panelTitle: string
  panelBody: string
  points: readonly string[]
}

type RestaurantsCapabilityTabsProps = {
  tabs: readonly CapabilityTab[]
  tabsLabel: string
  direction: 'ltr' | 'rtl'
}

const TAB_ICONS: readonly ComponentType[] = [ShoppingBag, ChefHat, Truck, Gift]

/**
 * Foodking's combo tabbed offer port (Bootstrap `nav-tabs` → tab-pane swap).
 * A vertical icon+label tab list drives panels that fade in on select
 * (`rtPanelFade`). Full ARIA tab pattern: roving tabindex, RTL-aware arrow keys,
 * Home/End. Panels stay in the DOM; the inactive ones are `hidden` so un-hiding
 * restarts the fade — mirroring the template's tab behaviour.
 */
export function RestaurantsCapabilityTabs({
  tabs,
  tabsLabel,
  direction,
}: RestaurantsCapabilityTabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = (index: number) => `${baseId}-panel-${index}`

  const focusTab = (index: number) => {
    const next = ((index % tabs.length) + tabs.length) % tabs.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowUp' : 'ArrowDown'
    const backward = direction === 'rtl' ? 'ArrowDown' : 'ArrowUp'
    if (event.key === forward || event.key === 'ArrowRight') {
      event.preventDefault()
      focusTab(active + 1)
    } else if (event.key === backward || event.key === 'ArrowLeft') {
      event.preventDefault()
      focusTab(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(tabs.length - 1)
    }
  }

  return (
    <div className={styles.tabsLayout}>
      <div
        className={styles.tabList}
        role="tablist"
        aria-label={tabsLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, index) => {
          const Icon = TAB_ICONS[index] ?? ShoppingBag
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={active === index}
              aria-controls={panelId(index)}
              tabIndex={active === index ? 0 : -1}
              className={styles.tabButton}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => setActive(index)}
            >
              <span className={styles.tabButtonIcon} aria-hidden="true">
                <Icon />
              </span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.tabPanels}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={styles.tabPanel}
            role="tabpanel"
            id={panelId(index)}
            aria-labelledby={tabId(index)}
            hidden={active !== index}
            tabIndex={0}
          >
            <h3 className={styles.tabPanelTitle}>{tab.panelTitle}</h3>
            <p className={styles.tabPanelBody}>{tab.panelBody}</p>
            <ul className={styles.tabPanelPoints}>
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
