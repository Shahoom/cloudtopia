/**
 * Technology Stack Data – CloudTopia
 * ------------------------------------
 * To add a new category:
 *   1. Add an entry to SERVICE_CATEGORIES with a unique `id`.
 *   2. Add a matching entry in TECH_GROUPS with the same `categoryId`.
 *
 * To add a new technology inside an existing category:
 *   - Find the matching group inside TECH_GROUPS.
 *   - Add an item to the relevant subcategory's `items` array.
 *   - Each item needs: { name, icon } where icon is a URL or SVG path string.
 *
 * Icons are sourced from public SVG logos hosted by svg-box / simpleicons
 * or custom inline SVG paths – keep them small and square.
 */

export type LocalizedText = {
  en: string
  ar: string
}

export type TechItem = {
  /** Display name of the technology */
  name: string
  /** Path/URL to the SVG icon (kept under /images/tech-icons/ or an external CDN). */
  icon: string
  /** Optional short description shown on hover */
  description?: LocalizedText
}

export type TechSubcategory = {
  label: LocalizedText
  items: TechItem[]
}

export type ServiceCategory = {
  id: string
  label: LocalizedText
  /** Lucide icon name to display on the tab button */
  iconName: string
}

export type TechGroup = {
  categoryId: string
  subcategories: TechSubcategory[]
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CATEGORIES (tabs)
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'digital-presence',
    label: { en: 'Digital Presence', ar: 'الحضور الرقمي' },
    iconName: 'Globe',
  },
  {
    id: 'web-applications',
    label: { en: 'Web Applications', ar: 'تطبيقات الويب' },
    iconName: 'Layout',
  },
  {
    id: 'business-systems',
    label: { en: 'Business Systems', ar: 'أنظمة الأعمال' },
    iconName: 'Building2',
  },
  {
    id: 'cloud-infrastructure',
    label: { en: 'Cloud & Infrastructure', ar: 'البنية التحتية السحابية' },
    iconName: 'Cloud',
  },
  {
    id: 'ai-automation',
    label: { en: 'AI & Automation', ar: 'الذكاء الاصطناعي والأتمتة' },
    iconName: 'Bot',
  },
  {
    id: 'digital-growth',
    label: { en: 'Digital Growth', ar: 'النمو الرقمي' },
    iconName: 'TrendingUp',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY GROUPS (content per category)
// ─────────────────────────────────────────────────────────────────────────────

export const TECH_GROUPS: TechGroup[] = [
  // ── 1. Digital Presence ────────────────────────────────────────────────────
  {
    categoryId: 'digital-presence',
    subcategories: [
      {
        label: { en: 'Frontend', ar: 'الواجهة الأمامية' },
        items: [
          {
            name: 'Next.js',
            icon: 'https://cdn.simpleicons.org/nextdotjs/white',
          },
          {
            name: 'React',
            icon: 'https://cdn.simpleicons.org/react/61DAFB',
          },
          {
            name: 'Tailwind CSS',
            icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
          },
          {
            name: 'HTML5',
            icon: 'https://cdn.simpleicons.org/html5/E34F26',
          },
          {
            name: 'TypeScript',
            icon: 'https://cdn.simpleicons.org/typescript/3178C6',
          },
        ],
      },
      {
        label: { en: 'CMS', ar: 'إدارة المحتوى' },
        items: [
          {
            name: 'Payload CMS',
            icon: 'https://cdn.simpleicons.org/payloadcms/white',
          },
          {
            name: 'WordPress',
            icon: 'https://cdn.simpleicons.org/wordpress/21759B',
          },
          {
            name: 'Strapi',
            icon: 'https://cdn.simpleicons.org/strapi/4945FF',
          },
          {
            name: 'Sanity',
            icon: 'https://cdn.simpleicons.org/sanity/F03E2F',
          },
        ],
      },
      {
        label: { en: 'SEO & Analytics', ar: 'السيو والتحليلات' },
        items: [
          {
            name: 'Google Analytics',
            icon: 'https://cdn.simpleicons.org/googleanalytics/E37400',
          },
          {
            name: 'Vercel Analytics',
            icon: 'https://cdn.simpleicons.org/vercel/white',
          },
          {
            name: 'PostHog',
            icon: 'https://cdn.simpleicons.org/posthog/white',
          },
          {
            name: 'Plausible',
            icon: 'https://cdn.simpleicons.org/plausibleanalytics/5850EC',
          },
        ],
      },
      {
        label: { en: 'Integrations', ar: 'التكاملات' },
        items: [
          {
            name: 'WhatsApp API',
            icon: 'https://cdn.simpleicons.org/whatsapp/25D366',
          },
          {
            name: 'Stripe',
            icon: 'https://cdn.simpleicons.org/stripe/635BFF',
          },
          {
            name: 'Google Maps',
            icon: 'https://cdn.simpleicons.org/googlemaps/4285F4',
          },
          {
            name: 'Cloudinary',
            icon: 'https://cdn.simpleicons.org/cloudinary/3448C5',
          },
        ],
      },
    ],
  },

  // ── 2. Web Applications ────────────────────────────────────────────────────
  {
    categoryId: 'web-applications',
    subcategories: [
      {
        label: { en: 'Frontend', ar: 'الواجهة الأمامية' },
        items: [
          {
            name: 'React',
            icon: 'https://cdn.simpleicons.org/react/61DAFB',
          },
          {
            name: 'Next.js',
            icon: 'https://cdn.simpleicons.org/nextdotjs/white',
          },
          {
            name: 'Vue.js',
            icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D',
          },
          {
            name: 'TypeScript',
            icon: 'https://cdn.simpleicons.org/typescript/3178C6',
          },
        ],
      },
      {
        label: { en: 'Backend', ar: 'الخادم الخلفي' },
        items: [
          {
            name: 'Node.js',
            icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
          },
          {
            name: 'NestJS',
            icon: 'https://cdn.simpleicons.org/nestjs/E0234E',
          },
          {
            name: 'Laravel',
            icon: 'https://cdn.simpleicons.org/laravel/FF2D20',
          },
          {
            name: 'FastAPI',
            icon: 'https://cdn.simpleicons.org/fastapi/009688',
          },
        ],
      },
      {
        label: { en: 'Databases', ar: 'قواعد البيانات' },
        items: [
          {
            name: 'PostgreSQL',
            icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
          },
          {
            name: 'MySQL',
            icon: 'https://cdn.simpleicons.org/mysql/4479A1',
          },
          {
            name: 'MongoDB',
            icon: 'https://cdn.simpleicons.org/mongodb/47A248',
          },
          {
            name: 'Redis',
            icon: 'https://cdn.simpleicons.org/redis/FF4438',
          },
        ],
      },
      {
        label: { en: 'Hosting', ar: 'الاستضافة' },
        items: [
          {
            name: 'Vercel',
            icon: 'https://cdn.simpleicons.org/vercel/white',
          },
          {
            name: 'Netlify',
            icon: 'https://cdn.simpleicons.org/netlify/00C7B7',
          },
          {
            name: 'AWS Amplify',
            icon: 'https://cdn.simpleicons.org/awsamplify/FF9900',
          },
          {
            name: 'Render',
            icon: 'https://cdn.simpleicons.org/render/46E3B7',
          },
        ],
      },
      {
        label: { en: 'APIs & Libraries', ar: 'واجهات وأدوات' },
        items: [
          {
            name: 'GraphQL',
            icon: 'https://cdn.simpleicons.org/graphql/E10098',
          },
          {
            name: 'REST APIs',
            icon: 'https://cdn.simpleicons.org/openapiinitiative/6BA539',
          },
          {
            name: 'Stripe',
            icon: 'https://cdn.simpleicons.org/stripe/635BFF',
          },
          {
            name: 'Twilio',
            icon: 'https://cdn.simpleicons.org/twilio/F22F46',
          },
        ],
      },
      {
        label: { en: 'Testing & Monitoring', ar: 'الاختبار والمراقبة' },
        items: [
          {
            name: 'Jest',
            icon: 'https://cdn.simpleicons.org/jest/C21325',
          },
          {
            name: 'Cypress',
            icon: 'https://cdn.simpleicons.org/cypress/17202C',
          },
          {
            name: 'Sentry',
            icon: 'https://cdn.simpleicons.org/sentry/362D59',
          },
          {
            name: 'Playwright',
            icon: 'https://cdn.simpleicons.org/playwright/2EAD33',
          },
        ],
      },
    ],
  },

  // ── 3. Business Systems ────────────────────────────────────────────────────
  {
    categoryId: 'business-systems',
    subcategories: [
      {
        label: { en: 'Frameworks', ar: 'أُطر التطوير' },
        items: [
          {
            name: 'Next.js',
            icon: 'https://cdn.simpleicons.org/nextdotjs/white',
          },
          {
            name: 'Node.js',
            icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
          },
          {
            name: 'Laravel',
            icon: 'https://cdn.simpleicons.org/laravel/FF2D20',
          },
          {
            name: 'FastAPI',
            icon: 'https://cdn.simpleicons.org/fastapi/009688',
          },
        ],
      },
      {
        label: { en: 'Databases', ar: 'قواعد البيانات' },
        items: [
          {
            name: 'PostgreSQL',
            icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
          },
          {
            name: 'MySQL',
            icon: 'https://cdn.simpleicons.org/mysql/4479A1',
          },
          {
            name: 'Supabase',
            icon: 'https://cdn.simpleicons.org/supabase/3ECF8E',
          },
          {
            name: 'PlanetScale',
            icon: 'https://cdn.simpleicons.org/planetscale/white',
          },
        ],
      },
      {
        label: { en: 'Automation', ar: 'الأتمتة' },
        items: [
          {
            name: 'Zapier',
            icon: 'https://cdn.simpleicons.org/zapier/FF4A00',
          },
          {
            name: 'n8n',
            icon: 'https://cdn.simpleicons.org/n8n/EA4B71',
          },
          {
            name: 'Make.com',
            icon: 'https://cdn.simpleicons.org/make/6D00CC',
          },
          {
            name: 'HubSpot',
            icon: 'https://cdn.simpleicons.org/hubspot/FF7A59',
          },
        ],
      },
      {
        label: { en: 'AI Assistants', ar: 'مساعدات الذكاء الاصطناعي' },
        items: [
          {
            name: 'OpenAI GPT',
            icon: 'https://cdn.simpleicons.org/openai/white',
          },
          {
            name: 'LangChain',
            icon: 'https://cdn.simpleicons.org/langchain/white',
          },
          {
            name: 'Anthropic Claude',
            icon: 'https://cdn.simpleicons.org/anthropic/white',
          },
        ],
      },
      {
        label: { en: 'Messaging', ar: 'المراسلة' },
        items: [
          {
            name: 'WhatsApp API',
            icon: 'https://cdn.simpleicons.org/whatsapp/25D366',
          },
          {
            name: 'Twilio SMS',
            icon: 'https://cdn.simpleicons.org/twilio/F22F46',
          },
          {
            name: 'SendGrid',
            icon: 'https://cdn.simpleicons.org/sendgrid/51A9E3',
          },
          {
            name: 'Slack',
            icon: 'https://cdn.simpleicons.org/slack/4A154B',
          },
        ],
      },
    ],
  },

  // ── 4. Cloud & Infrastructure ──────────────────────────────────────────────
  {
    categoryId: 'cloud-infrastructure',
    subcategories: [
      {
        label: { en: 'Cloud Platforms', ar: 'المنصات السحابية' },
        items: [
          {
            name: 'Vercel',
            icon: 'https://cdn.simpleicons.org/vercel/white',
          },
          {
            name: 'AWS',
            icon: 'https://cdn.simpleicons.org/amazonaws/FF9900',
          },
          {
            name: 'DigitalOcean',
            icon: 'https://cdn.simpleicons.org/digitalocean/0080FF',
          },
          {
            name: 'Scaleway',
            icon: 'https://cdn.simpleicons.org/scaleway/4F0599',
          },
          {
            name: 'Google Cloud',
            icon: 'https://cdn.simpleicons.org/googlecloud/4285F4',
          },
        ],
      },
      {
        label: { en: 'DevOps & Containers', ar: 'الحاويات والـ DevOps' },
        items: [
          {
            name: 'Docker',
            icon: 'https://cdn.simpleicons.org/docker/2496ED',
          },
          {
            name: 'Kubernetes',
            icon: 'https://cdn.simpleicons.org/kubernetes/326CE5',
          },
          {
            name: 'GitHub Actions',
            icon: 'https://cdn.simpleicons.org/githubactions/2088FF',
          },
          {
            name: 'Terraform',
            icon: 'https://cdn.simpleicons.org/terraform/844FBA',
          },
        ],
      },
      {
        label: { en: 'Database Services', ar: 'خدمات قواعد البيانات' },
        items: [
          {
            name: 'Supabase',
            icon: 'https://cdn.simpleicons.org/supabase/3ECF8E',
          },
          {
            name: 'PlanetScale',
            icon: 'https://cdn.simpleicons.org/planetscale/white',
          },
          {
            name: 'MongoDB Atlas',
            icon: 'https://cdn.simpleicons.org/mongodb/47A248',
          },
          {
            name: 'Redis Cloud',
            icon: 'https://cdn.simpleicons.org/redis/FF4438',
          },
        ],
      },
      {
        label: { en: 'Performance & Security', ar: 'الأداء والأمان' },
        items: [
          {
            name: 'Cloudflare',
            icon: 'https://cdn.simpleicons.org/cloudflare/F38020',
          },
          {
            name: 'Firebase Auth',
            icon: 'https://cdn.simpleicons.org/firebase/FFCA28',
          },
          {
            name: 'Nginx',
            icon: 'https://cdn.simpleicons.org/nginx/009639',
          },
          {
            name: 'Let\'s Encrypt',
            icon: 'https://cdn.simpleicons.org/letsencrypt/003A70',
          },
        ],
      },
      {
        label: { en: 'Monitoring & Logging', ar: 'المراقبة والتسجيل' },
        items: [
          {
            name: 'Grafana',
            icon: 'https://cdn.simpleicons.org/grafana/F46800',
          },
          {
            name: 'Prometheus',
            icon: 'https://cdn.simpleicons.org/prometheus/E6522C',
          },
          {
            name: 'Sentry',
            icon: 'https://cdn.simpleicons.org/sentry/362D59',
          },
          {
            name: 'LogRocket',
            icon: 'https://cdn.simpleicons.org/logrocket/764ABC',
          },
        ],
      },
    ],
  },

  // ── 5. AI & Automation ─────────────────────────────────────────────────────
  {
    categoryId: 'ai-automation',
    subcategories: [
      {
        label: { en: 'AI Models', ar: 'نماذج الذكاء الاصطناعي' },
        items: [
          {
            name: 'OpenAI GPT',
            icon: 'https://cdn.simpleicons.org/openai/white',
          },
          {
            name: 'Google Gemini',
            icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2',
          },
          {
            name: 'Anthropic Claude',
            icon: 'https://cdn.simpleicons.org/anthropic/white',
          },
          {
            name: 'Hugging Face',
            icon: 'https://cdn.simpleicons.org/huggingface/FFD21E',
          },
        ],
      },
      {
        label: { en: 'Frameworks', ar: 'أُطر العمل' },
        items: [
          {
            name: 'LangChain',
            icon: 'https://cdn.simpleicons.org/langchain/white',
          },
          {
            name: 'FastAPI',
            icon: 'https://cdn.simpleicons.org/fastapi/009688',
          },
          {
            name: 'PyTorch',
            icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
          },
          {
            name: 'Python',
            icon: 'https://cdn.simpleicons.org/python/3776AB',
          },
        ],
      },
      {
        label: { en: 'Data Engineering', ar: 'هندسة البيانات' },
        items: [
          {
            name: 'Apache Airflow',
            icon: 'https://cdn.simpleicons.org/apacheairflow/017CEE',
          },
          {
            name: 'dbt',
            icon: 'https://cdn.simpleicons.org/dbt/FF694B',
          },
          {
            name: 'PostgreSQL',
            icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
          },
          {
            name: 'Apache Kafka',
            icon: 'https://cdn.simpleicons.org/apachekafka/white',
          },
        ],
      },
      {
        label: { en: 'Chatbots & Assistants', ar: 'روبوتات المحادثة' },
        items: [
          {
            name: 'Botpress',
            icon: 'https://cdn.simpleicons.org/botpress/white',
          },
          {
            name: 'WhatsApp Bots',
            icon: 'https://cdn.simpleicons.org/whatsapp/25D366',
          },
          {
            name: 'RASA',
            icon: 'https://cdn.simpleicons.org/rasa/5A17EE',
          },
          {
            name: 'Telegram Bots',
            icon: 'https://cdn.simpleicons.org/telegram/26A5E4',
          },
        ],
      },
      {
        label: { en: 'Automation Tools', ar: 'أدوات الأتمتة' },
        items: [
          {
            name: 'Zapier',
            icon: 'https://cdn.simpleicons.org/zapier/FF4A00',
          },
          {
            name: 'n8n',
            icon: 'https://cdn.simpleicons.org/n8n/EA4B71',
          },
          {
            name: 'Make.com',
            icon: 'https://cdn.simpleicons.org/make/6D00CC',
          },
          {
            name: 'Puppeteer',
            icon: 'https://cdn.simpleicons.org/puppeteer/40B5A4',
          },
        ],
      },
    ],
  },

  // ── 6. Digital Growth & Marketing ─────────────────────────────────────────
  {
    categoryId: 'digital-growth',
    subcategories: [
      {
        label: { en: 'SEO & SEM Tools', ar: 'أدوات السيو والإعلانات' },
        items: [
          {
            name: 'Google Search Console',
            icon: 'https://cdn.simpleicons.org/googlesearchconsole/458CF5',
          },
          {
            name: 'Ahrefs',
            icon: 'https://cdn.simpleicons.org/ahrefs/FF7043',
          },
          {
            name: 'SEMrush',
            icon: 'https://cdn.simpleicons.org/semrush/FF642D',
          },
          {
            name: 'Screaming Frog',
            icon: 'https://cdn.simpleicons.org/screamingfrog/40BF6A',
          },
        ],
      },
      {
        label: { en: 'Analytics', ar: 'التحليلات' },
        items: [
          {
            name: 'Google Analytics 4',
            icon: 'https://cdn.simpleicons.org/googleanalytics/E37400',
          },
          {
            name: 'Vercel Analytics',
            icon: 'https://cdn.simpleicons.org/vercel/white',
          },
          {
            name: 'Plausible',
            icon: 'https://cdn.simpleicons.org/plausibleanalytics/5850EC',
          },
          {
            name: 'PostHog',
            icon: 'https://cdn.simpleicons.org/posthog/white',
          },
        ],
      },
      {
        label: { en: 'Ads & Retargeting', ar: 'الإعلانات والاستهداف' },
        items: [
          {
            name: 'Meta Ads',
            icon: 'https://cdn.simpleicons.org/meta/0082FB',
          },
          {
            name: 'Google Ads',
            icon: 'https://cdn.simpleicons.org/googleads/4285F4',
          },
          {
            name: 'TikTok Ads',
            icon: 'https://cdn.simpleicons.org/tiktok/white',
          },
          {
            name: 'Snapchat Ads',
            icon: 'https://cdn.simpleicons.org/snapchat/FFFC00',
          },
        ],
      },
      {
        label: { en: 'Lead Capture', ar: 'جذب العملاء المحتملين' },
        items: [
          {
            name: 'Typeform',
            icon: 'https://cdn.simpleicons.org/typeform/262627',
          },
          {
            name: 'HubSpot',
            icon: 'https://cdn.simpleicons.org/hubspot/FF7A59',
          },
          {
            name: 'Calendly',
            icon: 'https://cdn.simpleicons.org/calendly/006BFF',
          },
          {
            name: 'WhatsApp API',
            icon: 'https://cdn.simpleicons.org/whatsapp/25D366',
          },
        ],
      },
      {
        label: { en: 'Email & Automation', ar: 'البريد والأتمتة' },
        items: [
          {
            name: 'SendGrid',
            icon: 'https://cdn.simpleicons.org/sendgrid/51A9E3',
          },
          {
            name: 'Mailchimp',
            icon: 'https://cdn.simpleicons.org/mailchimp/FFE01B',
          },
          {
            name: 'Zapier',
            icon: 'https://cdn.simpleicons.org/zapier/FF4A00',
          },
          {
            name: 'Brevo',
            icon: 'https://cdn.simpleicons.org/brevo/0B996E',
          },
        ],
      },
    ],
  },
]
