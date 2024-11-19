import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders header with logo', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument() // Logo is an SVG
  })
}) 