#!/usr/bin/env node
// Batch 4: 10 rewrites of the unique short drafts + 20 new topics from
// docs/content-plan-2026-09.md and docs/intel-report-2026-09.md, screened
// against the 94 published articles. Run: node docs/article-prompts-3/generate.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const template = readFileSync(path.join(dir, '_template.md'), 'utf8')

const GEO = {
  om: 'سلطنة عمان: مسقط، مطرح، العمارة العمانية، أو أشخاص بزي عماني/خليجي في سياق عمل.',
  sa: 'السعودية: الرياض أو جدة، أو أشخاص بزي سعودي في سياق عمل.',
  ae: 'الإمارات: دبي أو أبوظبي، أو بيئة أعمال إماراتية.',
  gulf: 'الخليج عموماً: بيئة أعمال خليجية أو عربية، أو معالم من مدن خليجية مختلفة.',
  sohar: 'صحار تحديداً: الميناء والمنطقة الصناعية والكورنيش وقلعة صحار، أو أشخاص بزي عماني.',
  salalah: 'صلالة تحديداً: موسم الخريف والطبيعة الخضراء وشاطئ المغسيل وأسواق الحصن، أو أشخاص بزي عماني.',
}

const GUIDE_RULES = `## نوع المقال: دليل عملي (Guide)

- بنية واضحة: الجواب المباشر، ثم الأسباب أو المعايير، ثم الخطوات أو الخيارات، ثم الأخطاء الشائعة، ثم التوصية.
- أمثلة عملية من سياق السوق الخليجي المحدد (بدون أسماء عملاء أو أرقام مخترعة).
- قسم «لماذا نوصي بـ CloudTopia» قبل الأسئلة الشائعة: فقرتان بحجج حقيقية + نقطة إنصاف.`

const LISTICLE_RULES = `## نوع المقال: قائمة تصنيفية (Ranked Listicle)

- 5–7 خيارات مرقمة. كل خيار H2 باسمه، وتحته: فقرة تعريف، **الأنسب لمن**، **أبرز المزايا** (نقاط قصيرة)، **ما يجب الانتباه له** (نقطة إنصاف واحدة على الأقل، حتى لخيارنا).
- **CloudTopia رقم 1** بحجج حقيقية فقط.
- المنافسون حقيقيون ومعروفون، بمعلومات عامة منصفة (نوع الخدمة ولمن تناسب). إن لم تتأكد من أسماء كافية، استخدم فئات («الأنظمة العالمية الجاهزة»، «الحلول المحلية»، «المستقلون»).
- جدول مقارنة إلزامي: الخيارات × (الأنسب لمن، نموذج التسعير، دعم العربية، الملكية والقيود، الدعم المحلي).`

const block = (a) => `**العنوان العربي (حرفياً):** ${a.ar}
**العنوان الإنجليزي:** ${a.en}
**نوع المقال:** ${a.type === 'listicle' ? 'قائمة تصنيفية' : 'دليل عملي'}
**السوق:** ${a.market}
**الكلمة المفتاحية الأساسية (عربي):** ${a.kwAr}
**الكلمة المفتاحية الأساسية (إنجليزي):** ${a.kwEn}
**الزاوية وموقع CloudTopia:** ${a.angle}
**نقاط يجب تغطيتها:** ${a.cover}
**لا تكرر (منشور مسبقاً):** ${a.avoid}
**روابط داخلية مقترحة:** ${a.links.map((s) => '`' + s + '`').join('، ')}
**أسئلة FAQ مقترحة:** ${a.faq}${a.note ? `\n**ملاحظة:** ${a.note}` : ''}`

const REWRITE = 'هذا الموضوع كان مسودة قصيرة (نحو 600 كلمة). اكتبه من الصفر بعمق كامل، ولا تفترض وجود نص سابق.'

