import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Department = { id: number; name: string; code: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/departments' },
]

const columns: Column<Department>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'Name' },
    { key: 'code', header: 'Code' },
]

export default function DepartmentsIndex() {
    const rows: Department[] = [
        { id: 1, name: 'Computer Science', code: 'CS' },
        { id: 2, name: 'Mathematics', code: 'MATH' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Departments</h1>
                <PermissionGate anyPermission="departments.create">
                    <Link href="/departments/create">
                        <Button>Add Department</Button>
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
                        viewPermission="departments.view"
                        editPermission="departments.edit"
                        deletePermission="departments.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


