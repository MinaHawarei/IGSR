import { useMemo } from 'react'
import { usePage } from '@inertiajs/react'
import type { DashboardProps, Capabilities } from '@/types'

export function useCapabilities(): Capabilities {
    const page = usePage<{ props: Partial<DashboardProps> }>()
    const capabilities = (page.props as any)?.capabilities as Capabilities | undefined
    
    return useMemo(() => {
        // Fallback to empty arrays if capabilities are not available
        if (!capabilities) {
            return {
                roles: [],
                permissions: [],
                widgets: [],
            }
        }
        
        return {
            roles: Array.isArray(capabilities.roles) ? capabilities.roles : [],
            permissions: Array.isArray(capabilities.permissions) ? capabilities.permissions : [],
            widgets: Array.isArray(capabilities.widgets) ? capabilities.widgets : [],
        }
    }, [capabilities])
}

export function useHasRole(role: string | string[]): boolean {
    const { roles } = useCapabilities()
    const wanted = Array.isArray(role) ? role : [role]
    return useMemo(() => wanted.some(r => roles.includes(r)), [roles, wanted.join('|')])
}

export function useCan(permission: string | string[]): boolean {
    const { permissions } = useCapabilities()
    const wanted = Array.isArray(permission) ? permission : [permission]
    return useMemo(() => wanted.some(p => permissions.includes(p)), [permissions, wanted.join('|')])
}

export function useWidgetAllowed(widgetKey: string): boolean {
    const { widgets } = useCapabilities()
    return useMemo(() => widgets.includes(widgetKey), [widgets, widgetKey])
}


