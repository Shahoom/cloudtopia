'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight, CornerDownRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { AuroraBackground } from '@/components/ui/aurora-background'

type LocalizedText = {
  en: string
  ar: string
}

type TabCategory = {
  id: string
  label: LocalizedText
  heading: LocalizedText
  description: LocalizedText
  bullets: LocalizedText[]
  image: string
}

const TABS_DATA: TabCategory[] = [
  {
    id: 'ai-consulting',
    label: { en: 'AI Consulting & Strategy', ar: 'استشارات الـ AI والاستراتيجية' },
    heading: { en: 'AI Consulting & Strategy', ar: 'استشارات واستراتيجيات الذكاء الاصطناعي' },
    description: { 
      en: 'Our AI consulting services aim to enable businesses to harness the power of AI through strategic advisory. We take a deep dive into your current business ecosystem, identify AI potential areas, and chart out a detailed action plan that is most suitable for your needs.',
      ar: 'تهدف خدمات استشارات الذكاء الاصطناعي لدينا إلى تمكين الشركات من تسخير قوة الذكاء الاصطناعي من خلال الاستشارات الاستراتيجية. نحن نتعمق في منظومة عملك الحالية، ونحدد مجالات إمكانات الذكاء الاصطناعي، ونرسم خطة عمل مفصلة.'
    },
    image: '/images/homepage/AI Consulting & Strategy.jpg',
    bullets: [
      { en: 'Conduct comprehensive workflow audits to identify operational gaps and AI opportunities.', ar: 'إجراء عمليات تدقيق شاملة لسير العمل لتحديد الثغرات التشغيلية وفرص الذكاء الاصطناعي.' },
      { en: 'Create actionable AI roadmaps tailored to scalability and business objectives.', ar: 'إنشاء خرائط طريق قابلة للتنفيذ للذكاء الاصطناعي مصممة خصيصًا لقابلية التوسع وأهداف العمل.' },
      { en: 'Recommend the right technology stack and AI models for your industry.', ar: 'التوصية بمجموعة التقنيات المناسبة ونماذج الذكاء الاصطناعي لمجال عملك.' },
      { en: 'Measure success with clear KPIs and evaluation frameworks for implementation.', ar: 'قياس النجاح باستخدام مؤشرات أداء رئيسية واضحة وأطر تقييم للتنفيذ.' }
    ]
  },
  {
    id: 'ai-product-dev',
    label: { en: 'AI Product Development', ar: 'تطوير منتجات الذكاء الاصطناعي' },
    heading: { en: 'AI Product Development', ar: 'تطوير منتجات الذكاء الاصطناعي' },
    description: {
      en: 'We build end-to-end AI products tailored to your business needs, from conceptualization and UI/UX design to robust backend engineering and deployment, ensuring scalable and secure applications.',
      ar: 'نقوم ببناء منتجات ذكاء اصطناعي متكاملة ومصممة خصيصاً لاحتياجات عملك، بدءاً من وضع المفاهيم وتصميم واجهة المستخدم وحتى هندسة الواجهة الخلفية والنشر الآمن.'
    },
    image: '/images/homepage/AI Product Development.webp',
    bullets: [
      { en: 'Full-cycle product design from wireframing to production-ready AI applications.', ar: 'تصميم منتجات متكامل من التخطيط الأولي وحتى التطبيقات الجاهزة للإنتاج.' },
      { en: 'Multi-tenant SaaS application structures optimized for swift scaling.', ar: 'بناء تطبيقات SaaS متعددة المستأجرين ومحسنة للتوسع السريع.' },
      { en: 'Robust API architectures connecting complex machine learning backend modules.', ar: 'بنية واجهات برمجة تطبيقات (API) قوية تربط نماذج التعلم الآلي المعقدة.' },
      { en: 'Native mobile and responsive web applications with embedded model hosting.', ar: 'تطبيقات جوال أصلية وويب متجاوبة مع استضافة النماذج الذكية داخلياً.' }
    ]
  },
  {
    id: 'generative-ai',
    label: { en: 'Generative AI Development', ar: 'تطوير الـ AI التوليدي' },
    heading: { en: 'Generative AI Development', ar: 'تطوير الذكاء الاصطناعي التوليدي' },
    description: {
      en: 'Leverage the power of Generative AI to automate content creation, enhance code generation, and process natural language seamlessly. We fine-tune models to align perfectly with your proprietary data.',
      ar: 'استفد من قوة الذكاء الاصطناعي التوليدي لأتمتة إنشاء المحتوى وتحسين توليد الأكواد البرمجية ومعالجة اللغة الطبيعية بسلاسة. نقوم بضبط النماذج لتتوافق تماماً مع بياناتك الخاصة.'
    },
    image: '/images/homepage/Generative AI Development.webp',
    bullets: [
      { en: 'Custom large language model (LLM) fine-tuning using proprietary corporate datasets.', ar: 'ضبط وتدريب نماذج اللغة الكبيرة (LLM) باستخدام البيانات الخاصة بشركتك.' },
      { en: 'Automated content generation tools for multi-lingual marketing copy and assets.', ar: 'أدوات توليد المحتوى التلقائي للمواد التسويقية ثنائية اللغة.' },
      { en: 'Automated codebase generators and code assistant plugins tailored to developer teams.', ar: 'أنظمة توليد الكود البرمجي ومساعدين ذكيين مخصصين لفرق المطورين.' },
      { en: 'Semantic database lookups converting tabular data into natural language reports.', ar: 'البحث الدلالي بقواعد البيانات لتحويل الأرقام إلى تقارير نصية مكتوبة.' }
    ]
  },
  {
    id: 'ai-agents',
    label: { en: 'AI Agent / Copilot', ar: 'الوكلاء والمساعدين' },
    heading: { en: 'AI Agent & Copilot Development', ar: 'تطوير الوكلاء والمساعدين الذكيين' },
    description: {
      en: 'Deploy autonomous AI agents and copilots that handle multi-step workflows, assist your team members in daily tasks, and make real-time intelligent decisions to boost overall productivity.',
      ar: 'انشر وكلاء ذكاء اصطناعي مستقلين ومساعدين شخصيين لإدارة سير العمل متعدد الخطوات، ومساعدة أعضاء فريقك في المهام اليومية، واتخاذ قرارات ذكية فورية.'
    },
    image: '/images/homepage/AI Agent & Copilot Development.jpeg',
    bullets: [
      { en: 'Autonomous agent workflows that complete complex multi-step digital operations.', ar: 'مسارات عمل للوكلاء المستقلين لإكمال العمليات الرقمية متعددة الخطوات تلقائياً.' },
      { en: 'Context-aware office copilots assisting team members in drafting documents and responses.', ar: 'مساعدون مكتبيون ذكيون يفهمون السياق لمساعدة الموظفين في صياغة الملفات والردود.' },
      { en: 'Automated decision-support systems that analyze real-time variables to advise managers.', ar: 'أنظمة دعم القرار المؤتمتة التي تحلل المتغيرات الفورية لتقديم التوصيات للمدراء.' },
      { en: 'Modular tool integration allowing agents to call external APIs, databases, and services.', ar: 'تكامل معياري للأدوات يسمح للوكلاء باستدعاء واجهات API وقواعد البيانات الخارجية.' }
    ]
  },
  {
    id: 'chatbot-conversational',
    label: { en: 'Chatbot & Conversational', ar: 'روبوتات الدردشة' },
    heading: { en: 'Chatbot & Conversational AI', ar: 'روبوتات الدردشة والذكاء الاصطناعي المحادثي' },
    description: {
      en: 'Enhance customer engagement with intelligent, bilingual chatbots and voice assistants. Our solutions provide 24/7 support with seamless human hand-off and integrations across major messaging platforms.',
      ar: 'عزز تفاعل العملاء من خلال روبوتات محادثة ومساعدين صوتيين أذكياء ثنائيي اللغة. توفر حلولنا دعماً على مدار الساعة مع ميزة التحويل السلس للموظفين البشريين.'
    },
    image: '/images/homepage/Chatbot & Conversational AI.webp',
    bullets: [
      { en: 'Bilingual Arabic and English customer support bots answering FAQs in real time.', ar: 'روبوتات دعم عملاء ثنائية اللغة (عربي/إنجليزي) للرد الفوري على الاستفسارات الشائعة.' },
      { en: 'Seamless human-handoff logic that routes complex queries to active customer service staff.', ar: 'منطق تسليم سلس يحول العملاء إلى موظفي الدعم البشريين عند الحاجة.' },
      { en: 'Instant messaging integrations for WhatsApp Business, Telegram, and website widgets.', ar: 'تكامل مباشر مع واتساب الأعمال، وتيليجرام، وعناصر واجهة المستخدم للمواقع.' },
      { en: 'Conversational voice assistants and speech-to-text transcription services.', ar: 'مساعدون صوتيون تفاعليون وخدمات تحويل الكلام إلى نصوص بدقة عالية.' }
    ]
  },
  {
    id: 'smart-assistants',
    label: { en: 'Smart Business Assistants', ar: 'مساعدو الأعمال' },
    heading: { en: 'Smart Business Assistants', ar: 'مساعدو الأعمال الأذكياء' },
    description: {
      en: 'Empower your workforce with smart business assistants that automate meeting schedules, manage emails, and track pipeline updates, allowing your team to focus on high-value strategic work.',
      ar: 'مكن فريق عملك بمساعدي أعمال أذكياء يقومون بأتمتة جداول الاجتماعات وإدارة رسائل البريد الإلكتروني وتتبع تحديثات المبيعات، مما يتيح لفريقك التركيز على العمل الاستراتيجي.'
    },
    image: '/images/homepage/Smart Business Assistants.jpg',
    bullets: [
      { en: 'Automated meeting schedulers and calendar synchronization copilots.', ar: 'مجدولو مواعيد مؤتمتون ومساعدون لمزامنة التقويم والمواعيد المشتركة.' },
      { en: 'Smart alert triggers notifying team members of pipeline updates or contract renewals.', ar: 'محفزات تنبيه ذكية تنبه فريقك عند تحديث المبيعات أو مواعيد تجديد العقود.' },
      { en: 'Autonomous email responders classifying inbox queries and drafting replies.', ar: 'مستجيب بريد تلقائي يصنف الرسائل الواردة ويكتب مسودات الردود المناسبة.' },
      { en: 'Routine administrative workflow helpers that organize files, folders, and notes.', ar: 'مساعدو سير العمل الإداري اليومي لتنظيم الملفات والمجلدات والملاحظات.' }
    ]
  },
  {
    id: 'machine-learning',
    label: { en: 'Machine Learning & DL', ar: 'التعلم الآلي والعميق' },
    heading: { en: 'Machine Learning & Deep Learning', ar: 'التعلم الآلي والتعلم العميق' },
    description: {
      en: 'Unlock insights from your data with advanced Machine Learning and Deep Learning models. We implement predictive analytics, computer vision, and recommendation engines to drive data-backed decisions.',
      ar: 'استخرج رؤى قيمة من بياناتك باستخدام نماذج متقدمة للتعلم الآلي والتعلم العميق. نحن ننفذ التحليلات التنبؤية ورؤية الكمبيوتر ومحركات التوصية لدعم قراراتك.'
    },
    image: '/images/homepage/Machine Learning & Deep Learning.png',
    bullets: [
      { en: 'Predictive analytics models forecasting customer demand, churn, and sales trends.', ar: 'نماذج تحليلات تنبؤية تتوقع طلب العملاء ونسب المغادرة واتجاهات المبيعات.' },
      { en: 'Computer vision integrations for object detection, classification, and OCR.', ar: 'تقنيات رؤية حاسوبية للتعرف على الأشياء وتصنيف الصور وقراءة النصوص (OCR).' },
      { en: 'Recommendation engines for e-commerce platforms and personalized user views.', ar: 'محركات توصية لمنصات التجارة الإلكترونية وتوفير تجارب مستخدم مخصصة.' },
      { en: 'Deep learning networks optimized for speech, sound, or specialized image data.', ar: 'شبكات تعلم عميق محسنة للتعامل مع البيانات الصوتية أو الصور المتخصصة.' }
    ]
  },
  {
    id: 'custom-ai-systems',
    label: { en: 'Enterprise Systems', ar: 'الأنظمة المؤسسية' },
    heading: { en: 'Custom AI & Enterprise Systems', ar: 'أنظمة الذكاء الاصطناعي المؤسسية المخصصة' },
    description: {
      en: 'Integrate AI into your core operations with bespoke CRM and ERP systems. Get real-time executive dashboards and secure, role-based access controls designed specifically for your enterprise.',
      ar: 'ادمج الذكاء الاصطناعي في عملياتك الأساسية من خلال أنظمة CRM و ERP المخصصة. احصل على لوحات قيادة تنفيذية فورية وعناصر تحكم وصول آمنة مصممة خصيصاً لمؤسستك.'
    },
    image: '/images/homepage/Custom AI & Enterprise Systems.webp',
    bullets: [
      { en: 'Bespoke AI-powered CRM systems to track leads and automatically score sales pipelines.', ar: 'أنظمة CRM مخصصة مدعومة بالذكاء الاصطناعي لتتتبع وتقيم مسارات المبيعات تلقائياً.' },
      { en: 'Intelligent ERP architectures linking accounting, supply chains, and staff metrics.', ar: 'أنظمة ERP ذكية تربط المحاسبة بسلاسل الإمداد ومقاييس أداء الموظفين.' },
      { en: 'Executive dashboard portals providing visual insights and summaries of business health.', ar: 'بوابات لوحات القيادة التنفيذية التي تعرض رؤى بصرية وملخصات فورية لسلامة الأعمال.' },
      { en: 'Secure role-based access controls and localized regional data policy compliance.', ar: 'صلاحيات دخول آمنة تعتمد على الأدوار وتوافق تام مع سياسات حماية البيانات المحلية.' }
    ]
  },
  {
    id: 'data-engineering',
    label: { en: 'Data Engineering', ar: 'هندسة البيانات' },
    heading: { en: 'Data Engineering & AI Analytics', ar: 'هندسة البيانات وتحليلات الذكاء الاصطناعي' },
    description: {
      en: 'Establish a solid data foundation for AI with robust ETL pipelines and real-time stream processing. We cleanse, structure, and visualize your data to prepare it for advanced analytics and modeling.',
      ar: 'أسس قاعدة بيانات صلبة للذكاء الاصطناعي باستخدام مسارات بيانات قوية ومعالجة لحظية. نقوم بتنقية وهيكلة بياناتك لتجهيزها للتحليلات المتقدمة والنمذجة.'
    },
    image: '/images/homepage/Data Engineering & AI Analytics.webp',
    bullets: [
      { en: 'Bespoke ETL data pipelines connecting diverse corporate data warehouses.', ar: 'مسارات بيانات (ETL) مخصصة تربط مستودعات البيانات المؤسسية المتنوعة.' },
      { en: 'Google Analytics 4 tracking paired with interactive PowerBI/Looker reports.', ar: 'إعداد تتبع تحليلات جوجل (GA4) بالتوازي مع تقارير PowerBI و Looker التفاعلية.' },
      { en: 'Data cleansing and structuring to prepare databases for machine learning training.', ar: 'تطهير وهيكلة البيانات لتجهيز قواعد البيانات لتدريب نماذج التعلم الآلي.' },
      { en: 'Real-time stream processing architecture to ingest and monitor transaction data.', ar: 'بنية معالجة البيانات اللحظية لمراقبة العمليات أو المعاملات المالية الفورية.' }
    ]
  },
  {
    id: 'ai-automation',
    label: { en: 'AI Automation & RPA', ar: 'أتمتة الـ AI والـ RPA' },
    heading: { en: 'AI-Powered Automation & RPA', ar: 'الأتمتة والتحويل الرقمي المدعوم بالذكاء الاصطناعي' },
    description: {
      en: 'Transform your business processes with AI-powered Robotic Process Automation (RPA). Connect legacy tools with modern cloud platforms to automate invoicing, onboarding, and routine reporting seamlessly.',
      ar: 'قم بتحويل عمليات عملك باستخدام أتمتة العمليات الآلية (RPA) المدعومة بالذكاء الاصطناعي. اربط الأدوات القديمة بالمنصات السحابية لأتمتة المهام الروتينية بسلاسة.'
    },
    image: '/images/homepage/AI-Powered Automation & RPA.webp',
    bullets: [
      { en: 'Robotic Process Automation (RPA) copying human actions across browser and legacy tools.', ar: 'أتمتة العمليات الآلية (RPA) لمحاكاة الإجراءات البشرية عبر المتصفح والأنظمة القديمة.' },
      { en: 'Integration between modern cloud platforms (Slack, Stripe, HubSpot) and internal systems.', ar: 'الربط بين المنصات السحابية الحديثة (Slack, Stripe, HubSpot) والأنظمة الداخلية.' },
      { en: 'Automated invoicing, customer onboarding, and report generation workflows.', ar: 'مسارات عمل مؤتمتة للفواتير وتجهيز حسابات العملاء الجدد وإصدار التقارير.' },
      { en: 'Audit tracking showing full histories of automated operations to satisfy compliance.', ar: 'تتبع سجلات التدقيق لتوفير سجلات تفصيلية للعمليات المؤتمتة للامتثال الرقابي.' }
    ]
  }
]

