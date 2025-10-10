import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'

type Department = {
    id: number
    name: string
    name_ar: string
    description: string
}

interface PageProps {
    department: Department
    [key: string]: unknown
}

export default function DepartmentsEdit() {
    const { department } = usePage<PageProps>().props

    if (!department) {
        return <div className="p-6 text-red-600">Error: Department data not found.</div>
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Departments', href: '/departments' },
        { title: `Edit ${department.name}`, href: `/departments/${department.id}/edit` },
    ]

    const { data, setData, put, processing, errors } = useForm({
        name: department.name || '',
        name_ar: department.name_ar || '',
        description: department.description || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/departments/${department.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Department updated successfully!')
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${department.name}`} />

            <PermissionGate anyPermission="departments.update">
                <div className="w-full mx-auto p-6 rounded-xl shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* English Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                English Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Arabic Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Arabic Name
                            </label>
                            <input
                                type="text"
                                value={data.name_ar}
                                onChange={(e) => setData('name_ar', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name_ar && (
                                <p className="text-red-600 text-sm mt-1">{errors.name_ar}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.visit('/departments')}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-sm">
                        <Link href="/departments" className="text-blue-600 hover:underline">
                            ← Back to list
                        </Link>
                    </div>
                </div>
            </PermissionGate>
        </AppLayout>
    )
}
