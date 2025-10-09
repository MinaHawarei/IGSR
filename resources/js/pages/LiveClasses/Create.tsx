import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Live Classes', href: '/live-classes' },
    { title: 'Create', href: '/live-classes/create' },
]

export default function LiveClassesCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Live Class" />
            <PermissionGate anyPermission="live_classes.create">
                <EntityModal
                    title="Create Live Class"
                    open={true}
                    onClose={() => {}}
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
