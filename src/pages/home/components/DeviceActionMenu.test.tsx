import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DeviceActionMenu } from './DeviceActionMenu'
import { useUpdateDevice } from '../hooks/useUpdateDevice'
import { useDeleteDevice } from '../hooks/useDeleteDevice'
import userEvent from '@testing-library/user-event'

vi.mock('../hooks/useUpdateDevice')
vi.mock('../hooks/useDeleteDevice')

const mockDevice = {
  id: '1',
  system_name: 'Test Device',
  type: 'WINDOWS',
  hdd_capacity: '500'
}

describe('DeviceActionMenu', () => {
  const queryClient = new QueryClient()

  beforeEach(() => {
    vi.mocked(useUpdateDevice).mockReturnValue({
      mutate: vi.fn(),
      isLoading: false
    } as any)
    vi.mocked(useDeleteDevice).mockReturnValue({
      mutate: vi.fn(),
      isLoading: false
    } as any)
  })

  it('opens edit modal when edit button is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeviceActionMenu device={mockDevice} />
      </QueryClientProvider>
    )

    const user = userEvent.setup({ skipHover: true});
    
    // Open dropdown menu
    const menuButton = screen.getByTestId('device-action-menu-trigger')
    user.click(menuButton)

    // Wait for the dropdown to open and the edit button to be available
    await waitFor(() => {
      const editButton = screen.getByText('Edit')
      expect(editButton).toBeInTheDocument()
    })
  })

  it('opens delete modal when delete button is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeviceActionMenu device={mockDevice} />
      </QueryClientProvider>
    )
   
    const user = userEvent.setup({ skipHover: true}); 
    // Open dropdown menu
    const menuButton = screen.getByTestId('device-action-menu-trigger')
    user.click(menuButton)
    
    // Click delete button
    await waitFor(() => {
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
      expect(screen.getByText('Delete device')).toBeInTheDocument()
    })


  })
}) 