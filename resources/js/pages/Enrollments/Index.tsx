import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Enrollment = { id: number; student: string; course: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Enrollments', href: '/enrollments' },
]

const columns: Column<Enrollment>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'student', header: 'Student' },
    { key: 'course', header: 'Course' },
]

export default function EnrollmentsIndex() {
    const rows: Enrollment[] = [
        { id: 1, student: 'Alice Johnson', course: 'CS101' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollments" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Enrollments</h1>
                <PermissionGate anyPermission="enrollments.create">
                    <Link href="/enrollments/create">
                        <Button>Add Enrollment</Button>
                    </Link>
                </PermissionGate>
            </div>
            <DataTable
                rows={rows}
                columns={columns}
                page={1}
                perPage={10}
                total={rows.length}
                actions={(row) => (
                    <ActionButtons
                        onView={() => {}}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        viewPermission="enrollments.view"
                        editPermission="enrollments.edit"
                        deletePermission="enrollments.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


