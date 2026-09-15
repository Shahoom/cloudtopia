import 'server-only'
import { isDatabaseConfigured, queryDatabase } from '../db.ts'
import {
  ADMIN_TIME_ZONE,
  RANGE_DAYS,
  buildContentHealth,
  buildEventKpis,
  buildEventSeries,
  buildPublishingKpis,
  buildPublishingWeek,
  buildTopArticles,
  feedVerb,
  periodBounds,
  resolveCountryCode,
  type EventDailyRow,
  type EventTotalRow,
  type PeriodBounds,
} from './metrics.ts'
import type { FeedItem, InboxLead, LeadCollection, LeadSource, OverviewSection, OverviewStats, PostRow, RangeKey } from './types.ts'

// Data for the admin Overview. A handful of raw SQL round trips (the pool is
// capped at two connections) replace the per-day Payload counts this used to run;
// the widgets are derived from the rows by the pure builders in metrics.ts.
// Every blog_posts / media read excludes trashed rows (deleted_at is not null).

const COLLECTION_SOURCE: Record<LeadCollection, LeadSource> = {
  'contact-inquiries': 'contact',
  'solution-finder-leads': 'finder',
  'ai-chat-leads': 'chatbot',
  'clinictopia-leads': 'clinictopia',
  'hasm-erp-leads': 'hasm',
}

// Every lead collection plus chatbot conversations, as one event stream.
const EVENTS_SQL = `
  select 'contact'::text as src, created_at, status::text as status, null::float8 as messages, false as captured from contact_inquiries
  union all select 'finder', created_at, status::text, null, false from solution_finder_leads
  union all select 'chatbot', created_at, status::text, null, false from ai_chat_leads
  union all select 'clinictopia', created_at, status::text, null, false from clinictopia_leads
  union all select 'hasm', created_at, status::text, null, false from hasm_erp_leads
  union all select 'conversation', created_at, null, message_count::float8, coalesce(lead_captured, false) from ai_chat_conversations
`

const toMs = (value: unknown): number | null => {
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string' || typeof value === 'number') {
    const ms = new Date(value).getTime()
    return Number.isFinite(ms) ? ms : null
  }
  return null
}

const toNum = (value: unknown, fallback = 0): number => {
  const n = typeof value === 'number' ? value : Number(value)
  return value !== null && value !== undefined && Number.isFinite(n) ? n : fallback
}

const clean = (value: unknown): string | null => (typeof value === 'string' && value.trim() ? value.trim() : null)

async function loadEventDaily(period: PeriodBounds): Promise<EventDailyRow[]> {
  const rows = await queryDatabase<{ src: string; day: string; n: number }>(
    `select src, ((created_at at time zone $1::text)::date)::text as day, count(*)::int as n
       from (${EVENTS_SQL}) e
      where created_at >= $2 and created_at <= $3
      group by 1, 2`,
    [ADMIN_TIME_ZONE, new Date(period.previousStart).toISOString(), new Date(period.now).toISOString()],
  )
  return rows.map((r) => ({ src: r.src, day: r.day, n: toNum(r.n) }))
}

async function loadEventTotals(period: PeriodBounds): Promise<EventTotalRow[]> {
  const rows = await queryDatabase<Record<string, unknown>>(
    `select src,
            (count(*) filter (where created_at >= $1 and created_at <= $2))::int as cur,
            (count(*) filter (where created_at >= $3 and created_at <= $4))::int as prev,
            (count(*) filter (where status = 'new'))::int as new_count,
            (count(*) filter (where captured and created_at >= $1 and created_at <= $2))::int as captured,
            round((avg(messages) filter (where created_at >= $1 and created_at <= $2))::numeric, 1)::float8 as avg_messages
       from (${EVENTS_SQL}) e
      group by src`,
    [
      new Date(period.currentStart).toISOString(),
      new Date(period.now).toISOString(),
      new Date(period.previousStart).toISOString(),
      new Date(period.previousCut).toISOString(),
    ],
  )
  return rows.map((r) => ({
    src: String(r.src),
    cur: toNum(r.cur),
    prev: toNum(r.prev),
    newCount: toNum(r.new_count),
    captured: toNum(r.captured),
    avgMessages: r.avg_messages === null || r.avg_messages === undefined ? null : toNum(r.avg_messages),
  }))
}

async function loadPosts(): Promise<PostRow[]> {
  const rows = await queryDatabase<Record<string, unknown>>(
    `select id::text as id, slug, locale::text as locale, coalesce(title, '') as title, status::text as status,
            published_at, scheduled_at, seo_score::float8 as seo_score,
            coalesce(views_count, 0)::float8 as views, coalesce(unique_views_count, 0)::float8 as unique_views,
            coalesce(btrim(featured_image_alt), '') <> '' as has_cover_alt,
            coalesce(btrim(seo_meta_description), '') <> '' as has_meta_description
       from blog_posts
      where deleted_at is null`,
  )
  return rows.map((r) => ({
    id: String(r.id),
    slug: String(r.slug ?? ''),
    locale: String(r.locale ?? ''),
    title: String(r.title ?? ''),
    status: String(r.status ?? ''),
    publishedAt: toMs(r.published_at),
    scheduledAt: toMs(r.scheduled_at),
    seoScore: r.seo_score === null || r.seo_score === undefined ? null : toNum(r.seo_score),
    views: toNum(r.views),
    uniqueViews: toNum(r.unique_views),
    hasCoverAlt: Boolean(r.has_cover_alt),
    hasMetaDescription: Boolean(r.has_meta_description),
  }))
}

