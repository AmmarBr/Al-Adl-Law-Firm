import { getTranslations } from 'next-intl/server';
import { Scale, ChevronRight, ArrowRight, ArrowLeft, CheckCircle2, Shield, Users, Briefcase, Gavel, FileText, Anchor } from "lucide-react";
import Link from 'next/link';

async function getServices() {
    // Note: In local dev, fetch from the API. In prod, use dbConnect directly if preferred.
    try {
        const res = await fetch('http://localhost:3000/api/services', {
            next: { tags: ['services'] },
            cache: 'no-store'
        });

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        return [];
    }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('ServicesPage');
    const nav = await getTranslations('Navigation');
    const services = await getServices();
    const isAr = locale === 'ar';
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    // Default icon mapping for Lucide icons
    const iconMapTable: Record<string, any> = {
        Scale: Scale,
        ChevronRight: ChevronRight,
        ArrowRight: ArrowRight,
        ArrowLeft: ArrowLeft,
        CheckCircle2: CheckCircle2,
        Shield: Shield,
        Users: Users,
        Briefcase: Briefcase,
        Gavel: Gavel,
        FileText: FileText,
        Anchor: Anchor,
    };

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/images/services-hero-oman.png')] bg-cover bg-center opacity-25 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>
                    
                    {/* Subtle Omani Pattern Overlay */}
                    <div className="absolute inset-0 bg-pattern-oman opacity-10"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4 border-s-4 border-gold-500 ps-4">{nav('services')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {isAr ? "سيادة القانون والتميز العدلي" : "Rule of Law & Legal Excellence"}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {isAr 
                                ? "نقدم استشارات قانونية متوافقة مع المراسيم السلطانية وقوانين سلطنة عمان، مدعومة بخبرة عميقة في الأطر التنظيمية المحلية." 
                                : "Providing legal counsel aligned with Sultani Decrees and Omani legislation, backed by deep expertise in local regulatory frameworks."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid Section with Mashrabiya Pattern */}
            <section className="section-padding -mt-10 relative z-20 bg-pattern-mashrabiya dark:bg-none">
                <div className="container-custom">
                    {services.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 dark:bg-primary-900 rounded-3xl border border-dashed border-gray-300 dark:border-primary-800">
                            <p className="text-gray-500">{isAr ? "لا توجد خدمات حالياً. يرجى مراجعة لوحة التحكم." : "No services found. Add some from the Admin Dashboard."}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service: any, idx: number) => {
                                const IconComponent = service.icon && iconMapTable[service.icon] ? iconMapTable[service.icon] : Scale;
                                const isImagePath = service.icon?.startsWith('/');

                                return (
                                    <div
                                        key={service._id}
                                        className="group relative bg-white dark:bg-primary-900/40 backdrop-blur-sm p-10 rounded-3xl transition-all duration-500 border border-gray-100 dark:border-primary-800/50 hover:border-gold-500/50 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(196,158,80,0.15)] hover:-translate-y-3 overflow-hidden"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Decorative Background Element */}
                                        <div className="absolute -right-16 -top-16 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors duration-500"></div>

                                        <div className="relative z-10">
                                            <div className="w-24 h-24 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-10 group-hover:bg-gold-500 group-hover:text-primary-950 transition-all duration-500 shadow-inner overflow-hidden border border-gold-500/20">
                                                {isImagePath ? (
                                                    <img src={service.icon} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                ) : (
                                                    <IconComponent size={36} strokeWidth={1.5} />
                                                )}
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold mb-5 text-primary-900 dark:text-white group-hover:text-gold-500 transition-colors font-serif tracking-tight">
                                                {isAr ? service.title.ar : service.title.en}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 flex-1 text-lg font-light">
                                                {isAr ? service.description.ar : service.description.en}
                                            </p>

                                            <div className="pt-8 border-t border-gray-100 dark:border-primary-800/50 mt-auto">
                                                <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-gold-600 group/link uppercase tracking-widest">
                                                    {isAr ? "اطلب استشارة" : "Request Consultation"}
                                                    <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                                                        <Arrow size={18} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-x-1" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-gray-50 dark:bg-primary-900/50 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-4">{t('howWeWork')}</span>
                        <h2 className="heading-2 mb-6">{t('processTitle')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {t('processDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[2.75rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>

                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="relative z-10 group text-center lg:text-start">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-primary-950 shadow-xl flex items-center justify-center text-2xl font-bold text-gold-600 mb-8 mx-auto lg:mx-0 ring-4 ring-primary-50 dark:ring-primary-800 transform group-hover:scale-110 transition-transform duration-300">
                                    0{step}
                                </div>
                                <h3 className="text-xl font-bold mb-3 dark:text-white">{(t as any)(`step${step}Title`)}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {(t as any)(`step${step}Desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white dark:bg-primary-950">
                <div className="container-custom">
                    <div className="bg-primary-950 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gold-600/5 mix-blend-overlay"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif text-white">
                                {isAr ? "هل أنت مستعد لمناقشة قضيتك؟" : "Ready to Discuss Your Case?"}
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
                                {isAr ? "تواصل مع خبرائنا القانونيين اليوم للحصول على استشارة مهنية وسرية." : "Connect with our legal experts today for a professional and confidential consultation."}
                            </p>
                            <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-12 group">
                                {isAr ? "حدد موعداً الآن" : "Schedule a Consultation Now"}
                                <Arrow size={18} className="ms-2 group-hover:translate-x-1 group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
