'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowUpRight } from 'lucide-react'
import { en } from '@/lib/i18n/translations/en'
import { ar } from '@/lib/i18n/translations/ar'

export default function EnterpriseGrowthCTA() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const staticDict = isRTL ? ar : en
    const ctaData = t?.home?.enterpriseGrowthCTA || staticDict.home.enterpriseGrowthCTA

    const whatsappNumber = '96895886393'
    const msg = isRTL
        ? 'مرحبًا CloudTopia، أنا مهتم ببناء حل رقمي لعملي وأرغب بمناقشة مشروعي معكم.'
        : 'Hello CloudTopia, I’m interested in building a digital solution for my business. I would like to discuss my project.'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`

    return (
        <section 
            className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10" 
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="max-w-[1520px] mx-auto">
                <div className="relative overflow-hidden bg-black border border-neutral-900 rounded-[28px] md:rounded-[36px] py-14 md:py-20 px-6 sm:px-12 md:px-16 text-center shadow-2xl">
                    {/* Fuchsia/Purple Sweep on the left (matching the reference sweep curve) */}
                    <div className="absolute -left-16 -bottom-48 w-[580px] h-[360px] rounded-full border-t-[36px] border-r-[12px] border-fuchsia-600 blur-[28px] opacity-75 transform rotate-[16deg] pointer-events-none" />
                    <div className="absolute -left-16 -bottom-48 w-[580px] h-[360px] rounded-full border-t-[18px] border-r-[6px] border-white/80 blur-[4px] opacity-90 transform rotate-[16deg] pointer-events-none" />

                    {/* Soft purple ambient glow behind fuchsia sweep */}
                    <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

                    {/* Copper/Orange/Red Sweep on the right (matching the reference sweep curve) */}
                    <div className="absolute -right-20 -bottom-44 w-[520px] h-[330px] rounded-full border-t-[28px] border-l-[12px] border-orange-600/35 blur-[35px] opacity-70 transform -rotate-[22deg] pointer-events-none" />
                    <div className="absolute -right-20 -bottom-44 w-[520px] h-[330px] rounded-full border-t-[10px] border-l-[4px] border-amber-500/70 blur-[8px] opacity-80 transform -rotate-[22deg] pointer-events-none" />

                    {/* Soft amber ambient glow behind orange sweep */}
                    <div className="absolute -right-32 -bottom-32 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Subtle grid lines or pattern for high-tech look */}
                    <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
                        >
                            {ctaData?.headline}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xs sm:text-sm md:text-base text-slate-400 mb-8 max-w-2xl leading-relaxed"
                        >
                            {ctaData?.subheadline}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#0088FF] to-[#0066EE] hover:from-[#0066EE] hover:to-[#0088FF] transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {ctaData?.cta}
                                <ArrowUpRight className={`w-4.5 h-4.5 ${isRTL ? 'rotate-90' : ''}`} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
