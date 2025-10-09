import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Live Classes', href: '/live-classes' },
    { title: 'Details', href: '/live-classes/1' },
]

export default function LiveClassesShow() {
    const entity = { id: 1, title: 'Live Class 1', start_time: '2024-01-15 10:00' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Live Class Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Title: {entity.title}</div>
                <div className="text-sm">Start Time: {entity.start_time}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="live_classes.edit">
                    <Link href={`/live-classes/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/live-classes" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
