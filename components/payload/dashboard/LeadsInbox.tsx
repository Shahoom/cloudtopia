import Link from 'next/link'
import { Bot, Boxes, Compass, Globe, Inbox, Stethoscope } from 'lucide-react'
import type { InboxLead, LeadSource } from '../../../lib/cms/admin/types.ts'
import { EmptyState } from './EmptyState.tsx'
import { formatNumber, humanize, initialsFor, relativeTimeShort } from './format.ts'

const SOURCES: Record<LeadSource, { label: string; Icon: typeof Globe; fallback: string }> = {
  contact: { label: 'Form', Icon: Globe, fallback: 'Contact form' },
  finder: { label: 'Finder', Icon: Compass, fallback: 'Solution finder' },
  chatbot: { label: 'Chatbot', Icon: Bot, fallback: 'Chatbot lead' },
  clinictopia: { label: 'ClinicTopia', Icon: Stethoscope, fallback: 'ClinicTopia demo request' },
  hasm: { label: 'Hasm ERP', Icon: Boxes, fallback: 'Hasm ERP demo access' },
}

const AVATAR_TONES = ['is-indigo', 'is-sky', 'is-emerald', 'is-violet', 'is-slate']

function toneFor(seed: string): string {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return AVATAR_TONES[hash % AVATAR_TONES.length]
}

function secondLine(lead: InboxLead): string {
  const source = SOURCES[lead.source]
  // ClinicTopia / Hasm ERP rows only carry the product name, which the fallback already says.
  if (lead.source === 'clinictopia' || lead.source === 'hasm') return lead.org ? `${lead.org} · ${source.fallback}` : source.fallback
  const detail = lead.detail ? (lead.source === 'contact' ? humanize(lead.detail) : lead.detail) : null
  const parts = [lead.org, detail].filter(Boolean)
  return parts.length ? parts.join(' · ') : source.fallback
}

export function LeadsInbox({ leads, newCount, now, unavailable }: { leads: InboxLead[]; newCount: number; now: number; unavailable: boolean }) {
  return (
    <section className="ct-dash-card ct-dash-inbox" aria-labelledby="ct-dash-inbox-title">
      <header className="ct-dash-card-head">
        <h2 id="ct-dash-inbox-title" className="ct-dash-card-title">
          Leads inbox
        </h2>
        {newCount > 0 && <span className="ct-dash-pill is-accent">{formatNumber(newCount)} new</span>}
        <span className="ct-dash-spacer" />
        <Link className="ct-dash-link" href="/admin/collections/contact-inquiries" prefetch={false}>
          Open inbox
        </Link>
      </header>

      {unavailable ? (
        <EmptyState error title="Couldn’t load leads" hint="The leads query failed. Refresh to try again." />
      ) : leads.length === 0 ? (
        <EmptyState
          icon={<Inbox size={16} strokeWidth={2} aria-hidden="true" />}
          title="No leads yet"
          hint="Contact form, Solution finder, chatbot, ClinicTopia and Hasm ERP submissions land here."
        />
      ) : (
        <ul className="ct-dash-lead-list">
          {leads.map((lead) => {
            const source = SOURCES[lead.source]
            const Icon = source.Icon
            const country = lead.country
            const countryTitle = country
              ? country.from === 'timezone'
                ? `Estimated from the browser time zone (${country.raw})`
                : `Country: ${country.raw}`
              : undefined
            return (
              <li key={`${lead.collection}:${lead.id}`}>
                <Link className="ct-dash-lead" href={`/admin/collections/${lead.collection}/${lead.id}`} prefetch={false}>
                  <span className={`ct-dash-avatar ${toneFor(lead.name ?? `${lead.collection}${lead.id}`)}`} aria-hidden="true">
                    {lead.name ? initialsFor(lead.name) : <Icon size={15} strokeWidth={2} />}
                  </span>
                  <div className="ct-dash-lead-main">
                    <div className="ct-dash-lead-line">
                      <span className={`ct-dash-lead-name${lead.name ? '' : ' is-unnamed'}`} dir="auto">
                        {lead.name ?? 'Unnamed lead'}
                      </span>
                      {country && (
                        <span className={`ct-dash-cc${country.from === 'timezone' ? ' is-estimated' : ''}`} title={countryTitle}>
                          {country.code}
                          {country.from === 'timezone' && <span className="ct-dash-sr"> (estimated from time zone)</span>}
                        </span>
                      )}
                    </div>
                    <div className="ct-dash-lead-org" dir="auto">
                      {secondLine(lead)}
                    </div>
                  </div>
                  <span className={`ct-dash-src is-${lead.source}`}>
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                    {source.label}
                  </span>
                  <time className="ct-dash-lead-time" dateTime={lead.createdAt}>
                    {relativeTimeShort(lead.createdAt, now)}
                  </time>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
