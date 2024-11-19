import { render, screen, fireEvent } from '@testing-library/react'
import { Filters } from './Filters'
import { useAtom } from 'jotai'
import { queryClient } from '@/utils/queryClient'

// Mock Jotai
vi.mock('jotai')

describe('Filters', () => {
  const mockSetFilters = vi.fn()

  beforeEach(() => {
    vi.mocked(useAtom).mockReturnValue([
      { osType: 'all', sortBy: 'storage-desc', search: '' },
      mockSetFilters
    ] as any)
  })

  it('renders filter inputs', () => {
    render(<Filters />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('updates search filter on input change', () => {
    render(<Filters />)
    const searchInput = screen.getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(mockSetFilters).toHaveBeenCalled()
  })

  it('refreshes devices list when refresh button clicked', async () => {
    const mockRefetch = vi.fn()
    vi.spyOn(queryClient, 'refetchQueries').mockImplementation(mockRefetch)

    render(<Filters />)
    const refreshButton = screen.getByTestId('refresh-button')
    fireEvent.click(refreshButton)
    expect(mockRefetch).toHaveBeenCalled()
  })
}) 