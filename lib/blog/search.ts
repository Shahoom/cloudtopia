export type BlogSearchSort = 'latest' | 'featured' | 'popular' | 'guides'

export type BlogSearchOptions = {
  search?: string
  category?: string
  tag?: string
  contentType?: string
  serviceFocus?: string
  sort?: BlogSearchSort | string
}

type SearchablePost = {
  title?: string | null
  excerpt?: string | null
  shortExcerpt?: string | null
  slug?: string | null
  publishedAt?: string | null
  featured?: boolean | null
  pinned?: boolean | null
  trending?: boolean | null
  viewsCount?: number | null
  contentType?: string | null
  serviceFocus?: string[] | string | null
  author?: { name?: string | null; slug?: string | null } | null
  category?: { name?: string | null; slug?: string | null } | null
  tags?: Array<{ name?: string | null; slug?: string | null }> | null
}

function normalize(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(normalize).filter(Boolean)
  const text = normalize(value)
  return text ? [text] : []
}

function dateValue(value: unknown) {
  const time = new Date(String(value || '')).getTime()
  return Number.isFinite(time) ? time : 0
}

function contains(value: unknown, target?: string) {
  if (!target) return true
  return normalize(value) === normalize(target)
}

function searchableText(post: SearchablePost) {
  return [
    post.title,
    post.excerpt,
    post.shortExcerpt,
    post.slug,
    post.category?.name,
    post.category?.slug,
    post.author?.name,
    post.author?.slug,
    post.contentType,
    ...normalizeList(post.serviceFocus),
    ...(post.tags || []).flatMap((tag) => [tag.name, tag.slug]),
  ]
    .map(normalize)
    .filter(Boolean)
    .join(' ')
}

export function filterAndSortBlogPosts<T extends SearchablePost>(posts: T[], options: BlogSearchOptions = {}): T[] {
  const search = normalize(options.search)
  const sort = options.sort || 'latest'

  const filtered = posts.filter((post) => {
    if (options.category && !contains(post.category?.slug, options.category)) return false
    if (options.tag && !(post.tags || []).some((tag) => contains(tag.slug, options.tag))) return false
    if (options.contentType && !contains(post.contentType, options.contentType)) return false
    if (options.serviceFocus && !normalizeList(post.serviceFocus).includes(normalize(options.serviceFocus))) return false
    if (!search) return true
    return searchableText(post).includes(search)
  })

  if (sort === 'guides') {
    return filtered
      .filter((post) => post.contentType === 'guide')
      .sort((a, b) => dateValue(b.publishedAt) - dateValue(a.publishedAt))
  }

  return [...filtered].sort((a, b) => {
    if (sort === 'featured') {
      const pinnedDelta = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned))
      if (pinnedDelta) return pinnedDelta
      const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      if (featuredDelta) return featuredDelta
      const trendingDelta = Number(Boolean(b.trending)) - Number(Boolean(a.trending))
      if (trendingDelta) return trendingDelta
    }

    if (sort === 'popular') {
      const viewsDelta = Number(b.viewsCount || 0) - Number(a.viewsCount || 0)
      if (viewsDelta) return viewsDelta
    }

    return dateValue(b.publishedAt) - dateValue(a.publishedAt)
  })
}
