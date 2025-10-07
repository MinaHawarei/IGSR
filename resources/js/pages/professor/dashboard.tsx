import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UserIcon, BookOpenIcon, ClipboardCheckIcon, CalendarIcon, MessageSquareIcon, BellIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Professor Dashboard', href: dashboard().url },
];

interface DashboardProps {
    totalCourses: number;
    completedAssignments: number;
    pendingExams: number;
    upcomingSchedule: string;
    messagesCount: number;
    notificationsCount: number;
}

export default function Dashboard({
    totalCourses,
    completedAssignments,
    pendingExams,
    upcomingSchedule,
    messagesCount,
    notificationsCount,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Top Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <UserIcon className="h-10 w-10 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Total Courses</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{totalCourses}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <BookOpenIcon className="h-10 w-10 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Completed Assignments</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{completedAssignments}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <ClipboardCheckIcon className="h-10 w-10 text-yellow-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Pending Exams</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{pendingExams}</p>
                        </div>
                    </div>
                </div>

                {/* Secondary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <CalendarIcon className="h-10 w-10 text-purple-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Upcoming Schedule</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{upcomingSchedule}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <MessageSquareIcon className="h-10 w-10 text-pink-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">New Messages</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{messagesCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                        <BellIcon className="h-10 w-10 text-red-600" />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">Notifications</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{notificationsCount}</p>
                        </div>
                    </div>
                </div>

                {/* Main Section */}
                <div className="relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-4 dark:bg-gray-800 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Schedule Overview</h2>
                    <p className="text-gray-500 dark:text-gray-300">Your upcoming classes, assignments, and exams will be displayed here.</p>
                </div>
            </div>
        </AppLayout>
    );
}
