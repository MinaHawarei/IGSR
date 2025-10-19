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
import {
  BookOpen,
  Folder,
  LayoutGrid,
  GraduationCap,
  Users,
  FileText,
  ClipboardList,
  PenTool,
  Video,
   } from 'lucide-react';
import { useCapabilities } from '@/hooks/use-permissions';
import AppLogo from './app-logo';

const staticItems: (NavItem & { perm?: string | null })[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid, perm: null },
    { title: 'Departments', href: '/departments', icon: Folder, perm: 'departments.view' },
    { title: 'Programs', href: '/programs', icon: GraduationCap, perm: 'programs.view' },
    { title: 'Courses', href: '/courses', icon: BookOpen, perm: 'courses.view' },
    { title: 'Courses Dashboard', href: '/courses-dashboard', icon: BookOpen, perm: 'courses.update' },
    { title: 'Enrollments', href: '/enrollments', icon: Users, perm: 'enrollments.view' },
    { title: 'Students', href: '/students', icon: Users, perm: 'students.view' },
    { title: 'Grades', href: '/grades', icon: ClipboardList, perm: 'grades.view' },
    { title: 'Lessons', href: '/lessons', icon: FileText, perm: 'lessons.view' },
    { title: 'Assignments', href: '/assignments', icon: PenTool, perm: 'assignments.view' },
    { title: 'Exams', href: '/exams', icon: PenTool, perm: 'exams.view' },
    { title: 'Live Classes', href: '/live-classes', icon: Video, perm: 'live_classes.view' },
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
    const hasCoursesDashboard =
        staticItems.find(i => i.title === 'Courses Dashboard' && (!i.perm || permissions.includes(i.perm))) !== undefined;


    const mainNavItems: NavItem[] = staticItems
         .filter(item => {
            // فلترة حسب الصلاحيات
            if (item.perm && !permissions.includes(item.perm)) return false;

            // 🔒 لو المستخدم عنده Dashboard → اخفي Courses
            if (hasCoursesDashboard && item.title === 'Courses') return false;

            return true;
            })

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
