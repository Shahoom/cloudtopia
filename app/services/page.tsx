'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { cn } from '@/lib/utils'
import {
    ArrowRight,
    Code2,
    Shield,
    Rocket,
    Users
} from 'lucide-react'
import ProceduralGroundBackground from '@/components/ui/procedural-ground-background'
import { AuroraBackground } from '@/components/ui/aurora-background'
import TechCursor from '@/components/ui/tech-cursor'

interface ServiceCard {
    name: string
    nameAr: string
    tagline: string
    taglineAr: string
    description: string
    descriptionAr: string
    icon: string
    gradient: string
    glowColor: string
    href: string
    features: string[]
    featuresAr: string[]
}

// Digital Presence Services
const digitalPresenceServices: ServiceCard[] = [
    {
        name: 'Website Design & Development',
        nameAr: 'تصميم وتطوير المواقع',
        tagline: 'Premium Web Experiences',
        taglineAr: 'تجارب ويب متميزة',
        description: 'Custom-designed, responsive websites that captivate visitors and convert them into customers.',
        descriptionAr: 'مواقع ويب مصممة حسب الطلب وسريعة الاستجابة تجذب الزوار وتحولهم إلى عملاء.',
        icon: '/icons/services/Website Design & Development.png',
        gradient: 'from-blue-500 to-blue-700',
        glowColor: 'bg-lavender/50',
        href: '/website-design',
        features: ['Custom Design', 'Mobile-First', 'SEO Optimized', 'Fast Loading'],
        featuresAr: ['تصميم مخصص', 'الجوال أولاً', 'محسن لمحركات البحث', 'سرعة تحميل عالية'],
    },
    {
        name: 'E-commerce Solutions',
        nameAr: 'حلول التجارة الإلكترونية',
        tagline: 'Sell Online Successfully',
        taglineAr: 'بيع ناجح عبر الإنترنت',
        description: 'Complete e-commerce solutions to launch and grow your online store.',
        descriptionAr: 'حلول تجارة إلكترونية متكاملة لإطلاق وتنمية متجرك الإلكتروني.',
        icon: '/icons/services/E-commerce Solutions.png',
        gradient: 'from-cyan-500 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/ecommerce-solutions',
        features: ['Product Catalog', 'Secure Checkout', 'Order Management', 'Shipping Integration'],
        featuresAr: ['كتالوج المنتجات', 'دفع آمن', 'إدارة الطلبات', 'تكامل الشحن'],
    },
    {
        name: 'Restaurant QR Menu',
        nameAr: 'قائمة QR للمطاعم',
        tagline: 'Digital Dining Experience',
        taglineAr: 'تجربة طعام رقمية',
        description: 'Interactive digital menus with QR codes for modern restaurants and cafes.',
        descriptionAr: 'قوائم رقمية تفاعلية برموز QR للمطاعم والمقاهي الحديثة.',
        icon: '/icons/services/Restaurant QR Menu Systems.png',
        gradient: 'from-orange-500 to-red-600',
        glowColor: 'bg-lavender/50',
        href: '/restaurant-qr-menu',
        features: ['Easy Updates', 'Multi-language', 'Analytics', 'No App Needed'],
        featuresAr: ['تحديثات سهلة', 'متعدد اللغات', 'تحليلات', 'بدون تطبيق'],
    },
    {
        name: 'Social Media Management',
        nameAr: 'إدارة وسائل التواصل الاجتماعي',
        tagline: 'Engage & Grow Your Audience',
        taglineAr: 'تفاعل مع جمهورك ونمّه',
        description: 'Strategic social media management to build your brand and engage your community.',
        descriptionAr: 'إدارة استراتيجية لوسائل التواصل الاجتماعي لبناء علامتك التجارية والتفاعل مع مجتمعك.',
        icon: '/icons/services/Social Media Management.png',
        gradient: 'from-pink-500 to-purple-600',
        glowColor: 'bg-lavender/50',
        href: '/social-media-marketing',
        features: ['Content Strategy', 'Community Management', 'Paid Ads', 'Analytics'],
        featuresAr: ['استراتيجية المحتوى', 'إدارة المجتمع', 'الإعلانات المدفوعة', 'تحليلات'],
    },
    {
        name: 'Professional Content Creation',
        nameAr: 'إنشاء محتوى احترافي',
        tagline: 'Content That Converts',
        taglineAr: 'محتوى يحقق النتائج',
        description: 'High-quality visual and written content that tells your brand story.',
        descriptionAr: 'محتوى مرئي ومكتوب عالي الجودة يروي قصة علامتك التجارية.',
        icon: '/icons/services/Professional Content Creation.png',
        gradient: 'from-violet-500 to-indigo-600',
        glowColor: 'bg-lavender/50',
        href: '/content-creation',
        features: ['Photography', 'Video Production', 'Copywriting', 'Brand Assets'],
        featuresAr: ['التصوير', 'إنتاج الفيديو', 'كتابة الإعلانات', 'أصول العلامة التجارية'],
    },
]

