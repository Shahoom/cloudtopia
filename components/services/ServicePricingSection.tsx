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
    tag: 'Service Packages',
    title: 'Packages For This Service',
    description: 'Every package starts with a free consultation and a free custom demo preview based on your company inquiry.',
    cta: 'Request This Package',
  },
  ar: {
    tag: 'باقات الخدمة',
    title: 'باقات خاصة بهذه الخدمة',
    description: 'كل باقة تبدأ باستشارة مجانية ومعاينة ديمو مجانية مخصصة حسب طلب شركتك.',
    cta: 'اطلب هذه الباقة',
  },
}

type RawPricingTier = Omit<PricingTier, 'href' | 'ctaLabel' | 'icon'>

const servicePricing: Record<ServicePricingKey, { icon: typeof Globe2; tiers: RawPricingTier[] }> = {
  'website-design': {
    icon: Globe2,
    tiers: [
      { name: 'Landing Page', price: '$299', description: 'Focused launch page for offers, campaigns, and service inquiries.', features: ['1 multi-section page', 'Mobile-first layout', 'Lead form and WhatsApp CTA', 'Analytics and on-page SEO', 'Arabic or English content path'], color: 'sky' },
      { name: 'Business Website', price: '$499+', description: 'Company website for services, teams, proof, and local search.', features: ['Up to 5 core pages', 'Bilingual-ready structure', 'Technical SEO setup', 'Contact and booking paths', 'Free demo preview'], popular: true, color: 'violet' },
      { name: 'Growth Website', price: '$999+', description: 'Deeper content, CMS, SEO, and conversion flow for growing companies.', features: ['Up to 15 pages', 'CMS and blog', 'Schema and sitemap', 'Heatmap-ready tracking', '60-day support'], color: 'emerald' },
    ],
  },
  'ecommerce-solutions': {
    icon: ShoppingBag,
    tiers: [
      { name: 'Starter Store', price: '$599', description: 'Online store foundation for a clean catalog and secure checkout.', features: ['Up to 200 products', 'Payment gateway setup', 'Inventory basics', 'WhatsApp order alerts', 'SSL checkout'], color: 'sky' },
      { name: 'Growth Store', price: '$1,299', description: 'A stronger commerce system with recovery, analytics, and multi-currency.', features: ['Up to 1,000 products', 'Mada, Apple Pay, Stripe, Tap', 'Abandoned cart recovery', 'Coupon engine', 'Conversion tracking'], popular: true, color: 'violet' },
      { name: 'Enterprise Store', price: 'Custom', description: 'Marketplace, ERP, shipping, or custom commerce workflows.', features: ['Unlimited products', 'Multi-language storefront', 'Custom integrations', 'BNPL options', 'Priority support'], color: 'emerald' },
    ],
  },
  'restaurant-qr-menu': {
    icon: Utensils,
    tiers: [
      { name: 'Essential Menu', price: '$249', description: 'Digital menu that restaurants can update without reprinting.', features: ['Up to 100 menu items', 'Arabic and English menu', 'QR code generation', 'WhatsApp order link', '3-5 day delivery'], color: 'sky' },
      { name: 'Smart Menu', price: '$499', description: 'Interactive menu with ordering, allergens, and analytics.', features: ['Up to 500 menu items', 'Online ordering', 'Allergen labels', 'Sales dashboard', 'Email and WhatsApp alerts'], popular: true, color: 'violet' },
      { name: 'Full System', price: '$649+', description: 'Multi-branch digital menu and operational ordering setup.', features: ['Unlimited menu items', 'Multi-branch support', 'Kitchen printer path', 'POS sync planning', 'Receipt support'], color: 'emerald' },
    ],
  },
  'social-media-marketing': {
    icon: Megaphone,
    tiers: [
      { name: 'Starter', price: '$199/mo', description: 'Consistent publishing for one main platform.', features: ['1 platform', '12 posts/month', 'Caption writing', 'Hashtag research', 'Monthly report'], color: 'sky' },
      { name: 'Growth', price: '$449/mo', description: 'Content, reels, community, and strategy for active growth.', features: ['2 platforms', '20 posts/month', '4 reels', 'Community management', 'Strategy call'], popular: true, color: 'violet' },
      { name: 'Scale', price: '$799/mo', description: 'Full platform coverage with paid ads coordination.', features: ['Major platforms', 'Unlimited posts and reels', 'Paid ads management', 'Weekly reporting', 'Campaign planning'], color: 'emerald' },
    ],
  },
  'content-creation': {
    icon: PenTool,
    tiers: [
      { name: 'Basic Content', price: '$149/mo', description: 'SEO article production for steady publishing.', features: ['4 articles/month', '800 words each', 'SEO optimization', 'Arabic or English', 'Editorial calendar'], color: 'sky' },
      { name: 'Professional Content', price: '$329/mo', description: 'Bilingual content with schema and internal linking.', features: ['8 articles/month', '1,200 words each', 'Arabic and English', 'Schema markup', 'Internal linking'], popular: true, color: 'violet' },
      { name: 'Agency Content', price: '$549/mo', description: 'High-volume content operations for search and AI visibility.', features: ['16 articles/month', 'Topic clusters', 'Monthly SEO report', 'Content refreshes', 'AI-answer structure'], color: 'emerald' },
    ],
  },
  'business-systems-development': {
    icon: Code2,
    tiers: [
      { name: 'Essential System', price: '$1,999+', description: 'CRM, booking, inventory, or internal workflow foundation.', features: ['Up to 10 users', 'Core automation flows', 'Reports and dashboard', 'WhatsApp/email integration', 'Training handoff'], color: 'sky' },
      { name: 'Advanced System', price: '$3,499+', description: 'Multi-module system with integrations and stronger reporting.', features: ['Up to 30 users', 'Pipeline and roles', 'Inventory or booking module', 'API integrations', 'Advanced analytics'], popular: true, color: 'violet' },
      { name: 'Enterprise System', price: 'Custom', description: 'Custom ERP, CRM, portals, or multi-branch operations.', features: ['Unlimited users', 'Multi-branch support', 'Custom modules', 'Dedicated infrastructure', 'SLA path'], color: 'emerald' },
    ],
  },
  'web-applications': {
    icon: Code2,
    tiers: [
      { name: 'App Foundation', price: '$999+', description: 'Single-feature web app or internal tool.', features: ['Authentication', 'Admin dashboard', '1 integration', 'Responsive UX', '3-5 week delivery'], color: 'sky' },
      { name: 'Professional App', price: '$2,499+', description: 'Multi-module application for customers or operations.', features: ['2-3 user roles', 'Analytics dashboard', '2 integrations', 'API-ready structure', 'Launch support'], popular: true, color: 'violet' },
      { name: 'Enterprise Platform', price: 'Custom', description: 'SaaS, portal, marketplace, or full custom platform.', features: ['Multi-tenant options', '5+ integrations', 'Advanced roles', 'Mobile app scaffold', 'Cloud deployment'], color: 'emerald' },
    ],
  },
  'mobile-app-development': {
    icon: Smartphone,
    tiers: [
      { name: 'Mobile App Starter', price: '$2,999+', description: 'Mobile-first app experience for a focused business workflow.', features: ['UX and app flow', 'Customer or staff app', 'Backend connection', 'Push-ready structure', 'Free demo preview'], color: 'sky' },
      { name: 'Cross-Platform App', price: '$7,999+', description: 'iOS and Android app with dashboard, auth, and integrations.', features: ['iOS and Android build', 'Admin dashboard', 'Payments or booking', 'Analytics events', 'Launch handoff'], popular: true, color: 'violet' },
      { name: 'App Ecosystem', price: 'Custom', description: 'Mobile app, web portal, APIs, cloud, and automation together.', features: ['Customer app', 'Operations dashboard', 'API layer', 'Cloud infrastructure', 'Ongoing support'], color: 'emerald' },
    ],
  },
  'cloud-infrastructure': {
    icon: Server,
    tiers: [
      { name: 'Cloud Foundation', price: '$499+', description: 'Hosting, deployment, backup, and monitoring setup.', features: ['Cloud hosting setup', 'Domain and DNS review', 'Backup plan', 'SSL and security basics', 'Deployment notes'], color: 'sky' },
      { name: 'Cloud Migration', price: '$1,499+', description: 'Move sites, databases, and systems with a controlled migration path.', features: ['Migration plan', 'Data migration', 'Staging and testing', 'Rollback path', 'Launch support'], popular: true, color: 'violet' },
      { name: 'Enterprise Cloud', price: 'Custom', description: 'Architecture, DevOps, monitoring, cost control, and security.', features: ['Scalable architecture', 'CI/CD setup', 'Performance monitoring', 'Cost optimization', 'Security review'], color: 'emerald' },
    ],
  },
  'ai-powered-solutions': {
    icon: Code2,
    tiers: [
      { name: 'AI Starter', price: '$799+', description: 'Practical AI assistant, chatbot, or internal automation.', features: ['Use-case mapping', 'Knowledge base setup', 'Prompt/workflow design', 'Human handoff', 'Demo preview'], color: 'sky' },
      { name: 'AI Automation', price: '$1,999+', description: 'Connect AI into customer care, CRM, reports, or repeated operations.', features: ['Workflow automation', 'CRM/support integration', 'Reporting dashboard', 'Team training', 'Governance notes'], popular: true, color: 'violet' },
      { name: 'Custom AI/ML', price: 'Custom', description: 'Advanced AI systems, data workflows, and business intelligence.', features: ['Custom model path', 'Data pipeline', 'Secure deployment', 'Evaluation framework', 'Ongoing optimization'], color: 'emerald' },
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
    icon: <Icon className="h-6 w-6" aria-hidden="true" />,
    href: localePath(locale, '/contact'),
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
