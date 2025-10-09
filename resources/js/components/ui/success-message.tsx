import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-react'

interface SuccessMessageProps {
    message?: string
    className?: string
}

export function SuccessMessage({ message, className }: SuccessMessageProps) {
    if (!message) return null

    return (
        <Alert className={`border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200 ${className}`}>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
