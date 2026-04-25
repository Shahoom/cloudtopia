# OG Image System

Per-page, per-locale Open Graph (social-share preview) images.

## TL;DR — adding a new image

1. Design a **1200 × 630** JPG or PNG in Figma/Photoshop/Canva
2. Save it here using this naming convention:
   ```
   public/images/og/<page>-<locale>.jpg
   ```
3. Deploy. The site automatically picks it up.

That's it. The resolver in `lib/og/og-image.ts` does everything else.

## Naming convention

| Page on the site | OG image filename |
|------------------|-------------------|
| `/en` (homepage) | `home-en.jpg` |
| `/ar` (homepage) | `home-ar.jpg` |
| `/tr` (homepage) | `home-tr.jpg` |
| `/en/pricing` | `pricing-en.jpg` |
| `/ar/pricing` | `pricing-ar.jpg` |
| `/en/website-design` | `website-design-en.jpg` |
| `/ar/restaurant-qr-menu` | `restaurant-qr-menu-ar.jpg` |
| `/en/about` | `about-en.jpg` |
| `/ar/contact` | `contact-ar.jpg` |
| `/en/blog/<slug>` | `blog/<slug>-en.jpg` |
| `/en/projects/<slug>` | `projects/<slug>-en.jpg` |
| `/en/locations/saudi-arabia` | `locations/saudi-arabia-en.jpg` |
| `/en/authors/mohamad-shahm` | `authors/mohamad-shahm-en.jpg` |

The full page list:

```
home-{en,ar,tr}.jpg
pricing-{en,ar,tr}.jpg
services-{en,ar,tr}.jpg
website-design-{en,ar,tr}.jpg
ecommerce-solutions-{en,ar,tr}.jpg
restaurant-qr-menu-{en,ar,tr}.jpg
business-systems-development-{en,ar,tr}.jpg
web-applications-{en,ar,tr}.jpg
content-creation-{en,ar,tr}.jpg
social-media-marketing-{en,ar,tr}.jpg
about-{en,ar,tr}.jpg
contact-{en,ar,tr}.jpg
projects-{en,ar,tr}.jpg
labs-{en,ar,tr}.jpg
blog-{en,ar,tr}.jpg
privacy-{en,ar,tr}.jpg
terms-{en,ar,tr}.jpg
```

## Fallback chain

The resolver tries these in order. **First match wins.**

1. `og/<page>-<locale>.jpg` ← page-specific, locale-specific (best)
2. `og/<page>-<locale>.png`
3. `og/<page>.jpg` ← page-specific, no locale variant
4. `og/<page>.png`
5. `og/default-<locale>.jpg` ← brand default per language
6. `og/default-<locale>.png`
7. `og/default.jpg` ← brand default
8. `og/default.png`
9. `images/og-image.jpg` ← legacy fallback (already in repo)

This means you can roll out OG images **gradually**:
- Add `pricing-en.jpg` today → only English pricing has a custom image; everything else uses `default.jpg`.
- Add `pricing-ar.jpg` and `pricing-tr.jpg` next week → all three locales of `/pricing` now have custom images.
- Eventually fill out the rest.

## Image specs

| Spec | Value |
|------|-------|
| Dimensions | **1200 × 630 pixels** (Twitter/Facebook/LinkedIn standard) |
| Format | **JPG** (preferred) or **PNG** |
| File size | Aim for **< 150 KB** (some platforms reject > 8 MB) |
| Color profile | sRGB |
| Safe area | Keep critical text **80px from edges** (Telegram crops slightly) |
| Aspect ratio | 1.91:1 |

## Design recommendations

- **Title at the top**, brand at the bottom. Cropping happens to the bottom on iMessage/Telegram previews.
- **High contrast** — these images are viewed at thumbnail size in feeds.
- **Logo + Arabic AR / Turkish TR variant** of the wordmark for the right locale.
- **Use the brand sky/indigo gradient** (`#0ea5e9 → #6366f1`) for visual identity consistency.
- **Sentence-case text**, not ALL CAPS — looks more premium.

## Quick Figma starter

A typical layout for these images:

```
┌──────────────────────────────────────────┐
│                                          │
│  CloudTopia (logo)                       │  ← top-left: brand wordmark
│                                          │
│                                          │
│   Pricing — Plans from $299              │  ← center: page title (English)
│   Or: الأسعار — خطط من 299$               │  ← in the locale's language
│                                          │
│                                          │
│  cloudtopia.net          [URL/CTA]       │  ← bottom: subtle URL
└──────────────────────────────────────────┘
   1200 × 630 px, sky→indigo gradient bg
```

## Testing your image

After dropping a file in this directory:

1. Restart `npm run dev` (filesystem cache invalidates)
2. Visit the page, view source, find `<meta property="og:image" content="..." />`
3. Plug the URL into [opengraph.xyz](https://www.opengraph.xyz/) for a live preview across Twitter, Facebook, LinkedIn, Slack, iMessage, etc.
4. After deploy, also verify in [Twitter Card Validator](https://cards-dev.twitter.com/validator) and [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Programmatic access

If you ever need the resolved URL in code:

```ts
import { getOgImage, ogImagesFor } from '@/lib/og/og-image'

// Returns { url, alt, width, height }
const og = getOgImage({ page: 'pricing', locale: 'en' })

// Returns the array shape Next.js metadata expects
const images = ogImagesFor({ page: 'pricing', locale: 'en' })
```

The helper is already wired into:
- `app/layout.tsx` (root)
- `app/[locale]/layout.tsx` (homepage)
- All 16 page layouts (services, pricing, blog, about, etc.)
- All 4 dynamic pages (`blog/[slug]`, `projects/[slug]`, `authors/[slug]`, `locations/[country]`)

Just drop the file and it works.
