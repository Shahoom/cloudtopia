import { countryLandingPages } from '../seo/country-landing-pages.ts'
import { locations } from '../seo/locations.ts'
import {
  localizedPackageName,
  localizedServiceOutcomes,
  localizedServiceValue,
  serviceCategories,
  servicesBySlug,
} from '../seo/services.ts'
import { getBusinessSystemsSubService } from '../services/business-systems-content.ts'
import { getDigitalPresenceSubService } from '../services/digital-presence-content.ts'
import { getStructuredPillarBySlug } from '../services/structured-catalog.ts'
import { subServiceHref } from '../services/sub-service-routing.ts'

type SiteKnowledgeInput = {
  latestMessage: string
  pageUrl?: string | null
}

const countryAliases: Record<string, string[]> = {
  sa: ['saudi', 'saudi arabia', 'ksa', 'السعودية', 'سعودية', '/saudi-arabia', '/ar/sa'],
  ae: ['uae', 'emirates', 'dubai', 'abu dhabi', 'united arab emirates', 'الإمارات', 'الامارات', '/uae', '/united-arab-emirates', '/ar/ae'],
  om: ['oman', 'muscat', 'عمان', 'عُمان', '/oman', '/ar/om'],
  qa: ['qatar', 'doha', 'قطر', '/qatar', '/ar/qa'],
  kw: ['kuwait', 'الكويت', '/kuwait', '/ar/kw'],
  bh: ['bahrain', 'البحرين', '/bahrain', '/ar/bh'],
  iq: ['iraq', 'baghdad', 'erbil', 'العراق', '/iraq', '/ar/iq'],
  tr: ['turkey', 'turkiye', 'türkiye', 'istanbul', 'تركيا', '/turkey', '/tr', '/ar/tr'],
  sy: ['syria', 'damascus', 'سوريا', '/syria', '/ar/sy'],
  jo: ['jordan', 'amman', 'الأردن', 'الاردن', '/jordan', '/ar/jo'],
  lb: ['lebanon', 'beirut', 'لبنان', '/lebanon', '/ar/lb'],
  eg: ['egypt', 'cairo', 'مصر', '/egypt', '/ar/eg'],
}

const serviceAliases: Record<string, string[]> = {
  'crm-development': ['crm', 'customer relationship', 'lead management', 'متابعة العملاء'],
  'ecommerce-development': ['ecommerce', 'e-commerce', 'online store', 'متجر'],
  'business-website-development': ['website', 'company website', 'business website', 'موقع'],
  'full-stack-web-engineering': ['web app', 'platform', 'تطبيق ويب'],
  'interactive-portals-dashboards': ['portal', 'dashboard', 'booking', 'appointment', 'reservation', 'لوحة', 'حجز'],
  'ai-chatbots': ['chatbot', 'chat bot', 'ai bot', 'شات بوت', 'روبوت محادثة'],
  'ai-automation': ['automation', 'workflow automation', 'أتمتة', 'اتمتة'],
  'restaurant-and-hospitality-website-development': ['restaurant', 'qr menu', 'menu', 'مطعم', 'منيو'],
  'inventory-management-systems': ['inventory', 'stock', 'warehouse', 'مخزون'],
  'business-process-automation': ['erp', 'enterprise resource planning', 'نظام erp'],
}

const serviceCategoryHubs: Record<string, string> = {
  'digital-presence': '/services/digital-presence',
  'interactive-web-applications': '/services/web-applications',
  'mobile-app-development': '/services/app-development',
  'business-systems-development': '/services/business-systems-development',
  'cloud-infrastructure': '/services',
  'ai-powered-solutions': '/services',
}

export function buildSiteKnowledge(input: SiteKnowledgeInput) {
  const haystack = `${input.latestMessage} ${input.pageUrl ?? ''}`.toLowerCase()
  const countryKnowledge = buildCountryKnowledge(haystack)
  const serviceKnowledge = buildServiceKnowledge(haystack)

  return [countryKnowledge, serviceKnowledge].filter(Boolean).join('\n\n---\n\n')
}

