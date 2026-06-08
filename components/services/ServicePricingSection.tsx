import { Code2, Globe2, Megaphone, PenTool, Server, ShoppingBag, Smartphone, Utensils } from 'lucide-react'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'
import { localePath } from '@/lib/i18n/url'

type Locale = 'en' | 'ar'

type ServicePricingKey =
  | 'website-design'
  | 'ecommerce-solutions'
  | 'restaurant-qr-menu'
  | 'social-media-marketing'
  | 'content-creation'
  | 'business-systems-development'
  | 'web-applications'
  | 'mobile-app-development'
  | 'cloud-infrastructure'
  | 'ai-powered-solutions'

const copy = {
  en: {
    tag: 'Package Paths',
    title: 'Choose the service path before you compare prices',
    description: 'Service pages show scope and deliverables only. Exact starting prices live on the pricing page so every number stays consistent.',
    cta: 'View Pricing Page',
    priceLabel: 'Package path',
  },
  ar: {
    tag: 'مسارات الباقات',
    title: 'اختر مسار الخدمة قبل مقارنة الأسعار',
    description: 'صفحات الخدمات تعرض النطاق والمخرجات فقط. الأسعار الرقمية موجودة في صفحة الأسعار حتى تبقى كل الأرقام موحدة.',
    cta: 'عرض صفحة الأسعار',
    priceLabel: 'مسار باقة',
  },
}

type RawPricingTier = Omit<PricingTier, 'href' | 'ctaLabel' | 'icon' | 'price'>

