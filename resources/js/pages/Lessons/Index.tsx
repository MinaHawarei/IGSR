import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Lesson = { id: number; title: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Lessons', href: '/lessons' },
]

const columns: Column<Lesson>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'title', header: 'Title' },
]

export default function LessonsIndex() {
    const rows: Lesson[] = [
        { id: 1, title: 'Lesson 1' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lessons" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Lessons</h1>
                <PermissionGate anyPermission="lessons.create">
                    <Link href="/lessons/create">
                        <Button>Add Lesson</Button>
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
                        viewPermission="lessons.view"
                        editPermission="lessons.edit"
                        deletePermission="lessons.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


