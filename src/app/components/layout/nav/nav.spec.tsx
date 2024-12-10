import { Nav } from './nav'
import { expect, test, describe, vi } from 'vitest'
import { render } from '@testing-library/react'

describe('Nav', () => {
  test('should render correctly', () => {
    const fixedDate = new Date('2024-01-15')
    vi.spyOn(global, 'Date').mockImplementation(() => fixedDate)
    const { container } = render(<Nav />)
    expect(container).toMatchSnapshot()

    vi.restoreAllMocks()
  })
})
