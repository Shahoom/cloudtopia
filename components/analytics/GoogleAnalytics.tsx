// Google Analytics 4 (gtag.js) — single source of truth for the Google tag.
//
// Rendered once inside <head> of each PUBLIC root layout (the (frontend) and
// (country-landing) route groups) so every page of the website carries exactly
// one Google tag — never two. The Payload admin group intentionally omits it.
//
// The measurement ID can be overridden per environment via
// NEXT_PUBLIC_GA_MEASUREMENT_ID; it falls back to the live CloudTopia property.
// GA4 Enhanced Measurement tracks SPA route changes via History events, so no
// manual page_view wiring is needed for client-side navigation.

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2T6MHVTJ5F'

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      {/* Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="ga-gtag-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
        }}
      />
    </>
  )
}
