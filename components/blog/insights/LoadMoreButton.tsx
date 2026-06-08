'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function LoadMoreButton({
  currentPage,
  totalPages,
  href,
}: {
  currentPage: number
  totalPages: number
  href: string
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
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-8 text-sm font-bold text-neutral-700 transition hover:border-primary-400 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  )
}
