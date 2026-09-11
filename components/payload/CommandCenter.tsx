import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  AlertTriangle,
  Clock,
  Eye,
  Languages,
  Mail,
  MessageSquare,
  Plus,
  Scale,
  Server,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { getOverviewStats } from '../../lib/cms/admin/overview.ts'
import type { ActivityItem } from '../../lib/cms/admin/types.ts'

// Soft-premium palette (Notion/Stripe direction): warm canvas, ink text,
// floating white cards, one restrained teal accent.
const INK = '#37352f'
const INK_SOFT = '#787774'
const INK_FAINT = '#a8a29e'
const TEAL = '#0d9488'
const CYAN = INK // chart series 1 renders in ink on the warm canvas
const CARD_BORDER = '1px solid rgba(55, 53, 47, 0.09)'
const CARD_SHADOW = '0 1px 2px rgba(15, 15, 15, 0.03), 0 8px 24px rgba(15, 15, 15, 0.05)'

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 60) return `${Math.max(1, m)}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

const kindIcon: Record<ActivityItem['kind'], typeof Target> = {
  'solution-finder': Target,
  chatbot: MessageSquare,
  contact: Mail,
  'hasm-demo': Scale,
}

// Muted KPI accent dots, cycled by position.
const KPI_ACCENTS = ['#0d9488', '#b45309', '#7c3aed', '#0369a1', '#be123c']

export async function CommandCenter() {
  const stats = await getOverviewStats()
  const maxDay = Math.max(1, ...stats.activityByDay.map((d) => d.conversations + d.leads))

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ padding: '40px 36px 48px', maxWidth: 1160, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 500, color: INK_FAINT }}>{today}</p>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, color: INK, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Command center
          </h1>
          <p style={{ margin: '8px 0 0', color: INK_SOFT, fontSize: 14.5 }}>
            Content, leads and site health — at a glance.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/admin/collections/blog-posts/create" style={btn(true)}>
            <Plus size={15} /> New article
          </Link>
          <Link href="/admin/collections/blog-posts/create" style={btn(false)}>
            <Upload size={15} /> Import MDX
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 24 }}>
        {stats.kpis.map((k, i) => {
          const accent = KPI_ACCENTS[i % KPI_ACCENTS.length]
          return (
            <div key={k.label} style={card()}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: INK_FAINT,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                {k.label}
              </p>
              <p style={{ margin: '12px 0 0', fontSize: 31, fontWeight: 700, letterSpacing: '-0.03em', color: INK, lineHeight: 1 }}>{k.value}</p>
              {k.delta && k.delta.direction !== 'flat' && (
                <p style={{ margin: '8px 0 0', fontSize: 12, color: k.delta.direction === 'up' ? TEAL : '#b91c1c', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {k.delta.direction === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {k.delta.pct}% vs prev
                </p>
              )}
              {k.hint && <p style={{ margin: '8px 0 0', fontSize: 12, color: '#b45309' }}>{k.hint}</p>}
            </div>
          )
        })}
      </div>

      <div style={panel()}>
        <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600, color: INK }}>Activity — last 7 days</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
          {stats.activityByDay.map((d) => (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 130 }}>
                <div title={`${d.conversations} conversations`} style={{ width: 12, height: `${(d.conversations / maxDay) * 100}%`, background: CYAN, borderRadius: 3, minHeight: 2 }} />
                <div title={`${d.leads} leads`} style={{ width: 12, height: `${(d.leads / maxDay) * 100}%`, background: TEAL, borderRadius: 3, minHeight: 2 }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--theme-elevation-500)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: CYAN }} /> Conversations</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: TEAL }} /> Leads</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: INK }}>Recent activity</p>
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
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: INK }}>Needs your attention</p>
          {stats.attention.map((a) => (
            <Link key={a.label} href={a.href} style={row()}>
              <AlertTriangle size={16} color={a.tone === 'danger' ? '#dc2626' : a.tone === 'warning' ? '#b45309' : 'var(--theme-elevation-500)'} />
              <span style={{ flex: 1, fontSize: 13 }}>{a.label}</span>
              <span style={countPill()}>{a.count}</span>
            </Link>
          ))}
        </div>

        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: INK }}>
            <Languages size={15} style={{ verticalAlign: -2, marginRight: 6 }} />
            AR/EN pairing
          </p>
          {stats.unpairedPosts.length === 0 && <p style={empty()}>All articles have both language versions.</p>}
          {stats.unpairedPosts.map((u) => (
            <Link
              key={`${u.locale}:${u.slug}`}
              href={`/admin/collections/blog-posts?where[slug][equals]=${encodeURIComponent(u.slug)}`}
              style={row()}
            >
              <span style={{ ...countPill(), textTransform: 'uppercase', minWidth: 28, textAlign: 'center' }}>{u.locale}</span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.title}</span>
              <span style={{ fontSize: 11, color: '#b45309', whiteSpace: 'nowrap' }}>missing {u.locale === 'en' ? 'AR' : 'EN'}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: INK }}>Top articles</p>
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
          <p style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: INK }}>Top topics asked</p>
          {stats.topTopics.length === 0 && <p style={empty()}>No conversations yet.</p>}
          {stats.topTopics.map((t, i) => {
            const max = stats.topTopics[0]?.count || 1
            return (
              <div key={t.category} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 13, minWidth: 96 }}>{t.category}</span>
                <span style={{ flex: 1, height: 6, background: 'var(--theme-elevation-150)', borderRadius: 999, overflow: 'hidden' }}>
                  <span style={{ display: 'block', width: `${(t.count / max) * 100}%`, height: '100%', background: i < 2 ? CYAN : TEAL }} />
                </span>
                <span style={{ fontSize: 12, color: 'var(--theme-elevation-500)', minWidth: 24, textAlign: 'right' }}>{t.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ ...panel(), marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 13 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: stats.siteHealth.storageConfigured ? TEAL : '#dc2626' }}>
          <Server size={15} /> Media storage: {stats.siteHealth.storageConfigured ? 'connected' : 'not configured'}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--theme-elevation-600)' }}>
          <Languages size={15} /> {stats.siteHealth.articlesMissingAr} articles missing AR
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--theme-elevation-600)' }}>
          <Clock size={15} /> {stats.siteHealth.pagesMissingMeta} pages missing meta
        </span>
      </div>
    </div>
  )
}

function btn(primary: boolean): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    fontSize: 13.5,
    fontWeight: 500,
    padding: '9px 16px',
    borderRadius: 10,
    textDecoration: 'none',
    color: primary ? '#ffffff' : INK,
    background: primary ? '#1a1a1a' : '#ffffff',
    border: primary ? '1px solid #1a1a1a' : CARD_BORDER,
    boxShadow: primary ? '0 2px 8px rgba(15, 15, 15, 0.18)' : '0 1px 2px rgba(15, 15, 15, 0.04)',
  }
}
function card(): CSSProperties {
  return {
    background: '#ffffff',
    border: CARD_BORDER,
    borderRadius: 16,
    padding: '18px 20px',
    boxShadow: CARD_SHADOW,
  }
}
function panel(): CSSProperties {
  return {
    background: '#ffffff',
    border: CARD_BORDER,
    borderRadius: 18,
    padding: '22px 26px',
    boxShadow: CARD_SHADOW,
  }
}
function row(): CSSProperties {
  return { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid rgba(55, 53, 47, 0.06)', textDecoration: 'none', color: INK }
}
function iconCircle(): CSSProperties {
  return { width: 32, height: 32, borderRadius: 10, background: '#f1efe9', color: INK_SOFT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
}
function countPill(): CSSProperties {
  return { background: '#f1efe9', color: '#57534e', fontSize: 12, fontWeight: 600, padding: '2px 9px', borderRadius: 999 }
}
function empty(): CSSProperties {
  return { fontSize: 13, color: INK_FAINT, margin: '8px 0' }
}
