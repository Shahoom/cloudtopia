import { localePath } from '@/lib/i18n/url'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { WebAppHero } from '@/components/ui/webapp-hero'
import { WebAppFeatures } from '@/components/ui/webapp-features'
import { WebAppProcess } from '@/components/ui/webapp-process'
import { TestimonialsMarquee } from '@/components/ui/testimonials-marquee'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { ProjectsShowcase } from '@/components/ui/projects-showcase'
import { type Project } from '@/lib/projects'
import { getProjectsForService } from '@/lib/services/related-projects'
import { asWebAppLocale, type WebAppServiceContent } from '@/lib/services/webapp-service-content'
import { getWebappFaq } from '@/lib/services/webapp-faq-content'
import { getWebApplicationsSubServicesByPillar } from '@/lib/services/web-applications'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { localizedDP } from '@/lib/services/digital-presence'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { SubServiceGlowCard } from '@/components/services/SubServiceGlowCard'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'
import { ContactFast } from '@/components/ui/contact-fast'
import { getServiceCategory, localizedPackageName } from '@/lib/seo/services'
import { Pencil, Star, Sparkles } from 'lucide-react'

/**
 * Self-contained render for a structured interactive-web-application pillar.
 *
 * Mirrors the legacy inline webapp branch of ServiceDetail (WebAppHero →
 * WebAppFeatures → WebAppProcess → ProjectsShowcase → TestimonialsMarquee →
 * FaqAccordion) so the new structured pillars (SaaS/MVP, full-stack, portals,
 * modernization, media) get the same rich, bilingual experience.
 *
 * Because this component is returned early from the /services/[service] route —
 * before the page reaches its shared JSON-LD <script> block — it emits its own
 * FAQPage structured data so each pillar still wins Google "People also ask".
 */
