export type Status = 'idea' | 'outline' | 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived'

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

// Status dot colors — fixed hex so they read in both light and dark mode.
export const STATUS_DOT: Record<Status, string> = {
  idea: '#94a3b8',
  outline: '#94a3b8',
  draft: '#d97706',
  in_review: '#0ea5e9',
  scheduled: '#7c3aed',
  published: '#16a34a',
  archived: '#64748b',
}

export type Category = { id: string; name: string }

export type ArticleRow = {
  id: string
  title: string
  slug: string
  locale: 'en' | 'ar'
  status: Status
  excerpt: string
  seoScore: number
  viewsCount: number
  category: Category | null
  authorName: string
  coverThumb: string | null
  updatedAt: string
  metaTitle: string
  metaDescription: string
  // Full existing seo object (ogImage normalized to id) so quick-edit can merge
  // metaTitle/metaDescription without dropping focusKeyword/canonical/etc.
  seoRaw: Record<string, unknown>
}

export type SortKey = 'recent' | 'views' | 'score'
