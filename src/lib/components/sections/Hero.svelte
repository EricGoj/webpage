<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import type { ProfileData } from '$lib/types/portfolio';
  
  interface Props {
    profile: ProfileData;
  }
  
  let { profile }: Props = $props();
  let titleVisible = $state(false);
  let subtitleVisible = $state(false);
  let buttonsVisible = $state(false);
  let scrollIndicatorVisible = $state(false);
  
  onMount(() => {
    titleVisible = true;
    setTimeout(() => subtitleVisible = true, 300);
    setTimeout(() => buttonsVisible = true, 600);
    setTimeout(() => scrollIndicatorVisible = true, 900);
  });
  
  function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section id="hero" class="min-h-screen flex flex-col justify-center container-padding relative">
  <div class="max-w-4xl mx-auto text-center">
    {#if titleVisible}
      <h1 
        in:fly={{ y: 30, duration: 600 }}
        class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
      >
        {profile.name}
      </h1>
    {/if}
    
    {#if subtitleVisible}
      <div in:fade={{ duration: 600, delay: 100 }} class="mb-8">
        <p class="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-2">
          {profile.title}
        </p>
        <p class="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium">
          {profile.focus}
        </p>
      </div>
    {/if}
    
    {#if buttonsVisible}
      <div in:fade={{ duration: 600, delay: 200 }} class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Button variant="primary" size="lg" onclick={scrollToProjects}>
          Ver Proyectos
        </Button>
        <Button variant="secondary" size="lg" onclick={scrollToContact}>
          Contactar
        </Button>
      </div>
    {/if}
  </div>
  
  <!-- Scroll indicator -->
  {#if scrollIndicatorVisible}
    <div 
      in:fade={{ duration: 600, delay: 300 }}
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <button 
        onclick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="Scroll to about section"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  {/if}
</section>

<style lang="postcss">
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-30px,0);
    }
    70% {
      transform: translate3d(0,-15px,0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }
</style>