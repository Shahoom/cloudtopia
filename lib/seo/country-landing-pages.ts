export type CountryLocale = 'ar' | 'en'

export type CountryLandingContent = {
    seoTitle: string
    seoDescription: string
    h1: string
    heroSubtitle: string
    marketProblem: string
    solutionIntro: string
    whyCloudTopia: string
    finalCta: string
    primaryKeyword: string
    secondaryKeywords: string[]
}

export type CountryPricingPackage = {
    key: 'starter' | 'growth' | 'systems'
    title: Record<CountryLocale, string>
    description: Record<CountryLocale, string>
    priceNote: Record<CountryLocale, string>
    features: Record<CountryLocale, string[]>
}

export type CountryFAQ = {
    question: string
    answer: string
}

export type CountryTestimonial = {
    name: string
    roleArabic: string
    roleEnglish: string
    quoteArabic: string
    quoteEnglish: string
}

export type CountryLandingPageData = {
    code: string
    slug: string
    countryNameArabic: string
    countryNameEnglish: string
    marketNameArabic: string
    marketNameEnglish: string
    arabicUrl: string
    englishUrl: string
    hreflangArabic: string
    hreflangEnglish: string
    phone: string
    whatsappUrl: string
    currency: string
    content: Record<CountryLocale, CountryLandingContent>
    pricingPackages: CountryPricingPackage[]
    faqs: Record<CountryLocale, CountryFAQ[]>
    testimonials: CountryTestimonial[]
    theme: {
        primaryAccent: string
        secondaryAccent: string
        darkAccent?: string
        surface: string
        softAccent: string
        ink: string
        photo: {
            src: string
            altArabic: string
            altEnglish: string
            captionArabic: string
            captionEnglish: string
        }
    }
}

type Seed = {
    code: string
    slug: string
    countryNameArabic: string
    countryNameEnglish: string
    marketNameArabic: string
    marketNameEnglish: string
    hreflangArabic: string
    hreflangEnglish: string
    currency: string
    phoneGroup: 'gcc' | 'turkey'
    theme: CountryLandingPageData['theme']
    arabic: {
        h1: string
        seoTitle: string
        seoDescription: string
        primaryKeyword: string
        secondaryKeywords: string[]
    }
    english: {
        h1: string
        seoTitle: string
        seoDescription: string
        primaryKeyword: string
        secondaryKeywords: string[]
    }
}

const GCC_PHONE = '+968 9588 6393'
const GCC_WHATSAPP = 'https://wa.me/96895886393'
const TURKEY_PHONE = '+90 501 151 11 16'
const TURKEY_WHATSAPP = 'https://wa.me/905011511116'

const currencyNamesArabic: Record<string, string> = {
    SAR: 'بالريال السعودي',
    AED: 'بالدرهم الإماراتي',
    OMR: 'بالريال العماني',
    QAR: 'بالريال القطري',
    KWD: 'بالدينار الكويتي',
    BHD: 'بالدينار البحريني',
    JOD: 'بالدينار الأردني',
    EGP: 'بالجنيه المصري',
    USD: 'بالدولار الأمريكي',
}

const marketAngles: Record<string, { ar: string; en: string }> = {
    sa: {
        ar: 'في السعودية نركز على الشركات التي تحتاج مواقع قوية، أنظمة مبيعات، لوحات تشغيل، وتكاملات قابلة للتوسع مع نمو الفروع والفرق.',
        en: 'For Saudi Arabia, we focus on companies that need strong websites, sales systems, operations dashboards, and scalable integrations as teams and branches grow.',
    },
    ae: {
        ar: 'في الإمارات نركز على تجربة رقمية راقية، صفحات متعددة اللغات، ربط مبيعات سريع، وأنظمة تناسب شركات تتحرك بسرعة بين دبي وأبوظبي وباقي الإمارات.',
        en: 'For the UAE, we focus on premium digital experience, multilingual pages, fast sales workflows, and systems for teams moving quickly across Dubai, Abu Dhabi, and the wider market.',
    },
    om: {
        ar: 'في عُمان نركز على شركات الخدمات، السياحة، الضيافة، التجارة، والفرق التي تحتاج موقعاً واضحاً ونظاماً مستقراً وبيئة سحابية موثوقة.',
        en: 'For Oman, we focus on service companies, tourism, hospitality, trade, and teams that need a clear website, stable system, and reliable cloud setup.',
    },
    qa: {
        ar: 'في قطر نركز على الشركات التي تحتاج حضوراً احترافياً، صفحات خدمات واضحة، متابعة عملاء دقيقة، وتجربة رقمية تناسب السوق عالي التوقعات.',
        en: 'For Qatar, we focus on companies that need professional presence, clear service pages, precise lead follow-up, and a digital experience for a high-expectation market.',
    },
    kw: {
        ar: 'في الكويت نركز على المتاجر، شركات الخدمات، الأنظمة الداخلية، وربط الطلبات والمبيعات مع واتساب ولوحات الإدارة.',
        en: 'For Kuwait, we focus on stores, service businesses, internal systems, and connecting orders and sales with WhatsApp and management dashboards.',
    },
    bh: {
        ar: 'في البحرين نركز على الشركات التي تحتاج سرعة في التواصل، مواقع خفيفة، نماذج طلبات واضحة، وربطاً بين الموقع وخدمة العملاء.',
        en: 'For Bahrain, we focus on companies that need fast communication, lightweight websites, clear inquiry forms, and connection between the website and customer care.',
    },
    iq: {
        ar: 'في العراق نركز على تنظيم الطلبات والعملاء والمخزون، وبناء أنظمة تساعد الشركات على الانتقال من المتابعة اليدوية إلى تشغيل أوضح.',
        en: 'For Iraq, we focus on organizing orders, customers, and inventory, and building systems that move companies from manual follow-up to clearer operations.',
    },
    tr: {
        ar: 'في تركيا نركز على الشركات العربية والتركية التي تحتاج مواقع متعددة اللغات، تطبيقات ويب، أنظمة حجز، وربط عمليات بين الفرق والعملاء.',
        en: 'For Turkey, we focus on Arab and Turkish companies that need multilingual websites, web apps, booking systems, and connected workflows between teams and customers.',
    },
    sy: {
        ar: 'في سوريا نركز على حضور رقمي واضح، مواقع خدمات، أنظمة متابعة عملاء، وحلول عملية تناسب الشركات التي تريد تنظيماً أفضل بتكلفة محسوبة.',
        en: 'For Syria, we focus on clear digital presence, service websites, customer follow-up systems, and practical solutions for companies that need better organization with controlled cost.',
    },
    jo: {
        ar: 'في الأردن نركز على شركات الخدمات والاستشارات والتعليم والتجارة التي تحتاج موقعاً واضحاً ونظام CRM ولوحات متابعة للفريق.',
        en: 'For Jordan, we focus on services, consulting, education, and trade companies that need a clear website, CRM system, and team dashboards.',
    },
    eg: {
        ar: 'في مصر نركز على الشركات التي تحتاج حضوراً عربياً قوياً، محتوى واسع، متاجر قابلة للتوسع، وأنظمة متابعة تناسب حجم السوق.',
        en: 'For Egypt, we focus on companies that need strong Arabic presence, high-volume content, scalable commerce, and follow-up systems for a large market.',
    },
    lb: {
        ar: 'في لبنان نركز على المواقع السريعة، الرسائل الواضحة، المتاجر والخدمات، وربط تجربة العميل بين الموقع وواتساب والطلبات.',
        en: 'For Lebanon, we focus on fast websites, clear messaging, stores and services, and connecting the customer experience between the website, WhatsApp, and orders.',
    },
}

