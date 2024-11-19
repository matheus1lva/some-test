import { Device } from '@/types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useUpdateDevice } from '@/pages/home/hooks/useUpdateDevice'
import { useCreateDevice } from '@/pages/home/hooks/useCreateDevice'
import { useToast } from '@/hooks/use-toast'
import { BaseModal } from '@/pages/home/components/Modals/BaseModal'

const deviceSchema = z.object({
  id: z.string(),
  system_name: z.string().min(1, {
    message: 'System name is required'
  }),
  type: z.string().min(1, {
    message: 'Device type is required'
  }),
  hdd_capacity: z.string().min(1, {
    message: 'HDD capacity is required'
  })
})

export function DeviceUpsertModal({
  device,
  open,
  onClose
}: {
  device?: Device
  open: boolean
  onClose: () => void
}) {
  const form = useForm<z.infer<typeof deviceSchema>>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      id: device?.id ?? '',
      system_name: device?.system_name ?? '',
      type: device?.type ?? '',
      hdd_capacity: device?.hdd_capacity ?? ''
    }
  })
  const editDeviceMutation = useUpdateDevice(device?.id)
  const createDeviceMutation = useCreateDevice()
  const { toast } = useToast()

  const close = () => {
    onClose()
    form.reset()
  }

  const onSubmit = (data: z.infer<typeof deviceSchema>) => {
    if (device?.id) {
      editDeviceMutation.mutate(
        {
          id: data?.id,
          system_name: data?.system_name,
          type: data?.type,
          hdd_capacity: data?.hdd_capacity
        },
        {
          onSuccess: () => {
            toast({
              variant: 'default',
              title: 'Device updated',
              description: 'Device updated successfully'
            })
            close()
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Error updating device',
              description: 'Unable to update device'
            })
          }
        }
      )
    } else {
      createDeviceMutation.mutate(
        {
          system_name: data?.system_name,
          type: data?.type,
          hdd_capacity: data?.hdd_capacity
        },
        {
          onSuccess: () => {
            toast({
              variant: 'default',
              title: 'Device created',
              description: 'Device created successfully'
            })
            close()
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Error creating device',
              description: 'Unable to create device'
            })
          }
        }
      )
    }
  }

  const isUpdate = device?.id

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isUpdate ? 'Edit device' : 'Add device'}
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="system_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="system name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a device type"
                          data-testid="device-type-selector"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="WINDOWS"
                        data-testid="device-type-windows"
                      >
                        Windows workstation
                      </SelectItem>
                      <SelectItem value="LINUX" data-testid="device-type-linux">
                        Linux workstation
                      </SelectItem>
                      <SelectItem value="MAC" data-testid="device-type-mac">
                        Mac workstation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hdd_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HDD Capacity (GB) *</FormLabel>
                  <FormControl>
                    <Input placeholder="hdd capacity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </BaseModal>
  )
}
