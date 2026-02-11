'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
        gradient: 'from-blue-500 to-cyan-500',
        glowColor: 'bg-blue-500/50',
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
        gradient: 'from-emerald-500 to-teal-500',
        glowColor: 'bg-emerald-500/50',
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
        gradient: 'from-red-500 to-rose-500',
        glowColor: 'bg-red-500/50',
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
        gradient: 'from-pink-500 to-rose-500',
        glowColor: 'bg-pink-500/50',
        href: '/social-media-marketing',
        features: ['Content Strategy', 'Community Management', 'Paid Ads', 'Analytics'],
        featuresAr: ['استراتيجية المحتوى', 'إدارة المجتمع', 'الإعلانات المدفوعة', 'تحليلات'],
    },
    {
        name: 'SEO & Search Optimization',
        nameAr: 'تحسين محركات البحث',
        tagline: 'Rank Higher, Grow Faster',
        taglineAr: 'ترتيب أعلى، نمو أسرع',
        description: 'Data-driven SEO strategies to boost your visibility and drive organic traffic.',
        descriptionAr: 'استراتيجيات تحسين محركات البحث المبنية على البيانات لتعزيز ظهورك وزيادة حركة المرور العضوية.',
        icon: '/icons/services/SEO & Search Optimization.png',
        gradient: 'from-green-500 to-emerald-500',
        glowColor: 'bg-green-500/50',
        href: '/services#seo',
        features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Analytics'],
        featuresAr: ['بحث الكلمات المفتاحية', 'SEO داخلي', 'SEO تقني', 'تحليلات'],
    },
    {
        name: 'Professional Content Creation',
        nameAr: 'إنشاء محتوى احترافي',
        tagline: 'Content That Converts',
        taglineAr: 'محتوى يحقق النتائج',
        description: 'High-quality visual and written content that tells your brand story.',
        descriptionAr: 'محتوى مرئي ومكتوب عالي الجودة يروي قصة علامتك التجارية.',
        icon: '/icons/services/Professional Content Creation.png',
        gradient: 'from-purple-500 to-violet-500',
        glowColor: 'bg-purple-500/50',
        href: '/content-creation',
        features: ['Photography', 'Video Production', 'Copywriting', 'Brand Assets'],
        featuresAr: ['التصوير', 'إنتاج الفيديو', 'كتابة الإعلانات', 'أصول العلامة التجارية'],
    },
    {
        name: 'Corporate Visual Identity',
        nameAr: 'الهوية البصرية للشركات',
        tagline: 'Stand Out From The Crowd',
        taglineAr: 'تميز عن المنافسين',
        description: 'Complete brand identity design including logos, color palettes, and brand guidelines.',
        descriptionAr: 'تصميم هوية علامة تجارية كاملة تشمل الشعارات ولوحات الألوان وإرشادات العلامة التجارية.',
        icon: '/icons/services/Corporate Visual Identity Design.png',
        gradient: 'from-amber-500 to-orange-500',
        glowColor: 'bg-amber-500/50',
        href: '/services#branding',
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography'],
        featuresAr: ['تصميم الشعار', 'إرشادات العلامة', 'لوحة الألوان', 'الطباعة'],
    },
]

