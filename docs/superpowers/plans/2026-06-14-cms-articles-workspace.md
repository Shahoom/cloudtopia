# Articles Workspace (M3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Checkbox (`- [ ]`) steps.

**Goal:** A custom `/admin/articles` workspace to manage every article from one surface — list + kanban board, inline quick-edit, per-row AI optimize / translate / preview, and bulk actions — on the existing `blog-posts` data.

**Architecture:** A custom Payload admin view (`admin.components.views.articlesWorkspace`, `path: '/articles'`) renders a thin server wrapper → a `'use client'` workspace. Reads/updates use Payload's built-in REST API (`GET/PATCH /api/blog-posts`) with cookie auth (`credentials: 'include'`). Two small new custom endpoints handle multi-doc work server-side: `/api/admin/articles-bulk` and `/api/admin/article-optimize` (the latter reuses the existing `runOptimize`, now exported). Additive only; all writes go through Payload so hooks (score recompute, revalidation) run. Inline edits send only changed fields.

**Tech stack:** Payload 3.84 custom views + REST, Next 16 RSC/client, lucide-react. Cyan theme via `--theme-*` tokens (matches the cockpit).

**Branch:** `feature/cms-foundation`. **Spec:** `docs/superpowers/specs/2026-06-14-cms-foundation-design.md` (M3).

---

## File structure

| File | Action | Responsibility |
|---|---|---|
| `lib/blog/lexical-text.ts` | Create | `lexicalToPlainText(content)` server util (shared by optimize endpoint) |
| `lib/cms/blog-ai-endpoint.ts` | Modify | `export` the existing `runOptimize` (additive export only) |
| `lib/cms/admin/articles-bulk-endpoint.ts` | Create | `handleArticlesBulkEndpoint` — publish/status/category/translate/delete/export |
| `lib/cms/admin/article-optimize-endpoint.ts` | Create | `handleArticleOptimizeEndpoint` — fetch → runOptimize → partial patch |
| `payload.config.ts` | Modify | Register the 2 endpoints + the `/articles` view |
| `components/payload/ArticlesWorkspaceView.tsx` | Create | Server wrapper rendering the client workspace |
| `components/payload/articles/types.ts` | Create | Shared client types |
| `components/payload/articles/api.ts` | Create | Client fetch helpers (list, categories, update, bulk, optimize, pair) |
| `components/payload/articles/ArticlesWorkspace.tsx` | Create | `'use client'` container: toolbar, filters, pipeline tabs, view switch, selection |
| `components/payload/articles/ArticleListView.tsx` | Create | Card list + inline quick-edit |
| `components/payload/articles/ArticleBoardView.tsx` | Create | Kanban board, drag → status PATCH |
| `components/payload/AdminChrome.tsx` | Modify | Point the "Articles" nav link at `/admin/articles` |

---

## Endpoint contracts

### `POST /api/admin/article-optimize`
Body `{ id: string|number }`. Auth required. Steps: `findByID` (depth 0) → `lexicalToPlainText(content)` → `runOptimize({ title, excerpt, focusKeyword, locale, contentPlain })` → `update` with `seo.metaTitle/metaDescription/focusKeyword` always, and `excerpt/shortExcerpt/slug` only when currently empty (never clobber author copy). Response `{ ok: true, applied: string[], warnings: string[] }` or `{ error }`.

### `POST /api/admin/articles-bulk`
Body `{ action: 'publish'|'status'|'category'|'translate'|'delete'|'export', ids: (string|number)[], value?: string }`. Auth required. Iterates per id via Payload local API (`overrideAccess`, so hooks run):
- `publish` → `update {status:'published'}`
- `status` → `update {status: value}`
- `category` → `update {category: value}`
- `translate` → run the same find-or-create-sibling logic as `/api/blog-pair` per id
- `delete` → `delete`
- `export` → return `{ ok, data: docs }` (selected docs, depth 0) for client to download as JSON
Response `{ ok: true, results: Array<{ id, ok: boolean, error?: string }> , data?: any[] }`.

