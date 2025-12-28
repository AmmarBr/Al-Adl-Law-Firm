import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('PrivacyPolicy');
    const nav = await getTranslations('Navigation');
    const isAr = locale === 'ar';

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>
                    <div className="absolute inset-0 bg-pattern-oman opacity-20"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                        {t('title')}
                    </h1>
                    <p className="text-gold-500 uppercase tracking-widest text-sm font-bold">
                        {t('lastUpdated')}
                    </p>
                </div>
            </section>

            {/* Policy Content */}
            <section className="section-padding -mt-10 relative z-20">
                <div className="container-custom max-w-4xl">
                    <div className="bg-white dark:bg-primary-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-primary-800/50">
                        <article className="prose dark:prose-invert max-w-none prose-gold prose-headings:font-serif prose-headings:text-primary-900 dark:prose-headings:text-gold-500">
                            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light mb-12">
                                {t('introduction')}
                            </p>

                            <div className="grid gap-12">
                                {[
                                    { id: 'collection', icon: '📋' },
                                    { id: 'usage', icon: '⚖️' },
                                    { id: 'security', icon: '🛡️' },
                                    { id: 'rights', icon: '👤' }
                                ].map((section) => (
                                    <div key={section.id} className="relative ps-8 border-s-2 border-gold-500/20">
                                        <div className="absolute -start-4 top-0 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-sm shadow-lg shadow-gold-500/20">
                                            {section.icon}
                                        </div>
                                        <h2 className="mt-0 mb-4">{t(`${section.id}Title`)}</h2>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {t(`${section.id}Text`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
