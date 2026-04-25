/**
 * Visually-hidden but SEO-readable h1.
 *
 * Used on pages whose primary visible hero is rendered by a client-only
 * component (`dynamic(import, { ssr: false })`) — without this, the SSR
 * HTML has no h1, which is an SEO red flag. We render the h1 server-side
 * with `sr-only` styling so search engines, AI crawlers, and screen
 * readers all see it, while the visual hero remains untouched.
 *
 * One h1 per page.
 */
export function SeoH1({ children }: { children: React.ReactNode }) {
    return (
        <h1
            className="sr-only"
            // Inline fallback in case Tailwind sr-only isn't loaded
            style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
            }}
        >
            {children}
        </h1>
    )
}