---

## Tasks

### Task 1: Shared server util + export runOptimize
**Files:** Create `lib/blog/lexical-text.ts`; Modify `lib/cms/blog-ai-endpoint.ts`.

- [ ] **Step 1:** Create `lib/blog/lexical-text.ts`:

```ts
export function lexicalToPlainText(content: unknown): string {
  const acc: string[] = []
  const walk = (node: any) => {
    if (!node || typeof node !== 'object') return
    if (typeof node.text === 'string') acc.push(node.text)
    if (Array.isArray(node.children)) for (const c of node.children) walk(c)
  }
  walk((content as any)?.root)
  return acc.join(' ').replace(/\s+/g, ' ').trim()
}
```

- [ ] **Step 2:** In `lib/cms/blog-ai-endpoint.ts`, change `async function runOptimize(` to `export async function runOptimize(` (export only; no logic change).

- [ ] **Step 3:** Build check: `npx tsc --noEmit` (expect 0 errors). Commit.

### Task 2: article-optimize endpoint
**Files:** Create `lib/cms/admin/article-optimize-endpoint.ts`.

- [ ] **Step 1:** Implement:

```ts
import type { PayloadRequest } from 'payload'
import { runOptimize } from '../blog-ai-endpoint.ts'
import { lexicalToPlainText } from '../../blog/lexical-text.ts'

async function parseBody(req: PayloadRequest): Promise<{ id?: string | number }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try { const t = await req.text?.(); if (t) return JSON.parse(t) } catch {}
  return {}
}

export async function handleArticleOptimizeEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  const { id } = await parseBody(req)
  if (!id) return Response.json({ error: 'Missing article id.' }, { status: 400 })

  const doc: any = await req.payload.findByID({ collection: 'blog-posts' as any, id, depth: 0, draft: true, overrideAccess: true, req }).catch(() => null)
  if (!doc) return Response.json({ error: 'Article not found.' }, { status: 404 })

  const out: any = await runOptimize({
    title: doc.title || '', excerpt: doc.excerpt || '', focusKeyword: doc.seo?.focusKeyword || '',
    locale: doc.locale || 'en', contentPlain: lexicalToPlainText(doc.content),
  })

  const applied: string[] = []
  const data: Record<string, any> = { seo: { ...(doc.seo || {}) } }
  const setSeo = (k: string, v: any, label: string) => { if (v) { data.seo[k] = v; applied.push(label) } }
  setSeo('metaTitle', out.metaTitle, 'Meta title')
  setSeo('metaDescription', out.metaDescription, 'Meta description')
  setSeo('focusKeyword', out.focusKeyword, 'Focus keyword')
  if (!doc.excerpt && out.excerpt) { data.excerpt = out.excerpt; applied.push('Excerpt') }
  if (!doc.shortExcerpt && out.shortExcerpt) { data.shortExcerpt = out.shortExcerpt; applied.push('Short excerpt') }

  await req.payload.update({ collection: 'blog-posts' as any, id, data, draft: doc.status !== 'published', overrideAccess: true, req, context: { skipAutoTranslate: true } })
  return Response.json({ ok: true, applied, warnings: Array.isArray(out.warnings) ? out.warnings : [] })
}
```

- [ ] **Step 2:** `npx tsc --noEmit`; commit.

### Task 3: articles-bulk endpoint
**Files:** Create `lib/cms/admin/articles-bulk-endpoint.ts`.

- [ ] **Step 1:** Implement publish/status/category/translate/delete/export. Translate reuses the counterpart logic (copy structural fields, create blank draft sibling if missing). Each op wrapped per-id so one failure doesn't abort the batch:

