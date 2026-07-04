'use client'

import { useEffect } from 'react'

export default function EnterpriseAnimator() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('.ct-reveal'))
    const motionTargets = Array.from(document.querySelectorAll<HTMLElement>('.ct-spotlight'))

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    )

    revealTargets.forEach((target) => observer.observe(target))

    const onMove = (event: PointerEvent) => {
      motionTargets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        target.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return null
}
