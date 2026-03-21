# Cloudtopia Blog — Premium UI Redesign Prompt
# For Antigravity IDE — DO NOT change routing, MDX pipeline, or i18n logic

---

## MISSION

The blog infrastructure is already built and working (routing, MDX, i18n, sitemap).
Your ONLY job is to **completely redesign the visual layer** — every component,
every page, every detail. The current design is generic and plain. Replace it with
something that looks like it belongs next to Vercel's blog, Linear's changelog,
and Stripe's editorial — but with Cloudtopia's own identity.

Do NOT touch:
- Any file in `lib/` (blog.ts, i18n helpers)
- Any routing logic or page data-fetching
- Any MDX parsing or frontmatter reading
- The sitemap or middleware
- The Header or Footer components

Only rewrite the **visual components and page layouts** listed below.

---

## CLOUDTOPIA BRAND IDENTITY (read carefully — match this exactly)

From `tailwind.config.ts`:

```
Primary brand color:   #0ea5e9  (sky blue — "cloud" feeling)
Primary dark:          #0369a1
Primary darker:        #0c4a6e
Accent color:          #6366f1  (indigo/violet)
Accent dark:           #4338ca
Neutral dark:          #0a0a0a, #171717, #262626
Neutral mid:           #404040, #525252, #737373
Neutral light:         #d4d4d4, #e5e5e5, #f5f5f5
Heading font:          var(--font-poppins)
Body font:             var(--font-inter)
Hero gradient:         linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)
Aurora animation:      already defined in tailwind keyframes — USE IT
```

**The aesthetic direction to commit to:**
Light-mode, editorial premium feel. The foundation is **white and lavender**
(`#f4f1f8` is already defined as `lavender` in `tailwind.config.ts`) with the
existing **Aurora UI component** as the hero background — soft animated color
washes of sky blue and indigo drifting across a white/lavender surface.

Think: the elegance of a luxury SaaS product — Apple, Linear, Craft Docs.
Clean white surfaces, lavender tints for depth, sky-blue and indigo accents
with soft glows (not harsh neon). Poppins for headings, Inter for body.
NOT dark mode. NOT flat/corporate. NOT cold or clinical.
The aurora background must feel alive and premium — like light refracting
through crystal.

---

## DESIGN SYSTEM TO IMPLEMENT

Define these as CSS variables in a new file `app/blog/blog.css`
(import it in `app/blog/layout.tsx` or whichever blog layout file exists):

```css
:root {
  /* Blog-specific design tokens — Aurora / White-Lavender palette */
  --blog-bg:           #ffffff;
  --blog-bg-alt:       #f4f1f8;          /* tailwind 'lavender' */
  --blog-surface:      #ffffff;
  --blog-surface-2:    #f4f1f8;
  --blog-surface-3:    #ede8f5;          /* slightly deeper lavender for depth */
  --blog-border:       rgba(99, 102, 241, 0.12);
  --blog-border-hover: rgba(14, 165, 233, 0.40);
  --blog-sky:          #0ea5e9;
  --blog-sky-dim:      rgba(14, 165, 233, 0.10);
  --blog-indigo:       #6366f1;
  --blog-indigo-dim:   rgba(99, 102, 241, 0.10);
  --blog-glow-sky:     0 4px 32px rgba(14, 165, 233, 0.15);
  --blog-glow-indigo:  0 4px 32px rgba(99, 102, 241, 0.12);
  --blog-text:         #0f172a;          /* near-black, readable on white */
  --blog-text-muted:   #64748b;
  --blog-text-dim:     #94a3b8;
  --blog-radius:       14px;
  --blog-radius-sm:    8px;
}
```

---

## PAGE 1 — BLOG LISTING PAGE

### File: `app/[lang]/blog/page.tsx` (or wherever the listing page lives)

**Overall layout:**
- Background: `var(--blog-bg)` — white base, the Aurora component provides
  the animated color layer on top
- Full width, no max-width constraint on the background
- Content column: `max-w-7xl mx-auto px-6`

---

### Section 1 — Hero

Replace whatever hero exists with this exact structure:

```
┌─────────────────────────────────────────────────────────┐
│  [subtle grid pattern overlay — see below]              │
│                                                         │
│   BLOG                          ← eyebrow label        │
│                                                         │
│   Thoughts, guides & insights   ← h1, Poppins 56px     │
│   from Cloudtopia               ← continues             │
│                                                         │
│   [short subtitle text]                                 │
│                                                         │
│   ○ 24 articles  ·  ○ 3 languages  ·  ○ Updated weekly │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation details:**

- Background: Use the existing **`<Aurora>`** component (already in
  `components/ui/`) as the hero background. Wrap the hero section like this:
  ```tsx
  <div className="relative overflow-hidden">
    <Aurora
      colorStops={["#bfdbfe", "#e0e7ff", "#f4f1f8"]}
      // sky-200, indigo-100, lavender — soft, light palette
      blend={0.5}
      amplitude={1.2}
      speed={0.4}
    />
    <div className="relative z-10 ...hero content...">
  </div>
  ```
  The Aurora sits behind all content at `z-0`. The hero content sits at `z-10`.
  Bottom of hero: `linear-gradient(to bottom, transparent 70%, white 100%)`
  overlay so it fades seamlessly into the white card grid below.
- Eyebrow label: small caps, letter-spacing `0.2em`, `var(--blog-sky)` color,
  `text-xs font-semibold tracking-widest uppercase` — like "BLOG"
- H1: Poppins, 56px (mobile: 36px), font-weight 700, letter-spacing -0.02em,
  color `#0f172a` (near-black on light bg). The words "Cloudtopia" or
  "insights" get gradient text:
  `background: linear-gradient(135deg, #0ea5e9, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent`
- Subtitle: Inter, 18px, `var(--blog-text-muted)`, max-width 520px
- Stats row: three small badges with a `·` separator. Each badge has a subtle
  `var(--blog-sky)` circle bullet. Font: Inter 14px, muted color.
- Framer Motion: the hero content animates in on mount with staggered
  `y: 24 → 0`, `opacity: 0 → 1`, 0.5s duration, 0.1s stagger between children.
  Use `useReducedMotion()` to disable if user prefers.

---

### Section 2 — Tag Filter Bar

A horizontally scrollable row of filter pills just above the cards.

```
[ All ] [ Cloud ] [ AI ] [ Gulf Market ] [ Dev ] [ Security ] [ Case Studies ]
```

**Implementation:**
- Scroll container: `overflow-x-auto`, hide scrollbar (`scrollbar-width: none`)
- Each pill: `px-4 py-1.5 rounded-full text-sm font-medium border transition-all`
- **Inactive pill**: border `var(--blog-border)`, text `var(--blog-text-muted)`,
  bg transparent. On hover: border `var(--blog-border-hover)`, text white.
- **Active pill**: bg `var(--blog-sky)`, text white, no border,
  `box-shadow: 0 0 16px rgba(14, 165, 233, 0.4)` — a glowing active state.
- Transition: `all 0.2s ease`
- Framer Motion `AnimatePresence` + `layout` prop on each card so the grid
  reflows smoothly when a filter is applied (cards fade out with `opacity: 0,
  scale: 0.96`, remaining cards shift into place).

---

### Section 3 — Featured Post (first/latest post gets special treatment)

The most recent post gets a **full-width featured card** above the grid:

