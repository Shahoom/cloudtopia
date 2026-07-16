import { industries, industrySlugs, localizedValue } from './industries'

export type IndustriesLocale = 'en' | 'ar'

export type IndustriesPageItem = {
  slug: string
  name: string
  description: string
  workflow: string
  problems: string[]
  useCases: Array<{ title: string; description: string }>
  serviceLinks: Array<{ label: string; href: string }>
}

export type FeaturedIndustryStory = {
  slug: string
  pressure: string
  workflow: string[]
  system: string
  outcome: string
}

export type CapabilityRow = {
  need: string
  description: string
  services: Array<{ label: string; href: string }>
}

export type GuideSection = {
  title: string
  paragraphs: string[]
  links: Array<{ label: string; href: string }>
}

export type ProofItem = {
  title: string
  description: string
}

export type IndustriesPageContent = {
  locale: IndustriesLocale
  metadata: {
    title: string
    description: string
    socialTitle: string
    keywords: string[]
  }
  hero: {
    eyebrow: string
    title: string
    accent: string
    description: string
    primary: string
    secondary: string
  }
  network: {
    label: string
    coreLabel: string
    coreDescription: string
    activeLabel: string
    exploreLabel: string
  }
  tickerLabel: string
  workbench: {
    eyebrow: string
    title: string
    description: string
    stages: string[]
    pressureLabel: string
    systemLabel: string
    outcomeLabel: string
    servicesLabel: string
    playbookLabel: string
  }
  capability: {
    eyebrow: string
    title: string
    description: string
    needLabel: string
    pathLabel: string
  }
  index: {
    eyebrow: string
    title: string
    description: string
    problemsLabel: string
    servicesLabel: string
    exploreLabel: string
  }
  guideIntro: {
    eyebrow: string
    title: string
    description: string
  }
  proofIntro: {
    eyebrow: string
    title: string
    description: string
  }
  faqIntro: {
    eyebrow: string
    title: string
    description: string
  }
  industries: IndustriesPageItem[]
  featuredStories: FeaturedIndustryStory[]
  capabilities: CapabilityRow[]
  guide: GuideSection[]
  proof: ProofItem[]
  faqs: Array<{ question: string; answer: string }>
  cta: {
    eyebrow: string
    title: string
    description: string
    primary: string
    secondary: string
  }
}

const workflowLabels: Record<string, { en: string; ar: string }> = {
  healthcare: { en: 'Patient journey', ar: 'رحلة المريض' },
  fintech: { en: 'Secure onboarding', ar: 'تسجيل العميل بأمان' },
  'ecommerce-retail': { en: 'Catalog to checkout', ar: 'من الكتالوج إلى الدفع' },
  'real-estate': { en: 'Listing to lead', ar: 'من العقار إلى العميل' },
  education: { en: 'Learning flow', ar: 'مسار التعلّم' },
  'travel-hospitality': { en: 'Guest experience', ar: 'تجربة الضيف' },
  restaurants: { en: 'Menu to order', ar: 'من القائمة إلى الطلب' },
  'legal-firms': { en: 'Inquiry to consultation', ar: 'من الاستفسار إلى الاستشارة' },
  construction: { en: 'Tender to delivery', ar: 'من العطاء إلى التسليم' },
  retail: { en: 'Branch to buyer', ar: 'من الفرع إلى المشتري' },
  'professional-services': { en: 'Expertise to lead', ar: 'من الخبرة إلى العميل' },
  'logistics-supply-chain': { en: 'Live operations', ar: 'متابعة العمليات لحظة بلحظة' },
  'government-public-sector': { en: 'Public service path', ar: 'مسار الخدمة العامة' },
}

