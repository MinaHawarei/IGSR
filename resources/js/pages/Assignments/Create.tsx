import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Assignments', href: '/assignments' },
    { title: 'Create', href: '/assignments/create' },
]

export default function AssignmentsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Assignment" />
            <PermissionGate anyPermission="assignments.create">
                <EntityModal
                    title="Create Assignment"
                    open={true}
                    onClose={() => {}}
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
