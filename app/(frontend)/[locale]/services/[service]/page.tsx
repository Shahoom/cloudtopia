import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, CircleDollarSign, Database, Gauge, HelpCircle, Layers, MessageCircle, MonitorCheck, Network, Pencil, Rocket, Search, Settings2, ShieldCheck, Sparkles, Star, Workflow } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import { buildOrganizationRef } from '@/lib/seo/schema'
import { getService, getServiceCategory, localizedPackageName, localizedServiceFeatures, localizedServiceOutcomes, localizedServiceValue, serviceDetailSlugs } from '@/lib/seo/services'
import { localizedDP } from '@/lib/services/digital-presence'
import { getStructuredPillarBySlug, structuredPillarRoutes, legacyMainPagePillarSlugs } from '@/lib/services/structured-catalog'
import { PillarPage } from '@/components/services/PillarPage'
import RichPillarPage from '@/components/services/RichPillarPage'
import WebAppPillarPage from '@/components/services/WebAppPillarPage'
import { GetFoundPillarPage } from '@/components/services/GetFoundPillarPage'
import { getGetFoundContent } from '@/lib/services/get-found-content'
import { getRichPillarData, getBusinessSystemsSubService, businessSystemsSubServiceSlugs } from '@/lib/services/business-systems-content'
import { getDigitalPresenceSubService, dpSubServiceSlugs } from '@/lib/services/digital-presence-content'
import { findSubServiceParent } from '@/lib/services/sub-service-routing'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'
import { HeroOrbitDeck } from '@/components/ui/hero-modern'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import { FeaturesBento } from '@/components/ui/features-bento'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { countryLandingPages } from '@/lib/seo/country-landing-pages'
import { getWebsiteServiceContent, asServiceLocale } from '@/lib/services/website-service-content'
import { getWebsiteFaq } from '@/lib/services/website-faq-content'
import { WebAppHero } from '@/components/ui/webapp-hero'
import { WebAppFeatures } from '@/components/ui/webapp-features'
import { WebAppProcess } from '@/components/ui/webapp-process'
import { getWebappServiceContent, asWebAppLocale } from '@/lib/services/webapp-service-content'
import { getWebappFaq } from '@/lib/services/webapp-faq-content'
import { ProcessOverview } from '@/components/ui/process-overview'
import { TestimonialsMarquee } from '@/components/ui/testimonials-marquee'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { ContactFast } from '@/components/ui/contact-fast'
import { ProjectsShowcase } from '@/components/ui/projects-showcase'
import { type Project } from '@/lib/projects'
import { getProjectsForService } from '@/lib/services/related-projects'

// Which real CMS projects (by public id) showcase each website sub-service.
// Related "Projects we did" are now data-driven: each project is tagged in the
// CMS via `relatedServiceSlugs`, and getProjectsForService() resolves the best
// matches with an exact → pillar → category → featured → all fallback (see
// lib/services/related-projects.ts). The previous hardcoded WEBSITE_PROJECT_IDS /
// WEBAPP_PROJECT_IDS maps were removed; their mapping lives in the backfill doc
// at the top of related-projects.ts.

type PageProps = {
    params: Promise<{ locale: string; service: string }>
}

const labels = {
    en: {
        badge: 'Service detail',
        features: 'What is included',
        outcomes: 'Business outcomes',
        technologies: 'Technology foundation',
        answerTitle: 'Direct answer',
        problem: 'Problem this solves',
        solution: 'CloudTopia solution',
        bestFor: 'Best fit',
        deliverables: 'Enterprise deliverables',
        related: 'Related services',
        useCases: 'Practical use cases',
        markets: 'Market-ready delivery',
        packages: 'Package path',
        packageTitle: 'Service packages for this work',
        packageDescription: 'Pick the level that matches your scope. Every path starts with a free consultation and a free custom demo preview for your inquiry.',
        packageCta: 'Scope this service',
        process: 'Delivery approach',
        maturity: 'Structured delivery maturity',
        maturityNote: 'Our delivery flow is inspired by disciplined software development practices: defined scope, review gates, QA, ownership handoff, and measurable optimization. We do not claim CMMI certification unless a contract explicitly states it.',
        faqs: 'Common questions',
        start: 'Request a proposal',
        pricing: 'Compare pricing',
        allServices: 'All services',
        whatsapp: 'WhatsApp consultation',
        readyTitle: 'Ready to scope this service?',
        readyDesc: 'We will turn your goals into a clear scope, fixed proposal, and practical delivery plan.',
        processSteps: ['Discovery', 'Planning', 'UI/UX Design', 'Development', 'Testing', 'Launch', 'Support & Optimization'],
        trustIndicators: ['Free consultation', 'Free demo preview', 'Arabic + English delivery', 'Ownership handoff'],
        bestForItems: [
            'Teams replacing scattered spreadsheets, manual follow-up, or unclear customer journeys.',
            'Companies that need Arabic and English delivery without losing brand consistency.',
            'Owners who want maintainable systems, clear documentation, and account-level control.',
        ],
        deliverablesItems: [
            { title: 'Scope blueprint', description: 'User journeys, content needs, integrations, acceptance criteria, and launch priorities before development starts.' },
            { title: 'Production build', description: 'Responsive interface, CMS or admin setup where needed, analytics wiring, technical SEO foundations, and launch support.' },
            { title: 'Ownership handoff', description: 'Credential handover, documentation, training, and a support path so your team can operate confidently after launch.' },
        ],
    },
    ar: {
        badge: 'تفاصيل الخدمة',
        features: 'ما الذي يشمله العمل',
        outcomes: 'نتائج الأعمال',
        technologies: 'الأساس التقني',
        answerTitle: 'إجابة مباشرة',
        problem: 'المشكلة التي نحلها',
        solution: 'حل كلاود توبيا',
        bestFor: 'الأنسب لـ',
        deliverables: 'مخرجات مؤسسية',
        related: 'خدمات مرتبطة',
        useCases: 'استخدامات عملية',
        markets: 'تنفيذ جاهز للأسواق',
        packages: 'مسار الباقات',
        packageTitle: 'باقات خاصة بهذه الخدمة',
        packageDescription: 'اختر المستوى المناسب لنطاقك. كل مسار يبدأ باستشارة مجانية ومعاينة ديمو مجانية حسب طلبك.',
        packageCta: 'حدد نطاق الخدمة',
        process: 'طريقة التنفيذ',
        maturity: 'نضج في طريقة التسليم',
        maturityNote: 'طريقة التنفيذ مستوحاة من ممارسات تطوير برمجيات منضبطة: نطاق محدد، نقاط مراجعة، اختبار جودة، تسليم ملكية، وتحسين قابل للقياس. لا ندّعي شهادة CMMI ما لم يُذكر ذلك صراحة في عقد رسمي.',
        faqs: 'أسئلة شائعة',
        start: 'اطلب عرضاً',
        pricing: 'قارن الأسعار',
        allServices: 'كل الخدمات',
        whatsapp: 'استشارة واتساب',
        readyTitle: 'جاهز لتحديد نطاق هذه الخدمة؟',
        readyDesc: 'سنحول أهدافك إلى نطاق واضح وعرض ثابت وخطة تنفيذ عملية.',
        processSteps: ['اكتشاف', 'تخطيط', 'تصميم UI/UX', 'تطوير', 'اختبار', 'إطلاق', 'دعم وتحسين'],
        trustIndicators: ['استشارة مجانية', 'معاينة ديمو مجانية', 'تنفيذ عربي وإنجليزي', 'تسليم الملكية'],
        bestForItems: [
            'فرق تستبدل الجداول والمتابعة اليدوية ورحلات العملاء غير الواضحة.',
            'شركات تحتاج تنفيذاً عربياً وإنجليزياً دون فقدان اتساق العلامة.',
            'ملاك يريدون أنظمة قابلة للصيانة وتوثيقاً واضحاً وتحكماً بالحسابات.',
        ],
        deliverablesItems: [
            { title: 'مخطط نطاق', description: 'رحلات المستخدم، احتياجات المحتوى، التكاملات، معايير القبول، وأولويات الإطلاق قبل بدء التطوير.' },
            { title: 'بناء إنتاجي', description: 'واجهة متجاوبة، إعداد CMS أو لوحة إدارة عند الحاجة، ربط التحليلات، أساسيات SEO التقنية، ودعم الإطلاق.' },
            { title: 'تسليم الملكية', description: 'تسليم الحسابات، التوثيق، التدريب، ومسار دعم حتى يستطيع فريقك التشغيل بثقة بعد الإطلاق.' },
        ],
    },
}

