"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Scale, Menu, X, Phone, Mail } from "lucide-react";
import TopBar from "./TopBar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const t = useTranslations("Navigation");
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/about", label: t('about') },
        { href: "/services", label: t('services') },
        { href: "/team", label: t('team') },
        { href: "/blog", label: t('blog') },
    ];

    return (
        <div className="sticky top-0 z-50 w-full">
            <TopBar />
            <header className="border-b bg-white/95 dark:bg-primary-950/95 backdrop-blur-md shadow-sm transition-all duration-300">
                <div className="container-custom h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-50">
                        <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                            <Scale className="h-6 w-6 text-gold-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold font-serif text-primary-950 dark:text-white leading-none">Al-Adl</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-gold-600 font-medium">Law Firm</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-semibold uppercase tracking-wider hover:text-gold-600 transition-colors relative group py-2
                                    ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                                        ? 'text-gold-600'
                                        : 'text-primary-700 dark:text-gray-300'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform origin-left transition-transform duration-300 ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/contact" className="btn btn-primary rounded-full px-6 shadow-gold-500/20 shadow-lg hover:shadow-gold-500/40 transform hover:-translate-y-0.5 transition-all">
                            {t('contact')}
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 p-2 text-primary-900 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-800 rounded-md transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-primary-950/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-2xl font-serif font-bold text-white hover:text-gold-500 transition-colors transform hover:scale-105"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="w-16 h-1 bg-gold-500/20 rounded-full my-4"></div>

                    <div className="flex flex-col items-center gap-6">
                        <LanguageSwitcher />
                        <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-12 text-lg w-full max-w-xs text-center">
                            {t('contact')}
                        </Link>
                    </div>

                    <div className="absolute bottom-10 left-0 w-full flex justify-center gap-8 text-white/50">
                        <Link href="tel:+96812345678" className="hover:text-gold-500 transition-colors"><Phone size={24} /></Link>
                        <Link href="mailto:info@aladl-law.com" className="hover:text-gold-500 transition-colors"><Mail size={24} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
