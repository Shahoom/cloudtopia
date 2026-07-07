import Link from 'next/link'
import {
    ArrowRight, Sparkles, Star, Smartphone, Boxes, Layers, Server, FlaskConical,
    Activity, Rocket, ShieldCheck, Gauge, Wifi, Bell, Fingerprint,
    Store, Download, CheckCircle2, Zap, Users, Cpu, Pencil,
} from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { SubServiceGlowCard } from '@/components/services/SubServiceGlowCard'
import { ProjectsShowcase } from '@/components/ui/projects-showcase'
import { TestimonialsMarquee } from '@/components/ui/testimonials-marquee'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'
import { ContactFast } from '@/components/ui/contact-fast'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { getProjectsForService } from '@/lib/services/related-projects'
import { type Project } from '@/lib/projects'
import { getServiceCategory, localizedPackageName } from '@/lib/seo/services'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

/**
 * Bespoke, fully-bilingual pillar page for Mobile App Development.
 * Distinctive app-flavored aesthetic on the brand's sky/indigo + lavender system.
 * Every mobile service (iOS / Android / Cross-Platform + design, backend, QA,
 * maintenance, growth) is surfaced as a sub-service card. Composes the site's
 * shared blocks (projects, testimonials, pricing, contact) + custom sections.
 */
