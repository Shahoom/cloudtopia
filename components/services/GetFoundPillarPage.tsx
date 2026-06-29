import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { ContactFast } from '@/components/ui/contact-fast'
import { ContactLeadForm } from '@/components/services/ContactLeadForm'
import { PillarSubServicesGrid } from '@/components/services/PillarSubServicesGrid'
import { localizedDP } from '@/lib/services/digital-presence'
import type { GetFoundContent } from '@/lib/services/get-found-content'

/**
 * Shared premium design for the "Get Found" pillar trio (SEO / AEO / GEO).
 *
 * One layout, three sets of bespoke bilingual copy (from get-found-content):
 *   dark conversion hero (breadcrumb + title + lead form)
 *     → "the shift" stat band
 *     → capability grid (each card wrapped in GlowingEffect)
 *     → PillarSubServicesGrid — only when the pillar has sub-services
 *       (SEO shows its 14 as glow cards; AEO/GEO have none → nothing renders)
 *     → process steps
 *     → FAQ accordion (+ FAQPage JSON-LD)
 *     → ContactFast closing section
 *
 * RTL-aware throughout: the whole page flips to dir="rtl" for Arabic and the
 * Arabic half of every LocalizedText is used.
 */
export function GetFoundPillarPage({
    content,
    locale,
}: {
    content: GetFoundContent
    locale: string
}) {
    const isAr = locale === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'
    const L = (p: string) => localePath(locale, p)
    const loc = (value: { en: string; ar: string }) => (isAr ? value.ar || value.en : value.en)

    const pillar = getStructuredPillarBySlug(content.slug)
    const pillarName = pillar ? localizedDP(pillar.name, locale) : loc(content.hero.title)
    const hasSubServices = (pillar?.subServices.length ?? 0) > 0

    const heroTitle = loc(content.hero.title)
    const heroSubtitle = loc(content.hero.subtitle)
    const heroBadge = loc(content.hero.badge)

    const faqItems = content.faqs.map((f) => ({ q: loc(f.question), a: loc(f.answer) }))

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((f) => ({
            '@type': 'Question',
            name: loc(f.question),
            acceptedAnswer: { '@type': 'Answer', text: loc(f.answer) },
        })),
    }
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: isAr ? 'الرئيسية' : 'Home', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: isAr ? 'الخدمات' : 'Services', item: canonicalUrl(locale, '/services') },
            { '@type': 'ListItem', position: 3, name: pillarName, item: canonicalUrl(locale, `/services/${content.slug}`) },
        ],
    }

    return (
        <main dir={dir} className="relative min-h-screen bg-[#f4f1f8]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero — dark conversion hero with the CMS lead form (matches the
                sub-service hero family, scaled up for a pillar). */}
            <section data-header-theme="dark" className="relative overflow-hidden bg-[#070b16] text-white">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_0%,rgba(245,158,11,0.12),transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(56,189,248,0.14),transparent_60%)]"
                    aria-hidden="true"
                />
                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 md:pt-32">
                    <div>
                        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-400" aria-label="Breadcrumb">
                            <Link href={L('/services')} className="transition-colors hover:text-amber-300">
                                {isAr ? 'الخدمات' : 'Services'}
                            </Link>
                            <span aria-hidden="true">/</span>
                            <span>{pillarName}</span>
                        </nav>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">{heroBadge}</p>
                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
                            {heroTitle}
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{heroSubtitle}</p>
                    </div>
                    <ContactLeadForm service={pillarName} locale={locale} />
                </div>
            </section>

            {/* The shift — narrative + qualitative stat band. */}
            <section dir={dir} data-header-theme="dark" className="relative overflow-hidden bg-eerie py-16 md:py-24">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(14,165,233,0.16), transparent 60%)' }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="mb-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        {isAr ? 'التحوّل' : 'The shift'}
                    </span>
                    <h2 className="text-balance text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
                        {loc(content.shift.heading)}
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
                        {loc(content.shift.body)}
                    </p>
                    <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                        {content.shift.stats.map((stat) => (
                            <div key={stat.value} className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-sm">
                                <div className="text-2xl font-black text-cyan-300 md:text-3xl">{stat.value}</div>
                                <p className="mt-2 text-sm font-semibold leading-relaxed text-white/70">{loc(stat.label)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities — bespoke grid, each card carries the flowing
                GlowingEffect border (same family as the sub-service cards). */}
            <section dir={dir} className="bg-[#f4f1f8] py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {isAr ? 'ماذا نفعل' : 'What we do'}
                        </p>
                        <h2 className="text-balance text-3xl font-black leading-tight text-[#0f172a] md:text-4xl">
                            {isAr ? `قدرات ${pillarName}` : `${pillarName} capabilities`}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {content.capabilities.map((cap) => (
                            <article key={cap.title.en} className="group relative h-full rounded-2xl">
                                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                                <div className="relative z-10 flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm shadow-slate-200/50 backdrop-blur-xl transition-[border-color,background-color] duration-300 group-hover:border-sky-200 group-hover:bg-white">
                                    <h3 className="text-lg font-black leading-snug text-slate-900">{loc(cap.title)}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{loc(cap.desc)}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sub-services — only when the pillar actually has them (SEO).
                AEO/GEO have none, so PillarSubServicesGrid renders nothing. */}
            {hasSubServices ? <PillarSubServicesGrid pillarSlug={content.slug} locale={locale} /> : null}

            {/* Process — four numbered steps. */}
            <section dir={dir} className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {isAr ? 'كيف نعمل' : 'How we work'}
                        </p>
                        <h2 className="text-balance text-3xl font-black leading-tight text-[#0f172a] md:text-4xl">
                            {isAr ? 'طريقتنا، خطوة بخطوة' : 'Our approach, step by step'}
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {content.process.map((step, index) => (
                            <article
                                key={step.name.en}
                                className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-[#f4f1f8] p-6 transition-colors duration-300 hover:bg-white hover:shadow-[0_14px_40px_-18px_rgba(2,132,199,0.3)]"
                            >
                                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f172a] font-mono text-sm font-black text-white">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-black leading-snug text-slate-900">{loc(step.name)}</h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{loc(step.detail)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <FaqAccordion
                eyebrow={isAr ? 'أسئلة شائعة' : 'Common questions'}
                heading={isAr ? 'أسئلة يطرحها العملاء' : 'Questions clients ask'}
                items={faqItems}
                dir={dir}
            />

            <ContactFast serviceName={pillarName} locale={isAr ? 'ar' : 'en'} dir={dir} />
        </main>
    )
}
