import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Programs', href: '/programs' },
    { title: 'Edit', href: '/programs/1/edit' },
]

export default function ProgramsEdit() {
    const entity = { id: 1, name: 'BSc Computer Science', code: 'BSCS' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Program" />
            <PermissionGate anyPermission="programs.edit">
                <EntityModal
                    title="Edit Program"
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
                <Link href="/programs" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


