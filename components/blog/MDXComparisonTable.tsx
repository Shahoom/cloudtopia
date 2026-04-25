import React from 'react'
import { Check, X, Crown } from 'lucide-react'

/**
 * Children-based comparison table.
 * Usage in MDX:
 *   <Compare headers="Option | Upfront | Monthly | Own code | Best for" caption="…">
 *     <Row name="CloudTopia" url="/business-systems-development" verdict="Top pick blurb" topPick>
 *       From $3,999 | Hosting only | ✓ | Mid-market
 *     </Row>
 *     <Row name="Alt vendor">$2,000 | $300/mo | ✗ | No-eng teams</Row>
 *   </Compare>
 *
 * `headers` and the <Row> cell body are pipe-separated — MDX passes strings
 * through reliably even when JSX array expressions get mangled.
 */

type RowProps = {
    name?: string
    url?: string
    verdict?: string
    topPick?: boolean | string
    children?: React.ReactNode
}

const getTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (node instanceof Array) return node.map(getTextFromNode).join('')
    if (React.isValidElement(node)) return getTextFromNode(node.props.children)
    return ''
}

const splitPipes = (s: string) =>
    s.split('|').map((c) => c.trim()).filter((c) => c.length > 0)

const renderCell = (raw: string, idx: number) => {
    if (raw === '✓' || raw === 'true' || raw === 'yes') {
        return <Check key={idx} className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
    }
    if (raw === '✗' || raw === 'false' || raw === 'no') {
        return <X key={idx} className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
    }
    return raw
}

export function Row(_props: RowProps) {
    // Intentional: Row is consumed by the parent <Compare>. Never rendered directly.
    return null
}

type CompareProps = {
    headers?: string
    caption?: string
    title?: string
    topPickLabel?: string
    children?: React.ReactNode
}

export default function MDXComparisonTable({
    headers = '',
    caption,
    title,
    topPickLabel = 'Top pick',
    children,
}: CompareProps) {
    const headerCells = splitPipes(headers)
    if (headerCells.length === 0) return null

    // Pull <Row> children out
    const rowElements = React.Children.toArray(children).filter(
        (c): c is React.ReactElement => React.isValidElement(c)
    )

    const rows = rowElements
        .map((el) => {
            const props = (el.props || {}) as RowProps
            const rawText = getTextFromNode(props.children)
            const cells = splitPipes(rawText)
            return {
                name: props.name || '',
                url: props.url,
                verdict: props.verdict,
                topPick: props.topPick !== undefined && props.topPick !== false,
                cells,
            }
        })
        .filter((r) => r.name)

    if (rows.length === 0) return null

    return (
        <figure className="not-prose my-10">
            {title && (
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">{title}</h3>
            )}

            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm md:text-base">
                    <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                            <th className="px-4 py-3 font-bold text-neutral-900 sticky left-0 bg-neutral-50">
                                {headerCells[0] || 'Option'}
                            </th>
                            {headerCells.slice(1).map((h, i) => (
                                <th key={i} className="px-4 py-3 font-bold text-neutral-900 whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => {
                            const isTop = row.topPick || ri === 0
                            return (
                                <tr
                                    key={ri}
                                    className={
                                        isTop
                                            ? 'bg-gradient-to-r from-primary-50 via-secondary-50/40 to-transparent border-b border-primary-100'
                                            : 'border-b border-neutral-100 last:border-b-0'
                                    }
                                >
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex items-start gap-2">
                                            {isTop && (
                                                <Crown className="w-4 h-4 text-amber-500 shrink-0 mt-1" strokeWidth={2.25} />
                                            )}
                                            <div>
                                                <div className={`font-semibold ${isTop ? 'text-primary-900' : 'text-neutral-900'}`}>
                                                    {row.url ? (
                                                        <a href={row.url} className="hover:underline">
                                                            {row.name}
                                                        </a>
                                                    ) : (
                                                        row.name
                                                    )}
                                                </div>
                                                {isTop && (
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
                                    {row.cells.map((c, ci) => (
                                        <td key={ci} className="px-4 py-4 align-top text-neutral-700">
                                            {renderCell(c, ci)}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {caption && (
                <figcaption className="mt-3 text-xs text-neutral-500 italic">{caption}</figcaption>
            )}
        </figure>
    )
}
