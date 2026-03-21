'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { motion } from 'framer-motion'

interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
    lang: 'en' | 'ar' | 'tr'
    title: string
}

export default function TableOfContents({ content, lang, title }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const headingLines = content.split('\n').filter((line) => line.match(/^#{2,3}\s/))
        const parsedHeadings = headingLines.map((line) => {
            const match = line.match(/^(#{2,3})\s+(.+)/)
            if (match) {
                const level = match[1].length
                const text = match[2]

                // Strip markdown formatting
                const cleanText = text
                    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
                    .replace(/[*_~`]/g, '')
                    .trim()

                const id = cleanText
                    .normalize('NFC')
                    .toLowerCase()
                    .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')

                return { id, text: cleanText, level }
            }
            return null
        }).filter(Boolean) as TOCItem[]

        setHeadings(parsedHeadings)
    }, [content])

    useEffect(() => {
        if (headings.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-10% 0px -80% 0px' }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    const isRtl = lang === 'ar'

    const NavContent = () => (
        <nav className="flex flex-col mt-4 space-y-0.5" dir={isRtl ? 'rtl' : 'ltr'}>
            {headings.map((heading) => {
                const isActive = activeId === heading.id
                return (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault()
                            setMobileOpen(false)
                            const element = document.getElementById(heading.id);
                            if (element) {
                                const yOffset = -100;
                                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className={`group flex items-center gap-3 py-2 px-3 rounded-xl transition-all duration-300 relative ${isActive
                            ? 'text-sky-600 font-bold bg-sky-50/50'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            } ${heading.level === 3 ? (isRtl ? 'mr-5' : 'ml-5') : ''}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTOC"
                                className={`absolute inset-y-2.5 w-1 bg-sky-500 rounded-full ${isRtl ? 'right-0' : 'left-0'}`}
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                        <span className={`text-[15px] tracking-tight leading-snug truncate transition-all ${isActive ? 'translate-x-1 rtl:-translate-x-1' : ''} ${isRtl ? "font-['Noto_Naskh_Arabic']" : "font-['Inter']"}`}>
                            {heading.text}
                        </span>
                    </a>
                )
            })}
        </nav>
    )

    return (
        <div className={isRtl ? 'text-right' : 'text-left'}>
            {/* Desktop TOC */}
            <div className="sticky top-28 hidden lg:block w-full">
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <div className="w-1.5 h-7 rounded-full bg-sky-500" />
                        <h4 className={`text-[12px] font-black tracking-[0.18em] uppercase text-slate-400 ${isRtl ? "font-['Inter']" : "font-['Inter']"}`}>
                            {title}
                        </h4>
                    </div>
                    <NavContent />
                </div>

                {/* Info Box */}
                <div className={`mt-6 p-7 rounded-[32px] bg-indigo-50/50 border border-indigo-100 flex items-start gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-indigo-100/50">
                        <Info className="w-4 h-4 text-indigo-500" />
                    </div>
                    <p className={`text-[13.5px] leading-relaxed text-slate-500 font-medium ${isRtl ? "font-['Noto_Naskh_Arabic']" : "font-['Inter']"}`}>
                        {lang === 'ar'
                            ? 'نحن نساعد الشركات على النمو باستخدام الذكاء الاصطناعي والحلول السحابية.'
                            : lang === 'tr'
                                ? 'Yapay zeka ve bulut çözümleriyle işletmelerin büyümesine yardımcı oluyoruz.'
                                : 'Helping forward-thinking businesses scale with modern cloud platforms and AI.'}
                    </p>
                </div>
            </div>

            {/* Mobile TOC Accordion */}
            <div className="lg:hidden w-full mb-10">
                <div className={`bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden transition-all duration-300 ${mobileOpen ? 'ring-4 ring-sky-50' : ''}`}>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="w-full px-6 py-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">
                                {title}
                            </h4>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <motion.div
                        initial={false}
                        animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-6 pt-2 border-t border-slate-50">
                            <NavContent />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
