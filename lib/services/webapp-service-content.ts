import type { WebAppHeroContent } from '@/components/ui/webapp-hero'

export type WebAppLocale = 'en' | 'ar'

export type WebAppServiceContent = {
    hero: Record<WebAppLocale, WebAppHeroContent>
}

export const webappServiceContent: Record<string, WebAppServiceContent> = {

    // ─────────────────────────────────────────────────────────────
    // 1. Custom Web Application Development
    // ─────────────────────────────────────────────────────────────
    'custom-web-application-development': {
        hero: {
            en: {
                badge: 'Custom Web Apps',
                titleLine1: 'Built Around',
                titleLine2: 'Your Exact Workflow',
                subtitle:
                    'Bespoke web applications designed for how your business actually operates — scalable, fully owned, and built to last.',
                primaryCta: { label: 'Start Your Project', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'Code Ownership', value: '100%' },
                        { label: 'Uptime SLA', value: '99.9%' },
                        { label: 'Build Timeline', value: '6–10 wks' },
                        { label: 'Support', value: '24 / 7' },
                    ],
                    chartBars: [40, 52, 44, 68, 58, 82, 90],
                },
                techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
            },
            ar: {
                badge: 'تطبيقات ويب مخصصة',
                titleLine1: 'مبنية حول',
                titleLine2: 'سير عملك الفعلي',
                subtitle:
                    'تطبيقات ويب مصممة لكيفية عمل شركتك فعلياً — قابلة للتوسع، تملكها بالكامل، ومبنية لتدوم.',
                primaryCta: { label: 'ابدأ مشروعك', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'ملكية الكود', value: '100%' },
                        { label: 'وقت التشغيل', value: '99.9%' },
                        { label: 'وقت البناء', value: '6–10 أسابيع' },
                        { label: 'الدعم', value: '24 / 7' },
                    ],
                    chartBars: [40, 52, 44, 68, 58, 82, 90],
                },
                techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 2. Client Portals
    // ─────────────────────────────────────────────────────────────
    'client-portals': {
        hero: {
            en: {
                badge: 'Client Portals',
                titleLine1: 'Your Clients,',
                titleLine2: 'Always in the Loop',
                subtitle:
                    'Secure, branded portals where clients track projects, view invoices, download reports, and stay updated — no email chains needed.',
                primaryCta: { label: 'Build My Portal', href: '#contact' },
                secondaryCta: { label: 'See Examples', href: '/projects' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'Active Clients', value: '48' },
                        { label: 'Docs Shared', value: '312' },
                        { label: 'Avg Session', value: '8 min' },
                        { label: 'Client NPS', value: '9.2 / 10' },
                    ],
                    chartBars: [50, 62, 54, 78, 68, 88, 85],
                },
                techStack: ['React', 'Auth.js', 'Prisma', 'Supabase', 'Stripe', 'Vercel'],
            },
            ar: {
                badge: 'بوابات العملاء',
                titleLine1: 'عملاؤك،',
                titleLine2: 'دائماً على اطلاع كامل',
                subtitle:
                    'بوابات آمنة بهوية علامتك التجارية حيث يتابع العملاء المشاريع والفواتير والتقارير — دون مطاردة الرسائل.',
                primaryCta: { label: 'ابنِ بوابتي', href: '#contact' },
                secondaryCta: { label: 'أمثلة', href: '/projects' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'العملاء النشطون', value: '48' },
                        { label: 'المستندات المشتركة', value: '312' },
                        { label: 'متوسط الجلسة', value: '8 دقائق' },
                        { label: 'NPS العملاء', value: '9.2 / 10' },
                    ],
                    chartBars: [50, 62, 54, 78, 68, 88, 85],
                },
                techStack: ['React', 'Auth.js', 'Prisma', 'Supabase', 'Stripe', 'Vercel'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 3. Admin Dashboards
    // ─────────────────────────────────────────────────────────────
    'admin-dashboards': {
        hero: {
            en: {
                badge: 'Admin Dashboards',
                titleLine1: 'Full Control,',
                titleLine2: 'At a Single Glance',
                subtitle:
                    'Real-time dashboards that turn raw data into decisions — custom-built around your KPIs, your team, and your operations.',
                primaryCta: { label: 'Build My Dashboard', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'admin.yourcompany.io',
                    metrics: [
                        { label: 'Revenue (MTD)', value: '$42k' },
                        { label: 'Active Users', value: '1,204' },
                        { label: 'Tasks Done', value: '98%' },
                        { label: 'Open Alerts', value: '0' },
                    ],
                    chartBars: [54, 44, 68, 58, 78, 74, 94],
                },
                techStack: ['React', 'Recharts', 'Supabase', 'PostgreSQL', 'REST API', 'Vercel'],
            },
            ar: {
                badge: 'لوحات التحكم الإدارية',
                titleLine1: 'سيطرة كاملة،',
                titleLine2: 'بنظرة واحدة',
                subtitle:
                    'لوحات بيانات آنية تحوّل الأرقام الخام إلى قرارات — مبنية حول مؤشراتك ومعاملاتك وفريقك.',
                primaryCta: { label: 'ابنِ لوحتي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'admin.yourcompany.io',
                    metrics: [
                        { label: 'الإيراد (هذا الشهر)', value: '42k$' },
                        { label: 'المستخدمون النشطون', value: '1,204' },
                        { label: 'المهام المنجزة', value: '98%' },
                        { label: 'التنبيهات المفتوحة', value: '0' },
                    ],
                    chartBars: [54, 44, 68, 58, 78, 74, 94],
                },
                techStack: ['React', 'Recharts', 'Supabase', 'PostgreSQL', 'REST API', 'Vercel'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 4. Booking Platforms
    // ─────────────────────────────────────────────────────────────
    'booking-platforms': {
        hero: {
            en: {
                badge: 'Booking Platforms',
                titleLine1: 'Reservations',
                titleLine2: 'On Autopilot',
                subtitle:
                    'Online booking systems that fill your calendar, send automatic confirmations, and cut no-shows — without a single phone call.',
                primaryCta: { label: 'Build My Booking System', href: '#contact' },
                secondaryCta: { label: 'See Examples', href: '/projects' },
                card: {
                    windowTitle: 'book.yourcompany.io',
                    metrics: [
                        { label: 'Bookings Today', value: '23' },
                        { label: 'Revenue (Week)', value: '$8,400' },
                        { label: 'No-show Rate', value: '2%' },
                        { label: 'Reminders', value: 'Auto' },
                    ],
                    chartBars: [58, 72, 48, 84, 62, 88, 78],
                },
                techStack: ['React', 'FullCalendar', 'Stripe', 'Node.js', 'PostgreSQL', 'Twilio'],
            },
            ar: {
                badge: 'منصات الحجز',
                titleLine1: 'الحجوزات',
                titleLine2: 'على الطيار الآلي',
                subtitle:
                    'أنظمة حجز إلكترونية تملأ تقويمك وترسل التأكيدات تلقائياً وتقلل من حالات عدم الحضور — بلا مكالمات.',
                primaryCta: { label: 'ابنِ نظام حجزي', href: '#contact' },
                secondaryCta: { label: 'أمثلة', href: '/projects' },
                card: {
                    windowTitle: 'book.yourcompany.io',
                    metrics: [
                        { label: 'الحجوزات اليوم', value: '23' },
                        { label: 'الإيراد (الأسبوع)', value: '8,400$' },
                        { label: 'معدل الغياب', value: '2%' },
                        { label: 'التذكيرات', value: 'تلقائية' },
                    ],
                    chartBars: [58, 72, 48, 84, 62, 88, 78],
                },
                techStack: ['React', 'FullCalendar', 'Stripe', 'Node.js', 'PostgreSQL', 'Twilio'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 5. Internal Business Tools
    // ─────────────────────────────────────────────────────────────
    'internal-business-tools': {
        hero: {
            en: {
                badge: 'Internal Tools',
                titleLine1: 'Workflows That',
                titleLine2: 'Actually Work',
                subtitle:
                    'Replace spreadsheets and repetitive manual tasks with tools your team uses every day — simple, fast, zero training needed.',
                primaryCta: { label: 'Build My Tool', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'tools.yourcompany.io',
                    metrics: [
                        { label: 'Processes Automated', value: '12' },
                        { label: 'Hours Saved / Mo', value: '40 h' },
                        { label: 'Team Adoption', value: '94%' },
                        { label: 'Error Reduction', value: '−87%' },
                    ],
                    chartBars: [28, 38, 50, 62, 70, 82, 92],
                },
                techStack: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Webhooks', 'Vercel'],
            },
            ar: {
                badge: 'أدوات الأعمال الداخلية',
                titleLine1: 'سير عمل',
                titleLine2: 'يعمل فعلاً',
                subtitle:
                    'استبدل الجداول اليدوية والمهام المتكررة بأدوات يستخدمها فريقك يومياً — بسيطة وسريعة ولا تحتاج تدريباً.',
                primaryCta: { label: 'ابنِ أداتي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'tools.yourcompany.io',
                    metrics: [
                        { label: 'العمليات المؤتمتة', value: '12' },
                        { label: 'ساعات موفرة/شهر', value: '40 ساعة' },
                        { label: 'تبني الفريق', value: '94%' },
                        { label: 'تقليل الأخطاء', value: '−87%' },
                    ],
                    chartBars: [28, 38, 50, 62, 70, 82, 92],
                },
                techStack: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Webhooks', 'Vercel'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 6. SaaS MVP Development
    // ─────────────────────────────────────────────────────────────
    'saas-mvp-development': {
        hero: {
            en: {
                badge: 'SaaS MVP',
                titleLine1: 'From Idea',
                titleLine2: 'To First Paying Users',
                subtitle:
                    'Launch your SaaS product in weeks, not months — built for growth, designed for conversion, structured for investment.',
                primaryCta: { label: 'Launch My MVP', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'app.yourproduct.io',
                    metrics: [
                        { label: 'Launch Timeline', value: '8 wks' },
                        { label: 'Auth + Billing', value: 'Included' },
                        { label: 'Active Trials', value: 'Live' },
                        { label: 'Churn Rate', value: '< 5%' },
                    ],
                    chartBars: [18, 28, 40, 54, 64, 78, 94],
                },
                techStack: ['React', 'Next.js', 'Stripe', 'Supabase', 'TypeScript', 'Vercel'],
            },
            ar: {
                badge: 'SaaS MVP',
                titleLine1: 'من فكرة',
                titleLine2: 'إلى أول عميل يدفع',
                subtitle:
                    'أطلق منتجك SaaS في أسابيع لا أشهر — مبني للنمو، مصمم للتحويل، ومهيأ للاستثمار.',
                primaryCta: { label: 'أطلق MVP الخاص بي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'app.yourproduct.io',
                    metrics: [
                        { label: 'وقت الإطلاق', value: '8 أسابيع' },
                        { label: 'المصادقة والفوترة', value: 'مضمّنة' },
                        { label: 'التجارب النشطة', value: 'مباشر' },
                        { label: 'معدل التسرب', value: '< 5%' },
                    ],
                    chartBars: [18, 28, 40, 54, 64, 78, 94],
                },
                techStack: ['React', 'Next.js', 'Stripe', 'Supabase', 'TypeScript', 'Vercel'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 7. Progressive Web App Development
    // ─────────────────────────────────────────────────────────────
    'progressive-web-app-development': {
        hero: {
            en: {
                badge: 'Progressive Web Apps',
                titleLine1: 'The Web,',
                titleLine2: 'App-Grade Performance',
                subtitle:
                    'Fast, installable web experiences that load instantly and work offline — built once, running everywhere your users find you.',
                primaryCta: { label: 'Build My PWA', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'pwa.yourcompany.io',
                    metrics: [
                        { label: 'Load Time', value: '0.8 s' },
                        { label: 'Lighthouse Score', value: '98 / 100' },
                        { label: 'Offline Mode', value: '✓ Yes' },
                        { label: 'Install Rate', value: '34%' },
                    ],
                    chartBars: [68, 72, 78, 76, 84, 90, 98],
                },
                techStack: ['Next.js', 'Workbox', 'TypeScript', 'IndexedDB', 'Web Push', 'Vercel'],
            },
            ar: {
                badge: 'تطبيقات الويب التقدمية',
                titleLine1: 'الويب،',
                titleLine2: 'بأداء مستوى التطبيق',
                subtitle:
                    'تجارب ويب سريعة وقابلة للتثبيت تحمّل فوراً وتعمل بدون إنترنت — مبنية مرة واحدة، تعمل في كل مكان.',
                primaryCta: { label: 'ابنِ تطبيقي التقدمي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'pwa.yourcompany.io',
                    metrics: [
                        { label: 'وقت التحميل', value: '0.8 ثانية' },
                        { label: 'درجة Lighthouse', value: '98 / 100' },
                        { label: 'وضع بدون إنترنت', value: '✓ نعم' },
                        { label: 'معدل التثبيت', value: '34%' },
                    ],
                    chartBars: [68, 72, 78, 76, 84, 90, 98],
                },
                techStack: ['Next.js', 'Workbox', 'TypeScript', 'IndexedDB', 'Web Push', 'Vercel'],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 8. Mobile App Development (listed under interactive-web-apps)
    // ─────────────────────────────────────────────────────────────
    'mobile-app-development': {
        hero: {
            en: {
                badge: 'Mobile App Development',
                titleLine1: 'iOS & Android,',
                titleLine2: 'Done Right',
                subtitle:
                    'Cross-platform mobile apps your users will love using — fast, polished, and live in both app stores within weeks.',
                primaryCta: { label: 'Start My App', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'yourapp — App Store',
                    metrics: [
                        { label: 'Platforms', value: 'iOS + Android' },
                        { label: 'Target Rating', value: '4.8 ★' },
                        { label: 'Launch Timeline', value: '10–14 wks' },
                        { label: 'Shared Codebase', value: '~90%' },
                    ],
                    chartBars: [44, 54, 58, 68, 74, 84, 90],
                },
                techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase', 'App Store'],
            },
            ar: {
                badge: 'تطوير تطبيقات الجوال',
                titleLine1: 'iOS وAndroid،',
                titleLine2: 'بالطريقة الصحيحة',
                subtitle:
                    'تطبيقات جوال متعددة المنصات يستمتع مستخدموك باستخدامها — سريعة ومصقولة ومنشورة على المتجرين.',
                primaryCta: { label: 'ابدأ تطبيقي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'yourapp — App Store',
                    metrics: [
                        { label: 'المنصات', value: 'iOS + Android' },
                        { label: 'التقييم المستهدف', value: '4.8 ★' },
                        { label: 'وقت الإطلاق', value: '10–14 أسبوع' },
                        { label: 'قاعدة الكود المشتركة', value: '~90%' },
                    ],
                    chartBars: [44, 54, 58, 68, 74, 84, 90],
                },
                techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase', 'App Store'],
            },
        },
    },
}

export function getWebappServiceContent(slug: string): WebAppServiceContent | null {
    return webappServiceContent[slug] ?? null
}

export function asWebAppLocale(locale: string): WebAppLocale {
    return locale === 'ar' ? 'ar' : 'en'
}