// Business Systems Services
const businessSystemsServices: ServiceCard[] = [
    {
        name: 'CRM System',
        nameAr: 'نظام إدارة علاقات العملاء',
        tagline: 'Smart Customer Management',
        taglineAr: 'إدارة العملاء بذكاء',
        description: 'Complete CRM solution for customer relationship management and sales tracking.',
        descriptionAr: 'حل CRM متكامل لإدارة علاقات العملاء وتتبع المبيعات.',
        icon: '/icons/services/CRM System.png',
        gradient: 'from-purple-500 to-purple-700',
        glowColor: 'bg-purple-500/50',
        href: '/business-systems-development',
        features: ['Lead Management', 'Sales Pipeline', 'Marketing Automation', 'Analytics'],
        featuresAr: ['إدارة العملاء المحتملين', 'مسار المبيعات', 'أتمتة التسويق', 'تحليلات'],
    },
    {
        name: 'POS System',
        nameAr: 'نظام نقاط البيع',
        tagline: 'Advanced Point of Sale',
        taglineAr: 'نقاط بيع متطورة',
        description: 'Cloud-based POS system integrated with inventory and financial reporting.',
        descriptionAr: 'نظام نقاط بيع سحابي متكامل مع المخزون والتقارير المالية.',
        icon: '/icons/services/POS System.png',
        gradient: 'from-blue-500 to-indigo-600',
        glowColor: 'bg-blue-500/50',
        href: '/business-systems-development',
        features: ['Fast Checkout', 'Inventory Sync', 'Staff Management', 'Reports'],
        featuresAr: ['دفع سريع', 'مزامنة المخزون', 'إدارة الموظفين', 'تقارير'],
    },
    {
        name: 'Inventory Management',
        nameAr: 'إدارة المخزون',
        tagline: 'Precise Stock Tracking',
        taglineAr: 'تتبع المخزون بدقة',
        description: 'Real-time inventory tracking with multi-warehouse support and reorder alerts.',
        descriptionAr: 'تتبع المخزون في الوقت الفعلي مع دعم المستودعات المتعددة وتنبيهات إعادة الطلب.',
        icon: '/icons/services/Inventory Management.png',
        gradient: 'from-teal-500 to-emerald-600',
        glowColor: 'bg-teal-500/50',
        href: '/business-systems-development',
        features: ['Real-time Tracking', 'Multi-warehouse', 'Auto Alerts', 'Movement Reports'],
        featuresAr: ['تتبع فوري', 'مستودعات متعددة', 'تنبيهات تلقائية', 'تقارير الحركة'],
    },
    {
        name: 'HR Management',
        nameAr: 'إدارة الموارد البشرية',
        tagline: 'Efficient Team Management',
        taglineAr: 'إدارة فريقك بكفاءة',
        description: 'Complete HR system from recruitment to payroll and performance management.',
        descriptionAr: 'نظام موارد بشرية متكامل من التوظيف إلى الرواتب وإدارة الأداء.',
        icon: '/icons/services/HR Management.png',
        gradient: 'from-green-500 to-teal-600',
        glowColor: 'bg-green-500/50',
        href: '/business-systems-development',
        features: ['Recruitment', 'Payroll', 'Attendance', 'Performance'],
        featuresAr: ['التوظيف', 'الرواتب', 'الحضور', 'الأداء'],
    },
    {
        name: 'Booking System',
        nameAr: 'نظام الحجوزات',
        tagline: 'Smart & Flexible Booking',
        taglineAr: 'حجوزات ذكية ومرنة',
        description: 'Integrated booking system for services and appointments with reminders.',
        descriptionAr: 'نظام حجوزات متكامل للخدمات والمواعيد مع التذكيرات.',
        icon: '/icons/services/Booking System.png',
        gradient: 'from-orange-500 to-pink-600',
        glowColor: 'bg-orange-500/50',
        href: '/business-systems-development',
        features: ['Online Booking', 'Calendar Sync', 'Reminders', 'Resource Management'],
        featuresAr: ['الحجز عبر الإنترنت', 'مزامنة التقويم', 'تذكيرات', 'إدارة الموارد'],
    },
    {
        name: 'Analytics Dashboard',
        nameAr: 'لوحات التحليلات',
        tagline: 'Advanced Business Insights',
        taglineAr: 'رؤى أعمال متقدمة',
        description: 'Custom analytics dashboards to monitor performance and make data-driven decisions.',
        descriptionAr: 'لوحات تحليلات مخصصة لمراقبة الأداء واتخاذ قرارات مبنية على البيانات.',
        icon: '/icons/services/Analytics Dashboard.png',
        gradient: 'from-cyan-500 to-blue-600',
        glowColor: 'bg-cyan-500/50',
        href: '/business-systems-development',
        features: ['Real-time Data', 'Custom Dashboards', 'Auto Reports', 'Data Integration'],
        featuresAr: ['بيانات فورية', 'لوحات مخصصة', 'تقارير تلقائية', 'تكامل البيانات'],
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
        gradient: 'from-violet-500 to-purple-600',
        glowColor: 'bg-violet-500/50',
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
        gradient: 'from-emerald-500 to-teal-600',
        glowColor: 'bg-emerald-500/50',
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
        gradient: 'from-blue-500 to-cyan-600',
        glowColor: 'bg-blue-500/50',
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
        gradient: 'from-rose-500 to-pink-600',
        glowColor: 'bg-rose-500/50',
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
        gradient: 'from-indigo-500 to-blue-600',
        glowColor: 'bg-indigo-500/50',
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
        gradient: 'from-sky-500 to-cyan-600',
        glowColor: 'bg-sky-500/50',
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
        gradient: 'from-blue-600 via-cyan-500 to-teal-400',
        bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
        accentColor: 'blue',
        services: digitalPresenceServices,
    },
    {
        id: 'business-systems',
        name: 'Business Systems',
        nameAr: 'أنظمة الأعمال',
        description: 'Streamline operations with custom CRM, POS, inventory, and HR management systems.',
        descriptionAr: 'حسّن عملياتك مع أنظمة CRM ونقاط البيع والمخزون والموارد البشرية المخصصة.',
        icon: '/icons/services/systems.png',
        gradient: 'from-purple-600 via-violet-500 to-indigo-400',
        bgGradient: 'from-purple-50 via-violet-50 to-indigo-50',
        accentColor: 'purple',
        services: businessSystemsServices,
    },
    {
        id: 'web-applications',
        name: 'Web Applications',
        nameAr: 'تطبيقات الويب',
        description: 'Powerful web applications from SaaS platforms to e-commerce and customer portals.',
        descriptionAr: 'تطبيقات ويب قوية من منصات SaaS إلى التجارة الإلكترونية وبوابات العملاء.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
        bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
        accentColor: 'emerald',
        services: webApplicationsServices,
    },
]

