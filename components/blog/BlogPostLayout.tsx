'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BlogPost, BlogPostMeta } from '@/lib/blog'
import BlogPostHeader from './BlogPostHeader'
import TableOfContents from './TableOfContents'
import BlogCard from './BlogCard'
import { MoveLeft, MoveRight, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { RouteAlternatesPublisher, type RouteAlternates } from '@/lib/i18n/RouteAlternatesContext'
import type { Locale } from '@/lib/i18n/config'

interface BlogPostLayoutProps {
    post: BlogPost
    morePosts: BlogPostMeta[]
    children: React.ReactNode
    translations: {
        readingTime: string
        publishedOn: string
        backToBlog: string
        tableOfContents: string
        moreArticles: string
        tags: string
        sharePost: string
        readInAnotherLanguage: string
        readMore: string
        onThisPage: string
    }
    alternateSlugs: Record<string, string>
}

export default function BlogPostLayout({ post, morePosts, children, translations, alternateSlugs }: BlogPostLayoutProps) {
    const isRtl = post.lang === 'ar'
    const [copied, setCopied] = useState(false)

    // Publish localized URLs for the global LanguageSwitcher so switching
    // locale on a blog post lands on the *correct* native-script slug
    // instead of a 404. We use the resolved alternateSlugs map and fall
    // back to the current slug when a particular locale isn't translated.
    const localizedHrefs = useMemo<RouteAlternates>(() => {
        const out: RouteAlternates = {}
        const localesList: Locale[] = ['en', 'ar', 'tr']
        for (const loc of localesList) {
            const slug = alternateSlugs[loc] || (loc === post.lang ? post.slug : undefined)
            if (slug) {
                out[loc] = `/${loc}/blog/${encodeURIComponent(slug)}`
            }
        }
        return out
    }, [alternateSlugs, post.lang, post.slug])

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleTwitterShare = () => {
        if (typeof window !== 'undefined') {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')
        }
    }

    const handleLinkedInShare = () => {
        if (typeof window !== 'undefined') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')
        }
    }

    return (
        <article className="min-h-screen bg-[var(--blog-bg)] text-[var(--blog-text)] font-['Inter']" dir={isRtl ? 'rtl' : 'ltr'}>
            <RouteAlternatesPublisher value={localizedHrefs} />
            <BlogPostHeader post={post} translations={translations} />

            <div className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 relative flex flex-col lg:flex-row items-start gap-12 xl:gap-24">

                {/* Left Sidebar: TOC (Desktop) */}
                <aside className="hidden lg:block w-[320px] shrink-0 sticky top-24">
                    <TableOfContents content={post.content} lang={post.lang} title={translations.onThisPage} />
                </aside>

                {/* Main Content Area */}
                <div className="flex-grow w-full max-w-3xl mx-auto lg:mx-0">

                    {/* Mobile TOC */}
                    <div className="block lg:hidden w-full mb-10">
                        <TableOfContents content={post.content} lang={post.lang} title={translations.onThisPage} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {children}
                    </motion.div>

                    {/* Post Footer */}
                    <div className="mt-20 pt-10 border-t border-[var(--blog-border)] space-y-12">

                        {/* Tags and Share Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <h4 className="text-[13px] font-semibold tracking-widest uppercase text-[var(--blog-text-dim)] mb-4">
                                    {translations.tags}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-[13px] font-medium bg-[var(--blog-surface-3)] text-[var(--blog-indigo)] border border-[var(--blog-border)]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[13px] font-semibold tracking-widest uppercase text-[var(--blog-text-dim)] mb-4 md:text-right rtl:md:text-left">
                                    {translations.sharePost}:
                                </h4>
                                <div className="flex items-center gap-3">
                                    <button onClick={handleTwitterShare} className="w-10 h-10 rounded-full border border-[var(--blog-border)] flex items-center justify-center text-[var(--blog-text-muted)] hover:text-[var(--blog-sky)] hover:border-[var(--blog-sky)] hover:shadow-[var(--blog-glow-sky)] transition-all">
                                        <Twitter className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleLinkedInShare} className="w-10 h-10 rounded-full border border-[var(--blog-border)] flex items-center justify-center text-[var(--blog-text-muted)] hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleCopy} className="w-10 h-10 rounded-full border border-[var(--blog-border)] flex items-center justify-center text-[var(--blog-text-muted)] hover:text-[var(--blog-text)] transition-all relative">
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Language Switcher Footer */}
                        <nav
                            aria-label={translations.readInAnotherLanguage}
                            className="p-6 rounded-[var(--blog-radius)] bg-[var(--blog-surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <span className="text-[14px] font-semibold text-[var(--blog-text)]">
                                {translations.readInAnotherLanguage}:
                            </span>
                            <div className="flex items-center gap-2" role="list">
                                {(
                                    [
                                        { code: 'en', label: 'English', ariaLabel: post.lang === 'en' ? 'Already in English' : 'Read in English' },
                                        { code: 'ar', label: 'العربية', ariaLabel: post.lang === 'ar' ? 'أنت تقرأ بالعربية بالفعل' : 'اقرأ بالعربية' },
                                        { code: 'tr', label: 'Türkçe', ariaLabel: post.lang === 'tr' ? 'Zaten Türkçe okuyorsunuz' : 'Türkçe oku' },
                                    ] as const
                                ).map(({ code, label, ariaLabel }) => (
                                    <Link
                                        key={code}
                                        href={`/${code}/blog/${encodeURIComponent(alternateSlugs[code] || post.slug)}`}
                                        aria-label={ariaLabel}
                                        aria-current={post.lang === code ? 'page' : undefined}
                                        role="listitem"
                                        className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${post.lang === code
                                            ? 'bg-[var(--blog-sky)] text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)]'
                                            : 'bg-white border border-[var(--blog-border)] text-[var(--blog-text-muted)] hover:text-[var(--blog-text)]'
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Back to Blog */}
                        <div className="pt-4 border-t border-[var(--blog-border)]">
                            <Link
                                href={`/${post.lang}/blog`}
                                className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--blog-sky)] hover:text-[var(--blog-indigo)] transition-colors font-['Poppins']"
                            >
                                {isRtl ? (
                                    <><MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> {translations.backToBlog}</>
                                ) : (
                                    <><MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {translations.backToBlog}</>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Articles Section */}
            {morePosts.length > 0 && (
                <div className="w-full bg-[var(--blog-bg)] border-t border-slate-100 mt-20">
                    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className={`text-[28px] md:text-[36px] font-bold text-[#0f172a] ${isRtl ? 'font-[\'Scheherazade_New\']' : 'font-[\'Poppins\']'}`}>
                                {translations.moreArticles}
                            </h3>
                            <Link
                                href={`/${post.lang}/blog`}
                                className="text-sm font-semibold text-[var(--blog-sky)] hover:text-[var(--blog-indigo)] transition-colors"
                            >
                                {translations.backToBlog} →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {morePosts.slice(0, 3).map(p => (
                                <BlogCard
                                    key={p.slug}
                                    post={p}
                                    translations={{
                                        readMore: translations.readMore,
                                        readingTime: translations.readingTime
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}
