import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Target, Lightbulb, TrendingUp } from 'lucide-react'
import { getProjectById, getAllProjects } from '@/lib/projects'
import { getOgImage } from '@/lib/og/og-image'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
    params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
    return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', slug } = await params
    const project = await getProjectById(slug, locale)
    if (!project) return { title: 'Project Not Found' }

    const title = `${project.title} — Case Study | CloudTopia`
    const description = `${project.problem} ${project.solution}`.slice(0, 160)

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl(locale, `/projects/${slug}`),
            // Per-project OG image override at /public/images/og/projects/{slug}-{locale}.jpg
            // falls back to project.image, then brand default per locale.
            images: (() => {
                const og = getOgImage({
                    page: `projects/${slug}`,
                    locale,
                    override: project.image || undefined,
                })
                return [{ url: og!.url, width: 1200, height: 630, alt: project.title }]
            })(),
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [getOgImage({ page: `projects/${slug}`, locale, override: project.image || undefined })!.url],
        },
        alternates: {
            canonical: canonicalUrl(locale, `/projects/${slug}`),
            languages: {
                'en': canonicalUrl('en', `/projects/${slug}`),
                'ar': canonicalUrl('ar', `/projects/${slug}`),
                'x-default': canonicalUrl('en', `/projects/${slug}`),
            },
        },
    }
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { locale = 'en', slug } = await params
    const project = await getProjectById(slug, locale)
    if (!project) notFound()

    const isRTL = locale === 'ar'
    const allProjects = await getAllProjects(locale)
    const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3)

    const labels = {
        en: { backToProjects: 'All Projects', problem: 'The Challenge', solution: 'Our Solution', features: 'What We Shipped', outcome: 'The Outcome', visitProject: 'Visit live project', relatedProjects: 'More Case Studies', readyForYours: 'Ready to ship yours?', startProject: 'Start a Project', viewPricing: 'See Pricing' },
        ar: { backToProjects: 'جميع المشاريع', problem: 'التحدي', solution: 'حلّنا', features: 'ما شحنّاه', outcome: 'النتيجة', visitProject: 'زيارة المشروع المباشر', relatedProjects: 'المزيد من دراسات الحالة', readyForYours: 'جاهز لشحن مشروعك؟', startProject: 'ابدأ مشروعاً', viewPricing: 'شاهد الأسعار' },
    }
    const L = labels[locale as 'en' | 'ar'] || labels.en

    const caseStudySchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonicalUrl(locale, `/projects/${project.id}`)}#article`,
        headline: project.title,
        description: project.solution,
        image: getOgImage({ page: `projects/${slug}`, locale, override: project.image || undefined })!.url,
        datePublished: '2025-06-01',
        dateModified: new Date().toISOString().split('T')[0],
        author: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        publisher: {
            '@type': 'Organization',
            name: 'CloudTopia',
            url: 'https://cloudtopia.net',
            logo: { '@type': 'ImageObject', url: 'https://cloudtopia.net/logo.svg' },
        },
        mainEntityOfPage: canonicalUrl(locale, `/projects/${project.id}`),
        about: project.type,
        keywords: project.features.join(', '),
        articleSection: 'Case Study',
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: canonicalUrl(locale, '/projects') },
            { '@type': 'ListItem', position: 3, name: project.title, item: canonicalUrl(locale, `/projects/${project.id}`) },
        ],
    }

    return (
        <div className="relative min-h-screen bg-lavender" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden" data-header-theme="light">
                <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary-200/30 rounded-full blur-[120px]" />
                <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-secondary-200/30 rounded-full blur-[120px]" />

                <div className="relative max-w-5xl mx-auto">
                    <Link
                        href={localePath(locale, '/projects')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
                    >
                        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        {L.backToProjects}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-bold uppercase tracking-widest text-neutral-700 shadow-sm">
                            {project.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 text-xs font-bold text-primary-700 shadow-sm">
                            <TrendingUp className="w-3 h-3" />
                            {project.metrics.value} · {project.metrics.label}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-8">
                        {project.title}
                    </h1>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
                        >
                            {L.visitProject}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </section>

            {/* Image hero */}
            {project.image && (
                <section className="relative px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-[16/9] bg-neutral-100">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Problem + Solution */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                    <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                            <Target className="w-5 h-5 text-amber-700" strokeWidth={2} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{L.problem}</h2>
                        <p className="text-base md:text-lg text-neutral-600 leading-relaxed">{project.problem}</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-lg">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                            <Lightbulb className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{L.solution}</h2>
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">{project.solution}</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-3.5 py-1.5 rounded-full bg-secondary-50 border border-secondary-100 text-xs font-bold uppercase tracking-widest text-secondary-700 mb-4">
                            {L.features}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{project.title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-start gap-3 p-5 rounded-2xl bg-lavender border border-neutral-200"
                            >
                                <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" strokeWidth={2} />
                                <span className="text-sm md:text-base font-semibold text-neutral-800">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outcome */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-eerie overflow-hidden" data-header-theme="dark">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18), transparent 60%)',
                    }}
                />
                <div className="relative max-w-3xl mx-auto text-center">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-cyan-300 mb-6">
                        {L.outcome}
                    </span>
                    <div className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary-300 to-secondary-300 mb-4">
                        {project.metrics.value}
                    </div>
                    <div className="text-xl md:text-2xl font-semibold text-white">{project.metrics.label}</div>
                </div>
            </section>

            {/* Related projects */}
            {relatedProjects.length > 0 && (
                <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-between mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{L.relatedProjects}</h2>
                            <Link
                                href={localePath(locale, '/projects')}
                                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                            >
                                {L.backToProjects}
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedProjects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={localePath(locale, `/projects/${p.id}`)}
                                    className="group block rounded-2xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    {p.image && (
                                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                                            <Image
                                                src={p.image}
                                                alt={p.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                                            {p.type}
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                                            {p.title}
                                        </h3>
                                        <div className="text-sm text-neutral-500">
                                            {p.metrics.value} · {p.metrics.label}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                />
                <div className="relative max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-5">{L.readyForYours}</h2>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link
                            href={localePath(locale, '/contact')}
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-primary-700 font-semibold hover:bg-lavender transition-colors"
                        >
                            {L.startProject}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link
                            href={localePath(locale, '/pricing')}
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/30 hover:border-white font-semibold transition-colors"
                        >
                            {L.viewPricing}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
