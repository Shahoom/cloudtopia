'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ClipboardList, Database, ShieldCheck, Workflow } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'

const pillars = [
    {
        icon: ClipboardList,
        en: {
            title: 'Scope before production',
            body: 'Discovery, architecture, content direction, integrations, pricing, and launch measures are written before design or development begins.',
        },
        ar: {
            title: 'النطاق قبل التنفيذ',
            body: 'نحدد الاكتشاف، البنية، اتجاه المحتوى، الربط، السعر، ومقاييس الإطلاق كتابة قبل التصميم أو البرمجة.',
        },
    },
    {
        icon: ShieldCheck,
        en: {
            title: 'Cloud-ready handover',
            body: 'Code, accounts, deployment notes, analytics access, backups, monitoring, and security basics are handed over clearly after launch.',
        },
        ar: {
            title: 'تسليم جاهز للسحابة',
            body: 'نسلّم الكود، الحسابات، ملاحظات النشر، التحليلات، النسخ الاحتياطي، المراقبة، وأساسيات الأمان بوضوح بعد الإطلاق.',
        },
    },
    {
        icon: Workflow,
        en: {
            title: 'Systems that fit the work',
            body: 'Websites, stores, apps, portals, dashboards, CRM, ERP, payment, data migration, and AI automation follow the client workflow.',
        },
        ar: {
            title: 'أنظمة تناسب العمل',
            body: 'المواقع، المتاجر، التطبيقات، البوابات، اللوحات، CRM، ERP، الدفع، نقل البيانات، وأتمتة AI تتبع سير عمل العميل.',
        },
    },
]

const proofPoints = [
    { en: 'Arabic and English delivery', ar: 'تنفيذ عربي وإنجليزي' },
    { en: 'Pricing and scope before build', ar: 'تسعير ونطاق قبل البناء' },
    { en: 'SEO, schema, sitemap, and AI-readable pages', ar: 'SEO وSchema وخرائط مواقع وصفحات واضحة للبحث' },
    { en: 'Post-launch analytics and care plans', ar: 'تحليلات وخطط رعاية بعد الإطلاق' },
]

export default function EnterpriseProof() {
    const { locale } = useLanguage()
    const isRTL = locale === 'ar'

    const copy = locale === 'ar'
        ? {
            eyebrow: 'أساس مؤسسي',
            title: 'أساس تقني واضح قبل الإطلاق وبعده',
            intro: 'كلاود توبيا شركة برمجيات وسحابة للشركات التي تحتاج موقعاً، تطبيقاً، نظاماً داخلياً، أو ترحيلاً سحابياً قابلاً للملكية والقياس.',
            answerTitle: 'الإجابة المختصرة',
            answer: 'نربط التصميم بالتحويل، والبرمجة بالعمليات، والسحابة بالاستقرار. تحصل على استشارة مجانية، معاينة ديمو مجانية حسب طلبك، ثم نطاق وسعر واضحين قبل بدء التنفيذ.',
            primary: 'استعرض الخدمات',
            secondary: 'شاهد الأسعار',
        }
        : {
            eyebrow: 'Enterprise foundation',
            title: 'A clean technical foundation before and after launch',
            intro: 'CloudTopia is a software company and cloud company for businesses that need an ownable, measurable website, app, internal system, or cloud migration.',
            answerTitle: 'Short answer',
            answer: 'We connect design to conversion, software to operations, and cloud infrastructure to stability. You get a free consultation, a free custom demo preview for your inquiry, then clear scope and pricing before production starts.',
            primary: 'Explore services',
            secondary: 'View pricing',
        }

    return (
        <section
            className="relative overflow-hidden bg-[#f4f1f8] px-4 py-24 text-eerie sm:px-6 lg:px-8"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1B1B23 1px, transparent 1px), linear-gradient(to bottom, #1B1B23 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(99,102,241,0.18),transparent_34%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55 }}
                    className="lg:sticky lg:top-28"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary-700 shadow-sm">
                        <Database className="h-3.5 w-3.5" />
                        {copy.eyebrow}
                    </span>
                    <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-eerie md:text-6xl">
                        {copy.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-neutral-600">
                        {copy.intro}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href={localePath(locale, '/services')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-eerie px-5 py-3 text-sm font-black text-white shadow-lg shadow-eerie/15 transition hover:bg-primary-800">
                            {copy.primary}
                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link href={localePath(locale, '/pricing')} className="inline-flex items-center justify-center rounded-xl border border-eerie/12 bg-white/72 px-5 py-3 text-sm font-black text-eerie transition hover:border-primary-300 hover:bg-white">
                            {copy.secondary}
                        </Link>
                    </div>
                </motion.div>

                <div className="grid gap-4">
                    <motion.article
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="rounded-lg border border-eerie/10 bg-white/84 p-6 shadow-xl shadow-eerie/8 backdrop-blur"
                    >
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-700">{copy.answerTitle}</p>
                        <p className="mt-4 text-xl font-black leading-9 text-eerie">{copy.answer}</p>
                    </motion.article>

                    <div className="grid gap-4 md:grid-cols-3">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon
                            const item = locale === 'ar' ? pillar.ar : pillar.en
                            return (
                                <motion.article
                                    key={item.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ duration: 0.5, delay: 0.08 * index }}
                                    className="rounded-lg border border-eerie/10 bg-white/70 p-5 shadow-sm backdrop-blur transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:bg-white"
                                >
                                    <Icon className="h-6 w-6 text-primary-700" />
                                    <h3 className="mt-5 text-lg font-black text-eerie">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-neutral-600">{item.body}</p>
                                </motion.article>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.5, delay: 0.18 }}
                        className="grid gap-2 rounded-lg border border-eerie/10 bg-white/72 p-5 shadow-sm backdrop-blur sm:grid-cols-2"
                    >
                        {proofPoints.map((point) => (
                            <div key={point.en} className="flex items-center gap-2 text-sm font-black text-eerie/76">
                                <CheckCircle2 className="h-4 w-4 flex-none text-primary-700" />
                                {locale === 'ar' ? point.ar : point.en}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
