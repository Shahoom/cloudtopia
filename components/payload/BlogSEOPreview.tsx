'use client'

import type { CSSProperties } from 'react'

export function BlogSEOPreview() {
  return (
    <section style={styles.card} aria-label="SEO preview guidance">
      <p style={styles.kicker}>SEO preview</p>
      <h3 style={styles.title}>Search, social, and schema are generated from this tab.</h3>
      <p style={styles.copy}>
        Fill the meta title, meta description, focus keyword, image alt text, and schema toggles. The content score updates when you save.
      </p>
      <div style={styles.preview}>
        <span style={styles.url}>cloudtopia.net/insights/your-article-slug</span>
        <strong style={styles.previewTitle}>Your SEO title appears here</strong>
        <span style={styles.previewText}>Your meta description should clearly explain the value of the article in one useful sentence.</span>
      </div>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  card: {
    border: '1px solid rgba(2, 132, 199, 0.18)',
    background: 'linear-gradient(135deg, #ffffff, #f4f1f8)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
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
    lineHeight: 1.3,
  },
  copy: {
    margin: 0,
    color: '#475569',
    lineHeight: 1.6,
  },
  preview: {
    display: 'grid',
    gap: 5,
    marginTop: 16,
    borderRadius: 12,
    background: '#fff',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    padding: 14,
  },
  url: {
    color: '#0f766e',
    fontSize: 13,
    fontWeight: 700,
  },
  previewTitle: {
    color: '#1d4ed8',
    fontSize: 18,
  },
  previewText: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 1.45,
  },
}
