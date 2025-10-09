import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Live Classes', href: '/live-classes' },
    { title: 'Edit', href: '/live-classes/1/edit' },
]

export default function LiveClassesEdit() {
    const entity = { id: 1, title: 'Live Class 1', start_time: '2024-01-15T10:00' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Live Class" />
            <PermissionGate anyPermission="live_classes.edit">
                <EntityModal
                    title="Edit Live Class"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
                    fields={[
                        { key: 'title', label: 'Title' },
                        { key: 'start_time', label: 'Start Time', type: 'datetime-local' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/live-classes" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
