import { ADMIN_TIME_ZONE, zonedParts } from '../../../lib/cms/admin/metrics.ts'

// Display formatting for the admin Overview. Every date is rendered in the admin
// time zone on the server, so client components receive finished strings and
// can't drift with the viewer's own clock settings.

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`
  let fmt = formatters.get(key)
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(locale, options)
    formatters.set(key, fmt)
  }
  return fmt
}

const zoned = (options: Intl.DateTimeFormatOptions, locale = 'en-US') => formatter(locale, { timeZone: ADMIN_TIME_ZONE, ...options })

/** A YYYY-MM-DD calendar key is already a local date — format it at UTC noon so no zone can shift it. */
const keyDate = (dateKey: string) => {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12))
}
const civil = (options: Intl.DateTimeFormatOptions, locale = 'en-US') => formatter(locale, { timeZone: 'UTC', ...options })

export const formatNumber = (n: number) => Math.round(n).toLocaleString('en-US')

/** 09:00 */
export const formatTime = (iso: string) => zoned({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(iso))

/** Sep 12 */
export const formatMonthDay = (iso: string) => zoned({ month: 'short', day: 'numeric' }).format(new Date(iso))

/** Wed 16 · 09:00 */
export function formatWeekdayTime(iso: string): string {
  const date = new Date(iso)
  const day = zoned({ weekday: 'short', day: 'numeric' }).formatToParts(date)
  const weekday = day.find((p) => p.type === 'weekday')?.value ?? ''
  const num = day.find((p) => p.type === 'day')?.value ?? ''
  return `${weekday} ${num} · ${formatTime(iso)}`
}

/** Tuesday, 15 September 2026 */
export function formatLongDate(ms: number): string {
  const parts = zoned({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, 'en-GB').formatToParts(new Date(ms))
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`
}

/** Sep 9 (from a calendar key) */
export const formatKeyMonthDay = (dateKey: string) => civil({ month: 'short', day: 'numeric' }).format(keyDate(dateKey))

/** Tue, Sep 9 (from a calendar key) */
export const formatKeyWeekdayMonthDay = (dateKey: string) => civil({ weekday: 'short', month: 'short', day: 'numeric' }).format(keyDate(dateKey))

/** Tue 9 (from a calendar key) */
export function formatKeyWeekdayDay(dateKey: string): string {
  const date = keyDate(dateKey)
  return `${civil({ weekday: 'short' }).format(date)} ${date.getUTCDate()}`
}

/** Tue (from a calendar key) */
export const formatKeyWeekday = (dateKey: string) => civil({ weekday: 'short' }).format(keyDate(dateKey))

/** Tuesday 15 September (from a calendar key) */
export const formatKeyLong = (dateKey: string) => civil({ weekday: 'long', day: 'numeric', month: 'long' }, 'en-GB').format(keyDate(dateKey))

/** Sep 14 – 20, 2026 · Sep 28 – Oct 4, 2026 · Dec 28, 2026 – Jan 3, 2027 */
export function formatWeekRange(firstKey: string, lastKey: string): string {
  const a = keyDate(firstKey)
  const b = keyDate(lastKey)
  const monthA = civil({ month: 'short' }).format(a)
  const monthB = civil({ month: 'short' }).format(b)
  if (a.getUTCFullYear() !== b.getUTCFullYear()) {
    return `${monthA} ${a.getUTCDate()}, ${a.getUTCFullYear()} – ${monthB} ${b.getUTCDate()}, ${b.getUTCFullYear()}`
  }
  const end = monthA === monthB ? `${b.getUTCDate()}` : `${monthB} ${b.getUTCDate()}`
  return `${monthA} ${a.getUTCDate()} – ${end}, ${b.getUTCFullYear()}`
}

/** 12m · 3h · 2d · Sep 3 */
export function relativeTimeShort(iso: string, now: number): string {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000)
  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return days < 7 ? `${days}d` : formatMonthDay(iso)
}

/** 12 min ago · 3 h ago · 2 days ago · Sep 12 */
export function relativeTimeLong(iso: string, now: number): string {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'yesterday'
  return days < 7 ? `${days} days ago` : formatMonthDay(iso)
}

export function greetingFor(now: number): string {
  const hour = zonedParts(now).hour
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Shared mailboxes read oddly in a greeting ("Good morning, info").
const GENERIC_MAILBOXES = new Set(['admin', 'contact', 'hello', 'info', 'office', 'support', 'team', 'sales', 'noreply', 'no-reply', 'webmaster'])

/** First word of the user's name, else the local part of their email. */
export function greetingName(user: unknown): string | null {
  const record = (user && typeof user === 'object' ? user : {}) as { name?: unknown; email?: unknown }
  const name = typeof record.name === 'string' ? record.name.trim() : ''
  if (name) return name.split(/\s+/)[0]
  const local = typeof record.email === 'string' ? record.email.split('@')[0].trim() : ''
  return local && !GENERIC_MAILBOXES.has(local.toLowerCase()) ? local : null
}

export const hasArabic = (text: string) => /[؀-ۿ]/.test(text)

/** web-development → Web development */
export function humanize(value: string): string {
  const text = value.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

export function initialsFor(name: string | null): string {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return '?'
  const letters = words.length === 1 ? words[0].slice(0, 2) : `${words[0][0]}${words[words.length - 1][0]}`
  return letters.toUpperCase()
}

export const plural = (n: number, one: string, many: string) => `${formatNumber(n)} ${n === 1 ? one : many}`

const STATUS_LABELS: Record<string, string> = {
  idea: 'an idea',
  outline: 'an outline',
  draft: 'a draft',
  in_review: 'in review',
  scheduled: 'scheduled',
  published: 'published',
  archived: 'archived',
}

export const statusPhrase = (status: string | undefined) => (status ? STATUS_LABELS[status] ?? humanize(status).toLowerCase() : 'not live')
