import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from './App'

jest.mock('axios')

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays fetched data on success', async () => {
    jest
      .mocked(axios.get)
      .mockResolvedValue({ status: 200, data: { result: 'Hello World!' } })

    render(<App />)

    await waitFor(() => expect(screen.getByText('Hello World!')).toBeVisible())
  })

  it('handles fetch error', async () => {
    jest.mocked(axios.get).mockResolvedValue({ status: 500 })

    render(<App />)

    await waitFor(() =>
      expect(screen.getByText(/Error fetching data/i)).toBeTruthy(),
    )
  })
})
