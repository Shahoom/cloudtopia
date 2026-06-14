'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Check, ExternalLink, RotateCcw, Search, X } from 'lucide-react'
import type { Override, RouteGroup } from './api.ts'
import { deleteOverride, fetchManifest, saveOverride } from './api.ts'

const CYAN = '#0ea5e9'
const EMPTY: Override = { metaTitle: '', metaDescription: '', canonicalUrl: '', noIndex: false, noFollow: false }

export function SeoControlCenter() {
  const [groups, setGroups] = useState<RouteGroup[]>([])
  const [overrides, setOverrides] = useState<Record<string, Override>>({})
  const [locale, setLocale] = useState<'en' | 'ar'>('en')
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Override>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    fetchManifest()
      .then((m) => { setGroups(m.groups); setOverrides(m.overrides) })
      .catch((e) => setError(e?.message || 'Could not load routes.'))
      .finally(() => setLoading(false))
  }, [])

  const keyFor = (path: string) => `${path}|${locale}`

  function openEdit(path: string) {
    setEditing(path)
    setForm(overrides[keyFor(path)] || EMPTY)
  }

  async function save(path: string) {
    setSaving(true)
    try {
      const existing = overrides[keyFor(path)]
      const saved = await saveOverride(path, locale, {
        metaTitle: form.metaTitle, metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl, noIndex: form.noIndex, noFollow: form.noFollow,
      }, existing?.id)
      setOverrides((prev) => ({ ...prev, [keyFor(path)]: saved }))
      showToast('Saved')
      setEditing(null)
    } catch (e: any) {
      showToast(e?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function reset(path: string) {
    const existing = overrides[keyFor(path)]
    if (!existing?.id) { setEditing(null); return }
    if (!window.confirm('Remove this override and fall back to the default meta?')) return
    setSaving(true)
    try {
      await deleteOverride(existing.id)
      setOverrides((prev) => {
        const next = { ...prev }
        delete next[keyFor(path)]
        return next
      })
      showToast('Reset to default')
      setEditing(null)
    } catch (e: any) {
      showToast(e?.message || 'Reset failed')
    } finally {
      setSaving(false)
    }
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return groups
    return groups
      .map((g) => ({ ...g, routes: g.routes.filter((r) => r.path.toLowerCase().includes(needle) || r.label.toLowerCase().includes(needle)) }))
      .filter((g) => g.routes.length > 0)
  }, [groups, q])

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>SEO control center</h1>
          <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--theme-elevation-500)' }}>Edit the tab title + meta description for every page. Articles are managed in the Articles workspace.</p>
        </div>
        <div style={{ display: 'inline-flex', border: '1px solid var(--theme-elevation-150)', borderRadius: 8, overflow: 'hidden' }}>
          <button type="button" onClick={() => setLocale('en')} style={toggle(locale === 'en')}>English</button>
          <button type="button" onClick={() => setLocale('ar')} style={toggle(locale === 'ar')}>Arabic</button>
        </div>
      </div>

      <div style={{ position: 'relative', margin: '14px 0 18px' }}>
        <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--theme-elevation-400)' }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search routes…" style={{ width: '100%', paddingLeft: 32 }} />
      </div>

      {error && <p style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
      {loading && <p style={{ color: 'var(--theme-elevation-450)', fontSize: 14 }}>Loading routes…</p>}

      {filtered.map((group) => (
        <div key={group.group} style={{ marginBottom: 22 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--theme-elevation-400)' }}>{group.group} · {group.routes.length}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {group.routes.map((r) => {
              const ov = overrides[keyFor(r.path)]
              const hasOverride = !!(ov && (ov.metaTitle || ov.metaDescription || ov.canonicalUrl || ov.noIndex || ov.noFollow))
              const isEditing = editing === r.path
              return (
                <div key={r.path} style={isEditing ? editCard() : card()}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, color: 'var(--theme-text)' }}>{r.label}</span>
                        {hasOverride && <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 5, background: 'rgba(14,165,233,0.14)', color: CYAN }}>Overridden</span>}
                        {ov?.noIndex && <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 5, background: 'rgba(220,38,38,0.14)', color: '#dc2626' }}>noindex</span>}
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--theme-elevation-450)', fontFamily: 'var(--font-mono, monospace)' }}>/{r.path === '/' ? '' : r.path}</span>
                      {!isEditing && ov?.metaTitle && <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--theme-elevation-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ov.metaTitle}</p>}
                    </div>
                    {!isEditing && (
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <a href={`/${locale}/${r.path === '/' ? '' : r.path}`} target="_blank" rel="noreferrer" aria-label="Open page" style={iconBtn()}><ExternalLink size={15} /></a>
                        <button type="button" onClick={() => openEdit(r.path)} style={editBtn()}>Edit</button>
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div style={{ marginTop: 12 }}>
                      <label style={lbl()}>Meta title (tab name) <span style={count(form.metaTitle.length, 60)}>{form.metaTitle.length}/60</span></label>
                      <input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="Browser-tab title…" style={{ width: '100%', marginBottom: 10 }} />
                      <label style={lbl()}>Meta description <span style={count(form.metaDescription.length, 155)}>{form.metaDescription.length}/155</span></label>
                      <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} placeholder="Search-result description…" style={{ width: '100%', minHeight: 56, marginBottom: 10 }} />

                      <div style={snippet()}>
                        <div style={{ fontSize: 12, color: '#1a7f37', marginBottom: 2 }}>cloudtopia.net › {r.path === '/' ? '' : r.path}</div>
                        <div style={{ fontSize: 15, color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.metaTitle || r.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--theme-elevation-600)' }}>{form.metaDescription || 'No description set — the page default will be used.'}</div>
                      </div>

                      <input value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} placeholder="Canonical URL (optional)" style={{ width: '100%', margin: '10px 0' }} />
                      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--theme-text)' }}><input type="checkbox" checked={form.noIndex} onChange={(e) => setForm({ ...form, noIndex: e.target.checked })} /> noindex</label>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--theme-text)' }}><input type="checkbox" checked={form.noFollow} onChange={(e) => setForm({ ...form, noFollow: e.target.checked })} /> nofollow</label>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button type="button" onClick={() => save(r.path)} disabled={saving} style={primaryBtn()}><Check size={15} /> {saving ? 'Saving…' : 'Save'}</button>
                        <button type="button" onClick={() => setEditing(null)} style={ghostBtn()}><X size={15} /> Cancel</button>
                        {hasOverride && <button type="button" onClick={() => reset(r.path)} disabled={saving} style={{ ...ghostBtn(), marginLeft: 'auto', color: '#dc2626' }}><RotateCcw size={14} /> Reset</button>}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {toast && (
        <div style={{ position: 'sticky', bottom: 16, display: 'flex', justifyContent: 'center' }}>
          <span style={{ background: 'var(--theme-elevation-800)', color: 'var(--theme-elevation-0)', fontSize: 13, padding: '8px 16px', borderRadius: 999 }}>{toast}</span>
        </div>
      )}
    </div>
  )
}

