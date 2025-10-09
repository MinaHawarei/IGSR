import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Exams', href: '/exams' },
    { title: 'Edit', href: '/exams/1/edit' },
]

export default function ExamsEdit() {
    const entity = { id: 1, title: 'Midterm Exam', date: '2024-02-15' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Exam" />
            <PermissionGate anyPermission="exams.edit">
                <EntityModal
                    title="Edit Exam"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
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
