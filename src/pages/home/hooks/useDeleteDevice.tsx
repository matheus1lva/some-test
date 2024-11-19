import { useMutation } from '@tanstack/react-query'
import { client } from '@/utils'
import { QueryKeys } from '@/utils/constants'
import { queryClient } from '@/utils/queryClient'

export function useDeleteDevice() {
  return useMutation({
    mutationKey: [QueryKeys.DeleteDevice],
    mutationFn: async (deviceId: string) => {
      const { data } = await client.delete(`/devices/${deviceId}`)

      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDevices] })
    }
  })
}
