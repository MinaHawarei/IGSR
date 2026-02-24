import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'

interface ActionButtonsProps {
    onView?: () => void
    onEdit?: () => void
    onDelete?: () => void
    viewPermission?: string | string[]
    editPermission?: string | string[]
    deletePermission?: string | string[]
}

export default function ActionButtons({ onView, onEdit, onDelete, viewPermission = 'view', editPermission = 'edit', deletePermission = 'delete' }: ActionButtonsProps) {
    return (
        <div className="flex items-center justify-end gap-2">
            {onView && (
                <PermissionGate anyPermission={viewPermission}>
                    <Button variant="outline" size="sm" onClick={onView}>View</Button>
                </PermissionGate>
            )}
            {onEdit && (
                <PermissionGate anyPermission={editPermission}>
                    <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
                </PermissionGate>
            )}
            {onDelete && (
                <PermissionGate anyPermission={deletePermission}>
                    <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
                </PermissionGate>
            )}
        </div>
    )
}