```ts
import type { PayloadRequest } from 'payload'

type Action = 'publish' | 'status' | 'category' | 'translate' | 'delete' | 'export'

async function parseBody(req: PayloadRequest): Promise<{ action?: Action; ids?: any[]; value?: string }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try { const t = await req.text?.(); if (t) return JSON.parse(t) } catch {}
  return {}
}

async function ensureSibling(req: PayloadRequest, id: any) {
  const src: any = await req.payload.findByID({ collection: 'blog-posts' as any, id, depth: 0, draft: true, overrideAccess: true, req })
  if (!src?.slug) throw new Error('needs slug')
  const other = src.locale === 'ar' ? 'en' : 'ar'
  const existing = await req.payload.find({ collection: 'blog-posts' as any, depth: 0, limit: 1, draft: true, overrideAccess: true, req, where: { and: [{ slug: { equals: src.slug } }, { locale: { equals: other } }] } })
  if (existing.docs[0]?.id) return existing.docs[0].id
  const relId = (v: any) => (v && typeof v === 'object' ? v.id ?? v : v)
  const created = await req.payload.create({ collection: 'blog-posts' as any, draft: true, overrideAccess: true, req, context: { skipAutoTranslate: true }, data: {
    locale: other, slug: src.slug, status: 'draft', title: '', excerpt: '',
    content: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [] }] } },
    author: relId(src.author), category: relId(src.category), coverImage: relId(src.coverImage),
    contentType: src.contentType, difficulty: src.difficulty,
  } })
  return created.id
}

export async function handleArticlesBulkEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  const { action, ids, value } = await parseBody(req)
  if (!action || !Array.isArray(ids) || ids.length === 0) return Response.json({ error: 'action and ids are required.' }, { status: 400 })

  if (action === 'export') {
    const docs = await req.payload.find({ collection: 'blog-posts' as any, depth: 0, limit: ids.length, overrideAccess: true, req, where: { id: { in: ids } } })
    return Response.json({ ok: true, data: docs.docs })
  }

  const results: Array<{ id: any; ok: boolean; error?: string }> = []
  for (const id of ids) {
    try {
      if (action === 'delete') await req.payload.delete({ collection: 'blog-posts' as any, id, overrideAccess: true, req })
      else if (action === 'publish') await req.payload.update({ collection: 'blog-posts' as any, id, data: { status: 'published' }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      else if (action === 'status') await req.payload.update({ collection: 'blog-posts' as any, id, data: { status: value }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      else if (action === 'category') await req.payload.update({ collection: 'blog-posts' as any, id, data: { category: value }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      else if (action === 'translate') await ensureSibling(req, id)
      results.push({ id, ok: true })
    } catch (e: any) {
      results.push({ id, ok: false, error: e?.message || 'failed' })
    }
  }
  return Response.json({ ok: true, results })
}
```

- [ ] **Step 2:** Register both endpoints + the view in `payload.config.ts` (add imports; push to `endpoints`; add to `admin.components.views`):

```ts
// endpoints: add
{ path: '/admin/articles-bulk', method: 'post', handler: handleArticlesBulkEndpoint },
{ path: '/admin/article-optimize', method: 'post', handler: handleArticleOptimizeEndpoint },
// admin.components.views: add
articlesWorkspace: { Component: '@/components/payload/ArticlesWorkspaceView#ArticlesWorkspaceView', path: '/articles', exact: true },
```

- [ ] **Step 3:** `npx tsc --noEmit`; commit.

### Task 4: Client workspace — types + api helpers
**Files:** Create `components/payload/articles/types.ts`, `components/payload/articles/api.ts`.

- [ ] **Step 1:** `types.ts` — `ArticleRow` (id, title, slug, locale, status, excerpt, seoScore, viewsCount, category {id,name}, coverImage thumbnail url, updatedAt), `Category` (id, name), `Status` union, `STATUS_ORDER`, `STATUS_LABELS`.

