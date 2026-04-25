import { getAllPosts } from '@/lib/blog'
import HomePageClient from './HomePageClient'

export default function HomePage({ params }: { params: { locale: string } }) {
    const locale = params.locale || 'en'
    const latestPosts = getAllPosts(locale).slice(0, 3)

    return <HomePageClient blogPosts={latestPosts} />
}
