import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

type LiveClass = { id: number; title: string; start_time: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Live Classes', href: '/live-classes' },
]

const columns: Column<LiveClass>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'title', header: 'Title' },
    { key: 'start_time', header: 'Start Time' },
]

export default function LiveClassesIndex() {
    const rows: LiveClass[] = [
        { id: 1, title: 'Live Class 1', start_time: '2024-01-15 10:00' },
        { id: 2, title: 'Live Class 2', start_time: '2024-01-16 14:00' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Live Classes" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Live Classes</h1>
                <PermissionGate anyPermission="live_classes.create">
                    <Link href="/live-classes/create">
                        <Button>Add Live Class</Button>
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
                        viewPermission="live_classes.view"
                        editPermission="live_classes.edit"
                        deletePermission="live_classes.delete"
                    />
                )}
            />
        </AppLayout>
    )
}
