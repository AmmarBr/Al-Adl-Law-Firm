import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from "@/components/Providers";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
    title: "Al-Adl Law Firm | مكتب العدل للمحاماة",
    description: "Premium Legal Services in Oman | خدمات قانونية متميزة في عمان",
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'ar'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={direction}>
            <body className={`${inter.variable} ${cairo.variable} font-sans bg-background text-foreground antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <Toaster position="top-center" reverseOrder={false} />
                        {children}
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
