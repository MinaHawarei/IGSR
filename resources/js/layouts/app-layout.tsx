import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode, useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface AppLayoutProps {
    children: ReactNode
    breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { props: pageProps } = usePage()
    const flash = (pageProps.flash ?? {}) as { success?: string; error?: string }
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined
        if (flash.success) {
            setMessage({ type: 'success', text: flash.success })
        } else if (flash.error) {
            setMessage({ type: 'error', text: flash.error })
        }
        if (flash.success || flash.error) {
            timer = setTimeout(() => setMessage(null), 5000)
        }
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [flash])

    const handleClose = () => {
        setMessage(null)
    }

    // 🔥 التنسيق الجديد: استخدام ألوان محايدة للخلفية وألوان الحالة للأيقونات والحدود
    const toastConfig = message?.type === 'success'
        ? {
            icon: CheckCircleIcon,
            mainColor: 'text-green-600', // لون الأيقونة والنص الأساسي للنجاح
            ringColor: 'ring-green-400', // لون إطار الإشعار
            hoverBg: 'hover:bg-green-50', // خلفية زر الإغلاق عند التحويم
            hoverText: 'text-green-600',
        }
        : {
            icon: XCircleIcon,
            mainColor: 'text-red-600', // لون الأيقونة والنص الأساسي للخطأ
            ringColor: 'ring-red-400', // لون إطار الإشعار
            hoverBg: 'hover:bg-red-50', // خلفية زر الإغلاق عند التحويم
            hoverText: 'text-red-600',
        }

    const IconComponent = toastConfig.icon

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}

            <AnimatePresence>
                {message && (
                    <motion.div
                        key="toast"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.5, ease: [0.17, 0.67, 0.83, 0.67] }}
                        className="fixed bottom-6 right-6 w-full max-w-sm p-4 z-50 pointer-events-none"
                    >
                        <div
                            // 🔥 الخلفية نظيفة: بيضاء في الوضع العادي، رمادية داكنة في الوضع الداكن
                            className={`pointer-events-auto w-full max-w-sm rounded-xl shadow-2xl ring-1 ${toastConfig.ringColor} overflow-hidden
                                bg-white dark:bg-gray-800`}
                        >
                            <div className="flex items-start p-4">
                                <div className="flex-shrink-0">
                                    {/* 🔥 الأيقونة بلون الحالة الواضح */}
                                    <IconComponent className={`h-6 w-6 ${toastConfig.mainColor}`} aria-hidden="true" />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    {/* 🔥 العنوان بلون الحالة الواضح */}
                                    <p className={`text-sm font-semibold leading-5 ${toastConfig.mainColor}`}>
                                            {message.type === 'success' ? 'Success' : 'Error'}
                                    </p>
                                    {/* نص الرسالة: لون محايد يتكيف مع الوضع الداكن */}
                                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                        {message.text}
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        onClick={handleClose}
                                        className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                                            text-gray-400 dark:text-gray-500 ${toastConfig.hoverBg} ${toastConfig.hoverText} focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500`}
                                    >
                                        <span className="sr-only">إغلاق</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AppLayoutTemplate>
    )
}
