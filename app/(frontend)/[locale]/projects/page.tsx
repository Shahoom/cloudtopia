import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { BASE_URL, buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import ProjectsPageClient from './ProjectsPageClient'
import { ogImagesFor } from '@/lib/og/og-image'
import type { Metadata } from 'next'

type ProjectCardSummary = {
    id: string
    title: string
    type: string
    problem: string
    solution: string
    image?: string
}

/** Resolves a project image to an absolute URL for ImageObject schema (SD-9). */
function absoluteImageUrl(image?: string): string | undefined {
    if (!image) return undefined
    if (image.startsWith('http')) return image
    return `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`
}

import { applySeoOverride } from '@/lib/cms/route-seo'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    const title = isArabic ? 'المشاريع ودراسات الحالة' : 'Projects & Case Studies'
    const socialTitle = isArabic ? 'المشاريع ودراسات الحالة | كلاود توبيا' : 'Projects & Case Studies | CloudTopia'
    const description = isArabic
        ? 'مشاريع كلاود توبيا في المواقع، المتاجر، تطبيقات الويب، الأنظمة، وتجارب الذكاء الاصطناعي.'
        : 'CloudTopia projects across websites, e-commerce, web apps, systems, and AI experiences.'

    const meta: Metadata = {
        title,
        description,
        openGraph: {
            title: socialTitle,
            description,
            url: canonicalUrl(locale, '/projects'),
            siteName: 'CloudTopia',
            type: 'website',
            images: ogImagesFor({ page: 'projects', locale }),
        },
        twitter: {
            title: socialTitle,
            description,
            card: 'summary_large_image',
            images: ogImagesFor({ page: 'projects', locale }).map((image) => image.url),
        },
        alternates: {
            canonical: canonicalUrl(locale, '/projects'),
            languages: buildHreflangMap('/projects'),
        },
    }

    return applySeoOverride(meta, locale, 'projects')
}

/**
 * Server shell. Renders a screen-reader-only block with project headings,
 * descriptions, and absolute anchors so Googlebot (and AI crawlers that
 * don't fully execute JS) can see the page content immediately. The
 * visible UI is owned entirely by the client island below, which preserves
 * every animation/modal/filter/effect of the previous all-client page.
 */
export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'projects')
    const t = dictionary as any
    const heroTitle = t.projects?.hero?.title ?? 'Our Projects'
    const heroHighlight = t.projects?.hero?.titleHighlight ?? ''
    const heroDesc = t.projects?.hero?.description ?? ''
    const projects: ProjectCardSummary[] = Array.isArray(t.projects?.projectCards)
        ? (t.projects.projectCards as ProjectCardSummary[])
        : []

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => {
            const imageUrl = absoluteImageUrl(p.image)
            return {
                '@type': 'ListItem',
                position: i + 1,
                url: canonicalUrl(locale, `/projects/${p.id}`),
                name: p.title,
                // SD-9: attach an ImageObject for each case study card when an
                // image is available.
                ...(imageUrl
                    ? { image: { '@type': 'ImageObject', url: imageUrl, contentUrl: imageUrl } }
                    : {}),
            }
        }),
    }
    const projectsCollectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: locale === 'ar' ? 'دراسات حالة كلاود توبيا' : 'CloudTopia Case Studies',
        description: locale === 'ar'
            ? 'مشاريع كلاود توبيا تعرض المشكلة والحل والميزات والنتيجة لمواقع ومتاجر وأنظمة وتطبيقات ثنائية اللغة.'
            : 'CloudTopia projects document the challenge, solution, shipped features, and outcome across bilingual websites, stores, systems, and applications.',
        url: canonicalUrl(locale, '/projects'),
        mainEntity: itemListSchema,
        publisher: {
            '@type': 'Organization',
            '@id': 'https://cloudtopia.net/#organization',
            name: 'CloudTopia',
            url: 'https://cloudtopia.net',
        },
    }
    // JSONLD-6: moved here from projects/layout.tsx (where it leaked onto all
    // 16 project detail pages) so it renders only on the listing.
    const breadcrumbNames = locale === 'ar'
        ? { home: 'الرئيسية', projects: 'المشاريع' }
        : { home: 'Home', projects: 'Projects' }
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: breadcrumbNames.home, item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: breadcrumbNames.projects, item: canonicalUrl(locale, '/projects') },
        ],
    }
    const projectsFaqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: locale === 'ar' ? 'كيف أستخدم صفحة المشاريع لاختيار خدمة؟' : 'How should I use the projects page to choose a service?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: locale === 'ar'
                        ? 'ابدأ بالبحث حسب القطاع أو الخدمة أو الميزة، ثم افتح دراسة حالة لمراجعة المشكلة والحل والميزات والنتيجة قبل التواصل.'
                        : 'Search by industry, service, feature, or result, then open a case study to review the challenge, solution, features, and outcome before contacting CloudTopia.',
                },
            },
            {
                '@type': 'Question',
                name: locale === 'ar' ? 'هل تعرض المشاريع نتائج قابلة للقياس؟' : 'Do the projects show measurable outcomes?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: locale === 'ar'
                        ? 'نعم. كل بطاقة مشروع تعرض مؤشر نتيجة مثل الأداء أو النمو أو التحسين بجانب المشكلة والحل.'
                        : 'Yes. Each project card includes an outcome signal such as performance, growth, or improvement alongside the challenge and solution.',
                },
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsCollectionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="sr-only" aria-hidden="false">
                <p>{heroTitle} {heroHighlight}</p>
                {heroDesc && <p>{heroDesc}</p>}
                <ul>
                    {projects.map((p) => (
                        <li key={p.id}>
                            <a href={canonicalUrl(locale, `/projects/${p.id}`)}>
                                <strong>{p.title}</strong> — {p.type}. {p.solution || p.problem}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <ProjectsPageClient t={t} />
        </>
    )
}
