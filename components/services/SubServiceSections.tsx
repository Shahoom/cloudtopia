import { Check, Target } from 'lucide-react'
import { getPillarSections, type Bi } from '@/lib/services/sub-service-sections'

const pick = (b: Bi, isAr: boolean) => (isAr ? b.ar : b.en)

/**
 * Shared, reusable content sections for sub-service pages. Pillar-level copy
 * (from sub-service-sections.ts) framed with each page's service name, so every
 * page gains substantial, relevant content without per-page authoring.
 * Bilingual + RTL-aware. Used by both the Digital Presence and Business Systems
 * sub-service templates.
 */

/** Plain-language intro framed by the service + its pillar. */
export function ServiceOverview({ service, pillarName, locale }: { service: string; pillarName: string; locale: string }) {
    const isAr = locale === 'ar'
    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                    {isAr ? 'نظرة عامة' : 'Overview'}
                </p>
                <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                    {isAr ? 'باختصار، ما الذي نقدّمه' : 'What this is, in plain terms'}
                </h2>
                <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-sky-400" aria-hidden="true" />
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                    {isAr
                        ? `${service} من كلاودتوبيا مبني حول عملك — لا قالب جاهز للجميع. ضمن خدمات ${pillarName}، نركّز على ما يحرّك أهدافك فعلاً: نتيجة تملكها بالكامل، بالعربية والإنجليزية، بنطاق واضح ودون مفاجآت.`
                        : `CloudTopia's ${service} is built around your business — not a one-size-fits-all template. As part of our ${pillarName} work, we focus on what actually moves your goals forward: a result you fully own, in Arabic and English, delivered with a clear scope and no surprises.`}
                </p>
            </div>
        </section>
    )
}

/** "What's included" — pillar-level scope grid. Renders nothing if the pillar has no list. */
export function ServiceDeliverables({ pillarSlug, service, locale }: { pillarSlug: string; service: string; locale: string }) {
    const isAr = locale === 'ar'
    const items = getPillarSections(pillarSlug).deliverables
    if (!items.length) return null
    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="bg-[#f4f1f8] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                        {isAr ? 'ما يتضمنه' : "What's included"}
                    </p>
                    <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                        {isAr ? `كل ما يشمله ${service}` : `Everything that comes with your ${service.toLowerCase()}`}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
                        {isAr
                            ? 'نطاق واضح من البداية — تعرف بالضبط ما الذي ستحصل عليه.'
                            : 'A clear scope from the start — you know exactly what you get.'}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => (
                        <div key={item.en} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                                <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="text-[15px] font-semibold leading-snug text-slate-700">{pick(item, isAr)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/** "Who it's for / common use cases" — 3 pillar-level scenario cards. */
export function ServiceUseCases({ pillarSlug, service, locale }: { pillarSlug: string; service: string; locale: string }) {
    const isAr = locale === 'ar'
    const cases = getPillarSections(pillarSlug).useCases
    if (!cases.length) return null
    return (
        <section dir={isAr ? 'rtl' : 'ltr'} className="bg-[#f4f1f8] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                        {isAr ? 'حالات الاستخدام' : 'Use cases'}
                    </p>
                    <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                        {isAr ? 'لمن هذه الخدمة' : "Who it's for"}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
                        {isAr
                            ? `أكثر المواقف التي يحدث فيها ${service} فرقاً حقيقياً.`
                            : `The situations where ${service.toLowerCase()} makes a real difference.`}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {cases.map((c) => (
                        <div key={c.title.en} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 transition hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/60">
                            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                                <Target className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h3 className="text-lg font-black text-[#0f172a]">{pick(c.title, isAr)}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{pick(c.desc, isAr)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