// Business Systems Services
const businessSystemsServices: ServiceCard[] = [
    {
        name: 'CRM Systems',
        nameAr: 'أنظمة إدارة علاقات العملاء (CRM)',
        tagline: 'Sales & Growth Engine',
        taglineAr: 'محرك المبيعات والنمو',
        description: 'Centralize customer data, track sales pipelines, and automate marketing for maximum ROI.',
        descriptionAr: 'مركزية بيانات العملاء، وتتبع مسارات المبيعات، وأتمتة التسويق لتحقيق أقصى عائد على الاستثمار.',
        icon: '/icons/services/CRM System.png',
        gradient: 'from-purple-500 to-purple-700',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Lead Tracking', 'Pipeline Mgmt', 'Marketing Auto', 'Insightful Reports'],
        featuresAr: ['إدارة العملاء', 'مسار المبيعات', 'أتمتة التسويق', 'تقارير ذكية'],
    },
    {
        name: 'Booking & Appointment Systems',
        nameAr: 'أنظمة الحجز والمواعيد',
        tagline: 'Automated Scheduling',
        taglineAr: 'جدولة آمنة وتلقائية',
        description: 'Streamline reservations with real-time availability, secure payments, and automated reminders.',
        descriptionAr: 'تبسيط الحجوزات مع التوفر في الوقت الفعلي، والمدفوعات الآمنة، والتذكيرات التلقائية.',
        icon: '/icons/services/Booking System.png',
        gradient: 'from-pink-500 to-pink-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Real-time Sync', 'Online Payment', 'Reminders', 'Calendar Mgmt'],
        featuresAr: ['مزامنة فورية', 'دفع إلكتروني', 'تذكيرات', 'إدارة التقويم'],
    },
    {
        name: 'Inventory & Stock Management',
        nameAr: 'أنظمة إدارة المخزون والمستودعات',
        tagline: 'Precise Stock Tracking',
        taglineAr: 'تتبع المخزون بدقة',
        description: 'Real-time inventory tracking with multi-warehouse support and automatic reorder alerts.',
        descriptionAr: 'تتبع المخزون في الوقت الفعلي مع دعم المستودعات المتعددة وتنبيهات إعادة الطلب التلقائية.',
        icon: '/icons/services/Inventory Management.png',
        gradient: 'from-emerald-500 to-emerald-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Multi-warehouse', 'Auto-Reordering', 'Stock Alerts', 'Movement Sync'],
        featuresAr: ['مستودعات متعددة', 'إعادة طلب تلقائي', 'تنبيهات المخزون', 'مزامنة الحركة'],
    },
    {
        name: 'ERP (Enterprise Resource Planning)',
        nameAr: 'أنظمة تخطيط موارد المؤسسات (ERP)',
        tagline: 'Unified Enterprise Operations',
        taglineAr: 'عمليات مؤسسية موحدة',
        description: 'Integrate your core business processes—finance, supply chain, and HR—into one seamless platform.',
        descriptionAr: 'دمج عمليات عملك الأساسية — المالية وسلسلة التوريد والموارد البشرية — في منصة واحدة سلسة.',
        icon: '/icons/services/systems.png',
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Financial Control', 'Supply Chain', 'HR Integration', 'Business Intelligence'],
        featuresAr: ['الرقابة المالية', 'سلسلة التوريد', 'تكامل الموارد البشرية', 'ذكاء الأعمال'],
    },
    {
        name: 'HR & Employee Management',
        nameAr: 'أنظمة الموارد البشرية والموظفين',
        tagline: 'Empower Your Workforce',
        taglineAr: 'تمكين القوى العاملة لديك',
        description: 'Manage payroll, attendance, and recruitment through a modern self-service employee portal.',
        descriptionAr: 'إدارة الرواتب والحضور والتوظيف من خلال بوابة خدمة ذاتية حديثة للموظفين.',
        icon: '/icons/services/HR Management.png',
        gradient: 'from-teal-500 to-teal-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Payroll Mgmt', 'Shift Scheduling', 'Performance Metrics', 'Self Service Portal'],
        featuresAr: ['إدارة الرواتب', 'جدولة الورديات', 'مقاييس الأداء', 'بوابة الخدمة الذاتية'],
    },
    {
        name: 'Law Practice Management',
        nameAr: 'أنظمة إدارة المكاتب القانونية',
        tagline: 'Digital Legal Operations',
        taglineAr: 'عمليات قانونية رقمية',
        description: 'Specialized tools for case tracking, legal documentation, and automated billing for law firms.',
        descriptionAr: 'أدوات متخصصة لتتبع القضايا والتوثيق القانوني والفواتير الآلية لمكاتب المحاماة.',
        icon: '/icons/services/Admin Dashboard.png',
        gradient: 'from-slate-600 to-slate-800',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Case Mgmt', 'Doc Automation', 'Billing & Invoicing', 'Conflict Checks'],
        featuresAr: ['إدارة القضايا', 'أتمتة المستندات', 'الفواتير', 'فحص التعارض'],
    },
    {
        name: 'Clinic / Medical Practice Systems',
        nameAr: 'أنظمة إدارة العيادات والمراكز الطبية',
        tagline: 'Smarter Patient Care',
        taglineAr: 'رعاية أذكى للمرضى',
        description: 'Comprehensive patient record management, scheduling, and billing specifically for healthcare.',
        descriptionAr: 'إدارة شاملة لسجلات المرضى والجدولة والفواتير المصممة خصيصاً لقطاع الرعاية الصحية.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-blue-400 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['EHR/EMR Support', 'Patient Portal', 'Claims Mgmt', 'Lab Integration'],
        featuresAr: ['سجلات طبية إلكترونية', 'بوابة المرضى', 'إدارة المطالبات', 'تكامل المختبر'],
    },
]

