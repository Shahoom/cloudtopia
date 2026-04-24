import React from 'react'
import { Check, X, Crown } from 'lucide-react'

export type ComparisonRow = {
    name: string
    url?: string
    highlight?: boolean
    verdict?: string
    values: Array<string | boolean>
}

type MDXComparisonTableProps = {
    headers: string[]
    rows: ComparisonRow[]
    title?: string
    caption?: string
    topPickLabel?: string
}

/**
 * Comparison table MDX component.
 * First row should be CloudTopia (or whichever option the post recommends)
 * — it gets a "Top pick" badge and gradient highlight.
 */
export default function MDXComparisonTable({
    headers,
    rows,
    title,
    caption,
    topPickLabel = 'Top pick',
}: MDXComparisonTableProps) {
    return (
        <figure className="not-prose my-10">
            {title && (
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                    {title}
                </h3>
            )}

            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm md:text-base">
                    <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                            <th className="px-4 py-3 font-bold text-neutral-900 sticky left-0 bg-neutral-50">
                                {headers[0] || 'Option'}
                            </th>
                            {headers.slice(1).map((h, i) => (
                                <th key={i} className="px-4 py-3 font-bold text-neutral-900 whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => {
                            const isHighlighted = row.highlight ?? ri === 0
                            return (
                                <tr
                                    key={ri}
                                    className={
                                        isHighlighted
                                            ? 'bg-gradient-to-r from-primary-50 via-secondary-50/40 to-transparent border-b border-primary-100'
                                            : 'border-b border-neutral-100 last:border-b-0'
                                    }
                                >
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex items-start gap-2">
                                            {isHighlighted && (
                                                <Crown className="w-4 h-4 text-amber-500 shrink-0 mt-1" strokeWidth={2.25} />
                                            )}
                                            <div>
                                                <div className={`font-semibold ${isHighlighted ? 'text-primary-900' : 'text-neutral-900'}`}>
                                                    {row.url ? (
                                                        <a href={row.url} className="hover:underline">
                                                            {row.name}
                                                        </a>
                                                    ) : (
                                                        row.name
                                                    )}
                                                </div>
                                                {isHighlighted && (
                                                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                                                        {topPickLabel}
                                                    </div>
                                                )}
                                                {row.verdict && (
                                                    <div className="mt-1.5 text-xs text-neutral-500 max-w-xs">
                                                        {row.verdict}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    {row.values.map((v, vi) => (
                                        <td key={vi} className="px-4 py-4 align-top text-neutral-700">
                                            {typeof v === 'boolean' ? (
                                                v ? (
                                                    <Check className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                                                ) : (
                                                    <X className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                                                )
                                            ) : (
                                                v
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {caption && (
                <figcaption className="mt-3 text-xs text-neutral-500 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
