import type { FlowChipDef, FlowNode, LocalizedText } from './types.ts'

// Welcome message + the entry chips shown on the first assistant turn.
export const welcomeText: LocalizedText = {
  ar: 'أهلًا بك في CloudTopia 👋 أنا مساعدك الذكي. عن ماذا تريد أن نتحدث؟',
  en: 'Welcome to CloudTopia 👋 I’m your assistant. What would you like to explore?',
}

export const entryChipIds = ['services', 'pricing', 'about', 'consultation']

// Reusable chips so follow-ups stay consistent across nodes.
const chip = {
  services: { id: 'services', label: { ar: 'كل الخدمات', en: 'All services' } },
  websites: { id: 'digital-presence', label: { ar: 'مواقع', en: 'Websites' } },
  ecommerce: { id: 'ecommerce', label: { ar: 'متاجر إلكترونية', en: 'E-commerce' } },
  webapps: { id: 'interactive-web-applications', label: { ar: 'تطبيقات ويب', en: 'Web apps & SaaS' } },
  mobile: { id: 'mobile-app-development', label: { ar: 'تطبيقات جوال', en: 'Mobile apps' } },
  systems: { id: 'business-systems-development', label: { ar: 'أنظمة أعمال', en: 'Business systems' } },
  cloud: { id: 'cloud-infrastructure', label: { ar: 'سحابة واستضافة', en: 'Cloud & hosting' } },
  ai: { id: 'ai-powered-solutions', label: { ar: 'حلول ذكاء اصطناعي', en: 'AI solutions' } },
  growth: { id: 'digital-growth-support', label: { ar: 'تسويق وSEO', en: 'SEO & marketing' } },
  restaurant: { id: 'restaurant-qr-menu', label: { ar: 'قائمة QR للمطاعم', en: 'Restaurant QR menu' } },
  pricing: { id: 'pricing', label: { ar: 'الأسعار', en: 'Pricing' } },
  about: { id: 'about', label: { ar: 'من نحن', en: 'About CloudTopia' } },
  founder: { id: 'founder', label: { ar: 'المؤسس', en: 'The founder' } },
  vision: { id: 'vision', label: { ar: 'الرؤية', en: 'The vision' } },
  locations: { id: 'locations', label: { ar: 'أين نعمل', en: 'Where we work' } },
  process: { id: 'process', label: { ar: 'كيف نعمل', en: 'How we work' } },
  industries: { id: 'industries', label: { ar: 'القطاعات', en: 'Industries' } },
  portfolio: { id: 'portfolio', label: { ar: 'أعمالنا', en: 'Our work' } },
  contact: { id: 'contact', label: { ar: 'تواصل معنا', en: 'Contact us' } },
  consultation: { id: 'consultation', label: { ar: 'استشارة مجانية', en: 'Free consultation' } },
  whatsapp: { id: 'whatsapp', label: { ar: 'واتساب', en: 'WhatsApp' } },
} satisfies Record<string, FlowChipDef>

