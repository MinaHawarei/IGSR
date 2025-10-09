import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Student = { id: number; name: string; user_name: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Students', href: '/students' },
]

const columns: Column<Student>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'Name' },
    { key: 'user_name', header: 'Username' },
]

export default function StudentsIndex() {
    const rows: Student[] = [
        { id: 1, name: 'Alice Johnson', user_name: 'alice' },
        { id: 2, name: 'Bob Smith', user_name: 'bob' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Students</h1>
                <PermissionGate anyPermission="students.create">
                    <Link href="/students/create">
                        <Button>Add Student</Button>
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
                        viewPermission="students.view"
                        editPermission="students.edit"
                        deletePermission="students.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