export default function AiDigitalServices() {
  const { locale } = useLanguage()
  const isRTL = locale === 'ar'
  const [activeTab, setActiveTab] = useState(TABS_DATA[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const tabsListRef = useRef<HTMLDivElement>(null)

  const copywriting = useMemo(() => {
    return locale === 'ar'
      ? {
          title: 'خدماتنا الكاملة لتطوير الذكاء الاصطناعي',
          subtitle: 'تستفيد كلاود توبيا من خدمات تطوير الذكاء الاصطناعي والأعمال لصياغة حلول تحدث ثورة في عملياتك التجارية، وتزيد من قدرتك على الأفكار الجديدة، وتحقق النتائج المرجوة. نحن لا نضع استراتيجيات فحسب، بل ننفذ ونراقب سلسلة الذكاء الاصطناعي بأكملها لمساعدة المؤسسات على تبني الابتكار والأتمتة والمنافسة في عالم متغير رقمياً.',
          tabsHeading: 'خدماتنا في الذكاء الاصطناعي',
          ctaText: 'ابدأ مشروعك معنا الآن',
          ctaSub: 'احصل على تدقيق واستشارة تقنية مجانية لفرص الأتمتة في شركتك.'
        }
      : {
          title: 'Our Complete AI Development Services',
          subtitle: 'CloudTopia leverages AI development services and business to craft solutions that revolutionize your business operations, increase your capacity for new ideas, and achieve desired outcomes. We not only strategize but also implement and monitor the whole AI chain to help organizations embrace innovation, automate, and be competitive in a digitally changing world.',
          tabsHeading: 'Our AI Services',
          ctaText: 'Start Your Project',
          ctaSub: 'Schedule a free consulting session to discover AI and automation opportunities.'
        }
  }, [locale])

  const activeTabIndex = useMemo(() => TABS_DATA.findIndex(t => t.id === activeTab), [activeTab])
  const activeTabData = TABS_DATA[activeTabIndex] || TABS_DATA[0]

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const totalTabs = TABS_DATA.length
    let nextIndex = index

    if (e.key === 'ArrowRight') {
      nextIndex = isRTL ? (index - 1 + totalTabs) % totalTabs : (index + 1) % totalTabs
    } else if (e.key === 'ArrowLeft') {
      nextIndex = isRTL ? (index + 1) % totalTabs : (index - 1 + totalTabs) % totalTabs
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = totalTabs - 1
    } else {
      return
    }

    e.preventDefault()
    const targetId = TABS_DATA[nextIndex].id
    setActiveTab(targetId)
    tabRefs.current[targetId]?.focus()
  }

  useEffect(() => {
    const activeBtn = tabRefs.current[activeTab]
    const listContainer = tabsListRef.current
    if (activeBtn && listContainer) {
      const containerScrollLeft = listContainer.scrollLeft
      const containerWidth = listContainer.clientWidth
      const btnOffsetLeft = activeBtn.offsetLeft
      const btnWidth = activeBtn.clientWidth

      const targetScroll = btnOffsetLeft - containerWidth / 2 + btnWidth / 2
      listContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }, [activeTab])

  // Drag to scroll logic
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    if (tabsListRef.current) {
      startX.current = e.pageX - tabsListRef.current.offsetLeft
      scrollLeft.current = tabsListRef.current.scrollLeft
    }
  }

  const onMouseLeave = () => {
    isDragging.current = false
  }

  const onMouseUp = () => {
    isDragging.current = false
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !tabsListRef.current) return
    e.preventDefault()
    const x = e.pageX - tabsListRef.current.offsetLeft
    const walk = (x - startX.current) * 2 // scroll-fast
    tabsListRef.current.scrollLeft = scrollLeft.current - walk
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = 300
      const actualDirection = isRTL 
        ? (direction === 'left' ? 1 : -1) 
        : (direction === 'left' ? -1 : 1)
      
      tabsListRef.current.scrollBy({ left: actualDirection * scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="ai-digital-services-section"
      className="relative bg-[#050505] text-white overflow-hidden"
      data-header-theme="dark"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AuroraBackground 
        showRadialGradient={true} 
        className="w-full !min-h-0 h-full py-10 lg:py-12 px-4 sm:px-6 lg:px-8 !items-start !justify-start !bg-[#050505]"
      >
      <div className="relative max-w-7xl mx-auto w-full z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight lg:w-1/2 tracking-tight"
          >
            {copywriting.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-neutral-400 leading-relaxed lg:w-1/2"
          >
            {copywriting.subtitle}
          </motion.p>
        </div>

        {/* Tabs Container */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl relative overflow-hidden">
          {/* Ambient glow behind tabs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-1/2 bg-indigo-500/10 blur-[80px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 px-2 relative z-10">
            <div className="flex items-center gap-3">
              <CornerDownRight className={`w-6 h-6 text-indigo-400 ${isRTL ? '-scale-x-100' : ''}`} />
              <h3 className="text-xl font-bold text-white">{copywriting.tabsHeading}</h3>
            </div>
            
            <div className="w-8"></div>
          </div>
          
          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => scrollTabs('left')}
              className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            
            <div
              ref={tabsListRef}
              role="tablist"
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              className="flex items-center gap-3 overflow-x-auto flex-1 py-2 px-1 mask-linear-edges [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
            >
              {TABS_DATA.map((tab, idx) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    ref={(el) => { tabRefs.current[tab.id] = el }}
                    onClick={() => {
                      setActiveTab(tab.id)
                    }}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`relative shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-lg shadow-indigo-500/25 border border-indigo-400/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 opacity-60 text-xs font-mono">[{idx + 1}]</span>
                    <span className="relative z-10">{locale === 'ar' ? tab.label.ar : tab.label.en}</span>
                  </button>
                )
              })}
            </div>
            
            <button 
              onClick={() => scrollTabs('right')}
              className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
            <motion.div 
              className="h-full bg-blue-500" 
              initial={{ width: 0 }} 
              animate={{ width: `${((activeTabIndex + 1) / TABS_DATA.length) * 100}%` }} 
              transition={{ duration: 0.3 }} 
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-[2rem] border-[0.75px] border-white/10 p-2 md:rounded-[2.5rem] md:p-3 mt-4"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div
                id={`panel-${activeTabData.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTabData.id}`}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-[0.75px] border-white/5 bg-[#1b1b23]/90 p-5 sm:p-8 shadow-sm backdrop-blur-md z-10 group"
              >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
                
                {/* Text Column */}
                <div className="space-y-6 flex flex-col justify-center">
                  <motion.h3 
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-black text-white tracking-tight"
                  >
                    {locale === 'ar' ? activeTabData.heading.ar : activeTabData.heading.en}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-neutral-300 leading-relaxed text-sm sm:text-base"
                  >
                    {locale === 'ar' ? activeTabData.description.ar : activeTabData.description.en}
                  </motion.p>
                  
                  <div className="space-y-4 pt-4">
                    {activeTabData.bullets.map((bullet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-default group/item"
                      >
                        <span className="shrink-0 mt-0.5 text-indigo-400 group-hover/item:text-indigo-300 group-hover/item:scale-110 transition-transform">
                          <Check className="w-5 h-5" />
                        </span>
                        <span className="text-neutral-300 group-hover/item:text-white leading-relaxed transition-colors">
                          {locale === 'ar' ? bullet.ar : bullet.en}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Image Column */}
                <div className="relative w-full min-h-[250px] lg:min-h-[350px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={activeTabData.image}
                      alt={locale === 'ar' ? activeTabData.heading.ar : activeTabData.heading.en}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b23]/80 via-transparent to-transparent opacity-80" />
                  </motion.div>
                </div>

              </div>
              
              {/* Decorative background glow that follows the active tab theme conceptually */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      </AuroraBackground>
    </section>
  )
}
