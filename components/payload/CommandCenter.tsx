import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  Bell,
  MessageSquare,
  Plus,
  Scale,
  Send,
  Target,
} from 'lucide-react'
import { getOverviewStats } from '../../lib/cms/admin/overview.ts'
import type { ActivityItem } from '../../lib/cms/admin/types.ts'

// ── SaaS design system (design E): #fafafa canvas, white cards with 1px
// #e9eaec borders, indigo accent, delta chips, sparklines, data table. ──
const ACCENT = '#4f46e5'
const TEXT = '#111827'
const TEXT_SOFT = '#6b7280'
const TEXT_FAINT = '#9ca3af'
const BORDER = '1px solid #e9eaec'
const ROW_BORDER = '1px solid #f3f4f6'

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 60) return `${Math.max(1, m)}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

const kindMeta: Record<ActivityItem['kind'], { icon: typeof Target; color: string }> = {
  'solution-finder': { icon: Target, color: '#8b5cf6' },
  chatbot: { icon: MessageSquare, color: '#0ea5e9' },
  contact: { icon: Send, color: '#10b981' },
  'hasm-demo': { icon: Scale, color: '#f59e0b' },
}

// Build an SVG polyline path + closed area path from a numeric series.
function seriesPaths(values: number[], w: number, h: number, pad = 3) {
  const max = Math.max(1, ...values)
  const n = Math.max(1, values.length - 1)
  const pts = values.map((v, i) => [
    (i / n) * w,
    h - pad - (v / max) * (h - pad * 2),
  ])
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w} ${h} L0 ${h} Z`
  return { line, area }
}

