'use client'

import { createElement, useEffect, useRef, useState } from 'react'

import styles from './real-estate-industry.module.css'

type HeadingTag = 'h1' | 'h2' | 'h3'

type RealEstateSplitHeadingProps = {
  text: string
  as?: HeadingTag
  className?: string
  dir: 'ltr' | 'rtl'
  id?: string
}

/**
 * GSAP SplitText headline reveal — a faithful React port of HouseBox's
 * `.text-anime-style-3` animator: every heading splits into chars pre-set to
 * { opacity: 0, x: 50 }, then rise/settle to { x: 0, opacity: 1 } with an
 * easeOutBack curve and a 0.02s per-char stagger, fired when the heading scrolls
 * to `top 90%` of the viewport.
 *
 * SSR-safe: the server render and first client render output the plain heading
 * text, so no-JS users and hydration both see the full, selectable heading.
 * Only after mount (and only when motion is allowed) do we split it into
 * per-char spans. The full text is preserved as the heading's accessible name
 * via aria-label; the generated char spans are aria-hidden. Under
 * prefers-reduced-motion the heading is never split and stays static.
 */
export function RealEstateSplitHeading({
  text,
  as = 'h2',
  className,
  dir,
  id,
}: RealEstateSplitHeadingProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [split, setSplit] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Build word/char spans once, mirroring SplitText's "lines,words,chars".
    node.setAttribute('aria-label', text)
    node.textContent = ''
    node.style.setProperty('--re-split-x', dir === 'rtl' ? '-50px' : '50px')

    let charIndex = 0
    const words = text.split(' ')
    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span')
      wordSpan.className = styles.splitWord
      wordSpan.setAttribute('aria-hidden', 'true')
      for (const char of Array.from(word)) {
        const charSpan = document.createElement('span')
        charSpan.className = styles.splitChar
        charSpan.textContent = char
        charSpan.style.transitionDelay = `${(charIndex * 0.02).toFixed(2)}s`
        charIndex += 1
        wordSpan.appendChild(charSpan)
      }
      node.appendChild(wordSpan)
      if (wordIdx < words.length - 1) {
        node.appendChild(document.createTextNode(' '))
      }
    })

    node.dataset.split = 'out'
    setSplit(true)

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const rect = node.getBoundingClientRect()
    // start: "top 90%" — reveal once the heading top rises above 90% of the view.
    if (rect.top < viewportHeight * 0.9) {
      node.dataset.split = 'in'
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.dataset.split = 'in'
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
    // Intentionally run once on mount; text/dir are stable per heading instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createElement(
    as,
    {
      ref,
      id,
      dir,
      className: [styles.splitHeading, className].filter(Boolean).join(' '),
      'data-split-ready': split ? 'true' : undefined,
    },
    text,
  )
}
