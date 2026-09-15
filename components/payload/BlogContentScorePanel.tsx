'use client'

import { ClipboardCheck } from 'lucide-react'
import { useState } from 'react'
import './admin/editor-widgets.css'

type AnalysisResult = {
  contentScore?: number
  seoScore?: number
  readabilityScore?: number
  wordCount?: number
  missing?: string[]
}

function currentPostId() {
  if (typeof window === 'undefined') return ''
  const match = window.location.pathname.match(/\/collections\/blog-posts\/([^/]+)/)
  return match?.[1] || ''
}

export function BlogContentScorePanel() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  async function analyze() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/blog-ai', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'analyze', postId: currentPostId() }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Could not analyze this article.')
      setResult(payload.result)
    } catch (err: any) {
      setError(err?.message || 'Could not analyze this article.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="ct-widget">
      <div className="ct-widget__head">
        <span className="ct-widget__icon" aria-hidden>
          <ClipboardCheck size={16} />
        </span>
        <div className="ct-widget__heading">
          <p className="ct-widget__kicker">Content assistant</p>
          <h3 className="ct-widget__title">Editorial readiness checklist</h3>
          <p className="ct-widget__copy">
            Save the post, then run an analysis to catch missing SEO, content, CTA, FAQ, author, and image-alt items.
          </p>
        </div>
        <div className="ct-widget__actions">
          <button type="button" className="ct-btn ct-btn--secondary" onClick={analyze} disabled={loading}>
            {loading ? 'Analyzing…' : 'Analyze saved article'}
          </button>
        </div>
      </div>
      {error && (
        <div className="ct-widget__body">
          <p className="ct-widget__error">{error}</p>
        </div>
      )}
      {result && (
        <div className="ct-widget__body">
          <div className="ct-widget__metrics">
            <Metric label="Content" value={result.contentScore} />
            <Metric label="SEO" value={result.seoScore} />
            <Metric label="Readability" value={result.readabilityScore} />
            <Metric label="Words" value={result.wordCount} />
            {(result.missing || []).length > 0 && (
              <p className="ct-widget__missing">Missing: {(result.missing || []).join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function Metric({ label, value }: { label: string; value?: number }) {
  return (
    <span className="ct-widget__metric">
      <strong>{value ?? '–'}</strong>
      {label}
    </span>
  )
}
