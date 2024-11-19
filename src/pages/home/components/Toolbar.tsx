import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import * as React from 'react'
import { DeviceUpsertModal } from '@/pages/home/components/Modals/DeviceUpsertModal'

export function Toolbar() {
  const [open, setOpen] = React.useState(false)

  const onClose = () => setOpen(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Devices</h2>
        <Button
          className="bg text-white"
          type="button"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
          Add device
        </Button>
      </div>
      <DeviceUpsertModal open={open} onClose={onClose} />
    </>
  )
}
