'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import {
  Check, X, Zap, Globe, ShoppingBag, Code2, Settings,
  Megaphone, FileText, QrCode, ChevronRight, Star,
  Shield, Clock, Headphones, ArrowRight, Sparkles
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PricingTier {
  name: { en: string; ar: string; tr: string }
  price: { monthly?: number; oneTime?: number; custom?: boolean }
  annualPrice?: number
  badge?: { en: string; ar: string; tr: string }
  description: { en: string; ar: string; tr: string }
  features: { text: { en: string; ar: string; tr: string }; included: boolean }[]
  cta: { en: string; ar: string; tr: string }
  highlighted?: boolean
}

interface ServiceCategory {
  id: string
  icon: React.ReactNode
  label: { en: string; ar: string; tr: string }
  subtitle: { en: string; ar: string; tr: string }
  billingType: 'oneTime' | 'monthly'
  tiers: PricingTier[]
}

// ─── Pricing Data ─────────────────────────────────────────────────────────────
const services: ServiceCategory[] = [
  {
    id: 'website',
    icon: <Globe className="w-5 h-5" />,
    label: { en: 'Website Design', ar: 'تصميم المواقع', tr: 'Web Tasarım' },
    subtitle: { en: 'Custom-built, conversion-focused websites', ar: 'مواقع مخصصة تحوّل الزوار إلى عملاء', tr: 'Dönüşüm odaklı özel web siteleri' },
    billingType: 'oneTime',
    tiers: [
      {
        name: { en: 'Landing Page', ar: 'صفحة هبوط', tr: 'Açılış Sayfası' },
        price: { oneTime: 299 },
        description: { en: 'A single, high-converting page to capture leads or launch a campaign — fast.', ar: 'صفحة واحدة عالية التحويل لاستقطاب العملاء أو إطلاق حملة في وقت قصير.', tr: 'Müşteri toplamak veya kampanya başlatmak için tek, yüksek dönüşümlü sayfa.' },
        features: [
          { text: { en: '1 page with multi-section layout', ar: 'صفحة واحدة بتصميم متعدد الأقسام', tr: 'Çok bölümlü tek sayfa tasarımı' }, included: true },
          { text: { en: 'Mobile & tablet optimized', ar: 'محسّن للجوال والأجهزة اللوحية', tr: 'Mobil ve tablet uyumlu' }, included: true },
          { text: { en: 'Lead capture form', ar: 'نموذج استقطاب العملاء', tr: 'Müşteri adayı formu' }, included: true },
          { text: { en: 'WhatsApp & click-to-call buttons', ar: 'زر واتساب واتصال مباشر', tr: 'WhatsApp ve tıkla-ara butonları' }, included: true },
          { text: { en: 'Google Analytics integration', ar: 'تكامل مع تحليلات جوجل', tr: 'Google Analytics entegrasyonu' }, included: true },
          { text: { en: 'Up to 2 languages', ar: 'حتى لغتين', tr: '2 dile kadar' }, included: true },
          { text: { en: 'Additional pages', ar: 'صفحات إضافية', tr: 'Ek sayfalar' }, included: false },
          { text: { en: 'Custom animations', ar: 'تأثيرات حركية مخصصة', tr: 'Özel animasyonlar' }, included: false },
        ],
        cta: { en: 'Build My Landing Page', ar: 'أنشئ صفحتي', tr: 'Açılış Sayfamı Yap' },
      },
      {
        name: { en: 'Starter', ar: 'الأساسي', tr: 'Başlangıç' },
        price: { oneTime: 499 },
        description: { en: 'A clean, professional website for startups and small businesses making their mark online.', ar: 'موقع احترافي وأنيق للشركات الناشئة والصغيرة التي تبدأ حضورها الرقمي.', tr: 'Çevrimiçi varlık oluşturmak isteyen küçük işletmeler için temiz, profesyonel web sitesi.' },
        features: [
          { text: { en: 'Up to 5 pages', ar: 'حتى 5 صفحات', tr: '5 sayfaya kadar' }, included: true },
          { text: { en: 'Mobile & tablet optimized', ar: 'محسّن للجوال والأجهزة اللوحية', tr: 'Mobil ve tablet uyumlu' }, included: true },
          { text: { en: 'Basic on-page SEO', ar: 'تحسين SEO أساسي للصفحات', tr: 'Temel sayfa içi SEO' }, included: true },
          { text: { en: 'Contact form + WhatsApp button', ar: 'نموذج تواصل + زر واتساب', tr: 'İletişim formu + WhatsApp butonu' }, included: true },
          { text: { en: 'Google Analytics integration', ar: 'تكامل مع تحليلات جوجل', tr: 'Google Analytics entegrasyonu' }, included: true },
          { text: { en: 'Up to 3 languages', ar: 'حتى 3 لغات', tr: '3 dile kadar' }, included: true },
          { text: { en: 'Custom animations', ar: 'تأثيرات حركية مخصصة', tr: 'Özel animasyonlar' }, included: false },
          { text: { en: 'Blog / news section', ar: 'قسم المدونة أو الأخبار', tr: 'Blog / haber bölümü' }, included: false },
        ],
        cta: { en: 'Start My Website', ar: 'أنشئ موقعي', tr: 'Web Sitemizi Başlat' },
      },
      {
        name: { en: 'Professional', ar: 'الاحترافي', tr: 'Profesyonel' },
        price: { oneTime: 999 },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'For businesses serious about their digital presence — built to impress and convert.', ar: 'للشركات الجادة في حضورها الرقمي — مصمم ليُبهر ويحوّل الزوار إلى عملاء.', tr: 'Dijital varlığına önem veren işletmeler için — etkilemek ve dönüştürmek üzere inşa edildi.' },
        features: [
          { text: { en: 'Up to 15 pages', ar: 'حتى 15 صفحة', tr: '15 sayfaya kadar' }, included: true },
          { text: { en: 'Mobile & tablet optimized', ar: 'محسّن للجوال والأجهزة اللوحية', tr: 'Mobil ve tablet uyumlu' }, included: true },
          { text: { en: 'Advanced SEO (meta, schema, sitemap)', ar: 'SEO متقدم (ميتا، سكيما، خريطة الموقع)', tr: 'Gelişmiş SEO (meta, şema, site haritası)' }, included: true },
          { text: { en: 'Smart contact forms + WhatsApp button', ar: 'نماذج تواصل ذكية + زر واتساب', tr: 'Akıllı formlar + WhatsApp butonu' }, included: true },
          { text: { en: 'CRM integration', ar: 'تكامل مع CRM', tr: 'CRM entegrasyonu' }, included: true },
          { text: { en: 'Google Analytics + heatmap tracking', ar: 'تحليلات جوجل + خرائط الحرارة', tr: 'Google Analytics + ısı haritası' }, included: true },
          { text: { en: 'Custom scroll animations', ar: 'تأثيرات تمرير مخصصة', tr: 'Özel kaydırma animasyonları' }, included: true },
          { text: { en: 'Blog / news CMS', ar: 'نظام إدارة المدونة والأخبار', tr: 'Blog / haber yönetim sistemi' }, included: true },
          { text: { en: 'Speed & Core Web Vitals optimization', ar: 'تحسين السرعة ومؤشرات الويب', tr: 'Hız & Core Web Vitals optimizasyonu' }, included: true },
          { text: { en: 'As many languages as needed', ar: 'عدد اللغات حسب الحاجة', tr: 'İhtiyaç duyulan kadar dil' }, included: true },
        ],
        cta: { en: 'Build My Website', ar: 'ابنِ موقعي', tr: 'Web Sitemizi Kur' },
        highlighted: true,
      },
      {
        name: { en: 'Premium', ar: 'المتميز', tr: 'Premium' },
        price: { oneTime: 2499 },
        description: { en: 'Enterprise-grade web presence with custom everything — no compromises, no limits.', ar: 'حضور ويب على مستوى المؤسسات بتخصيص كامل — بلا قيود ولا تنازلات.', tr: 'Sınırsız özelleştirmeyle kurumsal düzey web varlığı — hiçbir ödün vermeden.' },
        features: [
          { text: { en: 'Unlimited pages', ar: 'صفحات غير محدودة', tr: 'Sınırsız sayfa' }, included: true },
          { text: { en: 'Mobile & tablet optimized', ar: 'محسّن للجوال والأجهزة اللوحية', tr: 'Mobil ve tablet uyumlu' }, included: true },
          { text: { en: 'Full SEO suite (technical + content)', ar: 'SEO شامل (تقني + محتوى)', tr: 'Tam SEO paketi (teknik + içerik)' }, included: true },
          { text: { en: 'Advanced forms + WhatsApp + workflow automation', ar: 'نماذج متقدمة + واتساب + أتمتة سير العمل', tr: 'Gelişmiş formlar + WhatsApp + otomasyon' }, included: true },
          { text: { en: 'Full analytics suite + conversion tracking', ar: 'حزمة تحليلات كاملة + تتبع التحويلات', tr: 'Tam analitik + dönüşüm takibi' }, included: true },
          { text: { en: 'Custom animations & 3D elements', ar: 'تأثيرات حركية ثلاثية الأبعاد مخصصة', tr: 'Özel animasyonlar ve 3D öğeler' }, included: true },
          { text: { en: 'CMS with multi-author support', ar: 'نظام محتوى متعدد المحررين', tr: 'Çoklu yazar destekli içerik yönetimi' }, included: true },
          { text: { en: 'E-commerce ready (up to 20 products)', ar: 'جاهز للتجارة الإلكترونية (حتى 20 منتج)', tr: 'E-ticaret hazır (20 ürüne kadar)' }, included: true },
          { text: { en: 'Priority 30-day support', ar: 'دعم أولوي لمدة 30 يوماً', tr: 'Öncelikli 30 günlük destek' }, included: true },
          { text: { en: 'As many languages as needed', ar: 'عدد اللغات حسب الحاجة', tr: 'İhtiyaç duyulan kadar dil' }, included: true },
        ],
        cta: { en: 'Go Premium', ar: 'ابدأ بالمتميز', tr: 'Premium\'a Geçin' },
      },
    ],
  },
  {
    id: 'ecommerce',
    icon: <ShoppingBag className="w-5 h-5" />,
    label: { en: 'E-Commerce', ar: 'التجارة الإلكترونية', tr: 'E-Ticaret' },
    subtitle: { en: 'Online stores built to sell across the region', ar: 'متاجر إلكترونية مصممة للبيع في المنطقة', tr: 'Bölgede satış yapan çevrimiçi mağazalar' },
    billingType: 'oneTime',
    tiers: [
      {
        name: { en: 'Starter Store', ar: 'المتجر الأساسي', tr: 'Başlangıç Mağazası' },
        price: { oneTime: 599 },
        description: { en: 'Launch your online store fast with everything you need to start selling today.', ar: 'أطلق متجرك الإلكتروني بسرعة بكل ما تحتاجه للبيع اليوم.', tr: 'Bugün satışa başlamak için ihtiyacınız olan her şeyle çevrimiçi mağazanızı hızla başlatın.' },
        features: [
          { text: { en: 'Up to 100 products', ar: 'حتى 100 منتج', tr: '100 ürüne kadar' }, included: true },
          { text: { en: 'Payment gateway (Stripe/Tap)', ar: 'بوابة دفع (Stripe/Tap)', tr: 'Ödeme sistemi (Stripe/Tap)' }, included: true },
          { text: { en: 'Order management dashboard', ar: 'لوحة إدارة الطلبات', tr: 'Sipariş yönetim paneli' }, included: true },
          { text: { en: 'Basic inventory tracking', ar: 'تتبع مخزون أساسي', tr: 'Temel envanter takibi' }, included: true },
          { text: { en: 'Mobile-optimized storefront', ar: 'واجهة متجر محسّنة للجوال', tr: 'Mobil optimize vitrin' }, included: true },
          { text: { en: 'WhatsApp order notifications', ar: 'إشعارات الطلبات عبر واتساب', tr: 'WhatsApp sipariş bildirimleri' }, included: true },
          { text: { en: 'Multi-currency', ar: 'دعم عملات متعددة', tr: 'Çoklu para birimi' }, included: false },
          { text: { en: 'Abandoned cart recovery', ar: 'استرداد السلة المتروكة', tr: 'Terk edilen sepet kurtarma' }, included: false },
          { text: { en: 'Coupon & discount engine', ar: 'محرك الكوبونات والخصومات', tr: 'Kupon ve indirim motoru' }, included: false },
        ],
        cta: { en: 'Launch My Store', ar: 'أطلق متجري', tr: 'Mağazamı Başlat' },
      },
      {
        name: { en: 'Growth Store', ar: 'متجر النمو', tr: 'Büyüme Mağazası' },
        price: { oneTime: 1299 },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'The complete e-commerce engine for businesses ready to scale across GCC, Turkey and the Arab world.', ar: 'المحرك الكامل للتجارة الإلكترونية للشركات المستعدة للتوسع.', tr: 'Körfez, Türkiye ve Arap dünyasında ölçeklenmek için hazır işletmeler için.' },
        features: [
          { text: { en: 'Up to 1,000 products', ar: 'حتى 1,000 منتج', tr: '1.000 ürüne kadar' }, included: true },
          { text: { en: 'Payment gateway (Stripe/Tap)', ar: 'بوابة دفع (Stripe/Tap)', tr: 'Ödeme sistemi (Stripe/Tap)' }, included: true },
          { text: { en: 'Advanced order management', ar: 'إدارة طلبات متقدمة', tr: 'Gelişmiş sipariş yönetimi' }, included: true },
          { text: { en: 'Full inventory + low-stock alerts', ar: 'مخزون كامل + تنبيهات نقص المخزون', tr: 'Tam envanter + stok uyarıları' }, included: true },
          { text: { en: 'Multi-currency (AED/SAR/TRY)', ar: 'عملات متعددة (درهم/ريال/ليرة)', tr: 'Çoklu para birimi (AED/SAR/TRY)' }, included: true },
          { text: { en: 'Abandoned cart recovery', ar: 'استرداد السلة المتروكة', tr: 'Terk edilen sepet kurtarma' }, included: true },
          { text: { en: 'Coupon & discount engine', ar: 'محرك الكوبونات والخصومات', tr: 'Kupon ve indirim motoru' }, included: true },
          { text: { en: 'WhatsApp & email order notifications', ar: 'إشعارات الطلبات عبر واتساب والبريد', tr: 'WhatsApp & e-posta sipariş bildirimleri' }, included: true },
          { text: { en: 'Google Analytics + conversion tracking', ar: 'تحليلات جوجل + تتبع التحويلات', tr: 'Google Analytics + dönüşüm takibi' }, included: true },
          { text: { en: 'ERP/CRM integration', ar: 'تكامل ERP/CRM', tr: 'ERP/CRM entegrasyonu' }, included: false },
        ],
        cta: { en: 'Scale My Store', ar: 'طوّر متجري', tr: 'Mağazamı Ölçeklendir' },
        highlighted: true,
      },
      {
        name: { en: 'Enterprise', ar: 'المؤسسي', tr: 'Kurumsal' },
        price: { custom: true },
        description: { en: 'Multi-store, multi-language, custom logistics — built for serious regional retail operations.', ar: 'متعدد المتاجر والغات، خدمات مخصصة — للعمليات التجارية الإقليمية الجادة.', tr: 'Çok mağaza, çok dil, özel lojistik — ciddi bölgesel perakende operasyonları için.' },
        features: [
          { text: { en: 'Unlimited products', ar: 'منتجات غير محدودة', tr: 'Sınırsız ürün' }, included: true },
          { text: { en: 'All payment gateways', ar: 'جميع بوابات الدفع', tr: 'Tüm ödeme sistemleri' }, included: true },
          { text: { en: 'ERP/CRM integration', ar: 'تكامل ERP/CRM', tr: 'ERP/CRM entegrasyonu' }, included: true },
          { text: { en: 'Full inventory + forecasting', ar: 'مخزون كامل + توقعات', tr: 'Tam envanter + tahmin' }, included: true },
          { text: { en: 'All currencies + VAT', ar: 'جميع العملات + ضريبة القيمة المضافة', tr: 'Tüm para birimleri + KDV' }, included: true },
          { text: { en: 'Abandoned cart + retargeting', ar: 'استرداد السلة + إعادة الاستهداف', tr: 'Sepet kurtarma + yeniden hedefleme' }, included: true },
          { text: { en: 'Multi-language storefront', ar: 'واجهة متجر متعددة اللغات', tr: 'Çok dilli mağaza vitrine' }, included: true },
          { text: { en: 'Dedicated account manager', ar: 'مدير حساب مخصص', tr: 'Özel hesap yöneticisi' }, included: true },
        ],
        cta: { en: 'Request a Quote', ar: 'اطلب عرض سعر', tr: 'Teklif İste' },
      },
    ],
  },
  {
    id: 'webapp',
    icon: <Code2 className="w-5 h-5" />,
    label: { en: 'Web Applications', ar: 'تطبيقات الويب', tr: 'Web Uygulamaları' },
    subtitle: { en: 'Custom SaaS, portals and interactive platforms', ar: 'منصات SaaS وبوابات تفاعلية مخصصة', tr: 'Özel SaaS, portallar ve etkileşimli platformlar' },
    billingType: 'oneTime',
    tiers: [
      {
        name: { en: 'Essential', ar: 'الأساسي', tr: 'Temel' },
        price: { oneTime: 1999 },
        description: { en: 'A functional, well-designed web app for your core business process.', ar: 'تطبيق ويب وظيفي ومصمم جيداً لعمليتك التجارية الأساسية.', tr: 'Temel iş süreciniz için işlevsel, iyi tasarlanmış bir web uygulaması.' },
        features: [
          { text: { en: 'Up to 3 user roles', ar: 'حتى 3 أدوار مستخدمين', tr: '3 kullanıcı rolüne kadar' }, included: true },
          { text: { en: 'Authentication system', ar: 'نظام تسجيل الدخول', tr: 'Kimlik doğrulama sistemi' }, included: true },
          { text: { en: 'Basic dashboard', ar: 'لوحة تحكم أساسية', tr: 'Temel gösterge paneli' }, included: true },
          { text: { en: 'Database & API', ar: 'قاعدة بيانات وAPI', tr: 'Veritabanı & API' }, included: true },
          { text: { en: 'Third-party integrations', ar: 'تكامل مع أطراف ثالثة', tr: 'Üçüncü taraf entegrasyonları' }, included: false },
          { text: { en: 'Real-time features', ar: 'ميزات في الوقت الفعلي', tr: 'Gerçek zamanlı özellikler' }, included: false },
          { text: { en: 'Mobile app companion', ar: 'تطبيق الجوال المرافق', tr: 'Mobil uygulama desteği' }, included: false },
        ],
        cta: { en: 'Build My App', ar: 'ابنِ تطبيقي', tr: 'Uygulamımı Yap' },
      },
      {
        name: { en: 'Advanced', ar: 'المتقدم', tr: 'Gelişmiş' },
        price: { oneTime: 3499 },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'A full-featured platform built for complex workflows, teams and real business scale.', ar: 'منصة كاملة المزايا مبنية للسير العمل المعقدة والفرق ونطاق الأعمال الحقيقي.', tr: 'Karmaşık iş akışları, ekipler ve gerçek iş ölçeği için tam özellikli platform.' },
        features: [
          { text: { en: 'Unlimited user roles', ar: 'أدوار مستخدمين غير محدودة', tr: 'Sınırsız kullanıcı rolü' }, included: true },
          { text: { en: 'Auth + SSO support', ar: 'مصادقة + دعم SSO', tr: 'Auth + SSO desteği' }, included: true },
          { text: { en: 'Advanced analytics dashboard', ar: 'لوحة تحليلات متقدمة', tr: 'Gelişmiş analitik paneli' }, included: true },
          { text: { en: 'Database & REST/GraphQL API', ar: 'قاعدة بيانات + REST/GraphQL', tr: 'Veritabanı & REST/GraphQL API' }, included: true },
          { text: { en: 'Third-party integrations', ar: 'تكامل مع أطراف ثالثة', tr: 'Üçüncü taraf entegrasyonları' }, included: true },
          { text: { en: 'Real-time features', ar: 'ميزات في الوقت الفعلي', tr: 'Gerçek zamanlı özellikler' }, included: true },
          { text: { en: 'Mobile app companion', ar: 'تطبيق الجوال المرافق', tr: 'Mobil uygulama desteği' }, included: false },
        ],
        cta: { en: 'Launch My Platform', ar: 'أطلق منصتي', tr: 'Platformumu Başlat' },
        highlighted: true,
      },
      {
        name: { en: 'Enterprise', ar: 'المؤسسي', tr: 'Kurumsal' },
        price: { custom: true },
        description: { en: 'Large-scale custom systems with dedicated architecture, DevOps and long-term support.', ar: 'أنظمة مخصصة واسعة النطاق مع بنية مخصصة ودعم طويل الأمد.', tr: 'Özel mimari, DevOps ve uzun vadeli destekle büyük ölçekli sistemler.' },
        features: [
          { text: { en: 'Unlimited user roles', ar: 'أدوار مستخدمين غير محدودة', tr: 'Sınırsız kullanıcı rolü' }, included: true },
          { text: { en: 'Enterprise auth + compliance', ar: 'مصادقة مؤسسية + امتثال', tr: 'Kurumsal kimlik + uyumluluk' }, included: true },
          { text: { en: 'Custom reporting engine', ar: 'محرك تقارير مخصص', tr: 'Özel raporlama motoru' }, included: true },
          { text: { en: 'Dedicated infrastructure', ar: 'بنية تحتية مخصصة', tr: 'Özel altyapı' }, included: true },
          { text: { en: 'All integrations', ar: 'جميع التكاملات', tr: 'Tüm entegrasyonlar' }, included: true },
          { text: { en: 'Real-time + offline sync', ar: 'وقت فعلي + مزامنة غير متصلة', tr: 'Gerçek zamanlı + çevrimdışı senkronizasyon' }, included: true },
          { text: { en: 'iOS & Android apps', ar: 'تطبيقات iOS و Android', tr: 'iOS ve Android uygulamaları' }, included: true },
        ],
        cta: { en: 'Get a Custom Quote', ar: 'احصل على عرض مخصص', tr: 'Özel Teklif Al' },
      },
    ],
  },
  {
    id: 'systems',
    icon: <Settings className="w-5 h-5" />,
    label: { en: 'Business Systems', ar: 'أنظمة الأعمال', tr: 'İş Sistemleri' },
    subtitle: { en: 'CRM, ERP, automation and internal tools', ar: 'أنظمة CRM وERP وأدوات الأتمتة الداخلية', tr: 'CRM, ERP, otomasyon ve dahili araçlar' },
    billingType: 'oneTime',
    tiers: [
      {
        name: { en: 'Foundation', ar: 'الأساس', tr: 'Temel' },
        price: { oneTime: 999 },
        description: { en: 'Streamline your operations with a custom CRM and automation tailored to your workflow.', ar: 'بسّط عمليتك مع نظام CRM مخصص وأتمتة تناسب سير عملك.', tr: 'İş akışınıza göre özelleştirilmiş CRM ve otomasyon ile operasyonlarınızı kolaylaştırın.' },
        features: [
          { text: { en: 'Custom CRM', ar: 'نظام CRM مخصص', tr: 'Özel CRM' }, included: true },
          { text: { en: 'Up to 5 users', ar: 'حتى 5 مستخدمين', tr: '5 kullanıcıya kadar' }, included: true },
          { text: { en: 'Lead & contact management', ar: 'إدارة العملاء المحتملين وجهات الاتصال', tr: 'Potansiyel müşteri & iletişim yönetimi' }, included: true },
          { text: { en: 'Basic automation flows', ar: 'تدفقات أتمتة أساسية', tr: 'Temel otomasyon akışları' }, included: true },
          { text: { en: 'Reports & dashboards', ar: 'تقارير ولوحات تحكم', tr: 'Raporlar ve panolar' }, included: true },
          { text: { en: 'Email & WhatsApp integration', ar: 'تكامل البريد الإلكتروني وواتساب', tr: 'E-posta & WhatsApp entegrasyonu' }, included: true },
          { text: { en: 'Mobile access', ar: 'وصول من الجوال', tr: 'Mobil erişim' }, included: false },
          { text: { en: 'Sales pipeline tracking', ar: 'تتبع خط مبيعات', tr: 'Satış hattı takibi' }, included: false },
          { text: { en: 'ERP modules', ar: 'وحدات ERP', tr: 'ERP modülleri' }, included: false },
        ],
        cta: { en: 'Build My System', ar: 'ابنِ نظامي', tr: 'Sistemimi Kur' },
      },
      {
        name: { en: 'Professional', ar: 'الاحترافي', tr: 'Profesyonel' },
        price: { oneTime: 2499 },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'A complete business operating system — manage leads, teams, inventory and reporting in one place.', ar: 'نظام تشغيل أعمال متكامل — إدارة العملاء والفرق والمخزون والتقارير في مكان واحد.', tr: 'Eksiksiz iş işletim sistemi — potansiyel müşterileri, ekipleri, envanteri ve raporlamayı tek yerden yönetin.' },
        features: [
          { text: { en: 'Custom CRM + sales pipeline', ar: 'CRM + خط مبيعات مخصص', tr: 'Özel CRM + satış hattı' }, included: true },
          { text: { en: 'Up to 20 users', ar: 'حتى 20 مستخدماً', tr: '20 kullanıcıya kadar' }, included: true },
          { text: { en: 'Lead scoring & pipeline stages', ar: 'تقييم العملاء المحتملين ومراحل المبيعات', tr: 'Müşteri puanlama & satış aşamaları' }, included: true },
          { text: { en: 'Advanced automation flows', ar: 'تدفقات أتمتة متقدمة', tr: 'Gelişmiş otomasyon akışları' }, included: true },
          { text: { en: 'Advanced reports + KPIs', ar: 'تقارير متقدمة + مؤشرات الأداء', tr: 'Gelişmiş raporlar + KPI\'lar' }, included: true },
          { text: { en: 'Email & WhatsApp integration', ar: 'تكامل البريد الإلكتروني وواتساب', tr: 'E-posta & WhatsApp entegrasyonu' }, included: true },
          { text: { en: 'Mobile access', ar: 'وصول من الجوال', tr: 'Mobil erişim' }, included: true },
          { text: { en: 'Inventory management module', ar: 'وحدة إدارة المخزون', tr: 'Envanter yönetim modülü' }, included: true },
          { text: { en: 'ERP modules', ar: 'وحدات ERP', tr: 'ERP modülleri' }, included: false },
        ],
        cta: { en: 'Upgrade My Operations', ar: 'طوّر عملياتي', tr: 'Operasyonlarımı Yükselt' },
        highlighted: true,
      },
      {
        name: { en: 'Enterprise ERP', ar: 'ERP المؤسسي', tr: 'Kurumsal ERP' },
        price: { custom: true },
        description: { en: 'Full-scale ERP tailored to your industry — finance, HR, logistics, procurement and more.', ar: 'ERP كامل النطاق مصمم لقطاعك — المالية والموارد البشرية والخدمات اللوجستية والمشتريات.', tr: 'Sektörünüze özel tam ölçekli ERP — finans, İK, lojistik, satın alma ve daha fazlası.' },
        features: [
          { text: { en: 'Full CRM + ERP suite', ar: 'مجموعة CRM + ERP كاملة', tr: 'Tam CRM + ERP paketi' }, included: true },
          { text: { en: 'Unlimited users', ar: 'مستخدمون غير محدودون', tr: 'Sınırsız kullanıcı' }, included: true },
          { text: { en: 'AI-driven automation', ar: 'أتمتة مدعومة بالذكاء الاصطناعي', tr: 'Yapay zeka destekli otomasyon' }, included: true },
          { text: { en: 'Custom reporting + BI', ar: 'تقارير مخصصة + ذكاء الأعمال', tr: 'Özel raporlama + İş Zekası' }, included: true },
          { text: { en: 'All communication channels', ar: 'جميع قنوات التواصل', tr: 'Tüm iletişim kanalları' }, included: true },
          { text: { en: 'iOS & Android apps', ar: 'تطبيقات iOS و Android', tr: 'iOS ve Android uygulamaları' }, included: true },
          { text: { en: 'Finance & HR modules', ar: 'وحدات المالية والموارد البشرية', tr: 'Finans ve İK modülleri' }, included: true },
        ],
        cta: { en: 'Request Enterprise Quote', ar: 'طلب عرض مؤسسي', tr: 'Kurumsal Teklif İste' },
      },
    ],
  },
  {
    id: 'marketing',
    icon: <Megaphone className="w-5 h-5" />,
    label: { en: 'Social Media', ar: 'وسائل التواصل', tr: 'Sosyal Medya' },
    subtitle: { en: 'Monthly management that grows your brand', ar: 'إدارة شهرية تنمي علامتك التجارية', tr: 'Markanızı büyüten aylık yönetim' },
    billingType: 'monthly',
    tiers: [
      {
        name: { en: 'Starter', ar: 'البداية', tr: 'Başlangıç' },
        price: { monthly: 199 },
        annualPrice: 199,
        description: { en: 'Consistent presence on your most important platforms, handled professionally.', ar: 'حضور ثابت على أهم منصاتك، مُدار باحترافية.', tr: 'En önemli platformlarınızda tutarlı varlık, profesyonelce yönetilir.' },
        features: [
          { text: { en: '2 platforms (Instagram + TikTok)', ar: 'منصتان (إنستغرام + تيك توك)', tr: '2 platform (Instagram + TikTok)' }, included: true },
          { text: { en: '12 posts per month', ar: '12 منشور شهرياً', tr: 'Ayda 12 gönderi' }, included: true },
          { text: { en: 'Arabic + English captions', ar: 'تعليقات عربية وإنجليزية', tr: 'Arapça + İngilizce altyazılar' }, included: true },
          { text: { en: 'Basic analytics report', ar: 'تقرير تحليلات أساسي', tr: 'Temel analitik raporu' }, included: true },
          { text: { en: 'Stories & Reels', ar: 'ستوري وريلز', tr: 'Stories & Reels' }, included: false },
          { text: { en: 'Paid ad management', ar: 'إدارة الإعلانات المدفوعة', tr: 'Ücretli reklam yönetimi' }, included: false },
          { text: { en: 'Influencer strategy', ar: 'استراتيجية المؤثرين', tr: 'Influencer stratejisi' }, included: false },
        ],
        cta: { en: 'Start Growing', ar: 'ابدأ النمو', tr: 'Büyümeye Başla' },
      },
      {
        name: { en: 'Growth', ar: 'النمو', tr: 'Büyüme' },
        price: { monthly: 449 },
        annualPrice: 439,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'Full social media management with ads — for brands ready to dominate their market.', ar: 'إدارة كاملة لوسائل التواصل مع إعلانات — للعلامات التجارية المستعدة للهيمنة على سوقها.', tr: 'Reklamlarla tam sosyal medya yönetimi — pazarlarına hakim olmaya hazır markalar için.' },
        features: [
          { text: { en: '4 platforms + LinkedIn', ar: '4 منصات + لينكد إن', tr: '4 platform + LinkedIn' }, included: true },
          { text: { en: '20 posts + stories/reels', ar: '20 منشور + ستوري وريلز', tr: '20 gönderi + stories/reels' }, included: true },
          { text: { en: 'Arabic + English + Turkish', ar: 'عربي + إنجليزي + تركي', tr: 'Arapça + İngilizce + Türkçe' }, included: true },
          { text: { en: 'Weekly analytics + strategy', ar: 'تحليلات أسبوعية + استراتيجية', tr: 'Haftalık analitik + strateji' }, included: true },
          { text: { en: 'Stories & Reels', ar: 'ستوري وريلز', tr: 'Stories & Reels' }, included: true },
          { text: { en: 'Paid ad management (up to $1K)', ar: 'إدارة إعلانات (حتى 1000 دولار)', tr: 'Ücretli reklam (1.000 $ kadar)' }, included: true },
          { text: { en: 'Influencer strategy', ar: 'استراتيجية المؤثرين', tr: 'Influencer stratejisi' }, included: false },
        ],
        cta: { en: 'Scale My Brand', ar: 'طوّر علامتي', tr: 'Markamı Ölçeklendir' },
        highlighted: true,
      },
      {
        name: { en: 'Scale', ar: 'التوسع', tr: 'Ölçek' },
        price: { monthly: 799 },
        annualPrice: 799,
        description: { en: 'Complete brand domination — every platform, every format, paid + organic, full strategy.', ar: 'هيمنة كاملة على العلامة التجارية — كل منصة وكل تنسيق، مدفوع وعضوي، استراتيجية كاملة.', tr: 'Tam marka hakimiyeti — her platform, her format, ücretli + organik, tam strateji.' },
        features: [
          { text: { en: 'All platforms', ar: 'جميع المنصات', tr: 'Tüm platformlar' }, included: true },
          { text: { en: 'Unlimited posts + all formats', ar: 'منشورات غير محدودة + جميع التنسيقات', tr: 'Sınırsız gönderi + tüm formatlar' }, included: true },
          { text: { en: 'Tri-lingual content', ar: 'محتوى ثلاثي اللغات', tr: 'Üç dilli içerik' }, included: true },
          { text: { en: 'Daily analytics + monthly strategy', ar: 'تحليلات يومية + استراتيجية شهرية', tr: 'Günlük analitik + aylık strateji' }, included: true },
          { text: { en: 'Stories, Reels & YouTube Shorts', ar: 'ستوري وريلز وYouTube Shorts', tr: 'Stories, Reels & YouTube Shorts' }, included: true },
          { text: { en: 'Paid ad management (up to $5K)', ar: 'إدارة إعلانات (حتى 5000 دولار)', tr: 'Ücretli reklam (5.000 $ kadar)' }, included: true },
          { text: { en: 'Influencer strategy + outreach', ar: 'استراتيجية المؤثرين + التواصل', tr: 'Influencer stratejisi + erişim' }, included: true },
        ],
        cta: { en: 'Dominate My Market', ar: 'سيطر على سوقي', tr: 'Pazarıma Hakim Ol' },
      },
    ],
  },
  {
    id: 'content',
    icon: <FileText className="w-5 h-5" />,
    label: { en: 'Content Creation', ar: 'إنشاء المحتوى', tr: 'İçerik Üretimi' },
    subtitle: { en: 'Strategic content that ranks, resonates and converts', ar: 'محتوى استراتيجي يحتل المراكز الأولى ويحوّل', tr: 'Sıralayan, yankılanan ve dönüştüren stratejik içerik' },
    billingType: 'monthly',
    tiers: [
      {
        name: { en: 'Basic', ar: 'الأساسي', tr: 'Temel' },
        price: { monthly: 149 },
        annualPrice: 159,
        description: { en: 'A steady stream of quality content to keep your brand visible and credible.', ar: 'تدفق ثابت من المحتوى عالي الجودة للحفاظ على ظهور علامتك وموثوقيتها.', tr: 'Markanızı görünür ve güvenilir tutan istikrarlı içerik akışı.' },
        features: [
          { text: { en: '8 articles/blogs per month', ar: '8 مقالات/مدونات شهرياً', tr: 'Ayda 8 makale/blog' }, included: true },
          { text: { en: 'Arabic or English', ar: 'عربي أو إنجليزي', tr: 'Arapça veya İngilizce' }, included: true },
          { text: { en: 'Basic SEO optimization', ar: 'تحسين SEO أساسي', tr: 'Temel SEO optimizasyonu' }, included: true },
          { text: { en: 'Social media captions', ar: 'تعليقات وسائل التواصل الاجتماعي', tr: 'Sosyal medya başlıkları' }, included: false },
          { text: { en: 'Video scripts', ar: 'نصوص الفيديو', tr: 'Video senaryoları' }, included: false },
          { text: { en: 'Content strategy', ar: 'استراتيجية المحتوى', tr: 'İçerik stratejisi' }, included: false },
        ],
        cta: { en: 'Start Creating', ar: 'ابدأ الإنشاء', tr: 'Oluşturmaya Başla' },
      },
      {
        name: { en: 'Professional', ar: 'الاحترافي', tr: 'Profesyonel' },
        price: { monthly: 329 },
        annualPrice: 319,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'A full content operation — SEO-driven writing, social captions and video scripts in multiple languages.', ar: 'عملية محتوى كاملة — كتابة موجهة بـSEO وتعليقات اجتماعية ونصوص فيديو بلغات متعددة.', tr: 'Tam içerik operasyonu — SEO odaklı yazarlık, sosyal başlıklar ve çok dilli video senaryoları.' },
        features: [
          { text: { en: '16 articles + social content', ar: '16 مقالة + محتوى اجتماعي', tr: '16 makale + sosyal içerik' }, included: true },
          { text: { en: 'Arabic + English', ar: 'عربي + إنجليزي', tr: 'Arapça + İngilizce' }, included: true },
          { text: { en: 'Advanced SEO + keyword research', ar: 'SEO متقدم + بحث الكلمات المفتاحية', tr: 'Gelişmiş SEO + anahtar kelime araştırması' }, included: true },
          { text: { en: 'Social media captions', ar: 'تعليقات وسائل التواصل الاجتماعي', tr: 'Sosyal medya başlıkları' }, included: true },
          { text: { en: '8 video scripts', ar: '8 نصوص فيديو', tr: '8 video senaryosu' }, included: true },
          { text: { en: 'Content strategy', ar: 'استراتيجية المحتوى', tr: 'İçerik stratejisi' }, included: false },
        ],
        cta: { en: 'Grow My Content', ar: 'طوّر محتواي', tr: 'İçeriğimi Büyüt' },
        highlighted: true,
      },
      {
        name: { en: 'Agency', ar: 'الوكالة', tr: 'Ajans' },
        price: { monthly: 549 },
        annualPrice: 559,
        description: { en: 'A dedicated content team working as your in-house creative department — tri-lingual, full-volume.', ar: 'فريق محتوى مخصص يعمل كقسم إبداعي داخلي — ثلاثي اللغات، بأعلى حجم.', tr: 'Şirket içi yaratıcı departmanınız olarak çalışan özel içerik ekibi — üç dilli, tam hacim.' },
        features: [
          { text: { en: '30+ pieces of content', ar: '30+ قطعة محتوى', tr: '30+ içerik parçası' }, included: true },
          { text: { en: 'Arabic + English + Turkish', ar: 'عربي + إنجليزي + تركي', tr: 'Arapça + İngilizce + Türkçe' }, included: true },
          { text: { en: 'Full SEO strategy + tracking', ar: 'استراتيجية SEO كاملة + تتبع', tr: 'Tam SEO stratejisi + takip' }, included: true },
          { text: { en: 'Social media captions', ar: 'تعليقات وسائل التواصل الاجتماعي', tr: 'Sosyal medya başlıkları' }, included: true },
          { text: { en: 'Unlimited video scripts', ar: 'نصوص فيديو غير محدودة', tr: 'Sınırsız video senaryosu' }, included: true },
          { text: { en: 'Full content strategy + calendar', ar: 'استراتيجية محتوى كاملة + تقويم', tr: 'Tam içerik stratejisi + takvim' }, included: true },
        ],
        cta: { en: 'Hire My Content Team', ar: 'احجز فريق المحتوى', tr: 'İçerik Ekibimi Kirala' },
      },
    ],
  },
  {
    id: 'qrmenu',
    icon: <QrCode className="w-5 h-5" />,
    label: { en: 'Restaurant QR Menu', ar: 'قائمة QR للمطاعم', tr: 'Restoran QR Menü' },
    subtitle: { en: 'Smart digital menus for modern restaurants', ar: 'قوائم رقمية ذكية للمطاعم العصرية', tr: 'Modern restoranlar için akıllı dijital menüler' },
    billingType: 'oneTime',
    tiers: [
      {
        name: { en: 'Essential Menu', ar: 'القائمة الأساسية', tr: 'Temel Menü' },
        price: { oneTime: 249 },
        description: { en: 'Replace printed menus with a clean, instant QR menu your guests scan and browse.', ar: 'استبدل القوائم المطبوعة بقائمة QR نظيفة يمسحها ضيوفك ويتصفحونها.', tr: 'Basılı menüleri, misafirlerinizin tarayıp gezebileceği temiz, anlık bir QR menüyle değiştirin.' },
        features: [
          { text: { en: 'Up to 100 menu items', ar: 'حتى 100 عنصر في القائمة', tr: '100 menü öğesine kadar' }, included: true },
          { text: { en: 'Arabic + English menu', ar: 'قائمة عربية وإنجليزية', tr: 'Arapça + İngilizce menü' }, included: true },
          { text: { en: 'QR code generation + printing', ar: 'توليد رمز QR + طباعة', tr: 'QR kod üretimi + baskı' }, included: true },
          { text: { en: 'Menu photos + descriptions', ar: 'صور وأوصاف القائمة', tr: 'Menü fotoğrafları + açıklamalar' }, included: true },
          { text: { en: 'Instant menu updates', ar: 'تحديثات القائمة الفورية', tr: 'Anlık menü güncellemeleri' }, included: true },
          { text: { en: 'WhatsApp order link', ar: 'رابط طلب واتساب', tr: 'WhatsApp sipariş bağlantısı' }, included: true },
          { text: { en: 'Online ordering', ar: 'الطلب عبر الإنترنت', tr: 'Çevrimiçi sipariş' }, included: false },
          { text: { en: 'Table management', ar: 'إدارة الطاولات', tr: 'Masa yönetimi' }, included: false },
          { text: { en: 'POS integration', ar: 'تكامل نقطة البيع', tr: 'POS entegrasyonu' }, included: false },
        ],
        cta: { en: 'Get My Menu', ar: 'احصل على قائمتي', tr: 'Menüme Başla' },
      },
      {
        name: { en: 'Smart Menu', ar: 'القائمة الذكية', tr: 'Akıllı Menü' },
        price: { oneTime: 499 },
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً', tr: 'En Popüler' },
        description: { en: 'Let your customers order directly from the menu — reduce wait staff load, increase table turnover.', ar: 'دع عملاءك يطلبون مباشرة من القائمة — قلل عبء النادلين وزد معدل دوران الطاولات.', tr: 'Müşterilerinizin doğrudan menüden sipariş vermesine izin verin.' },
        features: [
          { text: { en: 'Up to 500 menu items', ar: 'حتى 500 عنصر', tr: '500 menü öğesine kadar' }, included: true },
          { text: { en: 'Arabic + English + Turkish', ar: 'عربي + إنجليزي + تركي', tr: 'Arapça + İngilizce + Türkçe' }, included: true },
          { text: { en: 'QR code generation + printing', ar: 'توليد رمز QR + طباعة', tr: 'QR kod üretimi + baskı' }, included: true },
          { text: { en: 'Menu photos + descriptions + allergens', ar: 'صور وأوصاف ومعلومات الحساسية', tr: 'Fotoğraflar + açıklamalar + alerjenler' }, included: true },
          { text: { en: 'Online ordering with payment', ar: 'الطلب عبر الإنترنت مع الدفع', tr: 'Online sipariş + ödeme' }, included: true },
          { text: { en: 'Table management system', ar: 'نظام إدارة الطاولات', tr: 'Masa yönetim sistemi' }, included: true },
          { text: { en: 'WhatsApp & email notifications', ar: 'إشعارات واتساب والبريد الإلكتروني', tr: 'WhatsApp & e-posta bildirimleri' }, included: true },
          { text: { en: 'Sales & item analytics', ar: 'تحليلات المبيعات والعناصر', tr: 'Satış & ürün analitiği' }, included: true },
          { text: { en: 'POS integration', ar: 'تكامل نقطة البيع', tr: 'POS entegrasyonu' }, included: false },
        ],
        cta: { en: 'Upgrade My Restaurant', ar: 'طوّر مطعمي', tr: 'Restoranımı Yükselt' },
        highlighted: true,
      },
      {
        name: { en: 'Full System', ar: 'النظام الكامل', tr: 'Tam Sistem' },
        price: { oneTime: 649 },
        description: { en: 'A full restaurant management platform — orders, tables, kitchen display, analytics and POS.', ar: 'منصة إدارة مطعم متكاملة — الطلبات والطاولات وشاشة المطبخ والتحليلات ونقطة البيع.', tr: 'Tam restoran yönetim platformu — siparişler, masalar, mutfak ekranı, analitik ve POS.' },
        features: [
          { text: { en: 'Unlimited menu items', ar: 'عناصر قائمة غير محدودة', tr: 'Sınırsız menü öğesi' }, included: true },
          { text: { en: 'All languages', ar: 'جميع اللغات', tr: 'Tüm diller' }, included: true },
          { text: { en: 'QR code generation', ar: 'توليد رمز QR', tr: 'QR kod üretimi' }, included: true },
          { text: { en: 'Premium photos + video previews', ar: 'صور مميزة + معاينات فيديو', tr: 'Premium fotoğraflar + video önizlemeler' }, included: true },
          { text: { en: 'Online ordering + payment', ar: 'الطلب + الدفع الإلكتروني', tr: 'Çevrimiçi sipariş + ödeme' }, included: true },
          { text: { en: 'Advanced table management', ar: 'إدارة طاولات متقدمة', tr: 'Gelişmiş masa yönetimi' }, included: true },
          { text: { en: 'POS + kitchen display', ar: 'نقطة البيع + شاشة المطبخ', tr: 'POS + mutfak ekranı' }, included: true },
        ],
        cta: { en: 'Get the Full System', ar: 'احصل على النظام الكامل', tr: 'Tam Sistemi Al' },
      },
    ],
  },
]

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: { en: 'Do you offer payment plans for larger projects?', ar: 'هل تقدمون خطط دفع للمشاريع الكبيرة؟', tr: 'Büyük projeler için ödeme planları sunuyor musunuz?' },
    a: { en: 'Yes. For projects above $2,000, we typically split into 50% upfront and 50% on delivery. Custom payment schedules are available for enterprise projects.', ar: 'نعم. للمشاريع فوق 2000 دولار، نقسم عادةً إلى 50٪ مقدماً و50٪ عند التسليم. خطط دفع مخصصة متاحة للمشاريع المؤسسية.', tr: '2.000 $ üzerindeki projeler için genellikle %50 peşin ve %50 teslimatta böleriz. Kurumsal projeler için özel ödeme planları mevcuttur.' },
  },
  {
    q: { en: 'Are prices in USD? Do you accept local currencies?', ar: 'هل الأسعار بالدولار الأمريكي؟ هل تقبلون العملات المحلية؟', tr: 'Fiyatlar USD cinsinden mi? Yerel para birimlerini kabul ediyor musunuz?' },
    a: { en: 'Prices are listed in USD for clarity. We accept AED, SAR, QAR, TRY and other regional currencies. Bank transfers, credit cards and local payment methods accepted.', ar: 'الأسعار مدرجة بالدولار الأمريكي للوضوح. نقبل الدرهم والريال السعودي والريال القطري والليرة التركية وعملات إقليمية أخرى.', tr: 'Fiyatlar netlik için USD cinsinden listelenmektedir. AED, SAR, QAR, TRY ve diğer bölgesel para birimlerini kabul ediyoruz.' },
  },
  {
    q: { en: 'What is included in the "free consultation"?', ar: 'ما الذي يتضمنه "الاستشارة المجانية"؟', tr: '"Ücretsiz danışmanlık" neyi kapsar?' },
    a: { en: 'A 30-minute discovery call where we understand your business, goals and technical needs — and propose the right solution with a clear timeline and scope.', ar: 'مكالمة استكشاف مدتها 30 دقيقة نفهم فيها أعمالك وأهدافك واحتياجاتك التقنية — ونقترح الحل المناسب مع جدول زمني واضح ونطاق واضح.', tr: 'İşletmenizi, hedeflerinizi ve teknik ihtiyaçlarınızı anladığımız 30 dakikalık bir keşif görüşmesi — net bir zaman çizelgesi ve kapsam ile doğru çözümü öneriyoruz.' },
  },
  {
    q: { en: 'How long does a typical project take?', ar: 'كم يستغرق المشروع النموذجي؟', tr: 'Tipik bir proje ne kadar sürer?' },
    a: { en: 'Starter websites: 2–3 weeks. Professional websites: 4–6 weeks. Web apps and business systems: 6–16 weeks depending on complexity. We always provide a clear timeline before starting.', ar: 'مواقع البداية: 2–3 أسابيع. المواقع الاحترافية: 4–6 أسابيع. تطبيقات الويب والأنظمة: 6–16 أسبوعاً حسب التعقيد.', tr: 'Başlangıç web siteleri: 2–3 hafta. Profesyonel web siteleri: 4–6 hafta. Web uygulamaları ve iş sistemleri: karmaşıklığa göre 6–16 hafta.' },
  },
  {
    q: { en: 'Do you provide support after launch?', ar: 'هل تقدمون دعماً بعد الإطلاق؟', tr: 'Lansman sonrası destek sağlıyor musunuz?' },
    a: { en: 'All projects include a 30-day post-launch support window at no extra charge. Ongoing maintenance plans start from $99/month and cover security updates, performance monitoring and minor changes.', ar: 'تتضمن جميع المشاريع نافذة دعم 30 يوماً بعد الإطلاق دون رسوم إضافية. تبدأ خطط الصيانة المستمرة من 99 دولاراً شهرياً.', tr: 'Tüm projeler ek ücret ödemeden 30 günlük lansman sonrası destek penceresi içerir. Süregelen bakım planları ayda 99 $\'dan başlar.' },
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Always use en-US so Arabic locale never renders ١٢٣ Indian-Arabic numerals
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

// ─── PricingCard ──────────────────────────────────────────────────────────────
function PricingCard({ tier, billingType, isAnnual, locale, dir, index }: {
  tier: PricingTier
  billingType: 'oneTime' | 'monthly'
  isAnnual: boolean
  locale: string
  dir: string
  index: number
}) {
  const price = billingType === 'monthly'
    ? (isAnnual && tier.annualPrice ? tier.annualPrice : tier.price.monthly)
    : tier.price.oneTime

  const isHighlighted = tier.highlighted

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500
        ${isHighlighted
          ? 'bg-gradient-to-b from-primary-700 to-secondary-800 border-2 border-primary-400/40 shadow-2xl shadow-primary-500/25 scale-[1.04] z-10'
          : 'bg-white border border-neutral-200 shadow-sm hover:shadow-lg hover:border-primary-200'
        }`}
    >
      {/* Shine overlay on highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Badge */}
      {tier.badge && (
        <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wide flex items-center gap-1.5 shadow-md">
            <Star className="w-3 h-3 fill-current" />
            {tier.badge[locale as keyof typeof tier.badge] || tier.badge.en}
          </div>
        </div>
      )}

      <div className="p-7 flex flex-col h-full">
        {/* Tier name */}
        <div className="mb-4">
          <h3 className={`text-lg font-bold mb-1.5 ${isHighlighted ? 'text-white' : 'text-neutral-800'}`}>
            {tier.name[locale as keyof typeof tier.name] || tier.name.en}
          </h3>
          <p className={`text-sm leading-relaxed ${isHighlighted ? 'text-white/65' : 'text-neutral-500'}`}>
            {tier.description[locale as keyof typeof tier.description] || tier.description.en}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          {tier.price.custom ? (
            <div>
              <span className={`text-4xl font-extrabold tracking-tight ${isHighlighted ? 'text-white' : 'text-neutral-800'}`}>
                {locale === 'ar' ? 'مخصص' : locale === 'tr' ? 'Özel' : 'Custom'}
              </span>
              <p className={`text-sm mt-1 ${isHighlighted ? 'text-white/50' : 'text-neutral-400'}`}>
                {locale === 'ar' ? 'تواصل للحصول على سعر' : locale === 'tr' ? 'Fiyat için iletişime geçin' : 'Contact us for pricing'}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-end gap-2">
                <span className={`text-4xl font-extrabold tracking-tight ${isHighlighted ? 'text-white' : 'text-neutral-800'}`}>
                  {formatPrice(price!)}
                </span>
                {billingType === 'monthly' && (
                  <span className={`text-sm mb-2 ${isHighlighted ? 'text-white/50' : 'text-neutral-400'}`}>
                    {locale === 'ar' ? '/ شهر' : locale === 'tr' ? '/ ay' : '/ mo'}
                  </span>
                )}
              </div>
              {billingType === 'monthly' && isAnnual && tier.annualPrice && (
                <p className="text-emerald-500 text-xs mt-1 font-semibold">
                  {locale === 'ar' ? `وفّر ${formatPrice((tier.price.monthly! - tier.annualPrice) * 12)} / سنة` :
                    locale === 'tr' ? `Yılda ${formatPrice((tier.price.monthly! - tier.annualPrice) * 12)} tasarruf` :
                      `Save ${formatPrice((tier.price.monthly! - tier.annualPrice) * 12)}/year`}
                </p>
              )}
              {billingType === 'oneTime' && (
                <p className={`text-xs mt-1 ${isHighlighted ? 'text-white/50' : 'text-neutral-400'}`}>
                  {locale === 'ar' ? 'دفعة واحدة' : locale === 'tr' ? 'Tek seferlik ödeme' : 'One-time payment'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/contact`}
          className={`w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 mb-6 block
            ${isHighlighted
              ? 'bg-white text-primary-700 hover:bg-primary-50 hover:shadow-lg font-bold'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-md hover:shadow-primary-300/50 hover:scale-[1.02]'
            }`}
        >
          {tier.cta[locale as keyof typeof tier.cta] || tier.cta.en}
        </Link>

        {/* Divider */}
        <div className={`h-px mb-5 ${isHighlighted ? 'bg-white/15' : 'bg-neutral-100'}`} />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className={`flex items-start gap-3 text-sm
              ${feature.included
                ? isHighlighted ? 'text-white/85' : 'text-neutral-700'
                : isHighlighted ? 'text-white/30' : 'text-neutral-300'
              }`}>
              <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                ${feature.included
                  ? isHighlighted
                    ? 'bg-white/15 text-white'
                    : 'bg-primary-100 text-primary-600'
                  : isHighlighted
                    ? 'bg-white/8 text-white/25'
                    : 'bg-neutral-100 text-neutral-300'
                }`}>
                {feature.included
                  ? <Check className="w-2.5 h-2.5" />
                  : <X className="w-2.5 h-2.5" />
                }
              </span>
              {feature.text[locale as keyof typeof feature.text] || feature.text.en}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PricingPage() {
  const { locale, dir } = useLanguage()
  const [activeService, setActiveService] = useState('website')
  const [isAnnual, setIsAnnual] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 })
  const pageRef = useRef<HTMLDivElement>(null)

  // Interactive background: track mouse position for parallax orbs
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!pageRef.current) return
      const rect = pageRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const currentService = services.find(s => s.id === activeService) || services[0]
  const isMonthly = currentService.billingType === 'monthly'

  const ui = {
    hero: {
      badge: { en: 'Transparent Pricing', ar: 'أسعار شفافة', tr: 'Şeffaf Fiyatlandırma' },
      title: { en: 'Invest in Growth.\nNot Guesswork.', ar: 'استثمر في النمو.\nليس في التخمين.', tr: 'Büyümeye Yatırım Yap.\nTahminine Değil.' },
      subtitle: { en: 'Clear, honest pricing for every service — crafted for Gulf, Turkish and Arab market budgets.', ar: 'أسعار واضحة وصادقة لكل خدمة — مصممة خصيصاً لأسواق الخليج وتركيا والعالم العربي.', tr: 'Her hizmet için net, dürüst fiyatlandırma — Körfez, Türk ve Arap piyasası bütçeleri için hazırlandı.' },
      consult: { en: 'Book Free Consultation', ar: 'احجز استشارة مجانية', tr: 'Ücretsiz Danışmanlık Rezervasyonu' },
    },
    billing: {
      monthly: { en: 'Monthly', ar: 'شهري', tr: 'Aylık' },
      annual: { en: 'Annual', ar: 'سنوي', tr: 'Yıllık' },
      save: { en: 'Save 20%', ar: 'وفّر 20%', tr: '%20 Tasarruf' },
    },
    trust: [
      {
        icon: <Shield className="w-5 h-5" />,
        title: { en: '30-Day Guarantee', ar: 'ضمان 30 يوم', tr: '30 Günlük Garanti' },
        desc: { en: 'Not satisfied? We fix it.', ar: 'غير راضٍ؟ نصلح ذلك.', tr: 'Memnun değil misiniz? Düzeltiriz.' },
      },
      {
        icon: <Clock className="w-5 h-5" />,
        title: { en: 'On-Time Delivery', ar: 'تسليم في الموعد', tr: 'Zamanında Teslimat' },
        desc: { en: 'We respect your timeline.', ar: 'نحترم جدولك الزمني.', tr: 'Zaman çizelgenize saygı gösteririz.' },
      },
      {
        icon: <Headphones className="w-5 h-5" />,
        title: { en: 'Bilingual Support', ar: 'دعم ثنائي اللغة', tr: 'İki Dilli Destek' },
        desc: { en: 'Arabic, English & Turkish.', ar: 'عربي وإنجليزي وتركي.', tr: 'Arapça, İngilizce ve Türkçe.' },
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: { en: 'No Hidden Fees', ar: 'لا رسوم خفية', tr: 'Gizli Ücret Yok' },
        desc: { en: 'What you see is what you pay.', ar: 'ما تراه هو ما تدفعه.', tr: 'Gördüğünüz ödediğinizdir.' },
      },
    ],
    faq: {
      title: { en: 'Questions & Answers', ar: 'الأسئلة الشائعة', tr: 'Sık Sorulan Sorular' },
      subtitle: { en: "Can't find what you're looking for? Chat with us.", ar: 'لم تجد ما تبحث عنه؟ تحدث معنا.', tr: 'Aradığınızı bulamıyor musunuz? Bizimle sohbet edin.' },
    },
    cta: {
      title: { en: 'Not sure which plan fits you?', ar: 'لست متأكداً من الخطة المناسبة؟', tr: 'Hangi planın size uygun olduğundan emin değil misiniz?' },
      subtitle: { en: "Get on a free 30-minute call. We'll listen, understand and recommend exactly what your business needs.", ar: 'احجز مكالمة مجانية لمدة 30 دقيقة. سنستمع ونفهم ونوصي بما تحتاجه أعمالك بالضبط.', tr: '30 dakikalık ücretsiz bir görüşme yapın. Dinleyeceğiz, anlayacağız ve işletmenizin tam olarak neye ihtiyaç duyduğunu önereceğiz.' },
      cta: { en: 'Schedule Free Call', ar: 'احجز مكالمة مجانية', tr: 'Ücretsiz Görüşme Planla' },
    },
  }

  const t = (obj: Record<string, string>) => obj[locale] || obj.en

  // Orb positions shift gently with mouse — clamped to subtle range
  const orb1X = 20 + (mousePos.x - 50) * 0.08
  const orb1Y = 10 + (mousePos.y - 50) * 0.06
  const orb2X = 65 + (mousePos.x - 50) * -0.06
  const orb2Y = 30 + (mousePos.y - 50) * -0.05
  const orb3X = 40 + (mousePos.x - 50) * 0.04
  const orb3Y = 60 + (mousePos.y - 50) * 0.07

  return (
    <div ref={pageRef} dir={dir} className="min-h-screen relative" style={{ background: '#f4f1f8' }}>

      {/* ── Interactive Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Animated gradient orbs — follow mouse with smooth transition */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-30 transition-all duration-[1200ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
            left: `${orb1X}%`,
            top: `${orb1Y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 transition-all duration-[1600ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            left: `${orb2X}%`,
            top: `${orb2Y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 transition-all duration-[2000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
            left: `${orb3X}%`,
            top: `${orb3Y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, #c4b5fd 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 border border-primary-200 text-primary-600 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t(ui.hero.badge)}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-6 whitespace-pre-line"
          >
            {t(ui.hero.title).split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-cyan-500 to-secondary-500">
                    {line}
                  </span>
                ) : line}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t(ui.hero.subtitle)}
          </motion.p>

          {/* Hero CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-primary-400/30 hover:scale-105 transition-all duration-300"
            >
              {t(ui.hero.consult)}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-8 relative z-10">
        <div className="container">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {ui.trust.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 text-primary-500 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-neutral-800 text-sm font-semibold">{t(item.title)}</p>
                    <p className="text-neutral-400 text-xs">{t(item.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Tables ── */}
      <section className="py-20 relative z-10">
        <div className="container">
          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeService === service.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-400/30'
                    : 'bg-white/80 text-neutral-600 hover:text-primary-600 hover:bg-white border border-neutral-200 hover:border-primary-200 backdrop-blur-sm'
                  }`}
              >
                {service.icon}
                {t(service.label)}
              </button>
            ))}
          </div>

          {/* Service header + billing toggle */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                {t(currentService.label)}
              </h2>
              <p className="text-neutral-500 text-sm">{t(currentService.subtitle)}</p>

              {/* Annual toggle */}
              {isMonthly && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <span className={`text-sm font-medium ${!isAnnual ? 'text-neutral-800' : 'text-neutral-400'}`}>{t(ui.billing.monthly)}</span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isAnnual ? 'bg-primary-500' : 'bg-neutral-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isAnnual ? (dir === 'rtl' ? 'right-1' : 'left-7') : (dir === 'rtl' ? 'right-7' : 'left-1')}`} />
                  </button>
                  <span className={`text-sm font-medium ${isAnnual ? 'text-neutral-800' : 'text-neutral-400'}`}>{t(ui.billing.annual)}</span>
                  {isAnnual && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {t(ui.billing.save)}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pricing Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService + (isAnnual ? '-annual' : '-monthly')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            >
              {currentService.tiers.map((tier, index) => (
                <PricingCard
                  key={tier.name.en}
                  tier={tier}
                  billingType={currentService.billingType}
                  isAnnual={isAnnual}
                  locale={locale}
                  dir={dir}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* All plans note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-neutral-400 text-xs mt-8"
          >
            {locale === 'ar'
              ? 'جميع الخطط تشمل استشارة مجانية، دعماً بعد الإطلاق، وتسليماً في الموعد المحدد.'
              : locale === 'tr'
                ? 'Tüm planlar ücretsiz danışmanlık, lansman sonrası destek ve zamanında teslimat içerir.'
                : 'All plans include a free consultation, post-launch support, and on-time delivery.'}
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 relative z-10">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">{t(ui.faq.title)}</h2>
            <p className="text-neutral-400">{t(ui.faq.subtitle)}</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} locale={locale} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden p-12 text-center bg-gradient-to-br from-primary-600 to-secondary-700 shadow-2xl shadow-primary-400/25"
          >
            {/* Decorative light streak */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {t(ui.cta.title)}
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                {t(ui.cta.subtitle)}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-primary-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                {t(ui.cta.cta)}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, locale, index }: { faq: typeof faqs[0]; locale: string; index: number }) {
  const [open, setOpen] = useState(false)
  const t = (obj: Record<string, string>) => obj[locale] || obj.en

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-neutral-800 font-medium text-sm pr-4">{t(faq.q)}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary-500 shrink-0 text-xl leading-none font-light"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4">
              {t(faq.a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
