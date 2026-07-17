import type { SearchKeywordsRecord } from './index'

/**
 * Services hub + pillar pages (/services/<pillar>).
 * Generated from the crafted search-intent workflow; hand-edit freely —
 * this file is the source of truth (the generator is not re-run in CI).
 */
export const servicesPillarsSearchKeywords: Record<string, SearchKeywordsRecord> = {
    '/services': {
    en: {
        heading: "What businesses search for when they land here",
        intro: "This page is the map of everything CloudTopia builds — so it naturally answers the broadest searches: companies comparing digital partners, scoping a first project, or looking for one team that covers web, cloud, and AI across the Gulf.",
        groups: [
            { label: "Finding a partner", phrases: ["software development company in the GCC", "bilingual Arabic English website agency", "IT company for small business digital transformation", "digital agency for websites apps and marketing"] },
            { label: "Scoping a project", phrases: ["website design packages and prices", "how much does a business website cost in Saudi Arabia", "custom software vs off the shelf for small business", "what services do I need to take my business online"] },
            { label: "Beyond the website", phrases: ["ERP and CRM implementation company", "cloud migration services for SMEs", "AI solutions for business in the Gulf", "social media management and content packages"] },
        ],
    },
    ar: {
        heading: "إذا وصلت إلى هنا بأحد هذه الأسئلة فأنت في المكان الصحيح",
        intro: "هذه الصفحة تجمع كل خدماتنا في مكان واحد، ولذلك تجيب عن أوسع الأسئلة: شركات تقارن بين مزودي الخدمات الرقمية، أو تحدد نطاق مشروعها الأول، أو تبحث عن فريق واحد يغطي الويب والسحابة والذكاء الاصطناعي.",
        groups: [
            { label: "البحث عن شريك تقني", phrases: ["شركة تصميم مواقع في السعودية", "افضل شركة تقنية معلومات للشركات الصغيرة", "شركة تحول رقمي في الخليج", "وكالة رقمية تصميم وتسويق وبرمجة"] },
            { label: "تحديد المشروع وتكلفته", phrases: ["اسعار تصميم المواقع الالكترونية", "باقات تصميم مواقع للشركات", "ماذا احتاج لنقل نشاطي التجاري الى الانترنت"] },
            { label: "ما بعد الموقع", phrases: ["شركة تطبيق انظمة ERP و CRM", "خدمات سحابية للشركات الصغيرة والمتوسطة", "حلول ذكاء اصطناعي للاعمال"] },
        ],
    },
    },
    '/services/ai-automation': {
    en: {
        heading: "Searches this page answers",
        intro: "Most teams find this page while trying to kill repetitive work — invoices retyped, emails triaged by hand, data moved between systems. These are the searches that lead decision-makers here.",
        groups: [
            { label: "By the problem", phrases: ["automate repetitive business tasks with AI", "AI workflow automation for small business", "automate data entry between systems", "automate invoice processing with AI", "reduce manual work in back office operations"] },
            { label: "By solution & market", phrases: ["AI automation company in the Gulf", "business process automation services Saudi Arabia", "AI automation agency for Arabic speaking businesses", "workflow automation consultant in UAE"] },
            { label: "Costs & feasibility", phrases: ["how much does AI automation cost for a business", "is AI automation worth it for small companies", "ROI of automating business workflows", "AI automation examples for SMEs"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه من يريد الأتمتة",
        intro: "معظم من يصل إلى هذه الصفحة يبحث عن طريقة للتخلص من عمل يدوي متكرر: فواتير تُدخل يدوياً، بيانات تُنقل بين الأنظمة، رسائل تُصنف واحدة واحدة. هذه أشهر عمليات البحث في السوق الخليجي حول هذا الموضوع.",
        groups: [
            { label: "حسب المشكلة", phrases: ["اتمتة المهام المتكررة بالذكاء الاصطناعي", "اتمتة العمليات الادارية في الشركات", "برنامج يدخل البيانات تلقائيا بين الانظمة", "اتمتة معالجة الفواتير", "تقليل العمل اليدوي في الشركة"] },
            { label: "حسب الحل والسوق", phrases: ["شركة اتمتة بالذكاء الاصطناعي في الخليج", "خدمات اتمتة العمليات في السعودية", "اتمتة سير العمل للشركات الصغيرة", "حلول ذكاء اصطناعي باللغة العربية للشركات"] },
            { label: "التكلفة والجدوى", phrases: ["كم تكلفة اتمتة العمليات بالذكاء الاصطناعي", "هل الاتمتة مناسبة للشركات الصغيرة", "امثلة على اتمتة الاعمال بالذكاء الاصطناعي", "العائد من اتمتة العمليات"] },
        ],
    },
    },
    '/services/ai-business-assistants': {
    en: {
        heading: "If any of these were your search, keep reading",
        intro: "An AI assistant that actually knows your business — your documents, your policies, your systems — is what people are really looking for when they type these queries. That is exactly what this page covers.",
        groups: [
            { label: "By what you want the assistant to do", phrases: ["AI assistant trained on company documents", "internal AI assistant for employees", "AI assistant that answers from our knowledge base", "AI copilot for business operations", "custom GPT style assistant for my company"] },
            { label: "By language & market", phrases: ["Arabic speaking AI assistant for business", "bilingual AI assistant Arabic English", "AI assistant development company in the Gulf", "enterprise AI assistant Saudi Arabia"] },
            { label: "Practical questions", phrases: ["how to build an AI assistant for my company", "cost of a custom AI business assistant", "AI assistant with access to company data securely", "difference between chatbot and AI business assistant"] },
        ],
    },
    ar: {
        heading: "أسئلة تقود أصحاب الأعمال إلى هنا",
        intro: "من يبحث عن هذه العبارات يريد مساعداً ذكياً يعرف شركته فعلاً: مستنداتها وسياساتها وأنظمتها، ويجيب موظفيها بالعربية والإنجليزية. هذا بالضبط موضوع هذه الصفحة.",
        groups: [
            { label: "حسب دور المساعد", phrases: ["مساعد ذكاء اصطناعي مدرب على ملفات الشركة", "مساعد ذكي داخلي للموظفين", "ذكاء اصطناعي يجيب من قاعدة معرفة الشركة", "بناء مساعد ذكي خاص بشركتي"] },
            { label: "حسب اللغة والسوق", phrases: ["مساعد ذكاء اصطناعي يتكلم عربي", "مساعد ذكي ثنائي اللغة للشركات", "شركة تطوير مساعدات ذكاء اصطناعي في الخليج", "حلول مساعد ذكي للشركات في السعودية"] },
            { label: "أسئلة عملية", phrases: ["كم تكلفة مساعد ذكاء اصطناعي خاص", "الفرق بين الشات بوت والمساعد الذكي للاعمال", "هل بيانات الشركة آمنة مع الذكاء الاصطناعي", "كيف اربط الذكاء الاصطناعي بانظمة شركتي"] },
        ],
    },
    },
    '/services/ai-chatbots': {
    en: {
        heading: "What people type before they find this page",
        intro: "Chatbot searches usually start with a channel — the website, WhatsApp, Instagram — and a worry about whether the bot can handle Arabic properly. Both are answered here, with builds proven across the Gulf.",
        groups: [
            { label: "By channel", phrases: ["AI chatbot for website", "WhatsApp chatbot for business", "Instagram DM automation chatbot", "chatbot that answers customers 24/7", "add live chat with AI to my website"] },
            { label: "By language & quality", phrases: ["Arabic chatbot for customer service", "bilingual chatbot Arabic and English", "chatbot that understands Gulf Arabic dialect", "AI chatbot development company in the GCC"] },
            { label: "Costs & comparisons", phrases: ["how much does a WhatsApp chatbot cost", "custom AI chatbot vs chatbot builder platforms", "chatbot pricing for small business", "chatbot that hands over to a human agent"] },
        ],
    },
    ar: {
        heading: "أكثر ما يُبحث عنه في هذا الموضوع",
        intro: "البحث عن روبوتات المحادثة يبدأ غالباً من القناة: الموقع أو الواتساب أو انستقرام، ومن سؤال جوهري: هل يفهم البوت العربية فعلاً؟ هذه الصفحة تجيب عن الاثنين.",
        groups: [
            { label: "حسب القناة", phrases: ["شات بوت للموقع الالكتروني", "بوت واتساب للرد على العملاء", "رد تلقائي على رسائل انستقرام", "بوت يرد على العملاء 24 ساعة"] },
            { label: "حسب اللغة والجودة", phrases: ["شات بوت عربي لخدمة العملاء", "بوت محادثة يفهم اللهجة الخليجية", "شات بوت ثنائي اللغة عربي انجليزي", "شركة برمجة شات بوت في الخليج"] },
            { label: "التكلفة والمقارنات", phrases: ["كم سعر بوت الواتساب للشركات", "الفرق بين الشات بوت الجاهز والمخصص", "اسعار روبوتات المحادثة للشركات الصغيرة", "بوت يحول المحادثة لموظف حقيقي"] },
        ],
    },
    },
    '/services/ai-content-systems': {
    en: {
        heading: "Searches that lead content teams here",
        intro: "Marketing teams searching for these terms want more than a writing tool — they want a repeatable content system that keeps brand voice consistent in both Arabic and English. That is the system this page describes.",
        groups: [
            { label: "By content need", phrases: ["AI content generation system for business", "automate social media content creation", "AI blog writing workflow for companies", "product description generation at scale", "AI content pipeline with human review"] },
            { label: "Bilingual & brand", phrases: ["AI content in Arabic and English", "AI that writes in our brand voice", "Arabic content generation for marketing", "bilingual content system for GCC brands"] },
            { label: "Evaluation questions", phrases: ["is AI generated content good for SEO", "AI content tools vs custom content system", "how to scale content production with a small team", "cost of an AI content workflow"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه فرق التسويق قبل الوصول إلى هنا",
        intro: "من يكتب هذه العبارات في البحث لا يريد أداة كتابة فحسب، بل نظام محتوى متكامل ينتج بالعربية والإنجليزية بنَفَس العلامة التجارية نفسه. هذا ما تشرحه هذه الصفحة.",
        groups: [
            { label: "حسب نوع المحتوى", phrases: ["انشاء محتوى بالذكاء الاصطناعي للشركات", "اتمتة محتوى السوشيال ميديا", "كتابة مقالات بالذكاء الاصطناعي باحترافية", "توليد اوصاف المنتجات للمتاجر الالكترونية"] },
            { label: "المحتوى العربي والهوية", phrases: ["محتوى عربي بالذكاء الاصطناعي بجودة عالية", "ذكاء اصطناعي يكتب باسلوب علامتنا التجارية", "نظام محتوى ثنائي اللغة للعلامات الخليجية", "كتابة محتوى تسويقي بالعربية والانجليزية"] },
            { label: "أسئلة التقييم", phrases: ["هل محتوى الذكاء الاصطناعي مفيد للسيو", "الفرق بين ادوات الكتابة ونظام المحتوى المخصص", "كيف انتج محتوى كثير بفريق صغير", "كم تكلفة نظام محتوى بالذكاء الاصطناعي"] },
        ],
    },
    },
    '/services/ai-crm-assistants': {
    en: {
        heading: "The searches behind this page",
        intro: "Sales leaders find this page while hunting for a way to make their CRM work for the team instead of the other way around — auto-logged calls, drafted follow-ups, leads scored without spreadsheets. These are their searches.",
        groups: [
            { label: "By sales pain", phrases: ["AI assistant for CRM data entry", "automatically log sales calls and emails to CRM", "AI lead scoring for sales teams", "AI that writes follow up emails from CRM data", "stop salespeople wasting time on CRM admin"] },
            { label: "By platform & market", phrases: ["AI assistant integration for existing CRM", "CRM automation services in the Gulf", "AI sales assistant for Arabic speaking teams", "CRM AI consultant Saudi Arabia"] },
            { label: "Deciding & comparing", phrases: ["best way to add AI to our CRM", "cost of AI CRM automation", "AI CRM assistant vs hiring a sales admin", "does AI improve sales pipeline follow up"] },
        ],
    },
    ar: {
        heading: "إذا كان هذا بحثك فهذه صفحتك",
        intro: "مدراء المبيعات يصلون إلى هنا وهم يبحثون عن طريقة تجعل نظام إدارة العملاء يخدم الفريق بدل أن يستهلك وقته: تسجيل تلقائي للمكالمات، متابعات جاهزة، وترتيب للعملاء المحتملين دون جداول يدوية.",
        groups: [
            { label: "حسب مشكلة المبيعات", phrases: ["ادخال بيانات العملاء تلقائيا في CRM", "ذكاء اصطناعي يكتب رسائل المتابعة للعملاء", "تصنيف العملاء المحتملين بالذكاء الاصطناعي", "تسجيل المكالمات والايميلات في نظام العملاء تلقائيا"] },
            { label: "حسب النظام والسوق", phrases: ["ربط الذكاء الاصطناعي بنظام CRM الحالي", "اتمتة نظام ادارة العملاء في السعودية", "مساعد مبيعات ذكي يدعم اللغة العربية", "شركة حلول CRM بالذكاء الاصطناعي في الخليج"] },
            { label: "المفاضلة والقرار", phrases: ["افضل طريقة لاضافة الذكاء الاصطناعي للمبيعات", "كم تكلفة اتمتة نظام ادارة العملاء", "هل الذكاء الاصطناعي يحسن متابعة العملاء", "مساعد ذكي للمبيعات ام موظف اداري"] },
        ],
    },
    },
    '/services/ai-powered-customer-support': {
    en: {
        heading: "What support teams search for when tickets pile up",
        intro: "These searches usually start on a bad day — a flooded inbox, long response times, night shifts you cannot staff. AI-powered support that answers instantly in Arabic and English is what this page delivers, built for Gulf customer expectations.",
        groups: [
            { label: "By support pain", phrases: ["AI customer support automation", "reduce customer support response time with AI", "automate answers to frequently asked questions", "24/7 customer support without night shift staff", "AI ticket triage and routing"] },
            { label: "By channel & language", phrases: ["AI customer service in Arabic", "AI support agent for WhatsApp and website", "bilingual customer support automation for GCC companies", "AI email support automation"] },
            { label: "Costs & outcomes", phrases: ["cost of AI customer support for small business", "AI support vs outsourcing a call center", "how much of customer support can AI handle", "AI customer support with human escalation"] },
        ],
    },
    ar: {
        heading: "عمليات بحث تبدأ عادةً في يوم مزدحم بالتذاكر",
        intro: "غالباً ما يبدأ هذا البحث في يوم صعب: بريد مزدحم، عملاء ينتظرون، ودوام ليلي يصعب توفيره. الدعم المدعوم بالذكاء الاصطناعي الذي يرد فوراً بالعربية والإنجليزية هو ما تقدمه هذه الصفحة.",
        groups: [
            { label: "حسب مشكلة الدعم", phrases: ["اتمتة خدمة العملاء بالذكاء الاصطناعي", "تسريع الرد على استفسارات العملاء", "رد تلقائي على الاسئلة الشائعة", "خدمة عملاء 24 ساعة بدون موظفين اضافيين", "توزيع تذاكر الدعم تلقائيا"] },
            { label: "حسب القناة واللغة", phrases: ["خدمة عملاء بالذكاء الاصطناعي باللغة العربية", "الرد الالي على العملاء في الواتساب والموقع", "دعم فني الي ثنائي اللغة لشركات الخليج", "اتمتة الرد على ايميلات العملاء"] },
            { label: "التكلفة والنتائج", phrases: ["كم تكلفة خدمة العملاء بالذكاء الاصطناعي", "الذكاء الاصطناعي ام التعاقد مع كول سنتر", "كم نسبة الاستفسارات التي يحلها الذكاء الاصطناعي", "تحويل العميل لموظف عند الحاجة"] },
        ],
    },
    },
    '/services/ai-reporting-dashboards': {
    en: {
        heading: "Searches this page answers",
        intro: "Leaders across the Gulf are replacing end-of-month spreadsheet marathons with live, AI-driven dashboards — and these are the searches that usually start that journey. If reporting still takes your team days, this page was written for you.",
        groups: [
            { label: "By what you need", phrases: ["ai reporting dashboard for business", "automated business reporting software", "real-time kpi dashboard development", "ai powered analytics dashboard", "custom management dashboard development", "sales performance dashboard with ai insights"] },
            { label: "Questions decision-makers ask", phrases: ["how to automate monthly management reports", "how much does a custom bi dashboard cost", "connect erp and crm data to one dashboard", "replace excel reports with a live dashboard", "dashboard that explains the numbers in plain language"] },
            { label: "By market", phrases: ["business intelligence company in oman", "data dashboard developers in saudi arabia", "arabic english bilingual reporting dashboard", "ai reporting solutions for gcc companies"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه أصحاب القرار قبل الوصول إلى هنا",
        intro: "كثير من الشركات في الخليج ما زالت تجمع تقاريرها يدوياً في نهاية كل شهر، ثم تبدأ بالبحث عن طريقة أذكى. هذه العبارات هي ما يكتبه المدراء عادةً قبل أن يصلوا إلى هذه الصفحة.",
        groups: [
            { label: "حسب الحاجة", phrases: ["لوحة تقارير ذكية للشركات", "أتمتة التقارير الشهرية", "لوحة مؤشرات أداء KPI", "برنامج تقارير مبيعات تلقائي", "لوحة تحكم بيانات الشركة"] },
            { label: "أسئلة يطرحها المدراء", phrases: ["كيف أربط بيانات الشركة بلوحة تحكم واحدة", "بديل الاكسل في تقارير الإدارة", "كم تكلفة تطوير لوحة تحكم للشركة", "تقارير تلقائية من نظام ERP"] },
            { label: "حسب السوق", phrases: ["شركة ذكاء اصطناعي في عمان", "تطوير لوحات بيانات في السعودية", "لوحة تقارير باللغة العربية", "حلول ذكاء الأعمال للشركات الخليجية"] },
        ],
    },
    },
    '/services/ai-website-analyzer': {
    en: {
        heading: "If you searched for any of these, you are in the right place",
        intro: "Most site owners land here after typing a worried question into Google about speed, SEO, or errors. The AI Website Analyzer answers exactly these searches — with a report you can actually act on.",
        groups: [
            { label: "By what you want checked", phrases: ["ai website analyzer", "website audit tool online", "check my website seo score", "website speed and performance test", "website health check for business sites", "scan website for technical errors"] },
            { label: "Questions site owners ask", phrases: ["why is my website not showing on google", "why is my website slow on mobile", "how do i know if my website needs a redesign", "is my website hurting my sales"] },
            { label: "By market", phrases: ["website audit service in oman", "arabic website seo analysis", "website analysis for gulf businesses", "seo audit company for gcc websites"] },
        ],
    },
    ar: {
        heading: "إذا بحثت عن أيٍّ من هذه العبارات فأنت في المكان الصحيح",
        intro: "قبل أي قرار بتطوير الموقع أو إعادة تصميمه، يبدأ أصحاب المواقع بالبحث عن أداة تشخّص المشكلة. إن كتبت يوماً إحدى هذه العبارات، فالمحلل الذكي صُمم لأجلك.",
        groups: [
            { label: "حسب ما تريد فحصه", phrases: ["فحص موقع الكتروني", "تحليل سيو الموقع", "اختبار سرعة الموقع", "فحص أخطاء الموقع التقنية", "تقييم موقع شركة"] },
            { label: "أسئلة أصحاب المواقع", phrases: ["لماذا موقعي بطيء", "هل موقعي يحتاج إعادة تصميم", "كيف اعرف مشاكل موقعي"] },
            { label: "حسب السوق", phrases: ["تحليل مواقع في عمان", "فحص سيو المواقع العربية", "أداة تحليل مواقع بالعربي", "تدقيق مواقع الشركات في الخليج"] },
        ],
    },
    },
    '/services/answer-engine-optimization': {
    en: {
        heading: "What people type before they find us",
        intro: "Search is shifting from ten blue links to one cited answer. These are the queries forward-thinking marketers in the region are already typing — and the discipline this page covers in depth.",
        groups: [
            { label: "The new search vocabulary", phrases: ["answer engine optimization services", "aeo agency", "generative engine optimization geo", "llm seo for brands", "ai search visibility services"] },
            { label: "Questions marketers ask", phrases: ["how to get my brand cited by chatgpt", "how to appear in google ai overviews", "how to show up in perplexity answers", "why does ai recommend my competitors and not me", "does seo still work with ai search"] },
            { label: "By market", phrases: ["aeo services in the middle east", "arabic content optimization for ai search", "ai search optimization for gcc brands", "bilingual arabic english aeo strategy"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تجيب عنها هذه الصفحة",
        intro: "لم يعد السؤال كيف أتصدر نتائج جوجل فحسب، بل كيف تذكرني أدوات الذكاء الاصطناعي عندما يسأل عني العميل. هذه العبارات يكتبها المسوقون الذين انتبهوا مبكراً لهذا التحول.",
        groups: [
            { label: "مفردات البحث الجديدة", phrases: ["تحسين محركات الإجابة", "الظهور في نتائج الذكاء الاصطناعي", "سيو الذكاء الاصطناعي", "تهيئة المحتوى لمحركات الإجابة"] },
            { label: "أسئلة المسوقين", phrases: ["كيف يظهر موقعي في إجابات ChatGPT", "كيف اظهر في Google AI Overviews", "لماذا يوصي الذكاء الاصطناعي بمنافسي", "هل السيو التقليدي ما زال ينفع"] },
            { label: "حسب السوق", phrases: ["خدمات AEO في الخليج", "تحسين المحتوى العربي لمحركات الذكاء الاصطناعي", "الظهور في إجابات الذكاء الاصطناعي بالعربي", "شركة سيو تفهم البحث بالذكاء الاصطناعي"] },
        ],
    },
    },
    '/services/app-development': {
    en: {
        heading: "What businesses search for when they need this",
        intro: "From the first idea to a live product on both stores, these are the searches Gulf businesses type when they decide it is time to build an app — and this page walks through every one of them.",
        groups: [
            { label: "By what you need", phrases: ["mobile app development company", "ios and android app development services", "hire app developers for a startup", "custom app development for business", "app design and development agency"] },
            { label: "Costs & decisions", phrases: ["how much does it cost to build an app in the gulf", "app development cost breakdown", "how long does it take to develop an app", "buy an app template or build custom"] },
            { label: "By market", phrases: ["app development company in oman", "mobile app developers in muscat", "arabic first app development", "app development company serving saudi arabia and uae"] },
        ],
    },
    ar: {
        heading: "ماذا تبحث الشركات عندما تحتاج هذه الخدمة",
        intro: "فكرة التطبيق تبدأ عادةً ببحث واحد في جوجل. جمعنا هنا ما يكتبه أصحاب الأعمال في عُمان والخليج فعلاً عندما يقررون تحويل الفكرة إلى تطبيق حقيقي.",
        groups: [
            { label: "حسب الحاجة", phrases: ["شركة تطوير تطبيقات", "برمجة تطبيقات جوال", "تصميم وبرمجة تطبيق", "مبرمج تطبيقات محترف", "شركة تصميم تطبيقات للايفون والاندرويد"] },
            { label: "التكلفة والقرار", phrases: ["عمل تطبيق لمشروعي التجاري", "افضل شركة برمجة تطبيقات"] },
            { label: "حسب السوق", phrases: ["شركة برمجة تطبيقات في عمان", "شركة تطوير تطبيقات في مسقط", "شركات برمجة التطبيقات في الخليج", "مطور تطبيقات في الامارات"] },
        ],
    },
    },
    '/services/backup-and-security': {
    en: {
        heading: "What companies search for before securing their data",
        intro: "Backup searches usually start after a close call — a corrupted server, a phishing email, a deleted folder. Here is what businesses across the GCC type when continuity suddenly matters.",
        groups: [
            { label: "Backup & recovery", phrases: ["cloud backup solutions for business", "automatic daily backups for company data", "data backup and disaster recovery services", "restore data after a server failure", "offsite backup for small business"] },
            { label: "Security & protection", phrases: ["protect business data from ransomware", "website security and malware protection", "server hardening and monitoring services", "cloud security for small businesses"] },
            { label: "By market", phrases: ["backup and security company in Oman", "disaster recovery plan for SMEs in the Gulf", "managed IT security services GCC", "business continuity solutions for small companies"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الشركات قبل تأمين بياناتها",
        intro: "البحث عن النسخ الاحتياطي يبدأ غالباً بعد إنذار قريب: خادم تعطل، أو بريد تصيّد، أو ملفات حُذفت. هذا ما تكتبه الشركات حين تصبح استمرارية العمل أولوية.",
        groups: [
            { label: "النسخ والاسترجاع", phrases: ["حلول النسخ الاحتياطي للشركات", "نسخ احتياطي سحابي تلقائي", "استرجاع البيانات بعد عطل الخادم", "خطة التعافي من الكوارث"] },
            { label: "الحماية والأمان", phrases: ["حماية بيانات الشركة من الاختراق", "حماية الموقع من الفيروسات والاختراق", "مراقبة الخوادم وتأمينها", "تأمين متجر الكتروني من الاختراق"] },
            { label: "حسب السوق", phrases: ["شركة أمن معلومات في عمان", "حلول النسخ الاحتياطي والأمان للشركات في الخليج", "خدمات نسخ احتياطي مدارة للشركات", "حماية بيانات العملاء من الضياع"] },
        ],
    },
    },
    '/services/business-management-systems': {
    en: {
        heading: "Searches that bring businesses here",
        intro: "At a certain size, spreadsheets stop working. These are the searches owners run when orders, sales, HR and inventory need to live in one connected system instead of five disconnected files.",
        groups: [
            { label: "Replacing the spreadsheet era", phrases: ["replace excel with a business management system", "all-in-one system for orders sales and inventory", "operations management software for a growing company", "connect sales inventory and HR in one system"] },
            { label: "Build vs buy", phrases: ["custom ERP for small business", "custom business software development company", "off-the-shelf ERP vs custom system", "business system we own without monthly per-user fees"] },
            { label: "Costs & market", phrases: ["cost of a custom management system", "business software development in the Gulf", "ERP developers in Oman", "software company that builds internal systems"] },
        ],
    },
    ar: {
        heading: "عبارات يبحث بها أصحاب الشركات عن نظام يجمع أعمالهم",
        intro: "عند حجم معيّن تتوقف ملفات الإكسل عن أداء المهمة. هذه العبارات يكتبها أصحاب الشركات حين يريدون نظاماً واحداً يجمع الطلبات والمبيعات والموظفين والمخزون.",
        groups: [
            { label: "بديل ملفات الاكسل", phrases: ["بديل الاكسل لادارة الشركة", "نظام يربط المبيعات والمخزون والموظفين", "برنامج ادارة شركة متكامل", "نظام ادارة الأعمال للشركات الصغيرة والمتوسطة"] },
            { label: "جاهز أم مخصص", phrases: ["برنامج ERP جاهز أم نظام مخصص", "شركة برمجة أنظمة ادارية", "نظام تملكه شركتك بدون اشتراكات شهرية", "نظام ادارة مخصص حسب طريقة عملنا"] },
            { label: "التكلفة والسوق", phrases: ["كم تكلفة نظام ادارة مخصص", "شركة برمجة أنظمة في الخليج", "شركة تطوير أنظمة ERP في عمان", "اسعار برامج ادارة الاعمال"] },
        ],
    },
    },
    '/services/business-process-automation': {
    en: {
        heading: "The searches that lead here",
        intro: "Most teams find this page after typing some version of \"how do we stop doing this manually\". From proposals and invoices to approvals and follow-ups, these are the automation searches this page answers for businesses across the Gulf.",
        groups: [
            { label: "By process", phrases: ["business process automation services", "automate invoicing and approvals", "workflow automation company", "document approval automation"] },
            { label: "By question", phrases: ["what is business process automation", "which business processes should be automated first", "how much does business process automation cost", "BPA vs RPA difference"] },
            { label: "By market", phrases: ["business process automation company in Oman", "automation services for GCC companies", "business automation consultants Saudi Arabia", "process automation agency for SMEs"] },
        ],
    },
    ar: {
        heading: "ماذا تكتب الشركات في البحث عندما يرهقها العمل اليدوي",
        intro: "قبل الوصول إلى هذه الصفحة، غالباً ما تكون الشركة قد بحثت عن طريقة لإنهاء الإدخال اليدوي والمتابعات المتكررة. هذه أبرز عبارات البحث التي تجيب عنها خدمة أتمتة العمليات لدينا في عُمان والخليج.",
        groups: [
            { label: "حسب العملية", phrases: ["أتمتة العمليات الإدارية", "أتمتة الفواتير والموافقات", "شركة أتمتة الأعمال", "أتمتة المهام المتكررة في الشركة"] },
            { label: "حسب السؤال", phrases: ["ما هي أتمتة العمليات", "كيف ابدأ في أتمتة عمليات شركتي", "ما الفرق بين الأتمتة والتحول الرقمي"] },
            { label: "حسب السوق", phrases: ["شركة أتمتة عمليات في عمان", "خدمات الأتمتة للشركات في السعودية", "خدمات أتمتة للشركات الصغيرة والمتوسطة"] },
        ],
    },
    },
    '/services/business-systems-development': {
    en: {
        heading: "Common searches we answer",
        intro: "From a first CRM to a full custom ERP, this page covers the systems a business actually runs on. Decision-makers across Saudi Arabia, the UAE, and Oman find it through searches like these.",
        groups: [
            { label: "By system type", phrases: ["custom ERP development", "CRM development company", "inventory management system development", "HR and payroll system development", "custom business management software"] },
            { label: "By what you are trying to do", phrases: ["build a custom system for my company", "software company that builds internal tools", "integrate all my business systems"] },
            { label: "Costs & comparisons", phrases: ["how much does custom ERP development cost", "custom software development company GCC", "ERP implementation for small business"] },
        ],
    },
    ar: {
        heading: "أشهر ما يُبحث عنه في تطوير أنظمة الأعمال",
        intro: "من أول نظام CRM إلى نظام ERP مخصص متكامل، تغطي هذه الصفحة الأنظمة التي تُدار بها الشركات فعلياً. أصحاب القرار في السعودية والإمارات وعُمان يصلون إليها عبر عبارات كهذه.",
        groups: [
            { label: "حسب نوع النظام", phrases: ["برمجة نظام ERP مخصص", "شركة تطوير أنظمة CRM", "برمجة نظام إدارة مخزون", "نظام موارد بشرية ورواتب", "برمجة أنظمة إدارية للشركات"] },
            { label: "حسب هدفك", phrases: ["تصميم نظام خاص لشركتي", "استبدال الإكسل بنظام متكامل", "شركة برمجة أنظمة داخلية", "ربط أنظمة الشركة ببعضها"] },
            { label: "تكاليف ومقارنات", phrases: ["كم تكلفة برمجة نظام ERP", "الفرق بين النظام الجاهز والنظام المخصص", "أفضل شركة تطوير أنظمة في الخليج", "أنظمة إدارة الشركات الصغيرة والمتوسطة"] },
        ],
    },
    },
    '/services/cloud-cost-optimization': {
    en: {
        heading: "Searching for ways to cut your cloud bill?",
        intro: "A cloud bill that keeps climbing is usually the trigger. If your searches look like these, a structured cost-optimization pass will almost always surface real savings.",
        groups: [
            { label: "By what you need", phrases: ["cloud cost optimization services", "reduce cloud spend", "cloud cost audit", "rightsizing cloud servers", "FinOps consulting", "cloud spend monitoring"] },
            { label: "Questions people ask", phrases: ["why is my cloud bill so high", "how to reduce AWS costs without downtime", "how much can cloud cost optimization save", "reserved instances vs on-demand pricing"] },
            { label: "By market", phrases: ["cloud cost optimization GCC", "cloud consulting for companies in Saudi Arabia", "reduce cloud costs UAE", "cloud bill review for Gulf startups"] },
        ],
    },
    ar: {
        heading: "تبحث عن طريقة لخفض فاتورة خدماتك السحابية؟",
        intro: "غالباً ما تكون فاتورة الخدمات السحابية المتصاعدة هي نقطة البداية. إن كانت عمليات بحثك تشبه هذه العبارات، فمراجعة منظمة للتكاليف ستكشف في الغالب فرص توفير حقيقية.",
        groups: [
            { label: "حسب احتياجك", phrases: ["خفض تكاليف الحوسبة السحابية", "تقليل فاتورة الخدمات السحابية", "مراجعة التكاليف السحابية", "مراقبة الإنفاق السحابي", "ترشيد الإنفاق على الخدمات السحابية"] },
            { label: "أسئلة شائعة", phrases: ["لماذا فاتورة السحابة مرتفعة", "كيف أخفض تكلفة AWS", "كم يمكن توفيره من تحسين التكاليف السحابية", "الفرق بين الحجز المسبق والدفع حسب الاستخدام"] },
            { label: "حسب السوق", phrases: ["خفض التكاليف السحابية للشركات الخليجية", "استشارات سحابية في السعودية", "تحسين تكاليف الحوسبة السحابية في الإمارات", "إدارة الإنفاق السحابي للشركات الناشئة"] },
        ],
    },
    },
    '/services/cloud-hosting-setup': {
    en: {
        heading: "What teams search for before choosing their hosting",
        intro: "Choosing where and how to host is a decision most businesses only want to make once. These searches usually mark the start of that decision.",
        groups: [
            { label: "By what you need", phrases: ["cloud hosting setup service", "cloud server setup for business", "managed cloud hosting", "host a web application in the cloud", "secure hosting for company websites", "cloud infrastructure setup company"] },
            { label: "Questions & comparisons", phrases: ["VPS vs cloud hosting for business", "shared hosting vs cloud hosting", "what does a business need to host an app", "how to choose a cloud provider"] },
            { label: "By market", phrases: ["cloud hosting for businesses in Saudi Arabia", "business hosting solutions Oman", "managed hosting for GCC companies", "cloud setup services UAE"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الفرق التقنية قبل اختيار استضافتها",
        intro: "اختيار مكان الاستضافة وطريقتها قرار لا تريد الشركات تكراره مرتين. هذه العبارات عادةً ما تكون بداية هذا القرار.",
        groups: [
            { label: "حسب احتياجك", phrases: ["إعداد استضافة سحابية", "استضافة سحابية للشركات", "إعداد سيرفر سحابي", "استضافة تطبيقات الويب", "استضافة آمنة لمواقع الشركات"] },
            { label: "أسئلة ومقارنات", phrases: ["الفرق بين الاستضافة المشتركة والسحابية", "أفضل استضافة سحابية للمواقع", "كيف أختار مزود الاستضافة", "ماذا أحتاج لاستضافة تطبيق"] },
            { label: "حسب السوق", phrases: ["استضافة سحابية في السعودية", "استضافة مواقع الشركات في عمان", "خدمات سحابية للشركات في الخليج", "إعداد بنية تحتية سحابية في الإمارات"] },
        ],
    },
    },
    '/services/cloud-migration': {
    en: {
        heading: "Queries that bring businesses here",
        intro: "Aging servers, expiring licenses, or a growth spurt — something always triggers the move. Businesses planning that move type searches like these.",
        groups: [
            { label: "By what you need", phrases: ["cloud migration services", "migrate servers to the cloud", "move on-premise systems to cloud", "legacy system cloud migration", "database migration to cloud", "cloud migration company"] },
            { label: "Questions & planning", phrases: ["how long does cloud migration take", "cloud migration cost for a small business", "how to migrate to the cloud without downtime", "what to migrate to the cloud first"] },
            { label: "By market", phrases: ["cloud migration services GCC", "cloud migration company in Oman", "on-premise to cloud migration Saudi Arabia", "cloud migration consultants UAE"] },
        ],
    },
    ar: {
        heading: "استفسارات شائعة تقود الشركات إلى هذه الصفحة",
        intro: "سيرفرات قديمة أو تراخيص على وشك الانتهاء أو نمو متسارع — دائماً هناك ما يدفع نحو الانتقال. الشركات التي تخطط لهذه الخطوة تبحث بعبارات مثل هذه.",
        groups: [
            { label: "حسب احتياجك", phrases: ["الترحيل إلى السحابة", "نقل السيرفرات إلى السحابة", "نقل الأنظمة القديمة إلى السحابة", "ترحيل قواعد البيانات", "الانتقال من السيرفرات المحلية إلى السحابة"] },
            { label: "أسئلة وتخطيط", phrases: ["كم يستغرق الترحيل السحابي", "تكلفة الانتقال إلى الحوسبة السحابية", "كيف أنقل أنظمتي بدون توقف الخدمة", "ماذا أنقل إلى السحابة أولاً"] },
            { label: "حسب السوق", phrases: ["خدمات الترحيل السحابي في الخليج", "نقل الأنظمة إلى السحابة في عمان", "شركة ترحيل سحابي في السعودية", "استشارات الانتقال إلى السحابة في الإمارات"] },
        ],
    },
    },
    '/services/content-creation': {
    en: {
        heading: "Searches that end on this page",
        intro: "Brands looking for a production partner — not just another freelancer — usually start with queries like these. CloudTopia produces bilingual content built for Gulf audiences.",
        groups: [
            { label: "By content type", phrases: ["professional content creation services", "corporate video production", "social media content creation", "product photography for brands", "motion graphics and reels production", "Arabic English copywriting"] },
            { label: "By what you are trying to do", phrases: ["content agency for my brand", "monthly content packages for social media", "who can produce videos for my company", "content creation for a product launch"] },
            { label: "By market", phrases: ["content creation company in Oman", "video production Gulf", "Arabic content agency GCC", "bilingual content production for brands"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تنتهي عند هذه الصفحة",
        intro: "العلامات التجارية التي تبحث عن شريك إنتاج حقيقي — لا مجرد مصمم مستقل — تبدأ عادةً بعبارات كهذه. كلاود توبيا تنتج محتوى ثنائي اللغة مصمماً لجمهور الخليج.",
        groups: [
            { label: "حسب نوع المحتوى", phrases: ["شركة صناعة محتوى", "إنتاج فيديو للشركات", "صناعة محتوى سوشيال ميديا", "تصوير منتجات احترافي", "موشن جرافيك للإعلانات", "كتابة محتوى تسويقي بالعربي"] },
            { label: "حسب هدفك", phrases: ["شركة إدارة محتوى لعلامتي التجارية", "باقات محتوى شهرية", "إنتاج فيديو إعلاني لشركتي", "محتوى لإطلاق منتج جديد"] },
            { label: "حسب السوق", phrases: ["شركة صناعة محتوى في عمان", "إنتاج محتوى في الخليج", "وكالة محتوى عربي", "صناعة محتوى ثنائي اللغة"] },
        ],
    },
    },
    '/services/custom-erp-crm-solutions': {
    en: {
        heading: "Common searches we answer",
        intro: "Businesses weighing off-the-shelf systems against something built around their own operations tend to arrive through searches like these — often from Oman, Saudi Arabia, and the UAE.",
        groups: [
            { label: "By what you need", phrases: ["custom ERP development company", "custom CRM software for business", "business management system development", "ERP and CRM integration services"] },
            { label: "Comparisons and costs", phrases: ["custom ERP vs off the shelf software", "how much does a custom ERP system cost", "is custom CRM worth it for a small business", "build vs buy business software"] },
            { label: "By market", phrases: ["ERP software company in Oman", "custom business systems for GCC companies", "Arabic ERP system with English interface", "ERP implementation for trading companies in the Gulf"] },
        ],
    },
    ar: {
        heading: "أسئلة وعمليات بحث شائعة نجيب عنها",
        intro: "الشركات التي توازن بين الأنظمة الجاهزة ونظام مبني حول عملياتها تصل عادةً عبر عمليات بحث كهذه، من عُمان والسعودية والإمارات وغيرها.",
        groups: [
            { label: "حسب الحاجة", phrases: ["نظام ERP للشركات", "برنامج إدارة شركات متكامل", "تصميم نظام ERP مخصص", "برنامج CRM لإدارة العملاء", "بديل جداول الإكسل لإدارة الشركة"] },
            { label: "المقارنات والتكاليف", phrases: ["كم تكلفة نظام ERP", "هل يستحق نظام ERP المخصص التكلفة", "أسعار أنظمة إدارة الشركات"] },
            { label: "حسب السوق", phrases: ["شركة أنظمة ERP في عمان", "نظام إدارة موارد باللغة العربية", "أنظمة إدارية للشركات الخليجية", "برمجة أنظمة إدارية مخصصة في الخليج"] },
        ],
    },
    },
    '/services/database-setup': {
    en: {
        heading: "Common searches this service covers",
        intro: "Whether you're launching a new product or untangling a slow database with no backups, these are the searches that bring IT and engineering teams to this page.",
        groups: [
            { label: "Setup & hosting", phrases: ["database setup services", "cloud database configuration", "managed database hosting", "secure database hosting for business", "sql database setup for a company"] },
            { label: "Reliability & cost", phrases: ["database backup and disaster recovery services", "database monitoring and maintenance", "database performance tuning services", "how much does managed database hosting cost"] },
            { label: "Nearby expertise", phrases: ["database services company in oman", "managed database services gcc", "database administrator outsourcing uae", "cloud database hosting saudi arabia"] },
        ],
    },
    ar: {
        heading: "أشهر عمليات البحث حول هذه الخدمة",
        intro: "سواء كنت تطلق منتجاً جديداً أو تعالج قاعدة بيانات بطيئة بلا نسخ احتياطي، هذه هي العبارات التي تقود الفرق التقنية إلى هذه الصفحة.",
        groups: [
            { label: "الإعداد والاستضافة", phrases: ["اعداد قواعد البيانات للشركات", "استضافة قاعدة بيانات سحابية", "قاعدة بيانات امنة للشركات", "انشاء قاعدة بيانات SQL"] },
            { label: "الموثوقية والتكلفة", phrases: ["نسخ احتياطي لقاعدة البيانات", "مراقبة قواعد البيانات وصيانتها", "تحسين اداء قاعدة البيانات", "كم تكلفة ادارة قواعد البيانات"] },
            { label: "خبرة قريبة", phrases: ["شركة قواعد بيانات في عمان", "خدمات قواعد البيانات في الخليج", "ادارة قواعد بيانات للشركات في السعودية", "مسؤول قواعد بيانات عن بعد"] },
        ],
    },
    },
    '/services/devops-support': {
    en: {
        heading: "If any of these sound familiar",
        intro: "Teams rarely search for DevOps until deployments start breaking or the cloud bill doubles. If these queries look familiar, that's exactly what this service fixes.",
        groups: [
            { label: "By what's hurting", phrases: ["devops support services", "ci cd pipeline setup", "server monitoring and maintenance services", "cloud infrastructure management company", "docker and kubernetes support"] },
            { label: "Team & cost decisions", phrases: ["devops as a service", "outsourced devops team", "hire devops engineer vs outsource", "how to reduce cloud hosting costs"] },
            { label: "Regional support", phrases: ["devops company in oman", "devops consulting gcc", "managed cloud services saudi arabia", "server management company uae"] },
        ],
    },
    ar: {
        heading: "إن بدت لك هذه العبارات مألوفة",
        intro: "قلّما تبحث الفرق عن DevOps قبل أن تتعطل عمليات النشر أو تتضاعف فاتورة السحابة. إن بدت لك هذه العبارات مألوفة، فهذا تحديداً ما تعالجه هذه الخدمة.",
        groups: [
            { label: "حسب المشكلة", phrases: ["خدمات DevOps للشركات", "اعداد CI/CD للمشاريع", "مراقبة السيرفرات وصيانتها", "ادارة البنية التحتية السحابية"] },
            { label: "قرارات الفريق والتكلفة", phrases: ["الاستعانة بفريق DevOps خارجي", "تقليل تكاليف الاستضافة السحابية", "توظيف مهندس DevOps ام التعاقد مع شركة", "كم تكلفة خدمات DevOps للشركات"] },
            { label: "دعم إقليمي", phrases: ["شركة DevOps في الخليج", "خدمات سحابية مدارة في السعودية", "دعم تقني للسيرفرات في عمان", "ادارة سيرفرات الشركات في الامارات"] },
        ],
    },
    },
    '/services/digital-presence': {
    en: {
        heading: "What companies search for at this stage",
        intro: "Being findable now means Google, maps, social feeds and AI answers all at once. These are the searches business owners make when their company deserves more visibility than it's getting.",
        groups: [
            { label: "Visibility goals", phrases: ["improve business online presence", "digital presence services for companies", "how to make my business show up on google", "get my company found in ai search results", "brand visibility online"] },
            { label: "Channels & services", phrases: ["website and social media package for business", "seo and content marketing services", "social media management for companies", "company branding and website design package"] },
            { label: "Around the Gulf", phrases: ["digital presence agency gcc", "online presence services saudi arabia", "digital marketing company in oman", "build a company online presence in the gulf"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الشركات في هذه المرحلة",
        intro: "أن تكون موجوداً اليوم يعني الظهور في جوجل والخرائط ومنصات التواصل وإجابات الذكاء الاصطناعي معاً. بهذه العبارات يبحث أصحاب الأعمال حين يشعرون أن شركتهم تستحق ظهوراً أكبر.",
        groups: [
            { label: "أهداف الظهور", phrases: ["تحسين الحضور الرقمي للشركة", "كيف اجعل شركتي تظهر في جوجل", "الظهور في اجابات الذكاء الاصطناعي", "بناء هوية رقمية للشركة"] },
            { label: "القنوات والخدمات", phrases: ["ادارة حسابات التواصل الاجتماعي للشركات", "خدمات SEO وكتابة المحتوى", "تصميم موقع وهوية تجارية", "خدمات تسويق رقمي متكاملة"] },
            { label: "حسب السوق الخليجي", phrases: ["شركة تسويق رقمي في عمان", "خدمات الحضور الرقمي في السعودية", "شركة ادارة سوشيال ميديا في الخليج", "بناء الحضور الرقمي في الامارات"] },
        ],
    },
    },
    '/services/ecommerce-development': {
    en: {
        heading: "Searches that bring store owners here",
        intro: "From a first store to regional scale, these are the searches that bring merchants to CloudTopia — especially those selling across the GCC in both Arabic and English.",
        groups: [
            { label: "Building the store", phrases: ["ecommerce website development", "online store development company", "custom ecommerce solutions", "arabic english ecommerce website", "ecommerce website with payment gateway integration"] },
            { label: "Costs & decisions", phrases: ["how much does an ecommerce website cost", "custom online store vs ready made platform", "multi currency online store", "best ecommerce development company in oman"] },
            { label: "Selling across the Gulf", phrases: ["ecommerce development company in the gcc", "online store for the saudi market", "ecommerce website development uae", "sell online across gulf countries"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه أصحاب المتاجر",
        intro: "من أول متجر إلى التوسع الإقليمي، بهذه العبارات يبحث التجار الذين يبيعون بالعربية والإنجليزية في الخليج قبل أن يصلوا إلى كلاود توبيا.",
        groups: [
            { label: "بناء المتجر", phrases: ["تصميم متجر الكتروني بالعربي والانجليزي", "ربط المتجر الالكتروني ببوابة دفع"] },
            { label: "التكاليف والقرارات", phrases: ["متجر مخصص ام منصة جاهزة", "افضل شركة متاجر الكترونية في عمان", "متجر الكتروني يدعم عملات متعددة"] },
            { label: "البيع في الخليج", phrases: ["تصميم متجر الكتروني في الامارات", "متجر الكتروني للسوق الخليجي", "البيع اونلاين في دول الخليج"] },
        ],
    },
    },
    '/services/generative-engine-optimization': {
    en: {
        heading: "Searches that lead marketers here",
        intro: "GEO is new enough that people search for it under several names — and often as a question about why AI assistants never mention their brand. Whichever version brought you here, this is the discipline behind it.",
        groups: [
            { label: "The head terms", phrases: ["generative engine optimization", "GEO marketing services", "AI search optimization", "answer engine optimization", "LLM optimization for brands"] },
            { label: "How-do-I questions", phrases: ["how to get my brand recommended by ChatGPT", "how to appear in AI Overviews", "how to get cited by AI assistants", "optimize website for AI search engines", "why doesn't AI mention my company"] },
            { label: "Strategy & positioning", phrases: ["GEO vs SEO what is the difference", "AI visibility audit for brands", "entity SEO for AI search", "Arabic content optimization for AI answers"] },
        ],
    },
    ar: {
        heading: "عبارات البحث التي تقود المسوّقين إلى هنا",
        intro: "لأن المجال حديث، يبحث الناس عنه بأسماء متعددة، وكثيراً ما يصلون بسؤال محيّر: لماذا لا يذكر الذكاء الاصطناعي علامتي أصلاً؟ أياً كانت الصيغة التي أوصلتك، فهذا هو التخصص الذي تسأل عنه.",
        groups: [
            { label: "المصطلحات الأساسية", phrases: ["تحسين المحركات التوليدية", "تحسين الموقع لمحركات الذكاء الاصطناعي", "التسويق عبر الذكاء الاصطناعي التوليدي"] },
            { label: "أسئلة «كيف»", phrases: ["كيف يظهر موقعي في اجابات ChatGPT", "كيف ارشح شركتي في الذكاء الاصطناعي", "لماذا لا يذكر الذكاء الاصطناعي علامتي التجارية", "الفرق بين SEO و GEO"] },
            { label: "الاستراتيجية", phrases: ["بناء موثوقية العلامة التجارية للذكاء الاصطناعي", "تحسين المحتوى العربي للذكاء الاصطناعي", "استراتيجية الظهور في محركات البحث الذكية", "تدقيق حضور العلامة في ادوات الذكاء الاصطناعي"] },
        ],
    },
    },
    '/services/hybrid-cloud-solutions': {
    en: {
        heading: "What IT teams search for on the way to hybrid cloud",
        intro: "Hybrid cloud searches in this region are shaped by two forces: workloads that need cloud scale, and data that has to stay close to home. If your searches sit at that intersection, you are on the right page.",
        groups: [
            { label: "Architecture & head terms", phrases: ["hybrid cloud solutions", "hybrid cloud architecture for business", "private and public cloud integration", "hybrid cloud managed services", "connect on premise servers to the cloud"] },
            { label: "Migration & operations", phrases: ["hybrid cloud migration strategy", "move workloads to the cloud gradually", "cloud monitoring and reliability setup"] },
            { label: "Compliance & market", phrases: ["data residency requirements Saudi Arabia cloud", "keep sensitive data on premise use cloud for the rest", "cloud solutions company in Oman", "hybrid cloud provider for GCC enterprises"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه فرق تقنية المعلومات",
        intro: "البحث عن السحابة الهجينة في منطقتنا تحكمه قوتان: أنظمة تحتاج مرونة السحابة وتوسّعها، وبيانات يجب أن تبقى قريبة أو داخل الحدود. إن كانت أسئلتك عند هذا التقاطع فأنت في الصفحة الصحيحة.",
        groups: [
            { label: "البنية والمصطلحات", phrases: ["حلول السحابة الهجينة", "بنية سحابية هجينة للشركات", "دمج السحابة الخاصة والعامة", "ربط السيرفرات المحلية بالسحابة"] },
            { label: "الترحيل والتشغيل", phrases: ["استراتيجية الترحيل الى السحابة", "نقل الانظمة الى السحابة تدريجيا", "خفض تكاليف الخدمات السحابية", "مراقبة البنية السحابية وادارتها"] },
            { label: "الامتثال والسوق", phrases: ["متطلبات بقاء البيانات داخل السعودية", "ابقاء البيانات الحساسة محليا واستخدام السحابة للباقي", "شركة حلول سحابية في عمان", "مزود خدمات سحابية للشركات الخليجية"] },
        ],
    },
    },
    '/services/machine-learning-model-development': {
    en: {
        heading: "What businesses search for when they need this",
        intro: "Machine learning searches from decision-makers rarely mention algorithms — they mention forecasting, churn, and whether a custom model beats an off-the-shelf tool. Those are precisely the questions this service answers.",
        groups: [
            { label: "Build intent", phrases: ["machine learning model development", "custom machine learning solutions", "ML development company", "train a machine learning model on company data", "AI model development services"] },
            { label: "By use case", phrases: ["demand forecasting with machine learning", "customer churn prediction model", "predictive analytics for business", "Arabic NLP model development", "document classification with AI"] },
            { label: "Decisions & cost", phrases: ["how much does a machine learning project cost", "off the shelf AI vs custom model", "machine learning consulting in the GCC", "is my data enough to train a model"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الشركات حين تحتاج هذه الخدمة",
        intro: "أصحاب القرار لا يبحثون عن الخوارزميات، بل عن التنبؤ بالطلب وفهم العملاء، وعمّا إذا كان النموذج المخصص أجدى من الأدوات الجاهزة. هذه بالضبط الأسئلة التي تجيب عنها هذه الخدمة في الخليج.",
        groups: [
            { label: "البناء والتطوير", phrases: ["تطوير نماذج تعلم آلي", "بناء نموذج ذكاء اصطناعي مخصص", "شركة حلول تعلم الآلة", "تدريب نموذج على بيانات الشركة"] },
            { label: "حسب حالة الاستخدام", phrases: ["التنبؤ بالطلب بالذكاء الاصطناعي", "توقع فقدان العملاء بالتعلم الآلي", "تحليل البيانات التنبؤي للشركات", "معالجة اللغة العربية بالذكاء الاصطناعي", "تصنيف المستندات آليا"] },
            { label: "القرار والتكلفة", phrases: ["كم تكلفة مشروع ذكاء اصطناعي", "الفرق بين الحلول الجاهزة والنموذج المخصص", "استشارات ذكاء اصطناعي في الخليج", "هل بياناتي كافية لتدريب نموذج"] },
        ],
    },
    },
    '/services/natural-language-processing-solutions': {
    en: {
        heading: "Searches this page answers",
        intro: "Teams across the Gulf reach this page while looking for practical ways to put language AI to work — usually starting with queries like these.",
        groups: [
            { label: "By capability", phrases: ["natural language processing services", "arabic text analysis with AI", "sentiment analysis for customer feedback", "automatic document classification", "text summarization for business reports", "named entity extraction service"] },
            { label: "By use case", phrases: ["chatbot that understands Gulf Arabic dialects", "automate customer support emails with AI", "extract data from invoices automatically", "analyze arabic social media comments", "voice of customer analysis tool"] },
            { label: "Providers & costs", phrases: ["arabic NLP solutions company", "NLP development company in the Gulf", "how much does a custom NLP model cost", "custom language model for my business"] },
        ],
    },
    ar: {
        heading: "عمليات بحث تجيب عنها هذه الصفحة",
        intro: "تصل الشركات إلى هذه الصفحة عادةً بعد بحث طويل عن حلول تفهم اللغة العربية فعلاً لا ترجمةً حرفية — وهذه أمثلة على ما يكتبونه في جوجل.",
        groups: [
            { label: "حسب القدرة التقنية", phrases: ["معالجة اللغة الطبيعية للشركات", "تحليل النصوص العربية بالذكاء الاصطناعي", "تحليل مشاعر العملاء من التعليقات", "تصنيف المستندات تلقائياً", "تلخيص التقارير بالذكاء الاصطناعي"] },
            { label: "حسب الاستخدام", phrases: ["شات بوت يفهم اللهجات الخليجية", "أتمتة الرد على رسائل العملاء", "استخراج البيانات من الفواتير تلقائياً", "تحليل تعليقات وسائل التواصل الاجتماعي"] },
            { label: "الشركات والتكلفة", phrases: ["شركة ذكاء اصطناعي تدعم اللغة العربية", "كم تكلفة نموذج ذكاء اصطناعي مخصص", "حلول معالجة اللغة العربية في الخليج", "أفضل شركة حلول ذكاء اصطناعي للنصوص"] },
        ],
    },
    },
    '/services/performance-optimization': {
    en: {
        heading: "What teams search for when things slow down",
        intro: "When a site slows down or a cloud bill spikes, these are the searches that usually follow — and this page exists to answer them.",
        groups: [
            { label: "Symptoms", phrases: ["website takes too long to load on mobile", "high server costs but slow performance", "app crashes under heavy traffic"] },
            { label: "Fixes people look for", phrases: ["improve core web vitals scores", "database performance tuning service", "reduce server response time", "caching and CDN setup for websites"] },
            { label: "Local intent", phrases: ["performance optimization company in the Gulf", "site speed experts for arabic websites", "cloud cost optimization consultants", "application performance monitoring setup"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه أصحاب المواقع عندما يتباطأ الأداء",
        intro: "عندما يتباطأ الموقع أو ترتفع فاتورة الاستضافة بلا سبب واضح، هذه هي العبارات التي يكتبها أصحاب الأعمال في الخليج — وهنا نجيب عنها.",
        groups: [
            { label: "الأعراض", phrases: ["الموقع بطيء على الجوال", "ارتفاع تكاليف السيرفر بدون سبب"] },
            { label: "الحلول", phrases: ["تحسين سرعة تحميل الموقع", "تحسين أداء قاعدة البيانات", "خدمة مراقبة أداء المواقع"] },
            { label: "البحث المحلي", phrases: ["شركة تحسين أداء المواقع في الخليج", "خبير تسريع مواقع", "تحسين أداء التطبيقات للشركات"] },
        ],
    },
    },
    '/services/scalable-cloud-architecture': {
    en: {
        heading: "If you searched for any of these, you're in the right place",
        intro: "Founders and CTOs planning for growth — often in Saudi Arabia and the UAE — tend to arrive here through searches like these.",
        groups: [
            { label: "By what you're building", phrases: ["scalable cloud architecture design", "infrastructure for a fast growing startup", "microservices architecture consulting", "multi region cloud setup", "high availability system design"] },
            { label: "By problem", phrases: ["how to design infrastructure that scales", "system fails during peak traffic", "auto scaling setup for web application", "cloud migration without downtime"] },
            { label: "By provider search", phrases: ["cloud architecture consultants GCC", "cloud infrastructure company in Oman", "devops and cloud architecture services", "cloud architecture review service"] },
        ],
    },
    ar: {
        heading: "إذا بحثت عن أيٍّ من هذه العبارات فأنت في المكان الصحيح",
        intro: "المؤسسون والمدراء التقنيون الذين يستعدون لمرحلة نمو — في السعودية والإمارات خصوصاً — يصلون إلى هذه الصفحة عبر عبارات بحث مثل هذه.",
        groups: [
            { label: "حسب ما تبنيه", phrases: ["تصميم بنية تحتية سحابية", "بنية سحابية قابلة للتوسع", "بنية الخدمات المصغرة microservices", "نشر النظام في عدة مناطق جغرافية"] },
            { label: "حسب المشكلة", phrases: ["النظام لا يتحمل عدد المستخدمين", "ترحيل الأنظمة إلى السحابة بدون توقف", "تصميم نظام يتحمل ملايين المستخدمين", "توسيع السيرفرات تلقائياً حسب الضغط"] },
            { label: "حسب مزود الخدمة", phrases: ["شركة حلول سحابية في الخليج", "استشارات الحوسبة السحابية", "شركة بنية تحتية سحابية في عمان", "مراجعة البنية السحابية الحالية"] },
        ],
    },
    },
    '/services/search-engine-optimization': {
    en: {
        heading: "What businesses search for when they need SEO",
        intro: "Most clients find this page the same way their customers will find them — through Google. In Oman and across the Gulf, these are the searches that bring businesses here.",
        groups: [
            { label: "By what you need", phrases: ["seo services for business websites", "technical seo audit service", "increase organic traffic without ads", "on page seo optimization", "link building services that work"] },
            { label: "By market", phrases: ["seo company in oman", "arabic english bilingual seo", "seo agency in the gulf", "rank my website in saudi arabia"] },
            { label: "Costs & comparisons", phrases: ["how much does seo cost per month", "seo vs google ads which is better", "how long does seo take to work", "monthly seo packages for small business"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الشركات عندما تحتاج إلى SEO",
        intro: "معظم عملائنا وجدوا هذه الصفحة بالطريقة نفسها التي سيجدهم بها عملاؤهم: عبر بحث جوجل. وهذه أكثر العبارات التي تقود الشركات في عُمان والخليج إلينا.",
        groups: [
            { label: "حسب الحاجة", phrases: ["خدمات تحسين محركات البحث", "تصدر نتائج البحث في جوجل", "زيادة زوار الموقع بدون اعلانات"] },
            { label: "حسب السوق", phrases: ["شركة سيو في عمان", "افضل شركة SEO في الخليج", "سيو باللغة العربية والانجليزية", "تحسين ظهور الموقع في السعودية"] },
            { label: "التكلفة والمقارنات", phrases: ["كم سعر خدمة SEO شهريا", "الفرق بين السيو والاعلانات الممولة", "كم يحتاج السيو من وقت ليعطي نتائج", "باقات سيو شهرية للشركات الصغيرة"] },
        ],
    },
    },
    '/services/server-deployment': {
    en: {
        heading: "What teams search for when they need this",
        intro: "Whether it's a first production launch or a migration off a struggling host, these searches share one requirement: deployments that stay up. Teams across the GCC and Türkiye reach this page through them.",
        groups: [
            { label: "By what you need", phrases: ["server deployment services", "managed server deployment", "DevOps deployment service", "server monitoring and maintenance"] },
            { label: "By scenario", phrases: ["migrate a website to a new server without downtime", "deploy a web application to production", "move from shared hosting to a cloud server", "set up staging and production environments"] },
            { label: "Costs & questions", phrases: ["how much does a cloud server cost for a business", "managed vs self-managed servers", "how to secure a production server", "which cloud setup for a growing company"] },
        ],
    },
    ar: {
        heading: "ما تبحث عنه الفرق التقنية حين تحتاج هذه الخدمة",
        intro: "سواء كان إطلاقاً أول للإنتاج أو انتقالاً من استضافة متعبة، تلتقي هذه العبارات عند شرط واحد: خوادم تعمل بلا انقطاع.",
        groups: [
            { label: "حسب حاجتك", phrases: ["خدمة نشر الخوادم", "اعداد سيرفر سحابي للشركات", "ادارة سيرفرات للشركات"] },
            { label: "حسب الحالة", phrases: ["نقل موقع الى سيرفر جديد بدون توقف", "الانتقال من استضافة مشتركة الى سيرفر سحابي", "رفع تطبيق ويب على سيرفر انتاج", "تجهيز بيئة اختبار وانتاج"] },
            { label: "التكاليف والأسئلة", phrases: ["كم تكلفة سيرفر سحابي للشركات", "الفرق بين السيرفر المدار وغير المدار", "كيف احمي سيرفر الموقع", "افضل اعداد سيرفر لموقع شركة"] },
        ],
    },
    },
    '/services/social-media-marketing': {
    en: {
        heading: "Searches that bring brands to this page",
        intro: "Social media budgets get questioned the moment results stall, so these searches mix ambition with due diligence. From content to paid campaigns, this is what brands across the UAE, Saudi Arabia and Oman type before they call us.",
        groups: [
            { label: "By what you need", phrases: ["social media marketing agency", "social media management packages", "social media content creation service", "paid social advertising management", "Arabic social media agency"] },
            { label: "By platform & goal", phrases: ["Instagram marketing for business", "TikTok marketing agency", "LinkedIn marketing for B2B", "turn followers into customers"] },
            { label: "Costs & markets", phrases: ["how much does social media management cost", "social media marketing company in Oman", "social media agency prices in Saudi Arabia", "monthly social media packages UAE"] },
        ],
    },
    ar: {
        heading: "عبارات بحث توصل العلامات التجارية إلى هذه الصفحة",
        intro: "إدارة السوشيال ميديا سوق مزدحم، لذا يبحث أصحاب العلامات التجارية بعناية قبل الاختيار. هذه العبارات هي أكثر ما يُكتب في الخليج قبل التواصل معنا.",
        groups: [
            { label: "حسب حاجتك", phrases: ["شركة تسويق عبر السوشيال ميديا", "ادارة حسابات التواصل الاجتماعي", "صناعة محتوى لمنصات التواصل", "ادارة الاعلانات الممولة"] },
            { label: "حسب المنصة والهدف", phrases: ["ادارة حسابات انستقرام للشركات", "شركة تسويق تيك توك", "تسويق لينكد ان للشركات", "تحويل المتابعين الى عملاء"] },
            { label: "الأسعار والأسواق", phrases: ["كم تكلفة ادارة حسابات التواصل الاجتماعي", "اسعار شركات السوشيال ميديا في السعودية", "شركة سوشيال ميديا في عمان", "باقات تسويق شهرية في الامارات"] },
        ],
    },
    },
    '/services/ui-ux-design-branding': {
    en: {
        heading: "What businesses search for when they need this",
        intro: "From a first logo to a full design system, these are the searches that lead founders and marketing teams across Oman and the wider Gulf to CloudTopia's design studio.",
        groups: [
            { label: "By service", phrases: ["ui ux design company", "brand identity design services", "ui ux and branding agency", "bilingual arabic english interface design", "design system services for companies"] },
            { label: "Comparisons & costs", phrases: ["difference between ui and ux design", "how much does a full brand identity cost in the gulf", "freelance designer vs design agency", "what does a ui ux designer actually deliver"] },
            { label: "By market", phrases: ["ui ux design agency in oman", "branding company in muscat", "ux design services for gcc businesses", "design and branding studio middle east"] },
        ],
    },
    ar: {
        heading: "عمليات البحث التي تقود إلى هذه الصفحة",
        intro: "من الشعار الأول إلى نظام تصميم متكامل — هذه العبارات التي يكتبها أصحاب الشركات في عُمان والخليج عندما يبحثون عن شريك تصميم يتقن العربية والإنجليزية معًا.",
        groups: [
            { label: "حسب الخدمة", phrases: ["شركة تصميم واجهات مستخدم", "تصميم هوية بصرية للشركات", "وكالة تصميم UI UX", "تصميم واجهات ثنائية اللغة عربي انجليزي", "بناء نظام تصميم متكامل للشركات"] },
            { label: "مقارنات وأسئلة", phrases: ["الفرق بين UI و UX", "كم تكلفة تصميم هوية بصرية متكاملة", "مصمم مستقل ام شركة تصميم", "ماذا تشمل خدمات تصميم تجربة المستخدم"] },
            { label: "حسب السوق", phrases: ["وكالة تصميم في مسقط", "شركة تصميم وهوية بصرية في الخليج", "خدمات تصميم UX للشركات الخليجية", "خدمات التصميم الرقمي للشركات في عمان"] },
        ],
    },
    },
    '/services/web-applications': {
    en: {
        heading: "What decision-makers search for when they need a web app",
        intro: "When a spreadsheet or off-the-shelf tool stops scaling, the searches below start. This page covers custom web application development for businesses across the GCC and beyond.",
        groups: [
            { label: "By what you need", phrases: ["web application development company", "custom web app development", "saas product development services", "business portal development", "migrate excel processes to a web system"] },
            { label: "Costs & decisions", phrases: ["how much does it cost to build a web application", "web app vs website for business", "how long does it take to develop a web app", "in-house developers vs software company"] },
            { label: "By market", phrases: ["web application development company in oman", "custom software development gcc", "hire web app developers saudi arabia", "web development company for gulf enterprises"] },
        ],
    },
    ar: {
        heading: "ما يبحث عنه صنّاع القرار عند حاجتهم إلى تطبيق ويب",
        intro: "حين تتوقف ملفات الإكسل والأنظمة الجاهزة عن مواكبة نمو العمل، يبدأ البحث عن حل مخصص. هذه العبارات التي تقود الشركات في الخليج إلى خدمات تطوير تطبيقات الويب لدينا.",
        groups: [
            { label: "حسب الحاجة", phrases: ["شركة تطوير تطبيقات ويب", "برمجة تطبيق ويب مخصص", "انشاء نظام ويب لادارة الاعمال", "تحويل ملفات الاكسل الى نظام الكتروني"] },
            { label: "التكلفة والقرار", phrases: ["كم تكلفة تطوير تطبيق ويب", "الفرق بين الموقع الالكتروني وتطبيق الويب", "كم يستغرق تطوير نظام ويب", "شراء نظام جاهز ام تطوير نظام مخصص"] },
            { label: "حسب السوق", phrases: ["شركة برمجة انظمة في السعودية", "تطوير انظمة مخصصة للشركات في الخليج", "افضل شركة تطوير تطبيقات ويب في الامارات"] },
        ],
    },
    },
    '/services/website-development': {
    en: {
        heading: "What businesses search for when they need a website",
        intro: "Whether it is a first website or a complete rebuild, companies across Oman and the wider Gulf find CloudTopia through searches like these.",
        groups: [
            { label: "Head terms", phrases: ["website development company", "web design and development services", "professional website design", "responsive website development"] },
            { label: "Local intent", phrases: ["web development company in Oman", "website design company in Muscat", "bilingual Arabic English website design", "best website company in the GCC"] },
            { label: "Costs & comparisons", phrases: ["how much does a website cost in Oman", "custom website vs website builder", "best web development company for small business"] },
        ],
    },
    ar: {
        heading: "ما يكتبه أصحاب الأعمال عندما يحتاجون موقعًا",
        intro: "سواء كان موقعك الأول أو إعادة بناء كاملة، تصل الشركات في عُمان والخليج إلى كلاود توبيا عبر عبارات البحث هذه.",
        groups: [
            { label: "عبارات أساسية", phrases: ["شركة تصميم مواقع", "تصميم موقع الكتروني احترافي", "انشاء موقع لشركة", "تطوير مواقع انترنت"] },
            { label: "بحث محلي", phrases: ["شركة تصميم مواقع في عمان", "تصميم مواقع في مسقط", "أفضل شركة مواقع في الخليج", "تصميم موقع بالعربي والانجليزي"] },
            { label: "التكلفة والمقارنات", phrases: ["كم سعر تصميم موقع الكتروني", "الفرق بين موقع جاهز وموقع مخصص", "تكلفة تجديد موقع قديم", "عروض تصميم مواقع للشركات"] },
        ],
    },
    },
}
