import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { locales, type Locale } from '@/lib/i18n/config'
import { getSiteChrome } from '@/lib/cms/content'
import { getCMSMetadata } from '@/lib/cms/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    const metadata = await getCMSMetadata(locale, '/', 'home')
    const isArabic = locale === 'ar'
    const brandName = isArabic ? 'كلاود توبيا' : 'CloudTopia'
    const title = isArabic
        ? 'كلاود توبيا | شركة برمجيات وحلول سحابية وذكاء اصطناعي عربية'
        : 'CloudTopia | Arabic Software, Cloud & AI Company'
    const socialTitle = isArabic
        ? 'كلاود توبيا | شركة برمجيات وحلول سحابية وذكاء اصطناعي عربية'
        : 'CloudTopia | Arabic Software, Cloud & AI Company'
    const description = isArabic
        ? 'كلاود توبيا شركة عربية للبرمجيات والحلول السحابية والذكاء الاصطناعي، تبني مواقع SEO، متاجر إلكترونية، أنظمة CRM/ERP، بنية سحابية، تطبيقات، وأتمتة ذكية للشركات في الخليج والعالم العربي.'
        : 'CloudTopia is an Arabic software, cloud and AI company building SEO websites, e-commerce platforms, CRM/ERP systems, cloud infrastructure, mobile apps and AI automation for the GCC and Arab world.'

    return {
        ...metadata,
        title: {
            default: title,
            template: `%s | ${brandName}`,
        },
        description,
        openGraph: {
            ...metadata.openGraph,
            title: socialTitle,
            description,
        },
        twitter: {
            ...metadata.twitter,
            title: socialTitle,
            description,
        },
    }
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
    const heroPatch = locale === 'ar'
        ? {
            tags: ['كلاود توبيا | تكنلوجيا رقمية وسحابية', 'أنظمة عربية', 'سحابة وذكاء اصطناعي'],
            title: 'أنظمة برمجية وسحابية وذكاء اصطناعي مصممة للعالم العربي.',
            titleHighlights: ['أنظمة برمجية', 'حلول سحابية', 'ذكاء اصطناعي'],
            description: 'تساعد كلاود توبيا الشركات في السعودية، الإمارات، الخليج، والعالم العربي على بناء منتجات رقمية قابلة للتوسع، تحسّن العمليات، تقلل العمل اليدوي، وتسرّع النمو.',
        }
        : {
            tags: ['CLOUDTOPIA — DIGITAL & CLOUD TECHNOLOGIES', 'Arabic Software Company', 'Cloud AI Systems'],
            title: 'Software, cloud, and AI systems built for the Arab world.',
            titleHighlights: ['Software', 'Cloud', 'AI systems'],
            description: 'CloudTopia helps businesses in Saudi Arabia, UAE, the GCC, and the Arab world build scalable digital products that improve operations, reduce manual work, and accelerate growth.',
        }
    const chromeDictionary = {
        ...chrome.dictionary,
        home: {
            ...(chrome.dictionary as any).home,
            hero: {
                ...((chrome.dictionary as any).home?.hero || {}),
                ...heroPatch,
            },
        },
    }

    return (
        <LanguageProvider
            initialLocale={locale}
            initialDictionary={chromeDictionary}
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
