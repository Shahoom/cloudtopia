'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react'
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
    {
        name: 'SEO & Search Optimization',
        nameAr: 'تحسين محركات البحث والظهور',
        tagline: 'Be Found First',
        taglineAr: 'ظهور أوضح في البحث',
        description: 'Technical SEO, content structure, local search, and AI-answer visibility for service businesses.',
        descriptionAr: 'SEO تقني، بنية محتوى، بحث محلي، وظهور أفضل في إجابات الذكاء الاصطناعي لشركات الخدمات.',
        icon: '/icons/services/SEO & Search Optimization.png',
        gradient: 'from-emerald-500 to-teal-600',
        glowColor: 'bg-lavender/50',
        href: '/services/seo-optimization',
        features: ['Technical SEO', 'Local Search', 'Schema Markup', 'AI Visibility'],
        featuresAr: ['SEO تقني', 'بحث محلي', 'Schema', 'ظهور في إجابات AI'],
    },
    {
        name: 'Brand Identity',
        nameAr: 'الهوية البصرية للشركات',
        tagline: 'Clear Brand System',
        taglineAr: 'نظام هوية واضح',
        description: 'Logo, colors, typography, and digital brand assets for websites, campaigns, and company profiles.',
        descriptionAr: 'شعار، ألوان، خطوط، وأصول رقمية للمواقع والحملات والملفات التعريفية.',
        icon: '/icons/services/Corporate Visual Identity Design.png',
        gradient: 'from-indigo-500 to-violet-600',
        glowColor: 'bg-lavender/50',
        href: '/services/brand-identity',
        features: ['Logo System', 'Color Palette', 'Brand Guide', 'Digital Assets'],
        featuresAr: ['نظام شعار', 'لوحة ألوان', 'دليل هوية', 'أصول رقمية'],
    },
    {
        name: 'Lead Generation Systems',
        nameAr: 'أنظمة توليد العملاء المحتملين',
        tagline: 'Capture Better Inquiries',
        taglineAr: 'استفسارات أفضل',
        description: 'Landing pages, forms, WhatsApp flows, tracking, and follow-up paths for qualified leads.',
        descriptionAr: 'صفحات هبوط، نماذج، مسارات واتساب، تتبع، ومتابعة للعملاء المؤهلين.',
        icon: '/icons/services/Analytics Dashboard.png',
        gradient: 'from-amber-500 to-orange-600',
        glowColor: 'bg-lavender/50',
        href: '/services/lead-generation-systems',
        features: ['Landing Pages', 'Lead Forms', 'WhatsApp Flow', 'Conversion Tracking'],
        featuresAr: ['صفحات هبوط', 'نماذج عملاء', 'مسار واتساب', 'تتبع التحويل'],
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

const mobileAppServices: ServiceCard[] = [
    {
        name: 'Mobile App Development',
        nameAr: 'تطوير تطبيقات الجوال',
        tagline: 'iOS & Android Apps',
        taglineAr: 'تطبيقات iOS وAndroid',
        description: 'Cross-platform mobile apps for customers, staff, booking, payments, delivery, and business operations.',
        descriptionAr: 'تطبيقات جوال متعددة المنصات للعملاء والموظفين والحجز والدفع والتوصيل وتشغيل الأعمال.',
        icon: '/icons/services/Mobile-Responsive Apps.png',
        gradient: 'from-indigo-600 via-sky-500 to-cyan-400',
        glowColor: 'bg-lavender/50',
        href: '/services/mobile-app-development',
        features: ['iOS & Android', 'Admin Dashboard', 'Push Notifications', 'API Integration'],
        featuresAr: ['iOS وAndroid', 'لوحة إدارة', 'إشعارات فورية', 'ربط API'],
    },
    {
        name: 'Progressive Web Apps',
        nameAr: 'تطبيقات ويب تقدمية PWA',
        tagline: 'App Feel, Web Speed',
        taglineAr: 'تجربة تطبيق بسرعة الويب',
        description: 'PWA experiences that work on mobile browsers with offline-ready flows and app-like interaction.',
        descriptionAr: 'تجارب PWA تعمل على متصفحات الجوال مع مسارات جاهزة دون اتصال وتفاعل يشبه التطبيقات.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-cyan-600 via-blue-500 to-indigo-500',
        glowColor: 'bg-lavender/50',
        href: '/services/progressive-web-app-development',
        features: ['Offline Support', 'Installable PWA', 'Fast Loading', 'Mobile UX'],
        featuresAr: ['دعم دون اتصال', 'PWA قابل للتثبيت', 'تحميل سريع', 'تجربة جوال'],
    },
    {
        name: 'Customer & Staff Apps',
        nameAr: 'تطبيقات العملاء والموظفين',
        tagline: 'Operational Mobile Tools',
        taglineAr: 'أدوات تشغيل للجوال',
        description: 'Mobile tools connected to CRM, ERP, inventory, booking, customer support, or internal workflows.',
        descriptionAr: 'أدوات جوال مرتبطة بـ CRM وERP والمخزون والحجز ودعم العملاء وسير العمل الداخلي.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-violet-600 via-indigo-500 to-sky-500',
        glowColor: 'bg-lavender/50',
        href: '/services/mobile-app-development',
        features: ['CRM/ERP Links', 'Role Access', 'Secure Login', 'Team Handoff'],
        featuresAr: ['ربط CRM/ERP', 'صلاحيات', 'دخول آمن', 'تسليم للفريق'],
    },
]

const cloudInfrastructureServices: ServiceCard[] = [
    {
        name: 'Cloud Migration',
        nameAr: 'الترحيل إلى السحابة',
        tagline: 'Move Without Chaos',
        taglineAr: 'انتقال منظم وآمن',
        description: 'Move websites, systems, databases, and internal tools to reliable cloud infrastructure.',
        descriptionAr: 'نقل المواقع والأنظمة وقواعد البيانات والأدوات الداخلية إلى بنية سحابية موثوقة.',
        icon: '/icons/services/systems.png',
        gradient: 'from-sky-500 to-blue-700',
        glowColor: 'bg-lavender/50',
        href: '/services/cloud-migration',
        features: ['Migration Plan', 'Zero-Downtime Path', 'Data Safety', 'Launch Support'],
        featuresAr: ['خطة ترحيل', 'مسار دون توقف', 'حماية البيانات', 'دعم الإطلاق'],
    },
    {
        name: 'Database Setup & Data Migration',
        nameAr: 'إعداد قواعد البيانات ونقل البيانات',
        tagline: 'Clean Data Foundations',
        taglineAr: 'أساس بيانات نظيف',
        description: 'Database setup, data migration, cleanup, backups, and handoff for growing systems.',
        descriptionAr: 'إعداد قواعد البيانات، نقل وتنظيف البيانات، النسخ الاحتياطي، والتسليم للأنظمة النامية.',
        icon: '/icons/services/Admin Dashboard.png',
        gradient: 'from-cyan-500 to-sky-700',
        glowColor: 'bg-lavender/50',
        href: '/services/database-setup',
        features: ['PostgreSQL Setup', 'Data Import', 'Backup Plan', 'Access Control'],
        featuresAr: ['إعداد PostgreSQL', 'استيراد بيانات', 'خطة نسخ احتياطي', 'صلاحيات الوصول'],
    },
    {
        name: 'DevOps & Server Deployment',
        nameAr: 'DevOps ونشر الخوادم',
        tagline: 'Reliable Releases',
        taglineAr: 'إطلاقات مستقرة',
        description: 'Deployment pipelines, hosting setup, monitoring, and release support for web products.',
        descriptionAr: 'مسارات نشر، إعداد استضافة، مراقبة، ودعم إطلاق للمنتجات الرقمية.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-slate-600 to-slate-900',
        glowColor: 'bg-lavender/50',
        href: '/services/devops-support',
        features: ['CI/CD', 'Hosting Setup', 'Monitoring', 'Rollback Plan'],
        featuresAr: ['CI/CD', 'إعداد الاستضافة', 'مراقبة', 'خطة رجوع'],
    },
    {
        name: 'Backup, Security & Performance',
        nameAr: 'النسخ الاحتياطي والأمان والأداء',
        tagline: 'Protect The System',
        taglineAr: 'حماية واستقرار',
        description: 'Security hardening, backups, speed optimization, and practical monitoring for live platforms.',
        descriptionAr: 'تقوية الأمان، نسخ احتياطي، تحسين السرعة، ومراقبة عملية للمنصات العاملة.',
        icon: '/icons/services/Analytics Dashboard.png',
        gradient: 'from-emerald-500 to-slate-700',
        glowColor: 'bg-lavender/50',
        href: '/services/backup-and-security',
        features: ['Backups', 'Security Review', 'Speed Tuning', 'Uptime Checks'],
        featuresAr: ['نسخ احتياطي', 'مراجعة أمان', 'تحسين سرعة', 'فحص تشغيل'],
    },
]

const aiPoweredServices: ServiceCard[] = [
    {
        name: 'AI Customer Support',
        nameAr: 'دعم العملاء بالذكاء الاصطناعي',
        tagline: 'Faster Customer Answers',
        taglineAr: 'ردود أسرع للعملاء',
        description: 'AI chat, knowledge bases, WhatsApp support paths, and handoff to your human team.',
        descriptionAr: 'دردشة AI، قواعد معرفة، مسارات دعم واتساب، وتحويل للفريق البشري عند الحاجة.',
        icon: '/icons/services/Real-time Chat System.png',
        gradient: 'from-fuchsia-500 to-violet-700',
        glowColor: 'bg-lavender/50',
        href: '/services/ai-powered-customer-support',
        features: ['AI Chat', 'Knowledge Base', 'WhatsApp Handoff', 'Support Analytics'],
        featuresAr: ['دردشة AI', 'قاعدة معرفة', 'تحويل واتساب', 'تحليلات دعم'],
    },
    {
        name: 'AI Automation',
        nameAr: 'أتمتة الأعمال بالذكاء الاصطناعي',
        tagline: 'Automate Repeated Work',
        taglineAr: 'أتمتة العمل المتكرر',
        description: 'Automate repetitive admin, sales, reporting, content, and customer operations tasks.',
        descriptionAr: 'أتمتة مهام الإدارة والمبيعات والتقارير والمحتوى وخدمة العملاء المتكررة.',
        icon: '/icons/services/systems.png',
        gradient: 'from-violet-500 to-indigo-700',
        glowColor: 'bg-lavender/50',
        href: '/services/ai-automation',
        features: ['Workflow Design', 'Tool Integration', 'AI Rules', 'Team Handoff'],
        featuresAr: ['تصميم سير عمل', 'ربط أدوات', 'قواعد AI', 'تسليم للفريق'],
    },
    {
        name: 'AI Business Assistants',
        nameAr: 'مساعدو أعمال بالذكاء الاصطناعي',
        tagline: 'Smarter Internal Tools',
        taglineAr: 'أدوات داخلية أذكى',
        description: 'Custom assistants for sales teams, operations, content, FAQs, and internal knowledge.',
        descriptionAr: 'مساعدون مخصصون للمبيعات والعمليات والمحتوى والأسئلة والمعرفة الداخلية.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-purple-500 to-pink-600',
        glowColor: 'bg-lavender/50',
        href: '/services/ai-business-assistants',
        features: ['Private Knowledge', 'Sales Support', 'Internal Search', 'Prompt Design'],
        featuresAr: ['معرفة خاصة', 'دعم المبيعات', 'بحث داخلي', 'تصميم أوامر'],
    },
    {
        name: 'AI Reporting Dashboards',
        nameAr: 'لوحات تقارير بالذكاء الاصطناعي',
        tagline: 'Read The Data Faster',
        taglineAr: 'فهم أسرع للبيانات',
        description: 'Dashboards that summarize metrics, highlight changes, and help teams decide faster.',
        descriptionAr: 'لوحات تلخص المؤشرات، تبرز التغيرات، وتساعد الفريق على اتخاذ القرار بسرعة.',
        icon: '/icons/services/Analytics Dashboard.png',
        gradient: 'from-cyan-500 to-violet-700',
        glowColor: 'bg-lavender/50',
        href: '/services/ai-reporting-dashboards',
        features: ['Metric Summary', 'Trend Alerts', 'Custom Reports', 'Data Connection'],
        featuresAr: ['تلخيص مؤشرات', 'تنبيه تغيرات', 'تقارير مخصصة', 'ربط بيانات'],
    },
]

// EnterpriseServiceIndex content now lives in the visible category cards; expanded serviceCategories detail links follow /services/${service.slug}.
const categories = [
    {
        id: 'digital-presence',
        name: 'Digital Presence',
        nameAr: 'الحضور الرقمي',
        description: 'Company websites, SEO, online stores, content, and lead generation paths that help customers find you and contact you.',
        descriptionAr: 'مواقع شركات، SEO، متاجر إلكترونية، محتوى، ومسارات توليد عملاء تساعد الناس أن يجدوا شركتك ويتواصلوا معها.',
        icon: '/icons/services/digitalpresence.png',
        gradient: 'from-blue-600 via-blue-400 to-teal-400',
        accentColor: 'from-blue-400 to-cyan-400',
        services: digitalPresenceServices,
    },
    {
        id: 'business-systems',
        name: 'Business Systems',
        nameAr: 'أنظمة الأعمال',
        description: 'CRM, ERP, booking, inventory, HR, legal, clinic, and reporting systems built around your daily workflow.',
        descriptionAr: 'أنظمة CRM وERP وحجز ومخزون وموارد بشرية ومكاتب قانونية وعيادات وتقارير مبنية حول سير عملك اليومي.',
        icon: '/icons/services/systems.png',
        gradient: 'from-purple-600 via-purple-400 to-indigo-400',
        accentColor: 'from-purple-400 to-indigo-400',
        services: businessSystemsServices,
    },
    {
        id: 'web-applications',
        name: 'Web Applications',
        nameAr: 'تطبيقات الويب',
        description: 'Web apps, mobile-ready apps, portals, dashboards, SaaS platforms, APIs, and secure user roles.',
        descriptionAr: 'تطبيقات ويب وجوال، بوابات، لوحات إدارة، منصات SaaS، واجهات API، وصلاحيات مستخدمين آمنة.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-emerald-600 via-emerald-400 to-cyan-400',
        accentColor: 'from-emerald-400 to-cyan-400',
        services: webApplicationsServices,
    },
    {
        id: 'mobile-app-development',
        name: 'Mobile App Development',
        nameAr: 'تطوير تطبيقات الجوال',
        description: 'Mobile apps, PWA experiences, customer apps, staff apps, dashboards, APIs, and cloud deployment.',
        descriptionAr: 'تطبيقات جوال، تجارب PWA، تطبيقات عملاء وموظفين، لوحات إدارة، API، ونشر سحابي.',
        icon: '/icons/services/Mobile-Responsive Apps.png',
        gradient: 'from-indigo-600 via-sky-500 to-cyan-400',
        accentColor: 'from-indigo-400 to-sky-400',
        services: mobileAppServices,
    },
    {
        id: 'cloud-infrastructure',
        name: 'Cloud & Infrastructure',
        nameAr: 'السحابة والبنية التحتية',
        description: 'Cloud migration, data migration, hosting, databases, backups, DevOps, performance, monitoring, and security.',
        descriptionAr: 'ترحيل سحابي، نقل بيانات، استضافة، قواعد بيانات، نسخ احتياطي، DevOps، أداء، مراقبة، وأمان.',
        icon: '/icons/services/systems.png',
        gradient: 'from-sky-600 via-cyan-400 to-blue-500',
        accentColor: 'from-sky-400 to-blue-500',
        services: cloudInfrastructureServices,
    },
    {
        id: 'ai-powered-solutions',
        name: 'AI-Powered Solutions',
        nameAr: 'حلول مدعومة بالذكاء الاصطناعي',
        description: 'AI customer care, workflow automation, business assistants, reporting dashboards, and knowledge-base systems.',
        descriptionAr: 'دعم عملاء بالذكاء الاصطناعي، أتمتة أعمال، مساعدين داخليين، لوحات تقارير، وأنظمة معرفة.',
        icon: '/icons/services/Real-time Chat System.png',
        gradient: 'from-violet-600 via-fuchsia-500 to-indigo-500',
        accentColor: 'from-violet-400 to-fuchsia-500',
        services: aiPoweredServices,
    },
]

function ServiceCardComponent({
    service,
    locale,
    index,
    featured = false,
}: {
    service: ServiceCard
    locale: string
    index: number
    featured?: boolean
}) {
    const name = locale === 'ar' ? service.nameAr : service.name
    const tagline = locale === 'ar' ? service.taglineAr : service.tagline
    const description = locale === 'ar' ? service.descriptionAr : service.description
    const features = locale === 'ar' ? service.featuresAr : service.features

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn('group', featured && 'md:col-span-2')}
        >
            <Link href={localePath(locale, service.href)} className="block h-full" aria-label={name}>
                <div className={cn(
                    'relative h-full rounded-lg transition-[box-shadow,transform] duration-300',
                    'hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70'
                )}>
                    <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={100}
                        inactiveZone={0.01}
                        borderWidth={1}
                    />

                    {/* Card surface — white glass on lavender */}
                    <div className={cn(
                        'relative z-10 flex h-full flex-col overflow-hidden rounded-[7px]',
                        'border border-slate-200 transition-[background-color,border-color,box-shadow] duration-300',
                        'bg-white shadow-sm shadow-slate-200/70',
                        'group-hover:border-sky-200 group-hover:bg-[#fbfdff] group-hover:shadow-lg',
                        featured ? 'p-6 md:p-8' : 'p-5'
                    )}>
                        {/* Top-edge shimmer on hover */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Soft violet bloom — top right */}
                        <div className={cn(
                            'absolute rounded-full blur-3xl transition-all duration-700 pointer-events-none',
                            'opacity-0 group-hover:opacity-[0.12]',
                            'bg-gradient-to-br from-sky-200 to-emerald-100',
                            featured ? '-top-16 -right-16 w-72 h-72' : '-top-10 -right-10 w-44 h-44'
                        )} aria-hidden="true" />

                        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                                {locale === 'ar' ? 'جاهز للمؤسسات' : 'Enterprise Ready'}
                            </span>
                            <span className="text-[10px] font-black tracking-[0.18em] text-slate-300">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Header row */}
                        <div className={cn('flex items-start gap-3 mb-3 relative z-10')}>
                            {/* Icon container */}
                            <div className={cn(
                                'flex items-center justify-center flex-shrink-0 rounded-lg transition-[background-color,border-color] duration-300',
                                'bg-slate-50 border border-slate-200',
                                'group-hover:border-sky-200 group-hover:bg-sky-50',
                                featured ? 'w-16 h-16' : 'w-12 h-12'
                            )}>
                                <Image
                                    src={service.icon}
                                    alt={name}
                                    width={featured ? 36 : 28}
                                    height={featured ? 36 : 28}
                                    className={cn(
                                        'object-contain transition-transform duration-500 group-hover:scale-110',
                                        featured ? 'w-9 h-9' : 'w-7 h-7'
                                    )}
                                />
                            </div>

                            <div className="flex-1 min-w-0 pt-0.5">
                                {/* Tagline */}
                                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-amber-600/70 mb-1.5 transition-colors duration-300 group-hover:text-amber-600">
                                    {tagline}
                                </p>
                                {/* Name */}
                                <h3 className={cn(
                                    'font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-slate-900',
                                    featured ? 'text-xl md:text-2xl' : 'text-base'
                                )}>
                                    {name}
                                </h3>
                            </div>

                            {/* Arrow — appears on hover */}
                            <div className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 rtl:-translate-x-1 rtl:group-hover:translate-x-0">
                                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
                                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={cn(
                            'text-slate-600 leading-relaxed relative z-10 mb-3 transition-colors duration-300 group-hover:text-slate-700',
                            featured ? 'text-sm max-w-xl' : 'text-xs'
                        )}>
                            {description}
                        </p>

                        {/* Hairline divider */}
                        <div className="border-t border-slate-100 mb-3 relative z-10 transition-colors duration-300 group-hover:border-violet-100" />

                        {/* Feature chips */}
                        <div className="mt-auto relative z-10 grid gap-1.5">
                            {features.map((feature, idx) => (
                                <span
                                    key={idx}
                                    className={cn(
                                        'inline-flex min-h-8 items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-semibold',
                                        'text-slate-500 bg-slate-50 border border-slate-100/80',
                                        'transition-all duration-300',
                                        'group-hover:text-sky-800 group-hover:bg-sky-50 group-hover:border-sky-100'
                                    )}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5 flex-none text-emerald-500" />
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function ServicesPageClient({ t: pageT }: { t?: any }) {
    const { dir, locale, t: contextT } = useLanguage()
    const t = pageT || contextT
    const [isMobile, setIsMobile] = React.useState(false)
    const [activeCategory, setActiveCategory] = React.useState('digital-presence')

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveCategory(entry.target.id)
                })
            },
            { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        )
        categories.forEach((cat) => {
            const el = document.getElementById(cat.id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    const content = {
        en: {
            badge: 'Our Services',
            preTitle: 'Software, Cloud, AI, and Digital Growth',
            title: 'Service Packages Built Around Real Business Work',
            description: 'CloudTopia designs and develops websites, e-commerce stores, apps, CRM, ERP, cloud migration, data migration, AI customer care, and automation systems with a free consultation and free custom demo preview before production.',
            ctaButton: 'Get a Free Consultation',
            replyNote: 'We typically reply within 10 minutes',
            ctaSecondary: 'View Our Work',
            finalCta: {
                preTitle: 'Ready to Begin?',
                title: 'Start with a free consultation and demo preview',
                description: "Share the project inquiry and we will map the right software, cloud, website, app, or AI automation path before you commit.",
                button: 'Start Your Project',
            }
        },
        ar: {
            badge: 'خدماتنا',
            preTitle: 'برمجيات، سحابة، ذكاء اصطناعي، ونمو رقمي',
            title: 'باقات خدمات مبنية حول عمل شركتك الحقيقي',
            description: 'كلاود توبيا تصمم وتطور مواقع، متاجر، تطبيقات، CRM، ERP، ترحيل سحابي، نقل بيانات، دعم عملاء AI، وأنظمة أتمتة مع استشارة مجانية ومعاينة ديمو مجانية قبل التنفيذ.',
            ctaButton: 'احصل على استشارة مجانية',
            replyNote: 'عادةً ما نرد خلال 10 دقائق',
            ctaSecondary: 'شاهد أعمالنا',
            finalCta: {
                preTitle: 'جاهز للبدء؟',
                title: 'ابدأ باستشارة وديمو مجانيين',
                description: 'أرسل طلب المشروع ونرسم لك المسار المناسب: موقع، تطبيق، نظام، سحابة، أو أتمتة بالذكاء الاصطناعي قبل أي التزام.',
                button: 'ابدأ مشروعك',
            }
        },
    }

    const c = locale === 'ar' ? content.ar : content.en
    const heroTitle = c.title
    const heroDesc = c.description
    const heroBadge = c.badge
    const heroPreTitle = c.preTitle

    const finalCtaPreTitle = t.services?.finalCta?.preTitle || t.services?.finalCTA?.preTitle || c.finalCta.preTitle
    const finalCtaTitle = t.services?.finalCta?.title || t.services?.finalCTA?.title || c.finalCta.title
    const finalCtaDesc = t.services?.finalCta?.description || t.services?.finalCTA?.description || c.finalCta.description
    const finalCtaButton = t.services?.finalCta?.button || t.services?.finalCTA?.button || c.finalCta.button

    return (
        <div className="min-h-screen bg-[#f4f1f8] text-slate-900 selection:bg-sky-200/60" dir={dir}>
            {!isMobile && <TechCursor />}

            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-14 pt-28 sm:px-6 lg:px-8 md:pb-16 md:pt-32"
                aria-label="Services hero"
            >
                {/* Soft radial lavender glow — center */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#dff3ff_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%),repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] blur-[4px] invert pointer-events-none [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" aria-hidden="true" />

                {/* Decorative top edge */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" aria-hidden="true" />

                {/* Faint grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                        backgroundImage: 'linear-gradient(#0284c7 1px, transparent 1px), linear-gradient(to right, #0284c7 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                    aria-hidden="true"
                />

                {/* Ambient amber orb — subtle */}
                <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-sky-300/10 blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="flex flex-col items-center space-y-5">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2.5 rounded-md border border-sky-200 bg-white/75 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 shadow-sm shadow-sky-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                                {heroBadge}
                            </span>
                        </motion.div>

                        {/* Pre-title + Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="space-y-3"
                        >
                            <p className="text-base md:text-lg font-medium text-slate-400 tracking-wide">
                                {heroPreTitle}
                            </p>
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-slate-900"
                                style={{ textWrap: 'balance' } as React.CSSProperties}
                            >
                                {heroTitle}
                            </h1>
                        </motion.div>

                        {/* Gold rule */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.38 }}
                            className="w-14 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                            aria-hidden="true"
                        />

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mx-auto"
                            style={{ textWrap: 'balance' } as React.CSSProperties}
                        >
                            {heroDesc}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.62 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
                        >
                            <a
                                href="mailto:info@cloudtopia.net"
                                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-eerie px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-200 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sky-800 active:scale-95 sm:w-auto"
                                aria-label={c.ctaButton}
                            >
                                {c.ctaButton}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                            </a>
                            <Link
                                href={localePath(locale, '/projects')}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-8 py-3.5 text-sm font-semibold text-slate-700 transition-[background-color,border-color,color] duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-800 sm:w-auto"
                            >
                                {c.ctaSecondary}
                            </Link>
                        </motion.div>

                        {/* Reply note */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.88 }}
                            className="text-[11px] text-slate-400 tracking-wide"
                        >
                            {c.replyNote}
                        </motion.p>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.4, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    aria-hidden="true"
                >
                    <div className="w-px h-10 bg-gradient-to-b from-sky-400/50 to-transparent" />
                </motion.div>
            </section>

            {/* ─── SERVICES ─────────────────────────────────────────── */}
            <div className="bg-[#f4f1f8]">

                {/* Sticky category nav */}
                <nav
                    className="sticky top-0 z-40 border-b border-slate-200 bg-[#f4f1f8]/92 backdrop-blur-xl"
                    aria-label="Service categories"
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex items-center justify-center gap-2 md:gap-3 py-3.5 overflow-x-auto no-scrollbar">
                            {categories.map((category) => {
                                const catName = locale === 'ar' ? category.nameAr : category.name
                                const isActive = activeCategory === category.id
                                return (
                                    <Link
                                        key={category.id}
                                        href={`#${category.id}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={cn(
                                            'group whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 touch-manipulation',
                                            isActive
                                                ? 'bg-white border border-sky-200 text-sky-800 shadow-sm shadow-sky-100'
                                                : 'text-slate-500 hover:text-slate-800 border border-transparent hover:border-slate-200 hover:bg-white/70'
                                        )}
                                    >
                                        <Image
                                            src={category.icon}
                                            alt=""
                                            aria-hidden="true"
                                            width={14}
                                            height={14}
                                            className={cn(
                                                'w-3.5 h-3.5 transition-opacity duration-300',
                                                isActive ? 'opacity-70' : 'opacity-35 group-hover:opacity-60'
                                            )}
                                        />
                                        <span>{catName}</span>
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </nav>

                {/* Category sections */}
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {categories.map((category, catIndex) => {
                        const catName = locale === 'ar' ? category.nameAr : category.name
                        const catDesc = locale === 'ar' ? category.descriptionAr : category.description
                        const [featuredService, ...restServices] = category.services

                        return (
                            <section
                                key={category.id}
                                id={category.id}
                                className="py-10 md:py-16 border-b border-slate-200 last:border-0"
                                aria-labelledby={`cat-heading-${category.id}`}
                            >
                                {/* Category header */}
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
                                    <div className="space-y-2">
                                        {/* Index + accent line */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-[11px] font-black tracking-[0.3em] text-amber-500">
                                                0{catIndex + 1}
                                            </span>
                                            <div className={cn(
                                                'h-px flex-1 max-w-[48px] bg-gradient-to-r',
                                                category.accentColor
                                            )} aria-hidden="true" />
                                        </div>

                                        {/* Category icon + name */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-white border border-slate-200 shadow-sm">
                                                <Image
                                                    src={category.icon}
                                                    alt=""
                                                    aria-hidden="true"
                                                    width={20}
                                                    height={20}
                                                    className="w-5 h-5 opacity-75"
                                                />
                                            </div>
                                            <h2
                                                id={`cat-heading-${category.id}`}
                                                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900"
                                            >
                                                {catName}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Description — right on desktop */}
                                    <p className="max-w-[320px] border-l border-slate-200 pl-4 text-sm leading-relaxed text-slate-500 md:text-right rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4 rtl:md:text-left">
                                        {catDesc}
                                    </p>
                                </div>

                                {/* Featured card — full width */}
                                <div className="mb-3">
                                    <ServiceCardComponent
                                        service={featuredService}
                                        locale={locale as string}
                                        index={0}
                                        featured={true}
                                    />
                                </div>

                                {/* Remaining cards grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {restServices.map((service, idx) => (
                                        <ServiceCardComponent
                                            key={service.name}
                                            service={service}
                                            locale={locale as string}
                                            index={idx + 1}
                                        />
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>
            </div>

            {/* ─── FINAL CTA ─────────────────────────────────────────── */}
            {/* Deep violet/plum section — contrasts beautifully with lavender body */}
            <section
                className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e0b3e 0%, #2d1065 50%, #1a0a38 100%)' }}
                aria-label="Call to action"
            >
                {/* Mesh glow layers */}
                <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-amber-400/8 blur-[100px] pointer-events-none" aria-hidden="true" />

                {/* Top edge shimmer */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" aria-hidden="true" />

                <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center space-y-5"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/20 bg-violet-400/5 text-violet-300 text-[11px] font-bold tracking-[0.2em] uppercase">
                            {finalCtaPreTitle}
                        </span>

                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white"
                            style={{ textWrap: 'balance' } as React.CSSProperties}
                        >
                            {finalCtaTitle}
                        </h2>

                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" aria-hidden="true" />

                        <p className="text-base md:text-lg text-violet-200/60 max-w-lg mx-auto leading-relaxed">
                            {finalCtaDesc}
                        </p>

                        <Link
                            href={localePath(locale, '/contact')}
                            className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-white rounded-xl font-bold text-base transition-all duration-300 hover:bg-amber-400 hover:scale-105 active:scale-95 touch-manipulation shadow-lg shadow-amber-500/25"
                            aria-label={finalCtaButton}
                        >
                            {finalCtaButton}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
