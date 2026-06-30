import type { DPGroup } from './digital-presence'

/**
 * CloudTopia — Web Applications, restructured.
 * Core engineering capabilities (4 focused pillars) + a standalone Media &
 * Streaming page. The old per-industry vertical pillars were removed — the
 * Industries section covers verticals — keeping only Media & Streaming.
 * Category id: 'interactive-web-applications'. Sub-services are listed on each
 * pillar page (no individual sub-pages).
 */

const t = (en: string, ar: string) => ({ en, ar })

export const webApplicationsGroups: DPGroup[] = [
    {
        slug: 'core-web-app-development',
        tagline: t('Build & engineer', 'البناء والهندسة'),
        name: t('Core Web App Development', 'تطوير تطبيقات الويب الأساسية'),
        pillars: [
            {
                slug: 'custom-saas-mvp-development',
                name: t('Custom SaaS & MVP Development', 'تطوير SaaS وMVP مخصص'),
                description: t('Launch-ready SaaS products and startup MVPs, multi-tenant and billing-ready.', 'منتجات SaaS وMVP جاهزة للإطلاق، متعددة المستأجرين وجاهزة للفوترة.'),
                icon: '/icons/services/Admin Dashboard.png',
                href: '/services/custom-saas-mvp-development',
                subServices: [
                    'Minimum Viable Product (MVP) Development for Startups',
                    'Software-as-a-Service (SaaS) Platform Architecture',
                    'Multi-Tenant Application Architecture',
                    'Subscription-Based Product Development (Stripe Billing)',
                ],
            },
            {
                slug: 'full-stack-web-engineering',
                name: t('Full-Stack Web Engineering', 'هندسة ويب متكاملة'),
                description: t('Front-end and back-end engineering, APIs, and integrations with clean, scalable architecture.', 'هندسة الواجهة الأمامية والخلفية وواجهات API والتكاملات ببنية نظيفة قابلة للتوسّع.'),
                icon: '/icons/services/webapps.png',
                href: '/services/full-stack-web-engineering',
                subServices: [
                    'Next.js & React Front-End Engineering',
                    'Node.js, Python & PHP/Laravel Back-End Engineering',
                    'Single & Multi-Page Application Development',
                    'Progressive Web App (PWA) Development',
                    'Database Architecture & Data Modeling',
                    'Custom API, Third-Party Integrations & Payment/SSO Setup',
                ],
            },
            {
                slug: 'interactive-portals-dashboards',
                name: t('Interactive Portals & Dashboards', 'بوابات ولوحات تفاعلية'),
                description: t('Client portals, admin panels, and data dashboards with role-based access.', 'بوابات عملاء ولوحات إدارة وتحليلات بصلاحيات حسب الأدوار.'),
                icon: '/icons/services/Customer Portal.png',
                href: '/services/interactive-portals-dashboards',
                subServices: [
                    'Custom Client & Customer Portals',
                    'Admin Dashboards & Control Panels',
                    'Data Visualization & Interactive Charting',
                    'Role-Based Access Control & Permissions',
                    'File Upload & Document Management Modules',
                ],
            },
            {
                slug: 'application-modernization-performance',
                name: t('App Modernization, Security & Maintenance', 'تحديث التطبيقات والأمان والصيانة'),
                description: t('Refactor, secure, test, deploy, and monitor your web apps for the long run.', 'إعادة هيكلة وتأمين واختبار ونشر ومراقبة تطبيقاتك على المدى الطويل.'),
                icon: '/icons/services/Analytics Dashboard.png',
                href: '/services/application-modernization-performance',
                subServices: [
                    'Legacy Application Refactoring & Rewrites',
                    'Monolith to Microservices Migration',
                    'Web App Speed & Core Web Vitals Optimization',
                    'End-to-End Automated Testing & QA',
                    'Security Auditing & Vulnerability Patching',
                    'Deployment Pipelines & 24/7 Monitoring',
                ],
            },
        ],
    },
    {
        slug: 'specialized-platforms',
        tagline: t('Specialized', 'متخصص'),
        name: t('Media & Streaming', 'الإعلام والبث'),
        pillars: [
            {
                slug: 'media-entertainment-streaming',
                name: t('Media, Entertainment & Streaming', 'الإعلام والترفيه والبث'),
                description: t('VoD/OTT platforms, live streaming, and creator-monetization web apps.', 'منصات بث ومحتوى عند الطلب وبث مباشر وتطبيقات تحقيق دخل للصنّاع.'),
                icon: '/icons/services/Real-time Chat System.png',
                href: '/services/media-entertainment-streaming',
                subServices: [],
            },
        ],
    },
]
