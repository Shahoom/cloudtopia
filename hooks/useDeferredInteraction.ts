'use client'

import { useEffect, useState } from 'react'

const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

export function useDeferredInteraction(fallbackMs = 30_000): boolean {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) return
    const activate = () => setActive(true)
    for (const event of EVENTS) window.addEventListener(event, activate, { once: true, passive: true })
    const timeout = window.setTimeout(activate, fallbackMs)
    return () => {
      window.clearTimeout(timeout)
      for (const event of EVENTS) window.removeEventListener(event, activate)
    }
  }, [active, fallbackMs])

  return active
}
