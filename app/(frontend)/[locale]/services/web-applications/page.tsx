import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import WebApplicationsClient from './WebApplicationsClient'
import { ServiceFAQSection } from '@/components/services/ServiceFAQSection'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { webApplicationsSeoFallback } from './seo-fallback'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/services/web-applications', 'web-applications', {
        title: webApplicationsSeoFallback.titles[locale] || webApplicationsSeoFallback.titles.en,
        description: webApplicationsSeoFallback.descriptions[locale] || webApplicationsSeoFallback.descriptions.en,
    })
    const title = locale === 'ar' ? 'أفضل شركة تطوير تطبيقات ويب' : 'Best Web Applications Development Company'
    return { ...metadata, title }
}

export default async function WebApplicationsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'web-applications')
    const t = dictionary as any
    
    const p = t.services?.webApplicationsPage || t.webApplicationsPage
    const title = p?.hero?.title ? `${p.hero.title} ${p.hero.titleHighlight || ''}` : 'Web Applications Development'
    const desc = p?.hero?.description ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <p>{title}</p>
                {desc && <p>{desc}</p>}
                <p>
                    <a href={canonicalUrl(locale, '/contact')}>Start Your Project</a>
                </p>
            </div>
            <WebApplicationsClient t={t} />
            <ServiceFAQSection slug="web-applications" locale={locale} />
        </>
    )
}