// Web Applications Services
const webApplicationsServices: ServiceCard[] = [
    {
        name: 'SaaS Platforms',
        nameAr: 'منصات SaaS',
        tagline: 'Scalable Cloud Software',
        taglineAr: 'برمجيات سحابية قابلة للتوسع',
        description: 'Multi-tenant SaaS applications with subscription billing and analytics.',
        descriptionAr: 'تطبيقات SaaS متعددة المستأجرين مع فواتير الاشتراك والتحليلات.',
        icon: '/icons/services/Admin Dashboard.png',
        gradient: 'from-purple-500 to-purple-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Multi-tenant', 'Subscription Billing', 'API Access', 'Analytics'],
        featuresAr: ['متعدد المستأجرين', 'فواتير الاشتراك', 'واجهة API', 'تحليلات'],
    },
    {
        name: 'E-commerce Platforms',
        nameAr: 'منصات التجارة الإلكترونية',
        tagline: 'Complete Commerce Solutions',
        taglineAr: 'حلول تجارة متكاملة',
        description: 'Full-featured e-commerce platforms with payment integration and order management.',
        descriptionAr: 'منصات تجارة إلكترونية متكاملة مع تكامل الدفع وإدارة الطلبات.',
        icon: '/icons/services/E-commerce Solutions.png',
        gradient: 'from-teal-500 to-teal-600',
        glowColor: 'bg-lavender/50',
        href: '/ecommerce-solutions',
        features: ['Product Management', 'Secure Payments', 'Order Tracking', 'Multi-vendor'],
        featuresAr: ['إدارة المنتجات', 'دفع آمن', 'تتبع الطلبات', 'متعدد البائعين'],
    },
    {
        name: 'Customer Portals',
        nameAr: 'بوابات العملاء',
        tagline: 'Secure Client Access',
        taglineAr: 'وصول آمن للعملاء',
        description: 'Custom client portals for account management and document access.',
        descriptionAr: 'بوابات عملاء مخصصة لإدارة الحسابات والوصول للمستندات.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-cyan-500 to-cyan-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Secure Login', 'Profile Management', 'Document Access', 'Support Chat'],
        featuresAr: ['تسجيل دخول آمن', 'إدارة الملف', 'الوصول للمستندات', 'دردشة الدعم'],
    },
    {
        name: 'Booking Platforms',
        nameAr: 'منصات الحجز',
        tagline: 'Online Reservation Systems',
        taglineAr: 'أنظمة الحجز عبر الإنترنت',
        description: 'Professional booking platforms for hotels, clinics, and service businesses.',
        descriptionAr: 'منصات حجز احترافية للفنادق والعيادات وشركات الخدمات.',
        icon: '/icons/services/Booking Platform.png',
        gradient: 'from-pink-500 to-pink-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Real-time Availability', 'Online Payments', 'SMS Reminders', 'Calendar Sync'],
        featuresAr: ['التوفر الفوري', 'الدفع الإلكتروني', 'تذكيرات SMS', 'مزامنة التقويم'],
    },
    {
        name: 'Mobile-Responsive Apps',
        nameAr: 'تطبيقات متجاوبة للجوال',
        tagline: 'Apps That Work Everywhere',
        taglineAr: 'تطبيقات تعمل في كل مكان',
        description: 'Progressive web applications that work seamlessly on any device.',
        descriptionAr: 'تطبيقات ويب تقدمية تعمل بسلاسة على أي جهاز.',
        icon: '/icons/services/Mobile-Responsive Apps.png',
        gradient: 'from-blue-500 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['PWA Ready', 'Offline Support', 'Push Notifications', 'App-like UX'],
        featuresAr: ['جاهز لـ PWA', 'دعم بدون اتصال', 'إشعارات فورية', 'تجربة تطبيق'],
    },
    {
        name: 'Real-time Chat Systems',
        nameAr: 'أنظمة الدردشة الفورية',
        tagline: 'Instant Communication',
        taglineAr: 'تواصل فوري',
        description: 'Real-time chat and messaging systems for customer support and team collaboration.',
        descriptionAr: 'أنظمة دردشة ومراسلة فورية لدعم العملاء وتعاون الفريق.',
        icon: '/icons/services/Real-time Chat System.png',
        gradient: 'from-cyan-500 to-cyan-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'Message History'],
        featuresAr: ['رسائل فورية', 'مشاركة الملفات', 'محادثات جماعية', 'سجل الرسائل'],
    },
]