// Service Card Component with Glowing Effect
function ServiceCardComponent({
    service,
    locale,
    index
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
                    {/* Glowing Effect */}
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={80}
                        inactiveZone={0.01}
                        borderWidth={2}
                    />

                    {/* Card Content */}
                    <div className="relative h-full flex flex-col p-6 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xl overflow-hidden z-10 transition-all duration-500 group-hover:border-slate-300 group-hover:bg-white">
                        {/* Gradient Overlay on Hover */}
                        <div className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br",
                            service.gradient
                        )} />

                        {/* Icon & Header */}
                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className={cn(
                                "w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-500",
                                "bg-gradient-to-br from-slate-50 to-slate-100 group-hover:scale-110",
                                "shadow-sm group-hover:shadow-md"
                            )}>
                                <img
                                    src={service.icon}
                                    alt={isRTL ? service.nameAr : service.name}
                                    className="w-9 h-9 object-contain"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">
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

                        {/* Description */}
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed relative z-10">
                            {isRTL ? service.descriptionAr : service.description}
                        </p>

                        {/* Features */}
                        <div className="mt-auto relative z-10">
                            <div className="flex flex-wrap gap-2">
                                {(isRTL ? service.featuresAr : service.features).map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full transition-all duration-300 group-hover:bg-slate-200"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Arrow indicator */}
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

// Category Section Component
function CategorySection({
    category,
    locale,
    index
}: {
    category: typeof categories[0]
    locale: string
    index: number
}) {
    const isRTL = locale === 'ar'

    return (
        <section
            id={category.id}
            className={cn(
                "py-16 md:py-24 relative overflow-hidden",
                index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-slate-50 to-white"
            )}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={cn(
                    "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-br",
                    category.gradient
                )} />
                <div className={cn(
                    "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr",
                    category.gradient
                )} />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Minimal Category Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 md:mb-14"
                >
                    <div className="flex items-center gap-4 mb-3">
                        {/* Category Icon */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50">
                            <img
                                src={category.icon}
                                alt=""
                                className="w-9 h-9 object-contain"
                            />
                        </div>

                        {/* Title & Number */}
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {isRTL ? `0${index + 1}` : `0${index + 1}`}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                {isRTL ? category.nameAr : category.name}
                            </h2>
                        </div>
                    </div>

                    {/* Description aligned with title */}
                    <div className="flex items-start gap-4">
                        <div className="hidden md:block w-14 flex-shrink-0" />
                        <p className="text-slate-500 max-w-xl">
                            {isRTL ? category.descriptionAr : category.description}
                        </p>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
    )
}

export default function ServicesPage() {
    const { dir, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const content = {
        en: {
            badge: 'OUR SERVICES',
            title: 'Services to Move Your',
            titleHighlight: 'Business to the Cloud',
            description: 'From establishing your digital presence to building enterprise-grade systems, we provide end-to-end solutions tailored to your unique needs.',
            ctaButton: 'Get a Free Consultation',
            ctaSecondary: 'View Our Work',
            stats: [
                { value: '150+', label: 'Projects Completed' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '50+', label: 'Happy Clients' },
            ],
            finalCta: {
                title: 'Ready to Transform Your Business?',
                description: "Let's discuss how we can help you achieve your goals with our comprehensive digital solutions.",
                button: 'Start Your Project Today',
                buttonSecondary: 'Contact Us',
            }
        },
        ar: {
            badge: 'خدماتنا',
            title: 'خدمات لنقل',
            titleHighlight: 'عملك إلى السحابة',
            description: 'من إنشاء حضورك الرقمي إلى بناء أنظمة بمستوى المؤسسات، نقدم حلولاً شاملة مصممة خصيصاً لاحتياجاتك الفريدة.',
            ctaButton: 'احصل على استشارة مجانية',
            ctaSecondary: 'شاهد أعمالنا',
            stats: [
                { value: '+150', label: 'مشروع مكتمل' },
                { value: '98%', label: 'رضا العملاء' },
                { value: '+50', label: 'عميل سعيد' },
            ],
            finalCta: {
                title: 'جاهز لتحويل عملك؟',
                description: 'دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك من خلال حلولنا الرقمية الشاملة.',
                button: 'ابدأ مشروعك اليوم',
                buttonSecondary: 'تواصل معنا',
            }
        }
    }

    const currentContent = isRTL ? content.ar : content.en

    return (
        <div className="min-h-screen bg-white" dir={dir}>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Gradient orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl"
                        >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                            <span className="text-sm font-bold text-cyan-400 tracking-wider uppercase">
                                {currentContent.badge}
                            </span>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
                        >
                            <span className="text-white">{currentContent.title}</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {currentContent.titleHighlight}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            {currentContent.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105"
                            >
                                <span>{currentContent.ctaButton}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-8 py-4 text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                            >
                                {currentContent.ctaSecondary}
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 mt-8 border-t border-white/10"
                        >
                            {currentContent.stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                    >
                        <motion.div className="w-1.5 h-3 bg-white/50 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Quick Navigation */}
            <section className="py-8 bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-xl bg-white/90">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={`#${category.id}`}
                                className={cn(
                                    "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                    "border border-slate-200 hover:border-transparent",
                                    "hover:text-white hover:shadow-lg",
                                    index === 0 && "hover:bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-blue-200",
                                    index === 1 && "hover:bg-gradient-to-r from-purple-500 to-violet-500 hover:shadow-purple-200",
                                    index === 2 && "hover:bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-200",
                                )}
                            >
                                <img
                                    src={category.icon}
                                    alt=""
                                    className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                />
                                <span>{isRTL ? category.nameAr : category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Sections */}
            {categories.map((category, index) => (
                <CategorySection
                    key={category.id}
                    category={category}
                    locale={locale}
                    index={index}
                />
            ))}

            {/* Final CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            {currentContent.finalCta.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            {currentContent.finalCta.description}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                {currentContent.finalCta.button}
                                <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                            >
                                {currentContent.finalCta.buttonSecondary}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Value Propositions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16 pt-10 border-t border-white/10"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {[
                                { icon: <Rocket className="w-5 h-5" />, label: isRTL ? 'تسليم سريع' : 'Fast Delivery' },
                                { icon: <Shield className="w-5 h-5" />, label: isRTL ? 'أمان متقدم' : 'Secure & Reliable' },
                                { icon: <Users className="w-5 h-5" />, label: isRTL ? 'دعم مستمر' : '24/7 Support' },
                                { icon: <Code2 className="w-5 h-5" />, label: isRTL ? 'حلول مخصصة' : 'Custom Solutions' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2 text-center">
                                    <span className="text-cyan-400">{item.icon}</span>
                                    <span className="text-sm text-slate-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