const seeds: Seed[] = [
    {
        code: 'sa',
        slug: 'saudi-arabia',
        countryNameArabic: 'السعودية',
        countryNameEnglish: 'Saudi Arabia',
        marketNameArabic: 'السوق السعودي',
        marketNameEnglish: 'Saudi market',
        hreflangArabic: 'ar-SA',
        hreflangEnglish: 'en-SA',
        currency: 'SAR',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#0B7A3B',
            secondaryAccent: '#B8944D',
            darkAccent: '#10291C',
            surface: '#F4F1E7',
            softAccent: '#E7D8B6',
            ink: '#102015',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Riyadh_Skyline.jpg',
                altArabic: 'أفق مدينة الرياض في السعودية',
                altEnglish: 'Riyadh skyline in Saudi Arabia',
                captionArabic: 'مشهد من الرياض، حيث تبحث الشركات عن مواقع وأنظمة تعمل بوضوح.',
                captionEnglish: 'A Riyadh market view for companies that need clear websites and systems.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في السعودية',
            seoTitle: 'شركة برمجيات في السعودية | مواقع، CRM، ERP وذكاء اصطناعي',
            seoDescription: 'كلاود توبيا تقدم حلول برمجية للشركات في السعودية تشمل تصميم المواقع، تطبيقات الويب، أنظمة CRM وERP، الأتمتة والذكاء الاصطناعي للشركات الناشئة والمتوسطة.',
            primaryKeyword: 'شركة برمجيات في السعودية',
            secondaryKeywords: ['شركة تطوير مواقع في السعودية', 'شركة CRM في السعودية', 'شركة ERP في السعودية', 'حلول ذكاء اصطناعي للشركات في السعودية'],
        },
        english: {
            h1: 'Software and business systems development for companies in Saudi Arabia',
            seoTitle: 'Software Company in Saudi Arabia | Websites, CRM & ERP',
            seoDescription: 'CloudTopia builds company websites, web applications, CRM, ERP, automation, and AI solutions for startups and growing businesses in Saudi Arabia.',
            primaryKeyword: 'software company in Saudi Arabia',
            secondaryKeywords: ['web development company in Saudi Arabia', 'CRM development Saudi Arabia', 'ERP systems Saudi Arabia', 'AI automation Saudi Arabia'],
        },
    },
    {
        code: 'ae',
        slug: 'united-arab-emirates',
        countryNameArabic: 'الإمارات',
        countryNameEnglish: 'United Arab Emirates',
        marketNameArabic: 'السوق الإماراتي',
        marketNameEnglish: 'UAE market',
        hreflangArabic: 'ar-AE',
        hreflangEnglish: 'en-AE',
        currency: 'AED',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#00732F',
            secondaryAccent: '#CE1126',
            darkAccent: '#111111',
            surface: '#F2F5F3',
            softAccent: '#DCE8E1',
            ink: '#101312',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Burj_Khalifa_2021.jpg',
                altArabic: 'برج خليفة في دبي، الإمارات العربية المتحدة',
                altEnglish: 'Burj Khalifa in Dubai, United Arab Emirates',
                captionArabic: 'دبي وسوق سريع يحتاج تجربة رقمية مرتبة من أول زيارة.',
                captionEnglish: 'Dubai and a fast market that needs a polished digital experience from the first visit.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في الإمارات',
            seoTitle: 'شركة برمجيات في الإمارات | مواقع، CRM، ERP وحلول AI',
            seoDescription: 'حلول برمجية للشركات في الإمارات: مواقع احترافية، تطبيقات ويب، CRM، ERP، أتمتة وذكاء اصطناعي بتصميم عصري وتجربة عالية الجودة.',
            primaryKeyword: 'شركة برمجيات في الإمارات',
            secondaryKeywords: ['شركة تطوير مواقع في الإمارات', 'شركة CRM في دبي', 'ERP للشركات في الإمارات', 'حلول AI للشركات في الإمارات'],
        },
        english: {
            h1: 'Software and website development for companies in the United Arab Emirates',
            seoTitle: 'Software Company in UAE | Websites, CRM, ERP & AI',
            seoDescription: 'CloudTopia delivers premium websites, web apps, CRM, ERP, automation, and AI solutions for companies across the United Arab Emirates.',
            primaryKeyword: 'software company in UAE',
            secondaryKeywords: ['web development UAE', 'CRM company Dubai', 'ERP systems UAE', 'AI solutions UAE'],
        },
    },
    {
        code: 'om',
        slug: 'oman',
        countryNameArabic: 'عُمان',
        countryNameEnglish: 'Oman',
        marketNameArabic: 'السوق العماني',
        marketNameEnglish: 'Oman market',
        hreflangArabic: 'ar-OM',
        hreflangEnglish: 'en-OM',
        currency: 'OMR',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#C8102E',
            secondaryAccent: '#007A3D',
            darkAccent: '#1F2A22',
            surface: '#F6EFE6',
            softAccent: '#E7D7C2',
            ink: '#201A14',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Al_Alam_Palace.jpg',
                altArabic: 'قصر العلم في مسقط، عُمان',
                altEnglish: 'Al Alam Palace in Muscat, Oman',
                captionArabic: 'مسقط وسوق يفضل الوضوح، الثقة، وتنفيذ المشاريع بهدوء.',
                captionEnglish: 'Muscat and a market that values clarity, trust, and calm execution.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في عمان',
            seoTitle: 'شركة برمجيات في عمان | مواقع وأنظمة CRM وERP',
            seoDescription: 'كلاود توبيا تساعد الشركات في عمان على بناء مواقع احترافية، أنظمة إدارة، CRM، ERP، حلول سحابية وأتمتة رقمية قابلة للتوسع.',
            primaryKeyword: 'شركة برمجيات في عمان',
            secondaryKeywords: ['شركة تطوير مواقع في عمان', 'CRM في عمان', 'ERP في عمان', 'حلول سحابية للشركات في عمان'],
        },
        english: {
            h1: 'Software and website development for companies in Oman',
            seoTitle: 'Software Company in Oman | Websites, CRM & ERP Systems',
            seoDescription: 'CloudTopia helps Oman businesses build professional websites, management systems, CRM, ERP, cloud solutions, and scalable digital automation.',
            primaryKeyword: 'software company in Oman',
            secondaryKeywords: ['web development Oman', 'CRM Oman', 'ERP Oman', 'cloud systems Oman'],
        },
    },
    {
        code: 'qa',
        slug: 'qatar',
        countryNameArabic: 'قطر',
        countryNameEnglish: 'Qatar',
        marketNameArabic: 'السوق القطري',
        marketNameEnglish: 'Qatar market',
        hreflangArabic: 'ar-QA',
        hreflangEnglish: 'en-QA',
        currency: 'QAR',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#8A1538',
            secondaryAccent: '#0EA5B7',
            darkAccent: '#26111A',
            surface: '#F7F1F3',
            softAccent: '#EAD7DF',
            ink: '#211017',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/The_Pearl_Marina_in_Nov_2013.jpg',
                altArabic: 'مرسى اللؤلؤة في الدوحة، قطر',
                altEnglish: 'The Pearl marina in Doha, Qatar',
                captionArabic: 'الدوحة وسوق يهتم بالصورة الاحترافية وسرعة المتابعة.',
                captionEnglish: 'Doha and a market focused on professional presence and quick follow-up.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في قطر',
            seoTitle: 'شركة برمجيات في قطر | مواقع، CRM، ERP وأتمتة',
            seoDescription: 'حلول برمجية وسحابية للشركات في قطر تشمل تطوير المواقع، تطبيقات الويب، CRM، ERP، الأتمتة والذكاء الاصطناعي.',
            primaryKeyword: 'شركة برمجيات في قطر',
            secondaryKeywords: ['شركة CRM في قطر', 'تطوير مواقع في قطر', 'ERP للشركات في قطر', 'أتمتة أعمال في قطر'],
        },
        english: {
            h1: 'Software and business systems development for companies in Qatar',
            seoTitle: 'Software Company in Qatar | Websites, CRM, ERP & Automation',
            seoDescription: 'CloudTopia builds software and cloud solutions for Qatar companies, including websites, web apps, CRM, ERP, automation, and AI workflows.',
            primaryKeyword: 'software company in Qatar',
            secondaryKeywords: ['CRM company Qatar', 'web development Qatar', 'ERP Qatar', 'business automation Qatar'],
        },
    },
    {
        code: 'kw',
        slug: 'kuwait',
        countryNameArabic: 'الكويت',
        countryNameEnglish: 'Kuwait',
        marketNameArabic: 'السوق الكويتي',
        marketNameEnglish: 'Kuwait market',
        hreflangArabic: 'ar-KW',
        hreflangEnglish: 'en-KW',
        currency: 'KWD',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#007A3D',
            secondaryAccent: '#CE1126',
            darkAccent: '#111111',
            surface: '#F3F5F4',
            softAccent: '#DDE6E1',
            ink: '#111513',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Kuwait_City_Skyline_1.jpg',
                altArabic: 'أفق مدينة الكويت',
                altEnglish: 'Kuwait City skyline',
                captionArabic: 'مدينة الكويت وسوق يحتاج مواقع واضحة وأنظمة تسهّل البيع.',
                captionEnglish: 'Kuwait City and a market that needs clear websites and sales-ready systems.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في الكويت',
            seoTitle: 'شركة برمجيات في الكويت | مواقع، CRM، ERP وذكاء اصطناعي',
            seoDescription: 'كلاود توبيا تقدم للشركات في الكويت حلول مواقع، أنظمة CRM وERP، تطبيقات ويب، أتمتة وذكاء اصطناعي لتطوير العمليات والمبيعات.',
            primaryKeyword: 'شركة برمجيات في الكويت',
            secondaryKeywords: ['تطوير مواقع في الكويت', 'CRM في الكويت', 'ERP في الكويت', 'ذكاء اصطناعي للشركات في الكويت'],
        },
        english: {
            h1: 'Software and website development for companies in Kuwait',
            seoTitle: 'Software Company in Kuwait | Websites, CRM, ERP & AI',
            seoDescription: 'CloudTopia provides Kuwait businesses with websites, CRM and ERP systems, web applications, automation, and AI solutions for operations and sales.',
            primaryKeyword: 'software company in Kuwait',
            secondaryKeywords: ['web development Kuwait', 'CRM Kuwait', 'ERP Kuwait', 'AI automation Kuwait'],
        },
    },
    {
        code: 'bh',
        slug: 'bahrain',
        countryNameArabic: 'البحرين',
        countryNameEnglish: 'Bahrain',
        marketNameArabic: 'السوق البحريني',
        marketNameEnglish: 'Bahrain market',
        hreflangArabic: 'ar-BH',
        hreflangEnglish: 'en-BH',
        currency: 'BHD',
        phoneGroup: 'gcc',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#0F766E',
            darkAccent: '#261111',
            surface: '#F7F2F2',
            softAccent: '#EADDDD',
            ink: '#201414',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Manama%2C_Bahrain_Decembre_2014.jpg',
                altArabic: 'أفق المنامة في البحرين',
                altEnglish: 'Manama skyline in Bahrain',
                captionArabic: 'المنامة وسوق قريب من العميل يحتاج سرعة في التواصل.',
                captionEnglish: 'Manama and a customer-close market that needs fast communication.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في البحرين',
            seoTitle: 'شركة برمجيات في البحرين | مواقع، CRM، ERP وحلول AI',
            seoDescription: 'حلول برمجية للشركات في البحرين تشمل المواقع الاحترافية، تطبيقات الويب، CRM، ERP، الأتمتة، والذكاء الاصطناعي.',
            primaryKeyword: 'شركة برمجيات في البحرين',
            secondaryKeywords: ['تطوير مواقع في البحرين', 'CRM في البحرين', 'ERP في البحرين', 'حلول AI في البحرين'],
        },
        english: {
            h1: 'Software and systems development for companies in Bahrain',
            seoTitle: 'Software Company in Bahrain | Websites, CRM, ERP & AI',
            seoDescription: 'CloudTopia builds professional websites, web applications, CRM, ERP, automation, and AI solutions for companies in Bahrain.',
            primaryKeyword: 'software company in Bahrain',
            secondaryKeywords: ['web development Bahrain', 'CRM Bahrain', 'ERP Bahrain', 'AI solutions Bahrain'],
        },
    },
    {
        code: 'iq',
        slug: 'iraq',
        countryNameArabic: 'العراق',
        countryNameEnglish: 'Iraq',
        marketNameArabic: 'السوق العراقي',
        marketNameEnglish: 'Iraq market',
        hreflangArabic: 'ar-IQ',
        hreflangEnglish: 'en-IQ',
        currency: 'USD',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#007A3D',
            darkAccent: '#141414',
            surface: '#F4F0EA',
            softAccent: '#E2D4C3',
            ink: '#1E1712',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/5628442718_b10fc2c47f_o.jpg',
                altArabic: 'مشهد حضري من بغداد في العراق',
                altEnglish: 'Urban view from Baghdad, Iraq',
                captionArabic: 'بغداد وسوق يحتاج حلولاً عملية لتنظيم الطلبات والعملاء.',
                captionEnglish: 'Baghdad and a market that needs practical systems for orders and customers.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في العراق',
            seoTitle: 'شركة برمجيات في العراق | مواقع، CRM، ERP وأنظمة أعمال',
            seoDescription: 'كلاود توبيا تقدم حلول برمجية للشركات في العراق: تصميم مواقع، تطبيقات ويب، CRM، ERP، أنظمة إدارة، وأتمتة رقمية.',
            primaryKeyword: 'شركة برمجيات في العراق',
            secondaryKeywords: ['تطوير مواقع في العراق', 'CRM في العراق', 'ERP في العراق', 'أنظمة أعمال في العراق'],
        },
        english: {
            h1: 'Software and website development for companies in Iraq',
            seoTitle: 'Software Company in Iraq | Websites, CRM, ERP & Systems',
            seoDescription: 'CloudTopia provides Iraq businesses with websites, web applications, CRM, ERP, management systems, and digital automation.',
            primaryKeyword: 'software company in Iraq',
            secondaryKeywords: ['web development Iraq', 'CRM Iraq', 'ERP Iraq', 'business systems Iraq'],
        },
    },
    {
        code: 'tr',
        slug: 'turkey',
        countryNameArabic: 'تركيا',
        countryNameEnglish: 'Turkey',
        marketNameArabic: 'السوق التركي',
        marketNameEnglish: 'Turkey market',
        hreflangArabic: 'ar-TR',
        hreflangEnglish: 'en-TR',
        currency: 'USD',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#E30A17',
            secondaryAccent: '#0369A1',
            darkAccent: '#171316',
            surface: '#F5F1EE',
            softAccent: '#E6DBD3',
            ink: '#1C1615',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Historical_peninsula_and_modern_skyline_of_Istanbul.jpg',
                altArabic: 'شبه الجزيرة التاريخية وأفق إسطنبول الحديث في تركيا',
                altEnglish: 'Historical peninsula and modern Istanbul skyline in Turkey',
                captionArabic: 'إسطنبول وسوق يجمع التجارة، الخدمات، والعمل الرقمي اليومي.',
                captionEnglish: 'Istanbul and a market where trade, services, and daily digital work meet.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في تركيا',
            seoTitle: 'شركة برمجيات في تركيا | مواقع، CRM، ERP وحلول سحابية',
            seoDescription: 'حلول برمجية للشركات العربية والتركية في تركيا تشمل تصميم المواقع، تطبيقات الويب، CRM، ERP، الأتمتة والحلول السحابية.',
            primaryKeyword: 'شركة برمجيات في تركيا',
            secondaryKeywords: ['تطوير مواقع في تركيا', 'CRM في تركيا', 'ERP في تركيا', 'حلول سحابية في تركيا'],
        },
        english: {
            h1: 'Software and website development for companies in Turkey',
            seoTitle: 'Software Company in Turkey | Websites, CRM, ERP & Cloud',
            seoDescription: 'CloudTopia builds websites, web applications, CRM, ERP, automation, and cloud solutions for Arab and Turkish companies in Turkey.',
            primaryKeyword: 'software company in Turkey',
            secondaryKeywords: ['web development Turkey', 'CRM Turkey', 'ERP Turkey', 'cloud solutions Turkey'],
        },
    },
    {
        code: 'sy',
        slug: 'syria',
        countryNameArabic: 'سوريا',
        countryNameEnglish: 'Syria',
        marketNameArabic: 'السوق السوري',
        marketNameEnglish: 'Syria market',
        hreflangArabic: 'ar-SY',
        hreflangEnglish: 'en-SY',
        currency: 'USD',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#007A3D',
            darkAccent: '#161414',
            surface: '#F3EEE7',
            softAccent: '#DED0C0',
            ink: '#1D1712',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Damascus_from_qasioun_mountain.jpg',
                altArabic: 'دمشق من جبل قاسيون في سوريا',
                altEnglish: 'Damascus from Mount Qasioun in Syria',
                captionArabic: 'دمشق وسوق يحتاج حضوراً رقمياً واضحاً للشركات والخدمات.',
                captionEnglish: 'Damascus and a market that needs clear digital presence for companies and services.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في سوريا',
            seoTitle: 'شركة برمجيات في سوريا | مواقع، CRM، ERP وأنظمة أعمال',
            seoDescription: 'كلاود توبيا تساعد الشركات السورية على بناء مواقع احترافية، أنظمة إدارة، CRM، ERP، وتطبيقات ويب قابلة للتوسع.',
            primaryKeyword: 'شركة برمجيات في سوريا',
            secondaryKeywords: ['تطوير مواقع في سوريا', 'CRM في سوريا', 'ERP في سوريا', 'أنظمة أعمال في سوريا'],
        },
        english: {
            h1: 'Software and website development for companies in Syria',
            seoTitle: 'Software Company in Syria | Websites, CRM, ERP & Systems',
            seoDescription: 'CloudTopia helps Syrian companies build professional websites, management systems, CRM, ERP, and scalable web applications.',
            primaryKeyword: 'software company in Syria',
            secondaryKeywords: ['web development Syria', 'CRM Syria', 'ERP Syria', 'business systems Syria'],
        },
    },
    {
        code: 'jo',
        slug: 'jordan',
        countryNameArabic: 'الأردن',
        countryNameEnglish: 'Jordan',
        marketNameArabic: 'السوق الأردني',
        marketNameEnglish: 'Jordan market',
        hreflangArabic: 'ar-JO',
        hreflangEnglish: 'en-JO',
        currency: 'JOD',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#007A3D',
            darkAccent: '#111111',
            surface: '#F4EFE8',
            softAccent: '#E2D6C8',
            ink: '#1E1712',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/New_Abdali_2024.png',
                altArabic: 'منطقة العبدلي الحديثة في عمّان، الأردن',
                altEnglish: 'New Abdali district in Amman, Jordan',
                captionArabic: 'عمّان وسوق يعتمد على الثقة، المتابعة، وتنظيم بيانات العملاء.',
                captionEnglish: 'Amman and a market built on trust, follow-up, and organized customer data.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في الأردن',
            seoTitle: 'شركة برمجيات في الأردن | مواقع، CRM، ERP وحلول AI',
            seoDescription: 'حلول برمجية للشركات في الأردن تشمل المواقع الاحترافية، تطبيقات الويب، CRM، ERP، الأتمتة والذكاء الاصطناعي.',
            primaryKeyword: 'شركة برمجيات في الأردن',
            secondaryKeywords: ['تطوير مواقع في الأردن', 'CRM في الأردن', 'ERP في الأردن', 'حلول AI في الأردن'],
        },
        english: {
            h1: 'Software and systems development for companies in Jordan',
            seoTitle: 'Software Company in Jordan | Websites, CRM, ERP & AI',
            seoDescription: 'CloudTopia builds professional websites, web applications, CRM, ERP, automation, and AI solutions for companies in Jordan.',
            primaryKeyword: 'software company in Jordan',
            secondaryKeywords: ['web development Jordan', 'CRM Jordan', 'ERP Jordan', 'AI solutions Jordan'],
        },
    },
    {
        code: 'eg',
        slug: 'egypt',
        countryNameArabic: 'مصر',
        countryNameEnglish: 'Egypt',
        marketNameArabic: 'السوق المصري',
        marketNameEnglish: 'Egypt market',
        hreflangArabic: 'ar-EG',
        hreflangEnglish: 'en-EG',
        currency: 'EGP',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#C0932B',
            darkAccent: '#1D1712',
            surface: '#F4F0EA',
            softAccent: '#E5D7BE',
            ink: '#1D1712',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Cairo_From_Tower_%28cropped%29.jpg/1280px-Cairo_From_Tower_%28cropped%29.jpg',
                altArabic: 'أفق مدينة القاهرة في مصر',
                altEnglish: 'Cairo skyline in Egypt',
                captionArabic: 'القاهرة وسوق عربي واسع يحتاج محتوى واضحاً وأنظمة قابلة للتوسع.',
                captionEnglish: 'Cairo and a large Arabic market that needs clear content and scalable systems.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في مصر',
            seoTitle: 'شركة برمجيات في مصر | مواقع، CRM، ERP وحلول AI',
            seoDescription: 'كلاود توبيا تساعد الشركات في مصر على بناء مواقع احترافية، متاجر إلكترونية، CRM، ERP، تطبيقات ويب، أتمتة وحلول ذكاء اصطناعي.',
            primaryKeyword: 'شركة برمجيات في مصر',
            secondaryKeywords: ['تطوير مواقع في مصر', 'CRM في مصر', 'ERP في مصر', 'حلول AI في مصر'],
        },
        english: {
            h1: 'Software and website development for companies in Egypt',
            seoTitle: 'Software Company in Egypt | Websites, CRM, ERP & AI',
            seoDescription: 'CloudTopia helps Egypt businesses build professional websites, online stores, CRM, ERP, web applications, automation, and AI solutions.',
            primaryKeyword: 'software company in Egypt',
            secondaryKeywords: ['web development Egypt', 'CRM Egypt', 'ERP Egypt', 'AI solutions Egypt'],
        },
    },
    {
        code: 'lb',
        slug: 'lebanon',
        countryNameArabic: 'لبنان',
        countryNameEnglish: 'Lebanon',
        marketNameArabic: 'السوق اللبناني',
        marketNameEnglish: 'Lebanon market',
        hreflangArabic: 'ar-LB',
        hreflangEnglish: 'en-LB',
        currency: 'USD',
        phoneGroup: 'turkey',
        theme: {
            primaryAccent: '#CE1126',
            secondaryAccent: '#007A3D',
            darkAccent: '#172016',
            surface: '#F2F4EC',
            softAccent: '#DDE6D1',
            ink: '#151C12',
            photo: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Beirut_skyline.jpg/1280px-Beirut_skyline.jpg',
                altArabic: 'أفق مدينة بيروت في لبنان',
                altEnglish: 'Beirut skyline in Lebanon',
                captionArabic: 'بيروت وسوق يحتاج مواقع سريعة ورسائل واضحة وتجربة أنيقة.',
                captionEnglish: 'Beirut and a market that needs fast websites, clear messaging, and elegant UX.',
            },
        },
        arabic: {
            h1: 'شركة برمجيات في لبنان',
            seoTitle: 'شركة برمجيات في لبنان | مواقع، CRM، ERP وحلول رقمية',
            seoDescription: 'كلاود توبيا تقدم للشركات في لبنان حلول مواقع، تطبيقات ويب، CRM، ERP، أتمتة، وحلول ذكاء اصطناعي لتطوير حضورها الرقمي.',
            primaryKeyword: 'شركة برمجيات في لبنان',
            secondaryKeywords: ['تطوير مواقع في لبنان', 'CRM في لبنان', 'ERP في لبنان', 'حلول رقمية في لبنان'],
        },
        english: {
            h1: 'Software and website development for companies in Lebanon',
            seoTitle: 'Software Company in Lebanon | Websites, CRM, ERP & Cloud',
            seoDescription: 'CloudTopia provides Lebanon businesses with websites, web applications, CRM, ERP, automation, and AI solutions to improve digital growth.',
            primaryKeyword: 'software company in Lebanon',
            secondaryKeywords: ['web development Lebanon', 'CRM Lebanon', 'ERP Lebanon', 'digital solutions Lebanon'],
        },
    },
]

