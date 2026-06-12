# Bilingual CMS authoring + AI optimize/auto-fill — Design

**Date:** 2026-06-12
**Author:** Mohamad Shahm (founder) + Claude
**Status:** Approved for implementation

## Goal

Make it fast to author CloudTopia articles in **both English and Arabic**, and to
**optimize each post for SEO with one click**, then start re-posting article by
article on a clean slate.

Three deliverables, built in this order:

1. **Backup + hard-delete** the existing 46 live articles (backup first, delete only on explicit final go-ahead).
2. **Feature 1 — EN ⇄ AR language toggle** on the article editor.
3. **Feature 2 — AI "Optimize & auto-fill SEO"** button on the article editor.

## Existing architecture (do not change)

- **Payload CMS** (Postgres / Supabase, `blocksAsJSON: true`). Admin under `app/(payload)/admin`.
- Articles = `blog-posts` collection. **Each language is a separate document**, paired by a
  **shared `slug`**, with a composite unique index `(slug, locale)`. `locale` is a sidebar select (`en`/`ar`).
- Public surface: `/articles/[slug]`. `components/blog/ArticleHero.tsx` renders the post **title as the sole `<h1>`**;
  body is `ArticleContent` → `RichTextRenderer` (lexical headings rendered 1:1).
- Public read maps DB columns via `lib/blog/data.ts` (richer SEO shape than the editable `seo` group).
- Existing AI infra to **reuse**:
  - `POST /api/blog-ai` (`lib/cms/blog-ai-endpoint.ts`) with actions incl. `seo`, `title`, `analyze`. OpenAI, `AI_MODEL` default `gpt-4o-mini`.
  - `components/payload/AIPostGenerator.tsx` already writes into fields via `useForm().dispatchFields({ type: 'UPDATE', path, value })`.
  - `components/payload/TranslateButton.tsx` + `/api/translate` pattern (per-collection handler, admin-auth-guarded) — the template for new endpoints.
  - `calculateBlogContentScores` (`lib/blog/intelligence.ts`) for scoring.

## Deliverable 0 — Backup + hard-delete

### Backup
- Script `scripts/ops-backup-blog.ts` (run via `node --import tsx --env-file=.env.local scripts/ops-backup-blog.ts`).
- `payload.find({ collection: 'blog-posts', limit: 0/all, pagination: false, depth: 0, overrideAccess: true, draft: true })`
  (`depth: 0` keeps relationship IDs so the dump is re-importable; `draft: true` includes non-published).
- Writes `docs/backups/blog-posts-backup-<ISO date>.json` = `{ exportedAt, count, docs: [...] }`.
- Prints the count and file path. **No deletion happens in this script.**

### Delete (gated)
- Separate script `scripts/ops-delete-all-blog.ts` that refuses to run unless a backup file exists and the
  count matches, and requires `CONFIRM_DELETE=YES`.
- Deletes each doc through `payload.delete(...)` so the `afterDelete` hook revalidates `cms-blog` (sitemap/caches update).
- **Run only after the user sees the backup and gives an explicit final "go".**
- Accepted consequence: old `/articles/*` URLs 404 until re-posted; `BlogRedirects` heals changed slugs later.

## Deliverable 1 — EN ⇄ AR language toggle

A **navigation + find-or-create** control. No AI, no localization migration. Two paired docs stay as-is.

### UI — `components/payload/BlogLanguageToggle.tsx` (client)
- A `ui` field pinned to the **top of the `BlogPosts` form** (same mechanism as the existing `aiGenerator` ui field).
- Renders a segmented control: **`English` | `العربية`**, current locale highlighted.
- On mount, light query (`/api/blog-posts?where[slug][equals]=<slug>&where[locale][equals]=<other>&depth=0&draft=true`)
  to learn if the sibling exists + its status. The inactive segment shows **"Open Arabic →"** (exists) or **"+ Add Arabic"** (missing).
- Click inactive segment → `POST /api/blog-pair { id }` → on success `router.push('/admin/collections/blog-posts/<siblingId>')`.
- **Disabled** when the doc is brand-new/unsaved (no id/slug yet) with hint: *"Save the article first to add the other language."*

