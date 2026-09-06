/**
 * Compact bilingual service-category labels safe for Contact and global UI.
 * This is the single source for the seven category names; `lib/seo/services.ts`
 * imports these so SEO content and small client UIs never drift apart, and
 * client components can import this file without pulling the full SEO/service
 * content graph into their bundle.
 */
export const SERVICE_CATEGORY_OPTIONS = [
    { slug: 'digital-presence', name: { en: 'Digital Presence', ar: 'الحضور الرقمي' } },
    { slug: 'interactive-web-applications', name: { en: 'Interactive Web Applications', ar: 'تطبيقات ويب تفاعلية' } },
    { slug: 'mobile-app-development', name: { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' } },
    { slug: 'business-systems-development', name: { en: 'Business Systems Development', ar: 'تطوير أنظمة الأعمال' } },
    { slug: 'cloud-infrastructure', name: { en: 'Cloud & Infrastructure', ar: 'السحابة والبنية التحتية' } },
    { slug: 'ai-powered-solutions', name: { en: 'AI-Powered Solutions', ar: 'حلول مدعومة بالذكاء الاصطناعي' } },
    { slug: 'digital-growth-support', name: { en: 'Digital Growth Support', ar: 'دعم النمو الرقمي' } },
] as const satisfies readonly { slug: string; name: { en: string; ar: string } }[]

export type ServiceCategoryOption = (typeof SERVICE_CATEGORY_OPTIONS)[number]

export function serviceCategoryName(slug: string): { en: string; ar: string } | null {
    return SERVICE_CATEGORY_OPTIONS.find((c) => c.slug === slug)?.name ?? null
}
