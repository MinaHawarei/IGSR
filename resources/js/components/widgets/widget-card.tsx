import { Card } from '@/components/ui/card'

interface WidgetCardProps {
    title: string
    description?: string
    icon?: React.ReactNode
    children?: React.ReactNode
}

export default function WidgetCard({ title, description, icon, children }: WidgetCardProps) {
    return (
        <Card className="p-4 flex items-start gap-3">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div>
                {description && <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>}
                {children && <div className="mt-2">{children}</div>}
            </div>
        </Card>
    )
}


