import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'http://localhost:3000'; // Change to production domain
    const languages = ['en', 'ar'];
    const routes = ['', '/about', '/services', '/team', '/blog', '/contact', '/privacy', '/terms', '/faq'];

    // Combine routes with languages
    const sitemapEntries = languages.flatMap((lang) =>
        routes.map((route) => ({
            url: `${baseUrl}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    return sitemapEntries;
}
