"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight, ArrowLeft, Clock } from "lucide-react";

export default function ContactPage() {
    const t = useTranslations("ContactPage");
    const nav = useTranslations("Navigation");
    const common = useTranslations("Common");
    const locale = useLocale();
    const isAr = locale === "ar";
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<"success" | "error" | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            status: "new"
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setResult("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setResult("error");
            }
        } catch (err) {
            setResult("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-white dark:bg-primary-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-primary-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay scale-105 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950 to-white dark:to-primary-950"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 text-center mx-auto">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-sm block mb-4">{nav('contact')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
                            {t('heroTitle')}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {t('heroSubtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Information Grid */}
            <section className="section-padding -mt-10 relative z-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Location */}
                        <div className="bg-white dark:bg-primary-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-primary-800 text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-6 group-hover:bg-gold-500 group-hover:text-primary-950 transition-all duration-300">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">{t('officeTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400">123 Sultan Qaboos Street<br />Muscat, Sultanate of Oman</p>
                        </div>

                        {/* Phone/Hours */}
                        <div className="bg-white dark:bg-primary-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-primary-800 text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-6 group-hover:bg-gold-500 group-hover:text-primary-950 transition-all duration-300">
                                <Phone size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">{common('contactUs')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-bold mb-2 font-mono" dir="ltr">+968 9000 0000</p>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Clock size={12} />
                                <span>{t('workingHours')}: Sun-Thu 8am-4pm</span>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white dark:bg-primary-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-primary-800 text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto mb-6 group-hover:bg-gold-500 group-hover:text-primary-950 transition-all duration-300">
                                <Mail size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Email Address</h3>
                            <p className="text-gray-600 dark:text-gray-400">info@aladl-law.com</p>
                            <p className="text-xs text-gray-500 mt-2">support@aladl-law.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content: Form & Map */}
            <section className="section-padding bg-gray-50 dark:bg-primary-900/30">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
                        {/* Map Column */}
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="h-full min-h-[500px] w-full bg-white dark:bg-primary-900 rounded-3xl overflow-hidden shadow-inner relative ring-8 ring-white dark:ring-primary-800">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://maps.google.com/maps?q=Muscat%20Grand%20Mosque&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    title="Office Location"
                                    className="filter grayscale dark:invert-[0.9] dark:hue-rotate-180 contrast-[1.2] opacity-80 hover:opacity-100 transition-opacity duration-700"
                                ></iframe>
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white dark:bg-primary-950/90 backdrop-blur rounded-2xl shadow-2xl border border-gray-100 dark:border-primary-800">
                                    <h4 className="font-bold mb-2 dark:text-white">Al-Adl Headquarters</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Ghubra South, Muscat, Oman</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <div className="bg-white dark:bg-primary-950/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white dark:border-primary-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                                <div className="mb-10">
                                    <h2 className="text-3xl font-serif font-bold text-primary-900 dark:text-white mb-4">{t('formTitle')}</h2>
                                    <p className="text-gray-600 dark:text-gray-400">{t('formDesc')}</p>
                                </div>

                                {result === "success" && (
                                    <div className="mb-8 p-4 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl border border-green-500/20 animate-in fade-in slide-in-from-top-4">
                                        {t('successMsg')}
                                    </div>
                                )}

                                {result === "error" && (
                                    <div className="mb-8 p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl border border-red-500/20">
                                        {t('errorMsg')}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('fullName')}</label>
                                            <input
                                                name="name"
                                                required
                                                className="w-full bg-gray-50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 dark:text-white transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('phone')}</label>
                                            <input
                                                name="phone"
                                                className="w-full bg-gray-50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 dark:text-white transition-all"
                                                placeholder="+968 0000 0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('emailAddress')}</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full bg-gray-50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 dark:text-white transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('subject')}</label>
                                        <input
                                            name="subject"
                                            className="w-full bg-gray-50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 dark:text-white transition-all"
                                            placeholder="Case Inquiry"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('message')}</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={4}
                                            className="w-full bg-gray-50 dark:bg-primary-900/50 border border-gray-200 dark:border-primary-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 dark:text-white transition-all resize-none"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gold-500 hover:bg-gold-600 text-primary-950 font-bold py-5 rounded-2xl shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                                            <span className="text-lg">{loading ? t('sending') : t('sendMessage')}</span>
                                        </button>
                                        <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-wider font-bold">
                                            {t('privacyNotice')}
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
