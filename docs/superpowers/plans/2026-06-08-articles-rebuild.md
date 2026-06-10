# CloudTopia Articles Section Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/articles` listing page and `/articles/[slug]` detail page to precisely match the DevTechnoSys reference structural layout (7/5 hero split, 8/4 grid+sidebar, 3-col post layout) while using CloudTopia's existing design tokens and PayloadCMS data layer.

**Architecture:** The existing `lib/blog/data.ts` data layer is kept **100% unchanged**. All new UI components live in `components/blog/insights/`. The articles listing page (`articles/page.tsx`) is rebuilt from scratch with the new layout. The article detail page (`articles/[slug]/page.tsx`) gains a FAQAccordion section. Existing components `ArticleHero`, `ArticleContent`, and `TableOfContents` are enhanced in-place.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 3.4, Framer Motion 12, Lucide React 0.263.

---

## Design Token Reference (from existing codebase)

```
Primary accent:  primary-500 = #0ea5e9 (sky blue)  | primary-600 = #0284c7 | primary-700 = #0369a1
Secondary:       secondary-500 = #6366f1 (indigo)   | secondary-600 = #4f46e5
Heading color:   text-neutral-900 / text-neutral-950
Body text:       text-neutral-700
Muted/meta:      text-neutral-400 / text-neutral-500
Page bg:         bg-lavender = #f4f1f8
Card bg:         bg-white
Borders:         border-neutral-200
Body font:       font-sans = 'Changa'
Heading font:    font-heading = 'Cairo'
Marquee anim:    animate-marquee (defined in tailwind.config.ts, --duration CSS var)
```

---

## File Manifest

### New files (create)
| File | Purpose |
|---|---|
| `app/(frontend)/[locale]/articles/insights.css` | Card fade-in keyframe, stagger delays |
| `components/blog/insights/AnnouncementStrip.tsx` | Marquee top bar |
| `components/blog/insights/CategoryNavBar.tsx` | Horizontal category links + search |
| `components/blog/insights/HeroFeaturedSection.tsx` | 7/5 split: featured post + 3 sidebar posts |
| `components/blog/insights/CategoriesGrid.tsx` | 5-col category illustration cards |
| `components/blog/insights/InsightsArticleCard.tsx` | Card with watermark image + shadow |
| `components/blog/insights/SidebarCategoryTags.tsx` | Sticky sidebar with tag pills |
| `components/blog/insights/CTABanner.tsx` | Full-width dark gradient CTA section |
| `components/blog/insights/LoadMoreButton.tsx` | Client component: spinner + animated card-in |
| `components/blog/insights/InquiryFormSidebar.tsx` | Sticky contact form sidebar |
| `components/blog/insights/KeyTakeawaysBox.tsx` | Gray box with left border accent |
| `components/blog/insights/FAQAccordion.tsx` | Client: animated accordion |

### Modified files (enhance)
| File | Change |
|---|---|
| `app/(frontend)/[locale]/articles/page.tsx` | Full layout rebuild using new components |
| `app/(frontend)/[locale]/articles/[slug]/page.tsx` | Add FAQAccordion below RelatedPosts |
| `components/blog/TableOfContents.tsx` | Numbered sections + scroll progress bar |
| `components/blog/ArticleHero.tsx` | Add 4-cell meta bar below title |
| `components/blog/ArticleContent.tsx` | Replace right-sidebar CTA with InquiryFormSidebar; add KeyTakeawaysBox |

---

## Task 1: Create `insights.css` (card-fade-in animation)

**Files:**
- Create: `app/(frontend)/[locale]/articles/insights.css`

- [ ] **Step 1: Create the CSS file**

```css
/* Card stagger fade-in for Load More */
@keyframes insights-card-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.insights-card-enter {
  animation: insights-card-in 0.38s ease both;
}
.insights-card-enter:nth-child(1)  { animation-delay: 0ms; }
.insights-card-enter:nth-child(2)  { animation-delay: 60ms; }
.insights-card-enter:nth-child(3)  { animation-delay: 120ms; }
.insights-card-enter:nth-child(4)  { animation-delay: 180ms; }
.insights-card-enter:nth-child(5)  { animation-delay: 240ms; }
.insights-card-enter:nth-child(6)  { animation-delay: 300ms; }
.insights-card-enter:nth-child(7)  { animation-delay: 360ms; }
.insights-card-enter:nth-child(8)  { animation-delay: 420ms; }
```

- [ ] **Step 2: Verify no syntax errors**

