'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { ArticleRow, Status } from './types.ts'
import { STATUS_DOT, STATUS_LABELS, STATUS_ORDER } from './types.ts'
import { updateArticle } from './api.ts'

const CYAN = '#0ea5e9'

type Props = {
  rows: ArticleRow[]
  onRefresh: () => void
  onToast: (msg: string) => void
}

function seoTone(score: number): CSSProperties {
  if (score >= 80) return { background: 'rgba(22,163,74,0.14)', color: '#16a34a' }
  if (score >= 60) return { background: 'rgba(217,119,6,0.16)', color: '#d97706' }
  return { background: 'rgba(220,38,38,0.14)', color: '#dc2626' }
}

export function ArticleBoardView({ rows, onRefresh, onToast }: Props) {
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<Status | null>(null)

  async function drop(target: Status) {
    setOverCol(null)
    const id = dragId
    setDragId(null)
    if (!id) return
    const row = rows.find((r) => r.id === id)
    if (!row || row.status === target) return
    try {
      await updateArticle(id, { status: target })
      onToast(`Moved to ${STATUS_LABELS[target]}`)
      onRefresh()
    } catch (e: any) {
      onToast(e?.message || 'Could not move article')
    }
  }

  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
      {STATUS_ORDER.map((col) => {
        const items = rows.filter((r) => r.status === col)
        return (
          <div
            key={col}
            onDragOver={(e) => { e.preventDefault(); setOverCol(col) }}
            onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
            onDrop={() => drop(col)}
            style={{
              flex: '0 0 232px',
              background: overCol === col ? 'rgba(14,165,233,0.06)' : 'var(--theme-elevation-50)',
              border: `1px solid ${overCol === col ? CYAN : 'var(--theme-elevation-100)'}`,
              borderRadius: 12,
              padding: 10,
              minHeight: 120,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '0 2px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_DOT[col] }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{STATUS_LABELS[col]}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--theme-elevation-450)' }}>{items.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((row) => (
                <div
                  key={row.id}
                  draggable
                  onDragStart={(e) => { setDragId(row.id); e.dataTransfer.effectAllowed = 'move' }}
                  onDragEnd={() => setDragId(null)}
                  style={{
                    background: 'var(--theme-elevation-0)',
                    border: '1px solid var(--theme-elevation-150)',
                    borderRadius: 9,
                    padding: '9px 10px',
                    cursor: 'grab',
                    opacity: dragId === row.id ? 0.5 : 1,
                  }}
                >
                  <a href={`/admin/collections/blog-posts/${row.id}`} style={{ fontSize: 13, color: 'var(--theme-text)', textDecoration: 'none', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>
                    {row.title}
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 5, border: '1px solid var(--theme-elevation-200)', color: 'var(--theme-elevation-600)' }}>{row.locale.toUpperCase()}</span>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 5, ...seoTone(row.seoScore) }}>SEO {row.seoScore}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p style={{ fontSize: 12, color: 'var(--theme-elevation-400)', margin: '4px 2px' }}>—</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