function pageLabels(locale: string) {
    return labels[(locale as keyof typeof labels) || 'en'] || labels.en
}

function serviceTierIcon(index: number) {
    const icons = [
        <Pencil key="pencil" className="h-6 w-6" aria-hidden="true" />,
        <Star key="star" className="h-6 w-6" aria-hidden="true" />,
        <Sparkles key="sparkles" className="h-6 w-6" aria-hidden="true" />,
    ]
    return icons[index % icons.length]
}

function serviceTierColor(index: number): PricingTier['color'] {
    return (['sky', 'amber', 'emerald'] as PricingTier['color'][])[index % 3]
}

const categoryProfiles: Record<string, { eyebrow: string; gradient: string; tint: string; accent: string; summary: { en: string; ar: string } }> = {
    'digital-presence': {
        eyebrow: 'Digital presence',
        gradient: 'from-sky-500 via-cyan-400 to-indigo-400',
        tint: 'bg-sky-50',
        accent: 'text-sky-700',
        summary: { en: 'Visibility, conversion, and multilingual content.', ar: 'ظهور وتحويل ومحتوى متعدد اللغات.' },
    },
    'interactive-web-applications': {
        eyebrow: 'Interactive app',
        gradient: 'from-indigo-500 via-violet-400 to-sky-400',
        tint: 'bg-indigo-50',
        accent: 'text-indigo-700',
        summary: { en: 'Portals, dashboards, SaaS paths, and secure access.', ar: 'بوابات ولوحات ومنصات SaaS وصلاحيات آمنة.' },
    },
    'mobile-app-development': {
        eyebrow: 'Mobile app',
        gradient: 'from-sky-500 via-indigo-400 to-cyan-400',
        tint: 'bg-sky-50',
        accent: 'text-sky-700',
        summary: { en: 'iOS, Android, app UX, APIs, launch, and maintenance.', ar: 'iOS وAndroid وتجربة تطبيق وAPI وإطلاق وصيانة.' },
    },
    'business-systems-development': {
        eyebrow: 'Business system',
        gradient: 'from-violet-500 via-purple-400 to-cyan-400',
        tint: 'bg-violet-50',
        accent: 'text-violet-700',
        summary: { en: 'Operations, CRM, ERP, workflow, and data ownership.', ar: 'عمليات وCRM وERP وسير عمل وملكية بيانات.' },
    },
    'cloud-infrastructure': {
        eyebrow: 'Cloud foundation',
        gradient: 'from-cyan-500 via-blue-400 to-slate-400',
        tint: 'bg-cyan-50',
        accent: 'text-cyan-700',
        summary: { en: 'Migration, hosting, backups, monitoring, and stability.', ar: 'ترحيل واستضافة ونسخ احتياطي ومراقبة واستقرار.' },
    },
    'ai-powered-solutions': {
        eyebrow: 'AI workflow',
        gradient: 'from-fuchsia-500 via-violet-400 to-indigo-400',
        tint: 'bg-fuchsia-50',
        accent: 'text-fuchsia-700',
        summary: { en: 'Assistants, automation, knowledge, and reporting.', ar: 'مساعدون وأتمتة ومعرفة وتقارير.' },
    },
    'digital-growth-support': {
        eyebrow: 'Growth support',
        gradient: 'from-emerald-500 via-sky-400 to-violet-400',
        tint: 'bg-emerald-50',
        accent: 'text-emerald-700',
        summary: { en: 'Campaign pages, SEO, content systems, and lead flow.', ar: 'صفحات حملات وSEO وأنظمة محتوى ومسارات عملاء.' },
    },
}

function categoryProfile(slug: string) {
    return categoryProfiles[slug] || categoryProfiles['digital-presence']
}

