<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { PROJECTS } from '$lib/utils/constants';
  
  let sectionRef: HTMLElement;
  let isVisible = $state(false);
  let showAll = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  const displayedProjects = $derived(showAll ? PROJECTS : PROJECTS.filter(p => p.featured));
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'planned': return 'secondary';
      default: return 'default';
    }
  }
  
  function getStatusText(status: string) {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Desarrollo';
      case 'planned': return 'Planeado';
      default: return status;
    }
  }
</script>

<section id="projects" class="section-padding container-padding bg-gray-50 dark:bg-gray-800/50" bind:this={sectionRef}>
  <div class="max-w-6xl mx-auto">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Proyectos Destacados
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Una selección de proyectos que demuestran mis habilidades y experiencia
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {#each displayedProjects as project, index}
            <div in:fade={{ duration: 600, delay: 200 + (index * 100) }}>
              <Card hover class="h-full flex flex-col">
                <!-- Project header -->
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <Badge variant={getStatusColor(project.status)} size="sm">
                    {getStatusText(project.status)}
                  </Badge>
                </div>
                
                <!-- Project description -->
                <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {project.description}
                </p>
                
                <!-- Technologies -->
                <div class="mb-6">
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tecnologías:
                  </h4>
                  <div class="flex flex-wrap gap-1">
                    {#each project.technologies as tech}
                      <Badge size="sm" variant="secondary">{tech}</Badge>
                    {/each}
                  </div>
                </div>
                
                <!-- Project links -->
                <div class="flex gap-3 mt-auto">
                  {#if project.githubUrl}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      href={project.githubUrl}
                      external
                      class="flex-1"
                    >
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
                  {/if}
                  
                  {#if project.demoUrl}
                    <Button 
                      variant="primary" 
                      size="sm" 
                      href={project.demoUrl}
                      external
                      class="flex-1"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Demo
                    </Button>
                  {/if}
                </div>
              </Card>
            </div>
          {/each}
        </div>
        
        <!-- Show more/less button -->
        {#if PROJECTS.length > PROJECTS.filter(p => p.featured).length}
          <div in:fade={{ duration: 600, delay: 600 }} class="text-center">
            <Button 
              variant="secondary" 
              onclick={() => showAll = !showAll}
            >
              {showAll ? 'Mostrar Menos' : `Ver Todos los Proyectos (${PROJECTS.length})`}
            </Button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>