async function loadPagesMissingMeta(): Promise<number> {
  const rows = await queryDatabase<{ missing: number }>(
    `select (count(*) filter (where coalesce(btrim(seo->>'description'), '') = ''))::int as missing from pages`,
  )
  return toNum(rows[0]?.missing)
}

async function loadInbox(): Promise<InboxLead[]> {
  const rows = await queryDatabase<Record<string, unknown>>(
    `select * from (
       select 'contact-inquiries'::text as collection, id::text as id, name::text as name, company::text as org,
              country::text as country, null::text as tz, service::text as detail, status::text as status, created_at
         from contact_inquiries
       union all
       select 'solution-finder-leads', id::text, name::text, company::text, country::text, null,
              coalesce(nullif(btrim(recommended_package), ''), nullif(btrim(project_type), ''))::text, status::text, created_at
         from solution_finder_leads
       union all
       select 'ai-chat-leads', id::text, name::text, business_type::text, country::text, null, service_needed::text, status::text, created_at
         from ai_chat_leads
       union all
       select 'clinictopia-leads', id::text, name::text, null, null, timezone::text, product::text, status::text, created_at
         from clinictopia_leads
       union all
       select 'hasm-erp-leads', id::text, name::text, null, null, timezone::text, product::text, status::text, created_at
         from hasm_erp_leads
     ) leads
     order by created_at desc nulls last
     limit 5`,
  )
  return rows.flatMap((r) => {
    const collection = String(r.collection) as LeadCollection
    const createdAt = toMs(r.created_at)
    if (!COLLECTION_SOURCE[collection] || createdAt === null) return []
    return [
      {
        id: String(r.id),
        collection,
        source: COLLECTION_SOURCE[collection],
        name: clean(r.name),
        org: clean(r.org),
        detail: clean(r.detail),
        country: resolveCountryCode(clean(r.country), clean(r.tz)),
        status: clean(r.status),
        createdAt: new Date(createdAt).toISOString(),
      },
    ]
  })
}

async function loadFeed(): Promise<FeedItem[]> {
  const rows = await queryDatabase<Record<string, unknown>>(
    `(select 'blog-posts'::text as collection, id::text as id, coalesce(title, slug)::text as title, locale::text as locale,
             status::text as status, created_at, updated_at, published_at
        from blog_posts where deleted_at is null order by updated_at desc nulls last limit 6)
     union all
     (select 'pages', id::text, coalesce(title, slug)::text, locale::text, status::text, created_at, updated_at, null::timestamptz
        from pages order by updated_at desc nulls last limit 6)
     union all
     (select 'media', id::text, coalesce(nullif(btrim(alt), ''), filename)::text, null::text, null::text, created_at, updated_at, null::timestamptz
        from media where deleted_at is null order by updated_at desc nulls last limit 6)
     order by updated_at desc nulls last
     limit 6`,
  )
  return rows.flatMap((r) => {
    const collection = String(r.collection) as FeedItem['collection']
    const updatedAt = toMs(r.updated_at)
    if (updatedAt === null) return []
    const createdAt = toMs(r.created_at) ?? updatedAt
    return [
      {
        key: `${collection}:${r.id}`,
        collection,
        id: String(r.id),
        title: clean(r.title) ?? (collection === 'media' ? 'Untitled file' : 'Untitled'),
        locale: clean(r.locale),
        verb: feedVerb(collection, createdAt, updatedAt, clean(r.status), toMs(r.published_at)),
        at: new Date(updatedAt).toISOString(),
      },
    ]
  })
}

export type OverviewOptions = { now?: number; range?: RangeKey; weekOffset?: number }

export async function getOverviewStats({ now = Date.now(), range = '7d', weekOffset = 0 }: OverviewOptions = {}): Promise<OverviewStats> {
  const days = RANGE_DAYS[range]
  const period = periodBounds(now, days)
  const databaseReady = isDatabaseConfigured()
  const failed = new Set<OverviewSection>()

  async function load<T>(name: OverviewSection, run: () => Promise<T>, fallback: T): Promise<T> {
    if (!databaseReady) return fallback
    try {
      return await run()
    } catch (error) {
      failed.add(name)
      console.error(`[admin-overview] ${name} query failed:`, error instanceof Error ? error.message : error)
      return fallback
    }
  }

  const [dailyRows, totalRows, posts, pagesMissingMeta, inbox, feed] = await Promise.all([
    load('events', () => loadEventDaily(period), [] as EventDailyRow[]),
    load('events', () => loadEventTotals(period), [] as EventTotalRow[]),
    load('posts', loadPosts, [] as PostRow[]),
    load('pages', loadPagesMissingMeta, 0),
    load('inbox', loadInbox, [] as InboxLead[]),
    load('feed', loadFeed, [] as FeedItem[]),
  ])

  const activity = buildEventSeries(dailyRows, period)
  return {
    generatedAt: new Date(now).toISOString(),
    databaseReady,
    range: { key: range, days },
    kpis: { ...buildEventKpis(totalRows, activity), ...buildPublishingKpis(posts, now, period) },
    activity,
    inbox,
    week: buildPublishingWeek(posts, now, weekOffset),
    health: buildContentHealth(posts, pagesMissingMeta),
    topArticles: buildTopArticles(posts),
    feed,
    unavailable: [...failed],
  }
}
