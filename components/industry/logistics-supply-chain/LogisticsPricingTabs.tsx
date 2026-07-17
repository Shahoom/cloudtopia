'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'

import styles from './logistics-supply-chain-industry.module.css'

type LogisticsPlan = {
  id: string
  plan: string
  meta: string
  features: readonly string[]
  popular: boolean
  badge?: string
}

type LogisticsPricingTabsProps = {
  projectLabel: string
  retainerLabel: string
  projectPlans: readonly LogisticsPlan[]
  retainerPlans: readonly LogisticsPlan[]
  tabsLabel: string
  ctaLabel: string
  whatsappHref: string
  direction: 'ltr' | 'rtl'
}

type TabKey = 'project' | 'retainer'

/**
 * Monthly/Yearly-style pricing tabs, repurposed to CloudTopia engagement models
 * (Project / Retainer). Both panels stay in the DOM; the inactive one is hidden
 * (display:none via `hidden`), so un-hiding a panel restarts its fade. Full ARIA
 * tab pattern with roving tabindex and RTL-aware arrow keys.
 */
export function LogisticsPricingTabs({
  projectLabel,
  retainerLabel,
  projectPlans,
  retainerPlans,
  tabsLabel,
  ctaLabel,
  whatsappHref,
  direction,
}: LogisticsPricingTabsProps) {
  const [active, setActive] = useState<TabKey>('project')
  const baseId = useId()
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    project: null,
    retainer: null,
  })

  const order: TabKey[] = ['project', 'retainer']
  const tabId = (key: TabKey) => `${baseId}-tab-${key}`
  const panelId = (key: TabKey) => `${baseId}-panel-${key}`

  const focusTab = (key: TabKey) => {
    setActive(key)
    tabRefs.current[key]?.focus()
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

  const renderPanel = (key: TabKey, plans: readonly LogisticsPlan[]) => (
    <div
      className={styles.pricingPanel}
      role="tabpanel"
      id={panelId(key)}
      aria-labelledby={tabId(key)}
      hidden={active !== key}
      tabIndex={0}
    >
      <div className={styles.pricingGrid}>
        {plans.map((plan) => (
          <div
            className={`${styles.priceCard} ${plan.popular ? styles.priceCardPopular : ''}`}
            key={plan.id}
          >
            <div className={styles.priceHead}>
              <div className={styles.priceHeadTop}>
                <h3>{plan.plan}</h3>
                {plan.badge ? <span className={styles.offerBadge}>{plan.badge}</span> : null}
              </div>
              <p className={styles.priceMeta}>{plan.meta}</p>
            </div>
            <ul className={styles.priceFeatures}>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className={styles.priceFeatureIcon} aria-hidden="true">
                    <Check />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a className={styles.pricingBtn} href={whatsappHref}>
              <span>{ctaLabel}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={styles.pricingTabs}>
      <div className={styles.pricingTabListWrap}>
        <div
          className={styles.pricingTabList}
          role="tablist"
          aria-label={tabsLabel}
          onKeyDown={onKeyDown}
        >
          {order.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={tabId(key)}
              aria-selected={active === key}
              aria-controls={panelId(key)}
              tabIndex={active === key ? 0 : -1}
              className={styles.pricingTab}
              ref={(el) => {
                tabRefs.current[key] = el
              }}
              onClick={() => setActive(key)}
            >
              {key === 'project' ? projectLabel : retainerLabel}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.pricingPanels}>
        {renderPanel('project', projectPlans)}
        {renderPanel('retainer', retainerPlans)}
      </div>
    </div>
  )
}
