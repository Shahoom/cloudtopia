'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import type { BlogPostMeta } from '@/lib/blog'

type BlogTeaserProps = {
    posts: BlogPostMeta[]
}

export default function BlogTeaser({ posts }: BlogTeaserProps) {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const badge = t.home?.blogTeaser?.badge || 'From our journal'
    const title = t.home?.blogTeaser?.title || 'Field notes from the build'
    const titleHighlight = t.home?.blogTeaser?.titleHighlight || 'digital transformation, explained'
    const description = t.home?.blogTeaser?.description
    const readMore = t.home?.blogTeaser?.readMore || 'Read article'
    const viewAll = t.home?.blogTeaser?.viewAll || 'Read all articles'
    const readTime = t.home?.blogTeaser?.readTime || 'min read'

    if (!posts || posts.length === 0) return null

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a] overflow-hidden"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.18), transparent), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(14,165,233,0.14), transparent)',
                }}
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-5`}
                        >
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white/80">
                                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                                {badge}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-5"
                        >
                            {title}
                            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-primary-300 italic font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
                                {titleHighlight}
                            </span>
                        </motion.h2>

                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-base md:text-lg text-white/70 leading-relaxed"
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href={localePath(locale, '/blog')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-white text-sm font-semibold transition-colors group"
                        >
                            {viewAll}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {posts.slice(0, 3).map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <Link
                                href={localePath(locale, `/blog/${post.slug}`)}
                                className="group block h-full rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-neutral-900" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                                </div>

                                <div className="p-6">
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-200 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {post.excerpt && (
                                        <p className="text-sm text-white/65 leading-relaxed mb-5 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-xs text-white/50 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readingTime ? `${post.readingTime} ${readTime}` : ''}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                                            {readMore}
                                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
