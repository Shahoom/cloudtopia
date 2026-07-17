'use client'

import { Plug } from 'lucide-react'

import styles from './travel-hospitality-industry.module.css'

type TravelPartnerMarqueeProps = {
  items: readonly string[]
  regionLabel: string
}

/**
 * Auto-scrolling integration marquee — a licence-clean re-creation of the
 * template's owl partner carousel (autoPlay). The track holds two copies of the
 * list and animates -50% for a seamless loop; hover/focus pauses it. To stay
 * honest, these are integration CATEGORIES CloudTopia works with, not fabricated
 * partner logos.
 *
 * Accessibility: the first copy is a real list read once by assistive tech; the
 * second copy is aria-hidden. The CSS reduced-motion kill switch stops the
 * animation so the row is simply static.
 */
export function TravelPartnerMarquee({ items, regionLabel }: TravelPartnerMarqueeProps) {
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          <ul className={styles.marqueeList} aria-label={regionLabel}>
            {items.map((item) => (
              <li className={styles.marqueeItem} key={item}>
                <span className={styles.marqueeIcon} aria-hidden="true">
                  <Plug />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <ul className={styles.marqueeList} aria-hidden="true">
            {items.map((item) => (
              <li className={styles.marqueeItem} key={`dup-${item}`}>
                <span className={styles.marqueeIcon} aria-hidden="true">
                  <Plug />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
