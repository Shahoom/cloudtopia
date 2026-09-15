// Shapes for the admin Overview dashboard (components/payload/CommandCenter.tsx).
// Everything is plain JSON-serialisable data so it can cross into the client
// activity chart unchanged. Times are ISO strings; calendar days are
// YYYY-MM-DD in the admin time zone (Asia/Muscat).

export type DeltaDirection = 'up' | 'down' | 'flat'
export type Delta = { pct: number; direction: DeltaDirection }

export type TopicCount = { category: string; count: number }
export type UnpairedPost = { slug: string; locale: string; title: string }

export type RangeKey = '7d' | '28d' | '90d'

export type LeadSource = 'contact' | 'finder' | 'chatbot' | 'clinictopia' | 'hasm'

export type LeadCollection =
  | 'contact-inquiries'
  | 'solution-finder-leads'
  | 'ai-chat-leads'
  | 'clinictopia-leads'
  | 'hasm-erp-leads'

/** Independently loaded parts of the overview. A failed part renders an error state, never zeros. */
export type OverviewSection = 'events' | 'posts' | 'pages' | 'inbox' | 'feed'

/** One light row per non-deleted blog post; the overview derives most widgets from these. */
export type PostRow = {
  id: string
  slug: string
  locale: string
  title: string
  status: string
  publishedAt: number | null
  scheduledAt: number | null
  seoScore: number | null
  views: number
  uniqueViews: number
  hasCoverAlt: boolean
  hasMetaDescription: boolean
}

export type PeriodSeries = {
  /** Calendar days, oldest first. */
  days: string[]
  conversations: number[]
  leads: number[]
}

export type CountWithDelta = {
  current: number
  /** The same elapsed window of the previous period. */
  previous: number
  delta: Delta
}

export type ScheduledPostRef = { id: string; title: string; locale: string; slug: string; at: string }

export type OverviewKpis = {
  published: { total: number; last30Days: number; spark: number[] }
  leads: CountWithDelta & { spark: number[]; bySource: Record<LeadSource, number> }
  conversations: CountWithDelta & { spark: number[]; captured: number; avgMessages: number | null }
  scheduled: {
    total: number
    /** Still "scheduled" although the last publish cron run should have taken them live. */
    overdue: number
    /** Distinct articles (slugs) due to go live between the last cron run and the end of this week. */
    articlesThisWeek: number
    next: ScheduledPostRef | null
    /** Go-lives per day for the next 14 days, starting today. */
    spark: number[]
  }
  /** Leads across all five lead collections still in status "new". */
  newLeadsWaiting: number
}

export type LeadCountry = { code: string; from: 'country' | 'timezone'; raw: string }

export type InboxLead = {
  id: string
  collection: LeadCollection
  source: LeadSource
  name: string | null
  org: string | null
  detail: string | null
  country: LeadCountry | null
  status: string | null
  createdAt: string
}

/**
 * ok      — this locale goes live with the card, or is already published
 * pending — the sibling exists but isn't live (draft, in review, scheduled elsewhere)
 * missing — no document in this locale shares the slug
 */
export type CalendarLocaleState = 'ok' | 'pending' | 'missing'

export type CalendarLocaleInfo = {
  state: CalendarLocaleState
  inCard: boolean
  id?: string
  status?: string
  at?: string | null
}

export type CalendarEntry = {
  key: string
  slug: string
  /** Primary document to open (EN when it is part of the card). */
  id: string
  kind: 'published' | 'scheduled' | 'overdue'
  at: string
  title: string
  titleLocale: 'en' | 'ar'
  locales: { en: CalendarLocaleInfo; ar: CalendarLocaleInfo }
}

export type CalendarDay = {
  date: string
  /** 0 = Monday … 6 = Sunday */
  weekday: number
  isToday: boolean
  isPast: boolean
  /** Friday/Saturday — the Gulf weekend. */
  isWeekend: boolean
  entries: CalendarEntry[]
}

export type PublishingWeek = {
  offset: number
  days: CalendarDay[]
  publishedCount: number
  scheduledCount: number
}

export type SeoBucket = { label: string; min: number; count: number }

export type ContentHealth = {
  publishedCount: number
  scoredCount: number
  /** Published posts whose score was never computed (0/null — e.g. SQL-imported articles). */
  unscoredCount: number
  averageSeo: number | null
  buckets: SeoBucket[]
  missingAr: number
  missingEn: number
  pagesMissingMeta: number
  coversMissingAlt: number
  metaDescriptionsMissing: number
}

export type TopArticleRow = {
  id: string
  title: string
  locale: string
  views: number
  uniqueViews: number
  seoScore: number | null
  publishedAt: string | null
}

export type FeedItem = {
  key: string
  collection: 'blog-posts' | 'pages' | 'media'
  id: string
  title: string
  locale: string | null
  verb: 'published' | 'created' | 'updated' | 'uploaded'
  at: string
}

export type OverviewStats = {
  generatedAt: string
  databaseReady: boolean
  range: { key: RangeKey; days: number }
  kpis: OverviewKpis
  activity: { current: PeriodSeries; previous: PeriodSeries }
  inbox: InboxLead[]
  week: PublishingWeek
  health: ContentHealth
  topArticles: TopArticleRow[]
  feed: FeedItem[]
  unavailable: OverviewSection[]
}
