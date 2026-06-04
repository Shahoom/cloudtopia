// ─────────────────────────────────────────────────────────────────────────────
// CloudTopia Solution Finder — Bilingual UI Strings
// Edit this file to change any English or Arabic label, button, or helper text.
// ─────────────────────────────────────────────────────────────────────────────

export type SFLocale = 'en' | 'ar'

export const SF_TEXT = {
  en: {
    badge: 'AI-Powered Recommendation',
    headline: 'Find the Right Digital Solution',
    headlineAccent: 'for Your Business in 60 Seconds',
    subheadline:
      'Answer a few quick questions and get a personalized CloudTopia recommendation for your website, app, CRM, cloud, automation, or AI project.',
    helper: 'No obligation · Free recommendation · Direct WhatsApp consultation',

    // Navigation
    back: 'Back',
    next: 'Next',
    continue: 'Continue',
    skip: 'Skip',
    stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
    pleaseSelect: 'Please select an option to continue.',

    // Step labels
    steps: {
      industry: { title: 'Industry', subtitle: 'Select your business type' },
      projectType: { title: 'Project Type', subtitle: 'What do you want to build?' },
      businessGoal: { title: 'Business Goal', subtitle: 'What result do you need?' },
      budgetTimeline: { title: 'Budget & Timeline', subtitle: 'Choose your range' },
      requirements: { title: 'Requirements', subtitle: 'Share project details' },
    },

    // Step questions
    questions: {
      industry: 'Which industry does your business belong to?',
      industryHelper: 'This helps us tailor the recommendation to your specific business context.',
      projectType: 'What do you want to build?',
      projectTypeHelper: 'Choose the type of digital product or system that best fits your vision.',
      businessGoal: 'What is your main business goal?',
      businessGoalHelper: 'The goal shapes how CloudTopia structures the solution.',
      budgetTimeline: 'What budget and timeline fits your project?',
      budgetTimelineHelper: 'These help CloudTopia scope the right solution. Both can be discussed in the consultation.',
      requirements: 'Share a few details so we can prepare your recommendation.',
      requirementsHelper: 'Your information is kept private and used only by the CloudTopia team.',
    },

    // Budget / Timeline sub-labels
    budgetLabel: 'Budget',
    timelineLabel: 'Timeline',

    // Form fields
    form: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Ahmed Al-Rashid',
      phone: 'Phone / WhatsApp',
      phonePlaceholder: '+968 9588 6393',
      email: 'Email Address',
      emailPlaceholder: 'you@company.com',
      company: 'Company Name',
      companyPlaceholder: 'Your company (optional)',
      country: 'Country',
      countryPlaceholder: 'Oman',
      description: 'Project Description',
      descriptionPlaceholder:
        'Briefly describe what you want to build, your target users, and any specific features or requirements…',
      contactMethod: 'Preferred Contact Method',
      contactMethods: {
        whatsapp: 'WhatsApp',
        email: 'Email',
        call: 'Phone Call',
      },
      consent: 'I want CloudTopia to review my project and contact me with a recommendation and next steps.',
      privacy: 'Your project idea and business details are kept strictly private. CloudTopia uses this information only to prepare your recommendation and contact you.',
      submit: 'Get My Recommendation',
      submitting: 'Generating your recommendation…',
      nameRequired: 'Full name is required',
      phoneRequired: 'Phone number is required',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email',
    },

    // Recommendation card
    card: {
      title: 'Your Recommended Solution',
      placeholder: 'Complete the steps to see a tailored CloudTopia recommendation.',
      bestMatch: 'Best Match',
      aligned: 'aligned',
      timeline: 'Timeline',
      budget: 'Budget Range',
      tech: 'Recommended Tech',
      features: 'Key Features',
      services: 'Included Services',
      deliveryApproach: 'Suggested Delivery Approach',
      bookConsultation: 'Book Free Consultation',
      continueWhatsapp: 'Continue on WhatsApp',
      viewService: 'View Recommended Service',
      noObligation: 'No obligation · Free recommendation · Under 1 minute',
    },

    // Result screen
    result: {
      title: 'Your Recommended CloudTopia Solution',
      readyBadge: 'Your Recommendation is Ready',
      metaTimeline: 'Estimated Timeline',
      metaBudget: 'Budget Range',
      metaTech: 'Tech Stack',
      featuresLabel: 'Key Features Included',
      servicesLabel: 'Recommended Services',
      deliveryLabel: 'Suggested Delivery Approach',
      primaryCta: 'Continue on WhatsApp',
      editAnswers: 'Edit Answers',
      viewService: 'View Service',
      startOver: 'Start Over with Different Answers',
      confirmationNote:
        '✅ Your recommendation is ready. CloudTopia will review your project details and reach out with a tailored next step within 1 business day.',
      whatsappNote: "Clicking the button above will open WhatsApp with a ready-made message summarizing your project. No need to type anything.",
    },
  },

  ar: {
    badge: 'توصية مدعومة بالذكاء الاصطناعي',
    headline: 'اكتشف الحل الرقمي الأنسب لعملك',
    headlineAccent: 'خلال 60 ثانية',
    subheadline:
      'أجب عن بعض الأسئلة السريعة واحصل على توصية مخصصة من CloudTopia لموقعك، تطبيقك، نظامك الإداري، حلولك السحابية، أو أتمتة الذكاء الاصطناعي.',
    helper: 'بدون التزام · توصية مجانية · تواصل مباشر عبر واتساب',

    back: 'رجوع',
    next: 'التالي',
    continue: 'متابعة',
    skip: 'تخطي',
    stepOf: (current: number, total: number) => `خطوة ${current} من ${total}`,
    pleaseSelect: 'يرجى اختيار خيار للمتابعة.',

    steps: {
      industry: { title: 'القطاع', subtitle: 'اختر نوع عملك' },
      projectType: { title: 'نوع المشروع', subtitle: 'ماذا تريد أن تبني؟' },
      businessGoal: { title: 'الهدف', subtitle: 'ما النتيجة التي تريدها؟' },
      budgetTimeline: { title: 'الميزانية والمدة', subtitle: 'اختر النطاق المناسب' },
      requirements: { title: 'التفاصيل', subtitle: 'شارك تفاصيل مشروعك' },
    },

    questions: {
      industry: 'إلى أي قطاع ينتمي عملك؟',
      industryHelper: 'هذا يساعدنا على تخصيص التوصية بما يناسب طبيعة عملك.',
      projectType: 'ما الذي تريد بناءه؟',
      projectTypeHelper: 'اختر نوع المنتج الرقمي أو النظام الذي يناسب رؤيتك.',
      businessGoal: 'ما الهدف الأساسي من المشروع؟',
      businessGoalHelper: 'الهدف يحدد كيف تبني CloudTopia الحل المناسب لك.',
      budgetTimeline: 'ما الميزانية والمدة المناسبة لمشروعك؟',
      budgetTimelineHelper: 'تساعدنا هذه المعلومات على تحديد النطاق المناسب. يمكن مناقشة كليهما في الاستشارة.',
      requirements: 'شاركنا بعض التفاصيل لنجهّز توصيتك بشكل أفضل.',
      requirementsHelper: 'معلوماتك تُحفظ بسرية تامة ولا تُستخدم إلا من قِبل فريق CloudTopia.',
    },

    budgetLabel: 'الميزانية',
    timelineLabel: 'المدة الزمنية',

    form: {
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'أحمد الراشد',
      phone: 'رقم الهاتف / واتساب',
      phonePlaceholder: '+968 9588 6393',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'you@company.com',
      company: 'اسم الشركة',
      companyPlaceholder: 'اسم شركتك (اختياري)',
      country: 'الدولة',
      countryPlaceholder: 'عُمان',
      description: 'وصف المشروع',
      descriptionPlaceholder: 'صِف بإيجاز ما تريد بناءه، والمستخدمين المستهدفين، وأي متطلبات أو ميزات محددة…',
      contactMethod: 'طريقة التواصل المفضلة',
      contactMethods: {
        whatsapp: 'واتساب',
        email: 'البريد الإلكتروني',
        call: 'مكالمة هاتفية',
      },
      consent: 'أريد من CloudTopia مراجعة مشروعي والتواصل معي بتوصية والخطوات التالية.',
      privacy: 'فكرة مشروعك وتفاصيل عملك تُحفظ بسرية تامة. تستخدم CloudTopia هذه المعلومات فقط لإعداد توصيتك والتواصل معك.',
      submit: 'احصل على توصيتي',
      submitting: 'جارٍ إعداد توصيتك…',
      nameRequired: 'الاسم الكامل مطلوب',
      phoneRequired: 'رقم الهاتف مطلوب',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    },

    card: {
      title: 'الحل الأنسب لك',
      placeholder: 'أكمل الخطوات لعرض توصية مخصصة من CloudTopia.',
      bestMatch: 'الأنسب لك',
      aligned: 'توافق',
      timeline: 'المدة',
      budget: 'نطاق الميزانية',
      tech: 'التقنيات المقترحة',
      features: 'الميزات الأساسية',
      services: 'الخدمات المشمولة',
      deliveryApproach: 'طريقة التنفيذ المقترحة',
      bookConsultation: 'احجز استشارة مجانية',
      continueWhatsapp: 'المتابعة عبر واتساب',
      viewService: 'عرض الخدمة',
      noObligation: 'بدون التزام · توصية مجانية · أقل من دقيقة',
    },

    result: {
      title: 'الحل الأنسب لك من CloudTopia',
      readyBadge: 'توصيتك جاهزة',
      metaTimeline: 'المدة التقديرية',
      metaBudget: 'نطاق الميزانية',
      metaTech: 'التقنيات المقترحة',
      featuresLabel: 'الميزات الأساسية المشمولة',
      servicesLabel: 'الخدمات الموصى بها',
      deliveryLabel: 'طريقة التنفيذ المقترحة',
      primaryCta: 'المتابعة عبر واتساب',
      editAnswers: 'تعديل الإجابات',
      viewService: 'عرض الخدمة',
      startOver: 'البدء من جديد بإجابات مختلفة',
      confirmationNote:
        '✅ توصيتك جاهزة. سيراجع فريق CloudTopia تفاصيل مشروعك ويتواصل معك خلال يوم عمل واحد.',
      whatsappNote: 'سيفتح زر الأعلى واتساب تلقائياً برسالة جاهزة تلخّص مشروعك. لا حاجة لكتابة أي شيء.',
    },
  },
} as const

