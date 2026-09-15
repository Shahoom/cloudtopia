'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowDownUp,
  BarChart3,
  Bot,
  Boxes,
  Brush,
  ChevronDown,
  ChevronsLeft,
  ChevronsUpDown,
  ExternalLink,
  FileText,
  FolderKanban,
  Hash,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  KeyRound,
  Languages,
  LayoutDashboard,
  Library,
  LogOut,
  Mail,
  MessagesSquare,
  Newspaper,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  Tags,
  Target,
  User as UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type NavCounts = {
  articles: number | null
  scheduled: number | null
  inquiriesNew: number | null
  media: number | null
  mediaBytes: number | null
  pages: number | null
}

export type NavUser = { email: string; name: string | null; role: string | null }

type BadgeKey = 'articles' | 'inquiriesNew' | 'media' | 'pages'

type NavItem = {
  id: string
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
  match?: string[]
  collection?: string
  badge?: BadgeKey
  hot?: boolean
  isNew?: boolean
}

type NavSection = { id: string; label: string; items: NavItem[] }

const SECTIONS: NavSection[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      { id: 'overview', label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
      { id: 'seo', label: 'SEO center', href: '/admin/seo', icon: BarChart3 },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { id: 'articles', label: 'Articles', href: '/admin/articles', icon: Newspaper, match: ['/admin/collections/blog-posts'], collection: 'blog-posts', badge: 'articles' },
      { id: 'pages', label: 'Pages', href: '/admin/collections/pages', icon: FileText, collection: 'pages', badge: 'pages' },
      { id: 'projects', label: 'Projects', href: '/admin/collections/projects', icon: FolderKanban, collection: 'projects' },
      { id: 'media', label: 'Media', href: '/admin/collections/media', icon: ImageIcon, collection: 'media', badge: 'media' },
      { id: 'authors', label: 'Authors', href: '/admin/collections/authors', icon: UserRound, collection: 'authors' },
      { id: 'categories', label: 'Categories', href: '/admin/collections/blog-categories', icon: Tags, collection: 'blog-categories' },
      { id: 'tags', label: 'Tags', href: '/admin/collections/blog-tags', icon: Hash, collection: 'blog-tags' },
      { id: 'series', label: 'Series', href: '/admin/collections/blog-series', icon: Library, collection: 'blog-series' },
      { id: 'faqs', label: 'Service FAQs', href: '/admin/collections/service-faqs', icon: HelpCircle, collection: 'service-faqs' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    items: [
      { id: 'inquiries', label: 'Inquiries', href: '/admin/collections/contact-inquiries', icon: Inbox, collection: 'contact-inquiries', badge: 'inquiriesNew', hot: true },
      { id: 'solution-finder', label: 'Solution finder', href: '/admin/collections/solution-finder-leads', icon: Target, collection: 'solution-finder-leads' },
      { id: 'chatbot-leads', label: 'Chatbot leads', href: '/admin/collections/ai-chat-leads', icon: Bot, collection: 'ai-chat-leads' },
      { id: 'clinictopia', label: 'ClinicTopia leads', href: '/admin/collections/clinictopia-leads', icon: Stethoscope, collection: 'clinictopia-leads' },
      { id: 'hasm', label: 'Hasm ERP leads', href: '/admin/collections/hasm-erp-leads', icon: Boxes, collection: 'hasm-erp-leads' },
      { id: 'newsletter', label: 'Newsletter', href: '/admin/collections/newsletter-subscribers', icon: Mail, collection: 'newsletter-subscribers' },
      { id: 'conversations', label: 'Conversations', href: '/admin/collections/ai-chat-conversations', icon: MessagesSquare, collection: 'ai-chat-conversations' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'search-index', label: 'Search index', href: '/admin/collections/search', icon: Search, collection: 'search' },
      { id: 'import-export', label: 'Import / Export', href: '/admin/collections/exports', icon: ArrowDownUp, match: ['/admin/collections/imports'], collection: 'exports', isNew: true },
      { id: 'api-keys', label: 'API keys', href: '/admin/collections/payload-mcp-api-keys', icon: KeyRound, collection: 'payload-mcp-api-keys', isNew: true },
      { id: 'dictionary', label: 'Locales / dictionary', href: '/admin/collections/site-content', icon: Languages, collection: 'site-content' },
      { id: 'design', label: 'Design', href: '/admin/collections/site-design', icon: Brush, collection: 'site-design' },
      { id: 'ai-log', label: 'Editor AI log', href: '/admin/collections/blog-ai-generation-logs', icon: Sparkles, collection: 'blog-ai-generation-logs' },
      { id: 'team', label: 'Team', href: '/admin/collections/users', icon: Users, collection: 'users' },
    ],
  },
]

const ALL_ITEMS = SECTIONS.flatMap((s) => s.items)
const DEFAULT_PINS = ['articles', 'inquiries', 'seo']
const STORAGE_LIMIT_BYTES = 10 * 1024 ** 3 // Cloudflare R2 free tier

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw == null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

function writeStored(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode / blocked storage: the preference just won't persist.
  }
}

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null
  if (!el) return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

