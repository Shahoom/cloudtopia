import 'server-only'
import { getPayloadClient } from '../payload.ts'
import { isDatabaseConfigured, queryDatabase } from '../db.ts'
import { getS3StorageConfig } from '../env.ts'
import { bucketTopics } from './topics.ts'
import { computeDelta, countMissingArSiblings } from './metrics.ts'
import type { ActivityItem, DayCount, OverviewStats } from './types.ts'

const DAY = 86_400_000

function isoDaysAgo(now: number, days: number): string {
  return new Date(now - days * DAY).toISOString()
}

async function safeCount(payload: any, collection: string, where?: any): Promise<number> {
  try {
    const res = await payload.count({ collection, where, overrideAccess: true })
    return res.totalDocs ?? 0
  } catch {
    return 0
  }
}

export async function getOverviewStats(now = Date.now()): Promise<OverviewStats> {
  const empty: OverviewStats = {
    kpis: [],
    activityByDay: [],
    recent: [],
    attention: [],
    topArticles: [],
    topTopics: [],
    siteHealth: { storageConfigured: Boolean(getS3StorageConfig()), pagesMissingMeta: 0, articlesMissingAr: 0 },
  }
  if (!isDatabaseConfigured()) return empty

  let payload: any
  try {
    payload = await getPayloadClient()
  } catch {
    return empty
  }

  const last7 = isoDaysAgo(now, 7)
  const prev7 = isoDaysAgo(now, 14)
  const next7 = new Date(now + 7 * DAY).toISOString()
  const leadCollections = [
    'solution-finder-leads',
    'ai-chat-leads',
    'contact-inquiries',
    'clinictopia-leads',
    'hasm-erp-leads',
  ]

  const [leads7, leadsPrev7, convo7, convoPrev7, drafts, scheduled] = await Promise.all([
    Promise.all(leadCollections.map((c) => safeCount(payload, c, { createdAt: { greater_than: last7 } }))).then((a) => a.reduce((x, y) => x + y, 0)),
    Promise.all(
      leadCollections.map((c) => safeCount(payload, c, { and: [{ createdAt: { greater_than: prev7 } }, { createdAt: { less_than: last7 } }] })),
    ).then((a) => a.reduce((x, y) => x + y, 0)),
    safeCount(payload, 'ai-chat-conversations', { createdAt: { greater_than: last7 } }),
    safeCount(payload, 'ai-chat-conversations', { and: [{ createdAt: { greater_than: prev7 } }, { createdAt: { less_than: last7 } }] }),
    safeCount(payload, 'blog-posts', { status: { equals: 'draft' } }),
    safeCount(payload, 'blog-posts', { and: [{ status: { equals: 'scheduled' } }, { scheduledAt: { less_than: next7 } }] }),
  ])

  let totalViews = 0
  try {
    const rows = await queryDatabase<{ sum: string }>('SELECT COALESCE(SUM(views_count),0) AS sum FROM blog_posts')
    totalViews = Number(rows?.[0]?.sum ?? 0)
  } catch {
    totalViews = 0
  }

  let topArticles: OverviewStats['topArticles'] = []
  let lowSeo = 0
  let allPostsForSiblings: Array<{ slug: string; locale: string }> = []
  try {
    const top = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, sort: '-viewsCount', limit: 5, depth: 0, overrideAccess: true })
    topArticles = (top.docs || []).map((d: any) => ({
      id: String(d.id),
      title: d.title || '(untitled)',
      locale: (d.locale || 'en').toUpperCase(),
      views: d.viewsCount || 0,
      href: `/admin/collections/blog-posts/${d.id}`,
    }))
    const lowSeoRes = await payload.count({ collection: 'blog-posts', where: { seoScore: { less_than: 60 } }, overrideAccess: true })
    lowSeo = lowSeoRes.totalDocs ?? 0
    const allPosts = await payload.find({ collection: 'blog-posts', limit: 1000, depth: 0, overrideAccess: true, select: { slug: true, locale: true } })
    allPostsForSiblings = (allPosts.docs || []).map((d: any) => ({ slug: d.slug, locale: d.locale }))
  } catch {
    /* leave defaults */
  }

  let pagesMissingMeta = 0
  try {
    const pages = await payload.find({ collection: 'pages', limit: 1000, depth: 0, overrideAccess: true })
    pagesMissingMeta = (pages.docs || []).filter((p: any) => !p?.seo?.description).length
  } catch {
    /* 0 */
  }

  const articlesMissingAr = countMissingArSiblings(allPostsForSiblings)

  let topTopics: OverviewStats['topTopics'] = []
  try {
    const convos = await payload.find({ collection: 'ai-chat-conversations', sort: '-createdAt', limit: 200, depth: 0, overrideAccess: true, select: { transcriptText: true } })
    topTopics = bucketTopics((convos.docs || []).map((c: any) => c.transcriptText || '')).slice(0, 5)
  } catch {
    /* [] */
  }

  const recent = await buildRecentFeed(payload)
  const activityByDay = await buildActivityByDay(payload, now)

  const leadDelta = computeDelta(leads7, leadsPrev7)
  const convoDelta = computeDelta(convo7, convoPrev7)

  return {
    kpis: [
      { label: 'New leads · 7d', value: String(leads7), delta: leadDelta },
      { label: 'Conversations · 7d', value: String(convo7), delta: convoDelta },
      { label: 'Drafts to review', value: String(drafts), hint: lowSeo ? `${lowSeo} have low SEO` : undefined },
      { label: 'Total article views', value: totalViews.toLocaleString('en-US') },
    ],
    activityByDay,
    recent,
    attention: [
      { label: 'Drafts in progress', count: drafts, href: '/admin/collections/blog-posts?where[status][equals]=draft', tone: 'neutral' },
      { label: 'Articles with low SEO score', count: lowSeo, href: '/admin/collections/blog-posts?sort=seoScore', tone: 'warning' },
      { label: 'Scheduled this week', count: scheduled, href: '/admin/collections/blog-posts?where[status][equals]=scheduled', tone: 'neutral' },
      { label: 'Articles missing Arabic version', count: articlesMissingAr, href: '/admin/collections/blog-posts', tone: 'neutral' },
      { label: 'Pages missing meta description', count: pagesMissingMeta, href: '/admin/collections/pages', tone: pagesMissingMeta ? 'danger' : 'neutral' },
    ],
    topArticles,
    topTopics,
    siteHealth: { storageConfigured: Boolean(getS3StorageConfig()), pagesMissingMeta, articlesMissingAr },
  }
}

