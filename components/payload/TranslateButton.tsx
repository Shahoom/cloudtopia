'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useCallback, useState } from 'react'

type TranslateStatus = 'idle' | 'loading' | 'success' | 'error'

export function TranslateButton() {
  const { id: rawId, collectionSlug } = useDocumentInfo()
  const id = rawId ? decodeURIComponent(String(rawId)) : undefined
  const [status, setStatus] = useState<TranslateStatus>('idle')
  const [message, setMessage] = useState('')

  const handleTranslate = useCallback(async () => {
    if (!id || !collectionSlug) {
      console.warn('[translate-btn] Missing id or collectionSlug', { id, collectionSlug })
      return
    }
    
    setStatus('loading')
    setMessage('')

    console.log('[translate-btn] Clicked, sending translation request for:', {
      collection: collectionSlug,
      id: String(id),
    })

    try {
      const params = new URLSearchParams({ collection: collectionSlug, id: String(id) })
      const requestUrl = `/api/translate?${params}`
      
      console.log('[translate-btn] Fetching:', requestUrl)
      
      const res = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ collection: collectionSlug, id: String(id) }),
      })

      console.log('[translate-btn] Received response status:', res.status)
      
      const contentType = res.headers.get('content-type') || ''
      let data: any = {}
      
      if (contentType.includes('application/json')) {
        data = await res.json()
        console.log('[translate-btn] Response JSON body:', data)
      } else {
        const text = await res.text()
        console.log('[translate-btn] Response text body (non-JSON):', text)
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
      console.error('[translate-btn] Request threw exception:', err)
      setStatus('error')
      setMessage(err?.message || 'Translation request failed.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }, [id, collectionSlug])

  if (!id) return null

  return (
    <div style={wrapperStyle}>
      <style>{buttonCSS}</style>
      <button
        type="button"
        className="ct-translate-btn"
        onClick={handleTranslate}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        <span className="ct-translate-btn__icon" aria-hidden="true">
          {status === 'loading' ? spinnerSVG : status === 'success' ? checkSVG : translateSVG}
        </span>
        <span className="ct-translate-btn__label">
          {status === 'loading'
            ? 'Translating…'
            : status === 'success'
              ? 'Done!'
              : 'Translate to Arabic & Turkish'}
        </span>
      </button>
      {message && (
        <p
          className="ct-translate-btn__message"
          style={{ color: status === 'error' ? '#c0392b' : '#0f8a57' }}
        >
          {message}
        </p>
      )}
    </div>
  )
}

const wrapperStyle: React.CSSProperties = {
  padding: '0 0 8px',
}

const translateSVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
)

const spinnerSVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ct-translate-spinner">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const checkSVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const buttonCSS = `
  .ct-translate-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 22px;
    border: 1px solid #d8b86e;
    border-radius: 10px;
    background: linear-gradient(135deg, #fffdf8, #faf3e2);
    color: #3a3025;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    transition: all 180ms ease;
    box-shadow: 0 4px 18px rgba(216, 184, 110, 0.18);
    width: 100%;
    justify-content: center;
  }

  .ct-translate-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #faf3e2, #f5ebd3);
    border-color: #c5a34e;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(216, 184, 110, 0.28);
  }

  .ct-translate-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .ct-translate-btn:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .ct-translate-btn__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .ct-translate-btn__label {
    white-space: nowrap;
  }

  .ct-translate-btn__message {
    margin: 8px 0 0;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
  }

  @keyframes ct-spin {
    to { transform: rotate(360deg); }
  }

  .ct-translate-spinner {
    animation: ct-spin 0.8s linear infinite;
  }
`
