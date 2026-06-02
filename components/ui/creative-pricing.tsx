import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PricingTier {
  name: string
  icon: ReactNode
  price: string
  description: string
  features: string[]
  popular?: boolean
  color?: 'amber' | 'sky' | 'emerald' | 'rose' | 'violet' | 'slate'
  href?: string
  ctaLabel?: string
}

const colorClasses = {
  amber: 'bg-amber-300 text-amber-950',
  sky: 'bg-sky-300 text-sky-950',
  emerald: 'bg-emerald-300 text-emerald-950',
  rose: 'bg-rose-300 text-rose-950',
  violet: 'bg-violet-300 text-violet-950',
  slate: 'bg-slate-900 text-white',
}

const rotations = ['md:-rotate-1', 'md:rotate-1', 'md:-rotate-2', 'md:rotate-2']

export function CreativePricing({
  tag,
  title,
  description,
  tiers,
  dir = 'ltr',
  className,
}: {
  tag: string
  title: string
  description: string
  tiers: PricingTier[]
  dir?: 'ltr' | 'rtl'
  className?: string
}) {
  const isRTL = dir === 'rtl'

  return (
    <section className={cn('relative w-full overflow-hidden bg-[#f4f1f8]', className)} dir={dir}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-violet-200/55 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-100/55 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.7)_20%,transparent_42%),linear-gradient(135deg,rgba(14,165,233,0.16),rgba(168,85,247,0.12),rgba(16,185,129,0.12))] [background-size:220%_220%]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="inline-flex rotate-[-1deg] items-center gap-2 border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {tag}
          </p>
          <h2 className="mt-6 rotate-[-0.7deg] text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl" style={{ textWrap: 'balance' }}>
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const accent = colorClasses[tier.color || 'sky']
            const cta = tier.ctaLabel || (isRTL ? 'ابدأ الآن' : 'Get Started')
            return (
              <article
                key={`${tier.name}-${index}`}
                className={cn('group relative transition-[transform] duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0', rotations[index % rotations.length])}
              >
                <div className="absolute inset-0 border-2 border-slate-950 bg-white/95 shadow-[6px_6px_0px_0px_#0f172a] transition-[box-shadow,transform] duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_#0f172a] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
                <div className="relative flex min-h-[34rem] flex-col p-6">
                  {tier.popular && (
                    <span className="absolute -top-3 end-4 rotate-3 border-2 border-slate-950 bg-amber-300 px-3 py-1 text-xs font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]">
                      {isRTL ? 'الأكثر طلباً' : 'Popular'}
                    </span>
                  )}

                  <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-950', accent)}>
                    {tier.icon}
                  </div>

                  <h3 className="text-2xl font-black text-slate-950">{tier.name}</h3>
                  <p className="mt-3 min-h-16 text-sm font-semibold leading-6 text-slate-600">{tier.description}</p>

                  <div className="my-6 border-y-2 border-slate-950 py-4">
                    <p className="text-4xl font-black tracking-tight text-slate-950">{tier.price}</p>
                  </div>

                  <ul className="grid gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="grid grid-cols-[1.35rem_1fr] gap-3 text-sm font-bold leading-6 text-slate-800">
                        <span className={cn('mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-950', accent)}>
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.href || '/contact'}
                    className={cn(
                      'mt-auto inline-flex h-12 items-center justify-center gap-2 border-2 border-slate-950 px-4 text-sm font-black shadow-[4px_4px_0px_0px_#0f172a] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#0f172a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
                      tier.popular ? 'bg-slate-950 text-white hover:bg-sky-800' : 'bg-white text-slate-950 hover:bg-sky-50',
                    )}
                  >
                    {cta}
                    <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
