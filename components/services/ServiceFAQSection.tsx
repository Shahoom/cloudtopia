import { getServiceFAQs } from '@/lib/seo/service-faqs'

/**
 * Visible FAQ section for the service category pages, rendered server-side from
 * the SAME getServiceFAQs() source that buildFAQSchema() reads — so the visible
 * Q&A and the FAQPage JSON-LD can never drift (Google's "match the visible
 * content" rule) and answer engines that strip JSON-LD still find the answers
 * on-page.
 *
 * Uses native <details>/<summary> so it needs zero client JS and stays
 * accessible/expandable without hydration.
 */
export async function ServiceFAQSection({
  slug,
  locale,
}: {
  slug: string
  locale: string
}) {
  const faqs = await getServiceFAQs(slug, locale)
  if (!faqs || faqs.length === 0) return null

  const isArabic = locale === 'ar'
  const heading = isArabic ? 'الأسئلة الشائعة' : 'Frequently asked questions'

  return (
    <section
      aria-labelledby="service-faq-heading"
      dir={isArabic ? 'rtl' : 'ltr'}
      className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20"
    >
      <h2
        id="service-faq-heading"
        className="mb-8 text-2xl font-bold text-neutral-900 md:text-3xl"
      >
        {heading}
      </h2>
      <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
        {faqs.map((faq, index) => (
          <details key={index} className="group px-5 py-4 [&_summary]:list-none">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-neutral-900 md:text-lg">
              <span>{faq.q}</span>
              <span
                aria-hidden="true"
                className="text-primary-600 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
