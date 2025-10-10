import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'


type Programs = {
    id: number
    name: string[]
    code: string
    department: string
    level: string
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'programs', href: '/programs' },
]

const columns: Column<Programs>[] = [
    { key: 'code', header: 'Code' },
    {
        key: 'name',
        header: 'Name',
        render: (row) => (
            <div className="flex flex-col">
                {row.name.map((n, i) => (
                    <span key={i}>{n}</span>
                ))}
            </div>
        ),
    },
    { key: 'department', header: 'department' },
    { key: 'level', header: 'level' },
]

interface PageProps {
    programs: Programs[]
    [key: string]: unknown
}

export default function programsIndex() {

    const { programs } = usePage<PageProps>().props


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="programs" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Programs</h1>
                <PermissionGate anyPermission="programs.create">
                    <Link href="/programs/create">
                        <Button>Add Program</Button>
                    </Link>
                </PermissionGate>
            </div>

            <DataTable
                rows={programs}
                columns={columns}
                page={1}
                perPage={10}
                total={programs.length}
                actions={(row) => (
                    <ActionButtons
                        onView={() => router.visit(`/programs/${row.id}`)}
                        onEdit={() => router.visit(`/programs/${row.id}/edit`)}
                        onDelete={() =>
                            confirm('Are you sure you want to delete this Program?') &&
                            router.delete(`/programs/${row.id}`)
                        }
                        viewPermission="programs.view"
                        editPermission="programs.update"
                        deletePermission="programs.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


