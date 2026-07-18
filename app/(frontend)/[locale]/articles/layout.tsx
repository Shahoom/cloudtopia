import './editorial.css'
import { Fraunces, Amiri } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  weight: ['400', '700'],
  display: 'swap',
})

// Wraps every /articles route (index, [slug], category, tag, author, search) in
// the editorial theme scope. The .blog-editorial class carries all design tokens
// and prose styles from editorial.css, so nothing leaks into the rest of the site.
// Text direction is already set on <html> by the frontend layout.
export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`blog-editorial ${fraunces.variable} ${amiri.variable}`}>{children}</div>
}
