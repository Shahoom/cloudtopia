'use client'

import { motion } from 'framer-motion'

interface BlogTagFilterProps {
    tags: string[]
    activeTag: string | null
    onTagSelect: (tag: string | null) => void
    allPostsText: string
    lang: 'en' | 'ar' | 'tr'
}

export default function BlogTagFilter({ tags, activeTag, onTagSelect, allPostsText, lang }: BlogTagFilterProps) {
    const isRtl = lang === 'ar'

    return (
        <div
            className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {[{ tag: null as string | null, label: allPostsText }, ...tags.map(t => ({ tag: t, label: t }))].map(({ tag, label }) => {
                const isActive = activeTag === tag
                return (
                    <button
                        key={tag ?? '__all__'}
                        onClick={() => onTagSelect(tag)}
                        className={`relative px-4 py-2 rounded-full text-[13px] font-semibold font-['Inter'] transition-all duration-200 outline-none whitespace-nowrap border ${isActive
                            ? 'text-white border-transparent'
                            : 'text-slate-500 border-slate-200 bg-white hover:border-slate-300 hover:text-slate-800'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeBlogTag"
                                className="absolute inset-0 rounded-full -z-10"
                                style={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                                }}
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                            />
                        )}
                        <span className="relative z-10">{label}</span>
                    </button>
                )
            })}
        </div>
    )
}
