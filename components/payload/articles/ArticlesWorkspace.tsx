'use client'

import { Suspense, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, CalendarClock, ChevronDown, ChevronLeft, ChevronRight, Download, Eye, FileText, Newspaper, Plus, SearchX, Trash2 } from 'lucide-react'
import './articles.css'
import type { ArticleIndex, ArticleRow, Author, Category, Density, Layout, Status, ViewKey, WorkspaceQuery } from './types.ts'
import { DEFAULT_PAGE_SIZE, PAGE_SIZES, STATUS_LABELS, VIEWS } from './types.ts'
import { cx, fmtNumber, localeName, missingTranslationIds, pairFor, plural, translatableIds } from './format.ts'
import {
  deleteArticlesForever,
  defaultSortFor,
  editorUrl,
  effectiveSort,
  errorText,
  EXPORT_URL,
  exportArticles,
  fetchAuthors,
  fetchCategories,
  fetchIndex,
  fetchMatchingIds,
  fetchRows,
  isAbortError,
  needsIndexForQuery,
  NEW_ARTICLE_URL,
  pairArticle,
  parseSort,
  restoreArticles,
  runBulkAction,
  trashArticles,
  updateArticleStatus,
} from './api.ts'
import type { MutationResult } from './api.ts'
import { ArticleListView } from './ArticleListView.tsx'
import type { RowActions } from './ArticleListView.tsx'
import { ArticleBoardView } from './ArticleBoardView.tsx'
import { QuickPeek } from './QuickPeek.tsx'
import { BulkBar } from './BulkBar.tsx'
import type { BulkBusy, ConfirmKind } from './BulkBar.tsx'
import { FilterBar, ViewTabs } from './Toolbar.tsx'
import { btn, EmptyState, ToastView } from './ui.tsx'
import type { CheckState, ToastData } from './ui.tsx'

// ---------------------------------------------------------------- URL state

type ParamsLike = { get(name: string): string | null }

const VIEW_KEYS = VIEWS.map((v) => v.key)
const splitIds = (v: string | null) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [])

function parseQuery(sp: ParamsLike): WorkspaceQuery {
  const view = sp.get('view') as ViewKey
  const lang = sp.get('lang')
  const seo = sp.get('seo')
  const limit = Number(sp.get('limit'))
  const sort = sp.get('sort') || ''
  return {
    view: VIEW_KEYS.includes(view) ? view : 'all',
    q: (sp.get('q') || '').trim().slice(0, 120),
    categories: splitIds(sp.get('category')),
    authors: splitIds(sp.get('author')),
    lang: lang === 'en' || lang === 'ar' || lang === 'missing' ? lang : '',
    seo: seo === 'high' || seo === 'mid' || seo === 'low' ? seo : '',
    sort: parseSort(sort) ? sort : '',
    page: Math.max(1, Math.floor(Number(sp.get('page')) || 1)),
    limit: PAGE_SIZES.includes(limit) ? limit : DEFAULT_PAGE_SIZE,
    layout: sp.get('layout') === 'board' ? 'board' : 'table',
  }
}

function writeQuery(q: WorkspaceQuery, mode: 'push' | 'replace') {
  const sp = new URLSearchParams(window.location.search)
  const set = (key: string, value: string) => (value ? sp.set(key, value) : sp.delete(key))
  set('view', q.view === 'all' ? '' : q.view)
  set('q', q.q)
  set('category', q.categories.join(','))
  set('author', q.authors.join(','))
  set('lang', q.lang)
  set('seo', q.seo)
  set('sort', q.sort)
  set('page', q.page > 1 ? String(q.page) : '')
  set('limit', q.limit !== DEFAULT_PAGE_SIZE ? String(q.limit) : '')
  set('layout', q.layout === 'board' ? 'board' : '')
  const search = sp.toString()
  const url = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
  if (url === `${window.location.pathname}${window.location.search}${window.location.hash}`) return
  // Native history calls stay in sync with useSearchParams (Next ≥ 14.1) and,
  // unlike router.replace, never trigger a server round-trip for the admin RSC.
  if (mode === 'push') window.history.pushState(null, '', url)
  else window.history.replaceState(null, '', url)
}

