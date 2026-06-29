import type { LocalizedText } from '@/lib/seo/industries'

/**
 * CloudTopia — Digital Presence, restructured business model.
 *
 * Four customer-journey GROUPS → PILLAR services → SUB-SERVICES.
 *   Build owned assets → Get found → Engage & convert → Grow & retain
 *
 * This is the single source of truth for the new Digital Presence taxonomy.
 * Existing flat services (business-website, real-estate-website, social-media,
 * SEO, content, analytics…) are merged in here as sub-services — none deleted,
 * duplicates folded in. The old "Digital Growth Support" category is absorbed.
 *
 * Phasing (per product decision):
 *   - PILLARS get full pages now (href below; existing standalone pages reused).
 *   - SUB-SERVICES are listed on their pillar page; each only graduates to its
 *     own /services/[slug] page once it has unique, substantive content.
 *
 * Arabic copy is provided for groups + pillars. Sub-service Arabic localization
 * is a tracked follow-up (kept English-first here to land the structure first).
 */

const t = (en: string, ar: string): LocalizedText => ({ en, ar })

export type DPPillar = {
    slug: string
    name: LocalizedText
    description: LocalizedText
    icon: string
    /** Pillar landing page. Reuses existing standalone pages where they exist. */
    href: string
    subServices: string[]
}

export type DPGroup = {
    slug: string
    /** Journey phase, e.g. "Build owned assets". */
    tagline: LocalizedText
    name: LocalizedText
    pillars: DPPillar[]
}

