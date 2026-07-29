import { getPageBundle } from '@/lib/cms/content'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import { ORGANIZATION_ID } from '@/lib/seo/schema'
import ContactClient from './ContactClient'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { contactSeoFallback } from './layout'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/contact', 'contact', {
        title: contactSeoFallback.titles[locale] || contactSeoFallback.titles.en,
        description: contactSeoFallback.descriptions[locale] || contactSeoFallback.descriptions.en,
    })
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale: rawLocale = 'en' } = await params
    const locale = rawLocale as Locale
    const { dictionary } = await getPageBundle(locale, 'contact')
    const t = dictionary as any
    
    const p = t.contact
    const title = p?.hero?.title || 'Contact Us'
    const desc = p?.hero?.description ?? ''
    const isArabic = locale === 'ar'
    const contactSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ContactPage',
                name: isArabic ? 'تواصل مع كلاود توبيا' : 'Contact CloudTopia',
                description: isArabic
                    ? 'مكتب استقبال مشاريع كلاود توبيا للمواقع والمتاجر والأنظمة والتطبيقات والتحسينات ثنائية اللغة.'
                    : 'CloudTopia project intake for websites, e-commerce, systems, applications, and bilingual growth work.',
                url: canonicalUrl(locale, '/contact'),
                mainEntity: {
                    '@type': 'Organization',
                    '@id': ORGANIZATION_ID,
                    name: 'CloudTopia',
                    url: 'https://cloudtopia.net',
                    email: 'info@cloudtopia.net',
                    contactPoint: {
                        '@type': 'ContactPoint',
                        email: 'info@cloudtopia.net',
                        contactType: 'project intake',
                        availableLanguage: ['English', 'Arabic'],
                        areaServed: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Iraq', 'Syria', 'Jordan', 'Egypt', 'Lebanon'],
                    },
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: isArabic ? 'ماذا يحدث بعد إرسال نموذج التواصل؟' : 'What happens after I send the contact form?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: isArabic
                                ? 'يراجع فريق كلاود توبيا النطاق والسوق والتكاملات والجدول الزمني، ثم يرد بمسار باقة أو تقدير مخصص خلال يوم عمل واحد.'
                                : 'CloudTopia reviews the scope, market, integrations, and timeline, then replies with a package path or custom estimate within one business day.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: isArabic ? 'ما التفاصيل التي يجب إرسالها؟' : 'What details should I include?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: isArabic
                                ? 'اذكر السوق المستهدف، نوع الخدمة، التكاملات المطلوبة، الأنظمة الحالية، والموعد المتوقع للإطلاق.'
                                : 'Include the target market, service type, required integrations, current systems, and expected launch date.',
                        },
                    },
                ],
            },
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactSchema) }} />
            <div className="sr-only" aria-hidden="false">
                <p>{title}</p>
                {desc && <p>{desc}</p>}
            </div>
            <ContactClient t={t} />
        </>
    )
}
