"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import ServiceForm from "@/components/admin/ServiceForm";

export default function ServicesManager() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/services");
            const json = await res.json();
            if (json.success) {
                setServices(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            await fetch(`/api/services?id=${id}`, { method: "DELETE" });
            fetchServices();
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const openCreate = () => {
        setEditingService(null);
        setIsFormOpen(true);
    };

    const openEdit = (service: any) => {
        setEditingService(service);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-900 dark:text-gold-500">Manage Services</h1>
                <button
                    onClick={openCreate}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    <span>Add Service</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-gold-500" size={40} />
                </div>
            ) : services.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-primary-900 rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No services found.</p>
                    <button onClick={openCreate} className="mt-4 text-gold-500 hover:underline">Create your first service</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white dark:bg-primary-900 rounded-lg shadow border-l-4 border-gold-500 p-5 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold">{service.title.en}</h3>
                                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">Order: {service.order}</span>
                            </div>
                            <div className="mb-4 text-right" dir="rtl">
                                <h3 className="text-xl font-bold">{service.title.ar}</h3>
                            </div>
                            <div className="mt-auto flex gap-2 justify-end pt-4 border-t border-gray-100 dark:border-primary-800">
                                <button
                                    onClick={() => openEdit(service)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded dark:hover:bg-primary-800"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded dark:hover:bg-primary-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <ServiceForm
                    initialData={editingService}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={fetchServices}
                />
            )}
        </div>
    );
}
