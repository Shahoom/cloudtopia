# CMS Cockpit (Admin Shell + Command Center) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat 22-collection admin nav with grouped workspaces, and replace the existing dashboard with a real command-center built from CloudTopia's own data.

**Architecture:** Additive only. Rewrite the custom nav component (`AdminChrome`) into grouped workspaces; align each collection's `admin.group`. Add pure aggregation helpers (TDD) + a server-only `getOverviewStats()` that reads via the Payload local API plus a few portable SQL aggregates. Render a new server-component dashboard (`CommandCenter`) wired into `admin.components.views.dashboard`. The old `EditorialDashboard` stays until the new one is verified, then is removed. No collection field shapes change; no data is migrated.

**Tech Stack:** Payload 3.84, Next.js 16 (App Router, RSC), Postgres (Supabase), `node --test --import tsx` (existing smoke-test harness), lucide-react + next/link (already used by the admin components). Charts rendered as pure CSS bars (no client JS in the admin).

**Branch:** `feature/cms-foundation` (already created).

**Spec:** `docs/superpowers/specs/2026-06-14-cms-foundation-design.md` (milestones M1 + M2).

---

## File structure

| File | Action | Responsibility |
|---|---|---|
| `components/payload/AdminChrome.tsx` | Modify | Grouped workspace nav (Cockpit · Content · CRM/Inbox · AI & Activity · Settings) |
| `collections/*.ts` (19 files) | Modify | Align `admin.group` strings to the 5 workspaces (cosmetic) |
| `lib/cms/admin/types.ts` | Create | Shared types for dashboard data (`OverviewStats` etc.) |
| `lib/cms/admin/topics.ts` | Create | Pure `bucketTopics()` — keyword → service-category counts |
| `lib/cms/admin/metrics.ts` | Create | Pure `computeDelta()`, `countMissingArSiblings()` |
| `lib/cms/admin/overview.ts` | Create | Server-only `getOverviewStats()` orchestration |
| `tests/admin-overview.test.ts` | Create | Unit tests for the pure helpers |
| `components/payload/CommandCenter.tsx` | Create | Server-component command-center dashboard |
| `payload.config.ts` | Modify | Point `views.dashboard` at `CommandCenter` |
| `components/payload/EditorialDashboard.tsx` | Delete (final step) | Removed after the new dashboard is verified |

**Data facts this plan relies on (verified in the codebase):**
- `blog-posts` has `status`, `locale`, `slug`, `viewsCount`, `seoScore`, `seo.metaTitle`, `seo.metaDescription`, `scheduledAt`, `title`, `category`, `author`.
- `pages.seo` is a JSON field whose keys are `title` / `description` / `noindex` (see `lib/cms/metadata.ts`), **not** `metaTitle`/`metaDescription`.
- Payload auto-adds `createdAt`/`updatedAt` to every collection, so time-window queries work on `ai-chat-conversations`, `solution-finder-leads`, `ai-chat-leads`, `contact-inquiries`.
- `viewsCount` is a running total (no per-day history exists), so the views KPI is a **total**, not a windowed delta. The 7-day activity chart uses `conversations`/`leads` which DO have `createdAt`.
- `getPayloadClient()` exists in `lib/cms/payload.ts`; `queryDatabase()` + `isDatabaseConfigured()` exist in `lib/cms/db.ts`.

---

## Task 1: Regroup the admin navigation into workspaces

**Files:**
- Modify: `components/payload/AdminChrome.tsx`
- Modify: 19 collection files (group strings)

- [ ] **Step 1: Rewrite the nav data + render as grouped sections**

In `components/payload/AdminChrome.tsx`, replace the flat `navItems` array and the `.map()` render with a grouped structure. Keep the existing brand mark, styles object, and logout. Use the icons already imported (add any missing from lucide-react).