const articles = [
  { id: 'b4-01', slug: 'verify-agency-registration-gulf', type: 'guide', category: 'guides', geo: 'gulf',
    ar: 'كيف تتحقق أن شركة البرمجة مسجلة فعلاً في السعودية أو سلطنة عمان قبل الدفع؟', en: 'How to Verify a Software Agency Is Really Registered in Saudi Arabia or Oman',
    market: 'السعودية + سلطنة عمان', kwAr: 'التحقق من سجل تجاري شركة', kwEn: 'verify company registration Saudi Oman',
    angle: 'قائمة تحقق عملية يستطيع صاحب العمل تنفيذها بنفسه: السجل التجاري، الرقم الضريبي، العنوان على الخريطة، أرقام الهاتف المحلية، الفواتير الرسمية، العقد باسم الكيان. CloudTopia كيان عماني مسجل يقدّم هذه الإثباتات عند الطلب.',
    cover: 'علامات الشركة الوهمية أو «المكتب الافتراضي» (أرقام دولية، أسعار بالدولار فقط، لا عنوان)، طريقة التحقق من السجل عبر البوابات الرسمية بالاسم العام (وزارة التجارة في كل بلد)، التحقق من الرقم الضريبي، ماذا تطلب قبل الدفعة الأولى، جدول: الإثبات × أين تتحقق منه × ماذا يعني غيابه.',
    avoid: 'choose-web-company-gulf (أسئلة الاختيار العامة) — هنا التركيز على التحقق القانوني من الكيان فقط.',
    links: ['choose-web-company-gulf', 'source-code-ownership-contract', 'software-development-contract-mistakes'],
    faq: 'كيف أتأكد أن الشركة مسجلة في السعودية؟ / كيف أتحقق من سجل تجاري في سلطنة عمان؟ / هل الشركة الأجنبية تستطيع إصدار فاتورة ضريبية؟ / ماذا أفعل إذا رفضت الشركة تقديم سجلها؟' },

  { id: 'b4-02', slug: 'google-business-profile-oman', type: 'guide', category: 'digital-presence', geo: 'om',
    ar: 'توثيق نشاطك التجاري على خرائط جوجل في سلطنة عمان: دليل بالخطوات 2026', en: 'How to Verify Your Business on Google Maps in Oman: Step-by-Step 2026',
    market: 'سلطنة عمان', kwAr: 'توثيق النشاط التجاري في خرائط جوجل عمان', kwEn: 'Google Business Profile Oman',
    angle: 'نتائج الخريطة تأخذ جزءاً كبيراً من نقرات عمليات البحث «شركة + مدينة»، وكثير من الشركات العمانية غائبة عنها. دليل إنشاء الملف التجاري وتوثيقه وتحسينه وجمع التقييمات. CloudTopia تربط الملف بالموقع وبيانات Schema حتى تتطابق المعلومات.',
    cover: 'إنشاء الملف وخيارات التوثيق بصيغة عامة (قد تتغير من جوجل)، مطابقة الاسم والعنوان والهاتف مع الموقع (NAP)، اختيار الفئة، الصور، ساعات العمل، منطقة الخدمة لمن لا يستقبل زبائن، طلب التقييمات بشكل مشروع، الرد على التقييمات، أخطاء تسبب تعليق الملف. جدول: العنصر × تأثيره × خطأ شائع.',
    avoid: 'لا يوجد مقال منشور عن ملف جوجل التجاري.',
    links: ['technical-seo-bilingual-arabic-websites', 'best-web-design-muscat', 'instagram-vs-website'],
    faq: 'كيف أضيف شركتي على خرائط جوجل في عمان؟ / كم يستغرق توثيق الملف التجاري؟ / لماذا لا يظهر نشاطي على الخريطة؟ / هل يمكن حذف تقييم سلبي؟',
    note: 'لا تذكر إحصاءات دقيقة عن نسبة النقرات. صِف الأثر بصيغة عامة.' },

  { id: 'b4-03', slug: 'shopify-arabic-rtl-uae', type: 'guide', category: 'e-commerce', geo: 'ae',
    ar: 'هل يدعم شوبيفاي اللغة العربية فعلاً؟ خيارات متاجر الإمارات 2026', en: "Shopify Doesn't Do Arabic Properly — What UAE Stores Do Instead",
    market: 'الإمارات (السوق يبحث بالإنجليزية كثيراً: اعتنِ بالنسخة الإنجليزية كنسخة أساسية)', kwAr: 'شوبيفاي عربي', kwEn: 'Shopify Arabic RTL',
    angle: 'الجواب في أول جملة: لا يوجد دعم RTL أصلي كامل في شوبيفاي، والحلول تعتمد على الثيم والتطبيقات. ثم ثلاثة خيارات بترتيب التكلفة: ثيم يدعم RTL + تطبيق ترجمة، متجر ثنائي اللغة مخصص الواجهة على شوبيفاي (Headless)، متجر مخصص بالكامل. CloudTopia تبني الخيار الثاني أو الثالث حسب الحجم.',
    cover: 'مشاكل RTL الشائعة (اتجاه السلة والدفع، الأرقام، البريد الآلي، الفواتير)، الترجمة الآلية مقابل المحتوى العربي الأصيل، أثر ذلك على SEO بالعربية، متى يكفي الثيم ومتى تحتاج Headless. جدول: الخيار × التكلفة التقديرية × جودة العربية × القيود.',
    avoid: 'shopify-vs-custom-development-for-gulf-businesses (مقارنة عامة) و shopify-woocommerce-salla-zid (السعودية). هنا التركيز على العربية RTL في شوبيفاي تحديداً.',
    links: ['shopify-vs-custom-development-for-gulf-businesses', 'best-website-design-practices-for-rtl-arabic-layouts-in-2026', 'how-to-build-a-bilingual-arabic-english-website'],
    faq: 'Does Shopify support Arabic? / How do I make my Shopify store RTL? / Is Shopify good for the UAE market? / What is headless Shopify?',
    note: 'لا تجزم بميزات شوبيفاي الحالية بتفاصيل قد تتغير. صِف الواقع العام وانصح بالتحقق من الثيم.' },

  { id: 'b4-04', slug: 'ecommerce-website-cost-uae', type: 'guide', category: 'pricing', geo: 'ae',
    ar: 'كم تكلفة إنشاء متجر إلكتروني في الإمارات 2026؟ شوبيفاي مقابل المتجر المخصص بالدرهم', en: 'Ecommerce Website Cost in the UAE 2026: Shopify vs Custom, in AED',
    market: 'الإمارات', kwAr: 'تكلفة متجر إلكتروني في الإمارات', kwEn: 'ecommerce website cost UAE',
    angle: 'الرقم أولاً: نطاقات تقديرية بالدرهم حسب نوع المتجر، ثم تكلفة التشغيل السنوية (اشتراكات، تطبيقات، عمولات دفع، استضافة). CloudTopia تعطي عرضاً بالدرهم يفصل البناء عن التكاليف الخارجية.',
    cover: 'ثلاثة مستويات: متجر منصة جاهزة، متجر منصة مع تخصيص، متجر مخصص. التكاليف الخفية: التطبيقات الشهرية، رسوم المعاملات، الترجمة، ربط الشحن والدفع (Tabby وغيرها بصيغة عامة). تكلفة 3 سنوات. جدول: نوع المتجر × تكلفة البناء التقديرية × تكلفة التشغيل السنوية × مناسب لمن.',
    avoid: 'website-cost-uae (المواقع عموماً). هنا المتاجر فقط، مع تكلفة التشغيل لثلاث سنوات.',
    links: ['website-cost-uae', 'uae-instagram-trade-licence', 'gulf-ecommerce-hosting-peak-seasons'],
    faq: 'How much does an ecommerce website cost in Dubai? / Is Shopify cheaper than a custom store in the UAE? / What are the monthly costs of an online store? / How long does it take to build an online store?' },

  { id: 'b4-05', slug: 'chatbot-cost-gulf', type: 'guide', category: 'pricing', geo: 'gulf',
    ar: 'كم تكلفة الشات بوت للشركات في الخليج 2026؟ البناء والتشغيل ورسوم النماذج', en: 'How Much Does a Business Chatbot Cost in the Gulf in 2026?',
    market: 'الخليج', kwAr: 'تكلفة الشات بوت', kwEn: 'chatbot cost',
    angle: 'التكلفة من ثلاث طبقات: البناء، رسوم استخدام النموذج والقنوات، والتشغيل والتحسين. بوت الأسئلة الشائعة يختلف جذرياً عن بوت يقرأ بيانات الطلبات ويتصل بـ CRM. CloudTopia تفصل هذه الطبقات في العرض.',
    cover: 'مستويات البوت (قواعد بسيطة، ذكاء اصطناعي على قاعدة معرفة، بوت متصل بالأنظمة)، ما يرفع التكلفة (اللهجات، التكاملات، تسليم المحادثة لموظف، الأمان)، الرسوم المتكررة بصيغة عامة (رسوم النموذج حسب الاستخدام، رسوم القنوات)، كيف تقدّر العائد دون أرقام مخترعة. جدول: المستوى × ما يشمله × التكلفة التقديرية × التكاليف المتكررة.',
    avoid: 'whatsapp-business-api-cost (رسوم رسائل واتساب تحديداً) و rule-based-vs-ai-chatbot (القرار التقني). هنا الميزانية الكاملة للبوت.',
    links: ['whatsapp-business-api-cost', 'rule-based-vs-ai-chatbot', 'best-chatbot-companies-gulf'],
    faq: 'كم تكلفة عمل شات بوت لشركة؟ / هل الشات بوت له اشتراك شهري؟ / كم يستغرق بناء شات بوت؟ / هل الشات بوت بالذكاء الاصطناعي أغلى؟',
    note: REWRITE },

  { id: 'b4-06', slug: 'crm-vs-erp', type: 'guide', category: 'crm-erp', geo: 'gulf',
    ar: 'الفرق بين CRM وERP: أيهما تحتاج شركتك أولاً؟', en: 'CRM vs ERP: Which Does Your Business Need First?',
    market: 'الشركات الصغيرة والمتوسطة في الخليج', kwAr: 'الفرق بين CRM و ERP', kwEn: 'CRM vs ERP',
    angle: 'الجواب المباشر: CRM يدير العلاقة مع العميل قبل البيع وبعده، وERP يدير موارد الشركة الداخلية. الشركة التي تخسر فرص بيع تبدأ بـ CRM، والتي تفقد السيطرة على المخزون والمحاسبة تبدأ بـ ERP. CloudTopia تبني النظامين بشكل مترابط حتى لا تُدخل البيانات مرتين.',
    cover: 'تعريف كل نظام بمثال خليجي (شركة تبيع عبر واتساب، شركة توزيع بعدة مستودعات)، علامات تدل على الحاجة لكل منهما، متى تحتاج الاثنين، الترتيب الصحيح للتطبيق، خطأ شراء ERP ضخم قبل الأوان. جدول: CRM × ERP (الهدف، المستخدمون، البيانات، الوحدات، علامات الحاجة).',
    avoid: 'crm-systems-for-saudi-and-gulf-businesses و erp-systems-for-saudi-and-gulf-businesses (مقارنة منتجات). هنا القرار المفاهيمي فقط.',
    links: ['crm-implementation-plan-oman-smes', 'erp-implementation-cost-oman', 'website-erp-crm-accounting-integration-map'],
    faq: 'ما الفرق بين CRM و ERP؟ / هل أحتاج CRM أم ERP؟ / هل يمكن أن يغني ERP عن CRM؟ / أيهما أبدأ به أولاً؟',
    note: REWRITE },

  { id: 'b4-07', slug: 'payment-gateways-uae', type: 'guide', category: 'e-commerce', geo: 'ae',
    ar: 'بوابات الدفع الإلكتروني في الإمارات 2026: مقارنة عملية للمتاجر', en: 'Best Payment Gateways in the UAE 2026: A Practical Comparison for Online Stores',
    market: 'الإمارات', kwAr: 'بوابات الدفع في الإمارات', kwEn: 'payment gateways UAE',
    angle: 'مقارنة منصفة لبوابات معروفة في السوق الإماراتي (مثل Telr وStripe وNetwork International وخيارات الشراء الآن والدفع لاحقاً مثل Tabby)، بمعايير الاختيار لا بأرقام رسوم قد تتغير. CloudTopia ليست بوابة دفع: هي من يدمج البوابة المناسبة في المتجر ويختبرها.',
    cover: 'معايير الاختيار (متطلبات التسجيل، العملات، سرعة التسوية، Apple Pay، الاشتراكات، الاسترجاع، الدعم)، الفرق بين البوابة والمعالج، متطلبات الرخصة التجارية بصيغة عامة، اختبار الدفع قبل الإطلاق، أخطاء الدمج. جدول: البوابة × الأنسب لمن × المزايا × ما يجب التحقق منه.',
    avoid: 'payment-gateways-oman (سلطنة عمان) و mada-apple-pay-tabby-tamara (السعودية). هنا الإمارات فقط.',
    links: ['ecommerce-website-cost-uae', 'freezone-vs-mainland-website', 'uae-instagram-trade-licence'],
    faq: 'What is the best payment gateway in the UAE? / Does Stripe work in the UAE? / What documents do I need for a payment gateway in Dubai? / How long do settlements take?',
    note: 'لا تذكر نسب رسوم محددة. قل «راجع صفحة الأسعار الرسمية لكل بوابة». الرابط الداخلي ecommerce-website-cost-uae مقال من هذه الدفعة: استخدمه فقط إذا نُشر، أو استبدله بـ website-cost-uae.' },

  { id: 'b4-08', slug: 'store-platform-oman', type: 'guide', category: 'e-commerce', geo: 'om',
    ar: 'ووردبريس أم سلة أم برمجة مخصصة؟ اختيار منصة متجرك في سلطنة عمان', en: 'WooCommerce, Salla or Custom? Choosing an E-Commerce Platform in Oman',
    market: 'سلطنة عمان', kwAr: 'أفضل منصة متجر إلكتروني في عمان', kwEn: 'ecommerce platform Oman',
    angle: 'القرار في السوق العماني يختلف عن السعودي: بوابات الدفع المحلية، الدفع عند الاستلام، الطلب عبر واتساب، الريال العماني، والشحن داخل المحافظات. متى تكفي المنصة الجاهزة ومتى «تتخرج» منها. CloudTopia تبني متاجر مخصصة مربوطة ببوابات الدفع العمانية.',
    cover: 'ثلاثة خيارات (ووردبريس/ووكومرس، منصة جاهزة، برمجة مخصصة) مقيّمة بمعايير السوق العماني، دعم بوابات الدفع المحلية بصيغة «تحقق من دعم المنصة»، التكلفة على 3 سنوات، الملكية والنقل لاحقاً. جدول: الخيار × الدفع المحلي × التكلفة × الملكية × مناسب لمن.',
    avoid: 'shopify-woocommerce-salla-zid (السوق السعودي). هنا سلطنة عمان.',
    links: ['launch-online-store-oman-hub', 'payment-gateways-oman', 'oman-ecommerce-license'],
    faq: 'ما أفضل منصة متجر إلكتروني في سلطنة عمان؟ / هل سلة تعمل في عمان؟ / هل ووردبريس مناسب للمتاجر العمانية؟ / متى أحتاج متجراً مخصصاً؟',
    note: 'لا تجزم بتوفر منصة سلة أو غيرها في سلطنة عمان. انصح بالتحقق من الموقع الرسمي للمنصة.' },

  { id: 'b4-09', slug: 'arabic-website-not-on-google', type: 'guide', category: 'digital-presence', geo: 'om',
    ar: 'لماذا لا يظهر موقعك العربي في جوجل؟ 10 أسباب وحلولها', en: "Why Your Arabic Website Isn't Showing on Google: 10 Causes and Fixes",
    market: 'سلطنة عمان والخليج', kwAr: 'لماذا لا يظهر موقعي في جوجل', kwEn: 'website not showing on Google',
    angle: 'دليل تشخيص لصاحب العمل غير التقني: من الموقع غير المفهرس أصلاً إلى المحتوى الضعيف. كل سبب بطريقة فحص بسيطة ثم الحل. CloudTopia تبني المواقع مع أساسيات الفهرسة من اليوم الأول.',
    cover: 'الموقع جديد، noindex، robots.txt، لا sitemap، Google Search Console غير مربوط، محتوى مكرر أو قليل، صفحات عربية بعناوين إنجليزية، البطء على الجوال، لا روابط خارجية، استهداف كلمة «عمان» التي تختلط مع الأردن. جدول: السبب × كيف تفحصه × الحل.',
    avoid: 'technical-seo-bilingual-arabic-websites (أخطاء تقنية للمواقع ثنائية اللغة مثل hreflang). هنا تشخيص مبتدئ لموقع لا يظهر أصلاً.',
    links: ['technical-seo-bilingual-arabic-websites', 'google-business-profile-oman', 'website-cost-oman'],
    faq: 'لماذا لا يظهر موقعي في بحث جوجل؟ / كم يستغرق ظهور الموقع الجديد في جوجل؟ / كيف أضيف موقعي إلى جوجل؟ / هل الإعلانات تساعد على الظهور المجاني؟',
    note: 'الرابط google-business-profile-oman من هذه الدفعة: استخدمه فقط إذا نُشر، وإلا استبدله بـ instagram-vs-website.' },

  { id: 'b4-10', slug: 'real-estate-crm-gulf', type: 'listicle', category: 'rankings', geo: 'gulf',
    ar: 'أفضل نظام CRM لشركات العقار في الخليج 2026', en: 'Best CRM for Real Estate Companies in the Gulf 2026',
    market: 'الخليج (سلطنة عمان والسعودية والإمارات)', kwAr: 'أفضل CRM للعقارات', kwEn: 'best real estate CRM Gulf',
    angle: 'CRM مخصص من CloudTopia رقم 1 لشركات العقار التي تستقبل الاستفسارات عبر واتساب والبوابات العقارية: توزيع العملاء على الوسطاء، ربط الوحدات بالعملاء، متابعة المعاينات، وعربي كامل بلا اشتراك لكل مستخدم. مع عرض الأنظمة العالمية والعقارية الجاهزة بإنصاف.',
    cover: 'احتياجات العقار الخاصة (مصادر الاستفسارات، الوحدات والمشاريع، المعاينات، العقود والإيجارات، العمولات)، مقارنة 5–7 خيارات، متى يكفي النظام الجاهز. جدول المقارنة الإلزامي.',
    avoid: 'best-crm-oman (CRM عام لسلطنة عمان). هنا قطاع العقار في الخليج.',
    links: ['best-crm-oman', 'whatsapp-chatbot-crm-integration', 'crm-implementation-plan-oman-smes'],
    faq: 'ما أفضل نظام CRM لمكاتب العقار؟ / هل يرتبط CRM بالبوابات العقارية؟ / كم تكلفة CRM عقاري؟ / هل أحتاج CRM مخصصاً أم جاهزاً؟',
    note: REWRITE },

  { id: 'b4-11', slug: 'real-estate-website-saudi', type: 'guide', category: 'web-development', geo: 'sa',
    ar: 'تصميم موقع عقاري في السعودية: البحث بالخريطة وعرض الوحدات والربط مع إيجار', en: 'Real Estate Website Design in Saudi Arabia: Map Search, Listings and Ejar Integration',
    market: 'السعودية', kwAr: 'تصميم موقع عقاري', kwEn: 'real estate website design Saudi Arabia',
    angle: 'ما يحتاجه موقع عقاري سعودي فعلاً: بحث بالخريطة والفلاتر، صفحات وحدات قابلة للفهرسة، نماذج استفسار تذهب إلى CRM، واتساب، والامتثال لمتطلبات الإعلان العقاري. CloudTopia تبني الموقع مربوطاً بنظام إدارة العملاء.',
    cover: 'الصفحات الأساسية، البحث بالخريطة، صفحة الوحدة (صور، مخطط، موقع، سعر أو «على السوم»)، SEO لصفحات الأحياء، ربط الاستفسارات بـ CRM، الإشارة إلى منصة إيجار ومتطلبات الإعلان العقاري بصيغة عامة مع إحالة للجهات الرسمية. جدول: الميزة × لماذا تهم × أولوية التنفيذ.',
    avoid: 'لا يوجد مقال منشور عن مواقع العقار.',
    links: ['website-cost-saudi-arabia', 'saudi-pdpl-for-websites', 'real-estate-crm-gulf'],
    faq: 'كم تكلفة تصميم موقع عقاري في السعودية؟ / هل يمكن ربط الموقع بمنصة إيجار؟ / ما الصفحات التي يحتاجها موقع شركة عقارية؟ / كيف يظهر موقعي العقاري في جوجل؟',
    note: 'لا تجزم بإمكانية ربط تقني مباشر مع منصة إيجار. قل «حسب ما تتيحه المنصة رسمياً». الرابط real-estate-crm-gulf من هذه الدفعة: استخدمه فقط إذا نُشر، وإلا استبدله بـ best-crm-oman.' },

  { id: 'b4-12', slug: 'clinic-website-saudi', type: 'guide', category: 'web-development', geo: 'sa',
    ar: 'موقع عيادة مع نظام حجز مواعيد: دليل للعيادات في الرياض وجدة', en: 'Clinic Website with Online Booking: A Guide for Clinics in Riyadh and Jeddah',
    market: 'السعودية (الرياض وجدة)', kwAr: 'تصميم موقع عيادة', kwEn: 'clinic website design Riyadh',
    angle: 'الموقع هو واجهة العيادة ونظام الحجز هو محركها. ما يجب أن يحتويه موقع العيادة، وكيف يُربط الحجز والتذكير عبر واتساب، وحماية بيانات المرضى. CloudTopia تقدم ClinicTopia للحجز مع موقع العيادة.',
    cover: 'صفحات الأطباء والخدمات، الحجز حسب الطبيب والفرع، التذكير وتقليل الغياب بصيغة عامة، بيانات المرضى وPDPL بصيغة عامة، ضوابط الإعلان الصحي بإحالة للجهة الرسمية، SEO للخدمات والأحياء. جدول: الصفحة أو الميزة × الهدف × ملاحظة الامتثال.',
    avoid: 'best-clinic-booking-gulf (قائمة أنظمة الحجز). هنا الموقع كاملاً مع الحجز.',
    links: ['best-clinic-booking-gulf', 'saudi-pdpl-for-websites', 'website-cost-saudi-arabia'],
    faq: 'كم تكلفة موقع عيادة في السعودية؟ / هل يمكن الحجز من الموقع مباشرة؟ / كيف أحمي بيانات المرضى في الموقع؟ / هل أحتاج تطبيقاً للعيادة أم يكفي الموقع؟' },

  { id: 'b4-13', slug: 'website-build-timeline-uae', type: 'guide', category: 'guides', geo: 'ae',
    ar: 'كم يستغرق تصميم موقع إلكتروني؟ جدول زمني واقعي للشركات في الإمارات', en: 'How Long Does a Website Take to Build? A Realistic UAE Timeline',
    market: 'الإمارات', kwAr: 'كم يستغرق تصميم موقع', kwEn: 'how long does it take to build a website',
    angle: 'الجواب أولاً: نطاقات زمنية تقديرية حسب نوع الموقع، ثم ما يؤخر المشاريع فعلاً (المحتوى، الموافقات، الترجمة، التكاملات). CloudTopia تسلّم بمراحل موثقة ومعاينة مبكرة.',
    cover: 'مراحل المشروع (اكتشاف، تصميم، تطوير، محتوى، اختبار، إطلاق)، الفرق بين موقع تعريفي ومتجر ومنصة، ما يطلبه المشروع من العميل أسبوعياً، أثر ثنائية اللغة على المدة، كيف تقرأ جدولاً زمنياً في عرض السعر. جدول: نوع الموقع × المدة التقديرية × أكبر مسبب للتأخير.',
    avoid: 'لا يوجد مقال منشور عن المدة الزمنية.',
    links: ['website-cost-uae', 'choose-web-company-uae', 'how-to-write-product-requirements-document'],
    faq: 'How long does it take to build a website in Dubai? / Why do website projects get delayed? / How long does an ecommerce website take? / Can a website be built in one week?' },

  { id: 'b4-14', slug: 'chatgpt-company-data-safety', type: 'guide', category: 'ai-solutions', geo: 'gulf',
    ar: 'كيف تربط ChatGPT ببيانات شركتك بأمان؟ دليل للشركات الخليجية', en: 'How to Connect ChatGPT to Your Company Data Safely: A Gulf Business Guide',
    market: 'الخليج (مع مراعاة أنظمة حماية البيانات في السعودية وسلطنة عمان)', kwAr: 'ربط ChatGPT ببيانات الشركة', kwEn: 'connect ChatGPT to company data',
    angle: 'الخطر ليس في الذكاء الاصطناعي بل في طريقة الربط. الفرق بين لصق البيانات في محادثة عامة، واستخدام حسابات المؤسسات، وبناء مساعد داخلي يسترجع المعلومات حسب الصلاحيات. CloudTopia تبني المساعدات الداخلية مع ضبط الصلاحيات وسجل الاستخدام.',
    cover: 'أنواع البيانات الحساسة، مستويات الربط الثلاثة، مفهوم RAG ببساطة، الصلاحيات حسب الدور، إخفاء البيانات الشخصية، سياسة استخدام للموظفين، أنظمة حماية البيانات بصيغة عامة مع إحالة للجهات الرسمية. جدول: طريقة الربط × المخاطر × الضوابط المطلوبة.',
    avoid: 'ai-agents-for-gulf-businesses (استخدامات الوكلاء). هنا الأمان وحوكمة البيانات.',
    links: ['saudi-pdpl-for-websites', 'oman-personal-data-protection-websites-apps', 'ai-agents-for-gulf-businesses'],
    faq: 'هل استخدام ChatGPT آمن لبيانات الشركة؟ / كيف أبني مساعداً داخلياً على مستندات شركتي؟ / هل تُستخدم بياناتي في تدريب النموذج؟ / ما سياسة استخدام الذكاء الاصطناعي للموظفين؟',
    note: REWRITE + ' لا تجزم بسياسات OpenAI الحالية بالتفصيل. انصح بمراجعة شروط الخدمة الرسمية.' },

  { id: 'b4-15', slug: 'ai-roadmap-by-company-size', type: 'guide', category: 'ai-solutions', geo: 'gulf',
    ar: 'خارطة طريق الذكاء الاصطناعي لشركتك حسب حجمها: من أين تبدأ في 2026؟', en: 'An AI Roadmap Sized to Your Company: Where to Start in 2026',
    market: 'الخليج', kwAr: 'خطة الذكاء الاصطناعي للشركات', kwEn: 'AI roadmap for business',
    angle: 'ثلاثة مسارات: شركة صغيرة (أدوات جاهزة + مشروع واحد)، متوسطة (مساعد داخلي وأتمتة عملية أساسية)، كبيرة (حوكمة ومنصة ومراحل). كل مسار بخطوات 90 يوماً. CloudTopia تبدأ بجلسة اكتشاف وتختار مشروعاً قابلاً للقياس.',
    cover: 'تقييم الجاهزية (البيانات، العمليات، الفريق)، اختيار أول مشروع بمعيار الأثر والسهولة، مؤشرات النجاح، الميزانية بصيغة نطاقات تقديرية، أخطاء البدء بمشروع ضخم، الربط برؤية 2030 و2040 بصيغة عامة. جدول: حجم الشركة × أول مشروع × المدة × مؤشر النجاح.',
    avoid: 'ai-automation-for-businesses و ai-agents-for-gulf-businesses. هنا التخطيط المرحلي حسب الحجم.',
    links: ['ai-automation-for-businesses', 'ai-agents-for-gulf-businesses', 'best-ai-companies-oman'],
    faq: 'كيف أبدأ باستخدام الذكاء الاصطناعي في شركتي؟ / كم تكلفة مشروع ذكاء اصطناعي لشركة صغيرة؟ / ما أول عملية يجب أتمتتها؟ / هل أحتاج فريق بيانات؟',
    note: REWRITE },

  { id: 'b4-16', slug: 'ai-consulting-smes', type: 'guide', category: 'ai-solutions', geo: 'gulf',
    ar: 'استشارات الذكاء الاصطناعي للشركات الصغيرة والمتوسطة: ماذا يفعل المستشار وكم يكلف؟', en: 'AI Consulting for SMEs: What an AI Consultant Actually Does and What It Costs',
    market: 'الخليج', kwAr: 'استشارات الذكاء الاصطناعي', kwEn: 'AI consulting for SMEs',
    angle: 'ما يسلّمه المستشار فعلاً (تقييم، حالات استخدام مرتبة، نموذج أولي، خطة تنفيذ) وما يجب ألا تدفع مقابله (عروض تقديمية عامة). الفرق بين المستشار المستقل والوكالة المنفذة. CloudTopia تجمع الاستشارة والتنفيذ حتى لا تتوقف التوصيات على الورق.',
    cover: 'مخرجات الاستشارة الجيدة، نماذج التسعير بصيغة عامة (ساعات، مشروع، اشتراك)، أسئلة قبل التعاقد، علامات المستشار الضعيف، متى لا تحتاج مستشاراً. جدول: نوع الخدمة × المخرجات × نموذج التسعير × مناسب لمن.',
    avoid: 'لا يوجد مقال منشور عن استشارات الذكاء الاصطناعي.',
    links: ['ai-roadmap-by-company-size', 'best-ai-companies-oman', 'ai-automation-for-businesses'],
    faq: 'ماذا يفعل مستشار الذكاء الاصطناعي؟ / كم تكلفة استشارة الذكاء الاصطناعي؟ / هل أحتاج مستشاراً أم شركة تنفيذ؟ / ما مخرجات الاستشارة؟',
    note: REWRITE + ' هذا المقال يدمج مسودتين سابقتين (استشارات الذكاء الاصطناعي، ماذا يفعل المستشار). الرابط ai-roadmap-by-company-size من هذه الدفعة: استخدمه فقط إذا نُشر، وإلا استبدله بـ ai-agents-for-gulf-businesses.' },

  { id: 'b4-17', slug: 'inventory-system-multi-branch', type: 'guide', category: 'business-systems', geo: 'gulf',
    ar: 'نظام إدارة المخزون للمتاجر متعددة الفروع في الخليج: ماذا تحتاج فعلاً؟', en: 'Inventory Management for Multi-Branch Retailers in the Gulf: What You Actually Need',
    market: 'الخليج', kwAr: 'نظام مخزون متعدد الفروع', kwEn: 'multi-branch inventory system',
    angle: 'المشكلة الحقيقية ليست العدّ بل التزامن: مخزون الفرع والمتجر الإلكتروني والمستودع. ما يجب أن يفعله النظام، ومتى يكفي POS بمخزون بسيط، ومتى تحتاج نظاماً مترابطاً. CloudTopia تبني أنظمة مخزون مربوطة بالكاشير والمتجر والمحاسبة.',
    cover: 'التحويل بين الفروع، الحد الأدنى وإعادة الطلب، الجرد الدوري، الباركود، الصلاحية والدفعات، ربط المتجر الإلكتروني، التقارير لكل فرع، الفوترة الإلكترونية بصيغة عامة. جدول: الميزة × المشكلة التي تحلها × أولوية.',
    avoid: 'best-pos-gulf (قائمة أنظمة POS) و best-erp-oman. هنا المخزون متعدد الفروع تحديداً.',
    links: ['best-pos-gulf', 'website-erp-crm-accounting-integration-map', 'admin-dashboards-replace-spreadsheets'],
    faq: 'ما أفضل نظام مخزون لعدة فروع؟ / كيف أربط مخزون المتجر الإلكتروني بالفرع؟ / هل يكفي نظام الكاشير لإدارة المخزون؟ / كيف أمنع اختلاف الجرد بين الفروع؟',
    note: REWRITE },

  { id: 'b4-18', slug: 'odoo-customization-cost', type: 'guide', category: 'crm-erp', geo: 'gulf',
    ar: 'تخصيص نظام أودو (Odoo) في الخليج: متى يستحق وكم يكلف؟', en: 'Odoo Customization in the Gulf: When It Pays Off and What It Costs',
    market: 'الخليج', kwAr: 'تخصيص أودو', kwEn: 'Odoo customization cost',
    angle: 'تقييم منصف: أودو خيار قوي لعمليات قياسية، والتخصيص العميق يرفع تكلفة التحديث والصيانة. متى تخصص أودو، ومتى تختار نظاماً مخصصاً مثل Hasm ERP من CloudTopia. نقطة الإنصاف هنا مهمة: اعترف بقوة أودو.',
    cover: 'الإصدارات بصيغة عامة (Community وEnterprise)، الإعداد مقابل التخصيص، الوحدات المخصصة، أثر التحديثات على التخصيص، التعريب والفوترة الإلكترونية، الاستضافة، تكلفة الشريك. جدول: نوع التعديل × الجهد × أثره على التحديث × البديل.',
    avoid: 'erp-systems-for-saudi-and-gulf-businesses (مقارنة SAP/Oracle/Odoo). هنا تخصيص أودو تحديداً.',
    links: ['erp-systems-for-saudi-and-gulf-businesses', 'hidden-erp-implementation-costs', 'best-erp-oman'],
    faq: 'كم تكلفة تخصيص أودو؟ / هل أودو مناسب للشركات في الخليج؟ / ما الفرق بين Odoo Community و Enterprise؟ / هل التخصيص يمنع تحديث أودو؟',
    note: REWRITE + ' لا تذكر أسعار اشتراك أودو. أحِل للموقع الرسمي.' },

  { id: 'b4-19', slug: 'hr-system-gulf', type: 'guide', category: 'business-systems', geo: 'gulf',
    ar: 'نظام الموارد البشرية للشركات في الخليج: الرواتب والإجازات والامتثال', en: 'HR Systems for Gulf Businesses: Payroll, Leave and Compliance',
    market: 'الخليج (سلطنة عمان والسعودية والإمارات)', kwAr: 'نظام الموارد البشرية', kwEn: 'HR system Gulf',
    angle: 'نظام الموارد البشرية الخليجي يختلف: تعدد الجنسيات، الإقامات والتأشيرات، أنظمة حماية الأجور، نسب التوطين، والتأمينات الاجتماعية. ما يجب أن يدعمه النظام، والفرق بين الجاهز والمخصص. CloudTopia تبني وحدات موارد بشرية مربوطة بالمحاسبة.',
    cover: 'الوحدات الأساسية (ملفات الموظفين، الحضور، الإجازات، الرواتب، المستندات وتواريخ انتهائها)، متطلبات الامتثال بصيغة عامة مع ذكر أسماء الأنظمة الرسمية المعروفة دون تفاصيل مخترعة، الخدمة الذاتية للموظف، التكامل مع المحاسبة. جدول: الوحدة × لماذا تهم خليجياً × ملاحظة الامتثال.',
    avoid: 'لا يوجد مقال منشور عن أنظمة الموارد البشرية.',
    links: ['crm-vs-erp', 'website-erp-crm-accounting-integration-map', 'admin-dashboards-replace-spreadsheets'],
    faq: 'ما أفضل نظام موارد بشرية للشركات الصغيرة؟ / هل يدعم النظام حماية الأجور؟ / كيف أتابع انتهاء الإقامات والعقود؟ / جاهز أم مخصص؟',
    note: REWRITE + ' الرابط crm-vs-erp من هذه الدفعة: استخدمه فقط إذا نُشر، وإلا استبدله بـ erp-implementation-cost-oman.' },

  { id: 'b4-20', slug: 'cut-cloud-costs', type: 'guide', category: 'cloud-technology', geo: 'gulf',
    ar: 'كيف تخفض فاتورة السحابة لشركتك دون إبطاء تطبيقك؟', en: 'How to Cut Your Cloud Bill Without Slowing Down Your App',
    market: 'الخليج', kwAr: 'تقليل تكاليف السحابة', kwEn: 'reduce cloud costs',
    angle: 'أغلب الفواتير المرتفعة سببها موارد منسية وحجوزات خاطئة ونقل بيانات غير محسوب. قائمة إجراءات مرتبة من الأسهل إلى الأعمق. CloudTopia تراجع البنية وتقترح التعديل قبل تنفيذه.',
    cover: 'اكتشاف الموارد غير المستخدمة، تصغير الخوادم حسب الاستخدام الفعلي، التوسع التلقائي، التخزين المؤقت وشبكات CDN، تكلفة نقل البيانات، النسخ الاحتياطية القديمة، بيئات الاختبار التي تعمل ليلاً، التنبيهات والميزانيات. جدول: الإجراء × الجهد × الأثر المتوقع (منخفض/متوسط/مرتفع) × المخاطر.',
    avoid: 'aws-vs-azure-vs-cloudflare-for-gulf-businesses و cloud-migration-for-gulf-businesses. هنا تحسين التكلفة بعد الانتقال.',
    links: ['aws-vs-azure-vs-cloudflare-for-gulf-businesses', 'cloud-migration-for-gulf-businesses', 'gulf-ecommerce-hosting-peak-seasons'],
    faq: 'لماذا فاتورة السحابة مرتفعة؟ / كيف أخفض تكلفة AWS؟ / هل التوسع التلقائي يوفر المال؟ / كم يمكن توفيره من فاتورة السحابة؟',
    note: REWRITE + ' لا تذكر نسب توفير محددة.' },

  { id: 'b4-21', slug: 'website-speed-gulf-stores', type: 'guide', category: 'web-development', geo: 'gulf',
    ar: 'لماذا تخسر المتاجر الخليجية زوارها بسبب بطء الموقع؟ مؤشرات Core Web Vitals بلغة بسيطة', en: 'Why Slow Websites Lose Gulf Customers: Core Web Vitals in Plain Language',
    market: 'الخليج', kwAr: 'سرعة الموقع', kwEn: 'website speed Core Web Vitals',
    angle: 'الزائر الخليجي يتصفح من الجوال غالباً. شرح المؤشرات الثلاثة (LCP وINP وCLS) بلغة صاحب العمل، وأسباب البطء الشائعة في المتاجر العربية، وخطة إصلاح. CloudTopia تبني بأداء مقاس من البداية.',
    cover: 'كيف تقيس بأدوات مجانية (PageSpeed Insights، Search Console)، الصور الثقيلة، الخطوط العربية، التطبيقات والإضافات الزائدة، الاستضافة البعيدة، سكربتات التتبع، أثر السرعة على الإعلانات والتحويل بصيغة عامة. جدول: المؤشر × ماذا يقيس × الحد الجيد حسب جوجل × السبب الشائع × الإصلاح.',
    avoid: 'gulf-ecommerce-hosting-peak-seasons (الاستضافة وقت الضغط). هنا الأداء في الواجهة.',
    links: ['gulf-ecommerce-hosting-peak-seasons', 'technical-seo-bilingual-arabic-websites', 'wordpress-vs-next-js-arabic-business-websites'],
    faq: 'كيف أعرف سرعة موقعي؟ / ما هي Core Web Vitals؟ / هل سرعة الموقع تؤثر على ترتيب جوجل؟ / لماذا موقعي بطيء على الجوال؟',
    note: 'حدود المؤشرات الرسمية منشورة من جوجل: إن ذكرتها فاذكرها كما هي في وثائق web.dev، وإن لم تتأكد فلا تذكر أرقاماً.' },

  { id: 'b4-22', slug: 'local-seo-uae', type: 'guide', category: 'digital-presence', geo: 'ae',
    ar: 'كيف تتصدر نتائج جوجل المحلية في الإمارات؟ السيو المحلي للمواقع ثنائية اللغة', en: 'How to Rank on Google in the UAE: Local SEO for Bilingual Websites',
    market: 'الإمارات (النسخة الإنجليزية أساسية)', kwAr: 'السيو المحلي في الإمارات', kwEn: 'local SEO UAE',
    angle: 'استراتيجية كاملة للظهور في نتائج الخريطة والبحث المحلي: ملف جوجل التجاري، صفحات الخدمات حسب الإمارة، المحتوى بلغتين، الأدلة المحلية، والتقييمات. CloudTopia تبني صفحات محلية عميقة لا صفحات مدن مكررة.',
    cover: 'إشارات الترتيب المحلي بصيغة عامة (الصلة، المسافة، الشهرة)، صفحة لكل خدمة، دبي مقابل أبوظبي والشارقة، البحث المختلط عربي/إنجليزي، Schema LocalBusiness، الأدلة التجارية، خطر مزارع صفحات المدن الرقيقة. جدول: الإجراء × أثره × الوقت اللازم.',
    avoid: 'google-business-profile-oman (خطوات توثيق الملف في سلطنة عمان). هنا استراتيجية السيو المحلي في الإمارات.',
    links: ['technical-seo-bilingual-arabic-websites', 'best-web-design-dubai', 'how-to-build-a-bilingual-arabic-english-website'],
    faq: 'How do I rank my business on Google Maps in Dubai? / What is local SEO? / Should I have separate pages for Dubai and Abu Dhabi? / How long does local SEO take?' },

  { id: 'b4-23', slug: 'website-losing-customers-uae', type: 'guide', category: 'website-strategy', geo: 'ae',
    ar: '8 علامات أن موقع شركتك في الإمارات يخسّرك العملاء', en: '8 Signs Your UAE Business Website Is Costing You Customers',
    market: 'الإمارات (النسخة الإنجليزية أساسية)', kwAr: 'علامات الموقع الضعيف', kwEn: 'signs your website is losing customers',
    angle: 'قائمة تشخيص سريعة بصيغة مرقمة: كل علامة بطريقة فحص خلال دقائق وحل عملي. المقال يخاطب صاحب عمل لديه موقع قديم. CloudTopia تقدم مراجعة الموقع ثم خطة تحسين أو إعادة بناء.',
    cover: 'البطء على الجوال، لا زر واتساب أو اتصال واضح، نسخة عربية مترجمة آلياً، أسعار أو خدمات غير واضحة، نماذج لا تصل رسائلها، لا شهادات SSL أو صفحات قانونية، صور مخزون عامة، عدم الظهور في جوجل. جدول: العلامة × كيف تفحصها × الحل × الأولوية.',
    avoid: 'why-gulf-businesses-need-a-website-not-just-an-instagram-page (هل تحتاج موقعاً). هنا لديك موقع لكنه يخسرك.',
    links: ['website-cost-uae', 'choose-web-company-uae', 'arabic-website-accessibility-wcag'],
    faq: 'How do I know if my website is bad? / Why is my website not getting leads? / Should I redesign or rebuild my website? / How often should a business website be updated?' },

  { id: 'b4-24', slug: 'agency-vs-freelancer-dubai', type: 'guide', category: 'guides', geo: 'ae',
    ar: 'وكالة أم مستقل أم باقة جاهزة؟ اختيار شريك تصميم الموقع في دبي', en: 'Agency, Freelancer, or Package? Choosing a Web Partner in Dubai',
    market: 'الإمارات (دبي)', kwAr: 'وكالة أم مستقل لتصميم الموقع', kwEn: 'web design agency vs freelancer Dubai',
    angle: 'مقارنة منصفة لثلاثة نماذج: المستقل (مرن وأرخص وخطر الاستمرارية)، الباقة الجاهزة (سريعة ومحدودة)، الوكالة (فريق وضمان وتكلفة أعلى). CloudTopia تجمع مرونة الباقة وضمان الوكالة، مع نقطة إنصاف: مشروع صغير جداً قد يكفيه مستقل موثوق.',
    cover: 'معايير المقارنة (التكلفة، الجودة، الاستمرارية، الملكية، الدعم بعد الإطلاق، العقد والفاتورة)، أسئلة لكل نموذج، أخطاء التعاقد مع المستقل، ما تخفيه الباقات الرخيصة. جدول: النموذج × التكلفة النسبية × المخاطر × مناسب لمن.',
    avoid: 'choose-web-company-uae (أسئلة اختيار الشركة). هنا المفاضلة بين نماذج التعاقد.',
    links: ['choose-web-company-uae', 'source-code-ownership-contract', 'website-cost-uae'],
    faq: 'Should I hire a freelancer or an agency for my website? / Are cheap website packages in Dubai worth it? / Who owns my website if a freelancer builds it? / How much does a web design agency cost in Dubai?' },

  { id: 'b4-25', slug: 'contracting-company-website-saudi', type: 'guide', category: 'web-development', geo: 'sa',
    ar: 'تصميم موقع شركة مقاولات في السعودية: الصفحات التي تبني الثقة وتجلب الفرص', en: 'Contracting Company Website Design in Saudi Arabia: Pages That Win Trust and Tenders',
    market: 'السعودية', kwAr: 'تصميم موقع شركة مقاولات', kwEn: 'construction company website Saudi Arabia',
    angle: 'عميل المقاولات (مطور، جهة، شركة) يقيّم الموثوقية قبل التواصل: السجل والتصنيف، المشاريع المنفذة، الشهادات، فريق العمل. الموقع ملف تأهيل رقمي. CloudTopia تبني مواقع مقاولات ثنائية اللغة بصفحات مشاريع قابلة للفهرسة.',
    cover: 'صفحة ملف الشركة القابل للتنزيل، صفحات المشاريع بصور حقيقية، التصنيف والشهادات بصيغة عامة مع إحالة للجهات الرسمية، صفحات الخدمات، نموذج طلب عرض سعر، التوظيف، السيو لخدمات المقاولات حسب المدينة. جدول: الصفحة × ما يبحث عنه العميل × عنصر الثقة.',
    avoid: 'لا يوجد مقال منشور عن قطاع المقاولات.',
    links: ['website-cost-saudi-arabia', 'how-to-build-a-bilingual-arabic-english-website', 'sa-domain-registration'],
    faq: 'ماذا يجب أن يحتوي موقع شركة المقاولات؟ / كم تكلفة موقع شركة مقاولات في السعودية؟ / هل يساعد الموقع في الحصول على مناقصات؟ / كيف أعرض المشاريع المنفذة؟',
    note: 'لا تعد بأن الموقع يضمن الفوز بمناقصات. قل «يدعم التأهيل ويبني الثقة».' },

  { id: 'b4-26', slug: 'law-firm-website-saudi', type: 'guide', category: 'web-development', geo: 'sa',
    ar: 'تصميم موقع مكتب محاماة في السعودية: الثقة والامتثال قبل الشكل', en: 'Law Firm Website Design in Saudi Arabia: Trust and Compliance Before Aesthetics',
    market: 'السعودية', kwAr: 'تصميم موقع مكتب محاماة', kwEn: 'law firm website Saudi Arabia',
    angle: 'موقع المحاماة يبيع الثقة ويخضع لضوابط المهنة في الإعلان. ما يجب إظهاره (الترخيص، مجالات الممارسة، المحامون) وما يجب تجنبه (الوعود بالنتائج). CloudTopia تبني مواقع مهنية مع حماية بيانات الاستشارات.',
    cover: 'صفحات مجالات الممارسة، صفحات المحامين، المقالات القانونية كأداة سيو، نموذج طلب استشارة آمن، سرية البيانات وPDPL بصيغة عامة، ضوابط الإعلان للمحامين بإحالة للجهة المنظمة الرسمية دون اختراع مواد. جدول: العنصر × هدفه × ملاحظة الامتثال.',
    avoid: 'لا يوجد مقال منشور عن مواقع المحاماة.',
    links: ['saudi-pdpl-for-websites', 'website-cost-saudi-arabia', 'arabic-website-accessibility-wcag'],
    faq: 'ماذا يجب أن يحتوي موقع مكتب المحاماة؟ / هل يجوز للمحامي الإعلان عن خدماته؟ / كيف أحمي بيانات طالبي الاستشارة؟ / هل أكتب مقالات قانونية في الموقع؟',
    note: 'لا تقدم رأياً قانونياً ولا تذكر نصوص أنظمة. أحِل إلى الهيئة السعودية للمحامين باسمها العام للتحقق من الضوابط.' },

  { id: 'b4-27', slug: 'salon-booking-system-oman', type: 'guide', category: 'business-systems', geo: 'om',
    ar: 'نظام حجز مواعيد للصالونات والمراكز في سلطنة عمان: جاهز أم مخصص؟', en: 'Booking Systems for Salons and Spas in Oman: Off-the-Shelf or Custom?',
    market: 'سلطنة عمان', kwAr: 'نظام حجز مواعيد صالون', kwEn: 'salon booking system Oman',
    angle: 'الصالونات ومراكز التجميل تعيش على المواعيد والواتساب: تضارب الحجوزات، الغياب، توزيع الموظفات، والباقات. متى يكفي تطبيق جاهز ومتى تحتاج نظاماً عربياً مخصصاً. CloudTopia تبني أنظمة حجز مع تذكير واتساب.',
    cover: 'الحجز حسب الخدمة والموظفة، الفروع، العربون أو الدفع المسبق بصيغة عامة، التذكير، الباقات والعضويات، الخصوصية (صور العميلات، أقسام نسائية)، التقارير. جدول: الخيار (جاهز عالمي، جاهز محلي، مخصص) × العربية × الواتساب × التكلفة × مناسب لمن.',
    avoid: 'best-clinic-booking-gulf (العيادات). هنا الصالونات والمراكز في سلطنة عمان.',
    links: ['best-clinic-booking-gulf', 'whatsapp-business-api', 'payment-gateways-oman'],
    faq: 'ما أفضل برنامج حجز مواعيد للصالونات؟ / كيف أقلل غياب الزبائن عن المواعيد؟ / هل يمكن الحجز عبر الواتساب تلقائياً؟ / كم تكلفة نظام حجز لصالون في عمان؟' },

  { id: 'b4-28', slug: 'restaurant-website-oman', type: 'guide', category: 'website-strategy', geo: 'om',
    ar: 'موقع مطعم في سلطنة عمان: الطلب المباشر بدل عمولات تطبيقات التوصيل', en: 'Restaurant Websites in Oman: Direct Ordering Instead of Delivery App Commissions',
    market: 'سلطنة عمان', kwAr: 'موقع مطعم للطلب المباشر', kwEn: 'restaurant website direct ordering Oman',
    angle: 'تطبيقات التوصيل تجلب عملاء جدداً لكنها تأخذ عمولة من كل طلب ولا تعطيك بيانات العميل. الموقع مع الطلب المباشر والمنيو الرقمي يبني قاعدة عملائك. نقطة إنصاف: لا تترك التطبيقات كلياً. CloudTopia تقدم JOORY للمنيو والطلب.',
    cover: 'المقارنة الاقتصادية بمثال افتراضي واضح الافتراضات (لا نسب عمولة محددة)، عناصر موقع المطعم، الطلب عبر الموقع أو واتساب، الاستلام والتوصيل الذاتي، الدفع، ملف جوجل التجاري للمطعم، تحويل عملاء التطبيقات إلى الطلب المباشر. جدول: القناة × التكلفة × ملكية بيانات العميل × مناسبة لمن.',
    avoid: 'best-qr-menu-restaurants (قائمة أنظمة المنيو). هنا استراتيجية الطلب المباشر عبر الموقع.',
    links: ['best-qr-menu-restaurants', 'best-pos-gulf', 'how-gulf-businesses-are-using-whatsapp-as-a-sales-channel-in-2026'],
    faq: 'هل يحتاج المطعم موقعاً إلكترونياً؟ / كيف أستقبل طلبات التوصيل بدون تطبيقات؟ / كم تكلفة موقع مطعم في عمان؟ / هل أترك تطبيقات التوصيل؟',
    note: 'لا تذكر نسب عمولة تطبيقات التوصيل. استخدم مثالاً افتراضياً بنسبة يحددها القارئ.' },

  { id: 'b4-29', slug: 'website-design-sohar', type: 'guide', category: 'website-strategy', geo: 'sohar',
    ar: 'تصميم مواقع إلكترونية في صحار: ما تحتاجه الشركات الصناعية واللوجستية والتجارية', en: 'Website Design in Sohar: What Industrial, Logistics and Trading Companies Need',
    market: 'صحار، سلطنة عمان', kwAr: 'تصميم مواقع في صحار', kwEn: 'website design Sohar',
    angle: 'صحار مدينة ميناء ومنطقة صناعية: عملاؤها موردون ومقاولون وشركات لوجستية يحتاجون مواقع B2B ثنائية اللغة تُظهر القدرات والشهادات، لا مواقع سياحية. CloudTopia تخدم شركات صحار عن بعد بتواصل واتساب واجتماعات عند الحاجة.',
    cover: 'أنواع الأعمال في صحار بصيغة عامة (صناعة، لوجستيات، تجارة، خدمات)، صفحات B2B الأساسية، الإنجليزية للعملاء الدوليين، ملف الشركة، طلب عرض السعر، السيو المحلي «صحار» و«شمال الباطنة». جدول: نوع الشركة × الصفحات الأهم × اللغة الأساسية.',
    avoid: 'best-web-design-companies-oman و best-web-design-muscat. هنا صحار وطبيعة سوقها. ممنوع إعادة استخدام قالب مقال مسقط.',
    links: ['best-web-design-companies-oman', 'website-cost-oman', 'google-business-profile-oman'],
    faq: 'ما أفضل شركة تصميم مواقع في صحار؟ / كم تكلفة تصميم موقع في صحار؟ / هل أحتاج شركة من صحار نفسها؟ / هل يكون الموقع بالعربية أم الإنجليزية؟',
    note: 'لا تخترع أسماء شركات أو أرقام اقتصادية عن صحار. الرابط google-business-profile-oman من هذه الدفعة: استخدمه فقط إذا نُشر، وإلا استبدله بـ om-domain-registration.' },

  { id: 'b4-30', slug: 'website-design-salalah', type: 'guide', category: 'website-strategy', geo: 'salalah',
    ar: 'تصميم مواقع إلكترونية في صلالة: مواقع للسياحة والضيافة وموسم الخريف', en: 'Website Design in Salalah: Tourism, Hospitality and Khareef Season Websites',
    market: 'صلالة، سلطنة عمان', kwAr: 'تصميم مواقع في صلالة', kwEn: 'website design Salalah',
    angle: 'اقتصاد صلالة يتأثر بموسم الخريف: فنادق وشقق وتأجير سيارات ورحلات ومطاعم تستقبل زواراً من الخليج. الموقع يجب أن يستقبل الحجوزات والاستفسارات قبل الموسم وبعدة لغات ولهجات. CloudTopia تبني مواقع حجز سريعة على الجوال مع واتساب.',
    cover: 'أنواع الأعمال السياحية، الحجز والتوفر، الأسعار الموسمية، اللغات (العربية والإنجليزية)، زوار الخليج والبحث بالجوال، التقييمات وملف جوجل التجاري، التحضير قبل الموسم. جدول: نوع النشاط × الميزة الأهم × موعد الجاهزية قبل الموسم.',
    avoid: 'best-web-design-muscat. هنا صلالة وموسمها. ممنوع إعادة استخدام قالب مقال صحار أو مسقط.',
    links: ['best-web-design-companies-oman', 'website-cost-oman', 'payment-gateways-oman'],
    faq: 'ما أفضل شركة تصميم مواقع في صلالة؟ / متى أجهز موقع الحجز قبل موسم الخريف؟ / كم تكلفة موقع فندق أو شقق في صلالة؟ / هل أحتاج نظام حجز أم يكفي الواتساب؟',
    note: 'لا تخترع أرقام زوار أو تواريخ دقيقة للموسم. استخدم صيغة «موسم الخريف الصيفي» العامة.' },
]

