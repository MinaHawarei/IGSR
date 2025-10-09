import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Students', href: '/students' },
    { title: 'Create', href: '/students/create' },
]

export default function StudentsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />
            <PermissionGate anyPermission="students.create">
                <EntityModal
                    title="Create Student"
                    open={true}
                    onClose={() => {}}
                    fields={[
                        { key: 'name', label: 'Name' },
                        { key: 'user_name', label: 'Username' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/students" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


