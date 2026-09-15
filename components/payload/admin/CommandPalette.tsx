'use client'

import { useAuth } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import {
  ArrowDownUp,
  BarChart3,
  CornerDownLeft,
  ExternalLink,
  FilePlus2,
  FileText,
  FolderKanban,
  FolderPlus,
  Image as ImageIcon,
  ImagePlus,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Newspaper,
  Search,
  Tags,
  Users,
  type LucideIcon,
} from 'lucide-react'
import './admin-cmdk.css'

type Entry = {
  id: string
  label: string
  href: string
  icon: LucideIcon
  hint?: string
  keywords?: string
  external?: boolean
}

type Group = { label: string; items: Entry[] }

const JUMP_TO: Entry[] = [
  { id: 'go-overview', label: 'Overview', href: '/admin', icon: LayoutDashboard, keywords: 'dashboard home' },
  { id: 'go-articles', label: 'Articles', href: '/admin/articles', icon: Newspaper, keywords: 'blog posts content' },
  { id: 'go-inquiries', label: 'Inquiries', href: '/admin/collections/contact-inquiries', icon: Inbox, keywords: 'leads contact customers' },
  { id: 'go-media', label: 'Media', href: '/admin/collections/media', icon: ImageIcon, keywords: 'images uploads library' },
  { id: 'go-seo', label: 'SEO center', href: '/admin/seo', icon: BarChart3, keywords: 'search console meta' },
  { id: 'go-pages', label: 'Pages', href: '/admin/collections/pages', icon: FileText, keywords: 'site pages' },
  { id: 'go-projects', label: 'Projects', href: '/admin/collections/projects', icon: FolderKanban, keywords: 'portfolio work' },
  { id: 'go-categories', label: 'Categories', href: '/admin/collections/blog-categories', icon: Tags, keywords: 'taxonomy' },
  { id: 'go-exports', label: 'Import / Export', href: '/admin/collections/exports', icon: ArrowDownUp, keywords: 'csv json download' },
  { id: 'go-keys', label: 'API keys', href: '/admin/collections/payload-mcp-api-keys', icon: KeyRound, keywords: 'mcp ai tokens' },
  { id: 'go-team', label: 'Team', href: '/admin/collections/users', icon: Users, keywords: 'users accounts roles' },
]

const ACTIONS: Entry[] = [
  { id: 'new-article', label: 'New article', href: '/admin/collections/blog-posts/create', icon: Newspaper, keywords: 'create write post' },
  { id: 'new-page', label: 'New page', href: '/admin/collections/pages/create', icon: FilePlus2, keywords: 'create' },
  { id: 'upload-media', label: 'Upload media', href: '/admin/collections/media/create', icon: ImagePlus, keywords: 'image photo create' },
  { id: 'new-project', label: 'New project', href: '/admin/collections/projects/create', icon: FolderPlus, keywords: 'portfolio create' },
  { id: 'export', label: 'Export data to CSV / JSON', href: '/admin/collections/exports/create', icon: ArrowDownUp, keywords: 'download leads inquiries' },
  { id: 'new-key', label: 'Create an MCP API key', href: '/admin/collections/payload-mcp-api-keys/create', icon: KeyRound, keywords: 'ai agent token' },
  { id: 'view-site', label: 'View website', href: '/', icon: ExternalLink, keywords: 'open public', external: true },
]

const SEARCH_SOURCES: Record<string, { label: string; icon: LucideIcon }> = {
  'blog-posts': { label: 'Articles', icon: Newspaper },
  pages: { label: 'Pages', icon: FileText },
  projects: { label: 'Projects', icon: FolderKanban },
  'contact-inquiries': { label: 'Inquiries', icon: Inbox },
}

