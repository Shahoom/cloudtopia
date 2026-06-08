'use client'

import React, { useState } from 'react'
import { useForm } from '@payloadcms/ui'

export function AIPostGenerator() {
  const { dispatchFields } = useForm()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate() {
    if (!text.trim()) {
      setError('Please paste some text first.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/blog-ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate post.')

      const { result } = data

      // Auto-fill Payload form fields
      const updateField = (path: string, value: any) => {
        if (value) {
          dispatchFields({ type: 'UPDATE', path, value })
        }
      }

      updateField('title', result.title)
      updateField('slug', result.slug)
      updateField('excerpt', result.excerpt)
      updateField('content', result.content)
      updateField('seo.metaTitle', result.metaTitle)
      updateField('seo.metaDescription', result.metaDescription)
      updateField('seo.focusKeyword', result.focusKeyword)
      // Note: Category relies on IDs, so we just set text-based fields for now.

      setText('') // clear after success
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-post-generator-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .ai-post-generator-wrapper {
          margin-bottom: 3rem;
          padding: 24px;
          background: #0f172a;
          border-radius: 12px;
          border: 1px solid #1e293b;
          color: #f8fafc;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .ai-post-generator-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        }
        .ai-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ai-header-icon {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 16px;
        }
        .ai-title {
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .ai-description {
          font-size: 0.875rem;
          color: #94a3b8;
          margin: 0 0 20px 0;
        }
        .ai-textarea {
          width: 100%;
          min-height: 120px;
          background: #020617;
          border: 1px solid #1e293b;
          border-radius: 8px;
          padding: 16px;
          color: #e2e8f0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          resize: vertical;
          margin-bottom: 16px;
          transition: border-color 0.2s ease;
        }
        .ai-textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .ai-textarea::placeholder {
          color: #475569;
        }
        .ai-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ai-btn {
          background: #fff;
          color: #0f172a;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, background-color 0.15s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ai-btn:hover:not(:disabled) {
          background: #f1f5f9;
          transform: translateY(-1px);
        }
        .ai-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .ai-spinner {
          animation: spin 1s linear infinite;
          font-size: 14px;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .ai-error {
          color: #f87171;
          font-size: 0.875rem;
          margin: 0;
        }
      `}} />
      <div className="ai-header">
        <div className="ai-header-icon">✨</div>
        <h3 className="ai-title">AI Auto-Generator</h3>
      </div>
      <p className="ai-description">Paste raw text, notes, or an outline below. The AI will instantly analyze it, structure the content, and auto-fill all required post fields.</p>
      
      <textarea
        className="ai-textarea"
        placeholder="Paste your raw text here..."
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={loading}
      />
      
      <div className="ai-actions">
        <button 
          className="ai-btn" 
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <><span className="ai-spinner">⏳</span> Processing...</>
          ) : (
            'Generate Full Post'
          )}
        </button>
        {error && <p className="ai-error">{error}</p>}
      </div>
    </div>
  )
}
