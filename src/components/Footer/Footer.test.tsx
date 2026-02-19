import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from './Footer'
import * as store from '../../store'

vi.mock('../../store', async () => {
  const actual = await vi.importActual('../../store')
  return {
    ...actual,
    useChartStore: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders total charts count from store', () => {
    vi.mocked(store.useChartStore).mockReturnValue(2)

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    )

    expect(screen.getByText(/Total Charts:/)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders zero when no charts exist', () => {
    vi.mocked(store.useChartStore).mockReturnValue(0)

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    )

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('footer is clickable', async () => {
    const user = userEvent.setup()
    vi.mocked(store.useChartStore).mockReturnValue(0)

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    )

    const footer = screen.getByText(/Total Charts:/).closest('.footer')
    expect(footer).toBeInTheDocument()
    await user.click(footer!)
  })
})