function createPricingPackages(currency: string): CountryPricingPackage[] {
    const arabicCurrency = currencyNamesArabic[currency] || `بعملة ${currency}`

    return [
        {
            key: 'starter',
            title: { ar: 'باقة الانطلاق', en: 'Launch Package' },
            description: { ar: 'للمواقع التعريفية والحضور الرقمي الأول.', en: 'For company websites and a strong first digital presence.' },
            priceNote: { ar: `أنسب سعر ${arabicCurrency} مقابل جودة تنفيذ عالية`, en: `Best-value ${currency} pricing for high-quality delivery` },
            features: {
                ar: ['استشارة مجانية', 'معاينة ديمو مجانية حسب الاستفسار', 'موقع تعريفي احترافي', 'تصميم متجاوب', 'صفحات أساسية', 'ربط واتساب', 'SEO أساسي', 'نموذج تواصل'],
                en: ['Free consultation', 'Free demo preview based on the inquiry', 'Professional company website', 'Responsive design', 'Core pages', 'WhatsApp integration', 'Basic SEO', 'Contact form'],
            },
        },
        {
            key: 'growth',
            title: { ar: 'باقة النمو', en: 'Growth Package' },
            description: { ar: 'للشركات التي تحتاج محتوى، قياس، وإدارة عملاء محتملين.', en: 'For growing teams that need content, tracking, and lead management.' },
            priceNote: { ar: `سعر مناسب ${arabicCurrency} حسب حجم المشروع`, en: `Scoped by project size in ${currency}` },
            features: {
                ar: ['استشارة ومعاينة ديمو مجاناً', 'موقع احترافي', 'مدونة أو صفحات خدمات', 'لوحة تحكم بسيطة', 'CRM بسيط أو إدارة Leads', 'تحسين SEO', 'ربط واتساب وتحليلات'],
                en: ['Free consultation and demo preview', 'Professional website', 'Blog or service pages', 'Simple dashboard', 'Light CRM or lead management', 'SEO improvements', 'WhatsApp and analytics'],
            },
        },
        {
            key: 'systems',
            title: { ar: 'باقة الأنظمة', en: 'Systems Package' },
            description: { ar: 'للأنظمة المخصصة، لوحات التحكم، CRM، ERP، والأتمتة.', en: 'For custom systems, dashboards, CRM, ERP, and automation.' },
            priceNote: { ar: 'يتم تحديد السعر بعد فهم المتطلبات', en: 'Final pricing is defined after requirements discovery' },
            features: {
                ar: ['استشارة مجانية قبل تحديد النطاق', 'ديمو أولي مجاني عند مناسبة الفكرة', 'تطبيق ويب أو تطبيق جوال', 'لوحة تحكم', 'وحدات CRM/ERP', 'ترحيل سحابي أو نقل بيانات عند الحاجة', 'أتمتة وخصائص AI', 'نشر سحابي وصيانة'],
                en: ['Free consultation before scope definition', 'Free initial demo when the idea fits', 'Web app or mobile app', 'Dashboard', 'CRM/ERP modules', 'Cloud migration or data migration when needed', 'Automation and AI features', 'Cloud deployment and maintenance'],
            },
        },
    ]
}

