'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Sparkles } from 'lucide-react'

type StatItem = {
    value: string
    label: string
    hint?: string
}

export default function StatsBar() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const stats = (t.home?.stats?.items as StatItem[]) || []
    const badge = t.home?.stats?.badge || 'Trusted across the Gulf'

    if (stats.length === 0) return null

    return (
        <section
            className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[240px] rounded-full bg-primary-200/40 blur-[120px]" />

            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-10"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-sm font-semibold text-neutral-700">
                        <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                        {badge}
                    </span>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-white p-6 md:p-8 lg:p-10 relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-50/60 to-transparent pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-none">
                                        {stat.value}
                                    </span>
                                </div>
                                <div className="text-sm md:text-base font-semibold text-neutral-900 mb-1.5">
                                    {stat.label}
                                </div>
                                {stat.hint && (
                                    <div className="text-xs md:text-sm text-neutral-500 leading-relaxed">
                                        {stat.hint}
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
