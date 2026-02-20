import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cloudtopia.net'

    const routes = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/website-design', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/content-creation', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/social-media-marketing', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/ecommerce-solutions', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/restaurant-qr-menu', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/business-systems-development', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/web-applications', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/labs', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    ]

    return routes.map((route) => {
        // Handle the root path '/' correctly
        const pathSuffix = route.path === '/' ? '' : route.path;

        return {
            url: `${baseUrl}/en${pathSuffix}`,   // Primary URL should point to a 200 OK route, not a redirect
            lastModified: new Date(),
            changeFrequency: route.changeFrequency,
            priority: route.priority,
            alternates: {
                languages: {
                    en: `${baseUrl}/en${pathSuffix}`,  // Explicit English URL
                    ar: `${baseUrl}/ar${pathSuffix}`,  // Explicit Arabic URL
                },
            },
        };
    })
}
