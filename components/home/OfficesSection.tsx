'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { officesData } from '@/data/officesData'

export default function OfficesSection() {
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'
    const isEn = locale === 'en'

    const title = isEn ? "Our Offices" : "مكاتبنا"

    return (
        <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] overflow-hidden" data-header-theme="light" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-12 md:mb-16"
                >
                    {title}
                </motion.h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12">
                    {officesData.map((office, index) => (
                        <motion.div
                            key={office.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="group relative w-full max-w-[380px] h-[450px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={office.image}
                                    alt={office.country[isEn ? 'en' : 'ar']}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                {/* Light overlay to ensure text contrast if needed */}
                                <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-colors duration-500" />
                            </div>

                            {/* Info Box */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className={`relative overflow-hidden rounded-2xl bg-[#0f172a]/70 backdrop-blur-md p-6 lg:p-7 border border-white/10 group-hover:bg-[#0f172a]/85 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {office.country[isEn ? 'en' : 'ar']}
                                    </h3>
                                    <p className="text-neutral-300 text-sm font-medium mb-4">
                                        {office.capital[isEn ? 'en' : 'ar']}
                                    </p>
                                    <p className="text-white font-semibold flex items-center" dir="ltr" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                                        {office.phone}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
