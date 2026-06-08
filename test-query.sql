select
        p.id, p.locale, p.title, p.slug, p.subtitle, p.excerpt, p.short_excerpt,
        p.featured, p.pinned, p.editor_pick, p.trending,
        p.published_at, p.updated_at, p.reading_time, p.word_count,
        p.views_count, p.unique_views_count, p.content_score, p.seo_score,
        p.readability_score, p.difficulty::text as difficulty,
        p.content_type::text as content_type, p.target_audience::text as target_audience,
        p.service_focus::text as service_focus, p.featured_image_alt,
        p.show_c_t_a, p.cta_title, p.cta_description, p.cta_button_text,
        p.cta_button_url, p.secondary_c_t_a_button_text, p.secondary_c_t_a_button_url,
        p.seo_meta_title, p.seo_meta_description, p.seo_focus_keyword,
        p.seo_secondary_keywords, p.seo_keywords, p.seo_canonical_url,
        p.seo_og_title, p.seo_og_description, p.seo_no_index, p.seo_no_follow,
        p.seo_twitter_title, p.seo_twitter_description,
        cover.id as cover_image_id, cover.url as cover_image_url, cover.alt as cover_image_alt,
        cover.width as cover_image_width, cover.height as cover_image_height,
        og.id as og_image_id, og.url as og_image_url, og.alt as og_image_alt,
        twitter.id as twitter_image_id, twitter.url as twitter_image_url, twitter.alt as twitter_image_alt,
        c.id as category_id, c.slug as category_slug, c.name as category_name, c.color as category_color, c.icon as category_icon,
        a.id as author_id, a.slug as author_slug, a.name as author_name, a.role as author_role, a.bio as author_bio, a.short_bio as author_short_bio,
        a.email as author_email, a.linkedin_url as author_linkedin_url, a.x_url as author_x_url, a.website_url as author_website_url,
        a.show_profile as author_show_profile,
        author_image.id as author_image_id, author_image.url as author_image_url, author_image.alt as author_image_alt,
        author_image.width as author_image_width, author_image.height as author_image_height,
        s.id as series_id, s.slug as series_slug, s.title as series_title, s.description as series_description,
        coalesce(jsonb_agg(distinct jsonb_build_object('id', t.id, 'name', t.name, 'slug', t.slug, 'color', t.color)) filter (where t.id is not null), '[]'::jsonb) as tags,
        coalesce(jsonb_agg(distinct asa.url) filter (where asa.url is not null), '[]'::jsonb) as author_same_as,
        coalesce(jsonb_agg(distinct ae.area) filter (where ae.area is not null), '[]'::jsonb) as author_expertise,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', prs.label, 'url', prs.url))
            filter (where prs.id is not null),
          '[]'::jsonb
        ) as related_services,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', crs.label, 'url', crs.url))
            filter (where crs.id is not null),
          '[]'::jsonb
        ) as category_related_services
       from blog_posts p
       left join media cover on cover.id = p.cover_image_id
       left join media og on og.id = p.seo_og_image_id
       left join media twitter on twitter.id = p.seo_twitter_image_id
       left join blog_categories c on c.id = p.category_id
       left join blog_categories_related_services crs on crs._parent_id = c.id
       left join authors a on a.id = p.author_id
       left join media author_image on author_image.id = a.image_id
       left join authors_same_as asa on asa._parent_id = a.id
       left join authors_expertise ae on ae._parent_id = a.id
       left join blog_series s on s.id = p.series_id
       left join blog_posts_related_services prs on prs._parent_id = p.id
       left join blog_posts_rels tag_rel on tag_rel.parent_id = p.id and tag_rel.path = 'tags'
       left join blog_tags t on t.id = tag_rel.blog_tags_id
       where p.status = 'published' and p.locale = 'en'
       group by
        p.id, cover.id, og.id, twitter.id, c.id, a.id, author_image.id, s.id
       order by p.pinned desc, p.featured desc, p.published_at desc nulls last, p.created_at desc;
