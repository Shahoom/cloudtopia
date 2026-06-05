'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { sampleBlogPosts } from '@/lib/blog/sample-content'

export default function InsightsTeaser() {
    const { locale, t } = useLanguage()
    const isRTL = locale === 'ar'
    // Show 3 featured or latest posts
    const posts = sampleBlogPosts.slice(0, 3)
    const teaser = t.home?.blogTeaser || {}

    return (
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950 overflow-hidden" data-header-theme="dark" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6 backdrop-blur-md"
                        >
                            <BookOpen className="w-4 h-4" />
                            {teaser.badge || 'From our journal'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4"
                        >
                            {teaser.title || 'Field notes from the build'}{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic pr-2">
                                {teaser.titleHighlight || 'digital transformation, explained'}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-neutral-400 leading-relaxed"
                        >
                            {teaser.description || 'Practical writing on cloud systems, AI tools, and digital transformation.'}
                        </motion.p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href={localePath(locale, '/insights')}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-neutral-900 group backdrop-blur-md"
                        >
                            {teaser.viewAll || 'Read all articles'}
                            <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                        >
                            <div className="relative h-48 w-full bg-neutral-900 shrink-0 overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
                                {post.coverImage ? (
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-90 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20" />
                                )}
                                
                                <div className="absolute top-4 left-4 flex gap-2 z-10">
                                    <span className="rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex items-center gap-3 text-xs font-medium text-neutral-400 mb-3">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        5 min read
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                                    <span className="flex items-center gap-1.5 text-cyan-400">
                                        <Tag className="w-3.5 h-3.5" />
                                        {post.contentType || 'guide'}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold leading-snug text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-sm leading-relaxed text-neutral-400 mb-6 flex-1 line-clamp-3">
                                    {post.shortExcerpt || post.excerpt}
                                </p>
                                
                                <div className="mt-auto">
                                    <Link 
                                        href={localePath(locale, `/insights/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`)} 
                                        className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        {teaser.readMore || 'Read article'}
                                        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
