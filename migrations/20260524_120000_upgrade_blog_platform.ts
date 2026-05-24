import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    do $$
    begin
      alter type "public"."enum_blog_posts_status" add value if not exists 'idea';
      alter type "public"."enum_blog_posts_status" add value if not exists 'outline';
      alter type "public"."enum_blog_posts_status" add value if not exists 'in_review';
      alter type "public"."enum_blog_posts_status" add value if not exists 'scheduled';
      alter type "public"."enum_blog_posts_status" add value if not exists 'archived';
      alter type "public"."enum_newsletter_subscribers_status" add value if not exists 'active';
      alter type "public"."enum_newsletter_subscribers_status" add value if not exists 'bounced';
    exception
      when duplicate_object then null;
    end $$;

    do $$
    begin
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_approval_status') then
        create type "public"."enum_blog_posts_approval_status" as enum ('not_required', 'waiting', 'approved', 'rejected');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_difficulty') then
        create type "public"."enum_blog_posts_difficulty" as enum ('beginner', 'intermediate', 'advanced');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_content_type') then
        create type "public"."enum_blog_posts_content_type" as enum ('guide', 'article', 'case_study', 'checklist', 'comparison', 'tutorial', 'opinion', 'news');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_target_audience') then
        create type "public"."enum_blog_posts_target_audience" as enum ('startups', 'small_businesses', 'medium_businesses', 'real_estate', 'clinics', 'ecommerce', 'service_companies', 'founders', 'developers');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_service_focus') then
        create type "public"."enum_blog_posts_service_focus" as enum ('websites', 'web_apps', 'crm', 'erp', 'automation', 'ai', 'cloud', 'digital_presence', 'business_systems');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_seo_structured_data_type') then
        create type "public"."enum_blog_posts_seo_structured_data_type" as enum ('BlogPosting', 'Article', 'TechArticle', 'HowTo', 'FAQPage');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_search_intent') then
        create type "public"."enum_blog_posts_search_intent" as enum ('informational', 'commercial', 'transactional', 'navigational');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_funnel_stage') then
        create type "public"."enum_blog_posts_funnel_stage" as enum ('awareness', 'consideration', 'conversion', 'retention');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_social_status') then
        create type "public"."enum_blog_posts_social_status" as enum ('not_prepared', 'prepared', 'scheduled', 'published');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_newsletter_placement') then
        create type "public"."enum_blog_posts_newsletter_placement" as enum ('none', 'after_intro', 'middle', 'end', 'sidebar');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_posts_primary_c_t_a') then
        create type "public"."enum_blog_posts_primary_c_t_a" as enum ('start_project', 'talk_to_cloudtopia', 'view_services', 'book_consultation');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_locale') then
        create type "public"."enum__blog_posts_v_version_locale" as enum ('en', 'ar', 'tr');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_status') then
        create type "public"."enum__blog_posts_v_version_status" as enum ('idea', 'outline', 'draft', 'in_review', 'scheduled', 'published', 'archived');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_approval_status') then
        create type "public"."enum__blog_posts_v_version_approval_status" as enum ('not_required', 'waiting', 'approved', 'rejected');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_difficulty') then
        create type "public"."enum__blog_posts_v_version_difficulty" as enum ('beginner', 'intermediate', 'advanced');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_content_type') then
        create type "public"."enum__blog_posts_v_version_content_type" as enum ('guide', 'article', 'case_study', 'checklist', 'comparison', 'tutorial', 'opinion', 'news');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_target_audience') then
        create type "public"."enum__blog_posts_v_version_target_audience" as enum ('startups', 'small_businesses', 'medium_businesses', 'real_estate', 'clinics', 'ecommerce', 'service_companies', 'founders', 'developers');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_service_focus') then
        create type "public"."enum__blog_posts_v_version_service_focus" as enum ('websites', 'web_apps', 'crm', 'erp', 'automation', 'ai', 'cloud', 'digital_presence', 'business_systems');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_seo_structured_data_type') then
        create type "public"."enum__blog_posts_v_version_seo_structured_data_type" as enum ('BlogPosting', 'Article', 'TechArticle', 'HowTo', 'FAQPage');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_search_intent') then
        create type "public"."enum__blog_posts_v_version_search_intent" as enum ('informational', 'commercial', 'transactional', 'navigational');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_funnel_stage') then
        create type "public"."enum__blog_posts_v_version_funnel_stage" as enum ('awareness', 'consideration', 'conversion', 'retention');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_social_status') then
        create type "public"."enum__blog_posts_v_version_social_status" as enum ('not_prepared', 'prepared', 'scheduled', 'published');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_newsletter_placement') then
        create type "public"."enum__blog_posts_v_version_newsletter_placement" as enum ('none', 'after_intro', 'middle', 'end', 'sidebar');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum__blog_posts_v_version_primary_c_t_a') then
        create type "public"."enum__blog_posts_v_version_primary_c_t_a" as enum ('start_project', 'talk_to_cloudtopia', 'view_services', 'book_consultation');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_redirects_status_code') then
        create type "public"."enum_blog_redirects_status_code" as enum ('301', '302');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_ai_generation_logs_prompt_type') then
        create type "public"."enum_blog_ai_generation_logs_prompt_type" as enum ('idea', 'outline', 'title', 'excerpt', 'intro', 'rewrite', 'faq', 'seo', 'social', 'cta', 'analyze', 'translate');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_ai_generation_logs_status') then
        create type "public"."enum_blog_ai_generation_logs_status" as enum ('success', 'error');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_content_templates_content_type') then
        create type "public"."enum_blog_content_templates_content_type" as enum ('guide', 'article', 'case_study', 'checklist', 'comparison', 'tutorial', 'opinion', 'news');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_blog_content_templates_target_audience') then
        create type "public"."enum_blog_content_templates_target_audience" as enum ('startups', 'small_businesses', 'medium_businesses', 'real_estate', 'clinics', 'ecommerce', 'service_companies', 'founders', 'developers');
      end if;
      if not exists (select 1 from pg_type where typname = 'enum_newsletter_subscribers_locale') then
        create type "public"."enum_newsletter_subscribers_locale" as enum ('en', 'ar', 'tr');
      end if;
    end $$;

    alter table "authors"
      add column if not exists "short_bio" varchar,
      add column if not exists "email" varchar,
      add column if not exists "show_profile" boolean default true,
      add column if not exists "linkedin_url" varchar,
      add column if not exists "x_url" varchar,
      add column if not exists "website_url" varchar,
      add column if not exists "author_s_e_o_meta_title" varchar,
      add column if not exists "author_s_e_o_meta_description" varchar,
      add column if not exists "author_s_e_o_og_image_id" integer,
      add column if not exists "author_s_e_o_no_index" boolean default false;

    create table if not exists "authors_expertise" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "area" varchar not null
    );

    alter table "blog_categories"
      add column if not exists "short_description" varchar,
      add column if not exists "seo_title" varchar,
      add column if not exists "seo_description" varchar,
      add column if not exists "parent_category_id" integer,
      add column if not exists "show_in_navigation" boolean default true,
      add column if not exists "category_c_t_a_title" varchar,
      add column if not exists "category_c_t_a_description" varchar,
      add column if not exists "category_c_t_a_button_text" varchar,
      add column if not exists "category_c_t_a_button_url" varchar;

    create table if not exists "blog_categories_related_services" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar not null,
      "url" varchar not null
    );

    alter table "blog_tags"
      add column if not exists "description" varchar,
      add column if not exists "color" varchar default '#0284c7',
      add column if not exists "featured" boolean default false,
      add column if not exists "seo_title" varchar,
      add column if not exists "seo_description" varchar;

    create table if not exists "blog_series" (
      "id" serial primary key not null,
      "title" varchar not null,
      "slug" varchar not null,
      "description" varchar,
      "cover_image_id" integer,
      "order" numeric default 0,
      "featured" boolean default false,
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_og_image_id" integer,
      "seo_no_index" boolean default false,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_series_rels" (
      "id" serial primary key not null,
      "order" integer,
      "parent_id" integer not null,
      "path" varchar not null,
      "blog_posts_id" integer
    );

    alter table "blog_posts"
      add column if not exists "approval_status" "enum_blog_posts_approval_status" default 'not_required',
      add column if not exists "subtitle" varchar,
      add column if not exists "short_excerpt" varchar,
      add column if not exists "editor_pick" boolean default false,
      add column if not exists "trending" boolean default false,
      add column if not exists "scheduled_at" timestamp(3) with time zone,
      add column if not exists "last_reviewed_at" timestamp(3) with time zone,
      add column if not exists "difficulty" "enum_blog_posts_difficulty" default 'beginner',
      add column if not exists "content_type" "enum_blog_posts_content_type" default 'article',
      add column if not exists "target_audience" "enum_blog_posts_target_audience",
      add column if not exists "service_focus" "enum_blog_posts_service_focus",
      add column if not exists "word_count" numeric default 0,
      add column if not exists "content_score" numeric default 0,
      add column if not exists "seo_score" numeric default 0,
      add column if not exists "content_blocks" jsonb,
      add column if not exists "featured_image_alt" varchar,
      add column if not exists "social_image_id" integer,
      add column if not exists "lead_magnet_file_id" integer,
      add column if not exists "seo_focus_keyword" varchar,
      add column if not exists "seo_secondary_keywords" varchar,
      add column if not exists "seo_og_title" varchar,
      add column if not exists "seo_og_description" varchar,
      add column if not exists "seo_twitter_title" varchar,
      add column if not exists "seo_twitter_description" varchar,
      add column if not exists "seo_twitter_image_id" integer,
      add column if not exists "seo_no_follow" boolean default false,
      add column if not exists "seo_structured_data_type" "enum_blog_posts_seo_structured_data_type" default 'BlogPosting',
      add column if not exists "seo_faq_schema" boolean default true,
      add column if not exists "seo_breadcrumb_schema" boolean default true,
      add column if not exists "seo_article_schema" boolean default true,
      add column if not exists "seo_last_modified_schema" boolean default true,
      add column if not exists "ai_generated" boolean default false,
      add column if not exists "ai_assisted" boolean default false,
      add column if not exists "readability_score" numeric default 0,
      add column if not exists "estimated_ranking_difficulty" numeric,
      add column if not exists "search_intent" "enum_blog_posts_search_intent",
      add column if not exists "funnel_stage" "enum_blog_posts_funnel_stage",
      add column if not exists "fact_checked" boolean default false,
      add column if not exists "fact_checked_by_id" integer,
      add column if not exists "fact_checked_at" timestamp(3) with time zone,
      add column if not exists "assigned_to_id" integer,
      add column if not exists "reviewer_id" integer,
      add column if not exists "approved_by_id" integer,
      add column if not exists "approved_at" timestamp(3) with time zone,
      add column if not exists "editor_notes" varchar,
      add column if not exists "private_notes" varchar,
      add column if not exists "revision_notes" varchar,
      add column if not exists "linkedin_post" varchar,
      add column if not exists "instagram_caption" varchar,
      add column if not exists "x_post" varchar,
      add column if not exists "whatsapp_message" varchar,
      add column if not exists "email_newsletter_intro" varchar,
      add column if not exists "social_status" "enum_blog_posts_social_status" default 'not_prepared',
      add column if not exists "show_c_t_a" boolean default true,
      add column if not exists "cta_title" varchar,
      add column if not exists "cta_description" varchar,
      add column if not exists "cta_button_text" varchar default 'Talk to CloudTopia',
      add column if not exists "cta_button_url" varchar default '/contact',
      add column if not exists "secondary_c_t_a_button_text" varchar default 'View Services',
      add column if not exists "secondary_c_t_a_button_url" varchar default '/services',
      add column if not exists "lead_magnet_title" varchar,
      add column if not exists "newsletter_placement" "enum_blog_posts_newsletter_placement" default 'end',
      add column if not exists "primary_c_t_a" "enum_blog_posts_primary_c_t_a",
      add column if not exists "unique_views_count" numeric default 0,
      add column if not exists "average_read_time" numeric,
      add column if not exists "conversion_clicks" numeric default 0,
      add column if not exists "newsletter_signups" numeric default 0,
      add column if not exists "last_viewed_at" timestamp(3) with time zone,
      add column if not exists "series_id" integer,
      add column if not exists "_status" "enum_blog_posts_status" default 'draft';

    create table if not exists "blog_posts_internal_links_suggestions" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar,
      "reason" varchar
    );

    create table if not exists "blog_posts_external_sources" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "title" varchar,
      "url" varchar
    );

    create table if not exists "blog_posts_references" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar,
      "note" varchar
    );

    create table if not exists "blog_posts_related_services" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar
    );

    alter table "blog_posts_rels"
      add column if not exists "authors_id" integer;

    create table if not exists "_blog_posts_v" (
      "id" serial primary key not null,
      "parent_id" integer,
      "version_locale" "enum__blog_posts_v_version_locale" default 'en',
      "version_status" "enum__blog_posts_v_version_status" default 'draft',
      "version_approval_status" "enum__blog_posts_v_version_approval_status" default 'not_required',
      "version_title" varchar,
      "version_slug" varchar,
      "version_subtitle" varchar,
      "version_excerpt" varchar,
      "version_short_excerpt" varchar,
      "version_featured" boolean default false,
      "version_pinned" boolean default false,
      "version_editor_pick" boolean default false,
      "version_trending" boolean default false,
      "version_published_at" timestamp(3) with time zone,
      "version_scheduled_at" timestamp(3) with time zone,
      "version_last_reviewed_at" timestamp(3) with time zone,
      "version_difficulty" "enum__blog_posts_v_version_difficulty" default 'beginner',
      "version_content_type" "enum__blog_posts_v_version_content_type" default 'article',
      "version_target_audience" "enum__blog_posts_v_version_target_audience",
      "version_service_focus" "enum__blog_posts_v_version_service_focus",
      "version_reading_time" numeric default 1,
      "version_word_count" numeric default 0,
      "version_content_score" numeric default 0,
      "version_seo_score" numeric default 0,
      "version_content" jsonb,
      "version_content_blocks" jsonb,
      "version_cover_image_id" integer,
      "version_featured_image_alt" varchar,
      "version_social_image_id" integer,
      "version_lead_magnet_file_id" integer,
      "version_seo_meta_title" varchar,
      "version_seo_meta_description" varchar,
      "version_seo_focus_keyword" varchar,
      "version_seo_secondary_keywords" varchar,
      "version_seo_keywords" varchar,
      "version_seo_canonical_url" varchar,
      "version_seo_og_title" varchar,
      "version_seo_og_description" varchar,
      "version_seo_og_image_id" integer,
      "version_seo_twitter_title" varchar,
      "version_seo_twitter_description" varchar,
      "version_seo_twitter_image_id" integer,
      "version_seo_no_index" boolean default false,
      "version_seo_no_follow" boolean default false,
      "version_seo_structured_data_type" "enum__blog_posts_v_version_seo_structured_data_type" default 'BlogPosting',
      "version_seo_faq_schema" boolean default true,
      "version_seo_breadcrumb_schema" boolean default true,
      "version_seo_article_schema" boolean default true,
      "version_seo_last_modified_schema" boolean default true,
      "version_ai_generated" boolean default false,
      "version_ai_assisted" boolean default false,
      "version_readability_score" numeric default 0,
      "version_estimated_ranking_difficulty" numeric,
      "version_search_intent" "enum__blog_posts_v_version_search_intent",
      "version_funnel_stage" "enum__blog_posts_v_version_funnel_stage",
      "version_fact_checked" boolean default false,
      "version_fact_checked_by_id" integer,
      "version_fact_checked_at" timestamp(3) with time zone,
      "version_assigned_to_id" integer,
      "version_reviewer_id" integer,
      "version_approved_by_id" integer,
      "version_approved_at" timestamp(3) with time zone,
      "version_editor_notes" varchar,
      "version_private_notes" varchar,
      "version_revision_notes" varchar,
      "version_linkedin_post" varchar,
      "version_instagram_caption" varchar,
      "version_x_post" varchar,
      "version_whatsapp_message" varchar,
      "version_email_newsletter_intro" varchar,
      "version_social_status" "enum__blog_posts_v_version_social_status" default 'not_prepared',
      "version_show_c_t_a" boolean default true,
      "version_cta_title" varchar,
      "version_cta_description" varchar,
      "version_cta_button_text" varchar default 'Talk to CloudTopia',
      "version_cta_button_url" varchar default '/contact',
      "version_secondary_c_t_a_button_text" varchar default 'View Services',
      "version_secondary_c_t_a_button_url" varchar default '/services',
      "version_lead_magnet_title" varchar,
      "version_newsletter_placement" "enum__blog_posts_v_version_newsletter_placement" default 'end',
      "version_primary_c_t_a" "enum__blog_posts_v_version_primary_c_t_a",
      "version_views_count" numeric default 0,
      "version_unique_views_count" numeric default 0,
      "version_average_read_time" numeric,
      "version_conversion_clicks" numeric default 0,
      "version_newsletter_signups" numeric default 0,
      "version_last_viewed_at" timestamp(3) with time zone,
      "version_category_id" integer,
      "version_author_id" integer,
      "version_series_id" integer,
      "version_table_of_contents" boolean default true,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__blog_posts_v_version_status" default 'draft',
      "created_at" timestamp(3) with time zone default now() not null,
      "updated_at" timestamp(3) with time zone default now() not null,
      "latest" boolean
    );

    create table if not exists "_blog_posts_v_version_internal_links_suggestions" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar,
      "reason" varchar
    );

    create table if not exists "_blog_posts_v_version_external_sources" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "title" varchar,
      "url" varchar
    );

    create table if not exists "_blog_posts_v_version_references" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar,
      "note" varchar
    );

    create table if not exists "_blog_posts_v_version_related_services" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "label" varchar,
      "url" varchar
    );

    create table if not exists "_blog_posts_v_rels" (
      "id" serial primary key not null,
      "order" integer,
      "parent_id" integer not null,
      "path" varchar not null,
      "blog_tags_id" integer,
      "authors_id" integer,
      "blog_posts_id" integer
    );

    create table if not exists "blog_redirects" (
      "id" serial primary key not null,
      "from_path" varchar not null,
      "to_path" varchar not null,
      "status_code" "enum_blog_redirects_status_code" default '301' not null,
      "active" boolean default true,
      "notes" varchar,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_ai_generation_logs" (
      "id" serial primary key not null,
      "prompt_type" "enum_blog_ai_generation_logs_prompt_type" not null,
      "source_post_id" integer,
      "user_id" integer,
      "user_email" varchar,
      "provider" varchar default 'openai',
      "model" varchar,
      "input_preview" varchar,
      "output_preview" varchar,
      "status" "enum_blog_ai_generation_logs_status" default 'success',
      "error_message" varchar,
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_content_templates" (
      "id" serial primary key not null,
      "name" varchar not null,
      "slug" varchar not null,
      "description" varchar,
      "content_type" "enum_blog_content_templates_content_type",
      "default_outline" varchar,
      "default_c_t_a_title" varchar,
      "default_c_t_a_description" varchar,
      "default_c_t_a_button_text" varchar,
      "default_c_t_a_button_url" varchar,
      "target_audience" "enum_blog_content_templates_target_audience",
      "updated_at" timestamp(3) with time zone default now() not null,
      "created_at" timestamp(3) with time zone default now() not null
    );

    create table if not exists "blog_content_templates_recommended_blocks" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "block_type" varchar not null,
      "notes" varchar
    );

    create table if not exists "blog_content_templates_seo_checklist" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "item" varchar not null
    );

    alter table "newsletter_subscribers"
      add column if not exists "consent" boolean default true,
      add column if not exists "locale" "enum_newsletter_subscribers_locale" default 'en',
      add column if not exists "utm_source" varchar,
      add column if not exists "utm_campaign" varchar;

    create table if not exists "newsletter_subscribers_interests" (
      "_order" integer not null,
      "_parent_id" integer not null,
      "id" varchar primary key not null,
      "interest" varchar not null
    );

    create unique index if not exists "blog_series_slug_idx" on "blog_series" using btree ("slug");
    create unique index if not exists "blog_redirects_from_path_idx" on "blog_redirects" using btree ("from_path");
    create unique index if not exists "blog_content_templates_slug_idx" on "blog_content_templates" using btree ("slug");

    create index if not exists "authors_expertise_parent_id_idx" on "authors_expertise" using btree ("_parent_id");
    create index if not exists "blog_categories_related_services_parent_id_idx" on "blog_categories_related_services" using btree ("_parent_id");
    create index if not exists "blog_series_rels_parent_idx" on "blog_series_rels" using btree ("parent_id");
    create index if not exists "blog_series_rels_blog_posts_id_idx" on "blog_series_rels" using btree ("blog_posts_id");
    create index if not exists "blog_posts_internal_links_suggestions_parent_id_idx" on "blog_posts_internal_links_suggestions" using btree ("_parent_id");
    create index if not exists "blog_posts_external_sources_parent_id_idx" on "blog_posts_external_sources" using btree ("_parent_id");
    create index if not exists "blog_posts_references_parent_id_idx" on "blog_posts_references" using btree ("_parent_id");
    create index if not exists "blog_posts_related_services_parent_id_idx" on "blog_posts_related_services" using btree ("_parent_id");
    create index if not exists "_blog_posts_v_parent_idx" on "_blog_posts_v" using btree ("parent_id");
    create index if not exists "_blog_posts_v_latest_idx" on "_blog_posts_v" using btree ("latest");
    create index if not exists "_blog_posts_v_rels_parent_idx" on "_blog_posts_v_rels" using btree ("parent_id");
    create index if not exists "blog_ai_generation_logs_source_post_idx" on "blog_ai_generation_logs" using btree ("source_post_id");
    create index if not exists "blog_ai_generation_logs_user_idx" on "blog_ai_generation_logs" using btree ("user_id");
    create index if not exists "newsletter_subscribers_interests_parent_id_idx" on "newsletter_subscribers_interests" using btree ("_parent_id");

    do $$
    begin
      if not exists (select 1 from pg_constraint where conname = 'authors_expertise_parent_id_fk') then
        alter table "authors_expertise" add constraint "authors_expertise_parent_id_fk" foreign key ("_parent_id") references "authors"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'authors_author_s_e_o_og_image_fk') then
        alter table "authors" add constraint "authors_author_s_e_o_og_image_fk" foreign key ("author_s_e_o_og_image_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_categories_parent_category_fk') then
        alter table "blog_categories" add constraint "blog_categories_parent_category_fk" foreign key ("parent_category_id") references "blog_categories"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_categories_related_services_parent_id_fk') then
        alter table "blog_categories_related_services" add constraint "blog_categories_related_services_parent_id_fk" foreign key ("_parent_id") references "blog_categories"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_series_cover_image_fk') then
        alter table "blog_series" add constraint "blog_series_cover_image_fk" foreign key ("cover_image_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_series_seo_og_image_fk') then
        alter table "blog_series" add constraint "blog_series_seo_og_image_fk" foreign key ("seo_og_image_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_series_rels_parent_fk') then
        alter table "blog_series_rels" add constraint "blog_series_rels_parent_fk" foreign key ("parent_id") references "blog_series"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_series_rels_blog_posts_fk') then
        alter table "blog_series_rels" add constraint "blog_series_rels_blog_posts_fk" foreign key ("blog_posts_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_social_image_fk') then
        alter table "blog_posts" add constraint "blog_posts_social_image_fk" foreign key ("social_image_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_lead_magnet_file_fk') then
        alter table "blog_posts" add constraint "blog_posts_lead_magnet_file_fk" foreign key ("lead_magnet_file_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_seo_twitter_image_fk') then
        alter table "blog_posts" add constraint "blog_posts_seo_twitter_image_fk" foreign key ("seo_twitter_image_id") references "media"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_series_fk') then
        alter table "blog_posts" add constraint "blog_posts_series_fk" foreign key ("series_id") references "blog_series"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_fact_checked_by_fk') then
        alter table "blog_posts" add constraint "blog_posts_fact_checked_by_fk" foreign key ("fact_checked_by_id") references "users"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_assigned_to_fk') then
        alter table "blog_posts" add constraint "blog_posts_assigned_to_fk" foreign key ("assigned_to_id") references "users"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_reviewer_fk') then
        alter table "blog_posts" add constraint "blog_posts_reviewer_fk" foreign key ("reviewer_id") references "users"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_approved_by_fk') then
        alter table "blog_posts" add constraint "blog_posts_approved_by_fk" foreign key ("approved_by_id") references "users"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_internal_links_suggestions_parent_id_fk') then
        alter table "blog_posts_internal_links_suggestions" add constraint "blog_posts_internal_links_suggestions_parent_id_fk" foreign key ("_parent_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_external_sources_parent_id_fk') then
        alter table "blog_posts_external_sources" add constraint "blog_posts_external_sources_parent_id_fk" foreign key ("_parent_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_references_parent_id_fk') then
        alter table "blog_posts_references" add constraint "blog_posts_references_parent_id_fk" foreign key ("_parent_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_related_services_parent_id_fk') then
        alter table "blog_posts_related_services" add constraint "blog_posts_related_services_parent_id_fk" foreign key ("_parent_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_posts_rels_authors_fk') then
        alter table "blog_posts_rels" add constraint "blog_posts_rels_authors_fk" foreign key ("authors_id") references "authors"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = '_blog_posts_v_parent_fk') then
        alter table "_blog_posts_v" add constraint "_blog_posts_v_parent_fk" foreign key ("parent_id") references "blog_posts"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = '_blog_posts_v_rels_parent_fk') then
        alter table "_blog_posts_v_rels" add constraint "_blog_posts_v_rels_parent_fk" foreign key ("parent_id") references "_blog_posts_v"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = '_blog_posts_v_rels_blog_tags_fk') then
        alter table "_blog_posts_v_rels" add constraint "_blog_posts_v_rels_blog_tags_fk" foreign key ("blog_tags_id") references "blog_tags"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = '_blog_posts_v_rels_authors_fk') then
        alter table "_blog_posts_v_rels" add constraint "_blog_posts_v_rels_authors_fk" foreign key ("authors_id") references "authors"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = '_blog_posts_v_rels_blog_posts_fk') then
        alter table "_blog_posts_v_rels" add constraint "_blog_posts_v_rels_blog_posts_fk" foreign key ("blog_posts_id") references "blog_posts"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_ai_generation_logs_source_post_fk') then
        alter table "blog_ai_generation_logs" add constraint "blog_ai_generation_logs_source_post_fk" foreign key ("source_post_id") references "blog_posts"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_ai_generation_logs_user_fk') then
        alter table "blog_ai_generation_logs" add constraint "blog_ai_generation_logs_user_fk" foreign key ("user_id") references "users"("id") on delete set null;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_content_templates_recommended_blocks_parent_id_fk') then
        alter table "blog_content_templates_recommended_blocks" add constraint "blog_content_templates_recommended_blocks_parent_id_fk" foreign key ("_parent_id") references "blog_content_templates"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'blog_content_templates_seo_checklist_parent_id_fk') then
        alter table "blog_content_templates_seo_checklist" add constraint "blog_content_templates_seo_checklist_parent_id_fk" foreign key ("_parent_id") references "blog_content_templates"("id") on delete cascade;
      end if;
      if not exists (select 1 from pg_constraint where conname = 'newsletter_subscribers_interests_parent_id_fk') then
        alter table "newsletter_subscribers_interests" add constraint "newsletter_subscribers_interests_parent_id_fk" foreign key ("_parent_id") references "newsletter_subscribers"("id") on delete cascade;
      end if;
    end $$;

    alter table "payload_locked_documents_rels"
      add column if not exists "blog_series_id" integer,
      add column if not exists "blog_redirects_id" integer,
      add column if not exists "blog_ai_generation_logs_id" integer,
      add column if not exists "blog_content_templates_id" integer;

    create index if not exists "payload_locked_documents_rels_blog_series_id_idx" on "payload_locked_documents_rels" using btree ("blog_series_id");
    create index if not exists "payload_locked_documents_rels_blog_redirects_id_idx" on "payload_locked_documents_rels" using btree ("blog_redirects_id");
    create index if not exists "payload_locked_documents_rels_blog_ai_generation_logs_id_idx" on "payload_locked_documents_rels" using btree ("blog_ai_generation_logs_id");
    create index if not exists "payload_locked_documents_rels_blog_content_templates_id_idx" on "payload_locked_documents_rels" using btree ("blog_content_templates_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    drop table if exists "newsletter_subscribers_interests";
    drop table if exists "blog_content_templates_seo_checklist";
    drop table if exists "blog_content_templates_recommended_blocks";
    drop table if exists "blog_content_templates";
    drop table if exists "blog_ai_generation_logs";
    drop table if exists "blog_redirects";
    drop table if exists "_blog_posts_v_rels";
    drop table if exists "_blog_posts_v_version_related_services";
    drop table if exists "_blog_posts_v_version_references";
    drop table if exists "_blog_posts_v_version_external_sources";
    drop table if exists "_blog_posts_v_version_internal_links_suggestions";
    drop table if exists "_blog_posts_v";
    drop table if exists "blog_posts_related_services";
    drop table if exists "blog_posts_references";
    drop table if exists "blog_posts_external_sources";
    drop table if exists "blog_posts_internal_links_suggestions";
    drop table if exists "blog_series_rels";
    drop table if exists "blog_series";
    drop table if exists "blog_categories_related_services";
    drop table if exists "authors_expertise";
  `)
}
