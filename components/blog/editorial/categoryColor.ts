import { Cloud, Cpu, Globe, Newspaper, ShoppingBag, Sparkles, Workflow, type LucideIcon } from 'lucide-react'

type CategoryLike = { name?: string | null; slug?: string | null; color?: string | null } | null | undefined

function key(category: CategoryLike): string {
  return `${category?.slug || ''} ${category?.name || ''}`.toLowerCase()
}

// The accent used for a category's kicker, cover rule, and cover glyph. Prefers the
// CMS-stored category.color; otherwise maps by topic. Falls back to the global sky.
export function categoryAccent(category: CategoryLike): string {
  if (category?.color) return category.color
  const k = key(category)
  if (k.includes('ai') || k.includes('automation') || k.includes('intellig')) return '#6366f1'
  if (k.includes('commerce') || k.includes('ecom') || k.includes('shop') || k.includes('store')) return '#b45309'
  if (k.includes('web') || k.includes('design') || k.includes('site')) return '#0f766e'
  if (k.includes('system') || k.includes('crm') || k.includes('erp') || k.includes('app')) return '#7c3aed'
  if (k.includes('cloud') || k.includes('host') || k.includes('infra')) return '#0284c7'
  return '#0284c7'
}

export type CategoryGlyphName = 'sparkles' | 'shopping' | 'globe' | 'workflow' | 'cloud' | 'cpu' | 'newspaper'

export const categoryGlyphs: Readonly<Record<CategoryGlyphName, LucideIcon>> = {
  sparkles: Sparkles,
  shopping: ShoppingBag,
  globe: Globe,
  workflow: Workflow,
  cloud: Cloud,
  cpu: Cpu,
  newspaper: Newspaper,
}

// A quiet decorative glyph key for typographic covers, chosen by topic. The
// caller resolves the key through the module-level map so React sees a stable
// component identity instead of a component type returned during render.
export function categoryGlyphName(category: CategoryLike): CategoryGlyphName {
  const k = key(category)
  if (k.includes('ai') || k.includes('automation') || k.includes('intellig')) return 'sparkles'
  if (k.includes('commerce') || k.includes('ecom') || k.includes('shop') || k.includes('store')) return 'shopping'
  if (k.includes('web') || k.includes('design') || k.includes('site')) return 'globe'
  if (k.includes('system') || k.includes('crm') || k.includes('erp') || k.includes('app')) return 'workflow'
  if (k.includes('cloud') || k.includes('host') || k.includes('infra')) return 'cloud'
  if (k.includes('dev') || k.includes('code') || k.includes('engineer')) return 'cpu'
  return 'newspaper'
}
