'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { industries, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { getIndustryVisual } from '@/components/industry/industryVisuals'

export default function IndustriesPreview() {
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'
    const title = locale === 'ar' ? 'حلول برمجية حسب طريقة عمل كل قطاع' : 'Software Solutions by Industry Workflow'
    const description = locale === 'ar'
        ? 'نصمم الموقع أو التطبيق أو النظام حول تفاصيل القطاع نفسه: حجوزات، مرضى، مدفوعات، قوائم، مخزون، بوابات عملاء، وعمليات يومية قابلة للقياس.'
        : 'We design the website, app, or business system around the sector itself: bookings, patients, payments, listings, inventory, client portals, and measurable daily operations.'
    const outcomes = locale === 'ar'
        ? ['محتوى مناسب للبحث المحلي', 'أنظمة مرتبطة بالعمليات', 'تجربة عربية وإنجليزية']
        : ['Local-search-ready content', 'Systems tied to operations', 'Arabic and English experience']

    return (
        <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] overflow-hidden" data-header-theme="light" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(125,211,252,0.22),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(216,180,254,0.3),transparent_32%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
            <div className="relative max-w-7xl mx-auto">
                <div className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-end">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-eerie ring-1 ring-eerie/10 mb-6 shadow-sm">
                            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                            {locale === 'ar' ? 'القطاعات' : 'Industries'}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-eerie leading-[1.12] mb-6" style={{ textWrap: 'balance' }}>
                            {title}
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">{description}</p>
                    </div>
                    <div className="grid gap-3">
                        {outcomes.map((outcome) => (
                            <div key={outcome} className="flex items-center gap-3 rounded-lg border border-eerie/10 bg-white/80 px-4 py-3 text-sm font-black text-eerie shadow-sm backdrop-blur">
                                <CheckCircle2 className="h-4 w-4 flex-none text-primary-700" aria-hidden="true" />
                                {outcome}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {industrySlugs.slice(0, 8).map((slug, index) => {
                        const industry = industries[slug]
                        const visual = getIndustryVisual(slug)
                        const Icon = visual.icon
                        return (
                            <motion.div
                                key={slug}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.5, delay: index * 0.04 }}
                            >
                                <Link
                                    href={localePath(locale, `/industries/${slug}`)}
                                    className="group flex h-full min-h-[17rem] flex-col rounded-lg border border-eerie/10 bg-white/86 p-6 shadow-sm backdrop-blur transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100"
                                >
                                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-eerie/10 ${visual.tint} ${visual.accent}`}>
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-neutral-400">
                                        {localizedValue(visual.workflow, locale)}
                                    </p>
                                    <h3 className="text-xl font-black text-eerie mb-3">{localizedValue(industry.name, locale)}</h3>
                                    <p className="text-sm leading-relaxed text-neutral-600 flex-1">{localizedValue(industry.description, locale)}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                                        {locale === 'ar' ? 'اقرأ المزيد' : 'Explore'}
                                        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                    </span>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
