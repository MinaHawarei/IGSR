import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Grades', href: '/grades' },
    { title: 'Details', href: '/grades/1' },
]

export default function GradesShow() {
    const entity = { id: 1, student: 'Alice Johnson', course: 'CS101', grade: 'A' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Grade Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Student: {entity.student}</div>
                <div className="text-sm">Course: {entity.course}</div>
                <div className="text-sm">Grade: {entity.grade}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="grades.edit">
                    <Link href={`/grades/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/grades" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


