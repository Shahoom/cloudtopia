'use client'

import { useState, type ComponentType } from 'react'
import {
  Accessibility,
  BarChart3,
  BookOpen,
  Plug,
  Smartphone,
  Sparkles,
} from 'lucide-react'

import styles from './education-industry.module.css'

type Topic = {
  id: string
  title: string
  descriptor: string
}

type EducationTopicGridProps = {
  topics: readonly Topic[]
}

const TOPIC_ICONS: Record<string, ComponentType<{ 'aria-hidden'?: boolean }>> = {
  curriculum: BookOpen,
  analytics: BarChart3,
  integrations: Plug,
  mobile: Smartphone,
  'ai-support': Sparkles,
  compliance: Accessibility,
}

/**
 * Capability-domain grid — a React port of Learnit's topic tiles, where a single
 * tile carries the green `.active` fill at a time and hovering swaps it (the
 * template's jQuery `.topic__item` hover handler). The first tile is active by
 * default; pointer hover moves the highlight and the container reset returns it.
 *
 * The title and descriptor are always visible regardless of active state, so no
 * information depends on hover — the highlight is a purely visual enhancement,
 * which keeps the tiles accessible without making non-interactive cards
 * focusable.
 */
export function EducationTopicGrid({ topics }: EducationTopicGridProps) {
  const [activeId, setActiveId] = useState<string>(topics[0]?.id ?? '')

  return (
    <ul
      className={styles.topicsGrid}
      onMouseLeave={() => setActiveId(topics[0]?.id ?? '')}
    >
      {topics.map((topic) => {
        const Icon = TOPIC_ICONS[topic.id] ?? BookOpen
        return (
          <li
            className={styles.topicTile}
            key={topic.id}
            data-active={topic.id === activeId ? 'true' : 'false'}
            onMouseEnter={() => setActiveId(topic.id)}
          >
            <span className={styles.topicIcon} aria-hidden="true">
              <Icon aria-hidden={true} />
            </span>
            <div className={styles.topicText}>
              <h3>{topic.title}</h3>
              <p>{topic.descriptor}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
