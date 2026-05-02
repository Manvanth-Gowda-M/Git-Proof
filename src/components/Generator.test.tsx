import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Generator from './Generator'

// Mock sub-components to focus on Generator logic
vi.mock('./Hero', () => ({
  default: ({ onAnalyze, isLoading }: any) => (
    <div>
      <input data-testid="mock-input" onChange={(e) => onAnalyze(e.target.value)} />
      {isLoading && <span>Loading...</span>}
    </div>
  )
}))

vi.mock('./CertificatePreview', () => ({
  default: () => <div data-testid="preview">Preview</div>
}))

vi.mock('./TemplateSelector', () => ({
  default: () => <div>Selector</div>
}))

describe('Generator', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('initially only renders Hero', () => {
    render(<Generator />)
    expect(screen.queryByTestId('preview')).not.toBeInTheDocument()
  })

  it('shows loading state during analysis', async () => {
    // Mock successful response
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'react', owner: 'facebook' })
    })

    render(<Generator />)
    const input = screen.getByTestId('mock-input')
    
    // Use act to wrap the event that triggers async state changes
    fireEvent.change(input, { target: { value: 'facebook/react' } })
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  it('renders preview and selector after successful analysis', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ 
        name: 'react', 
        owner: 'facebook',
        hasReadme: true,
        commitCount: 10,
        stars: 100,
        languages: ['JS']
      })
    })

    render(<Generator />)
    const input = screen.getByTestId('mock-input')
    
    fireEvent.change(input, { target: { value: 'facebook/react' } })
    
    await waitFor(() => {
      expect(screen.getByTestId('preview')).toBeInTheDocument()
    })
    expect(screen.getByText('Select Edition')).toBeInTheDocument()
  })

  it('shows error notice on failure', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Not found' })
    })

    render(<Generator />)
    const input = screen.getByTestId('mock-input')
    
    fireEvent.change(input, { target: { value: 'invalid/repo' } })
    
    await waitFor(() => {
      expect(screen.getByText(/Correction Notice: Not found/i)).toBeInTheDocument()
    })
  })
})
