export const CANONICAL_SERVICE_TARGETS = {
  'digital-presence': '/services/digital-presence',
  'website-development': '/services/website-development',
  'ecommerce-development': '/services/ecommerce-development',
  'web-applications': '/services/web-applications',
  'business-systems-development': '/services/business-systems-development',
  'app-development': '/services/app-development',
  'social-media-marketing': '/services/social-media-marketing',
  'content-creation': '/services/content-creation',
  'restaurant-qr-menu': '/restaurant-qr-menu',
} as const

export type CanonicalServiceId = keyof typeof CANONICAL_SERVICE_TARGETS