Run: `npx tsc --noEmit`
Expected: No errors (CSS files don't affect TS compilation)

- [ ] **Step 3: Commit**

```bash
git add app/\(frontend\)/\[locale\]/articles/insights.css
git commit -m "feat(articles): add insights card fade-in animation CSS"
```

---

## Task 2: `AnnouncementStrip` component

**Files:**
- Create: `components/blog/insights/AnnouncementStrip.tsx`

The announcement strip uses the existing `animate-marquee` Tailwind animation defined in `tailwind.config.ts`. To create a seamless loop, the text is duplicated (both copies render side-by-side; when the first half scrolls off-screen the second seamlessly continues).

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'

const messages = [
  'Cloud Migration Strategy 2026 — New Guide Available',
  'Kubernetes vs Docker Swarm: Complete Comparison',
  'How Much Does Cloud Infrastructure Cost in 2026?',
  'Building Serverless Apps with AWS Lambda — Free Guide',
  'Multi-Cloud Architecture Best Practices',
  'Cloud Security for Enterprise Applications',
]

export function AnnouncementStrip() {
  const text = messages.join('  ·  ')

  return (
    <div className="relative flex h-10 w-full overflow-hidden bg-neutral-950 text-white">
      <div
        className="animate-marquee flex shrink-0 items-center gap-0 whitespace-nowrap"
        style={{ '--duration': '38s' } as React.CSSProperties}
      >
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
        <span aria-hidden="true" className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
      </div>
      <div
        className="animate-marquee flex shrink-0 items-center whitespace-nowrap"
        aria-hidden="true"
        style={{ '--duration': '38s' } as React.CSSProperties}
      >
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
        <span className="px-4 text-xs font-bold tracking-wide text-white/85">{text}</span>
      </div>
      <Link
        href="/articles"
        className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0 text-xs font-black text-primary-400 hover:text-primary-300 transition"
      >
        Explore Now →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/AnnouncementStrip.tsx
git commit -m "feat(articles): add AnnouncementStrip marquee component"
```

---

## Task 3: `CategoryNavBar` component

**Files:**
- Create: `components/blog/insights/CategoryNavBar.tsx`

Server component. Receives `categories`, `locale`, `activeCategorySlug?`, `search?`. Renders a horizontal category link row with a right-aligned search form.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function CategoryNavBar({
  categories,
  locale,
  activeCategorySlug,
  search,
}: {
  categories: BlogCategory[]
  locale: string
  activeCategorySlug?: string
  search?: string
}) {
  const navCategories = categories.filter((c) => c.showInNavigation).slice(0, 7)

  return (
    <div className="sticky top-[var(--header-height,72px)] z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-0 px-4 sm:px-6 lg:px-8">
        {/* Category links */}
        <nav className="flex min-w-0 flex-1 items-center overflow-x-auto scrollbar-hide" aria-label="Article categories">
          <Link
            href={localePath(locale, '/articles')}
            className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold transition ${
              !activeCategorySlug
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
            }`}
          >
            All
          </Link>
          {navCategories.map((cat) => (
            <Link
              key={cat.id}
              href={localePath(locale, `/articles/category/${cat.slug}`)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap transition ${
                activeCategorySlug === cat.slug
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form
          action={localePath(locale, '/articles/search')}
          className="ml-4 flex shrink-0 items-center gap-0 overflow-hidden rounded-lg border border-neutral-200 bg-white"
        >
          <input
            name="q"
            defaultValue={search}
            placeholder="Search articles…"
            className="h-9 w-40 bg-transparent px-3 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-600 text-white transition hover:bg-primary-700"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/CategoryNavBar.tsx
git commit -m "feat(articles): add CategoryNavBar with sticky category links and search"
```

---

## Task 4: `HeroFeaturedSection` component

**Files:**
- Create: `components/blog/insights/HeroFeaturedSection.tsx`

7/5 column split (col-7 left = featured post, col-5 right = 3 sidebar posts).
Left: large hero image, category tag pill, date + views row, title, excerpt.
Right: 3 horizontal cards (thumbnail left ~180px, content right).

- [ ] **Step 1: Create the component**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function CategoryPill({ name, color }: { name: string; color?: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded border px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide"
      style={{ borderColor: color || '#0284c7', color: color || '#0284c7' }}
    >
      {name}
    </span>
  )
}

function MetaRow({ date, views }: { date: string; views: number }) {
  return (
    <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
      <span className="inline-flex items-center gap-1">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(date)}
      </span>
      <span className="inline-flex items-center gap-1">
        <Eye className="h-3.5 w-3.5" />
        {views.toLocaleString()} views
      </span>
    </div>
  )
}

export function HeroFeaturedSection({
  featuredPost,
  sidebarPosts,
  locale,
}: {
  featuredPost: BlogPostSummary
  sidebarPosts: BlogPostSummary[]
  locale: string
}) {
  const featuredHref = localePath(locale, `/articles/${featuredPost.slug}`)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.16fr_1fr]">
        {/* ── Left col: Featured post ── */}
        <div className="min-w-0">
          <Link href={featuredHref} className="group block">
            {/* Hero image */}
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
              {featuredPost.coverImage?.url ? (
                <Image
                  src={featuredPost.coverImage.url}
                  alt={featuredPost.coverImage.alt || featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
              )}
              {/* Carousel indicator dots (decorative) */}
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Content below image */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                {featuredPost.category && (
                  <CategoryPill
                    name={featuredPost.category.name}
                    color={featuredPost.category.color}
                  />
                )}
                <MetaRow date={featuredPost.publishedAt} views={featuredPost.viewsCount} />
              </div>
              <h2 className="line-clamp-2 text-[22px] font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
                {featuredPost.title}
              </h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {featuredPost.shortExcerpt || featuredPost.excerpt}
              </p>
            </div>
          </Link>
        </div>

        {/* ── Right col: 3 sidebar posts ── */}
        <div className="flex flex-col gap-5">
          {sidebarPosts.slice(0, 3).map((post) => {
            const href = localePath(locale, `/articles/${post.slug}`)
            return (
              <Link key={post.id} href={href} className="group flex gap-3">
                {/* Thumbnail */}
                <div className="relative h-[105px] w-[180px] shrink-0 overflow-hidden rounded-lg">
                  {post.coverImage?.url ? (
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-sky-100 to-indigo-100" />
                  )}
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    {post.category && (
                      <CategoryPill name={post.category.name} color={post.category.color} />
                    )}
                    <MetaRow date={post.publishedAt} views={post.viewsCount} />
                  </div>
                  <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-neutral-500">
                    {post.shortExcerpt || post.excerpt}
                  </p>
                  <span className="mt-1.5 block text-xs font-black text-neutral-400 transition group-hover:text-primary-600">
                    Read More →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/HeroFeaturedSection.tsx
git commit -m "feat(articles): add HeroFeaturedSection 7/5 split hero"
```

---

## Task 5: `CategoriesGrid` component

**Files:**
- Create: `components/blog/insights/CategoriesGrid.tsx`

5-column illustration cards for each category. Uses the category's `color` field for a gradient background. On hover: subtle lift + shadow.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

const FALLBACK_COLORS = [
  ['#0ea5e9', '#0369a1'],
  ['#6366f1', '#4338ca'],
  ['#10b981', '#047857'],
  ['#f59e0b', '#b45309'],
  ['#ec4899', '#be185d'],
]

function getCategoryGradient(index: number, color?: string) {
  const pair = FALLBACK_COLORS[index % FALLBACK_COLORS.length]
  if (color && color.startsWith('#')) {
    return `linear-gradient(135deg, ${color}dd, ${color}88)`
  }
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
}

export function CategoriesGrid({
  categories,
  locale,
}: {
  categories: BlogCategory[]
  locale: string
}) {
  const visible = categories.filter((c) => c.showInNavigation).slice(0, 5)
  if (visible.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-heading text-[32px] italic text-primary-600">Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((cat, index) => (
          <Link
            key={cat.id}
            href={localePath(locale, `/articles/category/${cat.slug}`)}
            className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Illustration placeholder */}
            <div
              className="flex h-[140px] w-full items-center justify-center"
              style={{ background: getCategoryGradient(index, cat.color) }}
            >
              <span className="text-5xl font-black text-white/30 select-none">
                {cat.name.slice(0, 1)}
              </span>
            </div>
            {/* Label */}
            <div className="bg-white px-3 py-3 text-center">
              <span className="text-[15px] font-semibold text-neutral-800 transition-colors group-hover:text-primary-700">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/CategoriesGrid.tsx
git commit -m "feat(articles): add CategoriesGrid 5-column illustration cards"
```

---

## Task 6: `InsightsArticleCard` component

**Files:**
- Create: `components/blog/insights/InsightsArticleCard.tsx`

New card style per spec §1.5: 16:9 image with CloudTopia watermark overlay, white card body with shadow, title + excerpt + meta footer (date + views). Hover: lift + shadow increase.

- [ ] **Step 1: Create the component**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export function InsightsArticleCard({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article
      className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
        {/* Image with watermark */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-sky-50">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
          {/* Watermark overlay */}
          <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-black uppercase tracking-widest text-white/40 select-none">
            CloudTopia
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-neutral-500">
            {post.shortExcerpt || post.excerpt}
          </p>

          {/* Meta footer */}
          <div className="mt-4 flex items-center justify-between text-[12px] font-bold text-neutral-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.viewsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/InsightsArticleCard.tsx
git commit -m "feat(articles): add InsightsArticleCard with watermark and shadow"
```

---

## Task 7: `SidebarCategoryTags` component

**Files:**
- Create: `components/blog/insights/SidebarCategoryTags.tsx`

Sticky sidebar with "Categories" heading and tag pill cloud. Each pill: border using category color, hover fills background. Uses `position: sticky; top: 100px`.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function SidebarCategoryTags({
  categories,
  locale,
  activeCategorySlug,
}: {
  categories: BlogCategory[]
  locale: string
  activeCategorySlug?: string
}) {
  return (
    <aside className="sticky top-[100px] rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[18px] font-bold text-neutral-900">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories
          .filter((c) => c.showInNavigation)
          .map((cat) => {
            const isActive = activeCategorySlug === cat.slug
            const color = cat.color || '#0284c7'
            return (
              <Link
                key={cat.id}
                href={localePath(locale, `/articles/category/${cat.slug}`)}
                className="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: color, borderColor: color, color: '#fff' }
                    : { borderColor: color, color: color }
                }
              >
                {cat.name}
              </Link>
            )
          })}
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/SidebarCategoryTags.tsx
git commit -m "feat(articles): add SidebarCategoryTags sticky sidebar"
```

---

## Task 8: `CTABanner` component

**Files:**
- Create: `components/blog/insights/CTABanner.tsx`

Full-width dark gradient banner used as a section break. Left 2/3: headline + subtitle + "Start Now" button. Right 1/3: decorative cloud icon. Matches spec §1.7.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { ArrowRight, Cloud } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

export function CTABanner({
  locale,
  title = 'Ready to move your business to the cloud?',
  subtitle = 'CloudTopia designs and builds cloud infrastructure, web applications, and AI-powered systems for growth-focused businesses.',
}: {
  locale: string
  title?: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.25),transparent_55%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-8 py-10 sm:flex-row sm:items-center sm:py-12">
        {/* Left content */}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">{subtitle}</p>
          <Link
            href={localePath(locale, '/contact')}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-neutral-950 transition hover:bg-sky-100"
          >
            Start Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {/* Right decorative */}
        <div className="hidden shrink-0 sm:block">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
            <Cloud className="h-12 w-12 text-sky-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/CTABanner.tsx
git commit -m "feat(articles): add CTABanner dark gradient section break"
```

---

## Task 9: `LoadMoreButton` client component

**Files:**
- Create: `components/blog/insights/LoadMoreButton.tsx`

Client component. Receives `currentPage`, `totalPages`, `basePath` (e.g. `/articles`), `locale`. On click, pushes the next `?page=N` to the router. Shows a spinner while navigating. Cards are given the `insights-card-enter` CSS class for stagger animation.

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function LoadMoreButton({
  currentPage,
  totalPages,
  href,
}: {
  currentPage: number
  totalPages: number
  href: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  if (currentPage >= totalPages) return null

  function handleClick() {
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 text-sm font-bold text-neutral-700 transition hover:border-primary-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/LoadMoreButton.tsx
git commit -m "feat(articles): add LoadMoreButton with navigation transition"
```

---

## Task 10: Rebuild `articles/page.tsx`

**Files:**
- Modify: `app/(frontend)/[locale]/articles/page.tsx`

Full layout rebuild. Structure:
1. `AnnouncementStrip`
2. `CategoryNavBar` (sticky below header)
3. `HeroFeaturedSection` (7/5 split)
4. `CategoriesGrid` (5-col)
5. 8/4 grid section: Left = 2-col `InsightsArticleCard` grid, Right = `SidebarCategoryTags` (sticky)
6. `LoadMoreButton`
7. `CTABanner`
8. `BlogCTA` (existing full-width CTA at bottom)

Import `insights.css` at the top.

- [ ] **Step 1: Rewrite the page**

```tsx
import './insights.css'
import type { Metadata } from 'next'
import { AnnouncementStrip } from '@/components/blog/insights/AnnouncementStrip'
import { CategoryNavBar } from '@/components/blog/insights/CategoryNavBar'
import { CategoriesGrid } from '@/components/blog/insights/CategoriesGrid'
import { CTABanner } from '@/components/blog/insights/CTABanner'
import { HeroFeaturedSection } from '@/components/blog/insights/HeroFeaturedSection'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { LoadMoreButton } from '@/components/blog/insights/LoadMoreButton'
import { SidebarCategoryTags } from '@/components/blog/insights/SidebarCategoryTags'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { getBlogIndexData } from '@/lib/blog/data'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    q?: string
    page?: string
    category?: string
    contentType?: string
    service?: string
    sort?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  return getCMSMetadata(locale, '/articles', 'articles')
}

export default async function ArticlesPage({ params, searchParams }: PageProps) {
  const { locale = 'en' } = await params
  const query = await searchParams
  const page = Number(query.page || 1)
  const search = typeof query.q === 'string' ? query.q : ''

  const data = await getBlogIndexData({
    locale,
    page,
    search,
    category: query.category,
    contentType: query.contentType,
    serviceFocus: query.service,
    sort: query.sort || 'latest',
  })

  // Featured post = first pinned/featured post, or just first post
  const featuredPost = data.featuredPosts[0] || data.posts[0]
  // Sidebar posts = next 3 (after featured)
  const sidebarPosts = (data.featuredPosts.length > 1
    ? data.featuredPosts.slice(1, 4)
    : data.posts.slice(1, 4))

  // Grid posts = all latest posts
  const gridPosts = data.latestPosts

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'ar' ? 'مقالات كلاود توبيا' : 'CloudTopia Articles',
    description: 'Practical cloud computing guides, infrastructure insights, and DevOps strategies.',
    url: canonicalUrl(locale, '/articles'),
    publisher: {
      '@type': 'Organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: { '@type': 'ImageObject', url: 'https://cloudtopia.net/images/CloudTopia.svg' },
    },
  }

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* Announcement strip */}
      <AnnouncementStrip />

      {/* Category nav bar (sticky) */}
      <div className="bg-white">
        <CategoryNavBar
          categories={data.categories}
          locale={locale}
          activeCategorySlug={query.category}
          search={search}
        />
      </div>

      {/* Hero 7/5 split */}
      {featuredPost && (
        <HeroFeaturedSection
          featuredPost={featuredPost}
          sidebarPosts={sidebarPosts}
          locale={locale}
        />
      )}

      {/* Categories illustration grid */}
      {data.categories.length > 0 && (
        <div className="bg-white py-2">
          <CategoriesGrid categories={data.categories} locale={locale} />
        </div>
      )}

      {/* 8/4: Article grid + sidebar */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Left: 2-col article grid */}
          <div>
            <h2 className="mb-6 text-2xl font-black text-neutral-950">
              {search ? `Results for "${search}"` : 'Latest Articles'}
            </h2>
            {gridPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-white/70 p-10 text-center">
                <p className="text-base font-bold text-neutral-600">No articles found. Try a different filter.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {gridPosts.map((post) => (
                  <InsightsArticleCard key={post.id} post={post} locale={locale} />
                ))}
              </div>
            )}
            <LoadMoreButton
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              href={localePath(locale, `/articles?page=${data.pagination.page + 1}${query.category ? `&category=${query.category}` : ''}${search ? `&q=${search}` : ''}`)}
            />
          </div>

          {/* Right: sticky category tags sidebar */}
          <SidebarCategoryTags
            categories={data.categories}
            locale={locale}
            activeCategorySlug={query.category}
          />
        </div>
      </section>

      {/* CTA Banner (section break) */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <CTABanner locale={locale} />
      </div>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
        <BlogCTA
          locale={locale}
          title={locale === 'ar' ? 'هل أنت مستعد لبناء شيء أذكى؟' : 'Ready to build something smarter than a basic website?'}
          text={locale === 'ar'
            ? 'كلاود توبيا تساعد الشركات على تصميم وبناء الحلول الرقمية.'
            : 'CloudTopia helps businesses design websites, systems, and AI-powered solutions that support real growth.'}
        />
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Start dev server and check the page renders without errors**

Run: `npm run dev` — open `http://localhost:3000/articles` in browser
Expected: Page renders with AnnouncementStrip, CategoryNavBar, HeroFeaturedSection, grid, sidebar all visible

- [ ] **Step 4: Commit**

```bash
git add app/\(frontend\)/\[locale\]/articles/page.tsx
git commit -m "feat(articles): rebuild listing page with DevTechnoSys-style layout"
```

---

## Task 11: Enhanced `TableOfContents` component

**Files:**
- Modify: `components/blog/TableOfContents.tsx`

Enhancements:
- Numbered sections with padded two-digit number ("01", "02")
- Border-left accent on active item
- Scroll progress bar at bottom (fills based on `window.scrollY / document.body.scrollHeight`)
- Collapsible H3 children when clicking an H2 item (smooth max-height transition)
- Intersection Observer for active highlighting remains

- [ ] **Step 1: Read the current file to confirm its contents**

Current file: `components/blog/TableOfContents.tsx` (already reviewed above — 72 lines)

- [ ] **Step 2: Replace the file with the enhanced version**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TableOfContentsItem } from '@/lib/blog/utils'

function padNum(n: number) {
  return String(n).padStart(2, '0')
}

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [active, setActive] = useState(items[0]?.id || '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedH2s, setExpandedH2s] = useState<Set<string>>(() => {
    const first = items.find((i) => i.level === 2)
    return first ? new Set([first.id]) : new Set()
  })
  const [scrollPct, setScrollPct] = useState(0)

  // Intersection Observer — highlight active heading
  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-120px 0px -70% 0px' },
    )
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  // Scroll progress
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-expand the H2 that contains the active heading
  useEffect(() => {
    const activeItem = items.find((i) => i.id === active)
    if (!activeItem) return
    if (activeItem.level === 2) {
      setExpandedH2s((prev) => new Set([...prev, active]))
    } else {
      // find the parent H2 (the last H2 before this H3)
      const idx = items.indexOf(activeItem)
      for (let i = idx - 1; i >= 0; i--) {
        if (items[i].level === 2) {
          setExpandedH2s((prev) => new Set([...prev, items[i].id]))
          break
        }
      }
    }
  }, [active, items])

  if (items.length === 0) return null

  // Build grouped structure: h2s with their h3 children
  type H2Group = { item: TableOfContentsItem; index: number; children: { item: TableOfContentsItem; index: number }[] }
  const groups: H2Group[] = []
  let sectionIndex = 0
  let currentGroup: H2Group | null = null
  for (const item of items) {
    if (item.level === 2) {
      sectionIndex++
      currentGroup = { item, index: sectionIndex, children: [] }
      groups.push(currentGroup)
    } else if (item.level === 3 && currentGroup) {
      currentGroup.children.push({ item, index: currentGroup.children.length + 1 })
    }
  }

  function toggleH2(id: string) {
    setExpandedH2s((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = groups.length

  const nav = (
    <nav aria-label="Table of contents" className="select-none">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[1px] text-neutral-400">
        Table of Contents
      </p>
      <ol className="space-y-0.5">
        {groups.map(({ item, index, children }) => {
          const isActive = active === item.id || children.some((c) => c.item.id === active)
          const isExpanded = expandedH2s.has(item.id)
          return (
            <li key={item.id}>
              {/* H2 row */}
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => toggleH2(item.id)}
                  className={`mt-1 flex h-5 w-6 shrink-0 items-center justify-center rounded text-[10px] font-black transition ${
                    isActive
                      ? 'border-l-[3px] border-primary-600 bg-primary-50 text-primary-700'
                      : 'text-neutral-400'
                  }`}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {padNum(index)}
                </button>
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    setExpandedH2s((prev) => new Set([...prev, item.id]))
                  }}
                  className={`flex-1 py-1 text-[14px] font-medium leading-snug transition hover:text-primary-700 ${
                    isActive ? 'text-primary-700' : 'text-neutral-600'
                  }`}
                >
                  {item.title}
                </a>
                {children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleH2(item.id)}
                    className="mt-1.5 shrink-0 text-neutral-300 transition hover:text-neutral-500"
                    aria-label="Toggle subsections"
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {/* H3 children — smooth collapse */}
              {children.length > 0 && (
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isExpanded ? `${children.length * 36}px` : '0px' }}
                >
                  <ol className="ml-8 mt-0.5 space-y-0.5 border-l border-neutral-200 pl-3">
                    {children.map(({ item: child }) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className={`block py-1 text-[13px] leading-snug transition hover:text-primary-700 ${
                            active === child.id ? 'text-primary-700' : 'text-neutral-500'
                          }`}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {/* Progress */}
      <div className="mt-5 space-y-1.5">
        <p className="text-[11px] font-bold text-neutral-400">
          {scrollPct}% read · {total} sections
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-200"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sticky TOC */}
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm backdrop-blur lg:block">
        {nav}
      </aside>

      {/* Mobile collapsible TOC */}
      <aside className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left text-sm font-black uppercase tracking-normal text-neutral-700"
        >
          In this article
          <ChevronDown className={`h-4 w-4 transition ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && <div className="mt-4">{nav}</div>}
      </aside>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/TableOfContents.tsx
git commit -m "feat(articles): enhance TableOfContents with numbered sections and progress bar"
```

---

## Task 12: `InquiryFormSidebar` component

**Files:**
- Create: `components/blog/insights/InquiryFormSidebar.tsx`

Static contact form. Sticky right sidebar. Fields: name, email, country, phone, project description. NDA note, captcha question, submit button. On submit, redirects to the `/contact` page with a thank-you query param (no actual form submission backend — the spec says static; link to existing contact page).

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState } from 'react'
import { Globe, Mail, Phone, Send, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'

export function InquiryFormSidebar({ locale }: { locale: string }) {
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  return (
    <aside
      className="sticky top-[100px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[15px] bg-neutral-50 p-5 shadow-sm"
    >
      <h2 className="mb-1 text-[17px] font-black text-neutral-900">Get a Free Consultation</h2>
      <p className="mb-5 text-[13px] text-neutral-500">Tell us about your project and we'll get back to you within 24 hours.</p>

      <div className="space-y-3">
        {/* Full Name */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <User className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="text"
            placeholder="Full Name"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Mail className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="email"
            placeholder="Email Address"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Country */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Globe className="h-4 w-4 shrink-0 text-primary-600" />
          <select className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-600 outline-none">
            <option value="">Select Country</option>
            <option>United States</option>
            <option>United Arab Emirates</option>
            <option>Saudi Arabia</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>Other</option>
          </select>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Phone className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="tel"
            placeholder="Phone Number"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Project description */}
        <textarea
          rows={3}
          placeholder="Tell us about your project…"
          className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
        />

        {/* NDA note */}
        <div className="flex items-start gap-2 rounded-lg bg-sky-50 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
          <p className="text-[11px] leading-relaxed text-neutral-600">
            Your ideas are fully protected under our NDA.
          </p>
        </div>

        {/* Simple captcha */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-bold text-neutral-600">What is 2 + 1?</p>
          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Your answer"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary-400"
            maxLength={2}
          />
        </div>

        {/* Submit */}
        <Link
          href="/contact"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-primary-700"
        >
          <Send className="h-4 w-4" />
          Send My Inquiry
        </Link>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/InquiryFormSidebar.tsx
git commit -m "feat(articles): add InquiryFormSidebar sticky contact form"
```

---

## Task 13: `KeyTakeawaysBox` component

**Files:**
- Create: `components/blog/insights/KeyTakeawaysBox.tsx`

Gray background box with `border-left: 4px solid` using the primary accent. Renders a heading, optional summary paragraph, and a bulleted list of takeaway strings. Receives extracted content from the first `calloutBlock` in `contentBlocks`.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

export function KeyTakeawaysBox({
  title,
  summary,
  items,
  locale,
}: {
  title?: string
  summary?: string
  items: string[]
  locale: string
}) {
  if (items.length === 0) return null

  return (
    <aside className="mb-8 rounded-xl border-l-4 border-neutral-900 bg-neutral-100 px-6 py-5">
      <h3 className="mb-2 text-[17px] font-black text-neutral-900">
        {title || 'Key Takeaways:'}
      </h3>
      {summary && (
        <p className="mb-3 text-sm leading-relaxed text-neutral-700">{summary}</p>
      )}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={localePath(locale, '/contact')}
        className="mt-5 inline-flex h-9 items-center rounded-lg bg-primary-600 px-4 text-sm font-black text-white transition hover:bg-primary-700"
      >
        Book a Free Strategy Call
      </Link>
    </aside>
  )
}
```

- [ ] **Step 2: Create a helper to extract callout items from content blocks**

Add this pure helper function to `lib/blog/utils.ts` (append after existing exports):

```ts
export function extractKeyTakeaways(contentBlocks: unknown): { title?: string; summary?: string; items: string[] } {
  if (!Array.isArray(contentBlocks)) return { items: [] }
  const first = contentBlocks.find(
    (block): block is Record<string, unknown> =>
      block && typeof block === 'object' &&
      (String((block as any).blockType) === 'calloutBlock' || String((block as any).blockType) === 'callout'),
  )
  if (!first) return { items: [] }
  const content = typeof first.content === 'string' ? first.content : ''
  const title = typeof first.title === 'string' ? first.title : undefined
  // Split content by newlines or periods into up to 5 items
  const raw = content.split(/(?:\.\s+|\n)+/).filter(Boolean).slice(0, 5)
  return { title, items: raw }
}
```

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/blog/insights/KeyTakeawaysBox.tsx lib/blog/utils.ts
git commit -m "feat(articles): add KeyTakeawaysBox component and extractKeyTakeaways helper"
```

---

## Task 14: `FAQAccordion` client component

**Files:**
- Create: `components/blog/insights/FAQAccordion.tsx`

Client component. Uses `extractFAQSchemaItems` to get FAQ items from `contentBlocks`. Animated accordion with smooth `max-height` transition. Chevron rotates 180deg on open. First item expanded by default.

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FAQItem = { question: string; answer: string }

export function FAQAccordion({ items, locale }: { items: FAQItem[]; locale: string }) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  if (items.length === 0) return null

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i))
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-[28px] font-black text-neutral-900">
          Frequently Asked{' '}
          <span className="text-primary-600">Questions</span>
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          {locale === 'ar'
            ? 'إجابات على الأسئلة الأكثر شيوعاً المتعلقة بهذا المقال.'
            : 'Find answers to the most common questions related to this article.'}
        </p>
        <div className="mt-4 h-px w-16 bg-primary-600" />
      </div>

      <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-bold text-neutral-900 leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '400px' : '0px' }}
              >
                <p className="px-5 pb-5 text-sm leading-7 text-neutral-600">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/blog/insights/FAQAccordion.tsx
git commit -m "feat(articles): add FAQAccordion client component with smooth animation"
```

---

## Task 15: Enhance `ArticleHero` with 4-cell meta bar

**Files:**
- Modify: `components/blog/ArticleHero.tsx`

Add a horizontal meta bar below the article title (before the featured image). The bar has 4 cells separated by vertical dividers: Last updated, Reading time, Views, Written by.

- [ ] **Step 1: Read current file**

Current: `components/blog/ArticleHero.tsx` (already reviewed — 72 lines)

- [ ] **Step 2: Replace with enhanced version**

```tsx
import Image from 'next/image'
import { Calendar, Clock, Eye, User } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/data'
import { Breadcrumbs } from './Breadcrumbs'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function ArticleHero({ post, locale }: { post: BlogPost; locale: string }) {
  const displayDate = post.updatedAt && post.updatedAt !== post.publishedAt
    ? post.updatedAt
    : post.publishedAt

  return (
    <section className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-12 pt-28 sm:px-6 lg:px-8" data-header-theme="light">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: post.title }]} />

        {/* Title + meta */}
        <div className="mb-8 max-w-3xl">
          {post.category && (
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-primary-700 shadow-sm">
              {post.category.name}
            </span>
          )}
          <h1 className="text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-4 text-xl font-bold leading-8 text-neutral-800">{post.subtitle}</p>
          )}
          <p className="mt-4 text-lg leading-8 text-neutral-600">{post.excerpt}</p>
        </div>

        {/* 4-cell meta bar */}
        <div className="mb-8 flex flex-wrap items-stretch divide-x divide-neutral-200 overflow-hidden rounded-[14px] border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 px-5 py-3">
            <Calendar className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Last updated</p>
              <p className="text-[13px] font-bold text-neutral-900">{formatDate(displayDate, locale)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <Clock className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Reading time</p>
              <p className="text-[13px] font-bold text-neutral-900">{post.readingTime} min read</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <Eye className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Views</p>
              <p className="text-[13px] font-bold text-neutral-900">{post.viewsCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <User className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Written by</p>
              <p className="text-[13px] font-bold text-primary-700">{post.author?.name || 'CloudTopia'}</p>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/80 bg-sky-50 shadow-2xl shadow-sky-950/15">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/blog/ArticleHero.tsx
git commit -m "feat(articles): add 4-cell meta bar to ArticleHero"
```

---

## Task 16: Restructure `ArticleContent` — InquiryFormSidebar + KeyTakeawaysBox

**Files:**
- Modify: `components/blog/ArticleContent.tsx`

Changes:
1. Right sidebar: replace the existing `BlogCTA` + category block with `InquiryFormSidebar`
2. Inside the `<article>`: add `KeyTakeawaysBox` at the very top (before `RichTextRenderer`), extracting items from `post.contentBlocks`
3. Pass `locale` to `InquiryFormSidebar`

- [ ] **Step 1: Read current file**

Current: `components/blog/ArticleContent.tsx` (already reviewed — 142 lines)

- [ ] **Step 2: Replace with updated version**

```tsx
import type { BlogPost, BlogPostSummary } from '@/lib/blog/data'
import type { TableOfContentsItem } from '@/lib/blog/utils'
import { extractKeyTakeaways } from '@/lib/blog/utils'
import { InquiryFormSidebar } from '@/components/blog/insights/InquiryFormSidebar'
import { KeyTakeawaysBox } from '@/components/blog/insights/KeyTakeawaysBox'
import { AuthorBox } from './AuthorBox'
import { BlogCTA } from './BlogCTA'
import { ContentBlockRenderer } from './ContentBlockRenderer'
import { PreviousNextPosts } from './PreviousNextPosts'
import { RichTextRenderer } from './RichTextRenderer'
import { ShareButtons } from './ShareButtons'
import { TableOfContents } from './TableOfContents'

function articleCTA(post: BlogPost, locale: string) {
  if (post.ctaTitle || post.ctaDescription) {
    return {
      title: post.ctaTitle || (locale === 'ar' ? 'هل تحتاج إلى موقع ويب، لوحة معلومات، أو نظام أعمال مثل هذا؟' : 'Need a website, dashboard, or business system like this?'),
      text: post.ctaDescription || (locale === 'ar' ? 'كلاود توبيا تساعدك في تحويل فكرتك إلى حل رقمي قابل للتوسع.' : 'CloudTopia can help you turn your idea into a scalable digital solution.'),
      primaryLabel: post.ctaButtonText || (locale === 'ar' ? 'تحدث إلى كلاود توبيا' : 'Talk to CloudTopia'),
    }
  }
  const service = post.serviceFocus || post.category?.slug || ''
  if (service.includes('ai')) {
    return {
      title: locale === 'ar' ? 'تريد استخدام الذكاء الاصطناعي في سير عمل عملك؟' : 'Want to use AI inside your business workflow?',
      text: locale === 'ar' ? 'تصمم كلاود توبيا أنظمة عملية مدعومة بالذكاء الاصطناعي.' : 'CloudTopia designs practical AI-powered systems that help teams qualify leads, automate support, and move faster.',
      primaryLabel: locale === 'ar' ? 'تحدث مع كلاود توبيا حول الذكاء الاصطناعي' : 'Talk AI with CloudTopia',
    }
  }
  return {
    title: locale === 'ar' ? 'هل تحتاج إلى موقع ويب، لوحة معلومات، أو نظام أعمال مثل هذا؟' : 'Need a website, dashboard, or business system like this?',
    text: locale === 'ar' ? 'كلاود توبيا تساعدك في تحويل فكرتك إلى حل رقمي قابل للتوسع.' : 'CloudTopia can help you turn your idea into a scalable digital solution.',
    primaryLabel: locale === 'ar' ? 'تحدث إلى كلاود توبيا' : 'Talk to CloudTopia',
  }
}

export function ArticleContent({
  post,
  locale,
  toc,
  canonical,
  relatedPosts = [],
  previous,
  next,
}: {
  post: BlogPost
  locale: string
  toc: TableOfContentsItem[]
  canonical: string
  relatedPosts?: BlogPostSummary[]
  previous?: BlogPostSummary | null
  next?: BlogPostSummary | null
}) {
  const cta = articleCTA(post, locale)
  const takeaways = extractKeyTakeaways(post.contentBlocks)

  return (
    <section className="bg-[#f8f7fb] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[240px_minmax(0,760px)_280px]">
        {/* Left: Table of Contents */}
        <TableOfContents items={toc} />

        {/* Center: Main content */}
        <article className="min-w-0 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm md:p-10">
          {/* Key Takeaways box — rendered only when callout block exists */}
          {takeaways.items.length > 0 && (
            <KeyTakeawaysBox
              title={takeaways.title}
              summary={takeaways.summary}
              items={takeaways.items}
              locale={locale}
            />
          )}

          {post.series && (
            <aside className="mb-10 rounded-2xl border border-primary-200 bg-primary-50/70 p-5">
              <p className="text-xs font-black uppercase tracking-normal text-primary-700">
                {locale === 'ar' ? 'جزء من سلسلة أدلة' : 'Part of a guide series'}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-neutral-950">{post.series.title}</h2>
              {post.series.description && (
                <p className="mt-2 text-sm leading-6 text-neutral-700">{post.series.description}</p>
              )}
            </aside>
          )}

          <RichTextRenderer content={post.content} />
          <ContentBlockRenderer blocks={post.contentBlocks} relatedPostLookup={relatedPosts} locale={locale} />

          {post.showCTA && (
            <div className="mt-12">
              <BlogCTA
                locale={locale}
                compact
                title={cta.title}
                text={cta.text}
                primaryLabel={cta.primaryLabel}
                primaryHref={post.ctaButtonUrl || '/contact'}
                secondaryHref={post.secondaryCTAButtonUrl || '/services'}
              />
            </div>
          )}

          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="mb-4 text-sm font-black uppercase tracking-normal text-neutral-500">
              {locale === 'ar' ? 'شارك هذا المقال' : 'Share this article'}
            </p>
            <ShareButtons url={canonical} title={post.title} />
          </div>

          <AuthorBox author={post.author} locale={locale} />
          <PreviousNextPosts previous={previous || null} next={next || null} locale={locale} />
        </article>

        {/* Right: Inquiry form sidebar */}
        <div>
          <InquiryFormSidebar locale={locale} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/blog/ArticleContent.tsx
git commit -m "feat(articles): replace right sidebar with InquiryFormSidebar, add KeyTakeawaysBox"
```

---

## Task 17: Update `articles/[slug]/page.tsx` — add FAQAccordion

**Files:**
- Modify: `app/(frontend)/[locale]/articles/[slug]/page.tsx`

Add `FAQAccordion` rendered between `ArticleContent` and `RelatedPosts`. Extract FAQ items using `extractFAQSchemaItems` from `lib/blog/intelligence`.

- [ ] **Step 1: Read current file**

Current: `app/(frontend)/[locale]/articles/[slug]/page.tsx` (already reviewed — 153 lines)

- [ ] **Step 2: Add the FAQAccordion import and rendering**

The file already imports `extractFAQSchemaItems`. The `faqItems` variable is already computed. Add import of `FAQAccordion` and render it between `ArticleContent` and `RelatedPosts`.

```tsx
// Add to imports (after the existing imports):
import { FAQAccordion } from '@/components/blog/insights/FAQAccordion'

// Replace the return JSX to add FAQAccordion between ArticleContent and RelatedPosts:
return (
  <div className="min-h-screen bg-[#f4f1f8]">
    <ReadingProgress />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    {post.seo.breadcrumbSchema !== false && (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    )}
    {faqItems.length > 0 && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />
    )}
    <ArticleHero post={post} locale={locale} />
    <ArticleContent
      post={post}
      locale={locale}
      toc={toc}
      canonical={canonical}
      relatedPosts={relatedPosts}
      previous={previousNext.previous}
      next={previousNext.next}
    />
    {faqItems.length > 0 && (
      <FAQAccordion items={faqItems} locale={locale} />
    )}
    <RelatedPosts posts={relatedPosts} locale={locale} />
  </div>
)
```

Full file content (with both the import added and the JSX return replaced):

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { ArticleHero } from '@/components/blog/ArticleHero'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { FAQAccordion } from '@/components/blog/insights/FAQAccordion'
import { extractFAQSchemaItems } from '@/lib/blog/intelligence'
import { getArticleToc, getBlogPost, getPreviousNextPosts, getRelatedBlogPosts } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-dynamic'

function absoluteUrl(url?: string | null) {
  if (!url) return undefined
  return url.startsWith('http') ? url : canonicalUrl('en', url)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const post = await getBlogPost(locale, slug)
  if (!post) return { title: locale === 'ar' ? 'المقال غير موجود' : 'Article Not Found' }

  const title = post.seo.metaTitle || post.title
  const description = post.seo.metaDescription || post.excerpt
  const canonical = post.seo.canonicalUrl || canonicalUrl(locale, `/articles/${post.slug}`)
  const ogImage = absoluteUrl(post.seo.ogImage?.url || post.coverImage?.url)
  const twitterImage = absoluteUrl(post.seo.twitterImage?.url || post.seo.ogImage?.url || post.coverImage?.url)

  return {
    title,
    description,
    keywords: post.seo.keywords,
    robots: post.seo.noIndex || post.seo.noFollow ? { index: !post.seo.noIndex, follow: !post.seo.noFollow } : undefined,
    openGraph: {
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : ['CloudTopia'],
      section: post.category?.name,
      tags: post.tags.map((tag) => tag.name),
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.coverImage?.alt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.twitterTitle || title,
      description: post.seo.twitterDescription || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
    alternates: {
      canonical,
      languages: buildHreflangMap(`/articles/${post.slug}`),
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { locale = 'en', slug } = await params
  const post = await getBlogPost(locale, slug)
  if (!post) notFound()

  const toc = getArticleToc(post)
  const canonical = post.seo.canonicalUrl || canonicalUrl(locale, `/articles/${post.slug}`)
  const relatedPosts = await getRelatedBlogPosts(post)
  const previousNext = await getPreviousNextPosts(post)
  const image = absoluteUrl(post.seo.ogImage?.url || post.coverImage?.url)
  const faqItems = post.seo.faqSchema ? extractFAQSchemaItems(post.contentBlocks) : []

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.seo.structuredDataType || 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': post.author?.slug === 'editorial-team' ? 'Organization' : 'Person',
      name: post.author?.name || 'CloudTopia',
      url: post.author?.slug ? canonicalUrl(locale, `/articles/author/${post.author.slug}`) : canonicalUrl(locale, '/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: { '@type': 'ImageObject', url: 'https://cloudtopia.net/images/CloudTopia.svg' },
    },
    mainEntityOfPage: canonical,
    articleSection: post.category?.name,
    keywords: post.tags.map((tag) => tag.name).join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Home', item: canonicalUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: locale === 'ar' ? 'المقالات' : 'Articles', item: canonicalUrl(locale, '/articles') },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  }

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {post.seo.breadcrumbSchema !== false && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            }),
          }}
        />
      )}
      <ArticleHero post={post} locale={locale} />
      <ArticleContent
        post={post}
        locale={locale}
        toc={toc}
        canonical={canonical}
        relatedPosts={relatedPosts}
        previous={previousNext.previous}
        next={previousNext.next}
      />
      {faqItems.length > 0 && (
        <FAQAccordion items={faqItems} locale={locale} />
      )}
      <RelatedPosts posts={relatedPosts} locale={locale} />
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Start dev server, open an article with FAQ blocks**

Run: `npm run dev` — open a post URL that has `faqBlock` content blocks
Expected: FAQAccordion renders below the article content, first item expanded

- [ ] **Step 5: Commit**

```bash
git add app/\(frontend\)/\[locale\]/articles/\[slug\]/page.tsx
git commit -m "feat(articles): add FAQAccordion to article detail page"
```

---

## Self-Review: Spec Coverage Check

| Spec Section | Task(s) | Covered? |
|---|---|---|
| §1.1 Announcement strip | Task 2 | ✅ |
| §1.2 Category nav bar | Task 3 | ✅ |
| §1.3 Hero 7/5 split | Task 4 | ✅ |
| §1.4 Categories section | Task 5 | ✅ |
| §1.5 Article grid + sidebar | Task 6, 7, Task 10 | ✅ |
| §1.6 Load More button | Task 9 | ✅ |
| §1.7 CTA Banner | Task 8 | ✅ |
| §2.1 3-col post layout | Task 16 | ✅ (TOC + content + InquiryForm) |
| §2.2 TOC sticky, numbered, progress | Task 11 | ✅ |
| §2.3 Post Hero + meta bar | Task 15 | ✅ |
| §2.3 Key Takeaways box | Task 13 | ✅ |
| §2.3 Post content body | Existing ArticleContent | ✅ (unchanged) |
| §2.4 Right sidebar Inquiry Form | Task 12 | ✅ |
| §2.5 FAQ Accordion | Task 14 | ✅ |
| §2.6 Related Posts | Existing RelatedPosts | ✅ (unchanged) |
| §2.7 Social sharing | Existing ShareButtons | ✅ (unchanged) |
| §3 Design tokens | All tasks (Tailwind classes) | ✅ |
| §4 Marquee animation | Task 2 | ✅ |
| §4 Card hover effects | Task 6 (InsightsArticleCard) | ✅ |
| §4 TOC scroll tracking | Task 11 | ✅ |
| §4 FAQ accordion animation | Task 14 | ✅ |
| §4 Sticky sidebars | Tasks 7, 11, 12 | ✅ |
| §5 Mobile/responsive | All tasks use Tailwind responsive | ✅ |
| §7 SEO meta tags | Existing page schemas | ✅ (unchanged) |
| §7 Article schema | Existing | ✅ (unchanged) |

**Potential gap**: §1.1 specifies "Global Header" with announcement strip as part of every page header. The current implementation adds it only to the articles page, not site-wide. This is intentional — the spec says this is part of the articles section rebuild, not a site-wide change. The existing global Header (`components/Header.tsx`) has its own announcement mechanism.

**Placeholder scan**: No "TBD", "TODO", "implement later", "fill in details" found. All code is complete.

**Type consistency check**: 
- `TableOfContentsItem` imported from `@/lib/blog/utils` → matches the type definition (`id`, `title`, `level`)
- `BlogPostSummary` imported from `@/lib/blog/data` → `viewsCount`, `shortExcerpt`, `coverImage`, `category.color` all exist on the type
- `extractKeyTakeaways` added to `lib/blog/utils.ts` → used in `ArticleContent.tsx` with correct import path
- `FAQItem` type in `FAQAccordion` = `{ question: string; answer: string }` → matches `extractFAQSchemaItems` return type (`FAQSchemaItem`)
- `InsightsArticleCard` uses `post.viewsCount` → exists on `BlogPostSummary`

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-08-articles-rebuild.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
