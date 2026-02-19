'use client'

import React from 'react'
import Link from 'next/link'
import { HeroParallax } from '@/components/ui/hero-parallax'
import { HeroModern } from '@/components/ui/hero-modern'
import { HorizontalScrollCards, ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function BusinessSystemsDevelopmentPage() {
    const { dir, locale } = useLanguage()

    const content = {
        en: {
            title: "Intelligent Business Systems & Automation",
            description: "Custom-built ERP, CRM, and management solutions designed to scale with your business and optimize internal operations through intelligent automation and real-time data analytics.",
        },
        ar: {
            title: "أنظمة الأعمال الذكية والأتمتة",
            description: "حلول مخصصة لإدارة موارد المؤسسات (ERP) وعلاقات العملاء (CRM)، مصممة لتنمو مع عملك وتحسن العمليات الداخلية من خلال الأتمتة الذكية وتحليلات البيانات والتقارير المتقدمة.",
        }
    }

    const currentContent = locale === 'ar' ? content.ar : content.en

    const products = [
        {
            title: "Advanced CRM System - Customer Relationship Management",
            thumbnail: "/images/services/business-systems-development/CRM System.webp",
        },
        {
            title: "Efficient POS System - Point of Sale Solutions",
            thumbnail: "/images/services/business-systems-development/POS System.webp",
        },
        {
            title: "Smart Inventory Management - Real-time Stock Tracking",
            thumbnail: "/images/services/business-systems-development/Inventory Management.webp",
        },
        {
            title: "Automated Booking System - Efficient Scheduling",
            thumbnail: "/images/services/business-systems-development/booking system.webp",
        },
        {
            title: "Enterprise ERP Solutions - Robust Resource Planning",
            thumbnail: "/images/services/business-systems-development/1.webp",
        },
        {
            title: "Strategic Operations Management - Business Optimization",
            thumbnail: "/images/services/business-systems-development/2.webp",
        },
        {
            title: "Financial Planning Portal - Secure Accounting Tools",
            thumbnail: "/images/services/business-systems-development/3.webp",
        },
        {
            title: "Scalable SaaS Architecture - High-Performance Cloud Software",
            thumbnail: "/images/services/business-systems-development/11.avif",
        },
        {
            title: "Intelligent Data Analytics - Business Insights",
            thumbnail: "/images/services/business-systems-development/5.webp",
        },
        {
            title: "Supply Chain Logistics - Optimized Distribution",
            thumbnail: "/images/services/business-systems-development/6.webp",
        },
        {
            title: "Cloud Infrastructure Management - Scalable Systems",
            thumbnail: "/images/services/business-systems-development/9.webp",
        },
        {
            title: "Omnichannel POS Integration - Modern Retail",
            thumbnail: "/images/services/business-systems-development/POS System.webp",
        },
        {
            title: "Global Supply Chain Network - Logistics AI",
            thumbnail: "/images/services/business-systems-development/6.webp",
        },
        {
            title: "Custom CRM Workflows - Sales Automation",
            thumbnail: "/images/services/business-systems-development/CRM System.webp",
        },
        {
            title: "Warehouse Automation - AI-Driven Operations",
            thumbnail: "/images/services/business-systems-development/Inventory Management.webp",
        },
    ]

    // Business Systems Cards with same icons as services page
    const businessSystemsCards: ScrollCardItem[] = [
        {
            name: locale === 'ar' ? 'نظام إدارة علاقات العملاء' : 'CRM System',
            tagline: locale === 'ar' ? 'إدارة العملاء بذكاء' : 'Smart Customer Management',
            icon: <img src="/icons/services/CRM System.png" alt="CRM" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'نظام متكامل لإدارة علاقات العملاء، تتبع المبيعات، وأتمتة التسويق مع تقارير وتحليلات متقدمة.'
                : 'Complete CRM solution for customer relationship management, sales tracking, and marketing automation with advanced analytics.',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['إدارة جهات الاتصال والعملاء', 'تتبع مسار المبيعات', 'أتمتة التسويق', 'تقارير وتحليلات متقدمة']
                : ['Contact & Lead Management', 'Sales Pipeline Tracking', 'Marketing Automation', 'Advanced Analytics & Reports'],
        },
        {
            name: locale === 'ar' ? 'إدارة المخزون' : 'Inventory Management',
            tagline: locale === 'ar' ? 'تتبع المخزون بدقة' : 'Precise Stock Tracking',
            icon: <img src="/icons/services/Inventory Management.png" alt="Inventory" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'نظام شامل لإدارة المخزون والمستودعات مع تتبع فوري للمنتجات وتنبيهات إعادة الطلب.'
                : 'Comprehensive inventory and warehouse management system with real-time product tracking and reorder alerts.',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['تتبع المخزون في الوقت الفعلي', 'إدارة المستودعات المتعددة', 'تنبيهات إعادة الطلب', 'تقارير حركة المخزون']
                : ['Real-time Stock Tracking', 'Multi-warehouse Management', 'Auto Reorder Alerts', 'Inventory Movement Reports'],
        },
        {
            name: locale === 'ar' ? 'نظام نقاط البيع' : 'POS System',
            tagline: locale === 'ar' ? 'نقاط بيع متطورة' : 'Advanced Point of Sale',
            icon: <img src="/icons/services/POS System.png" alt="POS" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'نظام نقاط بيع سحابي متكامل مع إدارة المخزون والعملاء والتقارير المالية.'
                : 'Cloud-based POS system integrated with inventory, customer management, and financial reporting.',
            gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['معالجة سريعة للمعاملات', 'تكامل مع المخزون', 'إدارة الموظفين والنوبات', 'تقارير مالية شاملة']
                : ['Fast Transaction Processing', 'Inventory Integration', 'Staff & Shift Management', 'Financial Reports'],
        },
        {
            name: locale === 'ar' ? 'إدارة الموارد البشرية' : 'HR Management',
            tagline: locale === 'ar' ? 'إدارة فريقك بكفاءة' : 'Efficient Team Management',
            icon: <img src="/icons/services/HR Management.png" alt="HR" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'نظام شامل لإدارة الموارد البشرية من التوظيف إلى الرواتب والأداء.'
                : 'Complete HR system from recruitment to payroll and performance management.',
            gradient: "bg-gradient-to-br from-green-500 to-green-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['إدارة الموظفين والتوظيف', 'نظام الرواتب والمكافآت', 'تتبع الحضور والإجازات', 'تقييم الأداء']
                : ['Employee & Recruitment', 'Payroll & Benefits', 'Attendance & Leave Tracking', 'Performance Reviews'],
        },
        {
            name: locale === 'ar' ? 'نظام الحجوزات' : 'Booking System',
            tagline: locale === 'ar' ? 'حجوزات ذكية ومرنة' : 'Smart & Flexible Booking',
            icon: <img src="/icons/services/Booking System.png" alt="Booking" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'نظام حجوزات متكامل للخدمات والمواعيد مع تكامل التقويم والتذكيرات.'
                : 'Integrated booking system for services and appointments with calendar integration and reminders.',
            gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['حجز المواعيد عبر الإنترنت', 'تكامل التقويم', 'تذكيرات تلقائية', 'إدارة الموارد والغرف']
                : ['Online Appointment Booking', 'Calendar Integration', 'Automated Reminders', 'Resource & Room Management'],
        },
        {
            name: locale === 'ar' ? 'لوحات التحليلات' : 'Analytics Dashboard',
            tagline: locale === 'ar' ? 'رؤى أعمال متقدمة' : 'Advanced Business Insights',
            icon: <img src="/icons/services/Analytics Dashboard.png" alt="Analytics" className="w-10 h-10" />,
            description: locale === 'ar'
                ? 'لوحات تحكم تحليلية متقدمة لمراقبة أداء الأعمال واتخاذ قرارات مبنية على البيانات.'
                : 'Advanced analytics dashboards to monitor business performance and make data-driven decisions.',
            gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
            glowColor: "bg-lavender/50",
            features: locale === 'ar'
                ? ['تحليلات في الوقت الفعلي', 'لوحات تحكم مخصصة', 'تقارير تلقائية', 'تكامل مصادر البيانات']
                : ['Real-time Analytics', 'Custom Dashboards', 'Automated Reports', 'Data Source Integration'],
        },
    ]



    return (
        <div className="min-h-screen bg-lavender" dir={dir}>
            {/* Section 1: Hero Parallax */}
            <HeroParallax
                products={products}
                title={currentContent.title}
                description={currentContent.description}
                isRTL={locale === 'ar'}
            />

            {/* Section 2: Horizontal Scrolling Service Cards */}
            <HorizontalScrollCards
                cards={businessSystemsCards}
                title={locale === 'ar' ? 'حلولنا المتكاملة' : 'Our Comprehensive Solutions'}
                subtitle={locale === 'ar'
                    ? 'استعرض مجموعة أنظمة الأعمال المتكاملة التي نقدمها لتحويل عملياتك'
                    : 'Explore our integrated business systems designed to transform your operations'}
                whatsIncludedLabel={locale === 'ar' ? 'المميزات:' : "What's Included:"}
                moreText={locale === 'ar' ? 'المزيد' : 'more'}
                isRTL={locale === 'ar'}
                variant="light"
            />

            {/* Section 3: HeroModern - Comprehensive Business Systems Overview */}
            <HeroModern
                badge={locale === 'ar' ? 'تطوير أنظمة الأعمال' : 'Business Systems Development'}
                title={locale === 'ar'
                    ? 'أنظمة أعمال مؤسسية مصممة للنمو والكفاءة'
                    : 'Enterprise-Grade Business Systems Built for Growth & Efficiency'
                }
                description={locale === 'ar'
                    ? 'حوّل عملياتك مع حلول CRM و POS و ERP وإدارة المخزون المخصصة. نبني أنظمة أعمال قابلة للتوسع تعمل على أتمتة سير العمل ومركزة البيانات وتحقيق عائد استثمار قابل للقياس.'
                    : 'Transform your operations with custom CRM, POS, ERP, and inventory management solutions. We build scalable business systems that automate workflows, centralize data, and drive measurable ROI.'
                }
                metrics={locale === 'ar' ? [
                    { label: 'وقت التنفيذ', value: '14 يوم' },
                    { label: 'أنظمة مُنجزة', value: '+50' },
                    { label: 'رضا العملاء', value: '98%' },
                ] : [
                    { label: 'Implementation', value: '14 Days' },
                    { label: 'Systems Built', value: '50+' },
                    { label: 'Client Retention', value: '98%' },
                ]}
                modes={locale === 'ar' ? {
                    strategy: {
                        title: 'التخطيط الاستراتيجي',
                        description: 'نحلل عمليات عملك ونحدد فرص الأتمتة ونصمم بنية نظام مخصصة تتوافق مع أهداف النمو الخاصة بك.',
                        items: [
                            'تدقيق شامل لعمليات الأعمال',
                            'تصميم بنية نظام مخصصة',
                            'التخطيط لخارطة طريق التكامل',
                        ],
                    },
                    execution: {
                        title: 'التنفيذ والنشر',
                        description: 'تطوير رشيق مع اختبار تكراري وترحيل سلس وتدريب شامل لضمان تحقيق فريقك أقصى استفادة من إمكانيات النظام.',
                        items: [
                            'دورات تطوير تكرارية',
                            'ترحيل البيانات والتكامل',
                            'تدريب الفريق والتوثيق',
                        ],
                    },
                } : {
                    strategy: {
                        title: 'Strategic Planning',
                        description: 'We analyze your business processes, identify automation opportunities, and design a custom system architecture that aligns with your growth objectives.',
                        items: [
                            'Comprehensive business process audit',
                            'Custom system architecture design',
                            'Integration roadmap planning',
                        ],
                    },
                    execution: {
                        title: 'Implementation & Deployment',
                        description: 'Agile development with iterative testing, seamless migration, and comprehensive training to ensure your team maximizes system capabilities.',
                        items: [
                            'Iterative development sprints',
                            'Data migration & integration',
                            'Team training & documentation',
                        ],
                    },
                }}
                controlStackTitle={locale === 'ar' ? 'خبراتنا' : 'Our Expertise'}
                controlStackDescription={locale === 'ar'
                    ? 'نتخصص في بناء أنظمة أعمال تتكامل بسلاسة مع سير عملك الحالي مع توفير المرونة للتوسع مع نموك.'
                    : 'We specialize in building business systems that integrate seamlessly with your existing workflows while providing the flexibility to scale with your growth.'
                }
                controlStackItems={locale === 'ar' ? [
                    'CRM وإدارة العملاء',
                    'POS وحلول البيع بالتجزئة',
                    'أنظمة المخزون والمستودعات',
                ] : [
                    'CRM & Customer Management',
                    'POS & Retail Solutions',
                    'Inventory & Warehouse Systems',
                ]}
                protocolsTitle={locale === 'ar' ? 'عملية التطوير' : 'Development Process'}
                protocols={locale === 'ar' ? [
                    {
                        name: 'الاكتشاف والتحليل',
                        detail: 'دراسة معمقة لعمليات عملك لتحديد فرص الأتمتة ومتطلبات النظام.',
                        status: 'المرحلة 1',
                    },
                    {
                        name: 'التصميم والتطوير',
                        detail: 'بناء حلول مخصصة بتقنيات حديثة مع التركيز على سهولة الاستخدام والأداء.',
                        status: 'المرحلة 2',
                    },
                    {
                        name: 'النشر والتحسين',
                        detail: 'نشر سلس مع دعم مستمر ومراقبة وتحسينات متواصلة.',
                        status: 'المرحلة 3',
                    },
                ] : [
                    {
                        name: 'Discovery & Analysis',
                        detail: 'Deep dive into your business processes to identify automation opportunities and system requirements.',
                        status: 'Phase 1',
                    },
                    {
                        name: 'Design & Development',
                        detail: 'Build custom solutions with modern tech stack, focusing on usability and performance.',
                        status: 'Phase 2',
                    },
                    {
                        name: 'Deploy & Optimize',
                        detail: 'Seamless deployment with ongoing support, monitoring, and continuous improvements.',
                        status: 'Phase 3',
                    },
                ]}
                showcaseImage={{
                    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
                    alt: locale === 'ar' ? 'لوحة تحكم أعمال حديثة تعرض التحليلات والبيانات' : 'Modern business dashboard interface showing analytics and data visualization',
                    caption: locale === 'ar' ? 'لوحة التحكم' : 'System Dashboard',
                    captionRight: locale === 'ar' ? 'تحليلات مباشرة' : 'Real-time Analytics',
                }}
                showThemeToggle={false}
                isRTL={locale === 'ar'}
                modeLabels={locale === 'ar' ? {
                    strategy: 'الاستراتيجية',
                    execution: 'التنفيذ',
                } : {
                    strategy: 'Strategy',
                    execution: 'Execution',
                }}
                controlStackBadge={locale === 'ar' ? 'مخصص' : 'Custom'}
                protocolsBadge={locale === 'ar' ? '٣ مراحل' : '3 Phases'}
                labelAvailable={locale === 'ar' ? 'متاح الآن' : 'Available Now'}
                labelCustomSolutions={locale === 'ar' ? 'حلول مخصصة' : 'Custom Solutions'}
                labelApproach={locale === 'ar' ? 'نهجنا' : 'Our Approach'}
            />

            {/* Final CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {locale === 'ar'
                            ? 'جاهز لتحويل عملياتك التجارية؟'
                            : 'Ready to Transform Your Business Operations?'
                        }
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        {locale === 'ar'
                            ? 'دعنا نبني نظام أعمال مخصص يلبي احتياجاتك الفريدة ويدفع نموك.'
                            : "Let's build a custom business system that meets your unique needs and drives your growth."
                        }
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-lavender rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            {locale === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project Today'}
                            <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-lavender/10 transition-all duration-300"
                        >
                            {locale === 'ar' ? 'استكشف خدماتنا' : 'Explore All Services'}
                        </Link>
                    </div>

                    {/* Value Propositions */}
                    <div className="mt-16 pt-10 border-t border-white/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-6">
                            {locale === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {[
                                {
                                    icon: '🎯',
                                    label: locale === 'ar' ? 'حلول مخصصة لاحتياجاتك' : 'Custom Solutions for Your Needs'
                                },
                                {
                                    icon: '⚡',
                                    label: locale === 'ar' ? 'تنفيذ سريع وفعال' : 'Fast & Efficient Delivery'
                                },
                                {
                                    icon: '🔧',
                                    label: locale === 'ar' ? 'دعم فني مستمر' : 'Ongoing Technical Support'
                                },
                                {
                                    icon: '📈',
                                    label: locale === 'ar' ? 'قابلية التوسع والنمو' : 'Scalable & Growth-Ready'
                                },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2 text-center">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm text-slate-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
