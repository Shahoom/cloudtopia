'use client'

import { useState } from 'react'
import { Check, Copy, Linkedin, MessageCircle } from 'lucide-react'

export function ShareButtons({ url, title, locale = 'en' }: { url: string; title: string; locale?: string }) {
  const ar = locale === 'ar'
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const iconClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ed-rule)] bg-transparent text-[color:var(--ed-graphite)] transition-colors hover:border-[color:var(--ed-accent)] hover:text-[color:var(--ed-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ed-accent)]'

  return (
    <div className="flex flex-wrap items-center gap-2.5" aria-label={ar ? 'شارك المقال' : 'Share article'}>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label={ar ? 'مشاركة على LinkedIn' : 'Share on LinkedIn'}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label={ar ? 'مشاركة على X' : 'Share on X'}
      >
        <span style={{ fontFamily: 'var(--ed-serif)', fontSize: '0.95rem', color: 'inherit' }}>X</span>
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label={ar ? 'مشاركة على واتساب' : 'Share on WhatsApp'}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={iconClass}
        aria-label={ar ? 'نسخ رابط المقال' : 'Copy article link'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}
