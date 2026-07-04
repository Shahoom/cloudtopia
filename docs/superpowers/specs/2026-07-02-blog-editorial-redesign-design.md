# CloudTopia Blog — Editorial ("New York Times / magazine") Redesign

**Date:** 2026-07-02
**Scope:** Visual layer only for the live blog at `/[locale]/articles/*`. No data,
routing, i18n, SEO/JSON-LD, Lexical/block-parsing, sitemap, or Header/Footer changes.
**Goal:** Replace the current lavender/SaaS look with a premium, warm, editorial
magazine system — serif display type on ivory paper, hairline rules, restrained
accent — inspired by NYT / The Atlantic / Monocle, adapted to CloudTopia and to
bilingual EN + AR (RTL).

The three reference styles are used **by context**, not mixed randomly:
- **Modern editorial (B)** — connective tissue: the article reading page + most cards.
- **Premium magazine (C)** — showpiece moments: the index lead story + section mastheads.
- **Classic broadsheet (A)** — dense, scannable zones: secondary rows + section indexes.

---

## 1. Design DNA (inherited by every page)

### Palette (light only — "editorial paper")
| Token | Value | Use |
|---|---|---|
| `--ed-paper` | `#faf9f5` | page background (replaces `#f4f1f8`) |
| `--ed-paper-2` | `#f2eee4` | typographic-cover / raised tint |
| `--ed-ink` | `#1a1712` | headings, primary text |
| `--ed-body` | `#3a352c` | body copy |
| `--ed-graphite` | `#6b6459` | secondary text |
| `--ed-muted` | `#a39a86` | meta, captions, kicker-on-paper |
| `--ed-rule` | `#e6e0d4` | hairline rules |
| `--ed-rule-strong` | `#1a1712` | 2px section rules |
| `--ed-accent` | `#0284c7` | global accent (links, UI, default kicker) |

Category colors (from `category.color`, fallback `--ed-accent`) are used **only** as
small accents: kicker text, cover top-rule, cover glyph tint. Never large fills.

### Typography
- **Display serif (Latin):** Fraunces → `--font-fraunces`. Headlines, section titles,
  pull quotes, drop caps, "most read" numerals.
- **Display serif (Arabic):** Amiri → `--font-amiri`. Arabic headlines + pull quotes.
- **Body / UI sans:** existing Changa (`--font-inter`) both locales. (Swapping EN body
  to Inter or to serif is a documented one-line option, not in scope now.)
- Kickers/bylines/captions: sans, 11px, `letter-spacing:.14–.16em`, uppercase.

### Editorial motifs
Letterspaced small-caps kicker · drop cap on the article's first paragraph · hairline
rules under bylines & between sections · pull quote on a 2px accent left-rule · small
italic serif captions · 2px ink "section" rules · no `font-black`, no `rounded-3xl`
bubbles, no `bg-sky-50` fills.

---

## 2. Page layouts

### Article index (`articles/page.tsx`)
Slim masthead ("Articles" serif + "Updated weekly · EN/AR" on a 2px ink rule) →
small-caps **section bar** → **lead story** (magazine split, large serif) → **3-col
broadsheet secondary row** divided by vertical hairlines → **"Latest" river** (thumb +
kicker + serif headline + byline rows, hairline-separated) beside a **"Most read"**
numbered rail; newsletter as a hairline box. `CategoriesGrid`, `AnnouncementStrip`,
`CTABanner`, `BlogCTA` restyled to hairline/editorial.

### Article reading page (`articles/[slug]/page.tsx`)
Full-width editorial hero: breadcrumb → kicker → large serif H1 → italic dek → byline
between hairline rules (avatar + author + date + reading time + views) → cover image +
italic caption (or typographic cover). Body: single centered measure (~720px) directly
on paper (no white card), drop cap, serif H2/H3, sans body, editorial blockquote/pull
quote, restyled callout/stat/comparison/steps/code blocks. Left TOC rail (sticky
hairline, accent `aria-current`); right rail = restyled inquiry card + minimal share.
Footer: tags on 2px rule → author box → prev/next hairline rows → related 3-up.

### Section pages (category / tag / author / search)
One shared template: **SectionMasthead** (label + serif name + description + count +
sort) on a 2px rule, then the broadsheet list (photo + typographic covers mixed).
Author adds a bio header; search adds query + result count + search field.

