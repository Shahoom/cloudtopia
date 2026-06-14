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
