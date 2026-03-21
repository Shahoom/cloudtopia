import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
    slug: string
    lang: 'en' | 'ar' | 'tr'
    title: string
    date: string
    author: string
    tags: string[]
    excerpt: string
    coverImage: string
    readingTime: number
    content: string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>

const postsDirectory = path.join(process.cwd(), 'blog-posts')

export function getPostSlugs(): string[] {
    // We use the English folder as the canonical source for slugs.
    // The system assumes that posts with these slugs exist in all language folders.
    const enPostsDir = path.join(postsDirectory, 'en')
    if (!fs.existsSync(enPostsDir)) return []
    const fileNames = fs.readdirSync(enPostsDir)
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string, lang: string): BlogPost | null {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, lang, `${realSlug}.mdx`)

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug: realSlug,
            lang: data.lang || lang,
            title: data.title || '',
            date: data.date || '',
            author: data.author || '',
            tags: data.tags || [],
            excerpt: data.description || data.excerpt || '',
            coverImage: data.coverImage || '',
            readingTime: data.readingTime || 0,
            content,
        } as BlogPost
    } catch (error) {
        return null
    }
}

export function getAllPosts(lang: string): BlogPostMeta[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, lang))
        .filter((post): post is BlogPost => post !== null)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
        .map((post) => {
            const { content, ...meta } = post
            return meta
        })

    return posts
}

export function getAllTags(lang: string): string[] {
    const posts = getAllPosts(lang)
    const tags = new Set<string>()
    posts.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
}
