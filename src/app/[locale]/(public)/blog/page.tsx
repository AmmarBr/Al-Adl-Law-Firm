import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';

async function getPosts() {
    await dbConnect();
    // Directly query the database for published posts
    // Lean queries are faster and return POJOs
    const posts = await BlogPost.find({ isPublished: true }).sort({ createdAt: -1 }).lean();

    // Convert _id and other non-serializable fields if necessary, 
    // though .lean() helps. Next.js server components can handle simple objects.
    // We map to ensure clean data passage.
    return JSON.parse(JSON.stringify(posts));
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Navigation');
    const posts = await getPosts();
    const isAr = locale === 'ar';

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>

                    {/* Subtle Omani Pattern Overlay */}
                    <div className="absolute inset-0 bg-pattern-oman opacity-20"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4 border-s-4 border-gold-500 ps-4">{t('blog')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {isAr ? "الرؤى القانونية العمانية" : "Omani Legal Insights"}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {isAr
                                ? "تحليلات قانونية معمقة حول المراسيم السلطانية والتطورات التشريعية في السلطنة، يقدمها نخبة من خبرائنا."
                                : "Deep legal analysis of Sultani Decrees and legislative developments in the Sultanate, presented by our elite experts."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section with Mashrabiya Pattern */}
            <section className="section-padding -mt-10 relative z-20 bg-pattern-mashrabiya dark:bg-none">
                <div className="container-custom text-center mb-16 lg:hidden">
                    <h1 className="text-4xl font-bold text-primary-900 dark:text-gold-500 border-b pb-4 border-gold-500 inline-block">
                        {t('blog')}
                    </h1>
                </div>

                <div className="container-custom">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50/50 dark:bg-primary-900/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 dark:border-primary-800">
                            <p className="text-gray-500">{isAr ? "لا توجد مقالات منشورة حالياً." : "No articles published yet."}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any, idx: number) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post._id}
                                    className="group relative flex flex-col bg-white dark:bg-primary-900/40 backdrop-blur-sm rounded-3xl transition-all duration-500 border border-gray-100 dark:border-primary-800/50 overflow-hidden hover:border-gold-500/50 hover:shadow-[0_20px_50px_rgba(196,158,80,0.15)] hover:-translate-y-3"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="aspect-[16/10] bg-gray-100 dark:bg-primary-800 relative overflow-hidden">
                                        {post.coverImage ? (
                                            <img src={post.coverImage} alt={post.title.en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center text-gold-500/20 text-5xl font-serif font-bold group-hover:text-gold-500/30 transition-colors">
                                                AL-ADL
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col relative">
                                        {/* Tag Overlay (Subtle) */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags?.map((tag: string) => (
                                                <span key={tag} className="text-[10px] font-bold text-gold-600 bg-gold-500/5 px-2 py-1 rounded uppercase tracking-widest border border-gold-500/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-primary-900 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-2 leading-snug font-serif">
                                            {isAr ? post.title.ar : post.title.en}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-8 flex-1 leading-relaxed font-light">
                                            {isAr ? post.excerpt.ar : post.excerpt.en}
                                        </p>

                                        <div className="pt-6 border-t border-gray-100 dark:border-primary-800/50 flex justify-between items-center mt-auto">
                                            <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase tracking-tighter">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                                {new Date(post.createdAt).toLocaleDateString(isAr ? 'ar-OM' : 'en-OM', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                            <span className="text-sm font-bold text-gold-600 group-hover:translate-x-1 group-hover:-translate-x-1 transition-transform inline-flex items-center gap-2">
                                                {isAr ? "اقرأ المزيد" : "Read Insight"}
                                                <span className="text-lg">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