function createTestimonials(seed: Seed): CountryTestimonial[] {
    const countryNames: Record<string, string[]> = {
        sa: ['عبدالله', 'نورة', 'ماجد'],
        ae: ['راشد', 'مريم', 'خالد'],
        om: ['سالم', 'ليلى', 'حمد'],
        qa: ['ناصر', 'العنود', 'فهد'],
        kw: ['فهد', 'دلال', 'مشاري'],
        bh: ['علي', 'فاطمة', 'حسن'],
        iq: ['حيدر', 'زهراء', 'عمر'],
        tr: ['كريم', 'نور', 'إياد'],
        sy: ['سامر', 'رنا', 'ليث'],
        jo: ['أحمد', 'لين', 'يزن'],
        eg: ['محمد', 'ياسمين', 'عمر'],
        lb: ['جورج', 'نادين', 'رامي'],
    }
    const names = countryNames[seed.code] || ['كريم', 'نور', 'ليث']

    return [
        {
            name: names[0],
            roleArabic: `صاحب شركة خدمات في ${seed.countryNameArabic}`,
            roleEnglish: `Services company owner in ${seed.countryNameEnglish}`,
            quoteArabic: 'الاستشارة المجانية ساعدتنا نفهم هل نحتاج موقعاً فقط أم موقعاً مع CRM ولوحة متابعة. الديمو الأولي جعل القرار أسهل.',
            quoteEnglish: 'The free consultation helped us understand whether we needed only a website or a website with CRM and a dashboard. The preview made the decision easier.',
        },
        {
            name: names[1],
            roleArabic: `مسؤولة مبيعات في ${seed.countryNameArabic}`,
            roleEnglish: `Sales lead in ${seed.countryNameEnglish}`,
            quoteArabic: 'كان التركيز على الطلبات والعملاء وليس على شكل الصفحة فقط. ربط واتساب والنماذج والمتابعة اختصر وقت فريق المبيعات.',
            quoteEnglish: 'The focus was on inquiries and customers, not just page design. Connecting WhatsApp, forms, and follow-up saved the sales team time.',
        },
        {
            name: names[2],
            roleArabic: `مدير عمليات في ${seed.countryNameArabic}`,
            roleEnglish: `Operations manager in ${seed.countryNameEnglish}`,
            quoteArabic: 'أعجبني أن الخطة شملت النظام والبيانات والاستضافة، وليس الموقع فقط. كل مرحلة كان لها هدف واضح قبل الانتقال للمرحلة التالية.',
            quoteEnglish: 'I liked that the plan covered the system, data, and hosting, not only the website. Every stage had a clear goal before moving forward.',
        },
    ]
}

