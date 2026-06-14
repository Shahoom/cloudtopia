# CloudTopia CMS — Phase 1 (Foundation) Design

**Date:** 2026-06-14
**Author:** Mohamad Shahm (with Claude)
**Status:** Draft for review
**Phase:** 1 of ~4 (Foundation). Later phases: AI & Activity logs · Articles editor + MDX AI · Data/export tooling.

---

## 1. Goal

Turn the Payload admin into a **professional, data-driven control center** that lets the founder run the entire CloudTopia site from one place — "what WordPress never became." This phase delivers the shell, the cockpit, the article-operations surface, and full per-page SEO control. It does **not** redesign the single-article editor or the AI MDX pipeline (Phase 3).

### Success criteria
- Opening `/admin` lands on a command-center dashboard summarizing leads, conversations, visitor/AI activity, content health, and article performance — each tile a deep link.
- A dedicated **Articles workspace** manages every article from one screen: list + kanban board, inline quick-edit, live SEO scores, EN/AR status, per-row AI optimize / translate / preview, and bulk actions.
- A **SEO control center** lets the founder edit the meta title (browser-tab name) and meta description (plus OG image, canonical, noindex) for **every public route**, including the programmatic industry/market/sub-service pages that currently ignore the CMS.
- Navigation is reorganized into a few clean workspaces instead of 22 flat collection links.
- **Zero data loss / zero regressions:** no existing article, page, lead, or conversation row is altered by this work. Every change is additive and degrades safely.

---

## 2. Non-negotiable constraints (data safety)

1. **Additive-only.** New custom admin views, new endpoints, one new collection (`seo-overrides`). No destructive migrations. No edits to existing collection field shapes except cosmetic `admin.group` relabeling and `admin` UI options.
2. **Branch + backup.** All work on a feature branch. A Supabase DB snapshot is taken before the single additive migration (new `seo-overrides` table) runs in production.
3. **Existing write paths reused.** Inline/bulk edits go through Payload's normal `update` (REST/local API) so existing hooks (score recompute, revalidation) and validation still run. Partial updates only send changed fields — never echo back full documents (avoids the auto-translate/bio-clobber class of bug already seen on Authors/Pages).
4. **Graceful degradation.** Every feature works with AI keys absent (AI buttons disable with a tooltip), with S3 absent (storage shown as "not configured"), and with empty data (zero-states, never crashes).
5. **Migration-ready.** All new data lives in plain Postgres tables with no Supabase-specific SQL. New read paths go through Payload or portable SQL. An export path is provided so content can leave Supabase cleanly.

---

## 3. Scope

### In scope (Phase 1)
- M1 — Admin shell & information architecture (nav → workspaces, theming polish).
- M2 — Command-center dashboard (server-rendered aggregation).
- M3 — Articles workspace (list, kanban board, inline quick-edit, bulk actions, per-row actions).
- M4 — SEO control center (per-route meta for every page) + `seo-overrides` collection + `getRouteSeo()` resolver wired into route metadata.

### Out of scope (later phases)
- Unified AI & Activity log viewer + solution-finder interaction (incl. abandoned) capture → **Phase 2**.
- Single-article editor redesign + "upload MDX → does everything" AI upgrade → **Phase 3**.
- Full backup/restore tooling, broken-link crawler → **Phase 4** (a basic CSV/JSON export ships here as a bulk action).

---

## 4. Architecture overview

Everything is built as **custom Payload admin views** (additive routes) plus **server aggregation endpoints**, on top of the existing collections and existing endpoints (`/api/blog-ai`, `/api/blog-pair`, `/api/translate`).

```
/admin                     → Command center (custom view; replaces EditorialDashboard)
/admin/articles            → Articles workspace (NEW custom view: list + board + inline edit)
/admin/seo                 → SEO control center (NEW custom view)
/admin/collections/*       → Payload's native collection screens (unchanged, regrouped in nav)
```

Custom views are registered in `payload.config.ts` under `admin.components.views.{key} = { Component, path }` (the dashboard already uses this mechanism). The custom nav (`AdminChrome`) links to them.

