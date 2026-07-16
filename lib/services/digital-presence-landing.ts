import { digitalPresencePillars, localizedDP } from './digital-presence'

type LandingLocale = 'en' | 'ar'

export type PresenceService = {
  slug: string
  name: string
  description: string
  href: string
  icon: string
}

export type PresenceJourneyStage = {
  number: string
  title: string
  description: string
  serviceSlugs: string[]
}

export type PresenceOutcome = {
  number: string
  title: string
  description: string
}

export type PresenceProcessStep = {
  number: string
  title: string
  description: string
}

export type PresenceFaq = {
  question: string
  answer: string
}

type DigitalPresenceLandingCopy = {
  seo: {
    title: string
    description: string
  }
  hero: {
    eyebrow: string
    title: string
    accent: string
    description: string
    primaryCta: string
    secondaryCta: string
    canvasLabels: string[]
    ticker: string[]
  }
  definition: {
    eyebrow: string
    title: string
    statement: string
    description: string
    moments: string[]
  }
  journeyIntro: {
    eyebrow: string
    title: string
    description: string
  }
  journey: PresenceJourneyStage[]
  atlas: {
    eyebrow: string
    title: string
    description: string
    exploreLabel: string
  }
  foundation: {
    eyebrow: string
    title: string
    description: string
    pillars: Array<{ slug: string; label: string; description: string }>
    linkLabel: string
  }
  discoverability: {
    eyebrow: string
    title: string
    description: string
    exampleLabel: string
    searchPrompt: string
    answerLabel: string
    answer: string
    signals: string[]
    serviceLinks: Array<{ slug: string; label: string }>
  }
  engagement: {
    eyebrow: string
    title: string
    description: string
    moments: Array<{ label: string; value: string }>
    serviceLinks: Array<{ slug: string; label: string }>
  }
  connection: {
    eyebrow: string
    title: string
    description: string
    beforeLabel: string
    afterLabel: string
    before: string[]
    after: string[]
  }
  outcomesIntro: {
    eyebrow: string
    title: string
    description: string
  }
  outcomes: PresenceOutcome[]
  processIntro: {
    eyebrow: string
    title: string
    description: string
  }
  process: PresenceProcessStep[]
  audience: {
    eyebrow: string
    title: string
    description: string
    items: Array<{ title: string; description: string }>
  }
  work: {
    eyebrow: string
    title: string
    description: string
    viewAll: string
    projects: Array<{ title: string; category: string; image: string; href: string }>
  }
  faqIntro: {
    eyebrow: string
    title: string
    description: string
  }
  faqs: PresenceFaq[]
  finalCta: {
    eyebrow: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
    note: string
  }
  labels: {
    services: string
    openMenu: string
    closeMenu: string
    previous: string
    next: string
  }
}

export type DigitalPresenceLandingContent = DigitalPresenceLandingCopy & {
  locale: LandingLocale
  services: PresenceService[]
}

