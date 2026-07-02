# Styled-MDX Blog Import → Supabase (drafts, bilingual)

**Date:** 2026-07-02
**Branch:** `redesign/services-listing-menu`
**Goal:** Import the 41 bilingual styled-MDX articles in `public/articles/{en,ar}/<slug>.mdx` into the live `blog_posts` table (Payload CMS on Supabase Postgres) so they look hand-authored in the CMS, are SEO-complete, fully bilingual, and live **only in the database**. Then delete the source folder.

This is a **new batch**, distinct from the completed `2026-06-22-bulk-article-import-design.md` (those `article-NN-*.md` files became the existing 40 posts). Different source format (self-contained styled HTML MDX), and a different, more faithful pipeline.

---

## Source inventory

- 41 slugs, each present in **both** `public/articles/en/` and `public/articles/ar/` → **82 documents** total.
- Each `.mdx` is a self-contained styled page: YAML frontmatter + a wrapper `<div className="ct">` containing an inline `<style>`, hand-built HTML components using a fixed `.ct-*` class vocabulary, markdown prose, and a trailing hardcoded `<script type="application/ld+json">`.
- Author is uniformly `"CloudTopia Team"` / `"فريق كلاود توبيا"`.
- No cover images exist on disk for any article.

### Frontmatter keys
`title, description, slug, locale, primaryKeyword, secondaryKeywords[], intent, cluster, moneyPageLink, ogImage, imageAlt, publishedAt (empty), updatedAt (empty), author, readingTime, faq[] ({q,a})`.

Note: `primaryKeyword`/`secondaryKeywords` are frequently in **Arabic even inside EN files** (deliberate Gulf-market SEO targeting). Preserve as-authored; do not "correct."

---

## Decisions (confirmed with user)

1. **Drafts only.** `status='draft'`, `cover_image_id=NULL`, `published_at=NULL`. User adds covers + publishes later. Draft mode skips Payload's required-field validation (title/excerpt/content column constraints still satisfied with real values; coverImage column is nullable).
2. **Refine, don't transcribe verbatim.** User asked to refine text, CTA, SEO. Improve clarity/flow lightly; do **not** invent claims or change meaning. Arabic articles must read as native Arabic (CTA included), not machine-translated English.
3. **Author** = `editorial-team` (id **2**) — matches the "CloudTopia Team" byline. (Flag in final report: trivially swappable to `mohamad-shahm` id 1 if preferred.)
4. **Shared slug across locales.** AR reuses the EN slug (already identical in the folders). The `(slug, locale)` composite unique index pairs them → `BlogLanguageToggle` EN⇄AR switch works automatically, and hreflang pairs automatically. Verified: none of the 41 slugs collide with the existing 40 posts.
5. **Same order across locales.** Insert article-by-article (EN then AR) in a fixed slug order so EN and AR lists render in identical sequence.
6. **DB-only + cleanup.** After verification, delete `public/articles/` (both locales) and commit. No new runtime data files; sitemap is already DB-driven.
7. **Cross-locale cover-image mirroring.** New `afterChange` hook so uploading/altering a cover image on one locale copies it to the sibling (both directions). Requested by user; does not exist today.

---

## Rendering constraint that drives the whole mapping

`components/blog/ArticleContent.tsx` renders in this fixed order:

1. **KeyTakeawaysBox** — promoted from the **first** `calloutBlock` (then dropped from the stream).
2. **`RichTextRenderer content={post.content}`** — the entire Lexical body, in order.
3. **`ContentBlockRenderer blocks={streamBlocks}`** — all remaining `contentBlocks`, **after** the whole body.
4. CTA (from `ctaTitle`/`ctaDescription`/`ctaButtonText`/`ctaButtonUrl` fields).
5. Author box, prev/next, sidebar.

**Consequence:** `contentBlocks` (except the first callout + FAQ) render **after** the conclusion. So mid-article elements MUST stay **inline in the Lexical body**, or they pile up at the end and destroy narrative flow.

`RichTextRenderer` supports these Lexical node types inline: `heading` (h2/h3/h4), `paragraph`, `text` (bold/italic/code formats), `linebreak`, `quote` (→ styled blockquote), `list` (ul/ol) + `listitem`, `link`, `upload` (image), `table`/`tablerow`/`tablecell`, and inline `block` (code). This is everything we need for inline rendering.

---

## MDX → CMS field mapping

### Body → `content` (Lexical, via `convertMarkdownToLexical`)
The subagent emits **clean GitHub-Flavored Markdown** for the body; the insert script converts it to Lexical using the field's own editor features (identical to `blog-import-endpoint.ts`). Rules:

