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
                ctaHref={localePath(locale, '/contact')}
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
                                    href="/contact"
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
        </>
    )
}