function createFaqs(seed: Seed): Record<CountryLocale, CountryFAQ[]> {
    const arabicCurrency = currencyNamesArabic[seed.currency] || `بعملة ${seed.currency}`

    return {
        ar: [
            { question: `هل تقدمون خدمات برمجية للشركات في ${seed.countryNameArabic}؟`, answer: `نعم، نخدم الشركات في ${seed.countryNameArabic} عن بُعد باحترافية كاملة من خلال واتساب، اجتماعات أونلاين، وخطة تنفيذ واضحة.` },
            { question: 'هل الاستشارة ومعاينة الديمو مجانية؟', answer: 'نعم. نقدم استشارة مجانية ونراجع استفسار شركتك، وإذا كانت الفكرة واضحة نجهز معاينة ديمو أو تصور أولي مجاني قبل الاتفاق على التنفيذ.' },
            { question: `كم تكلفة تصميم موقع شركة في ${seed.countryNameArabic}؟`, answer: `تعتمد التكلفة على عدد الصفحات، المحتوى، التكاملات، ومستوى التصميم. نبدأ باستشارة مجانية ثم نقدم عرض سعر واضح ${arabicCurrency} مع أفضل جودة ممكنة ضمن نطاق المشروع.` },
            { question: 'هل يمكن بناء CRM مخصص؟', answer: 'نعم. يمكننا بناء CRM لإدارة العملاء المحتملين، المتابعات، مراحل البيع، التقارير، وربطه مع الموقع أو واتساب عند الحاجة.' },
            { question: 'هل تقدمون ترحيل سحابي أو نقل بيانات؟', answer: 'نعم. ننفذ ترحيل المواقع والتطبيقات وقواعد البيانات إلى السحابة، ونساعد في تنظيم البيانات وربطها بلوحات التحكم أو أنظمة CRM وERP.' },
            { question: 'هل تطورون تطبيقات جوال؟', answer: 'نعم. يمكننا تطوير تطبيقات جوال أو تطبيقات ويب تقدمية PWA حسب احتياج الشركة، مع لوحة تحكم وربط مع الدفع، الحجز، الطلبات، أو خدمة العملاء.' },
            { question: 'هل يمكن ربط الموقع مع واتساب؟', answer: 'نعم. نربط أزرار واتساب، رسائل جاهزة، نماذج تواصل، ويمكن توسيع الربط لاحقاً مع WhatsApp Business حسب المتطلبات.' },
            { question: `هل تقدمون SEO محلي في ${seed.countryNameArabic}؟`, answer: `نعم. نهيئ العناوين، المحتوى، البنية التقنية، الأسئلة الشائعة، والروابط الداخلية لاستهداف بحث الشركات في ${seed.countryNameArabic} دون حشو كلمات مفتاحية.` },
            { question: 'هل يمكن تنفيذ المشروع عن بُعد؟', answer: 'نعم. ننجز المشروع عن بُعد من خلال اجتماعات أونلاين، واتساب، وتسليمات مرحلية واضحة.' },
            { question: 'هل يمكن بناء نظام ERP أو إدارة مخزون؟', answer: 'نعم. ننفذ وحدات مخصصة للعمليات، المخزون، الطلبات، الفواتير، الصلاحيات، والتقارير حسب طريقة عمل شركتك.' },
            { question: 'كيف أبدأ مع كلاود توبيا؟', answer: 'أرسل لنا فكرة المشروع عبر واتساب، وسنراجع الاحتياج ونقترح نطاقاً عملياً وخطوات تنفيذ مناسبة.' },
        ],
        en: [
            { question: `Do you provide software services for companies in ${seed.countryNameEnglish}?`, answer: `Yes. CloudTopia serves companies in ${seed.countryNameEnglish} remotely through WhatsApp, online meetings, and clear phased delivery.` },
            { question: 'Is the consultation and demo preview free?', answer: 'Yes. We review the company inquiry for free, and when the idea is clear we prepare a free demo preview or initial direction before execution starts.' },
            { question: `How much does a company website cost in ${seed.countryNameEnglish}?`, answer: `Cost depends on pages, content, integrations, and design depth. We define the scope first, then provide a clear quote in ${seed.currency}.` },
            { question: 'Can you build a custom CRM?', answer: 'Yes. We can build CRM workflows for leads, follow-ups, sales stages, reporting, and integrations with your website or WhatsApp.' },
            { question: 'Do you provide cloud migration or data migration?', answer: 'Yes. We migrate websites, applications, and databases to cloud infrastructure, and help organize data for dashboards, CRM, ERP, and reporting systems.' },
            { question: 'Do you develop mobile apps?', answer: 'Yes. We can develop mobile apps or progressive web apps with dashboards, payment flows, booking, order management, or customer care integrations.' },
            { question: 'Can the website connect with WhatsApp?', answer: 'Yes. We add WhatsApp CTAs, prefilled messages, contact flows, and can expand into WhatsApp Business integration when needed.' },
            { question: `Do you provide local SEO for ${seed.countryNameEnglish}?`, answer: `Yes. We structure metadata, content, FAQs, internal links, and technical SEO for ${seed.countryNameEnglish} search intent without keyword stuffing.` },
            { question: 'Can the project be delivered remotely?', answer: 'Yes. Delivery happens through online meetings, WhatsApp communication, and clear milestone-based handoffs.' },
            { question: 'Can you build ERP or inventory systems?', answer: 'Yes. We build custom modules for operations, inventory, orders, invoices, roles, and reporting based on your business process.' },
            { question: 'How do I start with CloudTopia?', answer: 'Send us your project idea on WhatsApp. We will review the need, suggest a practical scope, and define the next steps.' },
        ],
    }
}

