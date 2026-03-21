import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

const getTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (node instanceof Array) return node.map(getTextFromNode).join('')
    if (React.isValidElement(node)) return getTextFromNode(node.props.children)
    return ''
}

const components = {
    h2: (props: any) => {
        const text = getTextFromNode(props.children).trim()
        const id = text.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || ''
        return <h2 id={id} {...props} />
    },
    h3: (props: any) => {
        const text = getTextFromNode(props.children).trim()
        const id = text.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || ''
        return <h3 id={id} {...props} />
    },
    // The rest are handled directly by blog.css targeting standard HTML tags
}

export default function BlogPostBody({ content }: { content: string }) {
    return (
        <div className="blog-prose mx-auto">
            <MDXRemote source={content} components={components} />
        </div>
    )
}
