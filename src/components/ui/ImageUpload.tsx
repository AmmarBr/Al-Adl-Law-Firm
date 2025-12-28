"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Cover Image" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                onChange(data.url);
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Upload failed: " + data.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-2">{label}</label>

            {value ? (
                <div className="relative aspect-video w-full max-w-xs rounded-lg overflow-hidden border border-gray-200 dark:border-primary-700 bg-gray-100">
                    <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-primary-700 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gold-500 hover:bg-gold-50/5 dark:hover:bg-primary-800/50 transition"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin text-gold-500 mb-2" size={32} />
                    ) : (
                        <div className="bg-primary-100 dark:bg-primary-800 p-3 rounded-full mb-3 text-primary-500 dark:text-gray-400">
                            <Upload size={24} />
                        </div>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {uploading ? "Uploading..." : "Click to upload image"}
                    </span>
                    <span className="text-sm text-gray-400 mt-1">MAX 5MB (JPG, PNG)</span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                    />
                </div>
            )}
        </div>
    );
}
