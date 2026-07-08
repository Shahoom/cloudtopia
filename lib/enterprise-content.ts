export type EnterpriseLocale = 'en' | 'ar' | 'tr'

export type NavItem = {
  label: string
  href: string
}

export type MenuColumn = {
  title: string
  description: string
  icon: string
  links: NavItem[]
}

export type ServiceOverview = {
  title: string
  description: string
  href: string
  icon: string
  chips: string[]
}

export type Industry = {
  id: string
  title: string
  pain: string
  build: string
  features: string[]
  cta: string
  icon: string
}

export type CaseStudy = {
  category: string
  title: string
  description: string
  challenge: string
  solution: string
  features: string[]
  image: string
  href: string
  stack?: string[]
}

export type FaqItem = {
  question: string
  answer: string
}

export type VersionXTab = {
  label: string
  kicker: string
  title: string
  description: string
  image: string
  bullets: string[]
  href: string
}

export type VersionXFinderStep = {
  question: string
  options: string[]
}

export type VersionXTestimonial = {
  quote: string
  author: string
  role: string
  result: string
}

export type VersionXOffice = {
  city: string
  region: string
  detail: string
}

export type EnterpriseServiceTrack = {
  label: string
  title: string
  description: string
  href: string
  items: string[]
}

export type SeoCluster = {
  title: string
  description: string
  links: NavItem[]
}

export type ServicePageContent = {
  key: string
  eyebrow: string
  title: string
  subtitle: string
  icon: string
  primaryCta: string
  secondaryCta: string
  problem: string
  builds: string[]
  features: string[]
  benefits: string[]
  process: string[]
  technologies: string[]
  industries: string[]
  useCases: string[]
  faqs: FaqItem[]
}

export const brand = {
  email: 'info@cloudtopia.net',
  whatsapp: '+90 501 151 11 16',
  whatsappUrl: 'https://wa.me/905011511116',
  instagram: 'https://instagram.com/thecloudtopia',
  x: 'https://x.com/thecloudtopia',
  github: 'https://github.com/Shahoom',
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Labs', href: '/labs' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const menuColumns: MenuColumn[] = [
  {
    title: 'Digital Presence',
    description: 'Everything a business needs to look credible and convert online.',
    icon: 'globe',
    links: [
      { label: 'Website Design & Development', href: '/services/website-development' },
      { label: 'Landing Pages', href: '/services/website-development#landing-pages' },
      { label: 'E-commerce Websites', href: '/services/ecommerce-development' },
      { label: 'Branding & Visual Identity', href: '/services#digital-presence' },
      { label: 'Social Media Setup', href: '/services/social-media-marketing' },
      { label: 'SEO-Ready Pages', href: '/services#digital-presence' },
    ],
  },
  {
    title: 'Web Applications',
    description: 'Interactive portals, dashboards, and SaaS-style tools.',
    icon: 'code',
    links: [
      { label: 'Custom Web Apps', href: '/services/web-applications' },
      { label: 'Dashboards', href: '/web-applications#dashboards' },
      { label: 'Client Portals', href: '/web-applications#portals' },
      { label: 'Admin Panels', href: '/web-applications#admin-panels' },
      { label: 'SaaS Platforms', href: '/web-applications#saas' },
      { label: 'API Integrations', href: '/web-applications#integrations' },
    ],
  },
  {
    title: 'Business Systems',
    description: 'Operational software for sales, inventory, reporting, and teams.',
    icon: 'database',
    links: [
      { label: 'CRM Systems', href: '/business-systems-development#crm' },
      { label: 'ERP Systems', href: '/business-systems-development#erp' },
      { label: 'Inventory Management', href: '/business-systems-development#inventory' },
      { label: 'Sales Management', href: '/business-systems-development#sales' },
      { label: 'Booking Systems', href: '/business-systems-development#booking' },
      { label: 'Operations Dashboards', href: '/business-systems-development#dashboards' },
    ],
  },
  {
    title: 'CloudTopia Labs',
    description: 'AI-powered workflows for repetitive business work.',
    icon: 'bot',
    links: [
      { label: 'AI Automation', href: '/labs#automation' },
      { label: 'AI Assistants', href: '/labs#assistants' },
      { label: 'Lead Qualification', href: '/labs#lead-qualification' },
      { label: 'Internal Copilots', href: '/labs#copilots' },
      { label: 'Workflow Agents', href: '/labs#workflow-agents' },
      { label: 'Smart Business Tools', href: '/labs#tools' },
    ],
  },
]

