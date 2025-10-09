import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Programs', href: '/programs' },
    { title: 'Create', href: '/programs/create' },
]

export default function ProgramsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Program" />
            <PermissionGate anyPermission="programs.create">
                <EntityModal
                    title="Create Program"
                    open={true}
                    onClose={() => {}}
                    fields={[
                        { key: 'name', label: 'Name' },
                        { key: 'code', label: 'Code' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/programs" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