```tsx
type NavLink = { href: string; label: string; icon: typeof LayoutDashboard }
type NavGroup = { title: string; items: NavLink[] }

const navGroups: NavGroup[] = [
  {
    title: 'Cockpit',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/collections/blog-posts', label: 'Articles', icon: Newspaper },
      { href: '/admin/collections/pages', label: 'Pages', icon: FileText },
      { href: '/admin/collections/authors', label: 'Authors', icon: Users },
      { href: '/admin/collections/blog-categories', label: 'Categories', icon: Tags },
      { href: '/admin/collections/blog-tags', label: 'Tags', icon: Tags },
      { href: '/admin/collections/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/collections/service-faqs', label: 'Service FAQs', icon: HelpCircle },
      { href: '/admin/collections/media', label: 'Media', icon: Image },
    ],
  },
  {
    title: 'CRM / Inbox',
    items: [
      { href: '/admin/collections/solution-finder-leads', label: 'Solution finder', icon: Send },
      { href: '/admin/collections/ai-chat-leads', label: 'Chatbot leads', icon: Send },
      { href: '/admin/collections/contact-inquiries', label: 'Contact inquiries', icon: Send },
      { href: '/admin/collections/newsletter-subscribers', label: 'Newsletter', icon: Send },
    ],
  },
  {
    title: 'AI & Activity',
    items: [
      { href: '/admin/collections/ai-chat-conversations', label: 'Conversations', icon: Bot },
      { href: '/admin/collections/blog-ai-generation-logs', label: 'AI logs', icon: Bot },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/admin/collections/site-content', label: 'Locales / dictionary', icon: Globe2 },
      { href: '/admin/collections/site-design', label: 'Design', icon: Brush },
      { href: '/admin/collections/users', label: 'Users', icon: Users },
    ],
  },
]
```

Render each group with a small uppercase-free section title and its links (reuse the existing link styles). Example render inside the `<nav>` (after the brand link), replacing the old items map:

```tsx
{navGroups.map((group) => (
  <div key={group.title} className="ct-admin-nav__group">
    <p className="ct-admin-nav__group-title">{group.title}</p>
    {group.items.map((item) => {
      const Icon = item.icon
      return (
        <Link key={item.href} href={item.href} className="ct-admin-nav__link" style={styles.link}>
          <Icon size={18} aria-hidden /> <span>{item.label}</span>
        </Link>
      )
    })}
  </div>
))}
```

Add two style rules to `chromeStyles` (the existing `<style>` string): `.ct-admin-nav__group { margin-bottom: 14px; }` and `.ct-admin-nav__group-title { font-size: 11px; letter-spacing: .04em; color: var(--theme-elevation-400); margin: 0 0 6px 10px; }` (match the surrounding token usage; if the file uses inline `styles`, add a `groupTitle` entry instead).

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build` (or `npx tsc --noEmit` if faster)
Expected: compiles with no type errors from `AdminChrome.tsx`.

- [ ] **Step 3: Align each collection's `admin.group`**

Edit the `admin: { group: '...' }` value in each collection so the native collection screens group identically. Apply exactly:

| File | New group |
|---|---|
| `collections/BlogPosts.ts` | `Content` |
| `collections/Pages.ts` | `Content` |
| `collections/Authors.ts` | `Content` |
| `collections/BlogCategories.ts` | `Content` |
| `collections/BlogTags.ts` | `Content` |
| `collections/BlogSeries.ts` | `Content` |
| `collections/BlogRedirects.ts` | `Content` |
| `collections/BlogContentTemplates.ts` | `Content` |
| `collections/Projects.ts` | `Content` |
| `collections/ServiceFAQs.ts` | `Content` |
| `collections/Media.ts` | `Content` |
| `collections/SolutionFinderLeads.ts` | `CRM / Inbox` |
| `collections/AIChatLeads.ts` | `CRM / Inbox` |
| `collections/ContactInquiries.ts` | `CRM / Inbox` |
| `collections/NewsletterSubscribers.ts` | `CRM / Inbox` |
| `collections/AIChatConversations.ts` | `AI & Activity` |
| `collections/BlogAIGenerationLogs.ts` | `AI & Activity` |
| `collections/SiteContent.ts` | `Settings` |
| `collections/SiteDesign.ts` | `Settings` |
| `collections/Users.ts` | `Settings` |

For each: if `admin.group` exists, change its value; if missing, add `group: '...'` to the `admin` object. (Media currently has no group — add `admin: { group: 'Content', ... }` preserving existing admin options.)

- [ ] **Step 4: Verify build still compiles**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add components/payload/AdminChrome.tsx collections/
git commit -m "feat(cms): regroup admin nav into workspaces"
```

---

## Task 2: Pure dashboard helpers (TDD)