function buildContent(seed: Seed): Record<CountryLocale, CountryLandingContent> {
    const marketAngle = marketAngles[seed.code] || marketAngles.sa
    const arabicSecondaryKeywords = [
        ...seed.arabic.secondaryKeywords,
        `تطوير تطبيقات في ${seed.countryNameArabic}`,
        `تطوير تطبيقات جوال في ${seed.countryNameArabic}`,
        `ترحيل سحابي في ${seed.countryNameArabic}`,
        `نقل بيانات للشركات في ${seed.countryNameArabic}`,
        `أتمتة بالذكاء الاصطناعي في ${seed.countryNameArabic}`,
        `خدمة عملاء بالذكاء الاصطناعي في ${seed.countryNameArabic}`,
    ]
    const englishSecondaryKeywords = [
        ...seed.english.secondaryKeywords,
        `app development in ${seed.countryNameEnglish}`,
        `mobile app development in ${seed.countryNameEnglish}`,
        `cloud migration in ${seed.countryNameEnglish}`,
        `data migration for companies in ${seed.countryNameEnglish}`,
        `AI automation in ${seed.countryNameEnglish}`,
        `AI customer care in ${seed.countryNameEnglish}`,
    ]

    return {
        ar: {
            seoTitle: seed.arabic.seoTitle,
            seoDescription: seed.arabic.seoDescription,
            h1: seed.arabic.h1,
            heroSubtitle: `نطوّر مواقع احترافية، تطبيقات ويب، تطبيقات جوال، وأنظمة CRM وERP للشركات في ${seed.countryNameArabic}. نبدأ باستشارة مجانية ومعاينة ديمو مجانية مخصصة حسب استفسار شركتك قبل أي التزام.`,
            marketProblem: `عندما تبحث شركة في ${seed.countryNameArabic} عن شركة برمجيات أو شركة تطوير مواقع، فهي غالباً تحتاج إلى أكثر من تصميم موقع. تحتاج موقعاً سريعاً، نظاماً لإدارة العملاء، لوحة تحكم للطلبات، نقل بيانات، ترحيل سحابي، وربطاً عملياً بين المبيعات والتشغيل وخدمة العملاء. ${marketAngle.ar}`,
            solutionIntro: 'نبدأ من احتياجك الفعلي: موقع شركة، تطبيق ويب، تطبيق جوال، نظام عمل داخلي، CRM، ERP، متجر، ترحيل سحابي، نقل بيانات، خدمة عملاء ذكية، أو أتمتة بالذكاء الاصطناعي. ثم نحولها إلى نطاق واضح يمكن تنفيذه وقياسه.',
            whyCloudTopia: `كلاود توبيا مناسبة للشركات التي تريد تنفيذ برمجي واضح دون تعقيد. نخدم ${seed.countryNameArabic} عن بُعد، ونقدم استشارة مجانية ومعاينة ديمو مجانية عندما يكون الاستفسار واضحاً. المهم هو جودة التنفيذ، وضوح التواصل، وتسليم قابل للاستخدام.`,
            finalCta: `تحتاج موقعاً أو نظاماً لشركتك في ${seed.countryNameArabic}؟`,
            primaryKeyword: seed.arabic.primaryKeyword,
            secondaryKeywords: arabicSecondaryKeywords,
        },
        en: {
            seoTitle: seed.english.seoTitle,
            seoDescription: seed.english.seoDescription,
            h1: seed.english.h1,
            heroSubtitle: `CloudTopia builds websites, web apps, mobile apps, CRM, ERP, cloud migration, data migration, and AI automation for companies in ${seed.countryNameEnglish}. We start with a free consultation and a free custom demo preview based on the inquiry.`,
            marketProblem: `Companies in the ${seed.marketNameEnglish} need more than a polished website. They often need lead generation pages, CRM workflows, ERP modules, mobile apps, cloud migration, data migration, dashboards, AI customer care, and automation that reduces manual work. ${marketAngle.en}`,
            solutionIntro: 'CloudTopia connects websites, web applications, mobile apps, business systems, cloud infrastructure, data migration, and AI automation so your digital presence becomes an operating system for growth.',
            whyCloudTopia: `We serve Arabic-speaking and regional companies through a clear remote delivery model. We start with a free consultation and free demo preview when the inquiry is clear, then define professional online collaboration, WhatsApp communication, and measurable scopes of work.`,
            finalCta: `Ready to turn your idea into a professional website or system in ${seed.countryNameEnglish}?`,
            primaryKeyword: seed.english.primaryKeyword,
            secondaryKeywords: englishSecondaryKeywords,
        },
    }
}

