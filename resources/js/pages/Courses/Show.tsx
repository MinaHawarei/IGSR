import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
    { title: 'Details', href: '/courses/1' },
]

export default function CoursesShow() {
    const entity = { id: 1, title: 'Intro to Programming', code: 'CS101' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Title: {entity.title}</div>
                <div className="text-sm">Code: {entity.code}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="courses.edit">
                    <Link href={`/courses/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/courses" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


