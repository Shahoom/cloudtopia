'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const SQRT_5000 = Math.sqrt(5000)

export type StaggerTestimonial = {
  id: string
  testimonial: string
  by: string
  service: string
}

function initialsFrom(by: string) {
  return by
    .split(',')[0]
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function getPosition(index: number) {
  if (index === 0) return 0
  return index % 2 === 1 ? Math.ceil(index / 2) : -(index / 2)
}

function TestimonialCard({
  position,
  testimonial,
  handleMove,
  cardSize,
  dir,
}: {
  position: number
  testimonial: StaggerTestimonial
  handleMove: (steps: number) => void
  cardSize: number
  dir: 'ltr' | 'rtl'
}) {
  const isCenter = position === 0
  const visualPosition = dir === 'rtl' ? -position : position

  return (
    <button
      type="button"
      onClick={() => handleMove(position)}
      aria-label={`${testimonial.by}: ${testimonial.service}`}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 text-start transition-[background-color,border-color,box-shadow,transform] duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400',
        isCenter
          ? 'z-20 border-sky-300 bg-sky-300 text-slate-950 shadow-[0px_8px_0px_4px_rgba(255,255,255,0.18)]'
          : 'z-10 border-white/24 bg-[#111d34] text-white hover:border-sky-300/60',
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * visualPosition}px)
          translateY(${isCenter ? -58 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      <span
        className={cn('absolute block origin-top-right rotate-45', isCenter ? 'bg-slate-950' : 'bg-white/24')}
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
        aria-hidden="true"
      />
      <span className={cn('mb-5 flex h-14 w-12 items-center justify-center border-2 text-sm font-black shadow-[3px_3px_0px_rgba(15,23,42,0.35)]', isCenter ? 'border-slate-950 bg-white text-slate-950' : 'border-white/24 bg-white/8 text-white')}>
        {initialsFrom(testimonial.by)}
      </span>
      <Quote className={cn('mb-4 h-7 w-7', isCenter ? 'text-slate-950' : 'text-sky-200')} aria-hidden="true" />
      <blockquote className={cn('text-base font-black leading-7 sm:text-xl', isCenter ? 'text-slate-950' : 'text-white')}>
        "{testimonial.testimonial}"
      </blockquote>
      <span className={cn('absolute bottom-7 left-6 right-6 border-t pt-4 text-sm font-bold leading-6', isCenter ? 'border-slate-950/20 text-slate-800' : 'border-white/12 text-white/72')}>
        {testimonial.by}
        <span className={cn('mt-1 block text-xs uppercase tracking-[0.14em]', isCenter ? 'text-slate-700' : 'text-sky-200')}>
          {testimonial.service}
        </span>
      </span>
    </button>
  )
}

export function StaggerTestimonials({
  testimonials,
  dir = 'ltr',
}: {
  testimonials: StaggerTestimonial[]
  dir?: 'ltr' | 'rtl'
}) {
  const [cardSize, setCardSize] = useState(365)
  const [items, setItems] = useState(testimonials)

  useEffect(() => {
    setItems(testimonials)
  }, [testimonials])

  const handleMove = (steps: number) => {
    if (steps === 0) return
    const next = [...items]
    if (steps > 0) {
      for (let i = steps; i > 0; i -= 1) {
        const item = next.shift()
        if (!item) return
        next.push(item)
      }
    } else {
      for (let i = steps; i < 0; i += 1) {
        const item = next.pop()
        if (!item) return
        next.unshift(item)
      }
    }
    setItems(next)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)')
      setCardSize(matches ? 365 : 292)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="relative h-[600px] w-full overflow-hidden border-2 border-white/12 bg-white/[0.035]" dir={dir}>
      {items.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          handleMove={handleMove}
          position={getPosition(index)}
          cardSize={cardSize}
          dir={dir}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center border-2 border-white/30 bg-white text-slate-950 transition-colors hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          aria-label={dir === 'rtl' ? 'الرأي السابق' : 'Previous testimonial'}
        >
          <ChevronLeft className={cn('h-5 w-5', dir === 'rtl' && 'rotate-180')} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center border-2 border-white/30 bg-white text-slate-950 transition-colors hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          aria-label={dir === 'rtl' ? 'الرأي التالي' : 'Next testimonial'}
        >
          <ChevronRight className={cn('h-5 w-5', dir === 'rtl' && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
