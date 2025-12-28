import { getTranslations } from 'next-intl/server';
import { User, ArrowRight, ArrowLeft, Mail, Phone, Linkedin, ExternalLink } from "lucide-react";
import Link from 'next/link';

async function getTeam() {
    try {
        const res = await fetch('http://localhost:3000/api/team', {
            next: { tags: ['team'] },
            cache: 'no-store'
        });

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        return [];
    }
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('TeamPage');
    const nav = await getTranslations('Navigation');
    const team = await getTeam();
    const isAr = locale === 'ar';
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c7377ec486bd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4">{nav('team')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {t('heroSubtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Experts Statement Section */}
            <section className="section-padding -mt-10 relative z-20">
                <div className="container-custom">
                    <div className="bg-white dark:bg-primary-900 rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-100 dark:border-primary-800 flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/3 mb-8 lg:mb-0">
                            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-4">{t('expertsTitle')}</span>
                            <h2 className="text-3xl font-serif font-bold text-primary-900 dark:text-white leading-tight">
                                {t('expertsSubtitle')}
                            </h2>
                        </div>
                        <div className="lg:w-2/3 lg:pl-12 lg:border-l border-gray-100 dark:border-primary-800">
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic">
                                "{t('expertsDesc')}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section-padding pt-10">
                <div className="container-custom">
                    {team.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 dark:bg-primary-900 rounded-3xl border border-dashed border-gray-300 dark:border-primary-800">
                            <p className="text-gray-500">{isAr ? "فريقنا في نمو دائم. يرجى مراجعة الموقع لاحقاً." : "Our team is growing. Check back soon."}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member: any, idx: number) => (
                                <div
                                    key={member._id}
                                    className="group relative bg-white dark:bg-primary-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-primary-800"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Member Image Container */}
                                    <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 dark:bg-primary-950">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={isAr ? member.name.ar : member.name.en}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary-200 dark:text-primary-800">
                                                <User size={100} />
                                            </div>
                                        )}

                                        {/* Overlay on Hover */}
                                        <div className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
                                                    {isAr ? member.bio.ar : member.bio.en}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {member.languages?.map((lang: string) => (
                                                        <span key={lang} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gold-500/20 text-gold-500 rounded border border-gold-500/30">
                                                            {lang}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-3">
                                                    <a href="#" className="text-white hover:text-gold-500 transition-colors"><Linkedin size={18} /></a>
                                                    <a href="#" className="text-white hover:text-gold-500 transition-colors"><Mail size={18} /></a>
                                                </div>
                                                <Link href="/contact" className="text-gold-500 text-xs font-bold flex items-center gap-1 group/btn">
                                                    {t('viewBio')} <Arrow size={12} className="group-hover/btn:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gold-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                        <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-1 group-hover:text-gold-600 transition-colors">
                                            {isAr ? member.name.ar : member.name.en}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest font-bold">
                                            {isAr ? member.role.ar : member.role.en}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Join Section Placeholder */}
            <section className="py-20 bg-gray-50 dark:bg-primary-900/50">
                <div className="container-custom text-center">
                    <h2 className="text-2xl font-serif font-bold dark:text-white mb-4">
                        {isAr ? "هل أنت مهتم بالانضمام إلى فريقنا؟" : "Interested in Joining Our Team?"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        {isAr ? "نحن دائماً نبحث عن المواهب الاستثنائية لتعزيز فريقنا القانوني المتميز." : "We are always looking for exceptional talent to strengthen our elite legal team."}
                    </p>
                    <Link href="/contact" className="btn btn-outline dark:border-primary-800 rounded-full px-8 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                        {isAr ? "تواصل معنا" : "Contact Us"}
                    </Link>
                </div>
            </section>
        </main>
    );
}