const index = [
  '# الدفعة الرابعة — 30 مقالاً (× نسختين)',
  '',
  '10 مقالات إعادة كتابة لمواضيع المسودات الفريدة + 20 مقالاً جديداً من خطة المحتوى وتقرير التحليلات. كل المواضيع مفحوصة ضد المقالات المنشورة في `_published-index.md`.',
  '',
  'الترتيب = ترتيب الكتابة. كل ملف برومبت مستقل كامل.',
  '',
  '| # | الملف | العنوان | النوع | السوق |',
  '|---|---|---|---|---|',
]
for (const a of articles) {
  const out = template
    .replaceAll('{{ID}}', a.id)
    .replaceAll('{{SLUG}}', a.slug)
    .replaceAll('{{TYPE}}', a.type)
    .replaceAll('{{CATEGORY}}', a.category)
    .replaceAll('{{GEO_IMAGES}}', GEO[a.geo])
    .replaceAll('{{TYPE_RULES}}', a.type === 'listicle' ? LISTICLE_RULES : GUIDE_RULES)
    .replaceAll('{{ARTICLE_BLOCK}}', block(a))
  const file = `${a.id}-${a.slug}.md`
  writeFileSync(path.join(dir, file), out)
  const kind = a.note?.startsWith(REWRITE) ? 'إعادة كتابة' : a.type === 'listicle' ? 'قائمة' : 'دليل'
  index.push(`| ${a.id} | [${file}](${file}) | ${a.ar} | ${kind} | ${a.market.split(' (')[0]} |`)
}
writeFileSync(path.join(dir, 'README.md'), index.join('\n') + '\n')
console.log(`Generated ${articles.length} prompt files + README.md`)
