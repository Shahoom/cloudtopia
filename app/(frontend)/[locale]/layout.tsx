import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { locales, type Locale } from '@/lib/i18n/config'
import { getSiteChrome } from '@/lib/cms/content'
import { getCMSMetadata } from '@/lib/cms/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/', 'home')
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'en'
    const chrome = await getSiteChrome(locale)

    return (
        <LanguageProvider
            initialLocale={locale}
            initialDictionary={chrome.dictionary}
            initialDesign={chrome.design}
            initialNavigation={chrome.navigation}
            initialSettings={chrome.settings}
        >
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </LanguageProvider>
    )
}
