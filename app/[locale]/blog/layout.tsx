import ReadingProgress from '@/components/blog/ReadingProgress'
import './blog.css'

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ReadingProgress />
            {children}
        </>
    )
}
