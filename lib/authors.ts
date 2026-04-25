/**
 * Author profiles for blog E-E-A-T and Person schema.
 *
 * Each author has a bio in three languages and an optional image.
 * Referenced by `authorSlug` in MDX frontmatter, and rendered on
 * `/authors/[slug]` pages.
 */

export type AuthorBio = {
    en: string
    ar: string
    tr: string
}

export type AuthorRole = {
    en: string
    ar: string
    tr: string
}

export type Author = {
    slug: string
    name: string
    role: AuthorRole
    bio: AuthorBio
    image?: string
    knowsAbout?: string[]
    sameAs?: string[]
}

export const authors: Record<string, Author> = {
    'mohamad-shahm': {
        slug: 'mohamad-shahm',
        name: 'Mohamad Shahm',
        role: {
            en: 'Founder & Lead Engineer',
            ar: 'المؤسّس والمهندس الرئيسي',
            tr: 'Kurucu ve Baş Mühendis',
        },
        bio: {
            en: 'Mohamad founded CloudTopia after a decade building web platforms, e-commerce systems, and bilingual (Arabic + English) experiences for Gulf businesses. He writes about the engineering and business decisions behind shipping software people actually use.',
            ar: 'أسّس محمد كلاود توبيا بعد عقدٍ من بناء منصّات الويب وأنظمة التجارة الإلكترونية وتجارب ثنائية اللغة (عربي + إنجليزي) لشركات الخليج. يكتب عن القرارات الهندسية والتجارية خلف تسليم برمجيات يستخدمها الناس فعلاً.',
            tr: 'Mohamad, Körfez işletmeleri için on yıl boyunca web platformları, e-ticaret sistemleri ve iki dilli (Arapça + İngilizce) deneyimler geliştirdikten sonra CloudTopia\'yı kurdu. İnsanların gerçekten kullandığı yazılımları teslim etmenin ardındaki mühendislik ve iş kararları hakkında yazıyor.',
        },
        image: '/images/authors/mohamad-shahm.jpg',
        knowsAbout: [
            'Next.js',
            'TypeScript',
            'Arabic RTL web design',
            'ZATCA e-invoicing',
            'Mada payment integration',
            'Multilingual content strategy',
            'Gulf digital transformation',
        ],
        sameAs: [
            'https://www.linkedin.com/in/mohamad-shahm',
            'https://github.com/Shahoom',
        ],
    },
    'editorial-team': {
        slug: 'editorial-team',
        name: 'CloudTopia Editorial Team',
        role: {
            en: 'Editors',
            ar: 'هيئة التحرير',
            tr: 'Editörler',
        },
        bio: {
            en: 'Posts attributed to the CloudTopia editorial team are collaborative pieces reviewed by our lead engineer and designer before publication. Each piece draws on our live project work across the Gulf, Türkiye, and global clients.',
            ar: 'المقالات المنسوبة إلى هيئة تحرير كلاود توبيا هي أعمال جماعية يراجعها المهندس والمصمّم الرئيسيان قبل النشر. يستند كلّ مقال إلى عملنا الفعلي في مشاريعنا الحيّة عبر الخليج وتركيا وعملاء حول العالم.',
            tr: 'CloudTopia editoryal ekibine atfedilen yazılar, yayınlanmadan önce baş mühendis ve tasarımcımız tarafından incelenen işbirliği parçalarıdır. Her yazı Körfez, Türkiye ve küresel müşterilerimiz genelindeki canlı proje çalışmalarımızdan beslenir.',
        },
        image: '/images/authors/editorial-team.jpg',
        knowsAbout: [
            'Web development',
            'E-commerce',
            'Digital transformation',
            'Content strategy',
        ],
    },
}

export function getAuthor(slug: string): Author | null {
    return authors[slug] || null
}

export function getAllAuthorSlugs(): string[] {
    return Object.keys(authors)
}
