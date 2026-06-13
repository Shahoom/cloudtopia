'use client'

import { useEffect } from 'react'

/**
 * Fires a single view-count increment per browser session per article.
 * Renders nothing. The count is displayed from the cached data layer, so it
 * refreshes within ~60s; failures are swallowed (tracking must not affect UX).
 */
export function ArticleViewBeacon({ postId }: { postId: number | string }) {
  useEffect(() => {
    if (!postId) return
    const key = `ctv-${postId}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // sessionStorage can throw (private mode / disabled) — still count once.
    }
    fetch('/api/blog-view', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: postId }),
      keepalive: true,
    }).catch(() => {})
  }, [postId])

  return null
}
