import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404 — Page Not Found | CloudTopia',
    description: 'The page you are looking for does not exist.',
    robots: { index: false, follow: false },
}

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-bold text-neutral-200 dark:text-neutral-800 select-none">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">Page not found</h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-md">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-600 transition-colors"
            >
                Go back home
            </Link>
        </div>
    )
}
