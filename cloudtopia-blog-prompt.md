# Cloudtopia Blog — Antigravity Master Prompt

---

## CONTEXT

You are working inside the **Cloudtopia** Next.js 14 App Router codebase.
The site is deployed on Vercel, uses TypeScript, Tailwind CSS, Framer Motion,
and has a custom bilingual i18n system in `lib/i18n/` with a `LanguageContext`
and translation files per language. The existing i18n system currently supports
**English (en)** and **Arabic (ar)** — we are extending it to also support **Turkish (tr)**.

You are on the `feature/blog` branch created from `main`. Do NOT modify any
existing pages or components — this is a purely additive feature.

---

## TASK

Build a **premium trilingual blog** (Arabic · English · Turkish) integrated into
the existing Next.js 14 App Router structure. Blog posts are stored as **MDX files**
in the filesystem — no external CMS or database required.

---

## FILE STRUCTURE TO CREATE

```
app/
  blog/
    page.tsx                        ← Blog listing page
    [slug]/
      page.tsx                      ← Individual blog post page
    posts/
      en/
        getting-started-with-cloud.mdx
        ai-in-the-gulf-market.mdx
      ar/
        getting-started-with-cloud.mdx
        ai-in-the-gulf-market.mdx
      tr/
        getting-started-with-cloud.mdx
        ai-in-the-gulf-market.mdx

lib/
  blog.ts                           ← MDX reading, parsing, and helper functions

components/
  blog/
    BlogCard.tsx                    ← Post card for listing page
    BlogGrid.tsx                    ← Grid layout for listing page
    BlogHeader.tsx                  ← Hero section for listing page
    BlogPostLayout.tsx              ← Full post layout wrapper
    BlogPostHeader.tsx              ← Post title, meta, cover image area
    BlogPostBody.tsx                ← Styled MDX content renderer
    BlogLanguageSwitcher.tsx        ← Switches between translations of same post
    BlogTagFilter.tsx               ← Tag-based filtering on listing page
    ReadingProgress.tsx             ← Scroll progress bar at top of post page
    TableOfContents.tsx             ← Auto-generated TOC from post headings
```

---

## 1. MDX FRONTMATTER SCHEMA

