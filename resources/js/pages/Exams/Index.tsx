import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Exam = { id: number; title: string; date: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Exams', href: '/exams' },
]

const columns: Column<Exam>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'title', header: 'Title' },
    { key: 'date', header: 'Date' },
]

export default function ExamsIndex() {
    const rows: Exam[] = [
        { id: 1, title: 'Midterm Exam', date: '2024-02-15' },
        { id: 2, title: 'Final Exam', date: '2024-05-15' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exams" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Exams</h1>
                <PermissionGate anyPermission="exams.create">
                    <Link href="/exams/create">
                        <Button>Add Exam</Button>
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
                        viewPermission="exams.view"
                        editPermission="exams.edit"
                        deletePermission="exams.delete"
                    />
                )}
            />
        </AppLayout>
    )
}
