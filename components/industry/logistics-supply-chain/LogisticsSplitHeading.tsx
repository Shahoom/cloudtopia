'use client'

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from 'react'

import styles from './logistics-supply-chain-industry.module.css'

type LogisticsSplitHeadingProps = {
  text: string
  as?: ElementType
  className?: string
}

/**
 * SplitText-equivalent char-by-char heading reveal — a React/CSS port of the
 * Logistick GSAP SplitText signature (chars from y:40, opacity:0, stagger 0.05,
 * ease back.out, ScrollTrigger top 90%).
 *
 * Accessibility: the heading carries the full text via aria-label; the split
 * spans are aria-hidden so assistive tech reads the sentence once, not letter
 * by letter. SSR-safe: chars render visible ('idle') so there is no hydration
 * mismatch and no-JS/reduced-motion users see the heading immediately.
 */
export function LogisticsSplitHeading({
  text,
  as = 'h2',
  className,
}: LogisticsSplitHeadingProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle')

  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('in')
      return
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    const alreadyVisible = rect.top < viewportHeight * 0.9 && rect.bottom > 0
    if (alreadyVisible) {
      setState('in')
      return
    }

    setState('out')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState('in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  let charIndex = 0
  const wordNodes = words.map((word, wordIdx) => (
    <span className={styles.splitWordWrap} aria-hidden="true" key={`${word}-${wordIdx}`}>
      <span className={styles.splitWord}>
        {Array.from(word).map((char, ci) => {
          const delay = charIndex * 0.03
          charIndex += 1
          return (
            <span
              className={styles.splitChar}
              style={{ transitionDelay: `${delay}s` }}
              key={ci}
            >
              {char}
            </span>
          )
        })}
      </span>
      {wordIdx < words.length - 1 ? ' ' : null}
    </span>
  ))

  return createElement(
    as,
    {
      ref,
      className: [styles.splitHeading, className].filter(Boolean).join(' '),
      'data-split': state,
      'aria-label': text,
    },
    wordNodes,
  )
}
