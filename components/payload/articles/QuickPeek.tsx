'use client'

import { useId } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArchiveRestore, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Eye, Languages, PenSquare, Trash2, X } from 'lucide-react'
import type { ArticleRow, Author, Locale, PairInfo, PairSide } from './types.ts'
import { cx, fmtFull, fmtNumber, localeName, otherLocale, relativeTime } from './format.ts'
import { editorUrl, liveUrl } from './api.ts'
import { Avatar, btn, CategoryPill, Kbd, SeoRing, Spinner, StatusPill, Thumb } from './ui.tsx'

function SyncBadge({ row, pair }: { row: ArticleRow; pair: PairInfo }) {
  const other = otherLocale(row.locale)
  const side = pair[other]
  if (side.kind === 'unknown' || side.kind === 'self') return null
  if (side.kind === 'missing' || side.kind === 'trashed') {
    return (
      <span className="ct-articles-sync is-bad">
        <AlertTriangle size={12} aria-hidden />
        {other.toUpperCase()} {side.kind === 'missing' ? 'missing' : 'in trash'}
      </span>
    )
  }
  const liveCount = Number(row.status === 'published') + Number(side.doc.status === 'published')
  if (liveCount === 2) {
    return (
      <span className="ct-articles-sync is-ok">
        <CheckCircle2 size={12} aria-hidden />
        Both live
      </span>
    )
  }
  return <span className="ct-articles-sync">{liveCount === 1 ? 'One language live' : 'Not live yet'}</span>
}

