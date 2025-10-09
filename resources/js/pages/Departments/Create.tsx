import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { route } from 'ziggy-js'


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/departments' },
    { title: 'Create', href: '/departments/create' },
]

export default function DepartmentsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        name_ar: '',
        description: '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post('/departments')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Department" />

            <PermissionGate anyPermission="departments.create">
                <div className="w-full mx-auto p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-semibold mb-6">Create Department</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* English Name */}
                        <div>
                            <Label htmlFor="name">English Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Arabic Name */}
                        <div>
                            <Label htmlFor="name_ar">Arabic Name</Label>
                            <Input
                                id="name_ar"
                                name="name_ar"
                                value={data.name_ar}
                                onChange={e => setData('name_ar', e.target.value)}
                                required
                            />
                            {errors.name_ar && (
                                <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full border rounded px-3 py-2"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href="/departments"
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </PermissionGate>
        </AppLayout>
    )
}
