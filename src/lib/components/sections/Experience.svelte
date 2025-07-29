<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Timeline from '$lib/components/ui/Timeline.svelte';
  import { EXPERIENCE } from '$lib/utils/constants';
  
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
      { threshold: 0.2 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  // Transform experience data for Timeline component
  const timelineItems = EXPERIENCE.map(exp => ({
    id: exp.id,
    title: exp.role,
    subtitle: exp.company,
    period: exp.period,
    description: exp.achievements,
    technologies: exp.technologies,
    current: exp.current
  }));
</script>

<section id="experience" class="section-padding bg-gray-50 dark:bg-gray-800/50" bind:this={sectionRef}>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Experiencia Profesional
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Mi trayectoria profesional desarrollando soluciones tecnológicas innovadoras
        </p>
        
        <div in:fade={{ duration: 600, delay: 300 }}>
          <Timeline items={timelineItems} />
        </div>
      </div>
    {/if}
  </div>
</section>