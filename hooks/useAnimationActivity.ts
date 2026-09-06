'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { shouldRunAnimation } from '@/lib/performance/animation-policy'

type UseAnimationActivityOptions = {
  /** IntersectionObserver rootMargin, e.g. '400px' to pre-activate near viewport. */
  rootMargin?: string
  /** Set false to force-disable regardless of other signals. */
  enabled?: boolean
}

/**
 * IntersectionObserver + document visibility + prefers-reduced-motion adapter
 * for visual effects. Attach `ref` to the effect's host element; `active` is
 * true only while every signal allows animation. All subscriptions are removed
 * on cleanup.
 */
export function useAnimationActivity<T extends Element>(
  options: UseAnimationActivityOptions = {},
): { ref: RefObject<T | null>; active: boolean; reducedMotion: boolean } {
  const { rootMargin = '0px', enabled = true } = options
  const ref = useRef<T | null>(null)
  const [inViewport, setInViewport] = useState(false)
  const [documentVisible, setDocumentVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const observer = new IntersectionObserver(
      (entries) => setInViewport(entries.some((e) => e.isIntersecting)),
      { rootMargin },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const onVisibility = () => setDocumentVisible(document.visibilityState === 'visible')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return {
    ref,
    active: shouldRunAnimation({ enabled, inViewport, documentVisible, reducedMotion }),
    reducedMotion,
  }
}
