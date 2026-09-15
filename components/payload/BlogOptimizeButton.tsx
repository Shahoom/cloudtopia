'use client'

import { useForm } from '@payloadcms/ui'
import { Sparkles } from 'lucide-react'
import { useCallback, useState } from 'react'
import { normalizeHeadings } from '@/lib/blog/normalize-headings'
import './admin/editor-widgets.css'

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
    <div className="ct-widget">
      <div className="ct-widget__head">
        <span className="ct-widget__icon" aria-hidden>
          <Sparkles size={16} />
        </span>
        <div className="ct-widget__heading">
          <p className="ct-widget__kicker">SEO assistant</p>
          <h3 className="ct-widget__title">Optimize &amp; auto-fill SEO</h3>
          <p className="ct-widget__copy">
            Fixes the heading structure (single H1) and fills the SEO fields from your content. Your prose is never
            rewritten — review the fields, then save.
          </p>
        </div>
        <div className="ct-widget__actions">
          <button type="button" className="ct-btn ct-btn--primary" onClick={run} disabled={loading} aria-busy={loading}>
            <Sparkles size={14} aria-hidden />
            {loading ? 'Optimizing…' : 'Optimize & auto-fill'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="ct-widget__body">
          <p className="ct-widget__error">{error}</p>
        </div>
      ) : null}

      {summary ? (
        <div className="ct-widget__body">
          <div className="ct-widget__result">
            <div>
              <strong>Applied</strong>
              <ul>
                {summary.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            {result?.secondaryKeywords?.length ? (
              <div>
                <strong>Secondary keywords:</strong> {result.secondaryKeywords.join(' · ')}
              </div>
            ) : null}
            {result?.internalLinks?.length ? (
              <div>
                <strong>Suggested internal links</strong>
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
              <div className="ct-widget__warn">
                <strong>Warnings</strong>
                <ul>
                  {result.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="ct-widget__note">Nothing is saved yet — review the fields and click Save.</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
