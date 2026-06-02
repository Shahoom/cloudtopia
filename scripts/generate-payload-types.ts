import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const output = `/* tslint:disable */
/* eslint-disable */
/**
 * This file describes the CloudTopia Payload CMS collections.
 * Regenerate with \`npm run payload:types\`.
 */

export interface Config {
  collections: {
    users: User
    media: Media
    authors: Author
    'blog-categories': BlogCategory
    'blog-tags': BlogTag
    'blog-posts': BlogPost
    'newsletter-subscribers': NewsletterSubscriber
    projects: Project
    'service-faqs': ServiceFAQ
    'site-content': SiteContent
    pages: Page
    'site-design': SiteDesign
  }
}

export interface User {
  id: string | number
  email: string
  name?: string | null
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string | number
  alt: string
  caption?: string | null
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  createdAt: string
  updatedAt: string
}

export interface LocalizedText {
  en?: string | null
  ar?: string | null
}

export interface Author {
  id: string | number
  slug: string
  name: string
  image?: string | number | Media | null
  role?: LocalizedText | null
  bio?: LocalizedText | null
  knowsAbout?: { topic: string; id?: string | null }[] | null
  sameAs?: { url: string; id?: string | null }[] | null
  createdAt: string
  updatedAt: string
}

export interface BlogSEO {
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  canonicalUrl?: string | null
  ogImage?: string | number | Media | null
  noIndex?: boolean | null
}

export interface BlogCategory {
  id: string | number
  locale: 'en' | 'ar'
  name: string
  slug: string
  description?: string | null
  image?: string | number | Media | null
  icon?: string | null
  color?: string | null
  order?: number | null
  featured?: boolean | null
  seo?: BlogSEO | null
  createdAt: string
  updatedAt: string
}

export interface BlogTag {
  id: string | number
  locale: 'en' | 'ar'
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string | number
  locale: 'en' | 'ar'
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown>
  coverImage: string | number | Media
  category: string | number | BlogCategory
  tags?: (string | number | BlogTag)[] | null
  author: string | number | Author
  status: 'draft' | 'published'
  featured?: boolean | null
  pinned?: boolean | null
  publishedAt?: string | null
  readingTime?: number | null
  viewsCount?: number | null
  seo?: BlogSEO | null
  tableOfContents?: boolean | null
  relatedPosts?: (string | number | BlogPost)[] | null
  createdAt: string
  updatedAt: string
}

export interface NewsletterSubscriber {
  id: string | number
  email: string
  name?: string | null
  source?: string | null
  subscribedAt?: string | null
  status: 'subscribed' | 'unsubscribed'
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  cmsKey: string
  locale: 'en' | 'ar'
  category: string
  type: string
  featured?: boolean | null
  title: string
  problem: string
  solution: string
  features?: { feature: string; id?: string | null }[] | null
  image: string
  metrics?: { label?: string | null; value?: string | null } | null
  link?: string | null
  createdAt: string
  updatedAt: string
}

export interface ServiceFAQ {
  id: string | number
  serviceSlug: string
  faqs?: {
    en?: { q: string; a: string; id?: string | null }[] | null
    ar?: { q: string; a: string; id?: string | null }[] | null
  } | null
  createdAt: string
  updatedAt: string
}

export interface SiteContent {
  id: string | number
  locale: 'en' | 'ar'
  dictionary: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface Page {
  id: string | number
  locale: 'en' | 'ar'
  slug: string
  title: string
  template: 'home' | 'services' | 'service-detail' | 'projects' | 'about' | 'contact' | 'labs' | 'legal' | 'blog-coming-soon' | 'content'
  publicPath?: string | null
  status: 'draft' | 'published'
  hero?: {
    badge?: string | null
    title?: string | null
    titleHighlight?: string | null
    description?: string | null
    primaryLabel?: string | null
    primaryHref?: string | null
    secondaryLabel?: string | null
    secondaryHref?: string | null
  } | null
  cta?: {
    label?: string | null
    href?: string | null
    secondaryLabel?: string | null
    secondaryHref?: string | null
  } | null
  seo: Record<string, unknown>
  sections: Record<string, unknown>
  design: Record<string, unknown>
  editorNotes?: string | null
  createdAt: string
  updatedAt: string
}

export interface SiteDesign {
  id: string | number
  key: string
  brand?: {
    name: string
    tagline: string
    logo: string
  } | null
  colors?: {
    dark: string
    primary: string
    secondary: string
    background: string
  } | null
  typography?: {
    heading: string
    body: string
    logo: string
  } | null
  radius?: {
    card: number
    control: number
  } | null
  motion?: {
    enabled?: boolean | null
    intensity?: 'quiet' | 'standard' | 'expressive' | null
  } | null
  cta?: {
    label: string
    href: string
  } | null
  navigationLabels?: {
    home: string
    services: string
    projects: string
    labs: string
    about: string
    blog: string
    contact: string
  } | null
  footer?: {
    description: string
    copyright: string
  } | null
  contact?: {
    email: string
    phone: string
    whatsapp: string
  } | null
  social?: {
    whatsapp?: string | null
    x?: string | null
    github?: string | null
    instagram?: string | null
  } | null
  theme: Record<string, unknown>
  navigation: Record<string, unknown>
  editableSections: Record<string, unknown>
  createdAt: string
  updatedAt: string
}
`

const outputPath = path.join(process.cwd(), 'payload-types.ts')
async function main() {
  await writeFile(outputPath, output)
  console.log(`Types written to ${outputPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
