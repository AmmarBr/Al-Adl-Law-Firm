"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, User } from "lucide-react";
import TeamForm from "@/components/admin/TeamForm";
import Image from "next/image";

export default function TeamManager() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/team");
            const json = await res.json();
            if (json.success) {
                setTeam(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch team", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;

        try {
            await fetch(`/api/team?id=${id}`, { method: "DELETE" });
            fetchTeam();
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const openCreate = () => {
        setEditingMember(null);
        setIsFormOpen(true);
    };

    const openEdit = (member: any) => {
        setEditingMember(member);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-900 dark:text-gold-500">Manage Team</h1>
                <button
                    onClick={openCreate}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    <span>Add Member</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-gold-500" size={40} />
                </div>
            ) : team.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-primary-900 rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No team members found.</p>
                    <button onClick={openCreate} className="mt-4 text-gold-500 hover:underline">Add your first lawyer</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member) => (
                        <div key={member._id} className="bg-white dark:bg-primary-900 rounded-lg shadow border-t-4 border-gold-500 p-5 flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 relative">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name.en} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="start absolute inset-0 m-auto text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{member.name.en}</h3>
                                    <p className="text-sm text-gold-600">{member.role.en}</p>
                                </div>
                            </div>

                            <div className="mb-4 text-right pt-2 border-t border-gray-100 dark:border-primary-800" dir="rtl">
                                <h3 className="font-bold">{member.name.ar}</h3>
                                <p className="text-sm text-gold-600">{member.role.ar}</p>
                            </div>

                            <div className="mt-auto flex gap-2 justify-end pt-4 border-t border-gray-100 dark:border-primary-800">
                                <button
                                    onClick={() => openEdit(member)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded dark:hover:bg-primary-800"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(member._id)}
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
                <TeamForm
                    initialData={editingMember}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={fetchTeam}
                />
            )}
        </div>
    );
}
