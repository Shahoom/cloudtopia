import { normalizeMediaUrl } from '../../../lib/blog/utils.ts'
import type { ArticleIndex, ArticleRow, Author, Category, IndexDoc, PairEntry, SortField, Status, ViewKey, WorkspaceQuery } from './types.ts'
import { BOARD_LIMIT, SORT_FIELDS, STATUS_ORDER, VIEWS } from './types.ts'
import { otherLocale } from './format.ts'

// All reads go through Payload REST with the admin session cookie. Reads never
// pass `draft=true`: a draft-scoped read resolves through the versions table and
// misses every SQL-imported post (they have no version rows).

const COLLECTION = '/api/blog-posts'
const JSON_HEADERS = { accept: 'application/json', 'content-type': 'application/json' }
// The bulk endpoint runs every collection hook (score recompute, revalidation,
// pair sync) per document, so large selections are sent in small batches to
// stay well inside the serverless function timeout.
const BULK_CHUNK = 20
const REST_CHUNK = 50

type Rec = Record<string, unknown>

const isRec = (v: unknown): v is Rec => Boolean(v) && typeof v === 'object' && !Array.isArray(v)
const asRec = (v: unknown): Rec | null => (isRec(v) ? v : null)
const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const strOrNull = (v: unknown): string | null => (typeof v === 'string' && v ? v : null)
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])
const idOf = (v: unknown): string => (typeof v === 'string' || typeof v === 'number' ? String(v) : '')
const asStatus = (v: unknown): Status => (STATUS_ORDER.includes(v as Status) ? (v as Status) : 'draft')

export const editorUrl = (id: string, trashed = false) =>
  `/admin/collections/blog-posts/${trashed ? 'trash/' : ''}${encodeURIComponent(id)}`
export const liveUrl = (row: { locale: string; slug: string }) => `/${row.locale}/articles/${encodeURIComponent(row.slug)}`
export const NEW_ARTICLE_URL = '/admin/collections/blog-posts/create'
export const EXPORT_URL = '/admin/collections/exports/create'

// ---------------------------------------------------------------- plumbing

/** Serializes nested objects/arrays in qs "indices" format: where[and][0][id][in][1]=… */
export function appendParam(sp: URLSearchParams, key: string, value: unknown): void {
  if (value === undefined || value === null) return
  if (Array.isArray(value)) {
    value.forEach((v, i) => appendParam(sp, `${key}[${i}]`, v))
    return
  }
  if (isRec(value)) {
    for (const [k, v] of Object.entries(value)) appendParam(sp, `${key}[${k}]`, v)
    return
  }
  sp.append(key, String(value))
}

function selectFields(sp: URLSearchParams, fields: string[]) {
  for (const f of fields) sp.set(`select[${f}]`, 'true')
}

function errorMessage(json: unknown): string {
  const r = asRec(json)
  if (!r) return ''
  const first = asRec(list(r.errors)[0])
  const nested = asRec(list(asRec(first?.data)?.errors)[0])
  return str(first?.message) || str(nested?.message) || str(r.error) || str(r.message)
}

function describeStatus(status: number): string {
  if (status === 401 || status === 403) return 'Your session has expired. Sign in again.'
  if (status >= 500) return `The server returned an error (${status}).`
  return `Request failed (${status}).`
}

async function readJson(res: Response): Promise<Rec | null> {
  try {
    return asRec(await res.json())
  } catch {
    return null
  }
}

async function getJson(url: string, signal?: AbortSignal): Promise<Rec> {
  const res = await fetch(url, { credentials: 'include', headers: { accept: 'application/json' }, signal })
  const json = await readJson(res)
  if (!res.ok) throw new Error(errorMessage(json) || describeStatus(res.status))
  return json ?? {}
}

export function isAbortError(e: unknown): boolean {
  return Boolean(e) && typeof e === 'object' && (e as { name?: unknown }).name === 'AbortError'
}

export function errorText(e: unknown, fallback = 'Something went wrong.'): string {
  return e instanceof Error && e.message ? e.message : fallback
}

