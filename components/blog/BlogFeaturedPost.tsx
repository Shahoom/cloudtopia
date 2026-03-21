'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BlogPostMeta } from '@/lib/blog'
import { ArrowRight, ArrowLeft, Clock, Calendar, User } from 'lucide-react'

export function getPlaceholderGradientForTag(tag?: string) {
    if (!tag) return 'linear-gradient(135deg, #e0e7ff, #f4f1f8)'
    const t = tag.toLowerCase()
    if (t.includes('cloud') || t.includes('سحاب') || t.includes('bulut')) return 'linear-gradient(135deg, #bae6fd, #e0f2fe)'
    if (t.includes('ai') || t.includes('ذكاء') || t.includes('yapay') || t.includes('data')) return 'linear-gradient(135deg, #c7d2fe, #e0e7ff)'
    if (t.includes('dev') || t.includes('code') || t.includes('تطوير')) return 'linear-gradient(135deg, #99f6e4, #bae6fd)'
    return 'linear-gradient(135deg, #e0e7ff, #f4f1f8)'
}

const FEATURED_LABEL: Record<string, string> = {
    en: 'Featured',
    ar: 'مميز',
    tr: 'Öne Çıkan',
}

interface BlogFeaturedPostProps {
    post: BlogPostMeta
    translations: {
        readMore: string
        readingTime: string
    }
}

export default function BlogFeaturedPost({ post, translations }: BlogFeaturedPostProps) {
    const isRtl = post.lang === 'ar'
    const fallbackGradient = getPlaceholderGradientForTag(post.tags[0])
    const Arrow = isRtl ? ArrowLeft : ArrowRight

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="group relative flex flex-col md:flex-row rounded-3xl overflow-hidden mb-14 border border-slate-200/70 bg-white shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.12)] transition-all duration-400"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* Image side */}
            <Link
                href={`/${post.lang}/blog/${post.slug}`}
                className="relative w-full md:w-[52%] h-[260px] md:h-auto overflow-hidden shrink-0"
                tabIndex={-1}
                aria-hidden
            >
                {post.coverImage ? (
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        priority
                        sizes="(max-width: 768px) 100vw, 52vw"
                    />
                ) : (
                    <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                        style={{ background: fallbackGradient }}
                    >
                        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="fp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M0 40V0h40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#fp-grid)" />
                        </svg>
                    </div>
                )}
                {/* Edge blend to content */}
                <div className={`absolute inset-y-0 ${isRtl ? 'left-0 bg-gradient-to-l' : 'right-0 bg-gradient-to-r'} from-transparent to-white w-20 hidden md:block z-10`} />
            </Link>

            {/* Content side */}
            <div className="relative flex flex-col justify-center p-8 md:p-10 md:pl-6 w-full md:w-[48%]">
                {/* Featured badge */}
                <div className="inline-flex items-center gap-1.5 mb-5 self-start">
                    <span
                        className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full border text-indigo-600 border-indigo-200 bg-indigo-50"
                    >
                        {FEATURED_LABEL[post.lang] || FEATURED_LABEL.en}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <Link href={`/${post.lang}/blog/${post.slug}`} className="block mb-4">
                    <h2 className={`text-[26px] lg:text-[32px] font-bold text-slate-900 leading-[1.25] tracking-[-0.02em] line-clamp-3 group-hover:text-sky-600 transition-colors ${isRtl ? "font-['Scheherazade_New']" : "font-['Poppins']"}`}>
                        {post.title}
                    </h2>
                </Link>

                {/* Excerpt */}
                <p className={`text-[15px] text-slate-500 line-clamp-3 mb-8 leading-relaxed ${isRtl ? "font-['Noto_Naskh_Arabic']" : "font-['Inter']"}`}>
                    {post.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="mt-auto flex flex-col gap-5">
                    <div className="flex items-center gap-4 text-[13px] text-slate-400 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-semibold text-slate-700 text-[13px]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                                {post.readingTime.toString().includes(' ')
                                    ? post.readingTime.toString()
                                    : `${post.readingTime} ${translations.readingTime}`}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/${post.lang}/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 self-start font-semibold text-[14px] text-sky-600 hover:text-indigo-600 transition-colors group/cta"
                    >
                        {translations.readMore}
                        <Arrow className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
