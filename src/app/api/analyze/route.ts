import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');

  if (!urlParam) {
    return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
  }

  try {
    // Extract owner and repo from URL
    let owner = '';
    let repo = '';

    // Handle full URLs
    if (urlParam.includes('github.com')) {
      const parts = urlParam.split('github.com/')[1].split('/');
      owner = parts[0];
      repo = parts[1];
    } else {
      // Handle "owner/repo" format
      const parts = urlParam.split('/');
      if (parts.length >= 2) {
        owner = parts[0];
        repo = parts[1];
      }
    }

    // Clean up trailing strings (like .git)
    if (repo && repo.endsWith('.git')) {
      repo = repo.slice(0, -4);
    }

    if (!owner || !repo) {
      return NextResponse.json({ error: 'Invalid GitHub URL format. Use https://github.com/owner/repo or owner/repo' }, { status: 400 });
    }

    // Validate owner and repo names to prevent path traversal or injection
    const VALID_GITHUB_NAME = /^[a-zA-Z0-9._-]{1,100}$/;
    if (!VALID_GITHUB_NAME.test(owner) || !VALID_GITHUB_NAME.test(repo)) {
      return NextResponse.json({ error: 'Invalid repository name. Only alphanumeric characters, hyphens, underscores, and dots are allowed.' }, { status: 400 });
    }

    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitProof-App',
    };

    // Optional: Use PAT if provided in environment variables to avoid rate limiting
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch repo details
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    
    if (repoResponse.status === 404) {
      return NextResponse.json({ error: 'Repository not found. Make sure it is public.' }, { status: 404 });
    }
    
    if (!repoResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch repository data from GitHub' }, { status: repoResponse.status });
    }

    const repoData = await repoResponse.json();

    // Fetch contributors count (basic implementation by getting top contributors)
    let topContributors = [];
    let contributorsCount = 0;
    try {
      const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`, { headers });
      if (contributorsResponse.ok) {
        const contributorsData = await contributorsResponse.json();
        topContributors = contributorsData.map((c: { login: string; avatar_url: string; contributions: number }) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          contributions: c.contributions
        }));
        
        // Try to get total contributors from Link header
        const linkHeader = contributorsResponse.headers.get('link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            contributorsCount = parseInt(match[1]);
          } else {
            contributorsCount = contributorsData.length;
          }
        } else {
          contributorsCount = contributorsData.length;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch contributors", e);
    }

    // Check for README
    let hasReadme = false;
    try {
      const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
      hasReadme = readmeResponse.ok;
    } catch (e) {
      console.warn("Failed to check README", e);
    }

    // Check commits (just to verify there's at least one)
    let commitCount = 0;
    try {
      const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, { headers });
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        if (commitsData && commitsData.length > 0) {
          commitCount = 1; // At least 1 commit
        }
      }
    } catch (e) {
      console.warn("Failed to check commits", e);
    }

    // Fetch languages
    let languages = {};
    try {
      const langResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
      if (langResponse.ok) {
        languages = await langResponse.json();
      }
    } catch (e) {
      console.warn("Failed to fetch languages", e);
    }

    const extractedData = {
      name: repoData.name,
      owner: repoData.owner.login,
      ownerAvatar: repoData.owner.avatar_url,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      url: repoData.html_url,
      topics: repoData.topics || [],
      defaultBranch: repoData.default_branch || 'main',
      topContributors,
      contributorsCount,
      hasReadme,
      commitCount,
      languages: Object.keys(languages)
    };

    return NextResponse.json(extractedData, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while analyzing the repository.' }, { status: 500 });
  }
}
