"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export default function SettingsManager() {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const json = await res.json();
                if (json.success) {
                    reset(json.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [reset]);

    const onSubmit = async (data: any) => {
        setSaving(true);
        setMessage("");
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setMessage("Settings saved successfully!");
            } else {
                setMessage("Failed to save settings.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin inline text-gold-500" /></div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-primary-900 dark:text-gold-500">Site Settings</h1>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-primary-900 p-8 rounded-lg shadow">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-bold border-b pb-2 mb-4">Contact Info</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Email</label>
                            <input {...register("contactEmail")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input {...register("contactPhone")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">WhatsApp</label>
                            <input {...register("whatsapp")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold border-b pb-2 mb-4">Social Media</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Facebook URL</label>
                            <input {...register("socialLinks.facebook")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Twitter/X URL</label>
                            <input {...register("socialLinks.twitter")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                            <input {...register("socialLinks.linkedin")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Instagram URL</label>
                            <input {...register("socialLinks.instagram")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Address (EN)</label>
                        <textarea {...register("address.en")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700 h-20" />
                    </div>
                    <div dir="rtl">
                        <label className="block text-sm font-medium mb-1">العنوان (AR)</label>
                        <textarea {...register("address.ar")} className="w-full px-3 py-2 border rounded dark:bg-primary-800 dark:border-primary-700 h-20" />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gold-500 text-white px-6 py-2 rounded hover:bg-gold-600 transition disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
