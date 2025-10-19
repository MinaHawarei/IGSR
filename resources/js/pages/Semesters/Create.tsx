import React, { useEffect } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SemestersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_date: '',
        end_date: '',
        status: '',
        season: '',
        year: '',
    })

    // update name based on start_date
    useEffect(() => {
        if (data.start_date) {
            const start = new Date(data.start_date)
            const month = start.getMonth() + 1 // 0-based
            let season = ''
            if (month >= 1 && month <= 4) season = 'Spring'
            else if (month >= 5 && month <= 8) season = 'Summer'
            else season = 'Fall'
            const yearNum = start.getFullYear()
            const year = String(yearNum)
            setData(prev => ({
                ...prev,
                season,
                year,
                name: `${season} ${year}`,
            }))
        }
    }, [data.start_date])

    // update status based on start_date and end_date
    useEffect(() => {
        if (data.start_date && data.end_date) {
            const today = new Date()
            const start = new Date(data.start_date)
            const end = new Date(data.end_date)
            let status = 'upcoming'
            if (today >= start && today <= end) status = 'active'
            else if (today > end) status = 'completed'
            setData('status', status)
        }
    }, [data.start_date, data.end_date])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post('/semesters', { preserveScroll: true })
    }

    return (
        <AppLayout>
            <Head title="Create semester" />
            <div className="w-full mx-auto p-6 rounded-lg shadow bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Create semester</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Date */}
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

                        {/* End Date */}
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

                        {/* Name */}
                        <div>
                            <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Semester Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                disabled
                                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* status */}
                        <div>
                            <Label className="text-gray-900 dark:text-gray-100">Status</Label>
                            <Input
                                value={data.status}
                                disabled
                                className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
