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
      <p className="ed-eyebrow mb-3">
        {locale === 'ar' ? 'في هذه الصفحة' : 'On this page'}
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
                  className="mt-1 flex h-5 w-6 shrink-0 items-center justify-center text-[11px] transition"
                  style={{
                    fontFamily: 'var(--ed-serif)',
                    fontWeight: 600,
                    color: isActive ? 'var(--ed-accent)' : 'var(--ed-muted)',
                  }}
                  aria-label={isExpanded ? (locale === 'ar' ? 'طي القسم' : 'Collapse section') : (locale === 'ar' ? 'توسيع القسم' : 'Expand section')}
                >
                  {padNum(index)}
                </button>
                <a
                  href={`#${item.id}`}
                  onClick={() => setExpandedH2s((prev) => new Set([...prev, item.id]))}
                  aria-current={isActive ? 'true' : undefined}
                  className="flex-1 py-1 text-[14px] font-medium leading-snug transition"
                  style={{
                    color: isActive ? 'var(--ed-accent)' : 'var(--ed-graphite)',
                    borderInlineStart: isActive ? '2px solid var(--ed-accent)' : '2px solid transparent',
                    paddingInlineStart: '0.6rem',
                    marginInlineStart: '-0.6rem',
                  }}
                >
                  {item.title}
                </a>
                {children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleH2(item.id)}
                    className="mt-1.5 shrink-0 transition"
                    style={{ color: 'var(--ed-muted)' }}
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
                  <ol className="ms-8 mt-0.5 space-y-0.5 border-s ps-3" style={{ borderColor: 'var(--ed-rule)' }}>
                    {children.map(({ item: child }) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={active === child.id ? 'true' : undefined}
                          className="block py-1 text-[13px] leading-snug transition"
                          style={{ color: active === child.id ? 'var(--ed-accent)' : 'var(--ed-muted)' }}
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
        <p className="ed-meta">
          {locale === 'ar' ? `${scrollPct}% مقروء · ${total} أقسام` : `${scrollPct}% read · ${total} sections`}
        </p>
        <div className="h-1 w-full overflow-hidden" style={{ backgroundColor: 'var(--ed-rule)' }}>
          <div
            className="h-full transition-all duration-200"
            style={{ width: `${scrollPct}%`, backgroundColor: 'var(--ed-accent)' }}
          />
        </div>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto border-s ps-5 lg:block" style={{ borderColor: 'var(--ed-rule)' }}>
        {nav}
      </aside>
      <aside className="border-y py-4 lg:hidden" style={{ borderColor: 'var(--ed-rule)' }}>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="ed-eyebrow flex w-full items-center justify-between gap-3 text-start"
        >
          {locale === 'ar' ? 'في هذه الصفحة' : 'On this page'}
          <ChevronDown className={`h-4 w-4 transition ${mobileOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--ed-graphite)' }} />
        </button>
        {mobileOpen && <div className="mt-4">{nav}</div>}
      </aside>
    </>
  )
}
