<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { fetchGitHubStats, fetchPinnedRepos, getLanguageColor, formatRepoDate } from '$lib/utils/github';
  import type { GitHubRepo, GitHubStats } from '$lib/types/portfolio';
  
  let sectionRef: HTMLElement;
  let isVisible = $state(false);
  let stats = $state<GitHubStats | null>(null);
  let repos = $state<GitHubRepo[]>([]);
  let loading = $state(true);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            loadGitHubData();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  async function loadGitHubData() {
    try {
      const [statsData, reposData] = await Promise.all([
        fetchGitHubStats(),
        fetchPinnedRepos()
      ]);
      
      stats = statsData;
      repos = reposData.slice(0, 6); // Show top 6 repos
    } catch (error) {
      console.error('Error loading GitHub data:', error);
    } finally {
      loading = false;
    }
  }
</script>

<section id="github" class="section-padding container-padding" bind:this={sectionRef}>
  <div class="max-w-6xl mx-auto">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          GitHub Activity
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Mi actividad y contribuciones en GitHub
        </p>
        
        {#if loading}
          <div class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
            <p class="text-gray-600 dark:text-gray-400 mt-4">Cargando datos de GitHub...</p>
          </div>
        {:else}
          <!-- GitHub Stats -->
          {#if stats}
            <div in:fade={{ duration: 600, delay: 200 }} class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {stats.totalRepos}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Repositorios
                </div>
              </Card>
              
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {stats.totalStars}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Stars
                </div>
              </Card>
              
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {stats.totalForks}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Forks
                </div>
              </Card>
              
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {stats.totalCommits || '1000+'}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Commits
                </div>
              </Card>
            </div>
          {/if}
          
          <!-- Featured Repositories -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {#each repos as repo, index}
              <div in:fade={{ duration: 600, delay: 300 + (index * 100) }}>
                <Card hover class="h-full flex flex-col">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {repo.name}
                    </h3>
                    <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      {#if repo.language}
                        <div class="flex items-center gap-1">
                          <div 
                            class="w-3 h-3 rounded-full" 
                            style="background-color: {getLanguageColor(repo.language)}"
                          ></div>
                          <span>{repo.language}</span>
                        </div>
                      {/if}
                    </div>
                  </div>
                  
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {repo.description || 'Sin descripción disponible'}
                  </p>
                  
                  <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div class="flex items-center gap-4">
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {repo.stargazers_count}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {repo.forks_count}
                      </span>
                    </div>
                    <span>{formatRepoDate(repo.updated_at)}</span>
                  </div>
                  
                  {#if repo.topics && repo.topics.length > 0}
                    <div class="mb-4">
                      <div class="flex flex-wrap gap-1">
                        {#each repo.topics.slice(0, 3) as topic}
                          <Badge size="sm" variant="secondary">{topic}</Badge>
                        {/each}
                        {#if repo.topics.length > 3}
                          <Badge size="sm" variant="secondary">+{repo.topics.length - 3}</Badge>
                        {/if}
                      </div>
                    </div>
                  {/if}
                  
                  <div class="flex gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      href={repo.html_url}
                      external
                      class="flex-1"
                    >
                      Ver Código
                    </Button>
                    {#if repo.homepage}
                      <Button 
                        variant="primary" 
                        size="sm" 
                        href={repo.homepage}
                        external
                        class="flex-1"
                      >
                        Demo
                      </Button>
                    {/if}
                  </div>
                </Card>
              </div>
            {/each}
          </div>
          
          <!-- View all repositories button -->
          <div in:fade={{ duration: 600, delay: 800 }} class="text-center">
            <Button 
              variant="secondary" 
              href="https://github.com/ericquevedo"
              external
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Ver Todos los Repositorios
            </Button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>