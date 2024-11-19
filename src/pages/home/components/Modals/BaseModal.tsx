import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export function BaseModal({
  open,
  onClose,
  children,
  title
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onEscapeKeyDown={onClose} forceMount>
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogClose asChild />
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