// SFTextShape is the loose structural type shared by both locales.
// We can't use `typeof SF_TEXT.en` because that locks literal strings.
export type SFTextShape = {
  badge: string
  headline: string
  headlineAccent: string
  subheadline: string
  helper: string
  back: string
  next: string
  continue: string
  skip: string
  stepOf: (current: number, total: number) => string
  pleaseSelect: string
  steps: {
    industry: { title: string; subtitle: string }
    projectType: { title: string; subtitle: string }
    businessGoal: { title: string; subtitle: string }
    budgetTimeline: { title: string; subtitle: string }
    requirements: { title: string; subtitle: string }
  }
  questions: {
    industry: string
    industryHelper: string
    projectType: string
    projectTypeHelper: string
    businessGoal: string
    businessGoalHelper: string
    budgetTimeline: string
    budgetTimelineHelper: string
    requirements: string
    requirementsHelper: string
  }
  budgetLabel: string
  timelineLabel: string
  form: {
    fullName: string
    fullNamePlaceholder: string
    phone: string
    phonePlaceholder: string
    email: string
    emailPlaceholder: string
    company: string
    companyPlaceholder: string
    country: string
    countryPlaceholder: string
    description: string
    descriptionPlaceholder: string
    contactMethod: string
    contactMethods: { whatsapp: string; email: string; call: string }
    consent: string
    privacy: string
    submit: string
    submitting: string
    nameRequired: string
    phoneRequired: string
    emailRequired: string
    emailInvalid: string
  }
  card: {
    title: string
    placeholder: string
    bestMatch: string
    aligned: string
    timeline: string
    budget: string
    tech: string
    features: string
    services: string
    deliveryApproach: string
    bookConsultation: string
    continueWhatsapp: string
    viewService: string
    noObligation: string
  }
  result: {
    title: string
    readyBadge: string
    metaTimeline: string
    metaBudget: string
    metaTech: string
    featuresLabel: string
    servicesLabel: string
    deliveryLabel: string
    primaryCta: string
    editAnswers: string
    viewService: string
    startOver: string
    confirmationNote: string
    whatsappNote: string
  }
}
