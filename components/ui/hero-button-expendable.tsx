"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AuroraFlux } from "@/components/ui/aurora-flux"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import Link from "next/link"

export default function Hero() {
    const { locale, t } = useLanguage()
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    const cyclingWords = (t.home?.hero?.titleHighlights as string[]) ||
        (locale === 'ar' ? ['السحابة', 'الإنترنت', 'العالم الرقمي'] : ['Cloud', 'Internet', 'Digital World'])

    const gradientColors = [
        'from-blue-400 via-cyan-400 to-teal-400',
        'from-purple-400 via-pink-400 to-rose-400',
        'from-emerald-400 via-teal-400 to-cyan-400',
    ]

    // Cycle through words
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [cyclingWords.length])

    const isRTL = locale === 'ar'
    const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] px-4 sm:px-6 py-12 sm:py-20 transition-colors duration-300">

            {/* AuroraFlux Background - Dynamic flowing aurora effect */}
            <div className="absolute inset-0 pointer-events-none">
                <AuroraFlux
                    fullScreen={false}
                    pauseWhenHidden={true}
                    pauseOnHover={false}
                    mix={0.5}
                    className="absolute inset-0 opacity-[0.15]" // Decreased waves
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                    ariaLabel="Dynamic aurora background effect"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90" />
            </div>

            <div className={`relative z-10 flex flex-col items-center gap-4 sm:gap-8 text-center ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-white/60 px-3 py-1 text-sm font-medium text-neutral-800 backdrop-blur-sm shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                    {t.header?.tagline || 'Digital & Cloud Technologies'}
                </motion.div>

                <motion.h1
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 max-w-5xl"
                >
                    {isRTL ? 'ارتقِ بأعمالك' : 'Elevate Your Business'} <br className="hidden sm:block" />
                    <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 whitespace-nowrap mt-2">
                        <span className="text-neutral-900">{isRTL ? 'إلى' : 'Into the'}</span>
                        <div className="relative flex items-center h-[1.2em] min-w-[2ch]">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentWordIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                    className={`text-transparent bg-clip-text bg-gradient-to-br ${gradientColors[currentWordIndex]} whitespace-nowrap`}
                                >
                                    {cyclingWords[currentWordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.h1>

                <motion.p
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl px-4 leading-relaxed mt-2"
                >
                    {t.home?.hero?.description || 'CloudTopia empowers businesses to thrive in the digital era — from crafting stunning online presence, to building powerful systems and web applications, to pioneering innovation through cutting-edge technology.'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full sm:w-auto"
                >
                    <Link href={l('/contact')} className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-10 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        >
                            {t.home?.hero?.getStarted || 'Get Started'}
                            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </motion.button>
                    </Link>
                    <Link href={l('/services')} className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-10 py-3 text-lg font-semibold text-neutral-800 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md"
                        >
                            {isRTL ? 'مشاهدة الخدمات' : 'View Services'}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
