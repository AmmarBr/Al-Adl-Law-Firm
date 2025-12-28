"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Phone, Calendar } from "lucide-react";

export default function MessagesManager() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact");
            const json = await res.json();
            if (json.success) {
                setMessages(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-primary-900 dark:text-gold-500">Inbox</h1>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-gold-500" size={40} />
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-primary-900 rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No messages found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white dark:bg-primary-900 rounded-lg shadow p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{msg.name}</h3>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1"><Mail size={14} /> {msg.email}</span>
                                {msg.phone && <span className="flex items-center gap-1"><Phone size={14} /> {msg.phone}</span>}
                            </div>
                            {msg.subject && <div className="font-medium mb-1">Subject: {msg.subject}</div>}
                            <div className="bg-gray-50 dark:bg-primary-950 p-3 rounded text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </div>
                            <div className="mt-2 text-right">
                                <span className={`text-xs px-2 py-1 rounded capitalize ${msg.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {msg.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
