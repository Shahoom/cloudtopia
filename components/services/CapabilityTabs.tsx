'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export type CapabilityPanel = { label: string; intro?: string; items: string[] }

/**
 * Tabbed capability panels for the sub-service page (e.g. "For your team" /
 * "For admins" / "Integrations & data"). Dark CloudTopia theme — original take
 * on the role-based feature tabs common to service pages.
 */
export function CapabilityTabs({ panels }: { panels: CapabilityPanel[] }) {
    const [active, setActive] = useState(0)
    const panel = panels[active] ?? panels[0]

    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0e1424]">
            <div className="flex flex-wrap gap-2 border-b border-white/10 bg-white/[0.02] p-2.5">
                {panels.map((p, i) => (
                    <button
                        key={p.label}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={i === active}
                        className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                            i === active
                                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-[#070b16] shadow-lg shadow-amber-500/20'
                                : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>
            <div className="p-5 sm:p-8">
                {panel.intro && <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-400">{panel.intro}</p>}
                <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                    {panel.items.map((it) => (
                        <div key={it} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-400">
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <span className="text-sm font-medium text-slate-200">{it}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
