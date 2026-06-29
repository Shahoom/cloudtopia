import type { LocalizedText } from '@/lib/seo/industries'

/**
 * Bespoke, bilingual content for the "Get Found" pillar trio — SEO, AEO, GEO.
 *
 * These three pillars share one premium design (GetFoundPillarPage) but each
 * carries its own hand-authored EN+AR copy. SEO is the refreshed organic-search
 * pillar (and still owns its 14 sub-services, shown as glow cards); AEO and GEO
 * are new pillars with no sub-services, so their depth comes from the capability
 * grid + process + FAQs here.
 *
 * Numbers policy: CloudTopia does not publish fabricated precise figures, so the
 * stat callouts use qualitative, directional labels rather than invented
 * percentages.
 */

const t = (en: string, ar: string): LocalizedText => ({ en, ar })

export type GetFoundContent = {
    slug: string
    hero: { badge: LocalizedText; title: LocalizedText; subtitle: LocalizedText }
    shift: { heading: LocalizedText; body: LocalizedText; stats: { value: string; label: LocalizedText }[] }
    /** 4–6 capabilities — replaces the sub-service grid for AEO/GEO. */
    capabilities: { title: LocalizedText; desc: LocalizedText }[]
    process: { name: LocalizedText; detail: LocalizedText }[]
    faqs: { question: LocalizedText; answer: LocalizedText }[]
}

