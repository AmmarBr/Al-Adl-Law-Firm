"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

type ServiceFormData = {
    _id?: string;
    slug: string;
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    icon?: string;
    order: number;
};

export default function ServiceForm({
    initialData,
    onClose,
    onSuccess
}: {
    initialData?: ServiceFormData | null;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, setValue: setExtraValue, watch } = useForm<ServiceFormData>({
        defaultValues: initialData || {
            order: 0,
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            slug: ""
        }
    });

    const [apiError, setApiError] = useState("");
    const router = useRouter();

    const onSubmit = async (data: ServiceFormData) => {
        setApiError("");
        try {
            const url = '/api/services';
            const method = initialData?._id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
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
            <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-primary-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">
                        {initialData ? "Edit Service" : "Add New Service"}
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
                                {...register("slug", { required: "Slug is required" })}
                                className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            />
                            {errors.slug && <span className="text-xs text-red-500">{errors.slug.message}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Order</label>
                            <input
                                type="number"
                                {...register("order", { valueAsNumber: true })}
                                className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageUpload
                                value={watch("icon")}
                                onChange={(url) => setExtraValue("icon", url)}
                                label="Service Icon/Image"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4 border p-4 rounded-md dark:border-primary-700">
                            <h3 className="font-semibold text-sm text-gray-500">English</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title (EN)</label>
                                <input
                                    {...register("title.en", { required: "English Title is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                                {errors.title?.en && <span className="text-xs text-red-500">{errors.title.en.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description (EN)</label>
                                <textarea
                                    {...register("description.en", { required: "English Description is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-24"
                                />
                                {errors.description?.en && <span className="text-xs text-red-500">{errors.description.en.message}</span>}
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
                                {errors.title?.ar && <span className="text-xs text-red-500">{errors.title.ar.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">الوصف (AR)</label>
                                <textarea
                                    {...register("description.ar", { required: "Arabic Description is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-24"
                                />
                                {errors.description?.ar && <span className="text-xs text-red-500">{errors.description.ar.message}</span>}
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
                            {isSubmitting ? "Saving..." : "Save Service"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
