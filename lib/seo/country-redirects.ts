import { countryLandingPages } from './country-landing-pages'

const legacyLocationSlugs: Record<string, string> = {
    'united-arab-emirates': 'uae',
}

export const countryRedirects: Record<string, string> = {}

for (const country of countryLandingPages) {
    countryRedirects[`/${country.code}`] = country.englishUrl
    countryRedirects[`/ar/${country.code}`] = country.arabicUrl
    countryRedirects[`/en/${country.code}`] = country.englishUrl

    countryRedirects[`/locations/${country.slug}`] = country.englishUrl
    countryRedirects[`/ar/locations/${country.slug}`] = country.arabicUrl
    countryRedirects[`/en/locations/${country.slug}`] = country.englishUrl

    const legacySlug = legacyLocationSlugs[country.slug]
    if (legacySlug) {
        countryRedirects[`/locations/${legacySlug}`] = country.englishUrl
        countryRedirects[`/ar/locations/${legacySlug}`] = country.arabicUrl
        countryRedirects[`/en/locations/${legacySlug}`] = country.englishUrl
    }
}

export function getCountryRedirect(pathname: string): string | null {
    return countryRedirects[pathname] || null
}
