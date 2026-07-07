import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PricingTier {
  name: string
  icon: ReactNode
  /** Optional — pricing pages now lead with "Request a quote" instead of figures. */
  price?: string
  description: string
  features: string[]
  popular?: boolean
  color?: 'amber' | 'sky' | 'emerald' | 'rose' | 'violet' | 'slate'
  href?: string
  ctaLabel?: string
  showFullFeaturesLabel?: string
}

const colorClasses = {
  amber: 'bg-amber-300 text-amber-950',
  sky: 'bg-sky-300 text-sky-950',
  emerald: 'bg-emerald-300 text-emerald-950',
  rose: 'bg-rose-300 text-rose-950',
  violet: 'bg-violet-300 text-violet-950',
  slate: 'bg-slate-900 text-white',
}

export function CreativePricing({
  tag,
  title,
  description,
  tiers,
  dir = 'ltr',
  className,
  id,
}: {
  tag: string
  title: string
  description: string
  tiers: PricingTier[]
  dir?: 'ltr' | 'rtl'
  className?: string
  id?: string
}) {
  const isRTL = dir === 'rtl'

  return (
    <section id={id} className={cn('relative w-full overflow-hidden bg-[#f4f1f8]', className)} dir={dir}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#1B1B23 1px, transparent 1px), linear-gradient(90deg, #1B1B23 1px, transparent 1px)', backgroundSize: '52px 52px' }} aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-md border border-slate-950/15 bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {tag}
          </p>
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl" style={{ textWrap: 'balance' }}>
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-600 md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const accent = colorClasses[tier.color || 'sky']
            const cta = tier.ctaLabel || (isRTL ? 'ابدأ الآن' : 'Get Started')
            const featuredFeatures = tier.features.slice(0, 3)
            const remainingFeatures = tier.features.slice(3)
            const showFullFeaturesLabel = tier.showFullFeaturesLabel || (isRTL ? 'عرض كل المميزات' : 'Show Full Features')
            return (
              <article
                key={`${tier.name}-${index}`}
                className="group relative flex min-h-full flex-col rounded-lg border border-slate-950/12 bg-white shadow-[0_18px_42px_rgba(27,27,35,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-slate-950/40 hover:shadow-[0_24px_60px_rgba(27,27,35,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className={cn('h-2 rounded-t-lg', accent)} aria-hidden="true" />
                <div className="relative flex min-h-[34rem] flex-1 flex-col p-6">
                  {tier.popular && (
                    <span className="absolute end-4 top-4 rounded-md border border-amber-500/40 bg-amber-100 px-3 py-1 text-xs font-black text-amber-950">
                      {isRTL ? 'الأكثر طلباً' : 'Popular'}
                    </span>
                  )}

                  <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-slate-950/15', accent)}>
                    {tier.icon}
                  </div>

                  <h3 className="pe-24 text-2xl font-black leading-tight text-slate-950">{tier.name}</h3>
                  <p className="mt-3 min-h-16 text-sm font-semibold leading-6 text-slate-600">{tier.description}</p>

                  <div className="my-6 flex items-center gap-3 rounded-md border border-slate-950/12 bg-[#f4f1f8] px-4 py-3.5 text-start">
                    <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-950/15', accent)}>
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-black leading-tight text-slate-950">
                      {isRTL ? 'سعر مخصص حسب النطاق' : 'Custom-scoped quote'}
                      <span className="mt-0.5 block text-xs font-bold text-slate-500">
                        {isRTL ? 'استشارة وديمو مجاني قبل البدء' : 'Free consultation + demo before you commit'}
                      </span>
                    </span>
                  </div>

                  <ul className="grid gap-3">
                    {featuredFeatures.map((feature) => (
                      <li key={feature} className="grid grid-cols-[1.35rem_1fr] gap-3 text-sm font-bold leading-6 text-slate-800">
                        <span className={cn('mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-slate-950/15', accent)}>
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {remainingFeatures.length > 0 && (
                    <details className="mt-5 rounded-md border border-slate-950/12 bg-white">
                      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-black text-slate-950 marker:hidden">
                        <span className="inline-flex w-full items-center justify-between gap-3">
                          {showFullFeaturesLabel}
                          <span className="text-xs font-black text-slate-400">{` ${remainingFeatures.length}`}</span>
                        </span>
                      </summary>
                      <ul className="grid gap-3 border-t border-slate-950/10 px-4 py-4">
                        {remainingFeatures.map((feature) => (
                          <li key={feature} className="grid grid-cols-[1.35rem_1fr] gap-3 text-sm font-bold leading-6 text-slate-700">
                            <span className={cn('mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-slate-950/15', accent)}>
                              <Check className="h-3 w-3" aria-hidden="true" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <Link
                    href={tier.href || '/api/whatsapp'}
                    className={cn(
                      'mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-md border border-slate-950 px-4 text-sm font-black transition-[background-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
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
