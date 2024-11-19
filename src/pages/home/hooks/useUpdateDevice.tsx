import { DeviceCreateInput } from './useCreateDevice'
import { useMutation } from '@tanstack/react-query'
import { client } from '@/utils'
import { QueryKeys } from '@/utils/constants'
import { queryClient } from '@/utils/queryClient'

export interface DeviceUpdateInput extends DeviceCreateInput {
  id: string
}

export function useUpdateDevice(id?: string) {
  return useMutation({
    mutationKey: [QueryKeys.UpdateDevice, id ?? ''],
    mutationFn: async (input: DeviceUpdateInput) => {
      const { data } = await client.put(`/devices/${input.id}`, input)

      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDevices] })
    }
  })
}
