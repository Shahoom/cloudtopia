'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TableOfContentsItem } from '@/lib/blog/utils'

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [active, setActive] = useState(items[0]?.id || '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-120px 0px -70% 0px' },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  const nav = (
    <nav aria-label="Table of contents">
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-lg px-3 py-2 text-sm font-bold leading-5 transition hover:bg-sky-50 hover:text-primary-700 ${
                active === item.id ? 'bg-sky-50 text-primary-700' : 'text-neutral-600'
              } ${item.level === 3 ? 'ml-4' : ''}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )

  return (
    <>
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur lg:block">
        <p className="mb-4 text-xs font-black uppercase tracking-normal text-neutral-500">In this article</p>
        {nav}
      </aside>
      <aside className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 text-left text-sm font-black uppercase tracking-normal text-neutral-700"
        >
          In this article
          <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && <div className="mt-4">{nav}</div>}
      </aside>
    </>
  )
}
