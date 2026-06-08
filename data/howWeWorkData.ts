import {
  Compass, Palette, Hammer, Rocket,
  Users, CalendarCheck, MessageSquare, Repeat,
  ClipboardList, Layers, GitBranch, ShieldCheck
} from 'lucide-react';

export const howWeWorkData = {
  header: {
    badge: {
      en: "OUR PROCESS",
      ar: "منهجية العمل"
    },
    title: {
      en: "CMMI-Aligned Software Development Process for Websites, Apps & Business Systems",
      ar: "منهجية تطوير برمجيات منظمة للمواقع، التطبيقات، وأنظمة الأعمال"
    },
    titleMobile: {
      en: "Reliable Software Development Process for Digital Business Solutions",
      ar: "منهجية تطوير موثوقة للحلول الرقمية"
    },
    description: {
      en: "CloudTopia follows a structured delivery workflow for website development, app development, CRM systems, cloud solutions, and AI automation — with clear planning, measurable progress, quality reviews, and reliable launch support.",
      ar: "تتبع كلاود توبيا منهجية تنفيذ واضحة ومتوافقة مع مبادئ CMMI لتطوير المواقع، التطبيقات، أنظمة CRM، الحلول السحابية، وأتمتة الذكاء الاصطناعي — مع تخطيط واضح، متابعة قابلة للقياس، مراجعات جودة، ودعم موثوق بعد الإطلاق."
    }
  },
  processTypes: [
    {
      id: "fixed-scope",
      label: { en: "Fixed-Scope Projects", ar: "المشاريع محددة النطاق" },
      description: {
        en: "Best for websites, landing pages, company profiles, and defined digital solutions where scope, timeline, and deliverables are agreed before development starts.",
        ar: "مناسب للمواقع، صفحات الهبوط، مواقع الشركات، والحلول الرقمية محددة النطاق حيث يتم الاتفاق على المتطلبات، المدة، والمخرجات قبل بدء التنفيذ."
      },
      steps: [
        {
          number: "01",
          duration: { en: "3–5 days", ar: "3–5 أيام" },
          title: { en: "Discovery", ar: "الاكتشاف" },
          description: { en: "We understand your business, target audience, goals, pages, content, and required features before preparing the scope.", ar: "نفهم عملك، جمهورك المستهدف، الأهداف، الصفحات، المحتوى، والميزات المطلوبة قبل تجهيز نطاق العمل." },
          icon: Compass
        },
        {
          number: "02",
          duration: { en: "1–2 weeks", ar: "1–2 أسبوع" },
          title: { en: "Scope & Design", ar: "تحديد النطاق والتصميم" },
          description: { en: "We define the deliverables, create the design direction, and get approval before development starts.", ar: "نحدد المخرجات، نجهز اتجاه التصميم، ونأخذ الموافقة قبل بدء التطوير." },
          icon: Palette
        },
        {
          number: "03",
          duration: { en: "2–4 weeks", ar: "2–4 أسابيع" },
          title: { en: "Build & Review", ar: "التطوير والمراجعة" },
          description: { en: "We build the website or system, review progress with you, and handle approved changes in a controlled way.", ar: "نطوّر الموقع أو النظام، نراجع التقدم معك، ونتعامل مع التعديلات المعتمدة بطريقة منظمة." },
          icon: Hammer
        },
        {
          number: "04",
          duration: { en: "Ongoing support", ar: "دعم مستمر" },
          title: { en: "Launch & Handover", ar: "الإطلاق والتسليم" },
          description: { en: "We test, launch, connect analytics, forms, and WhatsApp, then hand over access with clear guidance.", ar: "نختبر، نطلق، نربط التحليلات والنماذج وواتساب، ثم نسلّم الوصول مع إرشادات واضحة." },
          icon: Rocket
        }
      ]
    },
    {
      id: "dedicated-team",
      label: { en: "Dedicated Delivery Team", ar: "فريق تنفيذ مخصص" },
      description: {
        en: "Best for CRM systems, dashboards, business platforms, and clients who need continuous technical development and long-term support.",
        ar: "مناسب لأنظمة CRM، لوحات التحكم، منصات الأعمال، والعملاء الذين يحتاجون تطويرًا تقنيًا مستمرًا ودعمًا طويل الأمد."
      },
      steps: [
        {
          number: "01",
          duration: { en: "2–4 days", ar: "2–4 أيام" },
          title: { en: "Team Setup", ar: "تجهيز الفريق" },
          description: { en: "We assign the right roles for your project: project owner, UI/UX, frontend, backend, cloud, QA, and AI if needed.", ar: "نحدد الأدوار المناسبة لمشروعك: مسؤول مشروع، تصميم، واجهات، خلفية، سحابة، اختبار، وذكاء اصطناعي عند الحاجة." },
          icon: Users
        },
        {
          number: "02",
          duration: { en: "Weekly", ar: "أسبوعيًا" },
          title: { en: "Weekly Priorities", ar: "أولويات أسبوعية" },
          description: { en: "We organize work into weekly priorities so you always know what is being built, reviewed, and delivered.", ar: "ننظم العمل وفق أولويات أسبوعية لتعرف دائمًا ما يتم تنفيذه، مراجعته، وتسليمه." },
          icon: CalendarCheck
        },
        {
          number: "03",
          duration: { en: "Every cycle", ar: "كل دورة" },
          title: { en: "Transparent Delivery", ar: "تسليم شفاف" },
          description: { en: "We share updates, collect feedback, track decisions, and keep the delivery path visible.", ar: "نشارك التحديثات، نجمع الملاحظات، نوثق القرارات، ونحافظ على وضوح مسار التنفيذ." },
          icon: MessageSquare
        },
        {
          number: "04",
          duration: { en: "Ongoing", ar: "مستمر" },
          title: { en: "Improve & Scale", ar: "التحسين والتوسّع" },
          description: { en: "We improve features, optimize performance, add modules, and support your system as your business grows.", ar: "نحسّن الميزات، نرفع الأداء، نضيف وحدات جديدة، وندعم النظام مع نمو عملك." },
          icon: Repeat
        }
      ]
    },
    {
      id: "agile-development",
      label: { en: "Agile Development Process", ar: "منهجية التطوير المرنة" },
      description: {
        en: "Best for custom web applications, mobile apps, SaaS MVPs, AI automation, and products that need iteration, feedback, testing, and scalable architecture.",
        ar: "مناسب لتطبيقات الويب المخصصة، تطبيقات الموبايل، نماذج SaaS، أتمتة الذكاء الاصطناعي، والمنتجات التي تحتاج تطويرًا تدريجيًا واختبارًا مستمرًا."
      },
      steps: [
        {
          number: "01",
          duration: { en: "1 week", ar: "أسبوع" },
          title: { en: "Define & Plan", ar: "التحديد والتخطيط" },
          description: { en: "We define users, workflows, features, risks, integrations, and success criteria, then turn them into a clear development backlog.", ar: "نحدد المستخدمين، سير العمل، الميزات، المخاطر، التكاملات، ومعايير النجاح، ثم نحولها إلى قائمة مهام واضحة." },
          icon: ClipboardList
        },
        {
          number: "02",
          duration: { en: "1–2 weeks", ar: "1–2 أسبوع" },
          title: { en: "Design Architecture", ar: "التصميم والبنية التقنية" },
          description: { en: "We design user flows, interfaces, database structure, system architecture, and integration points before development.", ar: "نصمم تجربة المستخدم، الواجهات، قاعدة البيانات، بنية النظام، ونقاط التكامل قبل التطوير." },
          icon: Layers
        },
        {
          number: "03",
          duration: { en: "2-week cycles", ar: "دورات أسبوعين" },
          title: { en: "Build in Sprints", ar: "التطوير على مراحل" },
          description: { en: "We build in short cycles with demos, reviews, testing, and controlled improvements before moving forward.", ar: "نطوّر على دورات قصيرة تشمل العروض، المراجعة، الاختبار، والتحسين المنظم قبل الانتقال للمرحلة التالية." },
          icon: GitBranch
        },
        {
          number: "04",
          duration: { en: "Continuous", ar: "مستمر" },
          title: { en: "Release & Evolve", ar: "الإطلاق والتطوير المستمر" },
          description: { en: "We launch, monitor, fix issues, improve performance, and evolve the product based on real usage.", ar: "نطلق، نراقب، نعالج المشاكل، نحسّن الأداء، ونطوّر المنتج بناءً على الاستخدام الفعلي." },
          icon: ShieldCheck
        }
      ]
    }
  ],
  trustBar: {
    items: {
      en: [
        "CMMI-Aligned Workflow",
        "Clear Requirements",
        "Quality Review Gates",
        "Version Control",
        "Continuous Improvement"
      ],
      ar: [
        "منهجية متوافقة مع مبادئ CMMI",
        "متطلبات واضحة",
        "نقاط مراجعة للجودة",
        "إدارة الإصدارات",
        "تحسين مستمر"
      ]
    },
    note: {
      en: "Professional engineering practices designed for scalable, predictable, and reliable digital delivery.",
      ar: "ممارسات تنفيذ احترافية مصممة لتسليم رقمي قابل للتوسع، واضح، وموثوق."
    }
  },
  cta: {
    text: {
      en: "Ready to choose the best delivery plan for your project?",
      ar: "هل تريد اختيار منهجية التنفيذ الأنسب لمشروعك؟"
    },
    button: {
      en: "Discuss Your Project",
      ar: "ناقش مشروعك معنا"
    },
    whatsappNumber: "+96895886393",
    whatsappMessage: {
      en: "Hello CloudTopia, I want to discuss my project and choose the best delivery process for it.",
      ar: "مرحبًا كلاود توبيا، أريد مناقشة مشروعي واختيار أفضل منهجية تنفيذ مناسبة له."
    }
  }
};