const arabicIndustryOverrides: Record<string, { description: string; problems: string[] }> = {
  healthcare: {
    description: 'نساعد العيادات والمستشفيات على تبسيط رحلة المريض، من فهم الخدمة وحجز الموعد إلى التذكير والمتابعة وتنظيم العمل داخل الفريق.',
    problems: ['يصعب على المريض فهم الخدمة المناسبة أو إكمال الحجز بسهولة.', 'يستهلك التنسيق اليدوي للمواعيد والمتابعة وقت فريق الاستقبال.', 'تختلف جودة المحتوى والخطوات بين العربية والإنجليزية.'],
  },
  fintech: {
    description: 'نبني تجارب مالية رقمية واضحة وآمنة، تشمل شرح المنتج واستقبال الطلبات والتحقق والموافقات ولوحات المتابعة والتكامل مع الأنظمة.',
    problems: ['تحتاج المنتجات المالية المعقدة إلى شرح أبسط لبناء الثقة.', 'تتأخر الطلبات عندما تعتمد المراجعة والمتابعة على خطوات يدوية.', 'تحتاج الصلاحيات وسجل القرارات إلى تنظيم دقيق وواضح.'],
  },
  'ecommerce-retail': {
    description: 'نربط المتجر والمخزون والدفع والتوصيل وخدمة العميل في تجربة شراء واحدة تناسب السوق المحلي وتدعم النمو.',
    problems: ['تبدأ بعض المتاجر دون جاهزية كاملة للدفع أو الضريبة أو التوصيل.', 'تتوزع الطلبات والمخزون وخدمة العميل بين أدوات لا تتحدث معاً.', 'لا يحصل المحتوى العربي للمنتجات على العناية نفسها.'],
  },
  'real-estate': {
    description: 'نبني منصات عقارية تجعل البحث والمقارنة والاستفسار أسهل، وتمنح فريق المبيعات معلومات أفضل قبل التواصل مع العميل.',
    problems: ['يصعب على الزائر تصفية العقارات ومقارنتها وفهم تفاصيلها.', 'تصل الاستفسارات من دون ميزانية أو موقع أو موعد شراء واضح.', 'يفقد الفريق رؤية الفرصة بين الاستفسار والمعاينة والعرض.'],
  },
  education: {
    description: 'نساعد المدارس ومراكز التدريب ومقدمي الدورات على تنظيم التسجيل والتعلّم والتواصل والدفع عبر تجربة رقمية واضحة.',
    problems: ['تتوزع معلومات البرامج والدورات في صفحات وملفات مختلفة.', 'يعتمد التسجيل والدفع والمتابعة على إجراءات يدوية.', 'لا يجد الطالب أو ولي الأمر مكاناً واحداً لمتابعة ما يهمه.'],
  },
  'travel-hospitality': {
    description: 'نطوّر رحلة الضيف من اكتشاف العرض والحجز إلى التواصل قبل الوصول وبعده، مع محتوى عربي وإنجليزي سهل التحديث.',
    problems: ['لا تظهر الأسعار والتوفر وخطوات الحجز بالوضوح المطلوب.', 'تتغير العروض والقوائم أسرع من المواد المطبوعة.', 'تنتهي زيارات الحملات في صفحات عامة لا تساعد الضيف على اتخاذ القرار.'],
  },
  restaurants: {
    description: 'نساعد المطاعم والمقاهي على عرض القوائم والعروض واستقبال الحجوزات والطلبات وتنظيم تواصل العملاء في مسار واحد.',
    problems: ['يصعب تحديث القوائم المطبوعة والعروض المتغيرة باستمرار.', 'تصل الطلبات والحجوزات والاستفسارات عبر قنوات متفرقة.', 'لا يتحول الاهتمام على وسائل التواصل دائماً إلى طلب فعلي.'],
  },
  'legal-firms': {
    description: 'نبني حضوراً رقمياً يشرح مجالات العمل بوضوح، ويؤهل الاستفسار، وينظم المواعيد والمستندات والمتابعة باحترام للخصوصية.',
    problems: ['لا يفهم العميل المحتمل بسرعة مجال الخدمة أو الخطوة التالية.', 'تصل الاستفسارات الحساسة من دون معلومات كافية لتوجيهها.', 'تتوزع المواعيد والمستندات والمتابعة بين البريد والمحادثات.'],
  },
  construction: {
    description: 'نساعد شركات المقاولات على عرض أعمالها وتجهيز فرصها ومتابعة المشاريع والموردين والمستندات عبر أدوات أوضح.',
    problems: ['تتوزع سابقة الأعمال والقدرات وملفات المناقصات في أماكن مختلفة.', 'يصعب متابعة فرص المبيعات وتحديثات المواقع والموردين معاً.', 'لا تصل المعلومات الميدانية إلى أصحاب القرار بالسرعة المطلوبة.'],
  },
  retail: {
    description: 'نربط المنتجات والفروع والعروض والمخزون والطلبات وخدمة العميل في تجربة متسقة عبر الموقع وواتساب ونقاط البيع.',
    problems: ['لا تُعرض المنتجات والفروع والعروض والتوفر بصورة متسقة.', 'يدير الفريق الطلبات وأسئلة العملاء عبر قنوات كثيرة.', 'يصعب معرفة العروض والمنتجات التي تعيد العميل للشراء.'],
  },
  'professional-services': {
    description: 'نساعد الشركات الاستشارية والمحاسبية والهندسية والتدريبية على شرح خبرتها واستقبال فرص مؤهلة وتنظيم المتابعة.',
    problems: ['تبدو الخدمات المتخصصة متشابهة عندما تُعرض بعناوين عامة.', 'تصل الفرص من دون سياق يكفي لبدء محادثة مفيدة.', 'يعتمد تسليم الفرصة ومتابعتها على الذاكرة والرسائل المتفرقة.'],
  },
  'logistics-supply-chain': {
    description: 'نبني لوحات وبوابات وتدفقات عمل تمنح فرق اللوجستيات رؤية أوضح للشحنات والمخزون والاستثناءات وتواصل العملاء.',
    problems: ['تبقى حالة الشحنات داخل المكالمات والجداول والمحادثات.', 'لا ترى جميع الفرق بيانات الطلب والمخزون في الوقت نفسه.', 'تستغرق معالجة الاستثناءات وقتاً أطول بسبب غياب المسؤولية الواضحة.'],
  },
  'government-public-sector': {
    description: 'نطوّر خدمات رقمية عربية وإنجليزية تساعد الأفراد والأعمال على فهم المتطلبات وتقديم الطلب ومتابعته بسهولة.',
    problems: ['يصعب العثور على الخدمة الصحيحة وفهم متطلباتها.', 'تعتمد النماذج والمعاملات على توجيه يدوي بين الإدارات.', 'لا يحصل المستفيد أو فريق الخدمة على تحديث واضح للحالة.'],
  },
}