- **No H1.** Title renders separately. Body starts at `##`.
- **`.ct-lede`** (opening summary) → a Markdown **blockquote** (`> …`) — renders as the styled lede blockquote.
- **Section prose / `##`,`###` headings / paragraphs / `-`,`1.` lists** → kept inline as-is (refined).
- **`.ct-top` / `.ct-rank` ranked options** → `###` heading per option + paragraphs; keep the "★ Best for…" as a **bold** lead-in. Preserve internal links.
- **Comparison tables (`.ct-tablewrap`/`.ct-table`)** → **GFM Markdown table** (renders as an inline Lexical table).
- **`.ct-cols` Do/Don't** → `### Do` + list, then `### Don't` + list (inline).
- **`.ct-sched`/`.ct-tl` step timelines** → `### <title>` + an **ordered list** (inline).
- **`.ct-grid`/`.ct-card` numbered item grids** → `### N. <title>` + paragraph each (inline).
- **`.ct-callout` / `.ct-callout warn` / `.ct-callout cost`** → Markdown **blockquote** with a bold lead label (`> **Watch out:** …`) (inline).
- **`.ct-check`, `.ct-scn`, `.ct-def`, `.ct-steps`** → the semantically closest inline construct (list / heading+paragraph / blockquote).
- **Internal links** (`/articles/<slug>`, `/services/<slug>`) → preserve as Markdown links `[text](/path)`. These resolve once published (same slugs).
- **Drop entirely:** `<style>`, wrapper `<div>`s, the `.ct-faq` `<details>` block (duplicate of frontmatter FAQ), the `.ct-cta` box (→ CTA fields), the `.ct-takeaways` box (→ first callout block), and the trailing `<script type="application/ld+json">` (the site generates BlogPosting/FAQPage/Breadcrumb JSON-LD dynamically from structured fields; keeping the hardcoded copy would create **duplicate/conflicting** schema — an SEO negative).

### `contentBlocks` (kept deliberately minimal to protect flow)
Only two block kinds, in this order:
1. **First = `calloutBlock`** `{ blockType:'calloutBlock', type:'cloudtopia-note', title:'Key takeaways'|'أبرز النقاط', content:'• item\n• item…' }` — promoted to the top KeyTakeawaysBox. Sourced from `.ct-takeaways`. (ArticleContent strips its English title on AR automatically.)
2. **`faqBlock[]`** from frontmatter `faq[]`: `{ blockType:'faqBlock', question, answer, includeInSchema:true }` — renders after body **and** powers FAQPage JSON-LD.

Every block object gets a stable unique `id` (Payload generates one on create via the local API, so we can omit it).

### Scalar / select fields (per document, per locale)
- `title`, `subtitle` (optional), `excerpt` (from `description`; ≤~157 chars), `shortExcerpt` (≤120).
- `contentType` ∈ guide|article|case_study|checklist|comparison|tutorial|opinion|news — inferred per article.
- `targetAudience` ∈ (audience enum) — inferred; may be null.
- `serviceFocus` ∈ websites|web_apps|crm|erp|automation|ai|cloud|digital_presence|business_systems — inferred.
- `difficulty` ∈ beginner|intermediate|advanced (default beginner).
- Editorial flags: default all false; optionally mark a **small** curated set `featured`/`editorPick` (report which).

### SEO group (`seo`)
- `metaTitle` (≤60), `metaDescription` (≤155), `focusKeyword` (from `primaryKeyword`), `canonicalUrl` (empty → default), `noIndex:false`, `noFollow:false`.
- (Schema toggles `faqSchema`/`breadcrumbSchema`/`articleSchema` default true — leave as default.)

### Conversion tab
- `showCTA:true`, `ctaTitle`, `ctaDescription`, `ctaButtonText`, `ctaButtonUrl` — from `.ct-cta` (AR fully in Arabic; do not leave the English "Talk to CloudTopia" default on AR).
- `relatedServices[]` `{label,url}` — from `moneyPageLink` + in-body `/services/*` links.

### Relationships tab
- `category` (required) → exactly one existing `blog-categories` row, matched by meaning to the 13 existing names. Resolve to the **English** category row id for **both** locales (AR display name comes from `taxonomy-i18n.ts` at render time). Create a new category only if genuinely unmatched (report it).
- `tags` (hasMany) → 3–6 existing `blog-tags` where they fit; add new tags only when nothing fits (report every new tag). Same English-row-id-for-both-locales rule.
- `relatedPosts` → populated in a **second pass** (after all 82 exist) from the sibling `/articles/<slug>` links each article references, matched within the same locale.
- `author` → editorial-team (id 2). `coverImage` → omitted (draft).

