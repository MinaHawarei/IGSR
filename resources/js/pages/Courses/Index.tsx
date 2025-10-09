import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Course = { id: number; title: string; code: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
]

const columns: Column<Course>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'title', header: 'Title' },
    { key: 'code', header: 'Code' },
]

export default function CoursesIndex() {
    const rows: Course[] = [
        { id: 1, title: 'Intro to Programming', code: 'CS101' },
        { id: 2, title: 'Data Structures', code: 'CS201' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Courses</h1>
                <PermissionGate anyPermission="courses.create">
                    <Link href="/courses/create">
                        <Button>Add Course</Button>
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
                        viewPermission="courses.view"
                        editPermission="courses.edit"
                        deletePermission="courses.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


