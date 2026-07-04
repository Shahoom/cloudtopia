import './editorial.css'

// Wraps every /articles route (index, [slug], category, tag, author, search) in
// the editorial theme scope. The .blog-editorial class carries all design tokens
// and prose styles from editorial.css, so nothing leaks into the rest of the site.
// Text direction is already set on <html> by the frontend layout.
export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <div className="blog-editorial">{children}</div>
}
