'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Columns, Download, List, Languages, Plus, RefreshCw, Search, Send, Trash2, Upload } from 'lucide-react'
import type { ArticleRow, Category, SortKey, Status } from './types.ts'
import { STATUS_LABELS, STATUS_ORDER } from './types.ts'
import { bulkAction, fetchArticles, fetchCategories, fetchStatusCounts } from './api.ts'
import { ArticleListView } from './ArticleListView.tsx'
import { ArticleBoardView } from './ArticleBoardView.tsx'

const CYAN = '#0ea5e9'

export function ArticlesWorkspace() {
  const [view, setView] = useState<'list' | 'board'>('list')
  const [q, setQ] = useState('')
  const [locale, setLocale] = useState<'' | 'en' | 'ar'>('')
  const [status, setStatus] = useState<'' | Status>('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState<SortKey>('recent')
  const [page, setPage] = useState(1)

  const [rows, setRows] = useState<ArticleRow[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3200)
  }, [])

  const loadCounts = useCallback(async () => {
    try {
      const { counts, total } = await fetchStatusCounts()
      setCounts(counts)
      setTotal(total)
    } catch {
      /* non-fatal */
    }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchArticles({ q, locale, status, category, sort, page, limit: view === 'board' ? 200 : 24 })
      setRows(res.rows)
      setTotalPages(res.totalPages)
    } catch (e: any) {
      setError(e?.message || 'Could not load articles.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [q, locale, status, category, sort, page, view])

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {})
    loadCounts()
  }, [loadCounts])

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [load])

  const refresh = useCallback(() => {
    load()
    loadCounts()
  }, [load, loadCounts])

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  async function doBulk(action: string, value?: string) {
    const ids = [...selected]
    if (!ids.length) return
    if (action === 'delete' && !window.confirm(`Delete ${ids.length} article(s)? This cannot be undone.`)) return
    try {
      const r = await bulkAction(action, ids, value)
      if (action === 'export' && r.data) {
        const blob = new Blob([JSON.stringify(r.data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'cloudtopia-articles-export.json'
        a.click()
        URL.revokeObjectURL(url)
        showToast(`Exported ${ids.length} article(s)`)
      } else {
        const failed = (r.results || []).filter((x) => !x.ok).length
        showToast(failed ? `${ids.length - failed} done, ${failed} failed` : `${ids.length} article(s) updated`)
      }
      setSelected(new Set())
      refresh()
    } catch (e: any) {
      showToast(e?.message || 'Bulk action failed')
    }
  }

  function resetTo(partial: () => void) {
    partial()
    setPage(1)
  }

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Articles</h1>
          <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--theme-elevation-500)' }}>{total} articles</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/admin/collections/blog-posts/create" style={ghost()}><Upload size={16} /> Import MDX</Link>
          <Link href="/admin/collections/blog-posts/create" style={primary()}><Plus size={16} /> New article</Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--theme-elevation-400)' }} />
          <input value={q} onChange={(e) => resetTo(() => setQ(e.target.value))} placeholder="Search title, slug, excerpt…" style={{ width: '100%', paddingLeft: 32 }} />
        </div>
        <select value={locale} onChange={(e) => resetTo(() => setLocale(e.target.value as any))}><option value="">All locales</option><option value="en">English</option><option value="ar">Arabic</option></select>
        <select value={category} onChange={(e) => resetTo(() => setCategory(e.target.value))}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}><option value="recent">Recent</option><option value="views">Most viewed</option><option value="score">SEO score</option></select>
        <div style={{ display: 'inline-flex', border: '1px solid var(--theme-elevation-150)', borderRadius: 8, overflow: 'hidden' }}>
          <button type="button" onClick={() => setView('list')} style={toggle(view === 'list')}><List size={15} /> List</button>
          <button type="button" onClick={() => setView('board')} style={toggle(view === 'board')}><Columns size={15} /> Board</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        <button type="button" onClick={() => resetTo(() => setStatus(''))} style={tab(status === '')}>All · {total}</button>
        {STATUS_ORDER.map((s) => (
          <button key={s} type="button" onClick={() => resetTo(() => setStatus(s))} style={tab(status === s)}>{STATUS_LABELS[s]} · {counts[s] || 0}</button>
        ))}
      </div>

      {selected.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 12, background: 'rgba(14,165,233,0.08)', borderRadius: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: CYAN }}>{selected.size} selected</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => doBulk('publish')} style={bulkBtn()}><Send size={14} /> Publish</button>
            <button type="button" onClick={() => doBulk('translate')} style={bulkBtn()}><Languages size={14} /> Translate</button>
            <button type="button" onClick={() => doBulk('export')} style={bulkBtn()}><Download size={14} /> Export</button>
            <button type="button" onClick={() => doBulk('recalc')} style={bulkBtn()}><RefreshCw size={14} /> Recalc scores</button>
            <button type="button" onClick={() => doBulk('delete')} style={{ ...bulkBtn(), color: '#dc2626', borderColor: 'rgba(220,38,38,0.4)' }}><Trash2 size={14} /> Delete</button>
          </div>
        </div>
      )}

      {error && <p style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
      {loading && rows.length === 0 ? (
        <p style={{ color: 'var(--theme-elevation-450)', fontSize: 14, padding: '24px 0' }}>Loading…</p>
      ) : view === 'list' ? (
        <ArticleListView rows={rows} categories={categories} selected={selected} onToggleSelect={toggleSelect} onRefresh={refresh} onToast={showToast} />
      ) : (
        <ArticleBoardView rows={rows} onRefresh={refresh} onToast={showToast} />
      )}

      {view === 'list' && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} style={ghost()}>Prev</button>
          <span style={{ fontSize: 13, color: 'var(--theme-elevation-500)' }}>Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} style={ghost()}>Next</button>
        </div>
      )}

      {toast && (
        <div style={{ position: 'sticky', bottom: 16, marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <span style={{ background: 'var(--theme-elevation-800)', color: 'var(--theme-elevation-0)', fontSize: 13, padding: '8px 16px', borderRadius: 999 }}>{toast}</span>
        </div>
      )}
    </div>
  )
}

function primary(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 14px', borderRadius: 8, textDecoration: 'none', border: `1px solid ${CYAN}`, background: CYAN, color: '#fff' }
}
function ghost(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 14px', borderRadius: 8, textDecoration: 'none', border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-text)', cursor: 'pointer' }
}
function toggle(active: boolean): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, padding: '7px 11px', border: 'none', cursor: 'pointer', background: active ? 'var(--theme-elevation-100)' : 'transparent', color: active ? 'var(--theme-text)' : 'var(--theme-elevation-500)' }
}
function tab(active: boolean): CSSProperties {
  return { fontSize: 13, padding: '5px 11px', borderRadius: 999, border: '1px solid transparent', cursor: 'pointer', background: active ? 'rgba(14,165,233,0.12)' : 'transparent', color: active ? CYAN : 'var(--theme-elevation-600)', whiteSpace: 'nowrap' }
}
function bulkBtn(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, padding: '6px 11px', borderRadius: 7, border: '1px solid var(--theme-elevation-200)', background: 'var(--theme-elevation-0)', color: 'var(--theme-text)', cursor: 'pointer' }
}
