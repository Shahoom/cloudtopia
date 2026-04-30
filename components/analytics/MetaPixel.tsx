'use client'

/**
 * Meta (Facebook) Pixel — id 1641077453704969
 *
 * Two parts:
 *  1. <Script> + <noscript> bootstrap, loaded once at the root layout.
 *     Uses strategy="afterInteractive" so it doesn't block first paint.
 *  2. <PixelRouteChangeTracker> — a small client component that re-fires
 *     `fbq('track', 'PageView')` on Next.js App Router client-side
 *     navigations. Without this, only the initial server-rendered page
 *     would be tracked; subsequent SPA navigations would be invisible.
 *
 * Type declaration for window.fbq is added so TS doesn't complain.
 */

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

const PIXEL_ID = '1641077453704969'

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void
        _fbq?: unknown
    }
}

/**
 * Server-rendered pixel boot snippet. Drop into the <body> of the root
 * layout once. Uses next/script's afterInteractive strategy so the
 * tracker is fetched only after hydration finishes.
 */
export function MetaPixelBoot() {
    return (
        <>
            <Script
                id="meta-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
`.trim(),
                }}
            />
            <noscript>
                {/* Fallback for users with JS disabled. width/height of 1
                    make this a 1×1 invisible tracking pixel. */}
                <img
                    height={1}
                    width={1}
                    style={{ display: 'none' }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    )
}

/**
 * Tracks PageView on client-side route changes (Next.js App Router).
 * The boot script already fires the *first* PageView; this one handles
 * every navigation after that. Without it, ~80% of pageviews disappear
 * on a typical SPA.
 *
 * Wrapped in <Suspense> at the call site because useSearchParams() in
 * Next.js 14 forces the nearest Suspense boundary into client rendering.
 */
function RouteChangeTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
        // Don't double-fire on the initial mount — the boot snippet
        // already sent a PageView. Skip the very first effect run.
        // (We use a module-level flag rather than useRef so we survive
        // strict-mode double-invoke in dev.)
        if (!hasMounted) {
            hasMounted = true
            return
        }
        window.fbq('track', 'PageView')
    }, [pathname, searchParams])

    return null
}

let hasMounted = false

export function PixelRouteChangeTracker() {
    return (
        <Suspense fallback={null}>
            <RouteChangeTracker />
        </Suspense>
    )
}
