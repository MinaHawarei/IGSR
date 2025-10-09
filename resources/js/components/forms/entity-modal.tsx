import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'

interface EntityModalProps<T> {
    title: string
    open: boolean
    onClose: () => void
    entity?: Partial<T>
    fields: {
        key: keyof T | string
        label: string
        type?: string
        placeholder?: string
        required?: boolean
        multiline?: boolean
    }[]
    onSubmit: (data: Record<string, any>) => void
}

export default function EntityModal<T>({ title, open, onClose, entity, fields, onSubmit }: EntityModalProps<T>) {
    useEffect(() => {
        // keep minimal side effects for controlled forms if needed
    }, [open])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const payload: Record<string, any> = {}
        for (const [key, value] of formData.entries()) payload[key] = value
        onSubmit(payload)
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(f => (
                        <div key={String(f.key)} className="space-y-1">
                            <Label htmlFor={String(f.key)}>
                                {f.label}
                                {f.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {f.multiline ? (
                                <textarea
                                    className="border rounded px-3 py-2 w-full"
                                    id={String(f.key)}
                                    name={String(f.key)}
                                    defaultValue={(entity as any)?.[f.key as any] ?? ''}
                                    placeholder={f.placeholder}
                                    rows={3}
                                />
                            ) : (
                                <Input
                                    id={String(f.key)}
                                    name={String(f.key)}
                                    defaultValue={(entity as any)?.[f.key as any] ?? ''}
                                    type={f.type ?? 'text'}
                                    placeholder={f.placeholder}
                                    required={f.required}
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}


