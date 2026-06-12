import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import EcommerceSolutionsClient from './EcommerceSolutionsClient'
import { ServiceFAQSection } from '@/components/services/ServiceFAQSection'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ecommerceSolutionsSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/ecommerce-solutions', 'ecommerce-solutions', {
        title: ecommerceSolutionsSeoFallback.titles[locale] || ecommerceSolutionsSeoFallback.titles.en,
        description: ecommerceSolutionsSeoFallback.descriptions[locale] || ecommerceSolutionsSeoFallback.descriptions.en,
    })
    const title = locale === 'ar' ? 'أفضل شركة حلول متاجر إلكترونية' : 'Best E-Commerce Solutions Company'
    return { ...metadata, title }
}

export default async function EcommerceSolutionsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'ecommerce-solutions')
    const t = dictionary as any
    
    const p = t.services?.ecommercePage || t.ecommercePage
    const title = p?.hero?.title ? `${p.hero.title} ${p.hero.titleHighlight || ''}` : 'E-Commerce Solutions'
    const desc = p?.hero?.description ?? ''

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{title}</h1>
                {desc && <p>{desc}</p>}
                <p>
                    <a href={canonicalUrl(locale, '/contact')}>Start Your Project</a>
                </p>
            </div>
            <EcommerceSolutionsClient t={t} />
            <ServiceFAQSection slug="ecommerce-solutions" locale={locale} />
        </>
    )
}
