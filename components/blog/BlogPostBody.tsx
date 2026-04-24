import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import MDXFAQ from './MDXFAQ'
import MDXComparisonTable from './MDXComparisonTable'
import MDXCallout from './MDXCallout'
import MDXServiceCTA from './MDXServiceCTA'

const getTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (node instanceof Array) return node.map(getTextFromNode).join('')
    if (React.isValidElement(node)) return getTextFromNode(node.props.children)
    return ''
}

const slugify = (text: string) =>
    text
        .normalize('NFC')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || ''

const components = {
    h2: (props: any) => {
        const text = getTextFromNode(props.children).trim()
        const id = slugify(text)
        return <h2 id={id} {...props} />
    },
    h3: (props: any) => {
        const text = getTextFromNode(props.children).trim()
        const id = slugify(text)
        return <h3 id={id} {...props} />
    },
    FAQ: MDXFAQ,
    Compare: MDXComparisonTable,
    Callout: MDXCallout,
    CTA: MDXServiceCTA,
}

export default function BlogPostBody({ content, locale }: { content: string; locale?: string }) {
    // Inject locale into CTA component defaults via a wrapper
    const boundComponents = {
        ...components,
        CTA: (props: any) => <MDXServiceCTA locale={locale || 'en'} {...props} />,
    }
    return (
        <div className="blog-prose mx-auto">
            <MDXRemote source={content} components={boundComponents} />
        </div>
    )
}
