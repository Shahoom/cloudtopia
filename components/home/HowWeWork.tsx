'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { howWeWorkData } from '@/data/howWeWorkData'

const StarsCanvas = dynamic(
    () => import('@/components/ui/stars-canvas').then((mod) => mod.StarsCanvas),
    { ssr: false }
)

export default function HowWeWork() {
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'
    const l = locale as 'en' | 'ar'
    const data = howWeWorkData

    const [activeTab, setActiveTab] = useState(0)

    const activeProcess = data.processTypes[activeTab]

    const whatsappMessage = encodeURIComponent(data.cta.whatsappMessage[l])
    const whatsappUrl = `https://wa.me/${data.cta.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`

    return (
        <section
            className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-eerie overflow-hidden"
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
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.05),transparent_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            {data.header.badge[l]}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] mb-6"
                    >
                        <span className="hidden md:inline">{data.header.title[l]}</span>
                        <span className="md:hidden">{'titleMobile' in data.header ? (data.header.titleMobile as any)[l] : data.header.title[l]}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto"
                    >
                        {data.header.description[l]}
                    </motion.p>
                </div>

                {/* Tab Switcher */}
                <div className="mb-10">
                    <div className="flex justify-center overflow-x-auto pb-4 hide-scrollbar">
                        <div className="inline-flex items-center p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                            {data.processTypes.map((tab, idx) => {
                                const isActive = activeTab === idx
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(idx)}
                                        className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                            isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabIndicator"
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-primary-600 rounded-full shadow-lg shadow-cyan-500/25"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab.label[l]}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <p className="text-sm md:text-base text-cyan-200/80 max-w-2xl mx-auto font-medium bg-cyan-950/30 border border-cyan-800/30 px-6 py-3 rounded-2xl">
                            {activeProcess.description[l]}
                        </p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="relative mb-14 mt-10">
                    <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    {/* Mobile vertical line */}
                    <div className={`lg:hidden absolute top-[44px] bottom-0 ${isRTL ? 'right-[44px]' : 'left-[44px]'} w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent z-0`} />

                    <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                        <AnimatePresence mode="wait">
                            {activeProcess.steps.map((step, i) => {
                                const Icon = step.icon
                                return (
                                    <motion.div
                                        key={`${activeProcess.id}-${step.number}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="group relative flex lg:block items-start gap-6 lg:gap-0"
                                    >
                                        <div className="relative z-10 flex justify-center mb-0 lg:mb-8 shrink-0">
                                            <div className="relative w-[88px] h-[88px]">
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-secondary-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 backdrop-blur-sm flex items-center justify-center group-hover:border-white/30 transition-colors shadow-xl">
                                                    <Icon className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
                                                </div>
                                                <div className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-primary-500 text-eerie font-bold text-sm flex items-center justify-center shadow-lg shadow-cyan-500/40`}>
                                                    {step.number}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:text-center flex-1 pt-2 lg:pt-0 lg:px-2">
                                            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-200">
                                                {step.duration[l]}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                                {step.title[l]}
                                            </h3>
                                            <p className="text-sm md:text-base text-white/65 leading-relaxed">
                                                {step.description[l]}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Trust Bar */}
                <div className="max-w-5xl mx-auto mt-14">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md text-center">
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
                            {data.trustBar.items[l].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    <span className="text-sm md:text-base font-semibold text-white/90">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-white/40 max-w-2xl mx-auto">
                            {data.trustBar.note[l]}
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-white/80 font-medium mb-6">{data.cta.text[l]}</p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-eerie bg-gradient-to-r from-cyan-400 to-primary-400 rounded-full hover:from-cyan-300 hover:to-primary-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1"
                    >
                        {data.cta.button[l]}
                        <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