export const getFoundContent: Record<string, GetFoundContent> = {
    'search-engine-optimization': {
        slug: 'search-engine-optimization',
        hero: {
            badge: t('Search Engine Optimization', 'تحسين محركات البحث'),
            title: t(
                'Be found for what your customers actually search',
                'كن الخيار الظاهر لما يبحث عنه عملاؤك فعلاً',
            ),
            subtitle: t(
                'Technical, on-page, and off-page SEO that earns durable organic traffic — the kind that keeps bringing the right people in long after the work is done, without paying for every click.',
                'تحسين تقني وعلى الصفحة وخارجها يجلب زيارات عضوية مستدامة — من النوع الذي يستمر في جلب العملاء المناسبين بعد انتهاء العمل بوقت طويل، دون دفع مقابل كل نقرة.',
            ),
        },
        shift: {
            heading: t('Rankings are earned, not rented', 'الترتيب يُكتسب ولا يُستأجر'),
            body: t(
                'Paid ads stop the moment the budget does. Organic search compounds: every page you make genuinely useful, every technical issue you fix, and every credible link you earn keeps working for months. We build that foundation — a site search engines can crawl, understand, and trust — so your best customers find you at the exact moment they are looking.',
                'الإعلانات المدفوعة تتوقّف فور توقّف الميزانية. أما البحث العضوي فيتراكم: كل صفحة تجعلها مفيدة حقاً، وكل مشكلة تقنية تصلحها، وكل رابط موثوق تكسبه يبقى يعمل لأشهر. نحن نبني هذا الأساس — موقع تستطيع محركات البحث الزحف إليه وفهمه والوثوق به — ليجدك أفضل عملائك في اللحظة التي يبحثون فيها بالضبط.',
            ),
            stats: [
                { value: 'Organic', label: t('Traffic you don’t pay per click', 'زيارات لا تدفع مقابل كل نقرة') },
                { value: 'Durable', label: t('Compounds over months, not days', 'تتراكم على مدى أشهر لا أيام') },
                { value: 'Intent-led', label: t('Reaches people already searching', 'يصل لمن يبحث بالفعل') },
            ],
        },
        capabilities: [
            {
                title: t('Technical SEO & indexing', 'SEO تقني وفهرسة'),
                desc: t(
                    'Crawlability, site speed, structured data, clean URLs, and mobile health — the foundation that lets search engines actually read and rank your pages.',
                    'قابلية الزحف وسرعة الموقع والبيانات المنظمة وروابط نظيفة وصحّة الأجهزة المحمولة — الأساس الذي يتيح لمحركات البحث قراءة صفحاتك وترتيبها فعلاً.',
                ),
            },
            {
                title: t('On-page optimization', 'تحسين على الصفحة'),
                desc: t(
                    'Titles, headings, internal links, and content shaped around real search intent in both Arabic and English — so each page targets the right query clearly.',
                    'عناوين ورؤوس وروابط داخلية ومحتوى مُصاغ حول نية البحث الحقيقية بالعربية والإنجليزية — لتستهدف كل صفحة الاستعلام المناسب بوضوح.',
                ),
            },
            {
                title: t('Off-page SEO & link building', 'SEO خارج الصفحة وبناء الروابط'),
                desc: t(
                    'Credible, relevant links and brand mentions that build the authority search engines reward — earned the durable way, never spammed.',
                    'روابط وإشارات علامة موثوقة وذات صلة تبني السلطة التي تكافئها محركات البحث — مكتسبة بالطريقة المستدامة، لا عبر الإزعاج.',
                ),
            },
            {
                title: t('Local & international SEO', 'SEO محلي ودولي'),
                desc: t(
                    'Google Business Profile, “near me” visibility, and map rankings for local reach — plus multilingual and multi-region setup when you sell across the Gulf and beyond.',
                    'ملف Google التجاري وظهور «بالقرب مني» وترتيب الخرائط للوصول المحلي — إضافة إلى إعداد متعدد اللغات والمناطق حين تبيع عبر الخليج وخارجه.',
                ),
            },
            {
                title: t('Audits & competitor analysis', 'تدقيق وتحليل المنافسين'),
                desc: t(
                    'A clear read on where you stand, what is holding you back, and exactly where competitors are winning — turned into a prioritized, do-this-next plan.',
                    'قراءة واضحة لموقعك الحالي وما الذي يعيقك وأين يفوز المنافسون بالضبط — محوّلة إلى خطة مرتّبة بالأولوية: «هذا ما يلي».',
                ),
            },
            {
                title: t('Content alignment', 'مواءمة المحتوى'),
                desc: t(
                    'Keyword research and content mapping that connect your pages to the questions buyers ask, closing the gaps between what they search and what you publish.',
                    'بحث الكلمات المفتاحية ورسم خرائط المحتوى لربط صفحاتك بأسئلة المشترين، وسدّ الفجوات بين ما يبحثون عنه وما تنشره.',
                ),
            },
        ],
        process: [
            {
                name: t('Audit & discovery', 'تدقيق واكتشاف'),
                detail: t(
                    'We crawl the site, review analytics and Search Console, study your market and competitors, and document every issue and opportunity worth acting on.',
                    'نزحف الموقع ونراجع التحليلات وSearch Console وندرس سوقك ومنافسيك ونوثّق كل مشكلة وفرصة تستحق التحرّك.',
                ),
            },
            {
                name: t('Strategy & roadmap', 'استراتيجية وخارطة طريق'),
                detail: t(
                    'We turn findings into a prioritized plan — quick technical wins first, then the keyword and content map that targets the searches that matter to your business.',
                    'نحوّل النتائج إلى خطة مرتّبة بالأولوية — مكاسب تقنية سريعة أولاً، ثم خريطة الكلمات والمحتوى التي تستهدف عمليات البحث المهمة لأعمالك.',
                ),
            },
            {
                name: t('Implementation', 'التنفيذ'),
                detail: t(
                    'We fix the technical foundation, optimize on-page elements, build out content, and earn credible links — bilingual throughout, with everything documented.',
                    'نُصلح الأساس التقني ونحسّن عناصر الصفحة ونبني المحتوى ونكسب روابط موثوقة — بلغتين طوال الوقت، مع توثيق كل شيء.',
                ),
            },
            {
                name: t('Measure & refine', 'قياس وتحسين'),
                detail: t(
                    'We track rankings, traffic, and conversions, report in plain language, and double down on what works — SEO is a compounding cycle, not a one-time fix.',
                    'نتتبّع الترتيب والزيارات والتحويلات ونرفع تقارير بلغة واضحة ونضاعف ما ينجح — فالـ SEO دورة تراكمية لا إصلاح لمرة واحدة.',
                ),
            },
        ],
        faqs: [
            {
                question: t('How long does SEO take to show results?', 'كم يستغرق ظهور نتائج SEO؟'),
                answer: t(
                    'Technical fixes can lift performance within weeks, but durable ranking gains usually build over three to six months as pages mature and authority grows. SEO rewards consistency — the results compound and last far longer than paid traffic.',
                    'يمكن للإصلاحات التقنية أن ترفع الأداء خلال أسابيع، لكن مكاسب الترتيب المستدامة تتكوّن عادةً خلال ثلاثة إلى ستة أشهر مع نضج الصفحات ونمو السلطة. يكافئ الـ SEO الاستمرارية — فالنتائج تتراكم وتدوم أطول بكثير من الزيارات المدفوعة.',
                ),
            },
            {
                question: t('Do you work in Arabic and English?', 'هل تعملون بالعربية والإنجليزية؟'),
                answer: t(
                    'Yes. We optimize for both languages natively — not machine-translated — including the right URL structure, hreflang setup, and keyword research for each language and region, so you rank properly across the Gulf and internationally.',
                    'نعم. نحسّن للّغتين بشكل أصيل — لا ترجمة آلية — بما في ذلك بنية الروابط الصحيحة وإعداد hreflang وبحث الكلمات لكل لغة ومنطقة، لتتصدّر بشكل سليم عبر الخليج ودولياً.',
                ),
            },
            {
                question: t('Is link building safe?', 'هل بناء الروابط آمن؟'),
                answer: t(
                    'When done properly, yes. We earn relevant, credible links and brand mentions — the kind search engines reward. We never buy spammy links or use tactics that put your site at risk of a penalty.',
                    'عند تنفيذه بشكل صحيح، نعم. نكسب روابط وإشارات علامة ذات صلة وموثوقة — من النوع الذي تكافئه محركات البحث. لا نشتري روابط مزعجة أبداً ولا نستخدم أساليب تعرّض موقعك لخطر العقوبة.',
                ),
            },
            {
                question: t('Should I still do SEO if AI search is rising?', 'هل ما زال علي الاهتمام بـ SEO مع صعود البحث بالذكاء الاصطناعي؟'),
                answer: t(
                    'Absolutely — they reinforce each other. AI answer engines pull from well-structured, authoritative pages, so strong SEO is the foundation AEO and GEO build on. The best strategy covers all three together.',
                    'بالتأكيد — فهي تعزّز بعضها. تستمدّ محركات الإجابة بالذكاء الاصطناعي من صفحات موثوقة وجيدة التنظيم، لذا فالـ SEO القوي هو الأساس الذي يبني عليه AEO وGEO. أفضل استراتيجية تغطّي الثلاثة معاً.',
                ),
            },
        ],
    },

    'answer-engine-optimization': {
        slug: 'answer-engine-optimization',
        hero: {
            badge: t('Answer Engine Optimization', 'تحسين محركات الإجابة'),
            title: t(
                'Own the cited answer',
                'امتلك الإجابة المُستشهَد بها',
            ),
            subtitle: t(
                'Search is becoming answer-first. When ChatGPT, Perplexity, and Google AI Overviews resolve your customers’ questions, AEO makes sure your brand is the source they quote — not a competitor.',
                'البحث يتحوّل إلى «الإجابة أولاً». حين تجيب ChatGPT وPerplexity ونظرات Google AI عن أسئلة عملائك، يضمن AEO أن تكون علامتك هي المصدر الذي تقتبس منه — لا منافسك.',
            ),
        },
        shift: {
            heading: t('The answer is the new first result', 'الإجابة هي النتيجة الأولى الجديدة'),
            body: t(
                'More and more questions are now answered directly — above the links, inside a chat, with no click required. That changes the game: it is no longer enough to rank a page; you have to be the source the answer is built from. AEO structures your content, entities, and authority signals so AI engines can confidently extract, trust, and cite you as the answer.',
                'يُجاب اليوم عن المزيد والمزيد من الأسئلة مباشرةً — فوق الروابط، داخل محادثة، دون الحاجة إلى نقرة. هذا يغيّر القواعد: لم يعد كافياً أن تتصدّر صفحة؛ بل عليك أن تكون المصدر الذي تُبنى منه الإجابة. يهيكل AEO محتواك وكياناتك وإشارات سلطتك كي تستطيع محركات الذكاء الاصطناعي استخراجك والوثوق بك والاستشهاد بك كإجابة بثقة.',
            ),
            stats: [
                { value: 'Zero-click', label: t('Answers given without a visit', 'إجابات تُقدَّم دون زيارة') },
                { value: 'Cited', label: t('Be the source AI quotes', 'كن المصدر الذي يقتبسه الذكاء الاصطناعي') },
                { value: 'AI-first', label: t('Where discovery is heading', 'حيث يتّجه الاكتشاف') },
            ],
        },
        capabilities: [
            {
                title: t('Answer-ready structured data', 'بيانات منظمة جاهزة للإجابة'),
                desc: t(
                    'Schema and markup that label your facts, offerings, and answers in a machine-readable way, so AI engines can lift them cleanly into a response.',
                    'مخططات وترميز توسم حقائقك وعروضك وإجاباتك بصيغة يقرأها الحاسوب، كي تستطيع محركات الذكاء الاصطناعي رفعها بنظافة داخل الإجابة.',
                ),
            },
            {
                title: t('Entity & knowledge-graph optimization', 'تحسين الكيانات والرسم المعرفي'),
                desc: t(
                    'We make your brand a clear, consistent entity across the web — name, what you do, where you operate — so engines understand exactly who you are and when to surface you.',
                    'نجعل علامتك كياناً واضحاً ومتسقاً عبر الويب — الاسم، وما تقدّمه، وأين تعمل — كي تفهم المحركات من أنت بالضبط ومتى تُظهرك.',
                ),
            },
            {
                title: t('FAQ & Q&A content engineering', 'هندسة محتوى الأسئلة والأجوبة'),
                desc: t(
                    'Real questions, answered concisely and accurately the way people actually ask them — the exact format answer engines prefer to quote.',
                    'أسئلة حقيقية، تُجاب بإيجاز ودقة بالطريقة التي يطرحها بها الناس فعلاً — وهو الشكل الذي تفضّل محركات الإجابة الاقتباس منه بالضبط.',
                ),
            },
            {
                title: t('Content formatted for AI extraction', 'محتوى مُهيّأ لاستخراج الذكاء الاصطناعي'),
                desc: t(
                    'Clear headings, direct lead sentences, definitions, and lists — content structured so a model can pull a clean, correct answer without misreading you.',
                    'رؤوس واضحة وجُمل افتتاحية مباشرة وتعريفات وقوائم — محتوى مهيكل كي يستخرج النموذج إجابة نظيفة وصحيحة دون أن يسيء فهمك.',
                ),
            },
            {
                title: t('Authority & trust signals', 'إشارات السلطة والثقة'),
                desc: t(
                    'The credibility markers AI weighs before citing a source — author expertise, citations, consistency, and reputation across the web.',
                    'علامات المصداقية التي يزنها الذكاء الاصطناعي قبل الاستشهاد بمصدر — خبرة المؤلف والاستشهادات والاتساق والسمعة عبر الويب.',
                ),
            },
            {
                title: t('Citation monitoring across AI engines', 'مراقبة الاستشهاد عبر محركات الذكاء الاصطناعي'),
                desc: t(
                    'We track when and how ChatGPT, Perplexity, Gemini, and AI Overviews mention you, what they say, and where rivals are cited instead — then close the gap.',
                    'نتتبّع متى وكيف تذكرك ChatGPT وPerplexity وGemini ونظرات AI، وماذا تقول، وأين يُستشهد بالمنافسين بدلاً منك — ثم نسدّ الفجوة.',
                ),
            },
        ],
        process: [
            {
                name: t('Answer audit', 'تدقيق الإجابات'),
                detail: t(
                    'We ask the AI engines the questions your customers ask, capture who gets cited today, and map the gaps between your content and the answers being given.',
                    'نطرح على محركات الذكاء الاصطناعي الأسئلة التي يطرحها عملاؤك، ونرصد من يُستشهد به اليوم، ونرسم الفجوات بين محتواك والإجابات المُقدَّمة.',
                ),
            },
            {
                name: t('Structure & entities', 'الهيكلة والكيانات'),
                detail: t(
                    'We implement schema, clarify your brand entity, and align your knowledge-graph presence so engines can identify and trust you as a source.',
                    'ننفّذ المخططات ونوضّح كيان علامتك ونوائم حضورك في الرسم المعرفي كي تستطيع المحركات تمييزك والوثوق بك كمصدر.',
                ),
            },
            {
                name: t('Answer content', 'محتوى الإجابات'),
                detail: t(
                    'We build and reshape content into the concise, well-structured, extractable answers AI engines prefer — accurate, on-brand, and bilingual.',
                    'نبني المحتوى ونعيد تشكيله إلى إجابات موجزة وجيدة الهيكلة وقابلة للاستخراج تفضّلها محركات الذكاء الاصطناعي — دقيقة ومتوافقة مع العلامة وبلغتين.',
                ),
            },
            {
                name: t('Monitor & adapt', 'مراقبة وتكيّف'),
                detail: t(
                    'We watch how often you are cited across engines, learn what earns the citation, and keep refining — AI answers shift, and so does the strategy.',
                    'نراقب كم مرة يُستشهد بك عبر المحركات، ونتعلّم ما الذي يكسب الاستشهاد، ونواصل التحسين — فإجابات الذكاء الاصطناعي تتغيّر، وكذلك الاستراتيجية.',
                ),
            },
        ],
        faqs: [
            {
                question: t('What exactly is Answer Engine Optimization?', 'ما هو تحسين محركات الإجابة بالضبط؟'),
                answer: t(
                    'AEO is the practice of optimizing your content so AI answer engines — ChatGPT, Perplexity, Google AI Overviews — cite your brand as the direct answer to a question. Where classic SEO competes for a ranking, AEO competes to be the source the answer is built from.',
                    'AEO هو ممارسة تحسين محتواك كي تستشهد محركات الإجابة بالذكاء الاصطناعي — ChatGPT وPerplexity ونظرات Google AI — بعلامتك كإجابة مباشرة عن سؤال. فبينما يتنافس الـ SEO الكلاسيكي على ترتيب، يتنافس AEO ليكون المصدر الذي تُبنى منه الإجابة.',
                ),
            },
            {
                question: t('How is AEO different from SEO?', 'كيف يختلف AEO عن SEO؟'),
                answer: t(
                    'SEO earns you a position in a list of links a person clicks. AEO earns you a place inside the answer itself — often with no click at all. They share a foundation (clean, authoritative, well-structured content) but AEO adds schema, entity clarity, and answer-formatting aimed squarely at AI engines.',
                    'الـ SEO يكسبك موقعاً في قائمة روابط ينقر عليها الشخص. أما AEO فيكسبك مكاناً داخل الإجابة نفسها — غالباً دون أي نقرة. يتشاركان أساساً واحداً (محتوى نظيف وموثوق وجيد الهيكلة) لكن AEO يضيف المخططات ووضوح الكيان وتنسيق الإجابة الموجَّه مباشرةً لمحركات الذكاء الاصطناعي.',
                ),
            },
            {
                question: t('If there is no click, what is the value?', 'إذا لم تكن هناك نقرة، فما القيمة؟'),
                answer: t(
                    'Being the cited answer puts your brand in front of the customer at the decisive moment, builds authority and recall, and often carries a link or mention that drives qualified visits. In an answer-first world, being quoted is the visibility — not being quoted is the real cost.',
                    'كونك الإجابة المُستشهَد بها يضع علامتك أمام العميل في اللحظة الحاسمة، ويبني السلطة والتذكّر، ويحمل غالباً رابطاً أو إشارة تجلب زيارات مؤهَّلة. في عالم «الإجابة أولاً»، الاقتباس هو الظهور — وعدم الاقتباس هو التكلفة الحقيقية.',
                ),
            },
            {
                question: t('Can you tell if AI engines are citing us?', 'هل يمكنكم معرفة ما إذا كانت محركات الذكاء الاصطناعي تستشهد بنا؟'),
                answer: t(
                    'Yes. We monitor how the major AI engines respond to the questions that matter to your business — whether you are mentioned, what they say about you, and which competitors get cited instead — and we use that to guide what we optimize next.',
                    'نعم. نراقب كيف تستجيب محركات الذكاء الاصطناعي الكبرى للأسئلة المهمة لأعمالك — هل تُذكَر، وماذا تقول عنك، وأي المنافسين يُستشهد بهم بدلاً منك — ونستخدم ذلك لتوجيه ما نحسّنه تالياً.',
                ),
            },
        ],
    },

    'generative-engine-optimization': {
        slug: 'generative-engine-optimization',
        hero: {
            badge: t('Generative Engine Optimization', 'تحسين المحركات التوليدية'),
            title: t(
                'Be the brand generative AI recommends',
                'كن العلامة التي يرشّحها الذكاء الاصطناعي التوليدي',
            ),
            subtitle: t(
                'Buyers now ask AI assistants for recommendations before they ask anyone else. GEO positions your brand to surface inside those generated answers — so when someone asks for the best option, your name comes up.',
                'صار المشترون يسألون مساعدي الذكاء الاصطناعي عن التوصيات قبل أن يسألوا أحداً غيرهم. يهيّئ GEO علامتك للظهور داخل تلك الإجابات المُولَّدة — فحين يسأل أحدهم عن أفضل خيار، يظهر اسمك.',
            ),
        },
        shift: {
            heading: t('AI is the new shortlist', 'الذكاء الاصطناعي هو القائمة المختصرة الجديدة'),
            body: t(
                'When a buyer asks an AI assistant “who should I use for this?”, the model answers with a handful of names — and most people never look past them. That shortlist is decided by what the AI has read about you across the web: the sources it trusts, the comparisons you appear in, the reviews and mentions that describe you. GEO shapes that footprint so your brand is part of the recommendation, not left out of it.',
                'حين يسأل مشترٍ مساعد ذكاء اصطناعي «من أستخدم لهذا؟»، يجيب النموذج بحفنة من الأسماء — ومعظم الناس لا ينظرون أبعد منها. تتحدّد تلك القائمة المختصرة بما قرأه الذكاء الاصطناعي عنك عبر الويب: المصادر التي يثق بها، والمقارنات التي تظهر فيها، والمراجعات والإشارات التي تصفك. يصوغ GEO هذا الأثر كي تكون علامتك جزءاً من التوصية، لا مستبعَدة منها.',
            ),
            stats: [
                { value: 'Recommended', label: t('Surface when buyers ask AI', 'اظهر حين يسأل المشترون الذكاء الاصطناعي') },
                { value: 'Top-of-mind', label: t('Inside the names AI suggests', 'ضمن الأسماء التي يقترحها الذكاء الاصطناعي') },
                { value: 'Buyer-led', label: t('Where purchase research starts now', 'حيث يبدأ بحث الشراء الآن') },
            ],
        },
        capabilities: [
            {
                title: t('Presence across the sources AI reads', 'حضور عبر المصادر التي يقرأها الذكاء الاصطناعي'),
                desc: t(
                    'Generative engines learn from directories, publications, forums, and reputable sites. We make sure your brand shows up — accurately and consistently — across the places they draw from.',
                    'تتعلّم المحركات التوليدية من الأدلّة والمنشورات والمنتديات والمواقع الموثوقة. نتأكّد من ظهور علامتك — بدقة واتساق — عبر الأماكن التي تستمدّ منها.',
                ),
            },
            {
                title: t('Authoritative content AI cites', 'محتوى موثوق يستشهد به الذكاء الاصطناعي'),
                desc: t(
                    'Clear, credible, genuinely useful content about what you do — the kind generative models lean on when they assemble a recommendation.',
                    'محتوى واضح وموثوق ومفيد فعلاً عمّا تقدّمه — من النوع الذي تعتمد عليه النماذج التوليدية حين تجمع توصية.',
                ),
            },
            {
                title: t('Comparison & listicle presence', 'الحضور في المقارنات والقوائم'),
                desc: t(
                    '“Best of”, “top providers”, and alternatives pages are exactly what AI quotes for recommendations. We work to get your brand fairly represented in them.',
                    'صفحات «الأفضل» و«أبرز المزوّدين» والبدائل هي تحديداً ما يقتبسه الذكاء الاصطناعي للتوصيات. نعمل على تمثيل علامتك فيها بإنصاف.',
                ),
            },
            {
                title: t('Reviews & mentions', 'المراجعات والإشارات'),
                desc: t(
                    'The volume, quality, and sentiment of what is said about you shapes how AI describes you. We help you build a stronger, more credible footprint of reviews and mentions.',
                    'حجم وجودة ومشاعر ما يُقال عنك تشكّل كيف يصفك الذكاء الاصطناعي. نساعدك على بناء أثر أقوى وأكثر مصداقية من المراجعات والإشارات.',
                ),
            },
            {
                title: t('Prompt-space monitoring', 'مراقبة فضاء الأوامر'),
                desc: t(
                    'We test the real prompts buyers use — “best option for X in the Gulf” — to see whether AI recommends you, ignores you, or favors a competitor, and why.',
                    'نختبر الأوامر الحقيقية التي يستخدمها المشترون — «أفضل خيار لـ X في الخليج» — لنرى هل يوصي بك الذكاء الاصطناعي أم يتجاهلك أم يفضّل منافساً، ولماذا.',
                ),
            },
            {
                title: t('Structured brand facts', 'حقائق علامة منظمة'),
                desc: t(
                    'A clean, machine-readable record of who you are, what you offer, and where you operate — so generative engines describe your brand correctly, not from guesswork.',
                    'سجلّ نظيف يقرأه الحاسوب عمّن أنت وما تقدّمه وأين تعمل — كي تصف المحركات التوليدية علامتك بشكل صحيح، لا بالتخمين.',
                ),
            },
        ],
        process: [
            {
                name: t('Prompt-space mapping', 'رسم فضاء الأوامر'),
                detail: t(
                    'We identify the recommendation prompts your buyers actually use, run them across the major AI assistants, and record where you stand against competitors today.',
                    'نحدّد أوامر التوصية التي يستخدمها مشتروك فعلاً، ونجرّبها عبر مساعدي الذكاء الاصطناعي الكبار، ونسجّل موقعك مقابل المنافسين اليوم.',
                ),
            },
            {
                name: t('Footprint & sources', 'الأثر والمصادر'),
                detail: t(
                    'We map the sources AI draws on for your category and find where your brand is missing, thin, or misrepresented — the gaps that keep you out of the answer.',
                    'نرسم المصادر التي يستمدّ منها الذكاء الاصطناعي في فئتك ونجد أين تكون علامتك غائبة أو ضعيفة أو مُصوَّرة خطأً — الفجوات التي تُبقيك خارج الإجابة.',
                ),
            },
            {
                name: t('Build presence', 'بناء الحضور'),
                detail: t(
                    'We strengthen your brand across those sources — authoritative content, accurate facts, comparison and review presence — so generative engines have the right material to recommend you.',
                    'نعزّز علامتك عبر تلك المصادر — محتوى موثوق وحقائق دقيقة وحضور في المقارنات والمراجعات — كي يكون لدى المحركات التوليدية المادة الصحيحة لترشيحك.',
                ),
            },
            {
                name: t('Track recommendations', 'تتبّع التوصيات'),
                detail: t(
                    'We re-test the prompts over time to see how often AI now recommends you, how it describes you, and where to keep pushing — a moving target we manage continuously.',
                    'نعيد اختبار الأوامر مع الوقت لنرى كم مرة يوصي بك الذكاء الاصطناعي الآن، وكيف يصفك، وأين نواصل الدفع — هدف متحرّك نديره باستمرار.',
                ),
            },
        ],
        faqs: [
            {
                question: t('What is Generative Engine Optimization?', 'ما هو تحسين المحركات التوليدية؟'),
                answer: t(
                    'GEO is the practice of shaping your brand’s presence across the web so that generative AI assistants — like ChatGPT, Gemini, and Perplexity — include and recommend you when buyers ask for the best option. It is about being part of the AI’s shortlist, not just ranking in search.',
                    'GEO هو ممارسة تشكيل حضور علامتك عبر الويب كي يدرجك مساعدو الذكاء الاصطناعي التوليدي — مثل ChatGPT وGemini وPerplexity — ويرشّحوك حين يسأل المشترون عن أفضل خيار. الأمر يتعلّق بأن تكون ضمن القائمة المختصرة للذكاء الاصطناعي، لا مجرّد التصدّر في البحث.',
                ),
            },
            {
                question: t('How is GEO different from AEO?', 'كيف يختلف GEO عن AEO؟'),
                answer: t(
                    'AEO is about being the cited answer to a factual question. GEO is about being recommended when someone asks an AI which brand, product, or provider to choose. AEO wins the answer; GEO wins the recommendation. Most brands benefit from both, on top of solid SEO.',
                    'يدور AEO حول أن تكون الإجابة المُستشهَد بها لسؤال معلوماتي. أما GEO فيدور حول أن يُوصى بك حين يسأل أحدهم الذكاء الاصطناعي أي علامة أو منتج أو مزوّد يختار. AEO يكسب الإجابة؛ وGEO يكسب التوصية. وتستفيد معظم العلامات من كليهما، فوق أساس SEO متين.',
                ),
            },
            {
                question: t('Can you really influence what AI recommends?', 'هل يمكنكم فعلاً التأثير في ما يوصي به الذكاء الاصطناعي؟'),
                answer: t(
                    'We cannot dictate an AI’s output, and we never fabricate. What we can do is improve the real-world signals it reads — your presence in trusted sources, the accuracy of your brand facts, your reviews, and your representation in comparisons — which is what shapes whether and how you get recommended.',
                    'لا نستطيع إملاء مُخرَجات الذكاء الاصطناعي، ولا نختلق أبداً. ما نستطيعه هو تحسين الإشارات الواقعية التي يقرأها — حضورك في المصادر الموثوقة، ودقة حقائق علامتك، ومراجعاتك، وتمثيلك في المقارنات — وهي ما يشكّل ما إذا كنت تُرشَّح وكيف.',
                ),
            },
            {
                question: t('How do we know if it is working?', 'كيف نعرف أنه ينجح؟'),
                answer: t(
                    'We continuously test the buying prompts that matter in your category across the major AI assistants and track whether your brand appears, how it is described, and how that changes over time — so progress is something you can actually see, not just trust.',
                    'نختبر باستمرار أوامر الشراء المهمة في فئتك عبر مساعدي الذكاء الاصطناعي الكبار ونتتبّع هل تظهر علامتك وكيف توصَف وكيف يتغيّر ذلك مع الوقت — كي يكون التقدّم شيئاً تراه فعلاً، لا مجرّد ثقة.',
                ),
            },
        ],
    },
}

export const getGetFoundContent = (slug: string): GetFoundContent | null => getFoundContent[slug] ?? null