function PairRow({
  locale,
  side,
  row,
  inTrash,
  creating,
  onCreate,
}: {
  locale: Locale
  side: PairSide
  row: ArticleRow
  inTrash: boolean
  creating: boolean
  onCreate: (row: ArticleRow) => void
}) {
  const code = locale.toUpperCase()
  const name = localeName(locale)

  if (side.kind === 'self' || side.kind === 'sibling') {
    const doc = side.kind === 'self' ? { id: row.id, title: row.title, status: row.status } : side.doc
    const current = side.kind === 'self'
    return (
      <Link
        prefetch={false}
        href={editorUrl(doc.id, current && inTrash)}
        className={cx('ct-articles-locrow', current && 'is-current')}
        aria-current={current ? 'true' : undefined}
        title={`Open the ${name} version in the editor`}
      >
        <span className="ct-articles-loc is-self">{code}</span>
        <span className={cx('ct-articles-locrow-t', !doc.title && 'is-untitled')} dir="auto">
          {doc.title || 'Untitled draft'}
        </span>
        <StatusPill status={doc.status} small label={doc.status === 'published' ? 'Live' : undefined} />
      </Link>
    )
  }

  if (side.kind === 'trashed') {
    return (
      <Link prefetch={false} href={editorUrl(side.doc.id, true)} className="ct-articles-locrow is-missing">
        <span className="ct-articles-loc">{code}</span>
        <span className="ct-articles-locrow-t">{name} version is in trash</span>
        <Trash2 size={13} aria-hidden />
      </Link>
    )
  }

  if (side.kind === 'missing') {
    return (
      <div className="ct-articles-locrow is-missing">
        <span className="ct-articles-loc">{code}</span>
        <span className="ct-articles-locrow-t">No {name} version yet</span>
        {!inTrash && (
          <button type="button" className={btn('xs')} onClick={() => onCreate(row)} disabled={creating}>
            {creating ? <Spinner size={12} /> : <Languages size={12} aria-hidden />}
            Create draft
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="ct-articles-locrow" aria-hidden>
      <span className="ct-articles-skel is-line" />
    </div>
  )
}

export function QuickPeek({
  row,
  pair,
  author,
  inTrash,
  hasPrev,
  hasNext,
  creatingSibling,
  onPrev,
  onNext,
  onClose,
  onCreateSibling,
  onRestore,
}: {
  row: ArticleRow
  pair: PairInfo
  author: Author | undefined
  inTrash: boolean
  hasPrev: boolean
  hasNext: boolean
  creatingSibling: boolean
  onPrev: () => void
  onNext: () => void
  onClose: () => void
  onCreateSibling: (row: ArticleRow) => void
  onRestore: (ids: string[]) => void
}) {
  const titleId = useId()
  const live = !inTrash && row.status === 'published' && Boolean(row.slug)
  const cover = row.cover.large ?? row.cover.thumb

  return (
    <aside className="ct-articles-peek" aria-labelledby={titleId}>
      <div className="ct-articles-peek-h">
        <span className="ct-articles-peek-label">Quick peek</span>
        <span className="ct-articles-peek-keys" aria-hidden>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
        </span>
        <span className="ct-articles-sp" />
        <button type="button" className="ct-articles-ibtn" aria-label="Previous article" title="Previous article (↑)" onClick={onPrev} disabled={!hasPrev}>
          <ChevronUp size={15} aria-hidden />
        </button>
        <button type="button" className="ct-articles-ibtn" aria-label="Next article" title="Next article (↓)" onClick={onNext} disabled={!hasNext}>
          <ChevronDown size={15} aria-hidden />
        </button>
        {live && (
          <a className="ct-articles-ibtn" href={liveUrl(row)} target="_blank" rel="noreferrer" aria-label="Open live page" title="Open live page">
            <ExternalLink size={15} aria-hidden />
          </a>
        )}
        <button type="button" className="ct-articles-ibtn" aria-label="Close quick peek" title="Close (Esc)" onClick={onClose}>
          <X size={15} aria-hidden />
        </button>
      </div>

      <div className="ct-articles-peek-b">
        <div className="ct-articles-peek-cover">
          <Thumb src={cover} alt={row.cover.alt} className="is-cover" />
          {cover && row.cover.filename && (
            <span className="ct-articles-peek-cap" title={row.cover.filename}>
              {row.cover.filename}
            </span>
          )}
        </div>

        <h2 id={titleId} className={cx('ct-articles-peek-title', !row.title && 'is-untitled')} dir="auto">
          {row.title || 'Untitled draft'}
        </h2>
        <div className="ct-articles-peek-meta">
          <StatusPill status={row.status} scheduledAt={row.scheduledAt} />
          <CategoryPill category={row.category} />
          <span className="ct-articles-peek-stat">
            {row.readingTime} min · {fmtNumber(row.wordCount)} words
          </span>
        </div>
        {row.excerpt ? (
          <div className="ct-articles-peek-excerpt" dir="auto">
            {row.excerpt}
          </div>
        ) : (
          <div className="ct-articles-peek-excerpt is-empty">No excerpt yet.</div>
        )}

        <div className="ct-articles-kv3">
          <div>
            <div className="ct-articles-kv-k">SEO score</div>
            <div className="ct-articles-kv-v">
              <SeoRing value={row.seoScore} size={20} showValue={false} />
              {row.seoScore}
            </div>
          </div>
          <div>
            <div className="ct-articles-kv-k">Content score</div>
            <div className="ct-articles-kv-v">{row.contentScore}</div>
          </div>
          <div>
            <div className="ct-articles-kv-k">Views</div>
            <div className="ct-articles-kv-v">{fmtNumber(row.viewsCount)}</div>
          </div>
        </div>

        <div className="ct-articles-sec">
          Language pair
          <SyncBadge row={row} pair={pair} />
        </div>
        {(['en', 'ar'] as Locale[]).map((l) => (
          <PairRow key={l} locale={l} side={pair[l]} row={row} inTrash={inTrash} creating={creatingSibling} onCreate={onCreateSibling} />
        ))}

        <div className="ct-articles-sec">Details</div>
        <dl className="ct-articles-dl">
          <dt>Author</dt>
          <dd>
            {row.author ? (
              <span className="ct-articles-dl-author">
                <Avatar id={row.author.id} name={row.author.name || author?.name || 'Author'} src={author?.avatar} size={18} />
                <span className="ct-articles-trunc">{row.author.name || author?.name}</span>
              </span>
            ) : (
              '—'
            )}
          </dd>
          <dt>Tags</dt>
          <dd className="is-wrap">
            {row.tags.length
              ? row.tags.map((t) => (
                  <span key={t} className="ct-articles-tag">
                    {t}
                  </span>
                ))
              : '—'}
          </dd>
          {row.status === 'scheduled' ? (
            <>
              <dt>Scheduled</dt>
              <dd>{row.scheduledAt ? fmtFull(row.scheduledAt) : 'No date set'}</dd>
            </>
          ) : row.publishedAt ? (
            <>
              <dt>Published</dt>
              <dd>{fmtFull(row.publishedAt)}</dd>
            </>
          ) : null}
          <dt>Last updated</dt>
          <dd title={fmtFull(row.updatedAt)}>{relativeTime(row.updatedAt)}</dd>
          {row.deletedAt && (
            <>
              <dt>Moved to trash</dt>
              <dd>{fmtFull(row.deletedAt)}</dd>
            </>
          )}
          <dt>Slug</dt>
          <dd className="ct-articles-mono">/{row.slug}</dd>
        </dl>
      </div>

      <div className="ct-articles-peek-f">
        {inTrash ? (
          <>
            <button type="button" className={btn('sm', 'primary', 'grow')} onClick={() => onRestore([row.id])}>
              <ArchiveRestore size={14} aria-hidden />
              Restore
            </button>
            <Link prefetch={false} className={btn('sm')} href={editorUrl(row.id, true)}>
              <Eye size={14} aria-hidden />
              View
            </Link>
          </>
        ) : (
          <>
            <Link prefetch={false} className={btn('sm', 'primary', 'grow')} href={editorUrl(row.id)}>
              <PenSquare size={14} aria-hidden />
              Open editor
            </Link>
            {live && (
              <a className={btn('sm')} href={liveUrl(row)} target="_blank" rel="noreferrer">
                <Eye size={14} aria-hidden />
                View live
              </a>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