// Category data
const categories = [
    {
        id: 'digital-presence',
        name: 'Digital Presence',
        nameAr: 'الحضور الرقمي',
        description: 'Build your online presence with stunning websites, SEO, and social media management.',
        descriptionAr: 'ابنِ حضورك الرقمي مع مواقع ويب مذهلة وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي.',
        icon: '/icons/services/digitalpresence.png',
        gradient: 'from-blue-600 via-blue-400 to-teal-400',
        services: digitalPresenceServices,
    },
    {
        id: 'business-systems',
        name: 'Business Systems',
        nameAr: 'أنظمة الأعمال',
        description: 'Streamline operations with custom CRM, POS, inventory, and HR management systems.',
        descriptionAr: 'حسّن عملياتك مع أنظمة CRM ونقاط البيع والمخزون والموارد البشرية المخصصة.',
        icon: '/icons/services/systems.png',
        gradient: 'from-purple-600 via-purple-400 to-indigo-400',
        services: businessSystemsServices,
    },
    {
        id: 'web-applications',
        name: 'Web Applications',
        nameAr: 'تطبيقات الويب',
        description: 'Powerful web applications from SaaS platforms to e-commerce and customer portals.',
        descriptionAr: 'تطبيقات ويب قوية من منصات SaaS إلى التجارة الإلكترونية وبوابات العملاء.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-emerald-600 via-emerald-400 to-cyan-400',
        services: webApplicationsServices,
    },
]

