import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Exams', href: '/exams' },
    { title: 'Create', href: '/exams/create' },
]

export default function ExamsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Exam" />
            <PermissionGate anyPermission="exams.create">
                <EntityModal
                    title="Create Exam"
                    open={true}
                    onClose={() => {}}
                    fields={[
                        { key: 'title', label: 'Title' },
                        { key: 'date', label: 'Date', type: 'date' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/exams" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}
