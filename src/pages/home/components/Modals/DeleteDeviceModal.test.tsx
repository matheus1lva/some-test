import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DeleteDeviceModal } from './DeleteDeviceModal'
import { useDeleteDevice } from '../../hooks/useDeleteDevice'
import { useToast } from '@/hooks/use-toast'

vi.mock('../../hooks/useDeleteDevice')
vi.mock('@/hooks/use-toast')

describe('DeleteDeviceModal', () => {
  const mockOnClose = vi.fn()
  const mockToast = vi.fn()
  const mockDeleteMutate = vi.fn()
  
  const mockDevice = {
    id: '1',
    system_name: 'Test Device',
    type: 'WINDOWS',
    hdd_capacity: '500'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useToast).mockReturnValue({ toast: mockToast } as any)
    vi.mocked(useDeleteDevice).mockReturnValue({
      mutate: mockDeleteMutate,
      isLoading: false
    } as any)
  })

  it('shows confirmation message with device name', () => {
    render(<DeleteDeviceModal device={mockDevice} open={true} onClose={mockOnClose} />)
    expect(screen.getByText(/You are about to delete the device Test Device/)).toBeInTheDocument()
  })

  it('calls delete mutation when confirmed', async () => {
    render(<DeleteDeviceModal device={mockDevice} open={true} onClose={mockOnClose} />)
    
    fireEvent.click(screen.getByText('Delete'))
    
    await waitFor(() => {
      expect(mockDeleteMutate).toHaveBeenCalledWith('1', expect.any(Object))
    })
  })

  it('shows success toast on successful deletion', async () => {
    mockDeleteMutate.mockImplementation((_, options) => {
      options.onSuccess()
    })

    render(<DeleteDeviceModal device={mockDevice} open={true} onClose={mockOnClose} />)
    
    fireEvent.click(screen.getByText('Delete'))
    
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Device deleted',
        description: 'Device deleted successfully'
      })
    })
  })

  it('closes modal when cancel is clicked', () => {
    render(<DeleteDeviceModal device={mockDevice} open={true} onClose={mockOnClose} />)
    
    fireEvent.click(screen.getByText('Cancel'))
    
    expect(mockOnClose).toHaveBeenCalled()
  })
}) 