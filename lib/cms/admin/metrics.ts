import type {
  CalendarDay,
  CalendarEntry,
  CalendarLocaleInfo,
  ContentHealth,
  Delta,
  FeedItem,
  LeadCountry,
  LeadSource,
  OverviewKpis,
  PeriodSeries,
  PostRow,
  PublishingWeek,
  RangeKey,
  SeoBucket,
  TopArticleRow,
} from './types.ts'

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

// Posts (either locale) whose same-slug sibling in the other locale is missing.
export function listUnpairedPosts(
  posts: Array<{ slug: string; locale: string; title?: string }>,
): Array<{ slug: string; locale: string; title: string }> {
  const slugsByLocale = new Map<string, Set<string>>([
    ['en', new Set()],
    ['ar', new Set()],
  ])
  for (const p of posts) {
    if (p.slug && (p.locale === 'en' || p.locale === 'ar')) slugsByLocale.get(p.locale)!.add(p.slug)
  }
  return posts
    .filter((p) => {
      if (!p.slug || (p.locale !== 'en' && p.locale !== 'ar')) return false
      const other = p.locale === 'en' ? 'ar' : 'en'
      return !slugsByLocale.get(other)!.has(p.slug)
    })
    .map((p) => ({ slug: p.slug, locale: p.locale, title: p.title || p.slug }))
}

// Count EN articles that have no AR sibling sharing the same slug. Articles are
// paired across locales by slug (see the (slug, locale) composite index).
export function countMissingArSiblings(posts: Array<{ slug: string; locale: string }>): number {
  const arSlugs = new Set(posts.filter((p) => p.locale === 'ar').map((p) => p.slug))
  return posts.filter((p) => p.locale === 'en' && !arSlugs.has(p.slug)).length
}

// ── Calendar time in the admin time zone ─────────────────────────────────────

export const ADMIN_TIME_ZONE = 'Asia/Muscat'
export const DAY_MS = 86_400_000

export type ZonedParts = { year: number; month: number; day: number; hour: number; minute: number; weekday: number }

const WEEKDAY_INDEX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }
const partsFormatters = new Map<string, Intl.DateTimeFormat>()

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = partsFormatters.get(timeZone)
  if (!fmt) {
    fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    partsFormatters.set(timeZone, fmt)
  }
  return fmt
}