export const servicesOverview: ServiceOverview[] = [
  {
    title: 'Digital Presence',
    href: '/services/website-development',
    icon: 'monitor',
    description:
      'Websites, landing pages, SEO-ready pages, brand visuals, content, and social media setup for businesses that need to look professional online.',
    chips: ['Website', 'Landing Pages', 'Branding', 'SEO', 'Social'],
  },
  {
    title: 'E-commerce & Product Catalogs',
    href: '/services/ecommerce-development',
    icon: 'shopping',
    description:
      'Online stores, product showcases, payment integrations, inventory-friendly structures, and conversion-focused shopping experiences.',
    chips: ['Storefront', 'Catalog', 'Payments', 'Products', 'Analytics'],
  },
  {
    title: 'Interactive Web Applications',
    href: '/services/web-applications',
    icon: 'code',
    description:
      'Client portals, dashboards, admin panels, internal tools, and SaaS-style platforms built around your workflow.',
    chips: ['Dashboards', 'Portals', 'Admin Panels', 'SaaS', 'APIs'],
  },
  {
    title: 'Business Systems / CRM / ERP',
    href: '/business-systems-development',
    icon: 'settings',
    description:
      'Sales tracking, inventory management, booking systems, customer databases, reporting, and operational automation.',
    chips: ['CRM', 'ERP', 'Inventory', 'Sales', 'Reports'],
  },
  {
    title: 'AI Automation / CloudTopia Labs',
    href: '/labs',
    icon: 'sparkles',
    description:
      'AI assistants, lead qualification, workflow automation, content tools, internal copilots, and smart systems for repetitive business tasks.',
    chips: ['AI Agents', 'Automation', 'Chatbots', 'Workflows', 'Copilots'],
  },
  {
    title: 'Social & Content Systems',
    href: '/services/social-media-marketing',
    icon: 'message',
    description:
      'Content strategy, ad creatives, lead forms, business pages, and campaigns connected to your digital presence.',
    chips: ['Content', 'Ads', 'Leads', 'Meta', 'Instagram'],
  },
]

export const industries: Industry[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    pain: 'High-value clients need trust before they contact you.',
    build: 'Property websites, lead forms, CRM systems, WhatsApp routing, project showcases, and investor pages.',
    features: ['Property listings', 'Inquiry forms', 'CRM', 'Maps', 'Multilingual pages'],
    cta: 'Build a Real Estate System',
    icon: 'building',
  },
  {
    id: 'clinics',
    title: 'Clinics & Beauty Centers',
    pain: 'Patients compare clinics online before booking.',
    build: 'Clinic websites, treatment pages, booking flows, patient inquiry forms, and lead funnels.',
    features: ['Booking', 'Treatments', 'Lead forms', 'Reviews', 'CRM follow-up'],
    cta: 'Create a Clinic Website',
    icon: 'calendar',
  },
  {
    id: 'restaurants',
    title: 'Restaurants & Cafes',
    pain: 'Menus and offers change faster than static websites.',
    build: 'QR menus, multilingual menus, product updates, branch pages, and ordering flows.',
    features: ['QR menu', 'Offers', 'Branches', 'Products', 'WhatsApp orders'],
    cta: 'Build a Smart Menu',
    icon: 'store',
  },
  {
    id: 'trading',
    title: 'Trading & Import/Export',
    pain: 'International buyers need credibility and clear product or service presentation.',
    build: 'Corporate websites, product catalogs, service pages, inquiry systems, and multilingual trade positioning.',
    features: ['Catalog', 'Inquiry', 'Company profile', 'Logistics', 'Multilingual'],
    cta: 'Create a Trade Website',
    icon: 'clipboard',
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    pain: 'Stores need trust, speed, products, payments, and analytics working together.',
    build: 'Product catalogs, checkout, payment integration, inventory-friendly structure, and analytics.',
    features: ['Storefront', 'Payments', 'Inventory', 'Analytics', 'Abandoned cart'],
    cta: 'Launch an Online Store',
    icon: 'shopping',
  },
  {
    id: 'startups',
    title: 'Startups',
    pain: 'Startups need to validate fast without overbuilding.',
    build: 'MVP landing pages, SaaS dashboards, prototypes, and investor-ready product interfaces.',
    features: ['MVP', 'SaaS', 'Landing', 'Dashboard', 'Prototype'],
    cta: 'Build an MVP',
    icon: 'rocket',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    category: 'Corporate Website',
    title: 'KVAII Import & Export Website',
    description: 'A professional digital presence for import/export and logistics services.',
    challenge: 'Needed a professional digital presence for import/export and logistics services.',
    solution: 'Modern company website with service presentation, credibility sections, and contact flow.',
    features: ['Multilingual pages', 'Service sections', 'Contact CTA', 'Business profile'],
    image: '/images/projects/kvaii.png',
    href: '/projects/kvaii-logistics',
    stack: ['Next.js', 'Responsive UI', 'SEO'],
  },
  {
    category: 'Corporate Website',
    title: 'RAM Sustainable Development',
    description: 'A credible corporate presence with clear positioning and service communication.',
    challenge: 'Needed a credible corporate presence with clear positioning and service communication.',
    solution: 'Structured website focused on trust, services, and professional presentation.',
    features: ['Company profile', 'Service pages', 'Responsive layout', 'Contact flow'],
    image: '/images/projects/ramsdgroup.png',
    href: '/projects/ram-sustainable',
    stack: ['Next.js', 'Content structure', 'SEO'],
  },
  {
    category: 'E-commerce',
    title: 'ARTUCKY E-commerce Platform',
    description: 'A product-focused e-commerce interface with clean browsing and conversion flow.',
    challenge: 'Needed an online product experience that presents products clearly and supports customer action.',
    solution: 'Product-focused e-commerce interface with clean browsing and conversion flow.',
    features: ['Product cards', 'Categories', 'Shopping flow', 'Responsive design'],
    image: '/images/projects/artucky-ecommerce.png',
    href: '/projects/artucky-ecommerce',
    stack: ['E-commerce UI', 'Product catalog', 'Responsive UX'],
  },
]

