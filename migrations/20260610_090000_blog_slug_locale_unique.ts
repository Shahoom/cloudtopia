import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Blog posts store locale as a plain column and an article's translations are
// paired by SHARING the same slug across locales (the article-page hreflang map
// is built from a single `post.slug` for both en and ar). The original schema
// made `slug` GLOBALLY unique, which forced Arabic translations to invent a
// different (and, via slugify stripping Arabic, degenerate) slug — breaking
// hreflang and orphaning the Arabic pages for search engines.
//
// Switch to a composite unique index on (slug, locale): the en and ar versions
// of one article share a slug, while duplicate slugs within a locale are still
// rejected. Idempotent so it is safe on any environment.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    drop index if exists "blog_posts_slug_idx";
    create unique index if not exists "blog_posts_slug_locale_idx"
      on "blog_posts" ("slug", "locale");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop index if exists "blog_posts_slug_locale_idx";
    create unique index if not exists "blog_posts_slug_idx"
      on "blog_posts" ("slug");
  `)
}
