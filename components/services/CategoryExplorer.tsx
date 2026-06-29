'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { getStructuredGroups } from '@/lib/services/structured-catalog'
import { getBusinessSystemsSubServicesByPillar } from '@/lib/services/business-systems-content'
import { getDigitalPresenceSubServicesByPillar } from '@/lib/services/digital-presence-content'
import { localizedDP } from '@/lib/services/digital-presence'
import { SubServiceGlowCard } from './SubServiceGlowCard'

/**
 * Pillars-first explorer: each pillar is a non-collapsing heading row with its
 * sub-service glow cards ALWAYS rendered underneath (never an accordion). Works
 * for any structured category:
 *   • Pillars that have tailored sub-service pages (Business Systems) → cards
 *     link to /services/<slug> with a description.
 *   • Pillars whose sub-services are listed but have no own page (Digital
 *     Presence, Web Apps) → cards show the sub-service name and link to the
 *     pillar page.
 * Shared by the services hub and the /business-systems-development page.
 *
 * `defaultOpenFirst` is kept for prop compatibility with existing callers but is
 * now a no-op — every pillar's sub-services are always visible.
 */
export function CategoryExplorer({
    categoryId,
    defaultOpenFirst: _defaultOpenFirst = true,
}: {
    categoryId: string
    defaultOpenFirst?: boolean
}) {
    const { locale } = useLanguage()
    const groups = getStructuredGroups(categoryId) ?? []

    return (
        <div className="space-y-10">
            {groups.map((group) => (
                <section key={group.slug} aria-label={localizedDP(group.name, locale)}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600/80">{localizedDP(group.tagline, locale)}</p>
                    <div className="mb-5 mt-1 flex items-center gap-2">
                        <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">{localizedDP(group.name, locale)}</h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{group.pillars.length}</span>
                    </div>

                    <div className="space-y-3">
                        {group.pillars.map((pillar) => {
                            const bs = getBusinessSystemsSubServicesByPillar(pillar.slug, locale)
                            const tailored = bs.length > 0 ? bs : getDigitalPresenceSubServicesByPillar(pillar.slug, locale)
                            const subs =
                                tailored.length > 0
                                    ? tailored.map((s) => ({ name: s.name, desc: s.desc as string | undefined, href: `/services/${s.slug}` }))
                                    : pillar.subServices.map((n) => ({ name: n, desc: undefined as string | undefined, href: pillar.href }))
                            const name = localizedDP(pillar.name, locale)
                            const description = localizedDP(pillar.description, locale)

                            return (
                                <div key={pillar.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
                                    {/* Pillar header — non-collapsing heading */}
                                    <div className="flex w-full items-center gap-4 p-4 text-start sm:p-5">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                                            <Image src={pillar.icon} alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2">
                                                <span className="text-base font-bold text-slate-900">{name}</span>
                                                {subs.length > 0 && (
                                                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-700">
                                                        {subs.length}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="mt-0.5 line-clamp-1 block text-[13px] text-slate-500">{description}</span>
                                        </span>
                                    </div>

                                    {/* Sub-services — always visible */}
                                    {subs.length > 0 && (
                                        <div className="border-t border-slate-100 bg-[#f8fbff] p-4 sm:p-5">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                                {/* Main pillar page first */}
                                                <SubServiceGlowCard
                                                    key="__main"
                                                    href={pillar.href}
                                                    name={name}
                                                    desc={locale === 'ar' ? 'الصفحة الرئيسية — نظرة عامة على الفئة' : 'Main page · category overview'}
                                                    icon={pillar.icon}
                                                    locale={locale as string}
                                                />
                                                {subs.map((s) => (
                                                    <SubServiceGlowCard key={s.name} href={s.href} name={s.name} desc={s.desc} icon={pillar.icon} locale={locale as string} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            ))}
        </div>
    )
}