async function buildRecentFeed(payload: any): Promise<ActivityItem[]> {
  const items: ActivityItem[] = []
  try {
    const sf = await payload.find({ collection: 'solution-finder-leads', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of sf.docs || []) {
      items.push({
        id: String(d.id),
        kind: 'solution-finder',
        title: `${d.name || 'Lead'} · ${d.recommendedPackage || d.projectType || 'Recommendation'}`,
        subtitle: `Solution finder · ${d.country || '—'}`,
        badge: 'New',
        at: d.createdAt,
        href: `/admin/collections/solution-finder-leads/${d.id}`,
      })
    }
  } catch {
    /* skip */
  }
  try {
    const cv = await payload.find({ collection: 'ai-chat-conversations', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of cv.docs || []) {
      items.push({
        id: String(d.id),
        kind: 'chatbot',
        title: `Chatbot · ${d.messageCount || 0} turns`,
        subtitle: `${d.language || 'unknown'} · ${d.status || 'active'}`,
        badge: 'Chat',
        at: d.createdAt,
        href: `/admin/collections/ai-chat-conversations/${d.id}`,
      })
    }
  } catch {
    /* skip */
  }
  try {
    const ci = await payload.find({ collection: 'contact-inquiries', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of ci.docs || []) {
      items.push({
        id: String(d.id),
        kind: 'contact',
        title: `${d.name || 'Inquiry'}`,
        subtitle: 'Contact form',
        badge: 'Inquiry',
        at: d.createdAt,
        href: `/admin/collections/contact-inquiries/${d.id}`,
      })
    }
  } catch {
    /* skip */
  }
  try {
    const hasm = await payload.find({ collection: 'hasm-erp-leads', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of hasm.docs || []) {
      items.push({
        id: String(d.id),
        kind: 'hasm-demo',
        title: `${d.name || 'Hasm lead'}`,
        subtitle: `${d.email || d.phone || 'Demo access'} · Hasm ERP`,
        badge: 'Hasm',
        at: d.createdAt,
        href: `/admin/collections/hasm-erp-leads/${d.id}`,
      })
    }
  } catch {
    /* skip */
  }
  return items.filter((i) => i.at).sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, 6)
}

async function buildActivityByDay(payload: any, now: number): Promise<DayCount[]> {
  const days: DayCount[] = []
  for (let i = 6; i >= 0; i--) {
    const start = new Date(now - i * DAY)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start.getTime() + DAY)
    const label = start.toLocaleDateString('en-US', { weekday: 'short' })
    const window = { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }
    const [conversations, sf, ac, ci, clinic, hasm] = await Promise.all([
      safeCount(payload, 'ai-chat-conversations', window),
      safeCount(payload, 'solution-finder-leads', window),
      safeCount(payload, 'ai-chat-leads', window),
      safeCount(payload, 'contact-inquiries', window),
      safeCount(payload, 'clinictopia-leads', window),
      safeCount(payload, 'hasm-erp-leads', window),
    ])
    days.push({ day: label, conversations, leads: sf + ac + ci + clinic + hasm })
  }
  return days
}
