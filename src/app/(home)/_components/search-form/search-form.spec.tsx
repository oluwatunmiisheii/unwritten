import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { expect, test, describe, vi } from 'vitest'
import { SearchForm } from './search-form'
import userEvent from '@testing-library/user-event'

vi.mock('next/navigation', () => vi.importActual('next-router-mock'))

describe('SearchForm', () => {
  test('renders as expected', async () => {
    const { container } = render(<SearchForm />)

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  test('calls router.push with the correct URL when form is submitted', async () => {
    const user = userEvent.setup()
    render(<SearchForm />)

    const searchInput = screen.getByLabelText(/search/i)
    const searchButton = screen.getByRole('button', { name: /search/i })

    await user.type(searchInput, 'test query')
    await user.click(searchButton)

    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
      query: { search: 'test query' },
    })
  })

  test('prevents form submission when input is empty', async () => {
    const user = userEvent.setup()
    render(<SearchForm />)

    const searchButton = screen.getByRole('button', { name: /search/i })

    await user.click(searchButton)

    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
      query: {},
    })
  })
})
