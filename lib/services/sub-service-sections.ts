// Pillar-level content for the shared sub-service sections (Overview / What's
// included / Use cases). Keyed by pillar slug so copy stays relevant across very
// different services, then framed with each page's service name in the UI.
// Bilingual (EN/AR). No prices, no fabricated numbers — original CloudTopia copy.

export type Bi = { en: string; ar: string }
export type UseCase = { title: Bi; desc: Bi }
export type PillarSections = { deliverables: Bi[]; useCases: UseCase[] }

const bi = (en: string, ar: string): Bi => ({ en, ar })
const uc = (te: string, ta: string, de: string, da: string): UseCase => ({ title: bi(te, ta), desc: bi(de, da) })

// Safe fallback for any pillar not explicitly mapped.
export const DEFAULT_SECTIONS: PillarSections = {
    deliverables: [
        bi('Discovery & planning around your goals', 'اكتشاف وتخطيط حول أهدافك'),
        bi('Custom design — no rigid templates', 'تصميم مخصص — دون قوالب جامدة'),
        bi('Responsive, mobile-first build', 'تطوير متجاوب يبدأ من الجوال'),
        bi('Bilingual Arabic + English, RTL-ready', 'ثنائي اللغة عربي وإنجليزي وجاهز لـ RTL'),
        bi('SEO and performance foundations', 'أساسيات تحسين محركات البحث والأداء'),
        bi('Analytics and tracking setup', 'إعداد التحليلات والتتبّع'),
        bi('Training and documentation', 'تدريب وتوثيق'),
        bi('Full ownership handoff — no lock-in', 'تسليم الملكية الكاملة — دون احتكار'),
    ],
    useCases: [
        uc('Launching something new', 'إطلاق مشروع جديد', 'You are starting fresh and want it built right the first time.', 'تبدأ من الصفر وتريد بناءه بشكل صحيح من أول مرة.'),
        uc('Upgrading what you have', 'تطوير ما لديك', 'Your current setup is dated, slow, or hard to manage.', 'وضعك الحالي قديم أو بطيء أو يصعب إدارته.'),
        uc('Scaling with demand', 'التوسّع مع الطلب', 'You need a foundation that grows as your business does.', 'تحتاج أساساً ينمو مع نمو عملك.'),
    ],
}

