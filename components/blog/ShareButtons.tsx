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

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={ar ? 'شارك المقال' : 'Share article'}>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:border-primary-300 hover:text-primary-700"
        aria-label={ar ? 'مشاركة على LinkedIn' : 'Share on LinkedIn'}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-black text-neutral-600 transition hover:border-primary-300 hover:text-primary-700"
        aria-label={ar ? 'مشاركة على X' : 'Share on X'}
      >
        X
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:border-primary-300 hover:text-primary-700"
        aria-label={ar ? 'مشاركة على واتساب' : 'Share on WhatsApp'}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:border-primary-300 hover:text-primary-700"
        aria-label={ar ? 'نسخ رابط المقال' : 'Copy article link'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}
