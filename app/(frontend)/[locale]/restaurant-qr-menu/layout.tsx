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
    // Locale-branch the schema labels so Arabic URLs don't ship English
    // breadcrumb/Service names that contradict the Arabic canonical + content.
    const isAr = locale === 'ar'

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: isAr ? 'الرئيسية' : 'Home', path: '/' },
                        { name: isAr ? 'الخدمات' : 'Services', path: '/services' },
                        { name: isAr ? 'قائمة QR للمطاعم' : 'Restaurant QR Menu', path: '/restaurant-qr-menu' },
                    ]),
                    buildServiceSchema(locale, {
                        name: isAr ? 'أنظمة قائمة QR للمطاعم' : 'Restaurant QR Menu Systems',
                        description: isAr
                            ? 'قوائم QR متعددة اللغات مع الطلب والدفع والتحديث الفوري لمطاعم ومقاهي الخليج.'
                            : 'Multilingual QR menus with ordering, payment, and instant updates for Gulf restaurants and cafés.',
                        path: '/restaurant-qr-menu',
                        serviceType: isAr ? 'حلول القوائم الرقمية' : 'Digital Menu Solutions',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