function card(): CSSProperties {
  return { background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-100)', borderRadius: 10, padding: '12px 14px' }
}
function editCard(): CSSProperties {
  return { background: 'var(--theme-elevation-50)', border: `1px solid ${CYAN}`, borderRadius: 10, padding: 14 }
}
function toggle(active: boolean): CSSProperties {
  return { fontSize: 13, padding: '7px 14px', border: 'none', cursor: 'pointer', background: active ? 'var(--theme-elevation-100)' : 'transparent', color: active ? 'var(--theme-text)' : 'var(--theme-elevation-500)' }
}
function iconBtn(): CSSProperties {
  return { width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-elevation-600)', textDecoration: 'none' }
}
function editBtn(): CSSProperties {
  return { fontSize: 13, padding: '6px 14px', borderRadius: 7, border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-text)', cursor: 'pointer' }
}
function primaryBtn(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '7px 14px', borderRadius: 8, border: `1px solid ${CYAN}`, background: CYAN, color: '#fff', cursor: 'pointer' }
}
function ghostBtn(): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--theme-elevation-150)', background: 'transparent', color: 'var(--theme-text)', cursor: 'pointer' }
}
function lbl(): CSSProperties {
  return { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--theme-elevation-500)', marginBottom: 4 }
}
function count(len: number, max: number): CSSProperties {
  return { color: len > max ? '#dc2626' : 'var(--theme-elevation-400)' }
}
function snippet(): CSSProperties {
  return { background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-150)', borderRadius: 8, padding: '10px 12px' }
}
