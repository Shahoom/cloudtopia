'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, ExternalLink, FilePlus2, FolderPlus, ImagePlus, Menu, Newspaper, Plus, Search } from 'lucide-react'
import './admin-topbar.css'

// Registered as admin.components.actions — Payload renders it inside the app
// header on every native screen; AdminViewShell renders it for custom views.
export function TopBarActions() {
  const [createOpen, setCreateOpen] = useState(false)
  const [newInquiries, setNewInquiries] = useState<number | null>(null)
  const [modKey, setModKey] = useState('⌘')
  const createRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)) setModKey('Ctrl ')
    const controller = new AbortController()
    fetch('/api/contact-inquiries?where[status][equals]=new&limit=0&depth=0', { credentials: 'include', signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.totalDocs === 'number') setNewInquiries(data.totalDocs)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!createOpen) return
    const onDown = (e: MouseEvent) => {
      if (createRef.current && !createRef.current.contains(e.target as Node)) setCreateOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCreateOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [createOpen])

  return (
    <div className="ct-topbar">
      <button
        type="button"
        className="ct-topbar__nav-toggle"
        aria-label="Open navigation"
        onClick={() => window.dispatchEvent(new CustomEvent('ct-nav-toggle'))}
      >
        <Menu size={18} aria-hidden />
      </button>

      <button type="button" className="ct-topbar__search" onClick={() => window.dispatchEvent(new CustomEvent('ct-cmdk-open'))}>
        <Search size={15} aria-hidden />
        <span>Search articles, pages, media, leads…</span>
        <kbd>{modKey}K</kbd>
      </button>

      <div className="ct-topbar__create" ref={createRef}>
        <Link href="/admin/collections/blog-posts/create" prefetch={false} className="ct-topbar__create-main">
          <Plus size={15} strokeWidth={2.2} aria-hidden />
          <span>Create</span>
        </Link>
        <button
          type="button"
          className="ct-topbar__create-toggle"
          aria-label="More create options"
          aria-haspopup="menu"
          aria-expanded={createOpen}
          onClick={() => setCreateOpen((o) => !o)}
        >
          <ChevronDown size={14} aria-hidden />
        </button>
        {createOpen && (
          <div className="ct-topbar__pop" role="menu">
            <Link href="/admin/collections/blog-posts/create" prefetch={false} role="menuitem" onClick={() => setCreateOpen(false)}>
              <Newspaper size={15} aria-hidden />
              <span>New article</span>
            </Link>
            <Link href="/admin/collections/pages/create" prefetch={false} role="menuitem" onClick={() => setCreateOpen(false)}>
              <FilePlus2 size={15} aria-hidden />
              <span>New page</span>
            </Link>
            <Link href="/admin/collections/media/create" prefetch={false} role="menuitem" onClick={() => setCreateOpen(false)}>
              <ImagePlus size={15} aria-hidden />
              <span>Upload media</span>
            </Link>
            <Link href="/admin/collections/projects/create" prefetch={false} role="menuitem" onClick={() => setCreateOpen(false)}>
              <FolderPlus size={15} aria-hidden />
              <span>New project</span>
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/admin/collections/contact-inquiries?where[status][equals]=new"
        prefetch={false}
        className="ct-topbar__icon"
        aria-label={newInquiries ? `Inquiries, ${newInquiries} new` : 'Inquiries'}
        title="New inquiries"
      >
        <Bell size={17} aria-hidden />
        {newInquiries ? <span className="ct-topbar__count">{newInquiries > 9 ? '9+' : newInquiries}</span> : null}
      </Link>

      <a href="/" target="_blank" rel="noreferrer" className="ct-topbar__site">
        <ExternalLink size={14} aria-hidden />
        <span>View site</span>
      </a>
    </div>
  )
}
