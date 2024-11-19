import { useMutation } from '@tanstack/react-query'
import { client } from '@/utils'
import { QueryKeys } from '@/utils/constants'
import { queryClient } from '@/utils/queryClient'

export interface DeviceCreateInput {
  system_name: string
  type: string
  hdd_capacity: string
}

export function useCreateDevice() {
  return useMutation({
    mutationKey: [QueryKeys.CreateDevice],
    mutationFn: async (deviceInput: DeviceCreateInput) => {
      const { data } = await client.post('/devices', deviceInput)

      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDevices] })
    }
  })
}