**Files:**
- Create: `lib/cms/admin/types.ts`
- Create: `lib/cms/admin/topics.ts`
- Create: `lib/cms/admin/metrics.ts`
- Test: `tests/admin-overview.test.ts`

- [ ] **Step 1: Write the shared types**

`lib/cms/admin/types.ts`:

```ts
export type DeltaDirection = 'up' | 'down' | 'flat'
export type Delta = { pct: number; direction: DeltaDirection }
export type Kpi = { label: string; value: string; delta?: Delta; hint?: string }
export type ActivityKind = 'solution-finder' | 'chatbot' | 'contact'
export type ActivityItem = {
  id: string
  kind: ActivityKind
  title: string
  subtitle: string
  badge: string
  at: string
  href: string
}
export type AttentionTone = 'neutral' | 'warning' | 'danger'
export type AttentionItem = { label: string; count: number; href: string; tone: AttentionTone }
export type TopArticle = { id: string; title: string; locale: string; views: number; href: string }
export type TopicCount = { category: string; count: number }
export type DayCount = { day: string; conversations: number; leads: number }
export type SiteHealth = { storageConfigured: boolean; pagesMissingMeta: number; articlesMissingAr: number }
export type OverviewStats = {
  kpis: Kpi[]
  activityByDay: DayCount[]
  recent: ActivityItem[]
  attention: AttentionItem[]
  topArticles: TopArticle[]
  topTopics: TopicCount[]
  siteHealth: SiteHealth
}
```

- [ ] **Step 2: Write the failing tests**

`tests/admin-overview.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bucketTopics } from '../lib/cms/admin/topics.ts'
import { computeDelta, countMissingArSiblings } from '../lib/cms/admin/metrics.ts'

test('bucketTopics counts service categories across EN/AR transcripts', () => {
  const result = bucketTopics([
    'Do you build an online store? I need ecommerce',
    'هل تبنون متجر إلكتروني؟',
    'I want a CRM system for my team',
    'what is the price and budget?',
  ])
  const map = Object.fromEntries(result.map((r) => [r.category, r.count]))
  assert.equal(map['E-commerce'], 2)
  assert.equal(map['CRM / ERP'], 1)
  assert.equal(map['Pricing'], 1)
})

test('bucketTopics returns categories sorted by count desc', () => {
  const result = bucketTopics(['store', 'store', 'crm'])
  assert.equal(result[0].category, 'E-commerce')
  assert.ok(result[0].count >= result[result.length - 1].count)
})

test('bucketTopics ignores empty input', () => {
  assert.deepEqual(bucketTopics([]), [])
})

test('computeDelta reports direction and rounded percent', () => {
  assert.deepEqual(computeDelta(13, 10), { pct: 30, direction: 'up' })
  assert.deepEqual(computeDelta(8, 10), { pct: 20, direction: 'down' })
  assert.deepEqual(computeDelta(10, 10), { pct: 0, direction: 'flat' })
})

test('computeDelta handles zero previous (new activity) as up 100', () => {
  assert.deepEqual(computeDelta(5, 0), { pct: 100, direction: 'up' })
  assert.deepEqual(computeDelta(0, 0), { pct: 0, direction: 'flat' })
})

test('countMissingArSiblings counts EN posts with no AR sibling by slug', () => {
  const posts = [
    { slug: 'a', locale: 'en' },
    { slug: 'a', locale: 'ar' },
    { slug: 'b', locale: 'en' },
    { slug: 'c', locale: 'en' },
    { slug: 'c', locale: 'ar' },
  ]
  assert.equal(countMissingArSiblings(posts), 1)
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test --import tsx tests/admin-overview.test.ts`
Expected: FAIL (modules not found / functions undefined).

- [ ] **Step 4: Implement `bucketTopics`**

`lib/cms/admin/topics.ts`:

