import type { Metadata } from 'next'

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
            canonical: `/${locale}/terms`,
            languages: {
                'en-US': '/en/terms',
                'ar-EG': '/ar/terms',
                'tr-TR': '/tr/terms',
            },
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: `/${locale}/terms`,
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
