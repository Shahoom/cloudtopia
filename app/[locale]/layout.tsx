import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: {
            absolute: isAr
                ? 'كلاود توبيا — تقنيات رقمية وسحابية'
                : 'CloudTopia — Digital & Cloud Technologies',
            template: isAr ? '%s | كلاود توبيا' : '%s | CloudTopia',
        },
        description: isAr
            ? 'كلاود توبيا تبني مواقع ويب، أنظمة أعمال مخصصة، متاجر إلكترونية، وتطبيقات ويب. وكالة رقمية متخصصة للشركات النامية.'
            : 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
        openGraph: {
            type: 'website',
            locale: isAr ? 'ar_SA' : 'en_US',
            alternateLocale: isAr ? 'en_US' : 'ar_SA',
            url: isAr ? 'https://cloudtopia.net/ar' : 'https://cloudtopia.net/en',
            title: isAr ? 'كلاود توبيا — تقنيات رقمية وسحابية' : 'CloudTopia — Digital & Cloud Technologies',
            description: isAr
                ? 'كلاود توبيا تبني مواقع ويب، أنظمة أعمال مخصصة، متاجر إلكترونية، وتطبيقات ويب. وكالة رقمية متخصصة للشركات النامية.'
                : 'CloudTopia builds websites, custom business systems, e-commerce stores, and web applications. Expert digital agency for growing businesses.',
            siteName: isAr ? 'كلاود توبيا' : 'CloudTopia',
            images: [{
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: isAr ? 'كلاود توبيا — تقنيات رقمية وسحابية' : 'CloudTopia — Digital & Cloud Technologies',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: isAr ? 'كلاود توبيا — تقنيات رقمية وسحابية' : 'CloudTopia — Digital & Cloud Technologies',
            description: isAr
                ? 'كلاود توبيا تبني مواقع ويب وأنظمة أعمال وتطبيقات ويب مخصصة.'
                : 'CloudTopia builds websites, business systems, and custom web applications.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar' : 'https://cloudtopia.net/en',
            languages: {
                'en': 'https://cloudtopia.net/en',
                'ar': 'https://cloudtopia.net/ar',
                'x-default': 'https://cloudtopia.net/en',
            },
        },
    }
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
