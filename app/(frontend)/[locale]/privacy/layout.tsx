import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { locales } from '@/lib/i18n/config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/privacy')

    const titles: Record<string, string> = {
        en: 'Privacy Policy - CloudTopia',
        ar: 'سياسة الخصوصية - كلاود توبيا',
    }

    const descriptions: Record<string, string> = {
        en: 'CloudTopia\'s Privacy Policy. Learn how we collect, use, and protect your personal information.',
        ar: 'سياسة الخصوصية لكلاود توبيا. تعرف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها.',
    }

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: canonicalUrl(locale, '/privacy'),
            languages: buildHreflangMap('/privacy'),
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: canonicalUrl(locale, '/privacy'),
            type: 'website',
        }
    }
}

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
