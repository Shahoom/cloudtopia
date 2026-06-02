import type { Locale } from '../i18n/config.ts'

export const cmsPageSlugs = [
  '/',
  'services',
  'projects',
  'labs',
  'about',
  'contact',
  'blog',
  'website-design',
  'ecommerce-solutions',
  'business-systems-development',
  'restaurant-qr-menu',
  'content-creation',
  'social-media-marketing',
  'web-applications',
  'privacy',
  'terms',
] as const

export type CMSPageSlug = (typeof cmsPageSlugs)[number]

export type CMSPageHero = {
  badge?: string
  title?: string
  titleHighlight?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export type CMSPageCTA = {
  label?: string
  href?: string
  secondaryLabel?: string
  secondaryHref?: string
}

type Dictionary = Record<string, any>

const templateBySlug: Record<string, string> = {
  '/': 'home',
  services: 'services',
  projects: 'projects',
  labs: 'labs',
  about: 'about',
  contact: 'contact',
  blog: 'blog-coming-soon',
  'website-design': 'service-detail',
  'ecommerce-solutions': 'service-detail',
  'business-systems-development': 'service-detail',
  'restaurant-qr-menu': 'service-detail',
  'content-creation': 'service-detail',
  'social-media-marketing': 'service-detail',
  'web-applications': 'service-detail',
  privacy: 'legal',
  terms: 'legal',
}

const dictionaryPatchKeyBySlug: Record<string, string[]> = {
  '/': ['home'],
  services: ['services'],
  projects: ['projects'],
  labs: ['labs'],
  about: ['about'],
  contact: ['contact'],
  privacy: ['privacy'],
  terms: ['terms'],
}

const servicePageKeyBySlug: Record<string, string> = {
  'website-design': 'websiteDesignPage',
  'ecommerce-solutions': 'ecommercePage',
  'business-systems-development': 'businessSystemsPage',
  'restaurant-qr-menu': 'restaurantPage',
  'content-creation': 'contentCreationPage',
  'social-media-marketing': 'socialMediaPage',
  'web-applications': 'webApplicationsPage',
}

export function normalizePageSlug(slug = '/') {
  const clean = slug === '' ? '/' : slug.replace(/^\/+/, '').replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export function publicPathForSlug(locale: Locale | string, slug: string) {
  const normalized = normalizePageSlug(slug)
  const path = normalized === '/' ? '/' : `/${normalized}`
  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`
}

export function templateForSlug(slug: string) {
  return templateBySlug[normalizePageSlug(slug)] || 'content'
}

export function pageTitleFromDictionary(locale: Locale, slug: string, dictionary: Dictionary) {
  const hero = buildPageHero(locale, slug, dictionary)
  if (hero.title && hero.titleHighlight) return `${hero.title} ${hero.titleHighlight}`.trim()
  if (hero.title) return hero.title
  const normalized = normalizePageSlug(slug)
  if (normalized === '/') return dictionary.home?.hero?.title || 'CloudTopia'
  return dictionary.nav?.[normalized] || titleize(normalized)
}

export function buildPageHero(locale: Locale, slug: string, dictionary: Dictionary): CMSPageHero {
  const normalized = normalizePageSlug(slug)
  const nav = dictionary.nav || {}

  if (normalized === '/') {
    const hero = dictionary.home?.hero || {}
    return {
      badge: dictionary.header?.tagline,
      title: hero.title,
      titleHighlight: Array.isArray(hero.titleHighlights) ? hero.titleHighlights[0] : undefined,
      description: hero.description,
      primaryLabel: hero.freeConsultation || hero.getStarted || nav.getStarted,
      primaryHref: '/contact',
      secondaryLabel: hero.viewServices || nav.services,
      secondaryHref: '/services',
    }
  }

  if (normalized === 'services') {
    const hero = dictionary.services?.hero || {}
    return {
      badge: nav.services,
      title: hero.title || nav.services,
      description: hero.description,
      primaryLabel: nav.getStarted,
      primaryHref: '/contact',
      secondaryLabel: nav.projects,
      secondaryHref: '/projects',
    }
  }

  if (normalized === 'projects') {
    const hero = dictionary.projects?.hero || {}
    return {
      badge: nav.projects,
      title: hero.title || nav.projects,
      titleHighlight: hero.titleHighlight,
      description: hero.description,
      primaryLabel: nav.getStarted,
      primaryHref: '/contact',
    }
  }

  const serviceKey = servicePageKeyBySlug[normalized]
  if (serviceKey) {
    const page = dictionary.services?.[serviceKey] || {}
    const cardKey = serviceKey.replace(/Page$/, '')
    const card = dictionary.serviceCards?.[cardKey] || {}
    return {
      badge: dictionary.services?.hero?.title || nav.services,
      title: page.hero?.title || page.title || card.name || titleize(normalized),
      titleHighlight: page.hero?.highlight || page.hero?.titleHighlight,
      description: page.hero?.description || page.description || card.description,
      primaryLabel: page.hero?.primaryCTA || nav.getStarted,
      primaryHref: '/contact',
      secondaryLabel: page.hero?.secondaryCTA || nav.projects,
      secondaryHref: '/projects',
    }
  }

  const pageRoot = dictionary[normalized] || {}
  const hero = pageRoot.hero || pageRoot
  return {
    badge: nav[normalized],
    title: hero.title || nav[normalized] || titleize(normalized),
    titleHighlight: hero.titleHighlight,
    description: hero.description || pageRoot.description,
    primaryLabel: nav.getStarted,
    primaryHref: '/contact',
  }
}

export function buildPageCTA(locale: Locale, slug: string, dictionary: Dictionary): CMSPageCTA {
  const finalCTA = dictionary.home?.finalCTA || {}
  const hero = buildPageHero(locale, slug, dictionary)
  return {
    label: finalCTA.primaryCTA || hero.primaryLabel || dictionary.nav?.getStarted || 'Get Started',
    href: hero.primaryHref || '/contact',
    secondaryLabel: finalCTA.secondaryCTA || hero.secondaryLabel,
    secondaryHref: hero.secondaryHref,
  }
}

export function buildPageSEO(locale: Locale, slug: string, dictionary: Dictionary) {
  const normalized = normalizePageSlug(slug)
  const hero = buildPageHero(locale, normalized, dictionary)
  const title = pageTitleFromDictionary(locale, normalized, dictionary)
  const description =
    hero.description ||
    dictionary.footer?.description ||
    'CloudTopia builds websites, e-commerce stores, custom systems, and web applications.'

  return {
    title,
    description,
    canonicalPath: normalized === '/' ? '/' : `/${normalized}`,
    ogImage: `/og/${normalized === '/' ? 'home' : normalized}/${locale}.jpg`,
    noindex: false,
  }
}

export function buildNavigation(locale: Locale, dictionary: Dictionary) {
  const nav = dictionary.nav || {}
  const footer = dictionary.footer || {}
  const showContact = true

  return {
    header: [
      { label: nav.home || 'Home', href: '/' },
      { label: nav.services || 'Services', href: '/services' },
      { label: nav.projects || 'Projects', href: '/projects' },
      { label: nav.labs || 'Labs', href: '/labs' },
      { label: nav.about || 'About', href: '/about' },
      { label: nav.blog === 'Blog' ? 'Insights' : nav.blog || 'Insights', href: '/insights' },
      ...(showContact ? [{ label: nav.contact || 'Contact', href: '/contact' }] : []),
    ],
    cta: { label: nav.getStarted || 'Get Started', href: '/contact' },
    footer: {
      description: footer.description,
      columns: [
        {
          title: footer.services || 'Services',
          links: [
            { label: footer.links?.digitalPresence || 'Digital Presence', href: '/services#digital-presence' },
            { label: footer.links?.businessSystems || 'Business Systems', href: '/services#business-systems' },
            { label: footer.links?.webApplications || 'Web Applications', href: '/services#web-applications' },
            { label: footer.links?.allServices || 'All Services', href: '/services' },
          ],
        },
        {
          title: footer.company || 'Company',
          links: [
            { label: footer.links?.aboutUs || 'About', href: '/about' },
            { label: footer.links?.projects || 'Projects', href: '/projects' },
            { label: footer.links?.blog === 'Blog' ? 'Insights' : footer.links?.blog || 'Insights', href: '/insights' },
            { label: footer.links?.ourLabs || 'Labs', href: '/labs' },
            { label: footer.links?.contactUs || 'Contact', href: '/contact' },
          ],
        },
        {
          title: footer.legal || 'Legal',
          links: [
            { label: footer.links?.privacy || 'Privacy', href: '/privacy' },
            { label: footer.links?.terms || 'Terms', href: '/terms' },
          ],
        },
      ],
      copyright: footer.copyright,
    },
  }
}

export function buildSiteSettings(dictionary: Dictionary) {
  return {
    brand: {
      name: 'CloudTopia',
      tagline: dictionary.header?.tagline,
      logo: '/images/CloudTopia.svg',
    },
    contact: {
      email: 'info@cloudtopia.net',
      phone: '',
      whatsapp: 'https://wa.me/905011511116',
    },
    social: [
      { label: 'WhatsApp', href: 'https://wa.me/905011511116' },
      { label: 'X', href: 'https://x.com/thecloudtopia' },
      { label: 'GitHub', href: 'https://github.com/Shahoom' },
      { label: 'Instagram', href: 'https://instagram.com/thecloudtopia' },
    ],
  }
}

export function buildPageSections(locale: Locale, slug: string, dictionary: Dictionary, projects: unknown[] = []) {
  const normalized = normalizePageSlug(slug)
  const hero = buildPageHero(locale, normalized, dictionary)
  const cta = buildPageCTA(locale, normalized, dictionary)
  const patch = buildDictionaryPatch(normalized, dictionary)

  return {
    version: 2,
    template: templateForSlug(normalized),
    hero,
    cta,
    content: patch,
    projectCards: normalized === '/' || normalized === 'projects' ? projects : undefined,
    dictionaryPatch: patch,
  }
}

export function buildDictionaryPatch(slug: string, dictionary: Dictionary) {
  const normalized = normalizePageSlug(slug)
  const serviceKey = servicePageKeyBySlug[normalized]
  if (serviceKey) {
    return {
      services: {
        [serviceKey]: dictionary.services?.[serviceKey] || {},
      },
    }
  }

  const path = dictionaryPatchKeyBySlug[normalized]
  if (!path) return {}
  const value = getByPath(dictionary, path)
  return value ? setByPath({}, path, value) : {}
}

export function mergePageIntoDictionary<T extends Dictionary>(dictionary: T, page: any, projects: unknown[] = []): T {
  const next = deepClone(dictionary)
  const patch = page?.sections?.dictionaryPatch || page?.sections?.content || {}
  deepMerge(next, patch)

  const slug = normalizePageSlug(page?.slug || '/')
  if (page?.hero) {
    const heroPatch = compactObject({
      title: page.hero.title,
      titleHighlight: page.hero.titleHighlight,
      description: page.hero.description,
      badge: page.hero.badge,
      primaryCTA: page.hero.primaryLabel,
      secondaryCTA: page.hero.secondaryLabel,
    })
    applyHeroPatch(next, slug, heroPatch)
  }

  if (Array.isArray(projects) && projects.length > 0) {
    const writableNext = next as Dictionary
    writableNext.projects = { ...(writableNext.projects || {}), projectCards: projects }
  }

  return next
}

export function syncDictionaryWithPage(dictionary: Dictionary, page: any) {
  return mergePageIntoDictionary(dictionary, page)
}

function applyHeroPatch(dictionary: Dictionary, slug: string, patch: Dictionary) {
  if (Object.keys(patch).length === 0) return
  const normalized = normalizePageSlug(slug)

  if (normalized === '/') {
    dictionary.home = dictionary.home || {}
    dictionary.home.hero = { ...(dictionary.home.hero || {}), ...patch }
    return
  }

  if (normalized === 'services') {
    dictionary.services = dictionary.services || {}
    dictionary.services.hero = { ...(dictionary.services.hero || {}), ...patch }
    return
  }

  if (normalized === 'projects') {
    dictionary.projects = dictionary.projects || {}
    dictionary.projects.hero = { ...(dictionary.projects.hero || {}), ...patch }
    return
  }

  const serviceKey = servicePageKeyBySlug[normalized]
  if (serviceKey) {
    dictionary.services = dictionary.services || {}
    dictionary.services[serviceKey] = dictionary.services[serviceKey] || {}
    dictionary.services[serviceKey].hero = {
      ...(dictionary.services[serviceKey].hero || {}),
      ...patch,
    }
    return
  }

  dictionary[normalized] = dictionary[normalized] || {}
  dictionary[normalized].hero = { ...(dictionary[normalized].hero || {}), ...patch }
}

function titleize(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function getByPath(source: Dictionary, path: string[]) {
  return path.reduce<any>((current, key) => current?.[key], source)
}

function setByPath(target: Dictionary, path: string[], value: unknown) {
  let current = target
  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = value
      return
    }
    current[key] = current[key] || {}
    current = current[key]
  })
  return target
}

function compactObject(source: Dictionary) {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function deepMerge(target: Dictionary, source: Dictionary) {
  for (const [key, value] of Object.entries(source || {})) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = target[key] && typeof target[key] === 'object' ? target[key] : {}
      deepMerge(target[key], value as Dictionary)
    } else {
      target[key] = value
    }
  }
  return target
}