const english: DigitalPresenceLandingCopy = {
  seo: {
    title: 'Digital Presence Services for Business Growth',
    description:
      'Build a connected digital presence with websites, e-commerce, branding, SEO, AI-search visibility, social media and content for your business.',
  },
  hero: {
    eyebrow: 'Digital Presence Services',
    title: 'Digital presence that makes your business',
    accent: 'impossible to miss.',
    description:
      'We connect your website, store, brand, search visibility, social media and content into one clear system built to earn attention and turn it into business.',
    primaryCta: 'Plan it on WhatsApp',
    secondaryCta: 'Explore the services',
    canvasLabels: ['Owned home', 'Search visibility', 'Brand system', 'Content engine'],
    ticker: ['Website', 'E-commerce', 'Brand', 'SEO', 'AEO', 'GEO', 'Social', 'Content'],
  },
  definition: {
    eyebrow: 'What digital presence really means',
    title: 'Being online is not the same as being chosen.',
    statement: 'Your digital presence is the experience people have before they ever speak to you.',
    description:
      'It is what they find when they search, what they understand when they land, what they remember after they leave, and how easy you make the next step. We build those moments as one connected business asset instead of a collection of disconnected pages and posts.',
    moments: ['What they find', 'What they understand', 'What they trust', 'What they do next'],
  },
  journeyIntro: {
    eyebrow: 'The connected journey',
    title: 'One presence. Four jobs.',
    description:
      'A useful digital presence does more than look polished. It creates a clear path from first discovery to a confident decision, then keeps learning from what customers do.',
  },
  journey: [
    {
      number: '01',
      title: 'Build',
      description: 'Own a credible website, selling experience and brand foundation.',
      serviceSlugs: ['website-development', 'ecommerce-development', 'ui-ux-design-branding'],
    },
    {
      number: '02',
      title: 'Be found',
      description: 'Become easier to discover in traditional search and AI answers.',
      serviceSlugs: ['search-engine-optimization', 'answer-engine-optimization', 'generative-engine-optimization'],
    },
    {
      number: '03',
      title: 'Engage',
      description: 'Give people useful reasons to notice, remember and contact you.',
      serviceSlugs: ['social-media-management', 'content-marketing-authority'],
    },
    {
      number: '04',
      title: 'Grow',
      description: 'Learn what creates action and improve the connected system over time.',
      serviceSlugs: [],
    },
  ],
  atlas: {
    eyebrow: 'Service atlas',
    title: 'Everything your presence needs, connected by one strategy.',
    description:
      'Start with the problem that matters now. Each service can stand alone, but it becomes more valuable when the surrounding experience supports it.',
    exploreLabel: 'Explore service',
  },
  foundation: {
    eyebrow: 'Build the foundation',
    title: 'Give every click somewhere credible to land.',
    description:
      'Your website is the home you own. Your commerce experience makes buying feel natural. Your brand and interface make every interaction feel unmistakably yours.',
    pillars: [
      {
        slug: 'website-development',
        label: 'A website that earns confidence',
        description: 'Fast, clear and structured around the questions customers ask before they contact you.',
      },
      {
        slug: 'ecommerce-development',
        label: 'A buying journey without friction',
        description: 'Products, payments and operations connected in an experience designed to sell and scale.',
      },
      {
        slug: 'ui-ux-design-branding',
        label: 'A brand people can recognise',
        description: 'A coherent visual and interaction system that carries trust across every channel.',
      },
    ],
    linkLabel: 'See how we build it',
  },
  discoverability: {
    eyebrow: 'Be found',
    title: 'Show up where decisions begin now.',
    description:
      'Search is no longer one list of blue links. People ask Google, maps, ChatGPT and other assistants for direct recommendations. We make your business understandable across that whole discovery layer.',
    exampleLabel: 'Illustrative search and AI-answer example',
    searchPrompt: 'Who can build a complete digital presence for a growing business?',
    answerLabel: 'A useful answer needs reliable signals',
    answer:
      'A technically sound website, clear service pages, useful answers, structured data and consistent external brand signals help search and AI systems understand when your business is relevant.',
    signals: ['Technical foundation', 'Clear answers', 'Structured meaning', 'Trusted brand signals'],
    serviceLinks: [
      { slug: 'search-engine-optimization', label: 'Search Engine Optimization' },
      { slug: 'answer-engine-optimization', label: 'Answer Engine Optimization' },
      { slug: 'generative-engine-optimization', label: 'Generative Engine Optimization' },
    ],
  },
  engagement: {
    eyebrow: 'Engage and stay memorable',
    title: 'Turn one clear idea into a consistent stream of useful moments.',
    description:
      'Strategy gives every post, article, campaign and conversation a job. Content answers the question. Social distribution helps the right people encounter it. Community work keeps the relationship human.',
    moments: [
      { label: 'Campaign idea', value: 'One useful promise' },
      { label: 'Short-form video', value: 'Show the value quickly' },
      { label: 'Authority article', value: 'Answer the deeper question' },
      { label: 'Community reply', value: 'Continue the conversation' },
    ],
    serviceLinks: [
      { slug: 'social-media-management', label: 'Social Media Marketing' },
      { slug: 'content-marketing-authority', label: 'Content Marketing & Authority' },
    ],
  },
  connection: {
    eyebrow: 'The package advantage',
    title: 'Not eight vendors. One connected team.',
    description:
      'We do not force every service into every project. We find the right order, keep the message consistent, and make sure each piece supports what comes next.',
    beforeLabel: 'When the work is fragmented',
    afterLabel: 'When the presence is connected',
    before: [
      'A different message on every channel',
      'A website disconnected from campaigns',
      'Content created without a useful destination',
      'No shared priorities or measurement',
    ],
    after: [
      'One positioning and visual language',
      'Every channel supports the next step',
      'Clear ownership and practical priorities',
      'Learning feeds the next improvement',
    ],
  },
  outcomesIntro: {
    eyebrow: 'Business outcomes',
    title: 'What changes when the experience finally makes sense.',
    description:
      'The goal is not more digital activity for its own sake. It is a business that looks credible, explains itself clearly and makes the next step easier.',
  },
  outcomes: [
    { number: '01', title: 'Look credible sooner', description: 'Give new visitors enough confidence to keep exploring.' },
    { number: '02', title: 'Get discovered more often', description: 'Create more useful entry points across search, AI and social.' },
    { number: '03', title: 'Explain the offer clearly', description: 'Help the right customer understand why your business fits.' },
    { number: '04', title: 'Generate better inquiries', description: 'Guide interested people toward a clear, low-friction next step.' },
    { number: '05', title: 'Build a consistent brand', description: 'Make every customer-facing moment feel related and recognisable.' },
    { number: '06', title: 'Learn what drives action', description: 'Use real behavior to decide what deserves improvement next.' },
  ],
  processIntro: {
    eyebrow: 'How we deliver it',
    title: 'Strategy first. Then the right work, in the right order.',
    description:
      'You do not need to arrive with a shopping list. We start with the business, identify the gaps that matter, and build a practical sequence around them.',
  },
  process: [
    { number: '01', title: 'Discover', description: 'Understand the business, audience, market and current presence.' },
    { number: '02', title: 'Position', description: 'Clarify the promise, priorities, journey and measurement plan.' },
    { number: '03', title: 'Build', description: 'Create the foundation and the highest-value connected assets.' },
    { number: '04', title: 'Launch', description: 'Test the complete experience, publish it and connect tracking.' },
    { number: '05', title: 'Grow', description: 'Learn from real behavior and improve what creates meaningful action.' },
  ],
  audience: {
    eyebrow: 'When this service fits',
    title: 'Built for businesses at a turning point.',
    description:
      'The package is most useful when the business has changed but the public experience has not caught up, or when a new opportunity needs a stronger foundation.',
    items: [
      { title: 'Launching something new', description: 'Start with a coherent brand, website and discovery plan instead of patching them together later.' },
      { title: 'Outgrowing an old presence', description: 'Replace a site or identity that no longer reflects the quality of the business.' },
      { title: 'Entering a new market', description: 'Adapt the message, language and customer journey for the GCC and Arab world.' },
      { title: 'Connecting scattered channels', description: 'Bring website, search, content and social work back under one practical strategy.' },
    ],
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Real businesses. Different kinds of presence.',
    description:
      'A strong presence should look and behave like the business behind it. These projects show different ways strategy, design and technology come together.',
    viewAll: 'View all projects',
    projects: [
      { title: 'RAM Sustainable Design Group', category: 'Corporate presence', image: '/images/projects/ramsdgroup.png', href: '/projects/ram-sustainable' },
      { title: 'Artucky', category: 'E-commerce experience', image: '/images/projects/artucky-ecommerce.png', href: '/projects/artucky-ecommerce' },
      { title: 'Dhofar Tourism', category: 'Destination experience', image: '/images/projects/dhofar-tourism.png', href: '/projects/dhofar-tourism' },
    ],
  },
  faqIntro: {
    eyebrow: 'Questions worth asking',
    title: 'A clearer brief starts with a better conversation.',
    description: 'Here is what most businesses want to know before deciding where to begin.',
  },
  faqs: [
    {
      question: 'What is included in a Digital Presence package?',
      answer:
        'The package is shaped around the gaps that matter to your business. It can include website or store development, brand and UI work, SEO, AI-search visibility, social media strategy, content and ongoing improvement. We define the exact scope after a short discovery conversation.',
    },
    {
      question: 'Do we need every service at once?',
      answer:
        'No. Most businesses get better results by doing the right work in the right order. We may begin with positioning and a website, then add search or content once the foundation is ready. You receive a clear priority plan before work starts.',
    },
    {
      question: 'Can CloudTopia improve our existing website or brand?',
      answer:
        'Yes. We can keep what is working, repair weak parts and connect the existing assets to a clearer system. A rebuild is recommended only when the current platform, structure or identity would hold the next stage back.',
    },
    {
      question: 'How does Arabic and English delivery work?',
      answer:
        'We design both languages as first-class experiences. That includes translation-aware messaging, Arabic typography, RTL layouts, localized search behavior and a customer journey that feels natural in either language.',
    },
    {
      question: 'How do we decide what is working?',
      answer:
        'We agree on practical signals before launch, such as qualified inquiries, useful search visibility, engagement with key pages or completed buying actions. The measurement plan follows the real business goal rather than a vanity metric.',
    },
    {
      question: 'What happens in the WhatsApp consultation?',
      answer:
        'Tell us about the business, what feels weak today and what you want to change. We will ask a few focused questions, identify the likely priorities and explain the most useful next step. There is no obligation to buy every service.',
    },
  ],
  finalCta: {
    eyebrow: 'Start with the real problem',
    title: 'Let’s make your business easier to find, trust and choose.',
    description:
      'Tell us where your presence is today. We will help you identify what matters first, what can wait, and how the pieces should connect.',
    primaryCta: 'Start a WhatsApp consultation',
    secondaryCta: 'Explore the services again',
    note: 'A practical first conversation. No pressure and no unnecessary package list.',
  },
  labels: {
    services: 'Services',
    openMenu: 'Open section',
    closeMenu: 'Close section',
    previous: 'Previous',
    next: 'Next',
  },
}

