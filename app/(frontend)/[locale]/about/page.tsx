import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import AboutPageClient from './AboutPageClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { aboutSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/about', 'about', {
        title: aboutSeoFallback.titles[locale] || aboutSeoFallback.titles.en,
        description: aboutSeoFallback.descriptions[locale] || aboutSeoFallback.descriptions.en,
    })
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'about')
    const t = dictionary as any
    const hero = t.about?.hero ?? ({} as any)
    const mission = t.about?.mission ?? ({} as any)
    const vision = t.about?.vision ?? ({} as any)

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <p>{hero.title} {hero.titleHighlight}</p>
                {hero.description && <p>{hero.description}</p>}
                {hero.philosophy && <p>{hero.philosophy}</p>}
                {mission.title && (
                    <section>
                        <h2>{mission.title}</h2>
                        {mission.description && <p>{mission.description}</p>}
                    </section>
                )}
                {vision.title && (
                    <section>
                        <h2>{vision.title}</h2>
                        {vision.description && <p>{vision.description}</p>}
                    </section>
                )}
                <p>
                    <a href={canonicalUrl(locale, '/contact')}>Contact CloudTopia</a>
                </p>
            </div>
            <AboutPageClient t={t} />
        </>
    )
}
