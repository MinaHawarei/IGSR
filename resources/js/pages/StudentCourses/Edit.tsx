import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Program = { id: number; name: string }

type Course = {
    id: number
    code: string
    name: string
    name_ar: string
    credits: number
    expiry: number
    program_id: number
    description: string
}

interface PageProps {
    course: Course
    programs: Program[]
    [key: string]: unknown
}

export default function CoursesEdit() {
    const { course, programs } = usePage<PageProps>().props

    if (!course) {
        return <div className="p-6 text-red-600">Error: Course data not found.</div>
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Courses', href: '/courses' },
        { title: `Edit ${course.name}`, href: `/courses/${course.id}/edit` },
    ]

    const { data, setData, put, processing, errors } = useForm({
        code: course.code || '',
        name: course.name || '',
        name_ar: course.name_ar || '',
        credits: course.credits || 0,
        expiry: course.expiry || 0,
        program_id: course.program_id || '',
        description: course.description || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/courses/${course.id}`, {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${course.name}`} />

            <PermissionGate anyPermission="courses.update">
                <div className="w-full mx-auto p-6 rounded-lg shadow mt-6">
                    <h1 className="text-2xl font-semibold mb-6">Edit Course</h1>

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Program
                                </label>
                                <select
                                    value={data.program_id}
                                    onChange={(e) => setData('program_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {programs.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.program_id && <p className="text-red-600 text-sm mt-1">{errors.program_id}</p>}
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
                                <Label htmlFor="expiry">Expiry</Label>
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
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href="/courses"
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
