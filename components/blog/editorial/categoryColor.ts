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

// A quiet decorative glyph for typographic covers, chosen by topic.
export function categoryGlyph(category: CategoryLike): LucideIcon {
  const k = key(category)
  if (k.includes('ai') || k.includes('automation') || k.includes('intellig')) return Sparkles
  if (k.includes('commerce') || k.includes('ecom') || k.includes('shop') || k.includes('store')) return ShoppingBag
  if (k.includes('web') || k.includes('design') || k.includes('site')) return Globe
  if (k.includes('system') || k.includes('crm') || k.includes('erp') || k.includes('app')) return Workflow
  if (k.includes('cloud') || k.includes('host') || k.includes('infra')) return Cloud
  if (k.includes('dev') || k.includes('code') || k.includes('engineer')) return Cpu
  return Newspaper
}
