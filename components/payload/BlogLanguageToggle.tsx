'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import './admin/editor-widgets.css'

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
    <div className="ct-lang">
      <div className="ct-lang__row">
        <span className="ct-lang__label">Language</span>
        <div className="ct-lang__seg" role="group" aria-label="Article language">
          <span className="ct-lang__current" aria-current="true">
            {LABELS[currentLocale]}
          </span>
          <button
            type="button"
            className="ct-lang__other"
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
              <em className={`ct-lang__badge ct-lang__badge--${sibling.status}`}>{sibling.status.replace('_', ' ')}</em>
            ) : null}
          </button>
        </div>
      </div>
      {disabled ? <p className="ct-lang__hint">Save the article first to add the other language.</p> : null}
      {error ? <p className="ct-lang__hint ct-lang__hint--err">{error}</p> : null}
    </div>
  )
}
