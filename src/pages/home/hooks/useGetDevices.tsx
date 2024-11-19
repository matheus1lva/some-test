import { useQuery } from '@tanstack/react-query'
import { client } from '@/utils'
import { Device } from '@/types'
import { useAtom } from 'jotai'
import { filtersAtom } from '@/pages/home/state'
import { useMemo } from 'react'
import { QueryKeys } from '@/utils/constants'

export function useGetDevices() {
  const [filters] = useAtom(filtersAtom)

  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.GetDevices],
    queryFn: async () => {
      const { data } = await client.get<Device[]>('/devices')
      return data
    }
  })

  const result = useMemo(() => {
    let devices = data

    if (filters.search) {
      devices = devices?.filter((device) => {
        return device.system_name
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      })
    }

    if (filters.osType && filters.osType !== 'all') {
      devices = devices?.filter((device) => {
        return device.type.toLowerCase() === filters.osType.toLowerCase()
      })
    }

    if (filters.sortBy) {
      devices = devices?.sort((a, b) => {
        if (filters.sortBy === 'name-asc') {
          return a.system_name.localeCompare(b.system_name)
        }
        if (filters.sortBy === 'name-desc') {
          return b.system_name.localeCompare(a.system_name)
        }
        const aCapacity = parseInt(a.hdd_capacity)
        const bCapacity = parseInt(b.hdd_capacity)

        if (filters.sortBy === 'storage-asc') {
          return aCapacity - bCapacity
        }
        if (filters.sortBy === 'storage-desc') {
          return bCapacity - aCapacity
        }

        return 0
      })
    }

    return devices
  }, [data, filters.osType, filters.search, filters.sortBy])

  return {
    data: result,
    ...rest
  }
}
