import { getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('TermsOfService');
    const isAr = locale === 'ar';

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520110120185-609daeb810c6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
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

            {/* Terms Content */}
            <section className="section-padding -mt-10 relative z-20">
                <div className="container-custom max-w-4xl">
                    <div className="bg-white dark:bg-primary-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-primary-800/50">
                        <article className="prose dark:prose-invert max-w-none prose-gold prose-headings:font-serif prose-headings:text-primary-900 dark:prose-headings:text-gold-500">
                            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light mb-12 italic border-s-4 border-gold-500 ps-6">
                                {t('introduction')}
                            </p>

                            <div className="grid gap-12">
                                {[
                                    { id: 'use', icon: '⚖️' },
                                    { id: 'ip', icon: '🖋️' },
                                    { id: 'liability', icon: '⚠️' },
                                    { id: 'jurisdiction', icon: '🏛️' }
                                ].map((section) => (
                                    <div key={section.id} className="group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl">{section.icon}</span>
                                            <h2 className="m-0 text-2xl font-bold">{t(`${section.id}Title`)}</h2>
                                        </div>
                                        <div className="ps-10">
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-light">
                                                {t(`${section.id}Text`)}
                                            </p>
                                        </div>
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
