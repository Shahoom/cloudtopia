'use client'

import { useState } from 'react'
import { Boxes, Cloud, Cpu, Database, Layout, Plug, Server, ShieldCheck, Sparkles, Workflow } from 'lucide-react'

export type TechStackItem = { name: string; icon?: string }
export type TechStackCategory = { label: string; items: TechStackItem[] }
export type ServiceTechStackContent = {
    title: string
    subtitle?: string
    categories: TechStackCategory[]
}

const TAB_ICONS = [Layout, Server, Database, Cloud, ShieldCheck, Sparkles, Plug, Workflow, Cpu, Boxes]

/**
 * Per-service technology stack: vertical category tabs (left) and a grid of
 * logo/name cards (right) on a deep-blue panel. Tailored content per page.
 * Original CloudTopia section — a common two-pane tabbed layout.
 */
export function ServiceTechStack({ content, locale }: { content: ServiceTechStackContent; locale: string }) {
    const isAr = locale === 'ar'
    const [active, setActive] = useState(0)
    const cat = content.categories[active] ?? content.categories[0]

    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="bg-gradient-to-br from-[#0c2d52] via-[#0a2342] to-[#071a30] py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">{content.title}</h2>
                    {content.subtitle && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{content.subtitle}</p>}
                </div>

                <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-6 lg:grid-cols-[300px_1fr] lg:gap-7">
                    {/* Category tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                        {content.categories.map((c, i) => {
                            const Icon = TAB_ICONS[i % TAB_ICONS.length]
                            const on = i === active
                            return (
                                <button
                                    key={c.label}
                                    type="button"
                                    onClick={() => setActive(i)}
                                    aria-pressed={on}
                                    className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-start text-sm font-bold transition lg:w-full ${
                                        on
                                            ? 'bg-white text-[#0a2342] shadow-lg'
                                            : 'bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 shrink-0 ${on ? 'text-[#0284c7]' : 'text-sky-300'}`} aria-hidden="true" />
                                    <span className="whitespace-nowrap lg:whitespace-normal">{c.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Tech cards */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {cat.items.map((item) => (
                            <div
                                key={item.name}
                                className="group flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="flex h-11 w-11 items-center justify-center">
                                    {item.icon ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            loading="lazy"
                                            width={44}
                                            height={44}
                                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                const el = e.currentTarget
                                                el.style.display = 'none'
                                                const fb = el.nextElementSibling as HTMLElement | null
                                                if (fb) fb.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        style={{ display: item.icon ? 'none' : 'flex' }}
                                        className="h-11 w-11 items-center justify-center rounded-xl bg-[#0284c7]/10 text-sm font-black text-[#0284c7]"
                                    >
                                        {item.name.slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-center text-[13px] font-semibold leading-snug text-slate-700">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