export const countryLandingPages: CountryLandingPageData[] = seeds.map((seed) => ({
    code: seed.code,
    slug: seed.slug,
    countryNameArabic: seed.countryNameArabic,
    countryNameEnglish: seed.countryNameEnglish,
    marketNameArabic: seed.marketNameArabic,
    marketNameEnglish: seed.marketNameEnglish,
    arabicUrl: `/ar/${seed.slug}`,
    englishUrl: `/${seed.slug}`,
    hreflangArabic: seed.hreflangArabic,
    hreflangEnglish: seed.hreflangEnglish,
    phone: seed.phoneGroup === 'gcc' ? GCC_PHONE : TURKEY_PHONE,
    whatsappUrl: seed.phoneGroup === 'gcc' ? GCC_WHATSAPP : TURKEY_WHATSAPP,
    currency: seed.currency,
    content: buildContent(seed),
    pricingPackages: createPricingPackages(seed.currency),
    faqs: createFaqs(seed),
    testimonials: createTestimonials(seed),
    theme: seed.theme,
}))

export const countryLandingSlugs = countryLandingPages.map((country) => country.slug)
export const countryLandingCodes = countryLandingPages.map((country) => country.code)

export function getCountryLandingPage(slug: string): CountryLandingPageData | null {
    return countryLandingPages.find((country) => country.slug === slug) || null
}

export function getCountryLandingPageByCode(code: string): CountryLandingPageData | null {
    return countryLandingPages.find((country) => country.code === code) || null
}

export function countryWhatsappUrl(country: CountryLandingPageData, locale: CountryLocale): string {
    const text = locale === 'ar'
        ? `مرحباً كلاود توبيا، أريد استشارة مجانية ومعاينة ديمو مجانية لخدمات البرمجة وتطوير المواقع والأنظمة للشركات في ${country.countryNameArabic}.`
        : `Hello CloudTopia, I want a free consultation and free demo preview for software, websites, and business systems for companies in ${country.countryNameEnglish}.`
    return `${country.whatsappUrl}?text=${encodeURIComponent(text)}`
}
