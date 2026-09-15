'use client'

import { Bot } from 'lucide-react'
import { useState } from 'react'
import './admin/editor-widgets.css'

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
    <section className="ct-widget">
      <div className="ct-widget__head">
        <span className="ct-widget__icon" aria-hidden>
          <Bot size={16} />
        </span>
        <div className="ct-widget__heading">
          <p className="ct-widget__kicker">AI assistant</p>
          <h3 className="ct-widget__title">Editorial suggestions</h3>
          <p className="ct-widget__copy">
            Outputs are logged and never published automatically — review them before inserting into the article.
          </p>
        </div>
      </div>
      <div className="ct-widget__body">
        <div className="ct-widget__grid">
          <label className="ct-widget__field">
            Tool
            <select value={action} onChange={(event) => setAction(event.target.value as any)} className="ct-widget__select">
              {actions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="ct-widget__field">
            Topic or keyword
            <input value={topic} onChange={(event) => setTopic(event.target.value)} className="ct-widget__input" dir="auto" />
          </label>
          <label className="ct-widget__field">
            Target audience
            <input value={targetAudience} onChange={(event) => setTargetAudience(event.target.value)} className="ct-widget__input" />
          </label>
          <label className="ct-widget__field">
            Service focus
            <input value={serviceFocus} onChange={(event) => setServiceFocus(event.target.value)} className="ct-widget__input" />
          </label>
          <label className="ct-widget__field">
            Tone
            <input value={tone} onChange={(event) => setTone(event.target.value)} className="ct-widget__input" />
          </label>
        </div>
        <label className="ct-widget__field">
          Selected section / extra context
          <textarea value={section} onChange={(event) => setSection(event.target.value)} rows={5} className="ct-widget__textarea" dir="auto" />
        </label>
        <div className="ct-widget__row">
          <button type="button" className="ct-btn ct-btn--primary" onClick={submit} disabled={loading}>
            {loading ? 'Generating…' : 'Generate suggestion'}
          </button>
        </div>
        {error && <p className="ct-widget__error">{error}</p>}
        {output && (
          <pre className="ct-widget__output" dir="auto">
            {output}
          </pre>
        )}
      </div>
    </section>
  )
}
