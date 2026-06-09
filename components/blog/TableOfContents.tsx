'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TableOfContentsItem } from '@/lib/blog/utils'

function padNum(n: number) {
  return String(n).padStart(2, '0')
}

export function TableOfContents({ items, locale = 'en' }: { items: TableOfContentsItem[]; locale?: string }) {
  const [active, setActive] = useState(items[0]?.id || '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedH2s, setExpandedH2s] = useState<Set<string>>(() => {
    const first = items.find((i) => i.level === 2)
    return first ? new Set([first.id]) : new Set()
  })
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-120px 0px -70% 0px' },
    )
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const activeItem = items.find((i) => i.id === active)
    if (!activeItem) return
    if (activeItem.level === 2) {
      setExpandedH2s((prev) => new Set([...prev, active]))
    } else {
      const idx = items.indexOf(activeItem)
      for (let i = idx - 1; i >= 0; i--) {
        if (items[i].level === 2) {
          setExpandedH2s((prev) => new Set([...prev, items[i].id]))
          break
        }
      }
    }
  }, [active, items])

  if (items.length === 0) return null

  type H2Group = { item: TableOfContentsItem; index: number; children: { item: TableOfContentsItem }[] }
  const groups: H2Group[] = []
  let sectionIndex = 0
  let currentGroup: H2Group | null = null
  for (const item of items) {
    if (item.level === 2) {
      sectionIndex++
      currentGroup = { item, index: sectionIndex, children: [] }
      groups.push(currentGroup)
    } else if (item.level === 3 && currentGroup) {
      currentGroup.children.push({ item })
    }
  }

  function toggleH2(id: string) {
    setExpandedH2s((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = groups.length

  const nav = (
    <nav aria-label="Table of contents" className="select-none">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[1px] text-neutral-400">
        {locale === 'ar' ? 'فهرس المحتويات' : 'Table of Contents'}
      </p>
      <ol className="space-y-0.5">
        {groups.map(({ item, index, children }) => {
          const isActive = active === item.id || children.some((c) => c.item.id === active)
          const isExpanded = expandedH2s.has(item.id)
          return (
            <li key={item.id}>
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => toggleH2(item.id)}
                  className={`mt-1 flex h-5 w-6 shrink-0 items-center justify-center rounded text-[10px] font-black transition ${
                    isActive
                      ? 'border-l-[3px] border-primary-600 bg-primary-50 text-primary-700'
                      : 'text-neutral-400'
                  }`}
                  aria-label={isExpanded ? (locale === 'ar' ? 'طي القسم' : 'Collapse section') : (locale === 'ar' ? 'توسيع القسم' : 'Expand section')}
                >
                  {padNum(index)}
                </button>
                <a
                  href={`#${item.id}`}
                  onClick={() => setExpandedH2s((prev) => new Set([...prev, item.id]))}
                  className={`flex-1 py-1 text-[14px] font-medium leading-snug transition hover:text-primary-700 ${
                    isActive ? 'text-primary-700' : 'text-neutral-600'
                  }`}
                >
                  {item.title}
                </a>
                {children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleH2(item.id)}
                    className="mt-1.5 shrink-0 text-neutral-300 transition hover:text-neutral-500"
                    aria-label={locale === 'ar' ? 'تبديل الأقسام الفرعية' : 'Toggle subsections'}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
              {children.length > 0 && (
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isExpanded ? `${children.length * 36}px` : '0px' }}
                >
                  <ol className="ms-8 mt-0.5 space-y-0.5 border-s border-neutral-200 ps-3">
                    {children.map(({ item: child }) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className={`block py-1 text-[13px] leading-snug transition hover:text-primary-700 ${
                            active === child.id ? 'text-primary-700' : 'text-neutral-500'
                          }`}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <div className="mt-5 space-y-1.5">
        <p className="text-[11px] font-bold text-neutral-400">
          {locale === 'ar' ? `${scrollPct}% مقروء · ${total} أقسام` : `${scrollPct}% read · ${total} sections`}
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-200"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm backdrop-blur lg:block">
        {nav}
      </aside>
      <aside className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left text-sm font-black uppercase tracking-normal text-neutral-700"
        >
          {locale === 'ar' ? 'في هذا المقال' : 'In this article'}
          <ChevronDown className={`h-4 w-4 transition ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && <div className="mt-4">{nav}</div>}
      </aside>
    </>
  )
}
