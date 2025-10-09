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
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import { useCapabilities } from '@/hooks/use-permissions';
import AppLogo from './app-logo';

const staticItems: (NavItem & { perm?: string | null })[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid, perm: null },
    { title: 'Departments', href: '/departments', icon: null, perm: 'departments.view' },
    { title: 'Programs', href: '/programs', icon: null, perm: 'programs.view' },
    { title: 'Courses', href: '/courses', icon: null, perm: 'courses.view' },
    { title: 'Enrollments', href: '/enrollments', icon: null, perm: 'enrollments.view' },
    { title: 'Students', href: '/students', icon: null, perm: 'students.view' },
    { title: 'Grades', href: '/grades', icon: null, perm: 'grades.view' },
    { title: 'Lessons', href: '/lessons', icon: null, perm: 'lessons.view' },
    { title: 'Assignments', href: '/assignments', icon: null, perm: 'assignments.view' },
    { title: 'Exams', href: '/exams', icon: null, perm: 'exams.view' },
    { title: 'Live Classes', href: '/live-classes', icon: null, perm: 'live_classes.view' },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { permissions } = useCapabilities();
    const mainNavItems: NavItem[] = staticItems
        .filter(item => !item.perm || permissions.includes(item.perm))
        .map(({ perm: _perm, ...rest }) => rest);
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
