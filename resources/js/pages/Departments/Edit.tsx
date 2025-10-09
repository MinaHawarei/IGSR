import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/departments' },
    { title: 'Edit', href: '/departments/1/edit' },
]

export default function DepartmentsEdit() {
    const entity = { id: 1, name: 'Computer Science', code: 'CS' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Department" />
            <PermissionGate anyPermission="departments.edit">
                <EntityModal
                    title="Edit Department"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
                    fields={[
                        { key: 'name', label: 'Name' },
                        { key: 'code', label: 'Code' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/departments" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


