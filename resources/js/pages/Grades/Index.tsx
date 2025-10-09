import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Grade = { id: number; student: string; course: string; grade: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Grades', href: '/grades' },
]

const columns: Column<Grade>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'student', header: 'Student' },
    { key: 'course', header: 'Course' },
    { key: 'grade', header: 'Grade' },
]

export default function GradesIndex() {
    const rows: Grade[] = [
        { id: 1, student: 'Alice Johnson', course: 'CS101', grade: 'A' },
        { id: 2, student: 'Bob Smith', course: 'CS201', grade: 'B+' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Grades" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Grades</h1>
                <PermissionGate anyPermission="grades.create">
                    <Link href="/grades/create">
                        <Button>Add Grade</Button>
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
                        viewPermission="grades.view"
                        editPermission="grades.edit"
                        deletePermission="grades.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


