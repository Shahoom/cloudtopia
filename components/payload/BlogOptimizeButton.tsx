'use client'

import { useForm } from '@payloadcms/ui'
import { useCallback, useState } from 'react'
import { normalizeHeadings } from '@/lib/blog/normalize-headings'

type OptimizeResult = {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  secondaryKeywords?: string[]
  excerpt?: string
  shortExcerpt?: string
  slugSuggestion?: string
  internalLinks?: Array<{ anchor?: string; target?: string }>
  warnings?: string[]
}

// Minimal, dependency-free plain-text extraction from a Lexical state.
function lexicalToText(node: unknown, acc: string[] = []): string[] {
  if (!node || typeof node !== 'object') return acc
  const n = node as { text?: string; children?: unknown }
  if (typeof n.text === 'string') acc.push(n.text)
  if (Array.isArray(n.children)) for (const c of n.children) lexicalToText(c, acc)
  return acc
}

export function BlogOptimizeButton() {
  const { getData, dispatchFields } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState<string[] | null>(null)
  const [result, setResult] = useState<OptimizeResult | null>(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError('')
    setSummary(null)
    setResult(null)

    try {
      const data = (getData() || {}) as Record<string, any>
      const content = data.content
      const contentPlain = content?.root ? lexicalToText(content.root).join(' ').replace(/\s+/g, ' ').trim() : ''

      if (!data.title && !contentPlain) {
        throw new Error('Add a title and some content first, then optimize.')
      }

      const changed: string[] = []

      // 1) Deterministic heading fix (title is the page H1 → demote in-body H1s).
      if (content?.root) {
        const norm = normalizeHeadings(content)
        if (norm.demotedH1 > 0 || norm.fixedSkips > 0) {
          dispatchFields({ type: 'UPDATE', path: 'content', value: norm.value })
          if (norm.demotedH1 > 0) changed.push(`Demoted ${norm.demotedH1} in-body H1 → H2`)
          if (norm.fixedSkips > 0) changed.push(`Fixed ${norm.fixedSkips} heading-level skip(s)`)
        } else {
          changed.push('Heading structure already clean')
        }
      }

      // 2) AI SEO package (works on the current, even unsaved, content).
      const res = await fetch('/api/blog-ai', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'optimize',
          input: {
            title: data.title || '',
            excerpt: data.excerpt || '',
            focusKeyword: data.seo?.focusKeyword || '',
            locale: data.locale || 'en',
            contentPlain,
          },
        }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload?.error || 'Optimization failed.')
      const out = payload.result as OptimizeResult
      setResult(out)

      // 3) Write results into the fields (review before Save).
      const set = (path: string, value: unknown, label: string) => {
        if (value == null || value === '') return
        dispatchFields({ type: 'UPDATE', path, value })
        changed.push(label)
      }
      set('seo.metaTitle', out.metaTitle, 'Meta title')
      set('seo.metaDescription', out.metaDescription, 'Meta description')
      set('seo.focusKeyword', out.focusKeyword, 'Focus keyword')
      // Don't clobber author-written copy — only fill when empty.
      if (!data.excerpt) set('excerpt', out.excerpt, 'Excerpt')
      if (!data.shortExcerpt) set('shortExcerpt', out.shortExcerpt, 'Short excerpt')
      if (!data.slug) set('slug', out.slugSuggestion, 'Slug')

      setSummary(changed)
    } catch (err: any) {
      setError(err?.message || 'Optimization failed.')
    } finally {
      setLoading(false)
    }
  }, [getData, dispatchFields])

  return (
    <div className="ctopt">
      <style>{css}</style>
      <div className="ctopt__head">
        <div>
          <p className="ctopt__kicker">CloudTopia SEO AI</p>
          <h3 className="ctopt__title">Optimize &amp; auto-fill SEO</h3>
          <p className="ctopt__copy">
            Fixes your heading structure (single H1) and auto-fills the SEO fields from your content. Your prose is
            never rewritten. Review, then Save.
          </p>
        </div>
        <button type="button" className="ctopt__btn" onClick={run} disabled={loading} aria-busy={loading}>
          {loading ? 'Optimizing…' : '✨ Optimize & auto-fill'}
        </button>
      </div>

      {error ? <p className="ctopt__err">{error}</p> : null}

      {summary ? (
        <div className="ctopt__summary">
          <strong>Applied:</strong>
          <ul>
            {summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          {result?.secondaryKeywords?.length ? (
            <p className="ctopt__sub">
              <strong>Secondary keywords:</strong> {result.secondaryKeywords.join(' · ')}
            </p>
          ) : null}
          {result?.internalLinks?.length ? (
            <div className="ctopt__sub">
              <strong>Suggested internal links:</strong>
              <ul>
                {result.internalLinks.map((l, i) => (
                  <li key={i}>
                    “{l.anchor}” → <code>{l.target}</code>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {result?.warnings?.length ? (
            <div className="ctopt__warn">
              <strong>⚠ Warnings:</strong>
              <ul>
                {result.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="ctopt__note">Nothing is saved yet — review the fields above and click Payload’s Save.</p>
        </div>
      ) : null}
    </div>
  )
}

const css = `
  .ctopt { margin-bottom: 28px; padding: 20px; border-radius: 14px; color:#e6f6ff;
    background: linear-gradient(135deg, #0b3a52, #075985); border:1px solid #0ea5e9;
    box-shadow: 0 10px 30px -10px rgba(14,165,233,.45); }
  .ctopt__head { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; flex-wrap:wrap; }
  .ctopt__kicker { margin:0; font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:#7dd3fc; }
  .ctopt__title { margin:4px 0 6px; font-size:1.15rem; font-weight:800; color:#fff; }
  .ctopt__copy { margin:0; max-width:520px; font-size:.85rem; line-height:1.5; color:#bae6fd; }
  .ctopt__btn { flex-shrink:0; background:#fff; color:#075985; border:0; border-radius:10px; padding:12px 20px;
    font-size:.9rem; font-weight:800; cursor:pointer; transition:transform .15s ease, background .15s ease; }
  .ctopt__btn:hover:not(:disabled) { background:#e0f2fe; transform:translateY(-1px); }
  .ctopt__btn:disabled { opacity:.6; cursor:wait; }
  .ctopt__err { margin:14px 0 0; color:#fecaca; font-weight:700; font-size:.85rem; }
  .ctopt__summary { margin:16px 0 0; padding:14px 16px; background:rgba(255,255,255,.08); border-radius:10px; font-size:.85rem; }
  .ctopt__summary ul { margin:6px 0 0; padding-left:18px; }
  .ctopt__summary li { margin:2px 0; }
  .ctopt__sub { margin:12px 0 0; color:#cdeeff; }
  .ctopt__sub code { background:rgba(0,0,0,.25); padding:1px 6px; border-radius:5px; }
  .ctopt__warn { margin:12px 0 0; color:#fde68a; }
  .ctopt__note { margin:12px 0 0; font-size:.8rem; color:#9fd8f2; font-style:italic; }
`
