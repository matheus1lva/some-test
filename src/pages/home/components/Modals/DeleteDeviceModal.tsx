import { Button } from '@/components/ui/button'
import { Device } from '@/types'
import { useDeleteDevice } from '@/pages/home/hooks/useDeleteDevice'
import { useToast } from '@/hooks/use-toast'
import { BaseModal } from '@/pages/home/components/Modals/BaseModal'

export function DeleteDeviceModal({
  device,
  open,
  onClose
}: {
  device: Device
  open: boolean
  onClose: () => void
}) {
  const deviceId = device.id
  const { toast } = useToast()
  const deleteDeviceMutation = useDeleteDevice()

  function deleteDevice() {
    deleteDeviceMutation.mutate(deviceId, {
      onSuccess: () => {
        toast({
          title: 'Device deleted',
          description: 'Device deleted successfully'
        })
        onClose()
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong'
        })
      }
    })
    onClose()
  }

  return (
    <BaseModal open={open} onClose={onClose} title="Delete device">
      <div>
        <div className="mb-8 text-sm">
          You are about to delete the device {device.system_name}. This action
          cannot be undone.
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={deleteDevice}>
            Delete
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