### Endpoint — `lib/cms/blog-pair-endpoint.ts` → `POST /api/blog-pair`
- Registered in `payload.config.ts` `endpoints` (next to `/translate`, `/blog-ai`). Admin-auth-guarded.
- Body `{ id }`. Loads source `blog-posts` doc; `otherLocale = locale === 'en' ? 'ar' : 'en'`.
- `find` sibling by `and: [{ slug }, { locale: otherLocale }]`. If found → return `{ id, locale, created: false }`.
- If missing → `payload.create` a **blank draft** copying the structural allowlist below; return `{ id, locale, created: true }`.

### Field-copy allowlist (blank counterpart)
**Copied (structural / language-neutral):** `slug`, `locale` (=other), `coverImage`, `author`, `coAuthors`,
`category`, `tags`, `series`, `relatedPosts`, `contentType`, `targetAudience`, `serviceFocus`, `difficulty`,
`featured`, `pinned`, `editorPick`, `trending`, `showCTA`, `ctaButtonUrl`, `seo.noIndex`, `seo.noFollow`.
**Forced:** `status = 'draft'`.
**Left blank (author writes):** `title`, `subtitle`, `excerpt`, `shortExcerpt`, `content`, `contentBlocks`,
`featuredImageAlt`, CTA text fields, `seo.metaTitle/metaDescription/canonicalUrl/focusKeyword`, `publishedAt`, `scheduledAt`.

### Safety change
- Make the sidebar `locale` field **read-only** (display only) so the toggle is the single source of truth.
  Prevents manual locale flips that would collide with the sibling and violate the `(slug, locale)` unique index.
  Existing docs keep their values; nothing migrates.

## Deliverable 2 — AI "Optimize & auto-fill SEO"

A prominent **"Optimize & auto-fill SEO"** button on the editor. Reads current (even unsaved) form data,
does two things, then writes results **into the fields** (not a copy box). Nothing persists until the user hits Payload **Save**.

### Part A — Headings (deterministic, not AI)
- `lib/blog/normalize-headings.ts` → `normalizeHeadings(lexicalState)`:
  - Demote any in-body **H1 → H2** (title is the page H1).
  - Fix heading-level **skips** (e.g. H2 followed by H4 → H3), never increasing depth by >1.
  - Pure function over the lexical JSON; returns a new state. Unit-tested.
- Applied client-side via `dispatchFields({ type: 'UPDATE', path: 'content', value })`.

### Part B — SEO fields (AI)
- New action `optimize` added to `/api/blog-ai`. Input: current `title`, `excerpt`, plain-text of `content`,
  `locale`, `category`, `focusKeyword`. Returns **strict JSON**:
  `{ metaTitle, metaDescription, focusKeyword, secondaryKeywords[], excerpt, shortExcerpt, slugSuggestion, internalLinks:[{label,url}], warnings:[] }`.
  Output language = post locale (Arabic for `ar`).
- Client applies via `dispatchFields` to the editable fields that exist:
  `seo.metaTitle`, `seo.metaDescription`, `seo.focusKeyword`, `excerpt`, `shortExcerpt`.
  - `slug`: only set when **currently empty** (never rewrites an existing URL).
  - `internalLinks`: requires **one new field** on the collection — `seo.internalLinks` array `{ label, url }` (+ a Postgres migration). Auto-filled from the AI result.
  - `secondaryKeywords`: stored in the new field set if present, else surfaced in the summary.
- A small result summary lists what changed + `warnings` (e.g. "cover image missing alt text", "no H2s found").

### Trigger
- Explicit **button click** (not auto-on-paste — avoids surprise AI cost). Lives at the top of the editor / AI & Performance tab.

## Out of scope (v1)
- No AI prose rewriting (the existing `rewrite` action stays available on demand).
- No migration to native Payload localization.
- No list-view language-pair indicator.
- No automatic AI translation when creating the blank counterpart (chosen: write it yourself).

## Testing
- `normalizeHeadings` unit tests (single H1 demotion, skip fixing, no-op on clean docs) added to the smoke suite.
- `blog-pair-endpoint` find-or-create logic: manual verification in admin (existing sibling → open; missing → blank draft created with correct allowlist + draft status).
- Backup script verified by count + spot-check before any delete.