export const digitalPresenceGroups: DPGroup[] = [
    {
        slug: 'core-foundation',
        tagline: t('Build owned assets', 'بناء الأصول المملوكة'),
        name: t('The Core Foundation', 'الأساس الجوهري'),
        pillars: [
            {
                slug: 'website-development',
                name: t('Website Development', 'تطوير المواقع'),
                description: t(
                    'Custom, conversion-focused websites built and owned by your business.',
                    'مواقع مخصصة تركّز على التحويل، مبنية ومملوكة لشركتك.'),
                icon: '/icons/services/Website Design & Development.png',
                href: '/website-development',
                subServices: [
                    'Corporate Website Development', 'Business Website Development', 'Landing Page Development',
                    'Real Estate Website Development', 'Educational & LMS Website Development',
                    'Healthcare & Medical Website Development', 'Restaurant & Hospitality Website Development',
                    'Multilingual & RTL Website Development', 'Headless CMS Implementation', 'Third-Party API Integration',
                    'Website Speed & Performance Optimization', 'Website Redesign & Modernization',
                    'Website Maintenance & Support', 'Web Hosting & Security Management',
                ],
            },
            {
                slug: 'ecommerce-development',
                name: t('E-Commerce Development', 'تطوير المتاجر الإلكترونية'),
                description: t(
                    'Online stores and marketplaces built to sell, scale, and integrate.',
                    'متاجر ومنصات تجارة إلكترونية مبنية للبيع والتوسّع والتكامل.'),
                icon: '/icons/services/E-commerce Solutions.png',
                href: '/ecommerce-development',
                subServices: [
                    'Custom E-Commerce Development', 'Shopify Store Development', 'WooCommerce Store Development',
                    'Headless E-Commerce Development', 'Multi-Vendor Marketplace Development',
                    'E-Commerce Redesign & Migration', 'Payment Gateway Integration',
                    'Shipping & Fulfillment Automation Setup', 'Cart Abandonment Recovery Systems',
                    'B2B Wholesale Portal Development', 'POS (Point of Sale) Integration',
                    'Product Information Management (PIM) Setup',
                ],
            },
            {
                slug: 'ui-ux-design-branding',
                name: t('UI/UX Design & Branding', 'تصميم الواجهات والهوية'),
                description: t(
                    'Brand identity and interface design that make the product feel trustworthy.',
                    'هوية بصرية وتصميم واجهات يمنحان المنتج مصداقية وثقة.'),
                icon: '/icons/services/Corporate Visual Identity Design.png',
                href: '/services/ui-ux-design-branding',
                subServices: [
                    'Brand Strategy & Positioning', 'Corporate Rebranding Strategy', 'Logo & Visual Identity Design',
                    'Brand Guidelines & Brand Book Creation', 'Motion Graphics & Web Animations',
                    'UI (User Interface) Design', 'UX (User Experience) Design & Wireframing',
                    'UX Audits & Usability Testing', 'Mobile & Web App Interface Design', 'Social Media Kit & Assets Design',
                ],
            },
        ],
    },
    {
        slug: 'visibility-discoverability',
        tagline: t('Get found', 'كن مرئياً'),
        name: t('Visibility & Discoverability', 'الظهور وسهولة الاكتشاف'),
        pillars: [
            {
                slug: 'search-engine-optimization',
                name: t('Search Engine Optimization (SEO)', 'تحسين محركات البحث'),
                description: t('Technical, on-page, and off-page SEO that earns durable organic traffic.', 'SEO تقني وعلى الصفحة وخارجها لجلب زيارات عضوية مستدامة.'),
                icon: '/icons/services/SEO & Search Optimization.png',
                href: '/services/search-engine-optimization',
                subServices: [
                    'Technical SEO & Indexing', 'On-Page SEO Optimization', 'Off-Page SEO & Link Building',
                    'E-Commerce SEO', 'Local & Global SEO Strategy', 'SEO Audits & Competitor Analysis',
                    'Keyword Research & Strategy', 'Multilingual & International SEO', 'Voice Search Optimization',
                    'Image & Video SEO',
                    // Absorbed from the deleted Local SEO pillar:
                    'Google Business Profile Optimization', 'Local Map Ranking Strategies',
                    '"Near Me" Search Optimization', 'Franchise & Multi-Location SEO',
                ],
            },
            {
                slug: 'answer-engine-optimization',
                name: t('Answer Engine Optimization (AEO)', 'تحسين محركات الإجابة'),
                description: t('Get cited by AI answer engines — ChatGPT, Perplexity, Google AI Overviews — and own the direct answer to your customers’ questions.', 'كن المصدر الذي تستشهد به محركات الإجابة بالذكاء الاصطناعي — ChatGPT وPerplexity ونظرات Google AI — وامتلك الإجابة المباشرة لأسئلة عملائك.'),
                icon: '/icons/services/SEO & Search Optimization.png',
                href: '/services/answer-engine-optimization',
                subServices: [],
            },
            {
                slug: 'generative-engine-optimization',
                name: t('Generative Engine Optimization (GEO)', 'تحسين المحركات التوليدية'),
                description: t('Optimize your brand to surface inside generative-AI results, so AI assistants recommend you when buyers ask.', 'هيّئ علامتك للظهور داخل نتائج الذكاء الاصطناعي التوليدي، ليُرشّحك المساعدون الأذكياء حين يسأل المشترون.'),
                icon: '/icons/services/SEO & Search Optimization.png',
                href: '/services/generative-engine-optimization',
                subServices: [],
            },
        ],
    },
    {
        slug: 'communication-engagement',
        tagline: t('Engage & convert', 'تفاعل وحوّل'),
        name: t('Growth & Engagement', 'النمو والتفاعل'),
        pillars: [
            {
                slug: 'social-media-management',
                name: t('Social Media Management (SMM)', 'إدارة وسائل التواصل الاجتماعي'),
                description: t(
                    'Strategy, content, and community management across every channel.',
                    'استراتيجية ومحتوى وإدارة مجتمع عبر كل القنوات.'),
                icon: '/icons/services/Social Media Management.png',
                href: '/social-media-marketing',
                subServices: [
                    'Social Media Strategy & Planning', 'Social Media Profile Setup', 'Content Calendar Creation',
                    'Social Media Copywriting', 'Graphic Design for Social Media',
                    'Short-Form Video Editing (Reels, TikTok, Shorts)', 'Community Management & Engagement',
                    'Influencer Outreach & Management', 'Social Media Contest & Giveaway Management',
                    'LinkedIn B2B Personal Branding', 'Social Media Analytics & Reporting',
                ],
            },
            {
                slug: 'content-marketing-authority',
                name: t('Content Marketing & Authority', 'تسويق المحتوى وبناء الريادة'),
                description: t('Content that builds authority and feeds every channel and funnel.', 'محتوى يبني الريادة ويغذّي كل قناة ومسار تحويل.'),
                icon: '/icons/services/Professional Content Creation.png',
                href: '/content-creation',
                subServices: [
                    'SEO Blog Post & Article Writing', 'Website Copywriting', 'Landing Page Copywriting',
                    'Case Study & Portfolio Writing', 'Email Newsletter Copywriting',
                    'Press Release (PR) Writing & Distribution', 'Video Scriptwriting',
                ],
            },
        ],
    },
]

/** Flat list of all Digital Presence pillar services. */
export const digitalPresencePillars = digitalPresenceGroups.flatMap((g) => g.pillars)

/** Total number of sub-services across all pillars. */
export const digitalPresenceSubServiceCount = digitalPresencePillars.reduce(
    (n, p) => n + p.subServices.length,
    0,
)

export function localizedDP(value: LocalizedText, locale: string): string {
    return locale === 'ar' ? value.ar || value.en : value.en
}

/** Pillars that have their own /services/[slug] page (the new pillars). */
export const digitalPresencePillarRoutes = digitalPresencePillars.filter((p) => p.href.startsWith('/services/'))

export function getDigitalPresencePillarBySlug(slug: string): DPPillar | null {
    return digitalPresencePillars.find((p) => p.slug === slug) ?? null
}

export function getDigitalPresenceGroupForPillar(slug: string): DPGroup | null {
    return digitalPresenceGroups.find((g) => g.pillars.some((p) => p.slug === slug)) ?? null
}
