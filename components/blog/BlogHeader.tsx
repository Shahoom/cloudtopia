'use client'

import { motion } from 'framer-motion'
import { Pen, Globe2, Zap } from 'lucide-react'

export default function BlogHeader({
    title,
    subtitle,
    postCount,
    lang
}: {
    title: string
    subtitle: string
    postCount: number
    lang: 'en' | 'ar' | 'tr'
}) {
    const isRtl = lang === 'ar'

    const stats = [
        {
            icon: Pen,
            label: lang === 'ar' ? 'المقالات' : lang === 'tr' ? 'Makaleler' : 'Articles',
            value: postCount,
            color: 'text-sky-600',
            bg: 'bg-sky-50',
        },
        {
            icon: Globe2,
            label: lang === 'ar' ? 'اللغات' : lang === 'tr' ? 'Diller' : 'Languages',
            value: 3,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
        {
            icon: Zap,
            label: lang === 'ar' ? 'التحديث' : lang === 'tr' ? 'Güncelleme' : 'Weekly',
            value: lang === 'ar' ? 'أسبوعي' : lang === 'tr' ? 'Haftalık' : 'Weekly',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
    ]

    return (
        <div
            className="relative w-full overflow-hidden"
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{ background: 'linear-gradient(160deg, #f8faff 0%, #f0f4ff 50%, #fafbff 100%)' }}
        >
            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #6366f1 1px, transparent 1px),
                        linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                    `,
                    backgroundSize: '72px 72px',
                }}
            />

            {/* Soft glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-sky-300/12 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-300/12 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-40 md:pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/70 shadow-sm shadow-sky-100/60 mb-8">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                        </span>
                        <span className="text-[11px] font-black tracking-[0.18em] uppercase text-sky-600 font-['Inter']">
                            {lang === 'ar' ? 'مدونة كلاودتوبيا' : lang === 'tr' ? 'Cloudtopia Blog' : 'Cloudtopia Blog'}
                        </span>
                    </div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="font-['Poppins'] text-[32px] sm:text-[42px] md:text-[62px] font-extrabold text-slate-900 leading-[1.2] md:leading-[1.1] tracking-[-0.02em] md:tracking-[-0.03em] max-w-4xl mb-6 px-2"
                    >
                        {lang === 'ar' ? (
                            <span className="font-['Scheherazade_New'] block pb-2">
                                نكتب عن{' '}
                                <span className="inline-block text-transparent bg-clip-text" style={{
                                    backgroundImage: 'linear-gradient(135deg, #0ea5e9, #6366f1, #818cf8)',
                                    WebkitBackgroundClip: 'text'
                                }}>
                                    المستقبل الرقمي
                                </span>
                            </span>
                        ) : lang === 'tr' ? (
                            <>
                                <span className="text-transparent bg-clip-text" style={{
                                    backgroundImage: 'linear-gradient(135deg, #0ea5e9, #6366f1, #818cf8)',
                                    WebkitBackgroundClip: 'text'
                                }}>
                                    Dijital geleceği
                                </span>{' '}yazıyoruz
                            </>
                        ) : (
                            <>
                                The{' '}
                                <span className="text-transparent bg-clip-text" style={{
                                    backgroundImage: 'linear-gradient(135deg, #0ea5e9, #6366f1, #818cf8)',
                                    WebkitBackgroundClip: 'text'
                                }}>
                                    Future of Cloud
                                </span>
                                {' '}& Digital Strategy
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="font-['Inter'] text-[16px] md:text-[19px] text-slate-500 max-w-2xl mb-12 leading-relaxed px-4"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.26 }}
                        className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-0"
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100 w-full sm:w-auto"
                            >
                                <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                                <div className="text-left rtl:text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">{stat.label}</p>
                                    <p className="text-[15px] font-bold text-slate-800 leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom edge fade */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[var(--blog-bg)] to-transparent pointer-events-none" />
        </div>
    )
}
