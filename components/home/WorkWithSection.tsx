'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { 
    Lightbulb, 
    Code2, 
    Rocket, 
    Share2, 
    Brain, 
    ArrowUpRight 
} from 'lucide-react'
import { en } from '@/lib/i18n/translations/en'
import { ar } from '@/lib/i18n/translations/ar'

const CARD_ICONS = [
    Lightbulb,
    Code2,
    Rocket,
    Share2,
    Brain,
]

const ICON_TINTS = [
    'bg-rose-50 text-rose-500 border-rose-100',
    'bg-emerald-50 text-emerald-500 border-emerald-100',
    'bg-purple-50 text-purple-500 border-purple-100',
    'bg-amber-50 text-amber-500 border-amber-100',
    'bg-sky-50 text-sky-500 border-sky-100',
]

export default function WorkWithSection() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const staticDict = isRTL ? ar : en
    const workWithData = t?.home?.workWith || staticDict.home.workWith
    const cards = workWithData?.cards || []

    const whatsappNumber = '96895886393'
    const msg = isRTL
        ? 'مرحبًا CloudTopia، أريد معرفة الحل الرقمي الأنسب لعملي. أنا مهتم بخدمات المواقع، الأنظمة، الحلول السحابية، الأتمتة، أو الذكاء الاصطناعي.'
        : 'Hello CloudTopia, I want to know which digital solution fits my business. I’m interested in your websites, systems, cloud, automation, or AI services.'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`

    return (
        <section 
            className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10 border-y border-slate-900/[0.03]" 
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 md:mb-12 items-end">
                    <div className="lg:col-span-5">
                        <motion.h2 
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight"
                        >
                            {workWithData?.title}
                        </motion.h2>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-7"
                    >
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl">
                            {workWithData?.description}
                        </p>
                    </motion.div>
                </div>

                {/* Grid Container */}
                <div className="flex flex-col gap-6 md:gap-8">
                    {/* First Row: 2 Larger Cards (50% wide on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {cards.slice(0, 2).map((card: any, idx: number) => {
                            const iconIdx = idx
                            const IconComponent = CARD_ICONS[iconIdx]
                            const tintClass = ICON_TINTS[iconIdx]

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    whileHover={{ y: -4 }}
                                    className="group relative bg-white border border-slate-950/[0.06] hover:border-[#0284c7]/30 rounded-[20px] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.01)] hover:shadow-[0_12px_35px_-8px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105 ${tintClass}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#0284c7] transition-colors duration-300">
                                            {card.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Second Row: 3 Smaller Cards (33.33% wide on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {cards.slice(2, 5).map((card: any, idx: number) => {
                            const iconIdx = idx + 2
                            const IconComponent = CARD_ICONS[iconIdx]
                            const tintClass = ICON_TINTS[iconIdx]
                            const isLastCard = iconIdx === 4

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    whileHover={{ y: -4 }}
                                    className="group relative bg-white border border-slate-950/[0.06] hover:border-[#0284c7]/30 rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.01)] hover:shadow-[0_12px_35px_-8px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105 ${tintClass}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#0284c7] transition-colors duration-300">
                                            {card.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Action inside Card 5 (last card) */}
                                    {isLastCard && (
                                        <div className="mt-6 flex justify-start">
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#0066EE] hover:from-[#0066EE] hover:to-[#0088FF] hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg hover:shadow-blue-500/15 transition-all duration-300"
                                            >
                                                {workWithData?.cta || (isRTL ? 'تواصل معنا' : 'Contact with us')}
                                                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-90' : ''}`} />
                                            </a>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
