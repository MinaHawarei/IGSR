import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Assignments', href: '/assignments' },
    { title: 'Edit', href: '/assignments/1/edit' },
]

export default function AssignmentsEdit() {
    const entity = { id: 1, title: 'Assignment 1', due_date: '2024-01-15' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Assignment" />
            <PermissionGate anyPermission="assignments.edit">
                <EntityModal
                    title="Edit Assignment"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
                    fields={[
                        { key: 'title', label: 'Title' },
                        { key: 'due_date', label: 'Due Date', type: 'date' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/assignments" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
