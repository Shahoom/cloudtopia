'use client'

import { useEffect } from 'react'

/**
 * Error boundary for the marketing site. Catches render/data failures in any
 * [locale] route (e.g. a transient database error on a CMS-backed page) and
 * offers a retry, instead of bubbling to the framework default. Bilingual copy
 * is derived from the URL prefix since hooks/params aren't available here.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isArabic =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/ar')

  const copy = isArabic
    ? {
        title: 'حدث خطأ ما',
        body: 'واجهنا مشكلة غير متوقعة أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى.',
        retry: 'إعادة المحاولة',
      }
    : {
        title: 'Something went wrong',
        body: 'We hit an unexpected problem loading this page. Please try again.',
        retry: 'Try again',
      }

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{copy.title}</h1>
      <p className="mt-2 max-w-md text-neutral-500 dark:text-neutral-400">{copy.body}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
      >
        {copy.retry}
      </button>
    </div>
  )
}