function buildCountryKnowledge(haystack: string) {
  const matchedCodes = findMatchingCountryCodes(haystack)
  const selectedLandingCountries = matchedCodes.length
    ? countryLandingPages.filter((country) => matchedCodes.includes(country.code))
    : countryLandingPages.slice(0, 12)
  const selectedLocations = matchedCodes.length
    ? Object.values(locations).filter((location) => matchedCodes.includes(location.countryCode.toLowerCase()))
    : Object.values(locations).slice(0, 12)

  const lines = ['# CloudTopia Country Intelligence']
  const landingCountryCodes = new Set<string>()

  for (const country of selectedLandingCountries) {
    landingCountryCodes.add(country.code)
    const location = Object.values(locations).find((item) => item.countryCode.toLowerCase() === country.code || item.nameEn === country.countryNameEnglish)
    lines.push(
      [
        `## ${country.countryNameEnglish} / ${country.countryNameArabic}`,
        `Currency: ${country.currency}`,
        `WhatsApp route: ${country.phone}`,
        `English URL: ${country.englishUrl}`,
        `Arabic URL: ${country.arabicUrl}`,
        `Market focus EN: ${country.content.en.marketProblem}`,
        `Market focus AR: ${country.content.ar.marketProblem}`,
        `Recommended services: ${location?.services.join(', ') || 'website-design, web-applications, business-systems-development, ai-powered-solutions'}`,
        location ? `Cities: ${location.cities.join(', ')}` : null,
        location ? `Payment methods: ${location.paymentMethods.join(', ')}` : null,
        location ? `Market note EN: ${location.marketNotes.en}` : null,
        location ? `Market note AR: ${location.marketNotes.ar}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }

  for (const location of selectedLocations) {
    if (landingCountryCodes.has(location.countryCode.toLowerCase())) continue
    lines.push(
      [
        `## ${location.nameEn} / ${location.nameAr}`,
        `Currency: ${location.currency}`,
        `Country code: ${location.countryCode}`,
        `Capital: ${location.capital}`,
        `Language: ${location.language}`,
        `VAT/tax note: ${location.vatRate}`,
        `Recommended services: ${location.services.join(', ')}`,
        `Cities: ${location.cities.join(', ')}`,
        `Payment methods: ${location.paymentMethods.join(', ')}`,
        `Market insight: ${location.marketInsight}`,
        `Market note EN: ${location.marketNotes.en}`,
        `Market note AR: ${location.marketNotes.ar}`,
      ].join('\n'),
    )
  }

  return lines.join('\n\n')
}

