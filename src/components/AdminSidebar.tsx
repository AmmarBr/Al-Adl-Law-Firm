"use client";

import Link from "next/link";
import { LayoutDashboard, Users, FileText, Settings, Briefcase, LogOut, MessageSquare } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-primary-900 text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-primary-800">
                <h2 className="text-xl font-bold text-gold-500">Admin Dashboard</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <LayoutDashboard size={20} />
                    <span>Overview</span>
                </Link>
                <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <Briefcase size={20} />
                    <span>Services</span>
                </Link>
                <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <Users size={20} />
                    <span>Team</span>
                </Link>
                <Link href="/admin/posts" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <FileText size={20} />
                    <span>Blog Posts</span>
                </Link>
                <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <MessageSquare size={20} />
                    <span>Messages</span>
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-primary-800 text-primary-100">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-primary-800">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-red-900/50 text-red-200 transition"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
