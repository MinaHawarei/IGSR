import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'


type Department = { id: number; name: string; code: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/departments' },
]

const columns: Column<Department>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'En Name' },
    { key: 'name_ar', header: 'Ar Name' },
    { key: 'description', header: 'Description' },
]

interface PageProps {
    departments: Department[]
    [key: string]: unknown
}

export default function DepartmentsIndex() {

    const { departments } = usePage<PageProps>().props


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
                rows={departments}
                columns={columns}
                page={1}
                perPage={10}
                total={departments.length}
                actions={(row) => (
                    <ActionButtons
                        onView={() => router.visit(`/departments/${row.id}`)}
                        onEdit={() => router.visit(`/departments/${row.id}/edit`)}
                        onDelete={() =>
                            confirm('Are you sure you want to delete this department?') &&
                            router.delete(`/departments/${row.id}`)
                        }
                        viewPermission="departments.view"
                        editPermission="departments.update"
                        deletePermission="departments.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


