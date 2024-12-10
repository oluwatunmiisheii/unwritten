import { Nav } from './nav'
import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'

describe('Nav', () => {
  test('should render correctly', () => {
    const { container } = render(<Nav />)
    expect(container).toMatchSnapshot()
  })
})
