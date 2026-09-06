'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { SeoH1 } from '@/components/seo/SeoH1'
import type { ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
import type { RichPillarData } from '@/lib/services/business-systems-content'
import { getBusinessSystemsSubServicesByPillar } from '@/lib/services/business-systems-content'
import { getDigitalPresenceSubServicesByPillar } from '@/lib/services/digital-presence-content'

// NOTE: no `ssr: false` here — these heroes are SSR-safe (browser APIs live in
// effects/handlers only), and server-rendering them is what puts the pillar's
// copy and sub-service links in the initial HTML for crawlers (AEO/SEO).
const HeroParallax = dynamic(() => import('@/components/ui/hero-parallax').then((m) => m.HeroParallax))
const HeroModern = dynamic(() => import('@/components/ui/hero-modern').then((m) => m.HeroModern))
const HorizontalScrollCards = dynamic(() => import('@/components/ui/horizontal-scroll-cards').then((m) => m.HorizontalScrollCards))

/**
 * Rich pillar "main page" — reuses the /business-systems-development design
 * (HeroParallax → service-card row → HeroModern overview → CTA), driven by
 * per-pillar data so every pillar gets a full, tailored landing page.
 */
export default function RichPillarPage({ data, locale }: { data: RichPillarData; locale: string }) {
    const { dir } = useLanguage()
    const isRTL = locale === 'ar'

    // Match each moving card to its sub-service page (BS or DP) so the card is
    // clickable. Cards with no matching sub-service fall back to the pillar page,
    // so a card is never a broken link.
    const pillarSubs = [
        ...getBusinessSystemsSubServicesByPillar(data.slug, locale),
        ...getDigitalPresenceSubServicesByPillar(data.slug, locale),
    ]
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, '')
    const hrefForCard = (name: string): string => {
        const n = normalize(name)
        const match = pillarSubs.find((s) => {
            const sn = normalize(s.name)
            return sn === n || (n.length > 3 && sn.includes(n)) || (sn.length > 3 && n.includes(sn))
        })
        return localePath(locale, match?.href ?? `/services/${data.slug}`)
    }

    const cards: ScrollCardItem[] = data.cards.map((c) => ({
        name: c.name,
        tagline: c.tagline,
        icon: <img src={c.icon} alt="" width={40} height={40} className="h-10 w-10" />,
        description: c.description,
        gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
        glowColor: 'bg-lavender/50',
        features: c.features,
        href: hrefForCard(c.name),
    }))

    const o = data.overview

    return (
        <div className="min-h-screen bg-lavender" dir={dir}>
            <SeoH1>{data.hero.title} — CloudTopia</SeoH1>

            <HeroParallax products={data.products} title={data.hero.title} description={data.hero.description} isRTL={isRTL} headingLevel="p" />

            <HorizontalScrollCards
                cards={cards}
                title={data.solutionsTitle}
                subtitle={data.solutionsSubtitle}
                whatsIncludedLabel={isRTL ? 'ما يشمله:' : "What's Included:"}
                moreText={isRTL ? 'المزيد' : 'more'}
                isRTL={isRTL}
                variant="light"
            />

            <HeroModern
                headingLevel="p"
                badge={o.badge}
                title={o.title}
                description={o.description}
                metrics={o.metrics}
                modes={{}}
                controlStackTitle={o.expertiseTitle}
                controlStackDescription={o.expertiseDescription}
                controlStackItems={o.expertiseItems}
                protocolsTitle={o.processTitle}
                protocols={o.processSteps}
                showcaseImage={o.showcase}
                showThemeToggle={false}
                isRTL={isRTL}
                modeLabels={isRTL ? { strategy: 'الاستراتيجية', execution: 'التنفيذ' } : { strategy: 'Strategy', execution: 'Execution' }}
                controlStackBadge={isRTL ? 'مخصص' : 'Custom'}
                protocolsBadge={isRTL ? '٣ مراحل' : '3 Phases'}
                labelAvailable={isRTL ? 'متاح الآن' : 'Available Now'}
                labelCustomSolutions={isRTL ? 'حلول مخصصة' : 'Custom Solutions'}
                labelApproach={isRTL ? 'نهجنا' : 'Our Approach'}
            />

            {/* Service directory — server-rendered links to EVERY sub-service in this
                pillar. The moving cards above only link to sub-services whose names
                fuzzy-match, so this block is what guarantees each sub-service page is
                reachable from crawlable HTML in both locales. */}
            {pillarSubs.length > 0 && (
                <section className="bg-eerie py-16 text-white md:py-24" data-header-theme="dark">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                            {isRTL ? 'دليل الخدمات' : 'Service directory'}
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                            {isRTL ? 'استكشف كل خدمة بالتفصيل' : 'Explore each service in depth'}
                        </h2>
                        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/60 md:text-lg">
                            {isRTL
                                ? 'لكل خدمة أدناه صفحة مخصصة توضح نطاق العمل والمخرجات وخطوات التنفيذ.'
                                : 'Every service below has a dedicated page detailing the scope, deliverables, and delivery process.'}
                        </p>
                        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {pillarSubs.map((sub) => (
                                <li key={sub.href} className="h-full">
                                    <Link
                                        href={localePath(locale, sub.href)}
                                        className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.06] p-5 transition-colors duration-300 hover:border-cyan-200/40 hover:bg-white/10"
                                    >
                                        <span className="flex items-start justify-between gap-3">
                                            <span className="text-base font-black leading-6 text-white">{sub.name}</span>
                                            <svg
                                                className="mt-1 h-4 w-4 shrink-0 text-cyan-200/80 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                        <span className="mt-3 text-sm font-semibold leading-6 text-white/60">{sub.desc}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Final CTA — same treatment as the business-systems-development page */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 md:py-28">
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{data.cta.title}</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">{data.cta.description}</p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={`/api/whatsapp?locale=${locale}`}
                            className="group inline-flex items-center justify-center rounded-full bg-lavender px-8 py-4 text-lg font-semibold text-slate-900 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {data.cta.button}
                            <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:ml-0 rtl:mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <Link
                            href={localePath(locale, '/services')}
                            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-lavender/10"
                        >
                            {data.cta.explore}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