export default async function WebAppPillarPage({
    slug,
    data,
    locale,
}: {
    slug: string
    data: WebAppServiceContent
    locale: string
}) {
    const webappLocale = asWebAppLocale(locale)
    const isRTL = locale === 'ar'
    const faq = getWebappFaq(slug, locale)
    const subServices = getWebApplicationsSubServicesByPillar(slug, locale)

    // Service + BreadcrumbList JSON-LD. Previously emitted by the old
    // /web-applications/[pillar]/layout; now self-contained so the structured
    // data travels with the page at its /services/<slug> home. FAQPage JSON-LD
    // is emitted below.
    const pillar = getStructuredPillarBySlug(slug)
    const schemaPath = `/services/${slug}`
    const pName = pillar ? localizedDP(pillar.name, locale) : isRTL ? 'تطبيقات الويب' : 'Web Applications'
    const pDesc = pillar
        ? localizedDP(pillar.description, locale)
        : isRTL
            ? 'تطبيقات ويب تفاعلية بميزات حية وبوابات ومنصات SaaS.'
            : 'Interactive web applications with real-time features, portals, and SaaS platforms.'
    const serviceSchema = buildServiceSchema(locale, { name: pName, description: pDesc, path: schemaPath, serviceType: 'Web Application Development' })
    const breadcrumbSchema = buildBreadcrumbSchema(locale, [
        { name: isRTL ? 'الرئيسية' : 'Home', path: '/' },
        { name: isRTL ? 'الخدمات' : 'Services', path: '/services' },
        { name: pName, path: schemaPath },
    ])

    // Pricing packages + contact form — the two sections the older service-detail
    // pages had that this pillar template was missing (this is what made the
    // pillars feel less complete than /services/saas-mvp-development et al.).
    // Packages come from the web-apps category; each tier's "what's included"
    // reuses the sub-service deliverables shown above.
    const category = getServiceCategory('interactive-web-applications')
    const tierIcons = [
        <Pencil key="p" className="h-6 w-6" aria-hidden="true" />,
        <Star key="s" className="h-6 w-6" aria-hidden="true" />,
        <Sparkles key="k" className="h-6 w-6" aria-hidden="true" />,
    ]
    const tierColors: PricingTier['color'][] = ['sky', 'amber', 'emerald']
    const includedBase = [
        ...subServices.slice(0, 4).map((s) => s.name),
        isRTL ? 'استشارة مجانية قبل تحديد النطاق' : 'Free consultation before scope is set',
        isRTL ? 'معاينة ديمو مجانية مخصصة لطلبك' : 'Free custom demo preview for your inquiry',
        isRTL ? 'تسليم الكود والتوثيق والملكية' : 'Code, documentation & ownership handoff',
    ]
    const serviceTiers: PricingTier[] = (category?.packageNames ?? []).map((pkg, index) => ({
        name: localizedPackageName(pkg, locale),
        icon: tierIcons[index % tierIcons.length],
        price: index === 2 ? (isRTL ? 'عرض مخصص' : 'Custom quote') : (isRTL ? 'نطاق ثابت' : 'Fixed scope'),
        description: index === 0
            ? (isRTL ? `بداية منظمة لخدمة ${pName}` : `A focused starting path for ${pName}`)
            : index === 1
                ? (isRTL ? 'مسار أقوى مع تكاملات ودعم إطلاق' : 'A stronger path with integrations and launch support')
                : (isRTL ? 'تنفيذ مخصص عندما يتّسع النطاق' : 'Custom delivery when the scope grows'),
        features: Array.from(new Set(includedBase)).slice(0, 7),
        popular: index === 1,
        color: tierColors[index % tierColors.length],
        href: `/api/whatsapp?locale=${locale}`,
        ctaLabel: isRTL ? 'حدّد نطاق الخدمة' : 'Scope this service',
    }))

    const projects: Project[] = await getProjectsForService(locale, {
        serviceSlug: slug,
        pillarSlug: 'interactive-web-applications',
    })

    const faqSchema = faq
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.items.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        }
        : null

    return (
        <>
            <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
            {faqSchema ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            ) : null}

            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <PageBreadcrumbs
                    locale={locale}
                    items={[
                        { label: isRTL ? 'الخدمات' : 'Services', href: localePath(locale, '/services') },
                        { label: data.hero[webappLocale].badge },
                    ]}
                />
            </div>

            <WebAppHero content={data.hero[webappLocale]} dir={isRTL ? 'rtl' : 'ltr'} />

            <WebAppFeatures content={data.features[webappLocale]} dir={isRTL ? 'rtl' : 'ltr'} />

            <WebAppProcess
                content={data.process[webappLocale]}
                dir={isRTL ? 'rtl' : 'ltr'}
                ctaHref={`/api/whatsapp?locale=${locale}`}
            />

            {subServices.length > 0 ? (
                <section dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-[#f4f1f8] py-14 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                                {isRTL ? 'ماذا يشمل' : 'What’s included'}
                            </p>
                            <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                                {isRTL ? 'ما نبنيه ضمن هذه الخدمة' : 'What we build under this service'}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {subServices.map((s) => (
                                <SubServiceGlowCard
                                    key={s.name}
                                    href={`/api/whatsapp?locale=${locale}`}
                                    name={s.name}
                                    desc={s.desc}
                                    iconName={s.iconName}
                                    locale={locale}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {projects.length > 0 ? (
                <ProjectsShowcase
                    projects={projects}
                    locale={webappLocale}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    projectHref={(id) => localePath(locale, `/projects/${id}`)}
                    eyebrow={isRTL ? 'أعمالنا' : 'Our work'}
                    heading={isRTL ? 'تطبيقات ومنصات نفّذناها' : 'Applications & platforms we’ve built'}
                    sub={isRTL ? 'تطبيقات ويب حقيقية صمّمناها وبنيناها وأطلقناها لعملاء.' : 'Real web applications we’ve designed, built, and launched for clients.'}
                />
            ) : null}

            <TestimonialsMarquee locale={webappLocale} dir={isRTL ? 'rtl' : 'ltr'} />

            {faq ? (
                <FaqAccordion
                    eyebrow={faq.eyebrow}
                    heading={faq.heading}
                    subheading={faq.subheading}
                    items={faq.items}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />
            ) : null}

            {serviceTiers.length > 0 ? (
                <CreativePricing
                    tag={isRTL ? 'الباقات' : 'Packages'}
                    title={isRTL ? `${pName}: باقات هذه الخدمة` : `${pName}: Packages for this service`}
                    description={isRTL ? 'اختر المستوى المناسب لنطاقك — كل مسار يبدأ باستشارة مجانية ومعاينة ديمو مجانية.' : 'Pick the level that matches your scope — every path starts with a free consultation and a free custom demo preview.'}
                    tiers={serviceTiers}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="bg-[#f4f1f8] py-16 md:py-20"
                />
            ) : null}

            <ContactFast serviceName={pName} locale={webappLocale} dir={isRTL ? 'rtl' : 'ltr'} />
        </>
    )
}
