import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'

interface PageHeaderProps {
    title: string
    description?: string
    action?: {
        label: string
        href: string
        permission?: string
    }
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
                )}
            </div>
            {action && (
                <Link href={action.href}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        {action.label}
                    </Button>
                </Link>
            )}
        </div>
    )
}
