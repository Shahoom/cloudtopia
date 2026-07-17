'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'

import styles from './legal-firms-industry.module.css'

type LegalTab = {
  id: string
  label: string
  body: string
}

type LegalTabsProps = {
  tabs: readonly LegalTab[]
  tabsLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * Regalis de-tab (Our Mission / Vision / Values) reproduced as a full ARIA tab
 * pattern: roving tabindex, RTL-aware arrow keys, Home/End, and a fade on panel
 * switch (see .tabPanel keyframes). All panels stay in the DOM; the inactive
 * ones are `hidden`, so re-showing a panel restarts its fade.
 */
export function LegalTabs({ tabs, tabsLabel, direction }: LegalTabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = (index: number) => `${baseId}-panel-${index}`

  const focusTab = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    if (event.key === forward) {
      event.preventDefault()
      focusTab((active + 1) % tabs.length)
    } else if (event.key === backward) {
      event.preventDefault()
      focusTab((active - 1 + tabs.length) % tabs.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(tabs.length - 1)
    }
  }

  return (
    <div className={styles.tabs}>
      <div
        className={styles.tabList}
        role="tablist"
        aria-label={tabsLabel}
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, index) => (
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
            {tab.label}
          </button>
        ))}
      </div>
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
          <p>{tab.body}</p>
        </div>
      ))}
    </div>
  )
}