/** Wall-clock parts of an instant in `timeZone`. weekday: 0 = Monday … 6 = Sunday. */
export function zonedParts(at: number, timeZone = ADMIN_TIME_ZONE): ZonedParts {
  const out: ZonedParts = { year: 0, month: 0, day: 0, hour: 0, minute: 0, weekday: 0 }
  for (const part of partsFormatter(timeZone).formatToParts(new Date(at))) {
    if (part.type === 'weekday') out.weekday = WEEKDAY_INDEX[part.value] ?? 0
    else if (part.type === 'year' || part.type === 'month' || part.type === 'day' || part.type === 'hour' || part.type === 'minute') {
      out[part.type] = Number(part.value)
    }
  }
  if (out.hour === 24) out.hour = 0
  return out
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/** YYYY-MM-DD of the calendar day containing `at` in `timeZone`. */
export function zonedDateKey(at: number, timeZone = ADMIN_TIME_ZONE): string {
  const p = zonedParts(at, timeZone)
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}`
}

/** Pure calendar arithmetic on a YYYY-MM-DD key. */
export function shiftDateKey(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

function zoneOffsetMs(at: number, timeZone: string): number {
  const p = zonedParts(at, timeZone)
  const seconds = new Date(at).getUTCSeconds()
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, seconds) - (at - (at % 1000))
}

/** UTC instant of local midnight at the start of `dateKey` in `timeZone`. */
export function zonedMidnight(dateKey: string, timeZone = ADMIN_TIME_ZONE): number {
  const [y, m, d] = dateKey.split('-').map(Number)
  const wall = Date.UTC(y, m - 1, d)
  const first = wall - zoneOffsetMs(wall, timeZone)
  return wall - zoneOffsetMs(first, timeZone)
}

export const RANGE_DAYS: Record<RangeKey, number> = { '7d': 7, '28d': 28, '90d': 90 }

export function parseRange(value: unknown): RangeKey {
  const v = Array.isArray(value) ? value[0] : value
  return v === '28d' || v === '90d' ? v : '7d'
}

export function parseWeekOffset(value: unknown): number {
  const v = Array.isArray(value) ? value[0] : value
  const n = typeof v === 'string' && /^-?\d{1,3}$/.test(v) ? Number(v) : 0
  return Math.max(-52, Math.min(52, n))
}

export type PeriodBounds = {
  days: number
  currentDays: string[]
  previousDays: string[]
  /** Local midnight of the first day of the current period. */
  currentStart: number
  previousStart: number
  /** now − period: comparing against this keeps partial "today" fair. */
  previousCut: number
  now: number
}

/** The current period is the last `days` calendar days including today. */
export function periodBounds(now: number, days: number, timeZone = ADMIN_TIME_ZONE): PeriodBounds {
  const firstCurrent = shiftDateKey(zonedDateKey(now, timeZone), -(days - 1))
  const firstPrevious = shiftDateKey(firstCurrent, -days)
  return {
    days,
    currentDays: Array.from({ length: days }, (_, i) => shiftDateKey(firstCurrent, i)),
    previousDays: Array.from({ length: days }, (_, i) => shiftDateKey(firstPrevious, i)),
    currentStart: zonedMidnight(firstCurrent, timeZone),
    previousStart: zonedMidnight(firstPrevious, timeZone),
    previousCut: now - days * DAY_MS,
    now,
  }
}

export type WeekBounds = { days: string[]; start: number; end: number; today: string }

/** Monday–Sunday week containing `now`, shifted by `offset` weeks. */
export function weekBounds(now: number, offset = 0, timeZone = ADMIN_TIME_ZONE): WeekBounds {
  const today = zonedDateKey(now, timeZone)
  const monday = shiftDateKey(today, -zonedParts(now, timeZone).weekday + offset * 7)
  return {
    days: Array.from({ length: 7 }, (_, i) => shiftDateKey(monday, i)),
    start: zonedMidnight(monday, timeZone),
    end: zonedMidnight(shiftDateKey(monday, 7), timeZone),
    today,
  }
}

// vercel.json runs /api/cron/publish-scheduled daily at 04:00 UTC (08:00 in
// Muscat). Vercel may start a cron anywhere inside its hour, hence the grace.
export const PUBLISH_CRON_UTC_HOUR = 4
const PUBLISH_CRON_GRACE_MS = 60 * 60_000

/** The latest publish-cron run that should already have finished at `now`. */
export function lastPublishRun(now: number): number {
  const d = new Date(now)
  const run = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), PUBLISH_CRON_UTC_HOUR)
  return run + PUBLISH_CRON_GRACE_MS > now ? run - DAY_MS : run
}

/** Running total ending at `total`; posts without an in-range date form the baseline. */
export function cumulativeSeries(daily: number[], total: number): number[] {
  let running = Math.max(0, total - daily.reduce((sum, n) => sum + n, 0))
  return daily.map((n) => (running += n))
}

// ── Leads & conversations ────────────────────────────────────────────────────

export const LEAD_SOURCES: LeadSource[] = ['contact', 'finder', 'chatbot', 'clinictopia', 'hasm']

export type EventDailyRow = { src: string; day: string; n: number }
export type EventTotalRow = { src: string; cur: number; prev: number; newCount: number; captured: number; avgMessages: number | null }

export function buildEventSeries(rows: EventDailyRow[], period: PeriodBounds): { current: PeriodSeries; previous: PeriodSeries } {
  const conversations = new Map<string, number>()
  const leads = new Map<string, number>()
  for (const r of rows) {
    const target = r.src === 'conversation' ? conversations : (LEAD_SOURCES as string[]).includes(r.src) ? leads : null
    if (target) target.set(r.day, (target.get(r.day) ?? 0) + r.n)
  }
  const fill = (days: string[], map: Map<string, number>) => days.map((d) => map.get(d) ?? 0)
  return {
    current: { days: period.currentDays, conversations: fill(period.currentDays, conversations), leads: fill(period.currentDays, leads) },
    previous: { days: period.previousDays, conversations: fill(period.previousDays, conversations), leads: fill(period.previousDays, leads) },
  }
}

export function buildEventKpis(
  totals: EventTotalRow[],
  series: { current: PeriodSeries },
): Pick<OverviewKpis, 'leads' | 'conversations' | 'newLeadsWaiting'> {
  const bySource = Object.fromEntries(LEAD_SOURCES.map((s) => [s, 0])) as Record<LeadSource, number>
  let leadsCur = 0
  let leadsPrev = 0
  let waiting = 0
  let convo = { cur: 0, prev: 0, captured: 0, avgMessages: null as number | null }
  for (const t of totals) {
    if (t.src === 'conversation') {
      convo = { cur: t.cur, prev: t.prev, captured: t.captured, avgMessages: t.avgMessages }
    } else if ((LEAD_SOURCES as string[]).includes(t.src)) {
      bySource[t.src as LeadSource] = t.cur
      leadsCur += t.cur
      leadsPrev += t.prev
      waiting += t.newCount
    }
  }
  return {
    leads: { current: leadsCur, previous: leadsPrev, delta: computeDelta(leadsCur, leadsPrev), spark: series.current.leads, bySource },
    conversations: {
      current: convo.cur,
      previous: convo.prev,
      delta: computeDelta(convo.cur, convo.prev),
      spark: series.current.conversations,
      captured: convo.captured,
      avgMessages: convo.avgMessages,
    },
    newLeadsWaiting: waiting,
  }
}

const COUNTRY_ALIASES: Record<string, string> = {
  oman: 'OM', 'sultanate of oman': 'OM', 'عمان': 'OM', 'عُمان': 'OM', 'سلطنة عمان': 'OM', 'سلطنة عُمان': 'OM',
  'saudi arabia': 'SA', saudi: 'SA', ksa: 'SA', 'kingdom of saudi arabia': 'SA', 'السعودية': 'SA', 'المملكة العربية السعودية': 'SA',
  'united arab emirates': 'AE', uae: 'AE', emirates: 'AE', 'الإمارات': 'AE', 'الامارات': 'AE', 'الإمارات العربية المتحدة': 'AE',
  qatar: 'QA', 'قطر': 'QA', kuwait: 'KW', 'الكويت': 'KW', bahrain: 'BH', 'البحرين': 'BH',
  turkiye: 'TR', turkey: 'TR', 'تركيا': 'TR', egypt: 'EG', 'مصر': 'EG', jordan: 'JO', 'الأردن': 'JO', 'الاردن': 'JO',
  iraq: 'IQ', 'العراق': 'IQ', lebanon: 'LB', 'لبنان': 'LB', 'united kingdom': 'GB', uk: 'GB', 'united states': 'US', usa: 'US',
}

const TIMEZONE_COUNTRIES: Record<string, string> = {
  'Asia/Muscat': 'OM', 'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA', 'Asia/Bahrain': 'BH', 'Asia/Kuwait': 'KW',
  'Europe/Istanbul': 'TR', 'Africa/Cairo': 'EG', 'Asia/Amman': 'JO', 'Asia/Baghdad': 'IQ', 'Asia/Beirut': 'LB',
}

/** ISO country code from a free-text country, else estimated from the browser time zone. */
export function resolveCountryCode(country?: string | null, timeZone?: string | null): LeadCountry | null {
  const raw = (country ?? '').trim()
  if (raw) {
    const key = raw.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ')
    const code = COUNTRY_ALIASES[key] ?? (/^[a-z]{2}$/.test(key) ? key.toUpperCase() : null)
    if (code) return { code, from: 'country', raw }
  }
  const tz = (timeZone ?? '').trim()
  const fromZone = tz ? TIMEZONE_COUNTRIES[tz] : undefined
  return fromZone ? { code: fromZone, from: 'timezone', raw: tz } : null
}

// ── Articles ─────────────────────────────────────────────────────────────────

const SEO_BUCKET_STARTS: Array<Omit<SeoBucket, 'count'>> = [
  { label: '<50', min: 0 },
  { label: '50–69', min: 50 },
  { label: '70–79', min: 70 },
  { label: '80–89', min: 80 },
  { label: '90+', min: 90 },
]

/** Score 0/null means "never scored" (the field defaults to 0), so it is counted apart. */
export function bucketSeoScores(scores: Array<number | null | undefined>) {
  const buckets: SeoBucket[] = SEO_BUCKET_STARTS.map((b) => ({ ...b, count: 0 }))
  let scored = 0
  let unscored = 0
  let sum = 0
  for (const raw of scores) {
    const score = typeof raw === 'number' && Number.isFinite(raw) ? raw : 0
    if (score <= 0) {
      unscored += 1
      continue
    }
    scored += 1
    sum += score
    let idx = 0
    for (let i = 0; i < buckets.length; i++) if (score >= buckets[i].min) idx = i
    buckets[idx].count += 1
  }
  return { buckets, scored, unscored, average: scored ? Math.round(sum / scored) : null }
}

export function buildPublishingKpis(posts: PostRow[], now: number, period: PeriodBounds, timeZone = ADMIN_TIME_ZONE) {
  const published = posts.filter((p) => p.status === 'published')
  const dayIndex = new Map(period.currentDays.map((d, i) => [d, i]))
  const daily = new Array<number>(period.days).fill(0)
  let last30Days = 0
  for (const p of published) {
    if (p.publishedAt === null || p.publishedAt > now) continue
    if (p.publishedAt > now - 30 * DAY_MS) last30Days += 1
    if (p.publishedAt >= period.currentStart) {
      const i = dayIndex.get(zonedDateKey(p.publishedAt, timeZone))
      if (i !== undefined) daily[i] += 1
    }
  }

  const scheduled = posts.filter((p) => p.status === 'scheduled' && p.scheduledAt !== null)
  const lastRun = lastPublishRun(now)
  const weekEnd = weekBounds(now, 0, timeZone).end
  const upcoming = scheduled.filter((p) => p.scheduledAt! > lastRun).sort((a, b) => a.scheduledAt! - b.scheduledAt!)
  const today = zonedDateKey(now, timeZone)
  const nextDays = new Map(Array.from({ length: 14 }, (_, i) => [shiftDateKey(today, i), i] as const))
  const spark = new Array<number>(14).fill(0)
  for (const p of scheduled) {
    const i = nextDays.get(zonedDateKey(p.scheduledAt!, timeZone))
    if (i !== undefined) spark[i] += 1
  }
  const next = upcoming[0]

  return {
    published: { total: published.length, last30Days, spark: cumulativeSeries(daily, published.length) },
    scheduled: {
      total: posts.filter((p) => p.status === 'scheduled').length,
      overdue: scheduled.length - upcoming.length,
      articlesThisWeek: new Set(upcoming.filter((p) => p.scheduledAt! < weekEnd).map((p) => p.slug)).size,
      next: next ? { id: next.id, title: next.title, locale: next.locale, slug: next.slug, at: new Date(next.scheduledAt!).toISOString() } : null,
      spark,
    },
  }
}

export function buildContentHealth(posts: PostRow[], pagesMissingMeta: number): ContentHealth {
  const published = posts.filter((p) => p.status === 'published')
  const seo = bucketSeoScores(published.map((p) => p.seoScore))
  const unpaired = listUnpairedPosts(posts)
  return {
    publishedCount: published.length,
    scoredCount: seo.scored,
    unscoredCount: seo.unscored,
    averageSeo: seo.average,
    buckets: seo.buckets,
    missingAr: unpaired.filter((u) => u.locale === 'en').length,
    missingEn: unpaired.filter((u) => u.locale === 'ar').length,
    pagesMissingMeta,
    coversMissingAlt: published.filter((p) => !p.hasCoverAlt).length,
    metaDescriptionsMissing: published.filter((p) => !p.hasMetaDescription).length,
  }
}

export function buildTopArticles(posts: PostRow[], limit = 5): TopArticleRow[] {
  return posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.views - a.views || (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      title: p.title || p.slug,
      locale: p.locale,
      views: p.views,
      uniqueViews: p.uniqueViews,
      seoScore: p.seoScore,
      publishedAt: p.publishedAt === null ? null : new Date(p.publishedAt).toISOString(),
    }))
}

const iso = (ms: number | null) => (ms === null ? null : new Date(ms).toISOString())

/** Published + scheduled articles per day of one Monday–Sunday week, EN/AR docs of a slug grouped. */
export function buildPublishingWeek(posts: PostRow[], now: number, offset = 0, timeZone = ADMIN_TIME_ZONE): PublishingWeek {
  const bounds = weekBounds(now, offset, timeZone)
  const lastRun = lastPublishRun(now)
  const bySlug = new Map<string, Map<string, PostRow>>()
  for (const p of posts) {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, new Map())
    bySlug.get(p.slug)!.set(p.locale, p)
  }

  type Hit = { post: PostRow; kind: CalendarEntry['kind']; at: number; day: string }
  const groups = new Map<string, Hit[]>()
  for (const post of posts) {
    let hit: Hit | null = null
    if (post.status === 'published' && post.publishedAt !== null && post.publishedAt >= bounds.start && post.publishedAt < bounds.end) {
      hit = { post, kind: 'published', at: post.publishedAt, day: zonedDateKey(post.publishedAt, timeZone) }
    } else if (post.status === 'scheduled' && post.scheduledAt !== null && post.scheduledAt >= bounds.start && post.scheduledAt < bounds.end) {
      hit = { post, kind: post.scheduledAt <= lastRun ? 'overdue' : 'scheduled', at: post.scheduledAt, day: zonedDateKey(post.scheduledAt, timeZone) }
    }
    if (!hit) continue
    const key = `${hit.day}|${post.slug}|${hit.kind === 'published' ? 'published' : 'scheduled'}`
    groups.set(key, [...(groups.get(key) ?? []), hit])
  }

  const days: CalendarDay[] = bounds.days.map((date, weekday) => ({
    date,
    weekday,
    isToday: date === bounds.today,
    isPast: date < bounds.today,
    isWeekend: weekday === 4 || weekday === 5,
    entries: [],
  }))
  const dayIndex = new Map(bounds.days.map((d, i) => [d, i]))

  for (const [key, hits] of groups) {
    const primary = hits.find((h) => h.post.locale === 'en') ?? hits[0]
    const localeInfo = (code: 'en' | 'ar'): CalendarLocaleInfo => {
      const inCard = hits.find((h) => h.post.locale === code)
      if (inCard) return { state: 'ok', inCard: true, id: inCard.post.id, status: inCard.post.status, at: iso(inCard.at) }
      const sibling = bySlug.get(primary.post.slug)?.get(code)
      if (!sibling) return { state: 'missing', inCard: false }
      const live = sibling.status === 'published'
      return {
        state: live ? 'ok' : 'pending',
        inCard: false,
        id: sibling.id,
        status: sibling.status,
        at: iso(live ? sibling.publishedAt : sibling.scheduledAt),
      }
    }
    const entry: CalendarEntry = {
      key,
      slug: primary.post.slug,
      id: primary.post.id,
      kind: hits.some((h) => h.kind === 'overdue') ? 'overdue' : primary.kind,
      at: new Date(Math.min(...hits.map((h) => h.at))).toISOString(),
      title: primary.post.title || primary.post.slug,
      titleLocale: primary.post.locale === 'ar' ? 'ar' : 'en',
      locales: { en: localeInfo('en'), ar: localeInfo('ar') },
    }
    const idx = dayIndex.get(primary.day)
    if (idx !== undefined) days[idx].entries.push(entry)
  }

  let publishedCount = 0
  let scheduledCount = 0
  for (const day of days) {
    day.entries.sort((a, b) => a.at.localeCompare(b.at))
    for (const e of day.entries) e.kind === 'published' ? publishedCount++ : scheduledCount++
  }
  return { offset, days, publishedCount, scheduledCount }
}

const SAME_MOMENT_MS = 90_000

/** Best honest verb for a document's latest change (no per-edit audit log exists). */
export function feedVerb(
  collection: FeedItem['collection'],
  createdAt: number,
  updatedAt: number,
  status: string | null,
  publishedAt: number | null,
): FeedItem['verb'] {
  const fresh = Math.abs(updatedAt - createdAt) < SAME_MOMENT_MS
  if (collection === 'media') return fresh ? 'uploaded' : 'updated'
  if (collection === 'blog-posts' && status === 'published' && publishedAt !== null && Math.abs(updatedAt - publishedAt) < SAME_MOMENT_MS) {
    return 'published'
  }
  return fresh ? 'created' : 'updated'
}