---

## 3. No-cover fallback: `TypographicCover`
Deterministic from the post's category. Renders: category-color top rule, small-caps
kicker (category color), serif title (clamped), faint category glyph (Tabler-style,
`aria-hidden`), "CloudTopia" wordmark. Sizes: `lead` | `card` | `thumb` | `hero`.
Used anywhere `coverImage?.url` is missing (cards, list thumbs, lead, hero) so nothing
renders a broken/gradient block.

---

## 4. Bilingual / RTL
`dir="rtl"` for `ar` (already set at layout). Mirror: section bar reverses, drop cap +
pull-quote/callout accent rules flip right, TOC rail moves right, byline meta + tags
flow right. Arabic display → Amiri; Arabic body/UI → Changa. Dates/numbers already via
`Intl`. Fraunces is Latin-only and never applied to Arabic text.

## 5. Motion & accessibility
Restrained: card fade-in (reuse existing keyframe), gentle image hover, reading-progress
bar — all under `@media (prefers-reduced-motion: reduce)`. Semantic headings preserved;
TOC is `nav` + `aria-current`; decorative glyphs `aria-hidden`; focus-visible rings;
verify ink-on-paper and accent-link contrast ≥ AA.

---

## 6. Component change map

**Foundation (new):**
- Fonts (Fraunces + Amiri) added in `app/(frontend)/layout.tsx`.
- `app/(frontend)/[locale]/articles/layout.tsx` (new) → imports `editorial.css`,
  wraps children in `.blog-editorial` themed div, sets `dir`.
- `app/(frontend)/[locale]/articles/editorial.css` (new) → tokens, `.article-prose`,
  primitive styles, RTL rules.
- `components/blog/editorial/` (new): `Kicker`, `Byline`, `PullQuote`, `SectionMasthead`,
  `TypographicCover`, `categoryColor.ts` helper.

**Rewrite (visual only):** `RichTextRenderer`, `ContentBlockRenderer` (12 blocks),
`ArticleHero`, `ArticleContent`, `TableOfContents`, `AuthorBox`, `ShareButtons`,
`PreviousNextPosts`, `RelatedPosts`, `Breadcrumbs`, `ReadingProgress`, `KeyTakeawaysBox`,
`FAQAccordion`, `InquiryFormSidebar`, `NewsletterBox`, `BlogCTA`, insights/`CategoryNavBar`,
`CategoriesGrid`, `SidebarCategoryTags`, `AnnouncementStrip`, `CTABanner`, `LoadMoreButton`,
`HeroFeaturedSection`, `InsightsArticleCard`; pages: `articles/page.tsx`,
`articles/[slug]/page.tsx`, `category/[slug]`, `tag/[slug]`, `author/[slug]`, `search`.

**Never touch:** `lib/blog/*`, routing, i18n logic, SEO/JSON-LD blocks, Lexical/block
parsing, sitemap, `components/Header.tsx` / Footer, Payload admin components.

---

## 7. Phased implementation
1. **Foundation** — fonts, `editorial.css` tokens + prose, `articles/layout.tsx`,
   primitives (`Kicker`, `Byline`, `PullQuote`, `TypographicCover`, `SectionMasthead`),
   `categoryColor` helper.
2. **Reading page** — `ArticleHero`, `RichTextRenderer` prose, `ContentBlockRenderer`,
   `ArticleContent` shell + `TableOfContents`, `AuthorBox`, `ShareButtons`, `PreviousNextPosts`.
3. **Index page** — `articles/page.tsx`, `HeroFeaturedSection`, `InsightsArticleCard`,
   `CategoryNavBar`, `CategoriesGrid`, `SidebarCategoryTags`, `AnnouncementStrip`, `CTABanner`.
4. **Section pages** — `SectionMasthead` into category/tag/author/search + their lists.
5. **Shared + polish** — `BlogCTA`, `NewsletterBox`, `FAQAccordion`, `KeyTakeawaysBox`,
   `RelatedPosts`, `Breadcrumbs`, `ReadingProgress`, RTL pass, reduced-motion, a11y/contrast,
   browser verification (EN + AR), typecheck/build.

Retire `insights.css` usage once `editorial.css` covers the listing animations.
