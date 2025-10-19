import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Department = { id: number; name: string }

type Program = {
    id: number
    code: string
    name: string
    name_ar: string
    level: string
    department_id: number
    description: string
}

interface PageProps {
    program: Program
    departments: Department[]
    [key: string]: unknown
}

export default function ProgramsEdit() {
    const { program, departments } = usePage<PageProps>().props

    if (!program) {
        return <div className="p-6 text-red-600">Error: Program data not found.</div>
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Programs', href: '/programs' },
        { title: `Edit ${program.name}`, href: `/programs/${program.id}/edit` },
    ]

    const { data, setData, put, processing, errors } = useForm({
        code: program.code || '',
        name: program.name || '',
        name_ar: program.name_ar || '',
        level: program.level || '',
        department_id: program.department_id || '',
        description: program.description || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/programs/${program.id}`, {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${program.name}`} />

            <PermissionGate anyPermission="programs.update">
                <div className="w-full mx-auto p-6 rounded-lg shadow mt-6">
                    <h1 className="text-2xl font-semibold mb-6">Edit Program</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-6">


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
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                {errors.name_ar && <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>}
                            </div>

                            {/* Level */}
                            <div>
                                <Label htmlFor="level">Level</Label>
                                <select
                                    id="level"
                                    name="level"
                                    value={data.level}
                                    onChange={e => setData('level', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    required
                                >
                                    <option value="">Select Level</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PhD">PhD</option>
                                </select>
                                {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                            </div>

                            {/* Department */}
                            <div>
                                <Label htmlFor="department_id">Department</Label>
                                <select
                                    id="department_id"
                                    name="department_id"
                                    value={data.department_id}
                                    onChange={e => setData('department_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.department_id && <p className="text-red-500 text-sm mt-1">{errors.department_id}</p>}
                            </div>
                        </div>

                        {/* Code */}
                        <div>
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                name="code"
                                value={data.code}
                                onChange={e => setData('code', e.target.value)}
                                required
                            />
                            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href="/programs"
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
