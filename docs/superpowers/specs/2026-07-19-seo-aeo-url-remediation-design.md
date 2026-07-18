# SEO, AEO, and URL Remediation Design

## Objective

Improve CloudTopia's crawl efficiency, search-result presentation, answer-engine extractability, and page-loading discipline without changing any current canonical URL and without excluding any public content page from indexing.

## Non-negotiable constraints

- Preserve every current canonical URL.
- Do not delete, merge, or rename public content routes.
- Do not add `noindex` to categories, tags, services, articles, projects, industries, or country pages.
- Keep English canonical URLs unprefixed and Arabic canonical URLs under `/ar`.
- Keep descriptive nested service URLs even when the complete URL is long.
- Do not invent customer proof, partner status, company history, reviews, statistics, or business outcomes.
- Preserve unrelated user work, including the existing untracked `mockup/` directory.

## Architecture

### Canonical routing

Next.js will delegate trailing-slash normalization to `proxy.ts` by enabling `skipTrailingSlashRedirect`. A pure route-resolution helper will normalize hostname, locale prefix, trailing slash, and legacy aliases into one final canonical destination. The proxy will use that result before locale rewrites, so a request such as `www + /en + legacy slug + trailing slash` produces one permanent redirect instead of a framework redirect followed by an application redirect.

Legacy web-application aliases will resolve directly to `/services/web-applications/<canonical-pillar>`. Existing canonical app-development and service routes remain unchanged. Static files, APIs, admin routes, content negotiation, and internal locale rewrites keep their existing behavior.

### Canonical consumers

Sitemap entries, hreflang links, breadcrumbs, and navigation continue using the existing canonical URL helpers. Tests will prevent new internal references to `www`, `/en`, trailing-slash, or known legacy aliases. The implementation will centralize only the alias data that currently causes redirect chains; it will not attempt an unrelated site-wide routing rewrite.

### Index-all taxonomy pages

Category and tag pages remain self-canonical and indexable. Taxonomy metadata and visible introductory copy will use separate intent-specific helpers:

- Categories are editorial topic hubs that summarize the subject and guide readers through related strategy content.
- Tags are focused resource collections that connect implementation-oriented articles sharing a narrower concept.

Fallback copy will be unique by taxonomy name and locale. The e-commerce category and tag will have deliberately different titles and descriptions. Existing CMS-authored SEO fields remain authoritative when present.

### Metadata quality

Automated assertions will cover service title and description quality without treating character limits as hard ranking rules. Known short English service metadata will be expanded using accurate catalog facts. Overlong article SERP titles will use a concise metadata title while preserving the visible article title and URL.

### Service differentiation

Priority services will be differentiated only with facts already present in the structured catalog, service deliverables, process data, or project records. The work may improve intent labels, decision guidance, related links, and answer-first summaries. It will not manufacture case studies or performance claims. Large-scale service consolidation is explicitly out of scope because every service must remain indexable and retain its URL.

### AEO trust consistency

The safe trust fix is to replace claims such as “Verified reviews on Clutch” with neutral, accurate profile wording unless verified review data exists in the repository. Organization schema will retain only business facts supported by current site configuration. External-profile disagreements about founding date or partner tier will be reported for owner confirmation rather than silently resolved in code.

Existing crawler access, `llms.txt`, pricing markdown, Service schema, FAQ content, and content-signal headers remain intact.

### Performance

Homepage-only media will no longer be preloaded from the global frontend layout. Article display fonts will be scoped to article routes or marked non-preloaded where route scoping would duplicate typography configuration. Primary interface fonts and Arabic support remain available. Image URLs and visual design stay unchanged.

## Error handling and edge cases

- Query strings are preserved across canonical redirects unless an alias explicitly requires dropping an obsolete parameter.
- Root `/` never receives a trailing-slash redirect.
- Arabic legacy requests resolve directly to the equivalent `/ar` canonical URL.
- Requests already rewritten internally with `x-locale: en` do not loop.
- Static assets and agent-discovery endpoints bypass locale routing.
- Unknown paths continue through normal application routing and can resolve to the existing not-found page.
- Taxonomy fallback metadata handles missing CMS descriptions in both English and Arabic.

## Testing and acceptance criteria

1. Each audited legacy URL reaches the final canonical URL in one redirect when exercised through the application proxy.
2. Canonical URLs return content or an internal rewrite without an external redirect.
3. Redirect tests cover `www`, `/en`, `/ar`, trailing slash, relocated top-level services, web-app aliases, and app-development aliases.
4. All sitemap entries remain indexable, return successful responses in the generated-site tests, and use self-canonical URLs.
5. Category and tag pages emit distinct metadata and visible introductory copy, including the e-commerce pair.
6. No public taxonomy or content route gains a `noindex` directive.
7. Global frontend pages stop preloading the homepage cloud image and non-critical article fonts.
8. Focused tests, the full smoke suite, TypeScript/build checks, and a production build pass before completion is claimed.

## Out of scope pending owner or field data

- Choosing the authoritative founding year.
- Removing or endorsing individual testimonials without evidence and consent.
- Claiming partner certifications not represented by verifiable repository data.
- Consolidating service pages based on Search Console performance.
- Claiming Core Web Vitals improvements without post-deployment field measurements.
