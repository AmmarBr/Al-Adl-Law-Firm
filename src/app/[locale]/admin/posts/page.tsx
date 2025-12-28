"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, FileText, CheckCircle, XCircle } from "lucide-react";
import PostForm from "@/components/admin/PostForm";

export default function PostsManager() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts");
            const json = await res.json();
            if (json.success) {
                setPosts(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
            fetchPosts();
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const openCreate = () => {
        setEditingPost(null);
        setIsFormOpen(true);
    };

    const openEdit = (post: any) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-900 dark:text-gold-500">Manage Blog Posts</h1>
                <button
                    onClick={openCreate}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    <span>Write New Post</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-gold-500" size={40} />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-primary-900 rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No blog posts found.</p>
                    <button onClick={openCreate} className="mt-4 text-gold-500 hover:underline">Write your first article</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white dark:bg-primary-900 rounded-lg shadow p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{post.title.en}</h3>
                                    {post.isPublished ? (
                                        <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                            <CheckCircle size={12} className="mr-1" /> Published
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                            <XCircle size={12} className="mr-1" /> Draft
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 truncate max-w-xl">{post.excerpt.en || "No excerpt"}</p>
                                <div className="text-sm text-gray-400 mt-1" dir="rtl">{post.title.ar}</div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(post)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded dark:hover:bg-primary-800"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded dark:hover:bg-primary-800"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <PostForm
                    initialData={editingPost}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={fetchPosts}
                />
            )}
        </div>
    );
}