function useWorkspaceQuery() {
  const searchParams = useSearchParams()
  const query = useMemo(() => parseQuery(searchParams), [searchParams])
  const update = useCallback((patch: Partial<WorkspaceQuery>, mode: 'push' | 'replace' = 'replace') => {
    writeQuery({ ...parseQuery(new URLSearchParams(window.location.search)), ...patch }, mode)
  }, [])
  return [query, update] as const
}

const DENSITY_KEY = 'ct-articles-density'

function useDensity(): [Density, (d: Density) => void] {
  const [density, setDensity] = useState<Density>('comfortable')
  useEffect(() => {
    try {
      if (window.localStorage.getItem(DENSITY_KEY) === 'compact') setDensity('compact')
    } catch {
      /* storage unavailable */
    }
  }, [])
  const set = useCallback((d: Density) => {
    setDensity(d)
    try {
      window.localStorage.setItem(DENSITY_KEY, d)
    } catch {
      /* storage unavailable */
    }
  }, [])
  return [density, set]
}

// ---------------------------------------------------------------- helpers

type RowsState = { phase: 'loading' | 'ready' | 'error'; rows: ArticleRow[]; totalDocs: number; totalPages: number; error: string }

function summarize(res: MutationResult, verb: string): Omit<ToastData, 'id'> {
  if (!res.failed.length) return { message: `${plural(res.ok.length, 'article')} ${verb}` }
  const reason = res.failed[0]?.message || 'Failed'
  return {
    tone: 'error',
    message: res.ok.length
      ? `${fmtNumber(res.ok.length)} ${verb}, ${fmtNumber(res.failed.length)} failed: ${reason}`
      : `${plural(res.failed.length, 'article')} failed: ${reason}`,
  }
}

function pageList(page: number, total: number): Array<number | 'gap'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [...new Set([1, total, page - 1, page, page + 1])].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: Array<number | 'gap'> = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) out.push('gap')
    out.push(p)
  })
  return out
}

function emptyCopy(view: ViewKey, q: string, filtered: boolean): { icon: ReactNode; title: string; body: string } {
  if (filtered) {
    return {
      icon: <SearchX size={20} />,
      title: q ? `No articles match “${q}”` : 'No articles match these filters',
      body: 'Try a different search, or clear the filters to see everything in this view.',
    }
  }
  switch (view) {
    case 'trash':
      return { icon: <Trash2 size={20} />, title: 'Trash is empty', body: 'Articles you move to trash stay here until you restore them or delete them permanently.' }
    case 'scheduled':
      return { icon: <CalendarClock size={20} />, title: 'Nothing scheduled', body: 'Give an article a “Scheduled at” date and mark it Scheduled. The publishing cron takes it from there.' }
    case 'drafts':
      return { icon: <FileText size={20} />, title: 'No drafts', body: 'Ideas, outlines and drafts show up here while they are being written.' }
    case 'review':
      return { icon: <Eye size={20} />, title: 'Nothing waiting for review', body: 'Articles marked In review appear here.' }
    case 'published':
      return { icon: <Newspaper size={20} />, title: 'No published articles yet', body: 'Published articles appear on cloudtopia.net/articles.' }
    default:
      return { icon: <Newspaper size={20} />, title: 'No articles yet', body: 'Write the first article. Its Arabic counterpart draft is created automatically.' }
  }
}

