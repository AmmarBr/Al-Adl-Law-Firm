import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const t = useTranslations("Common");
    const nav = useTranslations("Navigation");
    const locale = useLocale();
    const isAr = locale === "ar";

    const pa = useTranslations("PracticeAreas");

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" },
    ];

    const practiceAreas = [
        { name: pa('corporate'), href: "/services" },
        { name: pa('civil'), href: "/services" },
        { name: pa('criminal'), href: "/services" },
        { name: pa('realEstate'), href: "/services" },
        { name: pa('family'), href: "/services" },
        { name: pa('labor'), href: "/services" },
        { name: pa('administrative'), href: "/services" },
    ];

    return (
        <footer className="bg-primary-950 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container-custom relative z-10 pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gold-500 flex items-center justify-center rounded-lg rotate-0 group-hover:rotate-12 transition-transform duration-300">
                                <Scale className="text-primary-950" size={24} />
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-tight">
                                Al-Adl <span className="text-gold-500">Law</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                            {t('footerDesc')}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div className="space-y-8">
                        <h4 className="text-lg font-bold text-white relative inline-block">
                            {t('practiceAreas')}
                            <span className={`absolute -bottom-2 ${isAr ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gold-500`}></span>
                        </h4>
                        <ul className="space-y-4">
                            {practiceAreas.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="text-gray-400 hover:text-gold-500 transition-colors text-sm flex items-center gap-2 group">
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-lg font-bold text-white relative inline-block">
                            {t('links')}
                            <span className={`absolute -bottom-2 ${isAr ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gold-500`}></span>
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{nav('about')}</Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{nav('team')}</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{nav('blog')}</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{nav('contact')}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-lg font-bold text-white relative inline-block">
                            {t('contactUs')}
                            <span className={`absolute -bottom-2 ${isAr ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gold-500`}></span>
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-primary-950 transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{isAr ? "الموقع" : "Location"}</p>
                                    <p className="text-sm text-gray-300">{t('muscatOman')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-primary-950 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{isAr ? "الهاتف" : "Phone"}</p>
                                    <p className="text-sm text-gray-300 font-mono" dir="ltr">+968 9000 0000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-primary-950 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                                    <p className="text-sm text-gray-300">info@aladl-law.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-500 text-sm">
                        {t('footerText')}
                    </div>
                    <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
                        <Link href="/privacy" className="hover:text-gold-500 transition-colors">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
                        <Link href="/terms" className="hover:text-gold-500 transition-colors">{isAr ? "شروط الخدمة" : "Terms of Service"}</Link>
                    </div>
                    <div className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                        {t('designedBy')}
                    </div>
                </div>
            </div>
        </footer>
    );
}