const MEDIA_POPULATE = {
  url: true,
  filename: true,
  alt: true,
  sizes: { thumbnail: { url: true, filename: true }, card: { url: true, filename: true } },
}

function mediaUrl(value: unknown, size: 'thumbnail' | 'card'): string | null {
  const m = asRec(value)
  if (!m) return null
  const url = str(asRec(asRec(m.sizes)?.[size])?.url) || str(m.url)
  // Relative /api/media/file/<name> → https://media.cloudtopia.net/<name>
  return url ? normalizeMediaUrl(url) || null : null
}

// ---------------------------------------------------------------- index (counts + pairs)

function buildIndex(docs: IndexDoc[]): ArticleIndex {
  const counts: Record<ViewKey, number> = { all: 0, published: 0, scheduled: 0, drafts: 0, review: 0, trash: 0 }
  const byId = new Map<string, IndexDoc>()
  const bySlug = new Map<string, PairEntry>()
  for (const d of docs) {
    byId.set(d.id, d)
    if (d.trashed) {
      counts.trash++
    } else {
      counts.all++
      for (const v of VIEWS) if (v.statuses?.includes(d.status)) counts[v.key]++
    }
    if (!d.slug) continue
    const entry = bySlug.get(d.slug) ?? {}
    if (d.trashed) entry[d.locale === 'ar' ? 'arTrash' : 'enTrash'] = d
    else entry[d.locale] = d
    bySlug.set(d.slug, entry)
  }
  return { docs, byId, bySlug, counts }
}

/** One small request (6 selected columns, trashed docs included) for every blog-post doc. */
export async function fetchIndex(signal?: AbortSignal): Promise<ArticleIndex> {
  const sp = new URLSearchParams({ trash: 'true', depth: '0', pagination: 'false' })
  selectFields(sp, ['slug', 'locale', 'status', 'title', 'category', 'deletedAt'])
  const json = await getJson(`${COLLECTION}?${sp}`, signal)
  const docs = list(json.docs).flatMap((raw): IndexDoc[] => {
    const d = asRec(raw)
    if (!d) return []
    return [
      {
        id: idOf(d.id),
        slug: str(d.slug),
        locale: d.locale === 'ar' ? 'ar' : 'en',
        status: asStatus(d.status),
        title: str(d.title),
        category: idOf(asRec(d.category)?.id ?? d.category) || null,
        trashed: Boolean(d.deletedAt),
      },
    ]
  })
  return buildIndex(docs)
}

// ---------------------------------------------------------------- taxonomy

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const sp = new URLSearchParams({ depth: '0', limit: '200', sort: 'name' })
  selectFields(sp, ['name', 'slug', 'locale'])
  const json = await getJson(`/api/blog-categories?${sp}`, signal)
  return list(json.docs).flatMap((raw): Category[] => {
    const c = asRec(raw)
    return c ? [{ id: idOf(c.id), name: str(c.name) || 'Untitled', slug: str(c.slug), locale: c.locale === 'ar' ? 'ar' : 'en' }] : []
  })
}

export async function fetchAuthors(signal?: AbortSignal): Promise<Author[]> {
  const sp = new URLSearchParams({ depth: '1', limit: '200', sort: 'name' })
  selectFields(sp, ['name', 'image'])
  appendParam(sp, 'populate', { media: MEDIA_POPULATE })
  const json = await getJson(`/api/authors?${sp}`, signal)
  return list(json.docs).flatMap((raw): Author[] => {
    const a = asRec(raw)
    return a ? [{ id: idOf(a.id), name: str(a.name) || 'Unnamed author', avatar: mediaUrl(a.image, 'thumbnail') }] : []
  })
}

// ---------------------------------------------------------------- list query

export function dateFieldFor(view: ViewKey): SortField {
  if (view === 'trash') return 'deletedAt'
  if (view === 'scheduled') return 'scheduledAt'
  if (view === 'published') return 'publishedAt'
  return 'updatedAt'
}

export function defaultSortFor(view: ViewKey): string {
  return view === 'scheduled' ? 'scheduledAt' : `-${dateFieldFor(view)}`
}

