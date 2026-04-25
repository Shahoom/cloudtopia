'use client'

import { useEffect, useSyncExternalStore } from 'react'
import type { Locale } from './config'

/**
 * Per-route map of `Locale → href` for the *currently rendered* page.
 *
 * Pages whose URL changes shape across locales (e.g. blog posts with
 * native-script slugs that differ per locale) publish their alternate hrefs
 * via `<RouteAlternatesPublisher value={...} />`. The header LanguageSwitcher
 * (via `LanguageContext.setLocale`) consults this store and navigates to the
 * correct localized URL — instead of dumbly swapping the leading `/[locale]/`
 * segment which would produce a 404 for native-script-slug routes.
 *
 * Static pages (homepage, /pricing, /contact, etc.) don't need to publish
 * anything — segment-swap fallback works for them.
 *
 * This is implemented as a module-scoped store rather than a React context
 * because the LanguageProvider sits at the root of the tree (above any
 * page that might publish alternates), and React context flows top-down.
 */

export type RouteAlternates = Partial<Record<Locale, string>>

let current: RouteAlternates | null = null
const subscribers = new Set<() => void>()

function emit() {
    for (const s of subscribers) s()
}

function subscribe(cb: () => void) {
    subscribers.add(cb)
    return () => {
        subscribers.delete(cb)
    }
}

function getSnapshot(): RouteAlternates | null {
    return current
}

function getServerSnapshot(): RouteAlternates | null {
    // Server side never has alternates published yet (they're set in client
    // useEffects). LanguageContext is client-only anyway.
    return null
}

/**
 * Read the currently-published alternates. Returns null when no page on the
 * current route has published.
 */
export function useRouteAlternates(): RouteAlternates | null {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Drop into a client component to publish per-route alternate URLs. Cleans up
 * on unmount so we never leak stale alternates between routes.
 */
export function RouteAlternatesPublisher({ value }: { value: RouteAlternates }) {
    const serialized = JSON.stringify(value)
    useEffect(() => {
        current = value
        emit()
        return () => {
            current = null
            emit()
        }
        // Re-publish whenever the contents actually change (deep-equal via
        // JSON.stringify). Using `value` directly would re-fire on every
        // render even with the same payload.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serialized])
    return null
}
