'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DragEvent } from 'react'
import type { ArticleIndex, ArticleRow, Status, ViewKey } from './types.ts'
import { STATUS_DOT, STATUS_LABELS, STATUS_ORDER } from './types.ts'
import { cx, fmtNumber, pairFor } from './format.ts'
import { LocalePills, SeoRing } from './ui.tsx'

type Props = {
  rows: ArticleRow[]
  view: ViewKey
  index: ArticleIndex | null
  peekId: string | null
  totalDocs: number
  onPeek: (id: string) => void
  /** Resolves true when the status change was saved. */
  onMove: (id: string, status: Status) => Promise<boolean>
}

// Kanban by editorial status. Drag a card to another column to PATCH its
// status (same REST call as before). Read-only in the Trash view.
export function ArticleBoardView({ rows, view, index, peekId, totalDocs, onPeek, onMove }: Props) {
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<Status | null>(null)
  // Optimistic column placement until the refreshed rows arrive.
  const [pending, setPending] = useState<Record<string, Status>>({})
  const readOnly = view === 'trash'

  useEffect(() => {
    setPending({})
  }, [rows])

  const columns = useMemo(() => {
    const map = new Map<Status, ArticleRow[]>(STATUS_ORDER.map((s) => [s, []]))
    for (const r of rows) map.get(pending[r.id] ?? r.status)?.push(r)
    return map
  }, [rows, pending])

  async function drop(e: DragEvent<HTMLElement>, target: Status) {
    e.preventDefault()
    setOverCol(null)
    const id = dragId ?? e.dataTransfer.getData('text/plain')
    setDragId(null)
    const row = rows.find((r) => r.id === id)
    if (!row || readOnly || (pending[id] ?? row.status) === target) return
    setPending((p) => ({ ...p, [id]: target }))
    const ok = await onMove(id, target)
    if (!ok) {
      setPending((p) => {
        const next = { ...p }
        delete next[id]
        return next
      })
    }
  }

  return (
    <div className="ct-articles-boardwrap">
      {totalDocs > rows.length && (
        <div className="ct-articles-board-note">
          Showing the first {fmtNumber(rows.length)} of {fmtNumber(totalDocs)} articles. Narrow it down with filters.
        </div>
      )}
      <div className="ct-articles-board">
        {STATUS_ORDER.map((col) => {
          const items = columns.get(col) ?? []
          return (
            <section
              key={col}
              className={cx('ct-articles-col', overCol === col && 'is-over')}
              aria-label={`${STATUS_LABELS[col]}: ${items.length}`}
              onDragOver={(e) => {
                if (readOnly || !dragId) return
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                if (overCol !== col) setOverCol(col)
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverCol((c) => (c === col ? null : c))
              }}
              onDrop={(e) => drop(e, col)}
            >
              <header className="ct-articles-col-h">
                <span className="ct-articles-dot" style={{ background: STATUS_DOT[col] }} aria-hidden />
                {STATUS_LABELS[col]}
                <span className="ct-articles-col-c">{fmtNumber(items.length)}</span>
              </header>
              <div className="ct-articles-col-b">
                {items.map((row) => (
                  <article
                    key={row.id}
                    className={cx('ct-articles-kcard', dragId === row.id && 'is-drag', peekId === row.id && 'is-peek', readOnly && 'is-static')}
                    draggable={!readOnly}
                    tabIndex={0}
                    aria-label={row.title || 'Untitled draft'}
                    onDragStart={(e) => {
                      setDragId(row.id)
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', row.id)
                    }}
                    onDragEnd={() => {
                      setDragId(null)
                      setOverCol(null)
                    }}
                    onClick={() => onPeek(row.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onPeek(row.id)
                      }
                    }}
                  >
                    <div className={cx('ct-articles-kcard-t', !row.title && 'is-untitled')} dir="auto">
                      {row.title || 'Untitled draft'}
                    </div>
                    <div className="ct-articles-kcard-m">
                      <LocalePills pair={pairFor(index, row)} />
                      <span className="ct-articles-sp" />
                      <SeoRing value={row.seoScore} size={24} />
                    </div>
                  </article>
                ))}
                {items.length === 0 && <div className="ct-articles-col-empty">{readOnly ? 'Nothing here' : 'Drop articles here'}</div>}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
