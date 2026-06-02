'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { sampleBlogPosts } from '@/lib/blog/sample-content'

export default function InsightsTeaser() {
    const { locale, t } = useLanguage()
    const isRTL = locale === 'ar'
    const posts = sampleBlogPosts.slice(0, 3)
    const teaser = t.home?.blogTeaser || {}

    return (
        <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden" data-header-theme="light" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="relative max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-14">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-bold uppercase tracking-widest text-primary-700 mb-6">
                            <BookOpen className="w-3.5 h-3.5" />
                            {teaser.badge || 'From our journal'}
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
                            {teaser.title || 'Field notes from the build'}{' '}
                            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                {teaser.titleHighlight || 'digital transformation, explained'}
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                            {teaser.description || 'Practical writing on cloud systems, AI tools, and digital transformation.'}
                        </p>
                    </div>
                    <Link
                        href={localePath(locale, '/insights')}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-800"
                    >
                        {teaser.viewAll || 'Read all articles'}
                        <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
                            className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
                        >
                            <div className="mb-5 flex flex-wrap gap-2">
                                <span className="rounded-full bg-lavender px-3 py-1 text-xs font-bold text-primary-700">{post.category}</span>
                                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600">{post.contentType || 'guide'}</span>
                            </div>
                            <h3 className="text-xl font-bold leading-tight text-neutral-900 mb-3">{post.title}</h3>
                            <p className="text-sm leading-relaxed text-neutral-600 mb-6">{post.shortExcerpt || post.excerpt}</p>
                            <Link href={localePath(locale, `/insights/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`)} className="inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                                {teaser.readMore || 'Read article'}
                                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
