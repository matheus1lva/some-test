import * as React from 'react'
import { Apple, Linux, Windows } from '@/components/icons'
import { useGetDevices } from '@/pages/home/hooks/useGetDevices'
import { DeviceActionMenu } from '@/pages/home/components/DeviceActionMenu'

function getIconForSystemName(
  systemName: 'WINDOWS' | 'LINUX' | 'MAC' | string
) {
  switch (systemName) {
    case 'WINDOWS':
      return Windows
    case 'LINUX':
      return Linux
    case 'MAC':
      return Apple
    default:
      return Windows
  }
}

export function DevicesList() {
  const { data: devices, isLoading: loading } = useGetDevices()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2">
      <div className="border-b px-3 py-2 text-sm font-semibold">Device</div>
      <div className="divide-y">
        {devices?.map((device, index) => {
          const Icon = getIconForSystemName(device.type)
          return (
            <div
              key={index}
              className="flex flex-row justify-between px-3 py-2 hover:bg-gray-100"
            >
              <div className="">
                <div className="flex flex-row items-center gap-1">
                  <Icon />
                  <div className="text-sm text-primary">
                    {device.system_name}
                  </div>
                </div>
                <div className="text-sm capitalize text-primary-light">
                  {device.type.toLowerCase()} workstation -{' '}
                  {device.hdd_capacity} GB
                </div>
              </div>
              <DeviceActionMenu device={device} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
