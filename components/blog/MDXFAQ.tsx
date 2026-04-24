'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export type FAQItem = { q: string; a: string }

type MDXFAQProps = {
    title?: string
    items: FAQItem[]
}

/**
 * In-post FAQ component. Renders a visible accordion AND injects
 * FAQPage JSON-LD so the questions are eligible for Google People Also
 * Ask rich results.
 */
export default function MDXFAQ({ title, items }: MDXFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    if (!items || items.length === 0) return null

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    }

    return (
        <section className="not-prose my-12 rounded-3xl border border-neutral-200 bg-white/60 backdrop-blur-sm p-6 md:p-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {title && (
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-6">
                    {title}
                </h2>
            )}

            <div className="space-y-3">
                {items.map((item, i) => {
                    const isOpen = openIndex === i
                    return (
                        <div
                            key={i}
                            className={`rounded-2xl border transition-all duration-300 ${isOpen
                                ? 'bg-white border-neutral-900 shadow-md'
                                : 'bg-white/70 border-neutral-200 hover:border-neutral-400'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                className="w-full flex items-start justify-between gap-4 p-5 text-left"
                                aria-expanded={isOpen}
                            >
                                <span className="flex-1 text-base md:text-lg font-semibold text-neutral-900 leading-snug">
                                    {item.q}
                                </span>
                                <span
                                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                                        }`}
                                >
                                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>
                            {isOpen && (
                                <div className="px-5 pb-6 pt-0">
                                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed whitespace-pre-line">
                                        {item.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
