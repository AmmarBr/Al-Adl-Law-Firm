import { getTranslations } from 'next-intl/server';
import { HelpCircle, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('FAQPage');
    const nav = await getTranslations('Navigation');
    const isAr = locale === 'ar';
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    const faqs = [
        {
            q: { en: "How do I schedule a consultation?", ar: "كيف يمكنني حجز استشارة؟" },
            a: { en: "You can schedule a consultation by using our contact form, calling us directly, or visiting our office during working hours.", ar: "يمكنك حجز استشارة باستخدام نموذج الاتصال الخاص بنا، أو الاتصال بنا مباشرة، أو زيارة مكتبنا خلال ساعات العمل." }
        },
        {
            q: { en: "What areas of law do you specialize in?", ar: "ما هي مجالات القانون التي تتخصصون فيها؟" },
            a: { en: "We specialize in Corporate Law, Real Estate, Family Law, Litigation, and Commercial Arbitration.", ar: "نحن متخصصون في قانون الشركات، العقارات، قانون الأسرة، التقاضي، والتحكيم التجاري." }
        },
        {
            q: { en: "Do you offer online consultations?", ar: "هل تقدمون استشارات عبر الإنترنت؟" },
            a: { en: "Yes, we offer video consultations via Zoom or Microsoft Teams for clients who cannot visit our office.", ar: "نعم، نقدم استشارات فيديو عبر Zoom أو Microsoft Teams للعملاء الذين لا يستطيعون زيارة مكتبنا." }
        },
        {
            q: { en: "What are your fees?", ar: "ما هي أتعابكم؟" },
            a: { en: "Our fees vary depending on the complexity of the case. We offer both hourly rates and fixed fees for specific services. Contact us for a quote.", ar: "تختلف أتعابنا حسب تعقيد القضية. نقدم أسعارًا بالساعة ورسومًا ثابتة لخدمات محددة. اتصل بنا للحصول على عرض سعر." }
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden text-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4">{nav('faq')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {t('heroSubtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQs Grid */}
            <section className="section-padding -mt-10 relative z-20">
                <div className="container-custom max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-primary-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-primary-800 overflow-hidden"
                            >
                                <div className="p-8">
                                    <h3 className="text-xl font-bold mb-4 text-primary-900 dark:text-gold-500 flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 text-gold-600 font-serif">
                                            Q
                                        </div>
                                        {isAr ? faq.q.ar : faq.q.en}
                                    </h3>
                                    <div className="pl-12 pr-12 dark:text-gray-300 text-gray-600 leading-relaxed border-t border-gray-50 dark:border-primary-800 pt-6">
                                        {isAr ? faq.a.ar : faq.a.en}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="section-padding bg-gray-50 dark:bg-primary-900/50">
                <div className="container-custom text-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-6">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary-900 dark:text-white mb-4">
                        {t('supportTitle')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                        {t('supportDesc')}
                    </p>
                    <Link href="/contact" className="btn btn-primary rounded-full px-10 py-4 group">
                        <MessageCircle size={20} className="me-2" />
                        {t('contactBtn')}
                        <Arrow size={18} className="ms-2 group-hover:translate-x-1 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
