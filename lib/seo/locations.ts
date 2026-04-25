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
    services: string[]
    nameEn: string
    nameAr: string
    nameTr: string
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
        services: ['website-design', 'ecommerce-solutions', 'restaurant-qr-menu', 'business-systems-development', 'social-media-marketing'],
        nameEn: 'Saudi Arabia',
        nameAr: 'المملكة العربية السعودية',
        nameTr: 'Suudi Arabistan',
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
        services: ['website-design', 'ecommerce-solutions', 'web-applications', 'business-systems-development', 'social-media-marketing'],
        nameEn: 'UAE',
        nameAr: 'الإمارات العربية المتحدة',
        nameTr: 'BAE',
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
        services: ['website-design', 'ecommerce-solutions', 'restaurant-qr-menu', 'social-media-marketing'],
        nameEn: 'Kuwait',
        nameAr: 'الكويت',
        nameTr: 'Kuveyt',
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
        services: ['website-design', 'restaurant-qr-menu', 'ecommerce-solutions', 'business-systems-development'],
        nameEn: 'Qatar',
        nameAr: 'قطر',
        nameTr: 'Katar',
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
        services: ['website-design', 'ecommerce-solutions', 'business-systems-development', 'web-applications'],
        nameEn: 'Bahrain',
        nameAr: 'البحرين',
        nameTr: 'Bahreyn',
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
        services: ['website-design', 'restaurant-qr-menu', 'social-media-marketing', 'ecommerce-solutions'],
        nameEn: 'Oman',
        nameAr: 'عُمان',
        nameTr: 'Umman',
    },
}

export const locationSlugs = Object.keys(locations)

export function getLocation(slug: string): LocationData | null {
    return locations[slug] || null
}
