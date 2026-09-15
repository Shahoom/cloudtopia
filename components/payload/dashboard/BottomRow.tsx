import Link from 'next/link'
import { ChevronRight, Eye, FileText, Image as ImageIcon, Languages, Newspaper, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { ContentHealth, FeedItem, TopArticleRow } from '../../../lib/cms/admin/types.ts'
import { EmptyState } from './EmptyState.tsx'
import { formatNumber, hasArabic, relativeTimeLong } from './format.ts'

const BUCKET_COLORS = ['#fb7185', '#7dd3fc', '#38bdf8', '#34d399', '#10b981']

const scoreTone = (score: number | null) => (!score || score <= 0 ? 'is-none' : score >= 80 ? 'is-good' : score >= 50 ? 'is-mid' : 'is-low')

export function ContentHealthCard({ health, unavailable }: { health: ContentHealth; unavailable: boolean }) {
  const avg = health.averageSeo
  const ringTone = avg === null ? '' : avg >= 80 ? '' : avg >= 50 ? ' is-mid' : ' is-low'
  const tallest = Math.max(1, ...health.buckets.map((b) => b.count))
  const siblings = health.missingAr + health.missingEn
  const issues = [
    {
      key: 'siblings',
      Icon: Languages,
      label: 'AR/EN sibling missing',
      title: `${health.missingAr} without Arabic · ${health.missingEn} without English`,
      count: siblings,
      href: '/admin/articles',
    },
    { key: 'unscored', Icon: Sparkles, label: 'Published, never scored', title: undefined, count: health.unscoredCount, href: '/admin/articles' },
    { key: 'alt', Icon: ImageIcon, label: 'Cover images without alt text', title: undefined, count: health.coversMissingAlt, href: '/admin/articles' },
    { key: 'pages', Icon: FileText, label: 'Pages missing meta description', title: undefined, count: health.pagesMissingMeta, href: '/admin/seo' },
  ]

  return (
    <section className="ct-dash-card" aria-labelledby="ct-dash-health-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-health-title" className="ct-dash-card-title">
          Content health
        </h2>
        <span className="ct-dash-spacer" />
        <Link className="ct-dash-link" href="/admin/seo" prefetch={false}>
          SEO center
        </Link>
      </header>
      {unavailable ? (
        <EmptyState error title="Couldn’t load content health" hint="The articles query failed. Refresh to try again." />
      ) : (
        <div className="ct-dash-card-body" style={{ paddingBottom: 6 }}>
          <div className="ct-dash-health-top">
            <span className={`ct-dash-ring${ringTone}`} style={{ '--v': avg ?? 0 } as CSSProperties} aria-hidden="true">
              <span>{avg ?? '—'}</span>
            </span>
            <div>
              <div className="ct-dash-strong">Average SEO score{avg === null ? '' : <span className="ct-dash-sr">: {avg}</span>}</div>
              <div className="ct-dash-meta">
                {health.scoredCount > 0
                  ? `${formatNumber(health.scoredCount)} scored of ${formatNumber(health.publishedCount)} published`
                  : 'No published article has a score yet'}
              </div>
            </div>
          </div>
          <div
            className="ct-dash-hist"
            role="img"
            aria-label={`SEO score distribution of scored articles: ${health.buckets.map((b) => `${b.count} scored ${b.label}`).join(', ')}`}
          >
            {health.buckets.map((bucket, i) => (
              <div className="ct-dash-hist-bar" key={bucket.label}>
                <span>{formatNumber(bucket.count)}</span>
                <i style={{ height: `${(bucket.count / tallest) * 100}%`, '--c': BUCKET_COLORS[i] } as CSSProperties} />
              </div>
            ))}
          </div>
          <div className="ct-dash-hist-x" aria-hidden="true">
            {health.buckets.map((bucket) => (
              <span key={bucket.label}>{bucket.label}</span>
            ))}
          </div>
          <ul className="ct-dash-issues">
            {issues.map(({ key, Icon, label, title, count, href }) => (
              <li key={key}>
                <Link className={`ct-dash-issue${count > 0 ? (key === 'siblings' ? ' is-alert' : '') : ' is-clear'}`} href={href} prefetch={false} title={title}>
                  <Icon className="ct-dash-issue-icon" size={15} strokeWidth={2} aria-hidden="true" />
                  {label}
                  <span className="ct-dash-issue-n">{formatNumber(count)}</span>
                  <ChevronRight className="ct-dash-issue-chev" size={15} strokeWidth={2} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export function TopArticlesCard({ rows, unavailable }: { rows: TopArticleRow[]; unavailable: boolean }) {
  const hasViews = rows.some((row) => row.views > 0)
  return (
    <section className="ct-dash-card" aria-labelledby="ct-dash-top-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-top-title" className="ct-dash-card-title">
          Top articles
        </h2>
        <span className="ct-dash-card-sub">Lifetime views</span>
        <span className="ct-dash-spacer" />
        <Link className="ct-dash-link" href="/admin/articles" prefetch={false}>
          All articles
        </Link>
      </header>
      {unavailable ? (
        <EmptyState error title="Couldn’t load top articles" hint="The articles query failed. Refresh to try again." />
      ) : !rows.length ? (
        <EmptyState icon={<Newspaper size={16} strokeWidth={2} aria-hidden="true" />} title="No published articles yet" />
      ) : !hasViews ? (
        <EmptyState
          icon={<Eye size={16} strokeWidth={2} aria-hidden="true" />}
          title="No views recorded yet"
          hint="Views are counted on the live site; this table fills in as articles get read."
        />
      ) : (
        <table className="ct-dash-table">
          <colgroup>
            <col />
            <col style={{ width: 64 }} />
            <col style={{ width: 64 }} />
            <col style={{ width: 52 }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Article</th>
              <th scope="col" className="ct-dash-num">
                Views
              </th>
              <th scope="col" className="ct-dash-num">
                Unique
              </th>
              <th scope="col" className="ct-dash-num">
                SEO
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rtl = row.locale === 'ar' || hasArabic(row.title)
              return (
                <tr key={row.id}>
                  <td>
                    <div className="ct-dash-article-cell">
                      <span className="ct-dash-loc">{row.locale.toUpperCase()}</span>
                      <Link
                        className="ct-dash-article-title"
                        href={`/admin/collections/blog-posts/${row.id}`}
                        prefetch={false}
                        dir={rtl ? 'rtl' : undefined}
                        lang={rtl ? 'ar' : undefined}
                        title={row.title}
                      >
                        {row.title}
                      </Link>
                    </div>
                  </td>
                  <td className="ct-dash-num">{formatNumber(row.views)}</td>
                  <td className="ct-dash-num">{formatNumber(row.uniqueViews)}</td>
                  <td className="ct-dash-num">
                    <span className={`ct-dash-score ${scoreTone(row.seoScore)}`}>{row.seoScore && row.seoScore > 0 ? Math.round(row.seoScore) : '—'}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}

const FEED_META: Record<FeedItem['collection'], { label: string; tone: string; Icon: typeof Newspaper }> = {
  'blog-posts': { label: 'Article', tone: 'is-article', Icon: Newspaper },
  pages: { label: 'Page', tone: 'is-page', Icon: FileText },
  media: { label: 'Media', tone: 'is-media', Icon: ImageIcon },
}

export function RecentActivityCard({ items, now, unavailable }: { items: FeedItem[]; now: number; unavailable: boolean }) {
  return (
    <section className="ct-dash-card" aria-labelledby="ct-dash-feed-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-feed-title" className="ct-dash-card-title">
          Recent activity
        </h2>
        <span className="ct-dash-card-sub">Articles, pages and media</span>
      </header>
      {unavailable ? (
        <EmptyState error title="Couldn’t load recent activity" hint="The activity query failed. Refresh to try again." />
      ) : !items.length ? (
        <EmptyState title="Nothing has changed yet" hint="Edits to articles, pages and media will show up here." />
      ) : (
        <ul className="ct-dash-feed">
          {items.map((item) => {
            const meta = FEED_META[item.collection]
            const rtl = hasArabic(item.title)
            return (
              <li key={item.key}>
                <span className={`ct-dash-feed-icon ${meta.tone}`} aria-hidden="true">
                  <meta.Icon size={14} strokeWidth={2} />
                </span>
                <div className="ct-dash-feed-text">
                  <b>{meta.label}</b> {item.verb}{' '}
                  <Link
                    className={`ct-dash-feed-title${rtl ? ' ct-dash-ar' : ''}`}
                    href={`/admin/collections/${item.collection}/${item.id}`}
                    prefetch={false}
                    dir={rtl ? 'rtl' : undefined}
                    lang={rtl ? 'ar' : undefined}
                  >
                    {item.title}
                  </Link>
                  <time className="ct-dash-when" dateTime={item.at}>
                    {relativeTimeLong(item.at, now)}
                    {item.locale ? ` · ${item.locale.toUpperCase()}` : ''}
                  </time>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
