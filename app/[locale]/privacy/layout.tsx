import type { Metadata } from 'next'
import { locales } from '@/lib/i18n/config'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale

    const titles: Record<string, string> = {
        en: 'Privacy Policy - CloudTopia',
        ar: 'سياسة الخصوصية - كلاود توبيا',
        tr: 'Gizlilik Politikası - CloudTopia',
    }

    const descriptions: Record<string, string> = {
        en: 'CloudTopia\'s Privacy Policy. Learn how we collect, use, and protect your personal information.',
        ar: 'سياسة الخصوصية لكلاود توبيا. تعرف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها.',
        tr: 'CloudTopia\'nın Gizlilik Politikası. Kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu öğrenin.',
    }

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/privacy`,
            languages: {
                'en': 'https://cloudtopia.net/en/privacy',
                'ar': 'https://cloudtopia.net/ar/privacy',
                'tr': 'https://cloudtopia.net/tr/privacy',
                'x-default': 'https://cloudtopia.net/en/privacy',
            },
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: `https://cloudtopia.net/${locale}/privacy`,
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
