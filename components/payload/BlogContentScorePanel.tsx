'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

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
    <section style={styles.card}>
      <div>
        <p style={styles.kicker}>Content assistant</p>
        <h3 style={styles.title}>Editorial readiness checklist</h3>
        <p style={styles.copy}>Save the post, then run an analysis to catch missing SEO, content, CTA, FAQ, author, and image-alt items.</p>
      </div>
      <button type="button" style={styles.button} onClick={analyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze saved article'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {result && (
        <div style={styles.grid}>
          <Metric label="Content" value={result.contentScore} />
          <Metric label="SEO" value={result.seoScore} />
          <Metric label="Readability" value={result.readabilityScore} />
          <Metric label="Words" value={result.wordCount} />
          {(result.missing || []).length > 0 && (
            <p style={styles.missing}>Missing: {(result.missing || []).join(', ')}</p>
          )}
        </div>
      )}
    </section>
  )
}

function Metric({ label, value }: { label: string; value?: number }) {
  return (
    <span style={styles.metric}>
      <strong>{value ?? '-'}</strong>
      {label}
    </span>
  )
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'grid',
    gap: 14,
    border: '1px solid rgba(2, 132, 199, 0.18)',
    background: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
  },
  kicker: {
    margin: 0,
    color: '#0284c7',
    fontSize: 11,
    fontWeight: 950,
    textTransform: 'uppercase',
  },
  title: {
    margin: '8px 0 6px',
    color: '#0f172a',
    fontSize: 18,
  },
  copy: {
    margin: 0,
    color: '#475569',
    lineHeight: 1.6,
  },
  button: {
    justifySelf: 'start',
    border: 0,
    borderRadius: 10,
    background: '#0284c7',
    color: '#fff',
    padding: '10px 14px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 10,
  },
  metric: {
    display: 'grid',
    gap: 3,
    borderRadius: 12,
    background: '#f4f1f8',
    padding: 12,
    color: '#475569',
    fontSize: 12,
    fontWeight: 800,
  },
  missing: {
    gridColumn: '1 / -1',
    margin: 0,
    color: '#9f1239',
    fontWeight: 800,
  },
  error: {
    color: '#9f1239',
    fontWeight: 800,
  },
}
