"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "ar" : "en";
        // Replace the locale in the pathname
        // This assumes the pathname always starts with /en or /ar
        // A robust solution uses next-intl's navigation wrappers, but this is simple for now
        const segments = pathname.split("/");
        segments[1] = nextLocale;
        const nextPath = segments.join("/");

        startTransition(() => {
            router.replace(nextPath);
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500 transition-colors uppercase tracking-wider"
        >
            <span className="text-lg leading-none print:hidden">🌐</span>
            {locale === "en" ? "العربية" : "English"}
        </button>
    );
}
