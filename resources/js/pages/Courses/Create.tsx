import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import EntityModal from '@/components/forms/entity-modal'
import PermissionGate from '@/components/permissions/permission-gate'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
    { title: 'Create', href: '/courses/create' },
]

export default function CoursesCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Course" />
            <PermissionGate anyPermission="courses.create">
                <EntityModal
                    title="Create Course"
                    open={true}
                    onClose={() => {}}
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


