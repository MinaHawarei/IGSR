import AppLayout from '@/layouts/app-layout'
import { Head, Link, usePage } from '@inertiajs/react'
import { BreadcrumbItem, DashboardProps } from '@/types'
import { useCapabilities, useWidgetAllowed, useCan } from '@/hooks/use-permissions'
import WidgetCard from '@/components/widgets/widget-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Building2, Users, GraduationCap, ClipboardList, SquarePlus, UserIcon, BookOpenIcon, ClipboardCheckIcon, CalendarIcon, MessageSquareIcon, BellIcon } from 'lucide-react'
import { dashboard } from '@/routes'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
]

export default function Dashboard(props: DashboardProps) {
    const {
        totalCourses = 0,
        completedAssignments = 0,
        pendingExams = 0,
        upcomingSchedule = 'No upcoming events',
        messagesCount = 0,
        notificationsCount = 0,
    } = props
    const { permissions } = useCapabilities()
    const page = usePage<{ props: DashboardProps }>()
    const { user } = page.props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                {useWidgetAllowed('departments') && (
                    <WidgetCard title="Departments" description="Manage departments" icon={<Building2 className="h-6 w-6 text-blue-600" />}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">View and organize departments</span>
                            <Link href="/departments" className="text-sm text-blue-600 hover:underline">Open</Link>
                        </div>
                    </WidgetCard>
                )}
                {useWidgetAllowed('programs') && (
                    <WidgetCard title="Programs" description="Manage programs" icon={<GraduationCap className="h-6 w-6 text-emerald-600" />}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Create and update programs</span>
                            <Link href="/programs" className="text-sm text-blue-600 hover:underline">Open</Link>
                        </div>
                    </WidgetCard>
                )}
                {useWidgetAllowed('courses') && (
                    <WidgetCard title="Courses" description="Manage courses" icon={<BookOpen className="h-6 w-6 text-purple-600" />}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Browse and manage courses</span>
                            <Link href="/courses" className="text-sm text-blue-600 hover:underline">Open</Link>
                        </div>
                    </WidgetCard>
                )}
                {useWidgetAllowed('students') && (
                    <WidgetCard title="Students" description="Student directory" icon={<Users className="h-6 w-6 text-teal-600" />}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Find student records</span>
                            <Link href="/students" className="text-sm text-blue-600 hover:underline">Open</Link>
                        </div>
                    </WidgetCard>
                )}
                {useWidgetAllowed('grades') && (
                    <WidgetCard title="Grades" description="Grade management" icon={<ClipboardList className="h-6 w-6 text-amber-600" />}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Enter and review grades</span>
                            <Link href="/grades" className="text-sm text-blue-600 hover:underline">Open</Link>
                        </div>
                    </WidgetCard>
                )}
            </div>
            {useCan('courses.create') && (
                <div className="mt-4">
                    <Link href="/courses/create">
                        <Button>
                            <SquarePlus className="mr-2 h-4 w-4" /> Add Course
                        </Button>
                    </Link>
                </div>
            )}
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