function buildServiceKnowledge(haystack: string) {
  const matchedSlugs = findMatchingServiceSlugs(haystack)
  const selectedServices = matchedSlugs.length
    ? matchedSlugs.map((slug) => servicesBySlug[slug]).filter(Boolean)
    : serviceCategories.flatMap((category) => category.services).slice(0, 18)
  const selectedPillars = matchedSlugs
    .map((slug) => getStructuredPillarBySlug(slug))
    .filter((pillar): pillar is NonNullable<typeof pillar> => Boolean(pillar))
  const selectedSubServices = matchedSlugs
    .map((slug) => {
      const business = getBusinessSystemsSubService(slug)
      if (business) {
        return {
          slug,
          categorySlug: 'business-systems-development',
          nameEn: business.service,
          nameAr: getBusinessSystemsSubService(slug, 'ar')?.service ?? business.service,
          descriptionEn: business.hero.subtitle,
          descriptionAr: getBusinessSystemsSubService(slug, 'ar')?.hero.subtitle ?? business.hero.subtitle,
          url: subServiceHref(business.pillarSlug, business.slug),
          technologies: Array.isArray(business.tech) ? business.tech : [],
        }
      }

      const digitalPresence = getDigitalPresenceSubService(slug)
      if (digitalPresence) {
        return {
          slug,
          categorySlug: 'digital-presence',
          nameEn: digitalPresence.service,
          nameAr: getDigitalPresenceSubService(slug, 'ar')?.service ?? digitalPresence.service,
          descriptionEn: digitalPresence.hero.subtitle,
          descriptionAr: getDigitalPresenceSubService(slug, 'ar')?.hero.subtitle ?? digitalPresence.hero.subtitle,
          url: subServiceHref(digitalPresence.pillarSlug, digitalPresence.slug),
          technologies: [],
        }
      }

      return null
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))

  const lines = ['# CloudTopia Service Intelligence']

  for (const category of serviceCategories) {
    lines.push(
      [
        `## Category: ${localizedServiceValue(category.name, 'en')} / ${localizedServiceValue(category.name, 'ar')}`,
        `EN: ${localizedServiceValue(category.description, 'en')}`,
        `AR: ${localizedServiceValue(category.description, 'ar')}`,
        `Canonical hub: ${serviceCategoryHubs[category.slug] ?? '/services'}`,
        `Packages EN: ${category.packageNames.join(', ')}`,
        `Packages AR: ${category.packageNames.map((packageName) => localizedPackageName(packageName, 'ar')).join(', ')}`,
      ].join('\n'),
    )
  }

  for (const service of selectedServices) {
    lines.push(
      [
        `## ${localizedServiceValue(service.name, 'en')} / ${localizedServiceValue(service.name, 'ar')}`,
        `Slug: ${service.slug}`,
        `Category: ${service.categorySlug}`,
        `EN: ${localizedServiceValue(service.description, 'en')}`,
        `AR: ${localizedServiceValue(service.description, 'ar')}`,
        `Outcomes EN: ${localizedServiceOutcomes(service, 'en').join('; ')}`,
        `Outcomes AR: ${localizedServiceOutcomes(service, 'ar').join('; ')}`,
        `Technologies: ${service.technologies.join(', ')}`,
      ].join('\n'),
    )
  }

  for (const pillar of selectedPillars) {
    lines.push(
      [
        `## ${localizedServiceValue(pillar.name, 'en')} / ${localizedServiceValue(pillar.name, 'ar')}`,
        `Slug: ${pillar.slug}`,
        `Canonical URL: ${pillar.href}`,
        `EN: ${localizedServiceValue(pillar.description, 'en')}`,
        `AR: ${localizedServiceValue(pillar.description, 'ar')}`,
        pillar.subServices.length ? `Sub-services: ${pillar.subServices.join(', ')}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }

  for (const service of selectedSubServices) {
    lines.push(
      [
        `## ${service.nameEn} / ${service.nameAr}`,
        `Slug: ${service.slug}`,
        `Category: ${service.categorySlug}`,
        `Canonical URL: ${service.url}`,
        `EN: ${service.descriptionEn}`,
        `AR: ${service.descriptionAr}`,
        service.technologies.length ? `Technologies: ${service.technologies.join(', ')}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }

  return lines.join('\n\n')
}

function findMatchingCountryCodes(haystack: string) {
  return Object.entries(countryAliases)
    .filter(([, aliases]) => aliases.some((alias) => haystack.includes(alias.toLowerCase())))
    .map(([code]) => code)
}

function findMatchingServiceSlugs(haystack: string) {
  const matches = new Set<string>()

  for (const [slug, aliases] of Object.entries(serviceAliases)) {
    if (aliases.some((alias) => haystack.includes(alias.toLowerCase()))) matches.add(slug)
  }

  for (const service of Object.values(servicesBySlug)) {
    if (haystack.includes(service.slug)) matches.add(service.slug)
    if (haystack.includes(localizedServiceValue(service.name, 'en').toLowerCase())) matches.add(service.slug)
    if (haystack.includes(localizedServiceValue(service.name, 'ar').toLowerCase())) matches.add(service.slug)
  }

  return Array.from(matches)
}
