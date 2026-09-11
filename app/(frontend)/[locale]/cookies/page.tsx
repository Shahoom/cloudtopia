import type { Metadata } from 'next'
import { Cookie } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import { canonicalUrl } from '@/lib/i18n/url'
import { LegalPage, type LegalSection } from '@/components/legal/LegalPage'

export const dynamicParams = false
export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ar' }]
}

const LAST_UPDATED = { en: 'September 11, 2026', ar: '11 سبتمبر 2026' }

const META = {
    en: {
        title: 'Cookie Policy - CloudTopia',
        description: 'Which cookies CloudTopia uses, why, and how to accept, refuse, or delete them.',
    },
    ar: {
        title: 'سياسة ملفات تعريف الارتباط - كلاود توبيا',
        description: 'ملفات تعريف الارتباط التي يستخدمها موقع كلاود توبيا، وأسباب استخدامها، وكيفية قبولها أو رفضها أو حذفها.',
    },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    const m = META[locale === 'ar' ? 'ar' : 'en']
    const path = '/cookies'
    return {
        title: m.title,
        description: m.description,
        alternates: {
            canonical: canonicalUrl(locale, path),
            languages: { en: canonicalUrl('en', path), ar: canonicalUrl('ar', path), 'x-default': canonicalUrl('en', path) },
        },
    }
}

