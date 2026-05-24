import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import WebsiteDesignClient from './WebsiteDesignClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/website-design', 'website-design')
}

export default async function WebsiteDesignPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'website-design')
    const t = dictionary as any
    
    const p = t.services?.websiteDesignPage || t.websiteDesignPage
    const title = p?.hero?.prefix ? `${p.hero.prefix} ${p.hero.suffix || ''}` : 'Website Design'
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
            <WebsiteDesignClient t={t} />
        </>
    )
}
