import type { ArticleRow, Category, SortKey, Status } from './types.ts'

const JSON_HEADERS = { 'content-type': 'application/json' }

function rel<T = any>(v: any): T | null {
  return v && typeof v === 'object' ? v : null
}

function mapDoc(d: any): ArticleRow {
  const cover = rel(d.coverImage)
  const cat = rel(d.category)
  const author = rel(d.author)
  return {
    id: String(d.id),
    title: d.title || '(untitled)',
    slug: d.slug || '',
    locale: d.locale === 'ar' ? 'ar' : 'en',
    status: (d.status || 'draft') as Status,
    excerpt: d.excerpt || '',
    seoScore: typeof d.seoScore === 'number' ? d.seoScore : 0,
    viewsCount: typeof d.viewsCount === 'number' ? d.viewsCount : 0,
    category: cat ? { id: String(cat.id), name: cat.name || cat.title || '—' } : null,
    authorName: author ? author.name || author.fullName || author.title || '' : '',
    coverThumb: cover ? cover?.sizes?.thumbnail?.url || cover?.url || null : null,
    updatedAt: d.updatedAt || d.createdAt || '',
    metaTitle: d.seo?.metaTitle || '',
    metaDescription: d.seo?.metaDescription || '',
    seoRaw: { ...(d.seo || {}), ogImage: rel(d.seo?.ogImage)?.id ?? d.seo?.ogImage ?? undefined },
  }
}

const SORT_PARAM: Record<SortKey, string> = {
  recent: '-updatedAt',
  views: '-viewsCount',
  score: '-seoScore',
}

export type ListParams = {
  q?: string
  locale?: '' | 'en' | 'ar'
  status?: '' | Status
  category?: string
  sort?: SortKey
  page?: number
  limit?: number
}

export async function fetchArticles(params: ListParams): Promise<{ rows: ArticleRow[]; totalDocs: number; totalPages: number; page: number }> {
  const sp = new URLSearchParams()
  sp.set('depth', '1')
  sp.set('limit', String(params.limit ?? 24))
  sp.set('page', String(params.page ?? 1))
  sp.set('sort', SORT_PARAM[params.sort ?? 'recent'])
  if (params.status) sp.set('where[status][equals]', params.status)
  if (params.locale) sp.set('where[locale][equals]', params.locale)
  if (params.category) sp.set('where[category][equals]', params.category)
  if (params.q) {
    sp.set('where[or][0][title][like]', params.q)
    sp.set('where[or][1][slug][like]', params.q)
    sp.set('where[or][2][excerpt][like]', params.q)
  }
  const res = await fetch(`/api/blog-posts?${sp.toString()}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Could not load articles.')
  const json = await res.json()
  return {
    rows: (json.docs || []).map(mapDoc),
    totalDocs: json.totalDocs || 0,
    totalPages: json.totalPages || 1,
    page: json.page || 1,
  }
}

// One lightweight pass to compute pipeline tab counts client-side.
export async function fetchStatusCounts(): Promise<{ counts: Record<string, number>; total: number }> {
  const res = await fetch('/api/blog-posts?depth=0&limit=1000', { credentials: 'include' })
  if (!res.ok) throw new Error('Could not load counts.')
  const json = await res.json()
  const counts: Record<string, number> = {}
  for (const d of json.docs || []) counts[d.status] = (counts[d.status] || 0) + 1
  return { counts, total: json.totalDocs || (json.docs || []).length }
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/blog-categories?depth=0&limit=100&sort=name', { credentials: 'include' })
  if (!res.ok) return []
  const json = await res.json()
  return (json.docs || []).map((c: any) => ({ id: String(c.id), name: c.name || c.title || '—' }))
}

export async function updateArticle(id: string, data: Record<string, unknown>): Promise<ArticleRow> {
  const res = await fetch(`/api/blog-posts/${id}?depth=1`, {
    method: 'PATCH',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.errors?.[0]?.message || json?.message || 'Update failed.')
  return mapDoc(json.doc || json)
}

export async function bulkAction(action: string, ids: string[], value?: string): Promise<{ results?: Array<{ id: string; ok: boolean; error?: string }>; data?: any[] }> {
  const res = await fetch('/api/admin/articles-bulk', {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ action, ids, value }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || 'Bulk action failed.')
  return json
}

export async function optimizeArticle(id: string): Promise<{ applied: string[]; warnings: string[] }> {
  const res = await fetch('/api/admin/article-optimize', {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ id }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || 'Optimization failed.')
  return { applied: json.applied || [], warnings: json.warnings || [] }
}

export async function pairArticle(id: string): Promise<{ id: string; locale: string; created: boolean }> {
  const res = await fetch('/api/blog-pair', {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ id }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || 'Could not create the translation sibling.')
  return json
}
