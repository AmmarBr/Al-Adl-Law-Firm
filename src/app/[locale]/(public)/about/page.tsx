import { getTranslations } from 'next-intl/server';
import { Scale, Target, Eye, Shield, Award, Users, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('AboutPage');
    const c = await getTranslations('Common');
    const isAr = locale === 'ar';

    return (
        <main className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950 to-background"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4">{t('established')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-light">
                            {t('heroSubtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="section-padding bg-white dark:bg-primary-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1932&auto=format&fit=crop"
                                    className="w-full h-full object-cover"
                                    alt="Legal Professionals"
                                />
                            </div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl -z-0"></div>
                            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary-500/5 rounded-full blur-3xl -z-0"></div>

                            {/* Experience Badge */}
                            <div className={`absolute bottom-8 ${isAr ? 'left-8' : 'right-8'} z-20 bg-white dark:bg-primary-900 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-primary-800 animate-bounce-subtle`}>
                                <div className="text-4xl font-bold text-gold-600 mb-1">15+</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-primary-900 dark:text-white">{t('yearsSuccess')}</div>
                            </div>
                        </div>

                        <div className="space-y-8 order-1 lg:order-2">
                            <div>
                                <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">{t('legacyTitle')}</span>
                                <h2 className="heading-2 mb-4">{t('legacySubtitle')}</h2>
                            </div>

                            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                <p>{t('description')}</p>
                                <p>{t('legacyText')}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                                {[
                                    "Licensed in all Omani Courts",
                                    "Multilingual Legal Expertise",
                                    "Dedicated Client Support",
                                    "Proven Track Record"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-sm font-medium dark:text-white">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="section-padding bg-gray-50 dark:bg-primary-900">
                <div className="container-custom text-center max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">{t('foundationTitle')}</span>
                        <h2 className="heading-2">{t('foundationSubtitle')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-primary-800 p-10 rounded-2xl shadow-sm border border-transparent hover:border-gold-500/20 transition-all group scale-100 hover:scale-[1.02]">
                            <div className="w-20 h-20 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                                <Target size={40} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary-900 dark:text-white">{t('mission')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t('missionText')}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-primary-800 p-10 rounded-2xl shadow-sm border border-transparent hover:border-gold-500/20 transition-all group scale-100 hover:scale-[1.02]">
                            <div className="w-20 h-20 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                                <Eye size={40} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary-900 dark:text-white">{t('vision')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t('visionText')}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-primary-800 p-10 rounded-2xl shadow-sm border border-transparent hover:border-gold-500/20 transition-all group scale-100 hover:scale-[1.02]">
                            <div className="w-20 h-20 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                                <Award size={40} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary-900 dark:text-white">{t('valuesTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t('valuesText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Stats Section */}
            <section className="py-24 bg-primary-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-10"></div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x divide-white/10">
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-gold-500">500+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400">{t('casesWon')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-gold-500">100%</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400">{t('satisfaction')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-gold-500">12+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400">{t('expertAttorneys')}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-gold-500">2025</div>
                            <div className="text-sm uppercase tracking-widest text-gray-400">{t('yearFounded')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white dark:bg-primary-950 text-center">
                <div className="container-custom max-w-4xl mx-auto px-6 py-16 rounded-[2rem] bg-gray-50 dark:bg-primary-900 relative shadow-inner overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative z-10">
                        <Scale size={48} className="mx-auto mb-8 text-gold-500" />
                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-primary-950 dark:text-white leading-tight">
                            {t('ctaTitle')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t('ctaSubtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-12 text-lg shadow-gold-500/20 shadow-xl">
                                {t('bookConsultation')}
                            </Link>
                            <Link href="/contact" className="btn btn-outline btn-lg rounded-full px-12 text-lg">
                                {c('contactUs')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