function ServiceCardComponent({
    service,
    locale,
    index,
}: {
    service: ServiceCard
    locale: string
    index: number
}) {
    const isRTL = locale === 'ar'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link href={service.href} className="block">
                <div className="relative h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={80}
                        inactiveZone={0.01}
                        borderWidth={2}
                    />

                    <div className="relative h-full flex flex-col p-6 rounded-2xl border border-black/5 bg-white/40 backdrop-blur-xl overflow-hidden z-10 transition-all duration-500 group-hover:bg-white/60 group-hover:border-black/10 shadow-sm">
                        <div className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                            service.gradient
                        )} />

                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-500 bg-transparent group-hover:scale-110">
                                <img
                                    src={service.icon}
                                    alt={isRTL ? service.nameAr : service.name}
                                    className="w-9 h-9 object-contain"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold leading-tight mb-1 text-slate-900">
                                    {isRTL ? service.nameAr : service.name}
                                </h3>
                                <p className={cn(
                                    "text-xs font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                                    service.gradient
                                )}>
                                    {isRTL ? service.taglineAr : service.tagline}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-4 leading-relaxed relative z-10">
                            {isRTL ? service.descriptionAr : service.description}
                        </p>

                        <div className="mt-auto relative z-10">
                            <div className="flex flex-wrap gap-2">
                                {(isRTL ? service.featuresAr : service.features).map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 text-slate-600 bg-black/5 group-hover:bg-black/10 border border-black/5"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 rtl:-translate-x-2 rtl:group-hover:translate-x-0">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r",
                                service.gradient
                            )}>
                                <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function ServicesPage() {
    const { dir, locale } = useLanguage()
    const isRTL = locale === 'ar'
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const content = {
        en: {
            badge: 'OUR SERVICES',
            title: 'Services to Move Your',
            titleHighlight: 'Business to the Cloud',
            description: 'From establishing your digital presence to building enterprise-grade systems, we provide end-to-end solutions tailored to your unique needs.',
            ctaButton: 'Get a Free Consultation',
            replyNote: 'We typically reply within 10 minutes',
            ctaSecondary: 'View Our Work',
            finalCta: {
                title: 'Ready to Transform Your Business?',
                description: "Let's discuss how we can help you achieve your goals with our comprehensive digital solutions.",
                button: 'Start Your Project Today',
            }
        },
        ar: {
            badge: 'خدماتنا',
            title: 'خدمات لنقل',
            titleHighlight: 'عملك إلى السحابة',
            description: 'من إنشاء حضورك الرقمي إلى بناء أنظمة بمستوى المؤسسات، نقدم حلولاً شاملة مصممة خصيصاً لاحتياجاتك الفريدة.',
            ctaButton: 'احصل على استشارة مجانية',
            replyNote: 'عادة ما نرد في غضون 10 دقائق',
            ctaSecondary: 'شاهد أعمالنا',
            finalCta: {
                title: 'جاهز لتحويل عملك؟',
                description: 'دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك من خلال حلولنا الرقمية الشاملة.',
                button: 'ابدأ مشروعك اليوم',
            }
        }
    }

    const currentContent = isRTL ? content.ar : content.en

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30" dir={dir}>
            {/* Tech Cursor Effect - Only on Desktop */}
            {!isMobile && <TechCursor />}
            {/* Hero Section - Preserved */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <ProceduralGroundBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-16 text-center">
                    <div className="flex flex-col items-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
                                {currentContent.badge}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-2xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[1.05]"
                        >
                            <span className="text-white">{currentContent.title}</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                {currentContent.titleHighlight}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mx-auto"
                        >
                            {currentContent.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col items-center gap-6 pt-4"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                <a
                                    href="mailto:info@cloudtopia.net"
                                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-zinc-950 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                                >
                                    <span>{currentContent.ctaButton}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                                </a>
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center gap-2 px-10 py-4 text-white border-2 border-white/10 rounded-xl font-semibold text-lg hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center"
                                >
                                    {currentContent.ctaSecondary}
                                </Link>
                            </div>
                            <span className="text-xs font-medium text-slate-500 tracking-wide bg-white/5 py-1.5 px-4 rounded-full border border-white/5">
                                {currentContent.replyNote}
                            </span>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
                </motion.div>
            </section>

            {/* Continuous Offering Flow */}
            <AuroraBackground className="!h-auto !bg-lavender">
                <div className="relative z-10 w-full">
                    {/* Navigation - Simplified */}
                    <nav className="sticky top-0 z-50 border-b border-black/5 bg-lavender/80 backdrop-blur-xl">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <div className="flex items-center justify-center gap-4 md:gap-8 py-4 overflow-x-auto no-scrollbar">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`#${category.id}`}
                                        className="group whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors border border-transparent hover:border-black/5 hover:bg-black/5"
                                    >
                                        <img src={category.icon} alt={isRTL ? category.nameAr : category.name} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                        {isRTL ? category.nameAr : category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Categories Narrative */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        {categories.map((category, index) => (
                            <section
                                key={category.id}
                                id={category.id}
                                className="py-24 md:py-40 first:pt-20 border-b border-black/5 last:border-0"
                            >
                                <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 items-start">
                                    {/* Sticky Sidebar Header */}
                                    <div className="lg:sticky lg:top-32 space-y-6">
                                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black/5 border border-black/10">
                                            <span className="text-[10px] font-bold text-blue-600">0{index + 1}</span>
                                            <div className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-r", category.gradient)} />
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                                            {isRTL ? category.nameAr : category.name}
                                        </h2>
                                        <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
                                            {isRTL ? category.descriptionAr : category.description}
                                        </p>
                                    </div>

                                    {/* Continuous Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        {category.services.map((service, serviceIndex) => (
                                            <ServiceCardComponent
                                                key={service.name}
                                                service={service}
                                                locale={locale}
                                                index={serviceIndex}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </AuroraBackground>

            {/* Final CTA - Bookended UI (Matches Hero) */}
            <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden bg-zinc-950">
                <ProceduralGroundBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-zinc-950 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                                <span className="text-white">{currentContent.finalCta.title.split('?')[0]}</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                    ?
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                {currentContent.finalCta.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-zinc-950 rounded-2xl font-black text-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                <span>{currentContent.finalCta.button}</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