export function parseSort(sort: string): { field: SortField; desc: boolean } | null {
  const desc = sort.startsWith('-')
  const field = (desc ? sort.slice(1) : sort) as SortField
  return SORT_FIELDS.includes(field) ? { field, desc } : null
}

export function effectiveSort(q: WorkspaceQuery): string {
  return q.sort && parseSort(q.sort) ? q.sort : defaultSortFor(q.view)
}

export function buildWhere(q: WorkspaceQuery, missingIds: string[] | null): { and: unknown[]; trash: boolean } {
  const and: unknown[] = []
  const trash = q.view === 'trash'
  if (trash) and.push({ deletedAt: { exists: true } })
  const statuses = VIEWS.find((v) => v.key === q.view)?.statuses
  if (statuses?.length) and.push(statuses.length === 1 ? { status: { equals: statuses[0] } } : { status: { in: statuses } })
  if (q.q) and.push({ or: [{ title: { like: q.q } }, { slug: { like: q.q } }] })
  if (q.categories.length) and.push({ category: { in: q.categories } })
  if (q.authors.length) and.push({ author: { in: q.authors } })
  if (q.lang === 'en' || q.lang === 'ar') and.push({ locale: { equals: q.lang } })
  if (q.lang === 'missing' && !trash && missingIds?.length) and.push({ id: { in: missingIds } })
  if (q.seo === 'high') and.push({ seoScore: { greater_than_equal: 80 } })
  else if (q.seo === 'mid') and.push({ seoScore: { greater_than_equal: 50 } }, { seoScore: { less_than: 80 } })
  else if (q.seo === 'low') and.push({ or: [{ seoScore: { less_than: 50 } }, { seoScore: { exists: false } }] })
  return { and, trash }
}

/** `lang=missing` needs the index; when it resolves to zero ids no request is needed. */
export function needsIndexForQuery(q: WorkspaceQuery): boolean {
  return q.lang === 'missing' && q.view !== 'trash'
}

function applyListQuery(sp: URLSearchParams, q: WorkspaceQuery, missingIds: string[] | null) {
  // `-id` tie-break keeps LIMIT/OFFSET pages stable when many rows share a value
  // (e.g. dozens of imported posts with the same seoScore or updatedAt).
  sp.set('sort', `${effectiveSort(q)},-id`)
  const { and, trash } = buildWhere(q, missingIds)
  if (trash) sp.set('trash', 'true')
  if (and.length) appendParam(sp, 'where[and]', and)
}

const ROW_FIELDS = [
  'title', 'slug', 'locale', 'status', 'excerpt', 'seoScore', 'contentScore', 'readingTime', 'wordCount',
  'viewsCount', 'category', 'author', 'coverImage', 'tags', 'publishedAt', 'scheduledAt', 'updatedAt', 'deletedAt',
]

const ROW_POPULATE = {
  media: MEDIA_POPULATE,
  'blog-categories': { name: true, slug: true },
  authors: { name: true },
  'blog-tags': { name: true },
}

function mapRow(d: Rec): ArticleRow {
  const cover = asRec(d.coverImage)
  const cat = asRec(d.category)
  const author = asRec(d.author)
  return {
    id: idOf(d.id),
    title: str(d.title),
    slug: str(d.slug),
    locale: d.locale === 'ar' ? 'ar' : 'en',
    status: asStatus(d.status),
    excerpt: str(d.excerpt),
    seoScore: Math.round(num(d.seoScore)),
    contentScore: Math.round(num(d.contentScore)),
    readingTime: num(d.readingTime),
    wordCount: num(d.wordCount),
    viewsCount: num(d.viewsCount),
    category: cat ? { id: idOf(cat.id), name: str(cat.name) || 'Untitled', slug: str(cat.slug) } : null,
    author: author ? { id: idOf(author.id), name: str(author.name) } : null,
    cover: {
      thumb: mediaUrl(cover, 'thumbnail'),
      large: mediaUrl(cover, 'card'),
      alt: str(cover?.alt),
      filename: str(cover?.filename),
    },
    tags: list(d.tags).map((t) => str(asRec(t)?.name)).filter(Boolean),
    publishedAt: strOrNull(d.publishedAt),
    scheduledAt: strOrNull(d.scheduledAt),
    updatedAt: str(d.updatedAt),
    deletedAt: strOrNull(d.deletedAt),
  }
}

