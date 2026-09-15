import type { ArticleIndex, IndexDoc, Locale, PairInfo, PairSide } from './types.ts'

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const otherLocale = (l: Locale): Locale => (l === 'ar' ? 'en' : 'ar')
export const localeName = (l: Locale): string => (l === 'ar' ? 'Arabic' : 'English')

// ---------------------------------------------------------------- dates

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const dayFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
const fullFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const SEC = 1000
const MIN = 60 * SEC
const HOUR = 60 * MIN
const DAY = 24 * HOUR

export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

/** "Sep 2, 2026" */
export function fmtDate(value: string | null | undefined): string {
  const d = parseDate(value)
  return d ? dateFmt.format(d) : '—'
}

/** "Sep 16" this year, "Sep 16, 2025" otherwise. */
export function fmtDay(value: string | null | undefined): string {
  const d = parseDate(value)
  if (!d) return '—'
  return d.getFullYear() === new Date().getFullYear() ? dayFmt.format(d) : dateFmt.format(d)
}

/** "09:00" */
export function fmtTime(value: string | null | undefined): string {
  const d = parseDate(value)
  return d ? timeFmt.format(d) : ''
}

/** "Tue, Sep 16, 2026, 09:00" */
export function fmtFull(value: string | null | undefined): string {
  const d = parseDate(value)
  return d ? fullFmt.format(d) : ''
}

/** "2 hours ago", "yesterday", "in 3 days". */
export function relativeTime(value: string | null | undefined, now = Date.now()): string {
  const d = parseDate(value)
  if (!d) return '—'
  const diff = d.getTime() - now
  const abs = Math.abs(diff)
  if (abs < 45 * SEC) return diff <= 0 ? 'just now' : 'in a moment'
  if (abs < 45 * MIN) return rtf.format(Math.round(diff / MIN), 'minute')
  if (abs < 22 * HOUR) return rtf.format(Math.round(diff / HOUR), 'hour')
  if (abs < 7 * DAY) return rtf.format(Math.round(diff / DAY), 'day')
  if (abs < 30 * DAY) return rtf.format(Math.round(diff / (7 * DAY)), 'week')
  if (abs < 365 * DAY) return rtf.format(Math.round(diff / (30 * DAY)), 'month')
  return rtf.format(Math.round(diff / (365 * DAY)), 'year')
}

/** Compact past offset for 12px meta lines: "5m ago", "3h ago", "2d ago", "Sep 9". */
export function shortAgo(value: string | null | undefined, now = Date.now()): string {
  const d = parseDate(value)
  if (!d) return ''
  const abs = now - d.getTime()
  if (abs < MIN) return 'just now'
  if (abs < HOUR) return `${Math.floor(abs / MIN)}m ago`
  if (abs < DAY) return `${Math.floor(abs / HOUR)}h ago`
  if (abs < 30 * DAY) return `${Math.floor(abs / DAY)}d ago`
  return fmtDay(value)
}

// ---------------------------------------------------------------- numbers & text

export const fmtNumber = (n: number): string => n.toLocaleString('en-US')

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${fmtNumber(n)} ${n === 1 ? one : many}`
}

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return '?'
  const first = Array.from(words[0])[0] || ''
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] || '' : ''
  return (first + last).toUpperCase()
}

function hashString(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

// Cool-toned palette only (indigo, sky, violet, emerald, slate, cyan, blue).
const CATEGORY_COLORS = ['#6366f1', '#0ea5e9', '#8b5cf6', '#10b981', '#64748b', '#06b6d4', '#3b82f6', '#94a3b8']

export function categoryColor(key: string): string {
  return CATEGORY_COLORS[hashString(key) % CATEGORY_COLORS.length]
}

/** 1..6 — maps to the .ct-articles-av-N gradient classes. */
export function avatarTone(key: string): number {
  return (hashString(key) % 6) + 1
}

export type SeoBand = 'high' | 'mid' | 'low'

export function seoBand(score: number): SeoBand {
  if (score >= 80) return 'high'
  if (score >= 50) return 'mid'
  return 'low'
}

export const SEO_COLORS: Record<SeoBand, string> = { high: '#10b981', mid: '#0ea5e9', low: '#e11d48' }

// ---------------------------------------------------------------- EN ⇄ AR pairs

const trashKey = (l: Locale) => (l === 'ar' ? 'arTrash' : 'enTrash') as 'arTrash' | 'enTrash'

function siblingSide(index: ArticleIndex | null, slug: string, locale: Locale): PairSide {
  if (!index) return { kind: 'unknown' }
  if (!slug) return { kind: 'missing' }
  const entry = index.bySlug.get(slug)
  const live = entry?.[locale]
  if (live) return { kind: 'sibling', doc: live }
  const trashed = entry?.[trashKey(locale)]
  if (trashed) return { kind: 'trashed', doc: trashed }
  return { kind: 'missing' }
}

export function pairFor(index: ArticleIndex | null, row: { locale: Locale; slug: string }): PairInfo {
  const other = otherLocale(row.locale)
  const side = siblingSide(index, row.slug, other)
  return row.locale === 'en' ? { en: { kind: 'self' }, ar: side } : { en: side, ar: { kind: 'self' } }
}

/** Live docs whose other-language version does not exist (or is in trash). */
export function missingTranslationIds(index: ArticleIndex): string[] {
  return index.docs
    .filter((d) => !d.trashed && !index.bySlug.get(d.slug)?.[otherLocale(d.locale)])
    .map((d) => d.id)
}

/**
 * Subset of `ids` for which a blank sibling can actually be created. A sibling
 * sitting in trash still holds the (slug, locale) unique index, so creating a
 * new one would fail — those need a restore instead.
 */
export function translatableIds(index: ArticleIndex | null, ids: Iterable<string>): string[] {
  if (!index) return []
  const out: string[] = []
  for (const id of ids) {
    const d: IndexDoc | undefined = index.byId.get(id)
    if (!d || d.trashed || !d.slug) continue
    const entry = index.bySlug.get(d.slug)
    const other = otherLocale(d.locale)
    if (!entry?.[other] && !entry?.[trashKey(other)]) out.push(id)
  }
  return out
}
