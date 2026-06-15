/**
 * Canonical, machine-readable facts about CloudTopia for agent-facing surfaces.
 *
 * Single source of truth shared by every agent-discovery endpoint so the MCP
 * server, the `Accept: text/markdown` view, the agent-skills index and the
 * in-browser WebMCP tools all describe the company identically.
 *
 * IMPORTANT: this module is imported by BOTH server route handlers (Node) and a
 * client component (browser), so it must stay dependency-free and isomorphic —
 * no `server-only`, no CMS/DB imports. Plain data only. The values mirror the
 * authoritative copy in `data/cloudtopia-ai/*.md` and `lib/i18n/url.ts`.
 */

export const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudtopia.net').replace(/\/$/, '')

export const COMPANY = {
  name: 'CloudTopia',
  nameArabic: 'كلاود توبيا',
  legalTagline: 'Arabic Software, Cloud & AI Company',
  founded: '2024',
  founder: 'Mohamad Shahm',
  founderArabic: 'محمد شهم',
  founderRole: 'Founder & Lead Engineer (Information Systems Engineer)',
  description:
    'CloudTopia is a Gulf-first, bilingual (Arabic + English) digital and cloud technology agency. It fixes scope, pricing, ownership, and delivery milestones before production, then builds the websites, stores, apps, business systems, cloud, and AI that support growth — all handed over for the client to fully own.',
  philosophy:
    '"The cloud" means the internet itself — CloudTopia helps businesses get there, operate there, and thrive there.',
  hubs: [
    { name: 'Türkiye hub', covers: 'Turkey and the Levant (Iraq, Syria, Jordan, Lebanon)' },
    { name: 'Oman hub', covers: 'Oman and the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain)' },
  ],
  alsoServes: 'Egypt and the wider Arab region',
  languages: ['Arabic (RTL)', 'English'],
} as const

export const CONTACTS = {
  website: BASE_URL,
  email: 'info@cloudtopia.net',
  instagram: '@thecloudtopia',
  whatsapp: [
    {
      region: 'Oman / GCC',
      covers: 'Oman, Saudi Arabia, UAE, Qatar, Kuwait, Bahrain',
      display: '+968 9588 6393',
      link: 'https://wa.me/96895886393',
    },
    {
      region: 'Türkiye / Levant',
      covers: 'Turkey, Iraq, Syria, Jordan, Lebanon',
      display: '+90 501 151 11 16',
      link: 'https://wa.me/905011511116',
    },
  ],
} as const

/** The 7 canonical service categories (there is intentionally NO "Labs"). */
export const SERVICES = [
  {
    id: 'digital-presence',
    title: 'Digital Presence',
    titleArabic: 'الحضور الرقمي',
    summary: 'Websites, stores, content, and maintenance for a credible online presence.',
    offerings: [
      'Business & corporate websites',
      'E-commerce stores (Mada, Apple Pay, Tabby/Tamara BNPL, ZATCA e-invoicing)',
      'Landing pages & portfolios',
      'Restaurant QR menu & ordering systems',
      'Website redesign & maintenance',
    ],
  },
  {
    id: 'interactive-web-apps',
    title: 'Interactive Web Applications',
    titleArabic: 'تطبيقات ويب تفاعلية',
    summary: 'Custom portals, dashboards, SaaS MVPs, and booking tools.',
    offerings: ['Client portals', 'Admin dashboards', 'Booking platforms', 'Internal business tools', 'SaaS MVPs', 'PWAs'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    titleArabic: 'تطوير تطبيقات الجوال',
    summary: 'iOS, Android, cross-platform, and PWA apps for mobile-first businesses.',
    offerings: ['iOS & Android apps', 'Flutter & React Native', 'App backend & APIs', 'App Store launch support', 'Maintenance'],
  },
  {
    id: 'business-systems',
    title: 'Business Systems Development',
    titleArabic: 'تطوير أنظمة الأعمال',
    summary: 'CRM, ERP, and automation built around operations.',
    offerings: ['CRM & ERP', 'Inventory, sales & order management', 'HR & accounting integration', 'Workflow & process automation', 'Custom API integration'],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    titleArabic: 'السحابة والبنية التحتية',
    summary: 'Hosting, migration, security, and scalable cloud architecture.',
    offerings: ['Cloud hosting & migration', 'Server deployment & DevOps', 'Backup & security', 'Scalable & hybrid cloud architecture', 'Cloud cost optimization'],
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    titleArabic: 'حلول مدعومة بالذكاء الاصطناعي',
    summary: 'Practical AI that cuts repetitive work.',
    offerings: ['AI chatbots & business assistants', 'AI automation & content systems', 'AI CRM assistants & reporting', 'ML model development', 'NLP solutions'],
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth Support',
    titleArabic: 'دعم النمو الرقمي',
    summary: 'SEO, social, content, and conversion — Arabic-first for the Gulf.',
    offerings: ['SEO optimization', 'Social media management', 'Paid-ads landing pages', 'Lead generation systems', 'Conversion rate optimization', 'Email marketing automation', 'Brand identity'],
  },
] as const

export const INDUSTRIES = [
  'E-commerce & retail', 'Restaurants & hospitality', 'Real estate', 'Healthcare',
  'Education', 'Fintech', 'Legal firms', 'Logistics & supply chain', 'Construction',
  'Professional services', 'Government / public sector',
] as const

export const OPERATING_MODEL = [
  'Fixed scope before build (written proposal first).',
  'Transparent pricing buyers can compare.',
  'Arabic RTL and English from day one (not a late translation add-on).',
  'Owned, scalable handoff (code, accounts, analytics, documentation).',
] as const

/** Machine-readable resources agents can fetch directly. */
export const RESOURCES = {
  llms: `${BASE_URL}/llms.txt`,
  pricing: `${BASE_URL}/pricing.md`,
  pricingArabic: `${BASE_URL}/pricing.ar.md`,
  sitemap: `${BASE_URL}/sitemap.xml`,
  rss: `${BASE_URL}/articles/rss.xml`,
  rssArabic: `${BASE_URL}/ar/articles/rss.xml`,
  apiCatalog: `${BASE_URL}/.well-known/api-catalog`,
  openapi: `${BASE_URL}/openapi.json`,
  mcpServerCard: `${BASE_URL}/.well-known/mcp/server-card.json`,
  mcpEndpoint: `${BASE_URL}/api/mcp`,
  agentSkills: `${BASE_URL}/.well-known/agent-skills/index.json`,
  health: `${BASE_URL}/api/health`,
} as const

export const MCP_SERVER_NAME = 'cloudtopia'
export const MCP_SERVER_VERSION = '1.0.0'
