import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Programs', href: '/programs' },
    { title: 'Details', href: '/programs/1' },
]

export default function ProgramsShow() {
    const entity = { id: 1, name: 'BSc Computer Science', code: 'BSCS' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program Details" />
            <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {entity.id}</div>
                <div className="text-sm">Name: {entity.name}</div>
                <div className="text-sm">Code: {entity.code}</div>
            </div>
            <div className="mt-4 flex gap-2">
                <PermissionGate anyPermission="programs.edit">
                    <Link href={`/programs/${entity.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </PermissionGate>
                <Link href="/programs" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


