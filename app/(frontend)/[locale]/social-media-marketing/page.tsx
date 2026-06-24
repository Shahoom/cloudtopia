import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import SocialMediaClient from './SocialMediaClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { socialMediaSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/social-media-marketing', 'social-media-marketing', {
        title: socialMediaSeoFallback.titles[locale] || socialMediaSeoFallback.titles.en,
        description: socialMediaSeoFallback.descriptions[locale] || socialMediaSeoFallback.descriptions.en,
    })
    const title = locale === 'ar' ? 'أفضل شركة تسويق عبر السوشيال ميديا' : 'Best Social Media Marketing Company'
    return { ...metadata, title }
}

export default async function SocialMediaMarketingPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'social-media-marketing')
    const t = dictionary as any
    
    const p = t.services?.socialMediaPage || t.socialMediaPage
    const title = p?.hero?.headline ? `${p.hero.headline} ${p.hero.highlight || ''}` : 'Social Media Marketing Services'
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
            <SocialMediaClient t={t} />
        </>
    )
}
