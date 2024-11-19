import { render, screen, fireEvent } from '@testing-library/react'
import { BaseModal } from './BaseModal'

describe('BaseModal', () => {
  const mockOnClose = vi.fn()
  const mockTitle = 'Test Modal'
  const mockChildren = <div>Test Content</div>

  it('renders modal with title and content when open', () => {
    render(
      <BaseModal open={true} onClose={mockOnClose} title={mockTitle}>
        {mockChildren}
      </BaseModal>
    )
    expect(screen.getByText(mockTitle)).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    render(
      <BaseModal open={true} onClose={mockOnClose} title={mockTitle}>
        {mockChildren}
      </BaseModal>
    )
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })
}) 