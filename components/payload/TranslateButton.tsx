'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { Check, Languages, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import './admin/editor-widgets.css'

type TranslateStatus = 'idle' | 'loading' | 'success' | 'error'

export function TranslateButton() {
  const { id: rawId, collectionSlug } = useDocumentInfo()
  const id = rawId ? decodeURIComponent(String(rawId)) : undefined
  const [status, setStatus] = useState<TranslateStatus>('idle')
  const [message, setMessage] = useState('')

  const handleTranslate = useCallback(async () => {
    if (!id || !collectionSlug) return

    setStatus('loading')
    setMessage('')

    try {
      const params = new URLSearchParams({ collection: collectionSlug, id: String(id) })
      const res = await fetch(`/api/translate?${params}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ collection: collectionSlug, id: String(id) }),
      })

      const contentType = res.headers.get('content-type') || ''
      let data: any = {}
      if (contentType.includes('application/json')) {
        data = await res.json()
      } else {
        const text = await res.text()
        data = { error: text || `HTTP Error ${res.status}` }
      }

      if (res.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Translated successfully!')
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Translation failed.')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Translation request failed.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }, [id, collectionSlug])

  if (!id) return null

  return (
    <div style={{ padding: '0 0 8px' }}>
      <button
        type="button"
        className="ct-btn ct-btn--secondary ct-btn--block"
        onClick={handleTranslate}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <Loader2 size={15} className="ct-spin" aria-hidden />
        ) : status === 'success' ? (
          <Check size={15} aria-hidden />
        ) : (
          <Languages size={15} aria-hidden />
        )}
        {status === 'loading' ? 'Translating…' : status === 'success' ? 'Done' : 'Translate to Arabic'}
      </button>
      {message && (
        <p className="ct-lang__hint" style={{ textAlign: 'center', color: status === 'error' ? '#e11d48' : '#047857' }}>
          {message}
        </p>
      )}
    </div>
  )
}
