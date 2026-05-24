'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

const actions = [
  ['idea', 'Generate Idea'],
  ['outline', 'Generate Outline'],
  ['title', 'Improve Title'],
  ['excerpt', 'Generate Excerpt'],
  ['intro', 'Generate Intro'],
  ['rewrite', 'Rewrite Section'],
  ['faq', 'Generate FAQ'],
  ['seo', 'Generate SEO Package'],
  ['social', 'Generate Social Posts'],
  ['cta', 'Generate CTA'],
  ['translate', 'Translate Content'],
] as const

function currentPostId() {
  if (typeof window === 'undefined') return ''
  const match = window.location.pathname.match(/\/collections\/blog-posts\/([^/]+)/)
  return match?.[1] || ''
}

export function BlogAIAssistantPanel() {
  const [action, setAction] = useState<(typeof actions)[number][0]>('outline')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('premium, practical, B2B, clear')
  const [targetAudience, setTargetAudience] = useState('small businesses and founders')
  const [serviceFocus, setServiceFocus] = useState('websites, business systems, automation, AI')
  const [section, setSection] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')

  async function submit() {
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const response = await fetch('/api/blog-ai', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action,
          postId: currentPostId(),
          input: { topic, tone, targetAudience, serviceFocus, section },
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'AI assistant request failed.')
      setOutput(typeof payload.result === 'string' ? payload.result : JSON.stringify(payload.result, null, 2))
    } catch (err: any) {
      setError(err?.message || 'AI assistant request failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={styles.card}>
      <div>
        <p style={styles.kicker}>CloudTopia AI assistant</p>
        <h3 style={styles.title}>Generate editorial suggestions safely inside Payload</h3>
        <p style={styles.copy}>
          AI outputs are logged, never published automatically, and should be reviewed before inserting into the article.
        </p>
      </div>
      <div style={styles.grid}>
        <label style={styles.label}>
          Tool
          <select value={action} onChange={(event) => setAction(event.target.value as any)} style={styles.input}>
            {actions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Topic or keyword
          <input value={topic} onChange={(event) => setTopic(event.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Target audience
          <input value={targetAudience} onChange={(event) => setTargetAudience(event.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Service focus
          <input value={serviceFocus} onChange={(event) => setServiceFocus(event.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Tone
          <input value={tone} onChange={(event) => setTone(event.target.value)} style={styles.input} />
        </label>
      </div>
      <label style={styles.label}>
        Selected section / extra context
        <textarea value={section} onChange={(event) => setSection(event.target.value)} rows={5} style={styles.textarea} />
      </label>
      <button type="button" style={styles.button} onClick={submit} disabled={loading}>
        {loading ? 'Generating...' : 'Generate suggestion'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {output && <pre style={styles.output}>{output}</pre>}
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'grid',
    gap: 16,
    border: '1px solid rgba(2, 132, 199, 0.18)',
    background: 'linear-gradient(135deg, #ffffff, #eef9ff)',
    borderRadius: 16,
    padding: 18,
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 12,
  },
  label: {
    display: 'grid',
    gap: 6,
    color: '#0f172a',
    fontSize: 12,
    fontWeight: 900,
  },
  input: {
    border: '1px solid rgba(15, 23, 42, 0.14)',
    borderRadius: 10,
    padding: '10px 12px',
    background: '#fff',
    color: '#0f172a',
  },
  textarea: {
    border: '1px solid rgba(15, 23, 42, 0.14)',
    borderRadius: 10,
    padding: 12,
    background: '#fff',
    color: '#0f172a',
    resize: 'vertical',
  },
  button: {
    justifySelf: 'start',
    border: 0,
    borderRadius: 10,
    background: '#0f172a',
    color: '#fff',
    padding: '11px 15px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  output: {
    whiteSpace: 'pre-wrap',
    borderRadius: 12,
    background: '#0f172a',
    color: '#e0f2fe',
    padding: 14,
    overflowX: 'auto',
    lineHeight: 1.6,
  },
  error: {
    color: '#9f1239',
    fontWeight: 800,
  },
}
