import AppLayout from '@/layouts/app-layout'
import { Head, Link, usePage } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import PermissionGate from '@/components/permissions/permission-gate'
// استيراد أيقونات Heroicons
import { BuildingOffice2Icon, IdentificationIcon, TagIcon, CodeBracketIcon, PencilSquareIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

type course = {
    id: number
    name: string
    name_ar?: string
    description?: string
    code?: string
}

interface PageProps {
    course?: course
    [key: string]: unknown
}

export default function coursesShow() {
    const { course } = usePage<PageProps>().props

    if (!course) {
        return (
            <AppLayout>
                <div className="p-6 text-red-600 dark:text-red-400">course data not found.</div>
            </AppLayout>
        )
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'courses', href: '/courses' },
        { title: `Details ${course.name}`, href: `/courses/${course.id}` },
    ]

    // قائمة حقول البيانات مع الأيقونات
    const fields = [
        { label: 'ID', value: course.id, icon: IdentificationIcon },
        { label: 'English Name', value: course.name, icon: BuildingOffice2Icon },
        ...(course.name_ar ? [{ label: 'Arabic Name', value: course.name_ar, icon: BuildingOffice2Icon }] : []),
        ...(course.code ? [{ label: 'Code', value: course.code, icon: CodeBracketIcon }] : []),
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`course: ${course.name}`} />

            <div className="mx-auto max-w-4xl">
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <BuildingOffice2Icon className="h-6 w-6 text-indigo-500" />
                            course Details: {course.name}
                        </h3>
                        {course.description && (
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                {course.description}
                            </p>
                        )}
                    </div>

                    {/* جسم البطاقة - عرض الحقول */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                            {/* عرض الحقول الأساسية */}
                            {fields.map((field) => {
                                const FieldIcon = field.icon;
                                return (
                                    <div key={field.label} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                            <FieldIcon className="h-5 w-5 mr-2 text-indigo-400" />
                                            {field.label}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                            {field.value}
                                        </dd>
                                    </div>
                                );
                            })}

                            {/* عرض حقل الوصف (Description) إذا كان موجوداً */}
                            {course.description && (
                                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                        <TagIcon className="h-5 w-5 mr-2 text-indigo-400" />
                                        Description
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                        {course.description}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {/* 🌟🌟 قسم الأزرار 🌟🌟 */}
                <div className="mt-6 flex flex-wrap gap-4">
                    <PermissionGate anyPermission="courses.update">
                        <Link
                            href={`/courses/${course.id}/edit`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                                    text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    dark:focus:ring-offset-gray-900"
                        >
                            <PencilSquareIcon className="h-5 w-5 mr-2" />
                            Edit course
                        </Link>
                    </PermissionGate>

                    <Link
                        href="/courses"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md
                                text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                    >
                        <ArrowUturnLeftIcon className="h-5 w-5 mr-2" />
                        Back to list
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}
