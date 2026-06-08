export type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  value?: unknown
  children?: LexicalNode[]
  fields?: Record<string, unknown>
  [key: string]: unknown
}

export type TableOfContentsItem = {
  id: string
  title: string
  level: 2 | 3
}

export function slugify(value: string | null | undefined) {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)

  return slug || 'untitled'
}

export function extractLexicalPlainText(content: unknown): string {
  const pieces: string[] = []

  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return

    const current = node as LexicalNode
    if (typeof current.text === 'string') {
      pieces.push(current.text)
    }

    const children = Array.isArray(current.children)
      ? current.children
      : current.root && typeof current.root === 'object' && Array.isArray((current.root as LexicalNode).children)
        ? ((current.root as LexicalNode).children as LexicalNode[])
        : []

    children.forEach(walk)
  }

  walk(content)
  return pieces
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function calculateReadingTime(content: unknown, wordsPerMinute = 220) {
  const text = typeof content === 'string' ? content : extractLexicalPlainText(content)
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function normalizeMediaUrl(url: string | null | undefined): string {
  if (!url) return ''

  const apiPrefix = '/api/media/file/'
  const normalized = url.startsWith(apiPrefix)
    ? `/uploads/${decodeURIComponent(url.slice(apiPrefix.length))}`
    : url

  try {
    return encodeURI(normalized)
  } catch {
    return normalized
  }
}

export function buildTableOfContents(content: unknown): TableOfContentsItem[] {
  const items: TableOfContentsItem[] = []
  const usedIds = new Map<string, number>()

  function uniqueId(title: string) {
    const base = slugify(title)
    const count = usedIds.get(base) || 0
    usedIds.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }

  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return
    const current = node as LexicalNode
    const tag = typeof current.tag === 'string' ? current.tag : ''

    if (current.type === 'heading' && (tag === 'h2' || tag === 'h3')) {
      const title = extractLexicalPlainText(current)
      if (title) {
        items.push({
          id: uniqueId(title),
          title,
          level: tag === 'h2' ? 2 : 3,
        })
      }
    }

    const children = Array.isArray(current.children)
      ? current.children
      : current.root && typeof current.root === 'object' && Array.isArray((current.root as LexicalNode).children)
        ? ((current.root as LexicalNode).children as LexicalNode[])
        : []

    children.forEach(walk)
  }

  walk(content)
  return items
}

export function getRelationId(value: unknown): string | number | null {
  if (!value) return null
  if (typeof value === 'string' || typeof value === 'number') return value
  if (typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: string | number }).id
    return id || null
  }
  return null
}

export function toIsoDate(value: unknown): string {
  if (typeof value === 'string' && value) return value
  return new Date().toISOString()
}

export function extractKeyTakeaways(contentBlocks: unknown): { title?: string; summary?: string; items: string[] } {
  if (!Array.isArray(contentBlocks)) return { items: [] }
  const first = contentBlocks.find(
    (block): block is Record<string, unknown> =>
      Boolean(block) &&
      typeof block === 'object' &&
      (String((block as Record<string, unknown>).blockType) === 'calloutBlock' ||
        String((block as Record<string, unknown>).blockType) === 'callout'),
  )
  if (!first) return { items: [] }
  const content = typeof first.content === 'string' ? first.content : ''
  const title = typeof first.title === 'string' ? first.title : undefined
  const raw = content.split(/(?:\.\s+|\n)+/).filter(Boolean).slice(0, 5)
  return { title, items: raw }
}
