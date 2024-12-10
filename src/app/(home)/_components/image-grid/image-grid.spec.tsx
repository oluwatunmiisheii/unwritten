import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { getImages } from '@/lib/unsplash/unsplash.service'
import { ImageGrid } from './image-grid'
import { createMockImageResult } from '@/lib/unsplash/__mocks__'
import userEvent from '@testing-library/user-event'

vi.mock('@/lib/unsplash/unsplash.service', () => ({
  getImages: vi.fn(),
}))

describe('ImageGrid', () => {
  const defaultProps = {
    initialImages: createMockImageResult().results,
    searchQuery: 'test',
    initialPage: 1,
  } as ComponentProps<typeof ImageGrid>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders initial images and search query', () => {
    const { container } = render(<ImageGrid {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })

  test('loads more images when "Load More" button is clicked', async () => {
    const user = userEvent.setup()
    const mockNewImages = createMockImageResult().results

    vi.mocked(getImages).mockResolvedValueOnce({
      total: 6,
      results: mockNewImages,
      total_pages: 2,
    })

    render(<ImageGrid {...defaultProps} />)

    const loadMoreButton = screen.getByText('Load More')
    await user.click(loadMoreButton)

    expect(getImages).toHaveBeenCalledWith(2, 'test')
  })

  test('hides "Load More" button when there are no more images', async () => {
    const user = userEvent.setup()

    vi.mocked(getImages).mockResolvedValueOnce({
      total: 6,
      results: createMockImageResult().results,
      total_pages: 2,
    })

    render(<ImageGrid {...defaultProps} />)

    const loadMoreButton = screen.getByText('Load More')
    await user.click(loadMoreButton)

    expect(getImages).toHaveBeenCalledWith(2, 'test')
    expect(loadMoreButton).not.toBeInTheDocument()
  })
})
