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
      <div className="mb-6">
        <h2 className="text-[28px] font-black text-neutral-900">
          {locale === 'ar' ? (
            <>
              الأسئلة <span className="text-primary-600">الشائعة</span>
            </>
          ) : (
            <>
              Frequently Asked{' '}
              <span className="text-primary-600">Questions</span>
            </>
          )}
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          {locale === 'ar'
            ? 'إجابات على الأسئلة الأكثر شيوعاً المتعلقة بهذا المقال.'
            : 'Find answers to the most common questions related to this article.'}
        </p>
        <div className="mt-4 h-px w-16 bg-primary-600" />
      </div>

      <div className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-bold leading-snug text-neutral-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '400px' : '0px' }}
              >
                <p className="px-5 pb-5 text-sm leading-7 text-neutral-600">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
