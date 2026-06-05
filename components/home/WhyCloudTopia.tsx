'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { GlowingEffect } from '@/components/ui/glowing-effect'

type Reason = {
    title: string
    description: string
}

const REASON_ICONS = [
    '/icons/services/Admin Dashboard.png',
    '/icons/services/Professional Content Creation.png',
    '/icons/services/Payment Integration.png',
    '/icons/services/Customer Portal.png',
    '/icons/services/Real-time Chat System.png',
    '/icons/services/webapps.png',
]

export default function WhyCloudTopia() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const content = {
        en: {
            badge: 'Why CloudTopia',
            title: 'Why companies choose',
            titleHighlight: 'CloudTopia',
            description:
                'A practical software, cloud, and digital growth partner for companies that want clear scope, strong execution, and ownership after launch.',
            reasons: [
                { title: 'Free consultation and demo preview', description: 'Before the project starts, we review your inquiry and prepare a free demo direction so the scope feels concrete.' },
                { title: 'Software plus cloud thinking', description: 'Websites, apps, CRM, ERP, data migration, cloud hosting, and AI automation are planned as one operating system.' },
                { title: 'Fixed scope, fixed price', description: 'Written scope and a clear quote before production starts. What you approve is what the team builds.' },
                { title: 'You own everything', description: 'Code, design files, accounts, and domain — 100% yours at launch. No licensing traps or lock-in.' },
                { title: 'Search-ready content structure', description: 'Pages are written and structured for Google, local SEO, answer engines, and customers who need quick clarity.' },
                { title: 'Support after launch', description: 'Maintenance, monitoring, analytics, performance checks, and practical improvements keep the system useful after delivery.' },
            ],
        },
        ar: {
            badge: 'لماذا كلاود توبيا',
            title: 'لماذا تختار الشركات',
            titleHighlight: 'كلاود توبيا',
            description:
                'شريك برمجيات وسحابة ونمو رقمي للشركات التي تريد نطاقاً واضحاً، تنفيذاً قوياً، وملكية كاملة بعد الإطلاق.',
            reasons: [
                { title: 'استشارة وديمو مجانيان', description: 'قبل بدء المشروع نراجع طلبك ونجهز اتجاه ديمو مجاني حتى ترى الفكرة والنطاق بشكل ملموس.' },
                { title: 'برمجيات مع تفكير سحابي', description: 'المواقع، التطبيقات، CRM، ERP، نقل البيانات، الاستضافة السحابية، وأتمتة AI تُخطط كنظام واحد.' },
                { title: 'سعر ونطاق واضحان', description: 'نطاق مكتوب وسعر محدد قبل الإنتاج. ما تعتمده هو ما يتم بناؤه، بلا مفاجآت في منتصف الطريق.' },
                { title: 'كل شيء باسمك', description: 'الكود، ملفات التصميم، الحسابات، والنطاق — كلها تُسجَّل باسمك يوم الإطلاق. لا تراخيص مقيِّدة ولا احتكار.' },
                { title: 'محتوى مناسب للبحث', description: 'نكتب ونرتب الصفحات لتكون واضحة في Google والبحث المحلي وإجابات الذكاء الاصطناعي والعملاء.' },
                { title: 'دعم بعد الإطلاق', description: 'صيانة، مراقبة، تحليلات، تحسين أداء، وتطوير عملي يحافظ على قيمة النظام بعد التسليم.' },
            ],
        },
    }[locale as 'en' | 'ar'] || {} as any

    const ACCENTS = ['cyan', 'violet', 'emerald', 'amber', 'sky', 'rose']

    return (
        <section
            className="relative py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
            data-header-theme="light"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage:
                        'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 75%)',
                }}
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="max-w-2xl mb-6 md:mb-8 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-3"
                    >
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0284c7]/20 shadow-sm text-xs font-bold uppercase tracking-widest text-[#0284c7]">
                            {content.badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-2xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-neutral-900 leading-[1.1] mb-3"
                    >
                        {content.title}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#8b5cf6]">
                            {content.titleHighlight}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-sm md:text-base text-neutral-600 leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
                    {(content.reasons as Reason[]).map((reason: any, i: number) => {
                        const iconSrc = REASON_ICONS[i % REASON_ICONS.length]
                        return (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="relative list-none"
                            >
                                <div
                                    className="relative h-full rounded-lg p-[1.5px] transition-shadow duration-500 hover:shadow-xl"
                                    style={{
                                        background:
                                            'conic-gradient(from 180deg at 50% 50%, rgba(14,165,233,0.35), rgba(139,92,246,0.25), rgba(236,72,153,0.3), rgba(14,165,233,0.35))',
                                    }}
                                >
                                    <GlowingEffect
                                        spread={48}
                                        glow={true}
                                        disabled={false}
                                        proximity={96}
                                        inactiveZone={0.05}
                                        borderWidth={2}
                                    />
                                    <div className="relative h-full rounded-[7px] bg-white p-3.5 md:p-4">
                                        <div className="relative flex flex-col h-full">
                                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0284c7]/10 to-[#6366f1]/10 border border-[#0284c7]/15 flex items-center justify-center p-1.5 mb-2.5">
                                                <Image
                                                    src={iconSrc}
                                                    alt={reason.title}
                                                    width={36}
                                                    height={36}
                                                    quality={90}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h3 className="text-base md:text-[1.05rem] font-bold text-neutral-900 mb-1 leading-snug">
                                                {reason.title}
                                            </h3>
                                            <p className="text-[0.8rem] md:text-sm text-neutral-500 leading-relaxed">
                                                {reason.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
