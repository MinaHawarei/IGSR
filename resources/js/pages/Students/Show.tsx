import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Students', href: '/students' },
    { title: 'Details', href: '/students/1' },
]

export default function StudentsShow() {
    const entity = { id: 1, name: 'Alice Johnson', user_name: 'alice' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Name: {entity.name}</div>
                <div className="text-sm">Username: {entity.user_name}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="students.edit">
                    <Link href={`/students/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/students" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


