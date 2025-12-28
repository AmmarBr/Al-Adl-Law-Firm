"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/admin");
        }
    }, [status, router]);

    // Basic translation or hardcoded for now since auth is internal mostly
    // But good to have i18n

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/admin"); // Redirect to admin dashboard on success
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-primary-950">
            <div className="w-full max-w-md p-8 bg-white dark:bg-primary-900 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-primary-900 dark:text-gold-500">Sign In</h1>
                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gold-500 text-white rounded-md hover:bg-gold-600 transition"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-primary-500 hover:text-gold-500 transition">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
