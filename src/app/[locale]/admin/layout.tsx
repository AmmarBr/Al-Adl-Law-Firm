import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
        redirect("/auth/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-primary-950">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
