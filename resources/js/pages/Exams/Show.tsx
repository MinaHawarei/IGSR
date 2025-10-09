import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Exams', href: '/exams' },
    { title: 'Details', href: '/exams/1' },
]

export default function ExamsShow() {
    const entity = { id: 1, title: 'Midterm Exam', date: '2024-02-15' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exam Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Title: {entity.title}</div>
                <div className="text-sm">Date: {entity.date}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="exams.edit">
                    <Link href={`/exams/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/exams" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
