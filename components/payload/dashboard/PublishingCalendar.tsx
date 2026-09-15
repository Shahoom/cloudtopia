import Link from 'next/link'
import { AlertCircle, Check, ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react'
import type { CalendarEntry, CalendarLocaleInfo, PublishingWeek } from '../../../lib/cms/admin/types.ts'
import { EmptyState } from './EmptyState.tsx'
import { formatKeyLong, formatKeyWeekday, formatMonthDay, formatNumber, formatTime, formatWeekRange, formatWeekdayTime, hasArabic, statusPhrase } from './format.ts'

// Batch imports can put a dozen posts on one day; keep the week readable.
const VISIBLE_PER_DAY = 3

function localeTitle(code: 'EN' | 'AR', info: CalendarLocaleInfo): string {
  if (info.state === 'missing') return `No ${code} version yet`
  if (info.inCard) return `${code} ${info.status === 'published' ? 'published' : 'goes live'} with this post`
  if (info.status === 'published') return `${code} already published${info.at ? ` ${formatMonthDay(info.at)}` : ''}`
  if (info.status === 'scheduled' && info.at) return `${code} scheduled for ${formatWeekdayTime(info.at)}`
  return `${code} is ${statusPhrase(info.status)}`
}

function LocalePill({ code, info }: { code: 'EN' | 'AR'; info: CalendarLocaleInfo }) {
  const title = localeTitle(code, info)
  return (
    <span className={`ct-dash-loc is-${info.state}`} title={title}>
      {code}
      <span className="ct-dash-sr">: {title}</span>
    </span>
  )
}

function EventCard({ entry }: { entry: CalendarEntry }) {
  const Icon = entry.kind === 'published' ? Check : entry.kind === 'overdue' ? AlertCircle : Clock
  const time = formatTime(entry.at)
  const label = entry.kind === 'published' ? `Published · ${time}` : entry.kind === 'overdue' ? `Overdue · ${time}` : time
  const rtl = entry.titleLocale === 'ar' || hasArabic(entry.title)
  const missing = entry.locales.en.state === 'missing' ? 'EN' : entry.locales.ar.state === 'missing' ? 'AR' : null
  return (
    <Link
      className={`ct-dash-event is-${entry.kind}`}
      href={`/admin/collections/blog-posts/${entry.id}`}
      prefetch={false}
      title={entry.kind === 'overdue' ? 'Still scheduled after the daily 08:00 GST publish run should have taken it live.' : undefined}
    >
      <span className="ct-dash-event-time">
        <Icon size={12} strokeWidth={2} aria-hidden="true" />
        {label}
        {entry.kind === 'scheduled' && <span className="ct-dash-sr"> scheduled</span>}
      </span>
      <span className="ct-dash-event-title" dir={rtl ? 'rtl' : undefined} lang={rtl ? 'ar' : undefined}>
        {entry.title}
      </span>
      <span className="ct-dash-event-locales">
        <LocalePill code="EN" info={entry.locales.en} />
        <LocalePill code="AR" info={entry.locales.ar} />
        {missing && (
          <span className="ct-dash-missing" aria-hidden="true">
            {missing} missing
          </span>
        )}
      </span>
    </Link>
  )
}

export function PublishingCalendar({
  week,
  hrefs,
  unavailable,
}: {
  week: PublishingWeek
  hrefs: { previous: string; next: string; today: string }
  unavailable: boolean
}) {
  const first = week.days[0].date
  const last = week.days[week.days.length - 1].date
  const summary = [
    week.publishedCount > 0 ? `${formatNumber(week.publishedCount)} published` : null,
    week.scheduledCount > 0 ? `${formatNumber(week.scheduledCount)} scheduled` : 'No scheduled posts this week',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section className="ct-dash-card" aria-labelledby="ct-dash-cal-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-cal-title" className="ct-dash-card-title">
          Publishing calendar
        </h2>
        <span className="ct-dash-card-sub">{formatWeekRange(first, last)} · Asia/Muscat</span>
        <span className="ct-dash-spacer" />
        {!unavailable && <span className="ct-dash-cal-summary">{summary}</span>}
        <Link className="ct-dash-btn" href={hrefs.today} prefetch={false} scroll={false} aria-current={week.offset === 0 ? 'date' : undefined}>
          Today
        </Link>
        <span className="ct-dash-cal-nav">
          <Link className="ct-dash-icon-btn" href={hrefs.previous} prefetch={false} scroll={false} aria-label="Previous week">
            <ChevronLeft size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="ct-dash-icon-btn" href={hrefs.next} prefetch={false} scroll={false} aria-label="Next week">
            <ChevronRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </span>
      </header>

      {unavailable ? (
        <EmptyState error title="Couldn’t load the publishing calendar" hint="The articles query failed. Refresh to try again." />
      ) : (
        <div className="ct-dash-week-scroll">
          <ol className="ct-dash-week">
            {week.days.map((day) => {
              const classes = ['ct-dash-day', day.isToday && 'is-today', day.isPast && 'is-past', day.isWeekend && 'is-weekend'].filter(Boolean).join(' ')
              const canAdd = !day.isWeekend && !day.isPast && day.entries.length === 0
              return (
                <li key={day.date} className={classes}>
                  <div className="ct-dash-day-head">
                    <span aria-hidden="true">{formatKeyWeekday(day.date)}</span>
                    <span className="ct-dash-day-num" aria-hidden="true">
                      {Number(day.date.slice(8))}
                    </span>
                    <span className="ct-dash-sr">
                      {formatKeyLong(day.date)}
                      {day.isWeekend ? ', weekend' : ''}
                      {`, ${day.entries.length} ${day.entries.length === 1 ? 'post' : 'posts'}`}
                    </span>
                    <span className="ct-dash-day-count" aria-hidden="true">
                      {day.isToday ? 'Today' : day.entries.length || ''}
                    </span>
                  </div>
                  {day.entries.slice(0, VISIBLE_PER_DAY).map((entry) => (
                    <EventCard key={entry.key} entry={entry} />
                  ))}
                  {day.entries.length > VISIBLE_PER_DAY && (
                    <details className="ct-dash-more">
                      <summary>
                        <span className="is-closed">+{day.entries.length - VISIBLE_PER_DAY} more</span>
                        <span className="is-open">Show less</span>
                      </summary>
                      {day.entries.slice(VISIBLE_PER_DAY).map((entry) => (
                        <EventCard key={entry.key} entry={entry} />
                      ))}
                    </details>
                  )}
                  {day.isWeekend && day.entries.length === 0 && <div className="ct-dash-weekend-label">Weekend</div>}
                  {canAdd && (
                    <Link className="ct-dash-slot" href="/admin/collections/blog-posts/create" prefetch={false}>
                      <Plus size={12} strokeWidth={2} aria-hidden="true" />
                      Add<span className="ct-dash-sr"> an article</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </section>
  )
}
