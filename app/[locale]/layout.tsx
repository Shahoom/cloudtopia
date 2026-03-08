import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: {
            absolute: isAr
                ? 'كلاود توبيا — تقنيات رقمية وسحابية | عالمي'
                : 'CloudTopia — Digital & Cloud Technologies | Worldwide',
            template: isAr ? '%s | كلاود توبيا' : '%s | CloudTopia',
        },
        description: isAr
            ? 'حوّل أعمالك مع حلول رقمية وسحابية متطورة. خبرة في تطوير الويب والبنية التحتية السحابية وخدمات التحول الرقمي في جميع أنحاء العالم.'
            : 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services serving clients worldwide.',
        openGraph: {
            type: 'website',
            locale: isAr ? 'ar_SA' : 'en_US',
            alternateLocale: isAr ? 'en_US' : 'ar_SA',
            url: isAr ? 'https://cloudtopia.net/ar' : 'https://cloudtopia.net/en',
            title: isAr ? 'كلاود توبيا — تقنيات رقمية وسحابية' : 'CloudTopia — Digital & Cloud Technologies',
            description: isAr
                ? 'حوّل أعمالك مع حلول رقمية وسحابية متطورة. خبرة في تطوير الويب والبنية التحتية السحابية وخدمات التحول الرقمي.'
                : 'Transform your business with cutting-edge digital and cloud solutions. Expert web development, cloud infrastructure, and digital transformation services worldwide.',
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
                ? 'حوّل أعمالك مع حلول رقمية وسحابية متطورة.'
                : 'Transform your business with cutting-edge digital and cloud solutions.',
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
