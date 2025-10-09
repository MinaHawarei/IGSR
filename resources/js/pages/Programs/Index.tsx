import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type Program = { id: number; name: string; code: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Programs', href: '/programs' },
]

const columns: Column<Program>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'Name' },
    { key: 'code', header: 'Code' },
]

export default function ProgramsIndex() {
    const rows: Program[] = [
        { id: 1, name: 'BSc Computer Science', code: 'BSCS' },
        { id: 2, name: 'BSc Mathematics', code: 'BSMATH' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programs" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Programs</h1>
                <PermissionGate anyPermission="programs.create">
                    <Link href="/programs/create">
                        <Button>Add Program</Button>
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
                        viewPermission="programs.view"
                        editPermission="programs.edit"
                        deletePermission="programs.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


