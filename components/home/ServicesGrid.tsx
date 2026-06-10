'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Globe, 
  AppWindow, 
  Layers, 
  ShoppingBag, 
  Monitor, 
  Home, 
  Utensils, 
  RefreshCw,
  Smartphone, 
  Laptop, 
  Code2, 
  Zap, 
  Briefcase, 
  PenTool, 
  Wrench,
  Users, 
  BarChart3, 
  Calendar, 
  Rocket, 
  Database,
  Server, 
  Cloud, 
  Settings, 
  Workflow, 
  Shield, 
  DollarSign,
  MessageSquare, 
  Brain, 
  Search, 
  TrendingUp, 
  Share2, 
  Mail,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { GlowingEffect } from '@/components/ui/glowing-effect'

// Map of Icon strings to Lucide components for type safety
const IconMap: Record<string, React.ComponentType<any>> = {
  Globe, AppWindow, Layers, ShoppingBag, Monitor, Home, Utensils, RefreshCw,
  Smartphone, Laptop, Code2, Zap, Briefcase, PenTool, Wrench,
  Users, BarChart3, Calendar, Rocket, Database,
  Server, Cloud, Settings, Workflow, Shield, DollarSign,
  MessageSquare, Brain, Search, TrendingUp, Share2, Mail
}

type LocalizedText = {
  en: string
  ar: string
}

type ServiceItem = {
  title: LocalizedText
  description: LocalizedText
  link: string
  iconName: string
}

type TabData = {
  id: string
  label: LocalizedText
  description: LocalizedText
  image: string
  services: ServiceItem[]
}