const featuredStoryCopy: Record<IndustriesLocale, Record<string, Omit<FeaturedIndustryStory, 'slug'>>> = {
  en: {
    healthcare: {
      pressure: 'Patients expect clear services, simple booking, and useful follow-up, while front desks are already carrying too much manual coordination.',
      workflow: ['Discover the right service', 'Book with the right context', 'Prepare the care team', 'Follow up without chasing'],
      system: 'A bilingual patient journey that connects service pages, doctor profiles, booking, reminders, forms, and an operational view for the clinic team.',
      outcome: 'A calmer front desk, better-qualified bookings, and a patient experience that stays clear before and after the appointment.',
    },
    fintech: {
      pressure: 'Growth slows when identity checks, approvals, customer questions, and risk signals live across disconnected tools and conversations.',
      workflow: ['Capture the application', 'Verify identity and documents', 'Route approvals and exceptions', 'Give the customer live status'],
      system: 'A secure onboarding layer with structured applications, document handling, role-based review, status visibility, alerts, and reporting.',
      outcome: 'Faster onboarding with clearer ownership, fewer status calls, and a stronger audit trail around every decision.',
    },
    'ecommerce-retail': {
      pressure: 'A store loses momentum when discovery, inventory, checkout, campaigns, and customer follow-up feel like separate businesses.',
      workflow: ['Discover the right product', 'Confirm availability', 'Complete the purchase', 'Return through useful follow-up'],
      system: 'A connected commerce experience spanning catalog structure, search, inventory signals, checkout, CRM stages, campaigns, and retention triggers.',
      outcome: 'A clearer path to purchase, fewer manual stock questions, and better visibility into what brings customers back.',
    },
    'real-estate': {
      pressure: 'Property leads lose value when listings are difficult to compare and inquiries arrive without budget, location, timeline, or intent.',
      workflow: ['Explore the right properties', 'Compare and shortlist', 'Qualify the inquiry', 'Route to the right agent'],
      system: 'A bilingual property platform with structured listings, filters, map context, lead qualification, agent routing, and portfolio reporting.',
      outcome: 'More useful inquiries, faster agent response, and a portfolio experience that makes inventory easier to understand and act on.',
    },
    'logistics-supply-chain': {
      pressure: 'Operations become reactive when shipment status, warehouse exceptions, fleet updates, and customer communication are trapped in calls and spreadsheets.',
      workflow: ['Receive and validate the order', 'Prepare warehouse movement', 'Track transport and exceptions', 'Confirm delivery and report'],
      system: 'A shared operations layer connecting tracking, warehouse events, fleet status, client updates, alerts, and performance dashboards.',
      outcome: 'Less status chasing, faster exception handling, and a dependable view of work for teams, customers, and partners.',
    },
    'government-public-sector': {
      pressure: 'Public services feel difficult when requirements, forms, case ownership, and status updates are unclear across channels and languages.',
      workflow: ['Understand the service', 'Submit complete information', 'Route the case correctly', 'Track progress and receive the result'],
      system: 'An accessible bilingual service portal with clear eligibility, guided forms, case routing, status communication, and operational reporting.',
      outcome: 'Fewer incomplete submissions, clearer service access, and better visibility for residents, businesses, and delivery teams.',
    },
  },
  ar: {
    healthcare: {
      pressure: 'يتوقع المريض شرحاً واضحاً للخدمة وحجزاً سهلاً ومتابعة مفيدة، بينما يتحمل مكتب الاستقبال تنسيقاً يدوياً يفوق طاقته.',
      workflow: ['فهم الخدمة المناسبة', 'الحجز بسياق واضح', 'تجهيز فريق الرعاية', 'متابعة دون مطاردة الرسائل'],
      system: 'رحلة مريض ثنائية اللغة تربط صفحات الخدمات وملفات الأطباء والحجز والتذكيرات والنماذج ولوحة تشغيل واضحة لفريق العيادة.',
      outcome: 'مكتب استقبال أكثر هدوءاً، حجوزات أفضل تأهيلاً، وتجربة واضحة للمريض قبل الموعد وبعده.',
    },
    fintech: {
      pressure: 'يتباطأ النمو عندما تتوزع خطوات التحقق والموافقات وأسئلة العملاء وإشارات المخاطر بين أدوات ومحادثات منفصلة.',
      workflow: ['استقبال الطلب', 'التحقق من الهوية والمستندات', 'توجيه الموافقات والاستثناءات', 'إظهار الحالة للعميل'],
      system: 'رحلة تسجيل آمنة تجمع الطلبات والمستندات والمراجعة بحسب الصلاحيات، مع حالة واضحة وتنبيهات وتقارير للفريق.',
      outcome: 'إجراءات أسرع، ومسؤولية أوضح في كل خطوة، واستفسارات أقل عن حالة الطلب، وسجل متكامل للقرارات.',
    },
    'ecommerce-retail': {
      pressure: 'يفقد المتجر زخمه عندما تبدو رحلة الاكتشاف والمخزون والدفع والحملات ومتابعة العميل وكأنها أعمال منفصلة.',
      workflow: ['اكتشاف المنتج المناسب', 'تأكيد التوفر', 'إكمال الشراء', 'العودة عبر متابعة مفيدة'],
      system: 'تجربة تجارة مترابطة تشمل تنظيم الكتالوج والبحث وحالة المخزون والدفع ومراحل إدارة العميل والحملات ومحفزات العودة للشراء.',
      outcome: 'طريق أوضح للشراء، وأسئلة يدوية أقل عن المخزون، ورؤية أفضل لما يعيد العميل مرة أخرى.',
    },
    'real-estate': {
      pressure: 'تفقد فرص العقار قيمتها عندما يصعب مقارنة القوائم وتصل الاستفسارات دون ميزانية أو موقع أو توقيت أو نية واضحة.',
      workflow: ['استكشاف العقارات المناسبة', 'المقارنة والحفظ', 'تأهيل الاستفسار', 'التوجيه للوسيط المناسب'],
      system: 'منصة عقارية ثنائية اللغة بقوائم منظمة وفلاتر وسياق خريطة وتأهيل للعملاء وتوجيه للوسطاء وتقارير للمحفظة.',
      outcome: 'استفسارات أكثر فائدة، واستجابة أسرع من الوسطاء، ومحفظة عقارية أسهل للفهم واتخاذ القرار.',
    },
    'logistics-supply-chain': {
      pressure: 'تتحول العمليات إلى رد فعل عندما تبقى حالة الشحنات واستثناءات المستودع وتحديثات الأسطول وتواصل العميل داخل المكالمات والجداول.',
      workflow: ['استلام الطلب والتحقق منه', 'تجهيز حركة المستودع', 'تتبع النقل والاستثناءات', 'تأكيد التسليم وإصدار التقرير'],
      system: 'طبقة تشغيل مشتركة تربط التتبع وأحداث المستودع وحالة الأسطول وتحديثات العملاء والتنبيهات ولوحات الأداء.',
      outcome: 'وقت أقل لملاحقة الحالات، ومعالجة أسرع للاستثناءات، ورؤية موثوقة للفرق والعملاء والشركاء.',
    },
    'government-public-sector': {
      pressure: 'تصبح الخدمة العامة صعبة عندما تكون المتطلبات والنماذج وملكية الحالة وتحديثاتها غير واضحة بين القنوات واللغات.',
      workflow: ['فهم الخدمة', 'إرسال معلومات مكتملة', 'توجيه المعاملة بدقة', 'متابعة التقدم واستلام النتيجة'],
      system: 'بوابة خدمات ثنائية اللغة وسهلة الوصول توضح الأهلية وتقود المستخدم عبر النماذج وتوجيه الحالات والتحديثات والتقارير.',
      outcome: 'طلبات ناقصة أقل، ووصول أوضح للخدمة، ورؤية أفضل للأفراد والأعمال وفرق تقديم الخدمة.',
    },
  },
}

