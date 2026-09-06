'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight, Check, Search } from 'lucide-react'
import { localizedDP, type DPPillar } from '@/lib/services/digital-presence'
import type { LocalizedText } from '@/lib/seo/industries'
import { structuredCategoryIds, getStructuredGroups, getStructuredPillars, allStructuredPillars } from '@/lib/services/structured-catalog'
import { getLocalizedPillarSubServiceNames } from '@/lib/services/pillar-subservices-localized'

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
        href: '/services/website-development',
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
        href: '/services/ecommerce-development',
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
        href: '/services/social-media-marketing',
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
        href: '/services/content-creation',
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
        href: '/services/search-engine-optimization',
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
        href: '/services/ui-ux-design-branding',
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
        href: '/services/social-media-marketing/paid-ads-and-lead-generation',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
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
        href: '/services/business-systems-development',
        features: ['EHR/EMR Support', 'Patient Portal', 'Claims Mgmt', 'Lab Integration'],
        featuresAr: ['سجلات طبية إلكترونية', 'بوابة المرضى', 'إدارة المطالبات', 'تكامل المختبر'],
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
        description: 'Your full digital presence — websites, e-commerce, branding, SEO, social, content, support, and analytics, organized around the customer journey.',
        descriptionAr: 'حضورك الرقمي الكامل — مواقع، متاجر، هوية، SEO، تواصل اجتماعي، محتوى، دعم، وتحليلات، منظّمة حول رحلة العميل.',
        icon: '/icons/services/digitalpresence.png',
        gradient: 'from-blue-600 via-blue-400 to-teal-400',
        accentColor: 'from-blue-400 to-cyan-400',
        services: digitalPresenceServices,
    },
    {
        id: 'business-systems-development',
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
        id: 'interactive-web-applications',
        name: 'Web Applications',
        nameAr: 'تطبيقات الويب',
        description: 'Web apps, mobile-ready apps, portals, dashboards, SaaS platforms, APIs, and secure user roles.',
        descriptionAr: 'تطبيقات ويب وجوال، بوابات، لوحات إدارة، منصات SaaS، واجهات API، وصلاحيات مستخدمين آمنة.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-emerald-600 via-emerald-400 to-cyan-400',
        accentColor: 'from-emerald-400 to-cyan-400',
        services: [],
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
        services: [],
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
}: {
    service: ServiceCard
    locale: string
    index: number
}) {
    const name = locale === 'ar' ? service.nameAr : service.name
    const tagline = locale === 'ar' ? service.taglineAr : service.tagline
    const description = locale === 'ar' ? service.descriptionAr : service.description
    const features = locale === 'ar' ? service.featuresAr : service.features

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group h-full"
        >
            <Link
                href={localePath(locale, service.href)}
                aria-label={name}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
                {/* Top accent on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-colors duration-300 group-hover:border-sky-200 group-hover:bg-sky-50">
                        <Image src={service.icon} alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300 transition-all duration-300 group-hover:border-sky-300 group-hover:bg-sky-50 group-hover:text-sky-600 rtl:-scale-x-100">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                </div>

                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600/70">{tagline}</p>
                <h3 className="text-base font-bold leading-snug text-slate-900">{name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {features.slice(0, 4).map((feature, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
                            <Check className="h-3 w-3 shrink-0 text-emerald-500" aria-hidden="true" />
                            {feature}
                        </span>
                    ))}
                </div>
            </Link>
        </motion.div>
    )
}

function PillarCard({ pillar, locale, index }: { pillar: DPPillar; locale: string; index: number }) {
    const name = localizedDP(pillar.name, locale)
    const description = localizedDP(pillar.description, locale)
    const sample = getLocalizedPillarSubServiceNames(pillar.slug, locale, 4)
    // Total sub-service count is whichever list is longer: the localized names
    // resolved by the content getters, or the pillar's raw English subServices
    // (the getters can return fewer than the raw list if some have no page yet).
    const total = Math.max(getLocalizedPillarSubServiceNames(pillar.slug, locale).length, pillar.subServices.length)
    const more = total - sample.length

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35), ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group h-full"
        >
            <Link
                href={localePath(locale, pillar.href)}
                aria-label={name}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition-colors duration-300 group-hover:border-sky-200 group-hover:bg-sky-50">
                        <Image src={pillar.icon} alt="" aria-hidden="true" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
                    </div>
                    {pillar.subServices.length > 0 && (
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{pillar.subServices.length} {locale === 'ar' ? 'خدمة فرعية' : 'sub-services'}</span>
                    )}
                </div>

                <h4 className="text-base font-bold leading-snug text-slate-900">{name}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {sample.map((sub, i) => (
                        <span key={i} className="inline-flex items-center rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">{sub}</span>
                    ))}
                    {more > 0 && (
                        <span className="inline-flex items-center px-1.5 py-1 text-[11px] font-bold text-sky-700">+{more} {locale === 'ar' ? 'المزيد' : 'more'}</span>
                    )}
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-sky-700 transition-colors group-hover:text-sky-900">
                    {locale === 'ar' ? 'استكشف الخدمة' : 'Explore service'}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </span>
            </Link>
        </motion.div>
    )
}

/**
 * Some structured categories have a rich "hub" landing page that is not itself a
 * pillar (so it never appears in the pillar grid). We surface it as a prominent
 * lead card at the top of the category — it's the main entry point.
 */
const CATEGORY_HUB: Record<
    string,
    { href: string; name: LocalizedText; description: LocalizedText; icon: string; cta: LocalizedText }
> = {
    'digital-presence': {
        href: '/services/digital-presence',
        name: { en: 'Digital Presence', ar: 'الحضور الرقمي' },
        description: {
            en: 'The complete hub — website, store, brand, search visibility, social media, and content working as one connected system for business growth.',
            ar: 'المركز المتكامل — الموقع والمتجر والهوية والظهور في البحث والتواصل الاجتماعي والمحتوى ضمن منظومة واحدة مترابطة لنمو الأعمال.',
        },
        icon: '/icons/services/digitalpresence.png',
        cta: { en: 'Explore the full hub', ar: 'استكشف المركز الكامل' },
    },
    'business-systems-development': {
        href: '/services/business-systems-development',
        name: { en: 'Business Systems Development', ar: 'تطوير أنظمة الأعمال' },
        description: {
            en: 'The complete hub — ERP, CRM, process automation, and management systems, engineered around how your business actually runs. Start here for the full picture.',
            ar: 'المركز المتكامل — أنظمة ERP وCRM وأتمتة العمليات وأنظمة الإدارة، مبنية حول طريقة عمل شركتك فعلياً. ابدأ من هنا للصورة الكاملة.',
        },
        icon: '/icons/services/systems.png',
        cta: { en: 'Explore the full hub', ar: 'استكشف المركز الكامل' },
    },
    'interactive-web-applications': {
        href: '/services/web-applications',
        name: { en: 'Web Applications', ar: 'تطبيقات الويب' },
        description: {
            en: 'The complete hub — SaaS platforms, portals, dashboards, and custom-engineered web apps built to scale. Start here for the full overview.',
            ar: 'المركز المتكامل — منصات SaaS وبوابات ولوحات تحكم وتطبيقات ويب مخصصة مبنية للتوسّع. ابدأ من هنا للنظرة الشاملة.',
        },
        icon: '/icons/services/webapps.png',
        cta: { en: 'Explore the full hub', ar: 'استكشف المركز الكامل' },
    },
    'mobile-app-development': {
        href: '/services/app-development',
        name: { en: 'App Development', ar: 'تطوير التطبيقات' },
        description: {
            en: 'The complete hub — iOS, Android & cross-platform apps, designed, built, launched, and grown by one team. Start here for the full overview.',
            ar: 'المركز المتكامل — تطبيقات iOS وأندرويد ومتعددة المنصات، نُصمّمها ونبنيها ونُطلقها وننمّيها بفريق واحد. ابدأ من هنا للنظرة الشاملة.',
        },
        icon: '/icons/services/Mobile-Responsive Apps.png',
        cta: { en: 'Explore the full hub', ar: 'استكشف المركز الكامل' },
    },
}

function CategoryHubCard({
    categoryId,
    hub,
    locale,
}: {
    categoryId: string
    hub: (typeof CATEGORY_HUB)[string]
    locale: string
}) {
    const name = localizedDP(hub.name, locale)
    const description = localizedDP(hub.description, locale)
    const pillarCount = getStructuredPillars(categoryId).length
    const isArabic = locale === 'ar'

    return (
        <motion.div
            data-category-hub={categoryId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group"
        >
            <Link
                href={localePath(locale, hub.href)}
                aria-label={name}
                className="relative isolate grid min-h-52 overflow-hidden rounded-lg border border-blue-950 bg-[#0b3b8f] p-6 text-white shadow-xl shadow-blue-950/15 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-2xl hover:shadow-blue-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-6 md:p-8"
            >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-sky-300" aria-hidden="true" />
                <span className="pointer-events-none absolute -bottom-10 -end-6 h-28 w-28 border border-white/15 bg-white/5" aria-hidden="true" />
                <span className="pointer-events-none absolute end-24 top-6 h-10 w-10 border border-[#fda29b]/50 bg-[#fda29b]/10" aria-hidden="true" />

                <div className="relative z-10 mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white shadow-lg shadow-blue-950/25 sm:mb-0">
                    <Image src={hub.icon} alt="" aria-hidden="true" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
                </div>

                <div className="relative z-10 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={cn(
                            'border border-sky-200/35 bg-sky-300/15 px-2.5 py-1 text-[10px] font-black text-sky-100',
                            isArabic ? 'tracking-normal' : 'uppercase tracking-[0.16em]',
                        )}>
                            {isArabic ? 'مركز الفئة الرئيسي' : 'Main category hub'}
                        </span>
                        <span className="text-[11px] font-bold text-blue-100/75">
                            {pillarCount} {isArabic ? 'خدمات رئيسية' : 'core services'}
                        </span>
                    </div>
                    <h3 className={cn('mt-4 text-balance text-2xl font-black text-white md:text-3xl', isArabic ? 'leading-[1.45]' : 'leading-tight')}>
                        {name}
                    </h3>
                    <p className={cn('mt-3 max-w-3xl text-pretty text-sm text-blue-100/85', isArabic ? 'leading-8' : 'leading-6')}>
                        {description}
                    </p>
                </div>

                <span className="relative z-10 mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-md border border-white bg-white px-4 py-3 text-[13px] font-black text-blue-950 transition-[background-color,color,transform] group-hover:bg-sky-100 group-hover:text-blue-900 sm:mt-0 sm:self-center">
                    {localizedDP(hub.cta, locale)}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                </span>
            </Link>
        </motion.div>
    )
}

function StructuredCategoryGroups({ categoryId, locale }: { categoryId: string; locale: string }) {
    const groups = getStructuredGroups(categoryId) ?? []
    const hub = CATEGORY_HUB[categoryId]
    return (
        <div className="space-y-10">
            {hub && <CategoryHubCard categoryId={categoryId} hub={hub} locale={locale} />}
            {groups.map((group) => (
                <section key={group.slug} aria-label={localizedDP(group.name, locale)}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600/80">{localizedDP(group.tagline, locale)}</p>
                    <div className="mb-4 mt-1 flex items-center gap-2">
                        <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">{localizedDP(group.name, locale)}</h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{group.pillars.length}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {group.pillars.map((pillar, i) => (
                            <PillarCard key={pillar.slug} pillar={pillar} locale={locale} index={i} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

/**
 * SEO + accessibility index of the full catalog. The tabbed catalog above only
 * mounts ONE category panel at a time, so without this block the server-rendered
 * HTML contains links for just the initially-active category — crawlers never
 * reach the other categories' pillar pages. This nav keeps every category's hub
 * and pillar links present in the SSR DOM; `sr-only` removes it visually without
 * removing it from the document, so the visible tabbed design is unchanged and
 * screen-reader users get a direct index of all services.
 */
function AllServicesIndexNav({ locale }: { locale: string }) {
    const isArabic = locale === 'ar'
    return (
        <nav className="sr-only" aria-label={isArabic ? 'جميع الخدمات حسب الفئة' : 'All services by category'}>
            {categories.map((category) => {
                const hub = CATEGORY_HUB[category.id]
                const pillars = getStructuredPillars(category.id)
                return (
                    <React.Fragment key={category.id}>
                        <h3>{isArabic ? category.nameAr : category.name}</h3>
                        <ul>
                            {hub && (
                                <li>
                                    <Link href={localePath(locale, hub.href)}>{localizedDP(hub.name, locale)}</Link>
                                </li>
                            )}
                            {pillars.map((pillar) => (
                                <li key={pillar.slug}>
                                    <Link href={localePath(locale, pillar.href)}>{localizedDP(pillar.name, locale)}</Link>
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                )
            })}
        </nav>
    )
}

export default function ServicesPageClient({ t: pageT }: { t?: any }) {
    const { dir, locale, t: contextT } = useLanguage()
    const t = pageT || contextT
    const [activeCategory, setActiveCategory] = React.useState('digital-presence')
    const [query, setQuery] = React.useState('')

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

    const q = query.trim().toLowerCase()
    const matchesQuery = (service: ServiceCard) =>
        [service.name, service.nameAr, service.tagline, service.taglineAr, service.description, service.descriptionAr]
            .join(' ')
            .toLowerCase()
            .includes(q)

    const activeCat = categories.find((cat) => cat.id === activeCategory) ?? categories[0]
    const isStructured = structuredCategoryIds.includes(activeCategory)

    // Structured categories (Digital Presence, Business Systems…) render as grouped
    // pillars; the remaining categories stay flat.
    const structuredPillarMatches = q
        ? allStructuredPillars.filter((p) => [p.name.en, p.name.ar, ...p.subServices].join(' ').toLowerCase().includes(q))
        : []
    const serviceMatches = q
        ? categories.filter((cat) => !structuredCategoryIds.includes(cat.id)).flatMap((cat) => cat.services.filter(matchesQuery))
        : []
    const flatServices = q ? serviceMatches : isStructured ? [] : activeCat.services
    const resultCount = serviceMatches.length + structuredPillarMatches.length
    const gridKey = q ? `q:${q}` : activeCat.id

    return (
        <div className="min-h-screen bg-[#f4f1f8] text-slate-900 selection:bg-sky-200/60" dir={dir}>

            {/* ─── HERO (original light background restored) ─────────── */}
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

                {/* Ambient orb */}
                <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-sky-300/10 blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="flex flex-col items-center space-y-5">
                        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <span className="inline-flex items-center gap-2.5 rounded-md border border-sky-200 bg-white/75 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 shadow-sm shadow-sky-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                                {heroBadge}
                            </span>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }} className="space-y-3">
                            <p className="text-base md:text-lg font-medium text-slate-400 tracking-wide">{heroPreTitle}</p>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-slate-900" style={{ textWrap: 'balance' } as React.CSSProperties}>
                                {heroTitle}
                            </h2>
                        </motion.div>

                        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.38 }} className="w-14 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" aria-hidden="true" />

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mx-auto" style={{ textWrap: 'balance' } as React.CSSProperties}>
                            {heroDesc}
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                            <a href="mailto:info@cloudtopia.net" className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-eerie px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-200 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-sky-800 active:scale-95 sm:w-auto" aria-label={c.ctaButton}>
                                {c.ctaButton}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                            </a>
                            <Link href={localePath(locale, '/projects')} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-8 py-3.5 text-sm font-semibold text-slate-700 transition-[background-color,border-color,color] duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-800 sm:w-auto">
                                {c.ctaSecondary}
                            </Link>
                        </motion.div>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="text-[11px] text-slate-400 tracking-wide">{c.replyNote}</motion.p>
                    </div>
                </div>
            </section>

            {/* ─── CATALOG (two-pane sidebar) ───────────────────────── */}
            <div className="bg-[#f4f1f8]">
                <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{locale === 'ar' ? 'تصفّح كل الخدمات' : 'Browse all services'}</h2>
                            <p className="mt-2 text-sm text-slate-500">{locale === 'ar' ? 'اختر فئة من القائمة، أو ابحث عمّا تحتاجه.' : 'Pick a category from the list, or search for what you need.'}</p>
                        </div>
                        <div className="relative w-full max-w-sm">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3.5" aria-hidden="true" />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={locale === 'ar' ? 'ابحث في الخدمات…' : 'Search services…'}
                                aria-label={locale === 'ar' ? 'ابحث في الخدمات' : 'Search services'}
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow-sm transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 rtl:pl-4 rtl:pr-10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                        {/* Sidebar — categories */}
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <nav
                                className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
                                aria-label={locale === 'ar' ? 'فئات الخدمات' : 'Service categories'}
                            >
                                {categories.map((category) => {
                                    const isActive = !q && activeCategory === category.id
                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => { setQuery(''); setActiveCategory(category.id) }}
                                            aria-pressed={isActive}
                                            className={cn(
                                                'group flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 lg:w-full rtl:text-right',
                                                isActive
                                                    ? 'border-sky-200 bg-white shadow-sm shadow-sky-100'
                                                    : 'border-transparent bg-white/50 hover:border-slate-200 hover:bg-white'
                                            )}
                                        >
                                            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200', isActive ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-slate-50 group-hover:border-sky-200 group-hover:bg-sky-50')}>
                                                <Image src={category.icon} alt="" aria-hidden="true" width={18} height={18} className="h-[18px] w-[18px] object-contain opacity-80" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className={cn('block whitespace-nowrap text-sm font-bold transition-colors duration-200 lg:whitespace-normal lg:leading-tight', isActive ? 'text-sky-900' : 'text-slate-700 group-hover:text-slate-900')}>
                                                    {locale === 'ar' ? category.nameAr : category.name}
                                                </span>
                                                <span className="hidden text-[11px] text-slate-400 lg:block">{(structuredCategoryIds.includes(category.id) ? getStructuredPillars(category.id).length : category.services.length)} {locale === 'ar' ? 'خدمة' : 'services'}</span>
                                            </span>
                                            <ArrowRight className={cn('hidden h-4 w-4 shrink-0 transition-all duration-200 lg:block rtl:rotate-180', isActive ? 'text-sky-500 opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100')} aria-hidden="true" />
                                        </button>
                                    )
                                })}
                            </nav>
                        </aside>

                        {/* Right panel */}
                        <div className="min-w-0">
                            {isStructured && !q ? (
                                <motion.div key={`grp-${activeCategory}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                    <StructuredCategoryGroups categoryId={activeCategory} locale={locale as string} />
                                </motion.div>
                            ) : (
                                <>
                                    {!q ? (
                                        <div className="mb-6 flex items-end gap-3">
                                            <div className={cn('h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b', activeCat.accentColor)} aria-hidden="true" />
                                            <div>
                                                <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{locale === 'ar' ? activeCat.nameAr : activeCat.name}</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-slate-500">{locale === 'ar' ? activeCat.descriptionAr : activeCat.description}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mb-6 text-sm text-slate-500">{resultCount} {locale === 'ar' ? 'نتيجة' : 'results'} · “{query}”</p>
                                    )}

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={gridKey}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                                        >
                                            {structuredPillarMatches.map((pillar, idx) => (
                                                <PillarCard key={`pillar-${pillar.slug}`} pillar={pillar} locale={locale as string} index={idx} />
                                            ))}
                                            {flatServices.map((service, idx) => (
                                                <ServiceCardComponent key={`${gridKey}-${service.name}`} service={service} locale={locale as string} index={structuredPillarMatches.length + idx} />
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>

                                    {q && resultCount === 0 && (
                                        <p className="py-20 text-center text-base text-slate-500">{locale === 'ar' ? `لا توجد خدمات مطابقة لـ "${query}".` : `No services match "${query}".`}</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <AllServicesIndexNav locale={locale as string} />
                </div>
            </div>

            {/* ─── FINAL CTA (original) ─────────────────────────────── */}
            <section
                className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e0b3e 0%, #2d1065 50%, #1a0a38 100%)' }}
                aria-label="Call to action"
            >
                <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-amber-400/8 blur-[100px] pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" aria-hidden="true" />

                <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex flex-col items-center space-y-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/20 bg-violet-400/5 text-violet-300 text-[11px] font-bold tracking-[0.2em] uppercase">{finalCtaPreTitle}</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white" style={{ textWrap: 'balance' } as React.CSSProperties}>{finalCtaTitle}</h2>
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" aria-hidden="true" />
                        <p className="text-base md:text-lg text-violet-200/60 max-w-lg mx-auto leading-relaxed">{finalCtaDesc}</p>
                        <a href={`/api/whatsapp?locale=${locale}`} className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-white rounded-xl font-bold text-base transition-all duration-300 hover:bg-amber-400 hover:scale-105 active:scale-95 touch-manipulation shadow-lg shadow-amber-500/25" aria-label={finalCtaButton}>
                            {finalCtaButton}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
