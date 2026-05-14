'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, HelpCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'

type FAQItem = {
    question: string
    answer: string
}

export default function FAQ() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const badge = t.home?.faq?.badge || 'Common questions'
    const title = t.home?.faq?.title || 'Answers before you email us'
    const titleHighlight = t.home?.faq?.titleHighlight || 'straight, no sales pitch'
    const description = t.home?.faq?.description
    const items: FAQItem[] = (t.home?.faq?.items as FAQItem[]) || []

    if (items.length === 0) return null

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-lavender overflow-hidden"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] bg-secondary-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[380px] h-[380px] bg-primary-200/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`flex ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} justify-center lg:justify-start mb-6`}
                        >
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-xs font-bold uppercase tracking-widest text-secondary-700">
                                <HelpCircle className="w-3.5 h-3.5" />
                                {badge}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-4 text-center lg:text-start"
                        >
                            {title}{' '}
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-secondary-700 italic font-serif text-xl md:text-2xl lg:text-3xl font-semibold">
                                {titleHighlight}
                            </span>
                        </motion.h2>

                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8 text-center lg:text-start"
                            >
                                {description}
                            </motion.p>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className={`flex ${isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}
                        >
                            <Link
                                href={localePath(locale, '/contact')}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
                            >
                                <MessageCircle className="w-4 h-4" />
                                {t.home?.faq?.contactCTA || (locale === 'ar' ? 'لا تجد سؤالك؟ راسلنا' : locale === 'tr' ? 'Sorunu bulamadın mı? Bize yaz' : 'Don\'t see your question? Email us')}
                            </Link>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="space-y-3">
                            {items.map((item, i) => {
                                const isOpen = openIndex === i
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.4, delay: i * 0.04 }}
                                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                            ? 'bg-white border-neutral-900 shadow-lg'
                                            : 'bg-white/70 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className={`w-full flex items-start gap-4 p-5 md:p-6 ${isRTL ? 'text-right' : 'text-left'}`}
                                            aria-expanded={isOpen}
                                        >
                                            <span className="shrink-0 mt-0.5 text-xs font-mono font-bold text-neutral-400 tabular-nums">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="flex-1 text-base md:text-lg font-semibold text-neutral-900 leading-snug">
                                                {item.question}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                                                    }`}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className={`px-5 md:px-6 pb-6 pt-0 ${isRTL ? 'pr-14 md:pr-16' : 'pl-14 md:pl-16'}`}>
                                                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
