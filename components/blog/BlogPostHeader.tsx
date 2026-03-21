'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/blog'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Clock, Calendar, User, Globe } from 'lucide-react'

interface BlogPostHeaderProps {
    post: BlogPost
    translations: {
        publishedOn: string
        readingTime: string
        readInAnotherLanguage: string
    }
}

const LANG_LABELS: Record<string, string> = {
    en: 'English',
    ar: 'العربية',
    tr: 'Türkçe',
}

const LANG_ARIA: Record<string, string> = {
    en: 'Read in English',
    ar: 'اقرأ بالعربية',
    tr: "Türkçe oku",
}

export default function BlogPostHeader({ post, translations }: BlogPostHeaderProps) {
    const isRtl = post.lang === 'ar'

    return (
        <header
            className="relative w-full min-h-[440px] md:min-h-[580px] flex flex-col justify-end overflow-hidden bg-slate-50"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* Background Layer */}
            {post.coverImage ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    {/* Multi-layered overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
            ) : (
                <div className="absolute inset-0 z-0">
                    <AuroraBackground
                        className="absolute inset-0 h-full w-full bg-white"
                        showRadialGradient={true}
                        style={{
                            ['--aurora' as string]: 'repeating-linear-gradient(100deg, #bae6fd_10%, #c7d2fe_15%, #bae6fd_20%, #f4f1f8_25%, #bae6fd_30%)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
            )}

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 pt-32">
                <div className="flex flex-col items-center text-center">
                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-2 mb-8"
                    >
                        {post.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-[28px] sm:text-[34px] md:text-[56px] font-extrabold text-slate-900 tracking-[-0.02em] md:tracking-[-0.03em] leading-[1.2] md:leading-[1.1] mb-8 md:mb-12 max-w-[840px] px-2 ${isRtl ? "font-['Scheherazade_New'] leading-normal" : "font-['Poppins']"}`}
                    >
                        {post.title}
                    </motion.h1>

                    {/* Meta Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-3 sm:p-2 px-6 rounded-2xl sm:rounded-full bg-white/70 backdrop-blur-md border border-white shadow-xl shadow-slate-200/50"
                    >
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-indigo-500" />
                            <span className="font-bold text-slate-800 text-[14px]">{post.author}</span>
                        </div>

                        <div className="hidden sm:block w-px h-4 bg-slate-200" />

                        {/* Date */}
                        <div className="flex items-center gap-2 text-slate-500 text-[14px]">
                            <Calendar className="w-4 h-4 text-sky-500" />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>

                        <div className="hidden sm:block w-px h-4 bg-slate-200" />

                        {/* Reading Time */}
                        <div className="flex items-center gap-2 text-slate-500 text-[14px]">
                            <Clock className="w-4 h-4 text-sky-500" />
                            <span>
                                {post.readingTime.toString().includes(' ')
                                    ? post.readingTime.toString()
                                    : `${post.readingTime} ${translations.readingTime}`}
                            </span>
                        </div>
                    </motion.div>

                    {/* Language Switcher Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="mt-12 flex items-center gap-3"
                    >
                        <div className="flex items-center gap-2 text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                            <Globe className="w-3.5 h-3.5" />
                            {translations.readInAnotherLanguage}
                        </div>
                        <nav
                            aria-label={translations.readInAnotherLanguage}
                            className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200"
                        >
                            {(['en', 'ar', 'tr'] as const).map(l => (
                                <Link
                                    key={l}
                                    href={`/${l}/blog/${post.slug}`}
                                    aria-label={LANG_ARIA[l]}
                                    aria-current={post.lang === l ? 'page' : undefined}
                                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${post.lang === l
                                        ? 'bg-white text-sky-600 shadow-sm'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {LANG_LABELS[l]}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                </div>
            </div>
        </header>
    )
}
