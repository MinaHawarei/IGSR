import { PropsWithChildren } from 'react'
import { useCan, useHasRole } from '@/hooks/use-permissions'

interface PermissionGateProps {
    anyPermission?: string | string[]
    anyRole?: string | string[]
}

export default function PermissionGate({ anyPermission, anyRole, children }: PropsWithChildren<PermissionGateProps>) {
    const can = anyPermission ? useCan(anyPermission) : true
    const has = anyRole ? useHasRole(anyRole) : true
    if (!can || !has) return null
    return children
}


