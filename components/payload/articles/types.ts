// Domain types + static definitions for the /admin/articles workspace.

export type Status = 'idea' | 'outline' | 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived'
export type Locale = 'en' | 'ar'

export const STATUS_ORDER: Status[] = ['idea', 'outline', 'draft', 'in_review', 'scheduled', 'published', 'archived']

export const STATUS_LABELS: Record<Status, string> = {
  idea: 'Idea',
  outline: 'Outline',
  draft: 'Draft',
  in_review: 'In review',
  scheduled: 'Scheduled',
  published: 'Published',
  archived: 'Archived',
}

// Pill tone per status (design E): emerald published, sky scheduled, violet
// review, slate everything still being written. No warm tones anywhere.
export type StatusTone = 'published' | 'scheduled' | 'review' | 'draft' | 'archived'

export const STATUS_TONE: Record<Status, StatusTone> = {
  idea: 'draft',
  outline: 'draft',
  draft: 'draft',
  in_review: 'review',
  scheduled: 'scheduled',
  published: 'published',
  archived: 'archived',
}

export const STATUS_DOT: Record<Status, string> = {
  idea: '#cbd5e1',
  outline: '#94a3b8',
  draft: '#64748b',
  in_review: '#8b5cf6',
  scheduled: '#0ea5e9',
  published: '#10b981',
  archived: '#94a3b8',
}

// Statuses offered by the bulk "Change status" menu. `scheduled` is left out on
// purpose: the collection's beforeValidate hook rejects it without a per-article
// "Scheduled at" date, so a bulk set could only ever fail.
export const BULK_STATUS_OPTIONS: Status[] = ['published', 'in_review', 'draft', 'outline', 'idea', 'archived']

export type ViewKey = 'all' | 'published' | 'scheduled' | 'drafts' | 'review' | 'trash'

export type ViewDef = { key: ViewKey; label: string; dot?: string; statuses?: Status[] }

export const VIEWS: ViewDef[] = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published', dot: '#10b981', statuses: ['published'] },
  { key: 'scheduled', label: 'Scheduled', dot: '#0ea5e9', statuses: ['scheduled'] },
  { key: 'drafts', label: 'Drafts', dot: '#94a3b8', statuses: ['draft', 'idea', 'outline'] },
  { key: 'review', label: 'In review', dot: '#8b5cf6', statuses: ['in_review'] },
  { key: 'trash', label: 'Trash' },
]

export type LangFilter = '' | 'en' | 'ar' | 'missing'
export type SeoFilter = '' | 'high' | 'mid' | 'low'
export type Layout = 'table' | 'board'
export type Density = 'comfortable' | 'compact'

export type SortField = 'title' | 'seoScore' | 'status' | 'updatedAt' | 'publishedAt' | 'scheduledAt' | 'deletedAt'
export const SORT_FIELDS: SortField[] = ['title', 'seoScore', 'status', 'updatedAt', 'publishedAt', 'scheduledAt', 'deletedAt']

export const PAGE_SIZES = [25, 50, 100]
export const DEFAULT_PAGE_SIZE = 25
export const BOARD_LIMIT = 200

// Everything that lives in the URL query string.
export type WorkspaceQuery = {
  view: ViewKey
  q: string
  categories: string[]
  authors: string[]
  lang: LangFilter
  seo: SeoFilter
  /** '' = the view's default sort; otherwise `field` or `-field`. */
  sort: string
  page: number
  limit: number
  layout: Layout
}

export type Category = { id: string; name: string; slug: string; locale: Locale }
export type Author = { id: string; name: string; avatar: string | null }

export type ArticleRow = {
  id: string
  title: string
  slug: string
  locale: Locale
  status: Status
  excerpt: string
  seoScore: number
  contentScore: number
  readingTime: number
  wordCount: number
  viewsCount: number
  category: { id: string; name: string; slug: string } | null
  author: { id: string; name: string } | null
  cover: { thumb: string | null; large: string | null; alt: string; filename: string }
  tags: string[]
  publishedAt: string | null
  scheduledAt: string | null
  updatedAt: string
  deletedAt: string | null
}

// Lightweight index of EVERY blog-post doc (trashed included): powers the tab
// counts, the EN ⇄ AR pair state on each row and the "missing translation" filter.
export type IndexDoc = {
  id: string
  slug: string
  locale: Locale
  status: Status
  title: string
  category: string | null
  trashed: boolean
}
export type PairEntry = { en?: IndexDoc; ar?: IndexDoc; enTrash?: IndexDoc; arTrash?: IndexDoc }
export type ArticleIndex = {
  docs: IndexDoc[]
  byId: Map<string, IndexDoc>
  bySlug: Map<string, PairEntry>
  counts: Record<ViewKey, number>
}

export type PairSide =
  | { kind: 'self' }
  | { kind: 'sibling'; doc: IndexDoc }
  | { kind: 'missing' }
  | { kind: 'trashed'; doc: IndexDoc }
  | { kind: 'unknown' }

export type PairInfo = Record<Locale, PairSide>

// Actions implemented by POST /api/admin/articles-bulk that this UI uses.
export type BulkAction = 'status' | 'category' | 'translate' | 'recalc' | 'export'
