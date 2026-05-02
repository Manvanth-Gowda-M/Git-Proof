import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TemplateSelector from './TemplateSelector'
import { RepoData } from './Generator'

const mockData: RepoData = {
  name: 'test-repo',
  owner: 'test-owner',
  ownerAvatar: 'https://avatar.url',
  description: 'A test repository',
  stars: 10,
  forks: 5,
  language: 'TypeScript',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z',
  url: 'https://github.com/test-owner/test-repo',
  defaultBranch: 'main',
  topContributors: [],
  contributorsCount: 1,
  topics: [],
  hasReadme: true,
  commitCount: 10,
  languages: ['TypeScript', 'JavaScript']
}

describe('TemplateSelector', () => {
  it('renders all template options', () => {
    render(<TemplateSelector selected="birth" onSelect={vi.fn()} data={mockData} />)
    
    expect(screen.getByText('Official Repository Certificate')).toBeInTheDocument()
    expect(screen.getByText('Achievement')).toBeInTheDocument()
    expect(screen.getByText('Star Milestone')).toBeInTheDocument()
    expect(screen.getByText('Top Developer')).toBeInTheDocument()
  })

  it('calls onSelect when an unlocked template is clicked', () => {
    const onSelect = vi.fn()
    render(<TemplateSelector selected="birth" onSelect={onSelect} data={mockData} />)
    
    fireEvent.click(screen.getByText('Achievement'))
    expect(onSelect).toHaveBeenCalledWith('achievement')
  })

  it('disables locked templates', () => {
    const lowData = { ...mockData, stars: 0, hasReadme: false }
    render(<TemplateSelector selected="birth" onSelect={vi.fn()} data={lowData} />)
    
    const achievementButton = screen.getByText('Achievement').closest('button')
    const starButton = screen.getByText('Star Milestone').closest('button')
    
    expect(achievementButton).toBeDisabled()
    expect(starButton).toBeDisabled()
  })
})