```ts
import type { TopicCount } from './types.ts'

const TOPIC_KEYWORDS: Record<string, string[]> = {
  'E-commerce': ['ecommerce', 'e-commerce', 'online store', 'store', 'shop', 'متجر', 'تسوق', 'متاجر'],
  'CRM / ERP': ['crm', 'erp', 'نظام إدارة', 'إدارة العملاء'],
  'Websites': ['website', 'web site', 'landing page', 'موقع', 'مواقع'],
  'Web apps': ['web app', 'web application', 'dashboard', 'portal', 'تطبيق ويب', 'لوحة تحكم'],
  'Automation': ['automation', 'automate', 'workflow', 'أتمتة', 'سير عمل'],
  'AI': ['chatbot', 'ai ', 'artificial intelligence', 'ذكاء اصطناعي', 'روبوت'],
  'Cloud': ['cloud', 'hosting', 'server', 'استضافة', 'سحاب', 'خادم'],
  'Pricing': ['price', 'pricing', 'cost', 'budget', 'سعر', 'تكلفة', 'ميزانية', 'كم'],
}

export function bucketTopics(transcripts: string[]): TopicCount[] {
  const counts = new Map<string, number>()
  for (const raw of transcripts) {
    const text = (raw || '').toLowerCase()
    if (!text.trim()) continue
    for (const [category, keywords] of Object.entries(TOPIC_KEYWORDS)) {
      if (keywords.some((k) => text.includes(k))) {
        counts.set(category, (counts.get(category) || 0) + 1)
      }
    }
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
```

- [ ] **Step 5: Implement `metrics`**

`lib/cms/admin/metrics.ts`:

```ts
import type { Delta } from './types.ts'

export function computeDelta(current: number, previous: number): Delta {
  if (previous === 0) {
    return current === 0 ? { pct: 0, direction: 'flat' } : { pct: 100, direction: 'up' }
  }
  const change = ((current - previous) / previous) * 100
  const pct = Math.round(Math.abs(change))
  if (pct === 0) return { pct: 0, direction: 'flat' }
  return { pct, direction: change > 0 ? 'up' : 'down' }
}

export function countMissingArSiblings(posts: Array<{ slug: string; locale: string }>): number {
  const arSlugs = new Set(posts.filter((p) => p.locale === 'ar').map((p) => p.slug))
  return posts.filter((p) => p.locale === 'en' && !arSlugs.has(p.slug)).length
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `node --test --import tsx tests/admin-overview.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 7: Commit**

```bash
git add lib/cms/admin/types.ts lib/cms/admin/topics.ts lib/cms/admin/metrics.ts tests/admin-overview.test.ts
git commit -m "feat(cms): pure dashboard helpers with tests"
```

---

## Task 3: `getOverviewStats()` server aggregation

**Files:**
- Create: `lib/cms/admin/overview.ts`

- [ ] **Step 1: Implement the aggregation**

`lib/cms/admin/overview.ts`. Reads via the Payload local API for counts/lists and `queryDatabase()` only for the views sum. All wrapped in try/catch so the dashboard never crashes on a cold/empty DB. Uses fixed time windows derived from a passed-in `now` (so it stays deterministic and avoids `Date.now()` pitfalls in tests if reused).

