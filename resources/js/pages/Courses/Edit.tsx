import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
    { title: 'Edit', href: '/courses/1/edit' },
]

export default function CoursesEdit() {
    const entity = { id: 1, title: 'Intro to Programming', code: 'CS101' }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Course" />
            <PermissionGate anyPermission="courses.edit">
                <EntityModal
                    title="Edit Course"
                    open={true}
                    onClose={() => {}}
                    entity={entity}
                    fields={[
                        { key: 'title', label: 'Title' },
                        { key: 'code', label: 'Code' },
                    ]}
                    onSubmit={() => {}}
                />
            </PermissionGate>
            <div className="mt-4 text-sm">
                <Link href="/courses" className="text-blue-600 hover:underline">Back to list</Link>
            </div>
        </AppLayout>
    )
}


