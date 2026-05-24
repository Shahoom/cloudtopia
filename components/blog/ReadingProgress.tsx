'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY
      const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(Math.min(100, Math.max(0, (scrollTop / height) * 100)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-1 bg-transparent" aria-hidden="true">
      <div className="h-full bg-primary-600 transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  )
}
