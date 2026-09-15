'use client'

import { useFormFields } from '@payloadcms/ui'
import { Search } from 'lucide-react'
import './admin/editor-widgets.css'

// Live Google-style preview of the SEO fields on this tab.
export function BlogSEOPreview() {
  const { metaTitle, metaDescription, title, excerpt, slug, locale } = useFormFields(([fields]) => ({
    metaTitle: fields?.['seo.metaTitle']?.value as string | undefined,
    metaDescription: fields?.['seo.metaDescription']?.value as string | undefined,
    title: fields?.title?.value as string | undefined,
    excerpt: fields?.excerpt?.value as string | undefined,
    slug: fields?.slug?.value as string | undefined,
    locale: fields?.locale?.value as string | undefined,
  }))

  const shownTitle = metaTitle || title || 'Your SEO title appears here'
  const shownDescription = metaDescription || excerpt || 'Your meta description should explain the value of the article in one useful sentence.'
  const path = `${locale === 'ar' ? 'ar › ' : ''}articles › ${slug || 'your-article-slug'}`
  const titleLength = (metaTitle || '').length
  const descriptionLength = (metaDescription || '').length

  return (
    <section className="ct-widget" aria-label="Search result preview">
      <div className="ct-widget__head">
        <span className="ct-widget__icon" aria-hidden>
          <Search size={16} />
        </span>
        <div className="ct-widget__heading">
          <p className="ct-widget__kicker">Search preview</p>
          <h3 className="ct-widget__title">How this article can appear on Google</h3>
          <p className="ct-widget__copy">
            Meta title {titleLength}/60 · meta description {descriptionLength}/155. Empty fields fall back to the title
            and excerpt.
          </p>
        </div>
      </div>
      <div className="ct-serp" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="ct-serp__site">
          <span className="ct-serp__favicon" aria-hidden>
            CT
          </span>
          <span>
            CloudTopia
            <br />
            <span className="ct-serp__url">cloudtopia.net › {path}</span>
          </span>
        </div>
        <div className="ct-serp__title">{shownTitle}</div>
        <div className="ct-serp__desc">{shownDescription}</div>
      </div>
    </section>
  )
}
