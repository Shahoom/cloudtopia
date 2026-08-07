'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Check, ExternalLink, Eye, Image as ImageIcon, Languages, Pencil, Settings2, Sparkles, X } from 'lucide-react'
import type { ArticleRow, Category, Status } from './types.ts'
import { STATUS_DOT, STATUS_LABELS, STATUS_ORDER } from './types.ts'
import { optimizeArticle, pairArticle, updateArticle } from './api.ts'

const CYAN = '#0ea5e9'

type Props = {
  rows: ArticleRow[]
  categories: Category[]
  selected: Set<string>
  onToggleSelect: (id: string) => void
  onRefresh: () => void
  onToast: (msg: string) => void
}

function seoTone(score: number): CSSProperties {
  if (score >= 80) return { background: 'rgba(22,163,74,0.14)', color: '#16a34a' }
  if (score >= 60) return { background: 'rgba(217,119,6,0.16)', color: '#d97706' }
  return { background: 'rgba(220,38,38,0.14)', color: '#dc2626' }
}

// Cover thumbnail with graceful fallback — broken/absent images (e.g. local env
// without S3 media credentials) show a placeholder icon instead of a broken img.
function Thumb({ src }: { src: string | null }) {
  const [err, setErr] = useState(false)
  if (!src || err) return <ImageIcon size={18} color="var(--theme-elevation-400)" />
  return <img src={src} alt="" onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
}