export const SUB_SERVICE_SECTIONS: Record<string, PillarSections> = {
    // ── Digital Presence ──────────────────────────────────────────────
    'website-development': {
        deliverables: [
            bi('Discovery, sitemap & content plan', 'اكتشاف وخريطة موقع وخطة محتوى'),
            bi('Custom UI design — no templates', 'تصميم واجهات مخصص — دون قوالب'),
            bi('Responsive, mobile-first build', 'تطوير متجاوب يبدأ من الجوال'),
            bi('CMS so you can edit content yourself', 'نظام إدارة محتوى لتعديل المحتوى بنفسك'),
            bi('On-page SEO foundations', 'أساسيات تحسين محركات البحث داخل الصفحة'),
            bi('Speed & Core Web Vitals tuning', 'ضبط السرعة ومؤشرات الويب الأساسية'),
            bi('Analytics & tracking setup', 'إعداد التحليلات والتتبّع'),
            bi('Training + full ownership handoff', 'تدريب وتسليم الملكية الكاملة'),
        ],
        useCases: [
            uc('A credible first impression', 'انطباع أول موثوق', 'A professional site that makes visitors trust your brand instantly.', 'موقع احترافي يجعل الزوار يثقون بعلامتك فوراً.'),
            uc('Turning visits into inquiries', 'تحويل الزيارات إلى طلبات', 'Clear structure and calls-to-action that convert browsers into leads.', 'هيكل واضح ودعوات للإجراء تحوّل المتصفّحين إلى عملاء محتملين.'),
            uc('Ranking on Google', 'الظهور في جوجل', 'SEO-ready foundations so the right people find you in search.', 'أساسيات جاهزة للـ SEO ليجدك الأشخاص المناسبون في البحث.'),
        ],
    },
    'ecommerce-development': {
        deliverables: [
            bi('Store design & product architecture', 'تصميم المتجر وهيكلة المنتجات'),
            bi('Secure checkout & payment gateways', 'دفع آمن وبوابات دفع'),
            bi('Product, inventory & order management', 'إدارة المنتجات والمخزون والطلبات'),
            bi('Shipping, tax & VAT configuration', 'إعداد الشحن والضرائب وضريبة القيمة المضافة'),
            bi('Customer accounts & wishlists', 'حسابات العملاء وقوائم الرغبات'),
            bi('Conversion-focused checkout UX', 'تجربة دفع تركّز على رفع التحويل'),
            bi('SEO for product & category pages', 'تحسين صفحات المنتجات والفئات للبحث'),
            bi('Training + ownership handoff', 'تدريب وتسليم الملكية'),
        ],
        useCases: [
            uc('Selling online for the first time', 'البيع أونلاين لأول مرة', 'Launch a store that is ready to take orders and payments from day one.', 'أطلق متجراً جاهزاً لاستقبال الطلبات والمدفوعات من اليوم الأول.'),
            uc('Outgrowing a marketplace', 'تجاوز المتاجر الوسيطة', 'Own your store, data, and margins instead of renting a marketplace.', 'امتلك متجرك وبياناتك وأرباحك بدل الاعتماد على منصة وسيطة.'),
            uc('Recovering lost sales', 'استعادة المبيعات المفقودة', 'A faster, smoother checkout that reduces abandoned carts.', 'دفع أسرع وأسلس يقلّل السلات المتروكة.'),
        ],
    },
    'social-media-management': {
        deliverables: [
            bi('Content strategy & monthly calendar', 'استراتيجية محتوى وتقويم شهري'),
            bi('Branded post & story design', 'تصميم منشورات وقصص بهوية علامتك'),
            bi('Caption & hashtag copy (AR + EN)', 'كتابة التعليقات والوسوم (عربي وإنجليزي)'),
            bi('Scheduling & publishing', 'الجدولة والنشر'),
            bi('Community management & replies', 'إدارة المجتمع والردود'),
            bi('Reels & short-video direction', 'توجيه الريلز والفيديو القصير'),
            bi('Monthly performance reporting', 'تقارير أداء شهرية'),
            bi('Paid-boost guidance', 'إرشاد للإعلانات الممولة'),
        ],
        useCases: [
            uc('Staying consistent', 'الاستمرارية', 'Show up regularly with on-brand content without doing it all yourself.', 'انشر بانتظام بمحتوى يعبّر عن علامتك دون أن تتولّى كل شيء بنفسك.'),
            uc('Growing an engaged audience', 'بناء جمهور متفاعل', 'Content and replies that build a real, responsive following.', 'محتوى وردود تبني متابعين حقيقيين ومتفاعلين.'),
            uc('Turning followers into customers', 'تحويل المتابعين إلى عملاء', 'A strategy that connects social activity to actual inquiries and sales.', 'استراتيجية تربط نشاط السوشيال بالطلبات والمبيعات الفعلية.'),
        ],
    },
    'ui-ux-design-branding': {
        deliverables: [
            bi('Discovery & user research', 'اكتشاف وبحث المستخدم'),
            bi('Wireframes & user flows', 'مخططات هيكلية ومسارات المستخدم'),
            bi('High-fidelity UI design', 'تصميم واجهات عالي الدقة'),
            bi('Interactive prototype', 'نموذج تفاعلي'),
            bi('Design system & components', 'نظام تصميم ومكوّنات'),
            bi('Brand visual identity', 'هوية بصرية للعلامة'),
            bi('Accessibility & responsive specs', 'مواصفات الوصولية والتجاوب'),
            bi('Developer handoff files', 'ملفات تسليم للمطوّرين'),
        ],
        useCases: [
            uc('Fixing a confusing product', 'إصلاح منتج مربك', 'Redesign flows so users find what they need without friction.', 'إعادة تصميم المسارات ليجد المستخدمون ما يحتاجونه دون عناء.'),
            uc('Looking the part', 'مظهر يليق بك', 'A polished identity and interface that match the quality you deliver.', 'هوية وواجهة متقنة تعكس جودة ما تقدّمه.'),
            uc('Designing before building', 'التصميم قبل التطوير', 'Validate the experience with a prototype before development spend.', 'تحقّق من التجربة عبر نموذج قبل إنفاق التطوير.'),
        ],
    },
    'search-engine-optimization': {
        deliverables: [
            bi('Technical SEO audit', 'تدقيق SEO تقني'),
            bi('Keyword & search-intent research', 'بحث الكلمات المفتاحية ونيّة البحث'),
            bi('On-page optimization', 'تحسين داخل الصفحة'),
            bi('Site architecture & internal links', 'هيكلة الموقع والروابط الداخلية'),
            bi('Content recommendations', 'توصيات المحتوى'),
            bi('Structured data / schema', 'البيانات المنظّمة / سكيمّا'),
            bi('Core Web Vitals fixes', 'إصلاحات مؤشرات الويب الأساسية'),
            bi('Monthly ranking & traffic reports', 'تقارير شهرية للترتيب والزيارات'),
        ],
        useCases: [
            uc('Not showing up in search', 'عدم الظهور في البحث', 'Get found for the terms your customers actually type.', 'اظهر للكلمات التي يبحث بها عملاؤك فعلاً.'),
            uc('Recovering lost rankings', 'استعادة الترتيب المفقود', 'Diagnose and fix what caused a drop in visibility.', 'تشخيص وإصلاح سبب تراجع الظهور.'),
            uc('Beating competitors', 'التفوّق على المنافسين', 'Outrank rivals for the searches that drive revenue.', 'تجاوز المنافسين في عمليات البحث التي تجلب الإيرادات.'),
        ],
    },
    'content-marketing-authority': {
        deliverables: [
            bi('Content strategy & topic map', 'استراتيجية محتوى وخريطة مواضيع'),
            bi('Keyword-aligned articles (AR + EN)', 'مقالات متوافقة مع الكلمات المفتاحية (عربي وإنجليزي)'),
            bi('Editorial calendar', 'تقويم تحريري'),
            bi('SEO-optimized writing', 'كتابة محسّنة للبحث'),
            bi('Internal linking plan', 'خطة ربط داخلي'),
            bi('Visuals & on-page formatting', 'عناصر بصرية وتنسيق الصفحة'),
            bi('Distribution guidance', 'إرشاد للنشر والتوزيع'),
            bi('Performance tracking', 'تتبّع الأداء'),
        ],
        useCases: [
            uc('Becoming the go-to expert', 'أن تصبح المرجع', 'Publish content that positions your brand as the authority.', 'انشر محتوى يضع علامتك في موضع المرجعية.'),
            uc('Attracting organic traffic', 'جذب زيارات مجانية', 'Articles that bring qualified visitors from search over time.', 'مقالات تجلب زواراً مؤهّلين من البحث مع الوقت.'),
            uc('Feeding the whole funnel', 'تغذية مسار التحويل', 'Content for every stage, from first search to final decision.', 'محتوى لكل مرحلة، من أول بحث إلى القرار النهائي.'),
        ],
    },

    // ── Business Systems (use cases only; "What we build" cards cover scope) ──
    'custom-erp-crm-solutions': {
        deliverables: [],
        useCases: [
            uc('One source of truth', 'مصدر واحد للحقيقة', 'Unify sales, stock, and finance instead of scattered spreadsheets.', 'وحّد المبيعات والمخزون والمالية بدل الجداول المتفرّقة.'),
            uc('Never dropping a lead', 'عدم إضاعة أي عميل محتمل', 'Capture and route every inquiry to the right person automatically.', 'التقط ووجّه كل طلب إلى الشخص المناسب تلقائياً.'),
            uc('Running multiple branches', 'إدارة عدة فروع', 'Control branches or franchises from one connected system.', 'تحكّم بالفروع أو الامتيازات من نظام واحد مترابط.'),
        ],
    },
    'industry-specific-business-systems': {
        deliverables: [],
        useCases: [
            uc('Built for your sector', 'مبني لقطاعك', 'A system that matches how your specific industry actually works.', 'نظام يطابق طريقة عمل قطاعك تحديداً.'),
            uc('Replacing generic tools', 'استبدال الأدوات العامة', 'Stop forcing your workflow into software that does not fit.', 'لا تُجبر سير عملك على برمجيات لا تناسبه.'),
            uc('Connecting field & office', 'ربط الميدان بالمكتب', 'Link on-site teams with back-office operations in real time.', 'اربط الفرق الميدانية بعمليات المكتب لحظياً.'),
        ],
    },
    'business-process-automation': {
        deliverables: [],
        useCases: [
            uc('Killing manual data entry', 'إنهاء الإدخال اليدوي', 'Automate the repetitive typing that wastes your team’s time.', 'أتمتة الإدخال المتكرر الذي يهدر وقت فريقك.'),
            uc('Faster quotes & invoices', 'عروض وفواتير أسرع', 'Generate proposals, invoices, and reminders automatically.', 'أنشئ العروض والفواتير والتذكيرات تلقائياً.'),
            uc('Connecting your tools', 'ربط أدواتك', 'Sync website, CRM, and accounting so data flows on its own.', 'زامن الموقع والـ CRM والمحاسبة لتتدفّق البيانات تلقائياً.'),
        ],
    },
    'internal-enterprise-applications': {
        deliverables: [],
        useCases: [
            uc('Tools that fit your team', 'أدوات تناسب فريقك', 'Custom dashboards and portals built around your actual roles.', 'لوحات وبوابات مخصصة مبنية حول أدوار فريقك الفعلية.'),
            uc('Replacing spreadsheets', 'استبدال الجداول', 'Move messy spreadsheets into a reliable, shared application.', 'انقل الجداول الفوضوية إلى تطبيق موثوق ومشترك.'),
            uc('Visibility & accountability', 'وضوح ومساءلة', 'Track performance, approvals, and tasks in one place.', 'تابع الأداء والموافقات والمهام في مكان واحد.'),
        ],
    },
    'data-architecture-business-intelligence': {
        deliverables: [],
        useCases: [
            uc('Breaking data silos', 'كسر عزل البيانات', 'Centralize scattered data so departments share one truth.', 'مركزة البيانات المتفرّقة لتشترك الأقسام في حقيقة واحدة.'),
            uc('Live decision dashboards', 'لوحات قرار لحظية', 'See real-time KPIs instead of waiting for manual reports.', 'شاهد المؤشرات لحظياً بدل انتظار التقارير اليدوية.'),
            uc('Trustworthy numbers', 'أرقام موثوقة', 'Clean, deduplicated data you can actually rely on.', 'بيانات نظيفة وبلا تكرار يمكنك الاعتماد عليها فعلاً.'),
        ],
    },
}

export function getPillarSections(pillarSlug: string): PillarSections {
    return SUB_SERVICE_SECTIONS[pillarSlug] ?? DEFAULT_SECTIONS
}
