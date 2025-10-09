import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface Column<T> {
    key: keyof T | string
    header: string
    render?: (row: T) => React.ReactNode
    className?: string
}

export interface DataTableProps<T> {
    rows: T[]
    columns: Column<T>[]
    page?: number
    perPage?: number
    total?: number
    onPageChange?: (page: number) => void
    actions?: (row: T) => React.ReactNode
    loading?: boolean
    emptyMessage?: string
}

export function DataTable<T extends { id?: string | number }>({ 
    rows, 
    columns, 
    page = 1, 
    perPage = 10, 
    total, 
    onPageChange, 
    actions, 
    loading = false,
    emptyMessage = 'No records found.'
}: DataTableProps<T>) {
    const totalPages = useMemo(() => (total && perPage ? Math.max(1, Math.ceil(total / perPage)) : 1), [total, perPage])
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="overflow-x-auto rounded-md border">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-900/40">
                        <tr>
                            {columns.map(col => (
                                <th key={String(col.key)} className={cn('px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300', col.className)}>
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:divide-gray-800">
                        {rows.map((row, idx) => (
                            <tr key={(row.id ?? idx) as React.Key} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40">
                                {columns.map(col => (
                                    <td key={String(col.key)} className={cn('px-4 py-2 text-sm text-gray-800 dark:text-gray-100', col.className)}>
                                        {col.render ? col.render(row) : (row as any)[col.key as any]}
                                    </td>
                                ))}
                                {actions && <td className="px-4 py-2 text-right">{actions(row)}</td>}
                            </tr>
                        ))}
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-300">
                                    Loading...
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-300">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Page {page} {total ? `of ${totalPages}` : ''}
                </div>
                {totalPages > 1 && (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onPageChange?.(Math.max(1, page - 1))} disabled={page <= 1}>Prev</Button>
                        <Button variant="outline" size="sm" onClick={() => onPageChange?.(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</Button>
                    </div>
                )}
            </div>
        </div>
    )
}


