'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Compass, Palette, Hammer, Rocket, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const StarsCanvas = dynamic(
    () => import('@/components/ui/stars-canvas').then((mod) => mod.StarsCanvas),
    { ssr: false }
)

type Step = {
    number: string
    title: string
    duration: string
    description: string
}

const STEP_ICONS: LucideIcon[] = [Compass, Palette, Hammer, Rocket]

export default function HowWeWork() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const badge = t.home?.howWeWork?.badge || 'Our process'
    const title = t.home?.howWeWork?.title || 'Four steps from brief to launch'
    const titleHighlight = t.home?.howWeWork?.titleHighlight || 'no mystery weeks in between'
    const description = t.home?.howWeWork?.description
    const steps: Step[] = (t.home?.howWeWork?.steps as Step[]) || []

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-eerie overflow-hidden"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <StarsCanvas
                transparent={false}
                maxStars={60}
                hue={260}
                brightness={0.5}
                speedMultiplier={0.25}
                twinkleIntensity={25}
                position="absolute"
                className="z-0"
            />

            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-eerie via-transparent to-eerie" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5"
                    >
                        {title}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary-300 to-secondary-300 italic font-serif">
                            {titleHighlight}
                        </span>
                    </motion.h2>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-white/70 leading-relaxed"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[44px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
                        {steps.map((step, i) => {
                            const Icon = STEP_ICONS[i] || Compass
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="relative z-10 flex justify-center mb-8">
                                        <div className="relative w-[88px] h-[88px]">
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-secondary-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 backdrop-blur-sm flex items-center justify-center group-hover:border-white/30 transition-colors">
                                                <Icon className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-primary-500 text-eerie font-bold text-sm flex items-center justify-center shadow-lg shadow-cyan-500/40">
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center px-2">
                                        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-200">
                                            {step.duration}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-white/65 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