export type RowsResult = { rows: ArticleRow[]; totalDocs: number; totalPages: number }

export async function fetchRows(q: WorkspaceQuery, missingIds: string[] | null, signal?: AbortSignal): Promise<RowsResult> {
  if (needsIndexForQuery(q) && missingIds !== null && missingIds.length === 0) return { rows: [], totalDocs: 0, totalPages: 1 }
  const board = q.layout === 'board'
  const sp = new URLSearchParams({
    depth: '1',
    limit: String(board ? BOARD_LIMIT : q.limit),
    page: String(board ? 1 : q.page),
  })
  selectFields(sp, ROW_FIELDS)
  appendParam(sp, 'populate', ROW_POPULATE)
  applyListQuery(sp, q, missingIds)
  const json = await getJson(`${COLLECTION}?${sp}`, signal)
  return {
    rows: list(json.docs).flatMap((raw) => {
      const d = asRec(raw)
      return d ? [mapRow(d)] : []
    }),
    totalDocs: num(json.totalDocs),
    totalPages: Math.max(1, num(json.totalPages)),
  }
}

/** Ids of every doc matching the current view + filters (for "Select all N"). */
export async function fetchMatchingIds(q: WorkspaceQuery, missingIds: string[] | null): Promise<string[]> {
  if (needsIndexForQuery(q) && missingIds !== null && missingIds.length === 0) return []
  const sp = new URLSearchParams({ depth: '0', pagination: 'false' })
  selectFields(sp, ['slug'])
  applyListQuery(sp, q, missingIds)
  const json = await getJson(`${COLLECTION}?${sp}`)
  return list(json.docs).map((raw) => idOf(asRec(raw)?.id)).filter(Boolean)
}

// ---------------------------------------------------------------- mutations

export type MutationResult = { ok: string[]; failed: Array<{ id: string; message: string }> }
export type Progress = (done: number, total: number) => void

// Why writes are ordered, isolated and verified:
// BlogPosts' afterChange hook `ensureArabicCounterpart` runs on every ENGLISH
// save and looks for the Arabic sibling without `trash: true`. If that sibling
// sits in trash it tries to create a new one, hits the (slug, locale) unique
// index, and Payload's createOperation rolls back the WHOLE request transaction
// (killTransaction) — while the REST/bulk response still reports success, and
// Payload runs a many-update's docs concurrently inside that one transaction.
// So: English goes before Arabic when trashing, Arabic before English when
// restoring, English docs whose Arabic sibling stays in trash get a request of
// their own, and every write is checked against a fresh index afterwards.
type PlanOp = 'trash' | 'restore' | 'update'

function toBatches(ids: string[], size: number): string[][] {
  const out: string[][] = []
  for (let i = 0; i < ids.length; i += size) out.push(ids.slice(i, i + size))
  return out
}

function trashedArabicSibling(index: ArticleIndex, doc: IndexDoc): IndexDoc | undefined {
  return doc.locale === 'en' && doc.slug ? index.bySlug.get(doc.slug)?.arTrash : undefined
}

function planBatches(ids: string[], index: ArticleIndex | null, op: PlanOp, size: number): string[][] {
  if (!index) return toBatches(ids, size)
  const included = new Set(ids)
  const en: string[] = []
  const ar: string[] = []
  const isolated: string[] = []
  for (const id of ids) {
    const doc = index.byId.get(id)
    if (doc?.locale === 'ar') {
      ar.push(id)
      continue
    }
    const trashedAr = doc ? trashedArabicSibling(index, doc) : undefined
    const hazard = op === 'restore' ? Boolean(trashedAr && !included.has(trashedAr.id)) : Boolean(trashedAr)
    if (hazard) isolated.push(id)
    else en.push(id)
  }
  const main = op === 'restore' ? [...toBatches(ar, size), ...toBatches(en, size)] : [...toBatches(en, size), ...toBatches(ar, size)]
  return [...main, ...isolated.map((id) => [id])]
}

