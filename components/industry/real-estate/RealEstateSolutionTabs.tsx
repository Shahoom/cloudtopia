'use client'

import Image from 'next/image'
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import styles from './real-estate-industry.module.css'

type SolutionCard = {
  id: string
  title: string
  description: string
  image: string
  width: number
  height: number
  tags: readonly string[]
}

type SolutionTab = {
  id: string
  label: string
  card: SolutionCard
}

type RealEstateSolutionTabsProps = {
  tabs: readonly SolutionTab[]
  tabsLabel: string
  tagsLabel: string
  direction: 'ltr' | 'rtl'
}

/**
 * Featured-Properties tabbed showcase — repurposes HouseBox's Bootstrap pill
 * tabs (For Sale / Villas / Apartments …) + per-card fade into a "solution
 * patterns" switcher. Each tab reveals one example build (a real product
 * screenshot) with capability tags instead of fake listing data, prices, or a
 * save/heart. Full ARIA tab pattern with roving tabindex and RTL-aware arrow
 * keys; the panel fades in on activation (mirroring the Swiper fade).
 */
export function RealEstateSolutionTabs({
  tabs,
  tabsLabel,
  tagsLabel,
  direction,
}: RealEstateSolutionTabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const tabId = (index: number) => `${baseId}-tab-${index}`
  const panelId = (index: number) => `${baseId}-panel-${index}`

  const focusTab = (index: number) => {
    const wrapped = ((index % tabs.length) + tabs.length) % tabs.length
    setActive(wrapped)
    tabRefs.current[wrapped]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    if (event.key === forward) {
      event.preventDefault()
      focusTab(active + 1)
    } else if (event.key === backward) {
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
    <div className={styles.solutionTabs}>
      <div className={styles.solutionTabListWrap}>
        <div
          className={styles.solutionTabList}
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
              className={styles.solutionTab}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => setActive(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={styles.solutionPanel}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          hidden={active !== index}
          tabIndex={0}
        >
          <div className={styles.solutionCard}>
            <div className={`${styles.solutionMedia} ${styles.imageAnime}`}>
              <Image
                src={tab.card.image}
                alt=""
                width={tab.card.width}
                height={tab.card.height}
                sizes="(max-width: 991px) 92vw, 46vw"
              />
            </div>
            <div className={styles.solutionBody}>
              <h3>{tab.card.title}</h3>
              <p>{tab.card.description}</p>
              <p className={styles.solutionTagsLabel}>{tagsLabel}</p>
              <ul className={styles.solutionTags}>
                {tab.card.tags.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