function heroImageForService(serviceSlug: string, categorySlug: string) {
    const serviceImages: Record<string, string> = {
        'business-website-development': '/images/services/website-design/1.avif',
        'landing-page-design': '/images/services/website-design/2.avif',
        'corporate-website-design': '/images/services/website-design/3.avif',
        'ecommerce-website-development': '/images/services/ecommerce-solutions/1.jpg',
        'portfolio-websites': '/images/services/website-design/4.avif',
        'restaurant-website-development': '/images/homepage/Restaurants.jpg',
        'crm-development': '/images/services/business-systems-development/CRM System.webp',
        'inventory-management-systems': '/images/services/business-systems-development/Inventory Management.webp',
        'booking-platforms': '/images/services/business-systems-development/booking system.webp',
        'social-media-management': '/images/services/social-media-marketing/Social Media Strategy.jpg',
        'brand-identity': '/images/services/social-media-marketing/brand-identity.avif',
        'seo-optimization': '/images/homepage/digital growth.webp',
        'content-systems': '/images/services/social-media-marketing/content production.avif',
        'mobile-app-development': '/images/homepage/app development.jpg',
        'ai-chatbots': '/images/homepage/Chatbot & Conversational AI.webp',
        'ai-automation': '/images/homepage/AI-Powered Automation & RPA.webp',
        'cloud-migration': '/images/homepage/cloud & infrastructure.webp',
    }

    const categoryImages: Record<string, string> = {
        'digital-presence': '/images/services/website-design/5.avif',
        'interactive-web-applications': '/images/homepage/web application.jpeg',
        'mobile-app-development': '/images/homepage/app development.jpg',
        'business-systems-development': '/images/services/business-systems-development/1.webp',
        'cloud-infrastructure': '/images/homepage/cloud & infrastructure.webp',
        'ai-powered-solutions': '/images/homepage/AI Product Development.webp',
        'digital-growth-support': '/images/homepage/digital growth.webp',
    }

    return serviceImages[serviceSlug] || categoryImages[categorySlug] || '/images/homepage/digital presence.png'
}

const processIcons = [Search, Workflow, Pencil, Settings2, MonitorCheck, Rocket, Gauge]

function serviceProblemCopy(serviceName: string, locale: string) {
    return locale === 'ar'
        ? `غالباً لا تفشل الشركات بسبب نقص فكرة ${serviceName}، بل بسبب نطاق غير واضح، أدوات منفصلة، متابعة يدوية، أو تجربة عربية وإنجليزية لا تبدو موحدة. هذه الصفحة توضّح المشكلة قبل أن نقفز إلى التنفيذ.`
        : `Companies rarely struggle because they lack a ${serviceName} idea. They struggle because scope is vague, tools are disconnected, follow-up is manual, or Arabic and English experiences feel inconsistent. This page frames the problem before production starts.`
}

function serviceSolutionCopy(serviceName: string, locale: string) {
    return locale === 'ar'
        ? `نحوّل ${serviceName} إلى مسار عمل واضح: اكتشاف، خريطة تجربة، محتوى، تكاملات، بناء، اختبار، إطلاق، وتوثيق. الهدف ليس واجهة جميلة فقط، بل نظام قابل للتشغيل والقياس وتملكه شركتك.`
        : `CloudTopia turns ${serviceName} into a clear delivery path: discovery, experience map, content, integrations, build, QA, launch, and documentation. The goal is not only a polished interface, but an owned system your team can operate and measure.`
}

function serviceUseCases(serviceName: string, locale: string) {
    return locale === 'ar'
        ? [
            { title: `${serviceName} لجمع العملاء`, description: 'نماذج، واتساب، صفحات خدمات، وتتبع يوضّح مصدر كل طلب.' },
            { title: `${serviceName} للعمليات`, description: 'لوحات متابعة، صلاحيات، حالات طلب، وتنبيهات تقلل العمل اليدوي.' },
            { title: `${serviceName} للمحتوى وSEO`, description: 'هيكل محتوى عربي وإنجليزي، أسئلة شائعة، وروابط داخلية تساعد البحث.' },
            { title: `${serviceName} للتوسع`, description: 'بنية قابلة للإضافة لاحقاً مع CRM، ERP، سحابة، API، أو أتمتة.' },
        ]
        : [
            { title: `${serviceName} for lead capture`, description: 'Forms, WhatsApp paths, service pages, and tracking that show where every inquiry came from.' },
            { title: `${serviceName} for operations`, description: 'Dashboards, roles, request statuses, and notifications that reduce manual work.' },
            { title: `${serviceName} for content and SEO`, description: 'Arabic and English content structure, FAQs, and internal links that support search intent.' },
            { title: `${serviceName} for scale`, description: 'An extensible foundation for CRM, ERP, cloud, APIs, or automation when the scope grows.' },
        ]
}

function whatsappHref(serviceName: string, locale: string) {
    const text = locale === 'ar'
        ? `مرحباً كلاود توبيا، أريد استشارة مجانية ومعاينة ديمو مجانية لخدمة ${serviceName}.`
        : `Hello CloudTopia, I want a free consultation and free demo preview for ${serviceName}.`
    return `https://wa.me/96895886393?text=${encodeURIComponent(text)}`
}

export function generateStaticParams() {
    // DP + BS sub-services are nested now (/services/<parent>/<sub>) and owned by
    // the [subservice] route, so exclude their slugs here — this flat route only
    // pre-renders pillar pages and the remaining flat service-detail pages.
    const subSlugs = new Set<string>([...businessSystemsSubServiceSlugs, ...dpSubServiceSlugs])
    const slugs = [...new Set([
        ...serviceDetailSlugs.filter((s) => !subSlugs.has(s)),
        ...structuredPillarRoutes.map((p) => p.slug),
    ])]
    return ['en', 'ar'].flatMap((locale) =>
        slugs.map((service) => ({
            locale,
            service,
        })),
    )
}

import { applySeoOverride } from '@/lib/cms/route-seo'

// Near-duplicate website services: the older bespoke pages and the new Digital
// Presence catalog cover the same offering under different slugs. Both URLs stay
// live, but the older page declares the new page as its canonical so search
// engines consolidate ranking signals (no duplicate-content penalty).
const WEBSITE_DUPLICATE_CANONICAL: Record<string, string> = {
    'portfolio-websites': 'portfolio-website-development',
    'corporate-website-design': 'corporate-website-development',
    'landing-page-design': 'landing-page-development',
    'restaurant-website-development': 'restaurant-and-hospitality-website-development',
    'educational-website-development': 'educational-and-lms-website-development',
    'website-redesign': 'website-redesign-and-modernization',
    'website-maintenance': 'website-maintenance-and-support',
}

