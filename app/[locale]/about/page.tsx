import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import AboutPageClient from './AboutPageClient'

export default async function AboutPage({
    params,
}: {
    params: { locale: string }
}) {
    const locale = (params.locale ?? 'en') as Locale
    const t = await getDictionary(locale)
    const hero = t.about?.hero ?? ({} as any)
    const mission = t.about?.mission ?? ({} as any)
    const vision = t.about?.vision ?? ({} as any)

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{hero.title} {hero.titleHighlight}</h1>
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
            <AboutPageClient />
        </>
    )
}