const SECTIONS: Record<'en' | 'ar', LegalSection[]> = {
    en: [
        {
            title: '1. What cookies are',
            content:
                'Cookies are small text files stored on your device by websites you visit. Similar technologies (localStorage, pixels) serve the same purposes. This policy explains exactly which ones this website uses.',
        },
        {
            title: '2. Strictly necessary cookies (no consent required)',
            content: 'These are required for the website to function and are always active:',
            items: [
                'ct-consent: Remembers your cookie choice (accept / necessary only). Stored for 12 months.',
                'NEXT_LOCALE: Remembers your language choice (English / Arabic). Stored for 12 months.',
                'cloudtopia-locale (localStorage): A backup copy of your language choice kept in your browser.',
            ],
        },
        {
            title: '3. Analytics and marketing cookies (only with your consent)',
            content:
                'We only set these AFTER you press "Accept analytics" in the cookie banner. If you choose "Necessary only", none of them are loaded:',
            items: [
                '_ga, _ga_* (Google Analytics 4): Help us understand how visitors use the site — pages visited, time on page, approximate region. Stored for up to 13 months. Data is processed by Google LLC.',
                '_fbp (Meta Pixel): Helps us measure the effectiveness of our marketing on Facebook and Instagram. Stored for 90 days. Data is processed by Meta Platforms.',
            ],
            footer:
                'Vercel Web Analytics and Speed Insights, which we use for performance monitoring, are cookieless: they set no cookies and identify no individual visitors.',
        },
        {
            title: '4. Third-party content',
            content:
                'Some sections embed third-party content that may use its own cookies once it loads:',
            items: [
                'Clutch.co review widget: Loads only when the reviews section approaches your screen.',
                'WhatsApp: Clicking a WhatsApp button opens wa.me (operated by Meta). We pass no personal data — only a pre-filled greeting message.',
            ],
        },
        {
            title: '5. Changing your choice',
            content:
                'You can change your mind at any time. Delete this site\'s cookies from your browser settings (usually under Privacy → Cookies → See all site data) and reload the page — the consent banner will appear again. You can also block or delete cookies globally through your browser; the site keeps working, though your language preference will reset.',
        },
        {
            title: '6. Contact',
            content:
                'Questions about this policy: info@cloudtopia.net. See also our Privacy Policy at cloudtopia.net/privacy for how we handle personal data generally.',
        },
    ],
    ar: [
        {
            title: '1. ما هي ملفات تعريف الارتباط',
            content:
                'ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة تُخزَّن على جهازك من المواقع التي تزورها. وتؤدي التقنيات المشابهة (التخزين المحلي، وحدات البكسل) الأغراض نفسها. توضح هذه السياسة بدقة ما يستخدمه هذا الموقع.',
        },
        {
            title: '2. الملفات الضرورية (لا تتطلب موافقة)',
            content: 'هذه الملفات ضرورية لعمل الموقع وتكون مفعّلة دائماً:',
            items: [
                'ct-consent: يتذكّر اختيارك بشأن الكوكيز (قبول / الضروري فقط). يُخزَّن لمدة 12 شهراً.',
                'NEXT_LOCALE: يتذكّر لغتك المفضلة (العربية / الإنجليزية). يُخزَّن لمدة 12 شهراً.',
                'cloudtopia-locale (تخزين محلي): نسخة احتياطية من اختيار اللغة في متصفحك.',
            ],
        },
        {
            title: '3. ملفات التحليلات والتسويق (بموافقتك فقط)',
            content:
                'لا نفعّل هذه الملفات إلا بعد ضغطك على «قبول التحليلات» في شريط الموافقة. وإذا اخترت «الضروري فقط» فلن يتم تحميل أي منها:',
            items: [
                '_ga و_ga_* (Google Analytics 4): تساعدنا على فهم كيفية استخدام الزوار للموقع — الصفحات المزارة ومدة التصفح والمنطقة التقريبية. تُخزَّن حتى 13 شهراً وتعالجها شركة Google.',
                '_fbp (Meta Pixel): يساعدنا على قياس فعالية تسويقنا على فيسبوك وإنستغرام. يُخزَّن 90 يوماً وتعالجه شركة Meta.',
            ],
            footer:
                'أدوات Vercel للتحليلات وقياس الأداء التي نستخدمها لا تستعمل كوكيز إطلاقاً ولا تحدد هوية أي زائر.',
        },
        {
            title: '4. محتوى الأطراف الثالثة',
            content: 'تتضمن بعض الأقسام محتوى من أطراف ثالثة قد يستخدم كوكيز خاصة به عند تحميله:',
            items: [
                'ودجت تقييمات Clutch.co: يُحمَّل فقط عند اقتراب قسم التقييمات من شاشتك.',
                'واتساب: الضغط على زر واتساب يفتح wa.me (تديره Meta). لا نمرر أي بيانات شخصية — فقط رسالة ترحيب جاهزة.',
            ],
        },
        {
            title: '5. تغيير اختيارك',
            content:
                'يمكنك تغيير رأيك في أي وقت: احذف كوكيز هذا الموقع من إعدادات المتصفح (عادةً ضمن الخصوصية ← ملفات تعريف الارتباط ← بيانات المواقع) ثم أعد تحميل الصفحة، وسيظهر شريط الموافقة من جديد. يمكنك أيضاً حظر الكوكيز أو حذفها بالكامل من المتصفح وسيبقى الموقع يعمل، لكن تفضيل اللغة سيُعاد ضبطه.',
        },
        {
            title: '6. التواصل',
            content:
                'للاستفسار عن هذه السياسة: info@cloudtopia.net. راجع أيضاً سياسة الخصوصية على cloudtopia.net/ar/privacy لمعرفة كيفية تعاملنا مع البيانات الشخصية عموماً.',
        },
    ],
}

const COPY = {
    en: {
        badge: 'Cookie Policy',
        heading: 'How We Use',
        highlight: 'Cookies',
        description: 'Exactly which cookies this website sets, why, and how to control them.',
        lastUpdatedLabel: 'Last updated:',
    },
    ar: {
        badge: 'سياسة ملفات تعريف الارتباط',
        heading: 'كيف نستخدم',
        highlight: 'الكوكيز',
        description: 'ما الذي يخزّنه هذا الموقع على جهازك بالضبط، ولماذا، وكيف تتحكم به.',
        lastUpdatedLabel: 'آخر تحديث:',
    },
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale = 'en' } = await params
    const locale = (rawLocale === 'ar' ? 'ar' : 'en') as Locale & ('en' | 'ar')
    const c = COPY[locale]
    return (
        <LegalPage
            icon={Cookie}
            badge={c.badge}
            heading={c.heading}
            headingHighlight={c.highlight}
            lastUpdated={`${c.lastUpdatedLabel} ${LAST_UPDATED[locale]}`}
            description={c.description}
            sections={SECTIONS[locale]}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
    )
}
