'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FAQItem = { question: string; answer: string }

export function FAQAccordion({ items, locale }: { items: FAQItem[]; locale: string }) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  if (items.length === 0) return null

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i))
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 border-t-2 border-[var(--ed-rule-ink)] pt-4">
        <p className="ed-eyebrow">{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</p>
        <h2 className="ed-serif mt-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15 }}>
          {locale === 'ar' ? (
            <>
              الأسئلة <span style={{ color: 'var(--ed-accent-ink)' }}>الشائعة</span>
            </>
          ) : (
            <>
              Frequently Asked{' '}
              <span style={{ color: 'var(--ed-accent-ink)' }}>Questions</span>
            </>
          )}
        </h2>
        <p className="mt-2 text-sm leading-7" style={{ color: 'var(--ed-graphite)' }}>
          {locale === 'ar'
            ? 'إجابات على الأسئلة الأكثر شيوعاً المتعلقة بهذا المقال.'
            : 'Find answers to the most common questions related to this article.'}
        </p>
      </div>

      <div className="border-t border-[var(--ed-rule)]">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className="border-b border-[var(--ed-rule)]">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 py-4 text-start transition-colors hover:text-[color:var(--ed-accent-ink)]"
                aria-expanded={isOpen}
              >
                <span className="ed-serif text-[1.05rem] leading-snug">{item.question}</span>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-[color:var(--ed-muted)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '400px' : '0px' }}
              >
                <p className="pb-5 text-sm leading-7" style={{ color: 'var(--ed-body)' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