```ts
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
    kpis: [], activityByDay: [], recent: [], attention: [], topArticles: [], topTopics: [],
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
  const leadCollections = ['solution-finder-leads', 'ai-chat-leads', 'contact-inquiries']

  const [leads7, leadsPrev7, convo7, convoPrev7, drafts, scheduled] = await Promise.all([
    Promise.all(leadCollections.map((c) => safeCount(payload, c, { createdAt: { greater_than: last7 } }))).then((a) => a.reduce((x, y) => x + y, 0)),
    Promise.all(leadCollections.map((c) => safeCount(payload, c, { and: [{ createdAt: { greater_than: prev7 } }, { createdAt: { less_than: last7 } }] }))).then((a) => a.reduce((x, y) => x + y, 0)),
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
      id: String(d.id), title: d.title || '(untitled)', locale: (d.locale || 'en').toUpperCase(),
      views: d.viewsCount || 0, href: `/admin/collections/blog-posts/${d.id}`,
    }))
    const lowSeoRes = await payload.count({ collection: 'blog-posts', where: { seoScore: { less_than: 60 } }, overrideAccess: true })
    lowSeo = lowSeoRes.totalDocs ?? 0
    const allPosts = await payload.find({ collection: 'blog-posts', limit: 1000, depth: 0, overrideAccess: true, select: { slug: true, locale: true } })
    allPostsForSiblings = (allPosts.docs || []).map((d: any) => ({ slug: d.slug, locale: d.locale }))
  } catch { /* leave defaults */ }

  let pagesMissingMeta = 0
  try {
    const pages = await payload.find({ collection: 'pages', limit: 1000, depth: 0, overrideAccess: true })
    pagesMissingMeta = (pages.docs || []).filter((p: any) => !p?.seo?.description).length
  } catch { /* 0 */ }

  const articlesMissingAr = countMissingArSiblings(allPostsForSiblings)

  let topTopics: OverviewStats['topTopics'] = []
  try {
    const convos = await payload.find({ collection: 'ai-chat-conversations', sort: '-createdAt', limit: 200, depth: 0, overrideAccess: true, select: { transcriptText: true } })
    topTopics = bucketTopics((convos.docs || []).map((c: any) => c.transcriptText || '')).slice(0, 5)
  } catch { /* [] */ }

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
    for (const d of sf.docs || []) items.push({ id: String(d.id), kind: 'solution-finder', title: `${d.name || 'Lead'} · ${d.recommendedPackage || d.projectType || 'Recommendation'}`, subtitle: `Solution finder · ${d.country || '—'}`, badge: 'New', at: d.createdAt, href: `/admin/collections/solution-finder-leads/${d.id}` })
  } catch { /* skip */ }
  try {
    const cv = await payload.find({ collection: 'ai-chat-conversations', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of cv.docs || []) items.push({ id: String(d.id), kind: 'chatbot', title: `Chatbot · ${d.messageCount || 0} turns`, subtitle: `${(d.language || 'unknown')} · ${d.status || 'active'}`, badge: 'Chat', at: d.createdAt, href: `/admin/collections/ai-chat-conversations/${d.id}` })
  } catch { /* skip */ }
  try {
    const ci = await payload.find({ collection: 'contact-inquiries', sort: '-createdAt', limit: 4, depth: 0, overrideAccess: true })
    for (const d of ci.docs || []) items.push({ id: String(d.id), kind: 'contact', title: `${d.name || 'Inquiry'}`, subtitle: `Contact form`, badge: 'Inquiry', at: d.createdAt, href: `/admin/collections/contact-inquiries/${d.id}` })
  } catch { /* skip */ }
  return items.filter((i) => i.at).sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, 6)
}

async function buildActivityByDay(payload: any, now: number): Promise<DayCount[]> {
  const days: DayCount[] = []
  for (let i = 6; i >= 0; i--) {
    const start = new Date(now - i * DAY); start.setHours(0, 0, 0, 0)
    const end = new Date(start.getTime() + DAY)
    const label = start.toLocaleDateString('en-US', { weekday: 'short' })
    const [conversations, sf, ac, ci] = await Promise.all([
      safeCount(payload, 'ai-chat-conversations', { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }),
      safeCount(payload, 'solution-finder-leads', { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }),
      safeCount(payload, 'ai-chat-leads', { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }),
      safeCount(payload, 'contact-inquiries', { and: [{ createdAt: { greater_than_equal: start.toISOString() } }, { createdAt: { less_than: end.toISOString() } }] }),
    ])
    days.push({ day: label, conversations, leads: sf + ac + ci })
  }
  return days
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors in `lib/cms/admin/overview.ts`. (If `queryDatabase` generic signature differs, adjust the call to match `lib/cms/db.ts`.)

- [ ] **Step 3: Commit**

```bash
git add lib/cms/admin/overview.ts
git commit -m "feat(cms): getOverviewStats server aggregation"
```

---

## Task 4: CommandCenter dashboard component

**Files:**
- Create: `components/payload/CommandCenter.tsx`
- Modify: `payload.config.ts`

- [ ] **Step 1: Build the server component**

`components/payload/CommandCenter.tsx`. Server component (no `'use client'`). Renders the sections from `getOverviewStats()`. Chart = pure CSS bars (no client JS). Uses lucide-react + next/link (already used). Brand accent `#0ea5e9`. Uses Payload admin CSS vars (`--theme-elevation-*`, `--theme-text`) so it matches the panel theme in light/dark.

```tsx
import Link from 'next/link'
import { TrendingUp, TrendingDown, Target, MessageSquare, Mail, Plus, Upload, AlertTriangle, Eye, Clock, Languages, Server } from 'lucide-react'
import { getOverviewStats } from '../../lib/cms/admin/overview.ts'
import type { ActivityItem } from '../../lib/cms/admin/types.ts'

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 60) return `${Math.max(1, m)}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

const kindIcon: Record<ActivityItem['kind'], typeof Target> = { 'solution-finder': Target, chatbot: MessageSquare, contact: Mail }