export default async function MobileAppPillarPage({ locale }: { locale: string }) {
    const isRTL = locale === 'ar'
    const dir = isRTL ? 'rtl' : 'ltr'
    const loc: 'en' | 'ar' = isRTL ? 'ar' : 'en'
    const t = (en: string, ar: string) => (isRTL ? ar : en)
    const L = (p: string) => localePath(locale, p)

    const projects: Project[] = await getProjectsForService(locale, {
        serviceSlug: 'mobile-app-development',
        pillarSlug: 'mobile-app-development',
    })

    // ── Sub-services (every mobile service lives under this pillar) ────────────
    const subServices: { name: string; desc: string; icon: string; href: string }[] = [
        { name: t('iOS App Development', 'تطوير تطبيقات iOS'), desc: t('Native iPhone & iPad apps in Swift and SwiftUI — smooth, fast, App-Store-ready.', 'تطبيقات iPhone وiPad أصلية بـ Swift وSwiftUI — سلسة وسريعة وجاهزة لمتجر التطبيقات.'), icon: 'Smartphone', href: '/services/ios-app-development' },
        { name: t('Android App Development', 'تطوير تطبيقات Android'), desc: t('Native Android apps in Kotlin & Jetpack Compose, tuned for every device and screen.', 'تطبيقات Android أصلية بـ Kotlin وJetpack Compose، مضبوطة لكل جهاز وشاشة.'), icon: 'Boxes', href: '/services/android-app-development' },
        { name: t('Cross-Platform Apps', 'تطبيقات متعددة المنصات'), desc: t('One React Native or Flutter codebase shipping to both stores — near-native, half the cost.', 'كود واحد بـ React Native أو Flutter يصل للمتجرين — أداء شبه أصلي بنصف التكلفة.'), icon: 'Layers', href: '/services/cross-platform-app-development' },
        { name: t('App UI/UX Design', 'تصميم واجهة وتجربة التطبيق'), desc: t('Prototyped, user-tested app interfaces with a native feel on iOS and Android.', 'واجهات تطبيق مُنمذجة ومختبَرة مع المستخدمين وبإحساس أصلي على iOS وAndroid.'), icon: 'AppWindow', href: '/contact' },
        { name: t('App Backend, APIs & Realtime', 'خلفية التطبيق وواجهات API واللحظية'), desc: t('Secure APIs, auth, push, payments, and realtime sync powering your app end to end.', 'واجهات API آمنة ومصادقة وإشعارات ودفع ومزامنة لحظية تشغّل تطبيقك من طرف إلى طرف.'), icon: 'Server', href: '/contact' },
        { name: t('QA, Testing & Store Launch', 'الاختبار والجودة وإطلاق المتجر'), desc: t('Real-device QA, automated tests, and full App Store + Play Store submission.', 'اختبار على أجهزة حقيقية واختبارات آلية وتقديم كامل لمتجري App Store وPlay Store.'), icon: 'FlaskConical', href: '/contact' },
        { name: t('Maintenance, Monitoring & Support', 'الصيانة والمراقبة والدعم'), desc: t('OS updates, crash monitoring, and a support path so the app stays healthy after launch.', 'تحديثات النظام ومراقبة الأعطال ومسار دعم ليبقى التطبيق سليماً بعد الإطلاق.'), icon: 'Activity', href: '/contact' },
        { name: t('Growth & App Store Optimization', 'النمو وتحسين متجر التطبيقات'), desc: t('ASO, analytics, and release iterations that grow installs, ratings, and retention.', 'تحسين ASO وتحليلات وإصدارات متتابعة تنمّي التنزيلات والتقييمات والاحتفاظ.'), icon: 'Rocket', href: '/contact' },
    ]

    // ── Platforms & tech ───────────────────────────────────────────────────────
    const platforms = [
        { Icon: Smartphone, name: 'iOS', stack: 'Swift · SwiftUI', note: t('Native iPhone & iPad, tuned for Apple silicon.', 'أصلي لـ iPhone وiPad، مضبوط لمعالجات Apple.'), tint: 'from-sky-500 to-cyan-400' },
        { Icon: Boxes, name: 'Android', stack: 'Kotlin · Jetpack Compose', note: t('Every screen size and OEM, Material 3 polish.', 'كل مقاسات الشاشات وكل الأجهزة، بلمسة Material 3.'), tint: 'from-emerald-500 to-teal-400' },
        { Icon: Layers, name: 'React Native', stack: 'Expo · TypeScript', note: t('One codebase, both stores, near-native speed.', 'كود واحد، المتجران، سرعة شبه أصلية.'), tint: 'from-indigo-500 to-violet-400' },
        { Icon: Cpu, name: 'Flutter', stack: 'Dart · Material · Cupertino', note: t('Expressive, pixel-perfect UI at 60fps.', 'واجهات تعبيرية دقيقة بأداء 60 إطاراً/ث.'), tint: 'from-fuchsia-500 to-sky-400' },
    ]

    // ── Process ────────────────────────────────────────────────────────────────
    const steps = [
        { n: '01', Icon: Sparkles, title: t('Discovery & strategy', 'الاكتشاف والاستراتيجية'), body: t('We map the users, the core loop, and the platforms before a line of code.', 'نرسم المستخدمين والحلقة الأساسية والمنصّات قبل أول سطر برمجي.') },
        { n: '02', Icon: Pencil, title: t('UX & UI design', 'تصميم التجربة والواجهة'), body: t('Clickable prototype with a native iOS/Android feel — validated, then built.', 'نموذج قابل للنقر بإحساس أصلي لـ iOS/Android — نتحقق منه ثم نبني.') },
        { n: '03', Icon: Cpu, title: t('Native / cross-platform build', 'البناء الأصلي/متعدد المنصات'), body: t('Clean, testable code, wired to a secure backend, push, and payments.', 'كود نظيف قابل للاختبار، موصول بخلفية آمنة وإشعارات ودفع.') },
        { n: '04', Icon: FlaskConical, title: t('QA on real devices', 'اختبار على أجهزة حقيقية'), body: t('Automated + manual testing across real phones before anything ships.', 'اختبار آلي ويدوي على هواتف حقيقية قبل أي إطلاق.') },
        { n: '05', Icon: Rocket, title: t('Launch & grow', 'الإطلاق والنمو'), body: t('App Store + Play Store submission, ASO, analytics, and release iterations.', 'تقديم للمتجرين، وتحسين ASO، وتحليلات، وإصدارات متتابعة.') },
    ]

    // ── Why CloudTopia ───────────────────────────────────────────────────────────
    const why = [
        { Icon: Store, title: t('Both stores, one team', 'المتجران، فريق واحد'), body: t('App Store and Play Store handled end to end — accounts, review, and release.', 'App Store وPlay Store من طرف إلى طرف — الحسابات والمراجعة والإصدار.') },
        { Icon: Fingerprint, title: t('Arabic-first & RTL', 'العربية أولاً وRTL'), body: t('Right-to-left layouts and Arabic UX done properly, not bolted on.', 'تخطيطات من اليمين لليسار وتجربة عربية صحيحة، لا ملحقة لاحقاً.') },
        { Icon: ShieldCheck, title: t('You own everything', 'أنت تملك كل شيء'), body: t('Source code, store accounts, and documentation are yours — no lock-in.', 'الكود المصدري وحسابات المتجر والتوثيق ملكك — بلا احتكار.') },
        { Icon: Server, title: t('App + backend together', 'التطبيق والخلفية معاً'), body: t('APIs, auth, admin, and realtime built alongside the app, by one team.', 'واجهات API والمصادقة ولوحة الإدارة واللحظية تُبنى مع التطبيق، بفريق واحد.') },
        { Icon: Gauge, title: t('Native-grade performance', 'أداء بمستوى أصلي'), body: t('Fast cold starts, smooth 60fps scrolling, and small install sizes.', 'بدء سريع وتمرير سلس بـ 60 إطاراً/ث وأحجام تثبيت صغيرة.') },
        { Icon: Activity, title: t('Growth after launch', 'نمو بعد الإطلاق'), body: t('Crash monitoring, analytics, and ASO to keep installs and ratings climbing.', 'مراقبة أعطال وتحليلات وتحسين ASO لإبقاء التنزيلات والتقييمات في صعود.') },
    ]

    const industries = [
        t('Retail & e-commerce', 'التجزئة والتجارة الإلكترونية'), t('Food delivery & restaurants', 'توصيل الطعام والمطاعم'),
        t('Logistics & delivery', 'اللوجستيات والتوصيل'), t('Healthcare & clinics', 'الرعاية الصحية والعيادات'),
        t('Fintech & wallets', 'التقنية المالية والمحافظ'), t('Real estate', 'العقارات'),
        t('Education & e-learning', 'التعليم والتعلّم الإلكتروني'), t('Events & booking', 'الفعاليات والحجوزات'),
    ]

    const stats = [
        { v: 'iOS + Android', k: t('Both app stores', 'كلا المتجرين') },
        { v: '60fps', k: t('Native-grade performance', 'أداء بمستوى أصلي') },
        { v: 'AR + EN', k: t('Bilingual, RTL-ready', 'ثنائي اللغة وجاهز للـ RTL') },
        { v: '100%', k: t('Source-code ownership', 'ملكية كاملة للكود') },
    ]

    const faqs = [
        { q: t('Native or cross-platform — which should I choose?', 'أصلي أم متعدد المنصات — أيهما أختار؟'), a: t('It depends on your goals. Native (Swift/Kotlin) is best for demanding, platform-specific apps; cross-platform (React Native/Flutter) ships to both stores from one codebase at lower cost. We recommend the right fit after discovery — no dogma.', 'يعتمد على أهدافك. الأصلي (Swift/Kotlin) أفضل للتطبيقات المتطلّبة الخاصة بكل منصة؛ ومتعدد المنصات (React Native/Flutter) يصل للمتجرين من كود واحد بتكلفة أقل. نوصي بالأنسب بعد الاكتشاف، بلا تعصّب.') },
        { q: t('How long does a mobile app take?', 'كم يستغرق تطبيق الجوال؟'), a: t('A focused MVP typically launches in 8–12 weeks. Larger apps with backend, payments, and multiple roles are delivered in phases so each part is tested before the next.', 'عادةً يُطلق MVP مركّز خلال 8–12 أسبوعاً. أما التطبيقات الأكبر ذات الخلفية والدفع والأدوار المتعددة فتُسلَّم على مراحل ليُختبر كل جزء قبل التالي.') },
        { q: t('Do you publish to the App Store and Google Play?', 'هل تنشرون على App Store وGoogle Play؟'), a: t('Yes — we handle the full submission for both: developer accounts, store listings, screenshots, review, and release, plus updates afterward.', 'نعم — نتولّى التقديم الكامل للمتجرين: حسابات المطورين وصفحات المتجر ولقطات الشاشة والمراجعة والإصدار، مع التحديثات لاحقاً.') },
        { q: t('Do you build the backend too?', 'هل تبنون الخلفية أيضاً؟'), a: t('We do. APIs, authentication, push notifications, payments, an admin panel, and realtime features are built alongside the app by the same team.', 'نعم. واجهات API والمصادقة والإشعارات والدفع ولوحة إدارة وميزات لحظية تُبنى مع التطبيق بنفس الفريق.') },
        { q: t('Do we own the code and accounts?', 'هل نملك الكود والحسابات؟'), a: t('Fully. You receive the source code, the App Store and Play Store accounts, documentation, and a handoff so your team can operate and extend it independently.', 'بالكامل. تحصل على الكود المصدري وحسابات App Store وPlay Store والتوثيق وتسليم كامل ليعمل فريقك ويطوّره باستقلالية.') },
        { q: t('Do you maintain the app after launch?', 'هل تصونون التطبيق بعد الإطلاق؟'), a: t('Yes — OS-update compatibility, crash monitoring, security patches, and growth/ASO iterations keep the app healthy and improving.', 'نعم — توافق تحديثات النظام ومراقبة الأعطال وترقيعات الأمان وإصدارات النمو/ASO تُبقي التطبيق سليماً ومتحسّناً.') },
    ]

    // ── Pricing (mobile category packages) ────────────────────────────────────
    const category = getServiceCategory('mobile-app-development')
    const tierIcons = [
        <Pencil key="p" className="h-6 w-6" aria-hidden="true" />,
        <Star key="s" className="h-6 w-6" aria-hidden="true" />,
        <Sparkles key="k" className="h-6 w-6" aria-hidden="true" />,
    ]
    const tierColors: PricingTier['color'][] = ['sky', 'violet', 'emerald']
    const included = [
        ...subServices.slice(0, 4).map((s) => s.name),
        t('Free consultation before scope is set', 'استشارة مجانية قبل تحديد النطاق'),
        t('Real-device QA + store submission', 'اختبار على أجهزة حقيقية + تقديم للمتجر'),
        t('Source code + store account handoff', 'تسليم الكود المصدري وحسابات المتجر'),
    ]
    const tiers: PricingTier[] = (category?.packageNames ?? ['Mobile App Starter', 'Cross-Platform Launch', 'App Ecosystem']).map((pkg, i) => ({
        name: localizedPackageName(pkg, locale),
        icon: tierIcons[i % tierIcons.length],
        price: i === 2 ? t('Custom quote', 'عرض مخصص') : t('Fixed scope', 'نطاق ثابت'),
        description: i === 0
            ? t('A focused first app — one platform or cross-platform MVP.', 'تطبيق أول مركّز — منصة واحدة أو MVP متعدد المنصات.')
            : i === 1
                ? t('Both stores from one codebase, with backend and launch.', 'المتجران من كود واحد، مع خلفية وإطلاق.')
                : t('A full product: apps, backend, admin, and growth.', 'منتج كامل: تطبيقات وخلفية وإدارة ونمو.'),
        features: Array.from(new Set(included)).slice(0, 7),
        popular: i === 1,
        color: tierColors[i % tierColors.length],
        href: L('/contact'),
        ctaLabel: t('Scope my app', 'حدّد نطاق تطبيقي'),
    }))

    const serviceSchema = buildServiceSchema(locale, {
        name: t('Mobile App Development', 'تطوير تطبيقات الجوال'),
        description: t('iOS, Android, and cross-platform app development for Gulf businesses — design, build, launch, and grow.', 'تطوير تطبيقات iOS وAndroid ومتعددة المنصات لأعمال الخليج — تصميم وبناء وإطلاق ونمو.'),
        path: '/services/mobile-app-development',
        serviceType: 'Mobile App Development',
    })
    const breadcrumbSchema = buildBreadcrumbSchema(locale, [
        { name: t('Home', 'الرئيسية'), path: '/' },
        { name: t('Services', 'الخدمات'), path: '/services' },
        { name: t('Mobile App Development', 'تطوير تطبيقات الجوال'), path: '/services/mobile-app-development' },
    ])
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }

    return (
        <main dir={dir} className="relative overflow-hidden bg-[#f4f1f8]">
            <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <PageBreadcrumbs
                    locale={locale}
                    items={[{ label: t('Services', 'الخدمات'), href: L('/services') }, { label: t('Mobile App Development', 'تطوير تطبيقات الجوال') }]}
                />
            </div>

            {/* ───────────────── HERO ───────────────── */}
            <section className="relative">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(60% 55% at 78% 18%, rgba(14,165,233,0.20), transparent 60%), radial-gradient(50% 50% at 12% 82%, rgba(99,102,241,0.18), transparent 60%)' }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20 lg:px-8">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3.5 py-1.5 text-[13px] font-bold text-sky-700 backdrop-blur">
                            <Smartphone className="h-4 w-4" aria-hidden="true" />
                            {t('Mobile App Development', 'تطوير تطبيقات الجوال')}
                        </span>
                        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl">
                            {t('Apps your customers', 'تطبيقات يفتحها')}<br />
                            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                {t('actually keep open', 'عملاؤك كل يوم')}
                            </span>
                        </h1>
                        <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-slate-600">
                            {t('Native iOS & Android, or one cross-platform codebase for both stores — designed, built, launched, and grown for businesses in Oman and the Gulf. Arabic-first, RTL-ready, and fully owned by you.', 'تطبيقات iOS وAndroid أصلية، أو كود واحد متعدد المنصات للمتجرين — تصميم وبناء وإطلاق ونمو لأعمال عُمان والخليج. عربية أولاً، جاهزة للـ RTL، ومملوكة لك بالكامل.')}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href={L('/contact')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-6 py-3 font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                                {t('Start your app', 'ابدأ تطبيقك')}
                                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                            </Link>
                            <Link href={L('/pricing')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3 font-bold text-slate-800 backdrop-blur transition-colors hover:border-slate-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                                {t('See packages', 'شاهد الباقات')}
                            </Link>
                        </div>
                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500">
                            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />{t('Free consultation', 'استشارة مجانية')}</span>
                            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />{t('Free demo preview', 'معاينة ديمو مجانية')}</span>
                            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />{t('You own the code', 'تملك الكود')}</span>
                        </div>
                    </div>

                    {/* Phone mockup */}
                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-sky-200/50 via-indigo-200/40 to-violet-200/50 blur-2xl" aria-hidden="true" />
                        <div className="relative mx-auto aspect-[9/19] w-[270px] rounded-[2.6rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl shadow-indigo-300/40">
                            <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900" aria-hidden="true" />
                            <div className="flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-white">
                                <div className="bg-gradient-to-br from-sky-500 to-indigo-600 px-5 pb-6 pt-8 text-white">
                                    <div className="flex items-center justify-between text-[11px] font-bold opacity-90"><span>9:41</span><span className="inline-flex items-center gap-1"><Wifi className="h-3 w-3" aria-hidden="true" /><Bell className="h-3 w-3" aria-hidden="true" /></span></div>
                                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest opacity-80">{t('Good morning', 'صباح الخير')}</p>
                                    <p className="text-xl font-black">{t('Your dashboard', 'لوحتك')}</p>
                                </div>
                                <div className="-mt-4 flex-1 space-y-3 rounded-t-2xl bg-white px-4 py-4">
                                    <div className="flex gap-3">
                                        <div className="flex-1 rounded-xl bg-sky-50 p-3"><Gauge className="h-4 w-4 text-sky-600" aria-hidden="true" /><p className="mt-2 text-lg font-black text-slate-900">4.9★</p><p className="text-[10px] font-semibold text-slate-500">{t('Rating', 'التقييم')}</p></div>
                                        <div className="flex-1 rounded-xl bg-indigo-50 p-3"><Download className="h-4 w-4 text-indigo-600" aria-hidden="true" /><p className="mt-2 text-lg font-black text-slate-900">12k</p><p className="text-[10px] font-semibold text-slate-500">{t('Installs', 'التنزيلات')}</p></div>
                                    </div>
                                    <div className="rounded-xl border border-slate-100 p-3">
                                        <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100"><Zap className="h-4 w-4 text-emerald-600" aria-hidden="true" /></span><div className="flex-1"><div className="h-2 w-20 rounded bg-slate-200" /><div className="mt-1.5 h-2 w-14 rounded bg-slate-100" /></div></div>
                                    </div>
                                    <div className="rounded-xl border border-slate-100 p-3">
                                        <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100"><Users className="h-4 w-4 text-sky-600" aria-hidden="true" /></span><div className="flex-1"><div className="h-2 w-24 rounded bg-slate-200" /><div className="mt-1.5 h-2 w-16 rounded bg-slate-100" /></div></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-around border-t border-slate-100 bg-white px-2 py-3">
                                    {[Smartphone, Activity, Bell, Fingerprint].map((I, i) => (<I key={i} className={`h-5 w-5 ${i === 0 ? 'text-indigo-600' : 'text-slate-300'}`} aria-hidden="true" />))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute -left-4 top-16 rotate-[-8deg] rounded-2xl border border-white bg-white px-3 py-2 shadow-xl shadow-slate-300/50 rtl:-right-4 rtl:left-auto">
                            <p className="flex items-center gap-1.5 text-xs font-black text-slate-800"><Store className="h-4 w-4 text-sky-600" aria-hidden="true" /> App Store</p>
                        </div>
                        <div className="absolute -right-3 bottom-24 rotate-[6deg] rounded-2xl border border-white bg-white px-3 py-2 shadow-xl shadow-slate-300/50 rtl:-left-3 rtl:right-auto">
                            <p className="flex items-center gap-1.5 text-xs font-black text-slate-800"><Boxes className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Google Play</p>
                        </div>
                    </div>
                </div>

                {/* Stats strip */}
                <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.k} className="bg-white/80 px-5 py-5 text-center backdrop-blur">
                                <dt className="text-xl font-black tracking-tight text-[#0f172a]">{s.v}</dt>
                                <dd className="mt-1 text-[13px] font-semibold text-slate-500">{s.k}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ───────────────── PLATFORMS & TECH ───────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 md:py-20">
                <div className="mb-10 max-w-2xl">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-sky-700">{t('Platforms & tech', 'المنصّات والتقنيات')}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{t('Built on the tools each platform loves', 'مبنية بأدوات كل منصّة الأصلية')}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {platforms.map((p) => (
                        <div key={p.name} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_12px_30px_-12px_rgba(2,132,199,0.35)]">
                            <span className={`inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.tint} text-white`}><p.Icon className="h-6 w-6" aria-hidden="true" /></span>
                            <h3 className="mt-4 text-lg font-black text-[#0f172a]">{p.name}</h3>
                            <p className="mt-0.5 text-[13px] font-bold text-sky-700">{p.stack}</p>
                            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{p.note}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───────────────── SUB-SERVICES ───────────────── */}
            <section className="w-full bg-white py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{t('Everything under one roof', 'كل شيء تحت سقف واحد')}</p>
                        <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{t('Every mobile service you need', 'كل خدمة جوال تحتاجها')}</h2>
                        <p className="mt-3 text-base font-medium leading-7 text-slate-600">{t('From native builds to design, backend, testing, and growth — pick a piece or the whole product.', 'من البناء الأصلي إلى التصميم والخلفية والاختبار والنمو — اختر جزءاً أو المنتج كاملاً.')}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {subServices.map((s) => (
                            <SubServiceGlowCard key={s.name} href={s.href} name={s.name} desc={s.desc} iconName={s.icon} locale={locale} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────────── PROCESS ───────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 md:py-20">
                <div className="mb-10 max-w-2xl">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-sky-700">{t('How we build', 'كيف نبني')}</p>
                    <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{t('From idea to both app stores', 'من الفكرة إلى المتجرين')}</h2>
                </div>
                <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {steps.map((s) => (
                        <li key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-700"><s.Icon className="h-5 w-5" aria-hidden="true" /></span><span className="font-mono text-sm font-black text-slate-300">{s.n}</span></div>
                            <h3 className="mt-4 text-base font-black leading-snug text-[#0f172a]">{s.title}</h3>
                            <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600">{s.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ───────────────── WHY US ───────────────── */}
            <section className="w-full bg-[#0f172a] py-14 md:py-20" data-header-theme="dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-2xl">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-sky-400">{t('Why CloudTopia', 'لماذا كلاود توبيا')}</p>
                        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{t('An app partner, not just a builder', 'شريك تطبيق، لا مجرّد منفّذ')}</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {why.map((w) => (
                            <div key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-sky-500/15 text-sky-300"><w.Icon className="h-5 w-5" aria-hidden="true" /></span>
                                <h3 className="mt-4 text-lg font-black text-white">{w.title}</h3>
                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">{w.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                        {industries.map((i) => (
                            <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm font-semibold text-slate-200">{i}</span>
                        ))}
                    </div>
                </div>
            </section>

            {projects.length > 0 ? (
                <ProjectsShowcase
                    projects={projects}
                    locale={loc}
                    dir={dir}
                    projectHref={(id) => L(`/projects/${id}`)}
                    eyebrow={t('Our work', 'أعمالنا')}
                    heading={t('Apps we’ve designed & shipped', 'تطبيقات صمّمناها وأطلقناها')}
                    sub={t('Real mobile apps we’ve built and launched to the stores for clients.', 'تطبيقات جوال حقيقية بنيناها وأطلقناها للمتاجر لعملاء.')}
                />
            ) : null}

            <TestimonialsMarquee locale={loc} dir={dir} />

            <CreativePricing
                tag={t('Packages', 'الباقات')}
                title={t('Mobile App Development: packages', 'تطوير تطبيقات الجوال: الباقات')}
                description={t('Pick the level that matches your scope — every path starts with a free consultation and a free demo preview.', 'اختر المستوى المناسب لنطاقك — كل مسار يبدأ باستشارة مجانية ومعاينة ديمو مجانية.')}
                tiers={tiers}
                dir={dir}
                className="bg-[#f4f1f8] py-16 md:py-20"
            />

            <FaqAccordion
                eyebrow={t('FAQ', 'الأسئلة الشائعة')}
                heading={t('Mobile app questions, answered', 'أسئلة تطبيقات الجوال، مُجابة')}
                subheading={t('The things Gulf businesses ask us most before starting an app.', 'أكثر ما تسألنا عنه شركات الخليج قبل بدء تطبيق.')}
                items={faqs}
                dir={dir}
            />

            <ContactFast serviceName={t('Mobile App Development', 'تطوير تطبيقات الجوال')} locale={loc} dir={dir} />
        </main>
    )
}