function BoardSkeleton() {
  return (
    <div className="ct-articles-board" aria-hidden>
      {[0, 1, 2, 3, 4].map((c) => (
        <section key={c} className="ct-articles-col">
          <header className="ct-articles-col-h">
            <span className="ct-articles-skel is-line is-short" />
          </header>
          <div className="ct-articles-col-b">
            {[0, 1, 2].slice(0, 3 - (c % 2)).map((k) => (
              <div key={k} className="ct-articles-kcard is-skel">
                <span className="ct-articles-skel is-line" />
                <span className="ct-articles-skel is-meta" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Pager({
  page,
  totalPages,
  from,
  to,
  total,
  limit,
  onPage,
  onLimit,
}: {
  page: number
  totalPages: number
  from: number
  to: number
  total: number
  limit: number
  onPage: (page: number) => void
  onLimit: (limit: number) => void
}) {
  return (
    <div className="ct-articles-foot">
      <span className="ct-articles-num">
        {fmtNumber(from)}–{fmtNumber(to)} of {fmtNumber(total)}
      </span>
      <span className="ct-articles-vr" aria-hidden />
      <label className="ct-articles-rows">
        Rows
        <span className="ct-articles-select">
          <select value={limit} onChange={(e) => onLimit(Number(e.target.value))} aria-label="Rows per page">
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown size={12} aria-hidden />
        </span>
      </label>
      {totalPages > 1 && (
        <>
          <span className="ct-articles-vr" aria-hidden />
          <nav className="ct-articles-pg" aria-label="Pagination">
            <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPage(page - 1)}>
              <ChevronLeft size={14} aria-hidden />
            </button>
            {pageList(page, totalPages).map((p, i) =>
              p === 'gap' ? (
                <span key={`gap-${i}`} className="ct-articles-pg-gap">
                  …
                </span>
              ) : (
                <button key={p} type="button" className={cx(p === page && 'is-on')} aria-current={p === page ? 'page' : undefined} onClick={() => onPage(p)}>
                  {p}
                </button>
              ),
            )}
            <button type="button" aria-label="Next page" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
              <ChevronRight size={14} aria-hidden />
            </button>
          </nav>
        </>
      )}
      <span className="ct-articles-foot-hint">Click a row to peek · ↑ ↓ to move</span>
    </div>
  )
}

// ---------------------------------------------------------------- workspace

export function ArticlesWorkspace() {
  return (
    <Suspense fallback={<div className="ct-articles" aria-busy="true" />}>
      <Workspace />
    </Suspense>
  )
}

function Workspace() {
  const [query, updateQuery] = useWorkspaceQuery()
  const [density, setDensity] = useDensity()
  const panelId = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // -- toast
  const [toast, setToast] = useState<ToastData | null>(null)
  const toastSeq = useRef(0)
  const showToast = useCallback((t: Omit<ToastData, 'id'>) => {
    toastSeq.current += 1
    setToast({ ...t, id: toastSeq.current })
  }, [])
  useEffect(() => {
    if (!toast) return
    const ms = toast.action ? 7000 : toast.tone === 'error' ? 6500 : 3600
    const timer = window.setTimeout(() => setToast((cur) => (cur?.id === toast.id ? null : cur)), ms)
    return () => window.clearTimeout(timer)
  }, [toast])

  // -- reference data (once)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [authors, setAuthors] = useState<Author[] | null>(null)
  useEffect(() => {
    const ac = new AbortController()
    fetchCategories(ac.signal)
      .then(setCategories)
      .catch((e) => !isAbortError(e) && setCategories([]))
    fetchAuthors(ac.signal)
      .then(setAuthors)
      .catch((e) => !isAbortError(e) && setAuthors([]))
    return () => ac.abort()
  }, [])
  const authorsById = useMemo(() => new Map((authors ?? []).map((a) => [a.id, a])), [authors])

  // -- index: tab counts + EN ⇄ AR pairs
  const [index, setIndex] = useState<ArticleIndex | null>(null)
  const [indexError, setIndexError] = useState('')
  const [indexKey, setIndexKey] = useState(0)
  useEffect(() => {
    const ac = new AbortController()
    fetchIndex(ac.signal)
      .then((idx) => {
        setIndex(idx)
        setIndexError('')
      })
      .catch((e) => !isAbortError(e) && setIndexError(errorText(e, 'Could not load article counts.')))
    return () => ac.abort()
  }, [indexKey])

  // Mutations read the latest index (write ordering + verification) without
  // re-creating their callbacks on every index refresh.
  const indexRef = useRef<ArticleIndex | null>(index)
  useEffect(() => {
    indexRef.current = index
  }, [index])

  const needsIndex = needsIndexForQuery(query)
  const missingKey = useMemo(() => (index && needsIndex ? missingTranslationIds(index).join(',') : null), [index, needsIndex])
  const missingIds = useMemo(() => (missingKey === null ? null : missingKey ? missingKey.split(',') : []), [missingKey])

  // -- rows
  const [data, setData] = useState<RowsState>({ phase: 'loading', rows: [], totalDocs: 0, totalPages: 1, error: '' })
  const [rowsKey, setRowsKey] = useState(0)
  const filterKey = JSON.stringify([query.view, query.q, query.categories, query.authors, query.lang, query.seo, query.layout])
  const fetchKey = JSON.stringify([query, missingKey, rowsKey, indexError])
  const lastFilterKey = useRef(filterKey)

  useEffect(() => {
    if (needsIndex && missingIds === null) {
      if (indexError) setData((d) => ({ ...d, phase: 'error', error: indexError }))
      return
    }
    const filtersChanged = lastFilterKey.current !== filterKey
    lastFilterKey.current = filterKey
    const ac = new AbortController()
    // New view/filters → skeleton; page/sort/size change → keep rows + progress bar.
    setData((d) => ({ ...d, phase: 'loading', error: '', rows: filtersChanged ? [] : d.rows }))
    fetchRows(query, missingIds, ac.signal)
      .then((res) => setData({ phase: 'ready', rows: res.rows, totalDocs: res.totalDocs, totalPages: res.totalPages, error: '' }))
      .catch((e) => {
        if (!isAbortError(e)) setData((d) => ({ ...d, phase: 'error', error: errorText(e, 'Could not load articles.') }))
      })
    return () => ac.abort()
    // fetchKey captures every input of this request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey])

  const rowsRef = useRef<ArticleRow[]>(data.rows)
  useEffect(() => {
    rowsRef.current = data.rows
  }, [data.rows])

  // Page beyond the end (e.g. after trashing the last rows) → clamp.
  useEffect(() => {
    if (data.phase === 'ready' && data.rows.length === 0 && query.page > 1 && query.layout === 'table') {
      updateQuery({ page: Math.max(1, data.totalPages) })
    }
  }, [data, query.page, query.layout, updateQuery])

  const refresh = useCallback(() => {
    setIndexKey((k) => k + 1)
    setRowsKey((k) => k + 1)
  }, [])

  // -- search input (debounced into the URL)
  const [qInput, setQInput] = useState(query.q)
  const lastQ = useRef(query.q)
  useEffect(() => {
    if (query.q !== lastQ.current) {
      lastQ.current = query.q
      setQInput(query.q)
    }
  }, [query.q])
  useEffect(() => {
    const next = qInput.trim()
    if (next === query.q) return
    const timer = window.setTimeout(() => {
      lastQ.current = next
      updateQuery({ q: next, page: 1 })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [qInput, query.q, updateQuery])

  // -- selection
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [confirm, setConfirm] = useState<ConfirmKind | null>(null)
  const [busy, setBusy] = useState<BulkBusy>(null)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [selectingAll, setSelectingAll] = useState(false)
  const lastToggle = useRef<number | null>(null)

  useEffect(() => {
    setSelected(new Set())
    setConfirm(null)
    lastToggle.current = null
  }, [filterKey])

  const toggleRow = useCallback((id: string, rowIndex: number, shift: boolean) => {
    const rows = rowsRef.current
    const anchor = lastToggle.current
    setSelected((prev) => {
      const next = new Set(prev)
      if (shift && anchor !== null && anchor !== rowIndex && rows[anchor]) {
        const on = !prev.has(id)
        const [a, b] = anchor < rowIndex ? [anchor, rowIndex] : [rowIndex, anchor]
        for (let i = a; i <= b; i++) {
          const r = rows[i]
          if (!r) continue
          if (on) next.add(r.id)
          else next.delete(r.id)
        }
      } else if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    lastToggle.current = rowIndex
    setConfirm(null)
  }, [])

  const toggleHead = useCallback(() => {
    const rows = rowsRef.current
    setSelected((prev) => {
      const allOn = rows.length > 0 && rows.every((r) => prev.has(r.id))
      const next = new Set(prev)
      for (const r of rows) {
        if (allOn) next.delete(r.id)
        else next.add(r.id)
      }
      return next
    })
    setConfirm(null)
  }, [])

  const clearSelection = useCallback(() => {
    setSelected(new Set())
    setConfirm(null)
  }, [])

  const pageSelected = data.rows.reduce((n, r) => n + (selected.has(r.id) ? 1 : 0), 0)
  const headState: CheckState = data.rows.length > 0 && pageSelected === data.rows.length ? 'on' : pageSelected > 0 ? 'mixed' : 'off'
  const selectedIds = useMemo(() => Array.from(selected), [selected])
  const translatable = useMemo(() => translatableIds(index, selected), [index, selected])

  const selectAllMatching = useCallback(async () => {
    setSelectingAll(true)
    try {
      setSelected(new Set(await fetchMatchingIds(query, missingIds)))
    } catch (e) {
      showToast({ tone: 'error', message: errorText(e, 'Could not select all articles.') })
    } finally {
      setSelectingAll(false)
    }
  }, [query, missingIds, showToast])

  // -- quick peek
  const [peekId, setPeekId] = useState<string | null>(null)
  const peekRef = useRef<string | null>(null)
  useEffect(() => {
    peekRef.current = peekId
  }, [peekId])
  const peekIndex = peekId ? data.rows.findIndex((r) => r.id === peekId) : -1
  const peekRow = peekIndex >= 0 ? data.rows[peekIndex] : null

  useEffect(() => {
    if (peekId && data.phase === 'ready' && !data.rows.some((r) => r.id === peekId)) setPeekId(null)
  }, [peekId, data])

  const openPeek = useCallback((id: string) => setPeekId(id), [])

  const movePeek = useCallback((delta: number) => {
    const rows = rowsRef.current
    const i = rows.findIndex((r) => r.id === peekRef.current)
    const next = i < 0 ? undefined : rows[i + delta]
    if (!next) return
    setPeekId(next.id)
    requestAnimationFrame(() => {
      stageRef.current?.querySelector<HTMLElement>(`[data-ct-row="${CSS.escape(next.id)}"]`)?.scrollIntoView({ block: 'nearest' })
    })
  }, [])

  // -- keyboard: "/" search · Esc close/clear · ↑/↓ move the peek
  const keyState = useRef({ peekId, hasSelection: selected.size > 0, confirm })
  useEffect(() => {
    keyState.current = { peekId, hasSelection: selected.size > 0, confirm }
  }, [peekId, selected, confirm])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      const typing = Boolean(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable))
      if (typing) return
      const s = keyState.current
      if (e.key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === 'Escape') {
        if (s.confirm) setConfirm(null)
        else if (s.peekId) setPeekId(null)
        else if (s.hasSelection) setSelected(new Set())
      } else if (s.peekId && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault()
        movePeek(e.key === 'ArrowDown' ? 1 : -1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [movePeek])

  // -- stage height: the table card fills the viewport so its header can stick
  // and the peek drawer stays fully visible, whatever sits above this view.
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let raf = 0
    const measure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const top = stage.getBoundingClientRect().top + window.scrollY
        stage.style.setProperty('--cta-stage-h', `${Math.max(440, Math.round(window.innerHeight - top - 20))}px`)
      })
    }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (topRef.current) ro?.observe(topRef.current)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // -- mutations
  const onProgress = useCallback((done: number, total: number) => {
    if (total > 20) setProgress({ done, total })
  }, [])

  const guard = useCallback(
    async (kind: Exclude<BulkBusy, null>, work: () => Promise<void>, reload = true) => {
      setBusy(kind)
      setProgress(null)
      try {
        await work()
      } catch (e) {
        showToast({ tone: 'error', message: errorText(e) })
      } finally {
        setBusy(null)
        setProgress(null)
        setConfirm(null)
        if (reload) refresh()
      }
    },
    [refresh, showToast],
  )

  const dropIds = useCallback((ids: string[]) => {
    if (!ids.length) return
    setSelected((prev) => {
      const next = new Set(prev)
      for (const id of ids) next.delete(id)
      return next
    })
    setPeekId((cur) => (cur && ids.includes(cur) ? null : cur))
  }, [])

  const keepFailed = useCallback((res: MutationResult) => setSelected(new Set(res.failed.map((f) => f.id).filter(Boolean))), [])

  const doStatus = (status: Status) =>
    guard('status', async () => {
      const res = await runBulkAction('status', selectedIds, status, indexRef.current, onProgress)
      showToast(summarize(res, `set to ${STATUS_LABELS[status]}`))
      keepFailed(res)
    })

  const doCategory = (id: string) =>
    guard('category', async () => {
      const name = categories?.find((c) => c.id === id)?.name ?? 'the category'
      const res = await runBulkAction('category', selectedIds, id, indexRef.current, onProgress)
      showToast(summarize(res, `moved to ${name}`))
      keepFailed(res)
    })

  const doTranslate = () =>
    guard('translate', async () => {
      const res = await runBulkAction('translate', translatable, undefined, indexRef.current, onProgress)
      showToast(res.failed.length ? summarize(res, 'paired') : { message: `${plural(res.ok.length, 'blank translation draft')} created` })
      keepFailed(res)
    })

  const doRecalc = () =>
    guard('recalc', async () => {
      const res = await runBulkAction('recalc', selectedIds, undefined, indexRef.current, onProgress)
      showToast(summarize(res, 'rescored'))
      keepFailed(res)
    })

  const doExport = () =>
    guard(
      'export',
      async () => {
        const docs = await exportArticles(selectedIds)
        const url = URL.createObjectURL(new Blob([JSON.stringify(docs, null, 2)], { type: 'application/json' }))
        const a = document.createElement('a')
        a.href = url
        a.download = `cloudtopia-articles-${new Date().toISOString().slice(0, 10)}.json`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.setTimeout(() => URL.revokeObjectURL(url), 1000)
        showToast({ message: `Exported ${plural(docs.length, 'article')}` })
      },
      false,
    )

  const undoTrash = useCallback(
    async (ids: string[]) => {
      try {
        const res = await restoreArticles(ids, indexRef.current)
        showToast(summarize(res, 'restored'))
      } catch (e) {
        showToast({ tone: 'error', message: errorText(e, 'Could not undo.') })
      } finally {
        refresh()
      }
    },
    [refresh, showToast],
  )

  const doTrash = useCallback(
    (ids: string[]) =>
      guard('trash', async () => {
        const res = await trashArticles(ids, indexRef.current, onProgress)
        dropIds(res.ok)
        if (res.failed.length || !res.ok.length) showToast(summarize(res, 'moved to trash'))
        else showToast({ message: `${plural(res.ok.length, 'article')} moved to trash`, action: { label: 'Undo', onClick: () => void undoTrash(res.ok) } })
      }),
    [guard, onProgress, dropIds, showToast, undoTrash],
  )

  const doRestore = useCallback(
    (ids: string[]) =>
      guard('restore', async () => {
        const res = await restoreArticles(ids, indexRef.current, onProgress)
        dropIds(res.ok)
        showToast(summarize(res, 'restored'))
      }),
    [guard, onProgress, dropIds, showToast],
  )

  const doDestroy = useCallback(
    (ids: string[]) =>
      guard('destroy', async () => {
        const res = await deleteArticlesForever(ids, indexRef.current, onProgress)
        dropIds(res.ok)
        showToast(summarize(res, 'deleted permanently'))
      }),
    [guard, onProgress, dropIds, showToast],
  )

  const [pairingId, setPairingId] = useState<string | null>(null)
  const doCreateSibling = useCallback(
    async (row: ArticleRow) => {
      setPairingId(row.id)
      try {
        const res = await pairArticle(row.id)
        const lang = localeName(res.locale)
        showToast({
          message: res.created ? `Blank ${lang} draft created` : `The ${lang} version already exists`,
          action: res.id ? { label: 'Open', href: editorUrl(res.id) } : undefined,
        })
        setIndexKey((k) => k + 1)
      } catch (e) {
        showToast({ tone: 'error', message: errorText(e) })
      } finally {
        setPairingId(null)
      }
    },
    [showToast],
  )

  const doMove = useCallback(
    async (id: string, status: Status) => {
      try {
        await updateArticleStatus(id, status, indexRef.current)
        showToast({ message: `Moved to ${STATUS_LABELS[status]}` })
        refresh()
        return true
      } catch (e) {
        showToast({ tone: 'error', message: errorText(e, 'Could not change the status.') })
        return false
      }
    },
    [refresh, showToast],
  )

  const rowActions = useMemo<RowActions>(
    () => ({ onPeek: openPeek, onTrash: doTrash, onRestore: doRestore, onDestroy: doDestroy, onCreateSibling: doCreateSibling }),
    [openPeek, doTrash, doRestore, doDestroy, doCreateSibling],
  )

  // -- toolbar handlers
  const changeView = (view: ViewKey) => {
    setPeekId(null)
    updateQuery({ view, page: 1, sort: '', lang: view === 'trash' && query.lang === 'missing' ? '' : query.lang }, 'push')
  }
  const clearFilters = () => {
    lastQ.current = ''
    setQInput('')
    updateQuery({ q: '', categories: [], authors: [], lang: '', seo: '', page: 1 })
  }
  const changeLayout = (layout: Layout) => {
    setPeekId(null)
    updateQuery({ layout, page: 1 })
  }

  // -- render
  const counts = index?.counts ?? null
  const table = query.layout === 'table'
  const skeleton = data.phase === 'loading' && data.rows.length === 0
  const refreshing = data.phase === 'loading' && data.rows.length > 0
  const filtered = Boolean(query.q || query.categories.length || query.authors.length || query.lang || query.seo)
  const isEmpty = data.phase === 'ready' && data.rows.length === 0
  const from = data.totalDocs ? (query.page - 1) * query.limit + 1 : 0
  const to = Math.min(data.totalDocs, (query.page - 1) * query.limit + data.rows.length)
  const empty = emptyCopy(query.view, query.q, filtered)

  const emptyState = (
    <EmptyState
      icon={empty.icon}
      title={empty.title}
      actions={
        filtered ? (
          <button type="button" className={btn('sm')} onClick={clearFilters}>
            Clear filters
          </button>
        ) : query.view === 'all' ? (
          <Link prefetch={false} href={NEW_ARTICLE_URL} className={btn('sm', 'primary')}>
            <Plus size={14} aria-hidden />
            New article
          </Link>
        ) : undefined
      }
    >
      {empty.body}
    </EmptyState>
  )

  const errorState = (
    <EmptyState
      tone="error"
      icon={<AlertTriangle size={20} />}
      title="Couldn’t load articles"
      actions={
        <button type="button" className={btn('sm')} onClick={refresh}>
          Try again
        </button>
      }
    >
      {data.error}
    </EmptyState>
  )

  return (
    <div className="ct-articles">
      <div ref={topRef} className="ct-articles-top">
        <header className="ct-articles-ph">
          <div>
            <h1 className="ct-articles-h1">
              Articles <span className="ct-articles-cnt">{counts ? fmtNumber(counts.all) : '–'}</span>
            </h1>
            <div className="ct-articles-sub">Bilingual blog for cloudtopia.net — every article is an EN ⇄ AR pair.</div>
          </div>
          <div className="ct-articles-ph-actions">
            <Link prefetch={false} href={EXPORT_URL} className={btn('sm')}>
              <Download size={14} aria-hidden />
              Export
            </Link>
            <Link prefetch={false} href={NEW_ARTICLE_URL} className={btn('sm', 'primary')}>
              <Plus size={14} aria-hidden />
              New article
            </Link>
          </div>
        </header>

        <ViewTabs view={query.view} counts={counts} panelId={panelId} onChange={changeView} />

        <FilterBar
          query={query}
          qInput={qInput}
          onQInput={setQInput}
          searchRef={searchRef}
          categories={categories}
          authors={authors}
          onFilters={(patch) => updateQuery({ ...patch, page: 1 })}
          onClearAll={clearFilters}
          density={density}
          onDensity={setDensity}
          onLayout={changeLayout}
        />
      </div>

      <div ref={stageRef} id={panelId} role="tabpanel" className={cx('ct-articles-stage', peekRow && 'has-peek', !table && 'is-board')}>
        {table ? (
          <div className="ct-articles-card" aria-busy={data.phase === 'loading'}>
            {refreshing && <div className="ct-articles-progress" aria-hidden />}
            {selected.size > 0 && data.phase !== 'error' && (
              <BulkBar
                view={query.view}
                count={selected.size}
                totalMatching={data.totalDocs}
                selectingAll={selectingAll}
                categories={categories}
                translatable={translatable.length}
                busy={busy}
                progress={progress}
                confirm={confirm}
                onSelectAll={selectAllMatching}
                onClear={clearSelection}
                onConfirm={setConfirm}
                onStatus={doStatus}
                onCategory={doCategory}
                onTranslate={doTranslate}
                onRecalc={doRecalc}
                onExport={doExport}
                onTrash={() => doTrash(selectedIds)}
                onRestore={() => doRestore(selectedIds)}
                onDestroy={() => doDestroy(selectedIds)}
              />
            )}
            {data.phase === 'error' ? (
              errorState
            ) : isEmpty ? (
              emptyState
            ) : (
              <>
                <div ref={scrollRef} className="ct-articles-scroll">
                  <ArticleListView
                    rows={data.rows}
                    skeleton={skeleton}
                    density={density}
                    view={query.view}
                    index={index}
                    authorsById={authorsById}
                    selected={selected}
                    peekId={peekId}
                    sort={effectiveSort(query)}
                    onSort={(s) => updateQuery({ sort: s === defaultSortFor(query.view) ? '' : s, page: 1 })}
                    headState={headState}
                    onToggleHead={toggleHead}
                    onToggleRow={toggleRow}
                    actions={rowActions}
                  />
                </div>
                {data.totalDocs > 0 && (
                  <Pager
                    page={query.page}
                    totalPages={data.totalPages}
                    from={from}
                    to={to}
                    total={data.totalDocs}
                    limit={query.limit}
                    onPage={(p) => {
                      updateQuery({ page: p })
                      scrollRef.current?.scrollTo({ top: 0 })
                    }}
                    onLimit={(n) => updateQuery({ limit: n, page: 1 })}
                  />
                )}
              </>
            )}
          </div>
        ) : data.phase === 'error' ? (
          <div className="ct-articles-card">{errorState}</div>
        ) : isEmpty ? (
          <div className="ct-articles-card">{emptyState}</div>
        ) : skeleton ? (
          <BoardSkeleton />
        ) : (
          <>
            {refreshing && <div className="ct-articles-progress" aria-hidden />}
            <ArticleBoardView
              rows={data.rows}
              view={query.view}
              index={index}
              peekId={peekId}
              totalDocs={data.totalDocs}
              onPeek={openPeek}
              onMove={doMove}
            />
          </>
        )}

        {peekRow && (
          <QuickPeek
            row={peekRow}
            pair={pairFor(index, peekRow)}
            author={peekRow.author ? authorsById.get(peekRow.author.id) : undefined}
            inTrash={query.view === 'trash' || Boolean(peekRow.deletedAt)}
            hasPrev={peekIndex > 0}
            hasNext={peekIndex < data.rows.length - 1}
            creatingSibling={pairingId === peekRow.id}
            onPrev={() => movePeek(-1)}
            onNext={() => movePeek(1)}
            onClose={() => setPeekId(null)}
            onCreateSibling={doCreateSibling}
            onRestore={doRestore}
          />
        )}
      </div>

      <ToastView toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
