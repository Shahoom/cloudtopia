import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, CalendarClock, Inbox, MessagesSquare, Newspaper } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ContentHealth, Delta, LeadSource, OverviewKpis, OverviewSection } from '../../../lib/cms/admin/types.ts'
import { formatNumber, formatWeekdayTime, plural } from './format.ts'

const SOURCE_LABELS: Record<LeadSource, string> = {
  contact: 'contact form',
  finder: 'Solution finder',
  chatbot: 'chatbot',
  clinictopia: 'ClinicTopia',
  hasm: 'Hasm ERP',
}

/** Mini trend line; flat series sit mid-height so "no change" never reads as "zero". */
export function Sparkline({ id, values, color }: { id: string; values: number[]; color: string }) {
  const series = values.length > 1 ? values : [values[0] ?? 0, values[0] ?? 0]
  const w = 100
  const h = 32
  const pad = 3
  const min = Math.min(...series)
  const max = Math.max(...series)
  const points = series.map((v, i) => {
    const x = (i * w) / (series.length - 1)
    const y = max === min ? h / 2 : h - pad - ((v - min) / (max - min)) * (h - pad * 2)
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  })
  const line = points.join(' ')
  const fill = `${id}-fill`
  return (
    <svg className="ct-dash-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={fill} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.2" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w} ${h} L0 ${h}Z`} fill={`url(#${fill})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export function DeltaChip({ delta, context }: { delta: Delta; context: string }) {
  const Icon = delta.direction === 'down' ? ArrowDownRight : ArrowUpRight
  const words = delta.direction === 'up' ? 'up' : delta.direction === 'down' ? 'down' : 'unchanged'
  return (
    <span className={`ct-dash-delta is-${delta.direction}`}>
      {delta.direction !== 'flat' && <Icon size={12} strokeWidth={2} aria-hidden="true" />}
      {delta.pct}%<span className="ct-dash-sr"> {words} {context}</span>
    </span>
  )
}

function KpiCard(props: {
  href: string
  icon: ReactNode
  label: string
  value: string
  sparkId: string
  spark: number[]
  color: string
  children: ReactNode
}) {
  return (
    <Link className="ct-dash-card ct-dash-kpi" href={props.href} prefetch={false}>
      <div className="ct-dash-kpi-label">
        <span className="ct-dash-kpi-icon" aria-hidden="true">
          {props.icon}
        </span>
        {props.label}
      </div>
      <div className="ct-dash-kpi-value">
        <span className="ct-dash-kpi-number">{props.value}</span>
        <Sparkline id={props.sparkId} values={props.spark} color={props.color} />
      </div>
      <div className="ct-dash-kpi-foot">{props.children}</div>
    </Link>
  )
}

const unavailableFoot = <span>Couldn’t load this metric</span>

export function KpiCards({
  kpis,
  health,
  rangeDays,
  unavailable,
}: {
  kpis: OverviewKpis
  health: ContentHealth
  rangeDays: number
  unavailable: OverviewSection[]
}) {
  const postsDown = unavailable.includes('posts')
  const eventsDown = unavailable.includes('events')
  const { published, leads, conversations, scheduled } = kpis
  const topSources = (Object.entries(leads.bySource) as Array<[LeadSource, number]>)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([source, n]) => `${formatNumber(n)} ${SOURCE_LABELS[source]}`)
  const period = `vs previous ${rangeDays} days`

  return (
    <section className="ct-dash-kpis" aria-label="Key metrics">
      <KpiCard
        href="/admin/articles"
        icon={<Newspaper size={15} strokeWidth={2} />}
        label="Published articles"
        value={postsDown ? '—' : formatNumber(published.total)}
        sparkId="ct-dash-spark-published"
        spark={published.spark}
        color="#4f46e5"
      >
        {postsDown ? (
          unavailableFoot
        ) : (
          <>
            <span className={`ct-dash-delta ${published.last30Days > 0 ? 'is-up' : 'is-flat'}`}>+{formatNumber(published.last30Days)}</span>
            <span>
              last 30 days
              {health.missingAr > 0 ? ` · ${formatNumber(health.missingAr)} missing AR` : ''}
            </span>
          </>
        )}
      </KpiCard>

      <KpiCard
        href="/admin/collections/contact-inquiries"
        icon={<Inbox size={15} strokeWidth={2} />}
        label={`New leads · ${rangeDays}d`}
        value={eventsDown ? '—' : formatNumber(leads.current)}
        sparkId="ct-dash-spark-leads"
        spark={leads.spark}
        color="#10b981"
      >
        {eventsDown ? (
          unavailableFoot
        ) : (
          <>
            <DeltaChip delta={leads.delta} context={period} />
            <span>{topSources.length ? topSources.join(' · ') : period}</span>
          </>
        )}
      </KpiCard>

      <KpiCard
        href="/admin/collections/ai-chat-conversations"
        icon={<MessagesSquare size={15} strokeWidth={2} />}
        label={`Conversations · ${rangeDays}d`}
        value={eventsDown ? '—' : formatNumber(conversations.current)}
        sparkId="ct-dash-spark-conversations"
        spark={conversations.spark}
        color="#4f46e5"
      >
        {eventsDown ? (
          unavailableFoot
        ) : (
          <>
            <DeltaChip delta={conversations.delta} context={period} />
            <span>{conversations.captured > 0 ? `${plural(conversations.captured, 'captured a lead', 'captured a lead')}` : period}</span>
          </>
        )}
      </KpiCard>

      <KpiCard
        href="/admin/collections/blog-posts?where[status][equals]=scheduled"
        icon={<CalendarClock size={15} strokeWidth={2} />}
        label="Scheduled posts"
        value={postsDown ? '—' : formatNumber(scheduled.total)}
        sparkId="ct-dash-spark-scheduled"
        spark={scheduled.spark}
        color="#0ea5e9"
      >
        {postsDown ? (
          unavailableFoot
        ) : (
          <>
            {scheduled.overdue > 0 ? (
              <span className="ct-dash-delta is-down">{formatNumber(scheduled.overdue)} overdue</span>
            ) : (
              <span className={`ct-dash-delta ${scheduled.articlesThisWeek > 0 ? 'is-info' : 'is-flat'}`}>
                {formatNumber(scheduled.articlesThisWeek)} this week
              </span>
            )}
            <span>{scheduled.next ? `next: ${formatWeekdayTime(scheduled.next.at)} GST` : 'Nothing queued'}</span>
          </>
        )}
      </KpiCard>
    </section>
  )
}