const servicePricing: Record<ServicePricingKey, { icon: typeof Globe2; tiers: RawPricingTier[] }> = {
  'website-design': {
    icon: Globe2,
    tiers: [
      { name: 'Landing Page', description: 'Focused launch page for one offer, one service, or one campaign.', features: ['One responsive multi-section page', 'Lead form, WhatsApp, and click-to-call', 'Starter SEO structure and analytics', 'Free domain and starter hosting path on eligible builds', 'Fast launch handoff'], color: 'sky' },
      { name: 'Starter Website', description: 'Small business site with or without CMS depending on editing needs.', features: ['Up to five core pages', 'CMS option for editable content', 'Basic sitemap and page metadata', 'Contact and inquiry flow', 'Ownership handoff'], popular: true, color: 'violet' },
      { name: 'Professional Website', description: 'CMS website with deeper service pages, SEO, and conversion paths.', features: ['Service-page structure and FAQs', 'CMS, blog/news, and media handoff', 'Technical SEO and schema foundations', 'Analytics events and lead routing', 'Post-launch support window'], color: 'emerald' },
    ],
  },
  'ecommerce-solutions': {
    icon: ShoppingBag,
    tiers: [
      { name: 'Starter Store', description: 'First online store for a focused product catalog and clean checkout.', features: ['Storefront, cart, checkout, and order emails', 'Payment gateway setup guidance', 'Product/category SEO basics', 'Free domain and starter hosting path on eligible builds', 'Admin handoff for products and orders'], color: 'sky' },
      { name: 'Growth Store', description: 'Commerce setup for stronger product management, campaigns, and tracking.', features: ['Product options, filters, and search', 'Coupons, abandoned-cart path, and notifications', 'Analytics and conversion tracking', 'Inventory and order status workflow', 'Team training session'], popular: true, color: 'violet' },
      { name: 'Commerce Pro', description: 'Retail build for larger catalogs, integrations, and operational reporting.', features: ['Expanded catalog and collection structure', 'Regional payment and tax planning', 'Inventory, returns, and reporting workflow', 'Product data migration support', 'Launch QA across devices'], color: 'emerald' },
    ],
  },
  'restaurant-qr-menu': {
    icon: Utensils,
    tiers: [
      { name: 'Essential Menu', description: 'Simple QR menu restaurants can update without reprinting.', features: ['Arabic and English menu structure', 'Menu admin handoff', 'QR code and WhatsApp order link', 'Item categories and availability', 'Fast delivery path'], color: 'sky' },
      { name: 'Smart Menu', description: 'Interactive ordering menu with labels, offers, and simple performance insight.', features: ['Online order path', 'Allergen and dietary labels', 'Sales snapshot and notifications', 'Branch and contact details', 'Training handoff'], popular: true, color: 'violet' },
      { name: 'Multi-Branch Menu', description: 'Operational menu system for multiple branches or changing catalogs.', features: ['Branch-specific menus', 'Kitchen workflow planning', 'POS sync planning', 'Receipt path', 'Support and optimization plan'], color: 'emerald' },
    ],
  },
  'social-media-marketing': {
    icon: Megaphone,
    tiers: [
      { name: 'Social Starter', description: 'Consistent publishing for one or two priority channels.', features: ['Monthly content calendar', 'Post captions and design direction', 'Basic community response guidance', 'Hashtag and topic research', 'Monthly performance notes'], color: 'sky' },
      { name: 'Social Growth', description: 'Content rhythm, campaign ideas, and reporting for active growth.', features: ['Multi-platform content planning', 'Short-form content ideas', 'Campaign themes and offers', 'Community management path', 'Monthly strategy review'], popular: true, color: 'violet' },
      { name: 'Growth Partner', description: 'Social, landing pages, tracking, and optimization working together.', features: ['Campaign planning and landing-page alignment', 'Paid ads coordination', 'Conversion tracking', 'Weekly optimization notes', 'Executive report cadence'], color: 'emerald' },
    ],
  },
  'content-creation': {
    icon: PenTool,
    tiers: [
      { name: 'Content Starter', description: 'Useful service content or articles for steady SEO movement.', features: ['Topic map and search intent', 'Arabic or English writing path', 'Internal linking plan', 'Editorial review', 'Monthly publishing rhythm'], color: 'sky' },
      { name: 'Content Engine', description: 'Bilingual-ready content system with stronger structure and reuse.', features: ['Service pages, articles, and FAQs', 'Schema-ready sections', 'Topic clusters', 'Content refresh recommendations', 'Performance reporting'], popular: true, color: 'violet' },
      { name: 'Authority Content', description: 'High-volume content operation for search, AI visibility, and sales enablement.', features: ['Editorial calendar', 'AI-answer-friendly formatting', 'Comparison and guide content', 'Content governance', 'Monthly roadmap'], color: 'emerald' },
    ],
  },
  'business-systems-development': {
    icon: Code2,
    tiers: [
      { name: 'Essential System', description: 'Focused CRM, booking, order, inventory, or internal workflow foundation.', features: ['Secure login and admin dashboard', 'Core workflow with statuses and notes', 'Simple reports and CSV handoff', 'WhatsApp or email notification path', 'Team training'], color: 'sky' },
      { name: 'Advanced System', description: 'Multi-module system with approvals, integrations, and stronger reporting.', features: ['Multiple roles and custom fields', 'Two to three connected modules', 'API integration planning', 'Automated notifications', 'Launch documentation'], popular: true, color: 'violet' },
      { name: 'Enterprise System', description: 'ERP, multi-branch operations, or deeply custom workflow platform.', features: ['Custom modules and permissions', 'Data migration plan', 'Security and acceptance criteria', 'Dedicated architecture path', 'Phased roadmap'], color: 'emerald' },
    ],
  },
  'web-applications': {
    icon: Code2,
    tiers: [
      { name: 'App Foundation', description: 'Focused customer portal, dashboard, calculator, booking tool, or internal app.', features: ['Product discovery and user flow', 'Authentication and admin area', 'Database setup', 'One integration', 'Deployment handoff'], color: 'sky' },
      { name: 'Professional Web App', description: 'Multi-module application with roles, dashboards, and automation.', features: ['Two to three user roles', 'Reporting dashboard', 'Notifications and admin controls', 'API-ready structure', 'Acceptance testing'], popular: true, color: 'violet' },
      { name: 'Platform Build', description: 'SaaS, marketplace, portal, or multi-tenant product system.', features: ['Architecture planning', 'Advanced permissions', 'Integration roadmap', 'Monitoring and support plan', 'Roadmap phases'], color: 'emerald' },
    ],
  },
  'mobile-app-development': {
    icon: Smartphone,
    tiers: [
      { name: 'Mobile MVP', description: 'Test one mobile workflow before investing in a full product.', features: ['App discovery and clickable flow', 'Core screens', 'Backend connection', 'Push-ready structure', 'Demo build'], color: 'sky' },
      { name: 'Cross-Platform App', description: 'iOS and Android app connected to bookings, commerce, CRM, or accounts.', features: ['Cross-platform build', 'Secure login', 'API and dashboard connection', 'Notifications', 'Store submission support'], popular: true, color: 'violet' },
      { name: 'App Ecosystem', description: 'Customer app, staff app, dashboard, API layer, cloud, and support together.', features: ['Product roadmap', 'Backend systems', 'Operations dashboard', 'Monitoring path', 'Optimization plan'], color: 'emerald' },
    ],
  },
  'cloud-infrastructure': {
    icon: Server,
    tiers: [
      { name: 'Cloud Foundation', description: 'Stable hosting, DNS, SSL, backup, and deployment basics.', features: ['Domain and DNS review', 'Hosting setup', 'SSL and backup plan', 'Deployment notes', 'Basic uptime checks'], color: 'sky' },
      { name: 'Cloud Migration', description: 'Move a website, database, or system into a safer cloud setup.', features: ['Migration plan', 'Staging test', 'Data/database transfer', 'Rollback path', 'Post-launch checks'], popular: true, color: 'violet' },
      { name: 'Cloud Operations', description: 'DevOps, CI/CD, monitoring, cost control, scaling, and security hardening.', features: ['Architecture review', 'Automation and alerts', 'Access policy', 'Documentation', 'Monthly support proposal'], color: 'emerald' },
    ],
  },
  'ai-powered-solutions': {
    icon: Code2,
    tiers: [
      { name: 'AI Assistant Starter', description: 'Website chatbot, internal helper, FAQ assistant, or lead qualification flow.', features: ['Use-case mapping', 'Knowledge base setup', 'Prompt and workflow design', 'Human handoff', 'Basic analytics'], color: 'sky' },
      { name: 'AI Automation', description: 'Connect AI to CRM, support, reports, email, WhatsApp, or repeated tasks.', features: ['Workflow automation', 'Integrations and approval rules', 'Reporting dashboard', 'Fallback handling', 'Team training'], popular: true, color: 'violet' },
      { name: 'Custom AI System', description: 'Advanced assistant, retrieval, data workflow, ML support, or business intelligence.', features: ['Data review', 'Secure deployment', 'Evaluation framework', 'Optimization plan', 'Governance notes'], color: 'emerald' },
    ],
  },
}

export function ServicePricingSection({
  service,
  locale,
  className,
}: {
  service: ServicePricingKey
  locale: Locale
  className?: string
}) {
  const language = copy[locale]
  const config = servicePricing[service]
  const Icon = config.icon
  const tiers: PricingTier[] = config.tiers.map((tier) => ({
    ...tier,
    price: language.priceLabel,
    icon: <Icon className="h-6 w-6" aria-hidden="true" />,
    href: localePath(locale, '/pricing'),
    ctaLabel: language.cta,
  }))

  return (
    <CreativePricing
      tag={language.tag}
      title={language.title}
      description={language.description}
      tiers={tiers}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={className || 'bg-[#f4f1f8] py-16 md:py-20'}
    />
  )
}
