import Link from 'next/link'
import { Check } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { ContactLeadForm } from '@/components/services/ContactLeadForm'

/**
 * Dark contact hero used as the FIRST section on every sub-service page
 * (left: breadcrumb + title + chips; right: the lead form that saves to the CMS).
 * Main/pillar pages do NOT use this — only individual sub-services.
 */
export function SubServiceContactHero({
    service,
    pillarName,
    pillarHref,
    eyebrow,
    title,
    subtitle,
    chips = [],
    locale,
}: {
    service: string
    pillarName: string
    pillarHref?: string
    eyebrow: string
    title: string
    subtitle: string
    chips?: string[]
    locale: string
}) {
    const L = (p: string) => localePath(locale, p)
    const isAr = locale === 'ar'
    return (
        <section className="relative overflow-hidden bg-[#070b16] text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_0%,rgba(245,158,11,0.12),transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(56,189,248,0.14),transparent_60%)]" aria-hidden="true" />
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 md:pt-32">
                <div>
                    <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-400" aria-label="Breadcrumb">
                        <Link href={L('/services')} className="transition-colors hover:text-amber-300">{isAr ? 'الخدمات' : 'Services'}</Link>
                        <span aria-hidden="true">/</span>
                        {pillarHref ? (
                            <Link href={L(pillarHref)} className="transition-colors hover:text-amber-300">{pillarName}</Link>
                        ) : (
                            <span>{pillarName}</span>
                        )}
                    </nav>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">{eyebrow}</p>
                    <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
                        {title}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{subtitle}</p>
                    {chips.length > 0 && (
                        <div className="mt-7 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {chips.map((chip) => (
                                <span key={chip} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-200">
                                    <Check className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                                    {chip}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <ContactLeadForm service={service} locale={locale} />
            </div>
        </section>
    )
}