export const processSteps = [
  {
    title: 'Discovery',
    description: 'We understand your business, goals, audience, services, required features, and budget.',
    icon: 'search',
  },
  {
    title: 'Scope & Proposal',
    description: 'You receive clear deliverables, pricing, timeline, responsibilities, and payment structure.',
    icon: 'clipboard',
  },
  {
    title: 'UX & Design',
    description: 'We create page structure, user flow, visual direction, responsive layouts, and conversion paths.',
    icon: 'layers',
  },
  {
    title: 'Development',
    description: 'We build responsive, fast, SEO-ready pages and functional systems using clean components.',
    icon: 'code',
  },
  {
    title: 'Launch',
    description: 'We handle deployment, domain, SSL, analytics, forms, integrations, and launch checks.',
    icon: 'rocket',
  },
  {
    title: 'Support & Growth',
    description: 'We maintain, improve, automate, and expand the system as your business grows.',
    icon: 'linechart',
  },
]

export const techCategories = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Laravel', 'REST APIs'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Firebase', 'MySQL'],
  },
  {
    title: 'Cloud & Hosting',
    items: ['Vercel', 'AWS', 'Google Cloud', 'Cloudflare'],
  },
  {
    title: 'Integrations',
    items: ['Stripe', 'PayTabs', 'WhatsApp', 'Google Maps', 'Email Systems', 'Meta Pixel'],
  },
  {
    title: 'Analytics',
    items: ['Google Analytics', 'Search Console', 'Meta Pixel', 'Dashboards'],
  },
  {
    title: 'AI & Automation',
    items: ['OpenAI API', 'Workflow automation', 'AI chatbots', 'Internal assistants'],
  },
]

export const homeFaqs: FaqItem[] = [
  {
    question: 'How much does a CloudTopia website cost?',
    answer:
      'CloudTopia offers clear starter, growth, and advanced packages. The final price depends on page count, languages, content, integrations, and whether the project includes systems or automation.',
  },
  {
    question: 'How long does a website project take?',
    answer:
      'A focused landing page can move quickly. Full business websites, e-commerce stores, and systems need more discovery, UX, content, and integration time.',
  },
  {
    question: 'Can you build websites in Arabic, English, and Turkish?',
    answer:
      'Yes. CloudTopia treats Arabic, English, and Turkish as real user experiences, including RTL layout needs for Arabic.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. We can audit your current structure, preserve useful SEO value, and rebuild the experience around clearer positioning and conversion paths.',
  },
  {
    question: 'Do you build CRM, ERP, inventory, or booking systems?',
    answer:
      'Yes. CloudTopia builds custom business systems for leads, sales, stock, bookings, reporting, and daily operations.',
  },
  {
    question: 'Can you integrate WhatsApp, payment gateways, maps, analytics, and forms?',
    answer:
      'Yes. We commonly connect websites and systems with WhatsApp, forms, payment providers, Google Maps, analytics, Search Console, and Meta Pixel.',
  },
  {
    question: 'Do I own the website, code, domain, and accounts?',
    answer:
      'Yes. CloudTopia is built around full ownership. Your code, design, domain, accounts, and data belong to you.',
  },
  {
    question: 'Do you provide hosting, SSL, deployment, and analytics setup?',
    answer:
      'Yes. Launch support can include deployment, hosting, SSL, domain configuration, analytics, forms, and basic launch checks.',
  },
  {
    question: 'Can CloudTopia build AI automations for my business?',
    answer:
      'Yes. CloudTopia Labs builds AI assistants, lead qualification flows, reporting helpers, internal copilots, and workflow automation.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Support can include maintenance, improvements, analytics review, automation expansion, and future feature work.',
  },
]

