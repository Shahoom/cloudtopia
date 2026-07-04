'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { localePath } from '@/lib/i18n/url'

/**
 * Sub-service card with the site's GlowingEffect border (same family used on the
 * /business-systems-development page). Light theme for the services hub / pillar
 * pages. `href` points to the tailored sub-service page where one exists, else
 * to the pillar page. `desc` is optional (omitted for name-only sub-services).
 */
export function SubServiceGlowCard({
    href,
    name,
    desc,
    icon,
    locale,
}: {
    href: string
    name: string
    desc?: string
    icon: string
    locale: string
}) {
    return (
        <Link
            href={localePath(locale, href)}
            aria-label={name}
            className="group relative block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <div className="relative z-10 flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-xl transition-[border-color,background-color] duration-300 group-hover:border-sky-200 group-hover:bg-white">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-colors duration-300 group-hover:border-sky-200 group-hover:bg-sky-50">
                        <Image src={icon} alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 object-contain" />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300 transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-50 group-hover:text-sky-600 rtl:-scale-x-100">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                </div>
                <h4 className="text-[15px] font-bold leading-snug text-slate-900">{name}</h4>
                {desc ? <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{desc}</p> : null}
            </div>
        </Link>
    )
}
