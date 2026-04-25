import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

type BlogBreadcrumbProps = {
    locale: string
    items: Crumb[]
    className?: string
}

export default function BlogBreadcrumb({ locale, items, className = '' }: BlogBreadcrumbProps) {
    const isRTL = locale === 'ar'
    const Chevron = isRTL ? ChevronLeft : ChevronRight

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center flex-wrap gap-1.5 text-xs md:text-sm text-neutral-500 ${className}`}
        >
            {items.map((item, i) => {
                const isLast = i === items.length - 1
                return (
                    <span key={i} className="inline-flex items-center gap-1.5">
                        {item.href && !isLast ? (
                            <Link href={item.href} className="hover:text-neutral-900 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? 'text-neutral-900 font-semibold' : ''}>{item.label}</span>
                        )}
                        {!isLast && <Chevron className="w-3.5 h-3.5 text-neutral-400" />}
                    </span>
                )
            })}
        </nav>
    )
}
