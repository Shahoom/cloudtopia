'use client'

import { memo, useCallback, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import Link from 'next/link'
import { ArchiveRestore, ChevronDown, ChevronUp, Clock, ExternalLink, Eye, Languages, MoreHorizontal, PenSquare, Trash2 } from 'lucide-react'
import type { ArticleIndex, ArticleRow, Author, Density, PairInfo, SortField, ViewKey } from './types.ts'
import { cx, fmtDate, fmtDay, fmtFull, fmtTime, localeName, otherLocale, pairFor, parseDate, relativeTime, shortAgo } from './format.ts'
import { dateFieldFor, editorUrl, liveUrl, parseSort } from './api.ts'
import { MenuItem, MenuSep, Popover } from './Popover.tsx'
import { Avatar, CategoryPill, Checkbox, LocalePills, SeoRing, StatusPill, Thumb } from './ui.tsx'
import type { CheckState } from './ui.tsx'

export type RowActions = {
  onPeek: (id: string) => void
  onTrash: (ids: string[]) => void
  onRestore: (ids: string[]) => void
  onDestroy: (ids: string[]) => void
  onCreateSibling: (row: ArticleRow) => void
}

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)

function SortTh({ field, label, sort, onSort, descFirst }: { field: SortField; label: string; sort: string; onSort: (s: string) => void; descFirst?: boolean }) {
  const parsed = parseSort(sort)
  const active = parsed?.field === field
  const desc = active ? Boolean(parsed?.desc) : false
  const next = active ? (desc ? field : `-${field}`) : descFirst ? `-${field}` : field
  return (
    <th scope="col" className={cx(active && 'is-sorted')} aria-sort={active ? (desc ? 'descending' : 'ascending') : 'none'}>
      <button type="button" className="ct-articles-sort" onClick={() => onSort(next)}>
        {label}
        {active ? (
          desc ? <ChevronDown size={12} aria-hidden /> : <ChevronUp size={12} aria-hidden />
        ) : (
          <ChevronDown size={12} className="ct-articles-sort-ghost" aria-hidden />
        )}
      </button>
    </th>
  )
}

function DateCell({ row, view }: { row: ArticleRow; view: ViewKey }) {
  if (view === 'trash' && row.deletedAt) {
    return (
      <>
        <div className="ct-articles-d-main" title={`Deleted ${fmtFull(row.deletedAt)}`}>{capitalize(relativeTime(row.deletedAt))}</div>
        <div className="ct-articles-d-sub">deleted {fmtDay(row.deletedAt)}</div>
      </>
    )
  }
  if (row.status === 'scheduled' && row.scheduledAt) {
    return (
      <>
        <div className="ct-articles-d-main is-sch" title={`Scheduled for ${fmtFull(row.scheduledAt)}`}>
          <Clock size={12} aria-hidden />
          {fmtDay(row.scheduledAt)} · {fmtTime(row.scheduledAt)}
        </div>
        <div className="ct-articles-d-sub">{relativeTime(row.scheduledAt)}</div>
      </>
    )
  }
  if (row.status === 'published' && row.publishedAt) {
    const pub = parseDate(row.publishedAt)
    const upd = parseDate(row.updatedAt)
    const edited = pub && upd && upd.getTime() - pub.getTime() > 5 * 60 * 1000
    return (
      <>
        <div className="ct-articles-d-main" title={`Published ${fmtFull(row.publishedAt)}`}>{fmtDate(row.publishedAt)}</div>
        <div className="ct-articles-d-sub">{edited ? `edited ${shortAgo(row.updatedAt)}` : fmtTime(row.publishedAt)}</div>
      </>
    )
  }
  return (
    <>
      <div className="ct-articles-d-main" title={`Updated ${fmtFull(row.updatedAt)}`}>{capitalize(relativeTime(row.updatedAt))}</div>
      <div className="ct-articles-d-sub">
        {fmtDay(row.updatedAt)} · {fmtTime(row.updatedAt)}
      </div>
    </>
  )
}

