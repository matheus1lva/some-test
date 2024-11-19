import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { DeviceUpsertModal } from './DeviceUpsertModal'
import { useUpdateDevice } from '../../hooks/useUpdateDevice'
import { useCreateDevice } from '../../hooks/useCreateDevice'
import { useToast } from '@/hooks/use-toast'

vi.mock('../../hooks/useUpdateDevice')
vi.mock('../../hooks/useCreateDevice')
vi.mock('@/hooks/use-toast')

describe('DeviceUpsertModal', () => {
  const mockOnClose = vi.fn()
  const mockToast = vi.fn()
  const mockCreateMutate = vi.fn()
  const mockUpdateMutate = vi.fn()

  const mockDevice = {
    id: '1',
    system_name: 'Test Device',
    type: 'WINDOWS',
    hdd_capacity: '500'
  }

  beforeEach(() => {
    vi.mocked(useToast).mockReturnValue({ toast: mockToast } as any)
    vi.mocked(useUpdateDevice).mockReturnValue({
      mutate: mockUpdateMutate,
      isLoading: false
    } as any)
    vi.mocked(useCreateDevice).mockReturnValue({
      mutate: mockCreateMutate,
      isLoading: false
    } as any)
  })

  describe('Create Device', () => {
    it('shows validation errors for empty fields', async () => {
      render(<DeviceUpsertModal open={true} onClose={mockOnClose} />)

      // Submit without filling form
      fireEvent.click(screen.getByText('Submit'))

      await waitFor(() => {
        expect(screen.getByText('System name is required')).toBeInTheDocument()
        expect(screen.getByText('HDD capacity is required')).toBeInTheDocument()
      })
    })
    it('allows the user to fill in the form and select a device type', async () => {
      render(<DeviceUpsertModal open={true} onClose={mockOnClose} />)

      // Simulate user input for system name
      fireEvent.change(screen.getByPlaceholderText('system name'), {
        target: { value: 'New Device' }
      })
      expect(screen.getByDisplayValue('New Device')).toBeInTheDocument()

      // Simulate user input for HDD capacity
      fireEvent.change(screen.getByPlaceholderText('hdd capacity'), {
        target: { value: '256' }
      })
      expect(screen.getByDisplayValue('256')).toBeInTheDocument()

      // Simulate selecting a device type from the dropdown
      fireEvent.click(screen.getByRole('combobox'))
      fireEvent.click(screen.getByTestId('device-type-linux'))

      // Optionally, submit the form to verify the submission logic
      fireEvent.click(screen.getByText('Submit'))

      await waitFor(() => {
        expect(mockCreateMutate).toHaveBeenCalledWith(
          {
            system_name: 'New Device',
            type: 'LINUX',
            hdd_capacity: '256'
          },
          expect.any(Object)
        )
      })
    })
  })

  describe('Edit Device', () => {
    it('updates existing device', async () => {
      render(
        <DeviceUpsertModal
          device={mockDevice}
          open={true}
          onClose={mockOnClose}
        />
      )

      // Change system name
      fireEvent.change(screen.getByDisplayValue('Test Device'), {
        target: { value: 'Updated Device' }
      })

      // Submit form
      fireEvent.click(screen.getByText('Submit'))

      await waitFor(() => {
        expect(mockUpdateMutate).toHaveBeenCalledWith(
          {
            id: '1',
            system_name: 'Updated Device',
            type: 'WINDOWS',
            hdd_capacity: '500'
          },
          expect.any(Object)
        )
      })
    })

    it('shows success toast on successful update', async () => {
      mockUpdateMutate.mockImplementation((_, options) => {
        options.onSuccess()
      })

      render(
        <DeviceUpsertModal
          device={mockDevice}
          open={true}
          onClose={mockOnClose}
        />
      )

      fireEvent.click(screen.getByText('Submit'))

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Device updated',
            description: 'Device updated successfully'
          })
        )
      })
    })
  })
})