export function ArticleListView({ rows, categories, selected, onToggleSelect, onRefresh, onToast }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<{ title: string; status: Status; category: string; excerpt: string; metaTitle: string; metaDescription: string }>({
    title: '', status: 'draft', category: '', excerpt: '', metaTitle: '', metaDescription: '',
  })

  function openEdit(row: ArticleRow) {
    setEditingId(row.id)
    setForm({
      title: row.title,
      status: row.status,
      category: row.category?.id || '',
      excerpt: row.excerpt,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
    })
  }

  async function save(row: ArticleRow) {
    const data: Record<string, unknown> = {}
    if (form.title !== row.title) data.title = form.title
    if (form.status !== row.status) data.status = form.status
    if (form.category && form.category !== (row.category?.id || '')) data.category = form.category
    if (form.excerpt !== row.excerpt) data.excerpt = form.excerpt
    if (form.metaTitle !== row.metaTitle || form.metaDescription !== row.metaDescription) {
      data.seo = { ...row.seoRaw, metaTitle: form.metaTitle, metaDescription: form.metaDescription }
    }
    if (Object.keys(data).length === 0) {
      setEditingId(null)
      return
    }
    setSaving(true)
    try {
      await updateArticle(row.id, data)
      onToast('Saved')
      setEditingId(null)
      onRefresh()
    } catch (e: any) {
      onToast(e?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function runOptimize(row: ArticleRow) {
    setBusyId(row.id)
    try {
      const { applied } = await optimizeArticle(row.id)
      onToast(applied.length ? `Optimized: ${applied.join(', ')}` : 'No changes needed')
      onRefresh()
    } catch (e: any) {
      onToast(e?.message || 'Optimize failed')
    } finally {
      setBusyId(null)
    }
  }

  async function translate(row: ArticleRow) {
    setBusyId(row.id)
    // The tab MUST be opened synchronously, inside the click's user-activation
    // window. Calling window.open() after `await pairArticle(...)` loses that
    // activation, so browsers silently block the popup and the button appears
    // to do nothing. Open a blank tab now, point it at the sibling once the id
    // comes back, and fall back to same-tab navigation if it was blocked anyway.
    const tab = window.open('', '_blank')
    try {
      const res = await pairArticle(row.id)
      onToast(res.created ? `Created ${res.locale.toUpperCase()} draft` : `${res.locale.toUpperCase()} version exists`)
      const href = `/admin/collections/blog-posts/${res.id}`
      if (tab && !tab.closed) tab.location.href = href
      else window.location.href = href
      onRefresh()
    } catch (e: any) {
      tab?.close()
      onToast(e?.message || 'Translate failed')
    } finally {
      setBusyId(null)
    }
  }

  if (rows.length === 0) {
    return <p style={{ color: 'var(--theme-elevation-450)', fontSize: 14, padding: '24px 0' }}>No articles match these filters.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((row) => {
        const isEditing = editingId === row.id
        const isBusy = busyId === row.id
        return (
          <div key={row.id} style={isEditing ? editCard() : card()}>
            {isEditing ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Pencil size={15} color={CYAN} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>Quick edit</span>
                </div>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" style={{ width: '100%', marginBottom: 8 }} />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Status })} style={{ flex: 1, minWidth: 140 }}>
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ flex: 1, minWidth: 140 }}>
                    {!form.category && <option value="">Category…</option>}
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" style={{ width: '100%', minHeight: 48, marginBottom: 8 }} />
                <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="Meta title" style={{ width: '100%', marginBottom: 8 }} />
                <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} placeholder="Meta description" style={{ width: '100%', minHeight: 48 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <button type="button" onClick={() => save(row)} disabled={saving} style={primaryBtn()}>
                    <Check size={15} /> {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} style={ghostBtn()}>
                    <X size={15} /> Cancel
                  </button>
                  <a href={`/admin/collections/blog-posts/${row.id}`} style={{ marginLeft: 'auto', fontSize: 13, color: CYAN, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Full editor <Settings2 size={14} />
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <input type="checkbox" checked={selected.has(row.id)} onChange={() => onToggleSelect(row.id)} aria-label={`Select ${row.title}`} style={{ marginTop: 4, cursor: 'pointer' }} />
                <div style={thumb()}>
                  <Thumb src={row.coverThumb} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 15, color: 'var(--theme-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.title}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--theme-elevation-500)', flexShrink: 0 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_DOT[row.status] }} /> {STATUS_LABELS[row.status]}
                    </span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--theme-elevation-500)' }}>
                    {(row.category?.name || 'No category')}{row.authorName ? ` · ${row.authorName}` : ''}{row.updatedAt ? ` · ${new Date(row.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}` : ''}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    <span style={localeChip()}>{row.locale.toUpperCase()}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, ...seoTone(row.seoScore) }}>SEO {row.seoScore}</span>
                    <span style={{ fontSize: 12, color: 'var(--theme-elevation-450)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Eye size={13} /> {row.viewsCount.toLocaleString('en-US')}</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                      <button type="button" aria-label="Quick edit" onClick={() => openEdit(row)} style={iconBtn()}><Pencil size={15} /></button>
                      <button type="button" aria-label="AI optimize" onClick={() => runOptimize(row)} disabled={isBusy} style={iconBtn()}><Sparkles size={15} color={isBusy ? 'var(--theme-elevation-400)' : CYAN} /></button>
                      <button type="button" aria-label="Translate" onClick={() => translate(row)} disabled={isBusy} style={iconBtn()}><Languages size={15} /></button>
                      <a aria-label="Preview" href={`/${row.locale}/articles/${row.slug}`} target="_blank" rel="noreferrer" style={iconBtn()}><ExternalLink size={15} /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function card(): CSSProperties {
  return { background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-100)', borderRadius: 12, padding: '12px 14px' }
}
function editCard(): CSSProperties {
  return { background: 'var(--theme-elevation-50)', border: `1px solid ${CYAN}`, borderRadius: 12, padding: 14 }
}
function thumb(): CSSProperties {
  return { width: 52, height: 52, borderRadius: 8, background: 'var(--theme-elevation-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }
}
function localeChip(): CSSProperties {
  return { fontSize: 11, padding: '2px 7px', borderRadius: 6, border: '1px solid var(--theme-elevation-200)', color: 'var(--theme-elevation-600)' }
}
function iconBtn(): CSSProperties {
  return { width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-elevation-600)', cursor: 'pointer', textDecoration: 'none' }
}
function primaryBtn(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '7px 14px', borderRadius: 8, border: `1px solid ${CYAN}`, background: CYAN, color: '#fff', cursor: 'pointer' }
}
function ghostBtn(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-text)', cursor: 'pointer' }
}
