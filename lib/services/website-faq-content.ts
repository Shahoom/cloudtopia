// Bespoke FAQ content per website sub-service. This is the SEO engine of each
// page: questions are phrased the way people actually search (cost, timeline,
// ownership, bilingual, integrations), and answers are honest and specific —
// no inflated claims. The page renders these in the FAQ accordion AND emits a
// matching FAQPage JSON-LD so the same Q&As can win Google "People also ask".

export type FaqQA = { q: string; a: string };
export type FaqBlock = { eyebrow: string; heading: string; subheading: string; items: FaqQA[] };
type Locale = "en" | "ar";

export const websiteFaqContent: Record<string, Record<Locale, FaqBlock>> = {
    "business-website-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Business website questions, answered",
            subheading: "Straight answers about cost, timeline, ownership, and what you actually get.",
            items: [
                { q: "How much does a business website cost?", a: "Every site is quoted to its exact scope after a free consultation — there's no one-size sticker price. You get a clear written quote before any work begins, and you can compare package levels on our pricing page." },
                { q: "How long does it take to build a business website?", a: "Most business websites launch in about 3–5 weeks, depending on the number of pages, content readiness, and integrations. We confirm the exact timeline in writing after discovery." },
                { q: "What's included in a CloudTopia business website?", a: "Discovery and scope, responsive bilingual design, an SEO-ready build, contact and lead capture, analytics setup, and a full handover of accounts and code. Hosting, domain, and email setup can be included too." },
                { q: "Do I own the website and the code?", a: "Yes — 100%. You receive the code, design files, accounts, and documentation at handover, with no lock-in. The site is yours to keep, move, or extend." },
                { q: "Will the website work in both Arabic and English?", a: "Yes. We build native Arabic and English experiences with full right-to-left (RTL) support, so both audiences get a first-class, properly localized site — not a machine translation." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن مواقع الشركات، بإجابات واضحة",
            subheading: "إجابات مباشرة حول التكلفة والمدة والملكية وما تحصل عليه فعلاً.",
            items: [
                { q: "كم تكلفة موقع الشركة؟", a: "كل موقع يُسعّر حسب نطاقه بعد استشارة مجانية — لا يوجد سعر موحّد. تحصل على عرض سعر مكتوب قبل بدء أي عمل، ويمكنك مقارنة مستويات الباقات في صفحة الأسعار." },
                { q: "كم يستغرق بناء موقع الشركة؟", a: "تُطلق معظم مواقع الشركات خلال 3–5 أسابيع تقريباً، حسب عدد الصفحات وجاهزية المحتوى والتكاملات. نؤكد المدة الدقيقة كتابياً بعد الاكتشاف." },
                { q: "ماذا يشمل موقع كلاود توبيا للشركات؟", a: "اكتشاف وتحديد نطاق، تصميم متجاوب بلغتين، بناء مهيأ للـ SEO، نماذج تواصل والتقاط عملاء، إعداد تحليلات، وتسليم كامل للحسابات والكود. ويمكن تضمين الاستضافة والنطاق والبريد." },
                { q: "هل أملك الموقع والكود؟", a: "نعم — 100%. تستلم الكود وملفات التصميم والحسابات والتوثيق عند التسليم، دون أي تقييد. الموقع ملكك تحتفظ به أو تنقله أو توسّعه." },
                { q: "هل يعمل الموقع بالعربية والإنجليزية؟", a: "نعم. نبني تجربتين عربية وإنجليزية أصليتين بدعم كامل لاتجاه RTL، ليحصل الجمهوران على موقع محلّي من الطراز الأول — لا ترجمة آلية." },
            ],
        },
    },
    "landing-page-design": {
        en: {
            eyebrow: "FAQ",
            heading: "Landing page questions, answered",
            subheading: "What it costs, how fast it ships, and what makes it convert.",
            items: [
                { q: "How much does a landing page cost?", a: "Landing pages are quoted by scope and number of variants after a quick consultation. They're typically our most affordable build, and you'll get a fixed written quote before we start." },
                { q: "How long does it take to build a landing page?", a: "A focused landing page usually goes live in 1–2 weeks once copy and assets are ready. Rush timelines are possible — just tell us your campaign date." },
                { q: "What makes a landing page convert?", a: "One clear goal, a message that matches your ad, fast load times, a friction-free form, and trust signals placed where they count. We design around the conversion, not just the look." },
                { q: "Can you add tracking and analytics?", a: "Yes. We wire events, goals, and pixels (Google, Meta, and more) from the start so you can measure conversions and optimize ad spend from day one." },
                { q: "Do you write the copy too?", a: "We can. Strong, benefit-led copy is a big part of what makes a page convert, and we'll craft Arabic and English versions tuned to your audience." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن صفحات الهبوط، بإجابات واضحة",
            subheading: "كم تكلّف، وكم تستغرق، وما الذي يجعلها تحوّل.",
            items: [
                { q: "كم تكلفة صفحة الهبوط؟", a: "تُسعّر صفحات الهبوط حسب النطاق وعدد النسخ بعد استشارة سريعة. غالباً ما تكون أوفر بناء لدينا، وتحصل على عرض سعر مكتوب قبل البدء." },
                { q: "كم يستغرق بناء صفحة هبوط؟", a: "تُطلق الصفحة المركّزة عادة خلال 1–2 أسبوع بمجرد جهوزية المحتوى والأصول. والتنفيذ السريع ممكن — فقط أخبرنا بموعد حملتك." },
                { q: "ما الذي يجعل صفحة الهبوط تحوّل؟", a: "هدف واحد واضح، رسالة تطابق إعلانك، تحميل سريع، نموذج بلا احتكاك، وإشارات ثقة في مواضعها. نصمّم حول التحويل لا المظهر فقط." },
                { q: "هل تضيفون التتبّع والتحليلات؟", a: "نعم. نربط الأحداث والأهداف والبكسلات (جوجل وميتا وغيرها) من البداية لتقيس التحويلات وتحسّن إنفاق الإعلان من اليوم الأول." },
                { q: "هل تكتبون المحتوى أيضاً؟", a: "نعم. النص القوي القائم على الفائدة جزء كبير مما يجعل الصفحة تحوّل، وسنكتب نسختين عربية وإنجليزية مهيأتين لجمهورك." },
            ],
        },
    },
    "corporate-website-design": {
        en: {
            eyebrow: "FAQ",
            heading: "Corporate website questions, answered",
            subheading: "Cost, timeline, governance, and brand consistency.",
            items: [
                { q: "How much does a corporate website cost?", a: "Corporate sites are quoted to scope — pages, content depth, integrations, and governance needs all factor in. You'll get a fixed written proposal after a free consultation." },
                { q: "How long does a corporate website take?", a: "Most corporate sites take 4–8 weeks depending on the number of sections, stakeholders, and content readiness. We confirm the schedule in writing after discovery." },
                { q: "What's included in a corporate website?", a: "A refined visual identity, structured sections for leadership, services, case studies and investors, a maintainable CMS, bilingual content, and SEO foundations — plus full ownership handover." },
                { q: "Can you match our existing brand guidelines?", a: "Yes. We work within your brand — colors, typography, and tone — to keep everything consistent and boardroom-ready across every page and both languages." },
                { q: "Can our team update the website ourselves?", a: "Yes. We build on a clear CMS and hand over training and documentation, so your team can manage content across departments and regions without a developer." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن المواقع المؤسسية، بإجابات واضحة",
            subheading: "التكلفة والمدة والحوكمة واتساق العلامة.",
            items: [
                { q: "كم تكلفة الموقع المؤسسي؟", a: "تُسعّر المواقع المؤسسية حسب النطاق — الصفحات وعمق المحتوى والتكاملات واحتياجات الحوكمة. تحصل على عرض مكتوب بعد استشارة مجانية." },
                { q: "كم يستغرق الموقع المؤسسي؟", a: "تستغرق معظم المواقع المؤسسية 4–8 أسابيع حسب عدد الأقسام وأصحاب المصلحة وجاهزية المحتوى. نؤكد الجدول كتابياً بعد الاكتشاف." },
                { q: "ماذا يشمل الموقع المؤسسي؟", a: "هوية بصرية راقية، أقسام منظّمة للقيادة والخدمات ودراسات الحالة والمستثمرين، نظام إدارة محتوى قابل للصيانة، محتوى بلغتين، وأساسيات SEO — مع تسليم كامل للملكية." },
                { q: "هل تلتزمون بدليل علامتنا؟", a: "نعم. نعمل ضمن علامتك — الألوان والخطوط والنبرة — للحفاظ على الاتساق والجاهزية على أعلى مستوى في كل صفحة وباللغتين." },
                { q: "هل يستطيع فريقنا تحديث الموقع بنفسه؟", a: "نعم. نبني على نظام إدارة واضح ونسلّم تدريباً وتوثيقاً، ليدير فريقك المحتوى عبر الأقسام والمناطق دون مطوّر." },
            ],
        },
    },
    "ecommerce-website-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Online store questions, answered",
            subheading: "Cost, timeline, payments, and scaling.",
            items: [
                { q: "How much does an online store cost?", a: "E-commerce builds are quoted by catalog size, features, and integrations after a free consultation. You'll get a fixed written quote before any work starts." },
                { q: "How long does it take to build an online store?", a: "Most stores launch in 4–8 weeks depending on product count, payment and shipping setup, and integrations. The exact timeline is confirmed after discovery." },
                { q: "Which payment methods can you integrate?", a: "We integrate trusted gateways including Mada, Apple Pay, card payments, and cash on delivery, with secure SSL checkout suited to GCC shoppers." },
                { q: "Can the store handle Arabic and English products?", a: "Yes. We build bilingual storefronts with full RTL, so product pages, checkout, and emails all work naturally in both languages." },
                { q: "Can the store grow with my business?", a: "Yes. We build on a scalable structure that handles more products, promotions, and traffic over time, and we can connect inventory, CRM, or analytics as you grow." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن المتاجر الإلكترونية، بإجابات واضحة",
            subheading: "التكلفة والمدة والدفع والتوسّع.",
            items: [
                { q: "كم تكلفة المتجر الإلكتروني؟", a: "تُسعّر المتاجر حسب حجم الكتالوج والميزات والتكاملات بعد استشارة مجانية. تحصل على عرض سعر مكتوب قبل بدء أي عمل." },
                { q: "كم يستغرق بناء متجر إلكتروني؟", a: "تُطلق معظم المتاجر خلال 4–8 أسابيع حسب عدد المنتجات وإعداد الدفع والشحن والتكاملات. تُؤكد المدة بعد الاكتشاف." },
                { q: "ما طرق الدفع التي تدمجونها؟", a: "ندمج بوابات موثوقة تشمل مدى وApple Pay والبطاقات والدفع عند الاستلام، مع دفع آمن عبر SSL مناسب لمتسوّقي الخليج." },
                { q: "هل يدعم المتجر منتجات بالعربية والإنجليزية؟", a: "نعم. نبني واجهات بلغتين بدعم RTL كامل، لتعمل صفحات المنتجات والدفع والرسائل بشكل طبيعي باللغتين." },
                { q: "هل ينمو المتجر مع أعمالي؟", a: "نعم. نبني على بنية قابلة للتوسّع تستوعب المزيد من المنتجات والعروض والزيارات، ويمكننا ربط المخزون أو الـ CRM أو التحليلات مع نموّك." },
            ],
        },
    },
    "portfolio-websites": {
        en: {
            eyebrow: "FAQ",
            heading: "Portfolio website questions, answered",
            subheading: "Cost, timeline, updates, and getting hired.",
            items: [
                { q: "How much does a portfolio website cost?", a: "Portfolios are quoted to scope and number of projects after a quick consultation — usually one of our lighter builds. You'll get a fixed written quote first." },
                { q: "How long does a portfolio website take?", a: "A focused portfolio typically launches in 2–3 weeks once your images and project details are ready." },
                { q: "Can I add new projects myself?", a: "Yes. We build it so you can add or update projects in minutes through a simple CMS — no developer needed and no broken layouts." },
                { q: "Will my images stay sharp and load fast?", a: "Yes. We optimize every image so your work looks crisp on any screen while pages still load quickly." },
                { q: "Will it help me get hired?", a: "That's the goal. We design around your best work with clear contact paths and calls-to-action that turn visitors into enquiries." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن مواقع الأعمال، بإجابات واضحة",
            subheading: "التكلفة والمدة والتحديث والحصول على عملاء.",
            items: [
                { q: "كم تكلفة موقع معرض الأعمال؟", a: "تُسعّر مواقع الأعمال حسب النطاق وعدد المشاريع بعد استشارة سريعة — وغالباً من أخفّ أعمالنا. تحصل على عرض سعر مكتوب أولاً." },
                { q: "كم يستغرق موقع معرض الأعمال؟", a: "يُطلق الموقع المركّز عادة خلال 2–3 أسابيع بمجرد جهوزية صورك وتفاصيل مشاريعك." },
                { q: "هل أضيف مشاريع جديدة بنفسي؟", a: "نعم. نبنيه لتضيف أو تحدّث المشاريع في دقائق عبر نظام إدارة بسيط — دون مطوّر ودون تخطيط معطوب." },
                { q: "هل تبقى صوري حادة وسريعة التحميل؟", a: "نعم. نحسّن كل صورة ليبدو عملك واضحاً على أي شاشة مع بقاء الصفحات سريعة." },
                { q: "هل يساعدني على الحصول على عملاء؟", a: "هذا هو الهدف. نصمّم حول أفضل أعمالك مع مسارات تواصل ودعوات واضحة تحوّل الزائر إلى استفسار." },
            ],
        },
    },
    "real-estate-website-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Real estate website questions, answered",
            subheading: "Cost, timeline, listings, and lead capture.",
            items: [
                { q: "How much does a real estate website cost?", a: "Quoted by scope — number of listings, search features, and integrations — after a free consultation, with a fixed written quote before we start." },
                { q: "How long does it take to build a property website?", a: "Most real estate sites launch in 4–8 weeks depending on listing volume, map and search features, and integrations." },
                { q: "Can buyers search and filter listings?", a: "Yes. We build searchable, filterable listings with photos, maps, and details so buyers can quickly find properties that fit." },
                { q: "How do I capture leads from the site?", a: "Enquiry forms, WhatsApp, and viewing requests route hot leads straight to your team, so no opportunity slips through." },
                { q: "Can it handle Arabic and English listings?", a: "Yes. Listings, search, and contact all work in both languages with full RTL, tuned for buyers across the GCC." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن المواقع العقارية، بإجابات واضحة",
            subheading: "التكلفة والمدة والقوائم والتقاط العملاء.",
            items: [
                { q: "كم تكلفة الموقع العقاري؟", a: "يُسعّر حسب النطاق — عدد القوائم وميزات البحث والتكاملات — بعد استشارة مجانية، مع عرض سعر مكتوب قبل البدء." },
                { q: "كم يستغرق بناء موقع عقاري؟", a: "تُطلق معظم المواقع العقارية خلال 4–8 أسابيع حسب حجم القوائم وميزات الخرائط والبحث والتكاملات." },
                { q: "هل يستطيع المشتري البحث وفلترة القوائم؟", a: "نعم. نبني قوائم قابلة للبحث والفلترة بصور وخرائط وتفاصيل ليجد المشتري بسرعة ما يناسبه." },
                { q: "كيف ألتقط العملاء من الموقع؟", a: "نماذج استفسار وواتساب وطلبات معاينة توجّه العملاء المهتمين مباشرة إلى فريقك، فلا تضيع أي فرصة." },
                { q: "هل يدعم قوائم بالعربية والإنجليزية؟", a: "نعم. القوائم والبحث والتواصل تعمل باللغتين بدعم RTL كامل، مهيأة لمشترين في الخليج." },
            ],
        },
    },
    "restaurant-website-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Restaurant website questions, answered",
            subheading: "Cost, timeline, ordering, and getting found.",
            items: [
                { q: "How much does a restaurant website cost?", a: "Quoted by scope — menu, reservations, QR ordering, and integrations — after a free consultation, with a fixed written quote first." },
                { q: "How long does a restaurant website take?", a: "Most restaurant sites launch in 2–4 weeks, and we can prioritize menus and ordering ahead of an opening date." },
                { q: "Can you add online reservations and QR ordering?", a: "Yes. We build table booking and scan-to-order that work smoothly during your busiest service, mobile-first." },
                { q: "Will my restaurant show up on Google and Maps?", a: "Yes. We set up local SEO and Google Maps and build fast mobile pages so nearby diners find you and order." },
                { q: "Can the menu be in Arabic and English?", a: "Yes. Menus and the whole site work in both languages with full RTL, so every guest orders with confidence." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن مواقع المطاعم، بإجابات واضحة",
            subheading: "التكلفة والمدة والطلب والظهور في البحث.",
            items: [
                { q: "كم تكلفة موقع المطعم؟", a: "يُسعّر حسب النطاق — القائمة والحجوزات والطلب عبر QR والتكاملات — بعد استشارة مجانية، مع عرض سعر مكتوب أولاً." },
                { q: "كم يستغرق موقع المطعم؟", a: "تُطلق معظم مواقع المطاعم خلال 2–4 أسابيع، ويمكننا إعطاء الأولوية للقوائم والطلب قبل موعد الافتتاح." },
                { q: "هل تضيفون الحجوزات والطلب عبر QR؟", a: "نعم. نبني حجز الطاولات والطلب بالمسح ليعملا بسلاسة في أوقات الذروة، وبواجهة جوال أولاً." },
                { q: "هل يظهر مطعمي في جوجل والخرائط؟", a: "نعم. نُعدّ تحسيناً محلياً وخرائط جوجل ونبني صفحات جوال سريعة ليجدك الجائعون القريبون ويطلبوا." },
                { q: "هل تكون القائمة بالعربية والإنجليزية؟", a: "نعم. القوائم والموقع كله يعملان باللغتين بدعم RTL كامل، ليطلب كل ضيف بثقة." },
            ],
        },
    },
    "educational-website-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Education website questions, answered",
            subheading: "Cost, timeline, admissions, and portals.",
            items: [
                { q: "How much does an education website cost?", a: "Quoted by scope — programs, admissions, portals, and integrations — after a free consultation, with a fixed written quote before we start." },
                { q: "How long does an education website take?", a: "Most school and academy sites launch in 4–8 weeks depending on programs, content, and any student portal needs." },
                { q: "Can you add admissions and enrollment forms?", a: "Yes. We build clear program pages with simple enrollment and enquiry forms that turn interest into applications." },
                { q: "Can you build student or staff portals?", a: "Yes. We can add secure logins for resources, announcements, and class materials, scoped to what your institution needs." },
                { q: "Will it work for Arabic and English families?", a: "Yes. The whole site works in both languages with full RTL, so the entire community can find programs and apply." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن المواقع التعليمية، بإجابات واضحة",
            subheading: "التكلفة والمدة والقبول والبوابات.",
            items: [
                { q: "كم تكلفة الموقع التعليمي؟", a: "يُسعّر حسب النطاق — البرامج والقبول والبوابات والتكاملات — بعد استشارة مجانية، مع عرض سعر مكتوب قبل البدء." },
                { q: "كم يستغرق الموقع التعليمي؟", a: "تُطلق معظم مواقع المدارس والأكاديميات خلال 4–8 أسابيع حسب البرامج والمحتوى واحتياجات بوابة الطلاب." },
                { q: "هل تضيفون نماذج القبول والتسجيل؟", a: "نعم. نبني صفحات برامج واضحة بنماذج تسجيل واستفسار بسيطة تحوّل الاهتمام إلى طلبات." },
                { q: "هل تبنون بوابات للطلاب أو الكادر؟", a: "نعم. يمكننا إضافة تسجيل دخول آمن للموارد والإعلانات ومواد الصفوف، بحسب احتياج مؤسستك." },
                { q: "هل يناسب العائلات العربية والإنجليزية؟", a: "نعم. الموقع كله يعمل باللغتين بدعم RTL كامل، ليجد المجتمع كله البرامج ويتقدّم بالطلبات." },
            ],
        },
    },
    "website-redesign": {
        en: {
            eyebrow: "FAQ",
            heading: "Website redesign questions, answered",
            subheading: "Cost, timeline, and protecting your rankings.",
            items: [
                { q: "How much does a website redesign cost?", a: "Quoted by scope — page count, content migration, and new features — after a free consultation, with a fixed written quote first." },
                { q: "How long does a redesign take?", a: "Most redesigns take 3–6 weeks depending on size and how much content is migrated or rewritten." },
                { q: "Will I lose my Google rankings?", a: "No — protecting your SEO is a priority. We map careful redirects and preserve structure so you modernize the look without losing hard-won rankings." },
                { q: "Can you keep my existing content?", a: "Yes. We audit, improve, and migrate your existing content, so nothing important is lost in the move." },
                { q: "Will the new site be faster and mobile-friendly?", a: "Yes. You get a modern, responsive design with the speed and polish today's visitors and Google expect." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن إعادة تصميم المواقع، بإجابات واضحة",
            subheading: "التكلفة والمدة وحماية ترتيبك في البحث.",
            items: [
                { q: "كم تكلفة إعادة تصميم الموقع؟", a: "يُسعّر حسب النطاق — عدد الصفحات ونقل المحتوى والميزات الجديدة — بعد استشارة مجانية، مع عرض سعر مكتوب أولاً." },
                { q: "كم تستغرق إعادة التصميم؟", a: "تستغرق معظم عمليات إعادة التصميم 3–6 أسابيع حسب الحجم وكمية المحتوى المنقول أو المعاد كتابته." },
                { q: "هل أفقد ترتيبي في جوجل؟", a: "لا — حماية الـ SEO أولوية. نخطط إعادة توجيه دقيقة ونحافظ على البنية لتحدّث المظهر دون فقدان ترتيبك المكتسب بجهد." },
                { q: "هل تحتفظون بمحتواي الحالي؟", a: "نعم. ندقّق محتواك الحالي ونحسّنه وننقله، فلا يضيع ما يهم في الانتقال." },
                { q: "هل سيكون الموقع الجديد أسرع ومتجاوباً؟", a: "نعم. تحصل على تصميم عصري ومتجاوب بالسرعة واللمسة التي يتوقعها زوار اليوم وجوجل." },
            ],
        },
    },
    "website-maintenance": {
        en: {
            eyebrow: "FAQ",
            heading: "Website maintenance questions, answered",
            subheading: "What's covered, how fast, and pricing.",
            items: [
                { q: "How much does website maintenance cost?", a: "Maintenance is offered as a simple monthly plan scoped to your site and needs. You'll know the price up front — no surprise hourly bills." },
                { q: "What's included in website maintenance?", a: "Regular backups, security and software updates, uptime monitoring, performance checks, and quick content edits when you need them." },
                { q: "How fast are content changes handled?", a: "Send us the change and we handle the update without breaking your layout — typically within one business day, faster for urgent fixes." },
                { q: "Do you maintain sites you didn't build?", a: "Often, yes. After a short review of your current site and hosting, we'll confirm what we can support and flag anything that needs attention first." },
                { q: "What happens if my site goes down?", a: "Monitoring alerts us to issues, and with backups in place we can restore quickly — one responsive team to call instead of chasing freelancers." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن صيانة المواقع، بإجابات واضحة",
            subheading: "ما الذي تشمله، وكم تستغرق، والتسعير.",
            items: [
                { q: "كم تكلفة صيانة الموقع؟", a: "تُقدَّم الصيانة كخطة شهرية بسيطة بحسب موقعك واحتياجك. تعرف السعر مسبقاً — بلا فواتير ساعية مفاجئة." },
                { q: "ماذا تشمل صيانة الموقع؟", a: "نسخ احتياطي منتظم، تحديثات أمان وبرمجيات، مراقبة جهوزية، فحوصات أداء، وتعديلات محتوى سريعة عند الحاجة." },
                { q: "ما سرعة تنفيذ تغييرات المحتوى؟", a: "أرسل لنا التغيير ونتولّى التحديث دون كسر تخطيطك — عادة خلال يوم عمل واحد، وأسرع للإصلاحات العاجلة." },
                { q: "هل تصونون مواقع لم تبنوها؟", a: "غالباً نعم. بعد مراجعة قصيرة لموقعك واستضافتك الحاليين، نؤكد ما يمكننا دعمه وننبّه لما يحتاج معالجة أولاً." },
                { q: "ماذا يحدث إذا توقّف موقعي؟", a: "تنبّهنا المراقبة للمشكلات، ومع وجود النسخ الاحتياطي نستعيده بسرعة — فريق واحد سريع تتصل به بدل ملاحقة المستقلين." },
            ],
        },
    },
};

export function getWebsiteFaq(slug: string, locale: string): FaqBlock | null {
    const entry = websiteFaqContent[slug];
    if (!entry) return null;
    return entry[locale === "ar" ? "ar" : "en"];
}
