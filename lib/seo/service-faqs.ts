export type FAQ = { q: string; a: string }

type ServiceFAQs = {
    en: FAQ[]
    ar: FAQ[]
    tr: FAQ[]
}

export const areaServed = {
    '@type': 'Place',
    name: 'Gulf region (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman) and Türkiye; worldwide remote delivery',
}

export const serviceFAQs: Record<string, ServiceFAQs> = {
    'website-design': {
        en: [
            { q: 'How much does a business website cost in the Gulf?', a: 'Our websites start at $399 for a single-page landing site, $599 for a 5-page starter business site, $1,299 for a full multi-page pro site, and $3,999 for premium custom builds. All prices are public on our pricing page.' },
            { q: 'Do you design websites in Arabic with RTL support?', a: 'Yes. Every site ships bilingual Arabic + English by default with full RTL layout — mirrored icons, Arabic typography (Changa variable font), and culturally appropriate imagery. Turkish is also available.' },
            { q: 'How long does it take to build a business website?', a: 'Landing pages take 1–2 weeks. Business websites take 3–5 weeks. Discovery is always the first 3–5 days with a written scope and fixed quote before design starts.' },
            { q: 'Do you optimize websites for Google and search engines?', a: 'Yes. Every site includes technical SEO (schema markup, sitemaps, fast Core Web Vitals, Arabic + English meta tags), Google Search Console setup, and Google Analytics integration.' },
            { q: 'Will my website work on mobile?', a: 'Every website is mobile-first, tested on iOS and Android, and loads in under 2 seconds on 4G. Over 70% of Gulf traffic comes from mobile, so this is a baseline not an upsell.' },
            { q: 'Do I own the website and the code after launch?', a: 'Yes — 100%. You own the domain, hosting account, code, design files, and content. No licensing traps, no vendor lock-in. We hand over everything at launch.' },
        ],
        ar: [
            { q: 'كم تكلفة موقع الأعمال في الخليج؟', a: 'مواقعنا تبدأ من 399$ لصفحة هبوط واحدة، 599$ لموقع من 5 صفحات، 1,299$ لموقع متعدد الصفحات كامل، و3,999$ لبناء مخصص راقٍ. كل الأسعار معلنة في صفحة التسعير.' },
            { q: 'هل تصممون مواقع بالعربية مع دعم RTL؟', a: 'نعم. كل موقع يأتي ثنائي اللغة عربي + إنجليزي افتراضياً، بتخطيط RTL كامل — أيقونات معكوسة، طباعة عربية (خط Changa)، وصور مناسبة ثقافياً. التركية متاحة أيضاً.' },
            { q: 'كم يستغرق بناء موقع أعمال؟', a: 'صفحات الهبوط: ١–٢ أسبوع. مواقع الأعمال: ٣–٥ أسابيع. الاستكشاف دائماً ٣–٥ أيام أولى بنطاق مكتوب وسعر ثابت قبل أن يبدأ التصميم.' },
            { q: 'هل تحسّنون المواقع لجوجل ومحركات البحث؟', a: 'نعم. كل موقع يتضمن SEO تقني (مخطط Schema، خرائط مواقع، Core Web Vitals سريعة، وسوم عربية + إنجليزية)، وإعداد Google Search Console وGoogle Analytics.' },
            { q: 'هل سيعمل موقعي على الموبايل؟', a: 'كل موقع نبنيه mobile-first، مختبر على iOS وAndroid، يُحمَّل في أقل من ثانيتين على شبكة 4G. أكثر من 70% من زوار الخليج يأتون من الموبايل — هذا أساسي، ليس إضافة.' },
            { q: 'هل أملك الموقع والكود بعد الإطلاق؟', a: 'نعم — 100%. أنت تملك النطاق، حساب الاستضافة، الكود، ملفات التصميم، والمحتوى. بدون فخاخ تراخيص، بدون قيود مورّد. نسلّم كل شيء عند الإطلاق.' },
        ],
        tr: [
            { q: 'Körfez\'de bir iş web sitesi ne kadara mal olur?', a: 'Sitelerimiz tek sayfalık açılış sayfası için $399\'dan, 5 sayfalık site için $599\'dan, çok sayfalı profesyonel site için $1.299\'dan ve premium özel yapım için $3.999\'dan başlar. Tüm fiyatlar fiyatlandırma sayfamızda halka açıktır.' },
            { q: 'Arapça sitelerde RTL desteği var mı?', a: 'Evet. Her site varsayılan olarak iki dilli Arapça + İngilizce ve tam RTL düzenli gelir — aynalanmış ikonlar, Arapça tipografi (Changa değişken yazı tipi) ve kültürel olarak uygun görseller. Türkçe de mevcuttur.' },
            { q: 'Bir iş sitesi ne kadar sürer?', a: 'Açılış sayfaları 1–2 hafta. İş siteleri 3–5 hafta. Keşif her zaman ilk 3–5 gün yazılı bir kapsam ve sabit teklifle başlar, tasarım sonra gelir.' },
            { q: 'Siteleri Google ve arama motorları için optimize ediyor musunuz?', a: 'Evet. Her site teknik SEO (schema işaretleme, site haritaları, hızlı Core Web Vitals, Arapça + İngilizce meta etiketleri), Google Search Console kurulumu ve Google Analytics entegrasyonu içerir.' },
            { q: 'Sitem mobilde çalışacak mı?', a: 'Her site mobil öncelikli olarak tasarlanır, iOS ve Android\'de test edilir ve 4G\'de 2 saniyenin altında yüklenir. Körfez trafiğinin %70\'inden fazlası mobilden gelir — bu temel bir özelliktir, ekstra değil.' },
            { q: 'Lansmandan sonra siteye ve koda ben mi sahip olacağım?', a: 'Evet — %100. Alan adı, barındırma hesabı, kod, tasarım dosyaları ve içerik size aittir. Lisans tuzağı yok, tedarikçi kilidi yok. Lansmanda her şeyi teslim ederiz.' },
        ],
    },
    'ecommerce-solutions': {
        en: [
            { q: 'How much does an e-commerce store cost in the Gulf?', a: 'E-commerce stores start at $1,299 and go up to $3,999+ for custom multi-vendor or high-volume builds. All tiers include Mada, Apple Pay, and STC Pay out of the box.' },
            { q: 'Can you integrate Mada, Apple Pay, STC Pay, Tabby, and Tamara?', a: 'Yes. Every Gulf e-commerce build we ship includes Mada, Apple Pay, STC Pay, Tabby, and Tamara as standard. Benefit (Bahrain), NBK (Kuwait), and international rails like Stripe and PayPal are all supported.' },
            { q: 'Do you handle VAT, tax invoicing, and ZATCA e-invoicing in Saudi Arabia?', a: 'Yes. We configure 15% KSA VAT, 5% UAE VAT, ZATCA-compliant e-invoicing (Phase 1 and Phase 2), and bilingual tax invoices in Arabic and English at launch.' },
            { q: 'Which platforms do you build e-commerce stores on?', a: 'We build on Shopify, WooCommerce, and custom Next.js stacks depending on scope. For Gulf SMBs, Shopify is usually fastest; for custom logic or multi-vendor, we use WooCommerce or Next.js.' },
            { q: 'How long does it take to launch an online store?', a: 'Most stores launch in 4–8 weeks including product photography review, payment gateway setup, shipping zones, VAT configuration, and Arabic + English content.' },
            { q: 'Do you help with product photography and content?', a: 'Yes. We offer product photography in Riyadh, Jeddah, Dubai, and Istanbul, plus Arabic + English product copy, category descriptions, and SEO-optimized product pages.' },
        ],
        ar: [
            { q: 'كم تكلفة المتجر الإلكتروني في الخليج؟', a: 'المتاجر الإلكترونية تبدأ من 1,299$ وترتفع إلى 3,999$+ للبنايات المخصصة متعددة البائعين أو عالية الحجم. كل المستويات تتضمن مدى، آبل باي، وSTC Pay جاهزة.' },
            { q: 'هل تدمجون مدى، آبل باي، STC Pay، تابي، وتمارا؟', a: 'نعم. كل متجر خليجي نشحنه يتضمن مدى، آبل باي، STC Pay، تابي، وتمارا قياسياً. Benefit (البحرين)، NBK (الكويت)، والبوابات الدولية مثل Stripe وPayPal مدعومة جميعها.' },
            { q: 'هل تتولّون ضريبة القيمة المضافة والفوترة الإلكترونية ZATCA في السعودية؟', a: 'نعم. نُعدّ ضريبة 15% سعودية، 5% إماراتية، فوترة إلكترونية متوافقة مع ZATCA (المرحلة 1 والمرحلة 2)، وفواتير ضريبية ثنائية اللغة بالعربية والإنجليزية عند الإطلاق.' },
            { q: 'على أي منصات تبنون المتاجر الإلكترونية؟', a: 'نبني على Shopify وWooCommerce ومكدسات Next.js مخصصة حسب النطاق. للشركات الخليجية المتوسطة، Shopify عادةً الأسرع؛ للمنطق المخصص أو متعدد البائعين، نستخدم WooCommerce أو Next.js.' },
            { q: 'كم يستغرق إطلاق متجر إلكتروني؟', a: 'معظم المتاجر تُطلَق خلال ٤–٨ أسابيع تشمل مراجعة تصوير المنتجات، إعداد بوابات الدفع، مناطق الشحن، إعداد ضريبة القيمة المضافة، ومحتوى عربي + إنجليزي.' },
            { q: 'هل تساعدون في تصوير المنتجات والمحتوى؟', a: 'نعم. نقدّم تصوير المنتجات في الرياض، جدة، دبي، وإسطنبول، بالإضافة إلى نصوص عربية + إنجليزية للمنتجات، وصفات الفئات، وصفحات منتجات محسّنة للسيو.' },
        ],
        tr: [
            { q: 'Körfez\'de bir e-ticaret mağazası ne kadara mal olur?', a: 'E-ticaret mağazaları $1.299\'dan başlar ve özel çok satıcılı veya yüksek hacimli yapımlar için $3.999+\'ye kadar çıkar. Tüm kademeler Mada, Apple Pay ve STC Pay\'i hazır içerir.' },
            { q: 'Mada, Apple Pay, STC Pay, Tabby ve Tamara entegre edilebilir mi?', a: 'Evet. Teslim ettiğimiz her Körfez e-ticaret projesi Mada, Apple Pay, STC Pay, Tabby ve Tamara\'yı standart olarak içerir. Benefit (Bahreyn), NBK (Kuveyt) ve Stripe, PayPal gibi uluslararası raylar desteklenir.' },
            { q: 'KSA\'da KDV, vergi faturalandırma ve ZATCA e-faturalandırmayı yönetiyor musunuz?', a: 'Evet. %15 KSA KDV, %5 UAE KDV, ZATCA uyumlu e-faturalandırma (Faz 1 ve Faz 2) ve lansmanda Arapça + İngilizce iki dilli vergi faturalarını yapılandırıyoruz.' },
            { q: 'Hangi platformlarda e-ticaret mağazası kuruyorsunuz?', a: 'Kapsama göre Shopify, WooCommerce ve özel Next.js yığınları üzerinde kurarız. Körfez KOBİ\'leri için Shopify genellikle en hızlısıdır; özel mantık veya çok satıcılı için WooCommerce veya Next.js kullanırız.' },
            { q: 'Online mağaza açmak ne kadar sürer?', a: 'Çoğu mağaza ürün fotoğrafçılığı incelemesi, ödeme ağ geçidi kurulumu, kargo bölgeleri, KDV yapılandırması ve Arapça + İngilizce içerik dahil 4–8 haftada yayına alınır.' },
            { q: 'Ürün fotoğrafçılığı ve içerik konusunda yardım ediyor musunuz?', a: 'Evet. Riyad, Cidde, Dubai ve İstanbul\'da ürün fotoğrafçılığı sunuyoruz, ayrıca Arapça + İngilizce ürün metinleri, kategori açıklamaları ve SEO optimize edilmiş ürün sayfaları hazırlıyoruz.' },
        ],
    },
    'restaurant-qr-menu': {
        en: [
            { q: 'How does a QR menu work in a restaurant?', a: 'Customers scan a QR code on the table with their phone camera and see your full menu instantly. No app download needed. Menu updates go live in seconds — you edit once, all tables see the change.' },
            { q: 'How much does a QR menu system cost?', a: 'Our QR menu systems start at $599 for a single location and go up to $2,499 for multi-branch chains with ordering, table management, and POS integration.' },
            { q: 'Does the QR menu support Arabic, English, and Turkish?', a: 'Yes. Every QR menu is multilingual out of the box — Arabic (RTL), English, Turkish, and any language you need. Customers pick their language with one tap.' },
            { q: 'Can customers order and pay through the QR menu?', a: 'Yes. Our premium QR menu includes table ordering, tip splitting, and payment via Apple Pay, Mada, STC Pay, and credit card. Kitchen receives orders instantly.' },
            { q: 'Do I need to print new menus every time prices change?', a: 'No. You edit prices, items, and photos from a dashboard and the change is live immediately. Zero reprinting costs after launch.' },
            { q: 'Do you work with restaurants outside Saudi Arabia and UAE?', a: 'Yes. We\'ve deployed QR menus for cafés and restaurants across Riyadh, Dubai, Jeddah, Kuwait City, Doha, and Istanbul — and remotely for clients worldwide.' },
        ],
        ar: [
            { q: 'كيف تعمل قائمة QR في المطعم؟', a: 'العملاء يمسحون رمز QR على الطاولة بكاميرا الهاتف ويرون قائمتك الكاملة فوراً. بدون تحميل تطبيق. تحديثات القائمة تظهر خلال ثوانٍ — تعدّل مرة واحدة، كل الطاولات ترى التغيير.' },
            { q: 'كم تكلفة نظام قائمة QR؟', a: 'أنظمة قائمة QR لدينا تبدأ من 599$ لموقع واحد وترتفع إلى 2,499$ لسلاسل متعددة الفروع مع الطلب، إدارة الطاولات، وتكامل POS.' },
            { q: 'هل تدعم قائمة QR العربية والإنجليزية والتركية؟', a: 'نعم. كل قائمة QR متعددة اللغات جاهزة — العربية (RTL)، الإنجليزية، التركية، وأي لغة تحتاجها. العملاء يختارون لغتهم بنقرة واحدة.' },
            { q: 'هل يستطيع العملاء الطلب والدفع عبر قائمة QR؟', a: 'نعم. قائمة QR المميزة تتضمن الطلب من الطاولة، تقسيم الإكراميات، والدفع عبر آبل باي، مدى، STC Pay، وبطاقة الائتمان. المطبخ يستلم الطلبات فوراً.' },
            { q: 'هل أحتاج لطباعة قوائم جديدة عند تغيير الأسعار؟', a: 'لا. تعدّل الأسعار، الأصناف، والصور من لوحة تحكم والتغيير يظهر فوراً. صفر تكاليف طباعة بعد الإطلاق.' },
            { q: 'هل تعملون مع مطاعم خارج السعودية والإمارات؟', a: 'نعم. نشرنا قوائم QR لمقاهي ومطاعم في الرياض، دبي، جدة، مدينة الكويت، الدوحة، وإسطنبول — وعن بُعد لعملاء حول العالم.' },
        ],
        tr: [
            { q: 'QR menü bir restoranda nasıl çalışır?', a: 'Müşteriler masadaki QR kodu telefon kameralarıyla tarar ve tüm menünüzü anında görür. Uygulama indirmeye gerek yok. Menü güncellemeleri saniyeler içinde yayına girer — bir kez düzenlersiniz, tüm masalar değişikliği görür.' },
            { q: 'QR menü sistemi ne kadara mal olur?', a: 'QR menü sistemlerimiz tek lokasyon için $599\'dan başlar ve sipariş, masa yönetimi ve POS entegrasyonu olan çok şubeli zincirler için $2.499\'ye kadar çıkar.' },
            { q: 'QR menü Arapça, İngilizce ve Türkçeyi destekliyor mu?', a: 'Evet. Her QR menü çok dilli olarak gelir — Arapça (RTL), İngilizce, Türkçe ve ihtiyacınız olan her dil. Müşteriler dilini tek dokunuşla seçer.' },
            { q: 'Müşteriler QR menü üzerinden sipariş verip ödeme yapabilir mi?', a: 'Evet. Premium QR menümüz masa sipariş, bahşiş paylaşımı ve Apple Pay, Mada, STC Pay ve kredi kartı ile ödeme içerir. Mutfak siparişleri anında alır.' },
            { q: 'Fiyatlar değiştiğinde yeni menü bastırmam gerekir mi?', a: 'Hayır. Fiyatları, öğeleri ve fotoğrafları bir panelden düzenlersiniz ve değişiklik anında yayına girer. Lansmandan sonra sıfır baskı maliyeti.' },
            { q: 'Suudi Arabistan ve BAE dışındaki restoranlarla çalışıyor musunuz?', a: 'Evet. Riyad, Dubai, Cidde, Kuveyt, Doha ve İstanbul\'daki kafeler ve restoranlar için QR menüler yayına aldık — ve dünya çapındaki müşteriler için uzaktan çalışıyoruz.' },
        ],
    },
    'business-systems-development': {
        en: [
            { q: 'What is a custom business system?', a: 'A custom business system is software built around your specific workflows — CRM, inventory management, booking systems, HR platforms, or field-service tools — instead of forcing you to fit into a generic SaaS template.' },
            { q: 'How much does a custom CRM or business system cost?', a: 'Custom business systems typically range from $3,999 to $25,000+ depending on scope. Smaller internal tools start at $3,999; enterprise-grade platforms with multi-tenant architecture are quoted per project.' },
            { q: 'How long does it take to build a custom business system?', a: 'Most business systems take 6–16 weeks from kickoff to launch, broken into discovery (1 week), design (2 weeks), build with weekly demos (4–12 weeks), and launch + training (1 week).' },
            { q: 'Can you replace our existing outdated system?', a: 'Yes. We regularly migrate businesses off spreadsheets, legacy ERPs, and outgrown SaaS tools into purpose-built platforms. Data migration, parallel running, and staff training are standard parts of the process.' },
            { q: 'Do business systems work in Arabic and English?', a: 'Yes. Every system is bilingual Arabic + English with full RTL support — menus, reports, emails, and dashboards all mirror correctly. Turkish is also available.' },
            { q: 'Do we own the source code?', a: 'Yes. Full source code, database schema, and deployment configs are yours. We can host on your infrastructure or ours. No licensing fees, no vendor lock-in.' },
        ],
        ar: [
            { q: 'ما هو نظام الأعمال المخصص؟', a: 'نظام الأعمال المخصص هو برنامج مبني حول سير العمل المحدد لشركتك — CRM، إدارة مخزون، أنظمة حجز، منصات موارد بشرية، أو أدوات خدمة ميدانية — بدلاً من إجبارك على التكيّف مع قالب SaaS عام.' },
            { q: 'كم تكلفة CRM أو نظام أعمال مخصص؟', a: 'أنظمة الأعمال المخصصة عادةً تتراوح من 3,999$ إلى 25,000$+ حسب النطاق. الأدوات الداخلية الصغيرة تبدأ من 3,999$؛ المنصات المؤسسية ببنية متعددة المستأجرين تُسعَّر لكل مشروع.' },
            { q: 'كم يستغرق بناء نظام أعمال مخصص؟', a: 'معظم أنظمة الأعمال تستغرق ٦–١٦ أسبوعاً من الانطلاق إلى الإطلاق، مقسّمة إلى استكشاف (أسبوع)، تصميم (أسبوعان)، بناء بعروض أسبوعية (٤–١٢ أسبوعاً)، وإطلاق + تدريب (أسبوع).' },
            { q: 'هل يمكنكم استبدال نظامنا القديم الحالي؟', a: 'نعم. ننقل الشركات بانتظام من جداول البيانات، أنظمة ERP القديمة، وأدوات SaaS التي تجاوزناها إلى منصات مخصصة. نقل البيانات، التشغيل المتوازي، وتدريب الموظفين أجزاء قياسية من العملية.' },
            { q: 'هل تعمل أنظمة الأعمال بالعربية والإنجليزية؟', a: 'نعم. كل نظام ثنائي اللغة عربي + إنجليزي بدعم RTL كامل — القوائم، التقارير، الرسائل الإلكترونية، ولوحات التحكم تنعكس بشكل صحيح. التركية متاحة أيضاً.' },
            { q: 'هل نملك كود المصدر؟', a: 'نعم. كود المصدر الكامل، مخطط قاعدة البيانات، وإعدادات النشر لك. يمكننا الاستضافة على بنيتك التحتية أو بنيتنا. بدون رسوم تراخيص، بدون قيود مورّد.' },
        ],
        tr: [
            { q: 'Özel iş sistemi nedir?', a: 'Özel iş sistemi, sizi genel bir SaaS şablonuna uymaya zorlamak yerine belirli iş akışlarınız etrafında inşa edilen bir yazılımdır — CRM, envanter yönetimi, rezervasyon sistemleri, İK platformları veya saha servisi araçları.' },
            { q: 'Özel bir CRM veya iş sistemi ne kadara mal olur?', a: 'Özel iş sistemleri kapsama göre tipik olarak $3.999 ile $25.000+ arasında değişir. Küçük dahili araçlar $3.999\'dan başlar; çok kiracılı mimariye sahip kurumsal platformlar proje bazında fiyatlandırılır.' },
            { q: 'Özel bir iş sistemi inşa etmek ne kadar sürer?', a: 'Çoğu iş sistemi başlangıçtan lansmana 6–16 hafta sürer: keşif (1 hafta), tasarım (2 hafta), haftalık demolarla inşa (4–12 hafta) ve lansman + eğitim (1 hafta).' },
            { q: 'Mevcut eski sistemimizi değiştirebilir misiniz?', a: 'Evet. İşletmeleri düzenli olarak elektronik tablolardan, eski ERP\'lerden ve büyümüş SaaS araçlarından amaca yönelik platformlara taşıyoruz. Veri taşıma, paralel çalışma ve personel eğitimi sürecin standart parçalarıdır.' },
            { q: 'İş sistemleri Arapça ve İngilizcede çalışıyor mu?', a: 'Evet. Her sistem tam RTL desteğiyle iki dillidir Arapça + İngilizce — menüler, raporlar, e-postalar ve panolar doğru şekilde yansıtılır. Türkçe de mevcuttur.' },
            { q: 'Kaynak koduna biz mi sahip olacağız?', a: 'Evet. Tam kaynak kodu, veritabanı şeması ve dağıtım yapılandırmaları size aittir. Kendi altyapınızda veya bizimkinde barındırabiliriz. Lisans ücreti yok, tedarikçi kilidi yok.' },
        ],
    },
    'web-applications': {
        en: [
            { q: 'What is a web application and how is it different from a website?', a: 'A website is mostly static content (pages, articles, products). A web application is interactive software that runs in the browser — dashboards, portals, SaaS platforms, collaboration tools, or customer-facing apps with real-time data and user accounts.' },
            { q: 'How much does a custom web application cost?', a: 'Web applications typically range from $5,999 to $50,000+ depending on scope and complexity. Simple dashboards and portals start at $5,999; multi-tenant SaaS platforms are quoted per project based on features and scale.' },
            { q: 'How long does it take to build a web application?', a: 'Most web apps take 8–20 weeks: discovery and architecture (2 weeks), design (2–3 weeks), build with weekly demos (4–14 weeks), and launch with QA (1 week). Complex SaaS platforms can take 4–9 months.' },
            { q: 'Which tech stack do you build web applications on?', a: 'We build on Next.js, React, Node.js, PostgreSQL, and TypeScript as defaults. For real-time features we use WebSockets or Supabase Realtime. For AI features we integrate Claude, GPT, or open-source models.' },
            { q: 'Do you handle hosting, scaling, and monitoring?', a: 'Yes. We deploy on Vercel, AWS, or your cloud of choice. Auto-scaling, SSL, CDN, error monitoring (Sentry), and uptime monitoring are all configured at launch. Care plans cover ongoing maintenance.' },
            { q: 'Can the web app integrate with our existing tools and APIs?', a: 'Yes. We integrate with Salesforce, HubSpot, Slack, Zapier, Stripe, Mada, Apple Pay, Google Workspace, Microsoft 365, and any REST/GraphQL API. Custom integrations and middleware are part of our standard work.' },
        ],
        ar: [
            { q: 'ما تطبيق الويب وكيف يختلف عن الموقع؟', a: 'الموقع محتوى ثابت في الغالب (صفحات، مقالات، منتجات). تطبيق الويب هو برنامج تفاعلي يعمل في المتصفح — لوحات تحكم، بوابات، منصات SaaS، أدوات تعاون، أو تطبيقات عملاء ببيانات حية وحسابات مستخدمين.' },
            { q: 'كم تكلفة تطبيق ويب مخصص؟', a: 'تطبيقات الويب عادةً تتراوح من 5,999$ إلى 50,000$+ حسب النطاق والتعقيد. لوحات التحكم والبوابات البسيطة تبدأ من 5,999$؛ منصات SaaS متعددة المستأجرين تُسعَّر لكل مشروع حسب الميزات والحجم.' },
            { q: 'كم يستغرق بناء تطبيق ويب؟', a: 'معظم تطبيقات الويب تستغرق ٨–٢٠ أسبوعاً: استكشاف وبنية (أسبوعان)، تصميم (٢–٣ أسابيع)، بناء بعروض أسبوعية (٤–١٤ أسبوعاً)، وإطلاق مع ضمان الجودة (أسبوع). منصات SaaS المعقدة قد تستغرق ٤–٩ أشهر.' },
            { q: 'على أي مكدس تقني تبنون تطبيقات الويب؟', a: 'نبني على Next.js، React، Node.js، PostgreSQL، وTypeScript افتراضياً. للميزات الحية نستخدم WebSockets أو Supabase Realtime. لميزات الذكاء الاصطناعي ندمج Claude، GPT، أو نماذج مفتوحة المصدر.' },
            { q: 'هل تتولّون الاستضافة، التوسع، والمراقبة؟', a: 'نعم. ننشر على Vercel، AWS، أو السحابة التي تختارها. التوسع التلقائي، SSL، CDN، مراقبة الأخطاء (Sentry)، ومراقبة وقت التشغيل تُعدّ جميعها عند الإطلاق. خطط العناية تغطي الصيانة المستمرة.' },
            { q: 'هل يمكن لتطبيق الويب التكامل مع أدواتنا وواجهات API الحالية؟', a: 'نعم. ندمج مع Salesforce، HubSpot، Slack، Zapier، Stripe، مدى، آبل باي، Google Workspace، Microsoft 365، وأي REST/GraphQL API. التكاملات المخصصة والوسيط (middleware) جزء من عملنا القياسي.' },
        ],
        tr: [
            { q: 'Web uygulaması nedir ve web sitesinden nasıl farklıdır?', a: 'Web sitesi çoğunlukla statik içeriktir (sayfalar, makaleler, ürünler). Web uygulaması tarayıcıda çalışan etkileşimli yazılımdır — panolar, portallar, SaaS platformları, işbirliği araçları veya gerçek zamanlı verili ve kullanıcı hesaplı müşteri uygulamaları.' },
            { q: 'Özel bir web uygulaması ne kadara mal olur?', a: 'Web uygulamaları kapsam ve karmaşıklığa göre tipik olarak $5.999 ile $50.000+ arasında değişir. Basit panolar ve portallar $5.999\'dan başlar; çok kiracılı SaaS platformları özellik ve ölçeğe göre proje bazında fiyatlandırılır.' },
            { q: 'Bir web uygulaması inşa etmek ne kadar sürer?', a: 'Çoğu web uygulaması 8–20 hafta sürer: keşif ve mimari (2 hafta), tasarım (2–3 hafta), haftalık demolarla inşa (4–14 hafta) ve QA ile lansman (1 hafta). Karmaşık SaaS platformları 4–9 ay sürebilir.' },
            { q: 'Hangi teknoloji yığınında web uygulamaları geliştiriyorsunuz?', a: 'Varsayılan olarak Next.js, React, Node.js, PostgreSQL ve TypeScript üzerinde inşa ediyoruz. Gerçek zamanlı özellikler için WebSockets veya Supabase Realtime kullanırız. Yapay zeka özellikleri için Claude, GPT veya açık kaynak modelleri entegre ederiz.' },
            { q: 'Barındırma, ölçeklendirme ve izlemeyi yönetiyor musunuz?', a: 'Evet. Vercel, AWS veya seçtiğiniz bulutta dağıtıyoruz. Otomatik ölçeklendirme, SSL, CDN, hata izleme (Sentry) ve çalışma süresi izleme lansmanda yapılandırılır. Bakım planları süregelen bakımı kapsar.' },
            { q: 'Web uygulaması mevcut araçlarımız ve API\'lerimizle entegre olabilir mi?', a: 'Evet. Salesforce, HubSpot, Slack, Zapier, Stripe, Mada, Apple Pay, Google Workspace, Microsoft 365 ve herhangi bir REST/GraphQL API ile entegre ediyoruz. Özel entegrasyonlar ve ara yazılım standart çalışmamızın bir parçasıdır.' },
        ],
    },
    'social-media-marketing': {
        en: [
            { q: 'Do you manage social media in Arabic and for Gulf audiences?', a: 'Yes. Arabic is our default for Gulf audiences — we write in Khaleeji-aware Modern Standard Arabic, use culturally appropriate imagery, align campaigns with Saudi/UAE holidays (Eid, National Day, Founding Day), and understand GCC platform behavior.' },
            { q: 'Which platforms do you run paid ads on?', a: 'Meta (Instagram, Facebook), TikTok, Snapchat (huge in Gulf), Twitter/X, LinkedIn, YouTube, and Google Ads. TikTok and Snapchat dominate for Saudi and Emirati 18–35 audiences; Instagram for lifestyle and e-commerce.' },
            { q: 'How much does social media marketing cost per month?', a: 'Management retainers start at $799/month for content + community management. Full-service plans with paid ads start at $1,999/month excluding ad spend. Ad spend is separate and transparently billed through your own ad accounts.' },
            { q: 'Do you create content in-house or outsource it?', a: 'In-house. Our Arabic and English copywriters, designers, and video editors produce all content. Photography and videography for Gulf clients is shot in Riyadh, Jeddah, Dubai, or Istanbul as needed.' },
            { q: 'How do you measure social media performance?', a: 'Monthly dashboards show reach, engagement, CTR, CPA, ROAS, and attributed revenue. We tie social spend to actual business outcomes — not vanity metrics. Dashboards are in Arabic or English, your choice.' },
            { q: 'Do we own the ad accounts and content?', a: 'Yes. Ad accounts are opened in your name, content lives in your Google Drive, and analytics dashboards are shared with your team. If we part ways, you keep everything.' },
        ],
        ar: [
            { q: 'هل تديرون التواصل الاجتماعي بالعربية ولجمهور الخليج؟', a: 'نعم. العربية افتراضية لجمهور الخليج — نكتب بعربية فصحى واعية باللهجة الخليجية، نستخدم صوراً مناسبة ثقافياً، نواءم الحملات مع المناسبات السعودية/الإماراتية (العيد، اليوم الوطني، يوم التأسيس)، ونفهم سلوك منصات دول الخليج.' },
            { q: 'على أي منصات تديرون الإعلانات المدفوعة؟', a: 'Meta (إنستاجرام، فيسبوك)، تيك توك، سناب شات (ضخم في الخليج)، تويتر/X، لينكدإن، يوتيوب، وإعلانات جوجل. تيك توك وسناب شات يهيمنان على جمهور السعودية والإمارات ١٨–٣٥؛ إنستاجرام للنمط الحياتي والتجارة الإلكترونية.' },
            { q: 'كم تكلفة التسويق على التواصل الاجتماعي شهرياً؟', a: 'عقود الإدارة تبدأ من 799$/شهرياً للمحتوى + إدارة المجتمع. خطط الخدمة الكاملة مع إعلانات مدفوعة تبدأ من 1,999$/شهرياً عدا ميزانية الإعلانات. ميزانية الإعلانات منفصلة وتُفوتَر بشفافية عبر حساباتك الإعلانية الخاصة.' },
            { q: 'هل تنشئون المحتوى داخلياً أم تتعاقدون خارجياً؟', a: 'داخلياً. كتّابنا، مصممونا، ومحررو الفيديو بالعربية والإنجليزية ينتجون كل المحتوى. التصوير الفوتوغرافي والفيديو لعملاء الخليج يُصوَّر في الرياض، جدة، دبي، أو إسطنبول حسب الحاجة.' },
            { q: 'كيف تقيسون أداء التواصل الاجتماعي؟', a: 'لوحات شهرية تعرض الوصول، التفاعل، CTR، CPA، ROAS، والإيرادات المنسوبة. نربط الإنفاق الاجتماعي بنتائج الأعمال الفعلية — لا بمقاييس الغرور. اللوحات بالعربية أو الإنجليزية، اختيارك.' },
            { q: 'هل نملك الحسابات الإعلانية والمحتوى؟', a: 'نعم. الحسابات الإعلانية تُفتَح باسمك، المحتوى يعيش في Google Drive الخاص بك، ولوحات التحليلات تُشارَك مع فريقك. إذا افترقنا، تحتفظ بكل شيء.' },
        ],
        tr: [
            { q: 'Arapça ve Körfez kitleleri için sosyal medya yönetiyor musunuz?', a: 'Evet. Körfez kitleleri için Arapça varsayılanımızdır — Khaleeji farkındalığı olan Modern Standart Arapçada yazarız, kültürel olarak uygun görseller kullanırız, kampanyaları Suudi/BAE tatilleriyle (Bayram, Milli Gün, Kuruluş Günü) hizalar ve GCC platform davranışını anlarız.' },
            { q: 'Hangi platformlarda ücretli reklam yönetiyorsunuz?', a: 'Meta (Instagram, Facebook), TikTok, Snapchat (Körfez\'de büyük), Twitter/X, LinkedIn, YouTube ve Google Ads. TikTok ve Snapchat Suudi ve Emirati 18–35 kitleleri için hakimdir; Instagram yaşam tarzı ve e-ticaret için.' },
            { q: 'Sosyal medya pazarlaması aylık ne kadara mal olur?', a: 'Yönetim hizmetleri içerik + topluluk yönetimi için ayda $799\'dan başlar. Ücretli reklamlarla tam hizmet planları reklam harcaması hariç ayda $1.999\'dan başlar. Reklam harcaması ayrıdır ve kendi reklam hesaplarınız üzerinden şeffaf şekilde faturalandırılır.' },
            { q: 'İçeriği kendi bünyenizde mi oluşturuyorsunuz yoksa dışarıya mı veriyorsunuz?', a: 'Kendi bünyemizde. Arapça ve İngilizce metin yazarlarımız, tasarımcılarımız ve video editörlerimiz tüm içeriği üretir. Körfez müşterileri için fotoğrafçılık ve video çekimi Riyad, Cidde, Dubai veya İstanbul\'da ihtiyaca göre yapılır.' },
            { q: 'Sosyal medya performansını nasıl ölçüyorsunuz?', a: 'Aylık panolar erişim, etkileşim, CTR, CPA, ROAS ve ilişkilendirilmiş gelir gösterir. Sosyal harcamayı gerçek iş sonuçlarına bağlarız — gurur metriklerine değil. Panolar Arapça veya İngilizcedir, seçim sizin.' },
            { q: 'Reklam hesaplarına ve içeriğe biz mi sahip olacağız?', a: 'Evet. Reklam hesapları sizin adınıza açılır, içerik Google Drive\'ınızda yaşar ve analitik panoları ekibinizle paylaşılır. Ayrılırsak her şeyi siz alırsınız.' },
        ],
    },
    'content-creation': {
        en: [
            { q: 'Do you write content in Arabic and English?', a: 'Yes. Every content package is bilingual by default. We write original content in both languages — not machine translation — with culturally appropriate tone, idioms, and references for Gulf audiences.' },
            { q: 'How much does content creation cost?', a: 'Content packages start at $499/month for blog posts and social copy, and scale to $2,499+/month for full content strategy including video, podcast, and email. Pricing is by volume and channels, not word count.' },
            { q: 'What types of content do you produce?', a: 'Blog articles, social media posts, email newsletters, YouTube and TikTok video scripts, podcast episodes, product descriptions, landing page copy, case studies, and SEO-optimized long-form articles.' },
            { q: 'Do you optimize content for Google SEO?', a: 'Yes. Every article includes keyword research, Arabic + English meta tags, schema markup, internal linking strategy, and is optimized for Google E-E-A-T and AI search engines like ChatGPT and Perplexity.' },
            { q: 'How quickly can you turn around content?', a: 'Blog posts: 5 business days from brief to delivery. Social posts: 3 business days. Video scripts: 3–5 business days. Rush delivery available for urgent campaigns.' },
            { q: 'Do you provide content calendars and strategy?', a: 'Yes. Every retainer includes a monthly content calendar, topic planning aligned with your business goals and Gulf calendar events (Ramadan, Eid, National Day, Founding Day), and quarterly strategy reviews.' },
        ],
        ar: [
            { q: 'هل تكتبون محتوى بالعربية والإنجليزية؟', a: 'نعم. كل باقة محتوى ثنائية اللغة افتراضياً. نكتب محتوى أصيلاً باللغتين — لا ترجمة آلية — بنبرة مناسبة ثقافياً، تعابير، ومراجع لجمهور الخليج.' },
            { q: 'كم تكلفة إنشاء المحتوى؟', a: 'باقات المحتوى تبدأ من 499$/شهرياً لمقالات المدونة ونصوص التواصل الاجتماعي، وتتوسع إلى 2,499$+/شهرياً لاستراتيجية محتوى كاملة تشمل الفيديو، البودكاست، والبريد. التسعير بالحجم والقنوات، لا بعدد الكلمات.' },
            { q: 'ما أنواع المحتوى الذي تنتجونه؟', a: 'مقالات المدونة، منشورات التواصل الاجتماعي، النشرات البريدية، سكربتات يوتيوب وتيك توك، حلقات البودكاست، وصفات المنتجات، نصوص صفحات الهبوط، دراسات الحالة، والمقالات الطويلة المحسّنة للسيو.' },
            { q: 'هل تحسّنون المحتوى لسيو جوجل؟', a: 'نعم. كل مقال يتضمن بحث الكلمات المفتاحية، وسوم عربية + إنجليزية، مخطط Schema، استراتيجية ربط داخلي، ومحسَّن لـ E-E-A-T من جوجل ومحركات البحث الذكية مثل ChatGPT وPerplexity.' },
            { q: 'ما سرعة تسليم المحتوى؟', a: 'منشورات المدونة: ٥ أيام عمل من البريف إلى التسليم. منشورات التواصل: ٣ أيام عمل. سكربتات الفيديو: ٣–٥ أيام عمل. التسليم السريع متاح للحملات العاجلة.' },
            { q: 'هل تقدّمون تقويم محتوى واستراتيجية؟', a: 'نعم. كل عقد يتضمن تقويم محتوى شهري، تخطيط مواضيع متوائم مع أهداف أعمالك ومناسبات الخليج (رمضان، العيد، اليوم الوطني، يوم التأسيس)، ومراجعات استراتيجية ربع سنوية.' },
        ],
        tr: [
            { q: 'Arapça ve İngilizce içerik yazıyor musunuz?', a: 'Evet. Her içerik paketi varsayılan olarak iki dillidir. Körfez kitleleri için kültürel olarak uygun ton, deyimler ve referanslarla her iki dilde orijinal içerik yazarız — makine çevirisi değil.' },
            { q: 'İçerik oluşturma ne kadara mal olur?', a: 'İçerik paketleri blog yazıları ve sosyal metinler için ayda $499\'dan başlar ve video, podcast ve e-posta dahil tam içerik stratejisi için aylık $2.499+\'ye kadar çıkar. Fiyatlandırma kelime sayısına göre değil, hacim ve kanallara göredir.' },
            { q: 'Hangi tür içerikleri üretiyorsunuz?', a: 'Blog makaleleri, sosyal medya gönderileri, e-posta bültenleri, YouTube ve TikTok video senaryoları, podcast bölümleri, ürün açıklamaları, açılış sayfası metinleri, vaka çalışmaları ve SEO optimize edilmiş uzun form makaleleri.' },
            { q: 'İçeriği Google SEO için optimize ediyor musunuz?', a: 'Evet. Her makale anahtar kelime araştırması, Arapça + İngilizce meta etiketleri, şema işaretlemesi, dahili bağlantı stratejisi içerir ve Google E-E-A-T ve ChatGPT, Perplexity gibi yapay zeka arama motorları için optimize edilmiştir.' },
            { q: 'İçeriği ne kadar hızlı teslim edebilirsiniz?', a: 'Blog yazıları: brief\'ten teslime 5 iş günü. Sosyal gönderiler: 3 iş günü. Video senaryoları: 3–5 iş günü. Acil kampanyalar için hızlı teslim mevcuttur.' },
            { q: 'İçerik takvimi ve strateji sağlıyor musunuz?', a: 'Evet. Her sözleşme aylık içerik takvimi, işletme hedeflerinizle ve Körfez takvim etkinlikleriyle (Ramazan, Bayram, Milli Gün, Kuruluş Günü) uyumlu konu planlaması ve üç aylık strateji incelemeleri içerir.' },
        ],
    },
}

export function buildFAQSchema(serviceSlug: string, locale: string) {
    const faqs = serviceFAQs[serviceSlug]?.[locale as 'en' | 'ar' | 'tr']
    if (!faqs || faqs.length === 0) return null
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }
}
