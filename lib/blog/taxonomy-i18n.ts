/**
 * Arabic display names for the blog category vocabulary, keyed by slug.
 *
 * The `blog_categories` rows are English-only and a post joins its category by
 * id (`blog_posts.category_id`), so on Arabic pages every category — the nav
 * bar, the categories grid, the sidebar, and each article card's pill — would
 * otherwise render in English. The category set is a small, controlled
 * vocabulary, so we localize the display name by slug here instead of running a
 * data migration that re-points every Arabic post to a parallel AR category row.
 *
 * To add/adjust an Arabic category name, edit the map below (the slug must match
 * `blog_categories.slug`). English is always the fallback for unknown slugs.
 */
const CATEGORY_NAME_AR: Record<string, string> = {
  'web-development': 'تطوير الويب',
  'website-strategy': 'استراتيجية المواقع',
  'business-systems': 'أنظمة الأعمال',
  'automation': 'الأتمتة',
  'ai-solutions': 'حلول الذكاء الاصطناعي',
  'cloud-technology': 'تقنيات السحابة',
  'crm-erp': 'أنظمة CRM و ERP',
  'startup-growth': 'نمو الشركات الناشئة',
  'digital-presence': 'الحضور الرقمي',
  'digital-transformation': 'التحول الرقمي',
  'e-commerce': 'التجارة الإلكترونية',
  'case-studies': 'دراسات الحالة',
  'guides': 'الأدلة',
}

/**
 * Returns the Arabic category name for `locale === 'ar'` when the slug is known,
 * otherwise the original (English) name.
 */
export function localizeCategoryName(
  slug: string | null | undefined,
  fallback: string | null | undefined,
  locale: string | null | undefined,
): string {
  const original = fallback || ''
  if (locale === 'ar' && slug && CATEGORY_NAME_AR[slug]) return CATEGORY_NAME_AR[slug]
  return original
}

/**
 * Arabic display names for the blog tag vocabulary, keyed by slug. Tags are
 * English-only rows too (and a post joins them by id via blog_posts_rels), so
 * they render in English on Arabic article cards / tag pages without this.
 */
const TAG_NAME_AR: Record<string, string> = {
  'ai-agents': 'وكلاء الذكاء الاصطناعي',
  'ai-automation': 'أتمتة الذكاء الاصطناعي',
  'chatbots': 'روبوتات الدردشة',
  'cloud': 'الحوسبة السحابية',
  'conversion': 'تحسين التحويل',
  'crm': 'إدارة علاقات العملاء (CRM)',
  'custom-software': 'برمجيات مخصصة',
  'dashboards': 'لوحات المعلومات',
  'digital-transformation': 'التحول الرقمي',
  'e-commerce': 'التجارة الإلكترونية',
  'erp': 'تخطيط موارد المؤسسات (ERP)',
  'hosting': 'الاستضافة',
  'shopify': 'شوبيفاي',
  'small-business': 'الشركات الصغيرة',
  'website-strategy': 'استراتيجية المواقع',
  'whatsapp': 'واتساب',
}

export function localizeTagName(
  slug: string | null | undefined,
  fallback: string | null | undefined,
  locale: string | null | undefined,
): string {
  const original = fallback || ''
  if (locale === 'ar' && slug && TAG_NAME_AR[slug]) return TAG_NAME_AR[slug]
  return original
}

/**
 * Arabic labels for the fixed `contentType` enum, shown as the badge on article
 * heroes/cards. The raw enum values (guide, article, case_study…) rendered in
 * English on Arabic articles.
 */
const CONTENT_TYPE_AR: Record<string, string> = {
  guide: 'دليل',
  article: 'مقالة',
  case_study: 'دراسة حالة',
  checklist: 'قائمة تحقق',
  comparison: 'مقارنة',
  tutorial: 'شرح تعليمي',
  opinion: 'رأي',
  news: 'أخبار',
}

/** Localized content-type badge label; EN falls back to the de-underscored value. */
export function localizeContentType(
  value: string | null | undefined,
  locale: string | null | undefined,
): string {
  const v = (value || '').toString()
  if (locale === 'ar' && CONTENT_TYPE_AR[v]) return CONTENT_TYPE_AR[v]
  return v.replace(/_/g, ' ')
}