### Sidebar
- `status:'draft'`, `locale`, `publishedAt` empty, `scheduledAt` empty, `approvalStatus:'not_required'`.
- `readingTime`, `wordCount`, `seoScore`, `contentScore`, `readabilityScore` → **auto-computed** by the `normalizePost` beforeValidate hook on save. Do not set by hand.

---

## Pipeline

### Phase 0 — Insert script (`scripts/import-styled-mdx.ts`, run `node --import tsx --env-file=.env.local`)
- `getPayload({ config })` (Payload local API — hooks fire, versions created, cache revalidates → "looks manual").
- Build editor config once: `editorConfigFactory.fromFeatures({ config: payload.config, features: blogRichTextFeatures })`.
- Load taxonomy maps: categories + tags by lowercased name → id (existing rows). Author id 2.
- For each `scratchpad/import/<slug>.json` (contains `{ slug, en:{…}, ar:{…} }`), in fixed slug order:
  - Resolve/create category + tags → ids (shared across locales).
  - `content = convertMarkdownToLexical({ editorConfig, markdown: rec.bodyMarkdown })`.
  - `payload.create({ collection:'blog-posts', data:{…, content, contentBlocks, category, tags, author, seo, locale, status:'draft' }, draft:true, overrideAccess:true, context:{ skipAutoTranslate:true } })` — **EN first, then AR** (same slug).
  - `context.skipAutoTranslate:true` is mandatory (defensive: prevents any auto-AR generation; we supply the real AR).
  - Each create wrapped in try/catch; one failure never aborts the batch; collect results.
- Idempotency: before creating, look up `(slug, locale)`; skip if present (safe re-run).

### Phase 1 — Pilot (1 article, end-to-end)
- Dispatch **one** extraction subagent (`best-crm-for-real-estate`) → `scratchpad/import/best-crm-for-real-estate.json`.
- Run the insert script for that slug only. Query the two rows back; eyeball Lexical content, blocks, SEO, taxonomy, AR-ness of CTA.
- Fix script/contract as needed **before** fanning out.

### Phase 2 — Fan-out extraction (remaining 40, parallel subagents)
- Dispatch subagents in batches (respecting the parallel-agent guidance), one article pair each, each writing `scratchpad/import/<slug>.json`. No DB access in subagents.
- Contract = the "MDX → CMS field mapping" section above, handed to each subagent verbatim with its slug.

### Phase 3 — Bulk insert
- Run the insert script over all 41 JSON files (idempotent; pilot already inserted is skipped).
- Verify: 82 rows, correct EN/AR slug pairing, categories/tags resolve (no orphan ids), no stray slugs.

### Phase 4 — Relationship second pass (`relatedPosts`)
- For each post, from its `internalArticleLinks` (sibling slugs), resolve same-locale post ids and `payload.update` `relatedPosts` (+ finalize `relatedServices`). Skip self/missing.

### Phase 5 — Cross-locale cover-image mirror hook
- Add an `afterChange` hook to `collections/BlogPosts.ts`: when `coverImage` or `featuredImageAlt` changes, find the `(slug, otherLocale)` sibling and copy `coverImage`/`featuredImageAlt` over via `payload.update` with a recursion-guard context flag (mirrors the pattern used by existing hooks/endpoints). Both directions. `skipAutoTranslate` set on the mirror write.

### Phase 6 — Verify, cleanup, commit
- Final DB verification (counts, pairing, taxonomy integrity, a rendered spot-check of 2–3 pairs).
- Delete `public/articles/` (en + ar) and `scratchpad/import/`; commit the folder removal + the new script + the hook.
- **Final report:** created ids, any new categories/tags created, any `featured`/`editorPick` picks, any per-article warnings/failures, and the author-swap note.

---

## Error handling & safety
- Per-document independent writes; batch continues past a single failure; failures reported with slug + reason.
- Idempotent on `(slug, locale)` → safe to re-run.
- Drafts only → nothing goes public until the user adds covers and publishes; sitemap/hreflang update automatically on publish (no code change — `getBlogSitemapEntries()` is published-only, DB-driven).
- Connection pooler capped at 3 (per `lib/cms/env.ts`) → the single insert script writes sequentially; parallelism lives only in the DB-free extraction subagents.

## Out of scope
- Cover image creation (user supplies later).
- Publishing (user does it after covers).
- The pre-existing RLS-disabled tables advisory (`deploy_diag`, `seo_overrides`, `clinictopia_leads`) — flagged separately, not part of this task.
