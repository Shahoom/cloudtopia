// Bespoke, per-sub-service content for the website-design / website-development
// detail pages (the `digital-presence` website-creation services). The visual
// design + section components are shared across all of these pages, but the COPY
// is hand-crafted per service here — never string-templated from the slug — so
// each page reads uniquely for users and search engines.
//
// A slug present here renders the new bespoke website design; any slug NOT here
// falls back to the shared /services/[service] template, untouched.

import type { FeaturesBentoContent } from "@/components/ui/features-bento";

export type ServiceLocale = "en" | "ar";

export type HeroContent = {
    /** Small eyebrow / pill label above the title. */
    badge: string;
    /** First line of the H1 (neutral/dark). */
    title1: string;
    /** Second line of the H1 (brand gradient) — carries the primary keyword. */
    title2: string;
    /** One- to two-sentence value proposition under the H1. */
    subtitle: string;
};

export type WebsiteServiceContent = {
    /** Section 1 — the geometric hero. */
    hero: Record<ServiceLocale, HeroContent>;
    /** Section 2 — the bento features grid. */
    features: Record<ServiceLocale, FeaturesBentoContent>;
};

export const websiteServiceContent: Record<string, WebsiteServiceContent> = {
    "business-website-development": {
        hero: {
            en: {
                badge: "Business Websites",
                title1: "Business websites that",
                title2: "turn visitors into customers",
                subtitle:
                    "A fast, multilingual business website engineered around your services, your leads, and your growth — and owned 100% by you.",
            },
            ar: {
                badge: "مواقع الشركات",
                title1: "مواقع شركات",
                title2: "تحوّل الزوار إلى عملاء",
                subtitle:
                    "موقع أعمال سريع ومتعدد اللغات مبني حول خدماتك وعملائك ونموّك — وتملكه بالكامل.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "Everything a business website needs to win work",
                stat: { value: "100%", title: "Yours to own" },
                items: [
                    { title: "Secure & SEO-ready", description: "Clean semantic code, SSL, and technical SEO baked in from day one — so Google and your customers both trust it." },
                    { title: "Built to convert", description: "Clear structure, sharp copy, and fast pages that turn visitors into enquiries, calls, and booked work." },
                    { title: "Fast and dependable", description: "Optimized images, modern hosting, and 90+ performance scores that keep the site quick on every device." },
                    { title: "Arabic + English, done right", description: "Native bilingual content with full RTL support, so both audiences get a first-class experience." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "كل ما يحتاجه موقع أعمالك ليجلب العملاء",
                stat: { value: "100%", title: "ملك لك بالكامل" },
                items: [
                    { title: "آمن ومهيأ للبحث", description: "كود نظيف ودلالي، وشهادة SSL، وأساسيات SEO تقنية منذ اليوم الأول — ليثق به جوجل وعملاؤك معاً." },
                    { title: "مبني للتحويل", description: "بنية واضحة ونصوص مقنعة وصفحات سريعة تحوّل الزوار إلى استفسارات ومكالمات وأعمال مؤكدة." },
                    { title: "سريع وموثوق", description: "صور محسّنة واستضافة حديثة ودرجات أداء 90+ تبقي الموقع سريعاً على كل جهاز." },
                    { title: "عربي وإنجليزي كما يجب", description: "محتوى ثنائي اللغة أصلي بدعم RTL كامل، ليحصل الجمهوران على تجربة من الطراز الأول." },
                ],
            },
        },
    },
    "landing-page-design": {
        hero: {
            en: {
                badge: "Landing Pages",
                title1: "Landing pages built",
                title2: "to convert, not just look good",
                subtitle:
                    "High-converting, lightning-fast landing pages for campaigns, launches, and ads — with the copy, structure, and tracking that win the click.",
            },
            ar: {
                badge: "صفحات الهبوط",
                title1: "صفحات هبوط مصمّمة",
                title2: "للتحويل لا للمظهر فقط",
                subtitle:
                    "صفحات هبوط سريعة وعالية التحويل للحملات والإطلاقات والإعلانات — بمحتوى وبنية وتتبّع يكسب النقرة.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "Landing pages engineered to convert",
                stat: { value: "1", title: "Goal per page" },
                items: [
                    { title: "Message-matched", description: "Copy and design that mirror your ad or campaign, so visitors instantly feel they're in the right place." },
                    { title: "Conversion-first layout", description: "A single clear call-to-action, friction-free forms, and trust signals placed exactly where they count." },
                    { title: "Loads in a blink", description: "Lean, fast pages that hold attention and protect your ad Quality Score and budget." },
                    { title: "Tracking built in", description: "Events, goals, and pixels wired from day one so you can measure and improve every campaign." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "صفحات هبوط مصمَّمة للتحويل",
                stat: { value: "1", title: "هدف واحد لكل صفحة" },
                items: [
                    { title: "مطابقة للرسالة", description: "نصوص وتصميم يعكسان إعلانك أو حملتك، ليشعر الزائر فوراً أنه في المكان الصحيح." },
                    { title: "تصميم يركّز على التحويل", description: "دعوة واحدة واضحة لاتخاذ إجراء، ونماذج بلا احتكاك، وإشارات ثقة في مواضعها المؤثرة." },
                    { title: "تحميل في لمح البصر", description: "صفحات خفيفة وسريعة تحافظ على الانتباه وتحمي درجة جودة إعلانك وميزانيته." },
                    { title: "تتبّع جاهز", description: "أحداث وأهداف وبكسلات مهيأة من اليوم الأول لتقيس وتحسّن كل حملة." },
                ],
            },
        },
    },
    "corporate-website-design": {
        hero: {
            en: {
                badge: "Corporate Websites",
                title1: "Corporate websites with",
                title2: "the authority your brand deserves",
                subtitle:
                    "Polished, credible corporate sites for established companies — investor-ready, multilingual, and built to represent you at the highest level.",
            },
            ar: {
                badge: "المواقع المؤسسية",
                title1: "مواقع مؤسسية",
                title2: "بالمصداقية التي تليق بعلامتك",
                subtitle:
                    "مواقع مؤسسية أنيقة وموثوقة للشركات الراسخة — متعددة اللغات وجاهزة لتمثيلك على أعلى مستوى.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "A corporate presence that earns trust",
                stat: { value: "1st", title: "Impressions that win" },
                items: [
                    { title: "Boardroom-grade design", description: "A refined, consistent visual identity that represents your company at the level your stakeholders expect." },
                    { title: "Structured for credibility", description: "Clear sections for leadership, services, case studies, and investor information — easy to navigate, easy to trust." },
                    { title: "Governed & scalable", description: "A maintainable CMS and content model your team can grow across departments and regions." },
                    { title: "Bilingual by design", description: "Polished Arabic and English experiences with full RTL, so every market sees a first-class brand." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "حضور مؤسسي يكسب الثقة",
                stat: { value: "1st", title: "انطباع أول يدوم" },
                items: [
                    { title: "تصميم بمستوى الإدارة", description: "هوية بصرية راقية ومتسقة تمثّل شركتك بالمستوى الذي يتوقعه شركاؤك." },
                    { title: "منظّم للمصداقية", description: "أقسام واضحة للقيادة والخدمات ودراسات الحالة ومعلومات المستثمرين — سهل التصفح، جدير بالثقة." },
                    { title: "قابل للحوكمة والتوسّع", description: "نظام إدارة محتوى قابل للصيانة ونموذج محتوى ينمو عبر الأقسام والمناطق." },
                    { title: "ثنائي اللغة بالتصميم", description: "تجربتان عربية وإنجليزية متقنتان بدعم RTL كامل، ليرى كل سوق علامة من الطراز الأول." },
                ],
            },
        },
    },
    "ecommerce-website-development": {
        hero: {
            en: {
                badge: "E-commerce Websites",
                title1: "Online stores designed",
                title2: "to sell around the clock",
                subtitle:
                    "Conversion-focused e-commerce builds with secure checkout, fast catalogs, and Arabic + English storefronts your customers trust.",
            },
            ar: {
                badge: "المتاجر الإلكترونية",
                title1: "متاجر إلكترونية مصمّمة",
                title2: "لتبيع على مدار الساعة",
                subtitle:
                    "متاجر تركّز على التحويل بدفع آمن وكتالوج سريع وواجهات عربية وإنجليزية يثق بها عملاؤك.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "An online store built to sell",
                stat: { value: "24/7", title: "Selling, even while you sleep" },
                items: [
                    { title: "Secure checkout", description: "Trusted payment gateways, SSL, and a smooth checkout that protects customers and reduces abandoned carts." },
                    { title: "Fast product discovery", description: "Search, filters, and lightning-fast catalog pages that help shoppers find and buy in seconds." },
                    { title: "Built to scale", description: "From ten products to ten thousand — a structure that grows with inventory, promotions, and traffic spikes." },
                    { title: "Arabic + English storefront", description: "Bilingual product content with RTL, so every shopper buys in the language they trust." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "متجر إلكتروني مبني للبيع",
                stat: { value: "24/7", title: "يبيع حتى وأنت نائم" },
                items: [
                    { title: "دفع آمن", description: "بوابات دفع موثوقة وSSL ودفع سلس يحمي العملاء ويقلّل السلات المتروكة." },
                    { title: "اكتشاف سريع للمنتجات", description: "بحث وفلاتر وصفحات كتالوج سريعة تساعد المتسوّق على الإيجاد والشراء في ثوانٍ." },
                    { title: "مبني للتوسّع", description: "من عشرة منتجات إلى عشرة آلاف — بنية تنمو مع المخزون والعروض وذروة الزيارات." },
                    { title: "واجهة عربية وإنجليزية", description: "محتوى منتجات ثنائي اللغة بدعم RTL ليشتري كل متسوّق باللغة التي يثق بها." },
                ],
            },
        },
    },
    "portfolio-websites": {
        hero: {
            en: {
                badge: "Portfolio Websites",
                title1: "Portfolio websites that",
                title2: "make your work unforgettable",
                subtitle:
                    "Striking, image-first portfolios for creatives, studios, and professionals — designed to showcase the work and book the next client.",
            },
            ar: {
                badge: "مواقع معرض الأعمال",
                title1: "مواقع أعمال",
                title2: "تجعل إبداعك لا يُنسى",
                subtitle:
                    "مواقع معرض أعمال بصرية لافتة للمبدعين والاستوديوهات والمحترفين — تبرز عملك وتجلب العميل التالي.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "A portfolio that books the next client",
                stat: { value: "100%", title: "Focus on your work" },
                items: [
                    { title: "Image-first design", description: "A clean, gallery-led layout that lets your work take center stage without distraction." },
                    { title: "Fast, crisp visuals", description: "Optimized media that loads instantly and keeps every project looking sharp on any screen." },
                    { title: "Easy to update", description: "Add new projects yourself in minutes — no developer needed, no broken layouts." },
                    { title: "Built to get you hired", description: "Clear contact paths and calls-to-action that turn admirers into enquiries." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "موقع أعمال يجلب العميل التالي",
                stat: { value: "100%", title: "التركيز على عملك" },
                items: [
                    { title: "تصميم يقدّم الصورة", description: "تخطيط نظيف يقوده المعرض يجعل عملك في الصدارة بلا تشتيت." },
                    { title: "صور سريعة وحادة", description: "وسائط محسّنة تُحمّل فوراً وتُبقي كل مشروع واضحاً على أي شاشة." },
                    { title: "سهل التحديث", description: "أضف مشاريعك بنفسك في دقائق — دون مطوّر ودون تخطيط معطوب." },
                    { title: "مبني ليوظّفك", description: "مسارات تواصل ودعوات واضحة تحوّل المعجبين إلى استفسارات." },
                ],
            },
        },
    },
    "real-estate-website-development": {
        hero: {
            en: {
                badge: "Real Estate Websites",
                title1: "Real estate websites with",
                title2: "listings that close deals",
                subtitle:
                    "Property platforms with searchable listings, map views, and lead capture — built for agencies and developers across the Gulf.",
            },
            ar: {
                badge: "المواقع العقارية",
                title1: "مواقع عقارية",
                title2: "بقوائم تُغلق الصفقات",
                subtitle:
                    "منصات عقارية ببحث للقوائم وعرض على الخرائط والتقاط للعملاء — مبنية للمكاتب والمطوّرين في الخليج.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "A property platform that closes deals",
                stat: { value: "24/7", title: "Listings working for you" },
                items: [
                    { title: "Searchable listings", description: "Filterable property listings with photos, maps, and details that buyers can browse with ease." },
                    { title: "Lead capture built in", description: "Enquiry forms, WhatsApp, and viewing requests that route hot leads straight to your team." },
                    { title: "Map & location views", description: "Interactive maps and neighborhood context that help buyers picture the move." },
                    { title: "Bilingual for the Gulf", description: "Arabic and English listings with RTL, tuned for buyers across the GCC." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "منصة عقارية تُغلق الصفقات",
                stat: { value: "24/7", title: "قوائم تعمل لصالحك" },
                items: [
                    { title: "قوائم قابلة للبحث", description: "قوائم عقارية بفلاتر وصور وخرائط وتفاصيل يتصفحها المشتري بسهولة." },
                    { title: "التقاط العملاء مدمج", description: "نماذج استفسار وواتساب وطلبات معاينة توجّه العملاء المهتمين مباشرة إلى فريقك." },
                    { title: "عرض الخرائط والمواقع", description: "خرائط تفاعلية وسياق الأحياء يساعد المشتري على تصوّر الانتقال." },
                    { title: "ثنائي اللغة للخليج", description: "قوائم عربية وإنجليزية بدعم RTL، مهيأة لمشترين في الخليج." },
                ],
            },
        },
    },
    "restaurant-website-development": {
        hero: {
            en: {
                badge: "Restaurant Websites",
                title1: "Restaurant websites that",
                title2: "fill tables and take orders",
                subtitle:
                    "Mouth-watering restaurant sites with menus, reservations, and QR ordering — fast, mobile-first, and bilingual for every guest.",
            },
            ar: {
                badge: "مواقع المطاعم",
                title1: "مواقع مطاعم",
                title2: "تملأ الطاولات وتستقبل الطلبات",
                subtitle:
                    "مواقع مطاعم شهيّة بقوائم وحجوزات وطلب عبر QR — سريعة وبواجهة جوّال أولاً وبلغتين لكل ضيف.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "A restaurant site that fills tables",
                stat: { value: "QR", title: "Menu & orders built in" },
                items: [
                    { title: "Mouth-watering menus", description: "Beautiful, always-current menus with photos that make guests hungry before they even arrive." },
                    { title: "Reservations & QR ordering", description: "Table booking and scan-to-order that work smoothly through your busiest service." },
                    { title: "Found by hungry locals", description: "Local SEO, Google Maps, and fast mobile pages that bring nearby diners to your door." },
                    { title: "Bilingual for every guest", description: "Arabic and English menus with RTL, so every guest orders with confidence." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "موقع مطعم يملأ الطاولات",
                stat: { value: "QR", title: "قائمة وطلبات مدمجة" },
                items: [
                    { title: "قوائم شهية", description: "قوائم جميلة ومحدّثة دائماً بصور تفتح شهية الضيوف قبل وصولهم." },
                    { title: "حجوزات وطلب عبر QR", description: "حجز الطاولات والطلب بالمسح يعملان بسلاسة في أوقات الذروة." },
                    { title: "يجده سكان المنطقة", description: "تحسين محلي وخرائط جوجل وصفحات جوال سريعة تجلب الجائعين القريبين إلى بابك." },
                    { title: "بلغتين لكل ضيف", description: "قوائم عربية وإنجليزية بدعم RTL، ليطلب كل ضيف بثقة." },
                ],
            },
        },
    },
    "educational-website-development": {
        hero: {
            en: {
                badge: "Education Websites",
                title1: "Education websites built",
                title2: "to enroll and engage",
                subtitle:
                    "Websites for schools, academies, and course creators — with programs, admissions, and student portals that make learning easy to find.",
            },
            ar: {
                badge: "المواقع التعليمية",
                title1: "مواقع تعليمية",
                title2: "للتسجيل والتفاعل",
                subtitle:
                    "مواقع للمدارس والأكاديميات وصنّاع الدورات — ببرامج وقبول وبوابات طلاب تجعل التعلّم سهل الوصول.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "An education site that enrolls students",
                stat: { value: "100%", title: "Built around learners" },
                items: [
                    { title: "Programs made clear", description: "Courses, curricula, and schedules organized so students and parents find the right fit fast." },
                    { title: "Admissions that flow", description: "Simple enrollment forms and enquiry paths that turn interest into applications." },
                    { title: "Student & staff portals", description: "Secure logins for resources, announcements, and class materials when you need them." },
                    { title: "Bilingual for every family", description: "Arabic and English with RTL, so the whole community can learn and apply." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "موقع تعليمي يسجّل الطلاب",
                stat: { value: "100%", title: "مبني حول المتعلّم" },
                items: [
                    { title: "برامج واضحة", description: "دورات ومناهج وجداول منظّمة ليجد الطلاب وأولياء الأمور الخيار المناسب بسرعة." },
                    { title: "قبول سلس", description: "نماذج تسجيل بسيطة ومسارات استفسار تحوّل الاهتمام إلى طلبات." },
                    { title: "بوابات للطلاب والكادر", description: "تسجيل دخول آمن للموارد والإعلانات ومواد الصفوف عند الحاجة." },
                    { title: "بلغتين لكل عائلة", description: "عربي وإنجليزي بدعم RTL، ليتعلّم المجتمع كله ويتقدّم بالطلبات." },
                ],
            },
        },
    },
    "website-redesign": {
        hero: {
            en: {
                badge: "Website Redesign",
                title1: "Website redesigns that",
                title2: "modernize and outperform",
                subtitle:
                    "Turn a dated, slow site into a fast, modern, search-optimized experience — without losing your rankings or your content.",
            },
            ar: {
                badge: "إعادة تصميم المواقع",
                title1: "إعادة تصميم مواقع",
                title2: "تُحدّث وتتفوّق",
                subtitle:
                    "حوّل موقعاً قديماً وبطيئاً إلى تجربة حديثة وسريعة ومهيّأة للبحث — دون فقدان ترتيبك أو محتواك.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "A redesign that modernizes and outperforms",
                stat: { value: "0", title: "Rankings lost" },
                items: [
                    { title: "SEO preserved", description: "Careful redirects and structure so you modernize the look without losing your hard-won rankings." },
                    { title: "Faster and modern", description: "A current, responsive design with the performance and polish today's visitors expect." },
                    { title: "Content carried over", description: "Your existing content audited, improved, and migrated — nothing important left behind." },
                    { title: "Bilingual upgrade", description: "Clean Arabic and English with full RTL, fixing the gaps an older site left open." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "إعادة تصميم تُحدّث وتتفوّق",
                stat: { value: "0", title: "بلا خسارة في الترتيب" },
                items: [
                    { title: "حفظ الـ SEO", description: "إعادة توجيه وبنية دقيقة لتحدّث المظهر دون فقدان ترتيبك الذي بنيته بجهد." },
                    { title: "أسرع وأحدث", description: "تصميم عصري ومتجاوب بالأداء واللمسة التي يتوقعها زوار اليوم." },
                    { title: "نقل المحتوى", description: "تدقيق محتواك الحالي وتحسينه ونقله — دون ترك ما يهم." },
                    { title: "ترقية ثنائية اللغة", description: "عربي وإنجليزي نظيف بدعم RTL كامل، يعالج ثغرات الموقع القديم." },
                ],
            },
        },
    },
    "website-maintenance": {
        hero: {
            en: {
                badge: "Website Care",
                title1: "Website maintenance that",
                title2: "keeps you fast and secure",
                subtitle:
                    "Ongoing updates, backups, security, and performance care — so your website stays fast, safe, and online while you run your business.",
            },
            ar: {
                badge: "صيانة المواقع",
                title1: "صيانة مواقع",
                title2: "تبقيك سريعاً وآمناً",
                subtitle:
                    "تحديثات ونسخ احتياطي وأمان وعناية بالأداء — ليبقى موقعك سريعاً وآمناً ومتاحاً بينما تدير عملك.",
            },
        },
        features: {
            en: {
                eyebrow: "Why CloudTopia",
                heading: "Maintenance that keeps you fast and safe",
                stat: { value: "99.9%", title: "Uptime you can rely on" },
                items: [
                    { title: "Backups & security", description: "Regular backups, updates, and monitoring that keep your site protected and online." },
                    { title: "Performance care", description: "Ongoing speed and health checks so pages stay fast as content and traffic grow." },
                    { title: "Quick content edits", description: "Need a change? Send it over and we handle the updates without breaking your layout." },
                    { title: "One team to call", description: "A single, responsive point of contact instead of chasing freelancers when something breaks." },
                ],
            },
            ar: {
                eyebrow: "لماذا كلاود توبيا",
                heading: "صيانة تبقيك سريعاً وآمناً",
                stat: { value: "99.9%", title: "جهوزية يُعتمد عليها" },
                items: [
                    { title: "نسخ احتياطي وأمان", description: "نسخ وتحديثات ومراقبة منتظمة تُبقي موقعك محمياً ومتاحاً." },
                    { title: "عناية بالأداء", description: "فحوصات سرعة وصحة مستمرة لتبقى الصفحات سريعة مع نمو المحتوى والزيارات." },
                    { title: "تعديلات محتوى سريعة", description: "تحتاج تغييراً؟ أرسله ونتولّى التحديث دون كسر تخطيطك." },
                    { title: "فريق واحد تتصل به", description: "نقطة تواصل واحدة سريعة بدل ملاحقة المستقلين عند أي عطل." },
                ],
            },
        },
    },
};

/** Stable list of the website sub-service slugs that use the new bespoke design. */
export const websiteServiceSlugs = Object.keys(websiteServiceContent);

/** Returns bespoke content for a website sub-service, or null to fall back to the shared template. */
export function getWebsiteServiceContent(slug: string): WebsiteServiceContent | null {
    return websiteServiceContent[slug] ?? null;
}

/** Narrow a raw locale string to the supported set. */
export function asServiceLocale(locale: string): ServiceLocale {
    return locale === "ar" ? "ar" : "en";
}
