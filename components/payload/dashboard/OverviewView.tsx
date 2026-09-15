import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import type { OverviewStats, RangeKey } from '../../../lib/cms/admin/types.ts'
import { ActivityChart } from './ActivityChart.tsx'
import { ContentHealthCard, RecentActivityCard, TopArticlesCard } from './BottomRow.tsx'
import { EmptyState } from './EmptyState.tsx'
import {
  formatKeyMonthDay,
  formatKeyWeekdayDay,
  formatKeyWeekdayMonthDay,
  formatLongDate,
  formatNumber,
  greetingFor,
  plural,
} from './format.ts'
import { DeltaChip, KpiCards } from './KpiCards.tsx'
import { LeadsInbox } from './LeadsInbox.tsx'
import { PublishingCalendar } from './PublishingCalendar.tsx'

// Pure rendering of the admin Overview (data comes from getOverviewStats).
// The range tabs and week arrows are plain links (?range=, ?week=) that the
// server re-renders, so every number on the page comes from the database.

const RANGES: RangeKey[] = ['7d', '28d', '90d']

export function dashboardHref(range: RangeKey, week: number): string {
  const params = new URLSearchParams()
  if (range !== '7d') params.set('range', range)
  if (week !== 0) params.set('week', String(week))
  const query = params.toString()
  return query ? `/admin?${query}` : '/admin'
}

function summaryLine(stats: OverviewStats): string {
  const parts: string[] = []
  if (!stats.unavailable.includes('posts')) {
    const n = stats.kpis.scheduled.articlesThisWeek
    parts.push(n > 0 ? `${plural(n, 'article goes', 'articles go')} live this week` : 'nothing is scheduled to go live this week')
  }
  if (!stats.unavailable.includes('events')) {
    const m = stats.kpis.newLeadsWaiting
    parts.push(m > 0 ? `${plural(m, 'new inquiry is', 'new inquiries are')} waiting` : 'the leads inbox is clear')
  }
  const sentence = parts.join(' and ')
  return sentence ? `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.` : ''
}

function chartTicks(days: string[]): Array<{ index: number; label: string }> {
  if (days.length <= 7) return days.map((day, index) => ({ index, label: formatKeyWeekdayDay(day) }))
  return Array.from({ length: 5 }, (_, i) => {
    const index = Math.round((i * (days.length - 1)) / 4)
    return { index, label: formatKeyMonthDay(days[index]) }
  })
}

function ActivityCard({ stats }: { stats: OverviewStats }) {
  const { activity, kpis, range } = stats
  const { conversations, leads } = kpis
  const period = `vs previous ${range.days} days`
  const captureRate = conversations.current > 0 ? `${Math.round((conversations.captured / conversations.current) * 100)}%` : '—'
  return (
    <section className="ct-dash-card" aria-labelledby="ct-dash-activity-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-activity-title" className="ct-dash-card-title">
          Activity
        </h2>
        <span className="ct-dash-card-sub">Chatbot conversations vs leads · last {range.days} days</span>
      </header>
      <div className="ct-dash-card-body" style={{ paddingBottom: 12 }}>
        {stats.unavailable.includes('events') ? (
          <EmptyState error title="Couldn’t load activity" hint="The leads and conversations queries failed. Refresh to try again." />
        ) : (
          <>
            <div className="ct-dash-chart-top">
              <div className="ct-dash-stats">
                <div>
                  <div className="ct-dash-stat-k">Conversations</div>
                  <div className="ct-dash-stat-v">
                    {formatNumber(conversations.current)} <DeltaChip delta={conversations.delta} context={period} />
                  </div>
                </div>
                <div>
                  <div className="ct-dash-stat-k">Leads</div>
                  <div className="ct-dash-stat-v">
                    {formatNumber(leads.current)} <DeltaChip delta={leads.delta} context={period} />
                  </div>
                </div>
                <div>
                  <div className="ct-dash-stat-k">Chats with a lead</div>
                  <div className="ct-dash-stat-v">{captureRate}</div>
                </div>
                <div>
                  <div className="ct-dash-stat-k">Avg. messages / chat</div>
                  <div className="ct-dash-stat-v">{conversations.avgMessages ?? '—'}</div>
                </div>
              </div>
              <span className="ct-dash-spacer" />
              <div className="ct-dash-legend" aria-hidden="true">
                <span>
                  <i style={{ background: '#4f46e5' }} />
                  Conversations
                </span>
                <span>
                  <i style={{ background: '#10b981' }} />
                  Leads
                </span>
                <span>
                  <i style={{ background: 'repeating-linear-gradient(90deg, #94a3b8 0 3px, transparent 3px 5px)' }} />
                  Previous {range.days} days
                </span>
              </div>
            </div>
            <ActivityChart
              labels={activity.current.days.map(formatKeyWeekdayMonthDay)}
              previousLabels={activity.previous.days.map(formatKeyWeekdayMonthDay)}
              ticks={chartTicks(activity.current.days)}
              conversations={activity.current.conversations}
              leads={activity.current.leads}
              previousConversations={activity.previous.conversations}
              previousLeads={activity.previous.leads}
              rangeLabel={`last ${range.days} days`}
            />
          </>
        )}
      </div>
    </section>
  )
}

