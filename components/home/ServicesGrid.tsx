'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Globe,
    ShoppingCart,
    Utensils,
    Layers,
    Cpu,
    Megaphone,
    ArrowRight,
    ArrowUpRight,
    LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { GlowingEffect } from '@/components/ui/glowing-effect'

type ServiceCard = {
    icon: string
    title: string
    description: string
    link: string
    tag?: string
}

const ICON_MAP: Record<string, LucideIcon> = {
    Globe,
    ShoppingCart,
    Utensils,
    Layers,
    Cpu,
    Megaphone,
}

export default function ServicesGrid() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const badge = t.home?.servicesGrid?.badge || 'What we build'
    const title = t.home?.servicesGrid?.title || 'From first click to full platform —'
    const titleHighlight = t.home?.servicesGrid?.titleHighlight || 'one team, one invoice'
    const description = t.home?.servicesGrid?.description
    const viewAll = t.home?.servicesGrid?.viewAll || 'Browse all services'
    const cards: ServiceCard[] = (t.home?.servicesGrid?.cards as ServiceCard[]) || []

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 75%)',
                }}
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-6`}
                    >
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-700 text-xs font-bold uppercase tracking-widest">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6"
                    >
                        {title}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-500 bg-clip-text text-transparent">
                                {titleHighlight}
                            </span>
                            <span className="absolute inset-x-0 bottom-1 h-3 bg-primary-100/60 -z-0 rounded-sm" />
                        </span>
                    </motion.h2>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg md:text-xl text-neutral-600 leading-relaxed"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {cards.map((card, i) => {
                        const Icon = ICON_MAP[card.icon] || Globe
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <div
                                    className="relative h-full rounded-2xl p-[1.5px] transition-shadow duration-500 hover:-translate-y-1 hover:shadow-xl"
                                    style={{
                                        background:
                                            'conic-gradient(from 180deg at 50% 50%, rgba(14,165,233,0.35), rgba(139,92,246,0.25), rgba(236,72,153,0.3), rgba(14,165,233,0.35))',
                                    }}
                                >
                                    <GlowingEffect
                                        spread={48}
                                        glow={true}
                                        disabled={false}
                                        proximity={96}
                                        inactiveZone={0.05}
                                        borderWidth={2}
                                    />
                                    <Link
                                        href={`/${locale}${card.link}`}
                                        className="group relative flex flex-col h-full p-7 md:p-8 rounded-[calc(1rem-1px)] bg-white transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative flex items-start justify-between mb-6">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-neutral-200 flex items-center justify-center group-hover:from-primary-100 group-hover:to-secondary-100 transition-colors">
                                                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-700" strokeWidth={1.75} />
                                            </div>
                                            {card.tag && (
                                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                                                    {card.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="relative text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="relative text-neutral-600 text-sm md:text-base leading-relaxed flex-1 mb-5">
                                            {card.description}
                                        </p>

                                        <div className="relative flex items-center gap-1.5 text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors">
                                            <span>{t.common?.learnMore || t.home?.common?.learnMore || 'Learn more'}</span>
                                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 md:mt-16 flex justify-center"
                >
                    <Link
                        href={`/${locale}/services`}
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
                    >
                        {viewAll}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
