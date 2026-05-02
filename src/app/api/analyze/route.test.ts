import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'

describe('Analyze API Route', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    process.env.GITHUB_TOKEN = 'test-token'
  })

  it('returns 400 if url is missing', async () => {
    const req = new Request('http://localhost/api/analyze')
    const res = await GET(req)
    
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBe('Repository URL is required')
  })

  it('returns 400 for invalid GitHub URL', async () => {
    const req = new Request('http://localhost/api/analyze?url=invalid-url')
    const res = await GET(req)
    
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Invalid GitHub URL format')
  })

  it('successfully analyzes a repository', async () => {
    // Mock GitHub API responses
    ;(global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ 
          name: 'react', 
          owner: { login: 'facebook', avatar_url: 'avatar' },
          stargazers_count: 100,
          forks_count: 50,
          language: 'JavaScript',
          created_at: '2013-05-24T16:15:54Z',
          updated_at: '2023-01-01T00:00:00Z',
          html_url: 'https://github.com/facebook/react',
          topics: ['ui', 'react'],
          default_branch: 'main'
        })
      }) // Repo fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ login: 'gaearon', contributions: 100 }]),
        headers: { get: () => null }
      }) // Contributors fetch
      .mockResolvedValueOnce({ ok: true }) // README check
      .mockResolvedValueOnce({ ok: true, json: async () => ([{}]) }) // Commits check
      .mockResolvedValueOnce({ ok: true, json: async () => ({ JavaScript: 1000 }) }) // Languages fetch

    const req = new Request('http://localhost/api/analyze?url=facebook/react')
    const res = await GET(req)
    
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.name).toBe('react')
    expect(data.owner).toBe('facebook')
    expect(data.stars).toBe(100)
  })

  it('handles 404 from GitHub', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    const req = new Request('http://localhost/api/analyze?url=nonexistent/repo')
    const res = await GET(req)
    
    expect(res.status).toBe(404)
    const data = await res.json()
    expect(data.error).toContain('Repository not found')
  })
})
