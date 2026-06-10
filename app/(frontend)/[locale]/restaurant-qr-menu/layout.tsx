import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const restaurantQrMenuSeoFallback = {
    titles: {
        en: 'QR Menu Systems for Restaurants in the Gulf',
        ar: 'أنظمة قائمة QR للمطاعم في الخليج',
    } as Record<string, string>,
    descriptions: {
        en: 'Bilingual QR menus for Gulf restaurants and cafés with ordering, payments, instant updates, and clear package scope.',
        ar: 'قوائم QR ثنائية اللغة لمطاعم ومقاهي الخليج مع الطلب والدفع والتحديث الفوري ونطاق باقة واضح.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/restaurant-qr-menu', 'restaurant-qr-menu', {
        title: restaurantQrMenuSeoFallback.titles[locale] || restaurantQrMenuSeoFallback.titles.en,
        description: restaurantQrMenuSeoFallback.descriptions[locale] || restaurantQrMenuSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('restaurant-qr-menu', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Restaurant QR Menu', path: '/restaurant-qr-menu' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Restaurant QR Menu Systems',
                        description: 'Multilingual QR menus with ordering, payment, and instant updates for Gulf restaurants and cafés.',
                        path: '/restaurant-qr-menu',
                        serviceType: 'Digital Menu Solutions',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