const arabic: DigitalPresenceLandingCopy = {
  seo: {
    title: 'خدمات الحضور الرقمي المتكاملة للشركات',
    description:
      'ابنِ حضوراً رقمياً متكاملاً يجمع الموقع والمتجر والهوية وSEO والظهور في إجابات الذكاء الاصطناعي والتواصل الاجتماعي والمحتوى.',
  },
  hero: {
    eyebrow: 'خدمات الحضور الرقمي',
    title: 'حضور رقمي يجعل أعمالك',
    accent: 'صعبة التجاهل.',
    description:
      'نربط موقعك ومتجرك وهويتك وظهورك في البحث وحضورك الاجتماعي ومحتواك ضمن منظومة واضحة تجذب الانتباه وتحوله إلى فرص حقيقية.',
    primaryCta: 'خطّط معنا عبر واتساب',
    secondaryCta: 'استكشف الخدمات',
    canvasLabels: ['منصتك المملوكة', 'الظهور في البحث', 'نظام الهوية', 'محرك المحتوى'],
    ticker: ['الموقع', 'المتجر', 'الهوية', 'SEO', 'AEO', 'GEO', 'التواصل', 'المحتوى'],
  },
  definition: {
    eyebrow: 'ما معنى الحضور الرقمي فعلاً؟',
    title: 'وجودك على الإنترنت لا يعني أن العميل سيختارك.',
    statement: 'حضورك الرقمي هو التجربة التي يعيشها العميل قبل أن يتحدث معك للمرة الأولى.',
    description:
      'هو ما يجده عندما يبحث، وما يفهمه عند وصوله، وما يبقى في ذاكرته بعد المغادرة، ومدى سهولة الخطوة التالية. نبني هذه اللحظات كأصل واحد مترابط لأعمالك، لا كمجموعة صفحات ومنشورات منفصلة.',
    moments: ['ماذا يجد؟', 'ماذا يفهم؟', 'بماذا يثق؟', 'ماذا يفعل بعدها؟'],
  },
  journeyIntro: {
    eyebrow: 'رحلة مترابطة',
    title: 'حضور واحد. أربع مهام.',
    description:
      'الحضور الرقمي الجيد لا يكتفي بالمظهر الأنيق. بل يصنع طريقاً واضحاً من لحظة الاكتشاف الأولى حتى القرار، ثم يتعلم من سلوك العملاء ويتحسن.',
  },
  journey: [
    {
      number: '01',
      title: 'ابنِ الأساس',
      description: 'امتلك موقعاً موثوقاً وتجربة بيع وهوية واضحة.',
      serviceSlugs: ['website-development', 'ecommerce-development', 'ui-ux-design-branding'],
    },
    {
      number: '02',
      title: 'كن ظاهراً',
      description: 'سهّل العثور عليك في البحث التقليدي وإجابات الذكاء الاصطناعي.',
      serviceSlugs: ['search-engine-optimization', 'answer-engine-optimization', 'generative-engine-optimization'],
    },
    {
      number: '03',
      title: 'تفاعل',
      description: 'امنح الناس أسباباً مفيدة لملاحظتك وتذكرك والتواصل معك.',
      serviceSlugs: ['social-media-management', 'content-marketing-authority'],
    },
    {
      number: '04',
      title: 'نمِّ النتائج',
      description: 'تعلّم مما يدفع العملاء للفعل وطوّر المنظومة باستمرار.',
      serviceSlugs: [],
    },
  ],
  atlas: {
    eyebrow: 'خريطة الخدمات',
    title: 'كل ما يحتاجه حضورك، ضمن استراتيجية واحدة.',
    description:
      'ابدأ بالمشكلة الأهم الآن. كل خدمة قادرة على العمل منفردة، لكنها تصبح أقوى عندما تدعمها التجربة المحيطة بها.',
    exploreLabel: 'استكشف الخدمة',
  },
  foundation: {
    eyebrow: 'ابنِ الأساس',
    title: 'امنح كل نقرة مكاناً موثوقاً تصل إليه.',
    description:
      'موقعك هو المنصة التي تملكها. متجرك يجعل الشراء طبيعياً وسلساً. وهويتك وتجربة الاستخدام تمنحان كل تفاعل طابعاً واضحاً يخصك.',
    pillars: [
      {
        slug: 'website-development',
        label: 'موقع يكسب الثقة',
        description: 'سريع وواضح ومبني حول الأسئلة التي يطرحها العميل قبل التواصل.',
      },
      {
        slug: 'ecommerce-development',
        label: 'رحلة شراء بلا تعقيد',
        description: 'منتجات ومدفوعات وتشغيل مترابطة ضمن تجربة مصممة للبيع والتوسع.',
      },
      {
        slug: 'ui-ux-design-branding',
        label: 'هوية يسهل تمييزها',
        description: 'نظام بصري وتفاعلي متماسك ينقل الثقة عبر جميع القنوات.',
      },
    ],
    linkLabel: 'اكتشف كيف نبنيها',
  },
  discoverability: {
    eyebrow: 'كن ظاهراً',
    title: 'اظهر حيث تبدأ القرارات اليوم.',
    description:
      'البحث لم يعد قائمة واحدة من الروابط. الناس يسألون Google والخرائط وChatGPT ومساعدين آخرين عن ترشيحات مباشرة. نهيئ أعمالك لتكون مفهومة عبر طبقة الاكتشاف كاملة.',
    exampleLabel: 'مثال توضيحي للبحث وإجابات الذكاء الاصطناعي',
    searchPrompt: 'من يستطيع بناء حضور رقمي متكامل لشركة تنمو؟',
    answerLabel: 'الإجابة المفيدة تحتاج إلى إشارات موثوقة',
    answer:
      'يساعد الموقع السليم تقنياً وصفحات الخدمات الواضحة والإجابات المفيدة والبيانات المنظمة وإشارات الهوية المتسقة محركات البحث والذكاء الاصطناعي على فهم متى تكون أعمالك مناسبة للسؤال.',
    signals: ['أساس تقني سليم', 'إجابات واضحة', 'معنى منظم', 'إشارات علامة موثوقة'],
    serviceLinks: [
      { slug: 'search-engine-optimization', label: 'تحسين محركات البحث SEO' },
      { slug: 'answer-engine-optimization', label: 'تحسين محركات الإجابة AEO' },
      { slug: 'generative-engine-optimization', label: 'تحسين المحركات التوليدية GEO' },
    ],
  },
  engagement: {
    eyebrow: 'تفاعل وابقَ في الذاكرة',
    title: 'حوّل فكرة واضحة إلى سلسلة مستمرة من اللحظات المفيدة.',
    description:
      'تمنح الاستراتيجية كل منشور ومقال وحملة ومحادثة دوراً واضحاً. يجيب المحتوى عن السؤال، ويساعد التوزيع الاجتماعي الأشخاص المناسبين على رؤيته، ويحافظ التفاعل المجتمعي على العلاقة الإنسانية.',
    moments: [
      { label: 'فكرة الحملة', value: 'وعد واحد مفيد' },
      { label: 'فيديو قصير', value: 'أظهر القيمة بسرعة' },
      { label: 'مقال متخصص', value: 'أجب عن السؤال الأعمق' },
      { label: 'رد مجتمعي', value: 'واصل المحادثة' },
    ],
    serviceLinks: [
      { slug: 'social-media-management', label: 'التسويق عبر وسائل التواصل' },
      { slug: 'content-marketing-authority', label: 'تسويق المحتوى وبناء الريادة' },
    ],
  },
  connection: {
    eyebrow: 'ميزة الباقة المتكاملة',
    title: 'ليس ثمانية مزودين. بل فريق واحد مترابط.',
    description:
      'لا نفرض كل الخدمات على كل مشروع. نحدد الترتيب الأنسب، ونحافظ على اتساق الرسالة، ونتأكد أن كل جزء يمهد لما يليه.',
    beforeLabel: 'عندما يكون العمل متفرقاً',
    afterLabel: 'عندما يكون الحضور مترابطاً',
    before: [
      'رسالة مختلفة في كل قناة',
      'موقع منفصل عن الحملات',
      'محتوى بلا وجهة مفيدة',
      'لا أولويات أو قياس مشترك',
    ],
    after: [
      'تموضع ولغة بصرية واحدة',
      'كل قناة تدعم الخطوة التالية',
      'مسؤوليات وأولويات عملية واضحة',
      'التعلم يقود التحسين التالي',
    ],
  },
  outcomesIntro: {
    eyebrow: 'نتائج للأعمال',
    title: 'ما الذي يتغير عندما تصبح التجربة منطقية ومترابطة؟',
    description:
      'الهدف ليس زيادة النشاط الرقمي لمجرد الزيادة، بل أن تبدو أعمالك موثوقة، وتشرح نفسها بوضوح، وتجعل الخطوة التالية أسهل.',
  },
  outcomes: [
    { number: '01', title: 'اكسب الثقة أسرع', description: 'امنح الزائر الجديد ما يكفي من الثقة ليواصل الاستكشاف.' },
    { number: '02', title: 'سهّل اكتشافك', description: 'أنشئ نقاط دخول مفيدة عبر البحث والذكاء الاصطناعي والتواصل.' },
    { number: '03', title: 'اشرح عرضك بوضوح', description: 'ساعد العميل المناسب على فهم سبب ملاءمة أعمالك له.' },
    { number: '04', title: 'احصل على استفسارات أفضل', description: 'وجّه المهتمين نحو خطوة تالية واضحة وسهلة.' },
    { number: '05', title: 'ابنِ علامة متسقة', description: 'اجعل كل لحظة مع العميل مترابطة وسهلة التمييز.' },
    { number: '06', title: 'اعرف ما يدفع للفعل', description: 'استخدم السلوك الحقيقي لتحديد ما يستحق التحسين تالياً.' },
  ],
  processIntro: {
    eyebrow: 'كيف ننفذ العمل؟',
    title: 'الاستراتيجية أولاً. ثم العمل الصحيح بالترتيب الصحيح.',
    description:
      'لا تحتاج إلى قائمة جاهزة من الخدمات. نبدأ بالأعمال، ونحدد الفجوات المهمة، ونبني حولها تسلسلاً عملياً واضحاً.',
  },
  process: [
    { number: '01', title: 'نفهم', description: 'ندرس الأعمال والجمهور والسوق والحضور الحالي.' },
    { number: '02', title: 'نحدد الموقع', description: 'نوضح الوعد والأولويات والرحلة وخطة القياس.' },
    { number: '03', title: 'نبني', description: 'ننشىء الأساس والأصول المترابطة الأعلى قيمة.' },
    { number: '04', title: 'نطلق', description: 'نختبر التجربة كاملة وننشرها ونربط القياس.' },
    { number: '05', title: 'نطوّر', description: 'نتعلم من السلوك الحقيقي ونحسن ما يصنع فعلاً مهماً.' },
  ],
  audience: {
    eyebrow: 'متى تناسبك الخدمة؟',
    title: 'مصممة للشركات عند نقاط التحول.',
    description:
      'تكون الباقة أكثر فائدة عندما تتغير الأعمال ولا تلحق بها صورتها أمام الجمهور، أو عندما تحتاج فرصة جديدة إلى أساس أقوى.',
    items: [
      { title: 'إطلاق مشروع جديد', description: 'ابدأ بهوية وموقع وخطة ظهور مترابطة بدلاً من ترقيعها لاحقاً.' },
      { title: 'تجاوز حضور قديم', description: 'استبدل موقعاً أو هوية لم تعد تعكس جودة أعمالك الحالية.' },
      { title: 'دخول سوق جديد', description: 'كيّف الرسالة واللغة ورحلة العميل للخليج والعالم العربي.' },
      { title: 'ربط قنوات متفرقة', description: 'أعد الموقع والبحث والمحتوى والتواصل تحت استراتيجية عملية واحدة.' },
    ],
  },
  work: {
    eyebrow: 'أعمال مختارة',
    title: 'شركات حقيقية. وحضور يناسب كل واحدة منها.',
    description:
      'يجب أن يبدو الحضور الرقمي ويتصرف مثل الأعمال التي يقف خلفها. توضح هذه المشاريع طرقاً مختلفة لاجتماع الاستراتيجية والتصميم والتقنية.',
    viewAll: 'شاهد كل المشاريع',
    projects: [
      { title: 'RAM Sustainable Design Group', category: 'حضور مؤسسي', image: '/images/projects/ramsdgroup.png', href: '/projects/ram-sustainable' },
      { title: 'Artucky', category: 'تجربة تجارة إلكترونية', image: '/images/projects/artucky-ecommerce.png', href: '/projects/artucky-ecommerce' },
      { title: 'Dhofar Tourism', category: 'تجربة وجهة سياحية', image: '/images/projects/dhofar-tourism.png', href: '/projects/dhofar-tourism' },
    ],
  },
  faqIntro: {
    eyebrow: 'أسئلة تستحق أن تُطرح',
    title: 'المشروع الأوضح يبدأ بمحادثة أفضل.',
    description: 'هذه أهم الأسئلة التي تطرحها الشركات قبل تحديد نقطة البداية.',
  },
  faqs: [
    {
      question: 'ماذا تشمل باقة الحضور الرقمي؟',
      answer:
        'نشكّل الباقة حول الفجوات المهمة لأعمالك. قد تشمل تطوير الموقع أو المتجر، والهوية وتجربة الاستخدام، وSEO، والظهور في بحث الذكاء الاصطناعي، واستراتيجية التواصل، والمحتوى، والتحسين المستمر. نحدد النطاق الدقيق بعد محادثة استكشاف قصيرة.',
    },
    {
      question: 'هل نحتاج إلى كل الخدمات دفعة واحدة؟',
      answer:
        'لا. تحقق معظم الشركات نتائج أفضل عندما تنفذ العمل الصحيح بالترتيب الصحيح. قد نبدأ بالتموضع والموقع، ثم نضيف البحث أو المحتوى عندما يصبح الأساس جاهزاً. ستحصل على خطة أولويات واضحة قبل بدء العمل.',
    },
    {
      question: 'هل تستطيع كلاود توبيا تطوير موقعنا أو هويتنا الحالية؟',
      answer:
        'نعم. نستطيع الحفاظ على ما يعمل جيداً، وإصلاح الأجزاء الضعيفة، وربط الأصول الحالية ضمن منظومة أوضح. لا ننصح بإعادة البناء إلا عندما تحد المنصة أو البنية أو الهوية الحالية من المرحلة التالية.',
    },
    {
      question: 'كيف تعملون باللغتين العربية والإنجليزية؟',
      answer:
        'نصمم اللغتين كتجربتين أصليتين متكافئتين. يشمل ذلك صياغة تراعي الترجمة، وخطوطاً عربية مناسبة، وتخطيطات RTL، وسلوك بحث محلياً، ورحلة عميل طبيعية في كل لغة.',
    },
    {
      question: 'كيف نعرف ما الذي يحقق نتيجة؟',
      answer:
        'نتفق قبل الإطلاق على مؤشرات عملية مثل الاستفسارات المؤهلة، والظهور المفيد في البحث، والتفاعل مع الصفحات المهمة، أو إكمال خطوات الشراء. تتبع خطة القياس هدف الأعمال الحقيقي لا أرقاماً شكلية.',
    },
    {
      question: 'ماذا يحدث في استشارة واتساب؟',
      answer:
        'أخبرنا عن أعمالك، وما يبدو ضعيفاً اليوم، وما الذي تريد تغييره. سنطرح أسئلة مركزة، ونحدد الأولويات المحتملة، ونشرح الخطوة التالية الأكثر فائدة. لست ملزماً بشراء جميع الخدمات.',
    },
  ],
  finalCta: {
    eyebrow: 'ابدأ بالمشكلة الحقيقية',
    title: 'لنجعل أعمالك أسهل في الاكتشاف والثقة والاختيار.',
    description:
      'أخبرنا أين يقف حضورك اليوم. سنساعدك على معرفة ما يجب أن يبدأ أولاً، وما يمكن تأجيله، وكيف ترتبط الأجزاء معاً.',
    primaryCta: 'ابدأ استشارة واتساب',
    secondaryCta: 'استكشف الخدمات مجدداً',
    note: 'محادثة أولى عملية. بلا ضغط وبلا قائمة خدمات لا تحتاجها.',
  },
  labels: {
    services: 'الخدمات',
    openMenu: 'افتح القسم',
    closeMenu: 'أغلق القسم',
    previous: 'السابق',
    next: 'التالي',
  },
}

export const digitalPresenceLanding = {
  en: english,
  ar: arabic,
} satisfies Record<LandingLocale, DigitalPresenceLandingCopy>

export function getDigitalPresenceLanding(locale: string): DigitalPresenceLandingContent {
  const normalizedLocale: LandingLocale = locale === 'ar' ? 'ar' : 'en'
  const selected = digitalPresenceLanding[normalizedLocale]

  return {
    ...selected,
    locale: normalizedLocale,
    services: digitalPresencePillars.map((pillar) => ({
      slug: pillar.slug,
      name: localizedDP(pillar.name, normalizedLocale),
      description: localizedDP(pillar.description, normalizedLocale),
      href: pillar.href,
      icon: pillar.icon,
    })),
  }
}
