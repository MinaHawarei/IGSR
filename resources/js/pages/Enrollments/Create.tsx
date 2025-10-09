import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Enrollments', href: '/enrollments' },
    { title: 'Create', href: '/enrollments/create' },
]

export default function EnrollmentsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Enrollment" />
            <PermissionGate anyPermission="enrollments.create">
                <EntityModal
                    title="Create Enrollment"
                    open={true}
                    onClose={() => {}}
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


