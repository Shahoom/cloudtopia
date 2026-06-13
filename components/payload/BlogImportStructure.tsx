'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

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
    <div className="ctimp">
      <style>{css}</style>
      <div className="ctimp__head">
        <div className="ctimp__icon">⤵</div>
        <div>
          <h3 className="ctimp__title">Import &amp; Structure</h3>
          <p className="ctimp__copy">
            Paste your article or upload a <code>.md</code>/<code>.mdx</code> file. The AI adds headings, lists, and a
            comparison table where your content calls for it — <strong>without rewriting your words</strong> — then
            builds a complete draft: content, blocks (FAQ, key takeaways…), SEO, category, tags, author, and reading
            time. You add a cover image and publish.
          </p>
        </div>
      </div>

      <textarea
        className="ctimp__ta"
        placeholder="Paste your article text here (or choose a .md / .mdx file below)…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      <div className="ctimp__row">
        <button type="button" className="ctimp__file" onClick={() => fileRef.current?.click()} disabled={loading}>
          📄 Choose .md / .mdx
        </button>
        <input ref={fileRef} type="file" accept=".md,.mdx,text/markdown,text/plain" onChange={onFile} style={{ display: 'none' }} />
        {fileName ? <span className="ctimp__fname">{fileName}</span> : null}
        <span className="ctimp__spacer" />
        <button type="button" className="ctimp__go" onClick={run} disabled={loading || !text.trim()}>
          {loading ? 'Structuring…' : '✨ Import & Structure'}
        </button>
      </div>

      {error ? <p className="ctimp__err">{error}</p> : null}
      {summary ? (
        <ul className="ctimp__summary">
          {summary.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

const css = `
  .ctimp { margin-bottom: 28px; padding: 22px; border-radius: 14px; color:#e8eefc;
    background: linear-gradient(135deg,#0b1220,#13213b); border:1px solid #24314f;
    box-shadow:0 12px 30px -12px rgba(0,0,0,.5); position:relative; overflow:hidden; }
  .ctimp::before { content:""; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#0ea5e9,#6366f1,#ec4899); }
  .ctimp__head { display:flex; gap:14px; align-items:flex-start; margin-bottom:14px; }
  .ctimp__icon { flex-shrink:0; width:34px; height:34px; border-radius:9px; display:flex; align-items:center;
    justify-content:center; font-size:18px; background:rgba(14,165,233,.18); color:#7dd3fc; }
  .ctimp__title { margin:0 0 4px; font-size:1.15rem; font-weight:800; color:#fff; }
  .ctimp__copy { margin:0; font-size:.85rem; line-height:1.55; color:#9fb2d4; }
  .ctimp__copy code { background:rgba(255,255,255,.08); padding:1px 6px; border-radius:5px; }
  .ctimp__ta { width:100%; min-height:150px; resize:vertical; margin-bottom:12px; padding:14px;
    background:#070b14; border:1px solid #24314f; border-radius:9px; color:#dbe5f7;
    font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.85rem; line-height:1.6; }
  .ctimp__ta:focus { outline:none; border-color:#0ea5e9; }
  .ctimp__row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .ctimp__file { background:transparent; color:#bcd; border:1px solid #2c3a5c; border-radius:8px;
    padding:9px 14px; font-size:.82rem; font-weight:700; cursor:pointer; }
  .ctimp__file:hover:not(:disabled){ border-color:#0ea5e9; color:#fff; }
  .ctimp__fname { font-size:.8rem; color:#7dd3fc; }
  .ctimp__spacer { flex:1; }
  .ctimp__go { background:#0ea5e9; color:#04121d; border:0; border-radius:9px; padding:11px 22px;
    font-size:.9rem; font-weight:800; cursor:pointer; transition:transform .15s ease, background .15s ease; }
  .ctimp__go:hover:not(:disabled){ background:#38bdf8; transform:translateY(-1px); }
  .ctimp__go:disabled,.ctimp__file:disabled { opacity:.55; cursor:not-allowed; }
  .ctimp__err { margin:12px 0 0; color:#fca5a5; font-weight:700; font-size:.85rem; }
  .ctimp__summary { margin:14px 0 0; padding:12px 16px 12px 32px; background:rgba(255,255,255,.06);
    border-radius:9px; font-size:.83rem; line-height:1.5; }
  .ctimp__summary li { margin:3px 0; }
`
