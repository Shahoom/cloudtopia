import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { buildServiceSchema } from '@/lib/seo/schema'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { ContactLeadForm } from '@/components/services/ContactLeadForm'
import { PillarSubServicesGrid } from '@/components/services/PillarSubServicesGrid'
import { localizedDP } from '@/lib/services/digital-presence'
import type { GetFoundContent } from '@/lib/services/get-found-content'

/** schema.org serviceType per Get Found pillar, localized (JSONLD-5). */
const GET_FOUND_SERVICE_TYPES: Record<string, { en: string; ar: string }> = {
    'search-engine-optimization': { en: 'Search Engine Optimization', ar: 'تحسين محركات البحث' },
    'answer-engine-optimization': { en: 'Answer Engine Optimization', ar: 'تحسين محركات الإجابة' },
    'generative-engine-optimization': { en: 'Generative Engine Optimization', ar: 'تحسين المحركات التوليدية' },
}

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

    // LINK-08: the Get Found trio cross-links each other (self excluded) so
    // SEO ↔ AEO ↔ GEO are always one click apart for visitors and crawlers.
    const relatedPillars = Object.entries(GET_FOUND_SERVICE_TYPES)
        .filter(([slug]) => slug !== content.slug)
        .map(([slug, name]) => ({ slug, name }))

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
    const serviceSchema = {
        ...buildServiceSchema(locale, {
            name: pillarName,
            description: heroSubtitle,
            path: `/services/${content.slug}`,
            serviceType: loc(GET_FOUND_SERVICE_TYPES[content.slug] ?? { en: pillarName, ar: pillarName }),
        }),
        inLanguage: isAr ? 'ar' : 'en',
    }

    return (
        <main dir={dir} className="relative min-h-screen bg-[#f4f1f8]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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

            {/* AEO/GEO-only premium section: a stylized "AI answer" that shows the
                brand being cited — reinforces the value prop and sets these two
                pillars visually apart from the SEO page. */}
            {(content.slug === 'answer-engine-optimization' || content.slug === 'generative-engine-optimization') && (
                <section dir={dir} className="relative overflow-hidden bg-[#f4f1f8] py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-9 max-w-2xl text-center">
                            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{isAr ? 'الفكرة ببساطة' : 'The idea, simply'}</p>
                            <h2 className="text-balance text-3xl font-black leading-tight text-[#0f172a] md:text-4xl">{isAr ? 'اجعل الذكاء الاصطناعي يوصي بك' : 'Make AI recommend you'}</h2>
                        </div>
                        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_30px_80px_-30px_rgba(2,132,199,0.35)] sm:p-6">
                            <div className="mb-4 flex justify-end">
                                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                                    {isAr ? 'من أفضل شركة لتطوير المواقع في عُمان؟' : 'Who is the best web development company in Oman?'}
                                </div>
                            </div>
                            <div className="flex justify-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
                                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                                </div>
                                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-sky-100 bg-gradient-to-br from-sky-50 to-white px-4 py-3 text-sm leading-relaxed text-slate-700">
                                    {isAr
                                        ? 'من الخيارات البارزة شركة كلاود توبيا — وكالة متخصصة في تطوير المواقع والتطبيقات والتسويق الرقمي في عُمان والخليج، معروفة بجودة عملها ثنائي اللغة…'
                                        : 'One standout option is CloudTopia — a Gulf-based agency specializing in web, app, and digital-marketing work across Oman and the GCC, known for high-quality bilingual delivery…'}
                                    <span className="mt-2 block text-xs font-bold text-sky-600">{isAr ? '⌁ مُستشهَد به من محتواك' : '⌁ Cited from your content'}</span>
                                </div>
                            </div>
                        </div>
                        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-slate-500">{isAr ? 'هذا ما نبنيه: المحتوى والبنية والموثوقية التي تجعل محركات الذكاء الاصطناعي تختارك كإجابة.' : 'That is exactly what we build — the content, structure, and authority that make AI engines pick you as the answer.'}</p>
                    </div>
                </section>
            )}

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

            {/* Related pillars — small cross-link row within the Get Found trio. */}
            <section dir={dir} className="bg-white pb-16 md:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#f4f1f8] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {isAr ? 'خدمات ذات صلة' : 'Related services'}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {relatedPillars.map((rel) => (
                                <Link
                                    key={rel.slug}
                                    href={L(`/services/${rel.slug}`)}
                                    className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition-colors duration-200 hover:border-sky-300 hover:text-sky-800"
                                >
                                    {loc(rel.name)}
                                    <ArrowRight className="h-3.5 w-3.5 opacity-50 transition-opacity duration-200 group-hover:opacity-100 rtl:rotate-180" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FaqAccordion
                eyebrow={isAr ? 'أسئلة شائعة' : 'Common questions'}
                heading={isAr ? 'أسئلة يطرحها العملاء' : 'Questions clients ask'}
                items={faqItems}
                dir={dir}
            />

            {/* Closing CTA — premium, form-free (the owner removed the contact
                form from these pages; a strong link CTA replaces it). */}
            <section dir={dir} data-header-theme="dark" className="relative overflow-hidden bg-[#070b16] py-16 text-center md:py-24">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(245,158,11,0.12),transparent_60%),radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(56,189,248,0.12),transparent_60%)]"
                    aria-hidden="true"
                />
                <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-balance text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
                        {isAr ? `جاهز لتتصدّر نتائج ${pillarName}؟` : `Ready to lead in ${pillarName}?`}
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                        {isAr
                            ? 'احجز استشارة مجانية ولنرسم معاً خطة نموّك القادمة.'
                            : "Book a free consultation and we'll map your next growth play together."}
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href={`/api/whatsapp?locale=${locale}`}
                            className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-sm font-black text-[#070b16] transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_14px_44px_-12px_rgba(245,158,11,0.6)]"
                        >
                            {isAr ? 'ابدأ الآن' : 'Get started'}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                        </Link>
                        <Link
                            href={L('/projects')}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            {isAr ? 'شاهد أعمالنا' : 'See our work'}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
