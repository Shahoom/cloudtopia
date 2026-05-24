import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import ProjectsPageClient from './ProjectsPageClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

type ProjectCardSummary = {
    id: string
    title: string
    type: string
    problem: string
    solution: string
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/projects', 'projects')
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
        itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: canonicalUrl(locale, `/projects/${p.id}`),
            name: p.title,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <div className="sr-only" aria-hidden="false">
                <h1>{heroTitle} {heroHighlight}</h1>
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