function Sparkline({ values, color, fill }: { values: number[]; color: string; fill: string }) {
  const { line, area } = seriesPaths(values, 200, 36)
  return (
    <svg width="100%" height="36" viewBox="0 0 200 36" preserveAspectRatio="none" style={{ display: 'block', marginTop: 10 }}>
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export async function CommandCenter() {
  const stats = await getOverviewStats()

  const convSeries = stats.activityByDay.map((d) => d.conversations)
  const leadSeries = stats.activityByDay.map((d) => d.leads)
  const publishedKpi = stats.kpis.find((k) => k.label === 'Published articles')?.value ?? '0'
  const draftsKpi = stats.kpis.find((k) => k.label === 'Drafts to review')
  const viewsKpi = stats.kpis.find((k) => k.label === 'Total article views')?.value ?? '0'
  const leadsKpi = stats.kpis.find((k) => k.label === 'New leads · 7d')
  const convoKpi = stats.kpis.find((k) => k.label === 'Conversations · 7d')

  const big = seriesPaths(convSeries.length ? convSeries : [0], 600, 170, 8)
  const bigLeads = seriesPaths(leadSeries.length ? leadSeries : [0], 600, 170, 8)
  const attentionTotal = stats.attention.reduce((s, a) => s + (a.tone !== 'neutral' ? a.count : 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* ── Top bar: breadcrumb, tabs, actions ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: '#ffffff',
          borderBottom: BORDER,
          padding: '0 24px',
          height: 56,
          position: 'sticky',
          top: 0,
          zIndex: 20,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: TEXT_FAINT }}>
          Workspace / <b style={{ color: TEXT, fontWeight: 600 }}>Overview</b>
        </span>
        <div style={{ display: 'flex', gap: 2, height: '100%', marginInlineStart: 12 }}>
          {[
            { label: 'Overview', href: '/admin', on: true },
            { label: 'Content', href: '/admin/articles', on: false },
            { label: 'Leads', href: '/admin/collections/contact-inquiries', on: false },
            { label: 'SEO', href: '/admin/seo', on: false },
          ].map((t) => (
            <Link
              key={t.label}
              href={t.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 13px',
                fontSize: 13.5,
                color: t.on ? ACCENT : TEXT_SOFT,
                fontWeight: t.on ? 600 : 500,
                textDecoration: 'none',
                borderBottom: t.on ? `2px solid ${ACCENT}` : '2px solid transparent',
              }}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <span
          style={{
            marginInlineStart: 'auto',
            fontSize: 12,
            fontWeight: 600,
            color: TEXT_SOFT,
            border: BORDER,
            background: '#fff',
            borderRadius: 8,
            padding: '6px 12px',
          }}
        >
          Last 7 days
        </span>
        <span style={{ color: TEXT_SOFT, position: 'relative', display: 'inline-flex' }}>
          <Bell size={17} />
          {attentionTotal > 0 && (
            <i style={{ position: 'absolute', top: -2, insetInlineEnd: -2, width: 7, height: 7, background: '#ef4444', borderRadius: '50%' }} />
          )}
        </span>
        <Link
          href="/admin/collections/blog-posts/create"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: ACCENT,
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            padding: '8px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(79,70,229,.4)',
          }}
        >
          <Plus size={15} /> New article
        </Link>
      </div>

      <div style={{ padding: 24, display: 'grid', gap: 16, maxWidth: 1280, margin: '0 auto' }}>
        {/* ── Stat cards with sparklines + delta chips ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={card()}>
            <p style={label()}>New leads · 7d</p>
            <p style={value()}>
              {leadsKpi?.value ?? '0'}
              {leadsKpi?.delta && leadsKpi.delta.direction !== 'flat' && (
                <span style={chip(leadsKpi.delta.direction === 'up')}>
                  {leadsKpi.delta.direction === 'up' ? '↑' : '↓'} {leadsKpi.delta.pct}%
                </span>
              )}
            </p>
            <Sparkline values={leadSeries} color="#10b981" fill="#ecfdf5" />
          </div>
          <div style={card()}>
            <p style={label()}>Conversations · 7d</p>
            <p style={value()}>
              {convoKpi?.value ?? '0'}
              {convoKpi?.delta && convoKpi.delta.direction !== 'flat' && (
                <span style={chip(convoKpi.delta.direction === 'up')}>
                  {convoKpi.delta.direction === 'up' ? '↑' : '↓'} {convoKpi.delta.pct}%
                </span>
              )}
            </p>
            <Sparkline values={convSeries} color={ACCENT} fill="#eef0ff" />
          </div>
          <div style={card()}>
            <p style={label()}>Published articles</p>
            <p style={value()}>
              {publishedKpi}
              <span style={chipNeutral()}>{draftsKpi?.value ?? '0'} drafts waiting</span>
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 12, color: TEXT_FAINT }}>
              {stats.siteHealth.articlesMissingAr === 0
                ? 'Every article has its AR/EN sibling ✓'
                : `${stats.siteHealth.articlesMissingAr} missing an Arabic version`}
            </p>
          </div>
          <div style={card()}>
            <p style={label()}>Total article views</p>
            <p style={value()}>
              {viewsKpi}
              {draftsKpi?.hint && <span style={chipNeutral()}>{draftsKpi.hint}</span>}
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 12, color: TEXT_FAINT }}>All published articles, lifetime</p>
          </div>
        </div>

        {/* ── Chart + inbox/checklist column ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          <div style={{ ...card(), gridColumn: 'span 1', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Activity — last 7 days</b>
              <span style={{ marginInlineStart: 'auto', display: 'flex', gap: 14, fontSize: 12, color: TEXT_SOFT }}>
                <span><i style={legendDot(ACCENT)} /> Conversations</span>
                <span><i style={legendDot('#a5b4fc')} /> Leads</span>
              </span>
            </div>
            <svg width="100%" height="170" viewBox="0 0 600 170" preserveAspectRatio="none" style={{ display: 'block', marginTop: 12 }}>
              {[40, 80, 120].map((y) => (
                <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#f3f4f6" />
              ))}
              <defs>
                <linearGradient id="ccg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity="0.14" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={big.area} fill="url(#ccg)" />
              <path d={big.line} fill="none" stroke={ACCENT} strokeWidth="2.5" />
              <path d={bigLeads.line} fill="none" stroke="#a5b4fc" strokeWidth="2.5" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: TEXT_FAINT, fontSize: 11, marginTop: 6 }}>
              {stats.activityByDay.map((d) => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>

          <div style={card()}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Leads inbox</b>
              <Link href="/admin/collections/contact-inquiries" style={{ marginInlineStart: 'auto', fontSize: 12, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}>
                View all →
              </Link>
            </div>
            {stats.recent.length === 0 && <p style={{ fontSize: 13, color: TEXT_FAINT, margin: '10px 0' }}>No activity yet.</p>}
            {stats.recent.slice(0, 5).map((it) => {
              const meta = kindMeta[it.kind]
              const Icon = meta.icon
              return (
                <Link key={`${it.kind}-${it.id}`} href={it.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: ROW_BORDER, textDecoration: 'none' }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: meta.color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title}</span>
                    <span style={{ display: 'block', fontSize: 11.5, color: TEXT_FAINT }}>{it.subtitle}</span>
                  </span>
                  <span style={{ fontSize: 11.5, color: TEXT_FAINT }}>{relTime(it.at)}</span>
                </Link>
              )
            })}

            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 16 }}>
              <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Needs your attention</b>
            </div>
            {stats.attention.map((a) => (
              <Link key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 0', borderBottom: ROW_BORDER, textDecoration: 'none', fontSize: 13, color: '#374151' }}>
                <span style={{ flex: 1 }}>{a.label}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 9px',
                    borderRadius: 999,
                    background: a.tone === 'danger' && a.count > 0 ? '#fef2f2' : a.tone === 'warning' && a.count > 0 ? '#fffbeb' : '#f3f4f6',
                    color: a.tone === 'danger' && a.count > 0 ? '#dc2626' : a.tone === 'warning' && a.count > 0 ? '#b45309' : TEXT_SOFT,
                  }}
                >
                  {a.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Latest articles table ── */}
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Latest articles</b>
            <span style={{ fontSize: 12, color: TEXT_FAINT }}>{publishedKpi} published</span>
            <Link href="/admin/articles" style={{ marginInlineStart: 'auto', fontSize: 12, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}>
              Open articles →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr>
                  {['Title', 'Status', 'Locale', 'Views', 'Updated'].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'start',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: TEXT_FAINT,
                        fontWeight: 600,
                        padding: '10px 8px',
                        borderBottom: BORDER,
                        width: i === 0 ? '50%' : undefined,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.latestPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '14px 8px', fontSize: 13, color: TEXT_FAINT }}>
                      No articles yet — create your first one.
                    </td>
                  </tr>
                )}
                {stats.latestPosts.map((p) => {
                  const published = p.status === 'published'
                  return (
                    <tr key={p.id}>
                      <td style={cell()}>
                        <Link href={p.href} style={{ color: TEXT, fontWeight: 600, textDecoration: 'none', fontSize: 13.5 }}>
                          {p.title}
                        </Link>
                      </td>
                      <td style={cell()}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '3px 9px',
                            borderRadius: 999,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            background: published ? '#ecfdf5' : p.status === 'scheduled' ? '#eff6ff' : '#f3f4f6',
                            color: published ? '#059669' : p.status === 'scheduled' ? '#2563eb' : TEXT_SOFT,
                          }}
                        >
                          <i style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                          {p.status}
                        </span>
                      </td>
                      <td style={cell()}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SOFT, border: '1px solid #e5e7eb', padding: '1px 7px', borderRadius: 5 }}>{p.locale}</span>
                      </td>
                      <td style={{ ...cell(), color: TEXT_SOFT }}>{p.views ? p.views.toLocaleString('en-US') : '—'}</td>
                      <td style={{ ...cell(), color: TEXT_FAINT, whiteSpace: 'nowrap' }}>{relTime(p.updatedAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Topics + pairing footer row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={card()}>
            <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Top topics asked</b>
            {stats.topTopics.length === 0 && <p style={{ fontSize: 13, color: TEXT_FAINT, margin: '10px 0 0' }}>No conversations yet.</p>}
            <div style={{ marginTop: 12 }}>
              {stats.topTopics.map((t) => {
                const max = stats.topTopics[0]?.count || 1
                return (
                  <div key={t.category} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 13, minWidth: 96, color: '#374151' }}>{t.category}</span>
                    <span style={{ flex: 1, height: 6, background: '#eef0ff', borderRadius: 999, overflow: 'hidden' }}>
                      <span style={{ display: 'block', width: `${(t.count / max) * 100}%`, height: '100%', background: ACCENT, borderRadius: 999 }} />
                    </span>
                    <span style={{ fontSize: 12, color: TEXT_SOFT, minWidth: 24, textAlign: 'end' }}>{t.count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={card()}>
            <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>AR/EN pairing</b>
            {stats.unpairedPosts.length === 0 && (
              <p style={{ fontSize: 13, color: '#059669', fontWeight: 600, margin: '12px 0 0' }}>All articles have both language versions ✓</p>
            )}
            {stats.unpairedPosts.map((u) => (
              <Link
                key={`${u.locale}:${u.slug}`}
                href={`/admin/collections/blog-posts?where[slug][equals]=${encodeURIComponent(u.slug)}`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: ROW_BORDER, textDecoration: 'none' }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: TEXT_SOFT, border: '1px solid #e5e7eb', padding: '1px 7px', borderRadius: 5, textTransform: 'uppercase' }}>{u.locale}</span>
                <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.title}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b45309' }}>missing {u.locale === 'en' ? 'AR' : 'EN'}</span>
              </Link>
            ))}
          </div>

          <div style={card()}>
            <b style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Site health</b>
            <div style={{ marginTop: 6 }}>
              {[
                { label: 'Media storage', ok: stats.siteHealth.storageConfigured, text: stats.siteHealth.storageConfigured ? 'Connected' : 'Not configured' },
                { label: 'AR/EN pairing', ok: stats.siteHealth.articlesMissingAr === 0, text: stats.siteHealth.articlesMissingAr === 0 ? 'Complete' : `${stats.siteHealth.articlesMissingAr} missing` },
                { label: 'Pages missing meta', ok: stats.siteHealth.pagesMissingMeta === 0, text: String(stats.siteHealth.pagesMissingMeta) },
              ].map((r) => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: ROW_BORDER, fontSize: 13, color: '#374151' }}>
                  <span>{r.label}</span>
                  <span style={{ fontWeight: 600, color: r.ok ? '#059669' : '#dc2626' }}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function card(): CSSProperties {
  return {
    background: '#ffffff',
    border: BORDER,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    minWidth: 0,
  }
}
function label(): CSSProperties {
  return { margin: 0, fontSize: 13, color: TEXT_SOFT, fontWeight: 500 }
}
function value(): CSSProperties {
  return { margin: '8px 0 0', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: TEXT, display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }
}
function chip(up: boolean): CSSProperties {
  return {
    fontSize: 11,
    fontWeight: 600,
    padding: '2px 7px',
    borderRadius: 999,
    background: up ? '#ecfdf5' : '#fef2f2',
    color: up ? '#059669' : '#dc2626',
  }
}
function chipNeutral(): CSSProperties {
  return { fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: '#f3f4f6', color: TEXT_SOFT }
}
function cell(): CSSProperties {
  return { padding: '11px 8px', borderBottom: ROW_BORDER, fontSize: 13 }
}
function legendDot(color: string): CSSProperties {
  return { display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: color, marginInlineEnd: 5 }
}
