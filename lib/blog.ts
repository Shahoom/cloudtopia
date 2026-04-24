import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
    id: string
    slug: string
    lang: 'en' | 'ar' | 'tr'
    title: string
    date: string
    updated?: string
    author: string
    authorSlug?: string
    authorRole?: string
    authorBio?: string
    authorImage?: string
    tags: string[]
    category?: string
    excerpt: string
    coverImage: string
    readingTime: number
    content: string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>

const postsDirectory = path.join(process.cwd(), 'blog-posts')

/**
 * Returns slugs for a given language.
 */
export function getPostSlugs(lang: string = 'en'): string[] {
    const langDir = path.join(postsDirectory, lang)
    if (!fs.existsSync(langDir)) return []
    const fileNames = fs.readdirSync(langDir)
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

/**
 * Gets a post by its local slug and language.
 */
export function getPostBySlug(slug: string, lang: string): BlogPost | null {
    const realSlug = decodeURIComponent(slug).replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, lang, `${realSlug}.mdx`)

    try {
        if (!fs.existsSync(fullPath)) return null;
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            id: data.id || realSlug,
            slug: realSlug,
            lang: (data.lang || lang) as any,
            title: data.title || '',
            date: data.date || '',
            updated: data.updated || undefined,
            author: data.author || '',
            authorSlug: data.authorSlug || undefined,
            authorRole: data.authorRole || undefined,
            authorBio: data.authorBio || undefined,
            authorImage: data.authorImage || undefined,
            tags: data.tags || [],
            category: data.category || undefined,
            excerpt: data.description || data.excerpt || '',
            coverImage: data.coverImage || '',
            readingTime: data.readingTime || 0,
            content,
        } as BlogPost
    } catch (error) {
        return null
    }
}

/**
 * Gets all posts for a given language.
 */
export function getAllPosts(lang: string): BlogPostMeta[] {
    const slugs = getPostSlugs(lang)
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

/**
 * Gets all tags for a given language.
 */
export function getAllTags(lang: string): string[] {
    const posts = getAllPosts(lang)
    const tags = new Set<string>()
    posts.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
}

/**
 * Finds the local slug for a post in another language using its canonical ID.
 */
export function getSlugById(id: string, lang: string): string | null {
    const posts = getAllPosts(lang);
    const post = posts.find(p => p.id === id);
    return post ? post.slug : null;
}
