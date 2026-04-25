import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale

    const titles: Record<string, string> = {
        en: 'Terms of Service - CloudTopia',
        ar: 'شروط الخدمة - كلاود توبيا',
        tr: 'Hizmet Şartları - CloudTopia',
    }

    const descriptions: Record<string, string> = {
        en: 'CloudTopia\'s Terms of Service. Review our terms and conditions for using our services.',
        ar: 'شروط الخدمة لكلاود توبيا. راجع الشروط والأحكام الخاصة بنا لاستخدام خدماتنا.',
        tr: 'CloudTopia\'nın Hizmet Şartları. Hizmetlerimizi kullanmak için geçerli şartları ve koşulları inceleyin.',
    }

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/terms`,
            languages: {
                'en': 'https://cloudtopia.net/en/terms',
                'ar': 'https://cloudtopia.net/ar/terms',
                'tr': 'https://cloudtopia.net/tr/terms',
                'x-default': 'https://cloudtopia.net/en/terms',
            },
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: `https://cloudtopia.net/${locale}/terms`,
            type: 'website',
        }
    }
}

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
