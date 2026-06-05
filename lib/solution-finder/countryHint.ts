import { countryLandingPages } from '../seo/country-landing-pages.ts'

type CountryHintInput = {
  explicitCountry?: string
  headerCountryCode?: string | null
  pageUrl?: string
}

export function deriveSolutionFinderCountryHint(input: CountryHintInput): string {
  const explicit = clean(input.explicitCountry)
  if (explicit) return explicit

  const headerMatch = findCountryByCode(input.headerCountryCode)
  if (headerMatch) return headerMatch.countryNameEnglish

  const pathMatch = findCountryByPageUrl(input.pageUrl)
  if (pathMatch) return pathMatch.countryNameEnglish

  return ''
}

export function getHeaderCountryCode(headers: Headers): string {
  return (
    headers.get('x-vercel-ip-country') ||
    headers.get('cf-ipcountry') ||
    headers.get('x-country-code') ||
    headers.get('cloudfront-viewer-country') ||
    ''
  )
}

function findCountryByCode(code: string | null | undefined) {
  const normalized = clean(code).toLowerCase()
  if (!normalized || normalized === 'xx' || normalized === 'unknown') return null
  return countryLandingPages.find((country) => country.code.toLowerCase() === normalized) || null
}

function findCountryByPageUrl(pageUrl: string | undefined) {
  const path = extractPath(pageUrl)
  if (!path) return null

  const segments = path
    .split('/')
    .map((segment) => segment.trim().toLowerCase())
    .filter(Boolean)
    .filter((segment) => !['ar', 'en', 'locations', 'markets'].includes(segment))

  return countryLandingPages.find((country) => {
    const code = country.code.toLowerCase()
    const slug = country.slug.toLowerCase()
    return segments.includes(code) || segments.includes(slug)
  }) || null
}

function extractPath(pageUrl: string | undefined) {
  const value = clean(pageUrl)
  if (!value) return ''

  try {
    return new URL(value).pathname
  } catch {
    return value.split('?')[0] || ''
  }
}

function clean(value: string | null | undefined) {
  return typeof value === 'string' ? value.trim() : ''
}