### Component / data map

| Surface | Render model | Data source |
|---|---|---|
| Dashboard | Server component | `getOverviewStats()` — Payload local API + a few portable aggregate SQL queries |
| Articles list/board | Client component | Payload REST (`/api/blog-posts`) for reads; `update` for status/quick-edit; existing AI/pair/translate endpoints for per-row actions; new `/api/admin/articles-bulk` for bulk ops |
| SEO control center | Client component | New `/api/admin/route-manifest` (built from `buildSitemapEntries()`) + `seo-overrides` collection CRUD |
| Route meta on the public site | Server (`generateMetadata`) | New `getRouteSeo(locale, path)` resolver: `seo-overrides` → existing CMS (`getCMSMetadata`) → static defaults |

---

## 5. M1 — Admin shell & information architecture

Reorganize the flat 22-collection nav into grouped **workspaces**. Implementation: update `admin.group` strings on collections + rewrite the `navItems` structure in `AdminChrome` to render grouped sections with the custom-view links at the top.

Proposed groups:

- **Cockpit** — Dashboard (`/admin`)
- **Content** — Articles workspace (`/admin/articles`), Pages, Authors, Categories, Tags, Series, Content templates, Redirects, Projects, Service FAQs, Media
- **CRM / Inbox** — Solution-finder leads, Chatbot leads, Contact inquiries, Newsletter subscribers
- **AI & Activity** — Chatbot conversations, AI generation logs *(Phase 2 turns this into a unified viewer; for now they're grouped)*
- **Settings** — SEO control center (`/admin/seo`), Site content (dictionary), Site design, Users

Theming: keep the existing brand mark/login; apply consistent spacing, group headers, and active-state styling in the nav. No change to Payload's core theme engine.

**Acceptance:** every existing collection is still reachable; nav shows grouped workspaces; custom views appear at the top of their group; nothing 404s.

---

## 6. M2 — Command-center dashboard

Replace `EditorialDashboard` with a new server component built around the four areas validated in the mockup (`cloudtopia_cms_dashboard_v1`). Old file kept until the new one is verified, then removed.

### Sections
1. **Header** — greeting + date + quick actions (New article → `/admin/articles?new=1`; Import MDX).
2. **KPI strip** — New leads (7d), Conversations (7d), Drafts to review, Article views (30d), each with a delta vs. previous period.
3. **Activity chart** — conversations + leads per day, last 7 days.
4. **Recent activity** — unified recent feed across solution-finder leads, chatbot conversations, and contact inquiries (type icon, label, source badge, time) → each links to its record.
5. **Needs your attention** — drafts in progress, articles with low SEO score (`seoScore < 60`), scheduled this week, pages missing meta description, articles missing their AR sibling → each links to a pre-filtered Articles workspace / SEO center.
6. **Top articles (30d)** — by `viewsCount`, with locale + views.
7. **Top topics asked** — derived from `ai-chat-conversations.transcriptText` via deterministic keyword bucketing into the 7 service categories (no AI call, no cost).
8. **Site health strip** — media storage status (S3 configured?), pages-missing-meta count, articles-missing-AR count, last sitemap/IndexNow run if available. Cheap signals only.

### Data
A single `getOverviewStats()` function in `lib/cms/admin/overview.ts` computes all of the above in one server pass using the Payload local API (`count`, `find`) plus a small number of portable aggregate SQL queries (sum of views, per-day activity counts, keyword bucketing). Returns a typed `OverviewStats` object. No client fetching.

**Acceptance:** dashboard renders < 1s on warm cache; all tiles populated from real data; empty/zero-states render cleanly; every tile deep-links correctly; no AI key required.

---

## 7. M3 — Articles workspace (`/admin/articles`)

A client component sitting on the existing `blog-posts` collection. This is the "beyond WordPress" content cockpit.

### 7.1 List view
- Rich article cards (cover thumb, title, category · author · date, EN/AR chips, SEO score pill, views, status dot, per-row actions) as in mockup `cloudtopia_articles_workspace`.
- Toolbar: search (title/slug/keyword), filters (locale, category, status), sort (recent / views / score), list⇄board toggle.
- Pipeline filter tabs with live counts per status.

### 7.2 Board view (kanban)
- Columns = statuses (Idea, Outline, Draft, In review, Scheduled, Published, Archived).
- Cards draggable between columns; drop issues a partial `update` setting `status` (and `publishedAt` when moved to Published, matching existing `normalizePost` behavior). Existing afterChange revalidation fires normally.
- Library: lightweight HTML5 drag-and-drop or a small dnd lib already compatible with React 19 (decide in plan; prefer native DnD to avoid a heavy dep).

### 7.3 Inline quick-edit
- Expands a card into an edit form: title, status, category, excerpt, `seo.metaTitle`, `seo.metaDescription`.
- Save issues a **partial** `PATCH /api/blog-posts/:id` with only changed fields. `normalizePost` recomputes scores; live SEO score updates in place.
- "Open full editor" link → native Payload edit screen (redesigned in Phase 3).

### 7.4 Per-row actions
- **Quick edit** — inline form above.
- **AI optimize** — calls existing `POST /api/blog-ai` `{action:'optimize'}`; writes returned SEO fields back via partial update. Disabled (with tooltip) when no AI key.
- **Translate** — calls existing `POST /api/blog-pair` to find-or-create the EN⇄AR sibling, then opens it / runs translate. Reuses the proven pairing logic.
- **Preview** — opens `/articles/:slug?preview=1`.
- **More** — duplicate, archive, delete (delete behind a confirm).

### 7.5 Bulk actions
- Multi-select → publish, set status, set category, translate-to-AR, export (CSV/JSON), delete.
- New endpoint `POST /api/admin/articles-bulk` (admin-auth, `overrideAccess` server-side) iterating Payload `update`/`delete` per id so all hooks run. Export returns a downloadable file; this doubles as the migration-readiness export.

**Acceptance:** list + board + inline edit + bulk all operate on real articles via normal Payload write paths; scores/locale/status reflect live data; partial updates never clobber unedited fields; AI/translate actions reuse existing endpoints; delete is confirmed; works with 0 and 50+ articles.

---

## 8. M4 — SEO control center (`/admin/seo`)

Friendly per-route meta editing for **every public page**, including programmatic ones.

### 8.1 The problem it solves
Today: main pages read meta from `Pages.seo` (a raw JSON blob); programmatic pages (industry / market / sub-service / country) ignore the CMS entirely and render static `lib/seo` data; `Pages.programmaticLanding` overrides exist but are not consumed. There is no single, friendly place to control tab names + descriptions.

### 8.2 Approach — override registry + resolver (chosen over per-route Pages rows)

**New collection `seo-overrides`** keyed by `(locale, routePath)`:

```
seo-overrides
  locale: select(en|ar)            # required
  routePath: text                  # required, e.g. "/", "services", "industries/real-estate", "markets/saudi-arabia"
  metaTitle: text                  # the browser-tab name
  metaDescription: textarea
  ogImage: upload(media)
  canonicalUrl: text
  noindex: checkbox
  nofollow: checkbox
  updatedBy / updatedAt            # audit
  index: unique (locale, routePath)
```

**Route manifest** — `GET /api/admin/route-manifest` derives the full list of routes from `buildSitemapEntries()` (the same source the sitemap uses → guaranteed "every page" coverage), grouped into: Core, Services, Industries, Markets/Countries, Sub-services, Legal, Index pages. Each entry shows current effective meta + whether an override exists.

**Resolver** — `getRouteSeo(locale, path)` in `lib/cms/route-seo.ts`:
1. Look up `seo-overrides` for `(locale, path)`. If found and non-empty, use it.
2. Else fall back to existing behavior (`getCMSMetadata` for CMS pages / static `lib/seo` defaults for programmatic).
3. Always returns a complete Next.js `Metadata` object.

**Wiring** — `getCMSMetadata()` is made override-aware (covers all routes already using it in one edit). The handful of programmatic dynamic route files (`industries/[slug]`, `markets/[slug]`, sub-service routes) call `getRouteSeo()` in their `generateMetadata`. Each edit falls back to current output when no override exists → safe, mechanical, reversible. Exact file list enumerated in the implementation plan.

### 8.3 UI
- Grouped, searchable list of all routes (EN/AR toggle).
- Each row: route path, current effective tab title + description (truncated), "overridden" badge, edit button.
- Edit drawer: metaTitle (with live char count + a tab-name preview), metaDescription (char count + Google-style snippet preview), OG image, canonical, noindex/nofollow. Save → upsert `seo-overrides`.
- **Articles** appear in the list read-only with their score and a link to edit in the Articles workspace (article SEO stays on `blog-posts.seo`, edited in context). One screen to audit; the right place to edit.

**Acceptance:** every route from the sitemap appears; editing a programmatic page's meta changes the live `<title>`/description; no override = identical output to today; articles link out correctly; bilingual.

---

## 9. Data model changes

- **New:** `seo-overrides` collection (one additive Payload migration → one new table). Reversible.
- **Changed:** none structurally. Cosmetic `admin.group`/`admin` options on existing collections only.

---

## 10. Migration-readiness

- `seo-overrides` is a plain table; new reads use Payload or portable SQL (no Supabase-specific features).
- Bulk **export (CSV/JSON)** of articles ships in M3; the same pattern extends to leads/conversations in Phase 4 → content can leave Supabase cleanly.
- Media already abstracted via the S3 adapter (env-driven), so storage is swappable.

---

## 11. External dependencies (what's needed from the founder)

| Need | Status | Blocking? |
|---|---|---|
| `OPENAI_API_KEY` | Present (chatbot works) | No — foundation only uses it for the existing per-row AI optimize/translate, which already function |
| S3 access key vars (`S3_ACCESS_KEY_ID`/secret) for prod media uploads | Per prior note, still to be added by founder | No for foundation; dashboard will *show* storage as "not configured" until added. Needed before cover-image upload works in prod |
| New external services | None required | — |

No new paid services are introduced in this phase.

---

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Inline/bulk edit clobbers unedited fields (like the Authors bio bug) | Partial updates only; send changed fields; never round-trip full docs |
| Kanban status change to Published mis-sets `publishedAt` | Reuse existing `normalizePost` logic; test transitions explicitly |
| SEO resolver changes break an existing page's meta | Resolver falls back to exact current behavior when no override; wire incrementally; snapshot meta of key routes before/after |
| Custom view route collides with Payload internals | Namespaced paths (`/admin/articles`, `/admin/seo`); validate the custom-view `path` API against the installed Payload 3.84 as the plan's first task (the dashboard override already proves custom views work) |
| Dashboard aggregation slow on large data | Single server pass; counts via `count`; cache where safe; no N+1 |
| New migration risk in prod | Backup first; additive table only; tested on a branch/local first |

---

## 13. Verification plan

- **Local:** build passes; `/admin` dashboard renders with seeded data; create/edit an article via inline quick-edit and confirm only changed fields persist; drag a card across the board and confirm status + `publishedAt`; set a meta override on a programmatic page and confirm the live `<title>` changes; confirm a route with no override renders identical meta to `main`.
- **Data-safety check:** before/after row counts for `blog-posts`, `pages`, `*-leads`, `ai-chat-conversations` are unchanged by the work itself.
- **Smoke tests:** extend the existing `npm run test:smoke` suite with `getRouteSeo` fallback tests and an overview-stats shape test.
- **Prod:** deploy on branch preview; verify dashboard, one inline edit, one SEO override on a live programmatic page; then promote.

---

## 14. Build order (milestone sequencing)

M1 (shell) → M2 (dashboard) → M3 (articles workspace) → M4 (SEO center). Each milestone is independently shippable and reviewable. The implementation plan (next step) breaks each into tasks with tests.
