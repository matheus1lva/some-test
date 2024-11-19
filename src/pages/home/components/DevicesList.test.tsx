import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DevicesList } from './DevicesList'
import { useGetDevices } from '../hooks/useGetDevices'
import type { UseQueryResult } from '@tanstack/react-query'
import { Device } from '@/types'

vi.mock('../hooks/useGetDevices')

const mockDevices = [
  {
    id: '1',
    system_name: 'Test Device',
    type: 'WINDOWS',
    hdd_capacity: '500'
  }
]

const queryClient = new QueryClient()

describe('DevicesList', () => {
  it('renders loading state', () => {
    vi.mocked(useGetDevices).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      isSuccess: false,
      status: 'loading',
      isPending: true,
      isLoadingError: false,
      fetchStatus: 'idle',
      promise: Promise.resolve(),
      failureReason: null,
      isRefetchError: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: true,
      isInitialLoading: true,
      isPaused: false,
      isPlaceholderData: false,
      isRefetching: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn()
    } as unknown as UseQueryResult<Device[], Error>)

    render(
      <QueryClientProvider client={queryClient}>
        <DevicesList />
      </QueryClientProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders devices list', () => {
    vi.mocked(useGetDevices).mockReturnValue({
      data: mockDevices,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isPlaceholderData: false,
      isRefetching: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn()
    } as unknown as UseQueryResult<Device[], Error>)

    render(
      <QueryClientProvider client={queryClient}>
        <DevicesList />
      </QueryClientProvider>
    )
    expect(screen.getByText('Test Device')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      const hasText = (node: Element | null) => node?.textContent === 'windows workstation - 500 GB';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element?.children ?? []).every(child => !hasText(child));
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  })
}) 