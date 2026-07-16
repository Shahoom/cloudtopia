'use client'

import { useRef, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUpLeft, ArrowUpRight, CheckCircle2, Sparkles, Workflow } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { localePath } from '@/lib/i18n/url'
import type { IndustriesPageContent, IndustriesPageItem } from '@/lib/seo/industries-page'
import styles from './industries-page.module.css'

type IndustryAtlasHeroProps = {
  content: IndustriesPageContent
  locale: string
  selected: IndustriesPageItem
  onSelect: (slug: string) => void
  reducedMotion: boolean | null
}

export function IndustryAtlasHero({ content, locale, selected, onSelect, reducedMotion }: IndustryAtlasHeroProps) {
  const sectorRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = Math.max(0, content.industries.findIndex((industry) => industry.slug === selected.slug))
  const featuredStory = content.featuredStories.find((story) => story.slug === selected.slug)
  const isRTL = content.locale === 'ar'
  const DirectionalArrow = isRTL ? ArrowUpLeft : ArrowUpRight
  const systemCopy = featuredStory?.system || selected.useCases[0]?.description || selected.description
  const outcomeCopy = featuredStory?.outcome || selected.useCases[1]?.description || selected.description

  function selectIndex(index: number) {
    const normalized = (index + content.industries.length) % content.industries.length
    onSelect(content.industries[normalized].slug)
    sectorRefs.current[normalized]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') return selectIndex(0)
    if (event.key === 'End') return selectIndex(content.industries.length - 1)
    const direction = event.key === 'ArrowRight' ? 1 : -1
    selectIndex(selectedIndex + (isRTL ? -direction : direction))
  }

  return (
    <section className={styles.atlasHero} aria-label={content.network.label} data-header-theme="light">
      <div className={styles.atlasHeroInner}>
        <div className={styles.atlasHeroCopy}>
          <p className={styles.atlasEyebrow}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {content.hero.eyebrow}
          </p>
          <h1 className={styles.atlasHeroTitle}>
            {content.hero.title}{' '}
            <strong>{content.hero.accent}</strong>
          </h1>
          <p className={styles.atlasHeroDescription}>{content.hero.description}</p>
          <div className={styles.atlasHeroActions}>
            <a href="#industry-atlas" className={styles.atlasPrimaryButton}>
              {content.hero.primary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#industry-consultation" className={styles.atlasSecondaryButton}>
              {content.hero.secondary}
            </a>
          </div>
        </div>

      </div>

      <div id="industry-atlas" className={styles.atlasExplorer}>
        <div
          role="list"
          className={styles.atlasSectorIndex}
          aria-label={content.network.label}
          onKeyDown={handleKeyDown}
        >
          {content.industries.map((industry, index) => {
            const isActive = industry.slug === selected.slug
            return (
              <div key={industry.slug} role="listitem" className={styles.atlasSectorItem}>
                <button
                  ref={(node) => { sectorRefs.current[index] = node }}
                  type="button"
                  aria-label={industry.name}
                  aria-pressed={isActive}
                  aria-controls="industry-atlas-selection"
                  onClick={() => onSelect(industry.slug)}
                  className={`${styles.atlasSectorButton} ${isActive ? styles.atlasSectorButtonActive : ''}`}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{industry.name}</span>
                </button>
              </div>
            )
          })}
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.article
            key={selected.slug}
            id="industry-atlas-selection"
            role="region"
            aria-live="polite"
            aria-labelledby="industry-atlas-selection-title"
            className={styles.atlasSelection}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <div className={styles.atlasSelectionTitle}>
              <span>{content.network.activeLabel} / {selected.workflow}</span>
              <h2 id="industry-atlas-selection-title">{selected.name}</h2>
            </div>

            <div className={styles.atlasSelectionFacts}>
              <div>
                <span><Workflow className="h-4 w-4" aria-hidden="true" />{content.workbench.pressureLabel}</span>
                <p>{featuredStory?.pressure || selected.problems[0]}</p>
              </div>
              <div>
                <span><Sparkles className="h-4 w-4" aria-hidden="true" />{content.workbench.systemLabel}</span>
                <p>{systemCopy}</p>
              </div>
              <div>
                <span><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{content.workbench.outcomeLabel}</span>
                <p>{outcomeCopy}</p>
              </div>
            </div>

            <div className={styles.atlasSelectionFooter}>
              <div className={styles.atlasServiceLinks}>
                {selected.serviceLinks.slice(0, 3).map((service) => (
                  <Link key={service.href} href={localePath(locale, service.href)}>{service.label}</Link>
                ))}
              </div>
              <Link href={localePath(locale, `/industries/${selected.slug}`)} className={styles.atlasExploreLink}>
                {content.network.exploreLabel}
                <DirectionalArrow className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
