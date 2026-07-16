'use client'

import {
  useEffect,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import styles from './healthcare-industry.module.css'

export type HealthcareCapabilityCard = {
  id: string
  label: string
  description: string
  marker: string
}

type HealthcareCapabilityCarouselProps = {
  cards: readonly HealthcareCapabilityCard[]
  direction: 'ltr' | 'rtl'
  regionLabel: string
  previousLabel: string
  nextLabel: string
}

type TrackStyle = CSSProperties & {
  '--health-slide-offset': number
  '--health-slide-direction': number
}

type CarouselPhase = 'idle' | 'next' | 'previous-prep' | 'previous' | 'reset'

export function wrapCarouselIndex(index: number, length: number) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

// Rotating the full deck (not a windowed slice) guarantees the track always
// renders all N cards, so the sliding transform can never expose an empty tail
// — even at the widest breakpoint where the visible window could equal N (there
// the prev/next controls are hidden via CSS, so that slide can't be triggered).
export function orderCarouselCards<T>(cards: readonly T[], startIndex: number): T[] {
  if (cards.length === 0) return []
  const wrappedIndex = wrapCarouselIndex(startIndex, cards.length)
  return [...cards.slice(wrappedIndex), ...cards.slice(0, wrappedIndex)]
}

export function HealthcareCapabilityCarousel({
  cards,
  direction,
  regionLabel,
  previousLabel,
  nextLabel,
}: HealthcareCapabilityCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const [phase, setPhase] = useState<CarouselPhase>('idle')
  const PreviousIcon = direction === 'rtl' ? ArrowRight : ArrowLeft
  const NextIcon = direction === 'rtl' ? ArrowLeft : ArrowRight
  const orderedCards = orderCarouselCards(cards, startIndex)
  const activeCard = cards[startIndex]
  const slideOffset = phase === 'next' || phase === 'previous-prep' ? 1 : 0
  const shouldAnimate = phase === 'next' || phase === 'previous'
  const trackStyle: TrackStyle = {
    '--health-slide-offset': slideOffset,
    '--health-slide-direction': direction === 'rtl' ? 1 : -1,
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
      className={styles.capabilityCarousel}
      data-carousel-direction={direction}
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {activeCard
          ? `${String(startIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}: ${activeCard.label}`
          : ''}
      </p>
      <div className={styles.capabilityViewport}>
        <div
          className={styles.capabilityTrack}
          data-animate={shouldAnimate ? 'true' : 'false'}
          onTransitionEnd={finishSlide}
          style={trackStyle}
        >
          {orderedCards.map((card, cardIndex) => (
            <article
              className={styles.capabilityCard}
              data-active={cardIndex === 0 ? 'true' : 'false'}
              role="group"
              aria-roledescription="slide"
              aria-label={`${card.marker}: ${card.label}`}
              key={card.id}
            >
              <span className={styles.capabilityMarker} aria-hidden="true">
                {card.marker}
              </span>
              <h3>{card.label}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.carouselControls}>
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
