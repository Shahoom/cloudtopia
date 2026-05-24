import { slugify } from './utils.ts'

type SampleCategory = {
  name: string
  description: string
  icon: string
  color: string
  order: number
  featured: boolean
}

type SampleTag = {
  name: string
}

type SamplePost = {
  title: string
  excerpt: string
  shortExcerpt?: string
  category: string
  tags: string[]
  coverImage: string
  featured?: boolean
  pinned?: boolean
  editorPick?: boolean
  trending?: boolean
  contentType?: string
  difficulty?: string
  targetAudience?: string
  serviceFocus?: string
  publishedAt: string
  sections: Array<{
    heading: string
    body: string
    bullets?: string[]
  }>
}

export const sampleBlogCategories: SampleCategory[] = [
  {
    name: 'Web Development',
    description: 'Modern websites, web applications, performance, UX, and conversion-focused digital presence.',
    icon: 'code',
    color: '#0284c7',
    order: 10,
    featured: true,
  },
  {
    name: 'Business Systems',
    description: 'Custom dashboards, CRM-style workflows, admin panels, and internal tools for growing teams.',
    icon: 'workflow',
    color: '#0f766e',
    order: 20,
    featured: true,
  },
  {
    name: 'Automation',
    description: 'Workflow automation ideas that remove repetitive operations and connect the tools your team uses.',
    icon: 'zap',
    color: '#7c3aed',
    order: 30,
    featured: true,
  },
  {
    name: 'AI Solutions',
    description: 'Practical AI use cases for lead handling, customer support, content operations, and smarter systems.',
    icon: 'sparkles',
    color: '#0369a1',
    order: 40,
    featured: true,
  },
  {
    name: 'Cloud Technology',
    description: 'Scalable cloud architecture, deployment, security, integrations, and long-term platform planning.',
    icon: 'cloud',
    color: '#2563eb',
    order: 50,
    featured: true,
  },
  {
    name: 'CRM & ERP',
    description: 'Sales pipelines, customer data, inventory, finance operations, and business management systems.',
    icon: 'database',
    color: '#0891b2',
    order: 60,
    featured: true,
  },
  {
    name: 'Startup Growth',
    description: 'Digital foundations, launch systems, analytics, and growth decisions for early-stage teams.',
    icon: 'rocket',
    color: '#0284c7',
    order: 70,
    featured: false,
  },
  {
    name: 'Digital Presence',
    description: 'Brand trust, online visibility, SEO, content, and the digital assets every serious business needs.',
    icon: 'globe',
    color: '#0ea5e9',
    order: 80,
    featured: false,
  },
  {
    name: 'Case Studies',
    description: 'Behind-the-scenes breakdowns of websites, platforms, automations, and systems CloudTopia builds.',
    icon: 'briefcase',
    color: '#334155',
    order: 90,
    featured: false,
  },
  {
    name: 'Guides',
    description: 'Clear, practical explainers for planning websites, apps, systems, and cloud-based products.',
    icon: 'book',
    color: '#0284c7',
    order: 100,
    featured: false,
  },
  {
    name: 'Website Strategy',
    description: 'Strategic planning for websites that need to build trust, convert visitors, and support growth.',
    icon: 'map',
    color: '#0ea5e9',
    order: 110,
    featured: false,
  },
  {
    name: 'Digital Transformation',
    description: 'How modern companies connect websites, software, data, cloud infrastructure, automation, and AI.',
    icon: 'network',
    color: '#0369a1',
    order: 120,
    featured: false,
  },
]

export const sampleBlogTags: SampleTag[] = [
  { name: 'Website Strategy' },
  { name: 'Custom Software' },
  { name: 'Small Business' },
  { name: 'CRM' },
  { name: 'AI Automation' },
  { name: 'Conversion' },
  { name: 'Digital Transformation' },
  { name: 'Dashboards' },
]

