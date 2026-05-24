import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import HomePageClient from './HomePageClient'

type ProjectCardSummary = {
    id: string
    title: string
    featured: boolean
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, '/')
    const t = dictionary as any
    const heroTitle = t.home?.hero?.title ?? 'Elevate Your Business'
    const heroDesc = t.home?.hero?.description ?? ''
    const featured = ((t.projects?.projectCards || []) as ProjectCardSummary[]).filter(
        (p) => p.featured,
    )

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{heroTitle}</h1>
                {heroDesc && <p>{heroDesc}</p>}
                {featured.length > 0 && (
                    <ul>
                        {featured.map((p) => (
                            <li key={p.id}>
                                <a href={canonicalUrl(locale, `/projects/${p.id}`)}>{p.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <HomePageClient serverDictionary={dictionary} />
        </>
    )
}
