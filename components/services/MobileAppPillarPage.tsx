import Link from 'next/link'
import {
    ArrowRight, Sparkles, Star, Smartphone, Boxes, Layers, Server, FlaskConical,
    Activity, Rocket, ShieldCheck, Gauge, Fingerprint, Store, CheckCircle2, Cpu, Pencil,
} from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { SubServiceGlowCard } from '@/components/services/SubServiceGlowCard'
import { CinematicHero } from '@/components/ui/cinematic-landing-hero'
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
 * Bespoke, fully-bilingual pillar page for App Development (iOS / Android /
 * cross-platform). Opens with a GSAP cinematic hero (cinematic-landing-hero),
 * then a rich, on-brand body. Every app service is a sub-service card.
 */
export default async function MobileAppPillarPage({ locale }: { locale: string }) {
    const isRTL = locale === 'ar'
    const dir = isRTL ? 'rtl' : 'ltr'
    const loc: 'en' | 'ar' = isRTL ? 'ar' : 'en'
    const t = (en: string, ar: string) => (isRTL ? ar : en)
    const L = (p: string) => localePath(locale, p)

    const projects: Project[] = await getProjectsForService(locale, {
        serviceSlug: 'app-development',
        pillarSlug: 'mobile-app-development',
    })

    const subServices: { name: string; desc: string; icon: string; href: string }[] = [
        { name: t('iOS App Development', 'تطوير تطبيقات iOS'), desc: t('Native iPhone & iPad apps in Swift and SwiftUI — smooth, fast, App-Store-ready.', 'تطبيقات iPhone وiPad أصلية بـ Swift وSwiftUI — سلسة وسريعة وجاهزة لمتجر التطبيقات.'), icon: 'Smartphone', href: '/services/app-development/ios-app-development' },
        { name: t('Android App Development', 'تطوير تطبيقات Android'), desc: t('Native Android apps in Kotlin & Jetpack Compose, tuned for every device and screen.', 'تطبيقات Android أصلية بـ Kotlin وJetpack Compose، مضبوطة لكل جهاز وشاشة.'), icon: 'Boxes', href: '/services/app-development/android-app-development' },
        { name: t('Cross-Platform App Development', 'تطبيقات متعددة المنصات'), desc: t('One shared codebase shipping to both app stores — near-native performance at roughly half the cost.', 'كود مشترك واحد يصل إلى متجري التطبيقات — أداء شبه أصلي بنحو نصف التكلفة.'), icon: 'Layers', href: '/services/app-development/cross-platform-app-development' },
        { name: t('Flutter App Development', 'تطوير تطبيقات Flutter'), desc: t('One Flutter codebase running 60fps on iOS and Android with pixel-perfect, branded UI.', 'كود Flutter واحد يعمل بسلاسة على iOS وAndroid بواجهة دقيقة تحمل هوية علامتك.'), icon: 'Gauge', href: '/services/app-development/flutter-app-development' },
        { name: t('React Native App Development', 'تطوير تطبيقات React Native'), desc: t('React Native apps sharing one TypeScript codebase across both stores, with native modules where it counts.', 'تطبيقات React Native بكود TypeScript واحد عبر المتجرين، مع وحدات أصلية حيث يلزم.'), icon: 'Code2', href: '/services/app-development/react-native-app-development' },
        { name: t('MVP App Development', 'تطوير النسخة الأولى (MVP)'), desc: t('Launch a lean, investor-ready first version fast — validate the idea before you scale.', 'أطلق نسخة أولى رشيقة وجاهزة للمستثمرين بسرعة — تحقّق من الفكرة قبل التوسّع.'), icon: 'Rocket', href: '/services/app-development/mvp-app-development' },
        { name: t('Business Mobile Apps', 'تطبيقات الأعمال للجوال'), desc: t('Internal and field apps that digitize operations, teams, and approvals on mobile.', 'تطبيقات داخلية وميدانية ترقمن العمليات والفِرق والاعتمادات على الجوال.'), icon: 'Building2', href: '/services/app-development/business-mobile-app-development' },
        { name: t('Customer App Development', 'تطبيقات العملاء'), desc: t('Branded customer apps with accounts, loyalty, and push that keep users coming back.', 'تطبيقات عملاء بعلامتك مع حسابات وولاء وإشعارات تُعيد المستخدمين إليك.'), icon: 'Users', href: '/services/app-development/customer-app-development' },
        { name: t('Booking App Development', 'تطبيقات الحجز'), desc: t('Appointment and reservation apps with calendars, payments, and reminders built in.', 'تطبيقات حجز ومواعيد مع تقويم ودفع وتذكيرات مدمجة.'), icon: 'Ticket', href: '/services/app-development/booking-app-development' },
        { name: t('Delivery & Order Apps', 'تطبيقات التوصيل والطلبات'), desc: t('Ordering and delivery apps with live tracking, driver flows, and secure payments.', 'تطبيقات طلب وتوصيل مع تتبّع لحظي ومسارات للسائقين ودفع آمن.'), icon: 'Activity', href: '/services/app-development/delivery-order-app-development' },
        { name: t('App Backend & APIs', 'خلفية التطبيق وواجهات API'), desc: t('Secure APIs, auth, push, payments, and realtime sync powering your app end to end.', 'واجهات API آمنة ومصادقة وإشعارات ودفع ومزامنة لحظية تشغّل تطبيقك من طرف إلى طرف.'), icon: 'Server', href: '/services/app-development/app-backend-api-development' },
        { name: t('App Store Launch Support', 'دعم إطلاق المتجر'), desc: t('App Store & Play Store submission, review readiness, and a smooth first release.', 'تقديم لمتجري App Store وPlay Store وجاهزية للمراجعة وإطلاق أول سلس.'), icon: 'PlayCircle', href: '/services/app-development/app-store-launch-support' },
        { name: t('Mobile App Maintenance', 'صيانة تطبيقات الجوال'), desc: t('OS updates, crash monitoring, and a support path so the app stays healthy after launch.', 'تحديثات النظام ومراقبة الأعطال ومسار دعم ليبقى التطبيق سليماً بعد الإطلاق.'), icon: 'ShieldCheck', href: '/services/app-development/mobile-app-maintenance' },
    ]

    const platforms = [
        { Icon: Smartphone, name: 'iOS', stack: 'Swift · SwiftUI', note: t('Native iPhone & iPad, tuned for Apple silicon.', 'أصلي لـ iPhone وiPad، مضبوط لمعالجات Apple.'), tint: 'from-sky-500 to-cyan-400' },
        { Icon: Boxes, name: 'Android', stack: 'Kotlin · Jetpack Compose', note: t('Every screen size and OEM, Material 3 polish.', 'كل مقاسات الشاشات وكل الأجهزة، بلمسة Material 3.'), tint: 'from-emerald-500 to-teal-400' },
        { Icon: Layers, name: 'React Native', stack: 'Expo · TypeScript', note: t('One codebase, both stores, near-native speed.', 'كود واحد، المتجران، سرعة شبه أصلية.'), tint: 'from-indigo-500 to-violet-400' },
        { Icon: Cpu, name: 'Flutter', stack: 'Dart · Material · Cupertino', note: t('Expressive, pixel-perfect UI at 60fps.', 'واجهات تعبيرية دقيقة بأداء 60 إطاراً/ث.'), tint: 'from-fuchsia-500 to-sky-400' },
    ]

    const steps = [
        { n: '01', Icon: Sparkles, title: t('Discovery & strategy', 'الاكتشاف والاستراتيجية'), body: t('We map the users, the core loop, and the platforms before a line of code.', 'نرسم المستخدمين والحلقة الأساسية والمنصّات قبل أول سطر برمجي.') },
        { n: '02', Icon: Pencil, title: t('UX & UI design', 'تصميم التجربة والواجهة'), body: t('Clickable prototype with a native iOS/Android feel — validated, then built.', 'نموذج قابل للنقر بإحساس أصلي لـ iOS/Android — نتحقق منه ثم نبني.') },
        { n: '03', Icon: Cpu, title: t('Native / cross-platform build', 'البناء الأصلي/متعدد المنصات'), body: t('Clean, testable code, wired to a secure backend, push, and payments.', 'كود نظيف قابل للاختبار، موصول بخلفية آمنة وإشعارات ودفع.') },
        { n: '04', Icon: FlaskConical, title: t('QA on real devices', 'اختبار على أجهزة حقيقية'), body: t('Automated + manual testing across real phones before anything ships.', 'اختبار آلي ويدوي على هواتف حقيقية قبل أي إطلاق.') },
        { n: '05', Icon: Rocket, title: t('Launch & grow', 'الإطلاق والنمو'), body: t('App Store + Play Store submission, ASO, analytics, and release iterations.', 'تقديم للمتجرين، وتحسين ASO، وتحليلات، وإصدارات متتابعة.') },
    ]

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
        { q: t('How long does an app take?', 'كم يستغرق التطبيق؟'), a: t('A focused MVP typically launches in 8–12 weeks. Larger apps with backend, payments, and multiple roles are delivered in phases so each part is tested before the next.', 'عادةً يُطلق MVP مركّز خلال 8–12 أسبوعاً. أما التطبيقات الأكبر ذات الخلفية والدفع والأدوار المتعددة فتُسلَّم على مراحل ليُختبر كل جزء قبل التالي.') },
        { q: t('Do you publish to the App Store and Google Play?', 'هل تنشرون على App Store وGoogle Play؟'), a: t('Yes — we handle the full submission for both: developer accounts, store listings, screenshots, review, and release, plus updates afterward.', 'نعم — نتولّى التقديم الكامل للمتجرين: حسابات المطورين وصفحات المتجر ولقطات الشاشة والمراجعة والإصدار، مع التحديثات لاحقاً.') },
        { q: t('Do you build the backend too?', 'هل تبنون الخلفية أيضاً؟'), a: t('We do. APIs, authentication, push notifications, payments, an admin panel, and realtime features are built alongside the app by the same team.', 'نعم. واجهات API والمصادقة والإشعارات والدفع ولوحة إدارة وميزات لحظية تُبنى مع التطبيق بنفس الفريق.') },
        { q: t('Do we own the code and accounts?', 'هل نملك الكود والحسابات؟'), a: t('Fully. You receive the source code, the App Store and Play Store accounts, documentation, and a handoff so your team can operate and extend it independently.', 'بالكامل. تحصل على الكود المصدري وحسابات App Store وPlay Store والتوثيق وتسليم كامل ليعمل فريقك ويطوّره باستقلالية.') },
        { q: t('Do you maintain the app after launch?', 'هل تصونون التطبيق بعد الإطلاق؟'), a: t('Yes — OS-update compatibility, crash monitoring, security patches, and growth/ASO iterations keep the app healthy and improving.', 'نعم — توافق تحديثات النظام ومراقبة الأعطال وترقيعات الأمان وإصدارات النمو/ASO تُبقي التطبيق سليماً ومتحسّناً.') },
    ]

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
        name: t('App Development', 'تطوير التطبيقات'),
        description: t('iOS, Android, and cross-platform app development for Gulf businesses — design, build, launch, and grow.', 'تطوير تطبيقات iOS وAndroid ومتعددة المنصات لأعمال الخليج — تصميم وبناء وإطلاق ونمو.'),
        path: '/services/app-development',
        serviceType: 'Mobile App Development',
    })
    const breadcrumbSchema = buildBreadcrumbSchema(locale, [
        { name: t('Home', 'الرئيسية'), path: '/' },
        { name: t('Services', 'الخدمات'), path: '/services' },
        { name: t('App Development', 'تطوير التطبيقات'), path: '/services/app-development' },
    ])
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }

    return (
        <main dir={dir} className="relative overflow-hidden bg-[#f4f1f8]">
            <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* SEO: the ONE keyword-rich H1. The cinematic hero's big text is
                decorative (and GSAP-hides until reveal), so the real semantic
                heading lives here for crawlers. */}
            <h1 className="sr-only">{t('App Development Company in Oman & the Gulf — iOS, Android & Cross-Platform Apps', 'شركة تطوير تطبيقات في عُمان والخليج — تطبيقات iOS وAndroid ومتعددة المنصات')}</h1>

            {/* ───────────────── CINEMATIC HERO ───────────────── */}
            <CinematicHero
                brandName="CloudTopia"
                tagline1={t('Apps people', 'تطبيقات تبقى')}
                tagline2={t('keep on their home screen.', 'على شاشة عملائك.')}
                cardHeading={t('Design, build, launch.', 'نُصمّم، نبني، ونُطلق.')}
                cardDescription={t('iOS, Android, and cross-platform apps engineered end to end — fast, beautiful, and fully owned by you.', 'نبني تطبيقات iOS وAndroid ومتعددة المنصات من الفكرة حتى متجر التطبيقات — سريعة وأنيقة، وملكك أنت بالكامل.')}
                metricValue={4.9}
                metricLabel={t('App rating', 'التقييم')}
                ctaHeading={t('Ship your app.', 'لنُطلق تطبيقك.')}
                ctaDescription={t('From idea to both app stores — iOS, Android & cross-platform, built by one team in Oman & the Gulf.', 'من الفكرة إلى App Store وGoogle Play — تطبيقات iOS وAndroid ومتعددة المنصات يبنيها فريق واحد في عُمان والخليج.')}
                appStoreHref={L('/contact')}
                playStoreHref={L('/contact')}
                badge1Title={t('Top Charts', 'الأعلى في المتجر')}
                badge1Sub={t('Featured on launch', 'مميّز منذ الإطلاق')}
                badge2Title={t('50k Downloads', '50 ألف تنزيل')}
                badge2Sub={t('First quarter', 'في أول ٣ أشهر')}
                todayLabel={t('Today', 'اليوم')}
                journeyLabel={t('Dashboard', 'لوحتك')}
            />

            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <PageBreadcrumbs
                    locale={locale}
                    items={[{ label: t('Services', 'الخدمات'), href: L('/services') }, { label: t('App Development', 'تطوير التطبيقات') }]}
                />
            </div>

            {/* Stats strip */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">
                    {stats.map((s) => (
                        <div key={s.k} className="bg-white/80 px-5 py-5 text-center backdrop-blur">
                            <dt className="text-xl font-black tracking-tight text-[#0f172a]">{s.v}</dt>
                            <dd className="mt-1 text-[13px] font-semibold text-slate-500">{s.k}</dd>
                        </div>
                    ))}
                </dl>
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
                        <h2 className="text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">{t('Every app service you need', 'كل خدمة تطبيق تحتاجها')}</h2>
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
                    sub={t('Real apps we’ve built and launched to the stores for clients.', 'تطبيقات حقيقية بنيناها وأطلقناها للمتاجر لعملاء.')}
                />
            ) : null}

            <TestimonialsMarquee locale={loc} dir={dir} />

            <CreativePricing
                tag={t('Packages', 'الباقات')}
                title={t('App Development: packages', 'تطوير التطبيقات: الباقات')}
                description={t('Pick the level that matches your scope — every path starts with a free consultation and a free demo preview.', 'اختر المستوى المناسب لنطاقك — كل مسار يبدأ باستشارة مجانية ومعاينة ديمو مجانية.')}
                tiers={tiers}
                dir={dir}
                className="bg-[#f4f1f8] py-16 md:py-20"
            />

            <FaqAccordion
                eyebrow={t('FAQ', 'الأسئلة الشائعة')}
                heading={t('App development questions, answered', 'أسئلة تطوير التطبيقات، مُجابة')}
                subheading={t('The things Gulf businesses ask us most before starting an app.', 'أكثر ما تسألنا عنه شركات الخليج قبل بدء تطبيق.')}
                items={faqs}
                dir={dir}
            />

            <ContactFast serviceName={t('App Development', 'تطوير التطبيقات')} locale={loc} dir={dir} />
        </main>
    )
}
