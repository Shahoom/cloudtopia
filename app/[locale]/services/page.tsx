'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import TechCursor from '@/components/ui/tech-cursor'
import dynamic from 'next/dynamic'

const ProceduralGroundBackground = dynamic(() => import('@/components/ui/procedural-ground-background'), { ssr: false })

interface ServiceCard {
    name: string
    nameAr: string
    nameTr: string
    tagline: string
    taglineAr: string
    taglineTr: string
    description: string
    descriptionAr: string
    descriptionTr: string
    icon: string
    gradient: string
    glowColor: string
    href: string
    features: string[]
    featuresAr: string[]
    featuresTr: string[]
}

// Digital Presence Services
const digitalPresenceServices: ServiceCard[] = [
    {
        name: 'Website Design & Development',
        nameAr: 'تصميم وتطوير المواقع',
        nameTr: 'Web Sitesi Tasarım & Geliştirme',
        tagline: 'Premium Web Experiences',
        taglineAr: 'تجارب ويب متميزة',
        taglineTr: 'Üstün Web Deneyimleri',
        description: 'Custom-designed, responsive websites that captivate visitors and convert them into customers.',
        descriptionAr: 'مواقع ويب مصممة حسب الطلب وسريعة الاستجابة تجذب الزوار وتحولهم إلى عملاء.',
        descriptionTr: 'Ziyaretçileri etkileyen ve müşteriye dönüştüren özel tasarım, duyarlı web siteleri.',
        icon: '/icons/services/Website Design & Development.png',
        gradient: 'from-blue-500 to-blue-700',
        glowColor: 'bg-lavender/50',
        href: '/website-design',
        features: ['Custom Design', 'Mobile-First', 'SEO Optimized', 'Fast Loading'],
        featuresAr: ['تصميم مخصص', 'الجوال أولاً', 'محسن لمحركات البحث', 'سرعة تحميل عالية'],
        featuresTr: ['Özel Tasarım', 'Mobil Öncelikli', 'SEO Uyumlu', 'Hızlı Yükleme'],
    },
    {
        name: 'E-commerce Solutions',
        nameAr: 'حلول التجارة الإلكترونية',
        nameTr: 'E-ticaret Çözümleri',
        tagline: 'Sell Online Successfully',
        taglineAr: 'بيع ناجح عبر الإنترنت',
        taglineTr: 'Çevrimiçi Başarıyla Satış Yapın',
        description: 'Complete e-commerce solutions to launch and grow your online store.',
        descriptionAr: 'حلول تجارة إلكترونية متكاملة لإطلاق وتنمية متجرك الإلكتروني.',
        descriptionTr: 'Çevrimiçi mağazanızı başlatmak ve büyütmek için eksiksiz e-ticaret çözümleri.',
        icon: '/icons/services/E-commerce Solutions.png',
        gradient: 'from-cyan-500 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/ecommerce-solutions',
        features: ['Product Catalog', 'Secure Checkout', 'Order Management', 'Shipping Integration'],
        featuresAr: ['كتالوج المنتجات', 'دفع آمن', 'إدارة الطلبات', 'تكامل الشحن'],
        featuresTr: ['Ürün Kataloğu', 'Güvenli Ödeme', 'Sipariş Yönetimi', 'Kargo Entegrasyonu'],
    },
    {
        name: 'Restaurant QR Menu',
        nameAr: 'قائمة QR للمطاعم',
        nameTr: 'Restoran QR Menü',
        tagline: 'Digital Dining Experience',
        taglineAr: 'تجربة طعام رقمية',
        taglineTr: 'Dijital Yemek Deneyimi',
        description: 'Interactive digital menus with QR codes for modern restaurants and cafes.',
        descriptionAr: 'قوائم رقمية تفاعلية برموز QR للمطاعم والمقاهي الحديثة.',
        descriptionTr: 'Modern restoranlar ve kafeler için QR kodlu etkileşimli dijital menüler.',
        icon: '/icons/services/Restaurant QR Menu Systems.png',
        gradient: 'from-orange-500 to-red-600',
        glowColor: 'bg-lavender/50',
        href: '/restaurant-qr-menu',
        features: ['Easy Updates', 'Multi-language', 'Analytics', 'No App Needed'],
        featuresAr: ['تحديثات سهلة', 'متعدد اللغات', 'تحليلات', 'بدون تطبيق'],
        featuresTr: ['Kolay Güncelleme', 'Çok Dilli', 'Analizler', 'Uygulama Gerektirmez'],
    },
    {
        name: 'Social Media Management',
        nameAr: 'إدارة وسائل التواصل الاجتماعي',
        nameTr: 'Sosyal Medya Yönetimi',
        tagline: 'Engage & Grow Your Audience',
        taglineAr: 'تفاعل مع جمهورك ونمّه',
        taglineTr: 'Kitlenizle Etkileşime Geçin ve Büyütün',
        description: 'Strategic social media management to build your brand and engage your community.',
        descriptionAr: 'إدارة استراتيجية لوسائل التواصل الاجتماعي لبناء علامتك التجارية والتفاعل مع مجتمعك.',
        descriptionTr: 'Markanızı oluşturmak ve topluluğunuzla etkileşim kurmak için stratejik sosyal medya yönetimi.',
        icon: '/icons/services/Social Media Management.png',
        gradient: 'from-pink-500 to-purple-600',
        glowColor: 'bg-lavender/50',
        href: '/social-media-marketing',
        features: ['Content Strategy', 'Community Management', 'Paid Ads', 'Analytics'],
        featuresAr: ['استراتيجية المحتوى', 'إدارة المجتمع', 'الإعلانات المدفوعة', 'تحليلات'],
        featuresTr: ['İçerik Stratejisi', 'Topluluk Yönetimi', 'Ücretli Reklamlar', 'Analizler'],
    },
    {
        name: 'Professional Content Creation',
        nameAr: 'إنشاء محتوى احترافي',
        nameTr: 'Profesyonel İçerik Üretimi',
        tagline: 'Content That Converts',
        taglineAr: 'محتوى يحقق النتائج',
        taglineTr: 'Dönüşüm Sağlayan İçerik',
        description: 'High-quality visual and written content that tells your brand story.',
        descriptionAr: 'محتوى مرئي ومكتوب عالي الجودة يروي قصة علامتك التجارية.',
        descriptionTr: 'Marka hikayenizi anlatan yüksek kaliteli görsel ve yazılı içerik.',
        icon: '/icons/services/Professional Content Creation.png',
        gradient: 'from-violet-500 to-indigo-600',
        glowColor: 'bg-lavender/50',
        href: '/content-creation',
        features: ['Photography', 'Video Production', 'Copywriting', 'Brand Assets'],
        featuresAr: ['التصوير', 'إنتاج الفيديو', 'كتابة الإعلانات', 'أصول العلامة التجارية'],
        featuresTr: ['Fotoğrafçılık', 'Video Prodüksiyonu', 'Metin Yazarlığı', 'Marka Varlıkları'],
    },
]

