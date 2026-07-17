'use client'

import Image from 'next/image'
import {
  useEffect,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import styles from './legal-firms-industry.module.css'
import type { LegalCasePattern } from './legal-firms-content'

type LegalCaseCarouselProps = {
  cards: readonly LegalCasePattern[]
  direction: 'ltr' | 'rtl'
  regionLabel: string
  previousLabel: string
  nextLabel: string
}

type TrackStyle = CSSProperties & {
  '--legal-slide-offset': number
  '--legal-slide-direction': number
}

type CarouselPhase = 'idle' | 'next' | 'previous-prep' | 'previous' | 'reset'

export function wrapCarouselIndex(index: number, length: number) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

// Rotating the full deck (not a windowed slice) guarantees the track always
// renders all N cards, so the sliding transform can never expose an empty tail.
export function orderCarouselCards<T>(cards: readonly T[], startIndex: number): T[] {
  if (cards.length === 0) return []
  const wrappedIndex = wrapCarouselIndex(startIndex, cards.length)
  return [...cards.slice(wrappedIndex), ...cards.slice(0, wrappedIndex)]
}

/**
 * Owl Carousel 2 center-mode replacement (Regalis `.owl-2-cols-center`): the
 * active pattern sits centred with adjacent cards peeking, a custom circular
 * prev/next nav, and image zoom on hover (CSS `scale` — see .caseImg). One card
 * advances per activation; the deck wraps. SSR-safe (no windowing) and fully
 * keyboard/`aria-live` accessible. RTL flips the travel direction and the nav
 * icons.
 */
export function LegalCaseCarousel({
  cards,
  direction,
  regionLabel,
  previousLabel,
  nextLabel,
}: LegalCaseCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const [phase, setPhase] = useState<CarouselPhase>('idle')
  const PreviousIcon = direction === 'rtl' ? ArrowRight : ArrowLeft
  const NextIcon = direction === 'rtl' ? ArrowLeft : ArrowRight
  const orderedCards = orderCarouselCards(cards, startIndex)
  const activeCard = cards[startIndex]
  const slideOffset = phase === 'next' || phase === 'previous-prep' ? 1 : 0
  const shouldAnimate = phase === 'next' || phase === 'previous'
  const trackStyle: TrackStyle = {
    '--legal-slide-offset': slideOffset,
    '--legal-slide-direction': direction === 'rtl' ? 1 : -1,
  }

  useEffect(() => {
    if (phase !== 'previous-prep' && phase !== 'reset') return

    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setPhase(phase === 'previous-prep' ? 'previous' : 'idle')
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [phase])

  const previous = () => {
    if (phase !== 'idle' || cards.length < 2) return
    setStartIndex((current) => wrapCarouselIndex(current - 1, cards.length))
    setPhase('previous-prep')
  }

  const next = () => {
    if (phase !== 'idle' || cards.length < 2) return
    setPhase('next')
  }

  const finishSlide = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target || event.propertyName !== 'transform') return

    if (phase === 'next') {
      setStartIndex((current) => wrapCarouselIndex(current + 1, cards.length))
      setPhase('reset')
    } else if (phase === 'previous') {
      setPhase('idle')
    }
  }

  return (
    <div
      className={styles.caseCarousel}
      data-carousel-direction={direction}
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {activeCard
          ? `${String(startIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}: ${activeCard.title}`
          : ''}
      </p>
      <div className={styles.caseViewport}>
        <div
          className={styles.caseTrack}
          data-animate={shouldAnimate ? 'true' : 'false'}
          onTransitionEnd={finishSlide}
          style={trackStyle}
        >
          {orderedCards.map((card, cardIndex) => (
            <article
              className={styles.caseCard}
              data-active={cardIndex === 0 ? 'true' : 'false'}
              role="group"
              aria-roledescription="slide"
              aria-label={`${card.category}: ${card.title}`}
              key={card.id}
            >
              <div className={styles.caseImg}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  sizes="(max-width: 767px) 88vw, (max-width: 991px) 60vw, 44vw"
                />
                <span className={styles.caseOverlay} aria-hidden="true" />
              </div>
              <div className={styles.caseMeta}>
                <span className={styles.caseCategory}>{card.category}</span>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.caseControls}>
        <button type="button" onClick={previous} aria-label={previousLabel} disabled={cards.length < 2}>
          <PreviousIcon aria-hidden="true" />
        </button>
        <span aria-hidden="true" dir="ltr">
          {String(startIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={next} aria-label={nextLabel} disabled={cards.length < 2}>
          <NextIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
