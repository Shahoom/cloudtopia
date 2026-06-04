// ─────────────────────────────────────────────────────────────────────────────
// CloudTopia Solution Finder — Step Definitions (Bilingual)
// Edit this file to add/remove steps, options, or change wording.
// ─────────────────────────────────────────────────────────────────────────────

export type BilingualLabel = { en: string; ar: string }

export type OptionItem = {
  id: string
  label: BilingualLabel
  description: BilingualLabel
  icon: string
}

export type StepDefinition = {
  id: string
  type: 'single-choice' | 'dual-choice' | 'form'
  options?: OptionItem[]
  budgetOptions?: OptionItem[]
  timelineOptions?: OptionItem[]
}

// ─── Step 1: Industry ────────────────────────────────────────────────────────
export const industryStep: StepDefinition = {
  id: 'industry',
  type: 'single-choice',
  options: [
    {
      id: 'real-estate',
      label: { en: 'Real Estate', ar: 'العقارات' },
      description: {
        en: 'Property websites, listings, maps, lead capture, and CRM.',
        ar: 'مواقع عقارية، عرض عقارات، خرائط، استقبال العملاء، ونظام CRM.',
      },
      icon: '🏢',
    },
    {
      id: 'healthcare',
      label: { en: 'Healthcare & Clinics', ar: 'العيادات والرعاية الصحية' },
      description: {
        en: 'Clinic websites, bookings, patient inquiries, and automation.',
        ar: 'مواقع للعيادات، حجوزات، استفسارات المرضى، وأتمتة المتابعة.',
      },
      icon: '🏥',
    },
    {
      id: 'restaurants',
      label: { en: 'Restaurants & Cafes', ar: 'المطاعم والمقاهي' },
      description: {
        en: 'Digital menus, ordering, reservations, and WhatsApp orders.',
        ar: 'منيو رقمي، طلبات، حجوزات، وطلبات عبر واتساب.',
      },
      icon: '🍽️',
    },
    {
      id: 'ecommerce',
      label: { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
      description: {
        en: 'Product catalogs, stores, checkout, inventory, and orders.',
        ar: 'كتالوج منتجات، متجر إلكتروني، طلبات، ومخزون.',
      },
      icon: '🛒',
    },
    {
      id: 'education',
      label: { en: 'Education', ar: 'التعليم' },
      description: {
        en: 'Course platforms, student portals, dashboards, and LMS.',
        ar: 'منصات تعليمية، بوابات طلاب، لوحات تحكم، وأنظمة تعليم.',
      },
      icon: '🎓',
    },
    {
      id: 'logistics',
      label: { en: 'Logistics & Delivery', ar: 'الشحن والتوصيل' },
      description: {
        en: 'Tracking, delivery dashboards, booking, and operations systems.',
        ar: 'تتبع شحنات، لوحات توصيل، حجوزات، وأنظمة تشغيل.',
      },
      icon: '🚚',
    },
    {
      id: 'professional-services',
      label: { en: 'Professional Services', ar: 'الخدمات المهنية' },
      description: {
        en: 'Law firms, consultants, agencies, and service companies.',
        ar: 'مكاتب محاماة، استشارات، وكالات، وشركات خدمات.',
      },
      icon: '💼',
    },
    {
      id: 'startup',
      label: { en: 'Startup / New Business', ar: 'شركة ناشئة / مشروع جديد' },
      description: {
        en: 'MVPs, landing pages, SaaS ideas, and fast launch systems.',
        ar: 'نماذج أولية، صفحات هبوط، أفكار SaaS، وانطلاق سريع.',
      },
      icon: '🚀',
    },
    {
      id: 'other',
      label: { en: 'Other', ar: 'قطاع آخر' },
      description: {
        en: "Tell us your business type in the final step.",
        ar: 'يمكنك توضيح نوع عملك في الخطوة الأخيرة.',
      },
      icon: '✨',
    },
  ],
}

// ─── Step 2: Project Type ─────────────────────────────────────────────────────
export const projectTypeStep: StepDefinition = {
  id: 'project-type',
  type: 'single-choice',
  options: [
    {
      id: 'business-website',
      label: { en: 'Business Website', ar: 'موقع شركة' },
      description: {
        en: 'A professional website that presents your company and generates leads.',
        ar: 'موقع احترافي يعرض شركتك ويستقطب العملاء المحتملين.',
      },
      icon: '🌐',
    },
    {
      id: 'landing-page',
      label: { en: 'Landing Page', ar: 'صفحة هبوط' },
      description: {
        en: 'A focused page for ads, offers, campaigns, or lead generation.',
        ar: 'صفحة مركزة للإعلانات، العروض، الحملات، أو جذب العملاء.',
      },
      icon: '📄',
    },
    {
      id: 'mobile-app',
      label: { en: 'Mobile App', ar: 'تطبيق موبايل' },
      description: {
        en: 'iOS, Android, or cross-platform application.',
        ar: 'تطبيق iOS أو Android أو متعدد المنصات.',
      },
      icon: '📱',
    },
    {
      id: 'web-application',
      label: { en: 'Web Application', ar: 'تطبيق ويب' },
      description: {
        en: 'Custom web platform, portal, dashboard, or SaaS system.',
        ar: 'منصة ويب مخصصة، بوابة، لوحة تحكم، أو نظام SaaS.',
      },
      icon: '⚙️',
    },
    {
      id: 'crm-system',
      label: { en: 'CRM System', ar: 'نظام CRM' },
      description: {
        en: 'Manage clients, leads, follow-ups, sales, and WhatsApp communication.',
        ar: 'إدارة العملاء، العملاء المحتملين، المتابعة، المبيعات، وواتساب.',
      },
      icon: '🤝',
    },
    {
      id: 'business-system',
      label: { en: 'Business Management System', ar: 'نظام إدارة أعمال' },
      description: {
        en: 'Inventory, orders, invoices, HR, operations, or internal workflows.',
        ar: 'مخزون، طلبات، فواتير، موارد بشرية، عمليات، أو سير عمل داخلي.',
      },
      icon: '🗂️',
    },
    {
      id: 'ai-automation',
      label: { en: 'AI Automation', ar: 'أتمتة بالذكاء الاصطناعي' },
      description: {
        en: 'AI assistants, chatbots, automated reports, and smart workflows.',
        ar: 'مساعدات ذكاء اصطناعي، شات بوت، تقارير آلية، وسير عمل ذكي.',
      },
      icon: '🤖',
    },
    {
      id: 'cloud-infrastructure',
      label: { en: 'Cloud Infrastructure', ar: 'بنية سحابية' },
      description: {
        en: 'Hosting, deployment, database, backup, performance, and security.',
        ar: 'استضافة، نشر، قاعدة بيانات، نسخ احتياطي، أداء، وأمان.',
      },
      icon: '☁️',
    },
    {
      id: 'digital-growth',
      label: { en: 'Digital Growth', ar: 'نمو رقمي وتسويق' },
      description: {
        en: 'Branding, content, ads, SEO, and online visibility.',
        ar: 'هوية بصرية، محتوى، إعلانات، SEO، وتعزيز الحضور الرقمي.',
      },
      icon: '📈',
    },
    {
      id: 'not-sure',
      label: { en: 'Not Sure Yet', ar: 'لست متأكدًا بعد' },
      description: {
        en: "I need guidance on what to build first.",
        ar: 'أحتاج توجيهاً حول ما يجب بناؤه أولاً.',
      },
      icon: '💡',
    },
  ],
}

// ─── Step 3: Business Goal ────────────────────────────────────────────────────
export const businessGoalStep: StepDefinition = {
  id: 'business-goal',
  type: 'single-choice',
  options: [
    {
      id: 'get-more-leads',
      label: { en: 'Get More Leads', ar: 'زيادة العملاء المحتملين' },
      description: {
        en: 'Turn visitors into inquiries, WhatsApp messages, and clients.',
        ar: 'تحويل الزوار إلى استفسارات ورسائل واتساب وعملاء.',
      },
      icon: '🎯',
    },
    {
      id: 'look-professional',
      label: { en: 'Look More Professional', ar: 'الظهور بشكل احترافي' },
      description: {
        en: 'Improve trust, brand image, and digital presence.',
        ar: 'تحسين الثقة والهوية البصرية والحضور الرقمي.',
      },
      icon: '🏆',
    },
    {
      id: 'sell-online',
      label: { en: 'Sell Products or Services Online', ar: 'بيع المنتجات أو الخدمات عبر الإنترنت' },
      description: {
        en: 'Showcase products, receive orders, and manage customers.',
        ar: 'عرض المنتجات، استقبال الطلبات، وإدارة العملاء.',
      },
      icon: '💰',
    },
    {
      id: 'automate-work',
      label: { en: 'Automate Internal Work', ar: 'أتمتة العمل الداخلي' },
      description: {
        en: 'Reduce manual work and organize business operations.',
        ar: 'تقليل العمل اليدوي وتنظيم عمليات الأعمال.',
      },
      icon: '⚡',
    },
    {
      id: 'manage-clients',
      label: { en: 'Manage Clients Better', ar: 'إدارة العملاء بشكل أفضل' },
      description: {
        en: 'Track leads, clients, sales, reminders, and communication.',
        ar: 'تتبع العملاء المحتملين، المبيعات، التذكيرات، والتواصل.',
      },
      icon: '👥',
    },
    {
      id: 'launch-product',
      label: { en: 'Launch a New Digital Product', ar: 'إطلاق منتج رقمي جديد' },
      description: {
        en: 'Build an MVP, SaaS, mobile app, or web platform.',
        ar: 'بناء نموذج أولي، SaaS، تطبيق موبايل، أو منصة ويب.',
      },
      icon: '🚀',
    },
    {
      id: 'improve-performance',
      label: { en: 'Improve Performance & Security', ar: 'تحسين الأداء والأمان' },
      description: {
        en: 'Make existing systems faster, safer, and more scalable.',
        ar: 'جعل الأنظمة الحالية أسرع وأكثر أمانًا وقابلية للتوسع.',
      },
      icon: '🛡️',
    },
    {
      id: 'add-ai',
      label: { en: 'Add AI to My Business', ar: 'إضافة الذكاء الاصطناعي للعمل' },
      description: {
        en: 'Use AI for support, reports, content, CRM, and automation.',
        ar: 'استخدام الذكاء الاصطناعي في الدعم والتقارير والمحتوى والأتمتة.',
      },
      icon: '🧠',
    },
    {
      id: 'organize-operations',
      label: { en: 'Organize Operations', ar: 'تنظيم العمليات اليومية' },
      description: {
        en: 'Structure daily workflows, teams, and operational data.',
        ar: 'تنظيم سير العمل اليومي والفرق والبيانات التشغيلية.',
      },
      icon: '📋',
    },
  ],
}

// ─── Step 4: Budget & Timeline ────────────────────────────────────────────────
export const budgetTimelineStep: StepDefinition = {
  id: 'budget-timeline',
  type: 'dual-choice',
  budgetOptions: [
    {
      id: 'under-500',
      label: { en: 'Under $500', ar: 'أقل من 500 دولار' },
      description: { en: 'Starter / consultation scope', ar: 'نطاق أولي أو استشارة' },
      icon: '💵',
    },
    {
      id: '500-1000',
      label: { en: '$500 – $1,000', ar: 'من 500 إلى 1,000 دولار' },
      description: { en: 'Small project budget', ar: 'ميزانية مشروع صغير' },
      icon: '💵',
    },
    {
      id: '1000-3000',
      label: { en: '$1,000 – $3,000', ar: 'من 1,000 إلى 3,000 دولار' },
      description: { en: 'Standard project', ar: 'مشروع احترافي' },
      icon: '💵',
    },
    {
      id: '3000-7000',
      label: { en: '$3,000 – $7,000', ar: 'من 3,000 إلى 7,000 دولار' },
      description: { en: 'Mid-scale build', ar: 'مشروع متوسط الحجم' },
      icon: '💵',
    },
    {
      id: '7000-plus',
      label: { en: '$7,000+', ar: 'أكثر من 7,000 دولار' },
      description: { en: 'Full-scale system', ar: 'نظام متكامل' },
      icon: '💵',
    },
    {
      id: 'not-sure',
      label: { en: 'Not Sure Yet', ar: 'لست متأكدًا بعد' },
      description: { en: 'Need a quote first', ar: 'أحتاج عرض سعر أولاً' },
      icon: '❓',
    },
  ],
  timelineOptions: [
    {
      id: 'asap',
      label: { en: 'As Soon As Possible', ar: 'في أقرب وقت ممكن' },
      description: { en: 'Urgent launch needed', ar: 'إطلاق عاجل مطلوب' },
      icon: '⚡',
    },
    {
      id: '2-weeks',
      label: { en: 'Within 2 Weeks', ar: 'خلال أسبوعين' },
      description: { en: 'Fast turnaround', ar: 'تسليم سريع' },
      icon: '📅',
    },
    {
      id: '1-month',
      label: { en: 'Within 1 Month', ar: 'خلال شهر' },
      description: { en: 'Standard timeline', ar: 'جدول زمني عادي' },
      icon: '📅',
    },
    {
      id: '1-3-months',
      label: { en: '1 – 3 Months', ar: 'من شهر إلى 3 أشهر' },
      description: { en: 'Planned delivery', ar: 'تسليم مخطط' },
      icon: '📅',
    },
    {
      id: '3-plus-months',
      label: { en: '3+ Months', ar: 'أكثر من 3 أشهر' },
      description: { en: 'Complex / long-term', ar: 'مشروع معقد أو طويل الأمد' },
      icon: '📅',
    },
    {
      id: 'flexible',
      label: { en: 'Flexible', ar: 'مرن' },
      description: { en: "No strict deadline", ar: 'لا يوجد موعد محدد' },
      icon: '🔄',
    },
  ],
}

// ─── Step 5: Requirements (form) ─────────────────────────────────────────────
export const requirementsStep: StepDefinition = {
  id: 'requirements',
  type: 'form',
}

export const SOLUTION_FINDER_STEPS: StepDefinition[] = [
  industryStep,
  projectTypeStep,
  businessGoalStep,
  budgetTimelineStep,
  requirementsStep,
]

// ─── Helper: get option label by locale ──────────────────────────────────────
export function getOptionLabel(option: OptionItem, locale: 'en' | 'ar'): string {
  return option.label[locale]
}

export function getOptionDescription(option: OptionItem, locale: 'en' | 'ar'): string {
  return option.description[locale]
}

// ─── Lookup: find option label for a given step + id ─────────────────────────
export function lookupOptionLabel(stepId: string, optionId: string, locale: 'en' | 'ar'): string {
  const allSteps = SOLUTION_FINDER_STEPS
  for (const step of allSteps) {
    const opts = [...(step.options || []), ...(step.budgetOptions || []), ...(step.timelineOptions || [])]
    const found = opts.find((o) => o.id === optionId)
    if (found) return found.label[locale]
  }
  return optionId
}
