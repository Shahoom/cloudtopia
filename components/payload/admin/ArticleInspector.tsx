'use client'

import { useFormFields } from '@payloadcms/ui'
import { useMemo } from 'react'
import { ListTree } from 'lucide-react'
import './article-inspector.css'

type Heading = { level: 2 | 3; text: string; index: number }

function textOf(node: any): string {
  if (!node || typeof node !== 'object') return ''
  if (typeof node.text === 'string') return node.text
  return Array.isArray(node.children) ? node.children.map(textOf).join('') : ''
}

function outlineOf(content: any): Heading[] {
  const children: any[] = content?.root?.children || []
  const headings: Heading[] = []
  let index = 0
  for (const node of children) {
    if (node?.type !== 'heading' || (node.tag !== 'h2' && node.tag !== 'h3')) continue
    const text = textOf(node).trim()
    if (text) headings.push({ level: node.tag === 'h2' ? 2 : 3, text, index })
    index += 1
  }
  return headings
}

function scoreTone(score: number) {
  if (score >= 80) return 'good'
  if (score >= 50) return 'fair'
  return 'poor'
}

function ScoreRing({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value || 0)))
  const radius = 17
  const circumference = 2 * Math.PI * radius
  return (
    <div className={`ct-inspector__score is-${scoreTone(clamped)}`}>
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
        <circle cx="22" cy="22" r={radius} className="ct-inspector__ring-track" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="ct-inspector__ring-value"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
        />
      </svg>
      <span className="ct-inspector__score-value">{clamped}</span>
      <span className="ct-inspector__score-label">{label}</span>
    </div>
  )
}

// Sidebar "inspector" for articles: live scores and a clickable outline of the
// H2/H3 structure, read from the form state so it updates while typing.
export function ArticleInspector() {
  const { content, seoScore, contentScore, wordCount, readingTime } = useFormFields(([fields]) => ({
    content: fields?.content?.value,
    seoScore: fields?.seoScore?.value as number | undefined,
    contentScore: fields?.contentScore?.value as number | undefined,
    wordCount: fields?.wordCount?.value as number | undefined,
    readingTime: fields?.readingTime?.value as number | undefined,
  }))

  const outline = useMemo(() => outlineOf(content), [content])

  const jumpTo = (heading: Heading) => {
    const editor = document.querySelector('.rich-text-lexical [contenteditable="true"]')
    const nodes = editor?.querySelectorAll('h2, h3')
    const target = nodes?.[heading.index] as HTMLElement | undefined
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    target.classList.add('ct-inspector-flash')
    window.setTimeout(() => target.classList.remove('ct-inspector-flash'), 1200)
  }

  return (
    <div className="ct-inspector">
      <div className="ct-inspector__scores">
        <ScoreRing label="SEO" value={seoScore ?? 0} />
        <ScoreRing label="Content" value={contentScore ?? 0} />
        <div className="ct-inspector__stats">
          <span>
            <b>{(wordCount ?? 0).toLocaleString('en-US')}</b> words
          </span>
          <span>
            <b>{readingTime ?? 1}</b> min read
          </span>
        </div>
      </div>

      <div className="ct-inspector__section">
        <div className="ct-inspector__title">
          <ListTree size={14} aria-hidden />
          <span>Outline</span>
          <em>{outline.filter((h) => h.level === 2).length} sections</em>
        </div>
        {outline.length === 0 ? (
          <p className="ct-inspector__empty">Add H2 headings in the content to build the outline.</p>
        ) : (
          <ol className="ct-inspector__outline">
            {outline.map((heading) => (
              <li key={`${heading.index}-${heading.text}`}>
                <button type="button" className={`ct-inspector__heading is-h${heading.level}`} onClick={() => jumpTo(heading)} dir="auto">
                  {heading.text}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
