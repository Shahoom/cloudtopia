import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/terms')

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
            canonical: canonicalUrl(locale, '/terms'),
            languages: buildHreflangMap('/terms'),
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: canonicalUrl(locale, '/terms'),
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
