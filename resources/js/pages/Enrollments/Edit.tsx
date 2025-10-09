import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Enrollments', href: '/enrollments' },
    { title: 'Edit', href: '/enrollments/1/edit' },
]

export default function EnrollmentsEdit() {
    const entity = { id: 1, student: 'Alice Johnson', course: 'CS101' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Enrollment" />
            <PermissionGate anyPermission="enrollments.edit">
                <EntityModal
                    title="Edit Enrollment"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
                    fields={[
                        { key: 'student', label: 'Student' },
                        { key: 'course', label: 'Course' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/enrollments" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


