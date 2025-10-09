import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Assignment = { id: number; title: string; due_date: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Assignments', href: '/assignments' },
]

const columns: Column<Assignment>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'title', header: 'Title' },
    { key: 'due_date', header: 'Due Date' },
]

export default function AssignmentsIndex() {
    const rows: Assignment[] = [
        { id: 1, title: 'Assignment 1', due_date: '2024-01-15' },
        { id: 2, title: 'Assignment 2', due_date: '2024-01-22' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assignments" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Assignments</h1>
                <PermissionGate anyPermission="assignments.create">
                    <Link href="/assignments/create">
                        <Button>Add Assignment</Button>
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
                        viewPermission="assignments.view"
                        editPermission="assignments.edit"
                        deletePermission="assignments.delete"
                    />
                )}
            />
        </AppLayout>
    )
}