// Business Systems Services
const businessSystemsServices: ServiceCard[] = [
    {
        name: 'CRM Systems',
        nameAr: 'أنظمة إدارة علاقات العملاء (CRM)',
        nameTr: 'CRM Sistemleri',
        tagline: 'Sales & Growth Engine',
        taglineAr: 'محرك المبيعات والنمو',
        taglineTr: 'Satış ve Büyüme Motoru',
        description: 'Centralize customer data, track sales pipelines, and automate marketing for maximum ROI.',
        descriptionAr: 'مركزية بيانات العملاء، وتتبع مسارات المبيعات، وأتمتة التسويق لتحقيق أقصى عائد على الاستثمار.',
        descriptionTr: 'Müşteri verilerini merkezileştirin, satış kanallarını takip edin ve maksimum YG için pazarlamayı otomatize edin.',
        icon: '/icons/services/CRM System.png',
        gradient: 'from-purple-500 to-purple-700',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Lead Tracking', 'Pipeline Mgmt', 'Marketing Auto', 'Insightful Reports'],
        featuresAr: ['إدارة العملاء', 'مسار المبيعات', 'أتمتة التسويق', 'تقارير ذكية'],
        featuresTr: ['Potansiyel Takibi', 'Kanal Yönetimi', 'Pazarlama Otom.', 'Detaylı Raporlar'],
    },
    {
        name: 'Booking & Appointment Systems',
        nameAr: 'أنظمة الحجز والمواعيد',
        nameTr: 'Rezervasyon ve Randevu Sistemleri',
        tagline: 'Automated Scheduling',
        taglineAr: 'جدولة آمنة وتلقائية',
        taglineTr: 'Otomatik Planlama',
        description: 'Streamline reservations with real-time availability, secure payments, and automated reminders.',
        descriptionAr: 'تبسيط الحجوزات مع التوفر في الوقت الفعلي، والمدفوعات الآمنة، والتذكيرات التلقائية.',
        descriptionTr: 'Gerçek zamanlı müsaitlik, güvenli ödemeler ve otomatik hatırlatıcılarla rezervasyonları kolaylaştırın.',
        icon: '/icons/services/Booking System.png',
        gradient: 'from-pink-500 to-pink-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Real-time Sync', 'Online Payment', 'Reminders', 'Calendar Mgmt'],
        featuresAr: ['مزامنة فورية', 'دفع إلكتروني', 'تذكيرات', 'إدارة التقويم'],
        featuresTr: ['Anlık Senkronizasyon', 'Online Ödeme', 'Hatırlatıcılar', 'Takvim Yönetimi'],
    },
    {
        name: 'Inventory & Stock Management',
        nameAr: 'أنظمة إدارة المخزون والمستودعات',
        nameTr: 'Envanter ve Stok Yönetimi',
        tagline: 'Precise Stock Tracking',
        taglineAr: 'تتبع المخزون بدقة',
        taglineTr: 'Hassas Stok Takibi',
        description: 'Real-time inventory tracking with multi-warehouse support and automatic reorder alerts.',
        descriptionAr: 'تتبع المخزون في الوقت الفعلي مع دعم المستودعات المتعددة وتنبيهات إعادة الطلب التلقائية.',
        descriptionTr: 'Çoklu depo desteği ve otomatik yeniden sipariş uyarıları ile gerçek zamanlı envanter takibi.',
        icon: '/icons/services/Inventory Management.png',
        gradient: 'from-emerald-500 to-emerald-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Multi-warehouse', 'Auto-Reordering', 'Stock Alerts', 'Movement Sync'],
        featuresAr: ['مستودعات متعددة', 'إعادة طلب تلقائي', 'تنبيهات المخزون', 'مزامنة الحركة'],
        featuresTr: ['Çoklu Depo', 'Otomatik Sipariş', 'Stok Uyarıları', 'Hareket Senkronizasyonu'],
    },
    {
        name: 'ERP (Enterprise Resource Planning)',
        nameAr: 'أنظمة تخطيط موارد المؤسسات (ERP)',
        nameTr: 'ERP (Kurumsal Kaynak Planlama)',
        tagline: 'Unified Enterprise Operations',
        taglineAr: 'عمليات مؤسسية موحدة',
        taglineTr: 'Birleşik Kurumsal Operasyonlar',
        description: 'Integrate your core business processes—finance, supply chain, and HR—into one seamless platform.',
        descriptionAr: 'دمج عمليات عملك الأساسية — المالية وسلسلة التوريد والموارد البشرية — في منصة واحدة سلسة.',
        descriptionTr: 'Finans, tedarik zinciri ve İK gibi temel iş süreçlerinizi tek bir kusursuz platformda birleştirin.',
        icon: '/icons/services/systems.png',
        gradient: 'from-blue-600 to-indigo-700',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Financial Control', 'Supply Chain', 'HR Integration', 'Business Intelligence'],
        featuresAr: ['الرقابة المالية', 'سلسلة التوريد', 'تكامل الموارد البشرية', 'ذكاء الأعمال'],
        featuresTr: ['Finansal Kontrol', 'Tedarik Zinciri', 'İK Entegrasyonu', 'İş Zekası'],
    },
    {
        name: 'HR & Employee Management',
        nameAr: 'أنظمة الموارد البشرية والموظفين',
        nameTr: 'İK ve Personel Yönetimi',
        tagline: 'Empower Your Workforce',
        taglineAr: 'تمكين القوى العاملة لديك',
        taglineTr: 'İş Gücünüzü Güçlendirin',
        description: 'Manage payroll, attendance, and recruitment through a modern self-service employee portal.',
        descriptionAr: 'إدارة الرواتب والحضور والتوظيف من خلال بوابة خدمة ذاتية حديثة للموظفين.',
        descriptionTr: 'Modern bir self-servis çalışan portalı aracılığıyla bordro, devam takibi ve işe alımı yönetin.',
        icon: '/icons/services/HR Management.png',
        gradient: 'from-teal-500 to-teal-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Payroll Mgmt', 'Shift Scheduling', 'Performance Metrics', 'Self Service Portal'],
        featuresAr: ['إدارة الرواتب', 'جدولة الورديات', 'مقاييس الأداء', 'بوابة الخدمة الذاتية'],
        featuresTr: ['Bordro Yönetimi', 'Vardiya Planlama', 'Performans Ölçümleri', 'Self Servis Portalı'],
    },
    {
        name: 'Law Practice Management',
        nameAr: 'أنظمة إدارة المكاتب القانونية',
        nameTr: 'Hukuk Ofisi Yönetimi',
        tagline: 'Digital Legal Operations',
        taglineAr: 'عمليات قانونية رقمية',
        taglineTr: 'Dijital Hukuki Operasyonlar',
        description: 'Specialized tools for case tracking, legal documentation, and automated billing for law firms.',
        descriptionAr: 'أدوات متخصصة لتتبع القضايا والتوثيق القانوني والفواتير الآلية لمكاتب المحاماة.',
        descriptionTr: 'Hukuk büroları için dava takibi, hukuki dokümantasyon ve otomatik faturalandırma için özel araçlar.',
        icon: '/icons/services/Admin Dashboard.png',
        gradient: 'from-slate-600 to-slate-800',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['Case Mgmt', 'Doc Automation', 'Billing & Invoicing', 'Conflict Checks'],
        featuresAr: ['إدارة القضايا', 'أتمتة المستندات', 'الفواتير', 'فحص التعارض'],
        featuresTr: ['Dava Yönetimi', 'Doküman Otom.', 'Faturalandırma', 'Çakışma Kontrolleri'],
    },
    {
        name: 'Clinic / Medical Practice Systems',
        nameAr: 'أنظمة إدارة العيادات والمراكز الطبية',
        nameTr: 'Klinik / Tıbbi Uygulama Sistemleri',
        tagline: 'Smarter Patient Care',
        taglineAr: 'رعاية أذكى للمرضى',
        taglineTr: 'Daha Akıllı Hasta Bakımı',
        description: 'Comprehensive patient record management, scheduling, and billing specifically for healthcare.',
        descriptionAr: 'إدارة شاملة لسجلات المرضى والجدولة والفواتير المصممة خصيصاً لقطاع الرعاية الصحية.',
        descriptionTr: 'Sağlık hizmetleri için özel olarak kapsamlı hasta kaydı yönetimi, planlama ve faturalandırma.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-blue-400 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/business-systems-development',
        features: ['EHR/EMR Support', 'Patient Portal', 'Claims Mgmt', 'Lab Integration'],
        featuresAr: ['سجلات طبية إلكترونية', 'بوابة المرضى', 'إدارة المطالبات', 'تكامل المختبر'],
        featuresTr: ['EHR/EMR Desteği', 'Hasta Portalı', 'Talep Yönetimi', 'Laboratuvar Ent.'],
    },
]