- [ ] **Step 2:** `api.ts` — cookie-auth fetch helpers:
  - `fetchArticles({ q, locale, status, category, sort, page })` → `GET /api/blog-posts?...` building `where[...]` params, `depth: 1`, `limit: 24`. Returns `{ docs, totalDocs, totalPages }`.
  - `fetchCategories()` → `GET /api/blog-categories?limit=100&depth=0`.
  - `updateArticle(id, data)` → `PATCH /api/blog-posts/:id` (partial; `credentials:'include'`).
  - `bulk(action, ids, value?)` → `POST /api/admin/articles-bulk`.
  - `optimize(id)` → `POST /api/admin/article-optimize`.
  - `pair(id)` → `POST /api/blog-pair`.
  All use `credentials: 'include'`, JSON, and throw on non-ok with the server `error`.

- [ ] **Step 3:** `npx tsc --noEmit`; commit.

### Task 5: List view + inline quick-edit
**Files:** Create `components/payload/articles/ArticleListView.tsx`.

- [ ] **Step 1:** Render the article cards (cover thumb, title, category·author·date, EN/AR chips, SEO score pill colored by score, views, status dot, per-row icon buttons: quick-edit, AI optimize, translate, preview, more). Quick-edit expands the card into a form (title, status select, category select, excerpt, seo.metaTitle, seo.metaDescription) → on save call `updateArticle(id, changedFieldsOnly)` and refresh the row. Per-row: AI optimize → `optimize(id)` then refresh + toast applied list; translate → `pair(id)` then toast + link to sibling; preview → open `/${locale}/articles/${slug}`; edit/more → link to `/admin/collections/blog-posts/${id}`. Cyan theme via `--theme-*`.

- [ ] **Step 2:** `npx tsc --noEmit`; commit.

### Task 6: Board view (kanban)
**Files:** Create `components/payload/articles/ArticleBoardView.tsx`.

- [ ] **Step 1:** Columns per `STATUS_ORDER`. Cards are native-draggable (`draggable`, `onDragStart` sets id, column `onDragOver`/`onDrop`). On drop into a column, call `updateArticle(id, { status })` (and let the server hook set `publishedAt` when → published) and move the card optimistically. Compact card (title, locale, SEO pill). Cyan theme.

- [ ] **Step 2:** `npx tsc --noEmit`; commit.

### Task 7: Container + view registration wrapper + nav link
**Files:** Create `components/payload/articles/ArticlesWorkspace.tsx`, `components/payload/ArticlesWorkspaceView.tsx`; Modify `components/payload/AdminChrome.tsx`.

- [ ] **Step 1:** `ArticlesWorkspace.tsx` (`'use client'`): header (+ New article / Import MDX buttons), toolbar (search input, locale filter, category filter, list/board toggle), pipeline tabs with live counts (from a status-count fetch), selection bar with bulk actions, then `<ArticleListView>` or `<ArticleBoardView>`. Manages data fetching + refresh. Loading + empty + error states.

- [ ] **Step 2:** `ArticlesWorkspaceView.tsx` (server, no `'use client'`): `export function ArticlesWorkspaceView() { return <ArticlesWorkspace /> }` — thin wrapper so the registered view (which receives non-serializable server props) renders the client tree.

- [ ] **Step 3:** In `AdminChrome.tsx`, change the Articles nav link `href` from `/admin/collections/blog-posts` to `/admin/articles`.

- [ ] **Step 4:** `npm run build`; commit.

### Task 8: Verify
- [ ] **Step 1:** `npm run build` succeeds; `npm run test:smoke` shows no NEW failures (4 pre-existing remain).
- [ ] **Step 2:** Note: live click-through (drag, quick-edit save, bulk, optimize) verified on the preview deploy with the founder, since it needs admin auth + data.

---

## Self-review notes
- **Data safety:** quick-edit/bulk send only changed fields; deletes are confirmed in the UI; all writes via Payload local/REST so hooks run; `context.skipAutoTranslate` passed where relevant.
- **Reuse:** `runOptimize` and the sibling-pairing logic are reused, not reinvented.
- **Deferred:** "duplicate" in the more-menu and CSV export (export ships as JSON) can come later; not blocking.
