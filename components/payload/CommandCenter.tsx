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

const CYAN = '#0ea5e9'
const TEAL = '#0d9488'

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

export async function CommandCenter() {
  const stats = await getOverviewStats()
  const maxDay = Math.max(1, ...stats.activityByDay.map((d) => d.conversations + d.leads))

  return (
    <div style={{ padding: '24px 28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Command center</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--theme-elevation-500)', fontSize: 13 }}>Your CloudTopia control center</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/admin/collections/blog-posts/create" style={btn(true)}>
            <Plus size={16} /> New article
          </Link>
          <Link href="/admin/collections/blog-posts/create" style={btn(false)}>
            <Upload size={16} /> Import MDX
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
        {stats.kpis.map((k) => (
          <div key={k.label} style={card()}>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-500)' }}>{k.label}</p>
            <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 600 }}>{k.value}</p>
            {k.delta && k.delta.direction !== 'flat' && (
              <p style={{ margin: '4px 0 0', fontSize: 12, color: k.delta.direction === 'up' ? TEAL : '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
                {k.delta.direction === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {k.delta.pct}% vs prev
              </p>
            )}
            {k.hint && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#b45309' }}>{k.hint}</p>}
          </div>
        ))}
      </div>

      <div style={panel()}>
        <p style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 600 }}>Activity — last 7 days</p>
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
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Recent activity</p>
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
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Needs your attention</p>
          {stats.attention.map((a) => (
            <Link key={a.label} href={a.href} style={row()}>
              <AlertTriangle size={16} color={a.tone === 'danger' ? '#dc2626' : a.tone === 'warning' ? '#b45309' : 'var(--theme-elevation-500)'} />
              <span style={{ flex: 1, fontSize: 13 }}>{a.label}</span>
              <span style={countPill()}>{a.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
        <div style={panel()}>
          <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Top articles</p>
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
          <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>Top topics asked</p>
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
    gap: 6,
    fontSize: 13,
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    border: '1px solid var(--theme-elevation-150)',
    color: primary ? '#fff' : 'var(--theme-text)',
    background: primary ? CYAN : 'transparent',
    borderColor: primary ? CYAN : 'var(--theme-elevation-150)',
  }
}
function card(): CSSProperties {
  return { background: 'var(--theme-elevation-50)', borderRadius: 8, padding: 16 }
}
function panel(): CSSProperties {
  return { background: 'var(--theme-elevation-0)', border: '1px solid var(--theme-elevation-100)', borderRadius: 12, padding: '16px 20px' }
}
function row(): CSSProperties {
  return { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: '1px solid var(--theme-elevation-100)', textDecoration: 'none', color: 'var(--theme-text)' }
}
function iconCircle(): CSSProperties {
  return { width: 32, height: 32, borderRadius: '50%', background: 'var(--theme-elevation-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
}
function countPill(): CSSProperties {
  return { background: 'var(--theme-elevation-100)', color: 'var(--theme-elevation-600)', fontSize: 12, padding: '2px 8px', borderRadius: 8 }
}
function empty(): CSSProperties {
  return { fontSize: 13, color: 'var(--theme-elevation-450)', margin: '8px 0' }
}
