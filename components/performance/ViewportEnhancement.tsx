'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useAnimationActivity } from '@/hooks/useAnimationActivity'
import { useDeferredInteraction } from '@/hooks/useDeferredInteraction'

type ViewportEnhancementProps = {
  children: ReactNode
  fallback: ReactNode
  rootMargin?: string
  requireInteraction?: boolean
  /** Reserved height for the fallback shell so swapping in the enhancement cannot shift layout. */
  minHeight: number
}

/**
 * Defers a visual-only client island until its host approaches the viewport
 * (and, optionally, until the visitor has interacted). The server-renderable
 * `fallback` keeps the first frame semantic and stable; once relevant, the
 * enhanced children replace it permanently (no unmount thrash on scroll-away).
 */
export function ViewportEnhancement({
  children,
  fallback,
  rootMargin = '600px',
  requireInteraction = false,
  minHeight,
}: ViewportEnhancementProps) {
  const { ref, active } = useAnimationActivity<HTMLDivElement>({ rootMargin })
  const interacted = useDeferredInteraction()
  const [enhanced, setEnhanced] = useState(false)

  useEffect(() => {
    if (enhanced) return
    if (active && (!requireInteraction || interacted)) {
      setEnhanced(true)
    }
  }, [active, interacted, requireInteraction, enhanced])

  return (
    <div ref={ref} style={enhanced ? undefined : { minHeight }}>
      {enhanced ? children : fallback}
    </div>
  )
}

export default ViewportEnhancement
