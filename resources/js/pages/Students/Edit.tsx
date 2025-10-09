import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Students', href: '/students' },
    { title: 'Edit', href: '/students/1/edit' },
]

export default function StudentsEdit() {
    const entity = { id: 1, name: 'Alice Johnson', user_name: 'alice' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Student" />
            <PermissionGate anyPermission="students.edit">
                <EntityModal
                    title="Edit Student"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
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


