'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPostMeta } from '@/lib/blog'
import BlogCard from './BlogCard'
import BlogTagFilter from './BlogTagFilter'
import BlogFeaturedPost from './BlogFeaturedPost'
import { SearchX } from 'lucide-react'

interface BlogGridProps {
    posts: BlogPostMeta[]
    tags: string[]
    translations: {
        allPosts: string
        readMore: string
        readingTime: string
        noPostsFound: string
    }
}

export default function BlogGrid({ posts, tags, translations }: BlogGridProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null)

    const filteredPosts = activeTag
        ? posts.filter((post) => post.tags.includes(activeTag))
        : posts

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
    const gridPosts = filteredPosts.slice(1)

    const lang = posts.length > 0 ? (posts[0].lang as 'en' | 'ar' | 'tr') : 'en'
    const isRtl = lang === 'ar'

    return (
        <div className="w-full relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
            <BlogTagFilter
                tags={tags}
                lang={lang}
                activeTag={activeTag}
                onTagSelect={setActiveTag}
                allPostsText={translations.allPosts}
            />

            <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                    <motion.div
                        key={activeTag || 'all'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Featured Post */}
                        {featuredPost && (
                            <BlogFeaturedPost
                                post={featuredPost}
                                translations={translations}
                            />
                        )}

                        {/* Grid Posts */}
                        {gridPosts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gridPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                                        className="h-full"
                                    >
                                        <BlogCard post={post} translations={translations} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                            <SearchX className="w-7 h-7 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">{translations.noPostsFound}</h3>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