export const pricingPackages = [
  {
    name: 'Starter Presence',
    price: 'From $299',
    description: 'For a focused landing page or first professional website.',
    features: ['Landing page or starter site', 'Responsive design', 'Contact and WhatsApp CTA', 'Basic SEO setup'],
  },
  {
    name: 'Growth Website',
    price: 'From $999',
    description: 'For businesses that need a stronger multilingual website and conversion path.',
    features: ['Multi-page website', 'Service structure', 'Advanced forms', 'Analytics and Search Console'],
    highlighted: true,
  },
  {
    name: 'Business System',
    price: 'From $1,999',
    description: 'For teams replacing scattered spreadsheets and manual operations.',
    features: ['CRM or dashboard foundation', 'User workflows', 'Database and API', 'Reports and integrations'],
  },
  {
    name: 'Custom Cloud Build',
    price: 'Custom',
    description: 'For e-commerce, SaaS platforms, ERP modules, and AI automation.',
    features: ['Custom scope', 'Technical architecture', 'Integrations', 'Launch and support plan'],
  },
]

export const servicePages: Record<string, ServicePageContent> = {
  website: {
    key: 'website',
    eyebrow: 'Website Design & Development',
    title: 'Websites That Make Your Business Look Trusted, Clear, and Ready to Grow',
    subtitle:
      'We design and develop fast, responsive, SEO-ready websites that explain your business clearly and turn visitors into leads.',
    icon: 'globe',
    primaryCta: 'Start Your Website',
    secondaryCta: 'View Projects',
    problem:
      'Many businesses lose leads because their website looks unfinished, loads slowly, hides the offer, or does not guide visitors toward contact.',
    builds: ['Business websites', 'Landing pages', 'Service pages', 'Multilingual pages', 'SEO-ready content structure', 'Lead capture forms'],
    features: ['Responsive layouts', 'Clear service architecture', 'WhatsApp and form CTAs', 'On-page SEO', 'Analytics setup', 'Fast deployment'],
    benefits: ['Increase trust before the first call', 'Explain services clearly', 'Capture better leads', 'Support multilingual markets'],
    process: ['Discovery and page map', 'Wireframe and conversion path', 'Visual design', 'Responsive development', 'SEO and analytics', 'Launch'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Google Analytics', 'Search Console'],
    industries: ['Real Estate', 'Clinics', 'Trading', 'Professional Services', 'Startups'],
    useCases: ['Company website', 'Campaign landing page', 'Service website', 'Multilingual business profile'],
    faqs: [
      { question: 'Can you redesign an existing website?', answer: 'Yes. We can preserve useful content and rebuild the structure, UX, and visual system.' },
      { question: 'Do you handle SEO basics?', answer: 'Yes. Metadata, headings, sitemap-friendly structure, and analytics setup can be included.' },
      { question: 'Can the website support Arabic RTL?', answer: 'Yes. Arabic is treated as a proper RTL experience, not just translated text.' },
    ],
  },
  ecommerce: {
    key: 'ecommerce',
    eyebrow: 'E-commerce Stores',
    title: 'E-commerce Stores Built for Trust, Products, Payments, and Growth',
    subtitle:
      'CloudTopia creates clean online stores, product catalogs, payment-ready checkout flows, and analytics-connected shopping experiences.',
    icon: 'shopping',
    primaryCta: 'Launch Your Store',
    secondaryCta: 'See Pricing',
    problem:
      'Online stores fail when products are hard to browse, checkout feels risky, inventory is disconnected, or analytics are missing.',
    builds: ['Product catalogs', 'Storefronts', 'Checkout flows', 'Payment integrations', 'Product detail pages', 'Order workflows'],
    features: ['Product cards', 'Category browsing', 'Payment provider readiness', 'Analytics events', 'Mobile storefront', 'WhatsApp order paths'],
    benefits: ['Present products clearly', 'Reduce buying friction', 'Track what customers do', 'Prepare for inventory growth'],
    process: ['Catalog planning', 'Store UX', 'Product data structure', 'Checkout setup', 'Analytics', 'Launch checks'],
    technologies: ['Next.js', 'React', 'Stripe', 'PayTabs', 'Google Analytics', 'Meta Pixel'],
    industries: ['Retail', 'Restaurants', 'Trading', 'Art and products', 'Boutiques'],
    useCases: ['Product catalog', 'Starter online store', 'Regional e-commerce site', 'Conversion-focused product launch'],
    faqs: [
      { question: 'Can you integrate payments?', answer: 'Yes. Payment integration depends on provider availability and account approval.' },
      { question: 'Can the store support multiple languages?', answer: 'Yes. We can structure the storefront for Arabic, English, Turkish, or multilingual use.' },
      { question: 'Do you help with analytics?', answer: 'Yes. Store tracking can include GA4, Meta Pixel, and conversion events.' },
    ],
  },
  webApplications: {
    key: 'webApplications',
    eyebrow: 'Custom Web Applications',
    title: 'Custom Web Applications Built Around Your Workflow',
    subtitle:
      'Dashboards, portals, admin panels, and SaaS-style platforms built to make your operations faster, clearer, and easier to manage.',
    icon: 'code',
    primaryCta: 'Plan a Web App',
    secondaryCta: 'Explore Services',
    problem:
      'Teams often outgrow templates and spreadsheets. They need software that matches how customers, staff, data, and approvals actually move.',
    builds: ['Client portals', 'Admin panels', 'Dashboards', 'Internal tools', 'SaaS interfaces', 'API integrations'],
    features: ['User roles', 'Authentication', 'Data dashboards', 'Workflow screens', 'API connections', 'Responsive app UI'],
    benefits: ['Reduce manual work', 'Centralize operations', 'Give clients self-service access', 'Create scalable product foundations'],
    process: ['Workflow mapping', 'Feature prioritization', 'UX architecture', 'App development', 'Testing', 'Deployment'],
    technologies: ['React', 'Next.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Firebase'],
    industries: ['Startups', 'Clinics', 'Logistics', 'Professional Services', 'E-commerce'],
    useCases: ['Client portal', 'Team dashboard', 'Admin panel', 'SaaS MVP', 'Booking platform'],
    faqs: [
      { question: 'Can you build login-based portals?', answer: 'Yes. Authentication, user roles, and secure access can be included.' },
      { question: 'Can you connect APIs?', answer: 'Yes. We can integrate payments, maps, WhatsApp, email systems, and external tools.' },
      { question: 'Can we start with an MVP?', answer: 'Yes. We prefer focused first versions that can expand after launch.' },
    ],
  },
  systems: {
    key: 'systems',
    eyebrow: 'Business Systems / CRM / ERP',
    title: 'CRM, ERP, Inventory, and Operations Systems for Growing Businesses',
    subtitle:
      'Replace scattered spreadsheets and manual follow-ups with connected systems that organize customers, sales, stock, reports, and daily operations.',
    icon: 'settings',
    primaryCta: 'Map Your System',
    secondaryCta: 'See Process',
    problem:
      'As businesses grow, spreadsheets, chat messages, and disconnected tools make sales, stock, booking, and reporting harder to control.',
    builds: ['CRM systems', 'ERP modules', 'Inventory systems', 'Booking systems', 'Sales dashboards', 'Workflow automation'],
    features: ['Customer records', 'Pipeline stages', 'Stock tracking', 'Booking flows', 'Reports', 'Role-based access'],
    benefits: ['See operations clearly', 'Reduce follow-up mistakes', 'Improve reporting', 'Prepare for scale'],
    process: ['Operations audit', 'Data model', 'Workflow design', 'System build', 'Testing with real cases', 'Training and support'],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Cloud hosting'],
    industries: ['Real Estate', 'Clinics', 'Trading', 'Retail', 'Logistics'],
    useCases: ['Sales CRM', 'Inventory dashboard', 'Booking manager', 'Operations reporting', 'ERP foundation'],
    faqs: [
      { question: 'Can you replace spreadsheets?', answer: 'Yes. We map the spreadsheet logic, then design a cleaner workflow and database.' },
      { question: 'Can staff have different permissions?', answer: 'Yes. Role-based access can be part of the system architecture.' },
      { question: 'Can the system grow later?', answer: 'Yes. The system can start with one module and expand into more workflows.' },
    ],
  },
  labs: {
    key: 'labs',
    eyebrow: 'CloudTopia Labs',
    title: 'AI Automation That Solves Real Business Bottlenecks',
    subtitle:
      'CloudTopia Labs builds AI assistants, workflow automations, lead qualification tools, and internal copilots that save time and improve business response speed.',
    icon: 'bot',
    primaryCta: 'Explore AI Automation',
    secondaryCta: 'Start With Discovery',
    problem:
      'AI becomes useful when it is connected to real tasks: lead handling, support, reporting, content operations, and internal knowledge.',
    builds: ['AI assistants', 'Lead qualification flows', 'Internal copilots', 'Workflow agents', 'Automated reports', 'Document and form automation'],
    features: ['Website chat assistants', 'WhatsApp-ready flows', 'Knowledge search', 'Follow-up sequences', 'Dashboard insights', 'Content workflows'],
    benefits: ['Respond faster', 'Save staff time', 'Standardize repetitive work', 'Turn business data into action'],
    process: ['Task selection', 'Data and workflow review', 'Automation design', 'Prototype', 'Testing', 'Controlled launch'],
    technologies: ['OpenAI API', 'Workflow automation', 'APIs', 'CRM integrations', 'Dashboards', 'Knowledge bases'],
    industries: ['Real Estate', 'Clinics', 'E-commerce', 'Professional Services', 'Startups'],
    useCases: ['Lead qualification', 'Support assistant', 'Internal search', 'Report summary', 'Follow-up automation'],
    faqs: [
      { question: 'Do you build AI chatbots?', answer: 'Yes, when a chatbot has a clear business purpose and a reliable knowledge source.' },
      { question: 'Can AI connect to my CRM?', answer: 'Yes. We can design workflows that pass qualified data into your CRM or contact flow.' },
      { question: 'Do you use AI everywhere?', answer: 'No. We use AI where it saves time, improves response speed, or reduces repetitive work.' },
    ],
  },
}

export const valueCards = [
  {
    title: 'Better Digital Presence',
    description: 'Make your business easier to find, trust, and contact online.',
    icon: 'globe',
  },
  {
    title: 'Smoother Operations',
    description: 'Replace scattered manual work with dashboards, systems, and clear workflows.',
    icon: 'workflow',
  },
  {
    title: 'Faster Decisions',
    description: 'Use reporting, analytics, and AI insights to understand what is happening in your business.',
    icon: 'chart',
  },
  {
    title: 'Scalable Growth',
    description: 'Start small and add features, pages, systems, and automation when you need them.',
    icon: 'cloud',
  },
]

export const proofCards = [
  { title: 'Conversion-ready websites', description: 'Page structures, trust cues, and CTAs designed to guide visitors toward action.', icon: 'check' },
  { title: 'Systems that reduce manual work', description: 'Dashboards and workflows that organize customers, sales, inventory, and reporting.', icon: 'workflow' },
  { title: 'AI workflows that save time', description: 'Assistants and automations focused on real business tasks instead of novelty.', icon: 'bot' },
]

export const trustStats = [
  { number: '3', title: 'Languages', text: 'Arabic, English, and Turkish experiences built properly.' },
  { number: '4', title: 'Service Layers', text: 'Presence, applications, systems, and AI innovation.' },
  { number: 'Fixed', title: 'Scope', text: 'Clear pricing and deliverables before development.' },
  { number: 'Full', title: 'Ownership', text: 'Code, design, domain, accounts, and data belong to you.' },
]

export const labsCapabilities = [
  'AI Lead Qualification',
  'WhatsApp/Website Chat Assistants',
  'Internal Knowledge Assistants',
  'Automated Reporting',
  'Content Generation Workflows',
  'Smart Follow-up Sequences',
  'Document & Form Automation',
  'AI Dashboard Insights',
]

export const resourceFallbacks = [
  {
    category: 'Website Strategy',
    title: 'How a professional website helps businesses win trust',
    excerpt: 'A practical look at clarity, credibility, and conversion paths for growing businesses.',
    href: '/blog/company-website-mistakes',
  },
  {
    category: 'Business Systems',
    title: 'CRM vs ERP: what growing businesses actually need',
    excerpt: 'How to choose between customer management, operations software, and a phased system build.',
    href: '/blog/custom-business-system-cost-299-to-3499',
  },
  {
    category: 'AI Automation',
    title: 'Where AI automation saves time in small businesses',
    excerpt: 'Use AI for lead handling, reporting, content operations, and repeated customer questions.',
    href: '/blog/business-process-automation-priority',
  },
]

export const versionXProofLogos = ['Gulf SMBs', 'Clinics', 'Restaurants', 'Real Estate', 'E-commerce', 'Startups']

export const versionXAwards = [
  { label: 'Strategy-first delivery', value: '01', text: 'Scope, pages, features, ownership, launch checklist, and handoff are mapped before development starts.' },
  { label: 'Multilingual execution', value: '03', text: 'Arabic, English, and Turkish journeys are planned as real market experiences, not pasted translations.' },
  { label: 'Connected systems', value: '04', text: 'Website, CRM, dashboards, WhatsApp flows, analytics, and AI automation can grow from the same base.' },
]

export const versionXServiceTabs: VersionXTab[] = [
  {
    label: 'Digital Presence',
    kicker: '[1]',
    title: 'Websites and landing pages that make the business look ready.',
    description: 'Premium corporate sites, landing pages, SEO-ready service pages, and content structures that turn trust into action.',
    image: '/images/services/ecommerce-solutions/3.avif',
    bullets: ['Conversion-led page hierarchy', 'Arabic, English, and Turkish-ready layouts', 'Fast contact and WhatsApp paths'],
    href: '/services/website-development',
  },
  {
    label: 'E-commerce',
    kicker: '[2]',
    title: 'Product experiences that move buyers from browse to inquiry or checkout.',
    description: 'Catalogs, storefronts, payment-ready structures, analytics, and product flows for businesses selling online.',
    image: '/images/services/ecommerce-solutions/3.avif',
    bullets: ['Product catalog architecture', 'Checkout or inquiry journeys', 'Campaign-ready merchandising sections'],
    href: '/services/ecommerce-development',
  },
  {
    label: 'Web Apps',
    kicker: '[3]',
    title: 'Dashboards, portals, and SaaS interfaces for real workflows.',
    description: 'Client portals, admin panels, internal tools, and MVP platforms designed around the way teams actually operate.',
    image: '/images/projects/kvaii.png',
    bullets: ['Role-based screens', 'Operational dashboards', 'API and workflow integrations'],
    href: '/services/web-applications',
  },
  {
    label: 'CRM / ERP',
    kicker: '[4]',
    title: 'Business systems that replace scattered spreadsheets and chat follow-ups.',
    description: 'Customer records, sales tracking, inventory flows, booking systems, and reports connected into one operational layer.',
    image: '/images/services/business-systems-development/CRM System.webp',
    bullets: ['Pipeline and record management', 'Inventory and booking flows', 'Reports that show what changed'],
    href: '/business-systems-development',
  },
  {
    label: 'AI Labs',
    kicker: '[5]',
    title: 'AI assistants and automations attached to measurable business tasks.',
    description: 'Lead qualification, internal copilots, support assistants, report summaries, and smart follow-up workflows.',
    image: '/images/services/business-systems-development/booking system.webp',
    bullets: ['Lead routing and scoring', 'Knowledge assistants', 'Workflow automation experiments'],
    href: '/labs',
  },
]

export const enterpriseServiceTracks: EnterpriseServiceTrack[] = [
  {
    label: 'Application Development',
    title: 'Web products, portals, dashboards, and PWA-style experiences.',
    description:
      'CloudTopia turns operational workflows into responsive web applications, admin panels, client portals, SaaS MVPs, and installable web experiences.',
    href: '/services/web-applications',
    items: ['Custom Web Apps', 'Progressive Web Apps', 'SaaS MVPs', 'Admin Panels', 'Client Portals', 'Application Modernization'],
  },
  {
    label: 'Data & AI',
    title: 'AI assistants, automation, analytics, and business intelligence.',
    description:
      'AI is scoped around measurable business work: lead handling, content operations, reporting, internal search, and repetitive workflow automation.',
    href: '/labs',
    items: ['AI Strategy', 'Generative AI Workflows', 'AI Chat Assistants', 'Predictive Dashboards', 'Document Automation', 'Internal Copilots'],
  },
  {
    label: 'Software & Systems',
    title: 'CRM, ERP, booking, inventory, sales, and reporting systems.',
    description:
      'For teams outgrowing spreadsheets, CloudTopia designs connected systems that organize customers, stock, bookings, approvals, tasks, and reports.',
    href: '/business-systems-development',
    items: ['CRM Systems', 'ERP Modules', 'Inventory Management', 'Booking Systems', 'Sales Pipelines', 'Quality & Testing'],
  },
  {
    label: 'Cloud & Integrations',
    title: 'Cloud-ready architecture, hosting, APIs, security, and launch.',
    description:
      'CloudTopia connects the website, database, forms, payments, WhatsApp, analytics, maps, and hosting into a maintainable digital foundation.',
    href: '/services#cloud-integrations',
    items: ['Cloud App Development', 'Cloud Migration Planning', 'API Integrations', 'Security Readiness', 'Managed Hosting', 'Launch Operations'],
  },
  {
    label: 'Digital Growth',
    title: 'SEO-ready pages, content systems, analytics, and conversion paths.',
    description:
      'The website is structured as a growth asset with service pages, industry pages, blog resources, campaign landing pages, and measurement.',
    href: '/services/website-development',
    items: ['SEO Landing Pages', 'Conversion UX', 'Content Systems', 'Social Creatives', 'Analytics Setup', 'Campaign Pages'],
  },
]

export const seoClusters: SeoCluster[] = [
  {
    title: 'Commercial Service Hubs',
    description: 'High-intent pages for buyers comparing website, e-commerce, system, app, and AI automation options.',
    links: [
      { label: 'Website Design & Development', href: '/services/website-development' },
      { label: 'E-commerce Stores', href: '/services/ecommerce-development' },
      { label: 'Custom Web Applications', href: '/services/web-applications' },
      { label: 'CRM / ERP Systems', href: '/business-systems-development' },
      { label: 'CloudTopia Labs', href: '/labs' },
    ],
  },
  {
    title: 'Industry Solution Pages',
    description: 'Business-model pages that explain pain points, workflows, features, and CTAs for each vertical.',
    links: [
      { label: 'Real Estate Systems', href: '/industries#real-estate' },
      { label: 'Clinics & Beauty Centers', href: '/industries#clinics' },
      { label: 'Restaurants & Cafes', href: '/industries#restaurants' },
      { label: 'Trading / Import-Export', href: '/industries#trading' },
      { label: 'Startups & MVPs', href: '/industries#startups' },
    ],
  },
  {
    title: 'Education & Proof Content',
    description: 'Resources that build trust before the first call: pricing guidance, process pages, project stories, and practical explainers.',
    links: [
      { label: 'Projects / Case Studies', href: '/projects' },
      { label: 'Pricing / Packages', href: '/pricing' },
      { label: 'Business Systems Guides', href: '/blog/custom-business-system-cost-299-to-3499' },
      { label: 'AI Automation Guides', href: '/blog/business-process-automation-priority' },
      { label: 'Website Strategy Guides', href: '/blog/company-website-mistakes' },
    ],
  },
]

export const versionXFinderSteps: VersionXFinderStep[] = [
  { question: 'What are you trying to improve first?', options: ['Online trust', 'Lead capture', 'Operations', 'Sales system', 'AI automation'] },
  { question: 'What stage is the business in?', options: ['Idea', 'Existing website', 'Manual operations', 'Growing team', 'Scaling across markets'] },
  { question: 'Which experience matters most?', options: ['Website', 'Storefront', 'Dashboard', 'CRM', 'WhatsApp flow'] },
  { question: 'How fast do you need the first version?', options: ['2-3 weeks', '1 month', 'Quarter roadmap', 'Not sure'] },
  { question: 'Recommended first move', options: ['Strategy sprint', 'Website rebuild', 'System MVP', 'AI workflow prototype'] },
]

export const versionXWorkWith = [
  { title: 'Startups', text: 'Launch clear MVP pages, investor-ready demos, and product dashboards without overbuilding.' },
  { title: 'SMBs', text: 'Upgrade credibility, capture better leads, and connect daily work into cleaner systems.' },
  { title: 'Service Teams', text: 'Turn bookings, inquiries, follow-ups, and reporting into one guided digital flow.' },
  { title: 'Growing Brands', text: 'Create multilingual market pages, campaigns, analytics, and automation for expansion.' },
]

export const versionXTestimonials: VersionXTestimonial[] = [
  {
    quote: 'CloudTopia helped us turn a scattered idea into a clear website, lead path, and follow-up system.',
    author: 'Operations Lead',
    role: 'Service business',
    result: 'Faster inquiry handling',
  },
  {
    quote: 'The work felt structured from the first call: scope, content, launch, analytics, and handoff were all visible.',
    author: 'Founder',
    role: 'E-commerce startup',
    result: 'Cleaner launch path',
  },
  {
    quote: 'We finally had a dashboard concept our team could understand before development started.',
    author: 'Managing Partner',
    role: 'Real estate team',
    result: 'Better sales visibility',
  },
]

export const versionXOffices: VersionXOffice[] = [
  { city: 'Istanbul', region: 'Turkey', detail: 'Product strategy, design, and engineering coordination.' },
  { city: 'Riyadh', region: 'Saudi Arabia', detail: 'Arabic-first business websites, commerce, and automation planning.' },
  { city: 'Dubai', region: 'UAE', detail: 'Growth websites, lead systems, and multilingual launch support.' },
  { city: 'Remote', region: 'Global', detail: 'Async delivery for teams across Gulf, Europe, and international markets.' },
]

export const versionXCountries = ['Turkey', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'United Kingdom', 'Germany', 'United States']

export const versionXFooterColumns = [
  {
    title: 'Services',
    links: [
      ['Website Design', '/services/website-development'],
      ['E-commerce', '/services/ecommerce-development'],
      ['Web Applications', '/services/web-applications'],
      ['CRM / ERP Systems', '/business-systems-development'],
      ['CloudTopia Labs', '/labs'],
    ],
  },
  {
    title: 'Industries',
    links: [
      ['Real Estate', '/industries#real-estate'],
      ['Clinics', '/industries#clinics'],
      ['Restaurants', '/industries#restaurants'],
      ['Trading', '/industries#trading'],
      ['E-commerce', '/industries#e-commerce'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Projects', '/projects'],
      ['Pricing', '/pricing'],
      ['About', '/about'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Build Paths',
    links: [
      ['Digital Plan', '/contact'],
      ['Project Estimator', '/#estimator'],
      ['AI Solution Finder', '/#tech-solution-finder'],
      ['Case Studies', '/projects'],
      ['Process', '/about'],
    ],
  },
]

export function serviceForSlug(slug: string): ServicePageContent {
  return servicePages[slug] || servicePages.website
}
