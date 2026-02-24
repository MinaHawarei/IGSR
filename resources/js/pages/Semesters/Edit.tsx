import React, { useEffect } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type semester = {
    id: number
    name: string
    start_date: string
    end_date: string
    status: string
}

interface PageProps extends InertiaPageProps {
    semester: semester
}

export default function semestersEdit() {
    const { semester } = usePage<PageProps>().props

    if (!semester) {
        return <div className="p-6 text-red-600">Error: semester data not found.</div>
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'semesters', href: '/semesters' },
        { title: `Edit ${semester.name}`, href: `/semesters/${semester.id}/edit` },
    ]

    const { data, setData, put, processing, errors } = useForm({
        start_date: semester.start_date || '',
        end_date: semester.end_date || '',
        name: semester.name || '',
        status: semester.status || '',
        season: '',
        year: '',
    })

    // تحديث الفصل والسنة والاسم تلقائيًا من start_date
    useEffect(() => {
        if (data.start_date) {
            const start = new Date(data.start_date)
            const month = start.getMonth() + 1
            let season = ''
            if (month >= 1 && month <= 4) season = 'Spring'
            else if (month >= 5 && month <= 8) season = 'Summer'
            else season = 'Fall'
            const year = start.getFullYear().toString()
            setData(prev => ({
                ...prev,
                season,
                year,
                name: `${season} ${year}`,
            }))
        }
    }, [data.start_date])

    // تحديث الحالة تلقائيًا
    useEffect(() => {
        if (data.start_date && data.end_date) {
            const today = new Date()
            const start = new Date(data.start_date)
            const end = new Date(data.end_date)
            let status = 'upcoming'
            if (today >= start && today <= end) status = 'active'
            else if (today > end) status = 'completed'
            setData(prev => ({ ...prev, status }))
        }
    }, [data.start_date, data.end_date])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/semesters/${semester.id}`, { preserveScroll: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${semester.name}`} />

            <PermissionGate anyPermission="semesters.manage">
                <div className="w-full mx-auto p-6 rounded-lg shadow mt-6">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Edit semester</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* الاسم يتم توليده تلقائي */}
                            <div>
                                <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">semester Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    disabled
                                    className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* الحالة */}
                            <div>
                                <Label className="text-gray-900 dark:text-gray-100">Status</Label>
                                <Input
                                    value={data.status}
                                    disabled
                                    className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* تاريخ البداية */}
                            <div>
                                <Label htmlFor="start_date" className="text-gray-900 dark:text-gray-100">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                    required
                                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                            </div>

                            {/* تاريخ النهاية */}
                            <div>
                                <Label htmlFor="end_date" className="text-gray-900 dark:text-gray-100">End Date</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                    required
                                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href="/semesters"
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
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
