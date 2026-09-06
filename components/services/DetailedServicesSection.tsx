'use client'

import { Layers } from 'lucide-react'
import { getStructuredGroups, getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { getSubserviceNavItems } from '@/lib/services/subservice-nav-index'
import { getLocalizedPillarSubServiceNames } from '@/lib/services/pillar-subservices-localized'
import { localizedDP, type DPPillar } from '@/lib/services/digital-presence'
import { SubServiceGlowCard } from './SubServiceGlowCard'
import { cn } from '@/lib/utils'

/**
 * The single "Detailed services" section for every main service page. It renders
 * the page's OWN sub-services as flowing glow cards, data-driven from the new
 * group → pillar → sub-service taxonomy — so the cards are always relevant to the
 * page (no stale catalog content) and there is exactly ONE sub-services section
 * per page (no duplicate grid).
 *
 *   • pillarSlug  → one pillar's sub-services (e.g. /website-development).
 *   • categoryId  → every pillar in a category, grouped by pillar
 *                   (e.g. /business-systems-development, /web-applications).
 */
type SubCard = { name: string; desc?: string; href: string }

function pillarSubCards(pillar: DPPillar, locale: string): SubCard[] {
  // Sub-services with their own page (href differs from the pillar) render as
  // rich cards; the rest keep the historical name-only card linking the pillar.
  const items = getSubserviceNavItems(pillar.slug, locale === 'ar' ? 'ar' : 'en')
  const tailored = items.filter((s) => s.href !== pillar.href)
  if (tailored.length > 0) {
    return tailored.map((s) => ({ name: s.name, desc: s.description, href: s.href }))
  }
  // Pillars whose sub-services have no own page yet → name cards link to the
  // pillar. Names are localized (falls back to raw English subServices) so the
  // cards read Arabic on /ar instead of leaking the English string[].
  return getLocalizedPillarSubServiceNames(pillar.slug, locale).map((n) => ({ name: n, desc: undefined, href: pillar.href }))
}

type DetailedServicesSectionProps = {
  /** Single-pillar main pages (website-development, ecommerce-development, …). */
  pillarSlug?: string
  /** Multi-pillar category pages (business-systems-development, interactive-web-applications). */
  categoryId?: string
  locale: string
  className?: string
}

export default function DetailedServicesSection({
  pillarSlug,
  categoryId,
  locale,
  className,
}: DetailedServicesSectionProps) {
  const isRTL = locale === 'ar'

  const pillars: DPPillar[] = pillarSlug
    ? ([getStructuredPillarBySlug(pillarSlug)].filter(Boolean) as DPPillar[])
    : categoryId
      ? (getStructuredGroups(categoryId) ?? []).flatMap((g) => g.pillars)
      : []

  const visiblePillars = pillars
    .map((pillar) => ({ pillar, subs: pillarSubCards(pillar, locale) }))
    .filter((p) => p.subs.length > 0)

  if (visiblePillars.length === 0) return null

  const grouped = visiblePillars.length > 1

  const copy = isRTL
    ? {
        eyebrow: 'الخدمات التفصيلية',
        title: 'اختر الخدمة الأنسب لمشروعك',
        body: 'كل خدمة فرعية لها صفحة مخصصة بنطاق وتفاصيل خاصة بها — اختر ما يناسب احتياجك بدقة.',
      }
    : {
        eyebrow: 'Detailed services',
        title: 'Choose the exact service you need',
        body: 'Every sub-service has its own page with a tailored scope and details — move from the broad offer straight into a precise fit.',
      }

  return (
    <section className={cn('relative bg-[#f4f1f8] px-4 py-16 sm:px-6 lg:px-8 md:py-20', className)} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(216,180,254,0.28),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-9 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white/80 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-eerie shadow-sm">
              <Layers className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-eerie md:text-5xl" style={{ textWrap: 'balance' }}>
              {copy.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base font-semibold leading-8 text-neutral-600 md:text-lg">{copy.body}</p>
        </div>

        {grouped ? (
          <div className="space-y-12">
            {visiblePillars.map(({ pillar, subs }) => (
              <div key={pillar.slug}>
                <div className="mb-5 flex items-center gap-2.5">
                  <h3 className="text-xl font-black tracking-tight text-eerie md:text-2xl">{localizedDP(pillar.name, locale)}</h3>
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-bold text-neutral-500">{subs.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {subs.map((s) => (
                    <SubServiceGlowCard key={s.name} href={s.href} name={s.name} desc={s.desc} icon={pillar.icon} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePillars[0].subs.map((s) => (
              <SubServiceGlowCard key={s.name} href={s.href} name={s.name} desc={s.desc} icon={visiblePillars[0].pillar.icon} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