export const flowNodes: FlowNode[] = [
  {
    id: 'services',
    triggers: {
      ar: ['خدمات', 'الخدمات', 'ماذا تقدمون', 'ماذا تعملون', 'وش تسوون', 'تقدمون', 'حلول', 'ماذا تبنون'],
      en: ['service', 'services', 'what do you do', 'what do you offer', 'offerings', 'solutions', 'what can you build', 'capabilities'],
    },
    answer: {
      ar: 'نبني عبر المجال الرقمي الكامل — اختر ما يناسبك:\n• مواقع وحضور رقمي\n• متاجر إلكترونية (مدى، آبل باي، تابي، تمارا)\n• تطبيقات ويب وبوابات ولوحات تحكم\n• تطبيقات جوال (iOS وأندرويد وFlutter)\n• أنظمة أعمال — CRM وERP ومخزون وموارد بشرية\n• السحابة والبنية التحتية\n• حلول ذكاء اصطناعي — روبوتات محادثة وأتمتة وتعلم آلي\n• نمو رقمي — SEO وسوشيال ومحتوى\nماذا تريد أن تبني؟',
      en: 'We build across the full digital stack — pick what fits:\n• Websites & digital presence\n• E-commerce stores (Mada, Apple Pay, Tabby, Tamara)\n• Web apps, portals & dashboards\n• Mobile apps (iOS, Android, Flutter)\n• Business systems — CRM, ERP, inventory, HR\n• Cloud & infrastructure\n• AI solutions — chatbots, automation, ML\n• Digital growth — SEO, social, content\nWhat are you building?',
    },
    chips: [chip.websites, chip.ecommerce, chip.webapps, chip.mobile, chip.systems, chip.ai, chip.cloud, chip.growth],
  },
  {
    id: 'digital-presence',
    triggers: {
      ar: ['موقع', 'موقع شركة', 'موقع الكتروني', 'صفحة هبوط', 'لاندنق', 'تصميم موقع', 'هوية', 'براندنق', 'معرض اعمال', 'موقع عقاري', 'موقع تعليمي', 'صيانة موقع', 'اعادة تصميم'],
      en: ['website', 'web site', 'company website', 'landing page', 'corporate site', 'portfolio site', 'website redesign', 'website maintenance', 'real estate website', 'web design', 'online presence'],
    },
    answer: {
      ar: 'نصمم مواقع سريعة ثنائية اللغة (عربي/إنجليزي بنظام RTL) — مواقع شركات ومؤسسية وصفحات هبوط ومعارض أعمال ومواقع عقارية ومطاعم — جاهزة لمحركات البحث وسهلة على فريقك أن يملكها ويحدّثها.\nتريد تقدير سعر للموقع أو استشارة؟',
      en: 'We design fast, bilingual (Arabic/English, RTL-ready) websites — business, corporate, landing pages, portfolios, real estate and restaurant sites — SEO-ready and easy for your team to own and update.\nWant a website estimate or a quick consultation?',
    },
    chips: [chip.ecommerce, chip.pricing, chip.consultation],
  },
  {
    id: 'ecommerce',
    triggers: {
      ar: ['متجر', 'متجر الكتروني', 'تجارة الكترونية', 'بيع اونلاين', 'مدى', 'تابي', 'تمارا', 'آبل باي', 'بوابة دفع', 'منتجات', 'سلة'],
      en: ['ecommerce', 'e-commerce', 'online store', 'online shop', 'sell online', 'shopify', 'mada', 'apple pay', 'tabby', 'tamara', 'payment gateway', 'checkout'],
    },
    answer: {
      ar: 'نبني متاجر إلكترونية جاهزة للخليج مع مدى وآبل باي وتابي/تمارا (الدفع المؤجل) وفوترة ZATCA الإلكترونية — سريعة وثنائية اللغة ومصممة للتحويل.\nتريد تقدير سعر للمتجر أو استشارة مجانية؟',
      en: 'We build Gulf-ready online stores with Mada, Apple Pay, Tabby/Tamara (BNPL) and ZATCA e-invoicing — fast, bilingual and built to convert.\nWant a store estimate or a free consultation?',
    },
    chips: [chip.pricing, chip.consultation, chip.services],
  },
  {
    id: 'interactive-web-applications',
    triggers: {
      ar: ['تطبيق ويب', 'لوحة تحكم', 'داشبورد', 'بوابة', 'بورتال', 'حجوزات', 'منصة', 'نظام دخول', 'بوابة عملاء', 'saas', 'منصة حجز'],
      en: ['web app', 'web application', 'dashboard', 'portal', 'client portal', 'booking platform', 'saas', 'mvp', 'admin panel', 'internal tool', 'custom app'],
    },
    answer: {
      ar: 'نبني تطبيقات ويب مخصصة وبوابات عملاء ولوحات تحكم ومنصات حجز وMVP لمنصات SaaS — الأدوات التي يدخل إليها فريقك وعملاؤك فعليًا.\nأخبرني بالعملية التي تريد أتمتتها أو الأداة التي تحتاجها.',
      en: 'We build custom web apps, client portals, admin dashboards, booking platforms and SaaS MVPs — the tools your team and customers actually log into.\nTell me what you need to build or automate.',
    },
    chips: [chip.mobile, chip.consultation, chip.services],
  },
  {
    id: 'mobile-app-development',
    triggers: {
      ar: ['تطبيق جوال', 'تطبيق موبايل', 'ايفون', 'اندرويد', 'فلاتر', 'react native', 'تطبيق توصيل', 'تطبيق حجز', 'تطبيق عملاء', 'app store', 'متجر التطبيقات'],
      en: ['mobile app', 'app development', 'ios app', 'android app', 'flutter', 'react native', 'cross platform', 'pwa', 'delivery app', 'booking app', 'app store'],
    },
    answer: {
      ar: 'نطوّر تطبيقات جوال — iOS وأندرويد ومتعددة المنصات (Flutter/React Native) وتطبيقات ويب تقدمية (PWA)، إضافة لتطبيقات عملاء وحجز وتوصيل مع خلفية سحابية. من MVP إلى منظومة تطبيقات كاملة.\nما فكرة تطبيقك؟',
      en: 'We build mobile apps — iOS, Android, cross-platform (Flutter/React Native), PWAs, plus customer, booking and delivery apps with a cloud backend. From MVP to a full app ecosystem.\nWhat’s your app idea?',
    },
    chips: [chip.consultation, chip.pricing, chip.services],
  },
  {
    id: 'business-systems-development',
    triggers: {
      ar: ['crm', 'erp', 'نظام', 'انظمة', 'أنظمة', 'مخزون', 'فواتير', 'فاتورة', 'مبيعات', 'محاسبة', 'موارد بشرية', 'hr', 'إدارة عملاء', 'عمليات', 'نقاط بيع', 'pos', 'طلبات', 'سلسلة امداد'],
      en: ['crm', 'erp', 'business system', 'inventory', 'invoice', 'invoicing', 'sales system', 'accounting', 'hr system', 'operations', 'pos', 'order management', 'workflow', 'automation system', 'supply chain'],
    },
    answer: {
      ar: 'نبني الأنظمة التي تدير عملياتك — CRM وERP ومخزون ومبيعات وطلبات وموارد بشرية وتكامل محاسبة وأتمتة سير العمل وواجهات API — مصممة حول طريقة عملك الفعلية.\nأي عملية تريد تنظيمها أو أتمتتها؟',
      en: 'We build the systems that run your operations — CRM, ERP, inventory, sales, orders, HR, accounting integration, workflow automation and APIs — designed around how you actually work.\nWhat process do you want to streamline or automate?',
    },
    chips: [chip.ai, chip.consultation, chip.services],
  },
  {
    id: 'cloud-infrastructure',
    triggers: {
      ar: ['سحابة', 'استضافة', 'هوستنق', 'سيرفر', 'خادم', 'ترحيل', 'نشر', 'قاعدة بيانات', 'نسخ احتياطي', 'امان', 'devops', 'اداء', 'بنية تحتية'],
      en: ['cloud', 'hosting', 'server', 'migration', 'deployment', 'devops', 'database', 'backup', 'security', 'performance', 'infrastructure', 'scalable', 'aws', 'vercel'],
    },
    answer: {
      ar: 'نتولّى السحابة والبنية التحتية — استضافة وترحيل وDevOps وقواعد بيانات ونسخ احتياطي وأمان وتحسين أداء وبنية قابلة للتوسع — لتبقى أنظمتك سريعة وموثوقة.\nبماذا تحتاج مساعدة في الاستضافة أو التوسع؟',
      en: 'We handle cloud & infrastructure — hosting, migration, DevOps, databases, backups, security, performance and scalable architecture — so your systems stay fast and reliable.\nWhat do you need help hosting or scaling?',
    },
    chips: [chip.consultation, chip.systems, chip.services],
  },
  {
    id: 'ai-powered-solutions',
    triggers: {
      ar: ['ذكاء اصطناعي', 'الذكاء الاصطناعي', 'اتمتة', 'أتمتة', 'بوت', 'شات بوت', 'روبوت محادثة', 'مساعد ذكي', 'وكيل', 'تعلم الي', 'تعلم آلي', 'nlp', 'تحليل بيانات'],
      en: ['ai', 'artificial intelligence', 'automation', 'automate', 'chatbot', 'bot', 'ai assistant', 'agent', 'machine learning', 'ml', 'nlp', 'ai content'],
    },
    answer: {
      ar: 'حلولنا بالذكاء الاصطناعي تشمل روبوتات المحادثة والمساعدين (مثل هذا المساعد)، والأتمتة، وأنظمة المحتوى، ولوحات التقارير، ومعالجة اللغة الطبيعية، ونماذج التعلم الآلي — ذكاء اصطناعي عملي يقلّل العمل المتكرر، وهو جزء من رؤيتنا لبناء "ذكاء الأعمال".\nما العملية التي تريد أتمتتها؟',
      en: 'Our AI solutions include chatbots & assistants (like this one), automation, AI content systems, reporting dashboards, NLP and machine-learning models — practical AI that cuts repetitive work, and part of our vision for the “AGI of business.”\nWhat would you automate?',
    },
    chips: [chip.vision, chip.consultation, chip.services],
  },
  {
    id: 'digital-growth-support',
    triggers: {
      ar: ['تسويق', 'سيو', 'seo', 'سوشيال', 'وسائل التواصل', 'انستقرام', 'تيك توك', 'سناب', 'اعلانات', 'محتوى', 'عملاء محتملين', 'تحويل', 'بريد', 'هوية بصرية', 'نمو'],
      en: ['marketing', 'seo', 'social media', 'social', 'tiktok', 'snapchat', 'instagram ads', 'paid ads', 'content', 'lead generation', 'conversion', 'email marketing', 'brand identity', 'growth'],
    },
    answer: {
      ar: 'ننمّي وصولك — SEO وإدارة وسائل التواصل وصفحات إعلانات مدفوعة وأنظمة محتوى وتوليد عملاء محتملين وتحسين التحويل وأتمتة البريد والهوية البصرية — بالعربية أولًا للخليج.\nما هدف النمو الذي تركّز عليه؟',
      en: 'We grow your reach — SEO, social media management, paid landing pages, content systems, lead generation, conversion optimization, email automation and brand identity — Arabic-first for the Gulf.\nWhat growth goal are you focused on?',
    },
    chips: [chip.consultation, chip.services, chip.pricing],
  },
  {
    id: 'restaurant-qr-menu',
    triggers: {
      ar: ['قائمة', 'منيو', 'قائمة طعام', 'مطعم', 'كافيه', 'كوفي', 'qr', 'كيو ار', 'باركود', 'طلب من الطاولة'],
      en: ['qr menu', 'menu', 'restaurant', 'cafe', 'coffee shop', 'digital menu', 'qr code menu', 'table ordering'],
    },
    answer: {
      ar: 'نظام قائمة QR ثنائي اللغة يتيح للمطاعم والكافيهات عرض القوائم واستقبال الطلبات وقبول الدفع من رمز QR بسيط — دون الحاجة لتطبيق.\nتريد رؤيته أو الحصول على عرض سعر؟',
      en: 'Our bilingual QR menu system lets restaurants & cafés show menus, take orders and accept payments from a simple QR code — no app needed.\nWant to see it or get a quote?',
    },
    chips: [chip.consultation, chip.pricing, chip.services],
  },
  {
    id: 'pricing',
    triggers: {
      ar: ['سعر', 'السعر', 'اسعار', 'أسعار', 'كم', 'تكلفة', 'التكلفة', 'كلفة', 'باقة', 'باقات', 'ميزانية', 'بكم', 'عرض سعر'],
      en: ['price', 'pricing', 'cost', 'how much', 'budget', 'package', 'packages', 'quote', 'rates', 'fees'],
    },
    answer: {
      ar: 'أسعارنا واضحة وبنطاق ثابت — باقات بحجم العمل تُعرض كـ "تبدأ من" على صفحة الأسعار. كل مشروع يبدأ باستشارة مجانية (ومعاينة ديمو مجانية عند توفّر تفاصيل كافية). السعر النهائي يعتمد على النطاق والمزايا والتكاملات واللغات والجدول الزمني.\nشارك تفاصيل مشروعك ونجهّز لك عرضًا مناسبًا.',
      en: 'Our pricing is transparent and fixed-scope — packages sized to the work, shown as clear “starts from” tiers on our pricing page. Every project begins with a free consultation (and a free demo preview when there’s enough detail). The final price depends on scope, features, integrations, languages and timeline.\nShare your project details and we’ll prepare a tailored quote.',
    },
    chips: [chip.consultation, chip.services, chip.process],
  },
  {
    id: 'about',
    triggers: {
      ar: ['من نحن', 'من انتم', 'من أنتم', 'عن الشركة', 'كلاود توبيا', 'cloudtopia', 'تعريف', 'شركتكم', 'وكالة'],
      en: ['about', 'who are you', 'what is cloudtopia', 'company', 'tell me about', 'who is cloudtopia', 'agency'],
    },
    answer: {
      ar: 'CloudTopia وكالة رقمية خليجية ثنائية اللغة (عربي + إنجليزي). نثبّت النطاق والسعر والملكية قبل البناء، ثم نسلّم مواقع ومتاجر وتطبيقات وأنظمة أعمال وحلول سحابة وذكاء اصطناعي — مع تسليم كامل لتملك كل شيء. تأسست عام 2024 ونخدم العالم العربي من مقرّينا في تركيا وعُمان.\nتحب تعرف أكثر عن المؤسس أو رؤيتنا؟',
      en: 'CloudTopia is a Gulf-first, bilingual (Arabic + English) digital agency. We fix scope, pricing and ownership before we build, then deliver websites, stores, apps, business systems, cloud and AI — handed over for you to fully own. Founded in 2024, serving the Arab world from our Türkiye and Oman hubs.\nWant to know more about the founder or our vision?',
    },
    chips: [chip.founder, chip.vision, chip.locations, chip.services],
  },
  {
    id: 'founder',
    triggers: {
      ar: ['المؤسس', 'مؤسس', 'صاحب الشركة', 'من اسس', 'من أسس', 'مدير', 'القائد', 'محمد شهم', 'شهم'],
      en: ['founder', 'who founded', 'who leads', 'ceo', 'owner', 'leader', 'mohamad shahm', 'mohammad shahm', 'shahm'],
    },
    answer: {
      ar: 'مؤسس وقائد CloudTopia هو محمد شهم — المؤسّس والمهندس الرئيسي، مهندس نظم معلومات، بخبرة عقد في بناء منصات الويب والتجارة الإلكترونية والتجارب ثنائية اللغة لشركات الخليج. رؤيته بناء "ذكاء الأعمال" (AGI of business) للعالم العربي.',
      en: 'CloudTopia was founded and is led by Mohamad Shahm (محمد شهم) — Founder & Lead Engineer and an Information Systems Engineer, with a decade of building web platforms, e-commerce and bilingual experiences for Gulf businesses. His vision is to build the “AGI of business” for the Arab world.',
    },
    chips: [chip.vision, chip.about, chip.services],
  },
  {
    id: 'vision',
    triggers: {
      ar: ['رؤية', 'الرؤية', 'هدف', 'الهدف', 'مستقبل', 'المستقبل', 'طموح', 'ذكاء الاعمال', 'ذكاء الأعمال', 'رسالة', 'مهمة'],
      en: ['vision', 'mission', 'goal', 'future', 'ambition', 'agi', 'agi of business', 'where are you going'],
    },
    answer: {
      ar: 'رؤيتنا هي البناء نحو "ذكاء الأعمال" (AGI of business) في العالم العربي: أنظمة ذكية ومترابطة تدير جوهر الشركة. نبدأ بحضور رقمي قوي، ثم تطبيقات يستخدمها فريقك وعملاؤك، ثم أنظمة CRM/ERP، وأخيرًا طبقة ذكاء اصطناعي تجعل العمل يدير نفسه تدريجيًا — بلغتك وبما يناسب سوقك.',
      en: 'Our vision is to build toward the “AGI of business” for the Arab world: intelligent, connected systems that run the core of a company. We start with a strong digital presence, then apps your team and customers use, then CRM/ERP systems, and finally an AI layer so the business increasingly runs itself — in your language, adapted to your market.',
    },
    chips: [chip.ai, chip.founder, chip.consultation],
  },
  {
    id: 'locations',
    triggers: {
      ar: ['اين', 'أين', 'وين', 'مكان', 'مقر', 'الدول', 'تركيا', 'عمان', 'سلطنة عمان', 'الخليج', 'تخدمون', 'فروع', 'السعودية', 'الامارات'],
      en: ['where', 'location', 'based', 'country', 'countries', 'turkey', 'türkiye', 'oman', 'gulf', 'region', 'do you serve', 'saudi', 'uae'],
    },
    answer: {
      ar: 'نعمل من مقرّين: تركيا (تخدم تركيا وبلاد الشام) وعُمان (تخدم عُمان والخليج). نغطّي العالم العربي بالكامل — السعودية والإمارات وقطر والكويت والبحرين وعُمان والعراق والأردن ومصر وغيرها — بالعربية والإنجليزية، ويتابع معك الفريق الأقرب لمنطقتك.\nمن أي دولة تتواصل؟',
      en: 'We work from two hubs — Türkiye (serving Turkey & the Levant) and Oman (serving Oman & the Gulf) — covering the whole Arab world: Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, Iraq, Jordan, Egypt and more, in Arabic and English, with the nearest team supporting you.\nWhich country are you contacting from?',
    },
    chips: [chip.contact, chip.consultation, chip.about],
  },
  {
    id: 'process',
    triggers: {
      ar: ['كيف تعملون', 'كيف نبدأ', 'خطوات', 'مراحل', 'آلية العمل', 'طريقة العمل', 'كم يستغرق', 'مدة', 'الوقت', 'تسليم'],
      en: ['how do you work', 'process', 'how to start', 'steps', 'stages', 'how long', 'timeline', 'methodology', 'delivery'],
    },
    answer: {
      ar: 'طريقتنا أربع خطوات واضحة: 1) الاستكشاف وتحديد النطاق (نثبّت النطاق وعرضًا مكتوبًا)، 2) التجربة والمحتوى والهندسة، 3) البناء والتكاملات وضمان الجودة، 4) الإطلاق والتسليم والدعم — مع تسليم الملكية الكاملة لك. المدة تعتمد على حجم المشروع.\nجاهز نبدأ بالاستشارة؟',
      en: 'Our approach is four clear steps: 1) Discovery & scope (we fix scope and a written proposal), 2) UX, content & architecture, 3) Build, integrations & QA, 4) Launch, handoff & support — with full ownership handed to you. Timelines depend on project size.\nReady to start with a consultation?',
    },
    chips: [chip.consultation, chip.pricing, chip.services],
  },
  {
    id: 'industries',
    triggers: {
      ar: ['قطاع', 'قطاعات', 'مجال', 'صناعة', 'عيادة', 'مطاعم', 'عقار', 'تعليم', 'متجر', 'لوجستيات', 'حكومي'],
      en: ['industry', 'industries', 'sector', 'vertical', 'clinic', 'healthcare', 'restaurants', 'real estate', 'education', 'retail', 'logistics', 'government'],
    },
    answer: {
      ar: 'نعمل عبر قطاعات كثيرة — التجارة الإلكترونية والتجزئة، المطاعم والضيافة، العقار، الرعاية الصحية، التعليم، التقنية المالية، القانون، اللوجستيات، الإنشاءات، الخدمات المهنية، والقطاع الحكومي.\nما مجال نشاطك؟',
      en: 'We work across many sectors — e-commerce & retail, restaurants & hospitality, real estate, healthcare, education, fintech, legal, logistics, construction, professional services and government.\nWhat’s your industry?',
    },
    chips: [chip.services, chip.consultation, chip.portfolio],
  },
  {
    id: 'portfolio',
    triggers: {
      ar: ['اعمال', 'أعمال', 'مشاريع', 'نماذج', 'سابقة اعمال', 'معرض', 'امثلة', 'أمثلة'],
      en: ['portfolio', 'projects', 'examples', 'case study', 'case studies', 'previous work', 'samples', 'your work'],
    },
    answer: {
      ar: 'لدينا أعمال متنوعة عبر المواقع والمتاجر وتطبيقات الويب والجوال وأنظمة الأعمال. يمكنك تصفّح قسم الأعمال في الموقع، وإذا أخبرتني بمجالك سأذكر لك أمثلة أقرب لاحتياجك.\nما مجال نشاطك؟',
      en: 'We have varied work across websites, stores, web & mobile apps and business systems. You can browse the work section on the site, and if you tell me your field I’ll point to examples closest to your needs.\nWhat’s your industry?',
    },
    chips: [chip.services, chip.consultation, chip.contact],
  },
  {
    id: 'contact',
    triggers: {
      ar: ['تواصل', 'اتصال', 'رقم', 'ايميل', 'بريد', 'انستقرام', 'انستغرام', 'كيف اتواصل', 'كيف أتواصل', 'ايميلكم'],
      en: ['contact', 'reach', 'phone', 'email', 'instagram', 'get in touch', 'talk to', 'speak to someone'],
    },
    answer: {
      ar: 'أسرع طريقة هي واتساب — تركيا: ‎+90 501 151 11 16، عُمان: ‎+968 9588 6393. البريد: info@cloudtopia.net، وإنستغرام @thecloudtopia.\nأفتح لك واتساب أو نبدأ باستشارة سريعة؟',
      en: 'The fastest way is WhatsApp — Türkiye: +90 501 151 11 16, Oman: +968 9588 6393. Email: info@cloudtopia.net, Instagram @thecloudtopia.\nShall I open WhatsApp, or start a quick consultation?',
    },
    chips: [chip.whatsapp, chip.consultation, chip.locations],
  },
  {
    id: 'consultation',
    triggers: {
      ar: ['استشارة', 'استشاره', 'عرض سعر', 'اطلب', 'أطلب', 'ابدأ مشروع', 'أبدأ مشروع', 'تواصلوا معي', 'اريد ابدأ', 'ديمو', 'معاينة'],
      en: ['consultation', 'consult', 'get started', 'start a project', 'request', 'quote me', 'i want to start', 'free consultation', 'demo'],
    },
    answer: {
      ar: 'ممتاز! شارك بعض التفاصيل وسنجهّز لك خطة وعرضًا مناسبين (ومعاينة ديمو مجانية عند توفّر تفاصيل كافية)، ونوصلك بالفريق الأقرب لمنطقتك.',
      en: 'Great! Share a few details and we’ll prepare a tailored plan and quote (plus a free demo preview when there’s enough detail), then connect you with the team closest to your region.',
    },
    action: 'lead-form',
    chips: [chip.whatsapp, chip.services],
  },
  {
    id: 'whatsapp',
    triggers: {
      ar: ['واتساب', 'واتس', 'واتس اب', 'وتساب'],
      en: ['whatsapp', 'whats app', 'wa', 'message you'],
    },
    answer: {
      ar: 'تمام — يمكنك مراسلتنا مباشرة على واتساب وسيردّ عليك الفريق الأقرب لك.',
      en: 'Sure — you can message us directly on WhatsApp and the nearest team will reply.',
    },
    action: 'whatsapp',
    chips: [chip.consultation, chip.services],
  },
  {
    id: 'greeting',
    triggers: {
      ar: ['السلام', 'سلام', 'مرحبا', 'مرحبًا', 'اهلا', 'أهلا', 'هلا', 'صباح', 'مساء', 'هاي'],
      en: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'greetings'],
    },
    patterns: [/^\s*(hi|hello|hey|yo)\b/i],
    answer: {
      ar: 'أهلًا وسهلًا! أنا مساعد CloudTopia. كيف أقدر أساعدك اليوم؟',
      en: 'Hello there! I’m CloudTopia’s assistant. How can I help you today?',
    },
    chips: [chip.services, chip.pricing, chip.about],
  },
  {
    id: 'thanks',
    triggers: {
      ar: ['شكرا', 'شكرًا', 'مشكور', 'تسلم', 'يعطيك العافية'],
      en: ['thanks', 'thank you', 'thx', 'appreciate it'],
    },
    answer: {
      ar: 'العفو! أنا هنا إن احتجت أي شيء آخر. تحب نكمل بخطوة عملية؟',
      en: 'You’re welcome! I’m here if you need anything else. Want to take a practical next step?',
    },
    chips: [chip.consultation, chip.services, chip.whatsapp],
  },
]