const localeCopy: Record<IndustriesLocale, Omit<IndustriesPageContent, 'locale' | 'industries' | 'featuredStories'>> = {
  en: {
    metadata: {
      title: 'Digital Solutions by Industry in Oman & GCC',
      description: 'Explore CloudTopia digital solutions for healthcare, fintech, retail, real estate, education, logistics, government, and more across Oman and the GCC.',
      socialTitle: 'Digital Solutions for 13 Industries | CloudTopia',
      keywords: ['digital transformation by industry', 'industry software Oman', 'business systems GCC', 'bilingual websites Oman', 'industry automation', 'CloudTopia industries'],
    },
    hero: {
      eyebrow: 'Digital solutions for 13 industries in Oman and the GCC',
      title: 'Digital systems shaped around',
      accent: 'how your industry really works.',
      description: 'We start with the customer journey and the work your team handles every day. Then we build the website, platform, commerce experience, or business system that removes the right bottleneck.',
      primary: 'Find your industry',
      secondary: 'Discuss your project',
    },
    network: {
      label: 'CloudTopia industry atlas',
      coreLabel: 'Selected sector',
      coreDescription: 'Pressure, system, outcome, and service path',
      activeLabel: 'Your industry',
      exploreLabel: 'See industry solutions',
    },
    tickerLabel: 'Industries CloudTopia serves',
    workbench: {
      eyebrow: 'Industry workbench',
      title: 'Watch the business journey rebuild itself.',
      description: 'Choose a featured sector and follow the path from operating pressure to a connected digital system, measurable outcome, and the CloudTopia services that can deliver it.',
      stages: ['Industry pressure', 'Broken workflow', 'Connected system', 'Business outcome', 'Relevant services'],
      pressureLabel: 'The pressure',
      systemLabel: 'The connected system',
      outcomeLabel: 'What gets better',
      servicesLabel: 'Relevant CloudTopia services',
      playbookLabel: 'Explore this industry',
    },
    capability: {
      eyebrow: 'Start with the business problem',
      title: 'Choose the outcome. We will shape the right service path.',
      description: 'A clear project begins with what needs to improve: demand, sales, customer service, operations, or your complete digital presence.',
      needLabel: 'Business need',
      pathLabel: 'Relevant service paths',
    },
    index: {
      eyebrow: 'Industries we serve',
      title: 'Find your sector and go deeper.',
      description: 'Each industry page shows relevant use cases, common challenges, and the CloudTopia services that fit the work.',
      problemsLabel: 'Common pressure points',
      servicesLabel: 'Relevant services',
      exploreLabel: 'Explore industry',
    },
    guideIntro: {
      eyebrow: 'Industry digital transformation guide',
      title: 'Digital transformation changes shape from one sector to another.',
      description: 'A useful digital strategy starts with the buying journey, operating constraints, data, regulation, and customer expectations inside the sector, not with a fashionable technology list.',
    },
    proofIntro: {
      eyebrow: 'Built for Oman and the GCC',
      title: 'Regional requirements are part of the product.',
      description: 'Arabic, English, local customer behaviour, integrations, and client ownership are planned from the beginning.',
    },
    faqIntro: {
      eyebrow: 'Before we begin',
      title: 'The questions that matter before you invest.',
      description: 'Straight answers about fit, existing systems, bilingual delivery, and where to start.',
    },
    capabilities: [
      { need: 'Win and qualify demand', description: 'Explain the offer, earn trust, capture context, and route serious inquiries.', services: [{ label: 'Website Development', href: '/services/website-development' }, { label: 'Content Creation', href: '/services/content-creation' }, { label: 'Social Media Marketing', href: '/services/social-media-marketing' }] },
      { need: 'Sell products and services online', description: 'Connect discovery, catalog, checkout, payment, inventory, and retention.', services: [{ label: 'E-commerce Development', href: '/services/ecommerce-development' }, { label: 'Business Systems', href: '/services/business-systems-development' }] },
      { need: 'Serve customers through a portal', description: 'Give customers secure access to requests, files, status, tasks, and support.', services: [{ label: 'Web Applications', href: '/services/web-applications' }, { label: 'Business Systems', href: '/services/business-systems-development' }] },
      { need: 'Make operations visible', description: 'Replace scattered updates with workflows, dashboards, ownership, and reporting.', services: [{ label: 'Business Systems', href: '/services/business-systems-development' }, { label: 'Web Applications', href: '/services/web-applications' }] },
      { need: 'Build a complete digital presence', description: 'Connect brand, website, search, content, social proof, and conversion paths.', services: [{ label: 'Digital Presence', href: '/services/digital-presence' }, { label: 'Content Creation', href: '/services/content-creation' }] },
    ],
    guide: [
      {
        title: 'Start with the customer journey, not the software name.',
        paragraphs: [
          'Healthcare begins with trust, service clarity, booking, and follow-up. Real estate begins with searchable inventory, qualification, and agent response. Logistics begins with status, exceptions, handoffs, and client visibility. Those journeys may use similar technologies, but they need different content, permissions, data, and moments of reassurance.',
          'CloudTopia maps that journey before recommending a website, portal, dashboard, commerce platform, or internal system. This prevents the project from becoming a polished interface that leaves the real bottleneck untouched.',
        ],
        links: [{ label: 'Website development', href: '/services/website-development' }, { label: 'Web applications', href: '/services/web-applications' }],
      },
      {
        title: 'Connect the public experience to the operating workflow.',
        paragraphs: [
          'A lead form is only useful when the right person receives enough context to respond. A booking page is only useful when availability, reminders, preparation, and follow-up are connected. An online store is only useful when inventory, payment, fulfillment, and customer communication agree.',
          'That is why industry transformation often combines a strong digital presence with business systems, automations, integrations, and dashboards behind it. The customer sees a simple journey because the operating model underneath has been made clearer.',
        ],
        links: [{ label: 'Business systems development', href: '/services/business-systems-development' }, { label: 'Digital presence', href: '/services/digital-presence' }],
      },
      {
        title: 'Build Arabic and English as one product experience.',
        paragraphs: [
          'Regional businesses often need more than translated pages. Navigation order, forms, search behavior, typography, content hierarchy, campaign language, and support handoff must work naturally in both directions.',
          'CloudTopia plans Arabic and English journeys together, then connects them to search, content, social channels, WhatsApp, and the internal team. This gives decision makers one owned system instead of two uneven versions of the same business.',
        ],
        links: [{ label: 'Content creation', href: '/services/content-creation' }, { label: 'Social media marketing', href: '/services/social-media-marketing' }],
      },
    ],
    proof: [
      { title: 'Arabic-first and English-ready', description: 'Content, interfaces, forms, and workflows are planned for both reading directions from the start.' },
      { title: 'Built around the real workflow', description: 'Scope begins with the customer journey, operating pressure, ownership, and data handoffs.' },
      { title: 'Client-owned foundations', description: 'Clients own the agreed code, accounts, content, and data that make the system useful.' },
      { title: 'Clear delivery stages', description: 'Discovery, scope, design, build, testing, launch, and handover remain visible throughout the project.' },
      { title: 'Practical integrations', description: 'Existing APIs, CRMs, spreadsheets, payment tools, and admin systems can be connected where stable access exists.' },
      { title: 'A path that can grow', description: 'Start with the most valuable bottleneck and leave a clean route for later services, automation, and reporting.' },
    ],
    faqs: [
      { question: 'Which industries does CloudTopia serve?', answer: 'CloudTopia serves healthcare, fintech, e-commerce and retail, real estate, education, travel and hospitality, restaurants, legal firms, construction, professional services, logistics and supply chain, and government and public-sector teams.' },
      { question: 'Do you use the same solution for every industry?', answer: 'No. We reuse sound engineering and delivery practices, but shape the content, workflow, permissions, integrations, and user journey around the operating reality of each sector.' },
      { question: 'Can you work with our existing software?', answer: 'Yes, when stable access or APIs are available. We can connect websites, portals, dashboards, CRMs, spreadsheets, payment tools, and operational systems rather than forcing an unnecessary replacement.' },
      { question: 'Can the system work in Arabic and English?', answer: 'Yes. We plan both languages together, including RTL layout, navigation, forms, content hierarchy, search behavior, and handoff to your team.' },
      { question: 'How do we know which service to start with?', answer: 'We begin with the sector, the customer or staff journey, where work is being lost, and the outcome that matters. From there we recommend the smallest useful starting scope and the service path that fits it.' },
      { question: 'Can CloudTopia build both the website and internal workflow?', answer: 'Yes. A project can combine a public website or store with portals, business systems, automations, dashboards, content, and growth support when those pieces need to operate together.' },
      { question: 'How long does an industry digital project take?', answer: 'Timing depends on the number of journeys, integrations, languages, content requirements, and approval stages. After discovery, we provide a clear scope, delivery stages, and practical timeline before development begins.' },
    ],
    cta: {
      eyebrow: 'Bring us the bottleneck',
      title: 'Let’s define the right first project for your industry.',
      description: 'Tell us what customers or staff are trying to do and where the process breaks. We will turn that into a clear starting scope.',
      primary: 'Discuss it on WhatsApp',
      secondary: 'Send project details',
    },
  },
  ar: {
    metadata: {
      title: 'حلول رقمية حسب القطاع في عُمان والخليج',
      description: 'استكشف حلول كلاود توبيا الرقمية للرعاية الصحية والتقنية المالية والتجارة والعقار والتعليم واللوجستيات والقطاع العام في عُمان والخليج.',
      socialTitle: 'حلول رقمية لـ 13 قطاعاً | كلاود توبيا',
      keywords: ['التحول الرقمي حسب القطاع', 'أنظمة أعمال عُمان', 'حلول رقمية الخليج', 'مواقع ثنائية اللغة', 'أتمتة الأعمال', 'قطاعات كلاود توبيا'],
    },
    hero: {
      eyebrow: 'حلول رقمية لـ 13 قطاعاً في عُمان والخليج',
      title: 'حلول رقمية مبنية على',
      accent: 'واقع قطاعك، لا على قالب جاهز.',
      description: 'نحوّل تحديات قطاعك إلى تجربة رقمية واضحة تبدأ من رحلة العميل وطريقة عمل فريقك. ثم نبني الموقع أو المنصة أو المتجر أو نظام الأعمال الذي يعالج المشكلة الأهم فعلاً.',
      primary: 'اختر قطاعك',
      secondary: 'ناقش مشروعك معنا',
    },
    network: {
      label: 'أطلس قطاعات كلاود توبيا',
      coreLabel: 'القطاع المختار',
      coreDescription: 'التحدي، والحل، والنتيجة، ومسار الخدمة',
      activeLabel: 'قطاعك',
      exploreLabel: 'استكشف حلول القطاع',
    },
    tickerLabel: 'القطاعات التي تخدمها كلاود توبيا',
    workbench: {
      eyebrow: 'من التحدي إلى النتيجة',
      title: 'شاهد كيف تتحول الرحلة خطوة بخطوة.',
      description: 'اختر أحد القطاعات، ثم تابع كيف نربط المشكلة الحالية برحلة رقمية أوضح ونظام عملي ونتيجة يمكن للفريق قياسها.',
      stages: ['التحدي الحالي', 'نقاط التعطّل', 'النظام المقترح', 'النتيجة المتوقعة', 'الخدمات المناسبة'],
      pressureLabel: 'التحدي اليوم',
      systemLabel: 'الحل المقترح',
      outcomeLabel: 'النتيجة المتوقعة',
      servicesLabel: 'الخدمات المناسبة لهذا المسار',
      playbookLabel: 'استكشف حلول هذا القطاع',
    },
    capability: {
      eyebrow: 'ابدأ من مشكلة العمل',
      title: 'حدّد النتيجة، ونبني لها مسار الخدمة المناسب.',
      description: 'يبدأ المشروع الواضح مما تريد تحسينه: جذب العملاء، أو البيع، أو تقديم الخدمة، أو التشغيل، أو حضورك الرقمي بالكامل.',
      needLabel: 'الأولوية',
      pathLabel: 'الخدمات المقترحة',
    },
    index: {
      eyebrow: 'القطاعات التي نخدمها',
      title: 'اختر قطاعك وانتقل إلى التفاصيل.',
      description: 'تجمع كل صفحة أهم الاستخدامات والتحديات والخدمات المناسبة لطريقة العمل داخل القطاع.',
      problemsLabel: 'تحديات متكررة',
      servicesLabel: 'الخدمات الأنسب',
      exploreLabel: 'عرض حلول القطاع',
    },
    guideIntro: {
      eyebrow: 'دليل عملي للتحول الرقمي',
      title: 'لا توجد وصفة واحدة تناسب جميع القطاعات.',
      description: 'تبدأ الخطة الرقمية الجيدة من رحلة العميل وطريقة العمل والبيانات والمتطلبات التنظيمية داخل القطاع، ثم تختار التقنية التي تخدمها فعلاً.',
    },
    proofIntro: {
      eyebrow: 'مصمم لعُمان والخليج',
      title: 'متطلبات المنطقة جزء من المنتج.',
      description: 'نخطط للعربية والإنجليزية وطريقة عمل السوق والتكاملات وملكية العميل منذ البداية.',
    },
    faqIntro: {
      eyebrow: 'قبل أن نبدأ',
      title: 'الأسئلة المهمة قبل الاستثمار.',
      description: 'إجابات مباشرة عن ملاءمة الحل والأنظمة الحالية والعمل باللغتين ونقطة البداية.',
    },
    capabilities: [
      { need: 'اجذب فرصاً أفضل', description: 'وضّح ما تقدمه، وابنِ الثقة، واجمع المعلومات التي يحتاجها فريقك قبل التواصل.', services: [{ label: 'تطوير المواقع', href: '/services/website-development' }, { label: 'صناعة المحتوى', href: '/services/content-creation' }, { label: 'التسويق عبر التواصل الاجتماعي', href: '/services/social-media-marketing' }] },
      { need: 'بع عبر الإنترنت', description: 'اربط عرض المنتجات بالمخزون والدفع والتوصيل وخدمة العميل في رحلة واحدة.', services: [{ label: 'تطوير التجارة الإلكترونية', href: '/services/ecommerce-development' }, { label: 'أنظمة الأعمال', href: '/services/business-systems-development' }] },
      { need: 'قدّم الخدمة عبر بوابة', description: 'امنح العميل وصولاً آمناً إلى طلباته وملفاته وحالة معاملته وقنوات الدعم.', services: [{ label: 'تطبيقات الويب', href: '/services/web-applications' }, { label: 'أنظمة الأعمال', href: '/services/business-systems-development' }] },
      { need: 'نظّم التشغيل اليومي', description: 'استبدل الرسائل والجداول المتفرقة بتدفق عمل واضح ولوحات متابعة وتقارير.', services: [{ label: 'أنظمة الأعمال', href: '/services/business-systems-development' }, { label: 'تطبيقات الويب', href: '/services/web-applications' }] },
      { need: 'ابنِ حضوراً رقمياً متكاملاً', description: 'اربط الهوية والموقع والبحث والمحتوى والإثبات الاجتماعي ومسارات التحويل.', services: [{ label: 'الحضور الرقمي', href: '/services/digital-presence' }, { label: 'صناعة المحتوى', href: '/services/content-creation' }] },
    ],
    guide: [
      {
        title: 'ابدأ برحلة العميل، لا باسم البرنامج.',
        paragraphs: [
          'يبدأ قطاع الصحة من الثقة ووضوح الخدمة والحجز والمتابعة. ويبدأ العقار من مخزون قابل للبحث وتأهيل العميل واستجابة الوسيط. وتبدأ اللوجستيات من الحالة والاستثناءات والتسليمات ورؤية العميل. قد تستخدم هذه الرحلات تقنيات متشابهة، لكنها تحتاج محتوى وصلاحيات وبيانات ولحظات طمأنة مختلفة.',
          'ترسم كلاود توبيا الرحلة قبل التوصية بموقع أو بوابة أو لوحة متابعة أو منصة تجارة أو نظام داخلي. وهكذا لا يتحول المشروع إلى واجهة جميلة تترك نقطة التعطّل الحقيقية كما هي.',
        ],
        links: [{ label: 'تطوير المواقع', href: '/services/website-development' }, { label: 'تطبيقات الويب', href: '/services/web-applications' }],
      },
      {
        title: 'اربط تجربة العميل بسير العمل التشغيلي.',
        paragraphs: [
          'لا يفيد نموذج العميل إذا لم يصل للشخص المناسب بسياق يكفي للرد. ولا تفيد صفحة الحجز إذا لم ترتبط بالتوفر والتذكير والتجهيز والمتابعة. ولا ينجح المتجر إذا اختلفت بيانات المخزون والدفع والتنفيذ وتواصل العميل.',
          'لهذا يجمع التحول الرقمي للقطاع غالباً بين حضور رقمي قوي وأنظمة أعمال وأتمتة وتكاملات ولوحات خلفه. يرى العميل رحلة بسيطة لأن نموذج التشغيل تحتها أصبح أوضح.',
        ],
        links: [{ label: 'تطوير أنظمة الأعمال', href: '/services/business-systems-development' }, { label: 'الحضور الرقمي', href: '/services/digital-presence' }],
      },
      {
        title: 'ابنِ العربية والإنجليزية كتجربة منتج واحدة.',
        paragraphs: [
          'تحتاج الأعمال الإقليمية إلى أكثر من صفحات مترجمة. يجب أن يعمل التنقل والنماذج والبحث وأسلوب عرض النص وتسلسل المحتوى ولغة الحملات وتسليم المحادثة للفريق بصورة طبيعية في الاتجاهين.',
          'تخطط كلاود توبيا الرحلتين العربية والإنجليزية معاً، ثم تربطهما بالبحث والمحتوى والتواصل وواتساب والفريق الداخلي. والنتيجة نظام واحد مملوك للعميل بدلاً من نسختين غير متوازنتين.',
        ],
        links: [{ label: 'صناعة المحتوى', href: '/services/content-creation' }, { label: 'تسويق التواصل الاجتماعي', href: '/services/social-media-marketing' }],
      },
    ],
    proof: [
      { title: 'العربية أولاً والإنجليزية جاهزة', description: 'يُخطط للمحتوى والواجهات والنماذج وسير العمل في الاتجاهين منذ البداية.' },
      { title: 'مبني حول سير العمل الحقيقي', description: 'يبدأ النطاق من رحلة العميل وضغط التشغيل والملكية وتسليم البيانات بين الخطوات.' },
      { title: 'أسس يملكها العميل', description: 'يمتلك العميل الكود والحسابات والمحتوى والبيانات المتفق عليها والتي تجعل النظام مفيداً.' },
      { title: 'مراحل تنفيذ واضحة', description: 'يبقى الاكتشاف والنطاق والتصميم والبناء والاختبار والإطلاق والتسليم مرئياً طوال المشروع.' },
      { title: 'تكاملات عملية', description: 'يمكن ربط واجهات البرمجة وأنظمة إدارة العملاء والجداول وأدوات الدفع والأنظمة الإدارية عندما يتوفر وصول مستقر.' },
      { title: 'مسار قابل للنمو', description: 'ابدأ بالمشكلة الأكثر تأثيراً، واترك مساراً واضحاً لإضافة الخدمات والأتمتة والتقارير لاحقاً.' },
    ],
    faqs: [
      { question: 'ما القطاعات التي تخدمها كلاود توبيا؟', answer: 'تخدم كلاود توبيا الرعاية الصحية والتقنية المالية والتجارة الإلكترونية والتجزئة والعقار والتعليم والسفر والضيافة والمطاعم والمكاتب القانونية والإنشاءات والخدمات المهنية واللوجستيات وسلاسل الإمداد والجهات الحكومية والعامة.' },
      { question: 'هل تستخدمون الحل نفسه لكل قطاع؟', answer: 'لا. نعيد استخدام ممارسات هندسية وتنفيذية موثوقة، لكننا نشكل المحتوى وسير العمل والصلاحيات والتكاملات ورحلة المستخدم حول واقع كل قطاع.' },
      { question: 'هل يمكن ربط الحل بأنظمتنا الحالية؟', answer: 'نعم، متى توفرت واجهة ربط مستقرة أو صلاحية وصول مناسبة. يمكننا ربط الموقع والبوابات ولوحات المتابعة وأنظمة إدارة العملاء وأدوات الدفع بدلاً من استبدال كل شيء.' },
      { question: 'هل تعمل التجربة بالعربية والإنجليزية؟', answer: 'نعم. نخطط للغتين منذ البداية، بما يشمل اتجاه الواجهة والتنقل والنماذج وتسلسل المحتوى والبحث وطريقة انتقال الطلب إلى فريقكم.' },
      { question: 'كيف نعرف الخدمة التي يجب أن نبدأ بها؟', answer: 'نبدأ بالقطاع ورحلة العميل أو الموظف ومكان ضياع العمل والنتيجة المهمة. ثم نقترح أصغر نطاق مفيد ومسار الخدمة الأنسب له.' },
      { question: 'هل تستطيع كلاود توبيا بناء الموقع وسير العمل الداخلي معاً؟', answer: 'نعم. يمكن للمشروع أن يجمع موقعاً أو متجراً عاماً مع بوابات وأنظمة أعمال وأتمتة ولوحات ومحتوى ودعم نمو عندما تحتاج هذه الأجزاء إلى العمل معاً.' },
      { question: 'كم يستغرق مشروع رقمي للقطاع؟', answer: 'تعتمد المدة على عدد الرحلات والتكاملات واللغات والمحتوى ومراحل الاعتماد. بعد الاكتشاف نقدم نطاقاً واضحاً ومراحل تنفيذ ومدة عملية قبل بدء التطوير.' },
    ],
    cta: {
      eyebrow: 'ابدأ بالمشكلة الأهم',
      title: 'لنحدّد أول مشروع رقمي مناسب لقطاعك.',
      description: 'أخبرنا بما يحاول العميل أو الفريق إنجازه وأين تتعطل الرحلة. سنحوّل ذلك إلى نقطة بداية واضحة.',
      primary: 'ناقش المشروع عبر واتساب',
      secondary: 'أرسل تفاصيل المشروع',
    },
  },
}

