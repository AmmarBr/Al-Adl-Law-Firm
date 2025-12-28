"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function PostForm({
    initialData,
    onClose,
    onSuccess
}: {
    initialData?: any;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue: setExtraValue } = useForm<any>({
        defaultValues: initialData ? {
            ...initialData,
            tags: initialData.tags?.join(", ")
        } : {
            slug: "",
            title: { en: "", ar: "" },
            excerpt: { en: "", ar: "" },
            content: { en: "", ar: "" },
            tags: "",
            isPublished: false,
            coverImage: ""
        }
    });

    const [apiError, setApiError] = useState("");
    const router = useRouter();

    // Simple auto-slug from EN title if empty
    const enTitle = watch("title.en");

    const onSubmit = async (data: any) => {
        setApiError("");
        try {
            const processedData = {
                ...data,
                tags: data.tags.split(",").map((l: string) => l.trim()).filter(Boolean),
                slug: data.slug || enTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || Date.now().toString()
            };

            const url = '/api/posts';
            const method = initialData?._id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(processedData),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || "Failed to save");
            }

            onSuccess();
            router.refresh();
            onClose();
        } catch (err: any) {
            setApiError(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-primary-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">
                        {initialData ? "Edit Post" : "Create New Post"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {apiError && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                            {apiError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                            <input
                                {...register("slug")}
                                placeholder="auto-generated-from-title"
                                className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            />
                        </div>
                        <div>
                            <ImageUpload
                                value={watch("coverImage")}
                                onChange={(url) => setExtraValue("coverImage", url)}
                                label="Cover Image"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                            <input
                                {...register("tags")}
                                placeholder="law, corporate, news"
                                className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("isPublished")}
                                    className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                                />
                                <span className="font-medium">Publish Immediately</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4 border p-4 rounded-md dark:border-primary-700">
                            <h3 className="font-semibold text-sm text-gray-500">English</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title (EN)</label>
                                <input
                                    {...register("title.en", { required: "English Title is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Excerpt (EN)</label>
                                <textarea
                                    {...register("excerpt.en")}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Content (EN - HTML/Markdown)</label>
                                <textarea
                                    {...register("content.en", { required: "English Content is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-64 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 border p-4 rounded-md dark:border-primary-700 bg-gray-50 dark:bg-primary-950" dir="rtl">
                            <h3 className="font-semibold text-sm text-gray-500">Arabic</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">العنوان (AR)</label>
                                <input
                                    {...register("title.ar", { required: "Arabic Title is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">مقتطف (AR)</label>
                                <textarea
                                    {...register("excerpt.ar")}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">المحتوى (AR - HTML/Markdown)</label>
                                <textarea
                                    {...register("content.ar", { required: "Arabic Content is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-64 font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition dark:text-gray-300 dark:hover:bg-primary-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-gold-500 text-white rounded-md hover:bg-gold-600 transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
