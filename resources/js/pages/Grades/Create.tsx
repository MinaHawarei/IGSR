import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Grades', href: '/grades' },
    { title: 'Create', href: '/grades/create' },
]

export default function GradesCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Grade" />
            <PermissionGate anyPermission="grades.create">
                <EntityModal
                    title="Add Grade"
                    open={true}
                    onClose={() => {}}
                    fields={[
                        { key: 'student', label: 'Student' },
                        { key: 'course', label: 'Course' },
                        { key: 'grade', label: 'Grade' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/grades" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


