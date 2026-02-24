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
    course_name: string[]
    semester_name: string
    capacity: number
    enrolled_count: number
}


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'courses', href: '/courses' },
]

const columns: Column<courses>[] = [
    {
        key: 'course_name',
        header: 'Name',
        render: (row) => (
            <div className="flex flex-col">
                {row.course_name.map((n, i) => (
                    <span key={i}>{n}</span>
                ))}
            </div>
        ),
    },
    { key: 'semester_name', header: 'semester' },
    { key: 'capacity', header: 'capacity' },
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
                <div className="flex gap-2">
                        <Button
                            variant="default"
                            onClick={() => router.post(`/enrollments`, { course_offering_id: row.id })}
                        >
                            Enroll
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={() =>
                                confirm('Are you sure you want to withdraw from this course?') &&
                                router.delete(`/enrollments/${row.id}`)
                            }
                        >
                            Withdraw
                        </Button>
                    </div>
                )}

            />
        </AppLayout>
    )
}