```
┌─────────────────────────────────────────────────────────────┐
│  [cover image — left 55%]  │  [content — right 45%]        │
│                             │                               │
│  [image with gradient       │  FEATURED                     │
│   overlay on right edge]    │  [tag pills]                  │
│                             │  [title — large Poppins]      │
│                             │  [excerpt — 3 lines]          │
│                             │  [author · date · read time]  │
│                             │  [Read article →]             │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Card bg: `var(--blog-surface-2)` (lavender), border: `1px solid var(--blog-border)`,
  border-radius: `var(--blog-radius)`, overflow hidden,
  `box-shadow: 0 2px 12px rgba(99,102,241,0.08)`
- On hover: border color → `var(--blog-border-hover)`, box-shadow → `var(--blog-glow-sky)`
- Left image: `object-fit: cover`, full height of card, right edge has a
  `linear-gradient(to right, transparent 60%, var(--blog-surface-2) 100%)`
  overlay so it bleeds into the content side seamlessly
- "FEATURED" eyebrow: same style as hero eyebrow but indigo color
- Title: Poppins 32px, weight 700, `var(--blog-text)`, `-0.02em` tracking, 2-line clamp
- Excerpt: Inter 16px, `var(--blog-text-muted)`, 3-line clamp
- Author row: small avatar circle (initials, sky-blue bg) + name + date +
  reading time separated by `·`
- "Read article →" link: sky blue, hover underline, arrow animates `→` to
  move right 4px on hover with `transition: transform 0.2s`
- Mobile: stack vertically, image on top (200px height), content below

---

### Section 4 — Blog Card Grid

3 columns desktop, 2 tablet, 1 mobile. All remaining posts (excluding featured).

Each card:

```
┌───────────────────────────┐
│  [cover image — 16:9]     │
│                           │
├───────────────────────────┤
│  [tag pills]              │
│                           │
│  [title — 2 line clamp]   │
│                           │
│  [excerpt — 2 line clamp] │
│                           │
│  ─────────────────────── │
│  [avatar] Name · Date     │
│                ⟶ min read │
└───────────────────────────┘
```

**Implementation:**
- Card: `var(--blog-surface)` bg (white), `border: 1px solid var(--blog-border)`,
  `border-radius: var(--blog-radius)`, `overflow: hidden`,
  `box-shadow: 0 1px 4px rgba(99,102,241,0.06)` — subtle resting shadow
- On hover:
  - `transform: translateY(-6px)`
  - `border-color: var(--blog-border-hover)`
  - `box-shadow: var(--blog-glow-sky), 0 8px 32px rgba(14,165,233,0.10)`
  - Cover image: `transform: scale(1.04)` (zoom in subtly)
  - All transitions: `0.3s ease`
- Cover image container: fixed `aspect-ratio: 16/9`, `overflow: hidden`.
  If no cover image: show a generated gradient placeholder using the post's
  primary tag to pick from 4 gradient options:
  ```
  Cloud  → linear-gradient(135deg, #bae6fd, #e0f2fe)   (sky tints)
  AI     → linear-gradient(135deg, #c7d2fe, #e0e7ff)   (indigo tints)
  Dev    → linear-gradient(135deg, #99f6e4, #bae6fd)   (teal-sky)
  Other  → linear-gradient(135deg, #e0e7ff, #f4f1f8)   (indigo-lavender)
  ```
  Overlay a subtle geometric SVG pattern on the gradient placeholder at 15% opacity.
- Tag pills: `text-xs`, `px-2 py-0.5`, `rounded-full`,
  sky-blue text on `var(--blog-sky-dim)` background — NOT solid filled
- Title: Poppins 18px, weight 600, `var(--blog-text)` (dark), 2-line clamp
- Excerpt: Inter 14px, `var(--blog-text-muted)`, 2-line clamp
- Divider: `1px solid var(--blog-border)`
- Author: 28px circle avatar with initials, sky-blue bg with white text.
  Name in dark 13px, date and reading time in muted 13px
- Bottom-right reading time: include a small clock icon (Lucide `Clock` 12px)
- Framer Motion: on page load, cards animate in with staggered
  `y: 20 → 0`, `opacity: 0 → 1`, 0.06s stagger per card

---

## PAGE 2 — BLOG POST PAGE

### File: `app/[lang]/blog/[slug]/page.tsx` (or existing post page file)

**Two-column layout on desktop:**

```
┌─────────────────────────────────────────────────────────────────┐
│  [Reading progress bar — fixed top, 2px, sky→indigo gradient]   │
├─────────────────────────────────────────────────────────────────┤
│  [Full-width hero — cover image with overlay]                   │
├──────────────────┬──────────────────────────────────────────────┤
│  TOC sidebar     │  Article content                             │
│  (sticky, left)  │  (centered, max-w-2xl)                       │
│                  │                                              │
│  [h2 links]      │  [post body — MDX]                           │
│  [h3 links]      │                                              │
│                  │                                              │
└──────────────────┴──────────────────────────────────────────────┘
```

On mobile/tablet: TOC collapses into an accordion above the content.

---

### Component: `ReadingProgress`

```tsx
'use client'
// A fixed 2px bar at the very top of the viewport (above the site header,
// z-index: 9999). Fills left→right as user scrolls the post.
// Color: linear-gradient(90deg, #0ea5e9, #6366f1)
// On scroll complete (100%): add a subtle pulse animation then fade out
```

---

### Component: Post Hero

Full-viewport-width hero area, height `480px` (mobile: `280px`):

**If cover image exists:**
- Cover image: `object-fit: cover`, full width and height
- Overlay: `linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(244,241,248,0.97) 100%)`
  so the bottom fades completely into the lavender page background
- Post title and meta overlaid, bottom-aligned, on dark text (readable on
  the faded lower portion)

**If NO cover image (common case):**
- Use the **`<Aurora>`** component as the hero background:
  ```tsx
  <Aurora
    colorStops={["#bae6fd", "#c7d2fe", "#f4f1f8"]}
    blend={0.6}
    amplitude={1.5}
    speed={0.3}
  />
  ```
  Aurora fills the full hero area. Content overlaid at `z-10`.
  Bottom fade: `linear-gradient(to bottom, transparent 50%, white 100%)`

**Both cases — content overlay:**
- Tag pills (same style as card pills)
- H1: Poppins 48px (mobile: 28px), weight 700, `#0f172a`, -0.02em tracking,
  max-width 760px, centered
- Meta row: author avatar + name · date · reading time · language switcher pills
- Centered, bottom-aligned within the hero area

---

### Component: Language Switcher (in post header)

Three pill buttons: `EN` · `AR` · `TR`

- Container: `inline-flex gap-1 p-1 rounded-full bg-white/5 border border-white/10`
- Inactive: `px-3 py-1 rounded-full text-xs text-white/50 hover:text-white/80`
- Active: `px-3 py-1 rounded-full text-xs bg-[var(--blog-sky)] text-white font-medium`
- Clicking switches the language — wire to existing lang routing logic

---

### Component: Table of Contents (`TableOfContents`)

```
┌─────────────────────┐
│  On this page       │  ← Poppins 11px, tracking-widest, muted
│                     │
│  · Introduction     │  ← h2 link, active = sky blue + left accent bar
│    · Sub-section    │  ← h3 link, indented 12px, smaller
│  · Cloud basics     │
│  · Conclusion       │
└─────────────────────┘
```

**Implementation:**
- Width: `220px`, sticky `top-24`
- Background: transparent (floats over page bg)
- Label "On this page": `text-[11px] font-semibold tracking-[0.15em] uppercase
  text-[var(--blog-text-dim)]`
- Each TOC link: `text-sm text-[var(--blog-text-muted)] hover:text-white
  transition-colors py-1 block`
- Active link (currently visible heading): `text-[var(--blog-sky)]` + a
  `2px solid var(--blog-sky)` left border with `pl-3`
- Active state detection: use `IntersectionObserver` on all `h2`/`h3` elements.
  Update active ID in state as headings enter viewport.
- Mobile: render as a collapsible `<details>` element styled as an accordion
  above the article body. Include a chevron icon that rotates on open.

---

### Component: Post Body (`BlogPostBody`)

This is the most important component. Every MDX element must be styled.

Wrap the `MDXRemote` output in a `<div className="blog-prose">` and add these
styles in `blog.css`:

```css
.blog-prose {
  font-family: var(--font-inter);
  font-size: 17px;
  line-height: 1.85;
  color: var(--blog-text);          /* #0f172a — dark on white */
  max-width: 680px;
}

/* Headings */
.blog-prose h2 {
  font-family: var(--font-poppins);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-left: 16px;
  border-left: 3px solid var(--blog-sky);
  box-shadow: -3px 0 12px rgba(14, 165, 233, 0.2);
}

.blog-prose h3 {
  font-family: var(--font-poppins);
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

/* Paragraph */
.blog-prose p {
  margin-bottom: 1.5rem;
  color: #334155;
}

/* Blockquote — premium treatment */
.blog-prose blockquote {
  position: relative;
  margin: 2rem 0;
  padding: 1.5rem 1.5rem 1.5rem 2rem;
  background: var(--blog-surface-2);   /* lavender bg */
  border-left: 3px solid var(--blog-sky);
  border-radius: 0 var(--blog-radius-sm) var(--blog-radius-sm) 0;
  box-shadow: var(--blog-glow-sky);
  font-style: italic;
  color: #475569;
}

/* Giant decorative quote mark */
.blog-prose blockquote::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 12px;
  font-family: var(--font-poppins);
  font-size: 80px;
  font-weight: 700;
  color: var(--blog-sky);
  opacity: 0.18;
  line-height: 1;
}

/* RTL blockquote flip */
[dir="rtl"] .blog-prose blockquote {
  border-left: none;
  border-right: 3px solid var(--blog-sky);
  border-radius: var(--blog-radius-sm) 0 0 var(--blog-radius-sm);
  padding-left: 1.5rem;
  padding-right: 2rem;
}
[dir="rtl"] .blog-prose blockquote::before {
  left: auto;
  right: 12px;
}

/* Inline code */
.blog-prose code:not(pre code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  padding: 2px 7px;
  background: var(--blog-surface-3);   /* ede8f5 — deeper lavender */
  color: var(--blog-indigo);
  border: 1px solid var(--blog-border);
  border-radius: 4px;
}

/* Code block */
.blog-prose pre {
  background: #1e1b4b;               /* deep indigo — intentional contrast */
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: var(--blog-radius-sm);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.75rem 0;
  position: relative;
}

/* Code block — language label */
.blog-prose pre::before {
  content: attr(data-language);
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 10px;
  font-family: var(--font-inter);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(199, 210, 254, 0.5);    /* indigo-100 at 50% */
}

.blog-prose pre code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #e0e7ff;                     /* indigo-100 — readable on deep indigo */
}

/* Links */
.blog-prose a {
  color: var(--blog-sky);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(14, 165, 233, 0.3);
  transition: text-decoration-color 0.2s;
}
.blog-prose a:hover {
  text-decoration-color: var(--blog-sky);
}

/* Images */
.blog-prose img {
  width: 100%;
  border-radius: var(--blog-radius);
  border: 1px solid var(--blog-border);
  margin: 2rem 0;
  box-shadow: 0 4px 24px rgba(99,102,241,0.08);
}

/* Lists */
.blog-prose ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}
.blog-prose ul li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #334155;
}
.blog-prose ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 6px;
  height: 6px;
  background: var(--blog-sky);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(14, 165, 233, 0.4);
}

.blog-prose ol {
  padding-left: 0;
  counter-reset: list-counter;
  margin-bottom: 1.5rem;
}
.blog-prose ol li {
  counter-increment: list-counter;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  color: #334155;
}
.blog-prose ol li::before {
  content: counter(list-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blog-sky-dim);
  color: var(--blog-sky);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-poppins);
}

/* RTL list flip */
[dir="rtl"] .blog-prose ul li,
[dir="rtl"] .blog-prose ol li {
  padding-left: 0;
  padding-right: 1.5rem;
}
[dir="rtl"] .blog-prose ul li::before {
  left: auto;
  right: 0;
}
[dir="rtl"] .blog-prose ol li {
  padding-right: 2rem;
}
[dir="rtl"] .blog-prose ol li::before {
  left: auto;
  right: 0;
}

/* Horizontal rule */
.blog-prose hr {
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--blog-sky) 30%,
    var(--blog-indigo) 70%,
    transparent
  );
  margin: 2.5rem 0;
  opacity: 0.3;
}

/* Table */
.blog-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.75rem 0;
  font-size: 15px;
}
.blog-prose th {
  background: var(--blog-surface-2);   /* lavender */
  color: #0f172a;
  font-family: var(--font-poppins);
  font-weight: 600;
  padding: 10px 16px;
  text-align: left;
  border-bottom: 2px solid var(--blog-sky);
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.blog-prose td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--blog-border);
  color: #334155;
}
.blog-prose tr:hover td {
  background: var(--blog-sky-dim);
}
```

---

### Post Footer

After the post body, show:

1. **Tags section**: "Tagged with:" label + full tag pills (same style as cards
   but slightly larger, `px-3 py-1`)

2. **Share bar**: "Share this article:" + three icon buttons for Twitter/X,
   LinkedIn, Copy Link. Each is a circle button `w-9 h-9` with icon, border
   `var(--blog-border)`, hover glows sky-blue. Copy Link button copies
   `window.location.href` to clipboard and shows a "Copied!" tooltip for 2s.

3. **Language switcher section**: "Read in another language:" + the three
   language pill buttons (EN · AR · TR), same as header version.

4. **Back to blog**: A prominent back button:
   ```
   ← Back to all articles
   ```
   Left-aligned, sky-blue, Poppins 15px, arrow animates left on hover.
   For RTL: flip to right-aligned with → arrow.

5. **"More articles" section**: Show 2 other random posts from the same
   language in mini-cards (same design as grid cards but no excerpt, just
   image + tag + title + meta).

---

## ADDITIONAL DETAILS — apply everywhere

### Glow effects
Use `box-shadow` glows sparingly but deliberately on:
- Active tag pills → sky glow
- Hovered cards → sky glow
- Featured card → sky glow on hover
- Blockquotes → sky glow on the border
- H2 left border in prose → sky glow
- Active TOC item → no glow (just color change — keep it subtle)

### Micro-interactions
- All interactive elements have `transition: all 0.2s ease` minimum
- Buttons and pills: `active:scale-95`
- Card images: `transition: transform 0.4s ease` on hover zoom
- TOC links: smooth color transition on active change

### Fonts — add to blog layout
```tsx
import { Poppins } from 'next/font/google'
// Poppins is likely already loaded site-wide via var(--font-poppins)
// If JetBrains Mono is not loaded, add it:
import { JetBrains_Mono } from 'next/font/google'
```

### Arabic (RTL) specifics
When the current lang is `ar`:
- Set `dir="rtl"` on the outermost post/listing wrapper
- `font-family` for Arabic body text: add `'Noto Naskh Arabic'` as a fallback
  after Inter in the `.blog-prose` CSS
- All left-positioned elements flip: TOC goes right, blockquote border goes
  right, list bullets go right (handled by `[dir="rtl"]` rules above)
- TOC sidebar: change from `lg:grid-cols-[220px_1fr]` to
  `lg:grid-cols-[1fr_220px]` and swap order
- Use Tailwind `rtl:` variants for padding/margin flips throughout components

### No cover image fallback
Every `BlogCard` and post hero must handle a missing `coverImage` gracefully.
For cards: use the light gradient placeholders defined in Section 4 above.
For the post hero: use the `<Aurora>` component with the soft color stops.
Never show a broken image or blank box.

---

## QUALITY BAR — this is what "done" looks like

Before finishing, the result must pass this visual check:

- [ ] Hero uses the Aurora component with soft sky/indigo/lavender color stops
- [ ] Page background is white `#ffffff`, card sections use lavender `#f4f1f8`
- [ ] Sky blue (#0ea5e9) and indigo (#6366f1) appear as accents only —
      never as large filled backgrounds (except code blocks which use deep indigo)
- [ ] Cards have visible depth: subtle resting shadow + hover glow + translate
- [ ] Featured post feels noticeably more prominent than grid cards
- [ ] Post body prose is comfortable to read on white background:
      dark text (#334155), generous line-height, good spacing
- [ ] H2 headings in prose have the sky-blue left border + soft glow
- [ ] Blockquotes have lavender background, look editorial not default browser
- [ ] Code blocks use deep indigo background — intentional contrast with light page
- [ ] TOC highlights the correct heading as user scrolls
- [ ] Reading progress bar fills correctly from 0 to 100%
- [ ] RTL layout is correct: no left-to-right bleeding for Arabic
- [ ] No TypeScript errors
- [ ] Mobile: single column, TOC as accordion, readable at 375px

---

*UI redesign prompt — Cloudtopia blog feature*
*Infrastructure unchanged — visual layer only*
*Stack: Next.js 14 · Tailwind CSS · Framer Motion · CSS custom properties*
