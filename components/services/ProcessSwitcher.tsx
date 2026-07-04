'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, Workflow } from 'lucide-react'

export type DeliveryStep = {
    number: string
    title: string
    duration: string
    description: string
    bullets: string[]
}

/**
 * Interactive delivery-process switcher. Left: heading + intro + a clickable
 * step list. Right: a photo panel with the active step detailed over it.
 * Light CloudTopia theme; falls back to a branded panel when no image is set.
 */
export function ProcessSwitcher({
    steps,
    image,
    eyebrow,
    heading,
    intro,
    locale,
}: {
    steps: DeliveryStep[]
    image?: string
    eyebrow: string
    heading: string
    intro: string
    locale: string
}) {
    const isAr = locale === 'ar'
    const [active, setActive] = useState(0)
    const step = steps[active] ?? steps[0]

    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="py-14 md:py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
                {/* Left — heading, intro, step nav */}
                <div>
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{eyebrow}</p>
                    <h2 className="text-balance text-3xl font-black leading-[1.1] tracking-tight text-[#0f172a] sm:text-4xl lg:text-5xl">{heading}</h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">{intro}</p>

                    <div className="mt-8 space-y-2.5" role="tablist">
                        {steps.map((s, i) => {
                            const on = i === active
                            return (
                                <button
                                    key={s.number}
                                    type="button"
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => setActive(i)}
                                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-start transition ${
                                        on
                                            ? 'border-sky-300 bg-white shadow-[0_14px_40px_-18px_rgba(2,132,199,0.45)]'
                                            : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white'
                                    }`}
                                >
                                    <span
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-base font-black tabular-nums transition ${
                                            on ? 'bg-gradient-to-br from-[#0284c7] to-[#4f46e5] text-white' : 'bg-[#f4f1f8] text-[#0284c7]'
                                        }`}
                                    >
                                        {s.number}
                                    </span>
                                    <span className="flex-1">
                                        <span className="block text-base font-bold text-[#0f172a]">{s.title}</span>
                                        <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide text-[#0369a1]">{s.duration}</span>
                                    </span>
                                    <ChevronRight className={`h-5 w-5 shrink-0 text-slate-400 transition ${on ? 'translate-x-0 text-[#0284c7]' : ''} rtl:-scale-x-100`} aria-hidden="true" />
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right — photo panel + active detail */}
                <div className="relative min-h-[460px] overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-sky-100 via-indigo-50 to-white shadow-xl shadow-slate-200/60 lg:min-h-[560px]">
                    {image ? (
                        <Image src={image} alt={heading} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Workflow className="h-24 w-24 text-sky-300" aria-hidden="true" />
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" aria-hidden="true" />

                    <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.28 }}
                                className="rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-7"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="rounded-lg bg-gradient-to-br from-[#0284c7] to-[#4f46e5] px-2.5 py-1 text-xs font-black text-white">{`${isAr ? 'الخطوة' : 'Step'} ${step.number}`}</span>
                                    <span className="text-xs font-bold uppercase tracking-wide text-[#0369a1]">{step.duration}</span>
                                </div>
                                <h3 className="mt-3 text-2xl font-black text-[#0f172a] sm:text-[1.7rem]">{step.title}</h3>
                                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{step.description}</p>
                                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                                    {step.bullets.map((b) => (
                                        <li key={b} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                            </span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
