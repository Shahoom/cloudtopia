import {
  Banknote,
  Briefcase,
  Building2,
  GraduationCap,
  Hammer,
  HeartPulse,
  Hotel,
  Landmark,
  Scale,
  ShoppingBag,
  Store,
  Truck,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

export type IndustryVisualProfile = {
  icon: LucideIcon
  accent: string
  tint: string
  workflow: {
    en: string
    ar: string
  }
}

export const defaultIndustryVisual: IndustryVisualProfile = {
  icon: Building2,
  accent: 'text-sky-700',
  tint: 'bg-sky-50',
  workflow: { en: 'Workflow system', ar: 'نظام سير عمل' },
}

export const industryVisuals: Record<string, IndustryVisualProfile> = {
  healthcare: {
    icon: HeartPulse,
    accent: 'text-rose-700',
    tint: 'bg-rose-50',
    workflow: { en: 'Patient journey', ar: 'رحلة المريض' },
  },
  fintech: {
    icon: Banknote,
    accent: 'text-cyan-700',
    tint: 'bg-cyan-50',
    workflow: { en: 'Secure onboarding', ar: 'انضمام آمن' },
  },
  'ecommerce-retail': {
    icon: ShoppingBag,
    accent: 'text-violet-700',
    tint: 'bg-violet-50',
    workflow: { en: 'Catalog to checkout', ar: 'من الكتالوج إلى الدفع' },
  },
  'real-estate': {
    icon: Building2,
    accent: 'text-emerald-700',
    tint: 'bg-emerald-50',
    workflow: { en: 'Listing to lead', ar: 'من العقار إلى العميل' },
  },
  education: {
    icon: GraduationCap,
    accent: 'text-indigo-700',
    tint: 'bg-indigo-50',
    workflow: { en: 'Learning flow', ar: 'مسار التعلم' },
  },
  'travel-hospitality': {
    icon: Hotel,
    accent: 'text-amber-700',
    tint: 'bg-amber-50',
    workflow: { en: 'Guest experience', ar: 'تجربة الضيف' },
  },
  restaurants: {
    icon: Utensils,
    accent: 'text-orange-700',
    tint: 'bg-orange-50',
    workflow: { en: 'Menu to order', ar: 'من القائمة إلى الطلب' },
  },
  'legal-firms': {
    icon: Scale,
    accent: 'text-slate-700',
    tint: 'bg-slate-50',
    workflow: { en: 'Inquiry to consultation', ar: 'من الاستفسار إلى الاستشارة' },
  },
  construction: {
    icon: Hammer,
    accent: 'text-stone-700',
    tint: 'bg-stone-50',
    workflow: { en: 'Tender to delivery', ar: 'من العطاء إلى التسليم' },
  },
  retail: {
    icon: Store,
    accent: 'text-fuchsia-700',
    tint: 'bg-fuchsia-50',
    workflow: { en: 'Branch to buyer', ar: 'من الفرع إلى العميل' },
  },
  'professional-services': {
    icon: Briefcase,
    accent: 'text-sky-700',
    tint: 'bg-sky-50',
    workflow: { en: 'Expertise to lead', ar: 'من الخبرة إلى العميل' },
  },
  'logistics-supply-chain': {
    icon: Truck,
    accent: 'text-blue-700',
    tint: 'bg-blue-50',
    workflow: { en: 'Tracking flow', ar: 'مسار التتبع' },
  },
  'government-public-sector': {
    icon: Landmark,
    accent: 'text-slate-700',
    tint: 'bg-slate-50',
    workflow: { en: 'Public service path', ar: 'مسار الخدمة العامة' },
  },
}

export function getIndustryVisual(slug: string) {
  return industryVisuals[slug] || defaultIndustryVisual
}