function rollbackReason(before: ArticleIndex | null, id: string, op: PlanOp): string {
  const doc = before?.byId.get(id)
  if (before && doc && trashedArabicSibling(before, doc)) {
    return op === 'restore'
      ? 'its Arabic version is still in trash. Restore both languages together.'
      : 'its Arabic version is in trash, so the CMS rolled the save back. Restore the Arabic version first.'
  }
  return 'the CMS rolled the change back. Refresh and try again.'
}

async function runPlanned(batches: string[][], run: (batch: string[]) => Promise<MutationResult>, onProgress?: Progress): Promise<MutationResult> {
  const total = batches.reduce((n, b) => n + b.length, 0)
  const result: MutationResult = { ok: [], failed: [] }
  let done = 0
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    try {
      const r = await run(batch)
      result.ok.push(...r.ok)
      result.failed.push(...r.failed)
    } catch (e) {
      // A failed request (network, auth) marks the rest failed rather than
      // hammering the server with batches that will fail the same way.
      const message = errorText(e, 'Request failed.')
      for (const id of batches.slice(i).flat()) result.failed.push({ id, message })
      break
    }
    done += batch.length
    onProgress?.(done, total)
  }
  return result
}

async function verifyAgainstIndex(
  before: ArticleIndex | null,
  res: MutationResult,
  op: PlanOp,
  persisted: (doc: IndexDoc | undefined, fresh: ArticleIndex) => boolean,
): Promise<MutationResult> {
  if (!res.ok.length) return res
  let fresh: ArticleIndex
  try {
    fresh = await fetchIndex()
  } catch {
    return res // cannot verify: trust the API response
  }
  const out: MutationResult = { ok: [], failed: [...res.failed] }
  for (const id of res.ok) {
    if (persisted(fresh.byId.get(id), fresh)) out.ok.push(id)
    else out.failed.push({ id, message: rollbackReason(before, id, op) })
  }
  return out
}

/** POST /api/admin/articles-bulk — status | category | translate | recalc. */
export async function runBulkAction(
  action: 'status' | 'category' | 'translate' | 'recalc',
  ids: string[],
  value: string | undefined,
  index: ArticleIndex | null,
  onProgress?: Progress,
): Promise<MutationResult> {
  const res = await runPlanned(
    planBatches(ids, index, 'update', BULK_CHUNK),
    async (batch) => {
      const response = await fetch('/api/admin/articles-bulk', {
        method: 'POST',
        credentials: 'include',
        headers: JSON_HEADERS,
        body: JSON.stringify({ action, ids: batch, value }),
      })
      const json = await readJson(response)
      if (!response.ok) throw new Error(errorMessage(json) || describeStatus(response.status))
      const results = list(json?.results).map(asRec).filter((r): r is Rec => r !== null)
      return {
        ok: results.filter((r) => r.ok === true).map((r) => idOf(r.id)),
        failed: results.filter((r) => r.ok !== true).map((r) => ({ id: idOf(r.id), message: str(r.error) || 'Failed' })),
      }
    },
    onProgress,
  )
  if (action === 'recalc') return res // scores may legitimately stay the same
  return verifyAgainstIndex(index, res, 'update', (doc, fresh) => {
    if (!doc) return false
    if (action === 'status') return doc.status === value
    if (action === 'category') return doc.category === value
    return Boolean(fresh.bySlug.get(doc.slug)?.[otherLocale(doc.locale)])
  })
}

/** POST /api/admin/articles-bulk { action: 'export' } — full depth-0 docs as JSON. */
export async function exportArticles(ids: string[]): Promise<unknown[]> {
  const out: unknown[] = []
  for (const batch of toBatches(ids, REST_CHUNK)) {
    const res = await fetch('/api/admin/articles-bulk', {
      method: 'POST',
      credentials: 'include',
      headers: JSON_HEADERS,
      body: JSON.stringify({ action: 'export', ids: batch }),
    })
    const json = await readJson(res)
    if (!res.ok) throw new Error(errorMessage(json) || describeStatus(res.status))
    out.push(...list(json?.data))
  }
  return out
}

