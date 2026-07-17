'use client'

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import {
  BarChart3,
  CalendarCheck,
  CreditCard,
  Gift,
  MonitorSmartphone,
  QrCode,
  ShoppingBag,
  Truck,
} from 'lucide-react'

import styles from './restaurants-industry.module.css'

type CategoryItem = {
  id: string
  label: string
}

type RestaurantsCategorySliderProps = {
  items: readonly CategoryItem[]
  regionLabel: string
  prevLabel: string
  nextLabel: string
  direction: 'ltr' | 'rtl'
}

const CATEGORY_ICONS: Record<string, ComponentType> = {
  'online-ordering': ShoppingBag,
  'delivery-dispatch': Truck,
  'pos-integration': CreditCard,
  reservations: CalendarCheck,
  loyalty: Gift,
  'kitchen-display': MonitorSmartphone,
  analytics: BarChart3,
  'qr-menu': QrCode,
}

/**
 * Foodking's FoodSlider port: an auto-scrolling row of capability cards
 * (Swiper speed 800 / autoplay 3000, 4-per-view responsive, prev/next arrows).
 * Reproduced as a native scroll-snap track — fully keyboard/scroll accessible —
 * that auto-advances one card every 3s and wraps at the end. Autoplay pauses on
 * hover/focus and is disabled under prefers-reduced-motion (arrows still work).
 */
export function RestaurantsCategorySlider({
  items,
  regionLabel,
  prevLabel,
  nextLabel,
  direction,
}: RestaurantsCategorySliderProps) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  const pausedRef = useRef(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const step = useCallback((dir: 1 | -1, smooth = true) => {
    const track = trackRef.current
    if (!track) return
    const first = track.querySelector<HTMLElement>('li')
    const gap = 24
    const cardWidth = first ? first.offsetWidth + gap : track.clientWidth / 4
    const sign = direction === 'rtl' ? -1 : 1
    const atEnd =
      Math.abs(track.scrollLeft) + track.clientWidth >= track.scrollWidth - 4
    if (dir === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: smooth ? 'smooth' : 'auto' })
      return
    }
    track.scrollBy({ left: cardWidth * dir * sign, behavior: smooth ? 'smooth' : 'auto' })
  }, [direction])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timer = setInterval(() => {
      if (!pausedRef.current && !document.hidden) step(1)
    }, 3000)
    return () => clearInterval(timer)
  }, [reducedMotion, step])

  return (
    <div
      className={styles.categoryWrap}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onFocusCapture={() => {
        pausedRef.current = true
      }}
      onBlurCapture={() => {
        pausedRef.current = false
      }}
    >
      <ul className={styles.categoryTrack} ref={trackRef} aria-label={regionLabel}>
        {items.map((item) => {
          const Icon = CATEGORY_ICONS[item.id] ?? ShoppingBag
          return (
            <li className={styles.categoryCard} key={item.id}>
              <span className={styles.categoryIcon} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.categoryLabel}>{item.label}</span>
            </li>
          )
        })}
      </ul>
      <div className={styles.categoryControls}>
        <button
          type="button"
          className={styles.categoryArrow}
          aria-label={prevLabel}
          onClick={() => step(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className={styles.categoryArrow}
          aria-label={nextLabel}
          onClick={() => step(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  )
}
