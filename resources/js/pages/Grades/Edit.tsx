import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Grades', href: '/grades' },
    { title: 'Edit', href: '/grades/1/edit' },
]

export default function GradesEdit() {
    const entity = { id: 1, student: 'Alice Johnson', course: 'CS101', grade: 'A' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Grade" />
            <PermissionGate anyPermission="grades.edit">
                <EntityModal
                    title="Edit Grade"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
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


