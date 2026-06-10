import { getPageBundle } from '@/lib/cms/content'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import RestaurantQRMenuClient from './RestaurantQRMenuClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { restaurantQrMenuSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/restaurant-qr-menu', 'restaurant-qr-menu', {
        title: restaurantQrMenuSeoFallback.titles[locale] || restaurantQrMenuSeoFallback.titles.en,
        description: restaurantQrMenuSeoFallback.descriptions[locale] || restaurantQrMenuSeoFallback.descriptions.en,
    })
    const title = locale === 'ar' ? 'أفضل شركة منيو QR للمطاعم' : 'Best Restaurant QR Menu Company'
    return { ...metadata, title }
}

export default async function RestaurantQRMenuPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'restaurant-qr-menu')
    const t = dictionary as any
    
    const p = t.services?.restaurantPage || t.restaurantPage || t.restaurantQRMenuPage
    const title = p?.hero?.title1 ? `${p.hero.title1} ${p.hero.titleHighlight || ''} ${p.hero.title2 || ''}` : 'Restaurant QR Menu Systems'
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
            <RestaurantQRMenuClient t={t} />
        </>
    )
}
