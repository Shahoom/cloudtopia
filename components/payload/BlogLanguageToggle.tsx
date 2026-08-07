'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type Locale = 'en' | 'ar'

const LABELS: Record<Locale, string> = { en: 'English', ar: 'العربية' }

/**
 * EN ⇄ AR language toggle pinned to the top of the article editor.
 *
 * Articles are two paired documents that share a slug across locales. This is a
 * navigation + find-or-create control: clicking the other language opens its
 * version, creating a blank draft (via POST /api/blog-pair) if none exists yet.
 */
export function BlogLanguageToggle() {
  const router = useRouter()
  const { id: rawId } = useDocumentInfo()
  const id = rawId ? String(rawId) : undefined

  const { currentLocale, slug } = useFormFields(([fields]) => ({
    currentLocale: (fields?.locale?.value as Locale) || 'en',
    slug: (fields?.slug?.value as string) || '',
  }))
  const otherLocale: Locale = currentLocale === 'ar' ? 'en' : 'ar'

  const [sibling, setSibling] = useState<{ exists: boolean; status?: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Pre-check whether the other-language version already exists (for the label).
  useEffect(() => {
    let cancelled = false
    if (!id || !slug) {
      setSibling(null)
      return
    }
    const params = new URLSearchParams()
    params.set('where[slug][equals]', slug)
    params.set('where[locale][equals]', otherLocale)
    params.set('limit', '1')
    params.set('depth', '0')
    // No `draft=true`: that reads through the versions table, so a sibling with
    // no version row (bulk-imported articles) reads as missing and this button
    // offers "+ Add" for a version that already exists.
    fetch(`/api/blog-posts?${params.toString()}`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return
        const doc = data?.docs?.[0]
        setSibling(doc ? { exists: true, status: doc.status } : { exists: false })
      })
      .catch(() => {
        if (!cancelled) setSibling(null)
      })
    return () => {
      cancelled = true
    }
  }, [id, slug, otherLocale])

  const goToOther = useCallback(async () => {
    if (!id) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/blog-pair', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Could not open the other language.')
      router.push(`/admin/collections/blog-posts/${data.id}`)
    } catch (err: any) {
      setError(err?.message || 'Could not open the other language.')
      setBusy(false)
    }
  }, [id, router])

  const disabled = !id || !slug
  const otherActionLabel = !sibling
    ? `${LABELS[otherLocale]}`
    : sibling.exists
      ? `Open ${LABELS[otherLocale]} →`
      : `+ Add ${LABELS[otherLocale]}`

  return (
    <div style={wrap}>
      <style>{css}</style>
      <div className="ctlang">
        <span className="ctlang__title">Language</span>
        <div className="ctlang__seg" role="group" aria-label="Article language">
          <span className="ctlang__current" aria-current="true">
            {LABELS[currentLocale]}
          </span>
          <button
            type="button"
            className="ctlang__other"
            onClick={goToOther}
            disabled={disabled || busy}
            aria-busy={busy}
            title={
              disabled
                ? 'Save the article first to add the other language.'
                : sibling?.exists
                  ? `Open the ${LABELS[otherLocale]} version`
                  : `Create a blank ${LABELS[otherLocale]} version`
            }
          >
            {busy ? 'Opening…' : otherActionLabel}
            {sibling?.exists && sibling.status ? (
              <em className={`ctlang__badge ctlang__badge--${sibling.status}`}>{sibling.status}</em>
            ) : null}
          </button>
        </div>
      </div>
      {disabled ? (
        <p className="ctlang__hint">Save the article first to add the other language.</p>
      ) : null}
      {error ? <p className="ctlang__hint ctlang__hint--err">{error}</p> : null}
    </div>
  )
}

const wrap: React.CSSProperties = { padding: '4px 0 14px' }

const css = `
  .ctlang { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
  .ctlang__title { font-size:12px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; color:#5b6472; }
  .ctlang__seg { display:inline-flex; align-items:stretch; border:1px solid #cdd6e4; border-radius:10px; overflow:hidden; background:#fff; }
  .ctlang__current { display:inline-flex; align-items:center; padding:9px 16px; font-weight:800; font-size:14px;
    background:linear-gradient(135deg,#0ea5e9,#0284c7); color:#fff; }
  .ctlang__other { display:inline-flex; align-items:center; gap:8px; padding:9px 16px; font-weight:700; font-size:14px;
    background:#fff; color:#0f3a52; border:0; border-left:1px solid #cdd6e4; cursor:pointer; transition:background 160ms ease; }
  .ctlang__other:hover:not(:disabled) { background:#eff8ff; }
  .ctlang__other:disabled { opacity:.55; cursor:not-allowed; }
  .ctlang__badge { font-style:normal; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.04em;
    padding:2px 6px; border-radius:999px; background:#e8edf3; color:#5b6472; }
  .ctlang__badge--published { background:#dcfce7; color:#166534; }
  .ctlang__badge--draft { background:#fef9c3; color:#854d0e; }
  .ctlang__hint { margin:8px 0 0; font-size:12px; font-weight:600; color:#7a8494; }
  .ctlang__hint--err { color:#c0392b; }
`
