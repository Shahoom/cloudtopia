export type CanonicalLocale = 'en' | 'ar'

export type CanonicalRedirect = {
  locale: CanonicalLocale
  pathname: string
}

export const RELOCATED_UNDER_SERVICES: Readonly<Record<string, string>> = {
  '/website-design': '/services/website-development',
  '/website-development': '/services/website-development',
  '/ecommerce-solutions': '/services/ecommerce-development',
  '/ecommerce-development': '/services/ecommerce-development',
  '/social-media-marketing': '/services/social-media-marketing',
  '/content-creation': '/services/content-creation',
  '/business-systems-development': '/services/business-systems-development',
}

export const WEBSITE_FAMILY_REDIRECTS: Readonly<Record<string, string>> = {
  'website-redesign': '/services/website-development',
  'corporate-website-design': '/services/website-development',
  'landing-page-design': '/services/website-development',
  'portfolio-websites': '/services/website-development',
  'educational-website-development': '/services/website-development',
  'restaurant-website-development': '/services/website-development',
  'website-maintenance': '/services/website-development',
  'ecommerce-website-development': '/services/ecommerce-development',
}

export const WEBAPP_LEGACY_REDIRECTS: Readonly<Record<string, string>> = {
  'custom-web-application-development': '/services/web-applications/full-stack-web-engineering',
  'progressive-web-app-development': '/services/web-applications/full-stack-web-engineering',
  'client-portals': '/services/web-applications/interactive-portals-dashboards',
  'admin-dashboards': '/services/web-applications/interactive-portals-dashboards',
  'booking-platforms': '/services/web-applications/interactive-portals-dashboards',
  'internal-business-tools': '/services/web-applications/interactive-portals-dashboards',
  'saas-mvp-development': '/services/web-applications/custom-saas-mvp-development',
}

export const WEB_APP_PILLARS = [
  'custom-saas-mvp-development',
  'full-stack-web-engineering',
  'interactive-portals-dashboards',
  'application-modernization-performance',
  'media-entertainment-streaming',
] as const

export const APP_SUBSERVICE_SLUGS = [
  'ios-app-development',
  'android-app-development',
  'cross-platform-app-development',
  'flutter-app-development',
  'react-native-app-development',
  'mvp-app-development',
  'business-mobile-app-development',
  'customer-app-development',
  'booking-app-development',
  'delivery-order-app-development',
  'app-backend-api-development',
  'app-store-launch-support',
  'mobile-app-maintenance',
] as const

const webAppPillars = new Set<string>(WEB_APP_PILLARS)
const appSubservices = new Set<string>(APP_SUBSERVICE_SLUGS)

function localizedPath(locale: CanonicalLocale, destination: string): string {
  return locale === 'ar' ? `/ar${destination}` : destination
}

function splitLocale(pathname: string): {
  locale: CanonicalLocale
  basePath: string
} {
  const match = pathname.match(/^\/(en|ar)(\/.*)?$/)

  return {
    locale: match?.[1] === 'ar' ? 'ar' : 'en',
    basePath: match ? match[2] || '/' : pathname,
  }
}

/**
 * Resolve only public legacy aliases. Canonical requests return null and remain
 * available to the proxy's locale rewrite and ordinary slash/host cleanup.
 */
export function resolveCanonicalRedirect(pathname: string): CanonicalRedirect | null {
  const cleanPath =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname
  const { locale, basePath } = splitLocale(cleanPath)

  const relocated = RELOCATED_UNDER_SERVICES[basePath]
  if (relocated) {
    return { locale, pathname: localizedPath(locale, relocated) }
  }

  const flatService = basePath.match(/^\/services\/([a-z0-9-]+)$/)
  if (flatService) {
    const slug = flatService[1]
    const destination =
      WEBSITE_FAMILY_REDIRECTS[slug] ||
      WEBAPP_LEGACY_REDIRECTS[slug] ||
      (appSubservices.has(slug) ? `/services/app-development/${slug}` : null)

    if (destination) {
      return { locale, pathname: localizedPath(locale, destination) }
    }
  }

  if (basePath === '/web-applications') {
    const destination = '/services/web-applications'
    return { locale, pathname: localizedPath(locale, destination) }
  }

  const oldWebApp = basePath.match(/^\/web-applications\/([^/]+)$/)
  if (oldWebApp) {
    const slug = oldWebApp[1]
    const destination =
      WEBAPP_LEGACY_REDIRECTS[slug] ||
      (webAppPillars.has(slug)
        ? `/services/web-applications/${slug}`
        : `/services/${slug}`)

    return { locale, pathname: localizedPath(locale, destination) }
  }

  return null
}

export function isAppSubserviceSlug(slug: string): boolean {
  return appSubservices.has(slug)
}
