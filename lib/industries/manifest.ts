import type { Locale } from '@/lib/i18n/config'
import type { IndustrySlug } from '@/lib/industries/slugs'
import type { CanonicalServiceId } from '@/lib/industries/service-targets'

export type IndustryManifestEntry = {
  slug: IndustrySlug
  route: `/industries/${IndustrySlug}`
  category: 'regulated-trust' | 'commerce-place' | 'b2b-operating'
  label: Record<Locale, string>
  navSummary: Record<Locale, string>
  serviceIds: readonly CanonicalServiceId[]
  relatedIndustryIds: readonly [IndustrySlug, IndustrySlug, ...IndustrySlug[]]
  discovery: {
    hub: boolean
    header: boolean
    footer: boolean
    sitemap: boolean
  }
}

export const industryManifest = {
  healthcare: {
    slug: 'healthcare',
    route: '/industries/healthcare',
    category: 'regulated-trust',
    label: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    navSummary: {
      en: 'Patient journeys, booking, portals, and clinic workflows.',
      ar: 'رحلات المرضى والحجز والبوابات وسير عمل العيادات.',
    },
    serviceIds: ['website-development', 'web-applications', 'business-systems-development', 'content-creation'],
    relatedIndustryIds: ['education', 'government-public-sector'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  fintech: {
    slug: 'fintech',
    route: '/industries/fintech',
    category: 'regulated-trust',
    label: { en: 'FinTech', ar: 'التقنية المالية' },
    navSummary: {
      en: 'Onboarding, transaction journeys, trust, and exception workflows.',
      ar: 'التسجيل والمعاملات ومسارات الثقة والاستثناءات.',
    },
    serviceIds: ['website-development', 'web-applications', 'business-systems-development', 'content-creation'],
    relatedIndustryIds: ['professional-services', 'government-public-sector'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  'ecommerce-retail': {
    slug: 'ecommerce-retail',
    route: '/industries/ecommerce-retail',
    category: 'commerce-place',
    label: { en: 'E-commerce & Online Retail', ar: 'التجارة الإلكترونية' },
    navSummary: {
      en: 'Catalog, checkout, fulfillment, and retention.',
      ar: 'الكتالوج والدفع والتنفيذ والاحتفاظ بالعملاء.',
    },
    serviceIds: ['ecommerce-development', 'business-systems-development', 'website-development', 'social-media-marketing'],
    relatedIndustryIds: ['retail', 'logistics-supply-chain'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  'real-estate': {
    slug: 'real-estate',
    route: '/industries/real-estate',
    category: 'commerce-place',
    label: { en: 'Real Estate', ar: 'العقارات' },
    navSummary: {
      en: 'Property discovery, qualification, viewing, and agent handoff.',
      ar: 'اكتشاف العقار والتأهيل والمعاينة وتسليم الفرص للوسطاء.',
    },
    serviceIds: ['website-development', 'web-applications', 'business-systems-development', 'content-creation'],
    relatedIndustryIds: ['construction', 'professional-services'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  education: {
    slug: 'education',
    route: '/industries/education',
    category: 'regulated-trust',
    label: { en: 'Education', ar: 'التعليم' },
    navSummary: {
      en: 'Enrollment, learning, assessment, and role-based portals.',
      ar: 'التسجيل والتعلّم والتقييم والبوابات متعددة الأدوار.',
    },
    serviceIds: ['web-applications', 'website-development', 'business-systems-development', 'content-creation'],
    relatedIndustryIds: ['healthcare', 'government-public-sector'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  'travel-hospitality': {
    slug: 'travel-hospitality',
    route: '/industries/travel-hospitality',
    category: 'commerce-place',
    label: { en: 'Travel & Hospitality', ar: 'السفر والضيافة' },
    navSummary: {
      en: 'Discovery, booking, stay, and guest communication.',
      ar: 'الاكتشاف والحجز والإقامة والتواصل مع الضيوف.',
    },
    serviceIds: ['website-development', 'ecommerce-development', 'web-applications', 'content-creation'],
    relatedIndustryIds: ['restaurants', 'real-estate'],
    discovery: { hub: true, header: true, footer: true, sitemap: true },
  },
  restaurants: {
    slug: 'restaurants',
    route: '/industries/restaurants',
    category: 'commerce-place',
    label: { en: 'Restaurants', ar: 'المطاعم' },
    navSummary: {
      en: 'Menus, orders, kitchen handoffs, branches, and loyalty.',
      ar: 'القوائم والطلبات وتسليمات المطبخ والفروع والولاء.',
    },
    serviceIds: ['restaurant-qr-menu', 'website-development', 'ecommerce-development', 'social-media-marketing'],
    relatedIndustryIds: ['retail', 'travel-hospitality'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  'legal-firms': {
    slug: 'legal-firms',
    route: '/industries/legal-firms',
    category: 'regulated-trust',
    label: { en: 'Legal Firms', ar: 'مكاتب المحاماة' },
    navSummary: {
      en: 'Practice discovery, confidential intake, matters, and documents.',
      ar: 'اكتشاف الخبرات والاستقبال السري والقضايا والمستندات.',
    },
    serviceIds: ['website-development', 'web-applications', 'business-systems-development', 'content-creation'],
    relatedIndustryIds: ['professional-services', 'government-public-sector'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  construction: {
    slug: 'construction',
    route: '/industries/construction',
    category: 'b2b-operating',
    label: { en: 'Construction', ar: 'الإنشاءات' },
    navSummary: {
      en: 'Tenders, RFIs, approvals, suppliers, and milestones.',
      ar: 'المناقصات وطلبات المعلومات والاعتمادات والموردون والمراحل.',
    },
    serviceIds: ['business-systems-development', 'web-applications', 'website-development', 'content-creation'],
    relatedIndustryIds: ['real-estate', 'logistics-supply-chain'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  retail: {
    slug: 'retail',
    route: '/industries/retail',
    category: 'commerce-place',
    label: { en: 'Retail', ar: 'التجزئة' },
    navSummary: {
      en: 'Branches, stock, POS, loyalty, and omnichannel service.',
      ar: 'الفروع والمخزون ونقاط البيع والولاء والخدمة متعددة القنوات.',
    },
    serviceIds: ['ecommerce-development', 'business-systems-development', 'web-applications', 'social-media-marketing'],
    relatedIndustryIds: ['ecommerce-retail', 'restaurants'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  'professional-services': {
    slug: 'professional-services',
    route: '/industries/professional-services',
    category: 'b2b-operating',
    label: { en: 'Professional Services', ar: 'الخدمات المهنية' },
    navSummary: {
      en: 'Expertise, proposals, delivery, and client reporting.',
      ar: 'الخبرات والعروض والتنفيذ وتقارير العملاء.',
    },
    serviceIds: ['website-development', 'business-systems-development', 'web-applications', 'content-creation'],
    relatedIndustryIds: ['legal-firms', 'construction'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  'logistics-supply-chain': {
    slug: 'logistics-supply-chain',
    route: '/industries/logistics-supply-chain',
    category: 'b2b-operating',
    label: { en: 'Logistics & Supply Chain', ar: 'الخدمات اللوجستية' },
    navSummary: {
      en: 'Orders, warehouse, dispatch, exceptions, and proof.',
      ar: 'الطلبات والمستودع والتوزيع والاستثناءات والإثبات.',
    },
    serviceIds: ['business-systems-development', 'web-applications', 'website-development', 'ecommerce-development'],
    relatedIndustryIds: ['ecommerce-retail', 'retail'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
  'government-public-sector': {
    slug: 'government-public-sector',
    route: '/industries/government-public-sector',
    category: 'regulated-trust',
    label: { en: 'Government & Public Sector', ar: 'الحكومة والقطاع العام' },
    navSummary: {
      en: 'Eligibility, applications, cases, and service status.',
      ar: 'الأهلية والطلبات والمعاملات وحالة الخدمة.',
    },
    serviceIds: ['web-applications', 'business-systems-development', 'website-development', 'content-creation'],
    relatedIndustryIds: ['healthcare', 'education'],
    discovery: { hub: true, header: true, footer: false, sitemap: true },
  },
} as const satisfies Record<IndustrySlug, IndustryManifestEntry>

export function getIndustryManifestEntry(slug: IndustrySlug): IndustryManifestEntry {
  return industryManifest[slug]
}