export async function CommandCenter() {
  const stats = await getOverviewStats()
  const maxDay = Math.max(1, ...stats.activityByDay.map((d) => d.conversations + d.leads))

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Command center</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--theme-elevation-500)', fontSize: 13 }}>Your CloudTopia control center</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/admin/collections/blog-posts/create" style={btn(true)}><Plus size={16} /> New article</Link>
          <Link href="/admin/collections/blog-posts/create" style={btn(false)}><Upload size={16} /> Import MDX</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.kpis.map((k) => (
          <div key={k.label} style={card()}>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-500)' }}>{k.label}</p>
            <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 500 }}>{k.value}</p>
            {k.delta && k.delta.direction !== 'flat' && (
              <p style={{ margin: '4px 0 0', fontSize: 12, color: k.delta.direction === 'up' ? '#1d9e75' : '#cf4d4d', display: 'flex', alignItems: 'center', gap: 4 }}>
                {k.delta.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {k.delta.pct}% vs prev
              </p>
            )}
            {k.hint && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#b8860b' }}>{k.hint}</p>}
          </div>
        ))}
      </div>

      <div style={panel()}>
        <p style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 500 }}>Activity — last 7 days</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
          {stats.activityByDay.map((d) => (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 130 }}>
                <div title={`${d.conversations} conversations`} style={{ width: 12, height: `${(d.conversations / maxDay) * 100}%`, background: '#0ea5e9', borderRadius: 3, minHeight: 2 }} />
                <div title={`${d.leads} leads`} style={{ width: 12, height: `${(d.leads / maxDay) * 100}%`, background: '#1d9e75', borderRadius: 3, minHeight: 2 }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#0ea5e9' }} /> Conversations</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#1d9e75' }} /> Leads</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 500 }}>Recent activity</p>
          {stats.recent.length === 0 && <p style={empty()}>No recent activity yet.</p>}
          {stats.recent.map((it) => {
            const Icon = kindIcon[it.kind]
            return (
              <Link key={`${it.kind}-${it.id}`} href={it.href} style={row()}>
                <span style={iconCircle()}><Icon size={16} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title}</span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--theme-elevation-500)' }}>{it.subtitle}</span>
                </span>
                <span style={{ fontSize: 11, color: 'var(--theme-elevation-450)' }}>{relTime(it.at)}</span>
              </Link>
            )
          })}
        </div>

        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 500 }}>Needs your attention</p>
          {stats.attention.map((a) => (
            <Link key={a.label} href={a.href} style={row()}>
              <AlertTriangle size={16} color={a.tone === 'danger' ? '#cf4d4d' : a.tone === 'warning' ? '#b8860b' : 'var(--theme-elevation-500)'} />
              <span style={{ flex: 1, fontSize: 13 }}>{a.label}</span>
              <span style={countPill()}>{a.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 500 }}>Top articles</p>
          {stats.topArticles.length === 0 && <p style={empty()}>No published articles yet.</p>}
          {stats.topArticles.map((a) => (
            <Link key={a.id} href={a.href} style={row()}>
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
              <span style={{ fontSize: 11, color: 'var(--theme-elevation-450)' }}>{a.locale}</span>
              <span style={{ fontSize: 13, color: 'var(--theme-elevation-600)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Eye size={13} /> {a.views.toLocaleString('en-US')}</span>
            </Link>
          ))}
        </div>

        <div style={panel()}>
          <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 500 }}>Top topics asked</p>
          {stats.topTopics.length === 0 && <p style={empty()}>No conversations yet.</p>}
          {stats.topTopics.map((t, i) => {
            const max = stats.topTopics[0]?.count || 1
            return (
              <div key={t.category} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 13, minWidth: 96 }}>{t.category}</span>
                <span style={{ flex: 1, height: 6, background: 'var(--theme-elevation-150)', borderRadius: 999, overflow: 'hidden' }}>
                  <span style={{ display: 'block', width: `${(t.count / max) * 100}%`, height: '100%', background: i < 2 ? '#0ea5e9' : '#1d9e75' }} />
                </span>
                <span style={{ fontSize: 12, color: 'var(--theme-elevation-500)', minWidth: 24, textAlign: 'right' }}>{t.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ ...panel(), marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 13 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: stats.siteHealth.storageConfigured ? '#1d9e75' : '#cf4d4d' }}><Server size={15} /> Media storage: {stats.siteHealth.storageConfigured ? 'connected' : 'not configured'}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--theme-elevation-600)' }}><Languages size={15} /> {stats.siteHealth.articlesMissingAr} articles missing AR</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--theme-elevation-600)' }}><Clock size={15} /> {stats.siteHealth.pagesMissingMeta} pages missing meta</span>
      </div>
    </div>
  )
}