// Web Applications Services
const webApplicationsServices: ServiceCard[] = [
    {
        name: 'SaaS Platforms',
        nameAr: 'منصات SaaS',
        nameTr: 'SaaS Platformları',
        tagline: 'Scalable Cloud Software',
        taglineAr: 'برمجيات سحابية قابلة للتوسع',
        taglineTr: 'Ölçeklenebilir Bulut Yazılımı',
        description: 'Multi-tenant SaaS applications with subscription billing and analytics.',
        descriptionAr: 'تطبيقات SaaS متعددة المستأجرين مع فواتير الاشتراك والتحليلات.',
        descriptionTr: 'Abonelik faturalandırması ve analizler içeren çok kiracılı SaaS uygulamaları.',
        icon: '/icons/services/Admin Dashboard.png',
        gradient: 'from-purple-500 to-purple-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Multi-tenant', 'Subscription Billing', 'API Access', 'Analytics'],
        featuresAr: ['متعدد المستأجرين', 'فواتير الاشتراك', 'واجهة API', 'تحليلات'],
        featuresTr: ['Çok Kiracılı', 'Abonelik Fatura', 'API Erişimi', 'Analizler'],
    },
    {
        name: 'E-commerce Platforms',
        nameAr: 'منصات التجارة الإلكترونية',
        nameTr: 'E-ticaret Platformları',
        tagline: 'Complete Commerce Solutions',
        taglineAr: 'حلول تجارة متكاملة',
        taglineTr: 'Eksiksiz Ticaret Çözümleri',
        description: 'Full-featured e-commerce platforms with payment integration and order management.',
        descriptionAr: 'منصات تجارة إلكترونية متكاملة مع تكامل الدفع وإدارة الطلبات.',
        descriptionTr: 'Ödeme entegrasyonu ve sipariş yönetimi içeren tam özellikli e-ticaret platformları.',
        icon: '/icons/services/E-commerce Solutions.png',
        gradient: 'from-teal-500 to-teal-600',
        glowColor: 'bg-lavender/50',
        href: '/ecommerce-solutions',
        features: ['Product Management', 'Secure Payments', 'Order Tracking', 'Multi-vendor'],
        featuresAr: ['إدارة المنتجات', 'دفع آمن', 'تتبع الطلبات', 'متعدد البائعين'],
        featuresTr: ['Ürün Yönetimi', 'Güvenli Ödeme', 'Sipariş Takibi', 'Pazaryeri Desteği'],
    },
    {
        name: 'Customer Portals',
        nameAr: 'بوابات العملاء',
        nameTr: 'Müşteri Portalları',
        tagline: 'Secure Client Access',
        taglineAr: 'وصول آمن للعملاء',
        taglineTr: 'Güvenli Müşteri Erişimi',
        description: 'Custom client portals for account management and document access.',
        descriptionAr: 'بوابات عملاء مخصصة لإدارة الحسابات والوصول للمستندات.',
        descriptionTr: 'Hesap yönetimi ve döküman erişimi için özel müşteri portalları.',
        icon: '/icons/services/Customer Portal.png',
        gradient: 'from-cyan-500 to-cyan-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Secure Login', 'Profile Management', 'Document Access', 'Support Chat'],
        featuresAr: ['تسجيل دخول آمن', 'إدارة الملف', 'الوصول للمستندات', 'دردشة الدعم'],
        featuresTr: ['Güvenli Giriş', 'Profil Yönetimi', 'Doküman Erişimi', 'Destek Sohbeti'],
    },
    {
        name: 'Booking Platforms',
        nameAr: 'منصات الحجز',
        nameTr: 'Rezervasyon Platformları',
        tagline: 'Online Reservation Systems',
        taglineAr: 'أنظمة الحجز عبر الإنترنت',
        taglineTr: 'Online Rezervasyon Sistemleri',
        description: 'Professional booking platforms for hotels, clinics, and service businesses.',
        descriptionAr: 'منصات حجز احترافية للفنادق والعيادات وشركات الخدمات.',
        descriptionTr: 'Oteller, klinikler ve hizmet işletmeleri için profesyonel rezervasyon platformları.',
        icon: '/icons/services/Booking Platform.png',
        gradient: 'from-pink-500 to-pink-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Real-time Availability', 'Online Payments', 'SMS Reminders', 'Calendar Sync'],
        featuresAr: ['التوفر الفوري', 'الدفع الإلكتروني', 'تذكيرات SMS', 'مزامنة التقويم'],
        featuresTr: ['Anlık Müsaitlik', 'Online Ödemeler', 'SMS Hatırlatıcılar', 'Takvim Senk.'],
    },
    {
        name: 'Mobile-Responsive Apps',
        nameAr: 'تطبيقات متجاوبة للجوال',
        nameTr: 'Mobil Uyumlu Uygulamalar',
        tagline: 'Apps That Work Everywhere',
        taglineAr: 'تطبيقات تعمل في كل مكان',
        taglineTr: 'Her Yerde Çalışan Uygulamalar',
        description: 'Progressive web applications that work seamlessly on any device.',
        descriptionAr: 'تطبيقات ويب تقدمية تعمل بسلاسة على أي جهاز.',
        descriptionTr: 'Herhangi bir cihazda sorunsuz çalışan aşamalı web uygulamaları (PWA).',
        icon: '/icons/services/Mobile-Responsive Apps.png',
        gradient: 'from-blue-500 to-blue-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['PWA Ready', 'Offline Support', 'Push Notifications', 'App-like UX'],
        featuresAr: ['جاهز لـ PWA', 'دعم بدون اتصال', 'إشعارات فورية', 'تجربة تطبيق'],
        featuresTr: ['PWA Hazır', 'Çevrimdışı Destek', 'Push Bildirimleri', 'Uygulama Deneyimi'],
    },
    {
        name: 'Real-time Chat Systems',
        nameAr: 'أنظمة الدردشة الفورية',
        nameTr: 'Gerçek Zamanlı Sohbet Sistemleri',
        tagline: 'Instant Communication',
        taglineAr: 'تواصل فوري',
        taglineTr: 'Anlık İletişim',
        description: 'Real-time chat and messaging systems for customer support and team collaboration.',
        descriptionAr: 'أنظمة دردشة ومراسلة فورية لدعم العملاء وتعاون الفريق.',
        descriptionTr: 'Müşteri desteği ve ekip işbirliği için gerçek zamanlı sohbet ve mesajlaşma sistemleri.',
        icon: '/icons/services/Real-time Chat System.png',
        gradient: 'from-cyan-500 to-cyan-600',
        glowColor: 'bg-lavender/50',
        href: '/web-applications',
        features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'Message History'],
        featuresAr: ['رسائل فورية', 'مشاركة الملفات', 'محادثات جماعية', 'سجل الرسائل'],
        featuresTr: ['Anlık Mesajlaşma', 'Dosya Paylaşımı', 'Grup Sohbetleri', 'Mesaj Geçmişi'],
    },
]

