import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'


type semesters = {
    id: number
    name: string[]
    start_date: Date
    end_date: Date
    status: string
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Semesters', href: '/semesters' },
]

const columns: Column<semesters>[] = [

    { key: 'name', header: 'name' },
    { key: 'start_date', header: 'start date' },
    { key: 'end_date', header: 'end date' },
    { key: 'status', header: 'status' },
]

interface PageProps {
    semesters: semesters[]
    [key: string]: unknown
}

export default function semestersIndex() {

    const { semesters } = usePage<PageProps>().props


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="semesters" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">semesters</h1>
                <PermissionGate anyPermission="semesters.manage">
                    <Link href="/semesters/create">
                        <Button>Add semester</Button>
                    </Link>
                </PermissionGate>
            </div>

            <DataTable
                rows={semesters}
                columns={columns}
                page={1}
                perPage={10}
                total={semesters.length}
                actions={(row) => (
                    <ActionButtons
                        onView={() => router.visit(`/semesters/${row.id}`)}
                        onEdit={() => router.visit(`/semesters/${row.id}/edit`)}
                        onDelete={() =>
                            confirm('Are you sure you want to delete this semester?') &&
                            router.delete(`/semesters/${row.id}`)
                        }
                        viewPermission="semesters.manage"
                        editPermission="semesters.manage"
                        deletePermission="semesters.manage"
                    />
                )}
            />
        </AppLayout>
    )
}


