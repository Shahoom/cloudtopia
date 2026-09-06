import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { localizedDP, type DPPillar } from '@/lib/services/digital-presence'
import { getStructuredGroupForPillar } from '@/lib/services/structured-catalog'
import { PillarSubServicesGrid } from './PillarSubServicesGrid'

/**
 * Data-driven landing page for a Digital Presence pillar service.
 * Renders the pillar hero + its full sub-service list from the taxonomy in
 * lib/services/digital-presence.ts. Used by the /services/[service] route so
 * every new pillar resolves to a real page instead of 404.
 */
export function PillarPage({ pillar, locale }: { pillar: DPPillar; locale: string }) {
    const isAr = locale === 'ar'
    const name = localizedDP(pillar.name, locale)
    const description = localizedDP(pillar.description, locale)
    const group = getStructuredGroupForPillar(pillar.slug)
    const tagline = group ? localizedDP(group.tagline, locale) : ''

    const t = {
        services: isAr ? 'الخدمات' : 'Services',
        digitalPresence: isAr ? 'الحضور الرقمي' : 'Digital Presence',
        included: isAr ? 'ما الذي يشمله' : "What's included",
        sub: isAr ? 'خدمة فرعية' : 'sub-services',
        consult: isAr ? 'احصل على استشارة مجانية' : 'Get a free consultation',
        viewAll: isAr ? 'كل الخدمات' : 'All services',
        ctaPre: isAr ? 'جاهز للبدء؟' : 'Ready to begin?',
        ctaTitle: isAr ? `لنحدد نطاق ${name}` : `Let's scope your ${name}`,
        ctaDesc: isAr
            ? 'أرسل طلبك ونرسم لك المسار المناسب مع استشارة مجانية ومعاينة قبل أي التزام.'
            : 'Share your goal and we will map the right path — with a free consultation and demo preview before you commit.',
        ctaBtn: isAr ? 'ابدأ مشروعك' : 'Start your project',
    }

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f4f1f8] text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8 md:pb-14 md:pt-32" aria-label={name}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#dff3ff_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" aria-hidden="true" />

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <nav className="mb-6 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400" aria-label="Breadcrumb">
                        <Link href={localePath(locale, '/services')} className="transition-colors hover:text-sky-700">{t.services}</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-slate-500">{t.digitalPresence}</span>
                    </nav>

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <Image src={pillar.icon} alt="" aria-hidden="true" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
                    </div>

                    {tagline && (
                        <span className="mb-3 inline-flex items-center gap-2 rounded-md border border-sky-200 bg-white/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm">
                            {tagline}
                        </span>
                    )}

                    <h1 className="text-3xl font-black leading-[1.06] tracking-tight text-slate-900 sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>
                        {name}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg" style={{ textWrap: 'balance' }}>
                        {description}
                    </p>

                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href="mailto:info@cloudtopia.net" className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-eerie px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-slate-200 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sky-800 sm:w-auto">
                            {t.consult}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                        </a>
                        <Link href={localePath(locale, '/services')} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-7 py-3.5 text-sm font-bold text-slate-700 transition-colors duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-800 sm:w-auto">
                            {t.viewAll}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sub-services — always-visible glow cards (each links to its own page).
                Renders nothing for pillars with no sub-services (e.g. AEO/GEO). */}
            <PillarSubServicesGrid pillarSlug={pillar.slug} locale={locale} />

            {/* Final CTA */}
            <section className="relative flex items-center justify-center overflow-hidden py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #1e0b3e 0%, #2d1065 50%, #1a0a38 100%)' }} aria-label="Call to action">
                <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" aria-hidden="true" />
                <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
                    <span className="inline-flex items-center rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300">{t.ctaPre}</span>
                    <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-tight text-white md:text-4xl" style={{ textWrap: 'balance' }}>{t.ctaTitle}</h2>
                    <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-violet-200/60">{t.ctaDesc}</p>
                    <a href={`/api/whatsapp?locale=${locale}`} className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-amber-500 px-9 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-amber-400">
                        {t.ctaBtn}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                    </a>
                </div>
            </section>
        </div>
    )
}
