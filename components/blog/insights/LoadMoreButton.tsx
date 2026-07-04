'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function LoadMoreButton({
  currentPage,
  totalPages,
  href,
  locale = 'en',
}: {
  currentPage: number
  totalPages: number
  href: string
  locale?: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  if (currentPage >= totalPages) return null

  function handleClick() {
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="ed-eyebrow inline-flex h-11 items-center gap-2 border border-[var(--ed-rule)] bg-transparent px-8 text-[color:var(--ed-graphite)] transition-colors hover:border-[color:var(--ed-accent)] hover:text-[color:var(--ed-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {locale === 'ar' ? 'جارٍ التحميل...' : 'Loading…'}
          </>
        ) : (
          locale === 'ar' ? 'تحميل المزيد' : 'Load More'
        )}
      </button>
    </div>
  )
}
