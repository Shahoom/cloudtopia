import { canonicalUrl } from '@/lib/i18n/url'
import PricingPageClient from './PricingPageClient'

const PRICING_HEADLINE: Record<string, { h1: string; intro: string; viewServices: string; contact: string }> = {
    en: {
        h1: 'Pricing — Fixed, Transparent, No Surprises',
        intro:
            'Choose a service: website design, e-commerce, business systems, restaurant QR menus, social media marketing, content creation, or custom web applications. Every tier ships with native Arabic + English support and bilingual delivery.',
        viewServices: 'Explore all services',
        contact: 'Talk to us',
    },
    ar: {
        h1: 'الأسعار — ثابتة وشفافة وبدون مفاجآت',
        intro:
            'اختر الخدمة: تصميم موقع، تجارة إلكترونية، أنظمة أعمال، قوائم QR للمطاعم، تسويق وسائل التواصل، إنشاء محتوى، أو تطبيقات ويب مخصصة. كل باقة تأتي بدعم عربي + إنجليزي أصلي.',
        viewServices: 'استكشف جميع الخدمات',
        contact: 'تواصل معنا',
    },
    tr: {
        h1: 'Fiyatlandırma — Sabit, Şeffaf, Sürprizsiz',
        intro:
            'Bir hizmet seçin: web tasarımı, e-ticaret, iş sistemleri, restoran QR menüleri, sosyal medya pazarlama, içerik üretimi veya özel web uygulamaları. Tüm paketler yerli Arapça + İngilizce desteğiyle gelir.',
        viewServices: 'Tüm hizmetleri keşfedin',
        contact: 'Bize ulaşın',
    },
}

export default function PricingPage({ params }: { params: { locale: string } }) {
    const locale = params.locale ?? 'en'
    const copy = PRICING_HEADLINE[locale] ?? PRICING_HEADLINE.en

    return (
        <>
            <div className="sr-only" aria-hidden="false">
                <h1>{copy.h1}</h1>
                <p>{copy.intro}</p>
                <p>
                    <a href={canonicalUrl(locale, '/services')}>{copy.viewServices}</a>
                    {' · '}
                    <a href={canonicalUrl(locale, '/contact')}>{copy.contact}</a>
                </p>
            </div>
            <PricingPageClient />
        </>
    )
}
