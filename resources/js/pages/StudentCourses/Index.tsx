import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'


type courses = {
    id: number
    name: string[]
    code: string
    program: string
    credits: string
    expiry: number
}


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'courses', href: '/courses' },
]

const columns: Column<courses>[] = [
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
    { key: 'program', header: 'program' },
    { key: 'credits', header: 'credits' },
    { key: 'expiry', header: 'expiry' },
]

interface PageProps {
    courses: courses[]
    [key: string]: unknown
}

export default function coursesIndex() {

    const { courses } = usePage<PageProps>().props


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="courses" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">courses</h1>
                <PermissionGate anyPermission="courses.create">
                    <Link href="/courses/create">
                        <Button>Add course</Button>
                    </Link>
                </PermissionGate>
            </div>

            <DataTable
                rows={courses}
                columns={columns}
                page={1}
                perPage={10}
                total={courses.length}
                actions={(row) => (
                    <ActionButtons
                        onView={() => router.visit(`/courses/${row.id}`)}
                        onEdit={() => router.visit(`/courses/${row.id}/edit`)}
                        onDelete={() =>
                            confirm('Are you sure you want to delete this course?') &&
                            router.delete(`/courses/${row.id}`)
                        }
                        viewPermission="courses.view"
                        editPermission="courses.update"
                        deletePermission="courses.delete"
                    />
                )}
            />
        </AppLayout>
    )
}