async function restMany(method: 'PATCH' | 'DELETE', ids: string[], opts: { trashed: boolean; body?: Rec }): Promise<MutationResult> {
  const sp = new URLSearchParams({ depth: '0' })
  selectFields(sp, ['slug'])
  const and: unknown[] = [{ id: { in: ids } }]
  if (opts.trashed) {
    sp.set('trash', 'true')
    and.push({ deletedAt: { exists: true } })
  }
  appendParam(sp, 'where[and]', and)
  const res = await fetch(`${COLLECTION}?${sp}`, {
    method,
    credentials: 'include',
    headers: JSON_HEADERS,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const json = await readJson(res)
  const docs = list(json?.docs)
  const errors = list(json?.errors)
  if (!res.ok && docs.length === 0 && errors.length === 0) throw new Error(errorMessage(json) || describeStatus(res.status))
  return {
    ok: docs.map((d) => idOf(asRec(d)?.id)).filter(Boolean),
    failed: errors.map((e) => {
      const r = asRec(e)
      return { id: idOf(r?.id), message: str(r?.message) || 'Failed' }
    }),
  }
}

// Trash semantics verified against Payload 3.89 (@payloadcms/ui DeleteMany /
// RestoreMany): a REST DELETE is a PERMANENT delete even with `trash: true` on
// the collection. Moving to trash is a PATCH that sets `deletedAt`; restoring is
// a PATCH with `trash=true` that clears it. Both skip field validation, so
// half-written drafts can be trashed/restored too.

export async function trashArticles(ids: string[], index: ArticleIndex | null, onProgress?: Progress): Promise<MutationResult> {
  const deletedAt = new Date().toISOString()
  const res = await runPlanned(
    planBatches(ids, index, 'trash', REST_CHUNK),
    (batch) => restMany('PATCH', batch, { trashed: false, body: { deletedAt } }),
    onProgress,
  )
  return verifyAgainstIndex(index, res, 'trash', (doc) => Boolean(doc?.trashed))
}

export async function restoreArticles(ids: string[], index: ArticleIndex | null, onProgress?: Progress): Promise<MutationResult> {
  const res = await runPlanned(
    planBatches(ids, index, 'restore', REST_CHUNK),
    (batch) => restMany('PATCH', batch, { trashed: true, body: { deletedAt: null } }),
    onProgress,
  )
  return verifyAgainstIndex(index, res, 'restore', (doc) => Boolean(doc && !doc.trashed))
}

/** Permanent. Only matches docs that are already in trash. */
export async function deleteArticlesForever(ids: string[], index: ArticleIndex | null, onProgress?: Progress): Promise<MutationResult> {
  const res = await runPlanned(toBatches(ids, REST_CHUNK), (batch) => restMany('DELETE', batch, { trashed: true }), onProgress)
  return verifyAgainstIndex(index, res, 'update', (doc) => !doc)
}

export async function updateArticleStatus(id: string, status: Status, index: ArticleIndex | null): Promise<void> {
  const res = await fetch(`${COLLECTION}/${encodeURIComponent(id)}?depth=0&select[status]=true`, {
    method: 'PATCH',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error(errorMessage(await readJson(res)) || describeStatus(res.status))
  const verified = await verifyAgainstIndex(index, { ok: [id], failed: [] }, 'update', (doc) => doc?.status === status)
  if (verified.failed.length) throw new Error(`Status not saved: ${verified.failed[0]?.message}`)
}

/** POST /api/blog-pair — find-or-create the blank other-language draft. */
export async function pairArticle(id: string): Promise<{ id: string; locale: 'en' | 'ar'; created: boolean }> {
  const res = await fetch('/api/blog-pair', {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ id }),
  })
  const json = await readJson(res)
  if (!res.ok) throw new Error(errorMessage(json) || 'Could not create the other-language draft.')
  return { id: idOf(json?.id), locale: json?.locale === 'ar' ? 'ar' : 'en', created: json?.created === true }
}