function btn(primary: boolean): React.CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 14px', borderRadius: 8, textDecoration: 'none', border: '1px solid var(--theme-elevation-150)', color: primary ? '#fff' : 'var(--theme-text)', background: primary ? '#0ea5e9' : 'transparent' }
}
function card(): React.CSSProperties { return { background: 'var(--theme-elevation-50)', borderRadius: 8, padding: 16 } }
function panel(): React.CSSProperties { return { background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-100)', borderRadius: 12, padding: '16px 20px' } }
function row(): React.CSSProperties { return { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: '1px solid var(--theme-elevation-100)', textDecoration: 'none', color: 'var(--theme-text)' } }
function iconCircle(): React.CSSProperties { return { width: 32, height: 32, borderRadius: '50%', background: 'var(--theme-elevation-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }
function countPill(): React.CSSProperties { return { background: 'var(--theme-elevation-100)', color: 'var(--theme-elevation-600)', fontSize: 12, padding: '2px 8px', borderRadius: 8 } }
function empty(): React.CSSProperties { return { fontSize: 13, color: 'var(--theme-elevation-450)', margin: '8px 0' } }
```

Note: the first row in each list has a top border; acceptable, or add `:first-child` handling later. Keep simple for v1.

- [ ] **Step 2: Wire it into the config**

In `payload.config.ts`, change the dashboard view component:

```ts
dashboard: {
  Component: '@/components/payload/CommandCenter#CommandCenter',
},
```

(Replaces the `EditorialDashboard#EditorialDashboard` reference.)

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success; no references to a missing export.

- [ ] **Step 4: Commit**

```bash
git add components/payload/CommandCenter.tsx payload.config.ts
git commit -m "feat(cms): command-center dashboard"
```

---

## Task 5: Verify in the running admin, then remove the old dashboard

**Files:**
- Delete: `components/payload/EditorialDashboard.tsx`

- [ ] **Step 1: Start the dev server and verify the dashboard**

Use the preview tooling: start the dev server, load `/admin` (log in if needed), and confirm:
- The command center renders with KPIs, the 7-day bar chart, recent activity, needs-attention, top articles, top topics, and the site-health strip.
- The grouped nav (Cockpit / Content / CRM/Inbox / AI & Activity / Settings) shows and every link resolves (no 404).
- No console/server errors.

Capture a screenshot for the record.

- [ ] **Step 2: Confirm no data was mutated**

Run a count check (read-only) before/after is unnecessary since nothing writes, but confirm the page issued only reads (no PATCH/POST in the network panel besides auth).

- [ ] **Step 3: Remove the old dashboard component**

Delete `components/payload/EditorialDashboard.tsx` (now unreferenced). Confirm nothing imports it:

Run: `grep -rn "EditorialDashboard" --include="*.ts" --include="*.tsx" . | grep -v node_modules`
Expected: no results.

- [ ] **Step 4: Build + smoke tests**

Run: `npm run build && npm run test:smoke`
Expected: build succeeds; smoke tests pass (including the new `admin-overview` tests if added to the script — optionally extend `test:smoke` to include `tests/admin-overview.test.ts`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(cms): remove legacy EditorialDashboard"
```

---

## Self-review notes

- **Spec coverage:** M1 (admin shell) = Task 1. M2 (dashboard, all 7 sections + site health) = Tasks 2–4. Verification + cleanup = Task 5. ✔
- **Out of scope (correctly deferred):** `/admin/articles` and `/admin/seo` routes (M3/M4 increments); the nav points "Articles" at the native collection screen until M3 swaps it.
- **Data safety:** all reads use `overrideAccess` server-side; no writes; old dashboard removed only after the new one renders.
- **Known simplification:** views KPI is a lifetime total (no per-day view history exists); the activity chart uses leads+conversations which have timestamps. Documented in the spec.