export const sampleBlogPosts: SamplePost[] = [
  {
    title: 'Why Your Business Needs More Than an Instagram Page',
    excerpt:
      'Social platforms can create attention, but serious growth needs a website and system layer your business actually owns.',
    category: 'Digital Presence',
    tags: ['Website Strategy', 'Small Business', 'Conversion'],
    coverImage: '/images/insights/digital-presence.svg',
    featured: true,
    pinned: true,
    editorPick: true,
    trending: true,
    contentType: 'guide',
    serviceFocus: 'digital_presence',
    targetAudience: 'small_businesses',
    publishedAt: '2026-05-24T09:00:00.000Z',
    sections: [
      {
        heading: 'Social media is rented attention',
        body:
          'Instagram, TikTok, and LinkedIn are useful channels, but they are not your digital headquarters. Algorithms change, accounts get restricted, and visitors rarely find the full picture of your offer in one post.',
        bullets: ['A website gives customers a stable source of truth.', 'Search engines can discover service pages for years.', 'Forms and analytics turn interest into measurable demand.'],
      },
      {
        heading: 'A website creates operational leverage',
        body:
          'The best company websites do more than look polished. They collect inquiries, qualify leads, route people to the right service, and connect with the internal tools your team already uses.',
      },
      {
        heading: 'What to build first',
        body:
          'Start with a clear homepage, focused service pages, trust signals, and a simple conversion path. Once that foundation works, add dashboards, CRM workflows, automation, and content systems around it.',
      },
    ],
  },
  {
    title: 'Website vs Web Application: What Should Your Company Build?',
    excerpt:
      'A practical decision framework for choosing between a marketing website, a web app, or a hybrid platform.',
    category: 'Web Development',
    tags: ['Website Strategy', 'Custom Software', 'Digital Transformation'],
    coverImage: '/images/insights/web-app-strategy.svg',
    featured: true,
    editorPick: true,
    contentType: 'comparison',
    serviceFocus: 'web_apps',
    publishedAt: '2026-05-23T09:00:00.000Z',
    sections: [
      {
        heading: 'A website explains and converts',
        body:
          'A website is the right first move when your main goal is trust, search visibility, service explanation, lead capture, and sales enablement.',
      },
      {
        heading: 'A web application performs work',
        body:
          'A web application is the right move when users need accounts, dashboards, workflows, data entry, approvals, payments, reporting, or personalized experiences.',
        bullets: ['Customer portals', 'Booking systems', 'Admin dashboards', 'Internal workflow tools'],
      },
      {
        heading: 'Most growing companies need a hybrid',
        body:
          'CloudTopia often recommends a public website connected to private app-like features. That gives the business marketing reach and operational depth without overbuilding the first release.',
      },
    ],
  },
  {
    title: 'How CRM Systems Help Small Businesses Grow',
    excerpt:
      'A CRM is not just a contact list. It is a repeatable sales operating system for teams that do not want leads slipping away.',
    category: 'CRM & ERP',
    tags: ['CRM', 'Small Business', 'Dashboards'],
    coverImage: '/images/insights/crm-growth.svg',
    featured: true,
    trending: true,
    contentType: 'guide',
    serviceFocus: 'crm',
    publishedAt: '2026-05-22T09:00:00.000Z',
    sections: [
      {
        heading: 'Growth breaks manual follow-up',
        body:
          'When inquiries live across WhatsApp, email, spreadsheets, and memory, the team loses context. A CRM gives every lead a clear stage, owner, next action, and history.',
      },
      {
        heading: 'The dashboard matters',
        body:
          'A useful CRM shows pipeline value, stale leads, conversion rates, and upcoming tasks without forcing managers to ask for manual updates.',
      },
      {
        heading: 'Start simple, then automate',
        body:
          'The first version should capture leads, track stages, and schedule follow-ups. Later, automation can assign leads, send reminders, create proposals, and sync data with finance or ERP workflows.',
      },
    ],
  },
  {
    title: 'AI Automation Ideas for Startups and Service Businesses',
    excerpt:
      'Five realistic AI automation use cases that reduce busywork without turning your operations into a science project.',
    category: 'AI Solutions',
    tags: ['AI Automation', 'Custom Software', 'Small Business'],
    coverImage: '/images/insights/ai-automation.svg',
    editorPick: true,
    contentType: 'article',
    serviceFocus: 'ai',
    publishedAt: '2026-05-21T09:00:00.000Z',
    sections: [
      {
        heading: 'Lead qualification',
        body:
          'AI can ask structured intake questions, summarize needs, score urgency, and route leads to the right person before a human starts the conversation.',
      },
      {
        heading: 'Customer support triage',
        body:
          'For repeated questions, AI can draft answers from an approved knowledge base and escalate only the cases that need judgment.',
      },
      {
        heading: 'Operations summaries',
        body:
          'AI is especially useful when it reads messy inputs and turns them into clean summaries: meeting notes, ticket updates, sales calls, project status, and internal reports.',
      },
    ],
  },
  {
    title: 'What Makes a Website Actually Convert Visitors into Clients?',
    excerpt:
      'A premium design helps, but conversion comes from clarity, trust, speed, and a path that matches how buyers make decisions.',
    category: 'Guides',
    tags: ['Conversion', 'Website Strategy', 'Digital Transformation'],
    coverImage: '/images/insights/conversion-website.svg',
    contentType: 'guide',
    serviceFocus: 'websites',
    publishedAt: '2026-05-20T09:00:00.000Z',
    sections: [
      {
        heading: 'Clarity beats decoration',
        body:
          'Visitors need to understand what you do, who it is for, what makes you credible, and what to do next within seconds.',
      },
      {
        heading: 'Trust lowers friction',
        body:
          'Case studies, proof points, process details, transparent pricing direction, and strong service pages help a buyer feel less risk before they contact you.',
      },
      {
        heading: 'Speed protects intent',
        body:
          'A slow page can waste the demand your marketing created. Technical performance, responsive layouts, and clean content structure all support conversion.',
      },
    ],
  },
  {
    title: 'How Business Dashboards Help Founders Make Better Decisions',
    excerpt:
      'Dashboards help founders see sales, operations, support, and financial signals in one place before small issues become expensive.',
    category: 'Business Systems',
    tags: ['Dashboards', 'Small Business', 'Digital Transformation'],
    coverImage: '/images/insights/crm-growth.svg',
    contentType: 'guide',
    serviceFocus: 'business_systems',
    targetAudience: 'founders',
    publishedAt: '2026-05-19T09:00:00.000Z',
    sections: [
      {
        heading: 'Dashboards turn scattered data into decisions',
        body:
          'Founders often depend on screenshots, spreadsheets, and manual updates. A dashboard brings the most important operational signals into one clear view.',
      },
      {
        heading: 'The best dashboard starts with questions',
        body:
          'Before designing charts, define the decisions the business needs to make weekly. Revenue, leads, delivery, support, and cash-flow signals should map to real actions.',
      },
      {
        heading: 'Automation keeps the dashboard useful',
        body:
          'A dashboard should pull from systems automatically where possible. Manual reporting breaks trust because the numbers become stale before anyone acts on them.',
      },
    ],
  },
  {
    title: 'The Difference Between a Normal Website and a Scalable Digital System',
    excerpt:
      'A normal website explains your company. A scalable digital system connects marketing, workflows, data, and operations.',
    category: 'Digital Transformation',
    tags: ['Website Strategy', 'Custom Software', 'Digital Transformation'],
    coverImage: '/images/insights/web-app-strategy.svg',
    contentType: 'article',
    serviceFocus: 'cloud',
    targetAudience: 'medium_businesses',
    publishedAt: '2026-05-18T09:00:00.000Z',
    sections: [
      {
        heading: 'A system supports the whole buyer journey',
        body:
          'The public website is only the visible layer. Behind it, forms, analytics, CRM workflows, internal notifications, dashboards, and automations should work together.',
      },
      {
        heading: 'Scalability is operational, not only technical',
        body:
          'A scalable system lets the business handle more leads, requests, orders, or cases without adding the same amount of manual work.',
      },
      {
        heading: 'Build the foundation first',
        body:
          'CloudTopia usually starts with the conversion path, data structure, and workflow map before moving into advanced automation or AI features.',
      },
    ],
  },
  {
    title: 'How CloudTopia Builds Digital Systems for Modern Companies',
    excerpt:
      'A behind-the-scenes look at how CloudTopia plans, designs, and ships websites, dashboards, automations, and AI-powered systems.',
    category: 'Case Studies',
    tags: ['Custom Software', 'Dashboards', 'Digital Transformation'],
    coverImage: '/images/insights/digital-presence.svg',
    contentType: 'case_study',
    serviceFocus: 'business_systems',
    targetAudience: 'founders',
    featured: true,
    publishedAt: '2026-05-17T09:00:00.000Z',
    sections: [
      {
        heading: 'Discovery focuses on business movement',
        body:
          'CloudTopia starts by understanding what needs to become faster, clearer, more automated, or easier for customers and teams.',
      },
      {
        heading: 'Design and engineering stay connected',
        body:
          'Premium interfaces matter, but the system must also have clean data models, reliable admin controls, and a maintainable deployment path.',
      },
      {
        heading: 'Launch is only the first operating version',
        body:
          'After release, analytics, feedback, and operational patterns guide the next improvements. The result is a digital system that can keep maturing with the company.',
      },
    ],
  },
]