// Per-slug SEO overrides for structured pillars — richer, keyword-led titles and
// descriptions than the plain pillar name/description (used for the flagship
// design + Get-Found pillars). Other pillars fall back to name/description.
const PILLAR_SEO_OVERRIDES: Record<string, { title: { en: string; ar: string }; description: { en: string; ar: string } }> = {
    'ui-ux-design-branding': {
        title: { en: 'UI/UX Design & Branding Services in Oman & the Gulf', ar: 'خدمات تصميم واجهات المستخدم والهوية البصرية في عُمان والخليج' },
        description: { en: 'Premium UI/UX design and brand identity for Gulf businesses — logo, design systems, motion, and user-tested web & mobile interfaces, bilingual Arabic + English. Free consultation.', ar: 'تصميم واجهات وهوية بصرية راقية لشركات الخليج — شعار وأنظمة تصميم وموشن وواجهات ويب وجوال مختبَرة مع المستخدمين، بالعربية والإنجليزية. استشارة مجانية.' },
    },
    'search-engine-optimization': {
        title: { en: 'SEO Services in Oman & the Gulf — Rank Higher, Earn Organic Traffic', ar: 'خدمات تحسين محركات البحث SEO في عُمان والخليج' },
        description: { en: 'Technical, on-page, and off-page SEO that earns durable organic traffic across the Gulf — bilingual Arabic + English keyword strategy, audits, and link building. Free consultation.', ar: 'تحسين تقني وعلى الصفحة وخارجها يجلب زيارات عضوية مستدامة عبر الخليج — استراتيجية كلمات ثنائية اللغة وتدقيق وبناء روابط موثوقة. استشارة مجانية.' },
    },
    'answer-engine-optimization': {
        title: { en: 'Answer Engine Optimization (AEO) — Get Cited by AI Answers', ar: 'تحسين محركات الإجابة (AEO) — كن مصدر إجابات الذكاء الاصطناعي' },
        description: { en: 'Get your brand cited by AI answer engines — ChatGPT, Perplexity, and Google AI Overviews. Structured content, schema, and authority built to own the direct answer. Bilingual AR + EN.', ar: 'اجعل علامتك مصدراً تستشهد به محركات الإجابة بالذكاء الاصطناعي — ChatGPT وPerplexity ونظرات Google AI. محتوى منظّم وبيانات مهيكلة وموثوقية لامتلاك الإجابة المباشرة. بالعربية والإنجليزية.' },
    },
    'generative-engine-optimization': {
        title: { en: 'Generative Engine Optimization (GEO) — Surface Inside AI Results', ar: 'تحسين المحركات التوليدية (GEO) — اظهر داخل نتائج الذكاء الاصطناعي' },
        description: { en: 'Optimize your brand to be recommended inside generative-AI results, so AI assistants surface you when buyers ask. Entity, content, and authority strategy — bilingual AR + EN.', ar: 'هيّئ علامتك لتُرشَّح داخل نتائج الذكاء الاصطناعي التوليدي، ليقترحك المساعدون الأذكياء حين يسأل المشترون. استراتيجية كيان ومحتوى وموثوقية — بالعربية والإنجليزية.' },
    },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', service: serviceSlug } = await params
    const pillar = getStructuredPillarBySlug(serviceSlug)
    if (pillar) {
        const seoOverride = PILLAR_SEO_OVERRIDES[serviceSlug]
        const pName = seoOverride ? (locale === 'ar' ? seoOverride.title.ar : seoOverride.title.en) : localizedDP(pillar.name, locale)
        const pDesc = seoOverride ? (locale === 'ar' ? seoOverride.description.ar : seoOverride.description.en) : localizedDP(pillar.description, locale)
        const pPath = `/services/${pillar.slug}`
        const brand = locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia'
        return {
            // Bare title — the layout's `%s | CloudTopia` template appends the brand once.
            title: pName,
            description: pDesc,
            openGraph: { title: `${pName} | ${brand}`, description: pDesc, url: canonicalUrl(locale, pPath), siteName: 'CloudTopia', type: 'website' },
            alternates: {
                canonical: canonicalUrl(locale, pPath),
                languages: { en: canonicalUrl('en', pPath), ar: canonicalUrl('ar', pPath), 'x-default': canonicalUrl('en', pPath) },
            },
        }
    }
    // Sub-service metadata (DP + BS) is owned by the nested route now; the flat
    // route 301s those slugs, so no sub metadata branch is needed here.
    const service = getService(serviceSlug)
    if (!service) return { title: 'Service Not Found' }

    const name = localizedServiceValue(service.name, locale)
    const description = localizedServiceValue(service.description, locale)
    const path = `/services/${service.slug}`
    // If this is an older near-duplicate, canonicalize to the new equivalent page.
    const canonicalPath = `/services/${WEBSITE_DUPLICATE_CANONICAL[service.slug] || service.slug}`
    const category = getServiceCategory(service.categorySlug)
    const categoryName = category ? localizedServiceValue(category.name, locale) : locale === 'ar' ? 'خدمات كلاود توبيا' : 'CloudTopia Services'
    const title = locale === 'ar'
        ? `${name} للشركات`
        : `${name} for Business`
    const socialTitle = `${title} | ${locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia'}`
    const images = ogImagesFor({ page: `services/${service.slug}`, locale })

    const meta: Metadata = {
        title,
        description,
        keywords: [name, categoryName, 'CloudTopia', 'Arabic website development', 'CRM', 'ERP', 'AI automation'],
        openGraph: {
            title: socialTitle,
            description,
            url: canonicalUrl(locale, path),
            siteName: 'CloudTopia',
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title: socialTitle,
            description,
            images: images.map((image) => image.url),
        },
        alternates: {
            canonical: canonicalUrl(locale, canonicalPath),
            languages: {
                en: canonicalUrl('en', canonicalPath),
                ar: canonicalUrl('ar', canonicalPath),
                'x-default': canonicalUrl('en', canonicalPath),
            },
        },
    }

    return applySeoOverride(meta, locale, `services/${service.slug}`)
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { locale = 'en', service: serviceSlug } = await params
    // "Get Found" trio (SEO/AEO/GEO) share a bespoke pillar design. They are
    // structured pillars, so this branch MUST precede the getStructuredPillarBySlug
    // render below — otherwise they would fall through to the generic PillarPage.
    const getFound = getGetFoundContent(serviceSlug)
    if (getFound) return <GetFoundPillarPage content={getFound} locale={locale} />
    const pillar = getStructuredPillarBySlug(serviceSlug)
    // Mobile/Cloud/AI pillars are nav-only — keep their original ServiceDetail page.
    if (pillar && !legacyMainPagePillarSlugs.has(serviceSlug)) {
        // Canonical guard: a pillar's real URL is `pillar.href`. If this dynamic
        // route was reached on a `/services/<slug>` that is NOT the pillar's
        // canonical href — a slug≠segment case (social-media-management →
        // /services/social-media-marketing) or a bespoke pillar whose static
        // folder should own the URL — 301 to the canonical so search engines
        // never see a second indexable copy.
        if (pillar.href !== `/services/${serviceSlug}`) permanentRedirect(pillar.href)
        const rich = getRichPillarData(serviceSlug, locale)
        if (rich) return <RichPillarPage data={rich} locale={locale} />
        // Web-app pillars (SaaS/MVP, full-stack, portals, modernization, media)
        // render inline under /services/<slug> via the shared bilingual
        // WebAppPillarPage — the same grouped namespace as every other pillar.
        const webapp = getWebappServiceContent(serviceSlug)
        if (webapp) return <WebAppPillarPage slug={serviceSlug} data={webapp} locale={locale} />
        return <PillarPage pillar={pillar} locale={locale} />
    }
    // Sub-service pages now live nested under their parent pillar
    // (/services/<parent>/<sub>). Any hit on the old flat /services/<sub> URL is
    // permanently redirected to its nested home; the nested route owns the render.
    if (getBusinessSystemsSubService(serviceSlug) || getDigitalPresenceSubService(serviceSlug)) {
        const parent = findSubServiceParent(serviceSlug)
        if (parent) permanentRedirect(`/services/${parent}/${serviceSlug}`)
    }
    const service = getService(serviceSlug)
    if (!service) notFound()

    const category = getServiceCategory(service.categorySlug)
    const profile = categoryProfile(service.categorySlug)
    const L = pageLabels(locale)
    const isRTL = locale === 'ar'
    const serviceName = localizedServiceValue(service.name, locale)
    const categoryName = category ? localizedServiceValue(category.name, locale) : ''
    const relatedServices = (category?.services || [])
        .filter((candidate) => candidate.slug !== service.slug)
        .slice(0, 4)
    const shortAnswer = isRTL
        ? `${serviceName} من كلاود توبيا هو مسار تنفيذ محدد النطاق للشركات التي تحتاج نتيجة قابلة للإطلاق، محتوى عربي وإنجليزي، ملكية كاملة، وتكاملات عملية دون حزمة مبالغ فيها.`
        : `${serviceName} from CloudTopia is a scoped delivery path for companies that need a launch-ready outcome, Arabic and English content, full ownership, and practical integrations without an oversized package.`
    const featureList = localizedServiceFeatures(service, locale)
    const outcomeList = localizedServiceOutcomes(service, locale)
    const problemCopy = serviceProblemCopy(serviceName, locale)
    const solutionCopy = serviceSolutionCopy(serviceName, locale)
    const useCaseItems = serviceUseCases(serviceName, locale)
    const marketLinks = countryLandingPages.slice(0, 6)
    const techStack = Array.from(new Set([
        ...service.technologies,
        'Payload CMS',
        'Analytics & SEO tools',
        'WhatsApp Business API',
        'CRM/ERP integrations',
    ])).slice(0, 12)
    const whatsAppUrl = whatsappHref(serviceName, locale)
    const serviceHeroImage = heroImageForService(service.slug, service.categorySlug)
    // Website-design sub-services (digital-presence) render the new bespoke
    // design starting with the geometric hero; every other service keeps the
    // shared HeroOrbitDeck below. Content is hand-crafted per slug, not templated.
    const websiteContent = getWebsiteServiceContent(service.slug)
    const serviceLocale = asServiceLocale(locale)
    const webappContent = getWebappServiceContent(service.slug)
    const webappLocale = asWebAppLocale(locale)
    const websiteFaq = websiteContent ? getWebsiteFaq(service.slug, locale) : null
    const webappFaq = webappContent ? getWebappFaq(service.slug, locale) : null
    // Related projects are data-driven (CMS `relatedServiceSlugs`) with an
    // exact → pillar → category → featured → all fallback, so the section
    // surfaces the closest relevant client work and is only empty when there
    // are zero projects. Website sub-services live under the website-development
    // pillar; interactive web apps under the interactive-web-applications pillar.
    const websiteProjects: Project[] = websiteContent
        ? await getProjectsForService(locale, {
            serviceSlug: service.slug,
            pillarSlug: 'website-development',
            categorySlug: service.categorySlug,
        })
        : []
    const webappProjects: Project[] = webappContent
        ? await getProjectsForService(locale, {
            serviceSlug: service.slug,
            pillarSlug: 'interactive-web-applications',
            categorySlug: service.categorySlug,
        })
        : []
    const heroModes = [
        {
            label: L.problem,
            title: L.problem,
            description: problemCopy,
            items: useCaseItems.map((item) => item.title).slice(0, 4),
        },
        {
            label: L.solution,
            title: L.solution,
            description: solutionCopy,
            items: featureList.slice(0, 4),
        },
    ]
    const heroProtocols = [
        ...(category?.packageNames || []).slice(0, 3).map((packageName, index) => ({
            name: localizedPackageName(packageName, locale),
            detail: index === 0
                ? (isRTL ? 'بداية منظمة عندما يكون النطاق واضحاً ومحدداً.' : 'A focused start when the scope is clear and contained.')
                : index === 1
                    ? (isRTL ? 'مسار أوسع مع مراجعات وتكاملات ودعم إطلاق.' : 'A stronger path with reviews, integrations, and launch support.')
                    : (isRTL ? 'تنفيذ مخصص عندما يحتاج المشروع تفاصيل أكبر.' : 'Custom delivery when the project needs deeper scope.'),
            status: index === 1 ? (isRTL ? 'موصى به' : 'Recommended') : (isRTL ? 'جاهز' : 'Ready'),
        })),
        ...L.processSteps.slice(0, 1).map((step) => ({
            name: step,
            detail: isRTL ? 'مرحلة تنفيذ واضحة ضمن خطة الخدمة.' : 'A visible delivery stage inside the service plan.',
            status: isRTL ? 'منظم' : 'Planned',
        })),
    ]
    const heroMetrics = [
        { label: L.features, value: String(featureList.length).padStart(2, '0') },
        { label: L.outcomes, value: String(outcomeList.length).padStart(2, '0') },
        { label: L.packages, value: String(category?.packageNames?.length || 0).padStart(2, '0') },
    ]
    const serviceTiers: PricingTier[] = (category?.packageNames || []).map((packageName, index) => {
        const baseFeatures = [
            ...featureList.slice(0, 4),
            ...outcomeList.slice(0, 2),
            isRTL ? 'استشارة مجانية قبل تحديد النطاق' : 'Free consultation before scope is finalized',
            isRTL ? 'معاينة ديمو مجانية مخصصة حسب طلب الشركة' : 'Free custom demo preview based on the company inquiry',
            isRTL ? 'تسليم الحسابات والتوثيق والملكية' : 'Account, documentation, and ownership handoff',
        ]

        return {
            name: localizedPackageName(packageName, locale),
            icon: serviceTierIcon(index),
            price: index === 2 ? (isRTL ? 'عرض مخصص' : 'Custom quote') : (isRTL ? 'سعر ثابت' : 'Fixed scope'),
            description: index === 0
                ? (isRTL ? `بداية منظمة لخدمة ${serviceName}` : `A focused starting path for ${serviceName}`)
                : index === 1
                    ? (isRTL ? `مسار أوسع للشركات التي تحتاج تنفيذ ${serviceName} مع ربط وتشغيل` : `A stronger path for companies that need ${serviceName} with integrations and launch support`)
                    : (isRTL ? `تنفيذ مخصص لخدمة ${serviceName} عندما يكون النطاق أكبر أو متعدد الفرق` : `Custom ${serviceName} delivery when the scope is larger or multi-team`),
            features: Array.from(new Set(baseFeatures)).slice(0, 9),
            popular: index === 1,
            color: serviceTierColor(index),
            href: localePath(locale, '/contact'),
            ctaLabel: L.packageCta,
        }
    })

    const bespokeFaq = websiteFaq || webappFaq
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (bespokeFaq
            ? bespokeFaq.items.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            }))
            : service.faqs.map((faq) => ({
                '@type': 'Question',
                name: localizedServiceValue(faq.question, locale),
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: localizedServiceValue(faq.answer, locale),
                },
            }))),
    }

    // The canonical #organization node (with both customer-service and sales
    // contactPoints) is emitted once by the root (frontend) layout on every
    // page, so this page only references it via provider/buildOrganizationRef()
    // below — re-defining a second Organization node here produced a conflicting
    // duplicate of the same @id.
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceName,
        description: localizedServiceValue(service.description, locale),
        serviceType: categoryName,
        provider: buildOrganizationRef(),
        url: canonicalUrl(locale, `/services/${service.slug}`),
        areaServed: marketLinks.map((country) => ({ '@type': 'Country', name: locale === 'ar' ? country.countryNameArabic : country.countryNameEnglish })),
        // SD-4: package tiers have no per-package price number in the source data,
        // so each Offer carries name + availability only. A bare/undefined price
        // is never emitted (which would be invalid). Real prices live on /pricing.
        offers: (category?.packageNames || []).map((packageName) => ({
            '@type': 'Offer',
            name: localizedPackageName(packageName, locale),
            availability: 'https://schema.org/InStock',
        })),
    }

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: serviceName,
        description: localizedServiceValue(service.description, locale),
        url: canonicalUrl(locale, `/services/${service.slug}`),
        inLanguage: isRTL ? 'ar' : 'en',
        mainEntity: { '@type': 'Service', name: serviceName },
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalUrl(locale, '/services') },
            { '@type': 'ListItem', position: 3, name: serviceName, item: canonicalUrl(locale, `/services/${service.slug}`) },
        ],
    }

    return (
        <main className="relative min-h-screen bg-[#f4f1f8]" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <PageBreadcrumbs
                    locale={locale}
                    items={[
                        { label: isRTL ? 'الخدمات' : 'Services', href: localePath(locale, '/services') },
                        { label: serviceName },
                    ]}
                />
            </div>

            {webappContent ? (
                <WebAppHero
                    content={webappContent.hero[webappLocale]}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />
            ) : websiteContent ? (
                <HeroGeometric
                    badge={websiteContent.hero[serviceLocale].badge}
                    title1={websiteContent.hero[serviceLocale].title1}
                    title2={websiteContent.hero[serviceLocale].title2}
                    subtitle={websiteContent.hero[serviceLocale].subtitle}
                    primaryCta={{ label: L.start, href: localePath(locale, '/contact') }}
                    secondaryCta={{ label: L.pricing, href: localePath(locale, '/pricing') }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />
            ) : (
                <HeroOrbitDeck
                    eyebrow={`${L.badge} / ${categoryName}`}
                    title={serviceName}
                    description={localizedServiceValue(service.description, locale)}
                    image={{ src: serviceHeroImage, alt: `${serviceName} ${isRTL ? 'صورة توضيحية' : 'visual preview'}` }}
                    metrics={heroMetrics}
                    modes={heroModes}
                    protocols={heroProtocols}
                    primaryCta={{ label: L.start, href: localePath(locale, '/contact') }}
                    secondaryCta={{ label: L.pricing, href: localePath(locale, '/pricing') }}
                    visualCaption={categoryName}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />
            )}

            {webappContent?.features ? (
                <WebAppFeatures content={webappContent.features[webappLocale]} dir={isRTL ? 'rtl' : 'ltr'} />
            ) : null}

            {websiteContent?.features ? (
                <FeaturesBento content={websiteContent.features[serviceLocale]} dir={isRTL ? 'rtl' : 'ltr'} />
            ) : null}

            {websiteContent ? (
                <>
                    <ProcessOverview serviceName={serviceName} locale={serviceLocale} dir={isRTL ? 'rtl' : 'ltr'} ctaHref={localePath(locale, '/contact')} />
                    {websiteProjects.length > 0 ? (
                        <ProjectsShowcase
                            projects={websiteProjects}
                            locale={serviceLocale}
                            dir={isRTL ? 'rtl' : 'ltr'}
                            projectHref={(id) => localePath(locale, `/projects/${id}`)}
                        />
                    ) : null}
                    <TestimonialsMarquee locale={serviceLocale} dir={isRTL ? 'rtl' : 'ltr'} />
                    {websiteFaq ? (
                        <FaqAccordion eyebrow={websiteFaq.eyebrow} heading={websiteFaq.heading} subheading={websiteFaq.subheading} items={websiteFaq.items} dir={isRTL ? 'rtl' : 'ltr'} />
                    ) : null}
                </>
            ) : null}

            {webappContent ? (
                <>
                    <WebAppProcess content={webappContent.process[webappLocale]} dir={isRTL ? 'rtl' : 'ltr'} ctaHref={localePath(locale, '/contact')} />
                    {webappProjects.length > 0 ? (
                        <ProjectsShowcase
                            projects={webappProjects}
                            locale={webappLocale}
                            dir={isRTL ? 'rtl' : 'ltr'}
                            projectHref={(id) => localePath(locale, `/projects/${id}`)}
                            eyebrow={isRTL ? 'أعمالنا' : 'Our work'}
                            heading={isRTL ? 'تطبيقات ومنصات نفّذناها' : 'Applications & platforms we’ve built'}
                            sub={isRTL ? 'تطبيقات ويب حقيقية صمّمناها وبنيناها وأطلقناها لعملاء.' : 'Real web applications we’ve designed, built, and launched for clients.'}
                        />
                    ) : null}
                    <TestimonialsMarquee locale={webappLocale} dir={isRTL ? 'rtl' : 'ltr'} />
                    {webappFaq ? (
                        <FaqAccordion eyebrow={webappFaq.eyebrow} heading={webappFaq.heading} subheading={webappFaq.subheading} items={webappFaq.items} dir={isRTL ? 'rtl' : 'ltr'} />
                    ) : null}
                </>
            ) : null}

            {/* Website and interactive-web-app sub-services use the new bespoke
                sections above + the contact section below; the shared-template
                depth here is hidden for them to keep the page lean (and avoid a
                duplicate FAQ). Every other service still gets the full template. */}
            {!websiteContent && !webappContent && (
            <>
            <section className="relative px-4 py-14 sm:px-6 lg:px-8 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-px border border-eerie bg-eerie lg:grid-cols-2">
                        <article className="bg-white p-7 md:p-8">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-eerie bg-[#eef7ff]">
                                <HelpCircle className="h-5 w-5 text-sky-700" aria-hidden="true" />
                            </div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${profile.accent}`}>{L.problem}</p>
                            <h2 className="text-2xl font-black leading-tight text-eerie md:text-3xl">{L.problem}</h2>
                            <p className="mt-4 text-base font-semibold leading-8 text-neutral-700">{problemCopy}</p>
                        </article>

                        <article className="bg-[#f8fbff] p-7 md:p-8">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-eerie bg-eerie">
                                <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
                            </div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${profile.accent}`}>{L.solution}</p>
                            <h2 className="text-2xl font-black leading-tight text-eerie md:text-3xl">{L.solution}</h2>
                            <p className="mt-4 text-base font-semibold leading-8 text-neutral-700">{solutionCopy}</p>
                        </article>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="border border-eerie/10 bg-white p-7 shadow-sm">
                            <div className={`mb-4 flex h-12 w-12 items-center justify-center border border-eerie/10 ${profile.tint}`}>
                                <Sparkles className={`h-5 w-5 ${profile.accent}`} aria-hidden="true" />
                            </div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${profile.accent}`}>{L.answerTitle}</p>
                            <h2 className="text-2xl font-black text-eerie md:text-3xl">{serviceName}</h2>
                            <p className="mt-4 text-base font-semibold leading-8 text-neutral-700">{shortAnswer}</p>
                        </div>

                        <div className="border border-eerie/10 bg-white/76 p-7">
                            <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">{L.bestFor}</h2>
                            <div className="grid gap-3">
                                {L.bestForItems.map((item) => (
                                    <div key={item} className="flex gap-3 border border-neutral-200 bg-white p-4">
                                        <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${profile.accent}`} aria-hidden="true" />
                                        <p className="text-sm font-semibold leading-7 text-neutral-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 grid gap-4 md:grid-cols-[0.45fr_1fr] md:items-end">
                        <div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${profile.accent}`}>{categoryName}</p>
                            <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">{L.features}</h2>
                        </div>
                        <p className="max-w-3xl text-base font-semibold leading-8 text-neutral-700">
                            {isRTL ? 'كل جزء في الصفحة مصمم ليخدم نتيجة عمل واضحة: تجربة أفضل، تشغيل أسرع، وملكية أوضح بعد الإطلاق.' : 'Every part of the page is shaped around a business outcome: better customer experience, faster operations, and clearer ownership after launch.'}
                        </p>
                    </div>

                    <div className="grid gap-px border border-eerie bg-eerie lg:grid-cols-3">
                        <article className="bg-white p-7">
                            <CheckCircle2 className="mb-5 h-8 w-8 text-sky-700" aria-hidden="true" />
                            <h3 className="mb-5 text-2xl font-black text-eerie">{L.features}</h3>
                            <ul className="space-y-3">
                                {featureList.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-sm font-semibold leading-7 text-neutral-700">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-sky-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article className="bg-[#f8fbff] p-7">
                            <Layers className="mb-5 h-8 w-8 text-indigo-700" aria-hidden="true" />
                            <h3 className="mb-5 text-2xl font-black text-eerie">{L.outcomes}</h3>
                            <ul className="space-y-3">
                                {outcomeList.map((outcome) => (
                                    <li key={outcome} className="flex gap-3 text-sm font-semibold leading-7 text-neutral-700">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-indigo-600" aria-hidden="true" />
                                        {outcome}
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article className="bg-white p-7">
                            <Database className="mb-5 h-8 w-8 text-eerie" aria-hidden="true" />
                            <h3 className="mb-5 text-2xl font-black text-eerie">{L.technologies}</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((technology) => (
                                    <span key={technology} className="border border-neutral-200 bg-[#f4f1f8] px-3 py-1.5 text-sm font-black text-neutral-700">
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center border border-eerie bg-[#eef7ff]">
                            <Layers className="h-5 w-5 text-primary-700" />
                        </div>
                        <h2 className="text-3xl font-black tracking-normal text-eerie md:text-4xl">{L.deliverables}</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {L.deliverablesItems.map((item, index) => (
                            <article key={item.title} className="border border-neutral-200 bg-lavender p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_rgba(27,27,35,0.12)]">
                                <div className="mb-5 text-sm font-black text-primary-700">{String(index + 1).padStart(2, '0')}</div>
                                <h3 className="text-xl font-black text-eerie">{item.title}</h3>
                                <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative border-y border-eerie/10 bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 grid gap-6 lg:grid-cols-[0.44fr_1fr] lg:items-end">
                        <div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${profile.accent}`}>{L.maturity}</p>
                            <h2 className="text-3xl font-black text-eerie md:text-4xl">{L.process}</h2>
                        </div>
                        <p className="max-w-3xl border-s-4 border-sky-600 bg-[#f4f1f8] px-5 py-4 text-sm font-semibold leading-7 text-neutral-700">
                            {L.maturityNote}
                        </p>
                    </div>
                    <div className="grid gap-px border border-eerie bg-eerie sm:grid-cols-2 lg:grid-cols-7">
                        {L.processSteps.map((step, index) => {
                            const Icon = processIcons[index] || Workflow
                            return (
                                <article key={step} className="min-h-48 bg-[#f4f1f8] p-5 transition-colors duration-200 hover:bg-white">
                                    <div className="mb-8 flex items-center justify-between gap-3">
                                        <Icon className="h-5 w-5 text-sky-700" aria-hidden="true" />
                                        <span className="font-mono text-xs font-black text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="text-lg font-black leading-tight text-eerie">{step}</h3>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 bg-eerie px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                                <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
                                {L.useCases}
                            </div>
                            <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">{L.useCases}</h2>
                        </div>
                        <p className="max-w-2xl text-sm font-semibold leading-7 text-neutral-700">
                            {isRTL ? 'أمثلة عملية لما يمكن أن تنتجه هذه الخدمة حسب حجم الشركة، السوق، ونضج العمليات الحالي.' : 'Practical examples of what this service can produce depending on company size, market, and current operating maturity.'}
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {useCaseItems.map((item, index) => (
                            <article key={item.title} className="min-h-64 border border-eerie/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_rgba(2,132,199,0.14)]">
                                <div className="mb-10 flex items-center justify-between gap-3">
                                    <MonitorCheck className="h-5 w-5 text-sky-700" aria-hidden="true" />
                                    <span className="font-mono text-xs font-black text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-xl font-black leading-tight text-eerie">{item.title}</h3>
                                <p className="mt-4 text-sm font-semibold leading-7 text-neutral-700">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative border-y border-eerie/10 bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-start">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 border border-eerie bg-[#f4f1f8] px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-eerie">
                            <Network className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
                            {L.markets}
                        </div>
                        <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">{L.markets}</h2>
                        <p className="mt-4 text-sm font-semibold leading-7 text-neutral-700">
                            {isRTL ? 'نربط الخدمة بصفحات الأسواق النهائية حتى يفهم الزائر اللغة، العملة، والسياق المحلي المناسب.' : 'We connect service detail pages to final market pages so visitors can choose the language, currency, and local context that fits.'}
                        </p>
                    </div>
                    <div className="grid gap-px border border-eerie bg-eerie sm:grid-cols-2 lg:grid-cols-3">
                        {marketLinks.map((country) => (
                            <Link
                                key={country.slug}
                                href={isRTL ? country.arabicUrl : country.englishUrl}
                                className="group bg-[#f4f1f8] p-5 transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-base font-black text-eerie">{isRTL ? country.countryNameArabic : country.countryNameEnglish}</span>
                                    <span className="border border-neutral-200 bg-white px-2 py-1 text-[11px] font-black text-neutral-600">{country.currency}</span>
                                </div>
                                <p className="mt-3 line-clamp-2 text-xs font-semibold leading-6 text-neutral-600">
                                    {country.content[locale as 'ar' | 'en'].primaryKeyword}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                                    {isRTL ? 'صفحة السوق' : 'Market page'}
                                    <ArrowRight className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {relatedServices.length > 0 && (
                <section className="relative px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-3 text-sm font-black uppercase tracking-wider text-primary-700">{categoryName}</p>
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">{L.related}</h2>
                            </div>
                            <Link href={localePath(locale, '/services')} className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900">
                                {L.allServices}
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {relatedServices.map((relatedService) => (
                                <Link
                                    key={relatedService.slug}
                                    href={localePath(locale, `/services/${relatedService.slug}`)}
                                    className="group flex min-h-44 flex-col justify-between border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-[7px_7px_0_rgba(27,27,35,0.12)]"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-950">{localizedServiceValue(relatedService.name, locale)}</h3>
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">{localizedServiceValue(relatedService.description, locale)}</p>
                                    </div>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                                        {L.start}
                                        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <HelpCircle className="w-6 h-6 text-primary-700" />
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{L.faqs}</h2>
                    </div>
                    <div className="space-y-4">
                        {service.faqs.map((faq) => (
                            <div key={faq.question.en} className="border border-neutral-200 bg-white p-6">
                                <h3 className="mb-3 text-lg font-black text-eerie">{localizedServiceValue(faq.question, locale)}</h3>
                                <p className="text-base font-semibold leading-8 text-neutral-700">{localizedServiceValue(faq.answer, locale)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </>
            )}

            {serviceTiers.length > 0 && (
                <CreativePricing
                    tag={categoryName || L.packages}
                    title={`${serviceName}: ${L.packageTitle}`}
                    description={L.packageDescription}
                    tiers={serviceTiers}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="bg-[#f4f1f8] py-16 md:py-20"
                />
            )}

            {!websiteContent && !webappContent && (
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-eerie overflow-hidden" data-header-theme="dark">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18), transparent 60%)' }}
                />
                <div className="relative mx-auto max-w-3xl text-center">
                    <h2 className="mb-5 text-3xl font-black text-white md:text-5xl">{L.readyTitle}</h2>
                    <p className="mb-8 text-lg font-semibold leading-8 text-white/75">{L.readyDesc}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href={localePath(locale, '/contact')} className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 font-black text-neutral-900 transition-colors hover:bg-cyan-100">
                            {L.start}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link href={whatsAppUrl} className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 font-black text-white transition-colors hover:bg-white/10">
                            <MessageCircle className="w-4 h-4" />
                            {L.whatsapp}
                        </Link>
                        <Link href={localePath(locale, '/pricing')} className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 font-black text-white transition-colors hover:bg-white/10">
                            <CircleDollarSign className="w-4 h-4" />
                            {L.pricing}
                        </Link>
                    </div>
                </div>
            </section>
            )}

            {(websiteContent || webappContent) ? (
                <ContactFast serviceName={serviceName} locale={serviceLocale} dir={isRTL ? 'rtl' : 'ltr'} />
            ) : null}
        </main>
    )
}
