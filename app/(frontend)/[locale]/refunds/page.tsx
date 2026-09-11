import type { Metadata } from 'next'
import { Receipt } from 'lucide-react'
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
        title: 'Refund & Cancellation Policy - CloudTopia',
        description: 'How deposits, milestone payments, cancellations, and refunds work for CloudTopia projects and services.',
    },
    ar: {
        title: 'سياسة الاسترداد والإلغاء - كلاود توبيا',
        description: 'كيفية التعامل مع الدفعات المقدمة ودفعات المراحل وطلبات الإلغاء والاسترداد في مشاريع وخدمات كلاود توبيا.',
    },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    const m = META[locale === 'ar' ? 'ar' : 'en']
    const path = '/refunds'
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
            title: '1. Scope',
            content:
                'This policy applies to custom services purchased from CloudTopia — website development, e-commerce development, web and mobile applications, business systems (CRM/ERP), cloud infrastructure, AI solutions, and digital growth services. Where a signed proposal or contract states different refund terms for a specific project, the signed document prevails.',
        },
        {
            title: '2. Before work begins',
            content:
                'If you cancel after paying a deposit but before we have started any work on your project (no discovery session held, no design or development begun), we will refund the deposit in full, minus any non-recoverable third-party costs already paid on your behalf (see section 5).',
        },
        {
            title: '3. During the project',
            content: 'Our projects are delivered in agreed milestones. If you cancel mid-project:',
            items: [
                'Completed milestones: Payments for milestones that have been delivered and approved are non-refundable.',
                'Milestone in progress: We bill the portion of work actually performed, at the rate in your proposal, and refund the remainder of any prepaid amount for that milestone.',
                'Future milestones: Any amounts prepaid for milestones not yet started are refunded in full.',
                'Deliverables: On settlement, you receive all work products you have paid for, including source files for completed, paid milestones.',
            ],
        },
        {
            title: '4. After delivery',
            content:
                'Once a project has been delivered and approved, fees are non-refundable. Every project includes the revision rounds and the post-launch support period stated in its proposal — if something we built does not work as agreed, we fix it at no charge under that warranty rather than through a refund.',
        },
        {
            title: '5. Third-party costs',
            content:
                'Amounts we pay to third parties on your behalf — domain names, hosting, SSL certificates, software licences, stock assets, advertising budgets — are non-refundable once purchased, because those vendors do not refund us. Where a vendor does offer a refund, we pass it on to you in full.',
        },
        {
            title: '6. Recurring services',
            content:
                'Monthly services (maintenance, hosting management, SEO, social media management) can be cancelled with 30 days\' written notice. You are billed up to the end of the notice period; any period paid beyond it is refunded pro rata. Work already performed in the current period is not refundable.',
        },
        {
            title: '7. How to request a refund',
            content:
                'Email info@cloudtopia.net from the address associated with your project, stating the project name and the reason. We acknowledge refund requests within 2 business days and, where a refund is due, issue it within 14 days to the original payment method.',
        },
        {
            title: '8. Your statutory rights',
            content:
                'Nothing in this policy limits rights you cannot waive under applicable consumer protection law, including Oman\'s Consumer Protection Law and the consumer protection laws of the country you buy from.',
        },
    ],
    ar: [
        {
            title: '1. النطاق',
            content:
                'تسري هذه السياسة على الخدمات المخصصة المقدمة من كلاود توبيا — تطوير المواقع، المتاجر الإلكترونية، تطبيقات الويب والجوال، أنظمة الأعمال (CRM/ERP)، البنية السحابية، حلول الذكاء الاصطناعي، وخدمات النمو الرقمي. وإذا نص عرض السعر أو العقد الموقّع لمشروع معيّن على شروط استرداد مختلفة، فالعبرة بالمستند الموقّع.',
        },
        {
            title: '2. قبل بدء العمل',
            content:
                'إذا ألغيت بعد دفع الدفعة المقدمة وقبل أن نبدأ أي عمل فعلي في مشروعك (لم تُعقد جلسة اكتشاف ولم يبدأ تصميم أو تطوير)، نسترد لك الدفعة كاملة، مخصوماً منها أي تكاليف أطراف ثالثة غير قابلة للاسترجاع دُفعت نيابة عنك (انظر البند 5).',
        },
        {
            title: '3. أثناء المشروع',
            content: 'تُسلَّم مشاريعنا على مراحل متفق عليها. عند الإلغاء في منتصف المشروع:',
            items: [
                'المراحل المكتملة: دفعات المراحل التي سُلّمت واعتُمدت غير قابلة للاسترداد.',
                'المرحلة الجارية: نحتسب الجزء المنجز فعلياً من العمل حسب الأسعار الواردة في عرضك، ونرد المتبقي من أي مبلغ مدفوع مقدماً عن تلك المرحلة.',
                'المراحل المستقبلية: أي مبالغ مدفوعة مقدماً عن مراحل لم تبدأ تُرد بالكامل.',
                'المخرجات: عند التسوية تستلم جميع مخرجات العمل المدفوعة، بما فيها الملفات المصدرية للمراحل المكتملة المدفوعة.',
            ],
        },
        {
            title: '4. بعد التسليم',
            content:
                'بعد تسليم المشروع واعتماده تصبح الرسوم غير قابلة للاسترداد. يشمل كل مشروع جولات التعديل وفترة الدعم بعد الإطلاق المذكورة في عرضه — وإذا لم يعمل شيء بنيناه كما اتُّفق، نصلحه مجاناً ضمن هذا الضمان بدلاً من الاسترداد.',
        },
        {
            title: '5. تكاليف الأطراف الثالثة',
            content:
                'المبالغ التي ندفعها لأطراف ثالثة نيابة عنك — أسماء النطاقات، الاستضافة، شهادات SSL، تراخيص البرمجيات، الأصول الجاهزة، ميزانيات الإعلانات — غير قابلة للاسترداد بعد شرائها لأن هذه الجهات لا تردها لنا. وإذا ردّت جهة ما مبلغاً، نحوّله إليك كاملاً.',
        },
        {
            title: '6. الخدمات الشهرية',
            content:
                'يمكن إلغاء الخدمات الشهرية (الصيانة، إدارة الاستضافة، SEO، إدارة وسائل التواصل) بإشعار كتابي قبل 30 يوماً. تُحتسب الرسوم حتى نهاية فترة الإشعار، وأي فترة مدفوعة بعدها تُرد بالتناسب. العمل المنجز فعلاً في الفترة الحالية غير قابل للاسترداد.',
        },
        {
            title: '7. كيفية طلب الاسترداد',
            content:
                'راسلنا على info@cloudtopia.net من البريد المرتبط بمشروعك مع ذكر اسم المشروع والسبب. نؤكد استلام طلبات الاسترداد خلال يومي عمل، وإذا استحق الاسترداد ننفذه خلال 14 يوماً إلى وسيلة الدفع الأصلية.',
        },
        {
            title: '8. حقوقك النظامية',
            content:
                'لا يحدّ أي شيء في هذه السياسة من الحقوق التي لا يجوز التنازل عنها بموجب قوانين حماية المستهلك المعمول بها، بما فيها قانون حماية المستهلك في سلطنة عُمان وقوانين حماية المستهلك في بلد الشراء.',
        },
    ],
}

const COPY = {
    en: {
        badge: 'Refund & Cancellation Policy',
        heading: 'Fair, Clear',
        highlight: 'Refunds',
        description: 'How deposits, milestone payments, cancellations, and refunds work for our projects and services.',
        lastUpdatedLabel: 'Last updated:',
    },
    ar: {
        badge: 'سياسة الاسترداد والإلغاء',
        heading: 'استرداد عادل',
        highlight: 'وواضح',
        description: 'كيفية التعامل مع الدفعات المقدمة ودفعات المراحل والإلغاء والاسترداد في مشاريعنا وخدماتنا.',
        lastUpdatedLabel: 'آخر تحديث:',
    },
}

export default async function RefundPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale = 'en' } = await params
    const locale = (rawLocale === 'ar' ? 'ar' : 'en') as Locale & ('en' | 'ar')
    const c = COPY[locale]
    return (
        <LegalPage
            icon={Receipt}
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
