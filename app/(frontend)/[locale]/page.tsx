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
    const heroDesc = locale === 'ar'
        ? 'كلاود توبيا تطور مواقع شركات، متاجر إلكترونية، تطبيقات ويب وجوال، أنظمة CRM وERP، ترحيل سحابي، نقل بيانات، وأتمتة بالذكاء الاصطناعي.'
        : 'CloudTopia builds company websites, e-commerce stores, web and mobile apps, CRM and ERP systems, cloud migration, data migration, and AI automation.'
    const featured = ((t.projects?.projectCards || []) as ProjectCardSummary[]).filter(
        (p) => p.featured,
    )

    return (
        <>
            <div className="sr-only" aria-hidden="false">
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