export function sampleSlug(value: string) {
  return slugify(value)
}

export function createLexicalArticle(post: SamplePost) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: post.sections.flatMap((section) => [
        {
          type: 'heading',
          tag: 'h2',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [{ type: 'text', text: section.heading, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        },
        {
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [{ type: 'text', text: section.body, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        },
        ...(section.bullets
          ? [
              {
                type: 'list',
                listType: 'bullet',
                start: 1,
                tag: 'ul',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                children: section.bullets.map((bullet) => ({
                  type: 'listitem',
                  value: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: bullet,
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                })),
              },
            ]
          : []),
      ]),
    },
  }
}

export function createContentBlocks(post: SamplePost) {
  return [
    {
      blockType: 'calloutBlock',
      type: 'cloudtopia-note',
      title: 'CloudTopia note',
      content: `Use this article as a planning lens for ${post.category.toLowerCase()} decisions, not as a one-size-fits-all checklist.`,
    },
    {
      blockType: 'statBlock',
      statNumber: '3x',
      statLabel: 'More useful when strategy, design, and systems are planned together',
      description: 'The highest-value digital projects connect the public experience with internal workflows and measurable outcomes.',
    },
    {
      blockType: 'faqBlock',
      question: `When should a business invest in ${post.category.toLowerCase()}?`,
      answer: 'When the current digital setup is limiting trust, lead quality, team speed, customer experience, or operational visibility.',
      includeInSchema: true,
    },
    {
      blockType: 'ctaInlineBlock',
      title: 'Want CloudTopia to plan this with you?',
      description: 'Share your idea and CloudTopia can help turn it into a scalable website, platform, dashboard, automation flow, or AI-powered system.',
      buttonText: 'Start Your Project',
      buttonUrl: '/contact',
      style: 'azure',
    },
  ]
}
