ALTER TABLE "_blog_posts_v_version_internal_links_suggestions" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "_blog_posts_v_version_references" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "_blog_posts_v_version_external_sources" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "_blog_posts_v_version_related_services" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;

ALTER TABLE "blog_posts_internal_links_suggestions" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "blog_posts_references" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "blog_posts_external_sources" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
ALTER TABLE "blog_posts_related_services" ADD COLUMN IF NOT EXISTS "_uuid" VARCHAR;
