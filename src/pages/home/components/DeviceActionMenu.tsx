import { Device } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from '@/components/icons'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { DeviceUpsertModal } from './Modals/DeviceUpsertModal'
import { DeleteDeviceModal } from '@/pages/home/components/Modals/DeleteDeviceModal'

export function DeviceActionMenu({ device }: { device: Device }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenDelete, setIsOpenDelete] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8" data-testid="device-action-menu-trigger">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsOpenDelete(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeviceUpsertModal
        device={device}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <DeleteDeviceModal
        device={device}
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
      />
    </>
  )
}
