# Bulk Article Import → Supabase (drafts)

**Date:** 2026-06-22
**Goal:** Import the remaining bilingual `.md` articles in `public/articles/` into the live `blog_posts` table (prod Supabase `cloudtopia-website`, project `cpkxemmyizcqgvhjjdop`) so they look hand-authored, are SEO-complete, and live only in the database. Then remove the source folder.

## Scope

- Source: `public/articles/article-NN-<slug>-{en|ar}.md`, articles **08–20** (13 pairs = 26 rows).
- **Skip article-07 (Mada)** — already imported/published (ids 134/135). Instead, **fix** it: re-file category, set author to Mohamad Shahm, add missing secondary keywords + image alt.
- All writes via the **Supabase MCP** (`execute_sql` / `apply_migration`). No new TypeScript data files.

## Decisions (confirmed with user)

1. **Drafts** (`status='draft'`, `_status='draft'`, `cover_image_id=NULL`, `published_at=NULL`). User adds covers + publishes later. Cover-required validation is skipped for drafts.
2. **Verbatim body** — preserve exact wording; only add structure. Supporting blocks (Key Takeaways, FAQ) are *derived summaries*, authored separately, and do not alter the body.
3. Author = `mohamad-shahm` (id 1). Dates = today (`created_at` default `now()`).
4. AR row shares the **same slug** as its EN sibling → hreflang pairs automatically (the `(slug, locale)` composite unique index allows this).

## File anatomy (per `.md`)

- Line 1 `# Title` → `title` (NOT in body).
- Byline `*Published… | Category: X | Reading time: N min*` → category mapping + reading time.
- Body: `##`/`###` headings, paragraphs, `-`/`1.` lists, `**bold**`, `[links]`, GFM tables, `---` rules.
- CTA paragraph (verbatim) stays in body; structured CTA fields also enabled.
- Trailing metadata block → `seo_focus_keyword`, `seo_secondary_keywords`, `seo_meta_description`, `featured_image_alt`, internal links → `blog_posts_related_services`.

## Pipeline

### 1. Local parse + Lexical build (`scripts/import-articles.ts`, run via `node --import tsx` — pure, no DB)
- Strip title/byline/footer; isolate verbatim body markdown.
- Hand-rolled **Markdown → Lexical** converter producing the exact node shapes verified against existing posts (118/126/132):
  - `root{type,format:'',indent:0,version:1,direction}`
  - `heading{tag:h2|h3,…}`, `paragraph{…,textStyle:'',textFormat:0}`
  - `text{mode:'normal',style:'',detail:0,format:0|1,version:1}` (format 1 = bold)
  - `list{tag:ul|ol,listType:bullet|number,start:1}` / `listitem{value:n}`
  - `table`/`tablerow`/`tablecell{headerState:1 header|0 body,colSpan:1,rowSpan:1,backgroundColor:null}` (cell → paragraph → text)
  - `link{id:<24hex>,type:link,version:3,fields:{url,newTab:false,linkType:'custom'}}`
  - `direction` = `'rtl'` for ar, `'ltr'` for en.
- Drop `---` horizontal rules.
- Compute `reading_time`, `word_count` from plain text.
- Extract SEO fields; derive clean slug from EN title (drop parentheticals/years, kebab-case); AR reuses EN slug.
- Map byline category → existing `blog_categories` (create **E-Commerce** for 07/08/09).
- Emit `/tmp/articles-import.json` (one record per file).

### 2. Supporting blocks (`content_blocks` JSONB) — authored, both languages
Per article: `calloutBlock` (Key Takeaways, `type:'cloudtopia-note'`) + 3–4 `faqBlock` (`includeInSchema:true`); `statBlock`/`prosConsBlock`/`comparisonTableBlock` opportunistically where real data exists. Each block gets a unique 24-hex `id` + correct `blockType`.

### 3. Write via MCP
- Ensure categories (create E-Commerce), resolve author id 1.
- Insert `blog_posts` rows (EN+AR). Then by (slug,locale) lookup, insert `blog_posts_rels` (tags) and `blog_posts_related_services` (internal links).
- `content_type`/`target_audience`/`service_focus`/`difficulty` from per-article mapping (valid enum values only).

### 4. Validate
- Round-trip one pair first (insert → query back → eyeball Lexical/blocks).
- Confirm 26 rows, EN/AR slug pairing, no duplicate/clashing slugs vs existing.

### 5. Fix article 07; then cleanup
- Update 134/135 (category, author, secondary keywords, alt).
- Delete `public/articles/` + `/tmp/articles-import.json`.

## Notes
- Drafts are not in `/sitemap.xml` (DB-driven, published-only). On publish (after covers), each appears automatically with EN+AR hreflang — no code changes.
- Idempotency: guard inserts on `(slug, locale)` not already present.
