import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'

export const termsSeoFallback = {
    titles: {
        en: 'Terms of Service - CloudTopia',
        ar: 'شروط الخدمة - كلاود توبيا',
    } as Record<string, string>,
    descriptions: {
        en: 'CloudTopia\'s Terms of Service. Review our terms and conditions for using our services.',
        ar: 'شروط الخدمة لكلاود توبيا. راجع الشروط والأحكام الخاصة بنا لاستخدام خدماتنا.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/terms', undefined, {
        title: termsSeoFallback.titles[locale] || termsSeoFallback.titles.en,
        description: termsSeoFallback.descriptions[locale] || termsSeoFallback.descriptions.en,
    })
}

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
