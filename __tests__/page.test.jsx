import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/(main site)/(Test pages)/_jestExamples/jestTest'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})