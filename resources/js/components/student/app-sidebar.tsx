import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen,BookOpenText, Folder, LayoutGrid,FileQuestion , TrendingUp,CalendarDays ,Inbox , Bell } from 'lucide-react';
import AppLogo from './../app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Courses',
        href: '/student/courses',
        icon: BookOpenText,

    },
    {
        title: 'Exams',
        href: '/student/exams',
        icon: FileQuestion,

    },
    {
        title: 'Grades & Progress',
        href: '/student/grades',
        icon: TrendingUp,
    },
    {
        title: 'Schedule',
        href: '/student/schedule',
        icon: CalendarDays,
    },
    {
        title: 'Messages',
        href: '/student/messages',
        icon: Inbox,
    },
    {
        title: 'Notifications',
        href: '/student/notifications',
        icon: Bell,
    },
];


const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: 'https://rb.gy/1uvmm',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
