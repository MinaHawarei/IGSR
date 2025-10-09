import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Dashboard capabilities from backend
export interface Capabilities {
    roles: string[];
    permissions: string[];
    widgets: string[];
}

export interface DashboardUser {
    id: number;
    name: string;
    user_name: string;
}

export interface DashboardProps {
    user: DashboardUser;
    capabilities: Capabilities;
    totalCourses?: number;
    completedAssignments?: number;
    pendingExams?: number;
    upcomingSchedule?: string;
    messagesCount?: number;
    notificationsCount?: number;
}

// Extend global Inertia Page props shape used in hooks
declare global {
    interface Window {
        // allow ziggy/wayfinder etc.
        route?: any;
    }
}
