import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Home from './page'
import { getImages } from '@/lib/unsplash/unsplash.service'
import { createMockImageResult } from '@/lib/unsplash/__mocks__'
vi.mock('next/navigation', () => vi.importActual('next-router-mock'))

vi.mock('@/lib/unsplash/unsplash.service', () => ({
  getImages: vi.fn(),
}))

describe('Home Server Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockSearchParams = { search: 'Manchester' }

  test('renders empty state when results are empty', async () => {
    vi.mocked(getImages).mockResolvedValueOnce({
      total: 0,
      results: [],
      total_pages: 2,
    })

    render(await Home({ searchParams: Promise.resolve(mockSearchParams) }))

    expect(screen.getByRole('heading', { name: /No results found for/i })).toBeInTheDocument()
  })

  test('renders image grid when results are not empty', async () => {
    vi.mocked(getImages).mockResolvedValueOnce(createMockImageResult())

    render(await Home({ searchParams: Promise.resolve(mockSearchParams) }))

    expect(
      screen.queryByRole('heading', { name: /No results found for manchester/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Showing results for manchester/i }),
    ).toBeInTheDocument()
  })

  describe('Search Flow', () => {
    test('searches for new images when search search query changes', async () => {
      const mockSearchParams = {
        search: 'Manchester',
      }

      vi.mocked(getImages).mockResolvedValueOnce(createMockImageResult())

      const { rerender } = render(await Home({ searchParams: Promise.resolve(mockSearchParams) }))

      expect(
        screen.getByRole('heading', { name: /Showing results for manchester/i }),
      ).toBeInTheDocument()

      vi.mocked(getImages).mockResolvedValueOnce(createMockImageResult())

      rerender(await Home({ searchParams: Promise.resolve({ search: 'London' }) }))

      expect(
        screen.getByRole('heading', { name: /showing results for london/i }),
      ).toBeInTheDocument()
    })
  })
})
