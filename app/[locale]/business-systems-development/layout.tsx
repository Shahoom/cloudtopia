import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Business Systems Development — CRM, POS, HR & More',
        ar: 'تطوير أنظمة الأعمال — CRM، POS، HR والمزيد',
        tr: 'İş Sistemleri Geliştirme — CRM, POS, İK ve Daha Fazlası',
    }
    const descs: Record<string, string> = {
        en: 'Custom business systems: CRM, inventory, POS, HR, and booking systems built for your operations.',
        ar: 'أنظمة أعمال مخصصة: CRM، إدارة المخزون، POS، HR، وأنظمة الحجز المصممة لعملياتك.',
        tr: 'Özel iş sistemleri: CRM, envanter, POS, İK ve operasyonlarınız için oluşturulmuş rezervasyon sistemleri.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Business Systems — CloudTopia',
        ar: 'أنظمة الأعمال — كلاود توبيا',
        tr: 'İş Sistemleri — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Custom CRM, POS, inventory, and HR systems for your business.',
        ar: 'أنظمة CRM وPOS وإدارة المخزون وHR مخصصة لعملك.',
        tr: 'İşletmeniz için özel CRM, POS, envanter ve İK sistemleri.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: `https://cloudtopia.net/${locale}/business-systems-development`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/business-systems-development`,
            languages: { 'en': 'https://cloudtopia.net/en/business-systems-development', 'ar': 'https://cloudtopia.net/ar/business-systems-development', 'tr': 'https://cloudtopia.net/tr/business-systems-development', 'x-default': 'https://cloudtopia.net/en/business-systems-development' },
        },
    }
}

export default function businesssystemsdevelopmentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net' },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cloudtopia.net/en/services' },
                            { '@type': 'ListItem', position: 3, name: 'Business Systems Development', item: 'https://cloudtopia.net/en/business-systems-development' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Business Systems Development — CRM, POS, HR & More',
                        description: 'Custom business systems: CRM, inventory, POS, HR, and booking systems built for your operations.',
                        url: 'https://cloudtopia.net/en/business-systems-development',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Business Software Development',
                        areaServed: 'Worldwide',
                    }),
                }}
            />
            {children}
        </>
    )
}