const TABS_DATA: TabData[] = [
  {
    id: 'digital-presence',
    label: { en: 'Digital Presence', ar: 'الحضور الرقمي' },
    description: {
      en: 'Establish a credible, high-converting gateway for your business with bespoke web experiences.',
      ar: 'أنشئ بوابة موثوقة وعالية التحويل لعملك من خلال تجارب ويب مخصصة واحترافية.'
    },
    image: '/images/homepage/digital presence.png',
    services: [
      {
        title: { en: 'Business Websites', ar: 'مواقع الشركات والأعمال' },
        description: { en: 'Custom corporate websites built for outstanding speed, premium look, and Google visibility.', ar: 'موقع تعريفي للشركة لتبسيط الخدمات، وإثبات الهوية والظهور المحلي.' },
        link: '/website-design',
        iconName: 'Globe'
      },
      {
        title: { en: 'Landing Pages', ar: 'صفحات الهبوط الإعلانية' },
        description: { en: 'High-converting landing pages tailored for specific marketing campaigns and leads.', ar: 'صفحات هبوط عالية التحويل مصممة ومخصصة لحملات الإعلانات المدفوعة.' },
        link: '/website-design',
        iconName: 'AppWindow'
      },
      {
        title: { en: 'Corporate Web Portals', ar: 'بوابات الويب المؤسسية' },
        description: { en: 'Secure, integrated hubs for corporate communication, client relations, and data.', ar: 'بوابات ويب متكاملة ومحمية لإدارة الاتصال المؤسسي وعلاقات الشركاء والعملاء.' },
        link: '/website-design',
        iconName: 'Layers'
      },
      {
        title: { en: 'E-commerce Solutions', ar: 'المتاجر الإلكترونية' },
        description: { en: 'Modern online shops with secure payments, inventory managers, and WhatsApp notifications.', ar: 'متاجر مع دفع إلكتروني، إدارة منتجات، مخزون، طلبات، وربط واتساب.' },
        link: '/ecommerce-solutions',
        iconName: 'ShoppingBag'
      },
      {
        title: { en: 'Portfolio Websites', ar: 'مواقع معارض الأعمال' },
        description: { en: 'Interactive galleries and showcases for developers, designers, agencies, and artists.', ar: 'معارض أعمال تفاعلية ومبتكرة للمطورين العقاريين والوكالات والمصممين.' },
        link: '/website-design',
        iconName: 'Monitor'
      },
      {
        title: { en: 'Real Estate Web Development', ar: 'مواقع التطوير العقاري' },
        description: { en: 'Property listing pages with advanced search filters, interactive maps, and lead captures.', ar: 'تطوير مواقع عقارية مع فلاتر بحث متقدمة، خرائط تفاعلية، وقنوات تواصل.' },
        link: '/website-design',
        iconName: 'Home'
      },
      {
        title: { en: 'Restaurant Menu Websites', ar: 'مواقع المطاعم والطلب' },
        description: { en: 'Interactive digital menus with instant checkout, WhatsApp ordering, and branch selectors.', ar: 'قوائم طعام تفاعلية ثنائية اللغة مع طلب مباشر عبر الويب وسير عمل واتساب.' },
        link: '/website-design',
        iconName: 'Utensils'
      },
      {
        title: { en: 'Website Modernization', ar: 'إعادة تصميم وتحديث المواقع' },
        description: { en: 'Transform slow, outdated legacy websites into fast, modern responsive web experiences.', ar: 'تحديث المواقع القديمة بسرعات فائقة وتجربة مستخدم عصرية مع حفظ الأرشفة.' },
        link: '/website-design',
        iconName: 'RefreshCw'
      }
    ]
  },
  {
    id: 'app-development',
    label: { en: 'App Development', ar: 'تطوير التطبيقات' },
    description: {
      en: 'Premium native and cross-platform mobile apps crafted for seamless performance and user engagement.',
      ar: 'تطبيقات جوال أصلية وعابرة للمنصات مصممة بأداء سلس وتجربة تفاعلية متميزة.'
    },
    image: '/images/homepage/app development.jpg',
    services: [
      {
        title: { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
        description: { en: 'Premium custom mobile apps built for outstanding performance and user engagement.', ar: 'تطوير تطبيقات جوال مخصصة ومصممة للأداء المتميز وتفاعل المستخدمين.' },
        link: '/web-applications',
        iconName: 'Smartphone'
      },
      {
        title: { en: 'iOS App Development', ar: 'تطوير تطبيقات iOS' },
        description: { en: 'Native Swift apps optimized for Apple devices, adhering strictly to App Store specs.', ar: 'تطبيقات Swift أصلية ومحسنة لأجهزة آبل ومتوافقة تماماً مع شروط المتجر.' },
        link: '/web-applications',
        iconName: 'Laptop'
      },
      {
        title: { en: 'Android App Development', ar: 'تطوير تطبيقات أندرويد' },
        description: { en: 'Native Kotlin apps optimized for diverse Android devices and Google Play compliance.', ar: 'تطبيقات Kotlin أصلية ومحسنة لأجهزة أندرويد المتنوعة ومتوافقة مع جوجل بلاي.' },
        link: '/web-applications',
        iconName: 'Code2'
      },
      {
        title: { en: 'Cross-Platform App Development', ar: 'تطوير تطبيقات عابرة للمنصات' },
        description: { en: 'Single codebase apps with Flutter or React Native, saving time without losing native feel.', ar: 'تطبيقات بقاعدة كود موحدة باستخدام Flutter أو React Native لتوفير الوقت والمال.' },
        link: '/web-applications',
        iconName: 'Layers'
      },
      {
        title: { en: 'MVP App Development', ar: 'تطوير تطبيقات الـ MVP' },
        description: { en: 'Rapid prototype builds focusing on core value to test markets and secure funding.', ar: 'بناء نموذج MVP سريع يركز على الميزات الأساسية لاختبار السوق وجذب المستثمرين.' },
        link: '/web-applications',
        iconName: 'Zap'
      },
      {
        title: { en: 'Business App Development', ar: 'تطوير تطبيقات الأعمال' },
        description: { en: 'Internal mobile utilities for inventory tracking, field operations, and corporate communications.', ar: 'تطبيقات أعمال داخلية لتتبع المخازن، العمليات الميدانية، والاتصال المؤسسي.' },
        link: '/web-applications',
        iconName: 'Briefcase'
      },
      {
        title: { en: 'App UI/UX Design', ar: 'تصميم واجهات التطبيقات' },
        description: { en: 'Stunning wireframes, user journeys, and high-fidelity mobile designs built to convert.', ar: 'تصميم واجهات وتجربة مستخدم مذهلة، مخططات تفاعلية، وتصاميم جوال ممتازة.' },
        link: '/web-applications',
        iconName: 'PenTool'
      },
      {
        title: { en: 'App Maintenance & Updates', ar: 'صيانة وتحديثات التطبيقات' },
        description: { en: 'Version updates, security patches, OS upgrades, and feature enhancements.', ar: 'تحديثات الإصدارات، الترقيعات الأمنية، دعم أنظمة التشغيل الجديدة، وإضافة ميزات.' },
        link: '/web-applications',
        iconName: 'Wrench'
      }
    ]
  },
  {
    id: 'web-applications',
    label: { en: 'Web Applications', ar: 'تطبيقات الويب' },
    description: {
      en: 'Scalable SaaS products, portal hubs, and internal dashboard systems built on modern JS frameworks.',
      ar: 'منصات SaaS قابلة للتوسع، وبوابات مستخدمين، وأنظمة لوحات تحكم مبنية على أحدث الأطر البرمجية.'
    },
    image: '/images/homepage/web application.jpeg',
    services: [
      {
        title: { en: 'Custom Web Applications', ar: 'تطبيقات الويب المخصصة' },
        description: { en: 'Interactive web applications built with Next.js, React, and robust API endpoints.', ar: 'تطوير تطبيقات ويب تفاعلية وقابلة للتوسع باستخدام Next.js و React وقواعد بيانات قوية.' },
        link: '/web-applications',
        iconName: 'Laptop'
      },
      {
        title: { en: 'Client Portals', ar: 'بوابات العملاء الآمنة' },
        description: { en: 'Secure user hubs for custom billing, file sharing, ticket tracking, and direct chat.', ar: 'بوابات عملاء آمنة للفواتير ومشاركة الملفات وتتبع التذاكر والمحادثات المباشرة.' },
        link: '/web-applications',
        iconName: 'Users'
      },
      {
        title: { en: 'Admin Dashboards', ar: 'لوحات التحكم والإدارة' },
        description: { en: 'Custom panels showing real-time metrics, user management, and operational controls.', ar: 'لوحات إدارة مخصصة تعرض مقاييس فورية، وإدارة المستخدمين، والتحكم التشغيلي.' },
        link: '/web-applications',
        iconName: 'BarChart3'
      },
      {
        title: { en: 'Booking Platforms', ar: 'منصات الحجز والجدولة' },
        description: { en: 'Bespoke appointment scheduling, calendar syncs, and deposit collection engines.', ar: 'منصات حجز مواعيد مخصصة، مزامنة التقويم، وأنظمة تحصيل الدفعات المقدمة.' },
        link: '/web-applications',
        iconName: 'Calendar'
      },
      {
        title: { en: 'SaaS MVP Development', ar: 'تطوير الـ MVP لمنصات SaaS' },
        description: { en: 'Multitenant cloud software prototypes built quickly to test product-market fit.', ar: 'تطوير برمجيات سحابية متعددة المستأجرين (SaaS MVP) لاختبار ملاءمة المنتج للسوق.' },
        link: '/web-applications',
        iconName: 'Rocket'
      },
      {
        title: { en: 'Progressive Web Apps (PWA)', ar: 'تطبيقات الويب التقدمية (PWA)' },
        description: { en: 'Web apps with mobile app behaviors: offline support, installable icons, and speed.', ar: 'تطوير تطبيقات ويب تقدمية بميزات الجوال: العمل دون اتصال والسرعة الفائقة.' },
        link: '/web-applications',
        iconName: 'Smartphone'
      },
      {
        title: { en: 'Internal Business Tools', ar: 'أدوات الأعمال الداخلية' },
        description: { en: 'Tailored databases, asset managers, and custom digital forms for staff operations.', ar: 'قواعد بيانات وأدوات إدارة أصول ونماذج رقمية مخصصة لتنظيم العمل الداخلي للموظفين.' },
        link: '/web-applications',
        iconName: 'Database'
      },
      {
        title: { en: 'Collaborative Portals', ar: 'بوابات التعاون والمشاركة' },
        description: { en: 'Secure spaces for team sharing, document workspaces, and department collaboration.', ar: 'مساحات آمنة لمشاركة الفريق، مساحات عمل للمستندات، والتعاون بين الأقسام.' },
        link: '/web-applications',
        iconName: 'Layers'
      }
    ]
  },
  {
    id: 'business-systems',
    label: { en: 'Business Systems', ar: 'أنظمة الأعمال' },
    description: {
      en: 'Operational databases, billing pipelines, CRM and ERP ecosystems integrated into your workflow.',
      ar: 'قواعد بيانات تشغيلية، مسارات فواتير، وأنظمة CRM و ERP متكاملة مع سير عمل شركتك.'
    },
    image: '/images/homepage/business systems.jpeg',
    services: [
      {
        title: { en: 'CRM Systems', ar: 'أنظمة إدارة العملاء (CRM)' },
        description: { en: 'Sales pipelining, contact managers, automatic follow-ups, and customer histories.', ar: 'أنظمة مبيعات، عملاء، ومتابعات تلقائية مصممة لتسريع صفقاتك.' },
        link: '/business-systems-development',
        iconName: 'Users'
      },
      {
        title: { en: 'Inventory Management', ar: 'أنظمة إدارة المخازن' },
        description: { en: 'Real-time stock tracking, purchase orders, reorder alerts, and supplier databases.', ar: 'أنظمة تتبع المخزون اللحظي، أوامر الشراء، تنبيهات إعادة الطلب، وقواعد بيانات الموردين.' },
        link: '/business-systems-development',
        iconName: 'Layers'
      },
      {
        title: { en: 'Sales Management Systems', ar: 'أنظمة إدارة المبيعات' },
        description: { en: 'Lead scoring, team quotas, performance dashboards, and automated sales reporting.', ar: 'أنظمة إدارة المبيعات وتصنيف العملاء المحتملين ولوحات الأداء والتقارير التلقائية.' },
        link: '/business-systems-development',
        iconName: 'BarChart3'
      },
      {
        title: { en: 'Order Management Systems', ar: 'أنظمة إدارة الطلبات' },
        description: { en: 'Invoice generators, payment status tracking, and dispatching automation pipelines.', ar: 'أنظمة إدارة الطلبات وإصدار الفواتير وتتبع حالة الدفع وأتمتة الشحن والتسليم.' },
        link: '/business-systems-development',
        iconName: 'Database'
      },
      {
        title: { en: 'HR & Payroll Systems', ar: 'أنظمة الموارد البشرية والرواتب' },
        description: { en: 'Employee records, attendance tracking, leave management, and localized payroll engines.', ar: 'أنظمة إدارة الموارد البشرية والرواتب، الحضور والانصراف، وإدارة الإجازات المخصصة.' },
        link: '/business-systems-development',
        iconName: 'Users'
      },
      {
        title: { en: 'Accounting Integration', ar: 'ربط الأنظمة المحاسبية' },
        description: { en: 'Connect billing with QuickBooks, Xero, or regional ERPs for seamless finance.', ar: 'ربط الفواتير مع QuickBooks أو Xero أو أنظمة المحاسبة الإقليمية لإدارة مالية سلسة.' },
        link: '/business-systems-development',
        iconName: 'DollarSign'
      },
      {
        title: { en: 'Custom ERP Solutions', ar: 'حلول ERP المخصصة' },
        description: { en: 'Centralized databases tying finance, HR, inventory, and operations into one core system.', ar: 'حلول ERP مخصصة لربط المالية والموارد البشرية والمخزون والعمليات في نظام مركزي.' },
        link: '/business-systems-development',
        iconName: 'Workflow'
      },
      {
        title: { en: 'Supply Chain Platforms', ar: 'أنظمة سلاسل الإمداد والخدمات' },
        description: { en: 'Track vendor shipments, logistics updates, warehouse routing, and lead times.', ar: 'أنظمة إدارة سلاسل الإمداد لتتبع شحنات الموردين، التحديثات اللوجستية، وتوجيه المستودعات.' },
        link: '/business-systems-development',
        iconName: 'Database'
      }
    ]
  },
  {
    id: 'cloud-infrastructure',
    label: { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' },
    description: {
      en: 'Deploy, scale, migrate, and optimize database layers on secure global cloud provider setups.',
      ar: 'انشر، وتوسع، ورحّل، وحسّن قواعد البيانات على بنى تحتية سحابية عالمية محمية بالكامل.'
    },
    image: '/images/homepage/cloud & infrastructure.webp',
    services: [
      {
        title: { en: 'Cloud Hosting Setup', ar: 'إعداد الاستضافات السحابية' },
        description: { en: 'AWS, GCP, Vercel, and Cloudflare deployments tailored for security and uptime.', ar: 'إعداد استضافة سحابية على AWS أو GCP أو Vercel أو Cloudflare للأمان والاستقرار.' },
        link: '/services/cloud-migration',
        iconName: 'Server'
      },
      {
        title: { en: 'Cloud Migration', ar: 'الترحيل إلى السحابة' },
        description: { en: 'Zero-downtime transfers of legacy sites, files, databases, and APIs to modern clouds.', ar: 'نقل الأنظمة وقواعد البيانات إلى بنية سحابية مستقرة مع مراقبة وأمان.' },
        link: '/services/cloud-migration',
        iconName: 'Cloud'
      },
      {
        title: { en: 'Server Deployment & Config', ar: 'تهيئة وإدارة الخوادم' },
        description: { en: 'Configuration of Linux servers, Nginx setups, SSL, and resource monitors.', ar: 'نشر وإدارة الخوادم وإعدادات Linux و Nginx وشهادات SSL ومراقبة الموارد.' },
        link: '/services/cloud-migration',
        iconName: 'Settings'
      },
      {
        title: { en: 'DevOps & CI/CD Automation', ar: 'أتمتة DevOps و CI/CD' },
        description: { en: 'Build, test, and deploy code automatically to remove manual server updates.', ar: 'أتمتة DevOps ومسارات CI/CD لبناء واختبار ونشر الكود تلقائياً دون تدخل يدوي.' },
        link: '/services/cloud-migration',
        iconName: 'Workflow'
      },
      {
        title: { en: 'Database Optimization', ar: 'إعداد وتحسين قواعد البيانات' },
        description: { en: 'PostgreSQL, MySQL, and Redis setups with indexing, clustering, and tuning.', ar: 'إعداد وتحسين قواعد بيانات PostgreSQL و MySQL و Redis مع الفهرسة والنسخ المتماثل.' },
        link: '/services/cloud-migration',
        iconName: 'Database'
      },
      {
        title: { en: 'Cloud Security & Backups', ar: 'الأمان والنسخ الاحتياطي السحابي' },
        description: { en: 'Automated daily backups, DDoS protection, firewall configurations, and logs.', ar: 'حلول أمان سحابية، نسخ احتياطي يومي تلقائي، حماية DDoS، وإعداد جدران الحماية.' },
        link: '/services/cloud-migration',
        iconName: 'Shield'
      },
      {
        title: { en: 'Scalable Cloud Architecture', ar: 'بنية سحابية قابلة للتوسع' },
        description: { en: 'Auto-scaling server setups built to handle high load without manual scaling.', ar: 'بنية سحابية قابلة للتوسع التلقائي للتعامل مع الأحمال الكبيرة دون تدخل يدوي.' },
        link: '/services/cloud-migration',
        iconName: 'Layers'
      },
      {
        title: { en: 'Cloud Cost Optimization', ar: 'تحسين تكاليف السحابة' },
        description: { en: 'Audit cloud setups to remove unused items and reduce bills by up to 50%.', ar: 'تحسين تكاليف السحابة وتدقيق الخوادم لإزالة الموارد غير المستخدمة وتقليل الفواتير.' },
        link: '/services/cloud-migration',
        iconName: 'DollarSign'
      }
    ]
  },
  {
    id: 'ai-automation',
    label: { en: 'AI Automation', ar: 'أتمتة الذكاء الاصطناعي' },
    description: {
      en: 'Automate manual processes, draft data insights, and power support desks with intelligence models.',
      ar: 'أتمت العمليات اليدوية، واستخرج تحليلات البيانات، وادعم مكاتب المساعدة بنماذج الذكاء الاصطناعي.'
    },
    image: '/images/homepage/ai automation.webp',
    services: [
      {
        title: { en: 'AI Chatbots & Assistants', ar: 'مساعدو وروبوتات المحادثة بالـ AI' },
        description: { en: 'Bilingual agents integrated on WhatsApp or websites to handle FAQs and bookings.', ar: 'مساعدون وروبوتات محادثة بالذكاء الاصطناعي للرد على الاستفسارات وأتمتة العمليات.' },
        link: '/services/ai-automation',
        iconName: 'MessageSquare'
      },
      {
        title: { en: 'Business Process Automation', ar: 'أتمتة العمليات بالذكاء الاصطناعي' },
        description: { en: 'Automate data entry, invoice parsing, and email routing using custom AI logic.', ar: 'أتمتة العمليات الإدارية، إدخال البيانات، قراءة الفواتير، وتوجيه البريد بالذكاء الاصطناعي.' },
        link: '/services/ai-automation',
        iconName: 'Workflow'
      },
      {
        title: { en: 'AI Content Generation', ar: 'أنظمة توليد المحتوى بالـ AI' },
        description: { en: 'Custom LLM integrations to draft product descriptions, corporate templates, or ads.', ar: 'أنظمة توليد محتوى بالذكاء الاصطناعي لصياغة أوصاف المنتجات والقوالب المؤسسية.' },
        link: '/services/ai-automation',
        iconName: 'PenTool'
      },
      {
        title: { en: 'Intelligent Document Processing', ar: 'المعالجة الذكية للمستندات' },
        description: { en: 'Extract text, categorize files, and index internal corporate files for search.', ar: 'معالجة المستندات واستخراج النصوص وتصنيف الملفات وفهرسة الوثائق الداخلية للبحث.' },
        link: '/services/ai-automation',
        iconName: 'Layers'
      },
      {
        title: { en: 'AI-Powered Support Desk', ar: 'دعم عملاء مدعوم بالـ AI' },
        description: { en: 'Self-improving support bots that resolve up to 70% of common customer tickets.', ar: 'دعم عملاء ذكي وروبوتات دعم ذاتية التحسين لحل أكثر من 70% من التذاكر الشائعة.' },
        link: '/services/ai-automation',
        iconName: 'Brain'
      },
      {
        title: { en: 'AI Sales Assistants', ar: 'مساعدو المبيعات بالـ AI' },
        description: { en: 'Draft follow-up emails, qualify incoming leads, and summarize client calls.', ar: 'مساعدو مبيعات بالذكاء الاصطناعي لكتابة رسائل المتابعة وتصنيف العملاء وتلخيص المكالمات.' },
        link: '/services/ai-automation',
        iconName: 'Users'
      },
      {
        title: { en: 'AI Reporting & Analytics', ar: 'تقارير وتحليلات بالـ AI' },
        description: { en: 'Translate complex business figures into clear, written prose explanations automatically.', ar: 'لوحات تقارير وتحليلات ذكية تحول الأرقام المعقدة إلى تفسيرات مكتوبة واضحة تلقائياً.' },
        link: '/services/ai-automation',
        iconName: 'BarChart3'
      },
      {
        title: { en: 'Custom Machine Learning', ar: 'حلول التعلم الآلي المخصصة' },
        description: { en: 'Custom models built for predictive analytics, demand planning, and anomaly detection.', ar: 'تطوير نماذج تعلم آلي مخصصة للتحليلات التنبؤية، تخطيط الطلب، وتحديد المعاملات الشاذة.' },
        link: '/services/ai-automation',
        iconName: 'Code2'
      }
    ]
  },
  {
    id: 'digital-growth',
    label: { en: 'Digital Growth', ar: 'النمو الرقمي' },
    description: {
      en: 'Boost conversions, rank higher on search engines, and streamline customer acquisition funnels.',
      ar: 'ضاعف معدلات التحويل، وتصدّر محركات البحث، ونظّم مسارات جذب العملاء الجدد.'
    },
    image: '/images/homepage/digital growth.webp',
    services: [
      {
        title: { en: 'Search Engine Optimization', ar: 'تحسين محركات البحث (SEO)' },
        description: { en: 'Technical audits, keyword planning, content writing, and local business indexing.', ar: 'تحسين محركات البحث (SEO)، تدقيق تقني، كلمات مفتاحية، وصياغة محتوى متوافق.' },
        link: '/website-design',
        iconName: 'Search'
      },
      {
        title: { en: 'Conversion Rate Optimization', ar: 'تحسين معدلات التحويل (CRO)' },
        description: { en: 'Analyze heatmaps, simplify checkouts, rewrite copy, and double lead conversion.', ar: 'تحسين معدل التحويل (CRO)، تحليل الخرائط الحرارية، وتبسيط خطوات الدفع والطلبات.' },
        link: '/website-design',
        iconName: 'TrendingUp'
      },
      {
        title: { en: 'Paid Ad Campaign Pages', ar: 'إعلانات مدفوعة وصفحات هبوط' },
        description: { en: 'Google Search, Meta, and LinkedIn campaign management paired with high-converting pages.', ar: 'إدارة إعلانات جوجل وفيسبوك ولينكد إن مع صفحات هبوط سريعة الاستجابة وعالية التحويل.' },
        link: '/website-design',
        iconName: 'AppWindow'
      },
      {
        title: { en: 'Social Media Management', ar: 'إدارة وسائل التواصل الاجتماعي' },
        description: { en: 'Auto-post updates, track brand mentions, and design multi-platform strategies.', ar: 'استراتيجية وأتمتة منصات التواصل الاجتماعي، النشر التلقائي وتتبع العلامة.' },
        link: '/social-media-marketing',
        iconName: 'Share2'
      },
      {
        title: { en: 'Email Automation Flows', ar: 'أتمتة مسارات البريد الإلكتروني' },
        description: { en: 'Lead nurturing, custom onboarding sequences, and weekly newsletter workflows.', ar: 'أتمتة التسويق بالبريد الإلكتروني، مسارات المتابعة للعملاء، ونشرات بريدية أسبوعية.' },
        link: '/website-design',
        iconName: 'Mail'
      },
      {
        title: { en: 'Lead Generation Engines', ar: 'أنظمة جذب العملاء المحتملين' },
        description: { en: 'Design calculators, audit tools, and gated content setups to capture business leads.', ar: 'أنظمة توليد عملاء محتملين تشمل حاسبات رقمية وأدوات تدقيق لجمع بيانات العملاء.' },
        link: '/website-design',
        iconName: 'Users'
      },
      {
        title: { en: 'Analytics & GA4 Tracking', ar: 'التحليلات وتتبع GA4' },
        description: { en: 'Google Analytics 4 setup, GTM containers, custom conversion events, and reports.', ar: 'إعداد تحليلات جوجل (GA4)، مدير العلامات (GTM)، وتتبع أحداث التحويل المخصصة.' },
        link: '/website-design',
        iconName: 'BarChart3'
      },
      {
        title: { en: 'Brand Identity Systems', ar: 'تصميم وبناء الهوية البصرية' },
        description: { en: 'Premium custom logos, brand guidelines, presentation decks, and web visuals.', ar: 'تصميم الهوية البصرية، شعارات مخصصة، أدلة هوية، وعروض تقديمية وعناصر بصرية.' },
        link: '/website-design',
        iconName: 'PenTool'
      }
    ]
  }
]

export default function ServicesGrid() {
  const { t, locale } = useLanguage()
  const isRTL = locale === 'ar'
  const [activeTab, setActiveTab] = useState('digital-presence')

  // Static Localized Text
  const localCopy = useMemo(() => {
    return locale === 'ar'
      ? {
          badge: 'ماذا نقدم',
          title: 'خدمات تقنية متكاملة مصممة',
          titleHighlight: 'للنمو الرقمي الفعلي',
          subtitle: 'كلاود توبيا هي شريكك التقني الموثوق لبناء مواقع وتطبيقات وأنظمة متكاملة تدعم توسع أعمالك في الخليج والشرق الأوسط.',
          learnMore: 'اقرأ المزيد',
          viewAll: 'تصفح كل الخدمات'
        }
      : {
          badge: 'What We Deliver',
          title: 'Next-Gen IT Services Designed for',
          titleHighlight: 'Digital Growth',
          subtitle: 'CloudTopia is a premium technology solutions provider that helps businesses to innovate at a quicker rate, become more intelligent in their operations, and grow in a more productive manner.',
          learnMore: 'Learn more',
          viewAll: 'Browse All Services'
        }
  }, [locale])

  const activeTabData = useMemo(() => {
    return TABS_DATA.find((tab) => tab.id === activeTab) || TABS_DATA[0]
  }, [activeTab])

  // Split active tab services: 4 for left column, 4 for right column
  const leftColumnServices = useMemo(() => {
    return activeTabData.services.slice(0, 4)
  }, [activeTabData])

  const rightColumnServices = useMemo(() => {
    return activeTabData.services.slice(4, 8)
  }, [activeTabData])

  return (
    <section
      id="services-section"
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] text-neutral-900 overflow-hidden"
      data-header-theme="light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Premium Subdued Background Accents for Light Theme */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 80%)',
        }}
      />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center mb-5"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-bold uppercase tracking-widest">
              ✦ {localCopy.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5 text-neutral-900"
          >
            {localCopy.title}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {localCopy.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto"
          >
            {localCopy.subtitle}
          </motion.p>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex items-center gap-1.5 p-1.5 bg-white/80 border border-neutral-200/60 rounded-full max-w-full overflow-x-auto scrollbar-none shadow-md backdrop-blur-md">
              {TABS_DATA.map((tab) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBubble"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_3px_10px_rgba(37,99,235,0.25)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{locale === 'ar' ? tab.label.ar : tab.label.en}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_540px_1fr] gap-6 items-center"
          >
            
            {/* Left Column - 4 Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {leftColumnServices.map((service, index) => {
                const IconComponent = IconMap[service.iconName] || Globe
                return (
                  <ServiceCard 
                    key={index} 
                    title={locale === 'ar' ? service.title.ar : service.title.en}
                    description={locale === 'ar' ? service.description.ar : service.description.en}
                    link={service.link}
                    Icon={IconComponent}
                    locale={locale}
                    learnMoreText={localCopy.learnMore}
                  />
                )
              })}
            </div>

            {/* Center Column - 1 Visual Portrait Image (Made Bigger) */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <motion.div 
                className="relative w-full max-w-[540px] aspect-[3.5/4] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(27,27,35,0.08)] border border-neutral-200"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={activeTabData.image}
                  alt={locale === 'ar' ? activeTabData.label.ar : activeTabData.label.en}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  quality={90}
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {locale === 'ar' ? activeTabData.label.ar : activeTabData.label.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-4">
                    {locale === 'ar' ? activeTabData.description.ar : activeTabData.description.en}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 4 Cards */}
            <div className="space-y-4 order-3">
              {rightColumnServices.map((service, index) => {
                const IconComponent = IconMap[service.iconName] || Globe
                return (
                  <ServiceCard 
                    key={index} 
                    title={locale === 'ar' ? service.title.ar : service.title.en}
                    description={locale === 'ar' ? service.description.ar : service.description.en}
                    link={service.link}
                    Icon={IconComponent}
                    locale={locale}
                    learnMoreText={localCopy.learnMore}
                  />
                )
              })}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* View All Services Link */}
        <div className="mt-14 flex justify-center">
          <Link
            href={localePath(locale, '/services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group border-b border-transparent hover:border-neutral-900/20 pb-0.5"
          >
            {localCopy.viewAll}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  link: string
  Icon: React.ComponentType<any>
  locale: string
  learnMoreText: string
}

function ServiceCard({ title, description, link, Icon, locale, learnMoreText }: ServiceCardProps) {
  const isRTL = locale === 'ar'
  
  return (
    <motion.div
      className="relative rounded-xl p-[0.75px] transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: 'rgba(0,0,0,0.06)'
      }}
      whileHover={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), rgba(139,92,246,0.15), rgba(59,130,246,0.25))' }}
    >
      <GlowingEffect
        spread={36}
        glow={true}
        disabled={false}
        proximity={72}
        inactiveZone={0.05}
        borderWidth={1}
      />
      <Link
        href={localePath(locale, link)}
        className="group relative flex items-start gap-4 bg-white/95 p-4 rounded-[11px] overflow-hidden shadow-sm"
      >
        {/* Card Background Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Service Icon Box */}
        <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Service Details */}
        <div className="min-w-0 flex-1">
          {/* h3 (not h4): these service cards render before the active-tab
              category label in the DOM, so an h4 here produced an h2->h4 skip.
              Explicit text-base/lg classes keep the visual size unchanged. */}
          <h3 className="text-base sm:text-lg font-black text-neutral-900 mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-2.5">
            {description}
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 transition-colors">
            <span>{learnMoreText}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