Every `.mdx` file must have this frontmatter:

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"           # Must match across all language files for same post
lang: "en"                       # en | ar | tr
date: "2025-03-15"
author: "Cloudtopia Team"
tags: ["Cloud", "AI", "Gulf"]
excerpt: "Short description shown on listing page (1-2 sentences)."
coverImage: "/images/blog/cover-cloud.jpg"
readingTime: 5                   # minutes
---
```

---

## 2. `lib/blog.ts` — MDX HELPER

Create this utility file with full TypeScript types:

```typescript
// Types
export type BlogPost = {
  slug: string
  lang: 'en' | 'ar' | 'tr'
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage: string
  readingTime: number
  content: string   // raw MDX string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>
```

Implement these functions using `fs`, `path`, and `gray-matter`:

- `getAllPosts(lang: string): BlogPostMeta[]` — returns all posts for a language,
  sorted by date descending
- `getPostBySlug(slug: string, lang: string): BlogPost | null` — reads a single
  post's frontmatter + content
- `getPostSlugs(): string[]` — returns unique slugs (from the `en/` folder as
  canonical source)
- `getAllTags(lang: string): string[]` — returns deduplicated tags for a language

Install `gray-matter` if not already in `package.json`.
Install `next-mdx-remote` for rendering MDX content.

---

## 3. i18n EXTENSION — ADD TURKISH

In `lib/i18n/config.ts`, add `'tr'` to the supported locales array alongside
`'en'` and `'ar'`.

In `lib/i18n/translations/`, create `tr.ts` with these blog-related keys
(mirror the structure of the existing `en.ts` and `ar.ts` files, and add):

```typescript
blog: {
  title: "Blog",
  subtitle: "Düşünceler, rehberler ve Cloudtopia'dan içgörüler",
  readMore: "Devamını oku",
  readingTime: "dk okuma",
  publishedOn: "Yayınlanma tarihi",
  by: "Yazar",
  tags: "Etiketler",
  allPosts: "Tüm yazılar",
  noPostsFound: "Henüz yazı bulunamadı.",
  tableOfContents: "İçindekiler",
  sharePost: "Paylaş",
  backToBlog: "Blog'a dön",
}
```

Add equivalent keys to `en.ts`:
```typescript
blog: {
  title: "Blog",
  subtitle: "Thoughts, guides, and insights from Cloudtopia",
  readMore: "Read more",
  readingTime: "min read",
  publishedOn: "Published on",
  by: "By",
  tags: "Tags",
  allPosts: "All posts",
  noPostsFound: "No posts found yet.",
  tableOfContents: "Table of contents",
  sharePost: "Share",
  backToBlog: "Back to blog",
}
```

Add equivalent keys to `ar.ts`:
```typescript
blog: {
  title: "المدونة",
  subtitle: "أفكار ودليل ورؤى من كلاودتوبيا",
  readMore: "اقرأ المزيد",
  readingTime: "دقائق قراءة",
  publishedOn: "نُشر في",
  by: "بقلم",
  tags: "الوسوم",
  allPosts: "جميع المقالات",
  noPostsFound: "لا توجد مقالات بعد.",
  tableOfContents: "جدول المحتويات",
  sharePost: "شارك",
  backToBlog: "العودة للمدونة",
}
```

Also update the `LanguageSwitcher.tsx` component to show Turkish (`TR`) as a
third option, following the existing EN/AR toggle pattern.

---

## 4. BLOG LISTING PAGE — `app/blog/page.tsx`

This is a **Next.js Server Component** (no `'use client'`).

- Read language from the URL search param `?lang=en` (default to `'en'`)
- Call `getAllPosts(lang)` to get posts
- Pass posts to the `<BlogGrid>` client component
- Export `generateMetadata()` returning title, description, and og tags per language
- The page URL is always `/blog` — language is toggled via the existing
  `LanguageContext`, not separate routes

```typescript
// Metadata example
export async function generateMetadata({ searchParams }) {
  // Return title/description based on lang param
}
```

---

## 5. BLOG POST PAGE — `app/blog/[slug]/page.tsx`

Server Component.

- Accept `{ params: { slug }, searchParams: { lang } }`
- Call `getPostBySlug(slug, lang)` — if null, call `notFound()`
- Render `<BlogPostLayout>` with the post data
- Export `generateStaticParams()` returning all slugs for static generation
- Export `generateMetadata()` with full SEO meta:
  - `title`, `description` from frontmatter
  - `openGraph` with image, title, type: 'article'
  - `alternates.languages` object for hreflang:
    ```typescript
    alternates: {
      languages: {
        'en': `/blog/${slug}?lang=en`,
        'ar': `/blog/${slug}?lang=ar`,
        'tr': `/blog/${slug}?lang=tr`,
      }
    }
    ```

---

## 6. SITEMAP — UPDATE `app/sitemap.ts`

Add blog URLs to the existing sitemap. For each post slug, add three entries
(one per language). Example:

```typescript
// In the sitemap array, add:
...slugs.flatMap(slug => ['en', 'ar', 'tr'].map(lang => ({
  url: `https://cloudtopia.net/blog/${slug}?lang=${lang}`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.7,
})))
```

---

## 7. SAMPLE MDX POSTS

Create **2 sample posts in all 3 languages** (6 files total).

**Post 1 slug:** `cloud-computing-for-gulf-businesses`
**Post 2 slug:** `ai-solutions-mena-region`

Write real, useful content (300–500 words each) relevant to Cloudtopia's
audience: Gulf and MENA businesses interested in cloud technology, digital
transformation, and AI. Arabic posts should be written in natural Gulf-region
Arabic. Turkish posts should be professional business Turkish.

---

## 8. PREMIUM UI DESIGN REQUIREMENTS

This is the most important section. The blog must look **world-class** —
inspired by the quality of Linear.app, Vercel's blog, Stripe's editorial,
and Notion's clean aesthetic, but with Cloudtopia's own dark navy + gold
brand identity.

### Design System

- **Color palette**: Dark navy background (`#0a0f1e`), rich navy card surfaces
  (`#0d1526`), electric gold accent (`#d4a843`), muted gold (`#a07830`),
  off-white text (`#f0eeea`), muted text (`#8a9ab5`)
- **Typography**:
  - Display/headings: `Playfair Display` (serif, from Google Fonts) — gives a
    premium editorial feel
  - Body/UI: `DM Sans` (from Google Fonts) — clean, modern, readable
  - Arabic text: use `Noto Naskh Arabic` for body, `Scheherazade New` for
    display headings when lang is `ar`
  - Turkish uses the same Latin fonts as English
- **Motion**: Use Framer Motion (already installed). Staggered card reveals on
  listing page, smooth fade-in on post load, parallax on cover image.

### Blog Listing Page Design

The listing page (`BlogGrid` + `BlogCard`) must feel like an editorial magazine:

- **Hero section** (`BlogHeader`): Full-width, dark background, large display
  title with a subtle animated gradient underline in gold. Show total post count.
- **Cards**: Large, dark navy cards with a generous cover image (16:9 aspect
  ratio, with an overlay gradient at the bottom). On hover: subtle upward
  translate (`y: -4px`) and a gold left-border glow effect. Show: cover image,
  tags (small gold pills), title (Playfair Display), excerpt (2 lines clamped),
  author avatar placeholder + name, date, reading time.
- **Tag filter bar**: Horizontally scrollable row of filter pills above the grid.
  Active tag pill has gold background. Animated smooth filter transition using
  Framer Motion `AnimatePresence`.
- **Grid**: 3-column on desktop, 2-column on tablet, 1-column on mobile.
  Cards animate in with staggered `y: 20 → 0` + `opacity: 0 → 1`.

### Blog Post Page Design

The post page must feel like reading a luxury editorial publication:

- **`ReadingProgress`**: A thin 2px gold bar that fills across the top of the
  viewport as the user scrolls. Fixed position, z-index above header.
- **`BlogPostHeader`**: 
  - Full-viewport-width cover image with a dark overlay gradient (bottom 60%
    fades to the page background color)
  - Post title overlaid on the image in large Playfair Display, white text
  - Tags, date, reading time, author shown below the image in a centered column
- **`TableOfContents`**: 
  - Sticky sidebar on desktop (appears on the left for LTR, right for RTL)
  - Collapsible accordion on mobile
  - Active heading highlighted in gold as user scrolls
  - Auto-generated from `## h2` and `### h3` headings in the MDX content
- **`BlogPostBody`**: Richly styled MDX prose:
  - Max-width `680px`, centered, generous line-height (`1.85`)
  - `h2`: Playfair Display, gold left border (4px), large size
  - `h3`: DM Sans medium, slightly muted gold
  - `p`: Off-white, comfortable reading size (`17px`), good paragraph spacing
  - `blockquote`: Dark navy background, 4px solid gold left border, italic,
    slightly indented, with a subtle `"` decorative character in large gold
  - `code` (inline): Dark navy pill with gold text
  - `pre` (code block): Dark surface with subtle border, syntax highlighting
    color theme matching the navy/gold palette
  - `a`: Gold underline on hover with smooth transition
  - `img`: Full width, rounded corners (`12px`), subtle shadow
  - `ul` / `ol`: Custom gold bullet/number styling
- **`BlogLanguageSwitcher`** (inside post): Three small pill buttons (EN · AR · TR),
  gold for active. Clicking one updates the `?lang=` param and re-renders
  without full navigation. RTL layout flips automatically when switching to AR.
- **Back to blog link**: Fixed bottom-left on desktop, subtle pill with arrow icon.

### RTL Support

When `lang === 'ar'`:
- Set `dir="rtl"` on the post wrapper
- Flip the `TableOfContents` to the right side
- Flip blockquote border from left to right
- Flip the back button position
- Use Arabic display font for headings
- All done with Tailwind's `rtl:` variant and inline dir attributes — no
  separate CSS files

---

## 9. DEPENDENCIES TO INSTALL

```bash
npm install gray-matter next-mdx-remote
```

`framer-motion`, `tailwindcss`, and `@radix-ui/*` are already installed.

For Google Fonts, add to `app/layout.tsx` (or the blog layout) using
Next.js `next/font/google`:

```typescript
import { Playfair_Display, DM_Sans, Noto_Naskh_Arabic } from 'next/font/google'
```

---

## 10. QUALITY CHECKLIST

Before finishing, verify:

- [ ] `/blog` page loads and shows post cards in all 3 languages via `?lang=`
- [ ] `/blog/[slug]` loads correct post content per language
- [ ] Switching language on a post page stays on the same post (same slug)
- [ ] RTL layout is correct when `lang=ar`
- [ ] `ReadingProgress` bar animates on scroll
- [ ] `TableOfContents` highlights correct heading on scroll
- [ ] `sitemap.ts` includes all blog URLs
- [ ] `generateMetadata()` returns correct hreflang alternates
- [ ] No TypeScript errors
- [ ] All Framer Motion animations use `useReducedMotion()` fallback for
      accessibility
- [ ] Cover images have `alt` text from frontmatter title
- [ ] Mobile responsive at 375px, 768px, 1280px

---

## IMPORTANT NOTES

- Do NOT use the Next.js `[lang]` route segment for i18n — the existing site
  uses a Context-based approach. Match that pattern.
- Do NOT create a separate layout for the blog that conflicts with the root
  `app/layout.tsx` — nest a `blog/layout.tsx` inside `app/blog/` that simply
  adds the `ReadingProgress` component.
- The blog is a feature addition — the Header, Footer, theme provider, and
  language context are already globally applied.
- Commit all new files to the `feature/blog` branch.

---

*Prompt prepared for Antigravity IDE — Cloudtopia blog feature build*
*Stack: Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · MDX*
