import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type program = { id: number; name: string }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
    { title: 'Create', href: '/courses/create' },
]

export default function coursesCreate() {
    const { programs } = usePage<{ programs: program[] }>().props

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        name_ar: '',
        credits: 0,
        expiry: 0,
        program_id: '',
        description: '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post('/courses', { preserveScroll: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Course" />

            <PermissionGate anyPermission="courses.create">
                <div className="w-full mx-auto p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-semibold mb-6">Create Course</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ---  Grid Layout for 2 per row  --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            {/* Program */}
                            <div>
                                <Label htmlFor="program_id">Program</Label>
                                <select
                                    id="program_id"
                                    name="program_id"
                                    value={data.program_id}
                                    onChange={e => setData('program_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    required
                                >
                                    <option value="">Select Program</option>
                                    {(programs ?? []).length > 0 ? (
                                        programs.map(d => (
                                            <option key={d.id} value={d.id}>
                                                {d.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No programs found</option>
                                    )}
                                </select>
                                {errors.program_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.program_id}</p>
                                )}
                            </div>

                            {/* Credits */}
                            <div>
                                <Label htmlFor="credits">Credits</Label>
                                <Input
                                    id="credits"
                                    name="credits"
                                    type="number"
                                    value={data.credits}
                                    onChange={e => setData('credits', parseFloat(e.target.value) || 0)}
                                    required
                                    min="0"
                                    step="0.1"
                                />
                                {errors.credits && <p className="text-red-500 text-sm mt-1">{errors.credits}</p>}
                            </div>

                            {/* Expiry */}
                            <div>
                                <Label htmlFor="expiry">Expiry (Years)</Label>
                                <Input
                                    id="expiry"
                                    name="expiry"
                                    type="number"
                                    value={data.expiry}
                                    onChange={e => setData('expiry', parseInt(e.target.value) || 0)}
                                    required
                                    min="0"
                                />
                                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                            </div>
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
                                href="/courses"
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
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