function RowMenu({ row, pair, trashed, actions }: { row: ArticleRow; pair: PairInfo; trashed: boolean; actions: RowActions }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const close = useCallback(() => {
    setOpen(false)
    setConfirming(false)
  }, [])
  const other = otherLocale(row.locale)
  const live = !trashed && row.status === 'published' && Boolean(row.slug)
  const name = row.title || 'untitled article'

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={cx('ct-articles-ibtn', 'ct-articles-rowact', open && 'is-open')}
        aria-label={`Actions for ${name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <MoreHorizontal size={15} aria-hidden />
      </button>
      <Popover open={open} anchorRef={ref} onClose={close} align="end" width={232} label={`Actions for ${name}`}>
        {trashed ? (
          <>
            <MenuItem icon={<Eye size={14} />} onSelect={() => { close(); actions.onPeek(row.id) }}>Quick peek</MenuItem>
            <MenuItem icon={<ArchiveRestore size={14} />} onSelect={() => { close(); actions.onRestore([row.id]) }}>Restore</MenuItem>
            <MenuSep />
            {confirming ? (
              <MenuItem danger icon={<Trash2 size={14} />} onSelect={() => { close(); actions.onDestroy([row.id]) }}>Click to delete forever</MenuItem>
            ) : (
              <MenuItem danger icon={<Trash2 size={14} />} onSelect={() => setConfirming(true)}>Delete permanently…</MenuItem>
            )}
          </>
        ) : (
          <>
            <MenuItem icon={<PenSquare size={14} />} href={editorUrl(row.id)} onSelect={close}>Open editor</MenuItem>
            <MenuItem icon={<Eye size={14} />} onSelect={() => { close(); actions.onPeek(row.id) }}>Quick peek</MenuItem>
            {live && <MenuItem icon={<ExternalLink size={14} />} href={liveUrl(row)} newTab onSelect={close}>View live page</MenuItem>}
            {pair[other].kind === 'missing' && (
              <MenuItem icon={<Languages size={14} />} onSelect={() => { close(); actions.onCreateSibling(row) }}>Create {localeName(other)} draft</MenuItem>
            )}
            <MenuSep />
            {confirming ? (
              <MenuItem danger icon={<Trash2 size={14} />} onSelect={() => { close(); actions.onTrash([row.id]) }}>Click to confirm</MenuItem>
            ) : (
              <MenuItem danger icon={<Trash2 size={14} />} onSelect={() => setConfirming(true)}>Move to trash…</MenuItem>
            )}
          </>
        )}
      </Popover>
    </>
  )
}

type RowProps = {
  row: ArticleRow
  rowIndex: number
  view: ViewKey
  pair: PairInfo
  author: Author | undefined
  selected: boolean
  peeked: boolean
  onToggleRow: (id: string, rowIndex: number, shift: boolean) => void
  actions: RowActions
}

const Row = memo(function Row({ row, rowIndex, view, pair, author, selected, peeked, onToggleRow, actions }: RowProps) {
  const trashed = view === 'trash'
  const title = row.title.trim()

  function onClick(e: ReactMouseEvent<HTMLTableRowElement>) {
    if ((e.target as HTMLElement).closest('a, button, input')) return
    actions.onPeek(row.id)
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLTableRowElement>) {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      actions.onPeek(row.id)
    } else if (e.key === 'x') {
      e.preventDefault()
      onToggleRow(row.id, rowIndex, e.shiftKey)
    }
  }

  return (
    <tr
      data-ct-row={row.id}
      className={cx('ct-articles-row', selected && 'is-sel', peeked && 'is-peek')}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <td className="ct-articles-c-cb">
        <Checkbox state={selected ? 'on' : 'off'} label={`Select ${title || 'untitled article'}`} onToggle={(e) => onToggleRow(row.id, rowIndex, e.shiftKey)} />
      </td>
      <td className="ct-articles-c-cover">
        <Thumb src={row.cover.thumb} />
      </td>
      <td className="ct-articles-c-title">
        <div className="ct-articles-tline">
          <Link
            prefetch={false}
            href={editorUrl(row.id, trashed)}
            className={cx('ct-articles-ttl', !title && 'is-untitled')}
            dir="auto"
            title={title || undefined}
          >
            {title || 'Untitled draft'}
          </Link>
          <LocalePills pair={pair} />
        </div>
        <div className="ct-articles-tmeta">
          /{row.slug || '—'}
          {row.readingTime > 0 ? ` · ${row.readingTime} min read` : ''}
        </div>
      </td>
      <td>
        <SeoRing value={row.seoScore} />
      </td>
      <td>
        <StatusPill status={row.status} scheduledAt={row.scheduledAt} />
      </td>
      <td>
        <CategoryPill category={row.category} />
      </td>
      <td>
        {row.author ? (
          <Avatar id={row.author.id} name={row.author.name || author?.name || 'Author'} src={author?.avatar} />
        ) : (
          <span className="ct-articles-none">—</span>
        )}
      </td>
      <td>
        <DateCell row={row} view={view} />
      </td>
      <td className="ct-articles-c-act">
        <RowMenu row={row} pair={pair} trashed={trashed} actions={actions} />
      </td>
    </tr>
  )
})

function SkeletonRows({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <tr key={i} className="ct-articles-row is-skel" aria-hidden>
          <td className="ct-articles-c-cb"><span className="ct-articles-skel is-cb" /></td>
          <td className="ct-articles-c-cover"><span className="ct-articles-skel is-th" /></td>
          <td>
            <span className="ct-articles-skel is-line" style={{ width: `${48 + ((i * 37) % 38)}%` }} />
            <span className="ct-articles-skel is-meta" />
          </td>
          <td><span className="ct-articles-skel is-ring" /></td>
          <td><span className="ct-articles-skel is-pill" /></td>
          <td><span className="ct-articles-skel is-pill is-wide" /></td>
          <td><span className="ct-articles-skel is-av" /></td>
          <td><span className="ct-articles-skel is-line is-short" /></td>
          <td />
        </tr>
      ))}
    </>
  )
}

type Props = {
  rows: ArticleRow[]
  skeleton: boolean
  density: Density
  view: ViewKey
  index: ArticleIndex | null
  authorsById: Map<string, Author>
  selected: Set<string>
  peekId: string | null
  sort: string
  onSort: (sort: string) => void
  headState: CheckState
  onToggleHead: () => void
  onToggleRow: (id: string, rowIndex: number, shift: boolean) => void
  actions: RowActions
}

export function ArticleListView({
  rows,
  skeleton,
  density,
  view,
  index,
  authorsById,
  selected,
  peekId,
  sort,
  onSort,
  headState,
  onToggleHead,
  onToggleRow,
  actions,
}: Props) {
  const pairs = useMemo(() => new Map(rows.map((r) => [r.id, pairFor(index, r)])), [rows, index])
  const dateLabel = view === 'trash' ? 'Deleted' : view === 'scheduled' ? 'Scheduled' : view === 'published' ? 'Published' : 'Date'

  return (
    <table className={cx('ct-articles-tbl', density === 'compact' && 'is-compact')}>
      <colgroup>
        <col style={{ width: 40 }} />
        <col style={{ width: 68 }} />
        <col />
        <col style={{ width: 64 }} />
        <col style={{ width: 118 }} />
        <col style={{ width: 144 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 132 }} />
        <col style={{ width: 44 }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" className="ct-articles-c-cb">
            <Checkbox state={headState} onToggle={onToggleHead} label="Select all articles on this page" />
          </th>
          <th scope="col">Cover</th>
          <SortTh field="title" label="Title" sort={sort} onSort={onSort} />
          <SortTh field="seoScore" label="SEO" sort={sort} onSort={onSort} descFirst />
          <SortTh field="status" label="Status" sort={sort} onSort={onSort} />
          <th scope="col">Category</th>
          <th scope="col">Author</th>
          <SortTh field={dateFieldFor(view)} label={dateLabel} sort={sort} onSort={onSort} descFirst={view !== 'scheduled'} />
          <th scope="col">
            <span className="ct-articles-sr">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {skeleton ? (
          <SkeletonRows count={8} />
        ) : (
          rows.map((row, i) => (
            <Row
              key={row.id}
              row={row}
              rowIndex={i}
              view={view}
              pair={pairs.get(row.id) ?? pairFor(index, row)}
              author={row.author ? authorsById.get(row.author.id) : undefined}
              selected={selected.has(row.id)}
              peeked={peekId === row.id}
              onToggleRow={onToggleRow}
              actions={actions}
            />
          ))
        )}
      </tbody>
    </table>
  )
}
