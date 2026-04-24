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
            title: 'Built the way',
            titleHighlight: 'you\'d want it built',
            description:
                'No forced bundles, no hidden scope changes, no vendor lock-in. A transparent way to work with a team that actually ships.',
            reasons: [
                { title: 'Modular by design', description: 'Pick exactly what you need. Every service has its own packages and transparent pricing — no forced bundles.' },
                { title: 'Multilingual, not translated', description: 'Arabic, English, and Turkish as first-class defaults. Real bilingual craftsmanship, not plugin translation.' },
                { title: 'Fixed scope, fixed price', description: 'Written scope and fixed quote before design starts. What you sign is what you pay — no surprise invoices.' },
                { title: 'You own everything', description: 'Code, design files, accounts, and domain — 100% yours at launch. No licensing traps or lock-in.' },
                { title: 'Fast response, real humans', description: 'One business day reply from a real engineer or designer, not a sales funnel or chatbot.' },
                { title: 'Built to last', description: 'Modern stack, accessible by default, and care plans that keep your project healthy for years — not just the launch week.' },
            ],
        },
        ar: {
            badge: 'لماذا كلاود توبيا',
            title: 'نعمل معك',
            titleHighlight: 'بالطريقة التي تحبّها',
            description:
                'من غير باقات تُفرض عليك، ولا تعديلات تظهر فجأة، ولا ارتباط ملزم معنا. نخطّ معك خطواتك بوضوح من البداية، وننفّذ ما اتفقنا عليه بالضبط.',
            reasons: [
                { title: 'خدمات تُفصّل لك', description: 'كل خدمة لها باقاتها وسعرها المعلن. تأخذ ما يخدم مشروعك فعلاً، وما تدفع مقابل ما لا تحتاجه.' },
                { title: 'ثلاث لغات، لا ترجمة آلية', description: 'نكتب ونصمّم بالعربية والإنجليزية والتركية بروح كل لغة. محتوى مبني من الصفر، لا نسخة مترجمة على موقع أجنبي.' },
                { title: 'سعر ثابت من البداية', description: 'تصلك وثيقة نطاق وسعر محدّد قبل بدء التصميم. ما توقّعت عليه هو ما تدفعه — لا فواتير إضافية مفاجئة لاحقاً.' },
                { title: 'كل شيء باسمك', description: 'الكود، ملفات التصميم، الحسابات، والنطاق — كلها تُسجَّل باسمك يوم الإطلاق. لا تراخيص مقيِّدة ولا احتكار.' },
                { title: 'يردّ عليك إنسان', description: 'تراسلنا فيصلك ردّ من مهندس أو مصمّم فعلي خلال يوم عمل. بلا قمع مبيعات، وبلا ردود آلية جاهزة.' },
                { title: 'مشروع يدوم', description: 'نبنيه بأدوات حديثة وبنية مستقرّة، وندعمك بعد الإطلاق بخطط متابعة تبقي مشروعك سليماً لسنوات قادمة.' },
            ],
        },
        tr: {
            badge: 'Neden CloudTopia',
            title: 'İstediğin şekilde',
            titleHighlight: 'inşa edilmiş',
            description:
                'Dayatılmış paketler yok, gizli kapsam değişiklikleri yok, tedarikçi kilidi yok. Gerçekten teslim eden bir ekiple şeffaf bir çalışma biçimi.',
            reasons: [
                { title: 'Modüler tasarım', description: 'İhtiyacın olanı tam olarak seç. Her hizmetin kendi paketleri ve şeffaf fiyatlandırması vardır — dayatma paket yok.' },
                { title: 'Gerçekten çok dilli', description: 'Arapça, İngilizce ve Türkçe birinci sınıf varsayılanlar. Eklenti çevirisi değil, gerçek iki dilli zanaat.' },
                { title: 'Sabit kapsam, sabit fiyat', description: 'Tasarıma başlamadan önce yazılı kapsam ve sabit teklif. İmzaladığın şey ödediğin şeydir — sürpriz fatura yok.' },
                { title: 'Her şey senin', description: 'Kod, tasarım dosyaları, hesaplar ve alan adı — lansmanda %100 senin. Lisans tuzağı veya kilit yok.' },
                { title: 'Hızlı yanıt, gerçek insanlar', description: 'Satış hunisi veya sohbet botu değil, gerçek bir mühendis veya tasarımcıdan bir iş günü içinde yanıt.' },
                { title: 'Kalıcı inşa', description: 'Modern yığın, varsayılan olarak erişilebilir ve projenin sadece lansman haftasında değil, yıllarca sağlıklı kalmasını sağlayan bakım planları.' },
            ],
        },
    }[locale as 'en' | 'ar' | 'tr'] || {} as any

    const ACCENTS = ['cyan', 'violet', 'emerald', 'amber', 'sky', 'rose']

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
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
                <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
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
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-5"
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
                        className="text-base md:text-lg text-neutral-600 leading-relaxed"
                    >
                        {content.description}
                    </motion.p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
                                    className="relative h-full rounded-2xl p-[1.5px] transition-shadow duration-500 hover:shadow-xl"
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
                                    <div className="relative h-full rounded-[calc(1rem-1px)] bg-white p-6 md:p-7">
                                        <div className="relative flex flex-col h-full">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0284c7]/10 to-[#6366f1]/10 border border-[#0284c7]/15 flex items-center justify-center p-2.5 mb-5">
                                                <Image
                                                    src={iconSrc}
                                                    alt={reason.title}
                                                    width={56}
                                                    height={56}
                                                    quality={90}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 leading-tight">
                                                {reason.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
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
