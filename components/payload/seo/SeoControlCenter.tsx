'use client'

import '../dashboard/dashboard.css'
import '../dashboard/seo-center.css'
import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, Check, Cloud, ExternalLink, RotateCcw, Search, X } from 'lucide-react'
import { EmptyState } from '../dashboard/EmptyState.tsx'
import type { Override, RouteGroup } from './api.ts'
import { deleteOverride, fetchManifest, saveOverride } from './api.ts'

const EMPTY: Override = { metaTitle: '', metaDescription: '', canonicalUrl: '', noIndex: false, noFollow: false }

const isOverridden = (ov?: Override) => !!(ov && (ov.metaTitle || ov.metaDescription || ov.canonicalUrl || ov.noIndex || ov.noFollow))

function Meter({ length, max }: { length: number; max: number }) {
  return (
    <div className="ct-dash-seo-meter" aria-hidden="true">
      <i className={length > max ? 'is-over' : undefined} style={{ width: `${Math.min(100, (length / max) * 100)}%` }} />
    </div>
  )
}

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
  const [toast, setToast] = useState<{ text: string; error: boolean } | null>(null)

  function showToast(text: string, isError = false) {
    setToast({ text, error: isError })
    setTimeout(() => setToast(null), 3000)
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
      showToast(e?.message || 'Save failed', true)
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
      showToast(e?.message || 'Reset failed', true)
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

  const totals = useMemo(() => {
    let routes = 0
    let overridden = 0
    let noindex = 0
    for (const g of groups) {
      for (const r of g.routes) {
        const ov = overrides[`${r.path}|${locale}`]
        routes += 1
        if (isOverridden(ov)) overridden += 1
        if (ov?.noIndex) noindex += 1
      }
    }
    return { routes, overridden, noindex }
  }, [groups, overrides, locale])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const ready = !loading && !error

  return (
    <div className="ct-dash-root ct-dash-seo">
      <header className="ct-dash-head">
        <div>
          <h1 className="ct-dash-title">
            SEO center
            {ready && <span className="ct-dash-seo-count">{totals.routes}</span>}
          </h1>
          <div className="ct-dash-sub">Edit the tab title and meta description for every page. Articles are managed in the Articles workspace.</div>
        </div>
        <div className="ct-dash-seg" role="group" aria-label="Meta language">
          <button type="button" className={locale === 'en' ? 'is-on' : undefined} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
            English
          </button>
          <button type="button" className={locale === 'ar' ? 'is-on' : undefined} aria-pressed={locale === 'ar'} onClick={() => setLocale('ar')}>
            Arabic
          </button>
        </div>
      </header>

      <div className="ct-dash-seo-toolbar">
        <label className="ct-dash-seo-search">
          <Search size={15} strokeWidth={2} aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search routes…" aria-label="Search routes" />
        </label>
        {ready && (
          <>
            <span className="ct-dash-pill is-accent">{totals.overridden} overridden</span>
            {totals.noindex > 0 && <span className="ct-dash-pill is-error">{totals.noindex} noindex</span>}
          </>
        )}
      </div>

      {error && (
        <div className="ct-dash-notice" role="alert">
          <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
          {error}
        </div>
      )}

      {loading && (
        <div className="ct-dash-card" role="status" aria-busy="true">
          <span className="ct-dash-sr">Loading routes…</span>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="ct-dash-seo-skeleton-row" aria-hidden="true">
              <i style={{ width: `${62 + ((i * 17) % 34)}%` }} />
              <i style={{ width: `${40 + ((i * 23) % 48)}%` }} />
              <i />
            </div>
          ))}
        </div>
      )}

      {ready && filtered.length === 0 && (
        <div className="ct-dash-card">
          <EmptyState
            icon={<Search size={16} strokeWidth={2} aria-hidden="true" />}
            title={q.trim() ? `No routes match “${q.trim()}”` : 'No routes found'}
            hint={q.trim() ? 'Search by page name or by a path segment such as “services”.' : undefined}
          />
        </div>
      )}

      <div className="ct-dash-seo-groups">
        {filtered.map((group) => (
          <section key={group.group} className="ct-dash-card" aria-label={group.group}>
            <header className="ct-dash-card-head">
              <h2 className="ct-dash-card-title">{group.group}</h2>
              <span className="ct-dash-card-sub">
                {group.routes.length} {group.routes.length === 1 ? 'route' : 'routes'}
              </span>
            </header>
            <ul className="ct-dash-seo-list">
              {group.routes.map((r) => {
                const ov = overrides[keyFor(r.path)]
                const cur = r.current?.[locale] || { title: '', description: '' }
                const hasOverride = isOverridden(ov)
                const effectiveTitle = ov?.metaTitle || cur.title
                const isEditing = editing === r.path
                const segments = r.path === '/' ? [] : r.path.split('/').filter(Boolean)
                return (
                  <li key={r.path} className={`ct-dash-seo-row${isEditing ? ' is-editing' : ''}`}>
                    <div className="ct-dash-seo-route">
                      <div className="ct-dash-seo-route-line">
                        <span className="ct-dash-seo-label">{r.label}</span>
                        {hasOverride && <span className="ct-dash-pill is-accent">Overridden</span>}
                        {ov?.noIndex && <span className="ct-dash-pill is-error">noindex</span>}
                      </div>
                      <code className="ct-dash-seo-path">/{r.path === '/' ? '' : r.path}</code>
                    </div>

                    {!isEditing && (
                      <>
                        <div className="ct-dash-seo-title" dir={locale === 'ar' ? 'rtl' : undefined} title={effectiveTitle}>
                          {effectiveTitle || '—'}
                        </div>
                        <div className="ct-dash-seo-row-actions">
                          <a
                            className="ct-dash-seo-icon-btn"
                            href={`/${locale}/${r.path === '/' ? '' : r.path}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${r.label} in a new tab`}
                          >
                            <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
                          </a>
                          <button type="button" className="ct-dash-seo-btn" onClick={() => openEdit(r.path)}>
                            Edit<span className="ct-dash-sr"> {r.label}</span>
                          </button>
                        </div>
                      </>
                    )}

                    {isEditing && (
                      <div className="ct-dash-seo-edit">
                        <div className="ct-dash-seo-fields">
                          <label className="ct-dash-seo-lbl" htmlFor="ct-seo-title">
                            Meta title (tab name)
                            <span className={`ct-dash-seo-cnt${form.metaTitle.length > 60 ? ' is-over' : ''}`}>{form.metaTitle.length}/60</span>
                          </label>
                          <input
                            id="ct-seo-title"
                            className="ct-dash-seo-input"
                            dir={dir}
                            value={form.metaTitle}
                            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                            placeholder={cur.title ? `Default: ${cur.title}` : 'Browser-tab title…'}
                          />
                          <Meter length={form.metaTitle.length} max={60} />

                          <label className="ct-dash-seo-lbl" htmlFor="ct-seo-description">
                            Meta description
                            <span className={`ct-dash-seo-cnt${form.metaDescription.length > 155 ? ' is-over' : ''}`}>{form.metaDescription.length}/155</span>
                          </label>
                          <textarea
                            id="ct-seo-description"
                            className="ct-dash-seo-input"
                            dir={dir}
                            rows={3}
                            value={form.metaDescription}
                            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                            placeholder={cur.description ? `Default: ${cur.description.slice(0, 90)}…` : 'Search-result description…'}
                          />
                          <Meter length={form.metaDescription.length} max={155} />

                          <label className="ct-dash-seo-lbl" htmlFor="ct-seo-canonical">
                            Canonical URL <span className="ct-dash-seo-optional">Optional</span>
                          </label>
                          <input
                            id="ct-seo-canonical"
                            className="ct-dash-seo-input"
                            dir="ltr"
                            value={form.canonicalUrl}
                            onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                            placeholder="https://cloudtopia.net/…"
                          />

                          <div className="ct-dash-seo-checks">
                            <label className="ct-dash-seo-check">
                              <input type="checkbox" checked={form.noIndex} onChange={(e) => setForm({ ...form, noIndex: e.target.checked })} />
                              noindex
                            </label>
                            <label className="ct-dash-seo-check">
                              <input type="checkbox" checked={form.noFollow} onChange={(e) => setForm({ ...form, noFollow: e.target.checked })} />
                              nofollow
                            </label>
                          </div>
                        </div>

                        <div className="ct-dash-seo-preview">
                          <div className="ct-dash-seo-preview-k">Search preview</div>
                          <div className="ct-dash-seo-serp" dir={dir}>
                            <div className="ct-dash-seo-serp-site">
                              <span className="ct-dash-seo-serp-fav" aria-hidden="true">
                                <Cloud size={12} strokeWidth={2} />
                              </span>
                              <div style={{ minWidth: 0 }}>
                                <div>CloudTopia</div>
                                <div className="ct-dash-seo-serp-url">{['cloudtopia.net', locale, ...segments].join(' › ')}</div>
                              </div>
                            </div>
                            <div className="ct-dash-seo-serp-t">{form.metaTitle || cur.title || r.label}</div>
                            <div className={`ct-dash-seo-serp-d${form.metaDescription || cur.description ? '' : ' is-placeholder'}`}>
                              {form.metaDescription || cur.description || 'No description set — the page default will be used.'}
                            </div>
                          </div>
                        </div>

                        <div className="ct-dash-seo-edit-actions">
                          <button type="button" className="ct-dash-seo-btn is-primary" onClick={() => save(r.path)} disabled={saving}>
                            <Check size={15} strokeWidth={2} aria-hidden="true" />
                            {saving ? 'Saving…' : 'Save'}
                          </button>
                          <button type="button" className="ct-dash-seo-btn" onClick={() => setEditing(null)}>
                            <X size={15} strokeWidth={2} aria-hidden="true" />
                            Cancel
                          </button>
                          {hasOverride && (
                            <button type="button" className="ct-dash-seo-btn is-danger" onClick={() => reset(r.path)} disabled={saving}>
                              <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                              Reset to default
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      {toast && (
        <div className={`ct-dash-seo-toast${toast.error ? ' is-error' : ''}`} role="status" aria-live="polite">
          {toast.error ? <AlertCircle size={15} strokeWidth={2} aria-hidden="true" /> : <Check size={15} strokeWidth={2} aria-hidden="true" />}
          {toast.text}
        </div>
      )}
    </div>
  )
}
