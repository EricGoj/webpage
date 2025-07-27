import type { GitHubRepo, GitHubStats } from '$lib/types/portfolio';
import { GITHUB_USERNAME, GITHUB_API_URL } from './constants';

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by stars
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  try {
    // GitHub doesn't have a direct API for pinned repos, so we'll fetch top repos by stars
    const repos = await fetchGitHubRepos();
    return repos.slice(0, 6); // Return top 6 repos
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`),
      fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100`)
    ]);
    
    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API error');
    }
    
    const user = await userResponse.json();
    const repos: GitHubRepo[] = await reposResponse.json();
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    return {
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      totalCommits: 0, // This would require additional API calls to get accurate data
      contributionsThisYear: 0 // This would require GitHub GraphQL API
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      totalCommits: 0,
      contributionsThisYear: 0
    };
  }
}

export function formatRepoLanguage(language: string | null): string {
  if (!language) return 'Unknown';
  return language;
}

export function formatRepoDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Vue: '#2c3e50',
    Svelte: '#ff3e00',
    Shell: '#89e051'
  };
  
  return colors[language] || '#858585';
}