function matches(entry: Entry, q: string) {
  return `${entry.label} ${entry.keywords || ''}`.toLowerCase().includes(q)
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [remote, setRemote] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (!user) return
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => {
      if (user) setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('ct-cmdk-open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('ct-cmdk-open', onOpen)
    }
  }, [user])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setRemote([])
    setActive(0)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const q = query.trim()
    if (q.length < 2) {
      setRemote([])
      setLoading(false)
      return
    }
    setLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ limit: '12', depth: '0', sort: 'priority' })
        params.set('where[title][like]', q)
        const res = await fetch(`/api/search?${params.toString()}`, { credentials: 'include', signal: controller.signal })
        const data = res.ok ? await res.json() : { docs: [] }
        const grouped = new Map<string, Entry[]>()
        for (const doc of data.docs || []) {
          const relation = doc?.doc?.relationTo as string | undefined
          const value = typeof doc?.doc?.value === 'object' ? doc.doc.value?.id : doc?.doc?.value
          const source = relation ? SEARCH_SOURCES[relation] : undefined
          if (!relation || value == null || !source) continue
          const hint = [doc.locale ? String(doc.locale).toUpperCase() : null, doc.status || null].filter(Boolean).join(' · ')
          const list = grouped.get(source.label) || []
          list.push({
            id: `${relation}-${value}`,
            label: doc.title || 'Untitled',
            href: `/admin/collections/${relation}/${value}`,
            icon: source.icon,
            hint: hint || doc.subtitle || undefined,
          })
          grouped.set(source.label, list)
        }
        setRemote([...grouped.entries()].map(([label, items]) => ({ label, items })))
        setActive(0)
      } catch {
        // Aborted or offline: keep the local results.
      } finally {
        setLoading(false)
      }
    }, 160)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, open])

  const groups: Group[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return [
        { label: 'Jump to', items: JUMP_TO.slice(0, 6) },
        { label: 'Actions', items: ACTIONS.slice(0, 4) },
      ]
    }
    return [
      ...remote,
      { label: 'Actions', items: ACTIONS.filter((a) => matches(a, q)) },
      { label: 'Jump to', items: JUMP_TO.filter((j) => matches(j, q)) },
    ].filter((g) => g.items.length > 0)
  }, [query, remote])

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])

  useEffect(() => {
    if (active >= flat.length) setActive(Math.max(0, flat.length - 1))
  }, [flat.length, active])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = useCallback(
    (entry: Entry | undefined) => {
      if (!entry) return
      setOpen(false)
      if (entry.external) window.open(entry.href, '_blank', 'noopener,noreferrer')
      else router.push(entry.href)
    },
    [router],
  )

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(flat[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  let cursor = -1
  const q = query.trim()

  return (
    <>
      {children}
      {open && (
        <div
          className="ct-cmdk"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="ct-cmdk__panel" role="dialog" aria-modal="true" aria-label="Command menu">
            <div className="ct-cmdk__input-row">
              <Search size={17} className="ct-cmdk__input-icon" aria-hidden />
              <input
                ref={inputRef}
                className="ct-cmdk__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search articles, pages, leads… or jump to a screen"
                aria-label="Search"
                aria-controls="ct-cmdk-list"
                aria-activedescendant={flat[active] ? `ct-cmdk-${flat[active].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
                dir="auto"
              />
              {loading && <span className="ct-cmdk__spinner" aria-hidden />}
              <kbd>esc</kbd>
            </div>

            <div className="ct-cmdk__list" id="ct-cmdk-list" role="listbox" ref={listRef}>
              {groups.map((group) => (
                <div className="ct-cmdk__group" key={group.label} role="group" aria-label={group.label}>
                  <div className="ct-cmdk__group-label">{group.label}</div>
                  {group.items.map((item) => {
                    cursor += 1
                    const index = cursor
                    const isActive = index === active
                    const Icon = item.icon
                    return (
                      <button
                        type="button"
                        key={`${group.label}-${item.id}`}
                        id={`ct-cmdk-${item.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        className="ct-cmdk__item"
                        onMouseMove={() => setActive(index)}
                        onClick={() => run(item)}
                      >
                        <span className="ct-cmdk__item-icon">
                          <Icon size={15} aria-hidden />
                        </span>
                        <span className="ct-cmdk__item-label" dir="auto">
                          {item.label}
                        </span>
                        {item.hint && <span className="ct-cmdk__item-hint">{item.hint}</span>}
                        {item.external ? (
                          <ExternalLink size={13} className="ct-cmdk__item-enter" aria-hidden />
                        ) : (
                          <CornerDownLeft size={13} className="ct-cmdk__item-enter" aria-hidden />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
              {q.length >= 2 && !loading && flat.length === 0 && (
                <div className="ct-cmdk__empty">
                  No results for <strong dir="auto">“{q}”</strong>
                </div>
              )}
            </div>

            <div className="ct-cmdk__footer">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> to navigate
              </span>
              <span>
                <kbd>↵</kbd> to open
              </span>
              <span>
                <kbd>esc</kbd> to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
