import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders input and button', () => {
    render(<Hero onAnalyze={vi.fn()} isLoading={false} />)
    
    expect(screen.getByPlaceholderText('github.com/owner/repo')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument()
  })

  it('calls onAnalyze with the input value when submitted', () => {
    const onAnalyze = vi.fn()
    render(<Hero onAnalyze={onAnalyze} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('github.com/owner/repo')
    const button = screen.getByRole('button', { name: /print/i })
    
    fireEvent.change(input, { target: { value: 'facebook/react' } })
    fireEvent.click(button)
    
    expect(onAnalyze).toHaveBeenCalledWith('facebook/react')
  })

  it('shows loading state on the button', () => {
    render(<Hero onAnalyze={vi.fn()} isLoading={true} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    // Loader2 icon should be present, usually testable by looking for the svg or specific test-id if added
    // For now we just check it is disabled
  })

  it('disables button when input is empty', () => {
    render(<Hero onAnalyze={vi.fn()} isLoading={false} />)
    
    const button = screen.getByRole('button', { name: /print/i })
    expect(button).toBeDisabled()
  })
})
