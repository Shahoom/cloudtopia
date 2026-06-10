import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'

export const privacySeoFallback = {
    titles: {
        en: 'Privacy Policy - CloudTopia',
        ar: 'سياسة الخصوصية - كلاود توبيا',
    } as Record<string, string>,
    descriptions: {
        en: 'CloudTopia\'s Privacy Policy. Learn how we collect, use, and protect your personal information.',
        ar: 'سياسة الخصوصية لكلاود توبيا. تعرف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/privacy', undefined, {
        title: privacySeoFallback.titles[locale] || privacySeoFallback.titles.en,
        description: privacySeoFallback.descriptions[locale] || privacySeoFallback.descriptions.en,
    })
}

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
