import { Footer } from './footer'
import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'

describe('Footer', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })
})
