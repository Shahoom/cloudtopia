import type { BlogPost, BlogPostSummary } from '@/lib/blog/data'
import type { TableOfContentsItem } from '@/lib/blog/utils'
import { extractKeyTakeaways } from '@/lib/blog/utils'
import { AuthorBox } from './AuthorBox'
import { BlogCTA } from './BlogCTA'
import { ContentBlockRenderer } from './ContentBlockRenderer'
import { InquiryFormSidebar } from './insights/InquiryFormSidebar'
import { KeyTakeawaysBox } from './insights/KeyTakeawaysBox'
import { PreviousNextPosts } from './PreviousNextPosts'
import { RichTextRenderer } from './RichTextRenderer'
import { ShareButtons } from './ShareButtons'
import { TableOfContents } from './TableOfContents'

function articleCTA(post: BlogPost, locale: string) {
  if (post.ctaTitle || post.ctaDescription) {
    return {
      title: post.ctaTitle || (locale === 'ar' ? 'هل تحتاج إلى موقع ويب، لوحة معلومات، أو نظام أعمال مثل هذا؟' : 'Need a website, dashboard, or business system like this?'),
      text: post.ctaDescription || (locale === 'ar' ? 'كلاود توبيا تساعدك في تحويل فكرتك إلى حل رقمي قابل للتوسع.' : 'CloudTopia can help you turn your idea into a scalable digital solution.'),
      primaryLabel: post.ctaButtonText || (locale === 'ar' ? 'تحدث إلى كلاود توبيا' : 'Talk to CloudTopia'),
    }
  }

  const service = post.serviceFocus || post.category?.slug || ''
  if (service.includes('ai')) {
    return {
      title: locale === 'ar' ? 'تريد استخدام الذكاء الاصطناعي في سير عمل عملك؟' : 'Want to use AI inside your business workflow?',
      text: locale === 'ar'
        ? 'تصمم كلاود توبيا أنظمة عملية مدعومة بالذكاء الاصطناعي تساعد الفرق على تصنيف العملاء المحتملين، وأتمتة الدعم، وتلخيص العمليات، والتحرك بشكل أسرع.'
        : 'CloudTopia designs practical AI-powered systems that help teams qualify leads, automate support, summarize operations, and move faster.',
      primaryLabel: locale === 'ar' ? 'تحدث مع كلاود توبيا حول الذكاء الاصطناعي' : 'Talk AI with CloudTopia',
    }
  }
  if (service.includes('crm') || service.includes('erp') || service.includes('business')) {
    return {
      title: locale === 'ar' ? 'هل تحتاج إلى نظام إدارة علاقات العملاء (CRM) أو نظام تخطيط موارد المؤسسات (ERP) أو لوحة معلومات مخصصة؟' : 'Need a CRM, ERP, or dashboard built around your workflow?',
      text: locale === 'ar'
        ? 'تحول كلاود توبيا جداول البيانات الفوضوية والعمليات اليدوية إلى أنظمة أعمال واضحة يمكن لفريقك استخدامها بالفعل.'
        : 'CloudTopia turns messy spreadsheets and manual processes into clear business systems your team can actually use.',
      primaryLabel: locale === 'ar' ? 'خطط لنظامك الآن' : 'Plan Your System',
    }
  }
  if (service.includes('automation')) {
    return {
      title: locale === 'ar' ? 'هل أنت مستعد لأتمتة عمليات الأعمال المتكررة؟' : 'Ready to automate repetitive business operations?',
      text: locale === 'ar'
        ? 'تساعد كلاود توبيا في ربط أدواتك وبياناتك وسير عمل فريقك بأنظمة أتمتة موثوقة.'
        : 'CloudTopia helps connect your tools, data, and team workflows into reliable automation systems.',
      primaryLabel: locale === 'ar' ? 'استكشف الأتمتة' : 'Explore Automation',
    }
  }
  return {
    title: locale === 'ar' ? 'هل تحتاج إلى موقع ويب، لوحة معلومات، أو نظام أعمال مثل هذا؟' : 'Need a website, dashboard, or business system like this?',
    text: locale === 'ar' ? 'كلاود توبيا تساعدك في تحويل فكرتك إلى حل رقمي قابل للتوسع.' : 'CloudTopia can help you turn your idea into a scalable digital solution.',
    primaryLabel: locale === 'ar' ? 'تحدث إلى كلاود توبيا' : 'Talk to CloudTopia',
  }
}

export function ArticleContent({
  post,
  locale,
  toc,
  canonical,
  relatedPosts = [],
  previous,
  next,
}: {
  post: BlogPost
  locale: string
  toc: TableOfContentsItem[]
  canonical: string
  relatedPosts?: BlogPostSummary[]
  previous?: BlogPostSummary | null
  next?: BlogPostSummary | null
}) {
  const cta = articleCTA(post, locale)
  const takeaways = extractKeyTakeaways(post.contentBlocks)

  return (
    <section className="bg-[#f8f7fb] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[240px_minmax(0,760px)_280px]">
        <TableOfContents items={toc} />
        <article className="min-w-0 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm md:p-10">
          {post.series && (
            <aside className="mb-10 rounded-2xl border border-primary-200 bg-primary-50/70 p-5">
              <p className="text-xs font-black uppercase tracking-normal text-primary-700">
                {locale === 'ar' ? 'جزء من سلسلة أدلة' : 'Part of a guide series'}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-neutral-950">{post.series.title}</h2>
              {post.series.description && (
                <p className="mt-2 text-sm leading-6 text-neutral-700">{post.series.description}</p>
              )}
            </aside>
          )}
          <KeyTakeawaysBox
            title={takeaways.title}
            summary={takeaways.summary}
            items={takeaways.items}
            locale={locale}
          />
          <RichTextRenderer content={post.content} />
          <ContentBlockRenderer blocks={post.contentBlocks} relatedPostLookup={relatedPosts} locale={locale} />
          {post.showCTA && (
            <div className="mt-12">
              <BlogCTA
                locale={locale}
                compact
                title={cta.title}
                text={cta.text}
                primaryLabel={cta.primaryLabel}
                primaryHref={post.ctaButtonUrl || '/contact'}
                secondaryHref={post.secondaryCTAButtonUrl || '/services'}
              />
            </div>
          )}
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="mb-4 text-sm font-black uppercase tracking-normal text-neutral-500">
              {locale === 'ar' ? 'شارك هذا المقال' : 'Share this article'}
            </p>
            <ShareButtons url={canonical} title={post.title} />
          </div>
          <AuthorBox author={post.author} locale={locale} />
          <PreviousNextPosts previous={previous || null} next={next || null} locale={locale} />
        </article>
        <InquiryFormSidebar locale={locale} />
      </div>
    </section>
  )
}