function compactNumber(n: number) {
  if (n >= 10_000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2).replace(/0$/, '')} GB`
  return `${Math.max(1, Math.round(bytes / 1024 ** 2))} MB`
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, ref])
}

export function CloudTopiaNavClient({
  counts,
  user,
  visibleCollections,
}: {
  counts: NavCounts
  user: NavUser
  visibleCollections: string[] | null
}) {
  const pathname = usePathname() || '/admin'
  const [hydrated, setHydrated] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pins, setPins] = useState<string[]>(DEFAULT_PINS)
  const [closedSections, setClosedSections] = useState<string[]>([])
  const [wsOpen, setWsOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(null)
  const wsRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Preferences live in localStorage; read them after mount so the server
  // render and first client render match.
  useEffect(() => {
    setCollapsed(readStored('ct-nav-collapsed', false))
    setPins(readStored('ct-nav-pins', DEFAULT_PINS))
    setClosedSections(readStored('ct-nav-closed-sections', []))
    setHydrated(true)
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const effectiveCollapsed = collapsed && !isMobile

  useEffect(() => {
    document.documentElement.dataset.ctNav = effectiveCollapsed ? 'collapsed' : 'expanded'
  }, [effectiveCollapsed])

  useEffect(() => {
    if (mobileOpen) document.documentElement.dataset.ctNavMobile = 'open'
    else delete document.documentElement.dataset.ctNavMobile
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setWsOpen(false)
    setUserOpen(false)
  }, [pathname])

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      writeStored('ct-nav-collapsed', !c)
      return !c
    })
    setTooltip(null)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '[' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault()
        toggleCollapsed()
      }
      if (e.key === 'Escape') setMobileOpen(false)
    }
    const onToggleMobile = () => setMobileOpen((o) => !o)
    window.addEventListener('keydown', onKey)
    window.addEventListener('ct-nav-toggle', onToggleMobile)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('ct-nav-toggle', onToggleMobile)
    }
  }, [toggleCollapsed])

  const closeWs = useCallback(() => setWsOpen(false), [])
  const closeUser = useCallback(() => setUserOpen(false), [])
  useClickOutside(wsRef, wsOpen, closeWs)
  useClickOutside(userRef, userOpen, closeUser)

  const visible = useCallback(
    (item: NavItem) => !item.collection || !visibleCollections || visibleCollections.includes(item.collection),
    [visibleCollections],
  )

  const sections = useMemo(
    () => SECTIONS.map((s) => ({ ...s, items: s.items.filter(visible) })).filter((s) => s.items.length > 0),
    [visible],
  )
  const pinnedItems = useMemo(
    () => pins.map((id) => ALL_ITEMS.find((i) => i.id === id)).filter((i): i is NavItem => Boolean(i && visible(i))),
    [pins, visible],
  )

  const togglePin = (id: string) => {
    setPins((current) => {
      const next = current.includes(id) ? current.filter((p) => p !== id) : [...current, id]
      writeStored('ct-nav-pins', next)
      return next
    })
  }

  const toggleSection = (id: string) => {
    setClosedSections((current) => {
      const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id]
      writeStored('ct-nav-closed-sections', next)
      return next
    })
  }

  const isActive = (item: NavItem) => {
    const paths = [item.href, ...(item.match || [])]
    if (item.exact) return pathname === item.href || pathname === `${item.href}/`
    return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  }

  const showTooltip = (label: string, el: HTMLElement) => {
    if (!effectiveCollapsed) return
    const rect = el.getBoundingClientRect()
    setTooltip({ label, top: rect.top + rect.height / 2 })
  }

  const openPalette = () => window.dispatchEvent(new CustomEvent('ct-cmdk-open'))

  const displayName = user.name || (user.email ? user.email.split('@')[0] : 'Admin')
  const initials = displayName
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'CT'
  const roleLabel = user.role === 'editor' ? 'Editor' : 'Admin'
  const storagePct = counts.mediaBytes != null ? Math.min(100, (counts.mediaBytes / STORAGE_LIMIT_BYTES) * 100) : 0

  const renderItem = (item: NavItem, section: string): ReactNode => {
    const active = isActive(item)
    const Icon = item.icon
    const badgeValue = item.badge ? counts[item.badge] : null
    const showBadge = badgeValue != null && (item.hot ? badgeValue > 0 : true)
    const pinned = pins.includes(item.id)
    return (
      <li className="ct-nav__li" key={`${section}-${item.id}`}>
        <Link
          href={item.href}
          prefetch={false}
          className={['ct-nav__link', active && 'is-active', item.hot && showBadge && 'has-hot'].filter(Boolean).join(' ')}
          aria-current={active ? 'page' : undefined}
          aria-label={effectiveCollapsed ? item.label : undefined}
          onMouseEnter={(e) => showTooltip(item.label, e.currentTarget)}
          onMouseLeave={() => setTooltip(null)}
          onFocus={(e) => showTooltip(item.label, e.currentTarget)}
          onBlur={() => setTooltip(null)}
        >
          <Icon size={16} strokeWidth={1.9} className="ct-nav__icon" aria-hidden />
          <span className="ct-nav__label">{item.label}</span>
          {item.isNew && <span className="ct-nav__tag">New</span>}
          {showBadge && <span className={['ct-nav__badge', item.hot && 'is-hot'].filter(Boolean).join(' ')}>{compactNumber(badgeValue!)}</span>}
        </Link>
        {!effectiveCollapsed && (
          <button
            type="button"
            className={['ct-nav__pin', pinned && 'is-pinned'].filter(Boolean).join(' ')}
            aria-label={pinned ? `Unpin ${item.label}` : `Pin ${item.label}`}
            aria-pressed={pinned}
            onClick={() => togglePin(item.id)}
          >
            <Star size={13} strokeWidth={2} aria-hidden />
          </button>
        )}
      </li>
    )
  }

  return (
    <>
      <nav
        ref={navRef}
        className="ct-nav"
        aria-label="Admin navigation"
        data-collapsed={effectiveCollapsed || undefined}
        data-hydrated={hydrated || undefined}
      >
        <div className="ct-nav__header">
          <div className="ct-nav__ws" ref={wsRef}>
            <button
              type="button"
              className="ct-nav__ws-btn"
              aria-haspopup="menu"
              aria-expanded={wsOpen}
              aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Workspace menu'}
              onClick={() => (effectiveCollapsed ? toggleCollapsed() : setWsOpen((o) => !o))}
              onMouseEnter={(e) => showTooltip('Expand sidebar', e.currentTarget)}
              onMouseLeave={() => setTooltip(null)}
            >
              <span className="ct-nav__mark" aria-hidden>
                CT
              </span>
              <span className="ct-nav__ws-copy">
                <span className="ct-nav__ws-name">
                  CloudTopia <em>Prod</em>
                </span>
                <span className="ct-nav__ws-meta">cloudtopia.net</span>
              </span>
              <ChevronsUpDown size={14} className="ct-nav__ws-chevron" aria-hidden />
            </button>
            {wsOpen && (
              <div className="ct-nav__menu" role="menu">
                <a href="/" target="_blank" rel="noreferrer" role="menuitem">
                  <ExternalLink size={15} aria-hidden /> View website
                </a>
                <a href="/articles" target="_blank" rel="noreferrer" role="menuitem">
                  <Newspaper size={15} aria-hidden /> Articles on the site
                </a>
                <a href="/ar/articles" target="_blank" rel="noreferrer" role="menuitem">
                  <Languages size={15} aria-hidden /> Arabic articles
                </a>
                <div className="ct-nav__menu-sep" />
                <div className="ct-nav__menu-hint">
                  <span>Search and jump</span>
                  <kbd>⌘K</kbd>
                </div>
                <div className="ct-nav__menu-hint">
                  <span>Collapse sidebar</span>
                  <kbd>[</kbd>
                </div>
              </div>
            )}
          </div>
          <button type="button" className="ct-nav__collapse" onClick={toggleCollapsed} aria-label="Collapse sidebar" title="Collapse sidebar  [">
            <ChevronsLeft size={16} aria-hidden />
          </button>
        </div>

        <button
          type="button"
          className="ct-nav__search"
          onClick={openPalette}
          aria-label="Search or jump to"
          onMouseEnter={(e) => showTooltip('Search  ⌘K', e.currentTarget)}
          onMouseLeave={() => setTooltip(null)}
        >
          <Search size={15} aria-hidden />
          <span>Search or jump to…</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="ct-nav__scroll">
          {pinnedItems.length > 0 && (
            <div className="ct-nav__section ct-nav__section--pinned">
              <div className="ct-nav__section-head is-static">
                <span>Pinned</span>
              </div>
              <ul className="ct-nav__list">{pinnedItems.map((item) => renderItem(item, 'pinned'))}</ul>
            </div>
          )}
          {sections.map((section) => {
            const open = effectiveCollapsed || !closedSections.includes(section.id)
            return (
              <div className="ct-nav__section" key={section.id}>
                <button
                  type="button"
                  className="ct-nav__section-head"
                  aria-expanded={open}
                  onClick={() => toggleSection(section.id)}
                >
                  <span>{section.label}</span>
                  <ChevronDown size={13} className="ct-nav__section-chevron" aria-hidden />
                </button>
                {open && <ul className="ct-nav__list">{section.items.map((item) => renderItem(item, section.id))}</ul>}
              </div>
            )
          })}
        </div>

        <div className="ct-nav__footer">
          {counts.mediaBytes != null && (
            <Link href="/admin/collections/media" prefetch={false} className="ct-nav__storage">
              <span className="ct-nav__storage-row">
                <span>Media · Cloudflare R2</span>
                <b>{formatBytes(counts.mediaBytes)}</b>
              </span>
              <span className="ct-nav__meter" aria-hidden>
                <i style={{ width: `${storagePct}%` }} />
              </span>
            </Link>
          )}
          <div className="ct-nav__user" ref={userRef}>
            <button
              type="button"
              className="ct-nav__user-btn"
              aria-haspopup="menu"
              aria-expanded={userOpen}
              onClick={() => setUserOpen((o) => !o)}
              onMouseEnter={(e) => showTooltip(displayName, e.currentTarget)}
              onMouseLeave={() => setTooltip(null)}
            >
              <span className="ct-nav__avatar" aria-hidden>
                {initials}
                <i />
              </span>
              <span className="ct-nav__user-copy">
                <span className="ct-nav__user-name">{displayName}</span>
                <span className="ct-nav__user-role">{roleLabel}</span>
              </span>
              <ChevronsUpDown size={14} className="ct-nav__user-chevron" aria-hidden />
            </button>
            {userOpen && (
              <div className="ct-nav__menu ct-nav__menu--up" role="menu">
                <div className="ct-nav__menu-head">
                  <strong>{displayName}</strong>
                  {user.email && <span>{user.email}</span>}
                </div>
                <Link href="/admin/account" prefetch={false} role="menuitem">
                  <UserRound size={15} aria-hidden /> Account
                </Link>
                {visible({ id: 'api-keys', label: '', href: '', icon: KeyRound, collection: 'payload-mcp-api-keys' }) && (
                  <Link href="/admin/collections/payload-mcp-api-keys" prefetch={false} role="menuitem">
                    <KeyRound size={15} aria-hidden /> API keys
                  </Link>
                )}
                <div className="ct-nav__menu-sep" />
                {/* Plain anchor: Next would prefetch a Link to /admin/logout and sign the user out. */}
                <a href="/admin/logout" role="menuitem" className="is-danger">
                  <LogOut size={15} aria-hidden /> Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {tooltip && effectiveCollapsed && (
        <div className="ct-nav__tooltip" role="tooltip" style={{ top: tooltip.top }}>
          {tooltip.label}
        </div>
      )}
      {mobileOpen && <button type="button" className="ct-nav-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    </>
  )
}
