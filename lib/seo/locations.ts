export type LocationData = {
    slug: string
    country: string
    countryCode: string
    capital: string
    cities: string[]
    currency: string
    language: string
    vatRate: string
    paymentMethods: string[]
    marketInsight: string
    marketNotes: {
        en: string
        ar: string
    }
    seoKeywords: string[]
    services: string[]
    nameEn: string
    nameAr: string
}

export const locations: Record<string, LocationData> = {
    'saudi-arabia': {
        slug: 'saudi-arabia',
        country: 'Saudi Arabia',
        countryCode: 'SA',
        capital: 'Riyadh',
        cities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Tabuk', 'Abha'],
        currency: 'SAR',
        language: 'Arabic',
        vatRate: '15%',
        paymentMethods: ['Mada', 'Apple Pay', 'STC Pay', 'Tabby', 'Tamara', 'Visa', 'Mastercard'],
        marketInsight: 'Home to Vision 2030 digital transformation initiative. 97% internet penetration, 84% smartphone use, 75%+ mobile-first buying behavior.',
        marketNotes: {
            en: 'Saudi buyers expect polished Arabic and English experiences, local payment readiness, and systems that can support multi-city growth from Riyadh to Jeddah and the Eastern Province.',
            ar: 'السوق السعودي يحتاج تجارب عربية وإنجليزية احترافية، مدفوعات محلية جاهزة، وأنظمة تدعم النمو بين الرياض وجدة والمنطقة الشرقية.',
        },
        seoKeywords: ['web development company in Saudi Arabia', 'digital transformation Saudi Arabia', 'ecommerce development KSA', 'Arabic website design Saudi Arabia'],
        services: ['website-design', 'ecommerce-solutions', 'restaurant-qr-menu', 'business-systems-development', 'social-media-marketing'],
        nameEn: 'Saudi Arabia',
        nameAr: 'المملكة العربية السعودية',
    },
    'uae': {
        slug: 'uae',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        capital: 'Abu Dhabi',
        cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
        currency: 'AED',
        language: 'Arabic + English',
        vatRate: '5%',
        paymentMethods: ['Apple Pay', 'Google Pay', 'Tabby', 'Tamara', 'Visa', 'Mastercard', 'Etisalat Wallet'],
        marketInsight: 'Most digitally mature Gulf market. 99% internet penetration, strong B2B SaaS adoption, home to regional HQs.',
        marketNotes: {
            en: 'UAE companies often need premium multilingual websites, payment-ready stores, investor-facing portals, and cloud systems that can support regional headquarters and fast-moving teams.',
            ar: 'شركات الإمارات تحتاج غالباً مواقع متعددة اللغات بمستوى عالٍ، متاجر جاهزة للدفع، بوابات للمستثمرين، وأنظمة سحابية للفرق السريعة.',
        },
        seoKeywords: ['digital agency in UAE', 'web development Dubai', 'ecommerce development UAE', 'custom software company UAE'],
        services: ['website-design', 'ecommerce-solutions', 'web-applications', 'business-systems-development', 'social-media-marketing'],
        nameEn: 'UAE',
        nameAr: 'الإمارات العربية المتحدة',
    },
    'kuwait': {
        slug: 'kuwait',
        country: 'Kuwait',
        countryCode: 'KW',
        capital: 'Kuwait City',
        cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Farwaniya', 'Ahmadi'],
        currency: 'KWD',
        language: 'Arabic',
        vatRate: '0% (no VAT)',
        paymentMethods: ['KNET', 'Apple Pay', 'NBK Pay', 'Tabby', 'Tamara', 'Visa', 'Mastercard'],
        marketInsight: 'High purchasing power, mobile-first e-commerce, strong social commerce via Instagram and Snapchat.',
        marketNotes: {
            en: 'Kuwait businesses benefit from mobile-first commerce, bilingual catalogs, KNET-ready checkout, and CRM systems that connect social demand with sales follow-up.',
            ar: 'الأعمال في الكويت تستفيد من التجارة عبر الجوال، كتالوجات ثنائية اللغة، دفع KNET، وأنظمة CRM تربط الطلب الاجتماعي بالمتابعة.',
        },
        seoKeywords: ['web development Kuwait', 'KNET ecommerce development', 'digital agency Kuwait', 'Arabic English website Kuwait'],
        services: ['website-design', 'ecommerce-solutions', 'restaurant-qr-menu', 'social-media-marketing'],
        nameEn: 'Kuwait',
        nameAr: 'الكويت',
    },
    'qatar': {
        slug: 'qatar',
        country: 'Qatar',
        countryCode: 'QA',
        capital: 'Doha',
        cities: ['Doha', 'Al Wakrah', 'Al Khor', 'Al Rayyan', 'Umm Salal', 'Lusail'],
        currency: 'QAR',
        language: 'Arabic + English',
        vatRate: '0% (planned)',
        paymentMethods: ['NAPS', 'Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Ooredoo Money'],
        marketInsight: 'High-income market, post-World Cup digital acceleration, strong hospitality and F&B sectors.',
        marketNotes: {
            en: 'Qatar teams often need hospitality platforms, booking systems, polished corporate websites, and bilingual customer experiences built for Doha and Lusail audiences.',
            ar: 'فرق قطر تحتاج غالباً منصات ضيافة، أنظمة حجز، مواقع مؤسسية مصقولة، وتجارب عملاء ثنائية اللغة لجمهور الدوحة ولوسيل.',
        },
        seoKeywords: ['web development Qatar', 'digital agency Doha', 'booking platform Qatar', 'ecommerce development Qatar'],
        services: ['website-design', 'restaurant-qr-menu', 'ecommerce-solutions', 'business-systems-development'],
        nameEn: 'Qatar',
        nameAr: 'قطر',
    },
    'bahrain': {
        slug: 'bahrain',
        country: 'Bahrain',
        countryCode: 'BH',
        capital: 'Manama',
        cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali', 'Sitra'],
        currency: 'BHD',
        language: 'Arabic + English',
        vatRate: '10%',
        paymentMethods: ['Benefit', 'BenefitPay', 'Apple Pay', 'Tabby', 'Tamara', 'Visa', 'Mastercard'],
        marketInsight: 'Regional fintech hub with progressive digital banking regulation and strong SaaS ecosystem.',
        marketNotes: {
            en: 'Bahrain is strong for fintech, service businesses, and SaaS teams that need secure portals, payment integrations, and clear Arabic plus English interfaces.',
            ar: 'البحرين مناسبة للتقنية المالية، شركات الخدمات، وفرق SaaS التي تحتاج بوابات آمنة، تكامل دفع، وواجهات عربية وإنجليزية واضحة.',
        },
        seoKeywords: ['web development Bahrain', 'fintech software Bahrain', 'digital agency Bahrain', 'BenefitPay ecommerce integration'],
        services: ['website-design', 'ecommerce-solutions', 'business-systems-development', 'web-applications'],
        nameEn: 'Bahrain',
        nameAr: 'البحرين',
    },
    'oman': {
        slug: 'oman',
        country: 'Oman',
        countryCode: 'OM',
        capital: 'Muscat',
        cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Khasab'],
        currency: 'OMR',
        language: 'Arabic',
        vatRate: '5%',
        paymentMethods: ['OmanNet', 'Apple Pay', 'Visa', 'Mastercard', 'Thawani Pay'],
        marketInsight: 'Tourism-driven digital economy, Vision 2040 transformation, strong hospitality and services sectors.',
        marketNotes: {
            en: 'Oman businesses often need tourism-ready websites, restaurant systems, service booking flows, and bilingual content that respects local trust signals.',
            ar: 'أعمال عُمان تحتاج غالباً مواقع مناسبة للسياحة، أنظمة مطاعم، مسارات حجز خدمات، ومحتوى ثنائي اللغة يحترم إشارات الثقة المحلية.',
        },
        seoKeywords: ['web development Oman', 'digital agency Muscat', 'restaurant website Oman', 'ecommerce development Oman'],
        services: ['website-design', 'restaurant-qr-menu', 'social-media-marketing', 'ecommerce-solutions'],
        nameEn: 'Oman',
        nameAr: 'عُمان',
    },
    'iraq': {
        slug: 'iraq',
        country: 'Iraq',
        countryCode: 'IQ',
        capital: 'Baghdad',
        cities: ['Baghdad', 'Basra', 'Erbil', 'Mosul', 'Najaf', 'Karbala', 'Sulaymaniyah'],
        currency: 'IQD',
        language: 'Arabic + Kurdish',
        vatRate: 'Tax rules vary by business type',
        paymentMethods: ['Cash on delivery', 'Bank transfer', 'Visa', 'Mastercard', 'ZainCash', 'AsiaHawala'],
        marketInsight: 'A rebuilding digital market with strong demand for trustworthy business websites, commerce operations, logistics visibility, and multilingual customer communication.',
        marketNotes: {
            en: 'Iraq companies need practical digital systems that work around mixed payment behavior, regional language needs, and operational coordination across major cities.',
            ar: 'الشركات في العراق تحتاج أنظمة رقمية عملية تراعي تنوع طرق الدفع، احتياجات اللغة، وتنسيق العمليات بين المدن الرئيسية.',
        },
        seoKeywords: ['web development Iraq', 'digital agency Baghdad', 'ecommerce development Iraq', 'business systems Iraq'],
        services: ['website-design', 'ecommerce-solutions', 'business-systems-development', 'web-applications'],
        nameEn: 'Iraq',
        nameAr: 'العراق',
    },
    'syria': {
        slug: 'syria',
        country: 'Syria',
        countryCode: 'SY',
        capital: 'Damascus',
        cities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama', 'Tartus'],
        currency: 'SYP',
        language: 'Arabic',
        vatRate: 'Tax rules vary by business type',
        paymentMethods: ['Cash on delivery', 'Bank transfer', 'Visa', 'Mastercard', 'Local wallet integrations'],
        marketInsight: 'A practical digital market where lightweight websites, service catalogs, remote sales workflows, and multilingual communications can create immediate business leverage.',
        marketNotes: {
            en: 'Syria-focused projects should prioritize resilient hosting choices, lightweight pages, clear catalogs, and contact flows that make remote buying easier.',
            ar: 'مشاريع سوريا يجب أن تركز على استضافة مرنة، صفحات خفيفة، كتالوجات واضحة، ومسارات تواصل تسهل الشراء عن بُعد.',
        },
        seoKeywords: ['web development Syria', 'digital agency Damascus', 'Arabic website design Syria', 'business website Syria'],
        services: ['website-design', 'ecommerce-solutions', 'content-creation', 'social-media-marketing'],
        nameEn: 'Syria',
        nameAr: 'سوريا',
    },
    'jordan': {
        slug: 'jordan',
        country: 'Jordan',
        countryCode: 'JO',
        capital: 'Amman',
        cities: ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Salt', 'Madaba'],
        currency: 'JOD',
        language: 'Arabic + English',
        vatRate: '16%',
        paymentMethods: ['CliQ', 'eFAWATEERcom', 'Apple Pay', 'Visa', 'Mastercard', 'Cash on delivery'],
        marketInsight: 'A strong services and technology market with demand for bilingual platforms, education systems, tourism tools, and operational automation.',
        marketNotes: {
            en: 'Jordanian businesses often need bilingual service websites, education platforms, booking tools, and CRM systems that support both local and export-facing teams.',
            ar: 'الأعمال الأردنية تحتاج غالباً مواقع خدمات ثنائية اللغة، منصات تعليمية، أدوات حجز، وأنظمة CRM للفرق المحلية والتصديرية.',
        },
        seoKeywords: ['web development Jordan', 'digital agency Amman', 'ecommerce development Jordan', 'education platform Jordan'],
        services: ['website-design', 'web-applications', 'business-systems-development', 'ecommerce-solutions'],
        nameEn: 'Jordan',
        nameAr: 'الأردن',
    },
    'egypt': {
        slug: 'egypt',
        country: 'Egypt',
        countryCode: 'EG',
        capital: 'Cairo',
        cities: ['Cairo', 'Alexandria', 'Giza', 'New Cairo', 'Mansoura', 'Tanta', 'Hurghada'],
        currency: 'EGP',
        language: 'Arabic + English',
        vatRate: '14%',
        paymentMethods: ['Meeza', 'Fawry', 'Vodafone Cash', 'InstaPay', 'Visa', 'Mastercard', 'Cash on delivery'],
        marketInsight: 'A large Arabic-speaking digital market with high demand for scalable commerce, content systems, education platforms, and customer support automation.',
        marketNotes: {
            en: 'Egypt projects benefit from Arabic-first UX, high-volume content operations, local payment choices, and systems designed for large customer bases.',
            ar: 'مشاريع مصر تستفيد من تجربة عربية أولاً، تشغيل محتوى كبير الحجم، خيارات دفع محلية، وأنظمة مصممة لقواعد عملاء واسعة.',
        },
        seoKeywords: ['web development Egypt', 'digital agency Cairo', 'ecommerce development Egypt', 'Arabic website design Egypt'],
        services: ['website-design', 'ecommerce-solutions', 'web-applications', 'social-media-marketing'],
        nameEn: 'Egypt',
        nameAr: 'مصر',
    },
    'lebanon': {
        slug: 'lebanon',
        country: 'Lebanon',
        countryCode: 'LB',
        capital: 'Beirut',
        cities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Zahle', 'Jounieh'],
        currency: 'LBP',
        language: 'Arabic + English + French',
        vatRate: '11%',
        paymentMethods: ['Bank transfer', 'Cash on delivery', 'Visa', 'Mastercard', 'Whish Money', 'OMT Pay'],
        marketInsight: 'A multilingual services, retail, and hospitality market where brand polish, content quality, and flexible payment workflows matter.',
        marketNotes: {
            en: 'Lebanon-focused websites should support multilingual content, polished brand presentation, practical payment workflows, and lead capture for service-led businesses.',
            ar: 'مواقع لبنان يجب أن تدعم محتوى متعدد اللغات، عرضاً احترافياً للعلامة، مسارات دفع عملية، وجمع عملاء محتملين لشركات الخدمات.',
        },
        seoKeywords: ['web development Lebanon', 'digital agency Beirut', 'multilingual website Lebanon', 'ecommerce development Lebanon'],
        services: ['website-design', 'ecommerce-solutions', 'content-creation', 'business-systems-development'],
        nameEn: 'Lebanon',
        nameAr: 'لبنان',
    },
}

export const locationSlugs = Object.keys(locations)

export function getLocation(slug: string): LocationData | null {
    return locations[slug] || null
}
