<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { scrollAnimation } from '$lib/utils/animations';
  import type { ProfileData } from '$lib/types/portfolio';
  
  interface Props {
    profile: ProfileData;
  }
  
  let { profile }: Props = $props();
  let sectionRef: HTMLElement;
  let isVisible = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  const mainTechnologies = ['Node.js', 'TypeScript', 'PostgreSQL', 'React', 'Svelte'];
</script>

<section id="about" class="section-padding container-padding" bind:this={sectionRef}>
  <div class="max-w-6xl mx-auto">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
          Sobre Mí
        </h2>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Text content -->
          <div class="space-y-6">
            <div in:fade={{ duration: 600, delay: 200 }}>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {profile.bio}
              </p>
            </div>
            
            <div in:fade={{ duration: 600, delay: 400 }} class="grid grid-cols-2 gap-6">
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {profile.yearsOfExperience}+
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Años de Experiencia
                </div>
              </Card>
              
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  50+
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Proyectos Completados
                </div>
              </Card>
            </div>
            
            <div in:fade={{ duration: 600, delay: 600 }}>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tecnologías Principales
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each mainTechnologies as tech, index}
                  <div in:fade={{ duration: 400, delay: 700 + (index * 100) }}>
                    <Badge variant="primary">{tech}</Badge>
                  </div>
                {/each}
              </div>
            </div>
          </div>
          
          <!-- Image/Visual content -->
          <div in:fade={{ duration: 600, delay: 300 }} class="relative">
            <Card class="p-8 text-center">
              <!-- Avatar placeholder -->
              <div class="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                <span class="text-6xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {profile.name}
              </h3>
              <p class="text-accent-600 dark:text-accent-400 font-medium mb-4">
                {profile.title}
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                📍 {profile.location}
              </p>
            </Card>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>