function normalizeLocale(locale: string): IndustriesLocale {
  return locale === 'ar' ? 'ar' : 'en'
}

export function getIndustriesPageItems(locale: string): IndustriesPageItem[] {
  const activeLocale = normalizeLocale(locale)

  return industrySlugs.map((slug) => {
    const industry = industries[slug]
    const arabicOverride = activeLocale === 'ar' ? arabicIndustryOverrides[slug] : undefined
    return {
      slug,
      name: localizedValue(industry.name, activeLocale),
      description: arabicOverride?.description || localizedValue(industry.description, activeLocale),
      workflow: workflowLabels[slug]?.[activeLocale] || (activeLocale === 'ar' ? 'نظام سير عمل' : 'Workflow system'),
      problems: arabicOverride?.problems || industry.problems.map((problem) => localizedValue(problem, activeLocale)),
      useCases: industry.useCases.map((useCase) => ({
        title: localizedValue(useCase.title, activeLocale),
        description: localizedValue(useCase.description, activeLocale),
      })),
      serviceLinks: industry.serviceLinks.map((service) => ({
        label: localizedValue(service.label, activeLocale),
        href: service.href,
      })),
    }
  })
}

export function getIndustriesPageContent(locale: string): IndustriesPageContent {
  const activeLocale = normalizeLocale(locale)
  const industries = getIndustriesPageItems(activeLocale)
  const featuredStories = Object.entries(featuredStoryCopy[activeLocale]).map(([slug, story]) => ({
    slug,
    ...story,
  }))

  return {
    locale: activeLocale,
    ...localeCopy[activeLocale],
    industries,
    featuredStories,
  }
}
