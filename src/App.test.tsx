import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupServer } from 'msw/node'
import { HttpResponse, http as rest } from 'msw'
import App from './App'
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event'

// Mock server setup
const server = setupServer(
  rest.get('/devices', ()=> {
    return HttpResponse.json([
      { id: '1', system_name: 'Test Device', type: 'WINDOWS', hdd_capacity: '500' }
    ])
  }),
  rest.post('/devices', (info) => {
    return HttpResponse.json({ id: '2', system_name: 'Test Device', type: 'WINDOWS', hdd_capacity: '500'})
  }),
  rest.put('/devices/:id', (info) => {
    return HttpResponse.json({ id: '2', system_name: 'Test Device', type: 'WINDOWS', hdd_capacity: '500'})
  }),
  rest.delete('/devices/:id', (info) => {
    return HttpResponse.json({})
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {
  const queryClient = new QueryClient()

  it('performs all user interactions', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    // Check if the devices list is rendered
    await waitFor(() => {
      expect(screen.getByText('Test Device')).toBeInTheDocument()
    })
    const user = userEvent.setup({ skipHover: true, pointerEventsCheck: PointerEventsCheckLevel.Never});
    // Open the add device modal
    await user.click(screen.getByText('Add device'))
    await user.type(screen.getByPlaceholderText('system name'), 'New Device')

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByTestId('device-type-linux'))
    await user.type(screen.getByPlaceholderText('hdd capacity'), '256')
    await user.click(screen.getByText('Submit'))

    // Check if the new device is added
    await waitFor(() => {
      expect(screen.getByText('Test Device')).toBeInTheDocument()
    })

    // Open the edit device modal
    await user.click(screen.getByTestId('device-action-menu-trigger'))
    await waitFor(async () => {
      await user.click(screen.getByText('Edit'))
    })
    await user.type(screen.getByDisplayValue('Test Device'), 'Updated Device')
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByTestId('device-type-windows'))
    await user.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Test Device')).toBeInTheDocument()
    })


    // Open the delete device modal
    await user.click(screen.getByTestId('device-action-menu-trigger'))
    await waitFor(async () => {
      await user.click(screen.getByText('Delete'))
    })
    await user.click(screen.getByText('Delete'))

    // Check if the device is deleted
    await waitFor(() => {
      expect(screen.queryByText('Updated Device')).not.toBeInTheDocument()
    })
  })
}) 