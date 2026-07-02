// Bespoke FAQ content per interactive-web-application sub-service. This is the
// SEO engine of each page: questions are phrased the way people actually search
// (cost, timeline, ownership, integrations, platform specifics), answers are
// honest and specific — no inflated claims. The page renders these in the FAQ
// accordion AND emits a matching FAQPage JSON-LD to win Google "People also ask".

export type FaqQA = { q: string; a: string };
export type FaqBlock = { eyebrow: string; heading: string; subheading: string; items: FaqQA[] };
type Locale = "en" | "ar";

export const webappFaqContent: Record<string, Record<Locale, FaqBlock>> = {

    "custom-web-application-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Custom web application questions, answered",
            subheading: "Straight answers about cost, timeline, ownership, and how a bespoke app is built.",
            items: [
                { q: "How much does a custom web application cost?", a: "Every app is quoted to its exact scope after a free consultation — there's no fixed sticker price because a simple internal tool and a multi-role platform are very different builds. You get a clear written quote before any work begins." },
                { q: "How long does it take to build a custom web app?", a: "Most custom web applications launch in about 6–10 weeks, depending on the number of user roles, integrations, and screens. We agree the exact timeline in writing after discovery and show you working previews along the way." },
                { q: "Do I own the source code?", a: "Yes — 100%. You receive the full source code, database, accounts, and documentation at handover with no lock-in. The app is yours to host, move, or extend with any developer." },
                { q: "Can the app integrate with my existing systems?", a: "Yes. We connect to your CRM, ERP, payment gateway, or any third-party service through their APIs so your data lives in one place instead of scattered across disconnected tools." },
                { q: "Will it scale as my business grows?", a: "It's built to. We use a modern, modular architecture with clean code and a proper database so you can add users, features, and load over time without rebuilding from scratch." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن تطبيقات الويب المخصصة، بإجابات واضحة",
            subheading: "إجابات مباشرة حول التكلفة والمدة والملكية وكيف يُبنى تطبيق مخصص.",
            items: [
                { q: "كم تكلفة تطبيق ويب مخصص؟", a: "كل تطبيق يُسعّر حسب نطاقه بعد استشارة مجانية — لا يوجد سعر موحّد لأن أداة داخلية بسيطة تختلف كثيراً عن منصة متعددة الأدوار. تحصل على عرض سعر مكتوب قبل بدء أي عمل." },
                { q: "كم يستغرق بناء تطبيق ويب مخصص؟", a: "تُطلق معظم التطبيقات المخصصة خلال 6–10 أسابيع تقريباً، حسب عدد الأدوار والتكاملات والشاشات. نتفق على المدة الدقيقة كتابياً بعد الاكتشاف ونعرض معاينات حية أثناء العمل." },
                { q: "هل أملك الكود المصدري؟", a: "نعم — 100%. تستلم الكود المصدري وقاعدة البيانات والحسابات والتوثيق عند التسليم دون أي تقييد. التطبيق ملكك تستضيفه أو تنقله أو توسّعه مع أي مطوّر." },
                { q: "هل يتكامل التطبيق مع أنظمتي الحالية؟", a: "نعم. نربطه بـ CRM وERP وبوابة الدفع وأي خدمة طرف ثالث عبر واجهاتها البرمجية لتعيش بياناتك في مكان واحد بدل التشتت." },
                { q: "هل سيتوسّع مع نمو أعمالي؟", a: "مبني لذلك. نستخدم بنية حديثة ومعيارية بكود نظيف وقاعدة بيانات سليمة لتضيف مستخدمين وميزات وأحمالاً مع الوقت دون إعادة بناء من الصفر." },
            ],
        },
    },

    "client-portals": {
        en: {
            eyebrow: "FAQ",
            heading: "Client portal questions, answered",
            subheading: "What a portal is, what it costs, and how it keeps clients in the loop securely.",
            items: [
                { q: "What is a client portal?", a: "A secure, branded space where your clients log in to track projects, view and download files and invoices, and see live updates — replacing scattered email and WhatsApp threads with one organized home." },
                { q: "How much does a client portal cost?", a: "Portals are quoted by scope after a free consultation — the number of features (messaging, payments, file sharing) and user types drives the price. You'll get a fixed written quote before we start." },
                { q: "Is client data kept secure and private?", a: "Yes. Each client sees only their own data behind encrypted, role-based authentication, with secure logins and access controls — so no client can ever see another's information." },
                { q: "Can the portal use my own branding?", a: "Yes — fully white-label. Your logo, colors, and domain run throughout, so the portal feels like a premium, native part of your own product rather than a third-party tool." },
                { q: "Will it reduce the back-and-forth with clients?", a: "That's the point. Clients self-serve status, files, and invoices, and get automatic notifications on updates — which sharply cuts the “any update?” emails your team fields every week." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن بوابات العملاء، بإجابات واضحة",
            subheading: "ما هي البوابة، وكم تكلّف، وكيف تُبقي العملاء على اطلاع بأمان.",
            items: [
                { q: "ما هي بوابة العميل؟", a: "مساحة آمنة بهوية علامتك يدخل إليها عملاؤك لمتابعة المشاريع وعرض وتنزيل الملفات والفواتير ورؤية التحديثات الحية — بدل تشتّت البريد والواتساب في مكان واحد منظّم." },
                { q: "كم تكلفة بوابة العملاء؟", a: "تُسعّر البوابات حسب النطاق بعد استشارة مجانية — عدد الميزات (مراسلة، دفع، مشاركة ملفات) وأنواع المستخدمين تحدّد السعر. تحصل على عرض مكتوب قبل البدء." },
                { q: "هل تبقى بيانات العملاء آمنة وخاصة؟", a: "نعم. يرى كل عميل بياناته فقط خلف مصادقة مشفّرة حسب الدور بدخول آمن وصلاحيات وصول — فلا يرى أي عميل معلومات غيره أبداً." },
                { q: "هل يمكن أن تحمل البوابة هويتي التجارية؟", a: "نعم — بهوية كاملة. شعارك وألوانك ونطاقك في كل مكان، فتبدو البوابة جزءاً راقياً وأصيلاً من منتجك لا أداة طرف ثالث." },
                { q: "هل ستقلّل تبادل الرسائل مع العملاء؟", a: "هذا هو الهدف. يخدم العملاء أنفسهم في الحالة والملفات والفواتير ويتلقّون إشعارات تلقائية بالتحديثات — ما يقلّص بشدة رسائل «أي تحديث؟» التي يتلقّاها فريقك أسبوعياً." },
            ],
        },
    },

    "admin-dashboards": {
        en: {
            eyebrow: "FAQ",
            heading: "Admin dashboard questions, answered",
            subheading: "What it costs, what data it shows, and why a custom dashboard beats off-the-shelf.",
            items: [
                { q: "How much does a custom admin dashboard cost?", a: "Dashboards are quoted by scope after a free consultation — the number of data sources, metrics, and user roles sets the price. You'll get a fixed written quote before any build starts." },
                { q: "Where does the dashboard pull its data from?", a: "From your real sources — your database, CRM, payment gateway, spreadsheets, or any API. We wire them together so one screen shows your true, live operating picture instead of manual exports." },
                { q: "Is the data real-time?", a: "Yes. Metrics refresh automatically so you're looking at live numbers, not yesterday's export. We can also add scheduled reports and threshold alerts on top." },
                { q: "Why not just use an off-the-shelf dashboard tool?", a: "Generic tools force your business into their model and often can't join your specific data the way you need. A custom dashboard is built around your exact KPIs, workflows, and permissions — and you own it." },
                { q: "Can different team members see different views?", a: "Yes. Finance, operations, and leadership each get a tailored view with role-based permissions, so everyone sees exactly what's relevant to them and nothing they shouldn't." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن لوحات التحكم الإدارية، بإجابات واضحة",
            subheading: "كم تكلّف، وما البيانات التي تعرضها، ولماذا المخصصة أفضل من الجاهزة.",
            items: [
                { q: "كم تكلفة لوحة تحكم إدارية مخصصة؟", a: "تُسعّر اللوحات حسب النطاق بعد استشارة مجانية — عدد مصادر البيانات والمؤشرات والأدوار يحدّد السعر. تحصل على عرض مكتوب قبل بدء أي بناء." },
                { q: "من أين تسحب اللوحة بياناتها؟", a: "من مصادرك الحقيقية — قاعدة بياناتك وCRM وبوابة الدفع والجداول وأي API. نربطها لتعرض شاشة واحدة صورتك التشغيلية الحية بدل التصدير اليدوي." },
                { q: "هل البيانات آنية؟", a: "نعم. تتحدّث المؤشرات تلقائياً فتنظر إلى أرقام حية لا تصدير الأمس. ويمكننا إضافة تقارير مجدولة وتنبيهات حدّية فوقها." },
                { q: "لماذا لا أستخدم أداة لوحة جاهزة؟", a: "تجبر الأدوات العامة عملك على نموذجها وغالباً لا تجمع بياناتك كما تحتاج. اللوحة المخصصة مبنية حول مؤشراتك وسير عملك وصلاحياتك بالضبط — وتملكها أنت." },
                { q: "هل يرى أعضاء الفريق عروضاً مختلفة؟", a: "نعم. المالية والعمليات والإدارة لكلٍ عرضه المخصص بصلاحيات حسب الدور، فيرى الجميع ما يخصّهم فقط دون ما لا ينبغي." },
            ],
        },
    },

    "booking-platforms": {
        en: {
            eyebrow: "FAQ",
            heading: "Booking platform questions, answered",
            subheading: "Cost, timeline, payments, and how online booking cuts no-shows.",
            items: [
                { q: "How much does a booking system cost?", a: "Booking platforms are quoted by scope after a free consultation — the number of services, staff, locations, and payment needs sets the price. You'll get a clear written quote before we begin." },
                { q: "How long does it take to build?", a: "Most booking platforms launch in about 4–8 weeks, depending on your rules (services, durations, staff, capacity) and whether you need online payments. We confirm the timeline in writing after discovery." },
                { q: "Can customers pay or leave a deposit when booking?", a: "Yes. We integrate secure online payment so customers pay in full or leave a deposit at booking — which means fewer no-shows and revenue in the bank earlier." },
                { q: "Will it reduce no-shows?", a: "Significantly. Automatic WhatsApp, SMS, and email reminders go out before each appointment, and paid deposits add commitment — together they cut missed bookings without your staff chasing anyone." },
                { q: "Can it connect to my website and calendar?", a: "Yes. The booking flow embeds into your existing website and syncs both ways with calendars like Google Calendar, so your team always sees one accurate, up-to-date schedule." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن منصات الحجز، بإجابات واضحة",
            subheading: "التكلفة والمدة والدفع وكيف يقلّل الحجز الإلكتروني الغياب.",
            items: [
                { q: "كم تكلفة نظام الحجز؟", a: "تُسعّر منصات الحجز حسب النطاق بعد استشارة مجانية — عدد الخدمات والموظفين والفروع واحتياجات الدفع يحدّد السعر. تحصل على عرض مكتوب قبل البدء." },
                { q: "كم يستغرق البناء؟", a: "تُطلق معظم منصات الحجز خلال 4–8 أسابيع تقريباً، حسب قواعدك (الخدمات والمدد والموظفين والسعة) وحاجتك للدفع الإلكتروني. نؤكد المدة كتابياً بعد الاكتشاف." },
                { q: "هل يدفع العملاء أو يتركون عربوناً عند الحجز؟", a: "نعم. ندمج دفعاً إلكترونياً آمناً ليدفع العملاء كاملاً أو يتركوا عربوناً عند الحجز — ما يعني غياباً أقل ونقداً أبكر." },
                { q: "هل سيقلّل الغياب؟", a: "بشكل كبير. تُرسَل تذكيرات واتساب ورسائل وبريد تلقائياً قبل كل موعد، والعربون المدفوع يضيف التزاماً — معاً يقلّلان الحجوزات الفائتة دون أن يلاحق فريقك أحداً." },
                { q: "هل يتصل بموقعي وتقويمي؟", a: "نعم. يُدمج مسار الحجز في موقعك الحالي ويتزامن ثنائياً مع تقاويم مثل Google Calendar، فيرى فريقك دائماً جدولاً واحداً دقيقاً ومحدّثاً." },
            ],
        },
    },

    "internal-business-tools": {
        en: {
            eyebrow: "FAQ",
            heading: "Internal tools questions, answered",
            subheading: "What they cost, what they replace, and how fast your team adopts them.",
            items: [
                { q: "How much does a custom internal tool cost?", a: "Internal tools are quoted by scope after a free consultation — a single-purpose tool is far cheaper than a multi-step workflow system. You'll get a fixed written quote before any work starts." },
                { q: "Can it replace our spreadsheets?", a: "Yes — that's a core use case. We turn fragile, error-prone sheets into one reliable tool with validation, permissions, and one source of truth, so you stop emailing conflicting versions around." },
                { q: "Will my team need a lot of training?", a: "No. Because the tool does exactly your team's job and nothing else, there's no bloat to learn — most people are productive within minutes, not a training course." },
                { q: "How much time will it actually save?", a: "It depends on what's manual today, but automating repetitive steps — calculations, status updates, notifications — commonly frees dozens of hours a month and removes a whole class of human errors." },
                { q: "Can we add to it later as our process changes?", a: "Yes. It's built to extend — add fields, roles, and steps as your process evolves, so the tool keeps up with your business instead of becoming the next thing you outgrow." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن الأدوات الداخلية، بإجابات واضحة",
            subheading: "كم تكلّف، وما الذي تستبدله، وكم بسرعة يتبنّاها فريقك.",
            items: [
                { q: "كم تكلفة أداة داخلية مخصصة؟", a: "تُسعّر الأدوات الداخلية حسب النطاق بعد استشارة مجانية — أداة بمهمة واحدة أرخص بكثير من نظام سير عمل متعدد الخطوات. تحصل على عرض مكتوب قبل بدء أي عمل." },
                { q: "هل يمكن أن تستبدل جداولنا؟", a: "نعم — هذه حالة استخدام أساسية. نحوّل الجداول الهشّة المعرّضة للأخطاء إلى أداة واحدة موثوقة بتحقّق وصلاحيات ومصدر واحد للحقيقة، فتتوقّف عن تبادل نسخ متضاربة." },
                { q: "هل يحتاج فريقي تدريباً كثيراً؟", a: "لا. لأن الأداة تفعل عمل فريقك بالضبط ولا شيء غيره، فلا تضخّم لتتعلّمه — يصبح معظم الناس منتجين خلال دقائق لا دورة تدريبية." },
                { q: "كم من الوقت ستوفّر فعلاً؟", a: "يعتمد على ما هو يدوي اليوم، لكن أتمتة الخطوات المتكررة — الحسابات وتحديث الحالة والإشعارات — توفّر عادة عشرات الساعات شهرياً وتزيل فئة كاملة من الأخطاء البشرية." },
                { q: "هل يمكن أن نضيف إليها لاحقاً مع تغيّر عمليتنا؟", a: "نعم. مبنية للتوسّع — أضف حقولاً وأدواراً وخطوات مع تطوّر عمليتك، فتواكب الأداة أعمالك بدل أن تتجاوزها." },
            ],
        },
    },

    "saas-mvp-development": {
        en: {
            eyebrow: "FAQ",
            heading: "SaaS MVP questions, answered",
            subheading: "Cost, timeline, what's included, and whether it's investor-ready.",
            items: [
                { q: "How much does it cost to build a SaaS MVP?", a: "MVPs are quoted by scope after a free consultation — we focus the build on your core value loop to keep cost and timeline tight. You'll get a fixed written quote before any work begins." },
                { q: "How fast can my MVP launch?", a: "Most SaaS MVPs reach their first real users in about 8 weeks. We deliberately scope to the core loop first so you can validate with paying users quickly, then expand from there." },
                { q: "Does it include user accounts and billing?", a: "Yes. Sign-up, login, multi-user teams, and subscription billing (Stripe — plans, trials, invoices) are part of the build, so you can charge recurring revenue from launch instead of bolting it on later." },
                { q: "Is the MVP investor-ready?", a: "Yes. You get a real, working product with live users and metrics — far more convincing to investors than slides — built on clean architecture you fully own and can show under the hood." },
                { q: "Can it scale into the full product later?", a: "That's the plan. We build the MVP on a proper foundation with analytics hooks, so your v2 features build on top of it instead of forcing a rewrite." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن SaaS MVP، بإجابات واضحة",
            subheading: "التكلفة والمدة وما المتضمَّن وهل هو جاهز للمستثمر.",
            items: [
                { q: "كم تكلفة بناء SaaS MVP؟", a: "تُسعّر الـ MVP حسب النطاق بعد استشارة مجانية — نركّز البناء على حلقة قيمتك الأساسية لإبقاء التكلفة والمدة محدودتين. تحصل على عرض مكتوب قبل بدء أي عمل." },
                { q: "ما سرعة إطلاق الـ MVP؟", a: "تصل معظم منتجات SaaS MVP لأول مستخدميها الحقيقيين خلال 8 أسابيع تقريباً. نحدّد النطاق عمداً على الحلقة الأساسية أولاً لتتحقّق بمستخدمين يدفعون بسرعة ثم تتوسّع." },
                { q: "هل يشمل الحسابات والفوترة؟", a: "نعم. التسجيل والدخول والفِرق المتعددة والفوترة بالاشتراك (Stripe — خطط وتجارب وفواتير) جزء من البناء، لتتقاضى إيراداً متكرراً من الإطلاق لا لاحقاً." },
                { q: "هل الـ MVP جاهز للمستثمر؟", a: "نعم. تحصل على منتج حقيقي عامل بمستخدمين ومؤشرات حية — أكثر إقناعاً للمستثمر من الشرائح — مبني على بنية نظيفة تملكها بالكامل وتعرضها من الداخل." },
                { q: "هل يتوسّع إلى المنتج الكامل لاحقاً؟", a: "هذه الخطة. نبني الـ MVP على أساس سليم بتحليلات، لتُبنى ميزات الإصدار الثاني فوقه بدل فرض إعادة كتابة." },
            ],
        },
    },

    "progressive-web-app-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Progressive web app questions, answered",
            subheading: "What a PWA is, what it costs, and why it beats a traditional app for many businesses.",
            items: [
                { q: "What is a progressive web app (PWA)?", a: "A PWA is a website built to behave like an app — it installs to the home screen, loads instantly, works offline, and can send push notifications, all from a single link with no app-store download." },
                { q: "How much does a PWA cost?", a: "PWAs are quoted by scope after a free consultation. Because it's one build that runs everywhere instead of separate iOS and Android apps, it's usually more cost-effective than going fully native. You'll get a written quote first." },
                { q: "Do I still need to publish to the app stores?", a: "Not necessarily. A PWA installs straight from the browser, so users get your icon on their phone without an app-store review or a large download — though we can also package it for the stores if you want." },
                { q: "Does a PWA really work offline?", a: "Yes. Service workers cache key screens and data so the app keeps working without a signal, then syncs automatically when the connection returns — great for unreliable mobile networks." },
                { q: "Can a PWA send push notifications?", a: "Yes, on supported platforms. Web push lets you re-engage users much like a native app, giving you a strong retention lever without the native overhead." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن تطبيقات الويب التقدمية، بإجابات واضحة",
            subheading: "ما هو الـ PWA، وكم يكلّف، ولماذا يتفوّق على التطبيق التقليدي لكثير من الأعمال.",
            items: [
                { q: "ما هو تطبيق الويب التقدمي (PWA)؟", a: "الـ PWA موقع مبني ليتصرّف كتطبيق — يُثبّت على الشاشة الرئيسية ويحمّل فوراً ويعمل دون إنترنت ويرسل إشعارات دفع، كل ذلك من رابط واحد دون تنزيل من المتجر." },
                { q: "كم تكلفة الـ PWA؟", a: "تُسعّر تطبيقات PWA حسب النطاق بعد استشارة مجانية. ولأنه بناء واحد يعمل في كل مكان بدل تطبيقي iOS وAndroid منفصلين، يكون عادة أوفر من النهج الأصلي بالكامل. تحصل على عرض مكتوب أولاً." },
                { q: "هل ما زلت بحاجة للنشر في المتاجر؟", a: "ليس بالضرورة. يُثبّت الـ PWA مباشرة من المتصفح فيحصل المستخدمون على أيقونتك دون مراجعة متجر أو تنزيل ثقيل — ويمكننا تغليفه للمتاجر أيضاً إن رغبت." },
                { q: "هل يعمل الـ PWA دون إنترنت فعلاً؟", a: "نعم. تخزّن عمّال الخدمة الشاشات والبيانات المهمة فيستمر التطبيق دون إشارة ثم يتزامن تلقائياً عند عودة الاتصال — ممتاز للشبكات غير المستقرة." },
                { q: "هل يرسل الـ PWA إشعارات دفع؟", a: "نعم على المنصات المدعومة. يتيح الدفع عبر الويب إعادة إشراك المستخدمين كتطبيق أصلي تقريباً، فيمنحك رافعة بقاء قوية دون أعباء النهج الأصلي." },
            ],
        },
    },

    // ═════════════════════════════════════════════════════════════
    // STRUCTURED PILLARS — Interactive Web Applications catalog FAQs
    // ═════════════════════════════════════════════════════════════

    "custom-saas-mvp-development": {
        en: {
            eyebrow: "FAQ",
            heading: "SaaS & MVP development questions, answered",
            subheading: "Cost, timeline, what's included, multi-tenancy, and whether it's investor-ready.",
            items: [
                { q: "How much does it cost to build a SaaS or MVP?", a: "Every SaaS and MVP is quoted to its exact scope after a free consultation — we deliberately focus the build on your core value loop to keep cost and timeline tight. You'll get a fixed written quote before any work begins." },
                { q: "How long does it take to launch a SaaS MVP?", a: "Most SaaS MVPs reach their first real users in about 8–12 weeks, depending on features, tenancy, and integrations. We scope to the core loop first so you can validate with paying users quickly, then expand from there." },
                { q: "Does it include user accounts and subscription billing?", a: "Yes. Sign-up, login, multi-user teams, and subscription billing with Stripe — plans, free trials, upgrades, proration, and invoices — are part of the build, so you can charge recurring revenue from launch instead of bolting it on later." },
                { q: "What is multi-tenant architecture and do I need it?", a: "Multi-tenancy means one platform serves many customers or organizations with their data and settings kept securely isolated. It's how real SaaS is built — we design it in from the start so you can onboard many accounts without a costly re-architecture." },
                { q: "Is the MVP investor-ready and do I own the code?", a: "Yes to both. You get a real, working product with live users and metrics — far more convincing than slides — built on clean architecture, and you receive 100% of the source code, database, and accounts at handover with no lock-in." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن تطوير SaaS وMVP، بإجابات واضحة",
            subheading: "التكلفة والمدة وما المتضمَّن والتعدّد المستأجري وهل هو جاهز للمستثمر.",
            items: [
                { q: "كم تكلفة بناء SaaS أو MVP؟", a: "كل SaaS وMVP يُسعّر حسب نطاقه بعد استشارة مجانية — نركّز البناء عمداً على حلقة قيمتك الأساسية لإبقاء التكلفة والمدة محدودتين. تحصل على عرض سعر مكتوب قبل بدء أي عمل." },
                { q: "كم يستغرق إطلاق SaaS MVP؟", a: "تصل معظم منتجات SaaS MVP لأول مستخدميها الحقيقيين خلال 8–12 أسبوعاً تقريباً، حسب الميزات والتعدّد المستأجري والتكاملات. نحدّد النطاق على الحلقة الأساسية أولاً لتتحقّق بمستخدمين يدفعون بسرعة ثم تتوسّع." },
                { q: "هل يشمل حسابات المستخدمين والفوترة بالاشتراك؟", a: "نعم. التسجيل والدخول والفِرق المتعددة والفوترة بالاشتراك عبر Stripe — خطط وتجارب مجانية وترقيات واحتساب نسبي وفواتير — جزء من البناء، لتتقاضى إيراداً متكرراً من الإطلاق لا لاحقاً." },
                { q: "ما هي بنية التعدّد المستأجري وهل أحتاجها؟", a: "التعدّد المستأجري يعني أن منصة واحدة تخدم عملاء أو مؤسسات كثيرة مع بقاء بياناتهم وإعداداتهم معزولة بأمان. هكذا تُبنى منتجات SaaS الحقيقية — نصمّمها من البداية لتُدخل حسابات كثيرة دون إعادة هيكلة مكلفة." },
                { q: "هل الـ MVP جاهز للمستثمر وهل أملك الكود؟", a: "نعم لكليهما. تحصل على منتج حقيقي عامل بمستخدمين ومؤشرات حية — أكثر إقناعاً من الشرائح — مبني على بنية نظيفة، وتستلم 100% من الكود المصدري وقاعدة البيانات والحسابات عند التسليم دون أي تقييد." },
            ],
        },
    },

    "full-stack-web-engineering": {
        en: {
            eyebrow: "FAQ",
            heading: "Full-stack engineering questions, answered",
            subheading: "Tech stack, front-end and back-end, integrations, timeline, and ownership.",
            items: [
                { q: "What tech stack do you build with?", a: "We build front-ends with React and Next.js, and back-ends in the runtime that best fits the job — Node.js, Python, or PHP/Laravel — on PostgreSQL or MySQL. We choose the stack around your needs, not a one-size-fits-all default, and explain the trade-offs before we start." },
                { q: "Do you handle both front-end and back-end?", a: "Yes — that's the point of full-stack. One accountable team designs the interface, the server, the database, and the APIs as a single coherent system, so nothing falls through the gap between a separate front-end shop and back-end contractor." },
                { q: "Can you integrate with our existing systems and add SSO?", a: "Yes. We build custom REST and GraphQL APIs and connect to your CRM, ERP, payment gateways, and any third-party service, including single sign-on (SSO / OAuth) so your users and systems authenticate securely in one place." },
                { q: "How long does a full-stack web app take to build?", a: "Most full-stack builds launch in about 8–12 weeks, depending on the number of screens, integrations, and back-end complexity. We agree the exact timeline in writing after discovery and show you working previews along the way." },
                { q: "Do I own the source code?", a: "Yes — 100%. You receive the full front-end and back-end source code, database, and accounts at handover with no lock-in, so you can host, move, or extend the app with any developer." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن الهندسة المتكاملة، بإجابات واضحة",
            subheading: "الحزمة التقنية والواجهة والخلفية والتكاملات والمدة والملكية.",
            items: [
                { q: "ما الحزمة التقنية التي تبنون بها؟", a: "نبني الواجهات بـ React وNext.js، والخلفيات بالبيئة الأنسب للمهمة — Node.js أو Python أو PHP/Laravel — على PostgreSQL أو MySQL. نختار الحزمة حول احتياجاتك لا افتراضاً موحّداً، ونشرح المفاضلات قبل البدء." },
                { q: "هل تتولّون الواجهة والخلفية معاً؟", a: "نعم — هذا جوهر الهندسة المتكاملة. فريق واحد مسؤول يصمّم الواجهة والخادم وقاعدة البيانات وواجهات API كنظام واحد متماسك، فلا يضيع شيء بين شركة واجهة ومقاول خلفية منفصلين." },
                { q: "هل يمكن التكامل مع أنظمتنا وإضافة SSO؟", a: "نعم. نبني واجهات REST وGraphQL مخصصة ونربط بـ CRM وERP وبوابات الدفع وأي خدمة طرف ثالث، بما في ذلك تسجيل الدخول الموحّد (SSO / OAuth) ليصادق مستخدموك وأنظمتك بأمان في مكان واحد." },
                { q: "كم يستغرق بناء تطبيق ويب متكامل؟", a: "تُطلق معظم المشاريع المتكاملة خلال 8–12 أسبوعاً تقريباً، حسب عدد الشاشات والتكاملات وتعقيد الخلفية. نتفق على المدة الدقيقة كتابياً بعد الاكتشاف ونعرض معاينات حية أثناء العمل." },
                { q: "هل أملك الكود المصدري؟", a: "نعم — 100%. تستلم كامل كود الواجهة والخلفية وقاعدة البيانات والحسابات عند التسليم دون أي تقييد، لتستضيف التطبيق أو تنقله أو توسّعه مع أي مطوّر." },
            ],
        },
    },

    "interactive-portals-dashboards": {
        en: {
            eyebrow: "FAQ",
            heading: "Portal & dashboard questions, answered",
            subheading: "What they are, what they cost, data sources, permissions, and branding.",
            items: [
                { q: "What's the difference between a portal and a dashboard?", a: "A portal is a secure space where your clients or customers log in to self-serve — track projects, view invoices, download files. A dashboard is an internal control panel where your team reads live KPIs and manages operations. We often build both, tied together with role-based access." },
                { q: "How much does a custom portal or dashboard cost?", a: "Both are quoted by scope after a free consultation — the number of user roles, data sources, and features (messaging, payments, file management, charts) drives the price. You'll get a fixed written quote before any build starts." },
                { q: "Where does the dashboard data come from and is it live?", a: "From your real sources — your database, CRM, payment gateway, spreadsheets, or any API. We wire them into one live pipeline so the dashboard shows your true, real-time operating picture instead of manual exports." },
                { q: "Can different users see different data?", a: "Yes. Granular role-based access control (RBAC) gives clients, admins, finance, and operations each their own view and permissions, so everyone sees exactly what's relevant to them and nothing they shouldn't." },
                { q: "Can it use our own branding and handle file uploads?", a: "Yes to both. The portal is fully white-label — your logo, colors, and domain throughout — and includes file upload, versioning, and document management in a searchable, permissioned library." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن البوابات ولوحات التحكم، بإجابات واضحة",
            subheading: "ما هي، وكم تكلّف، ومصادر البيانات، والصلاحيات، والهوية.",
            items: [
                { q: "ما الفرق بين البوابة ولوحة التحكم؟", a: "البوابة مساحة آمنة يدخل إليها عملاؤك أو زبائنك ليخدموا أنفسهم — متابعة المشاريع وعرض الفواتير وتنزيل الملفات. لوحة التحكم لوحة داخلية يقرأ فيها فريقك المؤشرات الحية ويدير العمليات. نبني الاثنين معاً غالباً، مرتبطين بصلاحيات حسب الأدوار." },
                { q: "كم تكلفة بوابة أو لوحة تحكم مخصصة؟", a: "يُسعّر الاثنان حسب النطاق بعد استشارة مجانية — عدد الأدوار ومصادر البيانات والميزات (مراسلة، دفع، إدارة ملفات، رسوم) يحدّد السعر. تحصل على عرض مكتوب قبل بدء أي بناء." },
                { q: "من أين تأتي بيانات اللوحة وهل هي حية؟", a: "من مصادرك الحقيقية — قاعدة بياناتك وCRM وبوابة الدفع والجداول وأي API. نربطها في خط أنابيب حيّ واحد لتعرض اللوحة صورتك التشغيلية الحقيقية آنياً بدل التصدير اليدوي." },
                { q: "هل يرى المستخدمون بيانات مختلفة؟", a: "نعم. يمنح التحكّم الدقيق بالصلاحيات (RBAC) العملاء والمدراء والمالية والعمليات كلٌ عرضه وصلاحياته، فيرى الجميع ما يخصّهم فقط دون ما لا ينبغي." },
                { q: "هل يمكن استخدام هويتنا ورفع الملفات؟", a: "نعم لكليهما. البوابة بهوية كاملة — شعارك وألوانك ونطاقك في كل مكان — وتتضمّن رفع الملفات وإصدارها وإدارة المستندات في مكتبة قابلة للبحث ومحكومة الصلاحيات." },
            ],
        },
    },

    "application-modernization-performance": {
        en: {
            eyebrow: "FAQ",
            heading: "App modernization questions, answered",
            subheading: "Refactor vs rewrite, performance, security, cost, and ongoing monitoring.",
            items: [
                { q: "Do I need a full rewrite or just a refactor?", a: "Usually a refactor, not a rewrite. We start with an honest audit and often find that targeted refactoring, the right tests, and a proper pipeline fix the problem far more cheaply and safely than starting over. We only recommend a rewrite for the parts that genuinely warrant it." },
                { q: "Can you make our slow app pass Core Web Vitals?", a: "Yes. We profile the real bottlenecks — database queries, JavaScript bundles, caching, images — and fix them so the app passes Core Web Vitals and genuinely feels fast to users, not just faster on a synthetic test." },
                { q: "How much does modernization or performance work cost?", a: "It's quoted by scope after a free audit — a focused performance pass is far cheaper than a monolith-to-microservices migration. We give you a phased, fixed-scope plan so you can start with the highest-impact fixes first." },
                { q: "Can you fix security vulnerabilities in our app?", a: "Yes. We run a security audit, patch known vulnerabilities, update risky dependencies, and add end-to-end automated testing so the same gaps don't reopen — closing the holes that cause outages and breaches." },
                { q: "Do you offer ongoing maintenance and monitoring?", a: "Yes. We set up CI/CD deployment pipelines and 24/7 monitoring with alerting, so releases are safe and repeatable and problems are caught before your users notice them. Ongoing support is available after handover." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن تحديث التطبيقات، بإجابات واضحة",
            subheading: "إعادة الهيكلة مقابل إعادة الكتابة والأداء والأمان والتكلفة والمراقبة المستمرة.",
            items: [
                { q: "هل أحتاج إعادة كتابة كاملة أم إعادة هيكلة فقط؟", a: "عادة إعادة هيكلة لا إعادة كتابة. نبدأ بتدقيق صادق ونجد غالباً أن إعادة هيكلة موجّهة والاختبارات الصحيحة وخط أنابيب سليم تُصلح المشكلة أرخص وأأمن من البدء من جديد. لا نوصي بإعادة الكتابة إلا للأجزاء التي تستحقها فعلاً." },
                { q: "هل يمكن جعل تطبيقنا البطيء يجتاز Core Web Vitals؟", a: "نعم. نحلّل الاختناقات الحقيقية — استعلامات قاعدة البيانات وحزم JavaScript والتخزين المؤقت والصور — ونُصلحها ليجتاز التطبيق Core Web Vitals ويشعر المستخدمون بسرعته فعلاً، لا مجرد سرعة على اختبار اصطناعي." },
                { q: "كم تكلفة أعمال التحديث أو الأداء؟", a: "تُسعّر حسب النطاق بعد تدقيق مجاني — تحسين أداء مركّز أرخص بكثير من ترحيل من متجانس إلى microservices. نمنحك خطة مرحلية بنطاق ثابت لتبدأ بأعلى الإصلاحات أثراً أولاً." },
                { q: "هل يمكن إصلاح الثغرات الأمنية في تطبيقنا؟", a: "نعم. نجري تدقيقاً أمنياً ونرقّع الثغرات المعروفة ونحدّث الاعتماديات الخطرة ونضيف اختبارات آلية شاملة لئلا تُفتح الفجوات نفسها مجدداً — مغلقين الثغرات التي تسبّب الأعطال والاختراقات." },
                { q: "هل تقدّمون صيانة ومراقبة مستمرة؟", a: "نعم. نُعدّ خطوط نشر CI/CD ومراقبة 24/7 بتنبيهات، فتكون الإصدارات آمنة قابلة للتكرار وتُلتقط المشكلات قبل أن يلاحظها مستخدموك. والدعم المستمر متاح بعد التسليم." },
            ],
        },
    },

    "media-entertainment-streaming": {
        en: {
            eyebrow: "FAQ",
            heading: "Streaming platform questions, answered",
            subheading: "VoD and live, monetization, DRM, delivery, cost, and timeline.",
            items: [
                { q: "Can you build both video-on-demand and live streaming?", a: "Yes. We build VoD/OTT libraries with adaptive HLS/DASH playback and low-latency live streaming for events, shows, and webinars — often in the same platform, so you can offer both on-demand catalogs and live broadcasts." },
                { q: "How can I monetize my streaming platform?", a: "We build the monetization model that fits you — recurring subscriptions, tiered memberships, pay-per-view, or paywalls — with billing handled through Stripe, so your audience directly funds the content and you earn predictable recurring revenue." },
                { q: "How do you protect content from piracy?", a: "With DRM (such as Widevine), signed and expiring URLs, and secure delivery, so your premium content can't simply be downloaded or shared. We match the protection level to your content's value and licensing requirements." },
                { q: "Will it stream fast and hold up under load?", a: "Yes. We deliver over a global CDN for fast start times worldwide and use adaptive bitrate streaming so playback stays smooth on any connection, with an architecture that scales from hundreds to tens of thousands of concurrent viewers." },
                { q: "How much does a streaming platform cost and how long does it take?", a: "It's quoted by scope after a free consultation — catalog size, live vs on-demand, monetization, and DRM all affect it. Most platforms launch in about 12–14 weeks, confirmed in writing after discovery, and you own the full source code at handover." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن منصات البث، بإجابات واضحة",
            subheading: "عند الطلب والمباشر وتحقيق الدخل وحماية DRM والتوصيل والتكلفة والمدة.",
            items: [
                { q: "هل تبنون الفيديو عند الطلب والبث المباشر معاً؟", a: "نعم. نبني مكتبات VoD/OTT بتشغيل تكيّفي HLS/DASH وبثاً مباشراً منخفض الاستجابة للأحداث والبرامج والندوات — غالباً في المنصة نفسها، لتقدّم كتالوجات عند الطلب وبثاً مباشراً معاً." },
                { q: "كيف أحقّق دخلاً من منصة البث؟", a: "نبني نموذج تحقيق الدخل الأنسب لك — اشتراكات متكرّرة أو عضويات متدرّجة أو دفع لكل مشاهدة أو جدران دفع — مع فوترة عبر Stripe، ليموّل جمهورك المحتوى مباشرة وتكسب إيراداً متكرراً يمكن التنبؤ به." },
                { q: "كيف تحمون المحتوى من القرصنة؟", a: "بحماية DRM (مثل Widevine) وروابط موقّعة تنتهي صلاحيتها وتوصيل آمن، فلا يمكن ببساطة تنزيل محتواك المميّز أو مشاركته. نطابق مستوى الحماية مع قيمة محتواك ومتطلبات الترخيص." },
                { q: "هل سيبثّ بسرعة ويصمد تحت الحِمل؟", a: "نعم. نوصّل عبر CDN عالمي لأزمنة بدء سريعة حول العالم ونستخدم بثاً بمعدّل بت تكيّفي ليبقى التشغيل سلساً على أي اتصال، ببنية تتوسّع من مئات إلى عشرات الآلاف من المشاهدين المتزامنين." },
                { q: "كم تكلفة منصة البث وكم تستغرق؟", a: "تُسعّر حسب النطاق بعد استشارة مجانية — حجم الكتالوج والمباشر مقابل عند الطلب وتحقيق الدخل وحماية DRM كلها تؤثّر. تُطلق معظم المنصات خلال 12–14 أسبوعاً تقريباً، تُؤكَّد كتابياً بعد الاكتشاف، وتملك الكود المصدري الكامل عند التسليم." },
            ],
        },
    },

    "mobile-app-development": {
        en: {
            eyebrow: "FAQ",
            heading: "Mobile app questions, answered",
            subheading: "Cost, timeline, iOS + Android, and how we get you into the app stores.",
            items: [
                { q: "How much does a mobile app cost?", a: "Apps are quoted by scope after a free consultation — features, screens, and backend needs set the price. Because we build one cross-platform codebase for both stores, you avoid paying twice. You'll get a written quote first." },
                { q: "How long does it take to build a mobile app?", a: "Most apps launch in about 10–14 weeks, depending on features and backend complexity. We confirm the exact timeline in writing after discovery and share working builds you can test on your own phone along the way." },
                { q: "Do you build for both iOS and Android?", a: "Yes. We use a cross-platform framework (React Native) so one codebase powers both iOS and Android — native feel, roughly 90% shared code, and a single launch across both stores." },
                { q: "Is cross-platform as good as native?", a: "For the vast majority of business apps, yes. Users get real native components, gestures, and smooth performance — at a fraction of the cost and time of building two separate native apps." },
                { q: "Do you handle App Store and Google Play submission?", a: "Yes. We prepare the store listings, assets, and accounts and manage the review process, so your app actually goes live rather than getting stuck in submission." },
            ],
        },
        ar: {
            eyebrow: "أسئلة شائعة",
            heading: "أسئلة عن تطبيقات الجوال، بإجابات واضحة",
            subheading: "التكلفة والمدة وiOS وAndroid وكيف ندخلك إلى المتاجر.",
            items: [
                { q: "كم تكلفة تطبيق الجوال؟", a: "تُسعّر التطبيقات حسب النطاق بعد استشارة مجانية — الميزات والشاشات واحتياجات الخلفية تحدّد السعر. ولأننا نبني كوداً واحداً متعدد المنصات للمتجرين، تتجنّب الدفع مرتين. تحصل على عرض مكتوب أولاً." },
                { q: "كم يستغرق بناء تطبيق جوال؟", a: "تُطلق معظم التطبيقات خلال 10–14 أسبوعاً تقريباً، حسب الميزات وتعقيد الخلفية. نؤكد المدة كتابياً بعد الاكتشاف ونشارك نسخاً تجريبية تختبرها على هاتفك أثناء العمل." },
                { q: "هل تبنون لـ iOS وAndroid معاً؟", a: "نعم. نستخدم إطاراً متعدد المنصات (React Native) فيشغّل كود واحد iOS وAndroid — إحساس أصلي ونحو 90% كود مشترك وإطلاق واحد على المتجرين." },
                { q: "هل متعدد المنصات جيد كالأصلي؟", a: "لغالبية تطبيقات الأعمال، نعم. يحصل المستخدمون على مكوّنات وإيماءات أصلية حقيقية وأداء سلس — بجزء من تكلفة ووقت بناء تطبيقين أصليين منفصلين." },
                { q: "هل تتولّون النشر في App Store وGoogle Play؟", a: "نعم. نجهّز قوائم المتجر والأصول والحسابات وندير عملية المراجعة، فيُطلق تطبيقك فعلاً بدل أن يعلق في التقديم." },
            ],
        },
    },
};

export function getWebappFaq(slug: string, locale: string): FaqBlock | null {
    const entry = webappFaqContent[slug];
    if (!entry) return null;
    return entry[locale === "ar" ? "ar" : "en"];
}