const categories = [
    {
        id: 'digital-presence',
        name: 'Digital Presence',
        nameAr: 'الحضور الرقمي',
        nameTr: 'Dijital Varlık',
        description: 'Build your online presence with stunning websites, SEO, and social media management.',
        descriptionAr: 'ابنِ حضورك الرقمي مع مواقع ويب مذهلة وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي.',
        descriptionTr: 'Etkileyici web siteleri, SEO ve sosyal medya yönetimi ile çevrimiçi varlığınızı oluşturun.',
        icon: '/icons/services/digitalpresence.png',
        gradient: 'from-blue-600 via-blue-400 to-teal-400',
        accentColor: 'from-blue-400 to-cyan-400',
        services: digitalPresenceServices,
    },
    {
        id: 'business-systems',
        name: 'Business Systems',
        nameAr: 'أنظمة الأعمال',
        nameTr: 'İş Sistemleri',
        description: 'Streamline operations with custom CRM, POS, inventory, and HR management systems.',
        descriptionAr: 'حسّن عملياتك مع أنظمة CRM ونقاط البيع والمخزون والموارد البشرية المخصصة.',
        descriptionTr: 'Özel CRM, POS, envanter ve İK yönetim sistemleri ile operasyonları kolaylaştırın.',
        icon: '/icons/services/systems.png',
        gradient: 'from-purple-600 via-purple-400 to-indigo-400',
        accentColor: 'from-purple-400 to-indigo-400',
        services: businessSystemsServices,
    },
    {
        id: 'web-applications',
        name: 'Web Applications',
        nameAr: 'تطبيقات الويب',
        nameTr: 'Web Uygulamaları',
        description: 'Powerful web applications from SaaS platforms to e-commerce and customer portals.',
        descriptionAr: 'تطبيقات ويب قوية من منصات SaaS إلى التجارة الإلكترونية وبوابات العملاء.',
        descriptionTr: 'SaaS platformlarından e-ticaret ve müşteri portallarına kadar güçlü web uygulamaları.',
        icon: '/icons/services/webapps.png',
        gradient: 'from-emerald-600 via-emerald-400 to-cyan-400',
        accentColor: 'from-emerald-400 to-cyan-400',
        services: webApplicationsServices,
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
    const name = locale === 'ar' ? service.nameAr : locale === 'tr' ? service.nameTr : service.name
    const tagline = locale === 'ar' ? service.taglineAr : locale === 'tr' ? service.taglineTr : service.tagline
    const description = locale === 'ar' ? service.descriptionAr : locale === 'tr' ? service.descriptionTr : service.description
    const features = locale === 'ar' ? service.featuresAr : locale === 'tr' ? service.featuresTr : service.features

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn('group', featured && 'md:col-span-2')}
        >
            <Link href={`/${locale}${service.href}`} className="block h-full" aria-label={name}>
                <div className={cn(
                    'relative h-full rounded-2xl transition-all duration-500',
                    'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-200/60'
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
                        'relative h-full flex flex-col rounded-2xl overflow-hidden z-10',
                        'border border-white/80 transition-all duration-500',
                        'bg-white/75 backdrop-blur-xl shadow-sm shadow-violet-100/80',
                        'group-hover:bg-white/95 group-hover:border-violet-200/80 group-hover:shadow-lg',
                        featured ? 'p-6 md:p-8' : 'p-5'
                    )}>
                        {/* Top-edge shimmer on hover */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Soft violet bloom — top right */}
                        <div className={cn(
                            'absolute rounded-full blur-3xl transition-all duration-700 pointer-events-none',
                            'opacity-0 group-hover:opacity-[0.12]',
                            'bg-gradient-to-br from-violet-300 to-purple-200',
                            featured ? '-top-16 -right-16 w-72 h-72' : '-top-10 -right-10 w-44 h-44'
                        )} aria-hidden="true" />

                        {/* Header row */}
                        <div className={cn('flex items-start gap-3 mb-3 relative z-10')}>
                            {/* Icon container */}
                            <div className={cn(
                                'flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-500',
                                'bg-[#f4f1f8] border border-violet-100',
                                'group-hover:border-violet-200 group-hover:bg-violet-50',
                                featured ? 'w-16 h-16' : 'w-12 h-12'
                            )}>
                                <img
                                    src={service.icon}
                                    alt={name}
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
                                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center">
                                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={cn(
                            'text-slate-500 leading-relaxed relative z-10 mb-3 transition-colors duration-300 group-hover:text-slate-600',
                            featured ? 'text-sm max-w-xl' : 'text-xs'
                        )}>
                            {description}
                        </p>

                        {/* Hairline divider */}
                        <div className="border-t border-slate-100 mb-3 relative z-10 transition-colors duration-300 group-hover:border-violet-100" />

                        {/* Feature chips */}
                        <div className="mt-auto relative z-10 flex flex-wrap gap-1.5">
                            {features.map((feature, idx) => (
                                <span
                                    key={idx}
                                    className={cn(
                                        'inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-md',
                                        'text-slate-500 bg-slate-50 border border-slate-100/80',
                                        'transition-all duration-300',
                                        'group-hover:text-violet-700 group-hover:bg-violet-50 group-hover:border-violet-100'
                                    )}
                                >
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

export default function ServicesPage() {
    const { dir, locale, t } = useLanguage()
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
            preTitle: 'Everything You Need to',
            title: 'Thrive in the Digital Age',
            description: 'From your first website to enterprise-grade platforms — end-to-end digital solutions engineered for the GCC market.',
            ctaButton: 'Get a Free Consultation',
            replyNote: 'We typically reply within 10 minutes',
            ctaSecondary: 'View Our Work',
            finalCta: {
                preTitle: 'Ready to Begin?',
                title: 'Transform Your Business Today',
                description: "Let's discuss how we can help you achieve your goals with our comprehensive digital solutions.",
                button: 'Start Your Project',
            }
        },
        ar: {
            badge: 'خدماتنا',
            preTitle: 'كل ما تحتاجه للنجاح في',
            title: 'العصر الرقمي',
            description: 'من موقعك الأول إلى منصات المؤسسات — حلول رقمية شاملة مصممة لسوق الخليج العربي.',
            ctaButton: 'احصل على استشارة مجانية',
            replyNote: 'عادةً ما نرد خلال 10 دقائق',
            ctaSecondary: 'شاهد أعمالنا',
            finalCta: {
                preTitle: 'جاهز للبدء؟',
                title: 'حوّل عملك اليوم',
                description: 'دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك من خلال حلولنا الرقمية الشاملة.',
                button: 'ابدأ مشروعك',
            }
        },
        tr: {
            badge: 'Hizmetlerimiz',
            preTitle: 'Dijital Çağda Başarılı Olmak İçin',
            title: 'İhtiyacınız Olan Her Şey',
            description: 'İlk web sitenizden kurumsal platformlara — KİK pazarı için tasarlanmış uçtan uca dijital çözümler.',
            ctaButton: 'Ücretsiz Danışmanlık Alın',
            replyNote: 'Genellikle 10 dakika içinde yanıt veririz',
            ctaSecondary: 'Çalışmalarımızı Görün',
            finalCta: {
                preTitle: 'Başlamaya Hazır mısınız?',
                title: 'İşletmenizi Bugün Dönüştürün',
                description: 'Kapsamlı dijital çözümlerimizle hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi tartışalım.',
                button: 'Projenizi Başlatın',
            }
        }
    }

    const c = locale === 'ar' ? content.ar : locale === 'tr' ? content.tr : content.en

    return (
        <div className="min-h-screen bg-[#f4f1f8] text-slate-900 selection:bg-violet-200/60" dir={dir}>
            {!isMobile && <TechCursor />}

            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#f4f1f8]"
                aria-label="Services hero"
            >
                {/* Soft radial lavender glow — center */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#e8e0f7_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />

                {/* Decorative top edge */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" aria-hidden="true" />

                {/* Faint grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                        backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(to right, #8b5cf6 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                    aria-hidden="true"
                />

                {/* Ambient amber orb — subtle */}
                <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-amber-300/10 blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 py-14 text-center">
                    <div className="flex flex-col items-center space-y-5">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-violet-200 bg-white/70 text-violet-600 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm shadow-violet-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                                {c.badge}
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
                                {c.preTitle}
                            </p>
                            <h1
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.02] text-slate-900"
                                style={{ textWrap: 'balance' } as React.CSSProperties}
                            >
                                {c.title}
                            </h1>
                        </motion.div>

                        {/* Gold rule */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.38 }}
                            className="w-14 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
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
                            {c.description}
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
                                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 text-white hover:bg-amber-400 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation w-full sm:w-auto justify-center shadow-md shadow-amber-200"
                                aria-label={c.ctaButton}
                            >
                                {c.ctaButton}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                            </a>
                            <Link
                                href={`/${locale}/projects`}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-600 border border-slate-200 bg-white/60 hover:border-violet-200 hover:bg-white hover:text-violet-700 transition-all duration-300 w-full sm:w-auto justify-center touch-manipulation"
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
                    <div className="w-px h-10 bg-gradient-to-b from-violet-400/50 to-transparent" />
                </motion.div>
            </section>

            {/* ─── SERVICES ─────────────────────────────────────────── */}
            <div className="bg-[#f4f1f8]">

                {/* Sticky category nav */}
                <nav
                    className="sticky top-0 z-40 border-b border-violet-100/80 bg-[#f4f1f8]/90 backdrop-blur-xl"
                    aria-label="Service categories"
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex items-center justify-center gap-2 md:gap-3 py-3.5 overflow-x-auto no-scrollbar">
                            {categories.map((category) => {
                                const catName = locale === 'ar' ? category.nameAr : locale === 'tr' ? category.nameTr : category.name
                                const isActive = activeCategory === category.id
                                return (
                                    <Link
                                        key={category.id}
                                        href={`#${category.id}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={cn(
                                            'group whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 touch-manipulation',
                                            isActive
                                                ? 'bg-white border border-violet-200 text-violet-700 shadow-sm shadow-violet-100'
                                                : 'text-slate-400 hover:text-slate-700 border border-transparent hover:border-slate-200 hover:bg-white/70'
                                        )}
                                    >
                                        <img
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
                        const catName = locale === 'ar' ? category.nameAr : locale === 'tr' ? category.nameTr : category.name
                        const catDesc = locale === 'ar' ? category.descriptionAr : locale === 'tr' ? category.descriptionTr : category.description
                        const [featuredService, ...restServices] = category.services

                        return (
                            <section
                                key={category.id}
                                id={category.id}
                                className="py-10 md:py-16 border-b border-violet-100/60 last:border-0"
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
                                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-violet-100 shadow-sm">
                                                <img
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
                                    <p className="text-sm text-slate-400 max-w-[260px] leading-relaxed md:text-right rtl:md:text-left border-l border-violet-100 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
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
                            {c.finalCta.preTitle}
                        </span>

                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white"
                            style={{ textWrap: 'balance' } as React.CSSProperties}
                        >
                            {c.finalCta.title}
                        </h2>

                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" aria-hidden="true" />

                        <p className="text-base md:text-lg text-violet-200/60 max-w-lg mx-auto leading-relaxed">
                            {c.finalCta.description}
                        </p>

                        <Link
                            href={`/${locale}/contact`}
                            className="group inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-white rounded-xl font-bold text-base transition-all duration-300 hover:bg-amber-400 hover:scale-105 active:scale-95 touch-manipulation shadow-lg shadow-amber-500/25"
                            aria-label={c.finalCta.button}
                        >
                            {c.finalCta.button}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