export type OverviewViewProps = {
  stats: OverviewStats
  now: number
  userName: string | null
  range: RangeKey
  weekOffset: number
}

export function OverviewView({ stats, now, userName, range, weekOffset }: OverviewViewProps) {
  const summary = summaryLine(stats)
  const unavailable = new Set(stats.unavailable)

  return (
    <div className="ct-dash-root">
      <header className="ct-dash-head">
        <div>
          <h1 className="ct-dash-title">
            {greetingFor(now)}
            {userName ? `, ${userName}` : ''}
          </h1>
          <div className="ct-dash-sub">
            {formatLongDate(now)}
            {summary ? ` · ${summary}` : ''}
          </div>
        </div>
        <nav className="ct-dash-seg" aria-label="Date range for leads and conversations">
          {RANGES.map((key) => (
            <Link
              key={key}
              className={key === range ? 'is-on' : undefined}
              href={dashboardHref(key, weekOffset)}
              prefetch={false}
              scroll={false}
              aria-current={key === range ? 'true' : undefined}
            >
              {key}
            </Link>
          ))}
        </nav>
      </header>

      {!stats.databaseReady ? (
        <div className="ct-dash-notice" role="status">
          <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
          The database isn’t configured, so the overview has nothing to show.
        </div>
      ) : unavailable.size > 0 ? (
        <div className="ct-dash-notice" role="status">
          <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
          Some widgets couldn’t load and are marked below. Everything else is current.
        </div>
      ) : null}

      <KpiCards kpis={stats.kpis} health={stats.health} rangeDays={stats.range.days} unavailable={stats.unavailable} />

      <div className="ct-dash-row is-main">
        <ActivityCard stats={stats} />
        <LeadsInbox leads={stats.inbox} newCount={stats.kpis.newLeadsWaiting} now={now} unavailable={unavailable.has('inbox')} />
      </div>

      <div className="ct-dash-row">
        <PublishingCalendar
          week={stats.week}
          unavailable={unavailable.has('posts')}
          hrefs={{
            previous: dashboardHref(range, weekOffset - 1),
            next: dashboardHref(range, weekOffset + 1),
            today: dashboardHref(range, 0),
          }}
        />
      </div>

      <div className="ct-dash-row is-bottom">
        <ContentHealthCard health={stats.health} unavailable={unavailable.has('posts') || unavailable.has('pages')} />
        <TopArticlesCard rows={stats.topArticles} unavailable={unavailable.has('posts')} />
        <RecentActivityCard items={stats.feed} now={now} unavailable={unavailable.has('feed')} />
      </div>
    </div>
  )
}
