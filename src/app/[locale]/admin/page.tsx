import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import BlogPost from "@/models/BlogPost";
import TeamMember from "@/models/TeamMember";
import ContactMessage from "@/models/ContactMessage";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    await dbConnect();

    const stats = {
        services: await Service.countDocuments(),
        posts: await BlogPost.countDocuments(),
        team: await TeamMember.countDocuments(),
        messages: await ContactMessage.countDocuments(),
        unreadMessages: await ContactMessage.countDocuments({ status: 'new' })
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-primary-900 dark:text-gold-500">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow border-l-4 border-gold-500">
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Services</h3>
                    <p className="text-3xl font-bold mt-2 text-primary-900 dark:text-white">{stats.services}</p>
                </div>
                <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow border-l-4 border-primary-500">
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Blog Posts</h3>
                    <p className="text-3xl font-bold mt-2 text-primary-900 dark:text-white">{stats.posts}</p>
                </div>
                <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Team Members</h3>
                    <p className="text-3xl font-bold mt-2 text-primary-900 dark:text-white">{stats.team}</p>
                </div>
                <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Messages</h3>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold mt-2 text-primary-900 dark:text-white">{stats.messages}</p>
                        {stats.unreadMessages > 0 && (
                            <span className="mb-1 text-sm text-green-600 font-medium">({stats.unreadMessages} new)</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
