import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Assignments', href: '/assignments' },
    { title: 'Details', href: '/assignments/1' },
]

export default function AssignmentsShow() {
    const entity = { id: 1, title: 'Assignment 1', due_date: '2024-01-15' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assignment Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Title: {entity.title}</div>
                <div className="text-sm">Due Date: {entity.due_date}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="assignments.edit">
                    <Link href={`/assignments/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/assignments" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
