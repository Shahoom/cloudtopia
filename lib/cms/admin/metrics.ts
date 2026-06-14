import type { Delta } from './types.ts'

// Period-over-period change as a rounded percentage + direction. A zero baseline
// with any current activity reads as +100% up (rather than dividing by zero).
export function computeDelta(current: number, previous: number): Delta {
  if (previous === 0) {
    return current === 0 ? { pct: 0, direction: 'flat' } : { pct: 100, direction: 'up' }
  }
  const change = ((current - previous) / previous) * 100
  const pct = Math.round(Math.abs(change))
  if (pct === 0) return { pct: 0, direction: 'flat' }
  return { pct, direction: change > 0 ? 'up' : 'down' }
}

// Count EN articles that have no AR sibling sharing the same slug. Articles are
// paired across locales by slug (see the (slug, locale) composite index).
export function countMissingArSiblings(posts: Array<{ slug: string; locale: string }>): number {
  const arSlugs = new Set(posts.filter((p) => p.locale === 'ar').map((p) => p.slug))
  return posts.filter((p) => p.locale === 'en' && !arSlugs.has(p.slug)).length
}
