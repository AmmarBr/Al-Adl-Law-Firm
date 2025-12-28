"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

type TeamFormData = {
    _id?: string;
    name: { en: string; ar: string };
    role: { en: string; ar: string };
    bio: { en: string; ar: string };
    languages: string[];  // handled as comma separated string in form
    image: string;
    order: number;
};

export default function TeamForm({
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
            languages: initialData.languages?.join(", ") // Convert array to string for input
        } : {
            order: 0,
            name: { en: "", ar: "" },
            role: { en: "", ar: "" },
            bio: { en: "", ar: "" },
            languages: "",
            image: ""
        }
    });

    const [apiError, setApiError] = useState("");
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setApiError("");
        try {
            // Process languages back to array
            const processedData = {
                ...data,
                languages: data.languages.split(",").map((l: string) => l.trim()).filter(Boolean)
            };

            const url = '/api/team';
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
            <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-primary-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">
                        {initialData ? "Edit Team Member" : "Add Team Member"}
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
                            <ImageUpload
                                value={watch("image")}
                                onChange={(url) => setExtraValue("image", url)}
                                label="Profile Image"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Order</label>
                            <input
                                type="number"
                                {...register("order", { valueAsNumber: true })}
                                className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Languages (comma separated)</label>
                        <input
                            {...register("languages")}
                            placeholder="e.g. Arabic, English, French"
                            className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4 border p-4 rounded-md dark:border-primary-700">
                            <h3 className="font-semibold text-sm text-gray-500">English</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Name (EN)</label>
                                <input
                                    {...register("name.en", { required: "English Name is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role (EN)</label>
                                <input
                                    {...register("role.en", { required: "English Role is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio (EN)</label>
                                <textarea
                                    {...register("bio.en")}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-24"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 border p-4 rounded-md dark:border-primary-700 bg-gray-50 dark:bg-primary-950" dir="rtl">
                            <h3 className="font-semibold text-sm text-gray-500">Arabic</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">الاسم (AR)</label>
                                <input
                                    {...register("name.ar", { required: "Arabic Name is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">الدور (AR)</label>
                                <input
                                    {...register("role.ar", { required: "Arabic Role is required" })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">نبذة (AR)</label>
                                <textarea
                                    {...register("bio.ar")}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-primary-800 dark:border-primary-700 h-24"
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
                            {isSubmitting ? "Saving..." : "Save Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
