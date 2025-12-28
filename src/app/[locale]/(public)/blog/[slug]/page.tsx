import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
    // Fetch all and filter (inefficient for real app, okay for v1) or add findBySlug endpoint
    // Using find endpoint would be better if we had it, but list is easy.
    // Actually, let's just fetch list and find. Correct for MVP.
    const res = await fetch('http://localhost:3000/api/posts', {
        next: { tags: ['posts'] },
        cache: 'no-store'
    });

    if (!res.ok) return null;
    const json = await res.json();
    const posts = json.data || [];
    return posts.find((p: any) => p.slug === slug);
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const post = await getPost(slug);
    const isAr = locale === 'ar';

    if (!post || !post.isPublished) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <div className="flex justify-center gap-2 mb-4">
                    {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-sm font-bold text-gold-600 uppercase tracking-wide">#{tag}</span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary-900 dark:text-gold-500 leading-tight">
                    {isAr ? post.title.ar : post.title.en}
                </h1>
                <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString(isAr ? 'ar-OM' : 'en-US', { dateStyle: 'long' })}
                </p>
            </div>

            {post.coverImage && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-2xl aspect-video relative">
                    <img src={post.coverImage} alt={post.title.en} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="prose dark:prose-invert prose-lg max-w-none mx-auto bg-white dark:bg-primary-900/50 p-8 rounded-lg shadow-sm">
                {isAr ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content.ar }} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: post.content.en }} />
                )}
            </div>
        </div>
    );
}
