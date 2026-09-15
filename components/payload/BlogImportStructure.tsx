'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { ChevronDown, FileText, Sparkles, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import './admin/editor-widgets.css'

/**
 * "Import & Structure" — paste text or upload a .md/.mdx file. The AI re-arranges
 * it (headings, lists, comparison tables) WITHOUT rewriting the words, then the
 * server builds a fully-populated DRAFT: rich-text content, blocks (FAQ, key
 * takeaways, comparison, pros/cons, stats), SEO, category, tags, author, type,
 * reading time. You review the draft, add a cover image, and publish.
 */
export function BlogImportStructure() {
  const router = useRouter()
  const { id: rawId } = useDocumentInfo()
  const id = rawId ? String(rawId) : undefined

  // Collapsed on existing articles so the editor opens on the content, open
  // on a brand-new document where importing is the likely first step.
  const [open, setOpen] = useState(!id)
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState<string[] | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setError('')
    try {
      setText(await file.text())
    } catch {
      setError('Could not read that file.')
    }
  }, [])

  const run = useCallback(async () => {
    if (!text.trim()) {
      setError('Paste some text or choose a .md/.mdx file first.')
      return
    }
    setLoading(true)
    setError('')
    setSummary(null)
    try {
      const res = await fetch('/api/blog-import', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, id }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload?.error || 'Import failed.')

      setSummary([
        `Filled: ${(payload.filled || []).join(', ')}.`,
        ...(payload.warnings || []).map((w: string) => `⚠ ${w}`),
        payload.created ? 'Opening the new draft…' : 'Reloading with the imported content…',
      ])

      // Reliable server-side persist already happened; just open/refresh.
      setTimeout(() => {
        if (payload.created && payload.id) {
          router.push(`/admin/collections/blog-posts/${payload.id}`)
        } else {
          router.refresh()
        }
      }, 900)
    } catch (err: any) {
      setError(err?.message || 'Import failed.')
      setLoading(false)
    }
  }, [text, id, router])

  return (
    <div className={`ct-widget${open ? '' : ' ct-widget--compact'}`}>
      <div className="ct-widget__head">
        <span className="ct-widget__icon" aria-hidden>
          <FileText size={16} />
        </span>
        <div className="ct-widget__heading">
          <h3 className="ct-widget__title" style={open ? undefined : { margin: '6px 0 0' }}>
            Import &amp; structure
          </h3>
          {open && (
            <p className="ct-widget__copy">
              Paste your article or upload a <code>.md</code>/<code>.mdx</code> file. The AI adds headings, lists, and a
              comparison table where your content calls for it — <strong>without rewriting your words</strong> — then
              builds a complete draft: content, blocks, SEO, category, tags, author, and reading time.
            </p>
          )}
        </div>
        <div className="ct-widget__actions">
          <button type="button" className="ct-btn ct-btn--ghost" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Hide' : 'Open'}
            <ChevronDown size={14} className={`ct-widget__chevron${open ? ' is-open' : ''}`} aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div className="ct-widget__body">
          <textarea
            className="ct-widget__textarea"
            placeholder="Paste your article text here (or choose a .md / .mdx file below)…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
            dir="auto"
          />

          <div className="ct-widget__row">
            <button type="button" className="ct-btn ct-btn--secondary" onClick={() => fileRef.current?.click()} disabled={loading}>
              <Upload size={14} aria-hidden /> Choose .md / .mdx
            </button>
            <input ref={fileRef} type="file" accept=".md,.mdx,text/markdown,text/plain" onChange={onFile} style={{ display: 'none' }} />
            {fileName ? <span className="ct-widget__meta">{fileName}</span> : null}
            <span className="ct-widget__spacer" />
            <button type="button" className="ct-btn ct-btn--primary" onClick={run} disabled={loading || !text.trim()}>
              <Sparkles size={14} aria-hidden />
              {loading ? 'Structuring…' : 'Import & structure'}
            </button>
          </div>

          {error ? <p className="ct-widget__error">{error}</p> : null}
          {summary ? (
            <div className="ct-widget__result">
              <ul>
                {summary.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
